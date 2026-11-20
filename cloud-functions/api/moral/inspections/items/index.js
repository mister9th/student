/** GET/POST /api/moral/inspections/items —— 检查项目配置列表与新增 */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../../../_lib/store.js'
import { ensureSeeded } from '../../../../_lib/seed.js'
import { requirePermission, num } from '../../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = context.request.method
    const user = await requirePermission(context, method === 'GET' ? 'inspection:list' : 'inspection:add')
    if (user instanceof Response) return user
    const store = S.moral()

    if (method === 'GET') {
      const q = context.request.query || {}
      const active = q.active !== undefined && q.active !== '' ? num(q.active, 1) : null
      const { blobs } = await store.list({ prefix: 'inspection-items/' })
      let items = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
      items = items
        .filter((x) => x && x.deleted !== 1 && (active === null || num(x.active, 1) === active))
        .sort((a, b) => String(b.createTime || '').localeCompare(String(a.createTime || '')))
      return json(ok({ records: items, total: items.length }))
    }

    if (method === 'POST') {
      const body = await bodyOf(context.request)
      const name = String(body.name || '').trim()
      if (!name) return json(fail('项目名称不能为空', 400))
      const id = await nextId(store, 'inspection-items/')
      await store.setJSON(`inspection-items/${id}.json`, {
        id, name,
        description: String(body.description || ''),
        maxScore: num(body.maxScore, 100),
        weight: num(body.weight, 1),
        active: body.active === undefined ? 1 : (num(body.active, 1) ? 1 : 0),
        createTime: now(), deleted: 0,
      })
      return json(ok({ id }))
    }

    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '检查项目操作失败', 500))
  }
}
