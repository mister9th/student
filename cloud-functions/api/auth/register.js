/** POST /api/auth/register —— 注册用户（用户名哨兵去重） */
import bcrypt from 'bcryptjs'
import { S, ok, fail, json, bodyOf, nextId, ensureUnique, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { enc, num, roleOf, permsOf } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const body = await bodyOf(context.request)
    // A1：注册开关（仅显式 false 关闭，默认开放）；优先读 config/settings.json，兼容 settings.json
    const cfgStore = S.config()
    const settings = await cfgStore.get('config/settings.json', { type: 'json' })
      || await cfgStore.get('settings.json', { type: 'json' })
    if (settings && settings.enableRegistration === false) return json(fail('注册未开放', 403), 403)
    const username = String(body.username || '').trim()
    if (!username) return json(fail('用户名不能为空', 400))
    const auth = S.auth()
    try {
      await ensureUnique(auth, `username/${enc(username)}`)
    } catch {
      return json(fail('用户名已存在', 400))
    }
    const uid = await nextId(auth, 'users/')
    // A1：自助注册仅允许学生（ROLE_STUDENT），禁止注册管理员/教师
    const userType = 1
    const ts = now()
    const user = {
      id: uid,
      username,
      password: bcrypt.hashSync(String(body.password || '123456'), 10),
      realName: String(body.realName || username),
      email: String(body.email || ''),
      phone: String(body.phone || ''),
      avatar: '',
      gender: num(body.gender, 0),
      userType,
      status: 1,
      deleted: 0,
      roles: [roleOf(userType)],
      permissions: permsOf(userType),
      createTime: ts,
      updateTime: ts,
    }
    await auth.setJSON(`users/${uid}.json`, user)
    await auth.setJSON(`user-by-name/${enc(username)}.json`, { id: uid, username })
    return json(ok({ id: uid, userId: uid }))
  } catch (e) {
    return json(fail(e?.message || '注册失败', 500))
  }
}
