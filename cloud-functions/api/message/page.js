/** GET /api/message/page */
import { S, ok, fail, json, paged } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { stripRecords } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const q = context.request.query || {}
    const receiverId = q.receiverId ? Number(q.receiverId) : null
    const filter = (x) => !receiverId || Number(x.receiverId) === receiverId
    return json(ok(stripRecords(await paged(S.content(), 'messages/', q, filter))))
  } catch (e) {
    return json(fail(e?.message || '查询消息失败', 500))
  }
}
