/** DELETE /api/message/{id} —— 逻辑删 */
import { S, ok, fail, json, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'message')
    if (guard instanceof Response) return guard
    const id = String(context.params?.id || '').replace(/\D/g, '')
    const store = S.content()
    const key = `messages/${id}.json`
    const doc = await store.get(key, { type: 'json' })
    if (!doc) return json(ok(null))
    await store.setJSON(key, { ...doc, deleted: 1, updateTime: now() })
    return json(ok(null))
  } catch (e) {
    return json(fail(e?.message || '删除消息失败', 500))
  }
}
