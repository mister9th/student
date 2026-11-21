/** GET /api/class/page（K12：className 模糊 + stage/grade 过滤；P1 §4.2 年级组长按 manageGrades 强制过滤） */
import { S, ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { pagedOrdered, stripRecords, num, requirePermission } from '../../_lib/util.js'
import { buildScope } from '../../_lib/scope.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const q = context.request.query || {}
    const name = q.className ? String(q.className).trim() : ''
    const stage = q.stage ? num(q.stage, 0) : 0
    const grade = q.grade ? num(q.grade, 0) : 0
    // P3 §2.5：走班班过滤（与 stage/grade、P1 manageGrades 过滤叠加）
    const isWalking = q.isWalking !== undefined && q.isWalking !== '' && q.isWalking !== null ? num(q.isWalking, -1) : -1
    const subjectCombo = q.subjectCombo ? String(q.subjectCombo).trim() : ''
    let filter = (x) =>
      (!name || String(x.className || '').includes(name)) &&
      (!stage || Number(x.stage) === stage) &&
      (!grade || Number(x.grade) === grade) &&
      (isWalking === -1 || num(x.isWalking, 0) === isWalking) &&
      (!subjectCombo || String(x.subjectCombo || '') === subjectCombo)
    const guard = await requirePermission(context, 'class:list')
    if (guard instanceof Response) return guard
    // K12-P4 §3.2：管理员全量 / 组长本年级 / 教师所带任教班 / 学生本班
    const scope = await buildScope(context)
    const base = filter
    filter = (x) => base(x) && scope.filterFn(x, { by: 'class', classField: 'id' })
    return json(ok(stripRecords(await pagedOrdered(S.academic(), 'classes/', q, filter, true))))
  } catch (e) {
    return json(fail(e?.message || '查询班级失败', 500))
  }
}
