/** GET /api/timetable/page —— 课表分页列表；学生强制本班（P3 §3.5） */
import { S, ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission, num, pagedOrdered, stripRecords } from '../../_lib/util.js'
import { ownStudentClassId } from './_shared.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'timetable:list')
    if (guard instanceof Response) return guard
    if (context.request.method !== 'GET') return json(fail('方法不允许', 405))
    const q = context.request.query || {}
    const isStudent = Number(guard.userType) === 1

    let classId = q.classId ? num(q.classId, 0) : 0
    if (isStudent) {
      // 学生端：忽略传入 classId，强制注入本人所在班
      classId = (await ownStudentClassId(guard, S.academic())) || -1
    }
    const semester = q.semester ? String(q.semester).trim() : ''
    const type = q.type ? String(q.type).trim() : ''

    const filter = (x) =>
      (!classId || num(x.classId, 0) === classId) &&
      (!semester || String(x.semester || '') === semester) &&
      (!type || String(x.type || '') === type)

    return json(ok(stripRecords(await pagedOrdered(S.timetable(), 'tables/', q, filter, false))))
  } catch (e) {
    return json(fail(e?.message || '查询课表失败', 500))
  }
}
