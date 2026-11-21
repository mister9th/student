/** GET /api/user/oper-log/page —— 日志按 id 倒序 */
import { S, ok, fail, json, paged } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { stripRecords, requirePermission } from '../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'dashboard')
    if (guard instanceof Response) return guard
    const q = context.request.query || {}
    const module = q.module ? String(q.module).trim() : ''
    const filter = (x) => !module || String(x.module || '').includes(module)
    return json(ok(stripRecords(await paged(S.logs(), 'oper/', q, filter))))
  } catch (e) {
    return json(fail(e?.message || '查询日志失败', 500))
  }
}
