/** GET/PUT/DELETE /api/class/{id} */
import { S, ok, fail, json, bodyOf, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { val, num, strip } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const id = String(context.params?.id || '').replace(/\D/g, '')
    const method = context.request.method
    const store = S.academic()
    const key = `classes/${id}.json`
    const doc = await store.get(key, { type: 'json' })

    if (method === 'GET') return json(ok(!doc || doc.deleted === 1 ? null : strip(doc)))
    if (!doc || doc.deleted === 1) return json(ok(null))

    if (method === 'DELETE') {
      await store.setJSON(key, { ...doc, deleted: 1, updateTime: now() })
      return json(ok(null))
    }
    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const headTeacherId = body.headTeacherId !== undefined ? val(body.headTeacherId, null) : doc.headTeacherId
      let headTeacherName = doc.headTeacherName || ''
      if (body.headTeacherId !== undefined) {
        const t = headTeacherId !== null ? await store.get(`teachers/${headTeacherId}.json`, { type: 'json' }) : null
        headTeacherName = t?.realName || ''
      }
      await store.setJSON(key, {
        ...doc,
        className: body.className !== undefined ? String(body.className || '') : doc.className,
        grade: body.grade !== undefined ? String(body.grade || '') : doc.grade,
        major: body.major !== undefined ? String(body.major || '') : doc.major,
        department: body.department !== undefined ? String(body.department || '') : doc.department,
        headTeacherId, headTeacherName,
        maxStudent: body.maxStudent !== undefined ? num(body.maxStudent, 50) : doc.maxStudent,
        status: body.status !== undefined ? num(body.status, 1) : doc.status,
        enrollmentYear: body.enrollmentYear !== undefined ? val(body.enrollmentYear, null) : doc.enrollmentYear,
        updateTime: now(),
      })
      return json(ok(null))
    }
    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '操作班级失败', 500))
  }
}
