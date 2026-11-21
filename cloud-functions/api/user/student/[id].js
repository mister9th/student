/** GET/PUT/DELETE /api/user/student/{id} */
import bcrypt from 'bcryptjs'
import { S, ok, fail, json, bodyOf, ensureUnique, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { enc, val, num, strip, requirePermission } from '../../../_lib/util.js'
import { buildScope } from '../../../_lib/scope.js'
import { loadClassesMap, overlayStudentClassFields } from '../../../_lib/score-join.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const id = String(context.params?.id || '').replace(/\D/g, '')
    const method = context.request.method
    const guard = await requirePermission(context, method === 'GET' ? 'student:list' : method === 'DELETE' ? 'student:delete' : 'student:edit')
    if (guard instanceof Response) return guard
    const scope = await buildScope(context)
    const auth = S.auth()
    const academic = S.academic()
    const key = `students/${id}.json`

    if (method === 'GET') {
      const doc = await academic.get(key, { type: 'json' })
      if (!doc || doc.deleted === 1) return json(ok(null))
      if (!scope.filterFn(doc, { studentField: 'id' })) return json(ok(null))
      // 编辑表单回显：班级名以班级档案为权威，缺失时保留学生文档原值
      const classes = await loadClassesMap()
      return json(ok(strip(overlayStudentClassFields(doc, classes))))
    }

    const doc = await academic.get(key, { type: 'json' })
    if (!doc || doc.deleted === 1) return json(ok(null))
    if (!scope.filterFn(doc, { studentField: 'id' })) return json(fail('无权操作该学生', 403), 403)

    if (method === 'DELETE') {
      await academic.setJSON(key, { ...doc, deleted: 1, updateTime: now() })
      const user = await auth.get(`users/${doc.userId}.json`, { type: 'json' })
      if (user) await auth.setJSON(`users/${doc.userId}.json`, { ...user, deleted: 1, updateTime: now() })
      if (doc.studentNo) await academic.delete(`student-no/${enc(doc.studentNo)}`)
      if (doc.username) await auth.delete(`user-by-name/${enc(doc.username)}`)
      return json(ok(null))
    }

    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const next = { ...doc }
      if (body.studentNo && String(body.studentNo) !== String(doc.studentNo)) {
        try {
          await ensureUnique(academic, `student-no/${enc(body.studentNo)}`)
        } catch {
          return json(fail('学号已存在', 400))
        }
        await academic.delete(`student-no/${enc(doc.studentNo)}`)
        next.studentNo = String(body.studentNo)
      }
      if (body.classId !== undefined) {
        next.classId = val(body.classId, null)
        const cls = next.classId !== null ? await academic.get(`classes/${next.classId}.json`, { type: 'json' }) : null
        next.className = cls?.className || ''
        // 班级提供时冗余学段/年级（body 显式传值优先）
        next.stage = body.stage !== undefined ? val(body.stage, next.stage) : (cls?.stage ?? next.stage)
        next.grade = body.grade !== undefined ? val(body.grade, next.grade) : (cls?.grade ?? next.grade)
      }
      if (body.realName !== undefined) next.realName = String(body.realName || '')
      if (body.stage !== undefined && body.classId === undefined) next.stage = val(body.stage, next.stage)
      if (body.grade !== undefined && body.classId === undefined) next.grade = num(body.grade, num(next.grade, 0))
      if (body.email !== undefined) next.email = String(body.email || '')
      if (body.phone !== undefined) next.phone = String(body.phone || '')
      if (body.gender !== undefined) next.gender = num(body.gender, 0)
      if (body.enrollmentYear !== undefined) next.enrollmentYear = val(body.enrollmentYear, null)
      next.updateTime = now()
      await academic.setJSON(key, next)

      const user = await auth.get(`users/${doc.userId}.json`, { type: 'json' })
      if (user) {
        const u = { ...user }
        if (body.realName !== undefined) u.realName = next.realName
        if (body.email !== undefined) u.email = next.email
        if (body.phone !== undefined) u.phone = next.phone
        if (body.gender !== undefined) u.gender = next.gender
        if (body.password) u.password = bcrypt.hashSync(String(body.password), 10)
        u.updateTime = now()
        await auth.setJSON(`users/${doc.userId}.json`, u)
      }
      return json(ok(null))
    }
    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '操作学生失败', 500))
  }
}
