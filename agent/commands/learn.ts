// # CLI: learn — the agent's memory (taste/learning.json): rules, feedback, approvals, references, results, brief
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { register } from '../cli'
import { existsSync } from 'node:fs'
import { readJson } from '../jobs'
import {
  addRule, brief, loadMemory, RULE_AREAS, type RuleArea, recordApproval, recordFeedback, recordReference, recordResult, retireRule, saveMemory, type Source,
} from '../learning'
import { ROOT } from '../paths'
import { refuse, result } from '../result'
import type { ScriptDoc } from '../schema'

const flag = (a: string[], name: string) => a.find((x) => x.startsWith(`--${name}=`))?.slice(name.length + 3)
const text = (a: string[]) => a.filter((x) => !x.startsWith('--')).join(' ').trim()
const num = (v?: string) => (v == null ? undefined : Number(v))
// # format/area come from the job's script.json when the job folder is given
const jobInfo = (job: string) => {
  const f = join(job, 'script.json')
  const s = existsSync(f) ? readJson<ScriptDoc>(f) : null
  return { format: s?.format, area: s?.area, title: s?.title }
}

const USAGE = `learn brief | rule --area=<${RULE_AREAS.join('|')}> [--ban="phrase"] [--source=feedback|approval|reference|analytics] [--evidence=..] "<rule>" | retire <id> "<why>" | feedback [--job=<dir>] "<note>" | approve <job> [--title=N] [--thumb=N --layout=L] [--reject] ["note"] | reference "<url or path>" "<lesson>" | result <job> --views=N [--ctr=%] [--avd=%] [--title=..]`

register('learn', `${USAGE}  — memory that improves every run`, (a) => {
  const [sub, ...rest] = a
  let m = loadMemory()
  let out: Record<string, unknown> = {}
  if (sub === 'brief' || !sub) {
    const md = brief(m)
    writeFileSync(join(ROOT, 'temp', 'learn_brief.md'), md)
    console.log(md)
    return result({ ok: true, rules: m.rules.filter((r) => r.status === 'active').length, file: 'temp/learn_brief.md' })
  } else if (sub === 'rule') {
    const area = flag(rest, 'area') as RuleArea
    if (!RULE_AREAS.includes(area)) refuse(`--area must be one of ${RULE_AREAS.join(', ')}`)
    const rule = text(rest) || refuse('give the rule text')
    m = addRule(m, { area, rule, source: (flag(rest, 'source') as Source) ?? 'feedback', ban: flag(rest, 'ban'), evidence: flag(rest, 'evidence') })
    out = { rule: m.rules.at(-1)?.id }
  } else if (sub === 'retire') {
    const [id, ...why] = rest
    try { m = retireRule(m, id ?? refuse('give the rule id'), why.join(' ') || 'owner') } catch (e) { refuse((e as Error).message) }
    out = { retired: id }
  } else if (sub === 'feedback') {
    m = recordFeedback(m, { job: flag(rest, 'job'), note: text(rest) || refuse('give the feedback note') })
  } else if (sub === 'approve') {
    const job = rest[0] && !rest[0].startsWith('--') ? rest[0] : refuse('give the job folder')
    const info = jobInfo(job)
    const thumb = num(flag(rest, 'thumb'))
    m = recordApproval(m, {
      job, verdict: rest.includes('--reject') ? 'rejected' : 'approved', format: info.format, area: info.area,
      title: num(flag(rest, 'title')), thumb: thumb ? { index: thumb, layout: flag(rest, 'layout') ?? '?' } : undefined,
      note: text(rest.slice(1)) || undefined,
    })
  } else if (sub === 'reference') {
    const [ref, ...take] = rest
    m = recordReference(m, { ref: ref ?? refuse('give the reference'), take: take.join(' ') || refuse('give the lesson') })
  } else if (sub === 'result') {
    const job = rest[0] ?? refuse('give the job folder')
    const views = num(flag(rest, 'views'))
    if (views == null || Number.isNaN(views)) refuse('--views=N is required')
    m = recordResult(m, { job, title: flag(rest, 'title') ?? jobInfo(job).title ?? job, views: views!, ctr: num(flag(rest, 'ctr')), avd: num(flag(rest, 'avd')) })
  } else refuse(`unknown learn command "${sub}" — ${USAGE}`)
  saveMemory(m)
  result({ ok: true, ...out, rules: m.rules.filter((r) => r.status === 'active').length, feedback: m.feedback.length, approvals: m.approvals.length, references: m.references.length, results: m.results.length })
})
