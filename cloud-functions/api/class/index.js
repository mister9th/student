/** POST /api/class —— 新增班级 */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { val, num } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const body = await bodyOf(context.request)
    const store = S.academic()
    const id = await nextId(store, 'classes/')
    const headTeacherId = val(body.headTeacherId, null)
    let headTeacherName = ''
    if (headTeacherId !== null) {
      const t = await store.get(`teachers/${headTeacherId}.json`, { type: 'json' })
      headTeacherName = t?.realName || ''
    }
    await store.setJSON(`classes/${id}.json`, {
      id, className: String(body.className || ''), grade: String(body.grade || ''),
      major: String(body.major || ''), department: String(body.department || ''),
      headTeacherId, headTeacherName, monitorId: null, studentCount: 0,
      maxStudent: num(body.maxStudent, 50), status: num(body.status, 1),
      enrollmentYear: val(body.enrollmentYear, null), createTime: now(), deleted: 0,
    })
    return json(ok({ id }))
  } catch (e) {
    return json(fail(e?.message || '新增班级失败', 500))
  }
}
