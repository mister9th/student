/** POST /api/auth/login —— 查用户、bcrypt 校验、签发 JWT */
import bcrypt from 'bcryptjs'
import { S, ok, fail, json, bodyOf, signToken, jwtSecret } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { enc, roleOf, permsOf } from '../../_lib/util.js'

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
    // 用户文档里的 permissions 是登录时写入的快照，新增模块（如 moral:*）
    // 不会自动出现在旧快照中。这里与角色权限取并集，保证老用户重新登录后
    // 立即获得新模块权限，同时保留可能存在的自定义权限。
    const permissions = Array.from(new Set([
      ...(Array.isArray(user.permissions) ? user.permissions : []),
      ...(permsOf(user.userType) || []),
    ]))
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
      menus: [],
    }))
  } catch (e) {
    return json(fail(e?.message || '登录失败', 500))
  }
}
