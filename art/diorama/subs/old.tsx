// ---------------------------------------------------------------- s10–s19: the old way, pay once (casino style).
// A software shop, one setting. Shelves of boxed suites on the left; the Adobe executive behind the counter. Maya
// walks in, takes a box and a licence card pops out; one big $2,600 coin crosses the counter; a calendar beside her
// flips year after year while she keeps using the same box. The executive holds up a NEW VERSION box; Maya shakes her
// head and keeps her old one. Above, a wave line of coin piles (illustration) rises at each new version and dips in
// between; a "?" marks the next wave; Maya leaves happy with her old box while the executive's till shows $0.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, fly, hand, Headline, win } from '../aimoney/common'
import { gestB } from '../buffett/hook'
import { CalPage, Cross, Exec, Maya, SoftBox, Studio } from './kit'

const Old: React.FC<PieceProps> = ({ f, c }) => {
  const shop = c('s10:shop'), box10 = c('s10:box'), licence = c('s10:licence'), price11 = c('s11:price'), years11 = c('s11:years')
  const n2600 = c('s12:2600'), money13 = c('s13:money'), next13 = c('s13:next'), nothing14 = c('s14:nothing'), version14 = c('s14:version')
  const never15 = c('s15:never'), worked = c('s15:worked'), waves = c('s16:waves'), between = c('s16:between'), win17 = c('s17:win'), again17 = c('s17:again')
  const planning = c('s18:planning'), wave18 = c('s18:wave'), happy = c('s19:happy'), sale = c('s19:sale')
  // # extra gesture words
  const G = [c('s10:website'), c('s11:version'), c('s13:sounds'), c('s14:chose'), c('s15:people'), c('s16:came'), c('s17:customers'), c('s18:company'), c('s19:customer'), c('s12:in'), c('s12:set'), c('s13:but'), c('s14:paid'), c('s16:so'), c('s17:year'), c('s19:again'), c('s9:sold')]
  const MX = lerp(2100, 1460, easeInOut(span(f, 0, box10 + 6)))
  const mBeats = gestB([[0, 'walkA', 'smiling', 'walkB', 10], [box10 + 6, 'hold', 'smiling'], [price11, 'offer', 'smiling'], [years11, 'hold', 'smiling'], [version14, 'think', 'thinking'], [never15, 'crossNoA', 'smug'], [worked, 'hold', 'smiling'], [win17, 'armsCrossed', 'neutral'], [happy, 'hold', 'smiling']], G.slice(0, 5))
  const eBeats = gestB([[0, 'idle', 'smiling'], [price11 + 8, 'receive', 'smiling'], [money13, 'celebrate', 'smiling'], [nothing14, 'shrug', 'worried'], [version14, 'hold', 'smiling'], [never15, 'despair', 'worried'], [win17, 'pitch', 'smiling'], [planning, 'think', 'worried'], [sale, 'slump', 'worried']], G.slice(5))
  const hp = hand(f, mBeats, MX, 1000, 1.1, true)
  // # after paying, Maya sets the box on the side table and keeps it there
  const onTable = on(f, price11 + 24, 10)
  // # the wave line of sales (illustration): peaks at each new version
  const waveO = win(f, waves - 4, happy, 10)
  const pts = Array.from({ length: 41 }, (_, i) => { const x = 940 + i * 8.5, t = i / 40; const y = 600 - 170 * Math.max(0, Math.cos((t * 3 - 0.15) * Math.PI * 2)) ** 3; return [x, y] })
  const drawn = easeInOut(span(f, waves, between + 10))
  return (
    <g>
      <StageBg id="sb-old" frame={f} />
      <Studio />
      {/* # shelves of boxed software */}
      {[560, 800].map((y, r) => <g key={r}><rect x={40} y={y} width={360} height={16} rx={6} fill="#8E6A45" />
        {[0, 1, 2].map((k) => <SoftBox key={k} x={100 + k * 110} y={y - 70} s={0.42} name="" color={['#C2384A', '#3A6EA8', '#2FA36B'][(k + r) % 3]} />)}</g>)}
      <rect x={30} y={430} width={20} height={570} fill="#8E6A45" /><rect x={390} y={430} width={20} height={570} fill="#8E6A45" />
      {/* # the wave of sales above the counter (illustration) */}
      <g opacity={waveO}>
        <rect x={910} y={290} width={400} height={380} rx={16} fill="#FFFFFF" stroke="#8E6A45" strokeWidth={10} /><text x={1110} y={655} textAnchor="middle" fill={P.ink2} style={{ font: '400 32px "Bebas Neue"', letterSpacing: 3 }}>ILLUSTRATION · SALES</text>
        <path d={'M' + pts.slice(0, Math.max(2, Math.round(41 * drawn))).map((p) => p.join(' ')).join(' L')} fill="none" stroke={P.gold} strokeWidth={10} strokeLinecap="round" />
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, waves + 6 + k * 8, 6)} transform={`translate(${940 + (0.05 + k / 3) * 340 + 6} 395)`}><SoftBox x={0} y={0} s={0.18} name="" price={undefined} /></g>)}
        <g opacity={on(f, wave18, 6)} transform={`translate(1275 470) scale(${pop(f, wave18) * 0.7})`}><text textAnchor="middle" y={30} fill={P.coralInk} style={{ font: '400 120px "Bebas Neue"' }}>?</text></g>
      </g>
      {/* # the counter and the executive behind it */}
      <Exec f={f} beats={eBeats} x={760} y={980} s={0.95} />
      <rect x={540} y={760} width={440} height={240} rx={12} fill="#7A5236" /><rect x={520} y={740} width={480} height={30} rx={8} fill="#5C3D27" />
      <g transform="translate(860 720)"><rect x={-60} y={-40} width={120} height={60} rx={8} fill="#5B6680" /><text y={2} textAnchor="middle" fill={f > sale ? P.coral : P.gold} style={{ font: '400 34px "Bebas Neue"' }}>{f > sale ? '$0' : 'TILL'}</text></g>
      {/* # the new version the executive holds up; Maya's "no" cross on it */}
      <g opacity={win(f, version14 - 2, win17, 8)}>{(() => { const h = hand(f, eBeats, 760, 980, 0.95); return <SoftBox x={h.x + 30} y={h.y + 40} s={0.5} name="NEW VERSION" color="#3A6EA8" /> })()}</g>
      {/* # the big one-time coin, and the calendar of years while Maya keeps the same box */}
      {(() => { const p = fly(f, price11, [MX - 60, 640], [860, 700], 18, 200); return <g opacity={p.o}><Coin x={p.x} y={p.y} s={1.2} text={f > n2600 - 30 ? '$2,600' : '$'} /></g> })()}
      <g opacity={win(f, n2600 - 4, money13 + 30, 8)} transform={`translate(1150 600) scale(${pop(f, n2600)})`}><rect x={-150} y={-46} width={300} height={92} rx={16} fill={P.gold} /><text y={18} textAnchor="middle" fill="#3A2A12" style={{ font: '400 56px "Bebas Neue"' }}>PAID ONCE</text></g>
      <g opacity={win(f, years11 - 2, n2600 - 4, 8)}><CalPage x={1180} y={560} top="YEAR" big={String(2012 + Math.max(0, Math.min(6, Math.floor((f - years11) / 9))))} s={0.95} /></g>
      {/* # Maya with her box; the licence card pops out */}
      <g opacity={on(f, box10, 6)}><SoftBox x={lerp(hp.x - 10, 1700, onTable)} y={lerp(hp.y + 10, 700, onTable)} s={0.55} name="ALL APPS" /></g>
      <g transform="translate(1700 1000)"><rect x={-110} y={-240} width={220} height={22} rx={6} fill="#7A5236" /><rect x={-90} y={-218} width={18} height={218} fill="#5C3D27" /><rect x={72} y={-218} width={18} height={218} fill="#5C3D27" /></g>
      <g opacity={win(f, licence - 2, price11 + 10, 6)} transform={`translate(${MX - 150} ${lerp(560, 470, on(f, licence, 10))}) scale(${pop(f, licence)})`}><rect x={-90} y={-50} width={180} height={100} rx={12} fill="#FFFFFF" stroke={P.gold} strokeWidth={6} /><text y={-6} textAnchor="middle" fill={P.ink} style={{ font: '400 34px "Bebas Neue"' }}>LICENCE</text><text y={32} textAnchor="middle" fill={P.ink2} style={{ font: '400 28px "Bebas Neue"' }}>YOURS TO KEEP</text></g>
      <Maya f={f} beats={mBeats} x={MX} s={1.1} flip />
      <Headline f={f} lines={[[shop, 'BUY A BOX, ONCE', P.ink, 110], [years11, 'USE IT FOR YEARS', P.ink, 110], [n2600, 'ADOBE’S FULL SET: ≈ $2,600', P.goldInk, 104], [nothing14, 'THEN NOTHING MORE… UNLESS YOU UPGRADE', P.ink, 90],
        [never15, 'SOME NEVER UPGRADED', P.ink, 110], [waves, 'MONEY CAME IN WAVES', P.goldInk, 104], [win17, 'WIN CUSTOMERS AGAIN, EVERY TIME', P.ink, 96], [planning, 'HOW BIG IS THE NEXT WAVE?', P.coralInk, 100]]} />
      <Vignette id="sb-old" />
    </g>
  )
}

const BEATS = ['s9:sold', 's12:in', 's12:set', 's13:but', 's14:paid', 's16:so', 's17:year', 's19:again', 's10:website', 's11:version', 's13:sounds', 's14:chose', 's15:people', 's16:came', 's17:customers', 's18:company', 's19:customer', 's10:shop', 's10:box', 's10:licence', 's11:price', 's11:years', 's12:2600', 's13:money', 's13:next', 's14:nothing', 's14:version', 's15:never', 's15:worked', 's16:waves', 's16:between', 's17:win', 's17:again', 's18:planning', 's18:wave', 's19:happy', 's19:sale']
export const SB_OLD = makePiece('sb-old', 'Subscriptions long (casino-style): a software shop with shelves of boxed suites and the Adobe executive behind the counter; Maya walks in, takes an ALL APPS box and a LICENCE · YOURS TO KEEP card pops out; one big $2,600 coin crosses the counter (PAID ONCE) and a calendar flips year after year while she keeps the box; the executive holds up a NEW VERSION box and Maya shakes her head; above, a gold wave line of sales (illustration) peaks at each new version with a ? for the next wave; Maya keeps her old box while the till shows $0', {
  mood: 'light', Component: Old, beats: BEATS,
  sfx: [['s10:licence', 'pop', 0.3], ['s11:price', 'coin', 0.3], ['s14:version', 'swish', 0.3], ['s15:never', 'click', 0.3], ['s18:wave', 'ding', 0.3]] })
