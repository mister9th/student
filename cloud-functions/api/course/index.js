/** POST /api/course —— 新增课程 */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { val, num } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const body = await bodyOf(context.request)
    const store = S.academic()
    const id = await nextId(store, 'courses/')
    const teacherId = val(body.teacherId, null)
    let teacherName = ''
    if (teacherId !== null) {
      const t = await store.get(`teachers/${teacherId}.json`, { type: 'json' })
      teacherName = t?.realName || ''
    }
    await store.setJSON(`courses/${id}.json`, {
      id, courseName: String(body.courseName || ''), courseCode: String(body.courseCode || ''),
      teacherId, teacherName, credit: num(body.credit, 3),
      semester: String(body.semester || ''), selectedCount: 0,
      maxStudent: num(body.maxStudent, 100), status: num(body.status, 0),
      createTime: now(), deleted: 0,
    })
    return json(ok({ id }))
  } catch (e) {
    return json(fail(e?.message || '新增课程失败', 500))
  }
}
