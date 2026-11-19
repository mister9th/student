/** POST /api/message —— 发送单条消息 */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { num, currentUser } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const body = await bodyOf(context.request)
    const store = S.content()
    const user = await currentUser(context)
    const id = await nextId(store, 'messages/')
    await store.setJSON(`messages/${id}.json`, {
      id, senderId: user?.id || 1, receiverId: num(body.receiverId, 1),
      title: String(body.title || ''), content: String(body.content || ''),
      messageType: String(body.messageType || 'system'),
      isRead: 0, readTime: null, createTime: now(), deleted: 0,
    })
    return json(ok({ id }))
  } catch (e) {
    return json(fail(e?.message || '发送消息失败', 500))
  }
}
