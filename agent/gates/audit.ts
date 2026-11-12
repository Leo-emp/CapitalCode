// ============================================================
// ACCURACY AUDIT GATE — owner rule (2026-10-28): every video's
// information, concepts and explanation must be correct and make
// complete sense. Before any voice is paid for, the director writes
// audit.json for the CURRENT script: a verdict and reason for every
// sentence, every one of our own calculations re-done independently,
// and a reality check against an outside source. This gate refuses
// a missing, stale or incomplete audit.
// ============================================================
import { allSentences, type FactsDoc, type ScriptDoc } from '../schema'

export type AuditDoc = {
  scriptHash: string                                             // # the script.json hash the audit was written for
  sentences: Record<string, { verdict: 'ok'; why: string }>       // # per sentence: why it is true and follows from the line before
  calcs: { fact: string; recomputed: string; matches: boolean }[] // # each "our calculation" fact, re-done a second, independent way
  realityCheck: string                                           // # does the headline result match the outside world? (source + comparison)
}

// # our own maths: a fact whose source says it is a calculation
const isCalc = (f: FactsDoc['facts'][number]) => /calculation/i.test(f.source)

export const checkAudit = (script: ScriptDoc, facts: FactsDoc, audit: AuditDoc | undefined, scriptHash: string): string[] => {
  if (!audit) return ['audit.json missing — audit every sentence, re-do every calculation independently and reality-check the result before voicing (owner rule: info, concepts and explanation must be correct and make sense)']
  const problems: string[] = []
  if (audit.scriptHash !== scriptHash) problems.push(`audit.json is for an older script (${audit.scriptHash}); re-audit the current script (${scriptHash})`)
  for (const s of allSentences(script)) {
    const a = audit.sentences?.[s.id]
    if (!a) problems.push(`${s.id}: not audited ("${s.text.slice(0, 60)}")`)
    else if (a.verdict !== 'ok') problems.push(`${s.id}: audit verdict is "${a.verdict}" — fix the line first`)
    else if (!a.why || a.why.trim().length < 15) problems.push(`${s.id}: say why it is correct and follows on (a real reason, not "ok")`)
  }
  for (const f of facts.facts.filter(isCalc)) {
    const c = (audit.calcs ?? []).find((x) => x.fact === f.id)
    if (!c) problems.push(`${f.id}: our calculation is not re-done independently`)
    else if (!c.matches) problems.push(`${f.id}: the independent re-calculation does not match (${c.recomputed}) — fix the fact or the script`)
  }
  if (!audit.realityCheck || audit.realityCheck.trim().length < 40) problems.push('realityCheck: compare the headline result with an outside source and say how it compares')
  return problems
}
