/** GET /api/user/teacher/page */
import { S, ok, fail, json } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { pagedOrdered, stripRecords, requirePermission } from '../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'teacher:list')
    if (guard instanceof Response) return guard
    const q = context.request.query || {}
    const name = q.realName ? String(q.realName).trim() : ''
    const no = q.teacherNo ? String(q.teacherNo).trim() : ''
    const filter = (x) =>
      (!name || String(x.realName || '').includes(name)) &&
      (!no || String(x.teacherNo || '').includes(no))
    return json(ok(stripRecords(await pagedOrdered(S.academic(), 'teachers/', q, filter, true))))
  } catch (e) {
    return json(fail(e?.message || '查询教师失败', 500))
  }
}
