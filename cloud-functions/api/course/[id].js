/** GET/PUT/DELETE /api/course/{id}（K12：去 courseCode/credit，status 0未开始/1进行中/2已结课） */
import { S, ok, fail, json, bodyOf, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { val, num, strip } from '../../_lib/util.js'

const validStage = (v) => [1, 2, 3].includes(num(v, 0))

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
      const stage = body.stage !== undefined ? num(body.stage, doc.stage) : doc.stage
      if (body.stage !== undefined && !validStage(stage)) return json(fail('学段不合法（1=小学 2=初中 3=高中）', 400))
      const teacherId = body.teacherId !== undefined ? val(body.teacherId, null) : doc.teacherId
      let teacherName = doc.teacherName || ''
      if (body.teacherId !== undefined) {
        const t = teacherId !== null ? await store.get(`teachers/${teacherId}.json`, { type: 'json' }) : null
        teacherName = t?.realName || ''
      }
      await store.setJSON(key, {
        ...doc,
        courseName: body.courseName !== undefined ? String(body.courseName || '') : doc.courseName,
        teacherId, teacherName, stage,
        gradeScope: body.gradeScope !== undefined ? String(body.gradeScope || '') : doc.gradeScope,
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
