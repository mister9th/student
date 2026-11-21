/** DELETE /api/file/{id} —— 逻辑删元数据并删除 Blob 字节 */
import { S, ok, fail, json, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = context.request.method
    const guard = await requirePermission(context, method === 'GET' ? 'file:list' : 'file')
    if (guard instanceof Response) return guard
    const id = String(context.params?.id || '').replace(/\D/g, '')
    const store = S.content()
    const key = `files/${id}.json`
    const doc = await store.get(key, { type: 'json' })
    if (!doc) return json(ok(null))
    await store.setJSON(key, { ...doc, deleted: 1, updateTime: now() })
    if (doc.fileKey) {
      try { await store.delete(doc.fileKey) } catch { /* 字节不存在时忽略 */ }
    }
    return json(ok(null))
  } catch (e) {
    return json(fail(e?.message || '删除文件失败', 500))
  }
}
