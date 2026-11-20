/** PUT/DELETE /api/moral/redflag/rules/{id} —— 细则修改/删除 */
import { S, ok, fail, json, bodyOf, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, num } from '../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = context.request.method
    const user = await requirePermission(context, 'redflag:edit')
    if (user instanceof Response) return user
    if (method !== 'PUT' && method !== 'DELETE') return json(fail('方法不允许', 405))
    const id = String(context.params?.id || '').replace(/\D/g, '')
    const store = S.moral()
    const key = `redflag-rules/${id}.json`
    const doc = await store.get(key, { type: 'json' })
    if (!doc || doc.deleted === 1) return json(fail('评分细则不存在', 400))

    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const patch = {}
      if (body.name !== undefined) {
        const name = String(body.name || '').trim()
        if (!name) return json(fail('细则名称不能为空', 400))
        patch.name = name
      }
      if (body.description !== undefined) patch.description = String(body.description)
      if (body.score !== undefined) patch.score = num(body.score, 0)
      if (body.ruleType !== undefined) patch.ruleType = String(body.ruleType) === 'subtract' ? 'subtract' : 'add'
      if (body.active !== undefined) patch.active = num(body.active, 1) ? 1 : 0
      if (body.dimensionId !== undefined) {
        const dimensionId = num(body.dimensionId, 0)
        const dim = await store.get(`redflag-dimensions/${dimensionId}.json`, { type: 'json' })
        if (!dim || dim.deleted === 1) return json(fail('所属维度不存在', 400))
        patch.dimensionId = dimensionId
      }
      await store.setJSON(key, { ...doc, ...patch, updateTime: now() })
      return json(ok(null))
    }

    if (method === 'DELETE') {
      await store.setJSON(key, { ...doc, deleted: 1, updateTime: now() })
      return json(ok(null))
    }

    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '评分细则操作失败', 500))
  }
}
