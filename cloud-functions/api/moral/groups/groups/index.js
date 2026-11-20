/** GET/POST /api/moral/groups/groups —— 真实小组列表与新增（POST body {schemeId,name}） */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../../../_lib/store.js'
import { ensureSeeded } from '../../../../_lib/seed.js'
import { requirePermission, num } from '../../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = context.request.method
    const user = await requirePermission(context, method === 'GET' ? 'group:list' : 'group:add')
    if (user instanceof Response) return user
    const store = S.moral()

    if (method === 'GET') {
      const q = context.request.query || {}
      const schemeId = q.schemeId ? num(q.schemeId, 0) : 0
      const { blobs } = await store.list({ prefix: 'groups/' })
      let items = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
      items = items.filter((x) => x && x.deleted !== 1 && (!schemeId || num(x.schemeId, 0) === schemeId))
      items.sort((a, b) => (num(a.sortOrder, 0) - num(b.sortOrder, 0)) || ((a.id || 0) - (b.id || 0)))
      return json(ok({ records: items, total: items.length }))
    }

    if (method === 'POST') {
      const body = await bodyOf(context.request)
      const schemeId = num(body.schemeId, 0)
      const name = String(body.name || '').trim()
      if (!schemeId) return json(fail('分组方案不能为空', 400))
      if (!name) return json(fail('小组名称不能为空', 400))
      const scheme = await store.get(`schemes/${schemeId}.json`, { type: 'json' })
      if (!scheme || scheme.deleted === 1) return json(fail('分组方案不存在', 400))
      // colorIndex = (已有真实组最大 colorIndex + 1) % 8
      const { blobs } = await store.list({ prefix: 'groups/' })
      const groups = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
      const real = groups.filter((x) => x && x.deleted !== 1 && num(x.schemeId, 0) === schemeId && num(x.isUnassigned, 0) !== 1)
      const maxColor = real.reduce((m, x) => Math.max(m, num(x.colorIndex, 0)), -1)
      const id = await nextId(store, 'groups/')
      await store.setJSON(`groups/${id}.json`, {
        id, schemeId, name, isUnassigned: 0,
        colorIndex: (maxColor + 1) % 8,
        sortOrder: num(body.sortOrder, 0), createTime: now(), deleted: 0,
      })
      return json(ok({ id }))
    }

    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '小组操作失败', 500))
  }
}
