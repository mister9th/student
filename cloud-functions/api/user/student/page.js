/** GET /api/user/student/page（P1 §4.2：年级组长按 manageGrades 强制过滤） */
import { S, ok, fail, json } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { pagedOrdered, stripRecords, requirePermission } from '../../../_lib/util.js'
import { buildScope } from '../../../_lib/scope.js'
import { loadClassesMap, overlayStudentClassFields } from '../../../_lib/score-join.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const q = context.request.query || {}
    const name = q.realName ? String(q.realName).trim() : ''
    const no = q.studentNo ? String(q.studentNo).trim() : ''
    let filter = (x) =>
      (!name || String(x.realName || '').includes(name)) &&
      (!no || String(x.studentNo || '').includes(no))
    const guard = await requirePermission(context, 'student:list')
    if (guard instanceof Response) return guard
    // K12-P4 §3.2：五级 scope 统一过滤（学生档案用 id 作为 studentId 判定）
    const scope = await buildScope(context)
    const base = filter
    filter = (x) => base(x) && scope.filterFn(x, { studentField: 'id' })
    const paged = await pagedOrdered(S.academic(), 'students/', q, filter, true)
    // 班级名以班级档案为权威：按 classId 读时覆盖，班级文档缺失时保留学生文档原值
    const classes = await loadClassesMap()
    const records = (paged.records || []).map((r) => overlayStudentClassFields(r, classes))
    return json(ok(stripRecords({ ...paged, records })))
  } catch (e) {
    return json(fail(e?.message || '查询学生失败', 500))
  }
}
