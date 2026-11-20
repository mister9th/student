/** PUT/DELETE /api/moral/inspections/items/{id} —— 检查项目修改/删除（删除不级联删记录，记录冗余 itemName） */
import { S, ok, fail, json, bodyOf, now } from '../../../../_lib/store.js'
import { ensureSeeded } from '../../../../_lib/seed.js'
import { requirePermission, num } from '../../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = context.request.method
    const user = await requirePermission(context, method === 'DELETE' ? 'inspection:delete' : 'inspection:edit')
    if (user instanceof Response) return user
    const id = String(context.params?.id || '').replace(/\D/g, '')
    const store = S.moral()
    const key = `inspection-items/${id}.json`
    const doc = await store.get(key, { type: 'json' })
    if (!doc || doc.deleted === 1) return json(fail('检查项目不存在', 400))

    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const patch = {}
      if (body.name !== undefined) {
        const name = String(body.name || '').trim()
        if (!name) return json(fail('项目名称不能为空', 400))
        patch.name = name
      }
      if (body.description !== undefined) patch.description = String(body.description)
      if (body.maxScore !== undefined) patch.maxScore = num(body.maxScore, 100)
      if (body.weight !== undefined) patch.weight = num(body.weight, 1)
      if (body.active !== undefined) patch.active = num(body.active, 1) ? 1 : 0
      await store.setJSON(key, { ...doc, ...patch, updateTime: now() })
      return json(ok(null))
    }

    if (method === 'DELETE') {
      await store.setJSON(key, { ...doc, deleted: 1, updateTime: now() })
      return json(ok(null))
    }

    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '检查项目操作失败', 500))
  }
}
