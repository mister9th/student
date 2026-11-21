/** POST /api/course —— 新增课程（K12：去 courseCode/credit/selectedCount，status 0未开始/1进行中/2已结课） */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { val, num, requirePermission } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'course:add')
    if (guard instanceof Response) return guard
    const body = await bodyOf(context.request)
    const courseName = String(body.courseName || '').trim()
    const stage = num(body.stage, 0)
    if (!courseName) return json(fail('课程名称不能为空', 400))
    if (![1, 2, 3].includes(stage)) return json(fail('学段不合法（1=小学 2=初中 3=高中）', 400))
    const store = S.academic()
    const id = await nextId(store, 'courses/')
    const teacherId = val(body.teacherId, null)
    let teacherName = ''
    if (teacherId !== null) {
      const t = await store.get(`teachers/${teacherId}.json`, { type: 'json' })
      teacherName = t?.realName || ''
    }
    const ts = now()
    await store.setJSON(`courses/${id}.json`, {
      id, courseName, teacherId, teacherName, stage,
      gradeScope: String(body.gradeScope || ''), semester: String(body.semester || ''),
      maxStudent: num(body.maxStudent, 100), status: num(body.status, 0),
      createTime: ts, updateTime: ts, deleted: 0,
    })
    return json(ok({ id }))
  } catch (e) {
    return json(fail(e?.message || '新增课程失败', 500))
  }
}
