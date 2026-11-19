/** POST /api/score —— 录入成绩（总评 = 平时*0.2 + 期中*0.3 + 期末*0.5） */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { num, gradeOf, pointOf } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const body = await bodyOf(context.request)
    const store = S.academic()
    const studentId = num(body.studentId, 0)
    const courseId = num(body.courseId, 0)
    const student = await store.get(`students/${studentId}.json`, { type: 'json' })
    const course = await store.get(`courses/${courseId}.json`, { type: 'json' })

    const usual = num(body.usualScore, 0)
    const final = num(body.finalScore, 0)
    const mid = body.midtermScore === null || body.midtermScore === undefined || body.midtermScore === ''
      ? Math.round((usual + final) / 2)
      : num(body.midtermScore, 0)
    const total = Math.round(usual * 0.2 + mid * 0.3 + final * 0.5)
    const gp = pointOf(total)
    const id = await nextId(store, 'scores/')
    await store.setJSON(`scores/${id}.json`, {
      id, courseId, courseName: course?.courseName || '', studentId,
      studentName: student?.realName || '', usualScore: usual, midtermScore: mid, finalScore: final,
      totalScore: total, gradePoint: gp, gradeLevel: gradeOf(total),
      semester: course?.semester || '', teacherId: course?.teacherId || null,
      comment: String(body.comment || ''), createTime: now(), deleted: 0,
    })

    // 同步选课记录（存在则更新，无则跳过；Blob 无 SQL LIKE）
    const { blobs } = await store.list({ prefix: 'selections/' })
    for (const b of blobs) {
      const sel = await store.get(b.key, { type: 'json' })
      if (sel && sel.deleted !== 1 && Number(sel.courseId) === courseId && Number(sel.studentId) === studentId) {
        await store.setJSON(b.key, { ...sel, score: total, gradePoint: gp })
        break
      }
    }
    return json(ok({ id }))
  } catch (e) {
    return json(fail(e?.message || '录入成绩失败', 500))
  }
}
