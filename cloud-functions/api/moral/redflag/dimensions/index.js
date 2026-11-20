/** GET/POST /api/moral/redflag/dimensions —— 评分维度（GET 附各自 rules；POST 新增） */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../../../_lib/store.js'
import { ensureSeeded } from '../../../../_lib/seed.js'
import { requirePermission, num } from '../../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = context.request.method
    const user = await requirePermission(context, method === 'GET' ? 'redflag:list' : 'redflag:add')
    if (user instanceof Response) return user
    const store = S.moral()

    if (method === 'GET') {
      const { blobs } = await store.list({ prefix: 'redflag-dimensions/' })
      let dims = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
      dims = dims.filter((x) => x && x.deleted !== 1)
      const ruleBlobs = await store.list({ prefix: 'redflag-rules/' })
      let rules = await Promise.all(ruleBlobs.blobs.map((b) => store.get(b.key, { type: 'json' })))
      rules = rules.filter((x) => x && x.deleted !== 1)
      dims.sort((a, b) => (num(a.sortOrder, 0) - num(b.sortOrder, 0)) || ((a.id || 0) - (b.id || 0)))
      const records = dims.map((d) => ({
        ...d,
        rules: rules
          .filter((r) => num(r.dimensionId, 0) === num(d.id, 0))
          .sort((a, b) => (a.id || 0) - (b.id || 0)),
        ruleCount: rules.filter((r) => num(r.dimensionId, 0) === num(d.id, 0)).length,
      }))
      return json(ok({ records, total: records.length }))
    }

    if (method === 'POST') {
      const body = await bodyOf(context.request)
      const name = String(body.name || '').trim()
      if (!name) return json(fail('维度名称不能为空', 400))
      const id = await nextId(store, 'redflag-dimensions/')
      await store.setJSON(`redflag-dimensions/${id}.json`, {
        id, name,
        description: String(body.description || ''),
        maxScore: num(body.maxScore, 100),
        weight: num(body.weight, 1),
        active: body.active === undefined ? 1 : (num(body.active, 1) ? 1 : 0),
        sortOrder: num(body.sortOrder, 0),
        createTime: now(), deleted: 0,
      })
      return json(ok({ id }))
    }

    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '评分维度操作失败', 500))
  }
}
