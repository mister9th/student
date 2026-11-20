/** PUT/DELETE /api/moral/fiveedu/{id}（PUT 按差值回滚，防重复累加，P1 §3.2） */
import { S, ok, fail, json, bodyOf, now } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { requirePermission, num } from '../../../_lib/util.js'
import { DIMENSIONS, scoreOf, applyFiveEduDelta } from './_fiveedu.js'

const parseTags = (v) => (Array.isArray(v)
  ? v.filter((t) => t !== null && t !== undefined && String(t).trim()).map((t) => String(t).trim())
  : [])

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'fiveedu:edit')
    if (guard instanceof Response) return guard
    const id = num(String(context.params?.id || '').replace(/\D/g, ''), 0)
    if (!id) return json(fail('记录 id 无效', 400))
    const method = context.request.method
    const store = S.moral()
    const academic = S.academic()
    const key = `fiveedu/${id}.json`
    const doc = await store.get(key, { type: 'json' })
    if (!doc || doc.deleted === 1) return json(ok(null))

    if (method === 'DELETE') {
      // 回滚已累加分值（下限 0），再软删记录
      await applyFiveEduDelta(academic, num(doc.studentId, 0), String(doc.dimension || ''), -scoreOf(doc.level))
      await store.setJSON(key, { ...doc, deleted: 1, updateTime: now() })
      return json(ok(null))
    }
    if (method === 'PUT') {
      const body = await bodyOf(context.request)
      const oldDimension = String(doc.dimension || '')
      const newDimension = body.dimension !== undefined ? String(body.dimension || '') : oldDimension
      if (!DIMENSIONS.includes(newDimension)) return json(fail('五育维度不合法', 400))
      const oldLevel = num(doc.level, 0)
      const newLevel = body.level !== undefined ? num(body.level, 0) : oldLevel
      if (![1, 2, 3, 4].includes(newLevel)) return json(fail('等级不合法（1-4）', 400))
      const studentId = num(doc.studentId, 0)

      // 防重复累加：维度与等级均未变化时跳过 fiveEdu 写；换维度时先回滚旧维度再累加新维度
      if (newLevel !== oldLevel || newDimension !== oldDimension) {
        if (oldDimension !== newDimension) {
          await applyFiveEduDelta(academic, studentId, oldDimension, -scoreOf(oldLevel))
          await applyFiveEduDelta(academic, studentId, newDimension, scoreOf(newLevel))
        } else {
          await applyFiveEduDelta(academic, studentId, newDimension, scoreOf(newLevel) - scoreOf(oldLevel))
        }
      }
      const student = await academic.get(`students/${studentId}.json`, { type: 'json' })
      await store.setJSON(key, {
        ...doc,
        dimension: newDimension, level: newLevel,
        tags: body.tags !== undefined ? parseTags(body.tags) : (Array.isArray(doc.tags) ? doc.tags : []),
        semester: body.semester !== undefined ? String(body.semester || '') : String(doc.semester || ''),
        note: body.note !== undefined ? String(body.note || '') : String(doc.note || ''),
        studentName: student?.realName ? String(student.realName) : String(doc.studentName || ''),
        classId: student ? (student.classId ?? doc.classId ?? null) : doc.classId ?? null,
        className: student ? String(student.className || '') : String(doc.className || ''),
        stage: student ? num(student.stage, 0) : num(doc.stage, 0),
        grade: student ? num(student.grade, 0) : num(doc.grade, 0),
        updateTime: now(),
      })
      return json(ok(null))
    }
    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '五育记录操作失败', 500))
  }
}
