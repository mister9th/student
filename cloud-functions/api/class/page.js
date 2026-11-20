/** GET /api/class/page（K12：className 模糊 + stage/grade 过滤；P1 §4.2 年级组长按 manageGrades 强制过滤） */
import { S, ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { pagedOrdered, stripRecords, num, currentUser } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const q = context.request.query || {}
    const name = q.className ? String(q.className).trim() : ''
    const stage = q.stage ? num(q.stage, 0) : 0
    const grade = q.grade ? num(q.grade, 0) : 0
    let filter = (x) =>
      (!name || String(x.className || '').includes(name)) &&
      (!stage || Number(x.stage) === stage) &&
      (!grade || Number(x.grade) === grade)
    const user = await currentUser(context)
    if (user && Number(user.userType) === 4) {
      const grades = Array.isArray(user.manageGrades) ? user.manageGrades.map(Number).filter(Number.isFinite) : []
      const gs = new Set(grades)
      const base = filter
      filter = (x) => gs.has(Number(x.grade)) && base(x)
    }
    return json(ok(stripRecords(await pagedOrdered(S.academic(), 'classes/', q, filter, true))))
  } catch (e) {
    return json(fail(e?.message || '查询班级失败', 500))
  }
}
