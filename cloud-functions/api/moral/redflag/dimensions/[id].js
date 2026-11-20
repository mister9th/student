/** PUT/DELETE /api/moral/redflag/dimensions/{id} —— 维度修改/删除（删除级联删 rules） */
import { S, ok, fail, json, bodyOf, now } from '../../../../_lib/store.js'
import { ensureSeeded } from '../../../../_lib/seed.js'
import { requirePermission, num } from '../../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = context.request.method
    const user = await requirePermission(context, 'redflag:edit')
    if (user instanceof Response) return user
    if (method !== 'PUT' && method !== 'DELETE') return json(fail('方法不允许', 405))
    const id = String(context.params?.id || '').replace(/\D/g, '')
    const store = S.moral()
    const key = `redflag-dimensions/${id}.json`
    const doc = await store.get(key, { type: 'json' })
    if (!doc || doc.deleted === 1) return json(fail('评分维度不存在', 400))

    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const patch = {}
      if (body.name !== undefined) {
        const name = String(body.name || '').trim()
        if (!name) return json(fail('维度名称不能为空', 400))
        patch.name = name
      }
      if (body.description !== undefined) patch.description = String(body.description)
      if (body.maxScore !== undefined) patch.maxScore = num(body.maxScore, 100)
      if (body.weight !== undefined) patch.weight = num(body.weight, 1)
      if (body.active !== undefined) patch.active = num(body.active, 1) ? 1 : 0
      if (body.sortOrder !== undefined) patch.sortOrder = num(body.sortOrder, 0)
      await store.setJSON(key, { ...doc, ...patch, updateTime: now() })
      return json(ok(null))
    }

    if (method === 'DELETE') {
      await store.setJSON(key, { ...doc, deleted: 1, updateTime: now() })
      // 级联删该维度下全部细则
      const { blobs } = await store.list({ prefix: 'redflag-rules/' })
      const rules = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
      for (const r of rules) {
        if (!r || r.deleted === 1 || num(r.dimensionId, 0) !== num(id, 0)) continue
        await store.setJSON(`redflag-rules/${r.id}.json`, { ...r, deleted: 1, updateTime: now() })
      }
      return json(ok(null))
    }

    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '评分维度操作失败', 500))
  }
}
