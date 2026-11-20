/** PUT/DELETE /api/moral/inspections/{id} —— 检查记录修改/删除（变更后重算同日期 rank） */
import { S, ok, fail, json, bodyOf, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, num } from '../../../_lib/util.js'
import { recalcRank } from './index.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = context.request.method
    const user = await requirePermission(context, method === 'DELETE' ? 'inspection:delete' : 'inspection:edit')
    if (user instanceof Response) return user
    const id = String(context.params?.id || '').replace(/\D/g, '')
    const store = S.moral()
    const key = `inspections/${id}.json`
    const doc = await store.get(key, { type: 'json' })
    if (!doc || doc.deleted === 1) return json(fail('检查记录不存在', 400))

    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const patch = {}
      if (body.classId !== undefined) {
        const classId = num(body.classId, 0)
        const cls = await S.academic().get(`classes/${classId}.json`, { type: 'json' })
        if (!cls || cls.deleted === 1) return json(fail('班级不存在', 400))
        patch.classId = classId
        patch.className = String(cls.className || '')
      }
      if (body.itemId !== undefined) {
        const itemId = num(body.itemId, 0)
        const item = await store.get(`inspection-items/${itemId}.json`, { type: 'json' })
        if (!item || item.deleted === 1) return json(fail('检查项目不存在', 400))
        patch.itemId = itemId
        patch.itemName = String(item.name || '')
      }
      if (body.inspectionDate !== undefined) patch.inspectionDate = String(body.inspectionDate)
      if (body.totalScore !== undefined) patch.totalScore = num(body.totalScore, 0)
      if (body.scores !== undefined) patch.scores = body.scores && typeof body.scores === 'object' && !Array.isArray(body.scores) ? body.scores : {}
      if (body.remarks !== undefined) patch.remarks = String(body.remarks)
      if (body.inspectorName !== undefined) patch.inspectorName = String(body.inspectorName)
      const newDate = patch.inspectionDate || String(doc.inspectionDate || '')
      await store.setJSON(key, { ...doc, ...patch, updateTime: now() })
      // 旧日期与新日期都需重算（日期可能被修改）
      await recalcRank(store, newDate)
      if (patch.inspectionDate && String(doc.inspectionDate || '') !== newDate) await recalcRank(store, String(doc.inspectionDate || ''))
      return json(ok(null))
    }

    if (method === 'DELETE') {
      await store.setJSON(key, { ...doc, deleted: 1, updateTime: now() })
      await recalcRank(store, String(doc.inspectionDate || ''))
      return json(ok(null))
    }

    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '班级检查操作失败', 500))
  }
}
