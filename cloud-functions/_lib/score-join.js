/**
 * 成绩展示字段读时联表回填（存量旧数据修复）
 * ------------------------------------------------------------------
 * 成绩文档冗余存了 studentName/className/classId/subjectName/teacherId/
 * examName/examType/examDate/semester 等展示快照。学生改班级、课程改名、
 * 考试改名后，这些旧快照不会更新，导致成绩列表仍显示旧名称。
 *
 * 写时回填只能修未来的编辑，修不了已存在的旧数据；因此这里在查询返回前
 * 用权威文档（学生 / 课程 / 考试）实时覆盖展示字段：不写库、不改原文档，
 * 仅返回覆盖后的新对象。仅在权威值非空时覆盖，避免把已有值清空。
 */
import { S } from './store.js'
import { num } from './util.js'

const nonempty = (v) => v !== undefined && v !== null && v !== ''

/** 列出前缀下全部未删除文档 */
async function docsOf(storeObj, prefix) {
  const { blobs } = await storeObj.list({ prefix })
  const docs = await Promise.all(blobs.map((b) => storeObj.get(b.key, { type: 'json' })))
  return docs.filter((d) => d && d.deleted !== 1)
}

/** 按文档 id 建 Map<id, doc> */
function byId(docs) {
  const m = new Map()
  for (const d of docs) {
    const id = num(d.id, 0)
    if (id) m.set(id, d)
  }
  return m
}

/**
 * 加载联表映射：students / courses / exams（Map<id, doc>）。
 * exams 额外按 examName 建一份索引，用于存量成绩无 examId 时的补偿匹配。
 */
export async function loadScoreJoinMaps() {
  const academic = S.academic()
  const [students, courses, exams] = await Promise.all([
    docsOf(academic, 'students/'),
    docsOf(academic, 'courses/'),
    docsOf(S.exam(), 'exams/'),
  ])
  const examsByName = new Map()
  for (const e of exams) {
    const n = String(e.examName || '')
    if (n && !examsByName.has(n)) examsByName.set(n, e)
  }
  return {
    students: byId(students),
    courses: byId(courses),
    exams: byId(exams),
    examsByName,
  }
}

/**
 * 用权威文档覆盖单条 score 的展示字段，返回新对象（不改原文档）。
 * 覆盖仅在权威值非空时进行；映射缺失时保留 score 原冗余值。
 */
export function overlayScoreFields(record, maps) {
  if (!record) return record
  const out = { ...record }

  const stu = maps.students && maps.students.get(num(record.studentId, 0))
  if (stu) {
    if (nonempty(stu.className)) out.className = stu.className
    if (nonempty(stu.realName)) out.studentName = stu.realName
    if (nonempty(stu.classId)) out.classId = stu.classId
  }

  const course = maps.courses && maps.courses.get(num(record.subjectId, 0))
  if (course) {
    if (nonempty(course.courseName)) out.subjectName = course.courseName
    if (nonempty(course.teacherId)) out.teacherId = course.teacherId
  }

  let exam = maps.exams && maps.exams.get(num(record.examId, 0))
  if (!exam && !record.examId && record.examName && maps.examsByName) {
    exam = maps.examsByName.get(String(record.examName))
  }
  if (exam) {
    if (nonempty(exam.examName)) out.examName = exam.examName
    if (nonempty(exam.examType)) out.examType = exam.examType
    if (nonempty(exam.examDate)) out.examDate = exam.examDate
    if (nonempty(exam.semester)) out.semester = exam.semester
  }

  return out
}
