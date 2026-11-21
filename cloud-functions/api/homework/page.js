/** GET /api/homework/page —— 作业分页列表；学生强制本班 */
import { S, ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission, num, pagedOrdered, stripRecords } from '../../_lib/util.js'
import { buildScope } from '../../_lib/scope.js'
import { ownStudentProfile, submissionStatsOf } from './_shared.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'homework:list')
    if (guard instanceof Response) return guard
    const q = context.request.query || {}
    const academic = S.academic()
    const store = S.homework()
    const isStudent = Number(guard.userType) === 1

    let classId = q.classId ? num(q.classId, 0) : 0
    if (isStudent) {
      const profile = await ownStudentProfile(guard, academic)
      classId = profile ? num(profile.classId, 0) : -1
    }
    const subjectId = q.subjectId ? num(q.subjectId, 0) : 0
    const semester = q.semester ? String(q.semester).trim() : ''
    const title = q.title ? String(q.title).trim() : ''
    const status = q.status !== undefined && q.status !== '' && q.status !== null ? num(q.status, -1) : -1

    const scope = await buildScope(context)
    const filter = (x) =>
      (!classId || num(x.classId, 0) === classId) &&
      (!subjectId || num(x.subjectId, 0) === subjectId) &&
      (!semester || String(x.semester || '') === semester) &&
      (status === -1 || num(x.status, 1) === status) &&
      (!title || String(x.title || '').includes(title)) &&
      scope.filterFn(x)

    const result = await pagedOrdered(store, 'assignments/', q, filter, false)
    const records = await Promise.all(result.records.map(async (a) => ({
      ...a,
      submittedCount: (await submissionStatsOf(store, a.id)).submittedCount,
    })))
    return json(ok(stripRecords({ ...result, records })))
  } catch (e) {
    return json(fail(e?.message || '查询作业失败', 500))
  }
}
