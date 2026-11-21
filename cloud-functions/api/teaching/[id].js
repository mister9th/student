/** GET/PUT/DELETE /api/teaching/{id}（权限 course:list / course:edit；软删+删哨兵） */
import { S, ok, fail, json, bodyOf, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { num, strip, requirePermission } from '../../_lib/util.js'
import { normalizeTeaching, validateTeachingRefs, resolveNames, sentinelKeyOf } from './_shared.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const id = String(context.params?.id || '').replace(/\D/g, '')
    const method = context.request.method
    const guard = await requirePermission(context, method === 'GET' ? 'course:list' : 'course:edit')
    if (guard instanceof Response) return guard
    const store = S.academic()
    const key = `teachings/${id}.json`
    const doc = await store.get(key, { type: 'json' })

    if (method === 'GET') return json(ok(!doc || doc.deleted === 1 ? null : strip(doc)))
    if (!doc || doc.deleted === 1) return json(ok(null))

    if (method === 'DELETE') {
      await store.setJSON(key, { ...doc, deleted: 1, updateTime: now() })
      await store.delete(sentinelKeyOf(doc))
      return json(ok(null))
    }
    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const { error, data } = normalizeTeaching(body, doc)
      if (error) return json(fail(error, 400))
      const refError = await validateTeachingRefs(store, data)
      if (refError) return json(fail(refError, 400))

      const oldSentinel = sentinelKeyOf(doc)
      const newSentinel = sentinelKeyOf(data)
      if (newSentinel !== oldSentinel && await store.get(newSentinel)) {
        return json(fail('该授课关系已存在', 400))
      }
      const names = await resolveNames(store, data, body)
      await store.setJSON(key, {
        ...doc, ...data, ...names,
        createTime: doc.createTime || now(), updateTime: now(),
      })
      if (newSentinel !== oldSentinel) {
        await store.delete(oldSentinel)
        await store.setJSON(newSentinel, { id: num(doc.id, 0), createdAt: Date.now() }, { onlyIfNew: true })
      }
      return json(ok(null))
    }
    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '操作授课关系失败', 500))
  }
}
