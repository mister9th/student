/** POST /api/auth/login —— 查用户、bcrypt 校验、签发 JWT */
import bcrypt from 'bcryptjs'
import { S, ok, fail, json, bodyOf, signToken, jwtSecret } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { enc, roleOf, resolveEffectivePermissions } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const body = await bodyOf(context.request)
    const username = String(body.username || 'admin').trim()
    const auth = S.auth()
    const idx = await auth.get(`user-by-name/${enc(username)}.json`, { type: 'json' })
    let user = idx ? await auth.get(`users/${idx.id}.json`, { type: 'json' }) : null
    if (!user) {
      const { blobs } = await auth.list({ prefix: 'users/' })
      for (const b of blobs) {
        const u = await auth.get(b.key, { type: 'json' })
        if (u && u.username === username) { user = u; break }
      }
    }
    if (!user || user.deleted === 1) return json(fail('用户不存在', 401))
    if (Number(user.status) !== 1) return json(fail('账号已被禁用', 403))
    if (!bcrypt.compareSync(String(body.password || ''), user.password)) {
      return json(fail('密码错误', 401))
    }

    const roles = Array.isArray(user.roles) && user.roles.length ? user.roles : [roleOf(user.userType)]
    // 统一走 permissions.js 的 effective 计算：rbac Blob 角色权限为准 + 快照自定义残留，
    // 与 requirePermission / me 同口径；不过期、不丢存量权限，且撤销可即时生效。
    const permissions = await resolveEffectivePermissions(user)
    const token = await signToken({
      id: user.id,
      userId: user.id,
      username: user.username,
      userType: user.userType,
      roles,
      permissions,
    }, jwtSecret(context.env))

    return json(ok({
      token,
      userId: user.id,
      username: user.username,
      realName: user.realName,
      avatar: user.avatar || '',
      userType: Number(user.userType),
      roles,
      permissions,
      // P7：年级组长的管辖年级，供前端收窄"按年级发消息"等选择范围
      ...(Number(user.userType) === 4 && Array.isArray(user.manageGrades) ? { manageGrades: user.manageGrades } : {}),
      menus: [],
    }))
  } catch (e) {
    return json(fail(e?.message || '登录失败', 500))
  }
}
