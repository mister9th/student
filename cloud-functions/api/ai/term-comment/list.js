/** GET /api/ai/term-comment/list —— 班级学期评语列表（教师端；学生只读自己；年级组长按 manageGrades 过滤） */
import { S, ok, fail, json } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, num } from '../../../_lib/util.js'
import { buildScope, applyScope } from '../../../_lib/scope.js'
import { currentSemester } from '../../../_lib/k12.js'
import { listDocs } from '../_shared.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'termcomment:list')
    if (guard instanceof Response) return guard
    const q = context.request.query || {}
    const term = String(q.term || q.semester || '').trim() || currentSemester()
    const classId = q.classId ? num(q.classId, 0) : 0
    const docs = await listDocs(S.ai(), 'term-comments/')
    // K12-P4 §3.2：学生本人 / 班主任本班 / 科任本科目本班 / 组长本年级 / 管理员全量
    let list = applyScope(docs, await buildScope(context)).filter((d) => d &&
      String(d.term || '') === term &&
      (!classId || num(d.classId, 0) === classId))
    list.sort((a, b) => num(a.studentId, 0) - num(b.studentId, 0))
    return json(ok(list.map(({ __key, ...rest }) => rest)))
  } catch (e) {
    return json(fail(e?.message || '查询学期评语失败', 500))
  }
}
