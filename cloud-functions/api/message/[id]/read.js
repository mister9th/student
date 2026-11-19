/** PUT /api/message/{id}/read —— 单条标记已读 */
import { S, ok, fail, json, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const id = String(context.params?.id || '').replace(/\D/g, '')
    const store = S.content()
    const key = `messages/${id}.json`
    const doc = await store.get(key, { type: 'json' })
    if (!doc || doc.deleted === 1) return json(ok(null))
    await store.setJSON(key, { ...doc, isRead: 1, readTime: now() })
    return json(ok(null))
  } catch (e) {
    return json(fail(e?.message || '标记已读失败', 500))
  }
}
