/** GET /api/system/permissions —— 权限目录（分组+码，前端据此构造 n-tree，管理员专属） */
import { ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import {
  requirePermission, resolveEffectivePermissions,
  PERMISSION_GROUPS, ALL_PERMISSION_CODES, UNUSED_PERMISSION_CODES,
} from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'permission:manage')
    if (guard instanceof Response) return guard
    const effective = await resolveEffectivePermissions(guard)
    if (Number(guard.userType) !== 3 && !effective.includes('*:*')) return json(fail('仅管理员可操作', 403), 403)

    // 返回 catalog：前端消费 groups 构造权限树（父节点加 group: 前缀避免与同名权限码冲突）
    return json(ok({
      groups: PERMISSION_GROUPS,
      codes: ALL_PERMISSION_CODES,
      unusedCodes: UNUSED_PERMISSION_CODES,
    }))
  } catch (e) {
    return json(fail(e?.message || '获取权限目录失败', 500))
  }
}
