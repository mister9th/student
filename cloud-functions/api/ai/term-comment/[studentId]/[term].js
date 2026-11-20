/** PUT/DELETE /api/ai/term-comment/{studentId}/{term}（P1 §6.2；覆盖写保留 aiDraft，物理删） */
import { S, ok, fail, json, bodyOf, now } from '../../../../_lib/store.js'
import { ensureSeeded } from '../../../../_lib/seed.js'
import { requirePermission, num } from '../../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'termcomment:edit')
    if (guard instanceof Response) return guard
    const studentId = num(String(context.params?.studentId || '').replace(/\D/g, ''), 0)
    const term = String(context.params?.term || '').trim()
    if (!studentId || !term) return json(fail('studentId 与 term 不能为空', 400))
    const method = context.request.method
    const store = S.ai()
    const key = `term-comments/${studentId}/${term}.json`

    if (method === 'DELETE') {
      // 物理删：Blob 无事务，比软删更适合"撤销重填"场景
      try { await store.delete(key) } catch { /* key 不存在时忽略 */ }
      return json(ok(null))
    }
    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const student = await S.academic().get(`students/${studentId}.json`, { type: 'json' })
      const existing = await store.get(key, { type: 'json' })
      const doc = {
        id: existing?.id || Date.now(),
        studentId,
        studentName: student?.realName ? String(student.realName) : String(existing?.studentName || ''),
        classId: student?.classId ?? existing?.classId ?? null,
        className: student?.className ? String(student.className) : String(existing?.className || ''),
        stage: student ? num(student.stage, 0) : num(existing?.stage, 0),
        grade: student ? num(student.grade, 0) : num(existing?.grade, 0),
        term,
        content: body.content !== undefined ? String(body.content || '') : String(existing?.content || ''),
        source: body.source !== undefined ? String(body.source || 'manual') : String(existing?.source || 'manual'),
        teacherId: guard.id ?? guard.userId ?? null,
        teacherName: String(guard.realName || ''),
        // 覆盖写保留最后的 AI 草稿
        aiDraft: existing?.aiDraft
          ? String(existing.aiDraft)
          : (body.aiDraft !== undefined ? String(body.aiDraft || '') : ''),
        createTime: existing?.createTime || now(),
        updateTime: now(),
      }
      await store.setJSON(key, doc)
      return json(ok(null))
    }
    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '学期评语操作失败', 500))
  }
}
