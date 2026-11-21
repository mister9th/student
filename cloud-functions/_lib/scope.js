/**
 * 五级数据权限统一 scope（K12-P4 §3，唯一实现）
 * ------------------------------------------------------------------
 * buildScope(context) 只从 token 解析出的 user 出发构造权限范围，
 * 绝不信任前端传入的 studentId/classId/subjectId（前端参数只能进一步收窄）。
 *
 * applyScope(records, scope, opts) 按记录上的 studentId / classId / subjectId
 * 叠加过滤。分页端点把 scope.filterFn 直接并入分页前的 filter，避免 total 失真。
 */
import { S } from './store.js'
import { currentUser, num } from './util.js'

/** 列出前缀下全部未删除文档 */
async function docsOf(storeObj, prefix) {
  const { blobs } = await storeObj.list({ prefix })
  const docs = await Promise.all(blobs.map((b) => storeObj.get(b.key, { type: 'json' })))
  return docs.filter((d) => d && d.deleted !== 1)
}

/** 读记录字段：opts[name] 或 opts[name+'Field'] 可覆盖默认字段名；空值视为不存在
 *  P4 后续修复：调用方既有传 class/student（早期端点），也有传 classField/studentField
 *  （class/page、student/page 等），两种都要支持，否则班级/学生文档只有 id 无 classId 会被全过滤 */
function fieldOf(record, opts, name, defaultName) {
  const override = opts && (opts[name] || opts[name + 'Field'])
  const key = override || defaultName
  const v = record ? record[key] : undefined
  return v === undefined || v === null || v === '' ? null : v
}

/** opts.by 未指定或等于 name 时，才使用该维度判定 */
function wanted(opts, name) {
  return !opts || opts.by === undefined || opts.by === null || opts.by === name
}

/**
 * 学生：只允许本人 studentId；无 studentId 的记录（如班级作业/课表）按本人 classId 放行。
 */
function studentFilter(scope) {
  return (record, opts) => {
    if (!scope.ownStudentId) return false
    if (wanted(opts, 'student')) {
      const sid = fieldOf(record, opts, 'student', 'studentId')
      if (sid !== null) return num(sid, 0) === scope.ownStudentId
    }
    if (wanted(opts, 'class')) {
      const cid = fieldOf(record, opts, 'class', 'classId')
      if (cid !== null) return !!scope.ownClassId && num(cid, 0) === scope.ownClassId
    }
    return false
  }
}

/**
 * 年级组长：manageGrades → 年级集合；学生按 studentId/grade，班级/课表按 classId/grade。
 */
function gradeFilter(scope) {
  return (record, opts) => {
    if (!scope.manageGrades.size) return false
    if (wanted(opts, 'student')) {
      const sid = fieldOf(record, opts, 'student', 'studentId')
      if (sid !== null) return scope.allowedStudentIds.has(num(sid, 0))
    }
    if (wanted(opts, 'class')) {
      const cid = fieldOf(record, opts, 'class', 'classId')
      if (cid !== null) return scope.allowedClassIds.has(num(cid, 0))
    }
    if (wanted(opts, 'grade')) {
      const gid = fieldOf(record, opts, 'grade', 'grade')
      if (gid !== null) return scope.manageGrades.has(num(gid, 0))
    }
    return false
  }
}

/**
 * 教师：班主任本班全科目 ∪ 科任（所教班级 + 所教学科）。
 * - 记录带 subjectId：班主任所带班整班放行；否则要求 (classId, subjectId) 命中授课关系；
 *   无 classId 时退化为 subjectId ∈ 所教学科集合。
 * - 记录不带 subjectId：按 classId（或 studentId 反查得到的学生集合）放行。
 */
function teacherFilter(scope) {
  return (record, opts) => {
    const sid = wanted(opts, 'student') ? fieldOf(record, opts, 'student', 'studentId') : null
    const cid = wanted(opts, 'class') ? fieldOf(record, opts, 'class', 'classId') : null
    const subId = wanted(opts, 'subject') ? fieldOf(record, opts, 'subject', 'subjectId') : null

    if (subId !== null) {
      const ncid = cid === null ? 0 : num(cid, 0)
      if (ncid && scope.headClassIds.has(ncid)) return true
      if (ncid) {
        const subs = scope.teachByClass.get(ncid)
        return !!(subs && subs.has(num(subId, 0)))
      }
      return scope.allowedSubjectIds.has(num(subId, 0))
    }
    if (cid !== null) return scope.allowedClassIds.has(num(cid, 0))
    if (sid !== null) return scope.allowedStudentIds.has(num(sid, 0))
    return false
  }
}

/**
 * 依据当前请求构造 scope。
 * 返回 { type, filterFn, allowedClassIds, allowedStudentIds, allowedSubjectIds, ... }
 */
export async function buildScope(context) {
  const user = await currentUser(context)
  const userType = num(user && user.userType, 0)
  const uid = num(user && (user.id !== undefined ? user.id : user.userId), 0)
  const snapshot = user && Array.isArray(user.permissions) ? user.permissions : []
  const roles = user && Array.isArray(user.roles) ? user.roles : []
  const isAdmin = userType === 3 || snapshot.includes('*:*') || roles.includes('ROLE_ADMIN')

  if (!user) {
    return {
      type: 'guest', user: null,
      filterFn: () => false,
      allowedClassIds: new Set(), allowedStudentIds: new Set(), allowedSubjectIds: new Set(),
    }
  }
  if (isAdmin) {
    return {
      type: 'admin', user,
      filterFn: () => true,
      allowedClassIds: null, allowedStudentIds: null, allowedSubjectIds: null,
    }
  }

  const academic = S.academic()
  const [classes, students, teachings] = await Promise.all([
    docsOf(academic, 'classes/'),
    docsOf(academic, 'students/'),
    docsOf(academic, 'teachings/'),
  ])

  // 年级组长（userType=4）
  if (userType === 4) {
    const manageGrades = new Set(
      (Array.isArray(user.manageGrades) ? user.manageGrades : [])
        .map((g) => num(g, 0)).filter((g) => g >= 1 && g <= 12)
    )
    const allowedClassIds = new Set(classes
      .filter((c) => manageGrades.has(num(c.grade, 0)))
      .map((c) => num(c.id, 0)))
    const allowedStudentIds = new Set(students
      .filter((s) => manageGrades.has(num(s.grade, 0)) || allowedClassIds.has(num(s.classId, 0)))
      .map((s) => num(s.id, 0)))
    const scope = {
      type: 'grade', user, manageGrades,
      allowedClassIds, allowedStudentIds, allowedSubjectIds: null,
    }
    scope.filterFn = gradeFilter(scope)
    return scope
  }

  // 教师（userType=2）：班主任 ∪ 科任
  if (userType === 2) {
    const headClassIds = new Set(classes
      .filter((c) => num(c.headTeacherId, 0) === uid && uid > 0)
      .map((c) => num(c.id, 0)))
    const teachByClass = new Map()
    const allowedSubjectIds = new Set()
    const teachClassIds = new Set()
    for (const t of teachings) {
      if (num(t.teacherId, 0) !== uid || uid <= 0) continue
      if (num(t.status, 1) === 0) continue
      const cid = num(t.classId, 0)
      const subId = num(t.subjectId, 0)
      if (!cid) continue
      teachClassIds.add(cid)
      if (subId) {
        allowedSubjectIds.add(subId)
        if (!teachByClass.has(cid)) teachByClass.set(cid, new Set())
        teachByClass.get(cid).add(subId)
      }
    }
    const allowedClassIds = new Set([...headClassIds, ...teachClassIds])
    const allowedStudentIds = new Set(students
      .filter((s) => allowedClassIds.has(num(s.classId, 0)))
      .map((s) => num(s.id, 0)))
    const scope = {
      type: 'teacher', user, headClassIds, teachByClass,
      allowedClassIds, allowedStudentIds, allowedSubjectIds,
    }
    scope.filterFn = teacherFilter(scope)
    return scope
  }

  // 学生（userType=1）
  if (userType === 1) {
    const me = students.find((s) => num(s.userId, 0) === uid && uid > 0)
    const ownStudentId = me ? num(me.id, 0) : 0
    const ownClassId = me ? num(me.classId, 0) : 0
    const scope = {
      type: 'student', user, ownStudentId, ownClassId,
      manageGrades: new Set(),
      allowedClassIds: ownClassId ? new Set([ownClassId]) : new Set(),
      allowedStudentIds: ownStudentId ? new Set([ownStudentId]) : new Set(),
      allowedSubjectIds: null,
    }
    scope.filterFn = studentFilter(scope)
    return scope
  }

  // 未知角色：默认拒绝，不放行任何业务数据
  return {
    type: 'none', user,
    filterFn: () => false,
    allowedClassIds: new Set(), allowedStudentIds: new Set(), allowedSubjectIds: new Set(),
  }
}

/**
 * 对记录数组应用 scope。opts 可指定字段名：
 * { studentField, classField, subjectField, gradeField, by: 'student'|'class'|'subject' }
 */
export function applyScope(records, scope, opts = {}) {
  if (!Array.isArray(records)) return records
  if (!scope || scope.type === 'admin') return records
  const fn = typeof scope.filterFn === 'function' ? scope.filterFn : () => false
  return records.filter((r) => fn(r, opts))
}
