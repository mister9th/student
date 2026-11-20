/** GET /api/score/page —— 单考次模型过滤：studentId/subjectId/examType/semester/classId 精确 + examName 模糊 */
import { S, ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { pagedOrdered, stripRecords } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const q = context.request.query || {}
    const studentId = q.studentId ? Number(q.studentId) : null
    const subjectId = q.subjectId ? Number(q.subjectId) : null
    const classId = q.classId ? Number(q.classId) : null
    const examType = q.examType ? Number(q.examType) : null
    const semester = q.semester ? String(q.semester).trim() : ''
    const examName = q.examName ? String(q.examName).trim() : ''
    const filter = (x) =>
      (!studentId || Number(x.studentId) === studentId) &&
      (!subjectId || Number(x.subjectId) === subjectId) &&
      (!classId || Number(x.classId) === classId) &&
      (!examType || Number(x.examType) === examType) &&
      (!semester || String(x.semester || '') === semester) &&
      (!examName || String(x.examName || '').includes(examName))
    return json(ok(stripRecords(await pagedOrdered(S.academic(), 'scores/', q, filter, true))))
  } catch (e) {
    return json(fail(e?.message || '查询成绩失败', 500))
  }
}
