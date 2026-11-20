/** GET/POST /api/moral/redflag/settings —— 参数设置（GET 带缺省值返回；POST 批量 upsert） */
import { S, ok, fail, json, bodyOf, nextId, now } from '../../../../_lib/store.js'
import { ensureSeeded } from '../../../../_lib/seed.js'
import { requirePermission } from '../../../../_lib/util.js'
import { settingsOf } from '../_calc.js'

const DEFAULTS = {
  award_top_n: { settingValue: '3', description: '每周颁奖班级数（前 N 名）' },
  min_score_threshold: { settingValue: '60', description: '获奖最低总分门槛' },
  moral_bonus_score: { settingValue: '5', description: '获奖班级每生德育加分' },
}
const ALLOWED = new Set(Object.keys(DEFAULTS))

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const method = context.request.method
    const user = await requirePermission(context, method === 'GET' ? 'redflag:list' : 'redflag:edit')
    if (user instanceof Response) return user
    const store = S.moral()

    if (method === 'GET') {
      const current = await settingsOf(store)
      const records = [
        { settingKey: 'award_top_n', settingValue: String(current.awardTopN), description: DEFAULTS.award_top_n.description },
        { settingKey: 'min_score_threshold', settingValue: String(current.minScore), description: DEFAULTS.min_score_threshold.description },
        { settingKey: 'moral_bonus_score', settingValue: String(current.bonusScore), description: DEFAULTS.moral_bonus_score.description },
      ]
      return json(ok({ records, total: records.length }))
    }

    if (method === 'POST') {
      const body = await bodyOf(context.request)
      const list = Array.isArray(body.settings) ? body.settings : []
      if (!list.length) return json(fail('settings 不能为空', 400))
      const { blobs } = await store.list({ prefix: 'redflag-settings/' })
      const docs = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
      const updated = []
      for (const item of list) {
        const settingKey = String(item?.settingKey || '')
        if (!ALLOWED.has(settingKey)) return json(fail(`不支持的设置项: ${settingKey || '(空)'}`, 400))
        const found = docs.find((x) => x && x.deleted !== 1 && String(x.settingKey || '') === settingKey)
        if (found) {
          await store.setJSON(`redflag-settings/${found.id}.json`, {
            ...found,
            settingValue: String(item.settingValue ?? found.settingValue),
            description: item.description !== undefined ? String(item.description) : String(found.description || ''),
            updateTime: now(),
          })
          updated.push(settingKey)
        } else {
          const id = await nextId(store, 'redflag-settings/')
          await store.setJSON(`redflag-settings/${id}.json`, {
            id, settingKey,
            settingValue: String(item.settingValue ?? ''),
            description: String(item.description || DEFAULTS[settingKey].description),
            createTime: now(), deleted: 0,
          })
          updated.push(settingKey)
        }
      }
      return json(ok({ updated }))
    }

    return json(fail('方法不允许', 405))
  } catch (e) {
    return json(fail(e?.message || '红旗参数设置操作失败', 500))
  }
}
