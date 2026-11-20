/**
 * POST /api/system/ensure-grade-leaders —— 幂等补齐年级组长账号（仅 *:* 权限，P1）
 * ------------------------------------------------------------------
 * 存量库因 meta.seeded 标记不会重新播种，本端点用 seed.js 导出的同一份
 * 定义与文档构造器补建账号；已存在则只补权限/角色/manageGrades（并集，不覆盖自定义）。
 */
import { S, ok, fail, json, now } from '../../_lib/store.js'
import { ensureSeeded, GRADE_LEADER_USERS, buildUserDoc } from '../../_lib/seed.js'
import { requirePermission } from '../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, '*:*')
    if (guard instanceof Response) return guard

    const auth = S.auth()
    const created = []
    const skipped = []
    for (const def of GRADE_LEADER_USERS) {
      const key = `users/${def.id}.json`
      const existing = await auth.get(key, { type: 'json' })
      const base = buildUserDoc(def)

      if (existing && existing.deleted !== 1) {
        // 已存在：跳过建号，仍用并集补齐 permissions / roles 与缺失的 manageGrades
        const oldPerms = Array.isArray(existing.permissions) ? existing.permissions : []
        const perms = Array.from(new Set([...oldPerms, ...(base.permissions || [])]))
        const patch = { updateTime: now() }
        let changed = perms.length !== oldPerms.length
        if (changed) patch.permissions = perms

        const oldRoles = Array.isArray(existing.roles) ? existing.roles : []
        const roles = Array.from(new Set([...oldRoles, ...(base.roles || [])]))
        if (roles.length !== oldRoles.length) {
          patch.roles = roles
          changed = true
        }
        if (!Array.isArray(existing.manageGrades) || !existing.manageGrades.length) {
          patch.manageGrades = base.manageGrades
          changed = true
        }
        if (changed) await auth.setJSON(key, { ...existing, ...patch })
        skipped.push(def.username)
        continue
      }

      // 不存在：仿 seed 的 add/sentinel 写法创建账号、用户名索引与哨兵
      const enc = encodeURIComponent(def.username)
      await auth.setJSON(key, base)
      await auth.setJSON(`user-by-name/${enc}.json`, { id: def.id, username: def.username }, { onlyIfNew: true })
      await auth.setJSON(`username/${enc}`, { createdAt: Date.now() }, { onlyIfNew: true })
      created.push(def.username)
    }
    return json(ok({ created, skipped }))
  } catch (e) {
    return json(fail(e?.message || '年级组长建号迁移失败', 500))
  }
}
