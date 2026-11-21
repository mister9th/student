/** GET /api/timetable/conflicts?tableId —— 三类冲突列表（实时计算，不落库） */
import { S, ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission, num } from '../../_lib/util.js'
import { buildScope } from '../../_lib/scope.js'
import { checkConflicts } from './_shared.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'timetable:list')
    if (guard instanceof Response) return guard
    if (context.request.method !== 'GET') return json(fail('方法不允许', 405))
    const q = context.request.query || {}
    const tableId = q.tableId ? num(q.tableId, 0) : 0
    const store = S.timetable()
    const scope = await buildScope(context)

    if (tableId) {
      // 目标课表必须在 scope 内（原学生端防御扩展为五级）
      const table = await store.get(`tables/${tableId}.json`, { type: 'json' })
      if (!table || table.deleted === 1 || !scope.filterFn(table, { by: 'class' })) {
        return json(ok({ conflicts: [] }))
      }
    }
    let conflicts = await checkConflicts(store, tableId)
    if (scope.type !== 'admin') {
      // 冲突双方课表都必须可见，避免跨班级信息泄露
      const { blobs: tBlobs } = await store.list({ prefix: 'tables/' })
      const tables = await Promise.all(tBlobs.map((b) => store.get(b.key, { type: 'json' })))
      const allowed = new Set(tables
        .filter((t) => t && t.deleted !== 1 && scope.filterFn(t, { by: 'class' }))
        .map((t) => num(t.id, 0)))
      conflicts = conflicts.filter((c) =>
        allowed.has(num(c.tableIdA, 0)) && allowed.has(num(c.tableIdB, 0)))
    }
    return json(ok({ conflicts }))
  } catch (e) {
    return json(fail(e?.message || '查询冲突失败', 500))
  }
}
