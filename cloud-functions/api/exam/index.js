/** POST /api/exam —— 新建考试（P1 §1.4） */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission } from '../../_lib/util.js'
import { normalizeExam } from './_validate.js'
import { writeOperLog } from '../../_lib/oper-log.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'exam:add')
    if (guard instanceof Response) return guard
    const body = await bodyOf(context.request)
    const { error, data } = normalizeExam(body, null)
    if (error) return json(fail(error, 400))
    const store = S.exam()
    const id = await nextId(store, 'exams/')
    const ts = now()
    await store.setJSON(`exams/${id}.json`, { id, ...data, createTime: ts, updateTime: ts, deleted: 0 })
    await writeOperLog(context, { module: '考试管理', operation: '新增考试' })
    return json(ok({ id }))
  } catch (e) {
    return json(fail(e?.message || '新建考试失败', 500))
  }
}
