/** PUT/DELETE /api/moral/grade/plans/{id} —— 每周安排修改/删除（grade:edit） */
import { gradeHandlers, textOf, today } from '../_crud.js'

export const onRequest = gradeHandlers({
  prefix: 'plans/',
  label: '每周安排',
  filterOf: () => () => true,
  buildOf: (body, base) => {
    const title = textOf(body, base, 'title').trim()
    if (!title) return { error: '安排标题不能为空' }
    return {
      term: textOf(body, base, 'term'),
      weekStartDate: textOf(body, base, 'weekStartDate', base ? '' : today()),
      title,
      content: textOf(body, base, 'content'),
      remindHours: Number(body.remindHours !== undefined ? body.remindHours : (base ? base.remindHours : 24)) || 0,
    }
  },
}).item
