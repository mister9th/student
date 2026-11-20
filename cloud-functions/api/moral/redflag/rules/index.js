/** POST /api/moral/redflag/rules —— 新增评分细则（body {dimensionId,name,description,score,ruleType}） */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, num } from '../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const user = await requirePermission(context, 'redflag:add')
    if (user instanceof Response) return user
    if (context.request.method !== 'POST') return json(fail('方法不允许', 405))
    const body = await bodyOf(context.request)
    const dimensionId = num(body.dimensionId, 0)
    const name = String(body.name || '').trim()
    const ruleType = String(body.ruleType || 'add') === 'subtract' ? 'subtract' : 'add'
    if (!dimensionId) return json(fail('所属维度不能为空', 400))
    if (!name) return json(fail('细则名称不能为空', 400))
    const store = S.moral()
    const dim = await store.get(`redflag-dimensions/${dimensionId}.json`, { type: 'json' })
    if (!dim || dim.deleted === 1) return json(fail('所属维度不存在', 400))
    const id = await nextId(store, 'redflag-rules/')
    await store.setJSON(`redflag-rules/${id}.json`, {
      id, dimensionId, name,
      description: String(body.description || ''),
      score: num(body.score, ruleType === 'subtract' ? -1 : 1),
      ruleType,
      active: body.active === undefined ? 1 : (num(body.active, 1) ? 1 : 0),
      createTime: now(), deleted: 0,
    })
    return json(ok({ id }))
  } catch (e) {
    return json(fail(e?.message || '评分细则操作失败', 500))
  }
}
