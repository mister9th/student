/**
 * POST /api/system/migrate-teaching —— 从存量 scores/ 反推授课关系（K12-P4 §1.3）
 * 仅 *:* 权限，meta.teachingMigrated 幂等。
 * 按 (subjectId, classId, teacherId, semester) 去重；已有哨兵则跳过，不覆盖人工维护的关系。
 */
import { S, ok, fail, json, nextId, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission, num } from '../../_lib/util.js'
import { teacherNameByUserId } from '../../_lib/teacher.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, '*:*')
    if (guard instanceof Response) return guard

    const config = S.config()
    const academic = S.academic()
    const meta = (await config.get('meta.json', { type: 'json' })) || {}
    if (meta.teachingMigrated) return json(ok({ skipped: true }))

    const { blobs } = await academic.list({ prefix: 'scores/' })
    const scores = await Promise.all(blobs.map((b) => academic.get(b.key, { type: 'json' })))

    // 去重：同一科目的同一班同一学期同一老师只生成一条
    const seen = new Set()
    const combos = []
    for (const s of scores) {
      if (!s || s.deleted === 1) continue
      const subjectId = num(s.subjectId, 0)
      const classId = num(s.classId, 0)
      const teacherId = num(s.teacherId, 0)
      const semester = String(s.semester || '').trim() || '未指定'
      if (!subjectId || !classId || !teacherId) continue
      const key = `${subjectId}|${classId}|${teacherId}|${semester}`
      if (seen.has(key)) continue
      seen.add(key)
      combos.push({ subjectId, classId, teacherId, semester })
    }

    let next = await nextId(academic, 'teachings/')
    const created = []
    const existing = []
    for (const c of combos) {
      const sentinel = `teaching/${c.subjectId}/${c.classId}/${c.semester}`
      if (await academic.get(sentinel)) { existing.push(sentinel); continue }
      const subject = await academic.get(`courses/${c.subjectId}.json`, { type: 'json' })
      const cls = await academic.get(`classes/${c.classId}.json`, { type: 'json' })
      const ts = now()
      const id = next++
      await academic.setJSON(`teachings/${id}.json`, {
        id,
        subjectId: c.subjectId, subjectName: subject?.courseName || '',
        classId: c.classId, className: cls?.className || '',
        teacherId: c.teacherId,
        teacherName: await teacherNameByUserId(academic, c.teacherId, ''),
        semester: c.semester, status: 1,
        createTime: ts, updateTime: ts, deleted: 0,
      })
      await academic.setJSON(sentinel, { id, createdAt: Date.now() }, { onlyIfNew: true })
      created.push(sentinel)
    }

    await config.setJSON('meta.json', { ...meta, teachingMigrated: true, teachingMigratedAt: now() })
    return json(ok({ migrated: { created: created.length, skipped: existing.length }, skipped: false }))
  } catch (e) {
    return json(fail(e?.message || '授课关系迁移失败', 500))
  }
}
