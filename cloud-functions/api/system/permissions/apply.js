/** POST /api/system/permissions/apply —— 批量重写用户快照为当前 effective（精确覆盖，管理员专属） */
import { S, ok, fail, json, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, resolveEffectivePermissions } from '../../../_lib/util.js'
import { writeOperLog } from '../../../_lib/oper-log.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'permission:manage')
    if (guard instanceof Response) return guard
    const effective = await resolveEffectivePermissions(guard)
    if (Number(guard.userType) !== 3 && !effective.includes('*:*')) return json(fail('仅管理员可操作', 403), 403)

    const auth = S.auth()
    const { blobs } = await auth.list({ prefix: 'users/' })
    let updated = 0
    for (const b of blobs) {
      const user = await auth.get(b.key, { type: 'json' })
      if (!user || user.deleted === 1) continue
      // effective = 当前 Blob 角色权限 ∪ 快照自定义残留；写回即精确覆盖，
      // 被角色配置撤销的码不会出现在新快照中（撤销生效），未变更用户跳过（幂等）。
      const next = await resolveEffectivePermissions(user)
      const old = Array.isArray(user.permissions) ? user.permissions : []
      const unchanged = old.length === next.length && next.every((p) => old.includes(p))
      if (unchanged) continue
      await auth.setJSON(b.key, { ...user, permissions: next, updateTime: now() })
      updated++
    }
    await S.config().setJSON('permission-apply-meta.json', { appliedAt: now(), updated })
    await writeOperLog(context, { module: '系统管理', operation: '应用角色权限到全部用户' })
    return json(ok({ updated }))
  } catch (e) {
    return json(fail(e?.message || '应用权限失败', 500))
  }
}
