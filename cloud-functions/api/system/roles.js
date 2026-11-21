/** GET /api/system/roles —— 角色列表（管理员专属，permission:manage） */
import { ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission, resolveEffectivePermissions, ROLE_DEFS } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'permission:manage')
    if (guard instanceof Response) return guard
    const effective = await resolveEffectivePermissions(guard)
    if (Number(guard.userType) !== 3 && !effective.includes('*:*')) return json(fail('仅管理员可操作', 403), 403)

    return json(ok(ROLE_DEFS.map((r) => ({
      roleCode: r.roleCode,
      roleName: r.roleName,
      userType: r.userType,
      description: r.description,
      sortOrder: r.sortOrder,
    }))))
  } catch (e) {
    return json(fail(e?.message || '获取角色列表失败', 500))
  }
}
