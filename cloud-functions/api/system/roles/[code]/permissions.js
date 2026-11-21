/** GET/PUT /api/system/roles/{code}/permissions —— 查/改角色权限码（管理员专属，精确覆盖） */
import { S, ok, fail, json, bodyOf, now } from '../../../../_lib/store.js'
import { ensureSeeded } from '../../../../_lib/seed.js'
import {
  requirePermission, resolveEffectivePermissions, loadRolePermissions,
  ROLE_DEFS, ALL_PERMISSION_CODES,
} from '../../../../_lib/util.js'
import { writeOperLog } from '../../../../_lib/oper-log.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'permission:manage')
    if (guard instanceof Response) return guard
    const effective = await resolveEffectivePermissions(guard)
    if (Number(guard.userType) !== 3 && !effective.includes('*:*')) return json(fail('仅管理员可操作', 403), 403)

    const code = String(context.params?.code || '')
    const def = ROLE_DEFS.find((r) => r.roleCode === code)
    if (!def) return json(fail('角色不存在', 404), 404)
    const method = context.request.method

    if (method === 'GET') {
      const permissionCodes = await loadRolePermissions(code)
      return json(ok({
        roleCode: code,
        roleName: def.roleName,
        userType: def.userType,
        permissionCodes,
      }))
    }

    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const codes = body.permissionCodes
      if (!Array.isArray(codes)) return json(fail('permissionCodes 必须为数组', 400), 400)
      const allowed = new Set(['*:*', ...ALL_PERMISSION_CODES])
      const invalid = codes.filter((c) => typeof c !== 'string' || !allowed.has(c))
      if (invalid.length) return json(fail(`非法权限码: ${invalid.join(', ')}`, 400), 400)
      // 防止非管理员角色被提权为超管
      if (code !== 'ROLE_ADMIN' && codes.includes('*:*')) return json(fail('仅超级管理员角色可持有 *:*', 400), 400)

      // 精确覆盖（不用 onlyIfNew），撤销的码下次读取即消失
      const next = Array.from(new Set(codes))
      await S.auth().setJSON(`rbac/${code}.json`, {
        roleCode: code,
        permissionCodes: next,
        updateTime: now(),
      })
      await writeOperLog(context, { module: '系统管理', operation: `保存角色权限(${def.roleName})` })
      return json(ok({ roleCode: code, permissionCodes: next }))
    }

    return json(fail('方法不允许', 405), 405)
  } catch (e) {
    return json(fail(e?.message || '角色权限操作失败', 500))
  }
}
