/** POST /api/message/send-all —— 管理员群发通知（按年级/科目/班主任/全体教师） */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { num, requirePermission } from '../../_lib/util.js'

/** 读取某前缀下全部未删除文档 */
async function docsOf(storeObj, prefix) {
  const { blobs } = await storeObj.list({ prefix })
  const docs = await Promise.all(blobs.map((b) => storeObj.get(b.key, { type: 'json' })))
  return docs.filter((d) => d && d.deleted !== 1)
}

/** 根据 targetType / targetValue 计算接收人 userId 列表（均为教师 user id） */
async function receiverIdsOf(academic, targetType, targetValue) {
  if (targetType === 'all') {
    const teachers = await docsOf(academic, 'teachers/')
    return [...new Set(
      teachers.filter((t) => t.userId).map((t) => num(t.userId, 0)).filter(Boolean)
    )]
  }

  if (targetType === 'grade') {
    const grade = num(targetValue, NaN)
    const classes = (await docsOf(academic, 'classes/')).filter((c) => num(c.grade, NaN) === grade)
    const classIds = new Set(classes.map((c) => num(c.id, 0)))
    const teachings = (await docsOf(academic, 'teachings/')).filter(
      (t) => num(t.status, 0) === 1 && classIds.has(num(t.classId, 0))
    )
    const teacherIds = new Set(teachings.map((t) => num(t.teacherId, 0)).filter(Boolean))
    if (teacherIds.size) {
      const teachers = await docsOf(academic, 'teachers/')
      const ids = [...new Set(
        teachers.filter((t) => teacherIds.has(num(t.userId, 0))).map((t) => num(t.userId, 0))
      )]
      if (ids.length) return ids
    }
    // 回退：该年级班主任（teachings 无有效数据时的兜底）
    return [...new Set(classes.map((c) => num(c.headTeacherId, 0)).filter(Boolean))]
  }

  if (targetType === 'subject') {
    const subject = String(targetValue ?? '')
    const teachings = (await docsOf(academic, 'teachings/')).filter(
      (t) => num(t.status, 0) === 1 && String(t.subjectName ?? '') === subject
    )
    const teacherIds = new Set(teachings.map((t) => num(t.teacherId, 0)).filter(Boolean))
    const teachers = await docsOf(academic, 'teachers/')
    if (teacherIds.size) {
      const ids = [...new Set(
        teachers.filter((t) => teacherIds.has(num(t.userId, 0))).map((t) => num(t.userId, 0))
      )]
      if (ids.length) return ids
    }
    // 回退：按教师档案任教学科 department 匹配（兼容授课关系未建）
    return [...new Set(
      teachers.filter((t) => String(t.department ?? '') === subject && t.userId)
        .map((t) => num(t.userId, 0)).filter(Boolean)
    )]
  }

  if (targetType === 'headTeacher') {
    const hid = num(targetValue, 0)
    const classes = await docsOf(academic, 'classes/')
    if (!classes.some((c) => num(c.headTeacherId, 0) === hid)) return []
    return [hid]
  }

  return []
}

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'message')
    if (guard instanceof Response) return guard
    // 管理员发通知：userType=3 或携带 *:*，其余角色禁止（避免学生/教师群发）
    if (Number(guard.userType) !== 3 && !(Array.isArray(guard.permissions) && guard.permissions.includes('*:*'))) {
      return json(fail('仅管理员可群发通知', 403), 403)
    }
    const body = await bodyOf(context.request)
    const targetType = String(body.targetType || '')
    const userIds = await receiverIdsOf(S.academic(), targetType, body.targetValue)
    if (!userIds.length) return json(ok({ count: 0, targetType }))

    const content = S.content()
    const base = await nextId(content, 'messages/')
    const ts = now()
    const senderId = num(guard.id ?? guard.userId, 0) || 1
    const jobs = userIds.map((receiverId, i) => () => content.setJSON(`messages/${base + i}.json`, {
      id: base + i, senderId, receiverId,
      title: String(body.title || ''), content: String(body.content || ''),
      messageType: String(body.messageType || 'system'),
      isRead: 0, readTime: null, createTime: ts, deleted: 0,
    }))
    for (let i = 0; i < jobs.length; i += 30) {
      await Promise.all(jobs.slice(i, i + 30).map((fn) => fn()))
    }
    return json(ok({ count: userIds.length, targetType }))
  } catch (e) {
    return json(fail(e?.message || '群发失败', 500))
  }
}
