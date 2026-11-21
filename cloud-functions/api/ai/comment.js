/**
 * POST /api/ai/comment —— AI 学生评语生成（P1 §5：分学段措辞 + 等级口径统一）
 * ------------------------------------------------------------------
 * - 数据源：Blob 该生真实成绩与学生/课程/五育/德育文档
 * - AI Gateway 生成评语；无凭据/失败时用真实总评均分规则兜底
 * - 评语落 Blob `edu-ai/comments/<studentId>/<id>.json`
 * - 输出新增 stage/grade/gradeLabel/semester（原字段保留，兼容前端）
 * - 导出 buildComment 供 /api/ai/term-comment 复用同款 prompt（P1 §6）
 */
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission } from '../../_lib/util.js'
import { S, ok, fail, json, bodyOf, now } from '../../_lib/store.js'
import { STAGES, GRADE_NAMES, gradeLabel, k12GradeOf, currentSemester } from '../../_lib/k12.js'
import {
  askAI, pick, num, getDoc, scoresOf, courseMap, studentName,
  courseName, scoreValue, ownStudentIdOf,
} from './_shared.js'

const SYSTEM_PROMPTS = {
  1: '你是小学班主任评语助手。用简体中文写 120-180 字，语气温暖鼓励、多用具体事例（发言、劳动、同伴互助），侧重习惯养成与兴趣发展，不强调分数排名。直接输出正文，不要 markdown。',
  2: '你是初中班主任评语助手。用简体中文写 120-180 字，语气客观中肯，侧重学习方法、习惯养成、学科均衡与青春期引导，可用等级（优秀/良好/合格/待提高）代替具体分数。直接输出正文，不要 markdown。',
  3: '你是高中班主任评语助手。用简体中文写 120-180 字，语气理性务实，侧重学业规划、选科方向、升学导向与自主发展，可结合学科表现。直接输出正文，不要 markdown。',
}

/** 五育标签摘要：优先取最近标签，无标签时回退到五育汇总分值 */
async function fiveEduSummary(studentId, fiveEdu) {
  try {
    const { blobs } = await S.moral().list({ prefix: 'fiveedu/' })
    const docs = await Promise.all(blobs.map((b) => S.moral().get(b.key, { type: 'json' })))
    const tags = [...new Set(docs
      .filter((d) => d && d.deleted !== 1 && num(d.studentId, 0) === studentId)
      .flatMap((d) => (Array.isArray(d.tags) ? d.tags : []))
      .map((t) => String(t).trim()).filter(Boolean))].slice(0, 8)
    if (tags.length) return tags.join('、')
  } catch { /* 五育 store 不可用时回退汇总分值 */ }
  if (fiveEdu && typeof fiveEdu === 'object') {
    return `德${num(fiveEdu.de, 0)}/智${num(fiveEdu.zhi, 0)}/体${num(fiveEdu.ti, 0)}/美${num(fiveEdu.mei, 0)}/劳${num(fiveEdu.lao, 0)}`
  }
  return '暂无'
}

/**
 * 生成评语正文与派生字段（不落库）。comment.js 与 term-comment 共用同款 prompt。
 */
export async function buildComment(context, studentId, commentType = 'semester', term = '') {
  const academic = S.academic()
  const studentDoc = await getDoc(academic, `students/${studentId}.json`)
  const scores = await scoresOf(studentId)
  const valid = scores.map(scoreValue).filter((v) => v > 0)
  const totalScore = valid.length
    ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length)
    : 85

  const name = await studentName(studentId, studentDoc, scores[0]) || '演示学生'
  const performance = k12GradeOf(totalScore)

  const stage = num(pick(studentDoc, 'stage'), 0)
  const grade = num(pick(studentDoc, 'grade'), 0)
  const gLabel = gradeLabel(stage, grade)
  const semester = String(term || '').trim() || currentSemester()
  const moralScore = num(pick(studentDoc, 'moralScore'), 0)
  const fiveEdu = pick(studentDoc, 'fiveEdu')
  const tags = await fiveEduSummary(studentId, fiveEdu)

  const courses = await courseMap()
  const courseNames = scores
    .map((s) => courseName(courses.get(num(pick(s, 'courseId', 'course_id', 'subjectId'), 0)), s))
    .filter(Boolean)

  // 规则兜底评语（基于真实总评与统一等级口径 D7）
  const ruleComment = `${name}同学思想端正，尊敬师长，团结同学，遵守校纪校规。学习上态度认真，能够主动完成各项学习任务，本学期总评成绩${totalScore}分，表现${performance}。${tags && tags !== '暂无' ? `五育表现：${tags}。` : ''}希望在今后的学习中继续保持良好习惯，全面提升综合素养。`

  const aiText = await askAI(context.env, [
    { role: 'system', content: SYSTEM_PROMPTS[stage] || SYSTEM_PROMPTS[1] },
    {
      role: 'user',
      content: `学生姓名：${name}；学段：${STAGES[stage] || '未设置'}；年级：${GRADE_NAMES[grade] || '未设置'}；修读课程：${courseNames.slice(0, 6).join('、') || '多门课程'}；五育表现：${tags}；德育分：${moralScore}；真实均分：${totalScore} 分；等级：${performance}；共有 ${valid.length} 门课程成绩；学期：${semester}。请据此生成${commentType === 'daily' ? '日常表现' : '学期'}评语。`,
    },
  ], { temperature: 0.7, maxTokens: 512 })

  return {
    studentName: name,
    totalScore: String(totalScore),
    performance,
    aiComment: aiText && aiText.length >= 20 ? aiText : ruleComment,
    stage,
    grade,
    gradeLabel: gLabel,
    semester,
  }
}

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'ai')
    if (guard instanceof Response) return guard
    const body = await bodyOf(context.request)
    let studentId = num(pick(body, 'studentId', 'student_id'), 0)
    if (Number(guard.userType) === 1) {
      studentId = await ownStudentIdOf(guard, S.academic())
      if (!studentId) return json(fail('未定位到学生档案', 403), 403)
    }
    const commentType = String(pick(body, 'commentType', 'comment_type') || 'semester')
    const term = String(pick(body, 'term', 'semester') || '')
    if (!studentId) return json(fail('缺少 studentId', 400), 400)

    const result = await buildComment(context, studentId, commentType, term)
    // 落库评语记录（失败不影响主流程）
    try {
      await S.ai().setJSON(`comments/${studentId}/${Date.now()}-${Math.random().toString(36).slice(2, 6)}.json`, {
        studentId,
        studentName: result.studentName,
        commentType,
        totalScore: result.totalScore,
        performance: result.performance,
        aiComment: result.aiComment,
        createdAt: Date.now(),
        time: now(),
      })
    } catch { /* 落库失败不影响主流程 */ }

    return json(ok({
      studentName: result.studentName,
      totalScore: result.totalScore,
      performance: result.performance,
      aiComment: result.aiComment,
      stage: result.stage,
      grade: result.grade,
      gradeLabel: result.gradeLabel,
      semester: result.semester,
    }))
  } catch (e) {
    return json(fail(`评语生成失败：${(e && e.message) || '未知错误'}`))
  }
}
