/** GET /api/moral/redflag —— 流动红旗列表（P3，占位数据结构；复杂计算引擎按方案最后做） */
import { S, ok, fail, json } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, num } from '../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const user = await requirePermission(context, 'redflag:list')
    if (user instanceof Response) return user
    const store = S.moral()
    const { blobs } = await store.list({ prefix: 'redflag/' })
    let items = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
    items = items.filter((x) => x && x.deleted !== 1).sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0))
    items.forEach((x, i) => { x.rank = i + 1 })
    const q = context.request.query || {}
    const page = Math.max(1, Number(q.page) || 1)
    const pageSize = Math.min(500, Math.max(1, Number(q.pageSize) || 10))
    return json(ok({ total: items.length, records: items.slice((page - 1) * pageSize, page * pageSize), page, pageSize, totalPages: Math.ceil(items.length / pageSize) }))
  } catch (e) {
    return json(fail(e?.message || '流动红旗查询失败', 500))
  }
}
