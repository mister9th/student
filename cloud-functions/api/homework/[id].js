/** GET/PUT/DELETE /api/homework/{id} —— 详情（含提交统计）/ 编辑撤回 / 软删（连带 submissions） */
import { S, ok, fail, json, bodyOf, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission, num, strip } from '../../_lib/util.js'
import { normalizeAssignment, submissionStatsOf } from './_shared.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = context.request.method
    const guard = await requirePermission(context, method === 'GET' ? 'homework:list' : 'homework:edit')
    if (guard instanceof Response) return guard
    const id = num(String(context.params?.id || '').replace(/\D/g, ''), 0)
    if (!id) return json(fail('作业 id 无效', 400))
    const store = S.homework()
    const key = `assignments/${id}.json`
    const doc = await store.get(key, { type: 'json' })

    if (method === 'GET') {
      if (!doc || doc.deleted === 1) return json(ok(null))
      const stats = await submissionStatsOf(store, id)
      return json(ok({ ...strip(doc), stats }))
    }
    if (!doc || doc.deleted === 1) return json(ok(null))

    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const { error, data } = normalizeAssignment(body, doc)
      if (error) return json(fail(error, 400))
      const academic = S.academic()
      const cls = await academic.get(`classes/${data.classId}.json`, { type: 'json' })
      const subject = await academic.get(`courses/${data.subjectId}.json`, { type: 'json' })
      await store.setJSON(key, {
        ...doc,
        classId: data.classId,
        className: cls?.className || doc.className,
        subjectId: data.subjectId,
        subjectName: subject?.courseName || doc.subjectName,
        title: data.title,
        content: data.content,
        dueTime: data.dueTime,
        expectedMinutes: data.expectedMinutes,
        attachments: data.attachments,
        status: data.status,
        semester: data.semester,
        updateTime: now(),
      })
      return json(ok(null))
    }
    if (method === 'DELETE') {
      const { blobs } = await store.list({ prefix: 'submissions/' })
      const jobs = []
      for (const b of blobs) {
        const sub = await store.get(b.key, { type: 'json' })
        if (sub && sub.deleted !== 1 && num(sub.assignmentId, 0) === id) {
          jobs.push(() => store.setJSON(b.key, { ...sub, deleted: 1, updateTime: now() }))
        }
      }
      for (let i = 0; i < jobs.length; i += 30) {
        await Promise.all(jobs.slice(i, i + 30).map((fn) => fn()))
      }
      await store.setJSON(key, { ...doc, deleted: 1, updateTime: now() })
      return json(ok(null))
    }
    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '作业操作失败', 500))
  }
}
