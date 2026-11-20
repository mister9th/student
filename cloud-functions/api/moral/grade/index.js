/** /api/moral/grade?type=goals|summaries|plans —— 兼容入口：转发到规范端点（缺省 goals） */
import { fail, json } from '../../../_lib/store.js'
import { onRequest as goalsHandler } from './goals/index.js'
import { onRequest as summariesHandler } from './summaries/index.js'
import { onRequest as plansHandler } from './plans/index.js'

const HANDLERS = {
  goals: goalsHandler,
  summaries: summariesHandler,
  plans: plansHandler,
}

export async function onRequest(context) {
  const type = String(context.request.query?.type || 'goals')
  const fn = HANDLERS[type]
  if (!fn) return json(fail(`未知的年段工作类型: ${type}（可选 goals/summaries/plans）`, 400))
  return fn(context)
}
