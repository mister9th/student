/** GET/POST /api/moral/inspections —— 班级检查记录（GET 支持 classId/date 过滤，按日期倒序；POST 录入后重算当日 rank） */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, num } from '../../../_lib/util.js'

/** 重算同 inspectionDate 的 rank：totalScore DESC → rank=1,2,3…（不分项目） */
export async function recalcRank(store, inspectionDate) {
  const { blobs } = await store.list({ prefix: 'inspections/' })
  const docs = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
  const sameDate = docs
    .filter((x) => x && x.deleted !== 1 && String(x.inspectionDate || '') === String(inspectionDate))
    .sort((a, b) => (num(b.totalScore, 0) - num(a.totalScore, 0)) || ((a.id || 0) - (b.id || 0)))
  for (let i = 0; i < sameDate.length; i++) {
    if (num(sameDate[i].rank, 0) !== i + 1) {
      await store.setJSON(`inspections/${sameDate[i].id}.json`, { ...sameDate[i], rank: i + 1, updateTime: now() })
    }
  }
}

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = context.request.method
    const user = await requirePermission(context, method === 'GET' ? 'inspection:list' : 'inspection:add')
    if (user instanceof Response) return user
    const store = S.moral()

    if (method === 'GET') {
      const q = context.request.query || {}
      const classId = q.classId ? num(q.classId, 0) : 0
      const date = q.date ? String(q.date) : ''
      const { blobs } = await store.list({ prefix: 'inspections/' })
      let items = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
      items = items
        .filter((x) => x && x.deleted !== 1)
        .filter((x) => (!classId || num(x.classId, 0) === classId) && (!date || String(x.inspectionDate || '') === date))
        .sort((a, b) => String(b.inspectionDate || '').localeCompare(String(a.inspectionDate || '')) || ((b.id || 0) - (a.id || 0)))
      const page = Math.max(1, Number(q.page) || 1)
      const pageSize = Math.min(500, Math.max(1, Number(q.pageSize) || 10))
      return json(ok({ total: items.length, records: items.slice((page - 1) * pageSize, page * pageSize) }))
    }

    if (method === 'POST') {
      const body = await bodyOf(context.request)
      const classId = num(body.classId, 0)
      const itemId = num(body.itemId, 0)
      if (!classId) return json(fail('班级不能为空', 400))
      if (!itemId) return json(fail('检查项目不能为空', 400))
      const cls = await S.academic().get(`classes/${classId}.json`, { type: 'json' })
      if (!cls || cls.deleted === 1) return json(fail('班级不存在', 400))
      const item = await store.get(`inspection-items/${itemId}.json`, { type: 'json' })
      if (!item || item.deleted === 1) return json(fail('检查项目不存在', 400))
      const inspectionDate = String(body.inspectionDate || now().slice(0, 10))
      const id = await nextId(store, 'inspections/')
      await store.setJSON(`inspections/${id}.json`, {
        id, itemId, itemName: String(item.name || ''),
        classId, className: String(cls.className || ''),
        inspectionDate,
        totalScore: num(body.totalScore, 0),
        scores: body.scores && typeof body.scores === 'object' && !Array.isArray(body.scores) ? body.scores : {},
        remarks: String(body.remarks || ''),
        inspectorId: guard_id(user),
        inspectorName: String(body.inspectorName || user?.realName || ''),
        rank: 0, createTime: now(), deleted: 0,
      })
      await recalcRank(store, inspectionDate)
      return json(ok({ id }))
    }

    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '班级检查操作失败', 500))
  }
}

function guard_id(u) {
  return num(u?.id ?? u?.userId, 0)
}
