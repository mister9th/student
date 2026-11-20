/** GET/POST /api/moral/inspections —— 班级检查评比列表与录入（P2） */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, num } from '../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const user = await requirePermission(context, context.request.method === 'GET' ? 'inspection:list' : 'inspection:add')
    if (user instanceof Response) return user
    const store = S.moral()
    const method = context.request.method

    if (method === 'GET') {
      const q = context.request.query || {}
      const classId = q.classId ? num(q.classId, 0) : 0
      const filter = (x) => !classId || num(x.classId, 0) === classId
      const { blobs } = await store.list({ prefix: 'inspections/' })
      let items = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
      items = items.filter((x) => x && x.deleted !== 1 && filter(x)).sort((a, b) => (a.id || 0) - (b.id || 0))
      const page = Math.max(1, Number(q.page) || 1)
      const pageSize = Math.min(500, Math.max(1, Number(q.pageSize) || 10))
      return json(ok({ total: items.length, records: items.slice((page - 1) * pageSize, page * pageSize), page, pageSize, totalPages: Math.ceil(items.length / pageSize) }))
    }

    if (method === 'POST') {
      const body = await bodyOf(context.request)
      const classId = num(body.classId, 0)
      const itemName = String(body.itemName || '').trim()
      if (!classId || !itemName) return json(fail('班级和检查项目不能为空', 400))
      const id = await nextId(store, 'inspections/')
      const doc = {
        id, classId, className: String(body.className || ''), itemName,
        score: num(body.score, 0), inspectorName: String(body.inspectorName || user?.realName || ''),
        inspectDate: String(body.inspectDate || now().slice(0, 10)),
        remark: String(body.remark || ''), photos: Array.isArray(body.photos) ? body.photos : [],
        createTime: now(), deleted: 0,
      }
      await store.setJSON(`inspections/${id}.json`, doc)
      return json(ok({ id }))
    }

    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '班级检查操作失败', 500))
  }
}
