/**
 * GET/PUT /api/timetable/settings —— 课表天数/节数全局配置（契约 §2.1）
 * 单文档 config/timetable-settings.json；默认 5×8；读 timetable:list / 写 timetable:edit。
 * 单表可用 table.days/table.periods 覆盖本全局值。
 */
import { S, ok, fail, json, bodyOf, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission } from '../../_lib/util.js'
import { TIMETABLE_SETTINGS_KEY, DEFAULT_TIMETABLE_SETTINGS, normalizeSettings, mergeSettings } from './_settings.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = String((context.request && context.request.method) || 'GET').toUpperCase()
    const guard = await requirePermission(context, method === 'GET' ? 'timetable:list' : 'timetable:edit')
    if (guard instanceof Response) return guard
    const store = S.config()

    if (method === 'GET') {
      const saved = await store.get(TIMETABLE_SETTINGS_KEY, { type: 'json' })
      return json(ok({ ...mergeSettings(saved), updateTime: String((saved && saved.updateTime) || '') }))
    }
    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const saved = await store.get(TIMETABLE_SETTINGS_KEY, { type: 'json' })
      const { error, data } = normalizeSettings(body, saved || DEFAULT_TIMETABLE_SETTINGS)
      if (error) return json(fail(error, 400), 400)
      const next = { ...data, updateTime: now() }
      await store.setJSON(TIMETABLE_SETTINGS_KEY, next)
      return json(ok(next))
    }
    return json(fail('方法不允许', 405), 405)
  } catch (e) {
    return json(fail(e?.message || '课表配置操作失败', 500), 500)
  }
}
