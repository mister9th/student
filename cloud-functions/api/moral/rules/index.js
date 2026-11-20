/** GET /api/moral/rules —— 规则列表；POST /api/moral/rules —— 新增规则 */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, num, pagedOrdered, stripRecords } from '../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = context.request.method
    const guard = await requirePermission(context, method === 'GET' ? 'moral:list' : 'moral:add')
    if (guard instanceof Response) return guard
    const store = S.moral()

    if (method === 'GET') {
      return json(ok(stripRecords(await pagedOrdered(store, 'rules/', context.request.query || {}, null, false))))
    }
    if (method === 'POST') {
      const body = await bodyOf(context.request)
      const name = String(body.name || '').trim()
      if (!name) return json(fail('规则名称不能为空', 400))
      const id = await nextId(store, 'rules/')
      await store.setJSON(`rules/${id}.json`, {
        id,
        category: String(body.category || ''),
        name,
        scoreChange: num(body.scoreChange, 0),
        minScore: body.minScore === undefined || body.minScore === null || body.minScore === '' ? 0 : num(body.minScore, 0),
        maxScore: body.maxScore === undefined || body.maxScore === null || body.maxScore === '' ? 100 : num(body.maxScore, 100),
        active: body.active === undefined || body.active === null ? 1 : num(body.active, 1),
        createTime: now(),
        deleted: 0,
      })
      return json(ok({ id }))
    }
    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '德育规则操作失败', 500))
  }
}
