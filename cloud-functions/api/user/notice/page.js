/** GET /api/user/notice/page */
import { S, ok, fail, json, paged } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { stripRecords } from '../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const q = context.request.query || {}
    const title = q.title ? String(q.title).trim() : ''
    const filter = (x) => !title || String(x.title || '').includes(title)
    return json(ok(stripRecords(await paged(S.content(), 'notices/', q, filter))))
  } catch (e) {
    return json(fail(e?.message || '查询公告失败', 500))
  }
}
