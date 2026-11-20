/** GET /api/moral/groups/board?classId=&schemeId= —— 分组看板（组卡片 + 未分组学生池） */
import { S, ok, fail, json, now } from '../../../../_lib/store.js'
import { ensureSeeded } from '../../../../_lib/seed.js'
import { requirePermission, num } from '../../../../_lib/util.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const user = await requirePermission(context, 'group:list')
    if (user instanceof Response) return user
    const q = context.request.query || {}
    const classId = num(q.classId, 0)
    if (!classId) return json(fail('班级不能为空', 400))
    const store = S.moral()

    const { blobs } = await store.list({ prefix: 'schemes/' })
    let schemes = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
    schemes = schemes.filter((x) => x && x.deleted !== 1 && num(x.classId, 0) === classId)
    if (!schemes.length) return json(fail('该班级暂无分组方案', 400))
    const schemeId = num(q.schemeId, 0) || num(schemes.find((x) => num(x.isDefault, 0) === 1)?.id, 0) || num(schemes[0]?.id, 0)
    const scheme = schemes.find((x) => num(x.id, 0) === schemeId)
    if (!scheme) return json(fail('分组方案不存在', 400))

    // 该方案下所有组（含未分组容器组）
    const [groupBlobs, memberBlobs] = [await store.list({ prefix: 'groups/' }), await store.list({ prefix: 'members/' })]
    let groups = await Promise.all(groupBlobs.blobs.map((b) => store.get(b.key, { type: 'json' })))
    groups = groups.filter((x) => x && x.deleted !== 1 && num(x.schemeId, 0) === schemeId)
    groups.sort((a, b) => (num(a.sortOrder, 0) - num(b.sortOrder, 0)) || ((a.id || 0) - (b.id || 0)))

    const members = (await Promise.all(memberBlobs.blobs.map((b) => store.get(b.key, { type: 'json' }))))
      .filter((x) => x && x.deleted !== 1 && num(x.schemeId, 0) === schemeId)

    // 学生档案
    const academic = S.academic()
    const studentOf = async (sid) => {
      const doc = await academic.get(`students/${num(sid, 0)}.json`, { type: 'json' })
      if (!doc || doc.deleted === 1) return null
      return { id: doc.id, realName: String(doc.realName || ''), studentNo: String(doc.studentNo || ''), className: String(doc.className || '') }
    }

    // 组内学生
    const groupIds = new Set(groups.map((g) => num(g.id, 0)))
    const byGroup = new Map()
    const assignedStudentIds = new Set()
    for (const m of members) {
      const gid = num(m.groupId, 0)
      if (!groupIds.has(gid)) continue
      const stu = await studentOf(m.studentId)
      if (!stu) continue
      if (!byGroup.has(gid)) byGroup.set(gid, [])
      byGroup.get(gid).push(stu)
      assignedStudentIds.add(num(m.studentId, 0))
    }
    const groupList = groups.map((g) => ({
      ...g,
      students: (byGroup.get(num(g.id, 0)) || []).sort((a, b) => (a.id || 0) - (b.id || 0)),
    }))

    // 未分组 = 本班学生 − 有成员记录者（实时反连接计算）
    const stuBlobs = await academic.list({ prefix: 'students/' })
    let classStudents = await Promise.all(stuBlobs.blobs.map((b) => academic.get(b.key, { type: 'json' })))
    classStudents = classStudents
      .filter((x) => x && x.deleted !== 1 && num(x.classId, 0) === classId)
      .sort((a, b) => (a.id || 0) - (b.id || 0))
    const unassigned = classStudents
      .filter((x) => !assignedStudentIds.has(num(x.id, 0)))
      .map((x) => ({ id: x.id, realName: String(x.realName || ''), studentNo: String(x.studentNo || ''), className: String(x.className || '') }))

    return json(ok({ scheme, groups: groupList, unassigned, updateTime: now() }))
  } catch (e) {
    return json(fail(e?.message || '分组看板查询失败', 500))
  }
}
