/** POST /api/teaching —— 新增授课关系（权限 course:add；哨兵去重；后端冗余名称） */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission } from '../../_lib/util.js'
import { normalizeTeaching, validateTeachingRefs, resolveNames, sentinelKeyOf } from './_shared.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'course:add')
    if (guard instanceof Response) return guard
    const body = await bodyOf(context.request)
    const { error, data } = normalizeTeaching(body)
    if (error) return json(fail(error, 400))
    const store = S.academic()
    const refError = await validateTeachingRefs(store, data)
    if (refError) return json(fail(refError, 400))

    const sentinel = sentinelKeyOf(data)
    if (await store.get(sentinel)) return json(fail('该授课关系已存在', 400))

    const names = await resolveNames(store, data, body)
    const id = await nextId(store, 'teachings/')
    const ts = now()
    await store.setJSON(`teachings/${id}.json`, {
      id, ...data, ...names, createTime: ts, updateTime: ts, deleted: 0,
    })
    await store.setJSON(sentinel, { id, createdAt: Date.now() }, { onlyIfNew: true })
    return json(ok({ id, weeklyPeriods: data.weeklyPeriods }))
  } catch (e) {
    return json(fail(e?.message || '新增授课关系失败', 500))
  }
}
