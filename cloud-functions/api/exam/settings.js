/** GET/PUT /api/exam/settings —— 排名策略全局配置（单文档 config/exam-settings.json，P1 §2.1） */
import { S, ok, fail, json, bodyOf, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission, num } from '../../_lib/util.js'

const KEY = 'config/exam-settings.json'
const DEFAULTS = { publishRank: 0, rankMode: 'exam', useLevelInsteadOfRank: 1 }

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = context.request.method
    // 读放宽 exam:list，写用 exam:edit（契约 §2.1）
    const guard = await requirePermission(context, method === 'GET' ? 'exam:list' : 'exam:edit')
    if (guard instanceof Response) return guard
    const store = S.config()

    if (method === 'GET') {
      const saved = await store.get(KEY, { type: 'json' })
      const cfg = { ...DEFAULTS }
      if (saved) {
        for (const k of Object.keys(DEFAULTS)) if (saved[k] !== undefined) cfg[k] = saved[k]
      }
      cfg.updateTime = saved?.updateTime || ''
      return json(ok(cfg))
    }
    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const pr = body.publishRank === undefined || body.publishRank === null || body.publishRank === ''
        ? DEFAULTS.publishRank : body.publishRank
      const mode = body.rankMode === undefined || body.rankMode === null || body.rankMode === ''
        ? DEFAULTS.rankMode : body.rankMode
      const useLevel = body.useLevelInsteadOfRank === undefined || body.useLevelInsteadOfRank === null || body.useLevelInsteadOfRank === ''
        ? DEFAULTS.useLevelInsteadOfRank : body.useLevelInsteadOfRank
      const next = {
        publishRank: num(pr, 0) === 1 ? 1 : 0,
        rankMode: mode === 'class' ? 'class' : 'exam',
        useLevelInsteadOfRank: num(useLevel, 1) === 1 ? 1 : 0,
        updateTime: now(),
      }
      // 单文档普通 setJSON（非 onlyIfNew），保证已存在 key 可更新
      await store.setJSON(KEY, next)
      return json(ok(next))
    }
    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '排名配置操作失败', 500))
  }
}
