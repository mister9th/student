/** GET /api/timetable/conflicts?tableId —— 三类冲突列表（实时计算，不落库） */
import { S, ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission, num } from '../../_lib/util.js'
import { checkConflicts, ownStudentClassId } from './_shared.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'timetable:list')
    if (guard instanceof Response) return guard
    if (context.request.method !== 'GET') return json(fail('方法不允许', 405))
    const q = context.request.query || {}
    const tableId = q.tableId ? num(q.tableId, 0) : 0
    const store = S.timetable()

    if (tableId && Number(guard.userType) === 1) {
      // 学生端防御：非本人本班课表不返回冲突信息
      const table = await store.get(`tables/${tableId}.json`, { type: 'json' })
      const ownClassId = await ownStudentClassId(guard, S.academic())
      if (!table || table.deleted === 1 || !ownClassId || num(table.classId, 0) !== ownClassId) {
        return json(ok({ conflicts: [] }))
      }
    }
    const conflicts = await checkConflicts(store, tableId)
    return json(ok({ conflicts }))
  } catch (e) {
    return json(fail(e?.message || '查询冲突失败', 500))
  }
}
