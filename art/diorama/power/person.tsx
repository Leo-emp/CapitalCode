// ---------------------------------------------------------------- s82–s91: what it costs per person.
// A) The blue $29.4 billion block cracks into four slices, one per year, each with a calendar (≈ $7.4 billion a year).
// B) One year's slice crumbles into a crowd of people (67 million). A coin drops onto each (≈ $110 a year); one person
//    steps forward and the coin shrinks to a daily 30¢ while a day calendar flips; a man, a woman and a child light up.
// C) A household of three at their home; three yearly coins gather into one pile (≈ $330 a year).
// D) Our own even split: one pie cut into equal slices for a row of people. In real life a home and an office each take
//    their part; two homes in different places carry different piles, the one blasting its AC at the busiest time more.
//    Finally a jar fills with 30¢ coins day after day while the calendar races: it adds up.
import React from 'react'
import { Mini } from '../../rig/Mini'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Calendar, Coin, Headline, Jar, Label, Person, win } from '../aimoney/common'
import { Home } from './kit'
import { AC, Ground, Office, RegionMap } from './kit2'

const GROUND = 920
const LOOKS = ['buyer', 'investorF', 'worker', 'hero', 'investor', 'owner']

const PerPerson: React.FC<PieceProps> = ({ f, c }) => {
  const s82 = c('s82'), picture = c('s82:picture'), split = c('s82:split')
  const spread = c('s83:spread'), four = c('s83:four'), d74 = c('s83:74'), year83 = c('s83:year')
  const live84 = c('s84:live'), s90 = c('s90'), region84 = c('s84:region'), rest89 = c('s89:rest'), share90 = c('s90:share'), divide = c('s84:divide'), d67 = c('s84:67'), people84 = c('s84:people')
  const d110 = c('s85:110'), person85 = c('s85:person'), year85 = c('s85:year')
  const d30 = c('s86:30'), day86 = c('s86:day'), man = c('s86:man'), woman = c('s86:woman'), child = c('s86:child')
  const household = c('s87:household'), three = c('s87:three'), d330 = c('s87:330')
  const average = c('s88:average'), evenly = c('s88:evenly'), everyone = c('s88:everyone')
  const real = c('s89:real'), homes = c('s89:homes'), businesses = c('s89:businesses')
  const where = c('s90:where'), live = c('s90:live'), power90 = c('s90:power'), busiest = c('s90:busiest')
  const s91 = c('s91'), d30b = c('s91:30'), every91 = c('s91:every'), four91 = c('s91:four'), adds = c('s91:adds')
  const AB = divide - 4, BC = household - 4, CD = average - 4
  const A = win(f, s82, AB), B = win(f, AB, BC), C = win(f, BC, CD), D = on(f, CD, 8)
  // # D sub-steps
  const D1 = win(f, average, real), D2 = win(f, real, s91), D3 = on(f, s91, 8)
  return (
    <g>
      <Stage id="pw-person" frame={f} />
      <Headline f={f} lines={[[s82, '≈ $29.4 BILLION', P.skyInk, 110], [d74, '≈ $7.4 BILLION', P.skyInk, 110], [year83, '≈ $7.4 BILLION A YEAR', P.skyInk, 104], [d67, '÷ 67 MILLION PEOPLE', P.ink, 104], [d110, '≈ $110 PER PERSON', P.goldInk, 110], [year85, '≈ $110 PER PERSON A YEAR', P.goldInk, 100], [d30, '≈ 30¢', P.goldInk, 120], [day86, '≈ 30¢ A DAY', P.goldInk, 116], [household, '', P.ink], [d330, '≈ $330 A YEAR', P.goldInk, 112], [average, 'OUR OWN AVERAGE', P.ink, 100], [real, '', P.ink], [d30b, '30¢ A DAY', P.goldInk, 110], [adds, '30¢ A DAY · IT ADDS UP', P.goldInk, 104]]} />

      {/* # A) the block splits into four years */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        {[0, 1, 2, 3].map((k) => {
          const gap = 70 * on(f, split, 16), x = 560 + k * (200 + gap), lift = 0
          return <g key={k}>
            <rect x={x} y={GROUND - 420 - lift} width={200} height={420} rx={k === 0 || k === 3 ? 18 : 6} fill={P.sky} stroke={on(f, split, 4) > 0.1 ? '#FFFFFF' : 'none'} strokeWidth={6} />
            {Array.from({ length: 7 }, (_, j) => <rect key={j} x={x + 10} y={GROUND - 400 + j * 56} width={180} height={6} rx={3} fill="#FFFFFF" opacity={0.2} />)}
            <g opacity={on(f, four + k * 3, 8)}><Calendar x={x + 100} y={GROUND - 520} text="1 YEAR" s={0.8} /></g>
          </g>
        })}
        <g opacity={on(f, picture, 8) * (1 - on(f, split, 8))}><Person f={f} who="hero" beats={[[0, 'idle', 'neutral'], [picture, 'scratchHead', 'thinking']]} x={330} y={GROUND} s={0.62} /></g>
        <g opacity={on(f, split, 8)}><Person f={f} who="hero" beats={[[0, 'explain', 'smiling'], [spread, 'present', 'smiling']]} x={330} y={GROUND} s={0.62} /></g>
      </g>}

      {/* # B) one year among 67 million people: $110 each, then 30¢ a day */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={0.3 * on(f, live84, 12) + 0.3 * on(f, region84, 12)}><RegionMap x={960} y={640} s={1.6} /></g>
        {/* # the slice crumbles into a crowd */}
        <rect x={860} y={GROUND - 420 * (1 - on(f, d67, 20))} width={200} height={420 * (1 - on(f, d67, 20))} rx={16} fill={P.sky} />
        {Array.from({ length: 30 }, (_, k) => {
          const row = Math.floor(k / 10), col = k % 10, x = 330 + col * 140 + (row % 2) * 60, y = GROUND - row * 165 - 10
          const at = d67 + k
          const dim = on(f, d30, 10) * (k === 14 || (f >= man && [3, 15, 26].includes(k)) ? 0 : 0.7)
          return f >= at ? <g key={k} opacity={1 - dim}>
            <Mini look={LOOKS[k % 6]} x={x} y={y} scale={(k === 26 ? 0.75 : 1.0) * pop(f, at)} frame={f} seed={k + 80} mood={f >= d110 ? 'happy' : 'neutral'} />
            {f >= d110 + (k % 10) && <Coin x={x} y={lerp(y - 260, y - 150, on(f, d110 + (k % 10), 10))} s={0.5 * (1 - 0.3 * on(f, d30, 10))} o={on(f, d110 + (k % 10), 6)} text={f >= d30 ? '¢' : '$'} />}
            {[3, 15, 26].includes(k) && <ellipse cx={x} cy={y + 6} rx={46} ry={12} fill={P.gold} opacity={on(f, [man, woman, child][[3, 15, 26].indexOf(k)], 8) * 0.8} />}
          </g> : null
        })}
        <g opacity={on(f, day86, 8)}><Calendar x={1700} y={300} text="DAY" s={1.2} flip={((f - day86) % 8) / 8} /></g>
      </g>}

      {/* # C) a household of three: ≈ $330 a year */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <Home x={560} y={GROUND} s={1.5} lit={1} />
        {['buyer', 'investorF', 'worker'].map((who, k) => <g key={k} opacity={on(f, three + k * 3, 8)}><Person f={f} who={who} beats={[[0, 'waveA', 'smiling'], [three + 12, 'idle', 'smiling'], [d330, 'shock', 'shocked']]} x={900 + k * 170} y={GROUND} s={k === 2 ? 0.42 : 0.56} /></g>)}
        {[0, 1, 2].map((k) => { const t = on(f, d330 - 10 + k * 4, 16); return <Coin key={k} x={lerp(900 + k * 170, 1500, t)} y={lerp(GROUND - 420, GROUND - 90 - k * 40, t) - Math.sin(t * Math.PI) * 80} s={0.9} o={on(f, d330 - 12 + k * 4, 6)} /> })}
      </g>}

      {/* # D) even average vs real life; then 30¢ a day adds up */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        {/* # D1: one pie cut evenly for a row of people */}
        {D1 > 0 && <g opacity={D1}>
          <g transform="translate(960 470)" opacity={on(f, average, 10)}>
            <circle r={220} fill={P.gold} />
            <circle r={220} fill="none" stroke={P.goldD} strokeWidth={8} opacity={on(f, average, 8)} />
            {Array.from({ length: 6 }, (_, k) => <line key={k} x1={0} y1={0} x2={220 * Math.cos((k * Math.PI) / 3)} y2={220 * Math.sin((k * Math.PI) / 3)} stroke="#FFFFFF" strokeWidth={8} opacity={on(f, evenly + k * 2, 6)} />)}
          </g>
          {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, everyone + k * 2, 8)}><Mini look={LOOKS[k]} x={420 + k * 216} y={GROUND} scale={1.2} frame={f} seed={k + 120} mood="happy" /></g>)}
        </g>}
        {/* # D2: homes and businesses; where you live; the busiest times */}
        {D2 > 0 && <g opacity={D2}>
          <g opacity={on(f, homes, 8)}><Home x={330} y={GROUND} s={1.0} lit={1} /></g>
          <g opacity={on(f, businesses, 8)}><Office x={700} y={GROUND} s={0.9} /></g>
          {[[330, homes, 3], [700, rest89, 5]].map(([x, at, n], k) => <g key={k} opacity={on(f, at + 6, 8)}>{Array.from({ length: n }, (_, j) => <Coin key={j} x={x + 170} y={GROUND - 30 - j * 26} s={0.7} />)}</g>)}
          {/* # where they live: two homes in two places, different piles; the AC home at the busiest time pays more */}
          <g opacity={0.6 * on(f, s90, 8) + 0.4 * on(f, share90, 8)}>
            <Home x={1220} y={GROUND} s={0.9} lit={1} /><Home x={1620} y={GROUND} s={0.9} lit={1} color="#E8B48A" />
            <g opacity={on(f, power90, 8)}><AC x={1730} y={GROUND - 70} s={0.75} run={on(f, busiest, 6)} f={f} /></g>
            {Array.from({ length: 2 }, (_, j) => <Coin key={j} x={1360} y={GROUND - 30 - j * 26} s={0.6} o={on(f, live, 8)} />)}
            {Array.from({ length: 2 + Math.round(3 * on(f, busiest, 16)) }, (_, j) => <Coin key={j} x={1780} y={GROUND - 160 - j * 26} s={0.6} o={on(f, live, 8)} />)}
          </g>
        </g>}
        {/* # D3: 30¢ a day, every day, for four years — the jar fills, the calendar races */}
        {D3 > 0 && <g opacity={D3}>
          <Jar x={800} y={GROUND - 10} s={1.8} fill={span(f, every91, adds + 10)} />
          {f >= every91 && f < adds + 10 && (() => { const ph = ((f - every91) % 10) / 10; return <Coin x={800} y={lerp(160, 420, ph)} s={0.5} o={1 - ph * 0.5} text="¢" /> })()}
          <g opacity={on(f, every91, 8)}><Calendar x={1360} y={460} text="DAY" s={1.8} flip={((f - every91) % 5) / 5} /></g>
          <g opacity={on(f, four91, 8)}><Person f={f} who="hero" beats={[[0, 'idle', 'neutral'], [four91, 'point', 'neutral'], [adds, 'shock', 'shocked']]} x={1620} y={GROUND} s={0.62} /></g>
        </g>}
      </g>}
      <Vignette id="pw-person" />
    </g>
  )
}

const BEATS = ['s82', 's82:picture', 's82:split', 's83:spread', 's83:four', 's83:74', 's83:year', 's84:divide', 's84:67', 's85:110', 's85:year', 's86:30', 's86:day', 's86:man', 's86:woman', 's86:child', 's87:household', 's87:three', 's87:330', 's88:average', 's88:evenly', 's88:everyone', 's89:real', 's89:homes', 's89:businesses', 's90:where', 's90:live', 's90:power', 's90:busiest', 's91', 's91:30', 's91:every', 's91:four', 's91:adds', 's84:region', 's89:rest', 's90:share', 's84:live', 's90']
export const PW_PERSON = makePiece('pw-person', 'Power long: $29.4bn split into four years (~$7.4bn a year), divided among 67 million people (~$110 each a year, ~30¢ a day), a household of three (~$330), an even average vs real life (homes and businesses, where you live, the busiest times), 30¢ a day adds up', {
  mood: 'light', Component: PerPerson, beats: BEATS,
  sfx: [['s82:split', 'crack', 0.3], ['s84:67', 'softpop', 0.25], ['s85:110', 'coin', 0.3], ['s86:30', 'ding', 0.3], ['s87:330', 'coin', 0.35], ['s88:evenly', 'swish', 0.25], ['s90:busiest', 'click', 0.25], ['s91:adds', 'cash', 0.35]] })
