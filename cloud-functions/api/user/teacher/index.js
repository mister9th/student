/** POST /api/user/teacher —— 新增教师（同时建登录用户，工号/用户名哨兵去重） */
import bcrypt from 'bcryptjs'
import { S, ok, fail, json, bodyOf, nextId, ensureUnique, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { enc, val, num, permsOf, requirePermission } from '../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'teacher:add')
    if (guard instanceof Response) return guard
    const body = await bodyOf(context.request)
    const username = String(body.username || '').trim()
    const teacherNo = String(body.teacherNo || '').trim()
    if (!username) return json(fail('用户名不能为空', 400))
    if (!teacherNo) return json(fail('工号不能为空', 400))

    const auth = S.auth()
    const academic = S.academic()
    try {
      await ensureUnique(auth, `username/${enc(username)}`)
    } catch {
      return json(fail('用户名已存在', 400))
    }
    try {
      await ensureUnique(academic, `teacher-no/${enc(teacherNo)}`)
    } catch {
      return json(fail('工号已存在', 400))
    }

    const uid = await nextId(auth, 'users/')
    const tid = await nextId(academic, 'teachers/')
    const ts = now()
    const realName = String(body.realName || '')
    const email = String(body.email || '')
    const phone = String(body.phone || '')
    const gender = num(body.gender, 0)
    const user = {
      id: uid, username, password: bcrypt.hashSync(String(body.password || '123456'), 10),
      realName, email, phone, avatar: '', gender, userType: 2, status: 1, deleted: 0,
      roles: ['ROLE_TEACHER'], permissions: permsOf(2), createTime: ts, updateTime: ts,
    }
    const teacher = {
      id: tid, userId: uid, teacherNo, username, realName,
      department: String(body.department || ''), title: String(body.title || ''),
      degree: String(body.degree || ''), specialty: String(body.specialty || ''),
      phone, email, gender, status: 1, avatar: '', createTime: ts, deleted: 0,
    }
    await Promise.all([
      auth.setJSON(`users/${uid}.json`, user),
      auth.setJSON(`user-by-name/${enc(username)}.json`, { id: uid, username }),
      academic.setJSON(`teachers/${tid}.json`, teacher),
    ])
    return json(ok({ id: tid, userId: uid }))
  } catch (e) {
    return json(fail(e?.message || '新增教师失败', 500))
  }
}
