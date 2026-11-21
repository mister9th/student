/** GET /api/score/page（单考次模型过滤；P1 §4.2 年级组长按 manageGrades 经班级 grade 强制过滤） */
import { S, ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { pagedOrdered, stripRecords, requirePermission } from '../../_lib/util.js'
import { loadScoreJoinMaps, overlayScoreFields } from '../../_lib/score-join.js'
import { buildScope } from '../../_lib/scope.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const q = context.request.query || {}
    const studentId = q.studentId ? Number(q.studentId) : null
    const subjectId = q.subjectId ? Number(q.subjectId) : null
    const classId = q.classId ? Number(q.classId) : null
    const examType = q.examType ? Number(q.examType) : null
    const semester = q.semester ? String(q.semester).trim() : ''
    const examName = q.examName ? String(q.examName).trim() : ''
    const studentName = q.studentName ? String(q.studentName).trim() : ''

    const guard = await requirePermission(context, 'score:list')
    if (guard instanceof Response) return guard

    // 自定义姓名：按 students/ 文档 realName 模糊反查 studentId 集合（在 filter 前算一次）
    let nameIds = null
    if (studentName) {
      const academic = S.academic()
      const { blobs } = await academic.list({ prefix: 'students/' })
      const docs = await Promise.all(blobs.map((b) => academic.get(b.key, { type: 'json' })))
      nameIds = new Set(docs
        .filter((d) => d && d.deleted !== 1 && String(d.realName || '').includes(studentName))
        .map((d) => Number(d.id)))
    }

    let filter = (x) =>
      (!studentId || Number(x.studentId) === studentId) &&
      (!subjectId || Number(x.subjectId) === subjectId) &&
      (!classId || Number(x.classId) === classId) &&
      (!examType || Number(x.examType) === examType) &&
      (!semester || String(x.semester || '') === semester) &&
      (!examName || String(x.examName || '').includes(examName)) &&
      (!nameIds || nameIds.has(Number(x.studentId)))

    // K12-P4 §3.2：五级 scope 统一过滤；前端 classId/studentId/subjectId 只作收窄
    const scope = await buildScope(context)
    const base = filter
    filter = (x) => base(x) && scope.filterFn(x)
    const paged = await pagedOrdered(S.academic(), 'scores/', q, filter, true)
    // 读时联表：权限过滤完成后，用权威文档覆盖成绩冗余展示字段（不改原文档、不写库）
    const maps = await loadScoreJoinMaps()
    const records = (paged.records || []).map((r) => overlayScoreFields(r, maps))
    return json(ok(stripRecords({ ...paged, records })))
  } catch (e) {
    return json(fail(e?.message || '查询成绩失败', 500))
  }
}
