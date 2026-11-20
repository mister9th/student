/** POST /api/auth/refresh —— 重签 JWT（续期） */
import { ok, fail, json, signToken, jwtSecret } from '../../_lib/store.js'
import { verifyToken } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { currentUser } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const h = context.request?.headers || {}
    const authHeader = (typeof h.get === 'function'
      ? (h.get('authorization') || h.get('Authorization') || '')
      : (h['authorization'] || h['Authorization'] || ''))
    const claims = await verifyToken(authHeader, jwtSecret(context.env))
    if (!claims) return json(fail('未登录或登录已过期', 401))
    const user = await currentUser(context)
    // exp/iat 不能与 expiresIn 同时交给 jwt.sign，必须剔除
    const { iat, exp, nbf, ...rest } = claims
    const payload = user
      ? { ...rest, id: user.id, userId: user.id, username: user.username, userType: user.userType, roles: user.roles, permissions: user.permissions }
      : rest
    const token = await signToken(payload, jwtSecret(context.env))
    return json(ok({ token }))
  } catch (e) {
    return json(fail(e?.message || '刷新失败', 500))
  }
}
