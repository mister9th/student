/** GET /api/user/student/list —— 下拉选项 */
import { S, ok, fail, json } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { strip, requirePermission } from '../../../_lib/util.js'
import { loadClassesMap, overlayStudentClassFields } from '../../../_lib/score-join.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'student:list')
    if (guard instanceof Response) return guard
    const store = S.academic()
    const { blobs } = await store.list({ prefix: 'students/' })
    const items = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
    // 学生下拉只返回本人一条，避免看到全校名单；教师/管理员不变
    const isStudent = Number(guard.userType) === 1
    const selfId = Number(guard.id ?? guard.userId)
    // 班级名以班级档案为权威：按 classId 读时覆盖，班级文档缺失时保留学生文档原值
    const classes = await loadClassesMap()
    return json(ok(
      items.filter((x) => x && x.deleted !== 1 && (!isStudent || Number(x.userId) === selfId))
        .sort((a, b) => a.id - b.id)
        .map((x) => overlayStudentClassFields(x, classes))
        .map(strip)
    ))
  } catch (e) {
    return json(fail(e?.message || '查询学生失败', 500))
  }
}
