// ---------------------------------------------------------------- s77–s83: the payoff (cream).
// A) Leo beside the money machine; its four choice sockets light.
// B) Four panels light one by one: 1) two bars, ALL CASH 14 of 69 vs MIX 65 of 69; 2) a brick pile in 2008 with a crossed
//    SELL sign (hold through it); 3) a mini escalator: one ALL bag ahead of three thirds; 4) the paycheck with a quarter
//    cut away by a 1% tap.
// C) The machine running, paying Leo $40,000 a year; gears glow on "built well". D) the closing line.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { NoMark } from '../bank/kit'
import { bump, BrickPile, Escalator, escAt, Machine, MoneyBag, Paycheck } from './kit'

const GROUND = 930

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const leo77 = c('s77:leo'), million77 = c('s77:million'), history77 = c('s77:history'), four77 = c('s77:four'), choices77 = c('s77:choices')
  const one78 = c('s78:one'), cash78 = c('s78:cash'), n14 = c('s78:14'), mix78 = c('s78:mix'), n65 = c('s78:65')
  const two79 = c('s79:two'), hold79 = c('s79:hold'), y2008 = c('s79:2008'), selling79 = c('s79:selling'), real79 = c('s79:real')
  const three80 = c('s80:three'), once80 = c('s80:once'), spreading80 = c('s80:spreading'), small80 = c('s80:small'), panic = c('s80:panic')
  const four81 = c('s81:four'), fees81 = c('s81:fees'), p1 = c('s81:1'), quarter81 = c('s81:quarter'), year81 = c('s81:year')
  const million82 = c('s82:million'), end82 = c('s82:end'), machine82 = c('s82:machine'), d40 = c('s82:40000'), keeps82 = c('s82:keeps'), built = c('s82:built')
  const how83 = c('s83:how'), advice = c('s83:advice')

  const AB = one78 - 8, BC = million82 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cc = on(f, BC, 10)

  const aBeats: Beat[] = [[0, 'idle', 'smiling'], [history77, 'point', 'smiling'], [four77, 'countOne', 'smiling'], [choices77, 'present', 'smiling']]
  const cBeats: Beat[] = [[BC, 'idle', 'smiling'], [end82, 'crossNoA', 'neutral', 'crossNoB', 12], [machine82, 'present', 'smiling'], [d40, 'receive', 'smiling'], [built, 'thumbsUp', 'smiling'], [how83, 'idle', 'smiling']]
  const pay = on(f, d40, 18)

  // # one panel: a card with a number badge; lit while its line is spoken, then stays dimmed
  const Panel = ({ x, y, n, at, next, children }: { x: number; y: number; n: number; at: number; next: number; children: React.ReactNode }) => {
    const lit = win(f, at, next, 8)
    return <g opacity={on(f, at, 10)} transform={`translate(${x} ${y})`}>
      <rect x={-400} y={-170} width={800} height={340} rx={30} fill={P.card} stroke={lit > 0.5 ? P.gold : '#E2D3B0'} strokeWidth={lit > 0.5 ? 8 : 4} />
      <circle cx={-350} cy={-120} r={36} fill={lit > 0.5 ? P.gold : '#2E5C9A'} /><text x={-350} y={-104} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>{n}</text>
      <g opacity={0.45 + 0.55 * Math.max(lit, f < at + 10 ? 1 : 0)}>{children}</g>
    </g>
  }

  return (
    <g>
      <Stage id="m-payoff" frame={f} />
      <Ground y={GROUND} />

      {/* # A) Leo + the machine */}
      {A > 0 && <g opacity={A}>
        <Machine x={1100} y={GROUND} s={1.0} f={f} fill={0.85} lit={[four77, four77 + 6, four77 + 12, choices77].filter((a) => f >= a).length} plate="LEO'S $1M" />
        <Person f={f} who="investor" beats={aBeats} x={420} y={GROUND} s={1.1} />
        <g opacity={on(f, million77, 8)}><Label x={420} y={GROUND + 64} text="LEO, $1M TO INVEST TODAY" size={48} font="Bebas Neue" color={P.ink} /></g>
      </g>}

      {/* # B) the four panels */}
      {B > 0 && <g opacity={B}>
        <Panel x={520} y={420} n={1} at={one78} next={two79}>
          <Label x={-60} y={-110} text="WHERE IT GOES" size={50} font="Bebas Neue" color={P.ink} />
          <g opacity={on(f, c('s78:goes'), 8)}>{[-150, 150].map((x) => <rect key={x} x={x - 60} y={-30} width={120} height={130} rx={10} fill="none" stroke="#CDB58C" strokeWidth={4} strokeDasharray="10 8" />)}</g>
          {[[-150, 14, '#F06B5B', 'ALL CASH', n14, cash78], [150, 65, P.gold, '60/40 MIX', n65, mix78]].map(([x, v, col, name, atN, atS], k) => { const h = (v as number) * 1.9 * on(f, atN as number, 16); return <g key={k} opacity={on(f, atS as number, 8)}>
            <rect x={(x as number) - 60} y={100 - h} width={120} height={h} rx={10} fill={col as string} />
            <Label x={x as number} y={100 - h - 14} text={f >= (atN as number) ? `${v} OF 69` : ''} size={44} font="Bebas Neue" color={P.ink} />
            <Label x={(x as number) + 0} y={145} text={name as string} size={40} font="Bebas Neue" color={P.ink2} /></g> })}
        </Panel>
        <Panel x={1400} y={420} n={2} at={two79} next={three80}>
          <Label x={-60} y={-110} text="A MIX YOU CAN HOLD" size={50} font="Bebas Neue" color={P.ink} />
          <BrickPile x={-120} y={130} n={f >= hold79 ? 8.6 : 10} s={0.7} per={3} col="gold" />
          <g opacity={on(f, y2008, 8)}><Label x={-120} y={-30} text="2008" size={50} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, selling79, 8)} transform={`translate(${210 + 8 * Math.sin(f * 1.5) * bump(f, [c('s79:paper')], 20)} 40)`}><rect x={-90} y={-46} width={180} height={84} rx={14} fill={P.coral} /><text y={20} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 56px "Bebas Neue"' }}>SELL</text><NoMark x={0} y={0} o={on(f, real79, 8)} r={80} /></g>
        </Panel>
        <Panel x={520} y={780} n={3} at={three80} next={four81}>
          <Label x={-60} y={-110} text="ALL AT ONCE (USUALLY)" size={50} font="Bebas Neue" color={P.ink} />
          <g transform="translate(-240 140) scale(0.38)"><Escalator x={0} y={0} f={f} label="MARKET" />
            {(() => { const [bx, by] = escAt(0, 0, Math.min(0.7, Math.max(0, (f - once80) * 0.006))); return <MoneyBag x={bx} y={by} s={1.3} t="ALL" /> })()}
            <g opacity={on(f, spreading80, 8)}>{[0, 1, 2].map((k) => <MoneyBag key={k} x={-80 + k * 90} y={20} s={0.9} t="⅓" />)}</g></g>
          <g opacity={on(f, small80, 8)}><Label x={200} y={60} anchor="start" text={f >= panic ? 'NO PANIC' : 'SMALL EDGE'} size={38} font="Bebas Neue" color={P.ink2} /></g>
        </Panel>
        <Panel x={1400} y={780} n={4} at={four81} next={BC}>
          <Label x={-60} y={-110} text="FEES" size={50} font="Bebas Neue" color={P.ink} />
          <g opacity={on(f, fees81, 8)}><Paycheck x={-60} y={40} s={0.75 + 0.05 * bump(f, [c('s81:paycheck')])} amt="$40,000" sub="EVERY YEAR" split={on(f, quarter81, 8)} /></g>
          <g opacity={on(f, p1, 8)} transform="translate(250 -20)"><rect x={-70} y={-34} width={140} height={60} rx={14} fill={P.coral} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"' }}>1% FEE</text></g>
          <g opacity={on(f, quarter81, 8)}><Label x={250} y={90} text={f >= year81 ? '≈ ¼, EVERY YEAR' : '≈ ¼'} size={46} font="Bebas Neue" color={P.coralInk} /></g>
        </Panel>
      </g>}

      {/* # C) the machine, built well */}
      {Cc > 0 && <g opacity={Cc}>
        <g opacity={on(f, built, 10) * (1 - on(f, how83, 10))}><ellipse cx={1080} cy={GROUND - 320} rx={420} ry={380} fill={P.gold} opacity={0.14} /></g>
        <Machine x={1080} y={GROUND} s={1.05} f={f} fill={0.85} lit={4} plate="LEO'S $1M" />
        <g opacity={pay}><Paycheck x={lerp(1400, 1600, pay)} y={lerp(860, 520, pay)} s={0.95} amt="$40,000" sub="A YEAR" /></g>
        <g opacity={on(f, keeps82, 8)}>{[0, 1, 2].map((k) => { const t = ((f - keeps82) / 34 + k / 3) % 1; return <g key={k} opacity={(1 - t) * 0.8}><Paycheck x={1400 + 60 * t} y={860 - 200 * t} s={0.35} amt="$40K" sub="" /></g> })}</g>
        <Person f={f} who="investor" beats={cBeats} x={420} y={GROUND} s={1.1} />
        <g opacity={on(f, advice, 8)}><Label x={960} y={GROUND + 70} text="NOT INVESTMENT ADVICE" size={48} font="Bebas Neue" color={P.ink2} /></g>
      </g>}

      <Headline f={f} lines={[[leo77, 'LEO’S FOUR CHOICES', P.ink, 104], [one78, 'WHAT HISTORY SAYS', P.ink, 100], [million82, 'NOT THE END OF WORK', P.ink, 100], [machine82, 'A MACHINE: ≈ $40,000 A YEAR', P.ink, 96], [how83, 'HOW THE MONEY WORKS', P.ink, 100]]} />
      <Vignette id="m-payoff" />
    </g>
  )
}

export const M_PAYOFF = makePiece('m-payoff', 'Payoff: Leo beside the money machine, its four sockets light; four panels light in turn: two bars all cash 14 of 69 vs 60/40 mix 65 of 69; a 2008 brick pile and a crossed SELL sign; a mini escalator, one ALL bag ahead of three thirds (small edge if he does not panic); the $40,000 paycheck with a quarter cut by a 1% fee; the machine running and paying Leo $40,000 a year, gears glowing (built well); not investment advice', {
  mood: 'light', Component: Payoff,
  beats: ["s77:million", "s77:history", "s77:four", "s77:choices", "s78:one", "s78:cash", "s78:14", "s78:mix", "s78:65", "s79:two", "s79:hold", "s79:2008", "s79:selling", "s79:real", "s80:three", "s80:once", "s80:spreading", "s80:small", "s80:panic", "s81:four", "s81:fees", "s81:1", "s81:quarter", "s81:year", "s82:million", "s82:end", "s82:machine", "s82:40000", "s82:keeps", "s82:built", "s83:how", "s83:advice", "s78:goes", "s79:paper", "s81:paycheck"],
  sfx: [['s78:one', 'softpop', 0.12], ['s79:two', 'softpop', 0.12], ['s80:three', 'softpop', 0.12], ['s81:four', 'softpop', 0.12], ['s82:40000', 'cash', 0.12]] })
