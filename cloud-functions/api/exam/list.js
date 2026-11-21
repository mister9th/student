/** GET /api/exam/list —— 全量考试下拉（P1 §1.4） */
import { S, ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { currentUser, requirePermission, num } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    // 学生排名弹窗也需要考试下拉：学生用 score:list 放行，教师仍用 exam:list
    const user = await currentUser(context)
    const isStudent = !!user && Number(user.userType) === 1
    const guard = await requirePermission(context, isStudent ? 'score:list' : 'exam:list')
    if (guard instanceof Response) return guard
    const q = context.request.query || {}
    const stage = q.stage ? num(q.stage, 0) : 0
    const semester = q.semester ? String(q.semester).trim() : ''
    const store = S.exam()
    const { blobs } = await store.list({ prefix: 'exams/' })
    const docs = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
    const list = docs
      .filter((x) => x && x.deleted !== 1 &&
        (!stage || Number(x.stage) === stage) &&
        (!semester || String(x.semester || '') === semester))
      .sort((a, b) => num(a.id, 0) - num(b.id, 0))
      // 返回完整 ExamVO（契约 6 字段的超集），下拉与排名弹窗可直接复用同一 VO
      .map((x) => ({
        id: num(x.id, 0),
        examName: String(x.examName || ''),
        examType: num(x.examType, 0),
        examDate: String(x.examDate || ''),
        semester: String(x.semester || ''),
        stage: num(x.stage, 0),
        gradeScope: Array.isArray(x.gradeScope) ? x.gradeScope : [],
        subjectScope: Array.isArray(x.subjectScope) ? x.subjectScope : [],
        status: num(x.status, 1),
        publishRank: x.publishRank === null || x.publishRank === undefined ? null : num(x.publishRank, 0),
        remark: String(x.remark || ''),
      }))
    return json(ok(list))
  } catch (e) {
    return json(fail(e?.message || '查询考试下拉失败', 500))
  }
}
