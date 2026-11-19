/** GET/PUT/DELETE /api/score/{id} */
import { S, ok, fail, json, bodyOf, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { num, gradeOf, pointOf, strip } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const id = String(context.params?.id || '').replace(/\D/g, '')
    const method = context.request.method
    const store = S.academic()
    const key = `scores/${id}.json`
    const doc = await store.get(key, { type: 'json' })

    if (method === 'GET') return json(ok(!doc || doc.deleted === 1 ? null : strip(doc)))
    if (!doc || doc.deleted === 1) return json(ok(null))

    if (method === 'DELETE') {
      await store.setJSON(key, { ...doc, deleted: 1, updateTime: now() })
      return json(ok(null))
    }
    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const studentId = body.studentId !== undefined ? num(body.studentId, 0) : num(doc.studentId, 0)
      const courseId = body.courseId !== undefined ? num(body.courseId, 0) : num(doc.courseId, 0)
      const student = await store.get(`students/${studentId}.json`, { type: 'json' })
      const course = await store.get(`courses/${courseId}.json`, { type: 'json' })
      const usual = body.usualScore !== undefined ? num(body.usualScore, 0) : num(doc.usualScore, 0)
      const final = body.finalScore !== undefined ? num(body.finalScore, 0) : num(doc.finalScore, 0)
      const mid = body.midtermScore !== undefined
        ? (body.midtermScore === null || body.midtermScore === '' ? Math.round((usual + final) / 2) : num(body.midtermScore, 0))
        : num(doc.midtermScore, Math.round((usual + final) / 2))
      const total = Math.round(usual * 0.2 + mid * 0.3 + final * 0.5)
      await store.setJSON(key, {
        ...doc, studentId, courseId,
        studentName: student?.realName || doc.studentName || '',
        courseName: course?.courseName || doc.courseName || '',
        semester: course?.semester || doc.semester || '',
        teacherId: course?.teacherId ?? doc.teacherId,
        usualScore: usual, midtermScore: mid, finalScore: final,
        totalScore: total, gradePoint: pointOf(total), gradeLevel: gradeOf(total),
        updateTime: now(),
      })
      return json(ok(null))
    }
    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '操作成绩失败', 500))
  }
}
