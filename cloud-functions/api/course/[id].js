/** GET/PUT/DELETE /api/course/{id} */
import { S, ok, fail, json, bodyOf, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { val, num, strip } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const id = String(context.params?.id || '').replace(/\D/g, '')
    const method = context.request.method
    const store = S.academic()
    const key = `courses/${id}.json`
    const doc = await store.get(key, { type: 'json' })

    if (method === 'GET') return json(ok(!doc || doc.deleted === 1 ? null : strip(doc)))
    if (!doc || doc.deleted === 1) return json(ok(null))

    if (method === 'DELETE') {
      await store.setJSON(key, { ...doc, deleted: 1, updateTime: now() })
      return json(ok(null))
    }
    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const teacherId = body.teacherId !== undefined ? val(body.teacherId, null) : doc.teacherId
      let teacherName = doc.teacherName || ''
      if (body.teacherId !== undefined) {
        const t = teacherId !== null ? await store.get(`teachers/${teacherId}.json`, { type: 'json' }) : null
        teacherName = t?.realName || ''
      }
      await store.setJSON(key, {
        ...doc,
        courseName: body.courseName !== undefined ? String(body.courseName || '') : doc.courseName,
        courseCode: body.courseCode !== undefined ? String(body.courseCode || '') : doc.courseCode,
        teacherId, teacherName,
        credit: body.credit !== undefined ? num(body.credit, 3) : doc.credit,
        maxStudent: body.maxStudent !== undefined ? num(body.maxStudent, 100) : doc.maxStudent,
        semester: body.semester !== undefined ? String(body.semester || '') : doc.semester,
        status: body.status !== undefined ? num(body.status, 0) : doc.status,
        updateTime: now(),
      })
      return json(ok(null))
    }
    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '操作课程失败', 500))
  }
}
