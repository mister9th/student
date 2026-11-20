/** GET/PUT/DELETE /api/moral/rules/{id}（DELETE 逻辑删 deleted=1） */
import { S, ok, fail, json, bodyOf, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, num, strip } from '../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = context.request.method
    const guard = await requirePermission(context, method === 'GET' ? 'moral:list' : 'moral:edit')
    if (guard instanceof Response) return guard
    const id = String(context.params?.id || '').replace(/\D/g, '')
    const store = S.moral()
    const key = `rules/${id}.json`
    const doc = await store.get(key, { type: 'json' })

    if (method === 'GET') return json(ok(!doc || doc.deleted === 1 ? null : strip(doc)))
    if (!doc || doc.deleted === 1) return json(ok(null))

    if (method === 'DELETE') {
      await store.setJSON(key, { ...doc, deleted: 1, updateTime: now() })
      return json(ok(null))
    }
    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      await store.setJSON(key, {
        ...doc,
        category: body.category !== undefined ? String(body.category) : String(doc.category || ''),
        name: body.name !== undefined ? String(body.name) : String(doc.name || ''),
        scoreChange: body.scoreChange !== undefined ? num(body.scoreChange, 0) : num(doc.scoreChange, 0),
        minScore: body.minScore !== undefined ? num(body.minScore, 0) : num(doc.minScore, 0),
        maxScore: body.maxScore !== undefined ? num(body.maxScore, 100) : num(doc.maxScore, 100),
        active: body.active !== undefined ? num(body.active, 1) : num(doc.active, 1),
        updateTime: now(),
      })
      return json(ok(null))
    }
    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '德育规则操作失败', 500))
  }
}
