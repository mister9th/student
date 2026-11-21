/**
 * 权限唯一真相源（K12-P8 §2.1 / §2.2）
 * ------------------------------------------------------------------
 * 本文件是后端权限码、角色映射、effective 计算的唯一实现：
 *   - ROLE_DEFS / DEFAULT_ROLE_PERMISSIONS / ALL_PERMISSION_CODES 收敛于此；
 *   - util.js / seed.js 改为从本文件 re-export，消除两份分叉副本；
 *   - loadRolePermissions 以 edu-auth rbac/<roleCode>.json 为运行时真相源（缺失自愈）；
 *   - resolveEffectivePermissions 统一 effective 口径，支持撤销（减法）。
 * 仅依赖 store.js，不反向依赖 util.js / seed.js，避免循环。
 */
import { S } from './store.js'

/** 角色定义（roleCode <-> userType 映射），seed 播种与 /system/roles 共用 */
export const ROLE_DEFS = [
  { id: 1, roleName: '超级管理员', roleCode: 'ROLE_ADMIN', userType: 3, description: '系统超级管理员', sortOrder: 1 },
  { id: 2, roleName: '教师', roleCode: 'ROLE_TEACHER', userType: 2, description: '教师角色', sortOrder: 2 },
  { id: 3, roleName: '学生', roleCode: 'ROLE_STUDENT', userType: 1, description: '学生角色', sortOrder: 3 },
  { id: 5, roleName: '年级组长', roleCode: 'ROLE_GRADE_LEADER', userType: 4, description: '年段工作+跨班级查看（P1）', sortOrder: 5 },
]

/**
 * 四角色默认权限码（首次播种用；运行时以 Blob rbac/<code>.json 为准）。
 * 由 util.js + seed.js 两份合并而来，并补齐 8 个独立的 :delete 码：
 * class:delete / teacher:delete / student:delete / score:delete / fiveedu:delete（教师、组长授予；学生不授）。
 * homework:delete / moral:delete / timetable:delete 原本已在表中。
 */
export const DEFAULT_ROLE_PERMISSIONS = {
  ROLE_ADMIN: ['*:*'],
  ROLE_TEACHER: [
    'dashboard', 'dashboard:screen', 'student', 'student:list', 'student:add', 'student:edit',
    'student:import', 'student:export', 'teacher', 'teacher:list', 'teacher:add', 'teacher:edit',
    'class', 'class:list', 'class:add', 'class:edit', 'class:delete',
    'course', 'course:list', 'course:add', 'course:edit',
    'score', 'score:list', 'score:add', 'score:edit', 'score:ranking', 'score:delete',
    'notice', 'message', 'message:list', 'file', 'file:list', 'ai', 'ai:chat',
    'moral', 'moral:list', 'moral:add', 'moral:edit', 'moral:approve', 'moral:delete',
    'group', 'group:list', 'group:add', 'group:edit', 'group:delete',
    'inspection', 'inspection:list', 'inspection:add', 'inspection:edit', 'inspection:delete',
    'redflag', 'redflag:list', 'redflag:add', 'redflag:edit',
    'grade', 'grade:list', 'grade:add', 'grade:edit',
    'exam', 'exam:list', 'exam:add', 'exam:edit', 'exam:delete',
    'fiveedu', 'fiveedu:list', 'fiveedu:add', 'fiveedu:edit', 'fiveedu:delete',
    'termcomment', 'termcomment:list', 'termcomment:add', 'termcomment:edit',
    'homework', 'homework:list', 'homework:add', 'homework:edit', 'homework:delete', 'homework:grade',
    'selection', 'selection:list', 'selection:add', 'selection:edit',
    'assignment', 'assignment:list', 'assignment:add', 'assignment:edit', 'assignment:delete',
    'assign-score',
    'timetable', 'timetable:list', 'timetable:add', 'timetable:edit', 'timetable:delete',
  ],
  ROLE_GRADE_LEADER: [
    'dashboard', 'dashboard:screen', 'student', 'student:list', 'student:add', 'student:edit',
    'student:import', 'student:export', 'teacher', 'teacher:list', 'teacher:add', 'teacher:edit',
    'class', 'class:list', 'class:add', 'class:edit', 'class:delete',
    'course', 'course:list', 'course:add', 'course:edit',
    'score', 'score:list', 'score:add', 'score:edit', 'score:ranking', 'score:delete',
    'notice', 'message', 'message:list', 'file', 'file:list', 'ai', 'ai:chat',
    'moral', 'moral:list', 'moral:add', 'moral:edit', 'moral:approve', 'moral:delete',
    'group', 'group:list', 'group:add', 'group:edit', 'group:delete',
    'inspection', 'inspection:list', 'inspection:add', 'inspection:edit', 'inspection:delete',
    'redflag', 'redflag:list', 'redflag:add', 'redflag:edit',
    'grade', 'grade:list', 'grade:add', 'grade:edit',
    'exam', 'exam:list', 'exam:add', 'exam:edit', 'exam:delete',
    'fiveedu', 'fiveedu:list', 'fiveedu:add', 'fiveedu:edit', 'fiveedu:delete',
    'termcomment', 'termcomment:list', 'termcomment:add', 'termcomment:edit',
    'homework', 'homework:list', 'homework:add', 'homework:edit', 'homework:delete', 'homework:grade',
    'selection', 'selection:list', 'selection:add', 'selection:edit',
    'assignment', 'assignment:list', 'assignment:add', 'assignment:edit', 'assignment:delete',
    'assign-score',
    'timetable', 'timetable:list', 'timetable:add', 'timetable:edit', 'timetable:delete',
    'grade-leader',
  ],
  ROLE_STUDENT: [
    'dashboard', 'dashboard:screen', 'ai', 'ai:chat', 'message', 'message:list', 'student:list', 'score:list',
    'moral', 'moral:list', 'fiveedu:list', 'termcomment:list',
    'homework:list', 'homework:submit', 'selection:list', 'selection:add', 'selection:edit', 'timetable:list',
  ],
}

/**
 * 权限树元数据（按模块分组，供 /system/permissions 与前端 n-tree 使用）。
 * group=唯一分组键；label=展示名；module=顶层模块（德育 6 子模块同属 moral）；
 * codes=该分组下全部在用权限码。ALL_PERMISSION_CODES 由此扁平化生成，单一来源。
 */
export const PERMISSION_GROUPS = [
  { group: 'workbench', module: 'workbench', label: '工作台', codes: ['dashboard', 'dashboard:screen'] },
  { group: 'student', module: 'student', label: '学生管理', codes: ['student', 'student:list', 'student:add', 'student:edit', 'student:delete', 'student:import', 'student:export'] },
  { group: 'teacher', module: 'teacher', label: '教师管理', codes: ['teacher', 'teacher:list', 'teacher:add', 'teacher:edit', 'teacher:delete'] },
  { group: 'class', module: 'class', label: '班级管理', codes: ['class', 'class:list', 'class:add', 'class:edit', 'class:delete'] },
  { group: 'course', module: 'course', label: '课程管理', codes: ['course', 'course:list', 'course:add', 'course:edit', 'course:delete'] },
  { group: 'exam', module: 'exam', label: '考试管理', codes: ['exam', 'exam:list', 'exam:add', 'exam:edit', 'exam:delete'] },
  { group: 'score', module: 'score', label: '成绩管理', codes: ['score', 'score:list', 'score:add', 'score:edit', 'score:delete', 'score:ranking'] },
  { group: 'moral-record', module: 'moral', label: '德育·记录', codes: ['moral', 'moral:list', 'moral:add', 'moral:edit', 'moral:delete', 'moral:approve'] },
  { group: 'group', module: 'moral', label: '德育·小组', codes: ['group', 'group:list', 'group:add', 'group:edit', 'group:delete'] },
  { group: 'inspection', module: 'moral', label: '德育·检查', codes: ['inspection', 'inspection:list', 'inspection:add', 'inspection:edit', 'inspection:delete'] },
  { group: 'redflag', module: 'moral', label: '德育·红旗', codes: ['redflag', 'redflag:list', 'redflag:add', 'redflag:edit'] },
  { group: 'grade', module: 'moral', label: '德育·年段', codes: ['grade', 'grade:list', 'grade:add', 'grade:edit', 'grade-leader'] },
  { group: 'fiveedu', module: 'moral', label: '德育·五育', codes: ['fiveedu', 'fiveedu:list', 'fiveedu:add', 'fiveedu:edit', 'fiveedu:delete'] },
  { group: 'homework', module: 'homework', label: '作业管理', codes: ['homework', 'homework:list', 'homework:add', 'homework:edit', 'homework:delete', 'homework:submit', 'homework:grade'] },
  { group: 'selection', module: 'selection', label: '选科走班', codes: ['selection', 'selection:list', 'selection:add', 'selection:edit', 'assignment', 'assignment:list', 'assignment:add', 'assignment:edit', 'assignment:delete', 'assign-score'] },
  { group: 'timetable', module: 'timetable', label: '课表管理', codes: ['timetable', 'timetable:list', 'timetable:add', 'timetable:edit', 'timetable:delete'] },
  { group: 'message', module: 'message', label: '消息中心', codes: ['message', 'message:list'] },
  { group: 'notice', module: 'notice', label: '公告管理', codes: ['notice'] },
  { group: 'ai', module: 'ai', label: 'AI 与评语', codes: ['ai', 'ai:chat', 'termcomment', 'termcomment:list', 'termcomment:add', 'termcomment:edit'] },
  { group: 'file', module: 'file', label: '文件管理', codes: ['file', 'file:list'] },
  { group: 'system', module: 'system', label: '系统管理', codes: ['system:config', 'permission:manage'] },
]

/** 历史遗留/纯幽灵码：保留声明但标注 unused，不进入权限树，避免误导勾选 */
export const UNUSED_PERMISSION_CODES = ['system']

const collectCodes = (groups) => {
  const out = []
  for (const g of groups) if (Array.isArray(g.codes)) out.push(...g.codes)
  return Array.from(new Set(out))
}

/** 完整注册表 = 所有在用权限码（含默认码；剔除纯幽灵码） */
export const ALL_PERMISSION_CODES = collectCodes(PERMISSION_GROUPS)

/** userType -> roleCode（唯一实现，util.js / seed.js re-export） */
export const roleOf = (userType) => (
  Number(userType) === 4 ? 'ROLE_GRADE_LEADER'
    : Number(userType) === 2 ? 'ROLE_TEACHER'
      : Number(userType) === 1 ? 'ROLE_STUDENT'
        : 'ROLE_ADMIN'
)

/** userType -> 默认权限码（同步，兼容旧调用点；运行时请以 resolveEffectivePermissions 为准） */
export const permsOf = (userType) => DEFAULT_ROLE_PERMISSIONS[roleOf(userType)] || []

/**
 * 解析用户角色码数组：优先用户文档 roles，否则按 userType 推导。
 * 兼容传 userType 原始值。
 */
export function resolveRoleCodes(user) {
  if (user && Array.isArray(user.roles) && user.roles.length) return user.roles
  const ut = user && typeof user === 'object' ? user.userType : user
  return [roleOf(ut)]
}

/**
 * 从 Blob 读取角色权限码（真相源）。
 * 缺失或字段非法时回退 DEFAULT 并写回（onlyIfNew 首次播种，自愈）；读取异常时静默回退 DEFAULT。
 */
export async function loadRolePermissions(roleCode) {
  const fallback = DEFAULT_ROLE_PERMISSIONS[roleCode] || []
  const key = `rbac/${roleCode}.json`
  try {
    const auth = S.auth()
    const doc = await auth.get(key, { type: 'json' })
    if (doc && Array.isArray(doc.permissionCodes)) return doc.permissionCodes
    await auth.setJSON(key, { roleCode, permissionCodes: fallback }, { onlyIfNew: true })
    return fallback
  } catch (_) {
    return fallback
  }
}

/**
 * 统一 effective 计算（唯一实现）：
 *   effective = Blob 角色权限码（真相源） ∪ 用户快照中的自定义残留码；
 *   但属于「该角色默认码 ∪ 当前 Blob 码」的快照码视为角色来源，撤销后自然消失（减法）。
 *
 * 关键性质：
 *   - 改 Blob 角色配置撤销某码 -> 该码既不在 Blob，也不算自定义残留 -> effective 中消失；
 *   - 未 apply 的存量用户 -> 快照码均属角色 baseline -> effective 等于当前 Blob 角色权限，不丢权限；
 *   - apply 后快照被精确覆盖为「角色码 ∪ 自定义残留」-> 再次计算不变（幂等）。
 */
export async function resolveEffectivePermissions(user) {
  if (!user) return []
  const roleCodes = resolveRoleCodes(user)
  const loaded = await Promise.all(roleCodes.map(async (code) => ({ code, blob: await loadRolePermissions(code) })))

  const rolePerms = new Set()
  for (const item of loaded) for (const p of item.blob) rolePerms.add(p)
  // 超管单点短路（角色配置或存量快照任一含 *:*）
  if (rolePerms.has('*:*')) return ['*:*']
  const snapshot = Array.isArray(user.permissions) ? user.permissions : []
  if (snapshot.includes('*:*')) return ['*:*']

  // baseline = 角色默认码 ∪ 当前 Blob 码：快照中落在 baseline 的码随角色走，撤销即消失
  const baseline = new Set()
  for (const item of loaded) {
    for (const p of (DEFAULT_ROLE_PERMISSIONS[item.code] || [])) baseline.add(p)
    for (const p of item.blob) baseline.add(p)
  }
  const custom = snapshot.filter((p) => typeof p === 'string' && p && !baseline.has(p))
  return Array.from(new Set([...rolePerms, ...custom]))
}
