// # Tests for the script gate (spec §4 step 4, §5 guardrails, §5c monetisation)
import { describe, expect, test } from 'vitest'
import { gateScript } from '../../agent/gates/script'
import type { FactsDoc, ScriptDoc } from '../../agent/schema'

const filler = (n: number, seed: string) =>
  Array.from({ length: n }, (_, i) => `${seed} point ${"abcdefghijklmnopqrstuvwxyz"[i % 26]} explains how incentives shape what owners and buyers decide over many careful years.`)

// # A valid ~1,250-word script: hook with a stake, thesis, sourced numbers, sparse stress
const make = (): { script: ScriptDoc; facts: FactsDoc } => {
  const intro = [
    { id: 's1', text: 'Why would anyone pay one million dollars for a shop that earns 350,000 a year?', facts: ['f1'] },
    { id: 's2', text: 'Because buyers are not paying for the past.', stress: 'past' },
  ]
  const body = filler(74, 'This').map((text, i) => ({ id: `s${i + 3}`, text }))
  return {
    script: {
      title: 'Why a small shop sells for $1M', area: 'business', format: 'explainer',
      thesis: 'Buyers pay for future earnings and risk, not for past profit alone.',
      chapters: [{ title: 'The question', sentences: intro }, { title: 'The answer', sentences: body }],
    },
    facts: { facts: [{ id: 'f1', value: 350000, unit: 'USD/year', asOf: '2026', source: 'Illustrative example', url: '' }] },
  }
}

describe('gateScript', () => {
  test('a good script passes', () => {
    const { script, facts } = make()
    expect(gateScript(script, facts, { sources: [] }).problems).toEqual([])
  })
  test('too short / too long', () => {
    const { script, facts } = make()
    script.chapters[1].sentences = script.chapters[1].sentences.slice(0, 10)
    expect(gateScript(script, facts, { sources: [] }).problems.join(' ')).toMatch(/words/)
  })
  test('a number without a fact is refused', () => {
    const { script, facts } = make()
    script.chapters[1].sentences[0].text = 'Revenue grew 40% last year.'
    expect(gateScript(script, facts, { sources: [] }).problems.join(' ')).toMatch(/number.*fact/i)
  })
  test('a fact id that does not exist is refused', () => {
    const { script, facts } = make()
    script.chapters[0].sentences[0].facts = ['f9']
    expect(gateScript(script, facts, { sources: [] }).problems.join(' ')).toMatch(/f9/)
  })
  test('weak hook (no question, stake or number in the first two sentences) is refused', () => {
    const { script, facts } = make()
    script.chapters[0].sentences = [{ id: 's1', text: 'Today we talk about shops.' }, { id: 's2', text: 'Shops are places.' }]
    expect(gateScript(script, facts, { sources: [] }).problems.join(' ')).toMatch(/hook/i)
  })
  test('banned phrases and guardrails', () => {
    const { script, facts } = make()
    script.chapters[1].sentences[1].text = 'Welcome back to the channel and smash that like button.'
    script.chapters[1].sentences[2].text = 'You should buy this stock now, it is guaranteed to double.'
    const p = gateScript(script, facts, { sources: [] }).problems.join(' ')
    expect(p).toMatch(/banned/i)
    expect(p).toMatch(/advice|guarantee/i)
  })
  test('stress: never in consecutive sentences, at most ~1 in 3, and the word must be in the sentence', () => {
    const { script, facts } = make()
    script.chapters[1].sentences[0].stress = 'explains'
    script.chapters[1].sentences[1].stress = 'explains'
    script.chapters[1].sentences[5].stress = 'zebra'
    const p = gateScript(script, facts, { sources: [] }).problems.join(' ')
    expect(p).toMatch(/consecutive/i)
    expect(p).toMatch(/zebra/)
  })
  test('copied source text (8-word overlap) is refused', () => {
    const { script, facts } = make()
    const source = script.chapters[1].sentences.slice(0, 12).map((s) => s.text).join(' ')
    expect(gateScript(script, facts, { sources: [source] }).problems.join(' ')).toMatch(/copied|overlap/i)
  })
  test('thesis, area and format are required and must be known', () => {
    const { script, facts } = make()
    script.thesis = 'Shops.'
    script.area = 'gardening' as never
    script.format = 'vlog' as never
    const p = gateScript(script, facts, { sources: [] }).problems.join(' ')
    expect(p).toMatch(/thesis/i); expect(p).toMatch(/area/i); expect(p).toMatch(/format/i)
  })
  test('duplicate sentence ids are refused', () => {
    const { script, facts } = make()
    script.chapters[1].sentences[0].id = 's1'
    expect(gateScript(script, facts, { sources: [] }).problems.join(' ')).toMatch(/duplicate/i)
  })
})
