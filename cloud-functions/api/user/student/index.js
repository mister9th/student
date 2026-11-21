/** POST /api/user/student —— 新增学生（同时建登录用户，学号/用户名哨兵去重） */
import bcrypt from 'bcryptjs'
import { S, ok, fail, json, bodyOf, nextId, ensureUnique, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { enc, val, num, permsOf, requirePermission } from '../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'student:add')
    if (guard instanceof Response) return guard
    const body = await bodyOf(context.request)
    const username = String(body.username || '').trim()
    const studentNo = String(body.studentNo || '').trim()
    if (!username) return json(fail('用户名不能为空', 400))
    if (!studentNo) return json(fail('学号不能为空', 400))

    const auth = S.auth()
    const academic = S.academic()
    try {
      await ensureUnique(auth, `username/${enc(username)}`)
    } catch {
      return json(fail('用户名已存在', 400))
    }
    try {
      await ensureUnique(academic, `student-no/${enc(studentNo)}`)
    } catch {
      return json(fail('学号已存在', 400))
    }

    const uid = await nextId(auth, 'users/')
    const sid = await nextId(academic, 'students/')
    const classId = val(body.classId, null)
    let className = ''
    let stage = val(body.stage, null)
    let grade = val(body.grade, null)
    if (classId !== null) {
      const cls = await academic.get(`classes/${classId}.json`, { type: 'json' })
      className = cls?.className || ''
      // 班级提供时冗余学段/年级（body 显式传值优先）
      stage = body.stage !== undefined ? val(body.stage, stage) : (cls?.stage ?? stage)
      grade = body.grade !== undefined ? val(body.grade, grade) : (cls?.grade ?? grade)
    }
    const ts = now()
    const realName = String(body.realName || '')
    const email = String(body.email || '')
    const phone = String(body.phone || '')
    const gender = num(body.gender, 0)
    const user = {
      id: uid, username, password: bcrypt.hashSync(String(body.password || '123456'), 10),
      realName, email, phone, avatar: '', gender, userType: 1, status: 1, deleted: 0,
      roles: ['ROLE_STUDENT'], permissions: permsOf(1), createTime: ts, updateTime: ts,
    }
    const student = {
      id: sid, userId: uid, username, realName, studentNo, classId, className,
      stage, grade, email, phone, gender,
      avatar: '', status: 1, enrollmentYear: val(body.enrollmentYear, null),
      createTime: ts, updateTime: ts, deleted: 0,
    }
    await Promise.all([
      auth.setJSON(`users/${uid}.json`, user),
      auth.setJSON(`user-by-name/${enc(username)}.json`, { id: uid, username }),
      academic.setJSON(`students/${sid}.json`, student),
    ])
    return json(ok({ id: sid, userId: uid }))
  } catch (e) {
    return json(fail(e?.message || '新增学生失败', 500))
  }
}
