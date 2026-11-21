/**
 * POST /api/system/cleanup-demo-gradeleaders
 * 一次性数据迁移：清除存量库中由旧版 seed 与建号迁移端点建出的
 * 演示年级组长账号（gradeleader1/gradeleader2，id 3001/3002）。
 * 仅 *:* 权限，幂等（meta.demoGradeLeadersCleaned）。
 * ------------------------------------------------------------------
 * 现在老师可直接在「教师管理」里把教师设为年级组长，这两个演示账号已失去
 * 作用。本端点仅软删这两条账号文档并删除其用户名索引与哨兵，不触碰其它用户。
 */
import { S, ok, fail, json, now } from '../../_lib/store.js'
import { requirePermission } from '../../_lib/util.js'

// 仅这两条演示账号：按 id 定位文档，并校验用户名，防止误删同 id 的真实用户
const DEMO_GRADE_LEADERS = [
  { id: 3001, username: 'gradeleader1' },
  { id: 3002, username: 'gradeleader2' },
]

export async function onRequest(context) {
  try {
    const guard = await requirePermission(context, '*:*')
    if (guard instanceof Response) return guard

    const config = S.config()
    const auth = S.auth()
    const meta = (await config.get('meta.json', { type: 'json' })) || {}
    // 幂等：已清理过则直接跳过，不做任何写入
    if (meta.demoGradeLeadersCleaned) return json(ok({ skipped: true }))

    const removed = []
    for (const def of DEMO_GRADE_LEADERS) {
      const userKey = `users/${def.id}.json`
      const doc = await auth.get(userKey, { type: 'json' })
      // 文档不存在或用户名不符：视为非演示账号，绝不触碰
      if (!doc || doc.username !== def.username) continue

      if (doc.deleted !== 1) {
        await auth.setJSON(userKey, { ...doc, deleted: 1, updateTime: now() })
      }
      // 索引与哨兵的 key 均为 urlencode 用户名（此处编码后即原串）
      const enc = encodeURIComponent(def.username)
      await auth.delete(`user-by-name/${enc}.json`)
      await auth.delete(`username/${enc}`)
      removed.push(def.username)
    }

    // 写回幂等标记：meta.json 已存在 seeded 等标记，用普通 setJSON 合并覆盖
    await config.setJSON('meta.json', {
      ...meta,
      demoGradeLeadersCleaned: true,
      demoGradeLeadersCleanedAt: now(),
    })

    return json(ok({ removed, skipped: false }))
  } catch (e) {
    return json(fail(e?.message || '清理演示年级组长账号失败', 500))
  }
}
