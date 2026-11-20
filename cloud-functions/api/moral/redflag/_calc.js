/**
 * 流动红旗共享计算引擎 —— calculate 端点与 scores 录入端点复用。
 * 步骤按契约第 3 节：汇总 → 排名 → 颁奖 → 幂等加分 → 月汇总。
 */
import { S, nextId, now } from '../../../_lib/store.js'
import { addMoralScore } from '../../../_lib/moral-store.js'
import { num } from '../../../_lib/util.js'

const listPrefix = async (store, prefix) => {
  const { blobs } = await store.list({ prefix })
  const docs = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
  return docs.filter((x) => x && x.deleted !== 1)
}

/** 契约周号算法：Math.ceil((已过天数 + 1月1日.getDay() + 1) / 7)，periodYear 为日历年 */
export function periodOf(dateStr) {
  const d = String(dateStr || '').split('-').map(Number)
  const today = new Date()
  const year = Number.isFinite(d[0]) && d[0] > 0 ? d[0] : today.getFullYear()
  const month = Number.isFinite(d[1]) && d[1] > 0 ? d[1] : today.getMonth() + 1
  const day = Number.isFinite(d[2]) && d[2] > 0 ? d[2] : today.getDate()
  const jan1 = new Date(year, 0, 1)
  const target = new Date(year, month - 1, day)
  const passed = Math.floor((target - jan1) / 86400000)
  const week = Math.max(1, Math.ceil((passed + jan1.getDay() + 1) / 7))
  return { periodYear: year, periodMonth: month, periodWeek: week }
}

/** 读取参数设置（缺省值按契约：award_top_n=3 / min_score_threshold=60 / moral_bonus_score=5） */
export async function settingsOf(store) {
  const docs = await listPrefix(store, 'redflag-settings/')
  const map = { award_top_n: '3', min_score_threshold: '60', moral_bonus_score: '5' }
  for (const d of docs) if (d?.settingKey) map[d.settingKey] = String(d.settingValue)
  return {
    awardTopN: Math.max(1, num(map.award_top_n, 3)),
    minScore: num(map.min_score_threshold, 60),
    bonusScore: num(map.moral_bonus_score, 5),
  }
}

/** 全部班级（含 0 分班级参与周汇总） */
export async function allClasses() {
  const docs = await listPrefix(S.academic(), 'classes/')
  return docs.sort((a, b) => (num(a.id, 0) - num(b.id, 0)))
}

/**
 * 步骤 1+2：汇总某周每班总分（启用维度 score×weight，含 0 分班级）并排名，
 * 写/更新 weekly summaries（保留 hasRedFlag，由颁奖步骤维护）。
 * 返回 [{classId, className, totalScore, rankPosition}] 按 rank 升序。
 */
export async function recalcWeek(store, { periodYear, periodWeek, periodMonth }) {
  const classes = await allClasses()
  const dims = await listPrefix(store, 'redflag-dimensions/')
  const activeWeight = new Map(dims.filter((d) => num(d.active, 1) === 1).map((d) => [String(num(d.id, 0)), num(d.weight, 1)]))
  const scores = await listPrefix(store, 'redflag-scores/')
  const sumByClass = new Map()
  for (const s of scores) {
    if (num(s.periodYear, 0) !== periodYear || num(s.periodWeek, 0) !== periodWeek) continue
    const w = activeWeight.get(String(num(s.dimensionId, 0)))
    if (w === undefined) continue // 维度未启用或已删除则不计
    const cid = num(s.classId, 0)
    sumByClass.set(cid, (sumByClass.get(cid) || 0) + num(s.score, 0) * w)
  }
  const rows = classes.map((c) => ({
    classId: num(c.id, 0),
    className: String(c.className || ''),
    totalScore: Number((sumByClass.get(num(c.id, 0)) || 0).toFixed(2)),
  }))
  rows.sort((a, b) => b.totalScore - a.totalScore || a.classId - b.classId)
  rows.forEach((r, i) => { r.rankPosition = i + 1 })

  const summaries = await listPrefix(store, 'redflag-summaries/')
  for (const r of rows) {
    const found = summaries.find((x) => x.periodType === 'weekly'
      && num(x.periodYear, 0) === periodYear && num(x.periodWeek, 0) === periodWeek && num(x.classId, 0) === r.classId)
    const base = {
      periodType: 'weekly', periodYear, periodWeek, periodMonth,
      classId: r.classId, className: r.className,
      totalScore: r.totalScore, rankPosition: r.rankPosition, updateTime: now(),
    }
    if (found) {
      await store.setJSON(`redflag-summaries/${found.id}.json`, { ...found, ...base })
    } else {
      const id = await nextId(store, 'redflag-summaries/')
      await store.setJSON(`redflag-summaries/${id}.json`, { id, ...base, hasRedFlag: 0, createTime: now(), deleted: 0 })
    }
  }
  return rows
}

/**
 * 完整计算引擎（契约 5 步）。返回 { awarded: [{className, score, rankPosition}] }。
 */
export async function calculatePeriod(store, { periodYear, periodWeek, periodMonth }) {
  // 1+2 汇总与排名
  const rows = await recalcWeek(store, { periodYear, periodWeek, periodMonth })
  const settings = await settingsOf(store)

  // 3 颁奖：topN 且 >= threshold；先删同周旧 awards
  const awarded = rows.filter((r) => r.rankPosition <= settings.awardTopN && r.totalScore >= settings.minScore)
  const awardedIds = new Set(awarded.map((r) => r.classId))

  const oldAwards = await listPrefix(store, 'redflag-awards/')
  for (const a of oldAwards) {
    if (a.periodType !== 'weekly' || num(a.periodYear, 0) !== periodYear || num(a.periodWeek, 0) !== periodWeek) continue
    await store.setJSON(`redflag-awards/${a.id}.json`, { ...a, deleted: 1, updateTime: now() })
  }
  const today = now().slice(0, 10)
  for (const r of awarded) {
    const id = await nextId(store, 'redflag-awards/')
    await store.setJSON(`redflag-awards/${id}.json`, {
      id, classId: r.classId, className: r.className, awardDate: today,
      periodType: 'weekly', periodWeek, periodMonth, periodYear,
      rankPosition: r.rankPosition, score: r.totalScore, createTime: now(), deleted: 0,
    })
  }
  // 获奖班 hasRedFlag=1，其余班该周清零（修正原系统"不清零"缺陷）
  const summaries = await listPrefix(store, 'redflag-summaries/')
  for (const s of summaries) {
    if (s.periodType !== 'weekly' || num(s.periodYear, 0) !== periodYear || num(s.periodWeek, 0) !== periodWeek) continue
    const flag = awardedIds.has(num(s.classId, 0)) ? 1 : 0
    if (num(s.hasRedFlag, 0) !== flag) {
      await store.setJSON(`redflag-summaries/${s.id}.json`, { ...s, hasRedFlag: flag, updateTime: now() })
    }
  }

  // 4 全班加分（幂等修正）：学生文档维护 redFlagBonus["<year>-W<week>"] 标记
  const academic = S.academic()
  const { blobs } = await academic.list({ prefix: 'students/' })
  const students = await Promise.all(blobs.map((b) => academic.get(b.key, { type: 'json' })))
  const bonusKey = `${periodYear}-W${periodWeek}`
  for (const stu of students) {
    if (!stu || stu.deleted === 1) continue
    const marks = stu.redFlagBonus && typeof stu.redFlagBonus === 'object' ? { ...stu.redFlagBonus } : {}
    const stuKey = `students/${num(stu.id, 0)}.json`
    if (awardedIds.has(num(stu.classId, 0))) {
      if (marks[bonusKey] === undefined) {
        const after = await addMoralScore(academic, num(stu.id, 0), settings.bonusScore)
        if (after === null) continue // 学生不存在或已删，跳过
        marks[bonusKey] = settings.bonusScore
        const doc = await academic.get(stuKey, { type: 'json' })
        if (doc) await academic.setJSON(stuKey, { ...doc, redFlagBonus: marks })
      }
      // 已有标记 → 本次重复计算不加分（幂等）
    } else if (marks[bonusKey] !== undefined) {
      // 本有红旗本周期失旗 → 回滚（addMoralScore 有 Math.max(0,...) 下限）
      await addMoralScore(academic, num(stu.id, 0), -num(marks[bonusKey], 0))
      delete marks[bonusKey]
      const doc = await academic.get(stuKey, { type: 'json' })
      if (doc) await academic.setJSON(stuKey, { ...doc, redFlagBonus: marks })
    }
  }

  // 5 月汇总：同月同年 weekly 求和 → monthly summary + 排名（不颁奖）
  await recalcMonth(store, { periodYear, periodMonth })

  return {
    awarded: awarded.map((r) => ({ className: r.className, score: r.totalScore, rankPosition: r.rankPosition })),
  }
}

/**
 * 步骤 5（可独立调用）：同月同年 weekly summaries 求和 → monthly summary + 排名（不颁奖）。
 * monthly 模式的 calculate 仅执行本步骤，不触发周颁奖与加分。
 */
export async function recalcMonth(store, { periodYear, periodMonth }) {
  const fresh = await listPrefix(store, 'redflag-summaries/')
  const monthWeeklies = fresh.filter((x) => x.periodType === 'weekly' && num(x.periodYear, 0) === periodYear && num(x.periodMonth, 0) === periodMonth)
  const sumByClass = new Map()
  for (const w of monthWeeklies) {
    const cid = num(w.classId, 0)
    const prev = sumByClass.get(cid) || { className: String(w.className || ''), total: 0 }
    prev.total += num(w.totalScore, 0)
    sumByClass.set(cid, prev)
  }
  // 全部班级均生成 monthly 记录（缺周记为 0 分），便于月榜完整展示
  const classes = await allClasses()
  const monthRows = classes.map((c) => {
    const cid = num(c.id, 0)
    const v = sumByClass.get(cid)
    return { classId: cid, className: v ? v.className : String(c.className || ''), totalScore: Number((v ? v.total : 0).toFixed(2)) }
  })
  monthRows.sort((a, b) => b.totalScore - a.totalScore || a.classId - b.classId)
  monthRows.forEach((r, i) => { r.rankPosition = i + 1 })
  for (const r of monthRows) {
    const found = fresh.find((x) => x.periodType === 'monthly'
      && num(x.periodYear, 0) === periodYear && num(x.periodMonth, 0) === periodMonth && num(x.classId, 0) === r.classId)
    const base = {
      periodType: 'monthly', periodYear, periodMonth, periodWeek: 0,
      classId: r.classId, className: r.className,
      totalScore: r.totalScore, rankPosition: r.rankPosition, updateTime: now(),
    }
    if (found) {
      await store.setJSON(`redflag-summaries/${found.id}.json`, { ...found, ...base })
    } else {
      const id = await nextId(store, 'redflag-summaries/')
      await store.setJSON(`redflag-summaries/${id}.json`, { id, ...base, hasRedFlag: 0, createTime: now(), deleted: 0 })
    }
  }
  return monthRows
}
