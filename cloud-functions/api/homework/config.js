/** GET/PUT /api/homework/config —— 双减时长阈值配置（默认 90 分钟） */
import { S, ok, fail, json, bodyOf, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission, num } from '../../_lib/util.js'

const DEFAULT = { defaultMinutes: 90 }

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = context.request.method
    const guard = await requirePermission(context, method === 'GET' ? 'homework:list' : 'homework:edit')
    if (guard instanceof Response) return guard
    const store = S.homework()
    const cfg = await store.get('config.json', { type: 'json' })
    if (method === 'GET') return json(ok(cfg || { ...DEFAULT }))

    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const defaultMinutes = num(body.defaultMinutes, DEFAULT.defaultMinutes)
      if (defaultMinutes < 0 || defaultMinutes > 1440) return json(fail('阈值须为 0-1440 分钟', 400))
      const next = { ...DEFAULT, ...(cfg || {}), defaultMinutes, updateTime: now() }
      await store.setJSON('config.json', next)
      return json(ok(next))
    }
    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '配置操作失败', 500))
  }
}
