/** GET/POST /api/moral/groups —— 德育小组列表与新增（P2） */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, num } from '../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const user = await requirePermission(context, context.request.method === 'GET' ? 'group:list' : 'group:add')
    if (user instanceof Response) return user
    const store = S.moral()
    const method = context.request.method

    if (method === 'GET') {
      const q = context.request.query || {}
      const classId = q.classId ? num(q.classId, 0) : 0
      const filter = (x) => !classId || num(x.classId, 0) === classId
      const { blobs } = await store.list({ prefix: 'groups/' })
      let items = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
      items = items.filter((x) => x && x.deleted !== 1 && filter(x)).sort((a, b) => (a.id || 0) - (b.id || 0))
      const page = Math.max(1, Number(q.page) || 1)
      const pageSize = Math.min(500, Math.max(1, Number(q.pageSize) || 10))
      return json(ok({ total: items.length, records: items.slice((page - 1) * pageSize, page * pageSize), page, pageSize, totalPages: Math.ceil(items.length / pageSize) }))
    }

    if (method === 'POST') {
      const body = await bodyOf(context.request)
      const name = String(body.name || '').trim()
      if (!name) return json(fail('小组名称不能为空', 400))
      const classId = num(body.classId, 0)
      const schemeId = num(body.schemeId, 0)
      const memberIds = Array.isArray(body.memberIds) ? body.memberIds.map((x) => num(x, 0)).filter(Boolean) : []
      // 应用层唯一性：同一 scheme 内学生不能重复属于多个小组（Blob 无唯一索引）
      if (schemeId) {
        const { blobs } = await store.list({ prefix: 'groups/' })
        const groups = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
        for (const g of groups) {
          if (!g || g.deleted === 1 || num(g.schemeId, 0) !== schemeId) continue
          const overlap = (g.memberIds || []).filter((id) => memberIds.includes(id))
          if (overlap.length) return json(fail(`学生已在其他小组：${overlap.join(',')}`, 400))
        }
      }
      const id = await nextId(store, 'groups/')
      const doc = { id, name, classId, schemeId, memberIds, colorIndex: num(body.colorIndex, 0), createTime: now(), deleted: 0 }
      await store.setJSON(`groups/${id}.json`, doc)
      return json(ok({ id }))
    }

    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '小组操作失败', 500))
  }
}
