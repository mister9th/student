/** GET/POST /api/moral/grade/goals —— 学期目标（GET term/status 过滤；POST grade:add） */
import { gradeHandlers, textOf, numberClamp } from '../_crud.js'

const STATUSES = ['进行中', '已完成', '已延期']

export const onRequest = gradeHandlers({
  prefix: 'goals/',
  label: '学期目标',
  filterOf: (q) => {
    const term = q.term ? String(q.term) : ''
    const status = q.status ? String(q.status) : ''
    return (x) => (!term || String(x.term || '') === term) && (!status || String(x.status || '') === status)
  },
  buildOf: (body, base) => {
    const title = textOf(body, base, 'title').trim()
    if (!title) return { error: '目标标题不能为空' }
    let status = textOf(body, base, 'status', base ? '' : '进行中')
    if (status && !STATUSES.includes(status)) return { error: '状态无效（进行中/已完成/已延期）' }
    if (!status) status = base ? String(base.status || '进行中') : '进行中'
    return {
      term: textOf(body, base, 'term'),
      title,
      description: textOf(body, base, 'description'),
      responsiblePerson: textOf(body, base, 'responsiblePerson'),
      deadline: textOf(body, base, 'deadline'),
      progress: numberClamp(body.progress !== undefined ? body.progress : (base ? base.progress : 0), 0, 100, 0),
      status,
    }
  },
}).index
