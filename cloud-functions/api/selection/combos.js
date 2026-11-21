/** GET /api/selection/combos?grade&semester —— 12 组合人数分布 + 覆盖率（实时聚合，不落库） */
import { S, ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission, num } from '../../_lib/util.js'
import { COMBOS } from './_shared.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'selection:list')
    if (guard instanceof Response) return guard
    const q = context.request.query || {}
    const grade = q.grade ? num(q.grade, 0) : 0
    const semester = q.semester ? String(q.semester).trim() : ''

    // 年级学生总数
    const academic = S.academic()
    const { blobs: sBlobs } = await academic.list({ prefix: 'students/' })
    const students = await Promise.all(sBlobs.map((b) => academic.get(b.key, { type: 'json' })))
    const totalStudents = students.filter((s) =>
      s && s.deleted !== 1 && (!grade || num(s.grade, 0) === grade)
    ).length

    // 已提交意愿（status=1，未删）按 combo 聚合
    const store = S.selection()
    const { blobs } = await store.list({ prefix: 'intents/' })
    const intents = (await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' }))))
      .filter((x) => x && x.deleted !== 1 && num(x.status, 1) === 1)
      .filter((x) => (!grade || num(x.grade, 0) === grade))
      .filter((x) => (!semester || String(x.semester || '') === semester))
    const filledStudents = new Set(intents.map((x) => num(x.studentId, 0))).size
    const countByCombo = {}
    COMBOS.forEach((c) => { countByCombo[c] = 0 })
    intents.forEach((x) => {
      const c = String(x.combo || '')
      if (countByCombo[c] !== undefined) countByCombo[c]++
    })

    const combos = COMBOS.map((c) => ({ combo: c, count: countByCombo[c] }))
    return json(ok({
      grade, semester, combos, countByCombo,
      totalStudents, filledStudents,
      submittedCount: filledStudents, // 前端兼容别名
      coverageRate: totalStudents ? Math.round((filledStudents / totalStudents) * 1000) / 10 : 0,
    }))
  } catch (e) {
    return json(fail(e?.message || '组合统计失败', 500))
  }
}
