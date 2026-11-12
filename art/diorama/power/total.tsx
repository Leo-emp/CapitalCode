// ---------------------------------------------------------------- s71–s81: adding up the bill.
// A) Baltimore: a family at their row house opens the bill; a coin pile grows beside them (+$250 a year). "All the reasons
//    together, not only data centers": the pile shows three layers — a closing plant, a forecast arrow, a data center.
// B) The cap: a price arrow pushes upward until a steel ceiling slams down above it. PJM, the governors and federal
//    regulators shake hands (agreed). Three auction columns rise and bump the ceiling at 329, 333, 325 as each is said;
//    without the cap a dashed ghost column shoots through it to 555.
// C) Four years of promises: four coin piles slide together into one gold block (≈ $63.6 billion); the market monitor
//    splits off the data-center part (≈ $29.4 billion), which slides to a data center; 46%, close to half.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Bill as Envelope, Calendar, Headline, hand, Label, Person, win } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { DataHall, Home, PowerPlant } from './kit'
import { Ceiling, ControlHouse, Ground } from './kit2'

const GROUND = 920
const CEIL = 330 // # the ceiling's y
const priceY = (v: number) => GROUND - (v / 560) * (GROUND - 220) // # price → height (555 reaches the top area)

const Total: React.FC<PieceProps> = ({ f, c }) => {
  const baltimore = c('s71:baltimore'), estimated = c('s71:estimated'), jump = c('s71:jump'), d250 = c('s71:250'), year71 = c('s71:year'), bill71 = c('s71:bill')
  const reasons = c('s72:reasons'), together = c('s72:together'), only = c('s72:only'), data72 = c('s72:data')
  const s73 = c('s73'), climbing = c('s73:climbing'), ceiling = c('s73:ceiling'), set = c('s73:set')
  const pjm74 = c('s74'), governors = c('s74:governors'), d13 = c('s74:13'), federal = c('s74:federal'), agreed = c('s74:agreed'), cap74 = c('s74:cap'), four = c('s74:four')
  const three75 = c('s75:three'), hit = c('s75:hit'), cap75 = c('s75:cap'), d329 = c('s75:329'), d333 = c('s75:333'), d325 = c('s75:325')
  const without = c('s76:without'), estimated76 = c('s76:estimated'), d555 = c('s76:555')
  const y2025b = c('s77:2025'), may77 = c('s77:may'), typical = c('s71:typical'), estimated76b = c('s76:estimated'), total78b = c('s78:total'), charges78 = c('s78:charges'), june77 = c('s77:june'), s78 = c('s78'), s77 = c('s77'), four77 = c('s77:four'), promises77 = c('s77:promises')
  const monitor78 = c('s78:monitor'), total78 = c('s78:total'), d636 = c('s78:636')
  const worked = c('s79:worked'), driven = c('s79:driven'), data79 = c('s79:data')
  const answer = c('s80:answer'), d294 = c('s80:294')
  const d46 = c('s81:46'), half = c('s81:half')
  const AB = s73 - 4, BC = s77 - 4
  const A = win(f, baltimore, AB), B = win(f, AB, BC), C = on(f, BC, 8)
  const bars: [number, number][] = [[d329, 329], [d333, 333], [d325, 325]]
  return (
    <g>
      <Stage id="pw-total" frame={f} />
      <Headline f={f} lines={[[baltimore, 'BALTIMORE', P.ink, 104], [d250, '≈ +$250', P.coralInk, 116], [year71, '≈ +$250 A YEAR', P.coralInk, 110], [reasons, '', P.ink], [ceiling, 'A CEILING', P.ink, 104], [cap74, 'A PRICE CAP', P.ink, 104], [three75, '', P.ink], [s77, '', P.ink], [d636, '≈ $63.6 BILLION', P.goldInk, 112], [driven, '', P.ink], [d294, '≈ $29.4 BILLION', P.skyInk, 112], [d46, '46%', P.skyInk, 120], [half, '46% · CLOSE TO HALF', P.skyInk, 110]]} />

      {/* # A) Baltimore: the family's bill and its +$250 a year */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={on(f, baltimore, 10)}>
          {[0, 1, 2].map((k) => <Home key={k} x={230 + k * 230} y={GROUND} s={0.95 * (k === 1 ? 1 + 0.08 * on(f, typical, 8) : 1)} lit={1} color={['#E8B48A', '#D9A07A', '#E0C09A'][k]} />)}
        </g>
        {(() => {
          const wb: [number, 'idle' | 'read' | 'shock' | 'despair' | 'think', 'neutral' | 'worried' | 'shocked' | 'thinking'][] = [[0, 'idle', 'neutral'], [estimated, 'read', 'thinking'], [d250, 'shock', 'shocked'], [reasons, 'think', 'thinking']]
          return <g opacity={on(f, estimated, 10)}>
            <Person f={f} who="investorF" beats={wb} x={860} y={GROUND} s={0.62} />
            <Person f={f} who="buyer" beats={[[0, 'idle', 'neutral'], [jump, 'point', 'neutral'], [d250, 'despair', 'worried'], [reasons, 'think', 'thinking']]} x={1040} y={GROUND} s={0.62} />
            {(() => { const hp = hand(f, wb as never, 860, GROUND, 0.62); return <g opacity={on(f, estimated, 8)}><Envelope x={hp.x + 20} y={hp.y - 10} s={0.42} r={-6} /></g> })()}
          </g>
        })()}
        {/* # the +$250 a year pile; then its three layers */}
        <g opacity={on(f, jump, 10)}>
          {Array.from({ length: Math.round(10 * on(f, d250, 20)) }, (_, k) => {
            const layer = k < 4 ? 0 : k < 7 ? 1 : 2, col = f >= together ? [P.gold, P.coral, P.sky][layer] : P.gold
            return <g key={k}><ellipse cx={1420} cy={GROUND - 20 - k * 30} rx={110} ry={22} fill={f >= together ? ['#B88A2E', '#C94A3E', '#2A8FD0'][layer] : P.goldD} /><ellipse cx={1420} cy={GROUND - 28 - k * 30} rx={110} ry={22} fill={col} /></g>
          })}
          <g opacity={on(f, year71, 8)}><Calendar x={1660} y={GROUND - 300} text="1 YEAR" s={0.9} /></g>
          {/* # the layers' little pictures: a closing plant, a forecast arrow, a data center */}
          <g opacity={on(f, together + 4, 8)}>
            <g transform={`translate(1600 ${GROUND - 70})`}><PowerPlant x={0} y={0} s={0.16} ready={0.2} f={f} /></g>
            <path d={`M1560 ${GROUND - 140} L1600 ${GROUND - 180} L1630 ${GROUND - 165} L1670 ${GROUND - 215}`} fill="none" stroke={P.coral} strokeWidth={8} strokeLinecap="round" />
          </g>
          <g opacity={on(f, data72, 8)} transform={`translate(1640 ${GROUND - 260})`}><DataHall x={0} y={0} s={0.16} f={f} lit={1} ai={1} /></g>
        </g>
      </g>}

      {/* # B) the price cap */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        {/* # the rising price arrow pushes up, then a ceiling slams down */}
        <g opacity={on(f, s73, 8) * (1 - on(f, pjm74, 10))}>
          <rect x={900} y={lerp(GROUND - 100, CEIL + 22, on(f, climbing, 24))} width={120} height={GROUND - lerp(GROUND - 100, CEIL + 22, on(f, climbing, 24))} rx={14} fill={P.coral} />
          <path d={`M880 ${lerp(GROUND - 100, CEIL + 22, on(f, climbing, 24))} L960 ${lerp(GROUND - 180, CEIL - 58, on(f, climbing, 24))} L1040 ${lerp(GROUND - 100, CEIL + 22, on(f, climbing, 24))} Z`} fill={P.coral} />
        </g>
        <g opacity={on(f, ceiling, 6)} transform={`translate(0 ${lerp(-300, 0, on(f, ceiling, 10))})`}><Ceiling y={CEIL} bump={span(f, set, set + 20)} /></g>
        {/* # who agreed: PJM, the 13 governors, federal regulators — then handshakes */}
        <g opacity={on(f, pjm74, 10) * (1 - on(f, three75, 10))}>
          <ControlHouse x={330} y={GROUND} s={0.6} f={f} />
          {Array.from({ length: 13 }, (_, k) => <g key={k} opacity={on(f, governors + k, 6)}><Mini look={['owner', 'investor', 'investorF', 'buyer', 'hero'][k % 5]} x={640 + k * 66} y={GROUND} scale={0.95 * pop(f, governors + k)} frame={f} seed={k + 60} mood={f >= agreed ? 'happy' : 'neutral'} /></g>)}
          {[0, 1].map((k) => <g key={k} opacity={on(f, federal + k * 4, 8)}><Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [agreed, 'handshake', 'smiling']]} x={1560 + k * 160} y={GROUND} s={0.5} /></g>)}
        </g>
        {/* # the three auctions bump the cap; the ghost without a cap shoots through to 555 */}
        <g opacity={on(f, three75, 10)}>
          {bars.map(([at, v], k) => {
            const x = 560 + k * 300, top = Math.max(CEIL + 22, priceY(v)), h = (GROUND - top) * on(f, at, 16)
            return <g key={k}>
              <rect x={x - 90} y={GROUND - h} width={180} height={h} rx={12} fill={P.gold} />
              <g opacity={on(f, at + 8, 8)}><Label x={x} y={GROUND - h + 80} text={`$${v}`} size={64} font="Bebas Neue" color={P.navy0} /></g>
            </g>
          })}
          <g opacity={on(f, without, 10)}>
            {(() => { const x = 1460, top = priceY(555), h = (GROUND - top) * (0.4 * on(f, estimated76b, 14) + 0.6 * on(f, d555 - 6, 16)); return <g>
              <rect x={x - 90} y={GROUND - h} width={180} height={h} rx={12} fill="none" stroke={P.coral} strokeWidth={6} strokeDasharray="16 10" />
              <g opacity={on(f, d555, 8)}><Label x={x} y={GROUND - h - 30} text="$555" size={72} font="Bebas Neue" color={P.coralInk} /></g>
            </g> })()}
          </g>
          <g opacity={on(f, cap75, 8)}><Label x={1700} y={CEIL + 14} text="CAP" size={56} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}

      {/* # C) four years of promises → one block; the data-center part splits off */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        {/* # four yearly piles slide into one block */}
        {[0, 1, 2, 3].map((k) => {
          const t = on(f, monitor78, 24), x = lerp(360 + k * 300, 780, t), o = on(f, four77 + k * 4, 8) * (1 - on(f, monitor78 + 20, 8))
          return <g key={k} opacity={o}>{Array.from({ length: 6 }, (_, j) => <g key={j}><ellipse cx={x} cy={GROUND - 20 - j * 28} rx={100} ry={20} fill={P.goldD} /><ellipse cx={x} cy={GROUND - 27 - j * 28} rx={100} ry={20} fill={P.gold} /></g>)}</g>
        })}
        <g opacity={on(f, june77, 8) * (1 - on(f, s78 + 6, 8))}>
          <line x1={300} y1={GROUND + 80} x2={1620} y2={GROUND + 80} stroke={P.ink2} strokeWidth={6} />
          <path d="M1600 1000 L1630 1000 L1615 1000" stroke={P.ink2} strokeWidth={6} />
          <Label x={360} y={GROUND + 140} text={f < y2025b ? 'JUNE' : 'JUNE 2025'} size={52} font="Bebas Neue" color={P.ink} />
          <g opacity={on(f, may77, 8)}><Label x={1560} y={GROUND + 140} text="MAY 2029" size={52} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {/* # the block: 63.6 wide; the data-center part (46%) slides right */}
        {(() => {
          const show = Math.max(on(f, total78b, 12), on(f, monitor78 + 14, 12)) * (0.92 + 0.08 * on(f, charges78, 8)), split = on(f, driven, 20), W0 = 900, H0 = 420, x0 = 330, y0 = GROUND - H0
          const dcW = W0 * 0.462, restW = W0 - dcW
          return <g opacity={show}>
            <rect x={x0} y={y0} width={restW} height={H0} rx={18} fill={P.gold} />
            <rect x={x0 + restW + 160 * split} y={y0} width={dcW} height={H0} rx={18} fill={f >= data79 ? P.sky : P.gold} />
            {Array.from({ length: 8 }, (_, k) => <rect key={k} x={x0 + 10} y={y0 + 20 + k * 50} width={W0 - 20 + 160 * split} height={6} rx={3} fill="#FFFFFF" opacity={0.18} />)}
            {/* # close to half: a dashed halfway mark */}
            <g opacity={on(f, half, 8)}><line x1={x0 + W0 / 2 + 160 * split} y1={y0 - 40} x2={x0 + W0 / 2 + 160 * split} y2={GROUND + 20} stroke={P.navy2} strokeWidth={6} strokeDasharray="14 10" /></g>
            <g opacity={on(f, data79, 10)} transform={`translate(${x0 + restW + 160 * split + dcW / 2} ${y0 - 20})`}><DataHall x={0} y={0} s={0.42} f={f} lit={1} ai={1} /></g>
          </g>
        })()}
        <g opacity={on(f, worked, 10)}><Person f={f} who="investorF" beats={[[0, 'idle', 'neutral'], [worked, 'measure', 'thinking'], [answer, 'point', 'neutral'], [half, 'present', 'smiling']]} x={1720} y={GROUND} s={0.62} /></g>
      </g>}
      <Vignette id="pw-total" />
    </g>
  )
}

const BEATS = ['s71:baltimore', 's71:estimated', 's71:jump', 's71:250', 's71:year', 's72:reasons', 's72:together', 's72:data', 's73', 's73:climbing', 's73:ceiling', 's73:set', 's74', 's74:governors', 's74:federal', 's74:agreed', 's74:cap', 's75:three', 's75:hit', 's75:cap', 's75:329', 's75:333', 's75:325', 's76:without', 's76:555', 's77', 's77:four', 's77:promises', 's78:monitor', 's78:636', 's79:worked', 's79:driven', 's79:data', 's80:answer', 's80:294', 's81:46', 's81:half', 's77:june', 's78', 's71:typical', 's76:estimated', 's78:total', 's78:charges', 's77:2025', 's77:may']
export const PW_TOTAL = makePiece('pw-total', 'Power long: Baltimore +$250 a year (all reasons); the price cap — the ceiling, who agreed, three auctions bump it at 329/333/325, 555 without it; four years of promises = $63.6bn, the data-center part $29.4bn, 46%, close to half', {
  mood: 'light', Component: Total, beats: BEATS,
  sfx: [['s71:250', 'coin', 0.35], ['s72:together', 'pop', 0.25], ['s73:ceiling', 'impact', 0.35], ['s74:agreed', 'chime', 0.3], ['s75:329', 'thud', 0.3], ['s75:333', 'thud', 0.3], ['s75:325', 'thud', 0.3], ['s76:555', 'riser', 0.3], ['s78:636', 'cash', 0.35], ['s79:driven', 'swish', 0.3], ['s81:half', 'ding', 0.3]] })
