/** GET /api/moral/fiveedu/page —— 五育记录分页（学生强制只看自己，P1 §3.2） */
import { S, ok, fail, json } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, currentUser, num, pagedOrdered, stripRecords } from '../../../_lib/util.js'
import { buildScope } from '../../../_lib/scope.js'
import { ownStudentId } from './_fiveedu.js'

const EMPTY = { total: 0, records: [], page: 1, pageSize: 10, totalPages: 0 }

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'fiveedu:list')
    if (guard instanceof Response) return guard
    const user = await currentUser(context)
    const isStudent = !!user && Number(user.userType) === 1
    const q = context.request.query || {}
    const studentId = q.studentId ? num(q.studentId, 0) : 0
    const classId = q.classId ? num(q.classId, 0) : 0
    const dimension = q.dimension ? String(q.dimension).trim() : ''
    const semester = q.semester ? String(q.semester).trim() : ''

    let own = 0
    if (isStudent) {
      own = await ownStudentId(user, S.academic())
      if (!own) return json(ok(EMPTY))
    }
    const scope = await buildScope(context)
    const filter = (x) =>
      (!dimension || String(x.dimension || '') === dimension) &&
      (!semester || String(x.semester || '') === semester) &&
      (isStudent ? num(x.studentId, 0) === own : (!studentId || num(x.studentId, 0) === studentId)) &&
      (isStudent || !classId || num(x.classId, 0) === classId) &&
      scope.filterFn(x)
    return json(ok(stripRecords(await pagedOrdered(S.moral(), 'fiveedu/', q, filter, false))))
  } catch (e) {
    return json(fail(e?.message || '查询五育记录失败', 500))
  }
}
