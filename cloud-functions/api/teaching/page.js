/** GET /api/teaching/page —— 授课关系分页（权限 course:list） */
import { S, ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { pagedOrdered, stripRecords, num, requirePermission } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'course:list')
    if (guard instanceof Response) return guard
    const q = context.request.query || {}
    const subjectId = q.subjectId ? num(q.subjectId, 0) : 0
    const classId = q.classId ? num(q.classId, 0) : 0
    const teacherId = q.teacherId ? num(q.teacherId, 0) : 0
    const semester = q.semester ? String(q.semester).trim() : ''
    const status = q.status !== undefined && q.status !== '' && q.status !== null ? num(q.status, -1) : -1
    const filter = (x) =>
      (!subjectId || num(x.subjectId, 0) === subjectId) &&
      (!classId || num(x.classId, 0) === classId) &&
      (!teacherId || num(x.teacherId, 0) === teacherId) &&
      (!semester || String(x.semester || '') === semester) &&
      (status === -1 || num(x.status, 1) === status)
    return json(ok(stripRecords(await pagedOrdered(S.academic(), 'teachings/', q, filter, true))))
  } catch (e) {
    return json(fail(e?.message || '查询授课关系失败', 500))
  }
}
