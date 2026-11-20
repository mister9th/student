/** POST /api/system/migrate-permissions —— 按角色重算全部用户 permissions（仅管理员） */
import { S, ok, fail, json, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission, permsOf } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, '*:*')
    if (guard instanceof Response) return guard

    const auth = S.auth()
    const { blobs } = await auth.list({ prefix: 'users/' })
    let updated = 0
    for (const b of blobs) {
      const user = await auth.get(b.key, { type: 'json' })
      if (!user || user.deleted === 1) continue
      const perms = permsOf(user.userType)
      if (!perms) continue
      const old = Array.isArray(user.permissions) ? user.permissions : []
      const unchanged = old.length === perms.length && perms.every((p) => old.includes(p))
      if (unchanged) continue
      await auth.setJSON(b.key, { ...user, permissions: perms, updateTime: now() })
      updated++
    }
    return json(ok({ updated }))
  } catch (e) {
    return json(fail(e?.message || '权限迁移失败', 500))
  }
}
