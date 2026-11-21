/** POST /api/message/send-all —— 给全部学生批量发消息 */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'message')
    if (guard instanceof Response) return guard
    const body = await bodyOf(context.request)
    const academic = S.academic()
    const content = S.content()
    const { blobs } = await academic.list({ prefix: 'students/' })
    const students = await Promise.all(blobs.map((b) => academic.get(b.key, { type: 'json' })))
    const userIds = [...new Set(
      students.filter((s) => s && s.deleted !== 1 && s.userId).map((s) => Number(s.userId))
    )]
    if (!userIds.length) return json(ok({ count: 0 }))

    const base = await nextId(content, 'messages/')
    const ts = now()
    const jobs = userIds.map((receiverId, i) => () => content.setJSON(`messages/${base + i}.json`, {
      id: base + i, senderId: guard.id ?? guard.userId ?? 1, receiverId,
      title: String(body.title || ''), content: String(body.content || ''),
      messageType: String(body.messageType || 'system'),
      isRead: 0, readTime: null, createTime: ts, deleted: 0,
    }))
    for (let i = 0; i < jobs.length; i += 30) {
      await Promise.all(jobs.slice(i, i + 30).map((fn) => fn()))
    }
    return json(ok({ count: userIds.length }))
  } catch (e) {
    return json(fail(e?.message || '群发失败', 500))
  }
}
