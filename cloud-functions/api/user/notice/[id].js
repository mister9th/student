/** GET/PUT/DELETE /api/user/notice/{id} */
import { S, ok, fail, json, bodyOf, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { num, strip, requirePermission } from '../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const id = String(context.params?.id || '').replace(/\D/g, '')
    const method = context.request.method
    const guard = await requirePermission(context, 'notice')
    if (guard instanceof Response) return guard
    const store = S.content()
    const key = `notices/${id}.json`
    const doc = await store.get(key, { type: 'json' })

    if (method === 'GET') return json(ok(!doc || doc.deleted === 1 ? null : strip(doc)))
    if (!doc || doc.deleted === 1) return json(ok(null))

    if (method === 'DELETE') {
      await store.setJSON(key, { ...doc, deleted: 1, updateTime: now() })
      return json(ok(null))
    }
    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const status = num(body.status, 0)
      const publishTime = status === 1 ? (doc.publishTime || now()) : (doc.publishTime ?? null)
      const publisherId = body.publisherId !== undefined ? num(body.publisherId, 1) : num(doc.publisherId, 1)
      const publisher = await S.auth().get(`users/${publisherId}.json`, { type: 'json' })
      await store.setJSON(key, {
        ...doc,
        title: body.title !== undefined ? String(body.title || '') : doc.title,
        content: body.content !== undefined ? String(body.content || '') : doc.content,
        type: body.type !== undefined ? String(body.type || 'notice') : doc.type,
        priority: body.priority !== undefined ? num(body.priority, 0) : doc.priority,
        status,
        targetType: body.targetType !== undefined ? String(body.targetType || 'all') : doc.targetType,
        publisherId, publisherName: publisher?.realName || doc.publisherName || '',
        publishTime, updateTime: now(),
      })
      return json(ok(null))
    }
    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '操作公告失败', 500))
  }
}
