/** GET/PUT/DELETE /api/class/{id}（K12：stage/grade 为 1-12 整数，去 major/department） */
import { S, ok, fail, json, bodyOf, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { val, num, strip } from '../../_lib/util.js'
import { normalizeWalking } from './_walking.js'

const validStage = (v) => [1, 2, 3].includes(num(v, 0))
const validGrade = (v) => num(v, 0) >= 1 && num(v, 0) <= 12

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
      const stage = body.stage !== undefined ? num(body.stage, doc.stage) : doc.stage
      const grade = body.grade !== undefined ? num(body.grade, doc.grade) : doc.grade
      if (body.stage !== undefined && !validStage(stage)) return json(fail('学段不合法（1=小学 2=初中 3=高中）', 400))
      if (body.grade !== undefined && !validGrade(grade)) return json(fail('年级不合法（1-12）', 400))
      const headTeacherId = body.headTeacherId !== undefined ? val(body.headTeacherId, null) : doc.headTeacherId
      let headTeacherName = doc.headTeacherName || ''
      if (body.headTeacherId !== undefined) {
        const t = headTeacherId !== null ? await store.get(`teachers/${headTeacherId}.json`, { type: 'json' }) : null
        headTeacherName = t?.realName || ''
      }
      const walk = normalizeWalking(body, doc)
      if (walk.error) return json(fail(walk.error, 400))
      await store.setJSON(key, {
        ...doc,
        className: body.className !== undefined ? String(body.className || '') : doc.className,
        stage, grade,
        headTeacherId, headTeacherName,
        maxStudent: body.maxStudent !== undefined ? num(body.maxStudent, 50) : doc.maxStudent,
        status: body.status !== undefined ? num(body.status, 1) : doc.status,
        enrollmentYear: body.enrollmentYear !== undefined ? val(body.enrollmentYear, null) : doc.enrollmentYear,
        ...walk.data,
        updateTime: now(),
      })
      return json(ok(null))
    }
    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '操作班级失败', 500))
  }
}
