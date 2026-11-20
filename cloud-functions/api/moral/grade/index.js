/** GET /api/moral/grade —— 年段工作列表（P3，占位数据结构） */
import { S, ok, fail, json } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission } from '../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const user = await requirePermission(context, 'grade:list')
    if (user instanceof Response) return user
    const store = S.moral()
    const q = context.request.query || {}
    const type = String(q.type || '')
    const { blobs } = await store.list({ prefix: 'grade/' })
    let items = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
    items = items.filter((x) => x && x.deleted !== 1 && (!type || x.type === type)).sort((a, b) => (b.id || 0) - (a.id || 0))
    const page = Math.max(1, Number(q.page) || 1)
    const pageSize = Math.min(500, Math.max(1, Number(q.pageSize) || 10))
    return json(ok({ total: items.length, records: items.slice((page - 1) * pageSize, page * pageSize), page, pageSize, totalPages: Math.ceil(items.length / pageSize) }))
  } catch (e) {
    return json(fail(e?.message || '年段工作查询失败', 500))
  }
}
