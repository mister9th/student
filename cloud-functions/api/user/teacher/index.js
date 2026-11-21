/** POST /api/user/teacher —— 新增教师（同时建登录用户，工号/用户名哨兵去重） */
import bcrypt from 'bcryptjs'
import { S, ok, fail, json, bodyOf, nextId, ensureUnique, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { enc, val, num, permsOf, roleOf, requirePermission } from '../../../_lib/util.js'

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

    // K12-P4 §5.1：年级组长设置。userType 由 isGradeLeader 决定，roles/permissions 按角色重置
    const isGradeLeader = body.isGradeLeader === true || body.isGradeLeader === 1 ||
      body.isGradeLeader === '1' || body.isGradeLeader === 'true'
    const manageGrades = Array.isArray(body.manageGrades)
      ? [...new Set(body.manageGrades.map(Number).filter((g) => Number.isInteger(g) && g >= 1 && g <= 12))]
      : []
    if (isGradeLeader && !manageGrades.length) return json(fail('年级组长须指定管辖年级（1-12）', 400))
    const userType = isGradeLeader ? 4 : 2

    const uid = await nextId(auth, 'users/')
    const tid = await nextId(academic, 'teachers/')
    const ts = now()
    const realName = String(body.realName || '')
    const email = String(body.email || '')
    const phone = String(body.phone || '')
    const gender = num(body.gender, 0)
    const user = {
      id: uid, username, password: bcrypt.hashSync(String(body.password || '123456'), 10),
      realName, email, phone, avatar: '', gender, userType, status: 1, deleted: 0,
      roles: [roleOf(userType)], permissions: permsOf(userType),
      ...(isGradeLeader ? { manageGrades } : {}),
      createTime: ts, updateTime: ts,
    }
    const teacher = {
      id: tid, userId: uid, teacherNo, username, realName,
      department: String(body.department || ''), title: String(body.title || ''),
      degree: String(body.degree || ''), specialty: String(body.specialty || ''),
      phone, email, gender, status: 1, avatar: '',
      // 档案冗余字段供教师列表直接显示，避免再次联表
      userType, isGradeLeader, ...(isGradeLeader ? { manageGrades } : {}),
      createTime: ts, deleted: 0,
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
