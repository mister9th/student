/** GET /api/user/dashboard/activities —— 最近 5 条操作动态 */
import { S, ok, fail, json } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission } from '../../../_lib/util.js'

const FALLBACK = [
  { content: '系统管理员登录了系统', time: '10分钟前', type: 'info' },
  { content: '张老师发布了新公告《期末考试安排》', time: '2小时前', type: 'success' },
  { content: 'AI 风险预警生成了 4 条新记录', time: '昨天 18:30', type: 'warning' },
]

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'dashboard')
    if (guard instanceof Response) return guard
    const store = S.logs()
    const { blobs } = await store.list({ prefix: 'oper/' })
    const logs = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
    const rows = logs
      .filter((x) => x && x.deleted !== 1)
      .sort((a, b) => String(b.createTime || '').localeCompare(String(a.createTime || '')))
      .slice(0, 5)
    if (!rows.length) return json(ok(FALLBACK))
    return json(ok(rows.map((r) => ({
      content: `${r.username || '系统'} ${r.operation || '执行操作'}（${r.module || '系统'}）`,
      time: r.createTime || '',
      type: /删除|失败/.test(r.operation || '') ? 'warning' : 'info',
    }))))
  } catch (e) {
    return json(fail(e?.message || '获取动态失败', 500))
  }
}
