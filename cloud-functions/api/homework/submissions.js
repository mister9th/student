/** GET /api/homework/submissions?assignmentId —— 某作业全部提交；学生端仅本人 */
import { S, ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission, num, pagedOrdered, stripRecords } from '../../_lib/util.js'
import { ownStudentProfile } from './_shared.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'homework:list')
    if (guard instanceof Response) return guard
    const q = context.request.query || {}
    const assignmentId = q.assignmentId ? num(q.assignmentId, 0) : 0
    const isStudent = Number(guard.userType) === 1
    let ownSid = 0
    if (isStudent) {
      const profile = await ownStudentProfile(guard, S.academic())
      ownSid = profile ? num(profile.id, 0) : -1
    }
    const filter = (s) =>
      (!assignmentId || num(s.assignmentId, 0) === assignmentId) &&
      (!isStudent || num(s.studentId, 0) === ownSid)
    return json(ok(stripRecords(await pagedOrdered(S.homework(), 'submissions/', q, filter, false))))
  } catch (e) {
    return json(fail(e?.message || '查询提交失败', 500))
  }
}
