/** GET /api/course/page */
import { S, ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { pagedOrdered, stripRecords, requirePermission } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'course:list')
    if (guard instanceof Response) return guard
    const q = context.request.query || {}
    const name = q.courseName ? String(q.courseName).trim() : ''
    const semester = q.semester ? String(q.semester).trim() : ''
    const teacherId = q.teacherId ? Number(q.teacherId) : null
    const filter = (x) =>
      (!name || String(x.courseName || '').includes(name)) &&
      (!semester || String(x.semester || '') === semester) &&
      (!teacherId || Number(x.teacherId) === teacherId)
    return json(ok(stripRecords(await pagedOrdered(S.academic(), 'courses/', q, filter, true))))
  } catch (e) {
    return json(fail(e?.message || '查询课程失败', 500))
  }
}
