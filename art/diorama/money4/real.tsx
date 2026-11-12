// ---------------------------------------------------------------- s26–s44: idea two, the real return (navy).
// A) Ava drops ten $1,000 bricks into a SAVINGS jar; OCTOBER 2026; the jar's label reads 0.38%; one brick lifts out
//    ("just 1,000 dollars").
// B) Two lifts side by side: AVA'S $1,000 rises a tiny step to $1,003.80 (she cheers), THE BASKET rises a big step to
//    $1,037; arrows +$4 vs +$37; the basket buys ≈ 3% less; a middle lift for the average 12-month CD (≈ 1.76%) stops
//    below the basket.
// C) Nominal vs real: a phone screen says +0.38% (NOMINAL); the basket-adjusted arrow says ≈ −3% (REAL); the shortcut
//    equation 0.38% − 3.7% ≈ −3% builds piece by piece; up arrow = buying power grows, down arrow = it shrinks.
// D) Example: 5% − 3% ≈ +2% in green.
// E) Ava's phone balance ticks up while the basket she can afford shrinks: looks safe, still losing ground.
// F) Recap: a sign "WHAT DOES IT EARN AFTER INFLATION?".
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { BankPhone, CalPage, CashBrick } from '../bank/kit'
import { Basket } from './kit'

const GROUND = 930
const MINT = '#3DDC97', CORAL = '#F06B5B'

// # a lift platform (a stage on a column) whose top sits at y
const Lift: React.FC<{ x: number; top: number; label: string; col: string; o?: number; children?: React.ReactNode }> = ({ x, top, label, col, o = 1, children }) => (
  <g opacity={o}>
    <rect x={x - 26} y={top} width={52} height={GROUND - top} fill="#2B4A78" />
    <rect x={x - 150} y={top - 18} width={300} height={22} rx={8} fill={col} />
    <g transform={`translate(${x} ${top - 18})`}>{children}</g>
    <text x={x} y={GROUND + 60} textAnchor="middle" fill="#F0EAE1" style={{ font: '400 44px "Bebas Neue"' }}>{label}</text>
  </g>
)
// # a token in the shortcut equation
const Tok: React.FC<{ x: number; y: number; t: string; col: string; o?: number; w?: number }> = ({ x, y, t, col, o = 1, w = 260 }) => (
  <g opacity={o} transform={`translate(${x} ${y})`}><rect x={-w / 2} y={-60} width={w} height={120} rx={24} fill={col} /><text y={22} textAnchor="middle" fill="#0E1B33" style={{ font: '400 66px "Bebas Neue"' }}>{t}</text></g>
)

const Real: React.FC<PieceProps> = ({ f, c }) => {
  const real26 = c('s26:real')
  const ava27 = c('s27:ava'), k10 = c('s27:10000'), keep27 = c('s27:keep'), safe27 = c('s27:safe'), savings27 = c('s27:savings')
  const october = c('s28:october'), average28 = c('s28:average'), p8 = c('s28:8'), year28 = c('s28:year')
  const look29 = c('s29:look'), k1000 = c('s29:1000'), small29 = c('s29:small')
  const paid28 = c('s28:paid'), year35 = c('s35:year'), wasnt36 = c("s36:wasn't"), k1000_30 = c('s30:1000'), z30 = c('s30:0'), pct30 = c('s30:percent'), after30 = c('s30:after'), d1003 = c('s30:1003'), cents30 = c('s30:cents')
  const balance31 = c('s31:balance'), up31 = c('s31:up'), winning = c('s31:winning')
  const same32 = c('s32:same'), basket32 = c('s32:basket'), p7 = c('s32:7'), expensive = c('s32:expensive')
  const things33 = c('s33:things'), ago33 = c('s33:ago'), d1037 = c('s33:1037')
  const grew34 = c('s34:grew'), d4 = c('s34:4'), things34 = c('s34:things'), d37 = c('s34:37')
  const simply35 = c('s35:simply'), p3 = c('s35:3'), less35 = c('s35:less')
  const plain36 = c('s36:plain'), cd = c('s36:cd'), p6 = c('s36:6'), below = c('s36:below'), inflation36 = c('s36:inflation')
  const real37 = c('s37:real'), earns37 = c('s37:earns'), taken37 = c('s37:taken')
  const screen38 = c('s38:screen'), nominal = c('s38:nominal'), real38 = c('s38:real'), buy38 = c('s38:buy')
  const shortcut = c('s39:shortcut'), interest39 = c('s39:interest'), subtract = c('s39:subtract'), inflation39 = c('s39:inflation')
  const p8b = c('s40:8'), minus40 = c('s40:minus'), p7b = c('s40:7'), roughly40 = c('s40:roughly'), minus40b = c('s40:minus#2'), p3c = c('s40:3#3')
  const positive = c('s41:positive'), grows41 = c('s41:grows'), negative = c('s41:negative'), shrinks = c('s41:shrinks'), balance41 = c('s41:balance')
  const example = c('s42:example'), p5 = c('s42:5'), rise42 = c('s42:rise'), p3d = c('s42:3'), gains = c('s42:gains'), p2 = c('s42:2'), power42 = c('s42:power')
  const bank43 = c('s43:bank'), safe43 = c('s43:safe'), losing = c('s43:losing')
  const step44 = c('s44:step'), ask44 = c('s44:ask'), inflation44 = c('s44:inflation'), number44 = c('s44:number')

  const AB = after30 - 8, BC = real37 - 8, CD = example - 8, DE = bank43 - 8, EF = step44 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cw = win(f, BC, CD), D = win(f, CD, DE), E = win(f, DE, EF), F = on(f, EF, 10)
  // # B) the lifts: money rises 3.8 → 23 px, basket 37 → 222 px, CD 17.6 → 106 px (6 px per dollar)
  const base = 760
  const moneyTop = base - 6 * 3.8 * on(f, d1003, 16)
  const basketTop = base - 6 * 37.2 * on(f, d1037, 24)
  const cdTop = base - 6 * 17.6 * on(f, p6, 20)

  return (
    <g>
      <Stage id="m4-real" frame={f} />
      <Headline f={f} lines={[[real26, 'IDEA 2: THE REAL RETURN', P.ink, 106], [october, 'SAVINGS PAID ≈ 0.38%', P.ink, 104], [after30, 'ONE YEAR LATER…', P.ink, 106], [same32, 'PRICES ROSE ≈ 3.7%', P.coralInk, 104], [simply35, 'SHE CAN BUY ≈ 3% LESS', P.coralInk, 104], [real37, 'REAL RETURN = AFTER INFLATION', P.ink, 96], [shortcut, 'THE SHORTCUT', P.ink, 110], [example, 'EXAMPLE: 5% − 3% ≈ +2%', P.mintInk, 104], [bank43, 'LOOKS SAFE, LOSES GROUND', P.coralInk, 100], [step44, 'ASK: AFTER INFLATION?', P.ink, 106]]} />

      {/* # A) the savings jar */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} dark />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [k10, 'present', 'smiling'], [keep27, 'offer', 'smiling'], [look29, 'point', 'smiling']]} x={330} y={GROUND} s={1.1} />
        {/* ten bricks: a stack beside her, then into the jar */}
        {Array.from({ length: 10 }, (_, k) => { const t = span(f, keep27 + k * 2, keep27 + k * 2 + 16), sx = 560, sy = GROUND - 20 - k * 40, jx = 1000 + (k % 2) * 120 - 60, jy = 860 - Math.floor(k / 2) * 44
          const lift = k === 9 ? on(f, k1000, 14) : 0
          return <g key={k} opacity={on(f, k10 + k, 4)}><CashBrick x={lerp(sx, jx, t) + lift * 360} y={lerp(sy, jy, t) - Math.sin(t * Math.PI) * 120 - lift * 200} s={1.1} /></g> })}
        <g opacity={on(f, savings27, 8)}>
          <rect x={840} y={560 - 10 * pop(f, paid28, 12)} width={320} height={360} rx={40} fill="#DDEBF7" opacity={0.25} stroke="#A9C4DE" strokeWidth={6} />
          <rect x={860} y={520} width={280} height={50} rx={14} fill="#2E5C9A" /><text x={1000} y={557} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>{f >= p8 ? 'SAVINGS · 0.38%' : 'SAVINGS'}</text>
        </g>
        <g opacity={on(f, october, 8)} transform={`translate(1520 ${420 - 10 * pop(f, october, 12)})`}><CalPage x={0} y={0} s={0.85} m="OCTOBER" d={f >= c('s28:2026') ? '2026' : ''} /></g>
        <g opacity={on(f, k10, 8)}><Label x={560} y={GROUND + 64} text="$10,000" size={50} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, k1000, 8)}><Label x={1420} y={760} text="JUST $1,000" size={50} font="Bebas Neue" color={P.goldInk} /></g>
      </g>}

      {/* # B) the lifts */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} dark />
        <Lift x={420} top={moneyTop} label="AVA'S MONEY" col={MINT}>
          <g transform={`scale(${1 + 0.12 * win(f, k1000_30, k1000_30 + 20, 6)})`}><CashBrick x={0} y={-4} s={1.4} /></g>
          <g opacity={on(f, z30, 8)} transform={`translate(190 -40) scale(${1 + 0.1 * win(f, pct30, pct30 + 20, 6)})`}><rect x={-80} y={-34} width={160} height={68} rx={34} fill="#3DDC97" /><text y={14} textAnchor="middle" fill="#0E1B33" style={{ font: '400 40px "Bebas Neue"' }}>0.38%</text></g>
          <text y={-70} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 54px "Bebas Neue"' }}>{f >= d1003 ? (f >= cents30 ? '$1,003.80' : '$1,003…') : '$1,000'}</text>
        </Lift>
        <g opacity={on(f, basket32, 10)}><Lift x={1460} top={basketTop} label="THE BASKET" col={CORAL}>
          <Basket x={0} y={-30} s={0.75} shown={10 - Math.round(3 * on(f, year35, 10)) + Math.round(3 * on(f, wasnt36, 10))} />
          <text y={-210} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 54px "Bebas Neue"' }}>{f >= d1037 ? '$1,037' : '$1,000'}</text>
        </Lift></g>
        <g opacity={on(f, cd, 10)}><Lift x={940} top={cdTop} label="12-MONTH CD" col={P.gold}>
          <text y={-24} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>{f >= p6 ? '≈ 1.76%' : '…'}</text>
        </Lift></g>
        <Person f={f} who="investorF" beats={[[AB, 'idle', 'smiling'], [up31, 'celebrate', 'smiling'], [same32, 'idle', 'thinking'], [d1037, 'shock', 'shocked'], [less35, 'despair', 'worried']]} x={140} y={GROUND} s={0.95} />
        <g opacity={on(f, d4, 8)}><Label x={420} y={moneyTop - 210} text="+$4" size={64} font="Bebas Neue" color={P.mintInk} /></g>
        <g opacity={on(f, d37, 8)}><Label x={1700} y={basketTop - 60} text="+$37" size={72} font="Bebas Neue" color={P.coralInk} /></g>
        <g opacity={on(f, below, 8)}><line x1={760} y1={basketTop - 18} x2={1310} y2={basketTop - 18} stroke={CORAL} strokeWidth={4} strokeDasharray="12 10" /><Label x={940} y={basketTop - 40} text="STILL BELOW" size={44} font="Bebas Neue" color={P.coralInk} /></g>
      </g>}

      {/* # C) nominal vs real; the shortcut; up vs down */}
      {Cw > 0 && <g opacity={Cw}>
        <Ground y={GROUND} dark />
        <g opacity={1 - on(f, shortcut, 10)}>
          <g opacity={on(f, screen38, 8)}><BankPhone x={520} y={600} s={1.0} amount="+0.38%" sub="YOUR BALANCE" /><Label x={520} y={GROUND + 60} text="NOMINAL" size={54} font="Bebas Neue" color={P.ink} o={on(f, nominal, 8)} /></g>
          <g opacity={on(f, real38, 8)} transform="translate(1400 0)"><Basket x={0} y={700} s={1.2} shown={Math.round(10 - 3 * on(f, buy38, 20))} />
            <path d="M0 260 L0 380 M-40 340 L0 380 L40 340" stroke={CORAL} strokeWidth={14} strokeLinecap="round" fill="none" /><Label x={0} y={GROUND + 60} text="REAL: ≈ −3%" size={54} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, real37, 8) * (1 - on(f, screen38, 8))}><Label x={960} y={560} text="WHAT YOUR MONEY EARNS" size={60} font="Bebas Neue" color={P.ink} /><Label x={960} y={640} text={f >= taken37 ? 'AFTER INFLATION IS TAKEN OUT' : 'AFTER INFLATION…'} size={60} font="Bebas Neue" color={P.coralInk} o={on(f, c('s37:after'), 8)} /></g>
        </g>
        <g opacity={on(f, shortcut, 10) * (1 - on(f, positive, 10))}>
          <Tok x={420} y={560} t={f >= p8b ? '0.38%' : 'INTEREST'} col={MINT} o={on(f, interest39, 8)} />
          <text x={660} y={585} textAnchor="middle" fill="#FFFFFF" opacity={on(f, subtract, 8)} style={{ font: '400 110px "Bebas Neue"' }}>−</text>
          <Tok x={900} y={560} t={f >= p7b ? '3.7%' : 'INFLATION'} col={CORAL} o={on(f, inflation39, 8)} />
          <text x={1140} y={585} textAnchor="middle" fill="#FFFFFF" opacity={on(f, roughly40, 8)} style={{ font: '400 110px "Bebas Neue"' }}>≈</text>
          <Tok x={1420} y={560} t="−3%" col="#C2B9B1" o={on(f, p3c, 8)} w={240} />
          <g opacity={on(f, minus40b, 8)}><Label x={1420} y={700} text="REAL RETURN" size={48} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, positive, 10)}>
          <g transform="translate(560 0)"><path d={`M0 760 L0 ${760 - 300 * on(f, grows41, 16)}`} stroke={MINT} strokeWidth={30} strokeLinecap="round" /><path d="M-60 0 L0 -70 L60 0 Z" transform={`translate(0 ${740 - 300 * on(f, grows41, 16)})`} fill={MINT} />
            <Label x={0} y={GROUND + 60} text="POSITIVE: BUYING POWER GROWS" size={44} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, negative, 8)} transform="translate(1360 0)"><path d={`M0 420 L0 ${420 + 300 * on(f, shrinks, 16)}`} stroke={CORAL} strokeWidth={30} strokeLinecap="round" /><path d="M-60 0 L0 70 L60 0 Z" transform={`translate(0 ${440 + 300 * on(f, shrinks, 16)})`} fill={CORAL} />
            <Label x={0} y={GROUND + 60} text="NEGATIVE: IT SHRINKS" size={44} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, balance41, 8)} transform="translate(1600 520)"><BankPhone x={0} y={0} s={0.6} amount="↑" sub="BALANCE" /></g>
        </g>
      </g>}

      {/* # D) a positive example */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} dark />
        <Tok x={420} y={560} t="5%" col={MINT} o={on(f, p5, 8)} />
        <text x={660} y={585} textAnchor="middle" fill="#FFFFFF" opacity={on(f, rise42, 8)} style={{ font: '400 110px "Bebas Neue"' }}>−</text>
        <Tok x={900} y={560} t="3%" col={CORAL} o={on(f, p3d, 8)} />
        <text x={1140} y={585} textAnchor="middle" fill="#FFFFFF" opacity={on(f, gains, 8)} style={{ font: '400 110px "Bebas Neue"' }}>≈</text>
        <Tok x={1420} y={560} t="+2%" col={MINT} o={on(f, p2, 8)} w={240} />
        <g opacity={on(f, power42, 8)}><Label x={1420} y={700} text="MORE REAL BUYING POWER" size={44} font="Bebas Neue" color={P.mintInk} /></g>
        <Label x={420} y={700} text="EARNS" size={44} font="Bebas Neue" color={P.ink2} o={on(f, p5, 8)} /><Label x={900} y={700} text="PRICES RISE" size={44} font="Bebas Neue" color={P.ink2} o={on(f, p3d, 8)} />
      </g>}

      {/* # E) looks safe, losing ground */}
      {E > 0 && <g opacity={E}>
        <Ground y={GROUND} dark />
        <Person f={f} who="investorF" beats={[[DE, 'phone', 'smiling'], [losing, 'phone', 'worried']]} x={380} y={GROUND} s={1.1} />
        <BankPhone x={760} y={560} s={1.0} amount={`$${(1000 + 3.8 * span(f, bank43, ground(c))).toFixed(2)}`} sub="SAVINGS" pulse={win(f, safe43, safe43 + 20, 6)} />
        <g transform="translate(1400 0)"><Basket x={0} y={800} s={1.6} shown={Math.round(10 - 4 * span(f, safe43, ground(c) + 20))} /><Label x={0} y={GROUND + 60} text="WHAT IT CAN BUY" size={48} font="Bebas Neue" color={P.coralInk} /></g>
      </g>}

      {/* # F) the question to ask */}
      {F > 0 && <g opacity={F}>
        <Ground y={GROUND} dark />
        <Person f={f} who="investorF" beats={[[EF, 'idle', 'thinking'], [ask44, 'pointUp', 'thinking']]} x={420} y={GROUND} s={1.1} />
        <g opacity={on(f, ask44, 8)} transform={`translate(1150 ${560 - 12 * pop(f, inflation44, 12)})`}>
          <rect x={-380} y={-130} width={760} height={260} rx={30} fill="#F2E6CC" /><rect x={-14} y={130} width={28} height={240} fill="#8E5B3A" />
          <text y={-30} textAnchor="middle" fill="#16294A" style={{ font: '400 64px "Bebas Neue"' }}>WHAT DOES IT EARN</text>
          <text y={56} textAnchor="middle" fill="#C94A3E" opacity={on(f, inflation44, 8)} style={{ font: '400 72px "Bebas Neue"' }}>AFTER INFLATION?</text>
        </g>
        <g opacity={on(f, number44, 8)}><Label x={1150} y={GROUND + 60} text="NOT JUST THE NUMBER ON THE SCREEN" size={42} font="Bebas Neue" color={P.ink2} /></g>
      </g>}
      <Vignette id="m4-real" />
    </g>
  )
}
const ground = (c: PieceProps['c']) => c('s43:ground')

const BEATS = ['s28:paid', 's35:year', "s36:wasn't", 's30:1000', 's30:0', 's30:percent', 's26:real', 's27:ava', 's27:10000', 's27:keep', 's27:safe', 's27:savings', 's28:october', 's28:2026', 's28:average', 's28:8', 's28:year', 's29:look', 's29:1000', 's29:small', 's30:after', 's30:1003', 's30:cents', 's31:balance', 's31:up', 's31:winning', 's32:same', 's32:basket', 's32:7', 's32:expensive', 's33:things', 's33:ago', 's33:1037', 's34:grew', 's34:4', 's34:things', 's34:37', 's35:simply', 's35:3', 's35:less', 's36:plain', 's36:cd', 's36:6', 's36:below', 's36:inflation', 's37:real', 's37:earns', 's37:after', 's37:taken', 's38:screen', 's38:nominal', 's38:real', 's38:buy', 's39:shortcut', 's39:interest', 's39:subtract', 's39:inflation', 's40:8', 's40:minus', 's40:7', 's40:roughly', 's40:minus#2', 's40:3#3', 's41:positive', 's41:grows', 's41:negative', 's41:shrinks', 's41:balance', 's42:example', 's42:5', 's42:rise', 's42:3', 's42:gains', 's42:2', 's42:power', 's43:bank', 's43:safe', 's43:losing', 's43:ground', 's44:step', 's44:ask', 's44:inflation', 's44:number']
export const M4_REAL = makePiece('m4-real', 'Idea two, the real return (navy): Ava drops ten $1,000 bricks into a savings jar paying 0.38% (October 2026) and lifts out one; two lifts — her $1,000 rises a tiny step to $1,003.80 while the basket’s lift rises to $1,037 (+$4 vs +$37), she can buy about 3% less; a 12-month CD lift at 1.76% stops still below the basket; nominal (+0.38% on the phone) vs real (about −3%, basket shrinks); the shortcut 0.38% − 3.7% ≈ −3%; green up arrow vs red down arrow; example 5% − 3% ≈ +2%; the phone balance ticks up while the affordable basket shrinks; a signpost: what does it earn after inflation?', {
  mood: 'dark', Component: Real, beats: BEATS,
  sfx: [['s30:1003', 'coin', 0.15], ['s33:1037', 'thud', 0.2], ['s35:less', 'thud', 0.2], ['s40:3#3', 'pop', 0.2], ['s42:2', 'pop', 0.2]] })
