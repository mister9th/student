/** POST /api/message/send-all —— 管理员/年级组长群发通知（按年级/科目/班主任/全体教师） */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { num, requirePermission } from '../../_lib/util.js'
import { GRADE_NAMES } from '../../_lib/k12.js'

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

/** 人类可读的发送范围描述（契约 §2.1 / §2.3） */
async function targetDescOf(academic, targetType, targetValue) {
  if (targetType === 'all') return '全体教师'
  if (targetType === 'grade') {
    const g = num(targetValue, NaN)
    const name = GRADE_NAMES[g]
    if (!name) return `${g}年级`
    return /年级$/.test(name) ? name : `${name}年级`
  }
  if (targetType === 'subject') {
    const s = String(targetValue ?? '')
    return s ? `${s}科目` : '科目'
  }
  if (targetType === 'headTeacher') {
    const hid = num(targetValue, 0)
    const teachers = await docsOf(academic, 'teachers/')
    const t = teachers.find((x) => num(x.userId, 0) === hid)
    const name = t?.realName ? String(t.realName) : `用户${hid}`
    return `班主任${name}`
  }
  return '全体教师'
}

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'message')
    if (guard instanceof Response) return guard
    // 管理员（userType=3 或携带 *:*）或年级组长（userType=4）可群发；其余角色禁止
    const userType = Number(guard.userType)
    const snapshotPerms = Array.isArray(guard.permissions) ? guard.permissions : []
    const isAdmin = userType === 3 || snapshotPerms.includes('*:*')
    const isLeader = userType === 4
    if (!isAdmin && !isLeader) return json(fail('仅管理员或年级组长可群发通知', 403), 403)

    const body = await bodyOf(context.request)
    const targetType = String(body.targetType || '')

    // 年级组长：仅允许 targetType='grade'，且 targetValue 必须落在 manageGrades(1-12) 内
    if (isLeader) {
      if (targetType !== 'grade') return json(fail('年级组长只能按年级发送', 403), 403)
      const managed = (Array.isArray(guard.manageGrades) ? guard.manageGrades : [])
        .map((g) => num(g, NaN))
        .filter((g) => Number.isInteger(g) && g >= 1 && g <= 12)
      if (!managed.length) return json(fail('年级组长未配置管辖年级，无法发送', 403), 403)
      const g = num(body.targetValue, NaN)
      if (!Number.isInteger(g) || g < 1 || g > 12 || !managed.includes(g)) {
        return json(fail('年级组长只能向所辖年级发送', 403), 403)
      }
    }

    const academic = S.academic()
    const userIds = await receiverIdsOf(academic, targetType, body.targetValue)
    const batchId = `b-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const batchTitle = String(body.title || '')
    if (!userIds.length) return json(ok({ count: 0, targetType, batchId }))

    const targetDesc = await targetDescOf(academic, targetType, body.targetValue)
    const senderId = num(guard.id ?? guard.userId, 0) || 1
    const senderName = String(guard.realName || guard.username || `用户${senderId}`)
    const content = S.content()
    const base = await nextId(content, 'messages/')
    const ts = now()
    const jobs = userIds.map((receiverId, i) => () => content.setJSON(`messages/${base + i}.json`, {
      id: base + i, senderId, receiverId,
      title: batchTitle, content: String(body.content || ''),
      messageType: String(body.messageType || 'system'),
      batchId, batchTitle, targetType, targetDesc, senderName,
      isRead: 0, readTime: null, createTime: ts, deleted: 0,
    }))
    for (let i = 0; i < jobs.length; i += 30) {
      await Promise.all(jobs.slice(i, i + 30).map((fn) => fn()))
    }
    return json(ok({ count: userIds.length, targetType, batchId }))
  } catch (e) {
    return json(fail(e?.message || '群发失败', 500))
  }
}
