/** POST /api/score —— 录入成绩（K12 单考次模型；P1 可选 examId 覆盖冗余字段） */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { num, k12GradeOf, currentSemester, requirePermission } from '../../_lib/util.js'
import { loadTeachings, findTeachingTeacherId } from '../../_lib/score-join.js'
import { buildScope } from '../../_lib/scope.js'

const pad2 = (n) => String(n).padStart(2, '0')
const today = () => {
  const d = new Date()
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
}

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'score:add')
    if (guard instanceof Response) return guard
    const body = await bodyOf(context.request)
    const store = S.academic()
    const studentId = num(body.studentId, 0)
    const subjectId = num(body.subjectId, 0)
    if (!studentId) return json(fail('学生不能为空', 400))
    if (!subjectId) return json(fail('科目不能为空', 400))

    // P1 §1.3：可选 examId；命中考试时用考试字段覆盖冗余展示字段（不清库、不级联删）
    const examId = num(body.examId, 0)
    let exam = null
    if (examId > 0) {
      const found = await S.exam().get(`exams/${examId}.json`, { type: 'json' })
      if (found && found.deleted !== 1) exam = found
    }
    const examName = String(exam?.examName ?? body.examName ?? '').trim()
    if (!examName) return json(fail('考试名称不能为空', 400))
    const score = num(body.score, NaN)
    if (!Number.isFinite(score) || score < 0 || score > 100) return json(fail('分数需在 0-100 之间', 400))
    const examType = exam ? num(exam.examType, 3)
      : (body.examType === undefined || body.examType === null || body.examType === '' ? 3 : num(body.examType, 0))
    if (examType < 1 || examType > 5) return json(fail('考试类型不合法（1-5）', 400))
    const examDate = exam ? String(exam.examDate || '')
      : (String(body.examDate || '').trim() || today())

    // 学生/班级/科目不存在时宽松处理：冗余名查不到置空
    const student = await store.get(`students/${studentId}.json`, { type: 'json' })
    const subject = await store.get(`courses/${subjectId}.json`, { type: 'json' })
    const semester = exam ? String(exam.semester || '')
      : (String(body.semester || '').trim() || subject?.semester || currentSemester())

    // K12-P4 §2：teacherId 优先按 (subjectId, 学生 classId, semester) 查授课关系，
    // 查不到回退 course.teacherId（兼容存量）。
    const classId = student?.classId ?? null
    const taughtTeacherId = findTeachingTeacherId({ teachings: await loadTeachings() }, subjectId, classId, semester)
    const teacherId = taughtTeacherId !== null ? taughtTeacherId : (subject?.teacherId ?? null)

    // K12-P4 §3.2：教师写操作必须落在自己的 scope 内，防止跨班/跨科录入
    const scope = await buildScope(context)
    if (!scope.filterFn({ studentId, classId, subjectId, semester })) {
      return json(fail('无权为该学生/科目录入成绩', 403), 403)
    }

    const id = await nextId(store, 'scores/')
    const ts = now()
    await store.setJSON(`scores/${id}.json`, {
      id, studentId, studentName: student?.realName || '',
      classId: student?.classId ?? null, className: student?.className || '',
      subjectId, subjectName: subject?.courseName || '',
      examId, examName, examType, examDate, semester,
      score, gradeLevel: k12GradeOf(score),
      teacherId, comment: String(body.comment || ''),
      createTime: ts, updateTime: ts, deleted: 0,
    })
    return json(ok({ id }))
  } catch (e) {
    return json(fail(e?.message || '录入成绩失败', 500))
  }
}
