// # Interior redraw (owner 2026-10-25: "redraw, improve and build more variety for scenes"):
// # the line-art rooms become solid night-flat rooms, keep their spots, and come in colour moods
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { getScene, SCENES } from '../../art/scenes/registry'

const REDRAWN = ['bank-interior', 'vault-room', 'office', 'boardroom', 'meeting-room', 'trading-desk', 'stock-exchange', 'chart-wall', 'server-room',
  'ai-lab', 'ai-brain', 'stage', 'courtroom', 'living-room', 'coder-desk', 'savings-jars']

const look = (html: string) => {
  const shapes = [...html.matchAll(/<(rect|circle|ellipse|path|polygon|line)\b[^>]*>/g)].map((m) => m[0])
  const outline = shapes.filter((s) => s.startsWith('<line') || /fill="none"/.test(s)).length
  const colours = new Set([...html.matchAll(/fill="(#[0-9A-Fa-f]{6})"/g)].map((m) => m[1].toUpperCase()))
  const thinBlue = [...html.matchAll(/stroke="(#1E6FA8|#12385A)"/gi)].length
  return { solid: shapes.length - outline, ratio: outline / Math.max(1, shapes.length), colours: colours.size, thinBlue }
}

test('redrawn rooms are solid night-flat art, not line art', () => {
  for (const id of REDRAWN) {
    const S = getScene(id).Component
    const l = look(renderToStaticMarkup(<S frame={20} />))
    expect(l.ratio, `${id} outline share`).toBeLessThanOrEqual(0.1)
    expect(l.solid, `${id} solid shapes`).toBeGreaterThanOrEqual(60)
    expect(l.colours, `${id} colours`).toBeGreaterThanOrEqual(8)
    expect(l.thinBlue, `${id} thin blue outlines`).toBeLessThanOrEqual(4)
  }
})

// # plans written for the old rooms must still land on the same spots
const SPOTS: Record<string, Record<string, [number, number, number]>> = {
  'bank-interior': { stand: [560, 1010, 1], counter: [1300, 760, 0.8], prop1: [1300, 300, 1], prop2: [960, 620, 0.8] },
  'vault-room': { stand: [500, 1010, 1], prop1: [1300, 520, 1.6], prop2: [1600, 820, 0.9] },
  office: { stand: [420, 1010, 1], sit: [960, 1000, 0.95], prop1: [1460, 300, 1], prop2: [960, 560, 0.7] },
  boardroom: { stand: [330, 1010, 1], focus: [1100, 700, 1], prop1: [1100, 300, 1], prop2: [1650, 380, 1] },
  'meeting-room': { stand: [330, 1010, 1], board: [1500, 420, 1], prop1: [1500, 400, 1], prop2: [960, 700, 0.7] },
  'trading-desk': { stand: [420, 1010, 1], sit: [960, 1000, 0.95], prop1: [960, 180, 1], prop2: [1550, 420, 1] },
  'stock-exchange': { stand: [330, 1010, 1], prop1: [960, 160, 1], prop2: [1500, 520, 0.8] },
  'chart-wall': { stand: [300, 1011, 1], focus: [1100, 470, 1], prop1: [1100, 200, 1], prop2: [1600, 820, 0.8] },
  'server-room': { stand: [960, 1010, 1], prop1: [960, 220, 1], prop2: [1600, 300, 1], stand2: [440, 1010, 1] },
  'ai-lab': { stand: [380, 1010, 1], prop1: [1250, 300, 1.2], prop2: [1650, 760, 0.8] },
  'ai-brain': { stand: [330, 1010, 1], focus: [1150, 480, 1.2], prop1: [1150, 480, 1.2], prop2: [1650, 300, 1] },
  stage: { stand: [960, 1000, 1.05], prop1: [1500, 320, 1], prop2: [420, 320, 1], stand2: [440, 1000, 1.05] },
  courtroom: { stand: [400, 1010, 1], prop1: [1300, 260, 1], prop2: [1300, 560, 0.7] },
  'living-room': { stand: [500, 1010, 1], sit: [1150, 900, 0.9], prop1: [1550, 380, 1], prop2: [1150, 560, 0.8] },
  'coder-desk': { stand: [330, 1010, 1], sit: [1000, 1000, 0.95], focus: [1100, 520, 1], prop1: [1100, 220, 1], prop2: [1650, 380, 1] },
  'savings-jars': { stand: [330, 1010, 1], focus: [1150, 640, 1], prop1: [1150, 300, 1], prop2: [1600, 380, 1] },
}
test('redrawn rooms keep every spot the old plans use', () => {
  for (const [id, spots] of Object.entries(SPOTS))
    for (const [k, [x, y, s]] of Object.entries(spots)) expect(getScene(id).anchors[k], `${id}.${k}`).toMatchObject({ x, y, scale: s })
})

// # every room has at least three looks: its default, the other mood (warm, or cool for warm rooms) and teal
test('rooms come in colour moods: at least three different looks each', () => {
  for (const id of REDRAWN) {
    const S = getScene(id).Component
    const looks = new Set([<S frame={20} />, <S frame={20} variant="warm" />, <S frame={20} variant="cool" />, <S frame={20} world="teal" />].map((x) => renderToStaticMarkup(x)))
    expect(looks.size, id).toBeGreaterThanOrEqual(3)
  }
})

test('more places: at least 8 new scenes for variety, each solid and usable', () => {
  const NEW = ['rooftop-terrace', 'train-platform', 'city-park', 'library', 'classroom', 'home-office', 'beach-sunset', 'highway-billboard']
  for (const id of NEW) {
    const s = SCENES.find((x) => x.id === id)
    expect(s, id).toBeDefined()
    expect(s!.anchors.stand, id).toBeDefined()
    expect(Object.keys(s!.anchors).some((k) => k.startsWith('prop')), id).toBe(true)
    const C = s!.Component
    const l = look(renderToStaticMarkup(<C frame={20} />))
    expect(l.ratio, `${id} outline share`).toBeLessThanOrEqual(0.1)
    expect(l.solid, `${id} solid shapes`).toBeGreaterThanOrEqual(40)
  }
})
