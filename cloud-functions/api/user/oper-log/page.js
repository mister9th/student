/** GET /api/user/oper-log/page —— 日志按 id 倒序 */
import { S, ok, fail, json, paged } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { stripRecords, requirePermission } from '../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    // 口径说明：前端菜单用 operlog:list（权限表无此码，前端改为 system:config），
    // 后端统一用 system:config（仅管理员），避免学生凭 dashboard 越权看全校日志。
    const guard = await requirePermission(context, 'system:config')
    if (guard instanceof Response) return guard
    const q = context.request.query || {}
    const module = q.module ? String(q.module).trim() : ''
    const filter = (x) => !module || String(x.module || '').includes(module)
    return json(ok(stripRecords(await paged(S.logs(), 'oper/', q, filter))))
  } catch (e) {
    return json(fail(e?.message || '查询日志失败', 500))
  }
}
