/** GET+PUT /api/auth/config —— 系统配置（对应 Blob config/settings.json） */
import { S, ok, fail, json, bodyOf } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission } from '../../_lib/util.js'

const DEFAULTS = {
  siteName: 'AI 智慧学生管理系统',
  logo: '',
  aiProvider: 'DeepSeek',
  aiModel: 'deepseek-chat',
  aiApiKey: '',
  aiApiUrl: 'https://api.deepseek.com/v1',
  enableRegistration: true,
  enableAiChat: true,
  enableRiskWarning: true,
  sessionTimeout: 1800,
  maxUploadSize: 100,
}

const normalize = (s) => {
  const v = String(s ?? '')
  if (v === 'true') return true
  if (v === 'false') return false
  if (v !== '' && Number.isFinite(Number(v))) return Number(v)
  return v
}

export async function onRequest(context) {
  try {
    const guard = await requirePermission(context, 'system:config')
    if (guard instanceof Response) return guard
    await ensureSeeded()
    const store = S.config()
    const saved = await store.get('settings.json', { type: 'json' })
    if (context.request.method === 'PUT') {
      const body = await bodyOf(context.request)
      const next = { ...DEFAULTS, ...(saved || {}) }
      for (const [key, value] of Object.entries(body || {})) {
        if (!(key in DEFAULTS)) continue
        next[key] = typeof value === 'boolean' || typeof value === 'number' ? value : normalize(value)
      }
      await store.setJSON('settings.json', next)
      return json(ok(body))
    }
    const cfg = { ...DEFAULTS }
    for (const [key, value] of Object.entries(saved || {})) {
      if (key in DEFAULTS) cfg[key] = typeof value === 'boolean' || typeof value === 'number' ? value : normalize(value)
    }
    // A3：API Key 属敏感信息，仅返回是否已配置，不回传明文
    cfg.hasApiKey = Boolean(saved && saved.aiApiKey)
    delete cfg.aiApiKey
    return json(ok(cfg))
  } catch (e) {
    return json(fail(e?.message || '配置请求失败', 500))
  }
}
