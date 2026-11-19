/** GET /api/class/page */
import { S, ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { pagedOrdered, stripRecords } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const q = context.request.query || {}
    const name = q.className ? String(q.className).trim() : ''
    const filter = (x) => !name || String(x.className || '').includes(name)
    return json(ok(stripRecords(await pagedOrdered(S.academic(), 'classes/', q, filter, true))))
  } catch (e) {
    return json(fail(e?.message || '查询班级失败', 500))
  }
}
