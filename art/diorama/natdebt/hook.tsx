// ---------------------------------------------------------------- s1–s5: 40 trillion, and interest bigger than the military.
// A) A domed government building; beside it a tower of money blocks rises layer by layer to $40 TRILLION+.
// B) A balance: FY2026 interest ($1.05T, coins) against the military (a shield, $965B) — the interest side sinks.
// C) Three questions pop up: WHO LENT IT? HOW DOES IT BORROW? WILL IT PAY IT BACK?
// D) The picture most people have: one giant bank handing one giant loan to the government — crossed out; the tower bursts
//    into many small IOUs.
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, win, Coin } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { BankFront } from '../bank/kit'
import { Balance, NoCross } from '../econ/kit'
import { Blocks, Capitol, IOU, Shield, TXT, INK, RED } from './kit'

const GROUND = 930

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const united = c('s1:united'), owes = c('s1:owes'), d40 = c('s1:40'), trillion = c('s1:trillion')
  const y2026 = c('s2:2026'), interest = c('s2:interest'), military = c('s2:military')
  const who = c('s3:who'), lent = c('s3:lent'), borrow = c('s3:borrow'), back = c('s3:back')
  const picture = c('s4:picture'), loan = c('s4:loan'), bank = c('s4:bank'), not = c('s4:not')
  const apart = c('s5:apart'), step = c('s5:step')

  const A = win(f, 0, y2026 - 4), B = win(f, y2026 - 4, who - 4), Cq = win(f, who - 4, picture - 4), D = on(f, picture - 4, 10)
  const layers = Math.round(40 * on(f, owes, 46))
  const tilt = on(f, military, 20)
  const burst = on(f, apart, 26)
  return (
    <g>
      <Stage id="nd-hook" frame={f} />
      <Headline f={f} lines={[[united, 'THE US NATIONAL DEBT', P.ink, 100], [y2026, 'FISCAL YEAR 2026', P.ink, 90], [who, 'THREE QUESTIONS', P.ink, 96], [picture, 'WHAT MOST PEOPLE PICTURE', P.ink, 90]]} />
      <Ground y={GROUND} />

      {/* # A) the tower of debt */}
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, united, 10)}><Capitol x={600} y={GROUND} s={0.95} /></g>
        <Blocks x={1300} y={GROUND} n={layers} w={260} h={12} label={f >= d40 ? '$40 TRILLION+' : ''} size={80} />
        <g opacity={on(f, trillion, 8)}><Label x={1300} y={GROUND + 60} text="1 LAYER = $1 TRILLION" size={40} font="Bebas Neue" color={P.ink2} /></g>
      </g>}

      {/* # B) interest vs the military */}
      {B > 0 && <g opacity={B}>
        <Balance x={960} y={GROUND} s={1.05} tilt={-tilt}
          left={<g>{[0, 1, 2, 3, 4].map((k) => <Coin key={k} x={-60 + (k % 3) * 60} y={-30 - Math.floor(k / 3) * 54} s={1} />)}</g>}
          right={<g transform="translate(0 -30) scale(0.6)"><Shield x={0} y={0} /></g>} />
        <g opacity={on(f, interest, 8)}><Label x={380} y={560} text="INTEREST" size={80} font="Bebas Neue" color={RED} /><Label x={380} y={640} text="$1.05 TRILLION" size={60} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, military, 8)}><Label x={1540} y={560} text="MILITARY" size={80} font="Bebas Neue" color={P.ink2} /><Label x={1540} y={640} text="$965 BILLION" size={60} font="Bebas Neue" color={P.ink} /></g>
      </g>}

      {/* # C) three questions */}
      {Cq > 0 && <g opacity={Cq}>
        {([[lent, 'WHO LENT IT?'], [borrow, 'HOW DOES IT BORROW?'], [back, 'WILL IT PAY IT BACK?']] as [number, string][]).map(([at, t], k) => <g key={k} opacity={on(f, Math.min(at, who + k * 10), 8)} transform={`translate(${400 + k * 560} ${600 - 30 * (1 - pop(f, Math.min(at, who + k * 10), 14))})`}>
          <circle r={170} fill="#FFFFFF" stroke="#E2D3B4" strokeWidth={8} />
          <text y={30} textAnchor="middle" fill={RED} style={TXT(160)}>?</text>
          <text y={240} textAnchor="middle" fill={INK} style={TXT(54)}>{t}</text>
        </g>)}
      </g>}

      {/* # D) not one loan from one bank */}
      {D > 0 && <g opacity={D}>
        <g opacity={1 - on(f, apart - 4, 10)}>
          <BankFront x={420} y={GROUND} s={1.05} name="ONE GIANT BANK" glow={win(f, bank, not, 6)} />
          <Capitol x={1460} y={GROUND} s={0.8} />
          <g opacity={on(f, loan, 8)}><IOU x={lerp(560, 1050, on(f, loan, 30))} y={470} s={1.3} t="ONE LOAN" /></g>
          <NoCross x={1050} y={470} s={1.8} o={on(f, not, 8)} />
        </g>
        <g opacity={on(f, apart - 4, 10)}>
          {Array.from({ length: 14 }, (_, k) => { const a = (k / 14) * Math.PI * 2; return <IOU key={k} x={960 + Math.cos(a) * 560 * burst} y={560 + Math.sin(a) * 300 * burst} s={0.5} r={-20 + k * 3} t="IOU" o={on(f, apart, 8)} /> })}
          <g opacity={on(f, step, 8)}><Label x={960} y={580} text="MANY IOUs" size={90} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s2:it")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s2:than")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s3:how")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s3:and")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s4:all")} x={940} y={560} rx={230} ry={200} />
      </g>
      {/* # spots:end */}
      <Vignette id="nd-hook" />
    </g>
  )
}

export const ND_HOOK = makePiece('nd-hook', 'Hook: a domed government building beside a tower of money blocks that rises layer by layer to $40 TRILLION+ (1 layer = $1 trillion); a balance where FY2026 interest ($1.05 trillion, coins) outweighs the military ($965 billion, a shield); three question circles — who lent it? how does it borrow? will it pay it back?; one giant bank handing one giant loan to the government, crossed out; the picture bursts into many small IOUs.', {
  mood: 'light', Component: Hook,
  beats: ["s1:united", "s1:owes", "s1:40", "s1:trillion", "s2:2026", "s2:interest", "s2:military", "s3:who", "s3:lent", "s3:borrow", "s3:back", "s4:picture", "s4:loan", "s4:bank", "s4:not", "s5:apart", "s5:step", "s2:it", "s2:than", "s3:how", "s3:and", "s4:all"],
  sfx: [['s1:40', 'riser', 0.12], ['s2:military', 'thud', 0.12], ['s4:not', 'pop', 0.12], ['s5:apart', 'swish', 0.12]] })
