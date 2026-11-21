/** POST /api/timetable —— 建课表骨架（哨兵 table/<classId>/<semester>/<type> 唯一） */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission, num } from '../../_lib/util.js'
import { normalizeTable } from './_shared.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'timetable:add')
    if (guard instanceof Response) return guard
    if (context.request.method !== 'POST') return json(fail('方法不允许', 405))
    const body = await bodyOf(context.request)
    const { error, data } = normalizeTable(body, null)
    if (error) return json(fail(error, 400))

    const academic = S.academic()
    const cls = await academic.get(`classes/${data.classId}.json`, { type: 'json' })
    const store = S.timetable()
    const sentinelKey = `table/${data.classId}/${data.semester}/${data.type}`
    const sentinel = await store.get(sentinelKey, { type: 'json' })
    let id = sentinel ? num(sentinel.id, 0) : 0
    const old = id ? await store.get(`tables/${id}.json`, { type: 'json' }) : null
    if (old && old.deleted !== 1) return json(fail('该班级该学期该类课表已存在', 400))

    const ts = now()
    if (!id) {
      id = await nextId(store, 'tables/')
      await store.setJSON(sentinelKey, {
        id,
        classId: data.classId,
        semester: data.semester,
        type: data.type,
        createdAt: ts,
      }, { onlyIfNew: true })
    }
    await store.setJSON(`tables/${id}.json`, {
      ...data,
      id,
      className: cls?.className || String(body.className || ''),
      createTime: old?.createTime || ts,
      updateTime: ts,
      deleted: 0,
    })
    return json(ok({ id, classId: data.classId, semester: data.semester, type: data.type, subjectCombo: data.subjectCombo, status: data.status }))
  } catch (e) {
    return json(fail(e?.message || '创建课表失败', 500))
  }
}
