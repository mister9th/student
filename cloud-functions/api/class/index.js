/** POST /api/class —— 新增班级（K12：stage/grade 必填，去 major/department） */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { val, num } from '../../_lib/util.js'
import { normalizeWalking } from './_walking.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const body = await bodyOf(context.request)
    const className = String(body.className || '').trim()
    const stage = num(body.stage, 0)
    const grade = num(body.grade, 0)
    if (!className) return json(fail('班级名称不能为空', 400))
    if (![1, 2, 3].includes(stage)) return json(fail('学段不合法（1=小学 2=初中 3=高中）', 400))
    if (grade < 1 || grade > 12) return json(fail('年级不合法（1-12）', 400))
    const store = S.academic()
    const id = await nextId(store, 'classes/')
    const headTeacherId = val(body.headTeacherId, null)
    let headTeacherName = ''
    if (headTeacherId !== null) {
      const t = await store.get(`teachers/${headTeacherId}.json`, { type: 'json' })
      headTeacherName = t?.realName || ''
    }
    const walk = normalizeWalking(body, null)
    if (walk.error) return json(fail(walk.error, 400))
    const ts = now()
    await store.setJSON(`classes/${id}.json`, {
      id, className, stage, grade,
      headTeacherId, headTeacherName, monitorId: null, studentCount: 0,
      maxStudent: num(body.maxStudent, 50), status: num(body.status, 1),
      enrollmentYear: val(body.enrollmentYear, null),
      ...walk.data,
      createTime: ts, updateTime: ts, deleted: 0,
    })
    return json(ok({ id }))
  } catch (e) {
    return json(fail(e?.message || '新增班级失败', 500))
  }
}
