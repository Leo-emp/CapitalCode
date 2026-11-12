// ---------------------------------------------------------------- s94–s103: so is it a bad deal?
// A) A SCAM stamp hovers over the coin and is crossed ("none of this means … a scam"). Maya sends a coin across the
//    world to a friend in minutes; the week's days tick by under it (any day of the week).
// B) A price tag hangs from her coin: the price is the interest — about 4¢ per dollar a year. The other homes for her
//    money (a bank's savings account, a Treasury bill) earn interest coins, but their road to the globe is crossed.
// C) A rate dial drives the company's interest: rates fall (5% → 4.1%), yet two USDC towers (2024, 2025 — almost
//    double) show income still grew; the dial swings up and the gold slice thickens. Under it all, Maya's coin stays
//    at one dollar.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, Stamp, fly, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Mini } from '../../rig/Mini'
import { CoinHQ, Cross, Dollar, SCoin, TBill } from './kit'

const GROUND = 920
const Gold: React.FC<{ x: number; y: number; r?: number; o?: number }> = ({ x, y, r = 16, o = 1 }) => <g opacity={o} transform={`translate(${x} ${y})`}><circle r={r} fill={P.gold} /><circle r={r * 0.7} fill="none" stroke={P.goldD} strokeWidth={3} /></g>
const Globe: React.FC<{ x: number; y: number; r?: number; o?: number }> = ({ x, y, r = 200, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}><circle r={r} fill="#8FD0F2" />
    <path d={`M${-r * 0.6} ${-r * 0.5} q${r * 0.3} ${-r * 0.2} ${r * 0.5} 0 q${r * 0.1} ${r * 0.3} ${-r * 0.1} ${r * 0.5} q${-r * 0.3} ${r * 0.1} ${-r * 0.4} ${-r * 0.5} Z`} fill="#6FBF73" />
    <path d={`M${r * 0.1} ${r * 0.05} q${r * 0.4} ${-r * 0.25} ${r * 0.6} ${r * 0.05} q${-r * 0.05} ${r * 0.45} ${-r * 0.35} ${r * 0.55} q${-r * 0.3} ${-r * 0.2} ${-r * 0.25} ${-r * 0.6} Z`} fill="#6FBF73" />
    <circle r={r} fill="none" stroke="#5AA8D6" strokeWidth={6} /></g>
)
// # a piggy bank (a savings account)
const Piggy: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={-80} rx={120} ry={90} fill="#F2A7B5" /><circle cx={100} cy={-100} r={34} fill="#F2A7B5" /><ellipse cx={126} cy={-96} rx={14} ry={18} fill="#E58A9C" />
    <path d="M-40 -168 L-20 -196 L0 -168 Z" fill="#E58A9C" /><rect x={-30} y={-176} width={60} height={10} rx={5} fill="#B85C6E" />
    {[-70, -20, 30, 80].map((lx) => <rect key={lx} x={lx - 14} y={-10} width={28} height={40} rx={8} fill="#E58A9C" />)}
    <circle cx={80} cy={-112} r={7} fill="#5A3A44" />
  </g>
)
// # a rate dial: v 0–1 maps to the needle angle
const Dial: React.FC<{ x: number; y: number; v: number; o?: number; label?: string }> = ({ x, y, v, o = 1, label }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <path d="M-170 0 A170 170 0 0 1 170 0 Z" fill={P.card} stroke={P.edge} strokeWidth={3} />
    <path d="M-140 0 A140 140 0 0 1 -50 -131" fill="none" stroke={P.coral} strokeWidth={22} /><path d="M-50 -131 A140 140 0 0 1 50 -131" fill="none" stroke={P.gold} strokeWidth={22} /><path d="M50 -131 A140 140 0 0 1 140 0" fill="none" stroke={P.mint} strokeWidth={22} />
    <g transform={`rotate(${lerp(-80, 80, v)})`}><path d="M-10 0 L0 -130 L10 0 Z" fill={P.navy2} /></g><circle r={18} fill={P.navy2} />
    {label && <text x={0} y={60} textAnchor="middle" fill={P.ink} style={{ font: '400 48px "Bebas Neue"' }}>{label}</text>}
  </g>
)

const Deal: React.FC<PieceProps> = ({ f, c }) => {
  const means = c('s94:means'), scam = c('s94:scam')
  const give = c('s95:give'), useful = c('s95:useful'), send = c('s95:send'), anywhere = c('s95:anywhere'), minutes = c('s95:minutes'), day95 = c('s95:day'), week = c('s95:week')
  const price = c('s96:price'), interest96 = c('s96:interest'), earned = c('s96:earned'), s97 = c('s97')
  const d4 = c('s97:4'), every97 = c('s97:every'), year97 = c('s97:year')
  const wanted = c('s98:wanted'), interest98 = c('s98:interest'), home = c('s98:home'), savings = c('s98:savings'), bills = c('s98:bills'), cant = c("s98:can't"), world98 = c('s98:world')
  const business = c('s99:business'), rises = c('s99:rises'), falls = c('s99:falls'), rates99 = c('s99:rates')
  const down = c('s100:down'), d41 = c('s100:41'), d5 = c('s100:5')
  const income = c('s101:income'), grew = c('s101:grew'), usdc101 = c('s101:usdc'), doubled = c('s101:doubled')
  const up = c('s102:up'), more = c('s102:more')
  const either = c('s103:either'), holder = c('s103:holder'), one103 = c('s103:one'), coin103 = c('s103:coin')
  const s99 = c('s99'), circle100 = c('s100:circle')
  const AB = price - 4, BC = s99 - 2
  const A = win(f, means - 20, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  // # the rate dial's value: steady, rises/falls on the words, down to 4.1 from 5, back up on "up"
  const dv = f < rises ? 0.6 : f < falls ? lerp(0.6, 0.85, span(f, rises, rises + 10)) : f < down ? lerp(0.85, 0.6, span(f, falls, falls + 10)) : f < up ? lerp(0.6, 0.45, span(f, down, down + 14)) : lerp(0.45, 0.8, span(f, up, up + 14))
  return (
    <g>
      <Stage id="sc-deal" frame={f} />
      <Headline f={f} lines={[[scam, 'NOT A SCAM', P.ink, 108], [useful, 'SOMETHING USEFUL', P.ink, 104], [minutes, 'ANYWHERE, IN MINUTES, ANY DAY', P.ink, 92], [price, 'THE PRICE: THE INTEREST', P.ink, 100], [d4, 'ABOUT 4¢ PER DOLLAR A YEAR', P.ink, 96], [home, '', P.ink], [business, 'THE BUSINESS FOLLOWS INTEREST RATES', P.ink, 84], [d5, 'CIRCLE: ABOUT 4.1% INSTEAD OF 5%', P.ink, 88], [doubled, 'USDC ALMOST DOUBLED', P.ink, 100], [up, 'RATES UP: THE COMPANIES EARN MORE', P.ink, 88], [either, 'THE HOLDER: STILL $1 PER COIN', P.ink, 96]]} />

      {/* # A) not a scam; useful: a dollar across the world in minutes, any day */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, give, 10)}>
          <SCoin x={960} y={540} s={2.6} />
          <Stamp x={960} y={540} text="SCAM?" f={f} at={means} size={80} />
          <Cross x={960} y={540} o={on(f, scam + 6, 8)} size={110} />
        </g>
        <g opacity={on(f, give, 10)}>
          {(() => { const beats: Beat[] = [[0, 'phone', 'smiling'], [send, 'offer', 'smiling'], [week, 'thumbsUp', 'smiling']]
            return <Person f={f} who="investorF" beats={beats} x={300} y={GROUND} s={0.8} /> })()}
          <Globe x={960} y={560} r={220} o={on(f, anywhere, 10)} />
          {(() => { const fl = fly(f, send, [420, 560], [1560, 560], 36, 300); return f >= send ? <SCoin x={fl.x} y={fl.y} s={0.9} o={1} /> : null })()}
          <Mini look="buyer" x={1620} y={GROUND} scale={1.0} frame={f} seed={33} mood={f >= minutes ? 'happy' : 'neutral'} />
          <g opacity={on(f, day95, 8)}>{['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d, k) => <g key={k} opacity={on(f, day95 + k * 3, 6)}><rect x={590 + k * 110} y={GROUND - 80} width={92} height={60} rx={12} fill={k >= 5 ? P.gold : P.card} stroke={P.edge} strokeWidth={3} /><text x={636 + k * 110} y={GROUND - 38} textAnchor="middle" fill={P.ink} style={{ font: '400 36px "Bebas Neue"' }}>{d}</text></g>)}</g>
        </g>
      </g>}

      {/* # B) the price is the interest; other homes earn it but don't travel */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, wanted, 10)}>
          <Person f={f} who="investorF" beats={[[0, 'hold', 'neutral'], [year97, 'shrug', 'neutral']]} x={300} y={GROUND} s={0.8} />
          <CoinHQ x={1640} y={GROUND} s={0.7} sign="COIN COMPANY" />
          {(() => { const fl = fly(f, every97, [760, 470], [1640, 520], 26, 140); return f >= every97 ? <Gold x={fl.x} y={fl.y} r={26} o={fl.t < 1 ? 1 : 0} /> : null })()}
          <SCoin x={760} y={520} s={2.4} />
          <g opacity={on(f, s97, 8)}><rect x={690} y={260} width={140} height={56} rx={14} fill={P.navy3} /><text x={760} y={300} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>2025</text></g>
          <g transform={`translate(1000 ${520 + Math.sin((f - price) / 9) * 6}) rotate(${-8 + Math.sin((f - price) / 11) * 3})`} opacity={on(f, price, 8)}>
            <line x1={-120} y1={0} x2={-20} y2={0} stroke="#8A97AA" strokeWidth={4} />
            <path d="M-20 -70 L260 -70 L260 70 L-20 70 L-60 0 Z" fill={P.paper} stroke={P.edge} strokeWidth={3} />
            <circle cx={-26} cy={0} r={10} fill="#8A97AA" />
            <g opacity={on(f, interest96, 8) * (1 - on(f, d4, 6))}><Gold x={60} y={-14 * Math.abs(Math.sin((f - earned) / 5)) * on(f, earned, 4)} r={36} /><text x={170} y={16} textAnchor="middle" fill={P.navy2} style={{ font: '400 44px "Bebas Neue"' }}>INTEREST</text></g>
            <g opacity={on(f, d4, 6)}><text x={110} y={-6} textAnchor="middle" fill={P.navy2} style={{ font: '400 60px "Bebas Neue"' }}>4¢ / $1</text><text x={110} y={46} textAnchor="middle" fill="#5C6F8E" style={{ font: '400 34px "Bebas Neue"' }}>{f >= year97 ? 'EVERY YEAR' : ''}</text></g>
          </g>
        </g>
        <g opacity={on(f, wanted, 10)}>
          <g opacity={on(f, interest98, 8) * (1 - on(f, savings, 8))}>{[0, 1, 2].map((k) => <Gold key={k} x={520 + k * 120} y={460 - 12 * Math.sin((f - interest98) / 6 + k)} r={26} />)}</g>
          <g opacity={on(f, home, 8) * (1 - on(f, savings, 8))}><path d="M300 900 L300 700 L420 600 L540 700 L540 900 Z" fill="none" stroke={P.ink2} strokeWidth={6} strokeDasharray="14 10" /><text x={420} y={830} textAnchor="middle" fill={P.ink2} style={{ font: '400 90px "Bebas Neue"' }}>?</text></g>
          <Piggy x={420} y={GROUND} s={1.1} o={on(f, savings, 8)} />
          <g opacity={on(f, savings, 8)}><Label x={420} y={GROUND + 70} text="SAVINGS ACCOUNT" size={46} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, bills, 8)}><TBill x={860} y={GROUND - 120} s={0.9} /><Label x={860} y={GROUND + 70} text="TREASURY BILLS" size={46} font="Bebas Neue" color={P.ink} /></g>
          {[0, 1, 2].map((k) => <Gold key={k} x={[420, 860, 640][k]} y={GROUND - 300 - ((f - savings + k * 10) % 30) * 4} r={18} o={on(f, savings + k * 6, 6) * (1 - ((f - savings + k * 10) % 30) / 30)} />)}
          <Globe x={1520} y={560} r={180} o={on(f, cant, 8)} />
          <g opacity={on(f, cant, 8)}><path d="M1000 560 L1300 560" stroke={P.ink2} strokeWidth={8} strokeDasharray="16 12" /><Cross x={1150} y={560} o={on(f, world98, 8)} size={50} /></g>
        </g>
      </g>}

      {/* # C) the rate dial, the two towers, Maya's dollar */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <Dial x={400} y={560} v={dv} label={f < down ? 'INTEREST RATES' : f < d5 ? '' : f < up ? '5% → 4.1%' : 'RATES UP'} o={on(f, business, 10)} />
        {/* # two years of USDC: 2024 and 2025 (almost double), each with its gold slice */}
        <g opacity={on(f, business + 6, 10)}>
          {([[1000, 1, 2024, 0.05], [1300, 1.94, 2025, 0.041]] as [number, number, number, number][]).map(([x, m, y, r], k) => {
            const h = 200 * (k ? lerp(1, m, on(f, usdc101, 24)) : 1), g = h * r * 4 * (f >= up ? 1.25 : 1)
            return <g key={k}>
              <rect x={x - 110} y={GROUND - h} width={220} height={h} rx={14} fill={P.sky} />
              <rect x={x - 110} y={GROUND - h - g} width={220} height={g} rx={8} fill={P.gold} />
              <Label x={x} y={GROUND + 70} text={String(y)} size={52} font="Bebas Neue" color={P.ink} />
            </g> })}
          <g opacity={on(f, circle100, 8)}><rect x={1220} y={260} width={160} height={56} rx={14} fill={P.navy3} /><text x={1300} y={300} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>CIRCLE</text></g>
          <g opacity={on(f, grew, 8)}><path d="M1080 420 L1180 360" stroke={P.mintInk} strokeWidth={10} strokeLinecap="round" /><path d="M1150 352 L1180 360 L1170 390" fill="none" stroke={P.mintInk} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" /></g>
        </g>
        {/* # the holder: one coin, one dollar, whatever the dial says */}
        <g opacity={on(f, holder, 10)}>
          <Person f={f} who="investorF" beats={[[0, 'hold', 'neutral']]} x={1700} y={GROUND} s={0.75} />
          <SCoin x={1700} y={GROUND - 560} s={1.0} o={on(f, one103, 8)} /><g opacity={on(f, coin103, 8)}><Label x={1700} y={GROUND + 70} text="= $1" size={54} font="Bebas Neue" color={P.skyInk} /></g>
        </g>
      </g>}
      <Vignette id="sc-deal" />
    </g>
  )
}

const BEATS = ["s99", "s100:circle", 's94:means', 's94:scam', 's95:give', 's95:useful', 's95:send', 's95:anywhere', 's95:minutes', 's95:day', 's95:week', 's96:price', 's96:interest', 's96:earned', 's97', 's97:4', 's97:year', 's98:wanted', 's98:interest', 's98:home', 's98:savings', 's98:bills', "s98:can't", 's98:world', 's99:business', 's99:rises', 's99:falls', 's100:down', 's100:41', 's100:5', 's101:income', 's101:grew', 's101:usdc', 's101:doubled', 's102:up', 's102:more', 's103:either', 's103:holder', 's103:one', 's103:coin']
export const SC_DEAL = makePiece('sc-deal', 'Stablecoin long ch8: a SCAM? stamp crossed; useful — Maya sends a coin across the globe in minutes, any day of the week; the price tag is the interest (about 4¢ per $1 a year); a savings account and Treasury bills earn interest but cannot travel the same way; a rate dial drives the business — 5% → 4.1%, yet USDC almost doubled so income still grew; rates up, companies earn more; the holder still gets $1 per coin', {
  mood: 'light', Component: Deal, beats: BEATS,
  sfx: [['s94:scam', 'swish', 0.25], ['s95:send', 'whoosh', 0.25], ['s97:4', 'pop', 0.2], ["s98:can't", 'swish', 0.2], ['s100:down', 'thud', 0.25], ['s101:doubled', 'ding', 0.25], ['s103:coin', 'coin', 0.25]] })
