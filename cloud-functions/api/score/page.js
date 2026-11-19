/** GET /api/score/page —— 冗余字段直接读文档，无需 JOIN */
import { S, ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { pagedOrdered, stripRecords } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const q = context.request.query || {}
    const studentId = q.studentId ? Number(q.studentId) : null
    const courseId = q.courseId ? Number(q.courseId) : null
    const filter = (x) =>
      (!studentId || Number(x.studentId) === studentId) &&
      (!courseId || Number(x.courseId) === courseId)
    return json(ok(stripRecords(await pagedOrdered(S.academic(), 'scores/', q, filter, true))))
  } catch (e) {
    return json(fail(e?.message || '查询成绩失败', 500))
  }
}
