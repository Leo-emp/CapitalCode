// ============================================================
// STYLE BIBLE v2 — the living film's reference pages (spec §10).
// Static sheets are the existing compositions (now in night flat);
// living pages are tiny Episode timelines rendered as still strips,
// so every page is made from the same engine parts a video uses.
// ============================================================

export type StaticPage = { name: string; composition: string }
// # A living page: some shots, the frames to capture, and how to tile them (cols × rows)
export type LivingPage = { name: string; shots: { from: number; to: number; shot: Record<string, unknown> }[]; frames: number[]; cols: number; speech?: [number, number][] }

export const STATIC_PAGES: StaticPage[] = [
  { name: 'page_01_LogoStill', composition: 'LogoStill' },
  { name: 'page_02_CastHD', composition: 'CastHD' },
  { name: 'page_03_ExpressionsHD', composition: 'ExpressionsHD' },
  { name: 'page_04_PoseStrip', composition: 'PoseStrip' },
  { name: 'page_05_PropSheet', composition: 'PropSheet' },
  { name: 'page_06_PropSheet2', composition: 'PropSheet2' },
  { name: 'page_06b_PropSheet3', composition: 'PropSheet3' },
  { name: 'page_07_SceneSheet', composition: 'SceneSheet' },
  { name: 'page_08_SceneSheet2', composition: 'SceneSheet2' },
  { name: 'page_09_SceneSheet3', composition: 'SceneSheet3' },
  { name: 'page_10_SceneSheet4', composition: 'SceneSheet4' },
  { name: 'page_11_SceneSheet5', composition: 'SceneSheet5' },
  { name: 'page_12_SceneSheet6', composition: 'SceneSheet6' },
  { name: 'page_13_VariantSheet', composition: 'VariantSheet' },
  { name: 'page_14_InfoSheet', composition: 'InfoSheet' },
  { name: 'page_15_ThumbSheet', composition: 'ThumbSheet' },
]

const one = (shot: Record<string, unknown>, len = 240) => [{ from: 0, to: len, shot: { start: 0, ...shot } }]
const hero = (track: unknown[] = [{ at: 0, pose: 'idle' }], extra: Record<string, unknown> = {}) => ({ who: 'hero', anchor: 'stand', track, ...extra })

export const LIVING_PAGES: LivingPage[] = [
  // # the two colour worlds, same places
  { name: 'page_16_Worlds', cols: 2, frames: [10, 130, 250, 370], shots: [
    { from: 0, to: 120, shot: { id: 'w1', kind: 'scene', start: 0, scene: 'shop-street', world: 'night', actors: [hero()] } },
    { from: 120, to: 240, shot: { id: 'w2', kind: 'scene', start: 120, scene: 'shop-street', world: 'teal', actors: [hero([{ at: 120, pose: 'idle' }])] } },
    { from: 240, to: 360, shot: { id: 'w3', kind: 'scene', start: 240, scene: 'vault-room', world: 'night', actors: [hero([{ at: 240, pose: 'present' }])] } },
    { from: 360, to: 480, shot: { id: 'w4', kind: 'scene', start: 360, scene: 'vault-room', world: 'teal', actors: [hero([{ at: 360, pose: 'present' }])] } },
  ] },
  // # walking between spots (walk cycle frames)
  { name: 'page_17_Walk', cols: 3, frames: [10, 30, 40, 55, 70, 120], shots: one({ id: 'wk', kind: 'scene', scene: 'shop-street', actors: [hero(undefined, { path: [{ at: 20, to: 'stand2' }] })] }) },
  // # talk gestures while the voice speaks (automatic), two people out of sync
  { name: 'page_18_Gestures', cols: 3, frames: [20, 60, 100, 140, 180, 220], speech: [[10, 300]], shots: one({ id: 'gs', kind: 'scene', scene: 'shop-street',
    actors: [hero(), { who: 'investor', anchor: 'stand2', track: [{ at: 0, pose: 'idle' }] }] }, 300) },
  // # handing an object over
  { name: 'page_19_HandOver', cols: 3, frames: [20, 36, 42, 45, 48, 70], shots: one({ id: 'ho', kind: 'scene', scene: 'shop-street',
    actors: [hero([{ at: 0, pose: 'hold' }]), { who: 'investor', anchor: 'stand2', track: [{ at: 0, pose: 'idle' }] }],
    props: [{ id: 'cash-stack', anchor: 'stand', at: 0, on: 'hand', actor: 0, give: { at: 40, to: 1 } }] }) },
  // # feelings melting into each other
  { name: 'page_20_Expressions', cols: 3, frames: [30, 62, 66, 120, 124, 160], shots: one({ id: 'ex', kind: 'scene', scene: 'shop-street', camera: [{ at: 1, to: 'stand', zoom: 1.9 }],
    actors: [hero([{ at: 0, pose: 'idle', expression: 'worried' }, { at: 60, pose: 'idle', expression: 'shocked' }, { at: 118, pose: 'celebrate', expression: 'smiling' }])] }) },
  // # the camera goes to what is named, with parallax and drift
  { name: 'page_21_Camera', cols: 3, frames: [20, 48, 64, 90, 112, 140], shots: one({ id: 'cm', kind: 'scene', scene: 'shop-street',
    camera: [{ at: 40, to: 'sign', zoom: 1.6 }, { at: 100, to: 'stand' }], actors: [hero()] }) },
  // # the next shot grows out of a door
  { name: 'page_22_ZoomInto', cols: 3, frames: [58, 62, 66, 70, 74, 90], shots: [
    { from: 0, to: 60, shot: { id: 'z1', kind: 'scene', start: 0, scene: 'shop-street', actors: [hero()] } },
    { from: 60, to: 200, shot: { id: 'z2', kind: 'scene', start: 60, scene: 'vault-room', enter: { zoomInto: 'door' }, actors: [hero([{ at: 60, pose: 'present' }])] } },
  ] },
  // # metaphors at the end of their build
  { name: 'page_23_Metaphors', cols: 3, frames: [140, 290, 440, 590, 740, 890], shots: [
    ['crowd-giant', { giant: 'investor', crowd: 30, label: 'The top 10' }, 3],
    ['slice-grows', { name: 'NVIDIA', from: 1.5, to: 7.5 }, 2],
    ['tracks', { long: { label: '30 years', years: 30 }, short: { label: '5 years', years: 5 } }, 3],
    ['house-of-cards', { label: 'Built on 10 names' }, 2],
    ['money-mountain', { label: '$15 trillion' }, 2],
    ['see-saw', { left: { label: '10 giants', value: 38 }, right: { label: '490 others', value: 62 } }, 3],
  ].map(([v, data, n], i) => ({ from: i * 150, to: i * 150 + 150, shot: { id: `m${i}`, kind: 'vignette', start: i * 150, vignette: v, data, at: Array.from({ length: n as number }, (_, k) => i * 150 + 5 + k * 25) } })) },
  // # crowds, grids, circles
  { name: 'page_24_Crowds', cols: 3, frames: [90, 190, 290], shots: [
    { from: 0, to: 100, shot: { id: 'c1', kind: 'vignette', start: 0, vignette: 'crowd', data: { people: Array.from({ length: 40 }, (_, i) => ({ look: ['hero', 'buyer', 'owner', 'worker', 'investor'][i % 5], share: i < 3 ? 20 : 1 + (i % 4) })) }, at: [5, 13, 21, 29, 37, 45] } },
    { from: 100, to: 200, shot: { id: 'c2', kind: 'vignette', start: 100, vignette: 'grid', data: { panels: [{ scene: 'shop-street', label: 'Shops' }, { scene: 'bank-interior', label: 'Banks' }, { prop: 'house', label: 'Homes' }, { prop: 'car', label: 'Cars' }] }, at: [105, 113, 121, 129] } },
    { from: 200, to: 300, shot: { id: 'c3', kind: 'vignette', start: 200, vignette: 'circles', data: { items: [{ prop: 'coin', label: 'Cash' }, { prop: 'house', label: 'Property' }, { scene: 'stock-exchange', label: 'Stocks' }] }, at: [205, 213, 221] } },
  ] },
  // # kinetic text, now and then
  { name: 'page_25_Kinetic', cols: 2, frames: [28, 50, 64, 90], shots: one({ id: 'kt', kind: 'scene', scene: 'shop-street', actors: [hero()],
    text: [{ words: '£1,250 saved', at: 20, style: 'count', anchor: 'stand' }, { words: 'Only ten names', at: 60, style: 'pop' }] }) },
]

// # Where the previous pages go before a rebuild
export const archiveName = (date: string) => `archive/v1-${date}`
