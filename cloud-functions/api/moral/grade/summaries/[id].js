/** PUT/DELETE /api/moral/grade/summaries/{id} —— 学期总结修改/删除（grade:edit） */
import { gradeHandlers, textOf } from '../_crud.js'

const STATUSES = ['待提交', '已提交']

export const onRequest = gradeHandlers({
  prefix: 'summaries/',
  label: '学期总结',
  filterOf: () => () => true,
  buildOf: (body, base) => {
    const title = textOf(body, base, 'title').trim()
    if (!title) return { error: '总结标题不能为空' }
    let status = textOf(body, base, 'status', base ? '' : '待提交')
    if (status && !STATUSES.includes(status)) return { error: '状态无效（待提交/已提交）' }
    if (!status) status = base ? String(base.status || '待提交') : '待提交'
    return {
      term: textOf(body, base, 'term'),
      title,
      content: textOf(body, base, 'content'),
      completionStatus: textOf(body, base, 'completionStatus'),
      problems: textOf(body, base, 'problems'),
      improvements: textOf(body, base, 'improvements'),
      status,
    }
  },
}).item
