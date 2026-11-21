/** DELETE /api/selection/intent/{semester} —— 撤回选科意愿（学生仅本人） */
import { S, ok, fail, json, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, num } from '../../../_lib/util.js'
import { ownStudentProfile } from '../_shared.js'
import { writeOperLog } from '../../../_lib/oper-log.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'selection:edit')
    if (guard instanceof Response) return guard
    if (context.request.method !== 'DELETE') return json(fail('方法不允许', 405))
    const semester = String(context.params?.semester || '').trim()
    if (!semester) return json(fail('学期不能为空', 400))
    const academic = S.academic()
    const store = S.selection()
    const isStudent = Number(guard.userType) === 1
    let studentId = 0
    if (isStudent) {
      studentId = num((await ownStudentProfile(guard, academic))?.id, 0)
    } else {
      studentId = num((context.request.query || {}).studentId, 0)
    }
    if (!studentId) return json(fail('未定位到学生', 400))

    const sentinel = await store.get(`intent/${studentId}/${semester}`, { type: 'json' })
    const id = sentinel ? num(sentinel.id, 0) : 0
    if (!id) return json(ok(null))
    const doc = await store.get(`intents/${id}.json`, { type: 'json' })
    if (doc && doc.deleted !== 1) {
      await store.setJSON(`intents/${id}.json`, { ...doc, status: 0, deleted: 1, updateTime: now() })
    }
    await writeOperLog(context, { module: '选科管理', operation: '撤回选科' })
    return json(ok(null))
  } catch (e) {
    return json(fail(e?.message || '撤回选科意愿失败', 500))
  }
}
