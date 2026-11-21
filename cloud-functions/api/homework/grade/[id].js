/** PUT /api/homework/grade/{submissionId} —— 教师批改 {score, comment}；写 graded 状态 + k12GradeOf */
import { S, ok, fail, json, bodyOf, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, num, k12GradeOf } from '../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'homework:grade')
    if (guard instanceof Response) return guard
    if (context.request.method !== 'PUT') return json(fail('方法不允许', 405))
    const submissionId = num(String(context.params?.id || '').replace(/\D/g, ''), 0)
    if (!submissionId) return json(fail('提交 id 无效', 400))
    const body = await bodyOf(context.request)
    const score = num(body.score, NaN)
    if (!Number.isFinite(score) || score < 0 || score > 100) return json(fail('分数须为 0-100 的数字', 400))

    const store = S.homework()
    const key = `submissions/${submissionId}.json`
    const doc = await store.get(key, { type: 'json' })
    if (!doc || doc.deleted === 1) return json(fail('提交记录不存在', 400))
    const ts = now()
    await store.setJSON(key, {
      ...doc,
      status: 'graded',
      score,
      gradeLevel: k12GradeOf(score),
      comment: String(body.comment || ''),
      gradedBy: guard.id ?? guard.userId ?? null,
      gradedTime: ts,
      updateTime: ts,
    })
    return json(ok({ id: submissionId, status: 'graded', score, gradeLevel: k12GradeOf(score) }))
  } catch (e) {
    return json(fail(e?.message || '批改作业失败', 500))
  }
}
