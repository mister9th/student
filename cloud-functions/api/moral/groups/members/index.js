/** POST /api/moral/groups/members —— 分配学生到小组（换组=覆盖，同方案同学生仅一条） */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../../../_lib/store.js'
import { ensureSeeded } from '../../../../_lib/seed.js'
import { requirePermission, num } from '../../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const user = await requirePermission(context, 'group:edit')
    if (user instanceof Response) return user
    if (context.request.method !== 'POST') return json(fail('方法不允许', 405))
    const body = await bodyOf(context.request)
    const schemeId = num(body.schemeId, 0)
    const studentId = num(body.studentId, 0)
    const groupId = num(body.groupId, 0)
    if (!schemeId) return json(fail('分组方案不能为空', 400))
    if (!studentId) return json(fail('学生不能为空', 400))
    if (!groupId) return json(fail('目标小组不能为空', 400))

    const store = S.moral()
    const scheme = await store.get(`schemes/${schemeId}.json`, { type: 'json' })
    if (!scheme || scheme.deleted === 1) return json(fail('分组方案不存在', 400))
    const group = await store.get(`groups/${groupId}.json`, { type: 'json' })
    if (!group || group.deleted === 1 || num(group.schemeId, 0) !== schemeId) return json(fail('目标小组不属于该方案', 400))
    if (num(group.isUnassigned, 0) === 1) return json(fail('不能分配到"未分组"容器', 400))
    const student = await S.academic().get(`students/${studentId}.json`, { type: 'json' })
    if (!student || student.deleted === 1) return json(fail('学生不存在', 400))
    if (num(student.classId, 0) !== num(scheme.classId, 0)) return json(fail('学生不属于该方案所在班级', 400))

    // 换组 = 覆盖：同方案同学生仅一条记录
    const { blobs } = await store.list({ prefix: 'members/' })
    const members = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
    const found = members.find((x) => x && x.deleted !== 1 && num(x.schemeId, 0) === schemeId && num(x.studentId, 0) === studentId)
    if (found) {
      await store.setJSON(`members/${found.id}.json`, { ...found, groupId, sortOrder: num(body.sortOrder, num(found.sortOrder, 0)), updateTime: now() })
      return json(ok({ id: found.id, moved: 1 }))
    }
    const id = await nextId(store, 'members/')
    await store.setJSON(`members/${id}.json`, {
      id, schemeId, studentId, groupId,
      sortOrder: num(body.sortOrder, 0), createTime: now(), deleted: 0,
    })
    return json(ok({ id, moved: 0 }))
  } catch (e) {
    return json(fail(e?.message || '小组成员操作失败', 500))
  }
}
