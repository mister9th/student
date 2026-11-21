/** POST /api/message —— 发送单条消息 */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { num, requirePermission } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = context.request.method
    const guard = await requirePermission(context, method === 'GET' ? 'message:list' : 'message')
    if (guard instanceof Response) return guard
    const body = await bodyOf(context.request)
    const store = S.content()
    const id = await nextId(store, 'messages/')
    await store.setJSON(`messages/${id}.json`, {
      id, senderId: guard.id ?? guard.userId ?? 1, receiverId: num(body.receiverId, 1),
      title: String(body.title || ''), content: String(body.content || ''),
      messageType: String(body.messageType || 'system'),
      isRead: 0, readTime: null, createTime: now(), deleted: 0,
    })
    return json(ok({ id }))
  } catch (e) {
    return json(fail(e?.message || '发送消息失败', 500))
  }
}
