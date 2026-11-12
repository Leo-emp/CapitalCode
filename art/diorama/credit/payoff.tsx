// ---------------------------------------------------------------- s83–s88: the whole machine, the average, the takeaway.
// A) A conveyor left to right: lenders send a report → three bureaus keep the record → the formula machine → one number.
// B) That number sets what you pay, sometimes for 30 years (a house and a 30-year calendar). Pay and a vault are crossed out;
//    the report of how you handled what you owed glows.
// C) The meter settles on 715 — the US average FICO score in 2025. The presenter holds up a rate quote: the price of your
//    own track record.
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, House, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Calendar } from '../charts'
import { Backdrop, Note, Tag } from '../econ/kit'
import { Bureau, Machine, Meter, NoCross, Report, Vault, GREEN, RED, GOLD, TXT, INK } from './kit'

const GROUND = 930

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const really = c('s83:really'), works = c('s83:works')
  const lenders = c('s84:lenders'), borrow = c('s84:borrow'), three = c('s84:three'), record = c('s84:record'), formula = c('s84:formula'), number = c('s84:number')
  const decide = c('s85:decide'), pay = c('s85:pay'), years = c('s85:years')
  const care = c('s86:care'), earn = c('s86:earn'), own = c('s86:own'), handled = c('s86:handled'), owed = c('s86:owed')
  const p2025 = c('s87:2025'), average = c('s87:average'), p715 = c('s87:715')
  const lender88 = c('s88:lender'), rate = c('s88:rate'), remember = c('s88:remember'), price = c('s88:price'), record88 = c('s88:record')

  const A = win(f, 0, decide - 4), B = win(f, decide - 4, p2025 - 4), Cw = on(f, p2025 - 4, 10)
  const needle = lerp(450, 715, on(f, p715, 30))
  const hero: Beat[] = [[p2025 - 4, 'idle', 'neutral'], [lender88, 'holdUp', 'smiling'], [remember, 'explain', 'neutral'], [record88, 'present', 'smiling']]
  return (
    <g>
      <Stage id="cs-payoff" frame={f} />
      <Backdrop f={f} town={false} />
      <Headline f={f} lines={[[really, 'THE WHOLE MACHINE', P.ink, 100], [decide, 'WHAT IT DECIDES', P.ink, 96], [p2025, 'US AVERAGE FICO SCORE, 2025', P.ink, 86]]} />
      <Ground y={GROUND} />

      {/* # A) the conveyor */}
      {A > 0 && <g opacity={A}>
        <rect x={160} y={GROUND - 24} width={1600} height={24} rx={12} fill="#8E7A5A" opacity={on(f, works, 10)} />
        {Array.from({ length: 16 }, (_, k) => <circle key={k} cx={200 + k * 100} cy={GROUND - 12} r={9} fill="#5B4A33" opacity={on(f, works, 10)} />)}
        <g opacity={on(f, lenders, 8)}><Report x={lerp(260, 300, Math.sin(f / 20) * 0.5 + 0.5)} y={700} s={0.7} marks={[1, 1, 1, 1, 0, 1]} /></g>
        <g opacity={on(f, three, 8)}>{[0, 1, 2].map((k) => <Bureau key={k} x={600 + k * 150} y={GROUND - 24} s={0.42} name={['EQUIFAX', 'EXPERIAN', 'TRANSUNION'][k]} col={['#C94A3E', '#4F78AA', '#3FA36B'][k]} glow={win(f, record, formula, 6)} />)}</g>
        <g opacity={on(f, formula, 8)}><Machine x={1240} y={GROUND - 24} s={0.6} f={f} run={1} screen={f >= number ? '###' : ''} /></g>
        <g opacity={on(f, number, 8)}><Meter x={1650} y={GROUND - 60} s={0.42} v={720} /></g>
        {[[borrow, 480], [record, 1000], [number, 1460]].map(([at, x], k) => <g key={k} opacity={on(f, at, 8)}><path d={`M${x - 40} 560 l60 0 l0 -20 l40 40 l-40 40 l0 -20 l-60 0 z`} fill={GOLD} /></g>)}
      </g>}

      {/* # B) what it decides, and what it ignores */}
      {B > 0 && <g opacity={B}>
        <g opacity={1 - on(f, earn - 6, 10)}>
          <House x={760} y={GROUND} s={1} big={0.8} />
          <g opacity={on(f, pay, 8)}><Tag x={760} y={360} t="YOUR RATE" s={1} col={GOLD} r={0} /></g>
          <g opacity={on(f, years, 8)}><Calendar x={1360} y={560} text="30 YRS" s={1.5} /></g>
        </g>
        <g opacity={on(f, earn - 6, 10)}>
          <g opacity={on(f, earn, 8)}><Note x={420} y={560} t="PAY" s={1.2} /><NoCross x={420} y={560} s={0.9} o={on(f, earn + 10, 8)} /></g>
          <g opacity={on(f, own, 8)}><Vault x={800} y={GROUND} s={0.8} t="$$$" /><NoCross x={800} y={GROUND - 130} s={0.9} o={on(f, own + 10, 8)} /></g>
          <g opacity={on(f, handled, 8)}><Report x={1400} y={600} s={1} marks={[1, 1, 1, 1, 1, 1]} glow={on(f, owed, 12)} /></g>
        </g>
      </g>}

      {/* # C) 715, and the takeaway */}
      {Cw > 0 && <g opacity={Cw}>
        <Meter x={1160} y={GROUND - 80} s={1} v={needle} show={f >= p715 ? '715' : ''} />
        <g opacity={on(f, average, 8)}><Label x={1160} y={GROUND + 60} text="AVERAGE, ACCORDING TO FICO" size={40} font="Bebas Neue" color={P.ink2} /></g>
        <Person f={f} who="hero" beats={hero} x={330} y={GROUND} s={1.05} />
        <g opacity={on(f, rate, 8)} transform={`translate(720 ${lerp(470, 430, on(f, rate, 14))})`}><Tag x={0} y={0} t="YOUR RATE %" s={0.9} col={GOLD} r={0} /></g>
        <g opacity={on(f, price, 8)}><Label x={1160} y={330} text="THE PRICE OF YOUR TRACK RECORD" size={56} font="Bebas Neue" color={P.ink} /></g>
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s87:score")} x={1160} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s88:so")} x={1160} y={700} rx={230} ry={200} />
      </g>
      {/* # spots:end */}
      <Vignette id="cs-payoff" />
    </g>
  )
}

export const CS_PAYOFF = makePiece('cs-payoff', 'Payoff: a conveyor belt from left to right — a credit report from lenders, three small bureau archives (Equifax, Experian, TransUnion) that glow as they keep the record, the formula machine, and a meter — with gold arrows between; then a house with a YOUR RATE tag and a 30-year calendar; a PAY note and a vault are crossed out while an on-time report glows; finally a big meter settles on 715, the 2025 US average according to FICO, and the presenter holds up a YOUR RATE % tag: the price of your track record.', {
  mood: 'light', Component: Payoff,
  beats: ["s83:really", "s83:works", "s84:lenders", "s84:borrow", "s84:three", "s84:record", "s84:formula", "s84:number", "s85:decide", "s85:pay", "s85:years", "s86:care", "s86:earn", "s86:own", "s86:handled", "s86:owed", "s87:2025", "s87:average", "s87:715", "s88:lender", "s88:rate", "s88:remember", "s88:price", "s88:record", "s87:score", "s88:so"],
  sfx: [['s84:formula', 'click', 0.1], ['s87:715', 'chime', 0.15]] })
