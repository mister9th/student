/** PUT /api/auth/password —— 修改当前用户密码（bcrypt 重新 hash） */
import bcrypt from 'bcryptjs'
import { S, ok, fail, json, bodyOf, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { currentUser } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const user = await currentUser(context)
    if (!user) return json(fail('未登录或登录已过期', 401))
    const body = await bodyOf(context.request)
    const newPassword = String(body.newPassword || '')
    if (!newPassword) return json(fail('新密码不能为空', 400))
    if (body.oldPassword && !bcrypt.compareSync(String(body.oldPassword), user.password)) {
      return json(fail('原密码错误', 400))
    }
    const doc = { ...user, password: bcrypt.hashSync(newPassword, 10), updateTime: now() }
    await S.auth().setJSON(`users/${user.id}.json`, doc)
    return json(ok(null))
  } catch (e) {
    return json(fail(e?.message || '修改密码失败', 500))
  }
}
