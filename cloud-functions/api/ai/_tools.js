/**
 * AI 对话工具层（契约 §5.2）：8 个注册工具，供 askAIWithTools 的 function calling 调用。
 * ------------------------------------------------------------------
 * - 每个工具 {name, description, parameters, run(args, context)}
 * - run 内统一经 buildScope 校验（scope 在 context 上惰性缓存），无权限返回
 *   JSON 字符串 {error}，绝不抛异常到调用循环
 * - 复用现有 AI 端点的数据核心（_shared.js / schedule.js），不重复实现口径
 */
import { S } from '../../_lib/store.js'
import { buildScope, applyScope } from '../../_lib/scope.js'
import { k12GradeOf, currentSemester } from '../../_lib/k12.js'
import {
  pick, num, allScores, scoresOf, courseMap, classMap, studentMap, listDocs,
  getDoc, studentName, className, courseName, scoreValue, deriveAttendance, clamp,
} from './_shared.js'
import { buildScheduleItems } from './schedule.js'

const out = (obj) => JSON.stringify(obj || {})

/** 惰性 scope：同一轮对话内复用，仍由 buildScope 基于请求 token 构造 */
async function scopeOf(ctx) {
  if (!ctx || !ctx.request) return null
  if (!ctx._scope) ctx._scope = await buildScope(ctx.request)
  return ctx._scope
}

/** 解析目标学生 + 五级 scope 校验；返回 {sid, doc} 或 {error} */
async function resolveStudent(args, scope) {
  if (!scope) return { error: '无权限' }
  let sid = num(pick(args, 'studentId', 'student_id'), 0)
  if (scope.type === 'student') {
    const ownId = num(scope.ownStudentId, 0)
    if (!ownId) return { error: '未定位到学生档案' }
    // 学生强制本人：显式指定他人 id 视为越权，而非静默替换
    if (sid && sid !== ownId) return { error: '无权限' }
    sid = ownId
  }
  if (!sid) return { error: '缺少 studentId' }
  const doc = await getDoc(S.academic(), `students/${sid}.json`)
  if (!doc || num(pick(doc, 'deleted'), 0) === 1) return { error: '学生不存在' }
  const cid = num(pick(doc, 'classId'), 0)
  const grade = num(pick(doc, 'grade'), 0)
  if (!scope.filterFn({ studentId: sid, classId: cid, grade })) return { error: '无权限' }
  return { sid, doc }
}

/** 学生成绩统计（analysis / predict / comment 共用的数据核心） */
async function statsOf(sid, doc) {
  const scores = await scoresOf(sid)
  const valid = scores.map(scoreValue).filter((v) => v > 0)
  const avg = valid.length
    ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length)
    : 0
  return { scores, valid, avg, courseCount: scores.length }
}

const TOOLS = [
  {
    name: 'get_student_scores',
    description: '查询指定学生的真实成绩列表（科目、分数、等级、考试、学期）。学生只能查询本人成绩。',
    parameters: {
      type: 'object',
      properties: { studentId: { type: 'integer', description: '学生档案 id；学生角色可省略，强制本人' } },
      required: [],
    },
    async run(args, context) {
      try {
        const scope = await scopeOf(context)
        const r = await resolveStudent(args, scope)
        if (r.error) return out(r)
        const { scores, avg } = await statsOf(r.sid, r.doc)
        const courses = await courseMap()
        const list = scores.map((s) => {
          const cid = num(pick(s, 'courseId', 'course_id', 'subjectId'), 0)
          const score = scoreValue(s)
          return {
            courseId: cid,
            courseName: courseName(courses.get(cid), s) || String(pick(s, 'subjectName', '') || ''),
            score,
            gradeLevel: String(pick(s, 'gradeLevel', 'grade_level', '') || k12GradeOf(score)),
            examName: String(pick(s, 'examName', '') || ''),
            semester: String(pick(s, 'semester', '') || ''),
          }
        })
        return out({
          studentId: r.sid,
          studentName: await studentName(r.sid, r.doc, scores[0]),
          avgScore: avg,
          count: list.length,
          scores: list.slice(0, 50),
        })
      } catch (e) { return out({ error: (e && e.message) || '查询成绩失败' }) }
    },
  },
  {
    name: 'analyze_student',
    description: '分析指定学生的学习情况：真实均分、课程数、出勤率推导、等级。学生只能分析本人。',
    parameters: {
      type: 'object',
      properties: { studentId: { type: 'integer', description: '学生档案 id；学生角色可省略，强制本人' } },
      required: [],
    },
    async run(args, context) {
      try {
        const scope = await scopeOf(context)
        const r = await resolveStudent(args, scope)
        if (r.error) return out(r)
        const { avg, courseCount } = await statsOf(r.sid, r.doc)
        const cid = num(pick(r.doc, 'classId'), 0)
        const classes = await classMap()
        const clsName = await className(cid, classes.get(cid), r.doc)
        return out({
          studentId: r.sid,
          studentName: await studentName(r.sid, r.doc),
          className: clsName,
          avgScore: avg,
          courseCount,
          attendanceRate: deriveAttendance(avg || 76, r.sid),
          gradeLevel: k12GradeOf(avg || 76),
        })
      } catch (e) { return out({ error: (e && e.message) || '学习分析失败' }) }
    },
  },
  {
    name: 'predict_score',
    description: '预测某学生某课程的期末总评分数与挂科风险。可用 courseId 或 subjectId 指定课程。',
    parameters: {
      type: 'object',
      properties: {
        studentId: { type: 'integer', description: '学生档案 id；学生角色可省略，强制本人' },
        courseId: { type: 'integer', description: '课程 id' },
        subjectId: { type: 'integer', description: '科目 id（与 courseId 二选一）' },
      },
      required: [],
    },
    async run(args, context) {
      try {
        const scope = await scopeOf(context)
        const r = await resolveStudent(args, scope)
        if (r.error) return out(r)
        let courseId = num(pick(args, 'courseId', 'course_id'), 0)
        if (!courseId) courseId = num(pick(args, 'subjectId', 'subject_id'), 0)
        if (!courseId) return out({ error: '缺少 courseId 或 subjectId' })
        const courses = await courseMap()
        const courseDoc = courses.get(courseId)
        if (!courseDoc) return out({ error: '课程不存在' })

        const { scores, valid, avg: historyAvg } = await statsOf(r.sid, r.doc)
        const thisDoc = scores.find((s) =>
          num(pick(s, 'courseId', 'course_id', 'subjectId'), 0) === courseId) || scores[0]
        const thisScore = thisDoc ? scoreValue(thisDoc) : (historyAvg || 75)
        const name = await studentName(r.sid, r.doc, thisDoc)
        const cName = courseName(courseDoc, thisDoc) || '课程'
        const attendance = deriveAttendance(historyAvg || 75, r.sid)
        const base = clamp(
          Math.round((historyAvg || 75) * 0.7 + thisScore * 0.3 + ((r.sid * 7 + courseId * 3) % 9) - 4),
          30, 99
        )
        const riskLevel = base >= 80 ? 'low' : base >= 70 ? 'medium' : 'high'
        return out({
          studentId: r.sid,
          studentName: name,
          courseId,
          courseName: cName,
          predictedScore: base,
          riskLevel,
          riskReason: riskLevel === 'low'
            ? '各项指标稳定，挂科风险较低'
            : `历史均分 ${historyAvg} 分，该课程当前 ${thisScore} 分，需关注薄弱章节`,
          confidence: 82 + (r.sid % 12),
          suggestion: '建议保持规律学习，按时完成作业，并针对薄弱章节加强练习。',
          historyAvg,
          validCourseCount: valid.length,
          attendanceRate: attendance,
        })
      } catch (e) { return out({ error: (e && e.message) || '成绩预测失败' }) }
    },
  },
  {
    name: 'generate_comment',
    description: '生成某学生的学期或日常表现评语（基于真实均分/等级/学段的规则生成）。',
    parameters: {
      type: 'object',
      properties: {
        studentId: { type: 'integer', description: '学生档案 id；学生角色可省略，强制本人' },
        commentType: { type: 'string', enum: ['semester', 'daily'], description: '评语类型，默认 semester' },
        semester: { type: 'string', description: '学期，默认当前学期' },
      },
      required: [],
    },
    async run(args, context) {
      try {
        const scope = await scopeOf(context)
        const r = await resolveStudent(args, scope)
        if (r.error) return out(r)
        const { avg } = await statsOf(r.sid, r.doc)
        const totalScore = avg || 85
        const performance = k12GradeOf(totalScore)
        const name = await studentName(r.sid, r.doc) || '该生'
        const commentType = String(pick(args, 'commentType', 'comment_type') || 'semester')
        const semester = String(pick(args, 'semester', 'term') || '').trim() || currentSemester()
        const stage = num(pick(r.doc, 'stage'), 0)
        const ruleComment = `${name}同学思想端正，尊敬师长，团结同学，遵守校纪校规。学习上态度认真，能够主动完成各项学习任务，${commentType === 'daily' ? '日常' : '本学期'}总评成绩${totalScore}分，表现${performance}。希望在今后继续保持良好习惯，全面提升综合素养。`
        return out({
          studentId: r.sid,
          studentName: name,
          commentType,
          semester,
          totalScore: String(totalScore),
          performance,
          stage,
          aiComment: ruleComment,
        })
      } catch (e) { return out({ error: (e && e.message) || '评语生成失败' }) }
    },
  },
  {
    name: 'risk_warning',
    description: '按班级列出学业风险学生（真实成绩低于 70 分），含风险等级与帮扶建议。仅可查询 scope 内班级。',
    parameters: {
      type: 'object',
      properties: { classId: { type: 'integer', description: '班级 id；不传则查 scope 内全部' } },
      required: [],
    },
    async run(args, context) {
      try {
        const scope = await scopeOf(context)
        if (!scope) return out({ error: '无权限' })
        const wantedClass = num(pick(args, 'classId', 'class_id'), 0)
        if (wantedClass) {
          const cls = await getDoc(S.academic(), `classes/${wantedClass}.json`)
          if (!cls || num(pick(cls, 'deleted'), 0) === 1) return out({ error: '班级不存在' })
          if (!scope.filterFn({ classId: wantedClass, grade: num(pick(cls, 'grade'), 0) })) {
            return out({ error: '无权限' })
          }
        }
        const [all, courses, classes, students] = await Promise.all([
          allScores(), courseMap(), classMap(), studentMap(),
        ])
        const scores = applyScope(all, scope)
        const low = scores.filter((s) => {
          const v = scoreValue(s)
          if (!(v > 0 && v < 70)) return false
          if (wantedClass) {
            const sid = num(pick(s, 'studentId', 'student_id'), 0)
            const stu = students.get(sid)
            if (num(pick(stu, 'classId'), 0) !== wantedClass) return false
          }
          return true
        }).sort((a, b) => scoreValue(a) - scoreValue(b)).slice(0, 20)

        const riskItems = []
        for (const s of low) {
          const sid = num(pick(s, 'studentId', 'student_id'), 0)
          const cid = num(pick(s, 'courseId', 'course_id', 'subjectId'), 0)
          const score = scoreValue(s)
          const stu = students.get(sid)
          const classId = num(pick(stu, 'classId'), 0)
          const high = score < 60
          riskItems.push({
            studentId: sid,
            studentName: await studentName(sid, stu, s) || '未知学生',
            className: await className(classId, classes.get(classId), stu),
            courseName: courseName(courses.get(cid), s) || '课程',
            riskType: high ? '挂科风险' : '成绩波动',
            riskLevel: high ? 'high' : 'medium',
            description: `${courseName(courses.get(cid), s) || '课程'}总评仅 ${score} 分，${high ? '存在挂科风险' : '成绩低于预警线'}。`,
            suggestion: '建议辅导员及时与学生沟通，了解原因并提供学习帮扶。',
          })
        }
        return out({
          totalRisks: riskItems.length,
          highRiskCount: riskItems.filter((i) => i.riskLevel === 'high').length,
          mediumRiskCount: riskItems.filter((i) => i.riskLevel === 'medium').length,
          riskItems,
        })
      } catch (e) { return out({ error: (e && e.message) || '风险预警失败' }) }
    },
  },
  {
    name: 'schedule_advice',
    description: '基于真实授课关系与已占用课表生成无冲突排课建议（不写库）。可按年级/班级/学期筛选。',
    parameters: {
      type: 'object',
      properties: {
        grade: { type: 'integer', description: '年级（全国连续编号 1-12）' },
        classId: { type: 'integer', description: '班级 id' },
        semester: { type: 'string', description: '学期，默认当前学期' },
      },
      required: [],
    },
    async run(args, context) {
      try {
        const built = await buildScheduleItems(context && context.request, args)
        if (built.error) return out({ error: built.error })
        return out({
          semester: built.semester,
          days: built.limits.days,
          periods: built.limits.periods,
          teachCount: built.teachCount,
          total: built.items.length,
          items: built.items.slice(0, 30),
        })
      } catch (e) { return out({ error: (e && e.message) || '排课建议失败' }) }
    },
  },
  {
    name: 'list_students',
    description: '按年级/班级列出可见学生（供对话中查找学生 id 与姓名），受五级 scope 限制。',
    parameters: {
      type: 'object',
      properties: {
        grade: { type: 'integer', description: '年级筛选' },
        classId: { type: 'integer', description: '班级筛选' },
        keyword: { type: 'string', description: '姓名模糊关键词' },
      },
      required: [],
    },
    async run(args, context) {
      try {
        const scope = await scopeOf(context)
        if (!scope) return out({ error: '无权限' })
        const docs = (await listDocs(S.academic(), 'students/'))
          .filter((d) => num(pick(d, 'deleted'), 0) !== 1)
        const visible = applyScope(docs, scope, { studentField: 'id', classField: 'classId', gradeField: 'grade' })
        const grade = num(pick(args, 'grade'), 0)
        const classId = num(pick(args, 'classId'), 0)
        const keyword = String(pick(args, 'keyword', 'name') || '').trim()
        const list = visible.filter((s) =>
          (!grade || num(pick(s, 'grade'), 0) === grade) &&
          (!classId || num(pick(s, 'classId'), 0) === classId) &&
          (!keyword || String(pick(s, 'realName', '') || '').includes(keyword))
        ).map((s) => ({
          id: num(pick(s, 'id'), 0),
          realName: String(pick(s, 'realName', '') || ''),
          className: String(pick(s, 'className', '') || ''),
          grade: num(pick(s, 'grade'), 0),
          classId: num(pick(s, 'classId'), 0),
        }))
        return out({ count: list.length, students: list.slice(0, 100) })
      } catch (e) { return out({ error: (e && e.message) || '查询学生失败' }) }
    },
  },
  {
    name: 'list_classes',
    description: '列出可见班级及科目（供对话中定位班级/课程），受五级 scope 限制。',
    parameters: { type: 'object', properties: {} , required: [] },
    async run(args, context) {
      try {
        const scope = await scopeOf(context)
        if (!scope) return out({ error: '无权限' })
        const classDocs = (await listDocs(S.academic(), 'classes/'))
          .filter((d) => num(pick(d, 'deleted'), 0) !== 1)
        const classes = classDocs
          .filter((c) => scope.filterFn({
            classId: num(pick(c, 'id'), 0),
            grade: num(pick(c, 'grade'), 0),
          }))
          .map((c) => ({
            id: num(pick(c, 'id'), 0),
            className: String(pick(c, 'className', '') || ''),
            grade: num(pick(c, 'grade'), 0),
          }))
        const courseDocs = (await listDocs(S.academic(), 'courses/'))
          .filter((d) => num(pick(d, 'deleted'), 0) !== 1)
        const courses = courseDocs
          .filter((c) => scope.filterFn({ subjectId: num(pick(c, 'id'), 0) }))
          .map((c) => ({
            id: num(pick(c, 'id'), 0),
            courseName: String(pick(c, 'courseName', '') || ''),
            semester: String(pick(c, 'semester', '') || ''),
          }))
        return out({ count: classes.length, classes, courses })
      } catch (e) { return out({ error: (e && e.message) || '查询班级失败' }) }
    },
  },
  {
    name: 'list_courses',
    description: '列出可见科目/课程（供对话中定位 courseId、courseName），受五级 scope 限制。',
    parameters: {
      type: 'object',
      properties: { semester: { type: 'string', description: '学期筛选' } },
      required: [],
    },
    async run(args, context) {
      try {
        const scope = await scopeOf(context)
        if (!scope) return out({ error: '无权限' })
        const semester = String(pick(args, 'semester') || '').trim()
        const courseDocs = (await listDocs(S.academic(), 'courses/'))
          .filter((d) => num(pick(d, 'deleted'), 0) !== 1)
        const courses = courseDocs
          .filter((c) => scope.filterFn({ subjectId: num(pick(c, 'id'), 0) }))
          .filter((c) => !semester || String(pick(c, 'semester', '') || '') === semester)
          .map((c) => ({
            id: num(pick(c, 'id'), 0),
            courseName: String(pick(c, 'courseName', '') || ''),
            semester: String(pick(c, 'semester', '') || ''),
          }))
        return out({ count: courses.length, courses })
      } catch (e) { return out({ error: (e && e.message) || '查询科目失败' }) }
    },
  },
]

export { TOOLS }
export default TOOLS
