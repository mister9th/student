/** GET /api/user/dashboard/stats —— 计数聚合 */
import { S, ok, fail, json } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission } from '../../../_lib/util.js'

async function countActive(store, prefix, extra = null) {
  const { blobs } = await store.list({ prefix })
  const items = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
  return items.filter((x) => x && x.deleted !== 1 && (!extra || extra(x))).length
}

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'dashboard')
    if (guard instanceof Response) return guard
    const academic = S.academic()
    const [studentCount, teacherCount, courseCount, classCount, activeUsers] = await Promise.all([
      countActive(academic, 'students/'),
      countActive(academic, 'teachers/'),
      countActive(academic, 'courses/'),
      countActive(academic, 'classes/'),
      countActive(S.auth(), 'users/', (u) => Number(u.status) === 1),
    ])
    return json(ok({
      studentCount,
      teacherCount,
      courseCount,
      classCount,
      todayLogins: activeUsers,
      activeTeachers: teacherCount,
      onlineStudents: studentCount,
    }))
  } catch (e) {
    return json(fail(e?.message || '统计数据失败', 500))
  }
}
