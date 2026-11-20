/** GET/PUT/DELETE /api/exam/{id}（P1 §1.4；DELETE 软删、有成绩命中则拒绝） */
import { S, ok, fail, json, bodyOf, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission, num, strip } from '../../_lib/util.js'
import { normalizeExam } from './_validate.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = context.request.method
    const guard = await requirePermission(context,
      method === 'GET' ? 'exam:list' : method === 'PUT' ? 'exam:edit' : 'exam:delete')
    if (guard instanceof Response) return guard
    const id = num(String(context.params?.id || '').replace(/\D/g, ''), 0)
    if (!id) return json(fail('考试 id 无效', 400))
    const store = S.exam()
    const key = `exams/${id}.json`
    const doc = await store.get(key, { type: 'json' })

    if (method === 'GET') return json(ok(!doc || doc.deleted === 1 ? null : strip(doc)))
    if (!doc || doc.deleted === 1) return json(ok(null))

    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const { error, data } = normalizeExam(body, doc)
      if (error) return json(fail(error, 400))
      // 不可改 id；改 examName 不回填成绩冗余（成绩按 examId 动态取新名）
      await store.setJSON(key, { ...doc, ...data, id, updateTime: now() })
      return json(ok(null))
    }
    if (method === 'DELETE') {
      const academic = S.academic()
      const { blobs } = await academic.list({ prefix: 'scores/' })
      const scores = await Promise.all(blobs.map((b) => academic.get(b.key, { type: 'json' })))
      const hit = scores.some((s) => {
        if (!s || s.deleted === 1) return false
        const eid = num(s.examId, 0)
        return eid ? eid === id : String(s.examName || '') === String(doc.examName || '')
      })
      if (hit) return json(fail('考试下仍有成绩，请先归档', 400))
      await store.setJSON(key, { ...doc, deleted: 1, updateTime: now() })
      return json(ok(null))
    }
    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '考试操作失败', 500))
  }
}
