/** GET/PUT/DELETE /api/score/{id}（K12 单考次模型，PUT 重算 gradeLevel） */
import { S, ok, fail, json, bodyOf, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { num, k12GradeOf, currentSemester, strip } from '../../_lib/util.js'

const pad2 = (n) => String(n).padStart(2, '0')
const today = () => {
  const d = new Date()
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
}

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const id = String(context.params?.id || '').replace(/\D/g, '')
    const method = context.request.method
    const store = S.academic()
    const key = `scores/${id}.json`
    const doc = await store.get(key, { type: 'json' })

    if (method === 'GET') return json(ok(!doc || doc.deleted === 1 ? null : strip(doc)))
    if (!doc || doc.deleted === 1) return json(ok(null))

    if (method === 'DELETE') {
      await store.setJSON(key, { ...doc, deleted: 1, updateTime: now() })
      return json(ok(null))
    }
    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const studentId = body.studentId !== undefined ? num(body.studentId, 0) : num(doc.studentId, 0)
      const subjectId = body.subjectId !== undefined ? num(body.subjectId, 0) : num(doc.subjectId, 0)
      if (!studentId) return json(fail('学生不能为空', 400))
      if (!subjectId) return json(fail('科目不能为空', 400))
      const examName = body.examName !== undefined ? String(body.examName || '').trim() : String(doc.examName || '')
      if (!examName) return json(fail('考试名称不能为空', 400))
      const rawScore = body.score !== undefined ? num(body.score, NaN) : num(doc.score, NaN)
      if (!Number.isFinite(rawScore) || rawScore < 0 || rawScore > 100) return json(fail('分数需在 0-100 之间', 400))
      const examType = body.examType !== undefined ? num(body.examType, 0) : num(doc.examType, 3)
      if (examType < 1 || examType > 5) return json(fail('考试类型不合法（1-5）', 400))
      const examDate = body.examDate !== undefined ? (String(body.examDate || '').trim() || today()) : String(doc.examDate || '')

      // 学生/科目变更时同步冗余字段（宽松处理：查不到置空）
      const student = studentId !== num(doc.studentId, 0) ? await store.get(`students/${studentId}.json`, { type: 'json' }) : null
      const subject = subjectId !== num(doc.subjectId, 0) ? await store.get(`courses/${subjectId}.json`, { type: 'json' }) : null
      const semester = body.semester !== undefined
        ? String(body.semester || '').trim()
        : (subject?.semester || doc.semester || currentSemester())
      await store.setJSON(key, {
        ...doc,
        studentId,
        studentName: student?.realName || doc.studentName || '',
        classId: student ? (student.classId ?? null) : doc.classId ?? null,
        className: student ? (student.className || '') : doc.className || '',
        subjectId,
        subjectName: subject ? (subject.courseName || '') : doc.subjectName || '',
        examName, examType, examDate, semester,
        score: rawScore, gradeLevel: k12GradeOf(rawScore),
        teacherId: subject ? (subject.teacherId ?? null) : doc.teacherId ?? null,
        comment: body.comment !== undefined ? String(body.comment || '') : doc.comment || '',
        updateTime: now(),
      })
      return json(ok(null))
    }
    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '操作成绩失败', 500))
  }
}
