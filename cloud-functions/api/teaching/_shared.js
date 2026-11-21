/**
 * 授课关系模块共享逻辑（K12-P4 §1）
 * 文档存 S.academic() 的 teachings/ 前缀；哨兵 teaching/<subjectId>/<classId>/<semester> 去重。
 */
import { num } from '../../_lib/util.js'
import { teacherByUserId, teacherNameByUserId } from '../../_lib/teacher.js'

/** 归一化 + 必填校验。base 为编辑时的旧文档 */
export function normalizeTeaching(body = {}, base = null) {
  const b = body && typeof body === 'object' ? body : {}
  const pick = (k, def = '') => (b[k] !== undefined ? b[k] : (base ? base[k] : def))
  const subjectId = num(pick('subjectId', 0), 0)
  const classId = num(pick('classId', 0), 0)
  const teacherId = num(pick('teacherId', 0), 0)
  const semester = String(pick('semester', '') ?? '').trim()
  const statusRaw = b.status !== undefined ? b.status : (base ? base.status : 1)
  const data = { subjectId, classId, teacherId, semester, status: num(statusRaw, 1) === 0 ? 0 : 1 }
  let error = null
  if (!subjectId) error = '科目不能为空'
  else if (!classId) error = '班级不能为空'
  else if (!teacherId) error = '教师不能为空'
  else if (!semester) error = '学期不能为空'
  return { error, data }
}

/** 哨兵键：同一科目同一班同一学期唯一 */
export const sentinelKeyOf = (d) => `teaching/${d.subjectId}/${d.classId}/${d.semester}`

/** 校验引用的科目/班级/教师存在 */
export async function validateTeachingRefs(store, data) {
  const subject = await store.get(`courses/${data.subjectId}.json`, { type: 'json' })
  if (!subject || subject.deleted === 1) return '科目不存在'
  const cls = await store.get(`classes/${data.classId}.json`, { type: 'json' })
  if (!cls || cls.deleted === 1) return '班级不存在'
  const teacher = await teacherByUserId(store, data.teacherId)
  if (!teacher) return '教师不存在'
  return null
}

/** 后端冗余名称：科目名取课程字典、班级名取班级档案、教师名按 userId 反查 */
export async function resolveNames(store, data, body = {}) {
  const subject = await store.get(`courses/${data.subjectId}.json`, { type: 'json' })
  const cls = await store.get(`classes/${data.classId}.json`, { type: 'json' })
  return {
    subjectName: subject?.courseName || String(body.subjectName || ''),
    className: cls?.className || String(body.className || ''),
    teacherName: await teacherNameByUserId(store, data.teacherId, body.teacherName),
  }
}
