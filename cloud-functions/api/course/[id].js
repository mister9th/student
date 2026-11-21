/** GET/PUT/DELETE /api/course/{id}（K12：去 courseCode/credit，status 0未开始/1进行中/2已结课） */
import { S, ok, fail, json, bodyOf, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { val, num, strip, requirePermission } from '../../_lib/util.js'
import { teacherNameByUserId } from '../../_lib/teacher.js'

const validStage = (v) => [1, 2, 3].includes(num(v, 0))

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const id = String(context.params?.id || '').replace(/\D/g, '')
    const method = context.request.method
    const guard = await requirePermission(context, method === 'GET' ? 'course:list' : 'course:edit')
    if (guard instanceof Response) return guard
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
      const teacherName = body.teacherId !== undefined
        ? await teacherNameByUserId(store, teacherId, body.teacherName)
        : (doc.teacherName || '')
      await store.setJSON(key, {
        ...doc,
        courseName: body.courseName !== undefined ? String(body.courseName || '') : doc.courseName,
        teacherId, teacherName, stage,
        gradeScope: body.gradeScope !== undefined ? String(body.gradeScope || '') : doc.gradeScope,
        // K12-P4 §1.1：不再从 body 接收 maxStudent，残留字段沿用旧值
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
