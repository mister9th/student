/** GET /api/user/dashboard/screen —— 数据大屏聚合（内存计算替代 SQL GROUP BY） */
import { S, ok, fail, json } from '../../../_lib/store.js'
import { ensureSeeded } from '../../../_lib/seed.js'
import { num } from '../../../_lib/util.js'

const FALLBACK_AVG = [76, 78, 77, 81, 83, 85]

async function allOf(store, prefix) {
  const { blobs } = await store.list({ prefix })
  const items = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' })))
  return items.filter((x) => x && x.deleted !== 1)
}

const bandOf = (s) => (s >= 90 ? '优秀' : s >= 80 ? '良好' : s >= 70 ? '中等' : s >= 60 ? '及格' : '不及格')
const categoryOf = (name) => {
  const n = String(name || '')
  if (/计算机|数据|软件/.test(n)) return '计算机类'
  if (/数学/.test(n)) return '数学类'
  if (/英语|外语/.test(n)) return '外语类'
  return '其他'
}

export async function onRequest(context) {
  try {
    await ensureSeeded()
    const academic = S.academic()
    const [students, teachers, courses, scores] = await Promise.all([
      allOf(academic, 'students/'), allOf(academic, 'teachers/'),
      allOf(academic, 'courses/'), allOf(academic, 'scores/'),
    ])

    const pass = scores.length
      ? Math.round(scores.filter((s) => num(s.totalScore, 0) >= 60).length * 1000 / scores.length) / 10
      : 0

    const scoreBands = {}
    for (const s of scores) {
      const b = bandOf(num(s.totalScore, 0))
      scoreBands[b] = (scoreBands[b] || 0) + 1
    }
    const scoreDistribution = ['优秀', '良好', '中等', '及格', '不及格']
      .filter((k) => scoreBands[k] > 0).map((k) => ({ name: k, value: scoreBands[k] }))

    const courseBands = {}
    for (const c of courses) {
      const b = categoryOf(c.courseName)
      courseBands[b] = (courseBands[b] || 0) + 1
    }
    const courseDistribution = Object.keys(courseBands)
      .map((k) => ({ name: k, value: courseBands[k] }))

    const monthSum = {}
    const monthCnt = {}
    for (const s of scores) {
      const m = Number(String(s.createTime || '').slice(5, 7)) || 0
      if (!m) continue
      monthSum[m] = (monthSum[m] || 0) + num(s.totalScore, 0)
      monthCnt[m] = (monthCnt[m] || 0) + 1
    }

    return json(ok({
      studentCount: students.length,
      teacherCount: teachers.length,
      courseCount: courses.length,
      passRate: pass,
      scoreDistribution,
      courseDistribution,
      trendMonths: ['1月', '2月', '3月', '4月', '5月', '6月'],
      avgScores: FALLBACK_AVG.map((v, i) => ({
        month: `${i + 1}月`,
        avg_score: monthCnt[i + 1]
          ? Math.round((monthSum[i + 1] / monthCnt[i + 1]) * 10) / 10
          : v,
      })),
    }))
  } catch (e) {
    return json(fail(e?.message || '大屏数据失败', 500))
  }
}
