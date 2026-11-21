/** POST /api/moral/fiveedu —— 新增五育打标记录并累加学生 fiveEdu 汇总（P1 §3.2） */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, num } from '../../../_lib/util.js'
import { buildScope } from '../../../_lib/scope.js'
import { DIMENSIONS, scoreOf, applyFiveEduDelta, rebuildFiveEdu } from './_fiveedu.js'
import { writeOperLog } from '../../../_lib/oper-log.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'fiveedu:add')
    if (guard instanceof Response) return guard
    const body = await bodyOf(context.request)
    const studentId = num(body.studentId, 0)
    if (!studentId) return json(fail('学生不能为空', 400))
    const dimension = String(body.dimension || '')
    if (!DIMENSIONS.includes(dimension)) return json(fail('五育维度不合法', 400))
    const level = num(body.level, 0)
    if (![1, 2, 3, 4].includes(level)) return json(fail('等级不合法（1-4）', 400))
    const semester = String(body.semester || '').trim()
    if (!semester) return json(fail('学期不能为空', 400))
    const tags = Array.isArray(body.tags)
      ? body.tags.filter((t) => t !== null && t !== undefined && String(t).trim()).map((t) => String(t).trim())
      : []

    const academic = S.academic()
    const student = await academic.get(`students/${studentId}.json`, { type: 'json' })
    if (!student || student.deleted === 1) return json(fail('学生档案不存在', 400))
    // scope 校验：教师只能给自己带班/任教班的学生打标
    const scope = await buildScope(context)
    if (!scope.filterFn({ studentId, classId: student.classId, grade: student.grade })) {
      return json(fail('无权为该学生打五育标', 403), 403)
    }

    const store = S.moral()
    const id = await nextId(store, 'fiveedu/')
    const ts = now()
    await store.setJSON(`fiveedu/${id}.json`, {
      id, studentId, studentName: String(student.realName || ''),
      classId: student.classId ?? null, className: String(student.className || ''),
      stage: num(student.stage, 0), grade: num(student.grade, 0), semester,
      dimension, level, tags,
      note: String(body.note || ''),
      teacherId: guard.id ?? guard.userId ?? null, teacherName: String(guard.realName || ''),
      createTime: ts, updateTime: ts, deleted: 0,
    })
    // 全量重算汇总（写新记录后重算，保证五育分值始终与未删除记录一致）
    const fiveEdu = await rebuildFiveEdu(academic, studentId)
    await writeOperLog(context, { module: '五育管理', operation: '新增五育记录' })
    return json(ok({ id, fiveEdu }))
  } catch (e) {
    return json(fail(e?.message || '五育打标失败', 500))
  }
}
