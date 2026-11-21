/** GET /api/user/student/page（P1 §4.2：年级组长按 manageGrades 强制过滤） */
import { S, ok, fail, json } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { pagedOrdered, stripRecords, currentUser, requirePermission } from '../../../_lib/util.js'
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
    // 年级组长（userType=4）：按 manageGrades 强制过滤，manageGrades 为空则列表为空；其他角色零影响
    const user = await currentUser(context)
    const guard = await requirePermission(context, 'student:list')
    if (guard instanceof Response) return guard
    // 学生查询只返回本人一条；与下方年级组长过滤互斥，互不影响
    if (user && Number(user.userType) === 1) {
      const selfId = Number(user.id ?? user.userId)
      const base = filter
      filter = (x) => Number(x.userId) === selfId && base(x)
    }
    if (user && Number(user.userType) === 4) {
      const grades = Array.isArray(user.manageGrades) ? user.manageGrades.map(Number).filter(Number.isFinite) : []
      const gs = new Set(grades)
      const base = filter
      filter = (x) => gs.has(Number(x.grade)) && base(x)
    }
    const paged = await pagedOrdered(S.academic(), 'students/', q, filter, true)
    // 班级名以班级档案为权威：按 classId 读时覆盖，班级文档缺失时保留学生文档原值
    const classes = await loadClassesMap()
    const records = (paged.records || []).map((r) => overlayStudentClassFields(r, classes))
    return json(ok(stripRecords({ ...paged, records })))
  } catch (e) {
    return json(fail(e?.message || '查询学生失败', 500))
  }
}
