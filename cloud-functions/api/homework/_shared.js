/**
 * 作业管理模块内部共享工具（P3 §1）
 * ------------------------------------------------------------------
 * - normalizeAssignment：发布/编辑共用字段校验与归一化（范式参考 api/exam/_validate.js）
 * - isLateOf：是否迟交（submitTime > dueTime）
 * - ownStudentProfile：当前学生用户 -> 学生档案（userId === user.id）
 * - notifyClassStudents：按班群发通知（30 并发分批，复用 message/send-all 范式）
 */
import { S, nextId, now } from '../../_lib/store.js'
import { num, currentSemester } from '../../_lib/util.js'

const DUE_RE = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/
const validDue = (s) => {
  if (!DUE_RE.test(s)) return false
  const t = new Date(s.replace(' ', 'T'))
  return !Number.isNaN(t.getTime())
}

/** 归一化作业字段。base 为编辑时的旧文档，未传字段回退到 base / 缺省。返回 {error,data} */
export function normalizeAssignment(body = {}, base = null) {
  const b = body && typeof body === 'object' ? body : {}
  const pick = (k, def = '') => (b[k] !== undefined ? b[k] : (base ? base[k] : def))
  const classId = num(pick('classId', 0), 0)
  const subjectId = num(pick('subjectId', 0), 0)
  if (!classId) return { error: '班级不能为空', data: null }
  if (!subjectId) return { error: '科目不能为空', data: null }
  const title = String(pick('title', '') ?? '').trim()
  if (!title) return { error: '作业标题不能为空', data: null }
  const expectedMinutes = num(pick('expectedMinutes', 0), 0)
  if (!Number.isInteger(expectedMinutes) || expectedMinutes < 0 || expectedMinutes > 480) {
    return { error: '预计时长须为 0-480 之间的整数分钟', data: null }
  }
  const dueTime = String(pick('dueTime', '') ?? '').trim()
  if (!validDue(dueTime)) return { error: '截止时间格式应为 YYYY-MM-DD HH:mm', data: null }
  const attachmentsRaw = pick('attachments', [])
  const attachments = Array.isArray(attachmentsRaw) ? attachmentsRaw.map((x) => String(x)).filter(Boolean) : []
  const semester = String(pick('semester', '') ?? '').trim() || currentSemester()
  const statusRaw = b.status !== undefined ? b.status : (base ? base.status : 1)
  const status = num(statusRaw, 1) === 0 ? 0 : 1
  return {
    error: null,
    data: { classId, subjectId, title, content: String(pick('content', '') ?? ''), expectedMinutes, dueTime, attachments, semester, status },
  }
}

/** 迟交判定：submitTime 晚于 dueTime 置 1 */
export function isLateOf(dueTime, submitTime) {
  if (!dueTime || !submitTime) return 0
  const due = new Date(String(dueTime).replace(' ', 'T'))
  const sub = new Date(String(submitTime).replace(' ', 'T'))
  if (Number.isNaN(due.getTime()) || Number.isNaN(sub.getTime())) return 0
  return sub.getTime() > due.getTime() ? 1 : 0
}

/** 学生用户 -> 学生档案（找不到返回 null）；非学生返回 null */
export async function ownStudentProfile(user, academic) {
  if (!user || Number(user.userType) !== 1) return null
  const uid = num(user.id ?? user.userId, 0)
  if (!uid) return null
  const { blobs } = await academic.list({ prefix: 'students/' })
  const docs = await Promise.all(blobs.map((b) => academic.get(b.key, { type: 'json' })))
  return docs.find((d) => d && d.deleted !== 1 && num(d.userId, 0) === uid) || null
}

/** 按班群发新作业通知（30 并发分批）。返回发送条数。 */
export async function notifyClassStudents(classId, title, content, senderId) {
  const academic = S.academic()
  const contentStore = S.content()
  const { blobs } = await academic.list({ prefix: 'students/' })
  const students = await Promise.all(blobs.map((b) => academic.get(b.key, { type: 'json' })))
  const userIds = [...new Set(
    students
      .filter((s) => s && s.deleted !== 1 && num(s.classId, 0) === num(classId, 0) && s.userId)
      .map((s) => num(s.userId, 0))
      .filter(Boolean)
  )]
  if (!userIds.length) return 0
  const base = await nextId(contentStore, 'messages/')
  const ts = now()
  const jobs = userIds.map((receiverId, i) => () => contentStore.setJSON(`messages/${base + i}.json`, {
    id: base + i,
    senderId: num(senderId, 0) || 1,
    receiverId,
    title: String(title || ''),
    content: String(content || ''),
    messageType: 'system',
    isRead: 0,
    readTime: null,
    createTime: ts,
    deleted: 0,
  }))
  for (let i = 0; i < jobs.length; i += 30) {
    await Promise.all(jobs.slice(i, i + 30).map((fn) => fn()))
  }
  return userIds.length
}

/** 统计某作业的提交情况（供 [id].js / page.js / stats.js 复用） */
export async function submissionStatsOf(homework, assignmentId) {
  const { blobs } = await homework.list({ prefix: 'submissions/' })
  const docs = await Promise.all(blobs.map((b) => homework.get(b.key, { type: 'json' })))
  const subs = docs.filter((s) => s && s.deleted !== 1 && num(s.assignmentId, 0) === num(assignmentId, 0))
  const graded = subs.filter((s) => s.status === 'graded')
  const scored = graded.filter((s) => Number.isFinite(Number(s.score)))
  const avgScore = scored.length ? scored.reduce((a, s) => a + Number(s.score), 0) / scored.length : null
  const onTime = subs.filter((s) => num(s.isLate, 0) === 0).length
  return {
    submittedCount: subs.length,
    gradedCount: graded.length,
    avgScore: avgScore === null ? null : Math.round(avgScore * 10) / 10,
    onTimeRate: subs.length ? Math.round((onTime / subs.length) * 1000) / 10 : 0,
  }
}
