/** GET /api/monitor/health —— 轻量健康检查（返回 {status:'ok',time}） */
import { ok, json, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'

export async function onRequest(context) {
  // 健康检查必须始终可用：seed 失败也照常返回 ok
  try { await ensureSeeded() } catch { /* ignore */ }
  const ts = now()
  return json(ok({ status: 'ok', time: ts, timestamp: ts }))
}
