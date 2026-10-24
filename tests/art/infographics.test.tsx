// # Every infographic renders with sample data at the start and end of its build
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { BarChart, Equation, LineChart, NumberBuild, StackedBar } from '../../art/infographics/charts'
import { ChapterCard, CompareCards, FlowDiagram, KeywordSlam, MapHighlight, QuoteCard, Timeline } from '../../art/infographics/cards'
import { SlideFrame } from '../../art/infographics/SlideFrame'

const samples = (f: number) => [
  <NumberBuild frame={f} value={8e9} cues={[0, 40]} label="missing" />,
  <Equation frame={f} parts={[{ text: '$350k', label: 'profit' }, { op: '× 3' }, { op: '→' }, { text: '$1.05m', tone: 'green' }]} cues={[0, 10, 20, 30]} />,
  <BarChart frame={f} bars={[{ label: '2014', value: 86, tone: 'red' }, { label: '2022', value: 77, tone: 'red' }]} cues={[0, 12]} />,
  <LineChart frame={f} values={[33, 45, 69, 46, 16.5]} cues={[0, 60]} area annotate={{ index: 2, text: 'PEAK $69K', cue: 30 }} />,
  <StackedBar frame={f} segments={[{ label: 'debt', value: 300000 }, { label: 'you', value: 750000, tone: 'green' }]} cues={[0, 10]} />,
  <FlowDiagram frame={f} nodes={[{ title: 'Sales' }, { title: 'Costs', tone: 'red' }, { title: 'Earnings', tone: 'green' }]} cues={[0, 10, 20]} />,
  <Timeline frame={f} points={[{ when: '2008', what: 'crash' }, { when: '2020', what: 'covid' }, { when: '2026', what: 'now' }]} cues={[0, 10, 20]} />,
  <CompareCards frame={f} cards={[{ title: 'ETF', value: '7%', lines: ['low fees'], winner: true }, { title: 'Savings', value: '4%', lines: ['safe'] }]} cues={[0, 10]} />,
  <MapHighlight frame={f} pins={[{ x: 0.2, y: 0.3, label: 'USA' }]} cues={[0]} />,
  <QuoteCard frame={f} quote="Price is what you pay." who="Warren Buffett" cue={0} />,
  <ChapterCard frame={f} n={1} title="How the price is worked out" />,
  <KeywordSlam frame={f} words={[{ text: 'BUYERS' }, { text: "DON'T.", tone: 'red' }]} cues={[0, 10]} />,
]

test('every infographic renders before and after its build', () => {
  for (const f of [0, 120])
    for (const el of samples(f)) expect(() => renderToStaticMarkup(<SlideFrame frame={f} heading="Test">{el}</SlideFrame>)).not.toThrow()
})

// # Phone readability (Critic, first long video): no slide text below 24 px at 1080p
test('no infographic text is smaller than 24 px', async () => {
  const { readFileSync, readdirSync } = await import('node:fs')
  const dir = 'art/infographics'
  const small = readdirSync(dir).filter((f) => f.endsWith('.tsx')).flatMap((f) =>
    // # both style props (fontSize: 26) and SVG font shorthands (font: '700 34px Inter')
    [...readFileSync(`${dir}/${f}`, 'utf8').matchAll(/fontSize[:=]\s*\{?\s*(\d+)|font: '[^']*?(\d+)px/g)]
      .filter((m) => Number(m[1] ?? m[2]) < 24).map((m) => `${f}: ${m[0]}`))
  expect(small).toEqual([])
})
