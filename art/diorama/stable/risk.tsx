// ---------------------------------------------------------------- s87–s93: who carries the risk (navy: a warning).
// A) The deal's other side: the coin company stands with its gold pile (the reward); Maya walks under a heavy block
//    marked RISK (carrying it).
// B) March 2023: a bank building (SILICON VALLEY BANK) holding USDC's money cracks and sinks ("failed"); USDC's backing
//    drawn as twelve stacks of dollars — one of them sits inside the bank ($3.3B of about $40B: one in every twelve).
// C) A price line: USDC's coin rides at $1, holders rush to sell (small figures run), it drops to about 88¢; the US
//    government says every depositor will be repaid (a stamp) and the line climbs back to $1.
// D) The holder: none of the interest (the gold goes to the company), still hurt when something goes wrong.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, Stamp, win, type Beat } from '../aimoney/common'
import { Calendar } from '../charts'
import { Ground } from '../power/kit2'
import { GovBuilding, Stack } from '../fee/kit'
import { Mini } from '../../rig/Mini'
import { CoinHQ, Dollar, SCoin } from './kit'

const GROUND = 920
const Gold: React.FC<{ x: number; y: number; r?: number; o?: number }> = ({ x, y, r = 16, o = 1 }) => <g opacity={o} transform={`translate(${x} ${y})`}><circle r={r} fill={P.gold} /><circle r={r * 0.7} fill="none" stroke={P.goldD} strokeWidth={3} /></g>
// # a bank that cracks and sinks (fail 0–1)
const FailingBank: React.FC<{ x: number; y: number; fail: number; o?: number; children?: React.ReactNode }> = ({ x, y, fail, o = 1, children }) => (
  <g transform={`translate(${x} ${y + 40 * fail}) rotate(${-5 * fail})`} opacity={o}>
    <ellipse cx={0} cy={6 - 40 * fail} rx={230} ry={16} fill="#000" opacity={0.25} />
    <rect x={-210} y={-36} width={420} height={36} rx={4} fill="#C9D3E1" />
    {[-150, -50, 50, 150].map((cx) => <rect key={cx} x={cx - 24} y={-280} width={48} height={244} rx={6} fill="#E8EEF5" />)}
    <rect x={-210} y={-316} width={420} height={36} rx={4} fill="#C9D3E1" /><path d="M-230 -316 L0 -420 L230 -316 Z" fill="#E8EEF5" />
    <rect x={-170} y={-372} width={340} height={44} rx={8} fill={P.navy3} />
    <text x={0} y={-340} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 32px "Bebas Neue"', letterSpacing: 3 }}>SILICON VALLEY BANK</text>
    {children}
    {fail > 0.05 && <path d={`M-40 -420 L-10 -330 L-50 -250 L0 -160 L-30 -60`} fill="none" stroke="#2C3850" strokeWidth={8} opacity={Math.min(1, fail * 2)} />}
  </g>
)

const Risk: React.FC<PieceProps> = ({ f, c }) => {
  const side = c('s87:side'), deal = c('s87:deal')
  const keeps = c('s88:keeps'), reward = c('s88:reward'), holder88 = c('s88:holder'), carries = c('s88:carries'), risk = c('s88:risk')
  const march = c('s89:march'), silicon = c('s89:silicon'), failed = c('s89:failed'), d33 = c('s89:33'), usdc89 = c('s89:usdc'), inside = c('s89:inside')
  const d40 = c('s90:40'), roughly = c('s90:roughly'), twelve = c('s90:twelve')
  const holders91 = c('s91:holders'), rushed = c('s91:rushed'), fell = c('s91:fell'), d88 = c('s91:88')
  const climbed = c('s92:climbed'), one92 = c('s92:one'), government = c('s92:government'), every92 = c('s92:every'), repaid = c('s92:repaid')
  const depositor = c('s92:depositor')
  const holder93 = c('s93:holder'), none = c('s93:none'), hurt = c('s93:hurt'), wrong = c('s93:wrong')
  const AB = march - 4, BC = holders91 - 4, CD = holder93 - 4
  const A = win(f, side - 20, AB), B = win(f, AB, BC), C = win(f, BC, CD), D = on(f, CD, 10)
  return (
    <g>
      <Stage id="sc-risk" frame={f} />
      <Headline f={f} lines={[[side, 'THE OTHER SIDE OF THE DEAL', P.ink, 96], [reward, 'THE COMPANY KEEPS THE REWARD…', P.ink, 92], [risk, '…THE HOLDER CARRIES SOME RISK', P.coralInk, 92], [march, 'MARCH 2023', P.ink, 108], [d33, '$3.3B OF USDC\'S MONEY INSIDE', P.ink, 92], [twelve, 'ABOUT $1 IN EVERY $12', P.ink, 100], [d88, 'USDC FELL TO ABOUT 88¢', P.coralInk, 100], [repaid, 'BACK TO $1 AFTER THE US STEPPED IN', P.ink, 88], [holder93, '', P.ink], [hurt, 'NO INTEREST, STILL THE RISK', P.coralInk, 100]]} />

      {/* # A) reward to the company, risk on the holder */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <CoinHQ x={1440} y={GROUND} s={0.8} sign="COIN COMPANY" o={on(f, side, 10)} />
        <g opacity={on(f, keeps, 10)}><Stack x={1720} y={GROUND - 10} n={Math.round(lerp(3, 12, on(f, reward, 20)))} w={150} /><Label x={1720} y={GROUND + 70} text="REWARD" size={50} font="Bebas Neue" color="#1B2A4A" /></g>
        {(() => { const beats: Beat[] = [[0, 'idle', 'neutral'], [carries, 'carryHeavy', 'worried']]
          return <g opacity={on(f, holder88, 10)}>
            <Person f={f} who="investorF" beats={beats} x={520} y={GROUND} s={0.85} />
            <g opacity={on(f, carries, 8)} transform={`translate(520 ${lerp(GROUND - 700, GROUND - 500, on(f, carries, 14))})`}>
              <rect x={-150} y={-90} width={300} height={130} rx={18} fill={P.coral} /><text x={0} y={2} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 64px "Bebas Neue"', letterSpacing: 6 }}>RISK</text>
            </g>
            <Label x={520} y={GROUND + 70} text="HOLDER" size={50} font="Bebas Neue" color="#1B2A4A" />
          </g> })()}
      </g>}

      {/* # B) March 2023: the bank fails with USDC's money inside */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={on(f, march, 8) * (1 - on(f, silicon, 10))}><Calendar x={960} y={460} text="MARCH" s={1.3} /><Label x={960} y={640} text="2023" size={64} font="Bebas Neue" color={P.ink} /></g>
        <FailingBank x={560} y={GROUND} fail={on(f, failed, 24)} o={on(f, silicon, 10)}>
          {/* # one stack of USDC's dollars inside */}
          <g opacity={on(f, inside, 8)}>{[0, 1, 2].map((k) => <Dollar key={k} x={0} y={-90 - k * 26} s={0.55} />)}</g>
        </FailingBank>
        {/* # USDC's backing: twelve stacks, one of them in the bank */}
        <g opacity={on(f, usdc89, 10)}>
          {Array.from({ length: 12 }, (_, k) => { const x = 1000 + (k % 6) * 140, y = k < 6 ? 560 : 800, gone = k === 0
            return <g key={k} opacity={gone ? 1 - on(f, inside, 10) * 0.75 : 1}>
              {[0, 1, 2].map((r) => <Dollar key={r} x={x} y={y - r * 26} s={0.5} />)}
              {gone && <rect x={x - 66} y={y - 116} width={132} height={160} rx={14} fill="none" stroke={P.coral} strokeWidth={6} strokeDasharray="12 8" opacity={on(f, roughly, 8)} />}
            </g> })}
          <g opacity={on(f, d40, 8)}><Label x={1350} y={GROUND + 70} text="≈ $40B BEHIND USDC" size={50} font="Bebas Neue" color="#1B2A4A" /></g>
        </g>
      </g>}

      {/* # C) the price line: $1 → about 88¢ → back to $1 */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        {(() => {
          // # price: 1.00 until "fell", down to 0.88 by "88", flat, then back up from "climbed" to "repaid"
          const price = (t: number) => t < fell ? 1 : t < d88 + 6 ? lerp(1, 0.88, span(t, fell, d88 + 6)) : t < climbed ? 0.88 : lerp(0.88, 1, span(t, climbed, repaid))
          const x0 = 260, x1 = 1500, tA = holders91 - 4, tB = repaid + 30, yOf = (p: number) => 340 + (1 - p) * 2400
          const n = 60, pts: string[] = []
          for (let k = 0; k <= n; k++) { const t = lerp(tA, tB, k / n); if (t > f) break; pts.push(`${k ? 'L' : 'M'}${lerp(x0, x1, k / n)} ${yOf(price(t))}`) }
          const hx = lerp(x0, x1, Math.min(1, span(f, tA, tB))), hy = yOf(price(Math.min(f, tB)))
          return <g>
            <line x1={x0} y1={yOf(1)} x2={x1 + 60} y2={yOf(1)} stroke={P.ink2} strokeWidth={4} strokeDasharray="12 10" />
            <Label x={x0 - 30} y={yOf(1) + 16} text="$1" size={50} font="Bebas Neue" color={P.ink2} anchor="end" />
            <path d={pts.join(' ')} fill="none" stroke={P.sky} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
            <SCoin x={hx} y={hy} s={1.0} text="USDC" />
            <g opacity={on(f, d88, 8)}><Label x={x0 - 30} y={yOf(0.88) + 16} text="88¢" size={56} font="Bebas Neue" color={P.coralInk} anchor="end" /><line x1={x0} y1={yOf(0.88)} x2={x1 + 60} y2={yOf(0.88)} stroke={P.coral} strokeWidth={3} strokeDasharray="8 10" /></g>
          </g>
        })()}
        {/* # holders rushing to sell */}
        <g opacity={on(f, rushed, 8) * (1 - on(f, climbed, 10))}>{[0, 1, 2, 3].map((k) => <Mini key={k} look={['buyer', 'investor', 'investorF', 'worker'][k]} x={lerp(300 + k * 130, 900 + k * 130, span(f, rushed, climbed))} y={GROUND} scale={0.7} frame={f} seed={k + 90} mood="sad" />)}</g>
        {/* # the US government steps in */}
        <g opacity={on(f, government, 10)}>
          <GovBuilding x={1640} y={GROUND} s={0.6} />
          <g opacity={on(f, depositor, 8)}>{[0, 1, 2].map((k) => <Mini key={k} look={['buyer', 'worker', 'investor'][k]} x={1240 + k * 110} y={GROUND} scale={0.6} frame={f} seed={k + 120} mood="happy" />)}</g>
          <Stamp x={1640} y={GROUND - 380} text="REPAID" f={f} at={repaid} size={60} color={P.mintInk} />
        </g>
      </g>}

      {/* # D) none of the interest, still the risk */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'neutral'], [none, 'shrug', 'neutral'], [hurt, 'despair', 'worried']]} x={520} y={GROUND} s={0.85} />
        <CoinHQ x={1440} y={GROUND} s={0.75} sign="COIN COMPANY" />
        {[0, 1, 2].map((k) => <Gold key={k} x={lerp(700, 1300, ((f - none + k * 12) % 36) / 36)} y={560} r={22} o={on(f, none, 8)} />)}
        <g opacity={on(f, hurt, 8)} transform={`translate(520 ${GROUND - 500})`}><rect x={-130} y={-60} width={260} height={100} rx={16} fill={P.coral} /><text x={0} y={10} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 54px "Bebas Neue"', letterSpacing: 5 }}>RISK</text></g>
      </g>}
      <Vignette id="sc-risk" />
    </g>
  )
}

const BEATS = ["s92:depositor", 's87:side', 's88:keeps', 's88:reward', 's88:holder', 's88:carries', 's88:risk', 's89:march', 's89:silicon', 's89:failed', 's89:33', 's89:usdc', 's89:inside', 's90:40', 's90:roughly', 's90:twelve', 's91:rushed', 's91:fell', 's91:88', 's92:climbed', 's92:government', 's92:repaid', 's93:holder', 's93:none', 's93:hurt']
export const SC_RISK = makePiece('sc-risk', 'Stablecoin long ch7 (navy): the company keeps the reward pile while the holder carries a heavy RISK block; March 2023 Silicon Valley Bank fails with $3.3B of USDC\'s ~$40B inside (one stack in twelve); holders rush to sell and USDC falls to ~88¢, back to $1 after the US says depositors will be repaid; the holder gets none of the interest but can still be hurt', {
  mood: 'dark', Component: Risk, beats: BEATS,
  sfx: [['s88:carries', 'thud', 0.25], ['s89:failed', 'thud', 0.35], ['s90:twelve', 'pop', 0.2], ['s91:88', 'thud', 0.3], ['s92:repaid', 'ding', 0.25], ['s93:hurt', 'swish', 0.2]] })
