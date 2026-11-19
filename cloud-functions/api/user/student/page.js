/** GET /api/user/student/page */
import { S, ok, fail, json } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { pagedOrdered, stripRecords } from '../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const q = context.request.query || {}
    const name = q.realName ? String(q.realName).trim() : ''
    const no = q.studentNo ? String(q.studentNo).trim() : ''
    const filter = (x) =>
      (!name || String(x.realName || '').includes(name)) &&
      (!no || String(x.studentNo || '').includes(no))
    return json(ok(stripRecords(await pagedOrdered(S.academic(), 'students/', q, filter, true))))
  } catch (e) {
    return json(fail(e?.message || '查询学生失败', 500))
  }
}
