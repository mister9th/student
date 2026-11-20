/** GET/POST /api/moral/grade/plans —— 每周安排（GET term/weekStartDate 过滤；POST grade:add） */
import { gradeHandlers, textOf, today } from '../_crud.js'

export const onRequest = gradeHandlers({
  prefix: 'plans/',
  label: '每周安排',
  filterOf: (q) => {
    const term = q.term ? String(q.term) : ''
    const weekStartDate = q.weekStartDate ? String(q.weekStartDate) : ''
    return (x) => (!term || String(x.term || '') === term) && (!weekStartDate || String(x.weekStartDate || '') === weekStartDate)
  },
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
}).index
