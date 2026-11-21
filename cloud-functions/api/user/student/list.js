/** GET /api/user/student/list —— 下拉选项 */
import { S, ok, fail, json } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { strip, requirePermission } from '../../../_lib/util.js'
import { buildScope } from '../../../_lib/scope.js'
import { loadClassesMap, overlayStudentClassFields } from '../../../_lib/score-join.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'student:list')
    if (guard instanceof Response) return guard
    const store = S.academic()
    const { blobs } = await store.list({ prefix: 'students/' })
    const items = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
    // K12-P4 §3.2：学生下拉按五级 scope 收窄（学生本人 / 班主任本班 / 组长本年级）
    const scope = await buildScope(context)
    // 班级名以班级档案为权威：按 classId 读时覆盖，班级文档缺失时保留学生文档原值
    const classes = await loadClassesMap()
    return json(ok(
      items.filter((x) => x && x.deleted !== 1 && scope.filterFn(x, { studentField: 'id' }))
        .sort((a, b) => a.id - b.id)
        .map((x) => overlayStudentClassFields(x, classes))
        .map(strip)
    ))
  } catch (e) {
    return json(fail(e?.message || '查询学生失败', 500))
  }
}
