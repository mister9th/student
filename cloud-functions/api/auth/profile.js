/** PUT /api/auth/profile —— 更新当前用户资料 */
import { S, ok, fail, json, bodyOf, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { currentUser, num } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const user = await currentUser(context)
    if (!user) return json(fail('未登录或登录已过期', 401))
    const body = await bodyOf(context.request)
    const doc = { ...user }
    if (body.realName !== undefined) doc.realName = String(body.realName || '')
    if (body.email !== undefined) doc.email = String(body.email || '')
    if (body.phone !== undefined) doc.phone = String(body.phone || '')
    if (body.avatar !== undefined) doc.avatar = String(body.avatar || '')
    if (body.gender !== undefined) doc.gender = num(body.gender, 0)
    doc.updateTime = now()
    await S.auth().setJSON(`users/${user.id}.json`, doc)
    return json(ok(body))
  } catch (e) {
    return json(fail(e?.message || '更新资料失败', 500))
  }
}
