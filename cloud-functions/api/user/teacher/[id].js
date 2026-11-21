/** GET/PUT/DELETE /api/user/teacher/{id} */
import bcrypt from 'bcryptjs'
import { S, ok, fail, json, bodyOf, ensureUnique, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { enc, num, strip, requirePermission } from '../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const id = String(context.params?.id || '').replace(/\D/g, '')
    const method = context.request.method
    const guard = await requirePermission(context, method === 'GET' ? 'teacher:list' : 'teacher:edit')
    if (guard instanceof Response) return guard
    const auth = S.auth()
    const academic = S.academic()
    const key = `teachers/${id}.json`

    if (method === 'GET') {
      const doc = await academic.get(key, { type: 'json' })
      return json(ok(!doc || doc.deleted === 1 ? null : strip(doc)))
    }

    const doc = await academic.get(key, { type: 'json' })
    if (!doc || doc.deleted === 1) return json(ok(null))

    if (method === 'DELETE') {
      await academic.setJSON(key, { ...doc, deleted: 1, updateTime: now() })
      const user = await auth.get(`users/${doc.userId}.json`, { type: 'json' })
      if (user) await auth.setJSON(`users/${doc.userId}.json`, { ...user, deleted: 1, updateTime: now() })
      if (doc.teacherNo) await academic.delete(`teacher-no/${enc(doc.teacherNo)}`)
      if (doc.username) await auth.delete(`user-by-name/${enc(doc.username)}`)
      return json(ok(null))
    }

    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const next = { ...doc }
      if (body.teacherNo && String(body.teacherNo) !== String(doc.teacherNo)) {
        try {
          await ensureUnique(academic, `teacher-no/${enc(body.teacherNo)}`)
        } catch {
          return json(fail('工号已存在', 400))
        }
        await academic.delete(`teacher-no/${enc(doc.teacherNo)}`)
        next.teacherNo = String(body.teacherNo)
      }
      if (body.realName !== undefined) next.realName = String(body.realName || '')
      if (body.department !== undefined) next.department = String(body.department || '')
      if (body.title !== undefined) next.title = String(body.title || '')
      if (body.degree !== undefined) next.degree = String(body.degree || '')
      if (body.email !== undefined) next.email = String(body.email || '')
      if (body.phone !== undefined) next.phone = String(body.phone || '')
      if (body.gender !== undefined) next.gender = num(body.gender, 0)
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
    return json(fail(e?.message || '操作教师失败', 500))
  }
}
