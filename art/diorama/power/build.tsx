// ---------------------------------------------------------------- s65–s70: why not just build more plants?
// A) The hero scratches his head ("why doesn't someone build more"); a crane rises over an empty plot. Company builders
//    walk in holding blueprints; an official at a desk studies and stamps each one, slowly (a queue); a calendar flips
//    through the years.
// B) A field of approved plots with no plants on them (38,000 MW approved, not built): green ticks on empty plots; then
//    what holds them up lands beside them as named — a chained money bag, a stuck shipping container, a tall paper stack.
// C) The July 2026 auction: a wall of capacity blocks under the line PJM needs; only one small new block arrives (525 MW);
//    a coral gap remains in the wall (about 6,800 MW short).
// D) The race: a data center grows floor after floor while a crane builds a plant slowly beside it.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Calendar, Headline, Label, Person, Tick, win } from '../aimoney/common'
import { DataHall, PowerPlant } from './kit'
import { Crane, Ground } from './kit2'

const GROUND = 920
// # a rolled blueprint (blue paper) — held or lying
const Blueprint: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number }> = ({ x, y, s = 1, r = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-90} y={-60} width={180} height={120} rx={8} fill="#2A6FB0" />
    <rect x={-70} y={-40} width={70} height={50} fill="none" stroke="#CFE6FF" strokeWidth={4} /><path d="M10 -40 L70 -40 L70 30 M10 0 L70 0" stroke="#CFE6FF" strokeWidth={4} fill="none" />
  </g>
)

const Build: React.FC<PieceProps> = ({ f, c }) => {
  const prices = c('s65:prices'), why = c('s65:why'), build65 = c('s65:build')
  const many = c('s66:many'), want = c('s66:want'), studied = c('s66:studied'), approved66 = c('s66:approved'), connect = c('s66:connect'), takes = c('s66:takes'), years = c('s66:years')
  const s67 = c('s67'), d38000 = c('s67:38000'), approved67 = c('s67:approved'), built = c('s67:built'), money = c('s67:money'), supply = c('s67:supply'), permits = c('s67:permits')
  const said67 = c('s67:said'), july68 = c('s68:july'), plants68 = c('s68:plants'), won68 = c('s68:won'), needs69 = c('s69:needs'), auction69 = c('s69:auction'), auction68 = c('s68:auction'), only = c('s68:only'), d525 = c('s68:525'), won = c('s68:won')
  const came = c('s69:came'), d6800 = c('s69:6800'), short = c('s69:short'), safe = c('s69:safe')
  const s70 = c('s70'), demand = c('s70:demand'), faster = c('s70:faster'), built70 = c('s70:built')
  const AB = s67 - 4, BC = auction68 - 6, CD = s70 - 4
  const A = win(f, prices, AB), B = win(f, AB, BC), C = win(f, BC, CD), D = on(f, CD, 8)
  return (
    <g>
      <Stage id="pw-build" frame={f} />
      <Headline f={f} lines={[[takes, '', P.ink], [years, 'IT TAKES YEARS', P.ink, 104], [s67, '', P.ink], [d38000, '≈ 38,000 MW APPROVED', P.ink, 96], [built, '≈ 38,000 MW APPROVED · NOT BUILT', P.coralInk, 92], [auction68, '', P.ink], [d525, 'ONLY 525 MW NEW', P.ink, 104], [d6800, '≈ 6,800 MW', P.coralInk, 110], [short, '≈ 6,800 MW SHORT', P.coralInk, 110], [s70, '', P.ink]]} />

      {/* # A) why not build more? — the queue of blueprints at the approval desk, years on the calendar */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <Person f={f} who="hero" beats={[[0, 'idle', 'neutral'], [why, 'scratchHead', 'thinking'], [build65, 'point', 'neutral'], [many, 'idle', 'neutral'], [takes, 'facepalm', 'worried']]} x={230} y={GROUND} s={0.66} o={on(f, prices, 10)} />
        <g opacity={on(f, build65, 10)}><Crane x={470} y={GROUND} s={0.8} swing={Math.sin(f / 40) * 0.5} /></g>
        {/* # builders with blueprints queue to the desk */}
        {[0, 1, 2].map((k) => {
          const at = many + k * 5, x = lerp(1950, 1160 + k * 200, on(f, at, 30)), who = ['investor', 'owner', 'investorF'][k]
          return <g key={k} opacity={on(f, at, 8)}>
            <Person f={f} who={who} beats={[[0, 'walkA', 'neutral', 'walkB', 12], [at + 30, 'holdUp', 'smiling'], [takes, 'despair', 'worried']]} x={x} y={GROUND} s={0.55} />
            <Blueprint x={x + 40} y={GROUND - 430} s={0.6} r={-8} o={on(f, want, 8)} />
          </g>
        })}
        {/* # the approval desk: an official studies and stamps */}
        <g opacity={on(f, studied, 10)}>
          <Person f={f} who="worker" beats={[[0, 'read', 'thinking'], [approved66, 'nodA', 'neutral', 'nodB', 14], [connect, 'read', 'thinking']]} x={860} y={GROUND} s={0.55} />
          <rect x={760} y={GROUND - 200} width={260} height={26} rx={8} fill="#8E6232" /><rect x={780} y={GROUND - 176} width={20} height={176} fill="#6E4A26" /><rect x={980} y={GROUND - 176} width={20} height={176} fill="#6E4A26" />
          <Blueprint x={890} y={GROUND - 230} s={0.5} />
          <Tick x={1010} y={GROUND - 280} o={on(f, approved66, 8)} r={34} />
        </g>
        <g opacity={on(f, takes, 8)}><Calendar x={1700} y={280} text="" s={1.5} flip={((f - takes) % 6) / 6} /></g>
      </g>}

      {/* # B) approved but not built: empty plots with ticks; what holds them up */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        {[0, 1, 2, 3, 4, 5].map((k) => {
          const x = 220 + k * 300, at = s67 + k * 4
          return <g key={k} opacity={on(f, at, 8)}>
            <rect x={x - 120} y={GROUND - 8} width={240} height={30} rx={8} fill="#BFAE8E" />
            {/* # the plant it should be: a dashed outline */}
            <g opacity={0.5}><path d={`M${x - 100} ${GROUND - 10} L${x - 90} ${GROUND - 220} L${x - 10} ${GROUND - 220} L${x} ${GROUND - 10} M${x + 20} ${GROUND - 10} L${x + 20} ${GROUND - 130} L${x + 110} ${GROUND - 130} L${x + 110} ${GROUND - 10}`} fill="none" stroke={P.ink2} strokeWidth={5} strokeDasharray="14 10" /></g>
            <Tick x={x} y={GROUND - 290} o={on(f, approved67 + k * 2, 8)} r={34} />
          </g>
        })}
        {/* # what holds them up: money (a chained bag), supply chains (a stuck container), permits (a paper stack) */}
        <g opacity={on(f, money, 8)} transform={`translate(520 ${GROUND + 110}) scale(${0.8 * pop(f, money)})`}>
          <path d="M-70 0 Q-80 -110 0 -120 Q80 -110 70 0 Q60 40 0 40 Q-60 40 -70 0 Z" fill="#B9864C" /><text y={14} textAnchor="middle" fill="#5A3A22" style={{ font: '800 54px Inter' }}>$</text>
          {[-60, -30, 0, 30, 60].map((dx, k) => <ellipse key={k} cx={dx} cy={-40 + Math.abs(dx) * 0.3} rx={16} ry={10} fill="none" stroke="#5C6A80" strokeWidth={6} />)}
        </g>
        <g opacity={on(f, supply, 8)} transform={`translate(1120 ${GROUND + 150}) scale(${0.75 * pop(f, supply)})`}>
          <rect x={-170} y={-150} width={340} height={150} rx={6} fill="#D9483A" />
          {Array.from({ length: 9 }, (_, k) => <rect key={k} x={-160 + k * 36} y={-140} width={14} height={130} fill="#B23A2F" />)}
          <rect x={-170} y={-150} width={340} height={14} fill="#B23A2F" />
        </g>
        <g opacity={on(f, permits, 8)} transform={`translate(1700 ${GROUND + 150}) scale(${0.7 * pop(f, permits)})`}>
          {Array.from({ length: 12 }, (_, k) => <rect key={k} x={-100 + (k % 2) * 6} y={-24 - k * 22} width={200} height={20} rx={4} fill={k % 2 ? '#FFFFFF' : '#F2EADB'} stroke="#CDB58C" strokeWidth={2} />)}
        </g>
      </g>}

      {/* # C) the July 2026 auction: the wall of capacity under the line PJM needs; one small new block; the gap */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={on(f, july68, 8)}><Calendar x={1760} y={250} s={1.1} text={f < july68 + 12 ? 'JULY' : 'JULY 2026'} /></g>
        <g opacity={on(f, auction68, 10)}>
          {/* # the line PJM needs */}
          <line x1={240} y1={380} x2={1680} y2={380} stroke={P.goldD} strokeWidth={8 + 8 * on(f, needs69, 8) * (1 - on(f, needs69 + 20, 10))} strokeDasharray="20 12" />
          <rect x={240} y={380} width={1440} height={GROUND - 380} rx={8} fill="#FFFFFF" opacity={0.25 * on(f, auction69, 6) * (1 - on(f, auction69 + 12, 8))} />
          {/* # the wall: 12 columns of blocks; the last two columns stop short (the gap) */}
          {Array.from({ length: 12 }, (_, col) => {
            const short = col >= 10, h = short ? 300 : 540
            return <g key={col}>
              {Array.from({ length: Math.round(h / 60) }, (_, r) => <rect key={r} x={250 + col * 118} y={GROUND - 60 - r * 60} width={110} height={54} rx={8} fill={['#C9CFD8', '#B9C2CE', '#D2D8E0'][(col + r) % 3]} opacity={on(f, auction68 + col * 2, 8)} />)}
            </g>
          })}
          {/* # the one small new block (525 MW) drops in */}
          <g opacity={on(f, d525, 6)} transform={`translate(${250 + 10 * 118} ${lerp(200, GROUND - 60 - 5 * 60, on(f, d525, 14))})`}>
            <rect x={0} y={0} width={110} height={54} rx={8} fill={P.mint} /><PowerPlant x={55} y={4} s={0.12} ready={on(f, plants68, 8)} f={f} /><rect x={-8} y={-8} width={126} height={70} rx={12} fill="none" stroke={P.gold} strokeWidth={6} opacity={on(f, won68, 8) * (1 - on(f, auction69, 8))} />
          </g>
          {/* # the gap that stays: coral dashed */}
          <g opacity={on(f, d6800, 10)}>
            <rect x={250 + 10 * 118} y={380} width={232} height={GROUND - 60 - 5 * 60 - 380 + (f >= d525 ? 0 : 54)} rx={10} fill={P.coral} opacity={0.25 + 0.15 * Math.sin(f / 5)} stroke={P.coral} strokeWidth={6} strokeDasharray="14 10" />
          </g>
          <g opacity={on(f, safe, 8)}><Label x={960} y={330} text="SAFE" size={60} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
      </g>}

      {/* # D) the race: the data center rises floor by floor faster than the crane builds a plant */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        {(() => {
          const t = span(f, demand, built70 + 20), floors = Math.round(1 + 5 * t)
          return <g>
            {Array.from({ length: floors }, (_, k) => <g key={k} transform={`translate(560 ${GROUND - k * 120})`}><DataHall x={0} y={0} s={0.42} f={f} lit={1} ai={k === floors - 1 ? 1 : 0} /></g>)}
          </g>
        })()}
        <Crane x={1300} y={GROUND} s={0.85} swing={Math.sin(f / 30)} idle={0.5 + 0.5 * Math.sin(f / 20)} />
        <g opacity={on(f, built70, 8) + 0.6}><PowerPlant x={1450} y={GROUND} s={lerp(0.25, 0.4, span(f, s70, built70 + 20))} ready={0.2} f={f} /></g>
        <g opacity={on(f, demand, 8)}><Label x={560} y={GROUND + 80} text="DEMAND" size={60} font="Bebas Neue" color={P.coralInk} /></g>
        <g opacity={on(f, built70, 8)}><Label x={1380} y={GROUND + 80} text="NEW PLANTS" size={60} font="Bebas Neue" color={P.ink} /></g>
      </g>}
      <Vignette id="pw-build" />
    </g>
  )
}

const BEATS = ['s65:prices', 's65:why', 's65:build', 's66:many', 's66:want', 's66:studied', 's66:approved', 's66:connect', 's66:takes', 's66:years', 's67', 's67:38000', 's67:approved', 's67:built', 's67:money', 's67:supply', 's67:permits', 's68:auction', 's68:only', 's68:525', 's69:6800', 's69:short', 's69:safe', 's70', 's70:demand', 's70:faster', 's70:built', 's68:plants', 's68:won', 's69:auction', 's69:needs', 's67:said', 's68:july']
export const PW_BUILD = makePiece('pw-build', 'Power long: why not build more — the approval queue and years on the calendar; 38,000 MW approved but not built (money, supply chains, permits); only 525 MW new and a 6,800 MW gap in the wall; demand races ahead of new plants', {
  mood: 'light', Component: Build, beats: BEATS,
  sfx: [['s65:why', 'pop', 0.25], ['s66:approved', 'thud', 0.3], ['s66:years', 'flutter', 0.3], ['s67:38000', 'tick', 0.25], ['s67:money', 'click', 0.3], ['s67:supply', 'thud', 0.3], ['s67:permits', 'flutter', 0.3], ['s68:525', 'pop', 0.3], ['s69:short', 'glitch', 0.25], ['s70:faster', 'riser', 0.3]] })
