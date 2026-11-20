/** GET /api/exam/page —— 考试分页列表（含 scoreCount，P1 §1.4） */
import { S, ok, fail, json, paged } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission, num } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'exam:list')
    if (guard instanceof Response) return guard
    const q = context.request.query || {}
    const stage = q.stage ? num(q.stage, 0) : 0
    const examType = q.examType ? num(q.examType, 0) : 0
    const semester = q.semester ? String(q.semester).trim() : ''
    const examName = q.examName ? String(q.examName).trim() : ''
    const filter = (x) =>
      (!stage || Number(x.stage) === stage) &&
      (!examType || Number(x.examType) === examType) &&
      (!semester || String(x.semester || '') === semester) &&
      (!examName || String(x.examName || '').includes(examName))
    const result = await paged(S.exam(), 'exams/', q, filter)
    // scoreCount：examId 命中优先；存量成绩 examId 缺省时按 examName 冗余匹配
    const academic = S.academic()
    const { blobs } = await academic.list({ prefix: 'scores/' })
    const scores = await Promise.all(blobs.map((b) => academic.get(b.key, { type: 'json' })))
    const active = scores.filter((s) => s && s.deleted !== 1)
    result.records = (result.records || []).map((e) => ({
      ...e,
      scoreCount: active.filter((s) => {
        const eid = num(s.examId, 0)
        return eid ? eid === num(e.id, 0) : String(s.examName || '') === String(e.examName || '')
      }).length,
    }))
    return json(ok(result))
  } catch (e) {
    return json(fail(e?.message || '查询考试失败', 500))
  }
}
