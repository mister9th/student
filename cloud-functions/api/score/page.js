/** GET /api/score/page（单考次模型过滤；P1 §4.2 年级组长按 manageGrades 经班级 grade 强制过滤） */
import { S, ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { pagedOrdered, stripRecords, num, currentUser, requirePermission } from '../../_lib/util.js'

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
    let filter = (x) =>
      (!studentId || Number(x.studentId) === studentId) &&
      (!subjectId || Number(x.subjectId) === subjectId) &&
      (!classId || Number(x.classId) === classId) &&
      (!examType || Number(x.examType) === examType) &&
      (!semester || String(x.semester || '') === semester) &&
      (!examName || String(x.examName || '').includes(examName))

    const user = await currentUser(context)
    const guard = await requirePermission(context, 'score:list')
    if (guard instanceof Response) return guard
    if (user && Number(user.userType) === 4) {
      const grades = Array.isArray(user.manageGrades) ? user.manageGrades.map(Number).filter(Number.isFinite) : []
      const gs = new Set(grades)
      const base = filter
      if (!gs.size) {
        filter = () => false
      } else {
        // 成绩文档无 grade 字段：经班级档案 classId -> grade 映射
        const academic = S.academic()
        const { blobs } = await academic.list({ prefix: 'classes/' })
        const classes = await Promise.all(blobs.map((b) => academic.get(b.key, { type: 'json' })))
        const classIds = new Set(classes
          .filter((c) => c && c.deleted !== 1 && gs.has(Number(c.grade)))
          .map((c) => num(c.id, 0)))
        filter = (x) => (classIds.has(Number(x.classId)) || gs.has(Number(x.grade))) && base(x)
      }
    }
    return json(ok(stripRecords(await pagedOrdered(S.academic(), 'scores/', q, filter, true))))
  } catch (e) {
    return json(fail(e?.message || '查询成绩失败', 500))
  }
}
