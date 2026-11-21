/**
 * POST /api/system/migrate-classname
 * 一次性数据迁移：把学生/成绩文档中残留的大学旧 className 真正落库改写为
 * 班级档案 (classes/<id>) 里的 K12 新班级名。此前仅靠 _lib/score-join.js
 * 读时覆盖兜住显示，本端点负责清掉存量文档里的脏值。仅 *:* 权限，幂等。
 */
import { S, ok, fail, json, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission, num } from '../../_lib/util.js'
import { loadClassesMap } from '../../_lib/score-join.js'

const nonempty = (v) => v !== undefined && v !== null && v !== ''

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, '*:*')
    if (guard instanceof Response) return guard

    const config = S.config()
    const academic = S.academic()
    const meta = (await config.get('meta.json', { type: 'json' })) || {}
    // 幂等：已迁移过则直接跳过，不做任何写入
    if (meta.classNameMigrated) return json(ok({ skipped: true }))

    const migrated = { students: 0, scores: 0 }

    // 班级档案是班级名的权威源：复用读时覆盖 helper 的加载口径（含未删除过滤、数字 id）
    const { classes } = await loadClassesMap()

    // 1. 学生：className 改为权威班级名；同时按班级档案修正 stage/grade，
    //    与学生编辑端点/读时口径保持一致，避免迁移后仍有字段不一致。
    {
      const { blobs } = await academic.list({ prefix: 'students/' })
      for (const b of blobs) {
        const doc = await academic.get(b.key, { type: 'json' })
        if (!doc || doc.deleted === 1) continue
        const cls = classes.get(num(doc.classId, 0))
        if (!cls || !nonempty(cls.className)) continue
        const patch = {}
        if (doc.className !== cls.className) patch.className = cls.className
        if (nonempty(cls.stage) && doc.stage !== cls.stage) patch.stage = cls.stage
        if (nonempty(cls.grade) && doc.grade !== cls.grade) patch.grade = cls.grade
        if (!Object.keys(patch).length) continue
        await academic.setJSON(b.key, { ...doc, ...patch, updateTime: now() })
        migrated.students++
      }
    }

    // 2. 成绩：className 改为权威班级名；班级档案缺失时回退到已迁移的学生文档，
    //    仍取不到则保留原值（不清空、不乱改）。
    {
      const { blobs } = await academic.list({ prefix: 'scores/' })
      for (const b of blobs) {
        const doc = await academic.get(b.key, { type: 'json' })
        if (!doc || doc.deleted === 1) continue
        const cls = classes.get(num(doc.classId, 0))
        let clsName = cls && nonempty(cls.className) ? cls.className : null
        if (!clsName && doc.studentId != null) {
          const stu = await academic.get(`students/${doc.studentId}.json`, { type: 'json' })
          if (stu && nonempty(stu.className)) clsName = stu.className
        }
        if (!clsName || doc.className === clsName) continue
        await academic.setJSON(b.key, { ...doc, className: clsName, updateTime: now() })
        migrated.scores++
      }
    }

    // 3. 写回幂等标记（meta.json 已存在 seeded 标记，用普通覆盖写而非 onlyIfNew）
    await config.setJSON('meta.json', { ...meta, classNameMigrated: true, classNameMigratedAt: now() })

    return json(ok({ migrated, skipped: false }))
  } catch (e) {
    return json(fail(e?.message || '班级名迁移失败', 500))
  }
}
