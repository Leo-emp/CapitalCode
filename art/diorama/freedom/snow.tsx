// ---------------------------------------------------------------- s71–s77: compounding, a snowball rolling down a winter hill.
// A) Year one: Maya rolls a $5,000 snowball; at 5% a thin gold layer of $250 wraps it.
// B) Year two: another $5,000 packed on, and the gold layer now forms around everything, including last year's $250.
// C) Compounding: the ball keeps rolling, each lap a new white (saved) and gold (growth) ring; early rings mostly white, later rings mostly gold.
// D) 2008: a storm, the ball cracks and loses more than a third; Maya keeps pushing while a panicked figure runs off (crossed).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { Backdrop, C, Cross, Defs, FONT, Grain, Snow, Tag, fadeIn, scene } from './kit'

const G = 930

// # the snowball: rings = list of [white share 0–1] from the core outwards; r = radius; spin = rotation
const Ball: React.FC<{ x: number; y: number; r: number; rings: number[]; spin: number; crack?: number; o?: number }> = ({ x, y, r, rings, spin, crack = 0, o = 1 }) => {
  const n = Math.max(1, rings.length)
  return (
    <g transform={`translate(${x} ${y - r})`} opacity={o}>
      <ellipse cx={0} cy={r + 4} rx={r * 0.95} ry={r * 0.14} fill="#7A8AB0" opacity={0.35} />
      {rings.map((w, k) => { const rr = r * (n - k) / n
        return <g key={k}><circle r={rr} fill={C.gold} /><circle r={rr} fill={C.snow} opacity={1} clipPath={`url(#fr-ring${Math.round(x)}-${k})`} />
          <clipPath id={`fr-ring${Math.round(x)}-${k}`}><rect x={-rr} y={-rr} width={2 * rr * w} height={2 * rr} transform={`rotate(${spin + k * 47})`} /></clipPath></g> }).reverse()}
      {rings.map((_, k) => <circle key={'l' + k} r={r * (n - k) / n} fill="none" stroke="#B8C6DE" strokeWidth={3} opacity={0.7} />)}
      <circle cx={-r * 0.35} cy={-r * 0.35} r={r * 0.3} fill="#fff" opacity={0.35} />
      {crack > 0.02 && <path d={`M${-r * 0.2} ${-r} L${r * 0.05} ${-r * 0.4} L${-r * 0.15} 0 L${r * 0.15} ${r * 0.5}`} stroke="#5A6A8A" strokeWidth={8} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${crack} 1`} />}
    </g>
  )
}

const Snowball: React.FC<PieceProps> = ({ f, c }) => {
  const snowballs = c('s71:snowballs'), one71 = c('s71:one'), step71 = c('s71:step')
  const year72 = c('s72:year'), invests = c('s72:invests'), five72 = c('s72:five'), percent72 = c('s72:percent'), earns72 = c('s72:earns'), two72 = c('s72:two')
  const year73 = c('s73:year'), adds = c('s73:adds'), five73 = c('s73:five'), growth73 = c('s73:growth'), everything = c('s73:everything'), last73 = c('s73:last'), two73 = c('s73:two')
  const compounding = c('s74:compounding'), growth74 = c('s74:growth'), own74 = c('s74:own')
  const early = c('s75:early'), saves75 = c('s75:saves'), later = c('s75:later'), growth75 = c('s75:growth')
  const straight = c('s76:straight'), y2008 = c('s76:2008'), fell = c('s76:fell'), third = c('s76:third')
  const math77 = c('s77:math'), keeps = c('s77:keeps'), investing77 = c('s77:investing'), selling = c('s77:selling'), panic = c('s77:panic')

  const AB = c('s73') - 6, BC = c('s74') - 6, CD = c('s76') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = fadeIn(f, CD)

  // # C) rings added from "compounding" to the end of s75; white share falls from 0.95 (early) to 0.1 (late)
  const nRings = 2 + Math.floor(8 * span(f, compounding, growth75 + 10))
  const rings = Array.from({ length: nRings }, (_, k) => lerp(0.95, 0.1, k / 9))
  const roll = (f - snowballs) * 1.8
  const drop = on(f, fell, 18), crackP = on(f, fell - 4, 12)

  return (
    <g>
      <Defs />
      {/* # A) year one */}
      {A > 0 && <g opacity={A}>
        <Backdrop sky="winter" f={f} sun={[1650, 240]} ground={G} />
        <Snow f={f} o={0.8} />
        <Ball x={900} y={G} r={150 + 8 * win(f, c('s72:dollars'), c('s72:dollars') + 14, 5)} rings={[on(f, percent72, 14) > 0.5 ? 0.95 : 1]} spin={roll} o={on(f, invests - 6, 10)} />
        <g opacity={on(f, percent72, 10)}><circle cx={900} cy={G - 150} r={160} fill="none" stroke={C.gold} strokeWidth={14 * on(f, earns72, 12)} /></g>
        <Tag x={900} y={G - 380} text="$5,000" size={50} o={on(f, five72, 8)} />
        <Tag x={1180} y={G - 270} text="+$250 GROWTH" size={42} o={on(f, two72, 8)} color={C.gold} point="none" />
        <Tag x={900} y={G + 70} text="YEAR 1 · 5% (EXAMPLE)" size={36} o={on(f, year72, 8)} point="none" />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'neutral'], [c('s71:how'), 'explain', 'smiling'], [invests, 'push', 'smiling'], [earns72, 'point', 'smiling']]} x={560} y={G} s={0.9} />
      </g>}

      {/* # B) year two: another $5,000 and growth on everything */}
      {B > 0 && <g opacity={B}>
        <Backdrop sky="winter" f={f} sun={[1650, 240]} ground={G} />
        <Snow f={f} o={0.8} />
        <Ball x={980} y={G} r={lerp(160, 220, on(f, five73, 16))} rings={on(f, growth73, 10) > 0.5 ? [0.5, 0.95] : [1, 0.95]} spin={roll} />
        <g opacity={on(f, growth73, 10)}><circle cx={980} cy={G - 220} r={232} fill="none" stroke={C.gold} strokeWidth={16 + 10 * win(f, c('s73:two#2'), c('s73:two#2') + 16, 5)} /></g>
        <Tag x={980} y={G - 500} text="+ ANOTHER $5,000" size={46} o={win(f, five73, growth73, 8)} />
        <Tag x={980} y={G - 500} text="GROWTH ON EVERYTHING" size={46} o={on(f, everything, 8)} color={C.gold} />
        <Tag x={1400} y={G - 160} text="INCLUDING LAST YEAR'S $250" size={34} o={on(f, last73, 8)} point="none" />
        <Tag x={980} y={G + 70} text="YEAR 2" size={36} o={on(f, year73, 8)} point="none" />
        <Person f={f} who="investorF" beats={[[0, 'carry', 'smiling'], [adds, 'push', 'smiling'], [everything, 'present', 'smiling']]} x={580} y={G} s={0.9} />
      </g>}

      {/* # C) compounding: rings of saved (white) and growth (gold) */}
      {Cc > 0 && <g opacity={Cc}>
        <Backdrop sky="winter" f={f} sun={[1650, 240]} ground={G} />
        <Snow f={f} o={0.8} />
        <Ball x={960} y={G} r={lerp(230, 330, span(f, compounding, growth75))} rings={rings} spin={roll} />
        <g transform={`translate(1460 ${G - 380})`} opacity={on(f, early - 4, 8)}>
          <rect x={-150} y={-100} width={300} height={200} rx={20} fill={C.cream} />
          <circle cx={-90} cy={-40} r={22} fill={C.snow} stroke="#B8C6DE" strokeWidth={4} /><text x={-50} y={-28} fill={C.ink} style={{ font: `400 36px ${FONT.big}` }}>SAVED</text>
          <circle cx={-90} cy={40} r={22} fill={C.gold} /><text x={-50} y={52} fill={C.ink} style={{ font: `400 36px ${FONT.big}` }}>GROWTH</text>
        </g>
        <Tag x={500} y={G - 520} text={f >= later ? 'LATER: MOSTLY GROWTH' : 'EARLY: MOSTLY SAVINGS'} size={40} o={on(f, early, 8)} color={f >= later ? C.gold : C.cream} point="none" />
        <Tag x={960} y={G + 70} text="GROWTH EARNING GROWTH" size={40} o={on(f, own74, 8) * (1 - on(f, early, 8))} point="none" color={C.gold} />
      </g>}

      {/* # D) 2008: the ball loses more than a third; keep investing, don't panic-sell */}
      {D > 0 && <g opacity={D}>
        <Backdrop sky={f >= y2008 ? 'storm' : 'winter'} f={f} sun={null} ground={G} />
        <Snow f={f} o={1} n={110} />
        <Ball x={1000} y={G} r={lerp(300, 240, drop)} rings={Array.from({ length: 8 }, (_, k) => lerp(0.95, 0.15, k / 7))} spin={roll * 0.3} crack={crackP} />
        <Tag x={1000} y={360} text="2008: S&P 500 FELL MORE THAN A THIRD" size={42} o={on(f, third, 8)} color={C.red} ink="#fff" point="none" />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'neutral'], [c('s76:market'), 'think', 'thinking'], [fell, 'shock', 'shocked'], [keeps, 'push', 'neutral'], [c('s77:through'), 'carryHeavy', 'neutral'], [investing77, 'confident', 'smiling'], [c('s77:instead'), 'crossNoA', 'neutral', 'crossNoB', 10]]} x={560} y={G} s={0.9} />
        <g opacity={on(f, selling - 6, 10)}>
          <Person f={f} who="buyer" beats={[[0, 'runA', 'shocked', 'runB', 8]]} x={lerp(1500, 1680, span(f, selling, panic + 30))} y={G} s={0.8} flip />
          <Cross x={lerp(1500, 1680, span(f, selling, panic + 30))} y={G - 280} r={110} p={on(f, panic, 12)} />
          <Tag x={1560} y={G - 470} text="SELLING IN A PANIC" size={36} o={on(f, selling, 8)} point="none" />
        </g>
      </g>}

      <Headline f={f} lines={[[snowballs, 'HOW GROWTH SNOWBALLS', C.ink, 104], [year73, 'YEAR 2: GROWTH ON EVERYTHING', C.ink, 96], [compounding, "THAT'S COMPOUNDING", C.goldD, 110], [straight, 'NOT A STRAIGHT LINE', C.ink, 104], [math77, 'KEEP INVESTING THROUGH IT', C.cashD, 100]]} />
      <Grain />
    </g>
  )
}

const BEATS = ["s71:how", "s72:dollars", "s73:two#2", "s75:pile", "s75:gain", "s76:market", "s77:through", "s77:instead", 's71:snowballs', 's71:one', 's71:step', 's72:year', 's72:invests', 's72:five', 's72:percent', 's72:earns', 's72:two', 's73:year', 's73:adds', 's73:five', 's73:growth', 's73:everything', 's73:last',
  's74:compounding', 's74:growth', 's74:own', 's75:early', 's75:saves', 's75:later', 's75:growth', 's76:straight', 's76:2008', 's76:fell', 's76:third', 's77:math', 's77:keeps', 's77:investing', 's77:selling', 's77:panic']
export const FR_SNOW = makePiece('fr-snow', 'Freedom compounding: a winter hill; Maya rolls a $5,000 snowball and a gold +$250 GROWTH layer wraps it (YEAR 1, 5% example); year two: + ANOTHER $5,000, then a gold ring around everything (INCLUDING LAST YEAR\'S $250); the ball grows ring by ring, white SAVED and gold GROWTH, early mostly white, later mostly gold (THAT\'S COMPOUNDING); 2008 storm: the ball cracks and shrinks (S&P 500 FELL MORE THAN A THIRD), Maya keeps pushing while a panicked runner is crossed (SELLING IN A PANIC)', {
  mood: 'light', Component: Snowball, beats: BEATS,
  sfx: [['s72:five', 'softpop', 0.15], ['s72:two', 'chime', 0.12], ['s73:everything', 'chime', 0.12], ['s74:compounding', 'riser', 0.12], ['s76:fell', 'crack', 0.2], ['s77:panic', 'swish', 0.15]] })
