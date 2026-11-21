/** PUT /api/timetable/{id}/slots —— 批量整表覆盖写 slots，写前三类冲突检测 */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, num } from '../../../_lib/util.js'
import { normalizeSlot, checkConflicts } from '../_shared.js'
import { readLimits, validDays, validPeriods } from '../_settings.js'
import { writeOperLog } from '../../../_lib/oper-log.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'timetable:edit')
    if (guard instanceof Response) return guard
    if (context.request.method !== 'PUT') return json(fail('方法不允许', 405))
    const id = num(String(context.params?.id || '').replace(/\D/g, ''), 0)
    if (!id) return json(fail('课表 id 无效', 400))
    const store = S.timetable()
    const key = `tables/${id}.json`
    const table = await store.get(key, { type: 'json' })
    if (!table || table.deleted === 1) return json(fail('课表不存在', 400))

    // 单表 days/periods 优先；缺失/非法回退全局 timetable-settings（默认 5×8）
    const globalLimits = await readLimits(S.config())
    const limits = {
      days: validDays(table.days) ?? globalLimits.days,
      periods: validPeriods(table.periods) ?? globalLimits.periods,
    }
    const maxSlots = limits.days * limits.periods

    const body = await bodyOf(context.request)
    const rawSlots = Array.isArray(body?.slots) ? body.slots : (Array.isArray(body) ? body : null)
    if (!rawSlots) return json(fail('slots 须为数组', 400))
    if (rawSlots.length > maxSlots) return json(fail(`每节课表最多 ${maxSlots} 个课时（${limits.days} 天 × ${limits.periods} 节）`, 400))

    // 先分配最终 id，使冲突详情里的 slotA/slotB 可直接对应前端课时
    const baseId = await nextId(store, 'slots/')
    const candidates = []
    for (let i = 0; i < rawSlots.length; i++) {
      const { error, data } = normalizeSlot(rawSlots[i], id, null, limits)
      if (error) return json(fail(`第 ${i + 1} 个课时：${error}`, 400))
      // B3：从 table 文档注入学期，使冲突检测按学期隔离
      candidates.push({ ...data, id: baseId + i, semester: String(table.semester || '') })
    }

    // 写前冲突检测：用候选集替换该表旧 slot 后计算，有冲突则拒绝写入
    const conflicts = await checkConflicts(store, id, candidates)
    if (conflicts.length) {
      return json({ ...fail('课表存在冲突，未写入', 400), data: { conflicts } }, 400)
    }

    const ts = now()
    const { blobs } = await store.list({ prefix: 'slots/' })
    const old = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
    const delJobs = []
    blobs.forEach((b, i) => {
      const s = old[i]
      if (s && s.deleted !== 1 && num(s.tableId, 0) === id) {
        delJobs.push(() => store.setJSON(b.key, { ...s, deleted: 1, updateTime: ts }))
      }
    })
    for (let i = 0; i < delJobs.length; i += 30) {
      await Promise.all(delJobs.slice(i, i + 30).map((fn) => fn()))
    }

    const writeJobs = candidates.map((s) => () => store.setJSON(`slots/${s.id}.json`, {
      ...s,
      createTime: ts,
      updateTime: ts,
      deleted: 0,
    }))
    for (let i = 0; i < writeJobs.length; i += 30) {
      await Promise.all(writeJobs.slice(i, i + 30).map((fn) => fn()))
    }
    await store.setJSON(key, { ...table, updateTime: ts })
    await writeOperLog(context, { module: '课表管理', operation: '编排课表' })
    return json(ok({ id, slots: candidates.length }))
  } catch (e) {
    return json(fail(e?.message || '保存课表课时失败', 500))
  }
}
