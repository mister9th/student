/** POST /api/homework —— 发布作业（可选 notify 群发该班学生通知） */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../_lib/store.js'
import { ensureSeeded } from '../../_lib/seed.js'
import { requirePermission, num } from '../../_lib/util.js'
import { buildScope } from '../../_lib/scope.js'
import { normalizeAssignment, notifyClassStudents } from './_shared.js'
import { writeOperLog } from '../../_lib/oper-log.js'

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const guard = await requirePermission(context, 'homework:add')
    if (guard instanceof Response) return guard
    if (context.request.method !== 'POST') return json(fail('方法不允许', 405))
    const body = await bodyOf(context.request)
    const { error, data } = normalizeAssignment(body, null)
    if (error) return json(fail(error, 400))
    // K12-P4 §3.2：教师只能对自己所带班/任教科目发布作业
    const scope = await buildScope(context)
    if (!scope.filterFn({ classId: data.classId, subjectId: data.subjectId })) {
      return json(fail('无权向该班级/科目发布作业', 403), 403)
    }

    const academic = S.academic()
    const cls = await academic.get(`classes/${data.classId}.json`, { type: 'json' })
    const subject = await academic.get(`courses/${data.subjectId}.json`, { type: 'json' })
    const store = S.homework()
    const id = await nextId(store, 'assignments/')
    const ts = now()
    await store.setJSON(`assignments/${id}.json`, {
      id,
      classId: data.classId,
      className: cls?.className || String(body.className || ''),
      subjectId: data.subjectId,
      subjectName: subject?.courseName || String(body.subjectName || ''),
      teacherId: guard.id ?? guard.userId ?? null,
      teacherName: String(guard.realName || ''),
      title: data.title,
      content: data.content,
      dueTime: data.dueTime,
      expectedMinutes: data.expectedMinutes,
      attachments: data.attachments,
      status: data.status,
      semester: data.semester,
      createTime: ts,
      updateTime: ts,
      deleted: 0,
    })

    let notified = 0
    if (body.notify === true || body.notify === 1 || body.notify === '1') {
      notified = await notifyClassStudents(
        data.classId,
        `新作业：${data.title}`,
        `【${subject?.courseName || '作业'}】${data.title}，截止时间 ${data.dueTime}。请及时登录系统完成。`,
        guard.id ?? guard.userId
      )
    }
    await writeOperLog(context, { module: '作业管理', operation: '发布作业' })
    return json(ok({ id, notified }))
  } catch (e) {
    return json(fail(e?.message || '发布作业失败', 500))
  }
}
