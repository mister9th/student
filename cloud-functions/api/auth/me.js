/** GET /api/auth/me —— 从 JWT 取身份并回查用户文档 */
import { ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { currentUser, roleOf, permsOf, num } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const user = await currentUser(context)
    if (!user) return json(fail('未登录或登录已过期', 401))
    const roles = Array.isArray(user.roles) && user.roles.length ? user.roles : [roleOf(user.userType)]
    // 与 login.js 保持一致：旧快照补齐角色权限，避免德育等新模块按钮不渲染。
    const permissions = Array.from(new Set([
      ...(Array.isArray(user.permissions) ? user.permissions : []),
      ...(permsOf(user.userType) || []),
    ]))
    return json(ok({
      id: user.id,
      userId: user.id,
      username: user.username,
      realName: user.realName || '',
      email: user.email || '',
      phone: user.phone || '',
      avatar: user.avatar || '',
      gender: num(user.gender, 0),
      userType: num(user.userType, 3),
      roles,
      permissions,
    }))
  } catch (e) {
    return json(fail(e?.message || '获取用户信息失败', 500))
  }
}
