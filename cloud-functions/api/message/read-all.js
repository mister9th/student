/** PUT /api/message/read-all —— 全部标记已读 */
import { S, ok, fail, json, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'message')
    if (guard instanceof Response) return guard
    const store = S.content()
    const { blobs } = await store.list({ prefix: 'messages/' })
    const ts = now()
    const jobs = []
    for (const b of blobs) {
      jobs.push(async () => {
        const doc = await store.get(b.key, { type: 'json' })
        if (doc && doc.deleted !== 1 && Number(doc.isRead) !== 1) {
          await store.setJSON(b.key, { ...doc, isRead: 1, readTime: ts })
        }
      })
    }
    for (let i = 0; i < jobs.length; i += 30) {
      await Promise.all(jobs.slice(i, i + 30).map((fn) => fn()))
    }
    return json(ok(null))
  } catch (e) {
    return json(fail(e?.message || '标记已读失败', 500))
  }
}
