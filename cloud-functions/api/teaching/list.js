/** GET /api/teaching/list —— 授课关系下拉/反查（按科目/班级/学期/教师过滤，权限 course:list） */
import { S, ok, fail, json } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { strip, num, requirePermission } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'course:list')
    if (guard instanceof Response) return guard
    const q = context.request.query || {}
    const subjectId = q.subjectId ? num(q.subjectId, 0) : 0
    const classId = q.classId ? num(q.classId, 0) : 0
    const teacherId = q.teacherId ? num(q.teacherId, 0) : 0
    const semester = q.semester ? String(q.semester).trim() : ''
    const store = S.academic()
    const { blobs } = await store.list({ prefix: 'teachings/' })
    const items = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
    return json(ok(
      items.filter((x) => x && x.deleted !== 1 &&
        (!subjectId || num(x.subjectId, 0) === subjectId) &&
        (!classId || num(x.classId, 0) === classId) &&
        (!teacherId || num(x.teacherId, 0) === teacherId) &&
        (!semester || String(x.semester || '') === semester))
        .sort((a, b) => a.id - b.id)
        .map(strip)
    ))
  } catch (e) {
    return json(fail(e?.message || '查询授课关系失败', 500))
  }
}
