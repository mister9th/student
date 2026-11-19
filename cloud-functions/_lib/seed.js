/**
 * 演示种子数据初始化
 * ------------------------------------------------------------------
 * 首次调用把演示数据写入六个 Blob store，并用 edu-config/meta.json 的
 * seeded 标记防重复。所有写入均 onlyIfNew，并发冷启动也安全。
 * 数据来源与浏览器演示版 db-schema.ts / mock.ts 保持一致。
 */
import bcrypt from 'bcryptjs'
import { S, now } from './store.js'

const PWD_HASH = bcrypt.hashSync('123456', 10)

const CONFIG_DEFAULTS = {
  siteName: 'AI 智慧学生管理系统',
  logo: '',
  aiProvider: 'DeepSeek',
  aiModel: 'deepseek-chat',
  aiApiKey: '',
  aiApiUrl: 'https://api.deepseek.com/v1',
  enableRegistration: true,
  enableAiChat: true,
  enableRiskWarning: true,
  sessionTimeout: 1800,
  maxUploadSize: 100,
}

const ROLE_DEFS = [
  { id: 1, roleName: '超级管理员', roleCode: 'ROLE_ADMIN', description: '系统超级管理员', sortOrder: 1 },
  { id: 2, roleName: '教师', roleCode: 'ROLE_TEACHER', description: '教师角色', sortOrder: 2 },
  { id: 3, roleName: '学生', roleCode: 'ROLE_STUDENT', description: '学生角色', sortOrder: 3 },
]

// 教师 = 教学业务增改 + 查询；学生 = 只读
const ROLE_PERMISSIONS = {
  ROLE_ADMIN: ['*:*'],
  ROLE_TEACHER: [
    'dashboard', 'dashboard:screen', 'student', 'student:list', 'student:add', 'student:edit',
    'student:import', 'student:export', 'teacher', 'teacher:list', 'teacher:add', 'teacher:edit',
    'class', 'class:list', 'class:add', 'class:edit', 'course', 'course:list', 'course:add',
    'course:edit', 'score', 'score:list', 'score:add', 'score:edit', 'notice', 'message',
    'message:list', 'file', 'file:list', 'ai', 'ai:chat',
  ],
  ROLE_STUDENT: ['dashboard', 'dashboard:screen', 'ai', 'ai:chat', 'message', 'message:list', 'student:list', 'score:list'],
}

const ALL_PERMISSION_CODES = [
  'dashboard', 'student', 'teacher', 'class', 'course', 'score', 'ai', 'message', 'file', 'system',
  'dashboard:screen', 'ai:chat', 'student:add', 'student:edit', 'student:delete', 'student:import',
  'student:export', 'teacher:add', 'teacher:edit', 'teacher:delete', 'class:add', 'class:edit',
  'class:delete', 'course:add', 'course:edit', 'course:delete', 'score:add', 'score:edit',
  'score:delete', 'system:config', 'student:list', 'teacher:list', 'class:list', 'course:list',
  'score:list', 'message:list', 'file:list',
]

const roleOf = (userType) => (userType === 2 ? 'ROLE_TEACHER' : userType === 1 ? 'ROLE_STUDENT' : 'ROLE_ADMIN')
const permsOf = (userType) => ROLE_PERMISSIONS[roleOf(userType)]
const pad2 = (n) => String(n).padStart(2, '0')
const gradeOf = (score) => (score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'E')
const pointOf = (score) => Number((score >= 60 ? (score - 50) / 10 : 0).toFixed(1))

const classSeed = [
  ['计算机2201班', '2022', '计算机科学与技术', '信息工程学院'],
  ['计算机2202班', '2022', '计算机科学与技术', '信息工程学院'],
  ['软件工程2301班', '2023', '软件工程', '软件学院'],
  ['电子信息2301班', '2023', '电子信息工程', '电子工程学院'],
  ['人工智能2401班', '2024', '人工智能', '信息工程学院'],
  ['数据科学2401班', '2024', '数据科学与大数据技术', '信息工程学院'],
]
const teacherNames = ['张伟', '李娜', '王强', '刘敏', '陈建国', '杨丽', '赵磊', '孙静', '周涛', '吴芳']
const departments = ['信息工程学院', '软件学院', '电子工程学院', '理学院', '外国语学院']
const titles = ['教授', '副教授', '讲师', '讲师', '副教授', '教授', '讲师', '助教', '副教授', '讲师']
const degrees = ['博士', '硕士', '硕士', '博士', '硕士', '博士', '硕士', '本科', '博士', '硕士']
const studentNames = [
  '王浩然', '李欣怡', '张子轩', '刘雨桐', '陈思远', '杨梦琪',
  '赵一鸣', '黄静怡', '周宇航', '吴佳宁', '徐嘉豪', '孙晓彤',
  '胡博文', '朱雨萱', '高梓涵', '林泽宇', '何欣妍', '郭俊杰',
  '马思琪', '罗天佑', '梁诗涵', '宋子墨', '谢雨欣', '唐皓轩',
]
const courseSeed = [
  ['高等数学', 'MATH001', 4], ['线性代数', 'MATH002', 3], ['概率论与数理统计', 'MATH003', 3],
  ['大学英语', 'ENG001', 2], ['数据结构', 'CS001', 4], ['操作系统', 'CS002', 4],
  ['计算机网络', 'CS003', 3], ['数据库原理', 'CS004', 3], ['机器学习', 'AI001', 3],
  ['人工智能导论', 'AI002', 2], ['软件工程', 'SE001', 3], ['编译原理', 'CS005', 3],
]
const noticeTitles = [
  '关于2024-2025学年第二学期开学安排的通知', '2025年春季运动会报名启动', '图书馆开放时间调整公告',
  '关于举办校园文化艺术节的通知', '期末考试安排及考场查询', '国家奖学金评选结果公示',
  '关于加强校园安全管理的通知', 'AI 智慧学生管理系统使用培训', '暑假社会实践活动安排',
  '关于2025级新生报到的通知', '校园网络安全宣传周活动', '毕业典礼暨学位授予仪式安排',
]
const messageTitles = [
  '成绩录入提醒', '系统升级通知', '班会时间变更', '实验室预约成功', '奖学金申请截止提醒',
  '宿舍安全检查通知', '讲座预告：人工智能前沿', '选课系统开放', '毕业设计选题通知',
  '校园一卡通充值提醒', '疫情期间健康填报', '校内兼职信息发布',
]
const fileSeed = [
  ['2024级学生花名册.xlsx', 'xlsx'], ['人工智能导论课件.pdf', 'pdf'], ['期末考试试卷（A卷）.docx', 'docx'],
  ['班级合影.jpg', 'jpg'], ['实验报告模板.doc', 'doc'], ['学生成绩统计表.xlsx', 'xlsx'],
  ['校园安全检查清单.pdf', 'pdf'], ['毕业论文答辩PPT.pptx', 'pptx'], ['运动会报名表.xlsx', 'xlsx'],
  ['讲座视频.mp4', 'mp4'], ['课程表.xlsx', 'xlsx'], ['奖学金申请材料.zip', 'zip'],
]
const mimeOf = {
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  pdf: 'application/pdf', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  jpg: 'image/jpeg', doc: 'application/msword',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  mp4: 'video/mp4', zip: 'application/zip',
}

let seedPromise = null

/** 模块内去重，避免同一实例并发调用重复写 */
export function ensureSeeded() {
  if (!seedPromise) {
    seedPromise = doSeed().catch((e) => {
      seedPromise = null
      throw e
    })
  }
  return seedPromise
}

async function doSeed() {
  const meta = await S.config().get('meta.json', { type: 'json' })
  if (meta && meta.seeded) return
  await writeSeed()
  await S.config().setJSON('meta.json', { seeded: true, seededAt: now() }, { onlyIfNew: true })
}

/** 重置：清空全部 store 后重新播种（供 /system/reset-demo-data 使用） */
export async function resetAll() {
  const stores = [S.auth(), S.academic(), S.content(), S.logs(), S.ai(), S.config()]
  for (const st of stores) {
    const { blobs } = await st.list()
    for (let i = 0; i < blobs.length; i += 30) {
      await Promise.all(blobs.slice(i, i + 30).map((b) => st.delete(b.key)))
    }
  }
  seedPromise = null
  await ensureSeeded()
}

async function runJobs(jobs, size = 30) {
  for (let i = 0; i < jobs.length; i += size) {
    await Promise.all(jobs.slice(i, i + size).map((fn) => fn()))
  }
}

async function writeSeed() {
  const auth = S.auth()
  const academic = S.academic()
  const content = S.content()
  const logs = S.logs()
  const config = S.config()
  const jobs = []
  const add = (store, key, value) => jobs.push(() => store.setJSON(key, value, { onlyIfNew: true }))
  const stamp = Date.now()
  const sentinel = (store, key) => add(store, key, { createdAt: stamp })

  // ---- 配置 ----
  add(config, 'settings.json', { ...CONFIG_DEFAULTS })

  // ---- 角色 / RBAC / 权限 ----
  ROLE_DEFS.forEach((r) => {
    add(auth, `roles/${r.roleCode}.json`, r)
    add(auth, `rbac/${r.roleCode}.json`, { roleCode: r.roleCode, permissionCodes: ROLE_PERMISSIONS[r.roleCode] })
  })
  add(auth, 'permissions/all.json', ALL_PERMISSION_CODES)

  // ---- 用户（管理员 + 演示账号 + 10 教师 + 24 学生，密码 123456）----
  const userDocs = []
  const addUser = (o) => {
    const doc = {
      id: o.id,
      username: o.username,
      password: PWD_HASH,
      realName: o.realName,
      email: o.email || '',
      phone: o.phone || '',
      avatar: '',
      gender: o.gender || 0,
      userType: o.userType,
      status: o.status === undefined ? 1 : o.status,
      deleted: 0,
      roles: [roleOf(o.userType)],
      permissions: permsOf(o.userType),
      createTime: '2024-08-01 09:00:00',
      updateTime: '2024-08-01 09:00:00',
    }
    const enc = encodeURIComponent(o.username)
    add(auth, `user-by-name/${enc}.json`, { id: o.id, username: o.username })
    sentinel(auth, `username/${enc}`)
    userDocs.push(doc)
  }

  addUser({ id: 1, username: 'admin', realName: '系统管理员', userType: 3, email: 'admin@deyu.edu.cn', phone: '13800000000', gender: 1 })
  addUser({ id: 1100, username: 'stu_zs', realName: '张三丰', userType: 1, email: 'stu_zs@stu.deyu.edu.cn', phone: '13900010001', gender: 1 })
  addUser({ id: 2100, username: 'zhangsan', realName: '张三', userType: 2, email: 'zhangsan@deyu.edu.cn', phone: '13800001001', gender: 1 })

  teacherNames.forEach((name, i) => {
    addUser({
      id: 2001 + i,
      username: `teacher${i + 1}`,
      realName: name,
      userType: 2,
      email: `teacher${i + 1}@deyu.edu.cn`,
      phone: `139${String(10000000 + i * 246813).slice(0, 8)}`,
      gender: i % 2 === 0 ? 1 : 2,
      status: i === 9 ? 0 : 1,
    })
  })

  const studentPhones = []
  studentNames.forEach((name, i) => {
    const phone = `138${String(10000000 + i * 135791).slice(0, 8)}`
    studentPhones.push(phone)
    addUser({
      id: 1001 + i,
      username: `student${String(i + 1).padStart(2, '0')}`,
      realName: name,
      userType: 1,
      email: `student${i + 1}@stu.deyu.edu.cn`,
      phone,
      gender: i % 3 === 0 ? 2 : 1,
      status: i === 21 ? 0 : 1,
    })
  })
  userDocs.forEach((u) => add(auth, `users/${u.id}.json`, u))

  // ---- 教师档案 10 条 ----
  teacherNames.forEach((name, i) => {
    const uid = 2001 + i
    const teacherNo = `T${String(1001 + i)}`
    add(academic, `teachers/${i + 1}.json`, {
      id: i + 1, userId: uid, teacherNo, username: `teacher${i + 1}`, realName: name,
      department: departments[i % departments.length], title: titles[i], degree: degrees[i],
      specialty: `${titles[i]}，主要从事教学与科研工作`, entryDate: '2020-09-01',
      phone: `139${String(10000000 + i * 246813).slice(0, 8)}`, email: `teacher${i + 1}@deyu.edu.cn`,
      gender: i % 2 === 0 ? 1 : 2, status: i === 9 ? 0 : 1, avatar: '',
      createTime: '2024-08-01 09:00:00', deleted: 0,
    })
    sentinel(academic, `teacher-no/${encodeURIComponent(teacherNo)}`)
  })

  // ---- 班级 6 条 ----
  classSeed.forEach(([className, grade, major, department], i) => {
    add(academic, `classes/${i + 1}.json`, {
      id: i + 1, className, grade, major, department,
      headTeacherId: 2001 + i, headTeacherName: teacherNames[i], monitorId: null,
      studentCount: 28 + ((i * 3) % 12), maxStudent: 50, status: i >= 4 ? 1 : 0,
      enrollmentYear: Number(grade), createTime: '2024-09-01 08:00:00', deleted: 0,
    })
  })

  // ---- 学生档案 24 条 ----
  studentNames.forEach((name, i) => {
    const cls = classSeed[i % classSeed.length]
    const studentNo = `${cls[1]}${String(1001 + i)}`
    add(academic, `students/${i + 1}.json`, {
      id: i + 1, userId: 1001 + i, username: `student${String(i + 1).padStart(2, '0')}`,
      realName: name, studentNo, classId: (i % classSeed.length) + 1, className: cls[0],
      grade: cls[1], major: cls[2], email: `student${i + 1}@stu.deyu.edu.cn`,
      phone: studentPhones[i], gender: i % 3 === 0 ? 2 : 1, avatar: '',
      status: i === 21 ? 0 : 1, enrollmentYear: Number(cls[1]),
      createTime: `2024-09-01 09:${pad2(10 + (i % 49))}:00`, deleted: 0,
    })
    sentinel(academic, `student-no/${encodeURIComponent(studentNo)}`)
  })

  // ---- 课程 12 条 ----
  courseSeed.forEach(([courseName, courseCode, credit], i) => {
    const ti = i % teacherNames.length
    add(academic, `courses/${i + 1}.json`, {
      id: i + 1, courseName, courseCode, teacherId: 2001 + ti, teacherName: teacherNames[ti],
      credit, semester: i % 2 === 0 ? '2024-2025-1' : '2024-2025-2',
      selectedCount: 25 + ((i * 7) % 40), maxStudent: 80, status: i % 4,
      createTime: '2024-08-20 10:00:00', deleted: 0,
    })
  })

  // ---- 选课 + 成绩 72 条（冗余展示字段，避免 JOIN）----
  for (let i = 0; i < studentNames.length; i++) {
    for (let j = 0; j < 3; j++) {
      const course = courseSeed[(i + j) % courseSeed.length]
      const courseId = ((i + j) % courseSeed.length) + 1
      const id = i * 3 + j + 1
      const usual = 70 + ((i * 7 + j * 13) % 30)
      const final = 62 + ((i * 11 + j * 17) % 38)
      const mid = Math.round((usual + final) / 2)
      const total = Math.round(usual * 0.2 + mid * 0.3 + final * 0.5)
      const gp = pointOf(total)
      add(academic, `scores/${id}.json`, {
        id, courseId, courseName: course[0], studentId: i + 1, studentName: studentNames[i],
        usualScore: usual, midtermScore: mid, finalScore: final, totalScore: total,
        gradePoint: gp, gradeLevel: gradeOf(total),
        semester: (courseId - 1) % 2 === 0 ? '2024-2025-1' : '2024-2025-2',
        teacherId: 2001 + ((courseId - 1) % teacherNames.length),
        ranking: (i % 20) + 1, comment: `${course[0]}课程表现良好`,
        createTime: '2025-01-15 14:30:00', deleted: 0,
      })
      add(academic, `selections/${id}.json`, {
        id, courseId, studentId: i + 1, status: 2, score: total, gradePoint: gp, deleted: 0,
      })
    }
  }

  // ---- 公告 12 条 ----
  noticeTitles.forEach((title, i) => {
    add(content, `notices/${i + 1}.json`, {
      id: i + 1, title,
      content: `${title}。请各位同学和老师仔细阅读相关要求，按时完成各项准备工作。如有疑问，请联系学院办公室。`,
      type: i === 6 || i === 10 ? 'emergency' : 'notice', priority: i % 3,
      status: i % 5 === 4 ? 0 : 1,
      targetType: i % 4 === 0 ? 'student' : i % 4 === 1 ? 'teacher' : 'all',
      publisherId: 2001 + (i % teacherNames.length), publisherName: teacherNames[i % teacherNames.length],
      publishTime: `2025-0${(i % 9) + 1}-${pad2((i % 27) + 1)} 09:30:00`,
      createTime: '2024-09-01 08:00:00', deleted: 0,
    })
  })

  // ---- 消息 12 条 ----
  messageTitles.forEach((title, i) => {
    add(content, `messages/${i + 1}.json`, {
      id: i + 1, senderId: 1, receiverId: 1001 + (i % studentNames.length), title,
      content: `${title}：请相关同学及时登录系统查看详细信息，并按照要求完成相应操作。`,
      messageType: i % 3 === 0 ? 'system' : i % 3 === 1 ? 'notice' : 'warning',
      isRead: i % 3 === 0 ? 1 : 0, readTime: null,
      createTime: `2025-0${(i % 9) + 1}-${pad2((i % 27) + 1)} 16:20:00`, deleted: 0,
    })
  })

  // ---- 文件元数据 12 条 ----
  fileSeed.forEach(([fileName, ext], i) => {
    const fileKey = `demo/${i + 1}_${fileName}`
    add(content, `files/${i + 1}.json`, {
      id: i + 1, fileName, fileKey, fileSize: 1024 * (120 + i * 347), fileType: ext,
      mimeType: mimeOf[ext] || 'application/octet-stream',
      uploadBy: teacherNames[i % teacherNames.length],
      url: `/api/file/public/${encodeURIComponent(fileKey)}`,
      createTime: `2025-0${(i % 9) + 1}-${pad2((i % 27) + 1)} 11:05:00`, deleted: 0,
    })
  })

  // ---- 操作日志 32 条 ----
  const operModules = ['学生管理', '教师管理', '课程管理', '成绩管理', '系统设置', '登录日志', '文件管理', '公告管理']
  const operOperations = ['查询列表', '新增记录', '修改信息', '删除记录', '导出数据', '用户登录']
  const operApis = ['student', 'teacher', 'course', 'score', 'config', 'auth', 'file', 'notice']
  for (let i = 0; i < 32; i++) {
    add(logs, `oper/${i + 1}.json`, {
      id: i + 1,
      userId: i % 4 === 0 ? 1 : 2001 + (i % teacherNames.length),
      username: i % 4 === 0 ? 'admin' : `teacher${(i % teacherNames.length) + 1}`,
      module: operModules[i % operModules.length], operation: operOperations[i % operOperations.length],
      requestMethod: i % 3 === 0 ? 'POST' : i % 3 === 1 ? 'GET' : 'PUT',
      requestUrl: `/api/${operApis[i % operApis.length]}`,
      ip: `192.168.1.${(i % 200) + 10}`, duration: 12 + ((i * 17) % 180),
      status: i % 9 === 7 ? 0 : 1,
      createTime: `2025-03-${pad2((i % 27) + 1)} ${pad2(8 + (i % 10))}:${pad2(i % 60)}:00`,
      deleted: 0,
    })
  }

  await runJobs(jobs)
}
