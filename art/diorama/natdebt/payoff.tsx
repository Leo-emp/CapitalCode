// ---------------------------------------------------------------- s78–s86: the whole machine, and the better question.
// A) Four step panels light one by one: 1 money in < money out (two little bars, a 2T gap); 2 IOUs (bill, note, bond);
//    3 who holds them (a small ring: at home, government's own funds, Fed, abroad $9.3T); 4 new IOUs pay old ones (a loop)
//    with interest coins. Then gears turn: a machine that never stops.
// B) A newspaper: DEBT HITS NEW RECORD. The presenter points up at a better question: WHAT DOES IT COST TO CARRY? →
//    $1 TRILLION+ A YEAR; the pile and the rate dial grow, and so does the bill coin.
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, Coin, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Backdrop, RateDial } from '../econ/kit'
import { Blocks, IOU, TXT, INK, RED, GREEN, BLUE, GOLD } from './kit'

const GROUND = 930

const Panel: React.FC<{ x: number; n: number; t: string; o: number; lit: number; children: React.ReactNode }> = ({ x, n, t, o, lit, children }) => (
  <g opacity={o} transform={`translate(${x} 600) scale(${1 + 0.06 * lit})`}>
    {lit > 0 && <rect x={-200} y={-250} width={400} height={470} rx={30} fill={P.gold} opacity={0.28 * lit} />}
    <rect x={-180} y={-230} width={360} height={430} rx={24} fill="#FFFFFF" stroke="#E2D3B4" strokeWidth={6} />
    <circle cx={0} cy={-230} r={44} fill={INK} /><text y={-212} textAnchor="middle" fill="#FFFFFF" style={TXT(54)}>{n}</text>
    <g transform="translate(0 -20)">{children}</g>
    <text y={170} textAnchor="middle" fill={INK} style={TXT(40)}>{t}</text>
  </g>
)

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const national = c('s78:national'), four = c('s78:four')
  const one = c('s79:one'), d2 = c('s79:2')
  const two = c('s80:two'), ious = c('s80:ious'), bills = c('s80:bills'), notes = c('s80:notes'), bonds = c('s80:bonds')
  const three = c('s81:three'), d93 = c('s81:93')
  const four82 = c('s82:four'), interest82 = c('s82:interest')
  const bill83 = c('s83:bill'), machine = c('s83:machine'), running = c('s83:running')
  const next = c('s84:next'), record = c('s84:record'), question = c('s84:question'), big = c('s84:big')
  const ask = c('s85:ask'), trillion = c('s85:trillion')
  const bigger = c('s86:bigger'), pile = c('s86:pile'), rates = c('s86:rates'), bill86 = c('s86:bill')

  const A = win(f, 0, next - 4), B = on(f, next - 4, 10)
  const lit = (a: number, b: number) => win(f, a, b, 8)
  const hero: Beat[] = [[next - 4, 'idle', 'neutral'], [record, 'read', 'thinking'], [question, 'pointUp', 'thinking'], [ask, 'explain', 'neutral'], [bigger, 'present', 'neutral']]
  const pileN = Math.round(lerp(30, 44, on(f, pile, 30)))
  return (
    <g>
      <Stage id="nd-payoff" frame={f} />
      <Backdrop f={f} town={false} />
      <Headline f={f} lines={[[national, 'THE NATIONAL DEBT IN 4 STEPS', P.ink, 96], [machine, 'A MACHINE THAT NEVER STOPS', P.ink, 96], [next, 'THE BETTER QUESTION', P.goldInk, 100]]} />
      <Ground y={GROUND} />

      {/* # A) four steps */}
      {A > 0 && <g opacity={A}>
        <g opacity={1 - on(f, machine - 6, 10)}>
          <Panel x={300} n={1} t="SPEND MORE THAN IT COLLECTS" o={on(f, Math.min(one, four), 8)} lit={lit(one, two)}>
            <rect x={-120} y={-20} width={90} height={100} fill={GREEN} /><rect x={30} y={-90} width={90} height={170} fill={RED} />
            <rect x={-120} y={-90} width={90} height={70} fill="none" stroke={RED} strokeWidth={4} strokeDasharray="8 6" opacity={on(f, d2, 8)} />
            <g opacity={on(f, d2, 8)}><text x={-75} y={-35} textAnchor="middle" fill={RED} style={TXT(34)}>-$2T</text></g>
          </Panel>
          <Panel x={740} n={2} t="SELL IOUs" o={on(f, Math.min(two, four + 6), 8)} lit={Math.max(lit(two, three), win(f, c("s80:covers"), ious, 4))}>
            {([[bills, 'BILL', GREEN], [notes, 'NOTE', BLUE], [bonds, 'BOND', RED]] as [number, string, string][]).map(([at, t, col], k) => <g key={k} opacity={0.35 + 0.65 * on(f, Math.min(at, ious + k * 4), 8)}><IOU x={0} y={-60 + k * 60} s={0.4} t={t} col={col} r={-6 + k * 6} /></g>)}
          </Panel>
          <Panel x={1180} n={3} t="HELD MOSTLY AT HOME" o={on(f, Math.min(three, four + 12), 8)} lit={lit(three, four82)}>
            {(() => { const parts: [number, string][] = [[18.85, GREEN], [7.79, GOLD], [4.58, '#2F3E66'], [9.33, '#7FA8D8']]; let a0 = -Math.PI / 2; const tot = parts.reduce((s, p) => s + p[0], 0); return parts.map(([v, col], k) => { const a1 = a0 + (v / tot) * Math.PI * 2; const d = `M0 0 L${100 * Math.cos(a0)} ${100 * Math.sin(a0)} A100 100 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${100 * Math.cos(a1)} ${100 * Math.sin(a1)} Z`; a0 = a1; return <path key={k} d={d} fill={col} stroke="#FFFFFF" strokeWidth={4} /> }) })()}
            <g opacity={on(f, d93, 8)}><text y={140} textAnchor="middle" fill={P.ink2} style={TXT(30)}>$9.3T ABROAD</text></g>
          </Panel>
          <Panel x={1620} n={4} t="NEW IOUs REPAY OLD ONES" o={on(f, Math.min(four82, four + 18), 8)} lit={lit(four82, machine)}>
            <circle r={90} fill="none" stroke={BLUE} strokeWidth={14} strokeDasharray="60 20" transform={`rotate(${(f - four82) * 3})`} />
            <g opacity={on(f, interest82, 8)}><Coin x={0} y={0} s={1.2} text="%" /></g>
          </Panel>
        </g>
        <g opacity={on(f, machine - 6, 10)}>
          {[[-150, 0, 120, 1], [60, 60, 90, -1], [200, -40, 70, 1]].map(([dx, dy, r, d], k) => <g key={k} transform={`translate(${960 + dx} ${620 + dy}) rotate(${d * (f - machine) * 2})`}>
            {Array.from({ length: 12 }, (_, j) => <rect key={j} x={-r * 0.14} y={-r - 16} width={r * 0.28} height={32} rx={6} fill="#B88A2E" transform={`rotate(${j * 30})`} />)}
            <circle r={r} fill={GOLD} stroke="#B88A2E" strokeWidth={8} /><circle r={r * 0.3} fill="#B88A2E" />
          </g>)}
          <g opacity={on(f, running, 8)}><Label x={960} y={GROUND + 60} text="NEVER STOPS RUNNING" size={56} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, bill83, 8) * (1 - on(f, machine, 8))}><Label x={960} y={400} text="NOT ONE BILL TO PAY OFF" size={60} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}

      {/* # B) the better question */}
      {B > 0 && <g opacity={B}>
        <Person f={f} who="hero" beats={hero} x={330} y={GROUND} s={1.05} />
        <g opacity={1 - on(f, ask - 4, 10)}>
          <g opacity={on(f, record - 6, 8)} transform={`translate(1100 ${560 - 14 * pop(f, record - 6, 12)}) rotate(-3)`}>
            <rect x={-330} y={-220} width={660} height={440} rx={10} fill="#FFFDF5" stroke="#CDB58C" strokeWidth={3} />
            <rect x={-300} y={-190} width={600} height={60} rx={4} fill={INK} /><text y={-146} textAnchor="middle" fill="#FFFFFF" style={TXT(46)}>THE DAILY NEWS</text>
            <text y={-50} textAnchor="middle" fill={INK} style={TXT(76)}>DEBT HITS</text><text y={30} textAnchor="middle" fill={RED} style={TXT(76)}>NEW RECORD</text>
            {[0, 1, 2].map((k) => <rect key={k} x={-280} y={90 + k * 36} width={560} height={14} rx={7} fill="#C9B79A" />)}
          </g>
          <g opacity={on(f, big, 8)}><Label x={1100} y={GROUND + 50} text="HOW BIG? NOT THE BEST QUESTION" size={44} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={on(f, ask - 4, 10)}>
          <g transform={`translate(1150 ${420 - 10 * pop(f, ask, 12)}) scale(${1 + 0.06 * win(f, c("s85:carry"), trillion, 5)})`}><rect x={-420} y={-70} width={840} height={130} rx={24} fill={P.gold} /><text y={22} textAnchor="middle" fill={INK} style={TXT(66)}>WHAT DOES IT COST TO CARRY?</text></g>
          <g opacity={on(f, trillion, 8)} transform={`translate(1380 600) scale(${pop(f, trillion, 12)})`}><rect x={-300} y={-60} width={600} height={110} rx={18} fill={RED} /><text y={20} textAnchor="middle" fill="#FFFFFF" style={TXT(70)}>$1 TRILLION+ IN 2026</text></g>
          <g opacity={on(f, pile, 8)}><Blocks x={860} y={GROUND} n={pileN} w={200} h={8} col="#E5A99E" /></g>
          <g opacity={on(f, rates, 8)}><RateDial x={1480} y={820} s={0.5} v={lerp(0.6, 0.85, on(f, rates, 30))} /></g>
          <g opacity={on(f, bill86, 8)}><Coin x={1180} y={800} s={lerp(1.6, 2.6, on(f, bill86, 30))} text="%" /></g>
        </g>
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s78:works")} x={960} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s79:the")} x={960} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s79:than")} x={960} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s79:2026")} x={960} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s81:those")} x={960} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s81:americans")} x={960} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s81:government's")} x={960} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s81:trillion")} x={960} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s82:when")} x={960} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s82:new")} x={960} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s82:off")} x={960} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s82:up")} x={960} y={600} rx={230} ry={230} />
        <Spot f={f} at={c("s83:the")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s83:paid")} x={960} y={620} rx={230} ry={200} />
        <Spot f={f} at={c("s84:the#2")} x={1100} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s85:2026")} x={1100} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s85:that")} x={1100} y={560} rx={230} ry={200} />
      </g>
      {/* # spots:end */}
      <Vignette id="nd-payoff" />
    </g>
  )
}

export const ND_PAYOFF = makePiece('nd-payoff', 'Payoff: four white step panels light one by one — 1 money in less than money out with a -$2T gap, 2 a bill, a note and a bond IOU, 3 a small ring of who holds the debt (mostly at home, $9.3T abroad), 4 a turning loop where new IOUs repay old ones with an interest coin — then gold gears turn: a machine that never stops running; a newspaper DEBT HITS NEW RECORD next to the presenter, who points up at a better question — WHAT DOES IT COST TO CARRY? — $1 TRILLION+ IN 2026, while the debt pile, a rate dial and an interest coin grow.', {
  mood: 'light', Component: Payoff,
  beats: ["s78:national", "s78:four", "s79:one", "s79:2", "s80:two", "s80:ious", "s80:bills", "s80:notes", "s80:bonds", "s81:three", "s81:93", "s82:four", "s82:interest", "s83:bill", "s83:machine", "s83:running", "s84:next", "s84:record", "s84:question", "s84:big", "s85:ask", "s85:trillion", "s86:bigger", "s86:pile", "s86:rates", "s86:bill", "s80:covers", "s85:carry", "s78:works", "s79:the", "s79:than", "s79:2026", "s81:those", "s81:americans", "s81:government's", "s81:trillion", "s82:when", "s82:new", "s82:off", "s82:up", "s83:the", "s83:paid", "s84:the#2", "s85:2026", "s85:that"],
  sfx: [['s79:one', 'pop', 0.1], ['s80:two', 'pop', 0.1], ['s81:three', 'pop', 0.1], ['s82:four', 'pop', 0.1], ['s84:record', 'flutter', 0.1], ['s85:trillion', 'impact', 0.12]] })
