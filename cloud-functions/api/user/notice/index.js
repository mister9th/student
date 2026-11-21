/** POST /api/user/notice —— 新增公告 */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { num, requirePermission } from '../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'notice')
    if (guard instanceof Response) return guard
    const body = await bodyOf(context.request)
    const store = S.content()
    const id = await nextId(store, 'notices/')
    const publisherId = num(body.publisherId, 1)
    const publisher = await S.auth().get(`users/${publisherId}.json`, { type: 'json' })
    const status = num(body.status, 0)
    await store.setJSON(`notices/${id}.json`, {
      id, title: String(body.title || ''), content: String(body.content || ''),
      type: String(body.type || 'notice'), priority: num(body.priority, 0),
      status, targetType: String(body.targetType || 'all'),
      publisherId, publisherName: publisher?.realName || '',
      publishTime: status === 1 ? now() : null,
      createTime: now(), deleted: 0,
    })
    return json(ok({ id }))
  } catch (e) {
    return json(fail(e?.message || '新增公告失败', 500))
  }
}
