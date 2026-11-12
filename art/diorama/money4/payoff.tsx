// ---------------------------------------------------------------- s85–s94: the payoff (cream).
// A) Back to the room and the dresser with the $100 bill. Four idea cards line up and light on their lines, each with
//    its picture: a $100 tag → $199 (inflation), 0.38% vs 3.7% arrows (real return), a gold snowball with $76,000
//    (compounding), a red snowball doubling in ~3 years (debt).
// B) "Time is a multiplier": the ×TIME dial; cash shrinking on one side, a pile growing on the other, a red pile too.
// C) The drawer again: the bill earned nothing — its real return was minus inflation every year; time worked against it.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win } from '../aimoney/common'
import { DollarBill } from '../bank/kit'
import { CoinTower, Dresser, Room, Snowball, Tag, Window } from './kit'

const GROUND = 930
const CORAL = '#F06B5B'

const Card: React.FC<{ x: number; y: number; n: number; t: string; o: number; lit: number; children: React.ReactNode }> = ({ x, y, n, t, o, lit, children }) => (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${1 + 0.05 * lit})`}>
    <rect x={-190} y={-230} width={380} height={460} rx={26} fill="#FFFFFF" stroke={lit > 0.3 ? P.gold : '#CDB58C'} strokeWidth={lit > 0.3 ? 8 : 4} />
    <circle cx={-140} cy={-180} r={34} fill="#2E5C9A" /><text x={-140} y={-166} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"' }}>{n}</text>
    <text x={20} y={-168} textAnchor="middle" fill="#16294A" style={{ font: '400 44px "Bebas Neue"' }}>{t}</text>
    <g transform="translate(0 40)">{children}</g>
  </g>
)

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const dollars85 = c('s85:dollars'), drawer85 = c('s85:drawer')
  const one86 = c('s86:one'), doubled = c('s86:doubled'), half86 = c('s86:half')
  const two87 = c('s87:two'), p8 = c('s87:8'), losing = c('s87:losing'), earns87 = c('s87:earns'), infl87 = c('s87:inflation'), int88 = c('s88:interest'), k10_88 = c('s88:10000')
  const three88 = c('s88:three'), k76 = c('s88:76000'), p7 = c('s88:7')
  const four89 = c('s89:four'), p21 = c('s89:21'), double89 = c('s89:double')
  const comp88 = c('s88:compounding'), y30_88 = c('s88:30'), ex88 = c('s88:example'), years89 = c('s89:years'), drawer94 = c('s94:drawer'), didnt94 = c("s94:didn't"), prices86 = c('s86:prices'), counts87 = c('s87:counts'), against89 = c('s89:against'), card89 = c('s89:card'), pile91 = c('s91:pile'), sav91 = c('s91:savings'), y2000_86 = c('s86:2000'), bill86 = c('s86:bill'), same90 = c('s90:same'), time90 = c('s90:time'), together = c('s90:together'), multiplier = c('s90:multiplier')
  const shrinking = c('s91:shrinking'), cash91 = c('s91:cash'), growing = c('s91:growing'), debt91 = c('s91:debt')
  const still92 = c('s92:still'), grows92 = c('s92:grows'), inflation92 = c('s92:inflation'), unpaid = c('s92:unpaid')
  const d100 = c('s93:100'), nothing93 = c('s93:nothing'), real93 = c('s93:real'), minus93 = c('s93:minus'), year93 = c('s93:year')
  const wrong = c('s94:wrong'), time94 = c('s94:time'), against94 = c('s94:against')

  const AB = together - 8, BC = d100 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)

  return (
    <g>
      <Stage id="m4-pay" frame={f} />

      {/* # A) four idea cards */}
      {A > 0 && <g opacity={A}>
        <Room ground={GROUND} />
        <g opacity={1 - on(f, one86, 10)}><Window x={1500} y={430} s={1.1} /><Dresser x={820} y={GROUND} s={1.25} open={on(f, drawer85, 12)}><DollarBill x={0} y={-6} s={0.9} t="$100" /></Dresser></g>
        <g opacity={on(f, one86, 10)}>
          <Card x={300} y={560} n={1} t="INFLATION" o={on(f, one86, 8)} lit={win(f, one86, two87, 8)}>
            <g transform={`translate(0 ${-10 * pop(f, y2000_86, 12) - 10 * pop(f, prices86, 12)})`}><Tag x={-80} y={-40} t="$100" s={0.9} /></g><g opacity={win(f, bill86, half86 + 20, 6)}><DollarBill x={110} y={-40} s={0.5} t="$100" /></g><g opacity={on(f, doubled, 8)}><Tag x={-80} y={70} t="$199" s={1.0} col={CORAL} ink="#FFFFFF" /></g>
            <g opacity={on(f, half86, 8)}><text y={170} textAnchor="middle" fill="#C94A3E" style={{ font: '400 40px "Bebas Neue"' }}>BUYS ≈ HALF</text></g></Card>
          <Card x={740} y={560} n={2} t="REAL RETURN" o={on(f, two87, 8)} lit={win(f, two87, three88, 8) + 0.6 * win(f, counts87, counts87 + 16, 4)}>
            <g opacity={on(f, earns87, 8)}><path d="M-80 60 L-80 -10" stroke="#3DDC97" strokeWidth={22} strokeLinecap="round" /><text x={-80} y={110} textAnchor="middle" fill="#1E9A63" opacity={on(f, p8, 8)} style={{ font: '400 40px "Bebas Neue"' }}>0.38%</text></g>
            <g opacity={on(f, infl87, 8)}><path d="M80 60 L80 -100" stroke={CORAL} strokeWidth={22} strokeLinecap="round" /><text x={80} y={110} textAnchor="middle" fill="#C94A3E" style={{ font: '400 40px "Bebas Neue"' }}>PRICES</text></g>
            <g opacity={on(f, losing, 8)}><text y={170} textAnchor="middle" fill="#C94A3E" style={{ font: '400 40px "Bebas Neue"' }}>LOSING GROUND</text></g></Card>
          <Card x={1180} y={560} n={3} t="COMPOUNDING" o={on(f, three88, 8)} lit={win(f, three88, four89, 8) + 0.6 * win(f, comp88, comp88 + 16, 4)}>
            <Snowball x={0} y={120} r={lerp(40, 70, on(f, int88, 16)) + 30 * on(f, k76, 20)} spin={f} />
            <g opacity={on(f, k10_88, 8) * (1 - on(f, k76, 8))}><text y={170} textAnchor="middle" fill="#16294A" style={{ font: '400 44px "Bebas Neue"' }}>$10,000 →</text></g>
            <g opacity={on(f, k76, 8)}><text y={170} textAnchor="middle" fill="#B4821C" style={{ font: '400 44px "Bebas Neue"' }}>≈ $76,000</text></g>
            <g opacity={on(f, y30_88, 8)}><text y={-60} textAnchor="middle" fill="#5C6F8E" style={{ font: '400 36px "Bebas Neue"' }}>{f >= ex88 ? '30 YRS · EXAMPLE 7%' : '30 YRS'}</text></g></Card>
          <Card x={1620} y={560} n={4} t={f >= against89 ? "AGAINST YOU" : "DEBT"} o={on(f, four89, 8)} lit={win(f, four89, together, 8)}>
            <g transform={`translate(0 ${-10 * pop(f, double89, 12) - 10 * pop(f, card89, 12)})`}><CoinTower x={-40} y={120} n={6} red w={90} /><g opacity={on(f, double89, 8)}><CoinTower x={60} y={120} n={12} red w={90} /></g></g>
            <g opacity={on(f, p21, 8)}><text y={170} textAnchor="middle" fill="#C94A3E" style={{ font: '400 40px "Bebas Neue"' }}>{f >= years89 ? '≈ 21%: ×2 IN ~3 YRS' : '≈ 21%'}</text></g></Card>
        </g>
      </g>}

      {/* # B) the multiplier */}
      {B > 0 && <g opacity={B}>
        <rect x={-100} y={GROUND} width={2120} height={300} fill="#D9C7A6" /><rect x={-100} y={GROUND} width={2120} height={10} fill="#BFAE8E" />
        <g transform={`translate(960 600) scale(${1 + 0.08 * win(f, same90, same90 + 20, 6)})`}><circle r={200} fill="#16294A" stroke={P.gold} strokeWidth={10} /><text y={28} textAnchor="middle" fill={P.gold} opacity={on(f, time90, 8)} style={{ font: '400 110px "Bebas Neue"' }}>× TIME</text></g>
        <g opacity={on(f, shrinking, 8)} transform="translate(360 0)"><DollarBill x={0} y={760} s={lerp(1.6, 0.8, span(f, cash91, still92 + 30))} t="$100" /><text x={0} y={GROUND + 60} textAnchor="middle" fill="#C94A3E" style={{ font: '400 46px "Bebas Neue"' }}>CASH SITTING STILL</text></g>
        <g opacity={on(f, growing, 8)} transform="translate(1440 0)"><g transform={`translate(0 ${-12 * pop(f, pile91, 12) - 12 * pop(f, sav91, 12)})`}><CoinTower x={-90} y={GROUND - 20} n={4 + 10 * span(f, grows92, inflation92 + 20)} /></g><g opacity={on(f, debt91, 8)}><CoinTower x={90} y={GROUND - 20} n={4 + 10 * span(f, unpaid, unpaid + 30)} red /></g>
          <text x={-90} y={GROUND + 60} textAnchor="middle" fill="#1E9A63" style={{ font: '400 40px "Bebas Neue"' }}>SAVINGS</text><text x={90} y={GROUND + 60} textAnchor="middle" fill="#C94A3E" opacity={on(f, debt91, 8)} style={{ font: '400 40px "Bebas Neue"' }}>DEBT</text></g>
        <g opacity={on(f, multiplier, 8) * (1 - on(f, shrinking, 8))}><Label x={960} y={900} text="IT CAN WORK EITHER WAY" size={50} font="Bebas Neue" color={P.ink} /></g>
      </g>}

      {/* # C) the drawer, one last time */}
      {C > 0 && <g opacity={C}>
        <Room ground={GROUND} />
        <Window x={1500} y={430} s={1.1} />
        <Dresser x={820} y={GROUND} s={1.25} open={1 - 0.6 * on(f, drawer94, 12)}><g opacity={1 - 0.5 * on(f, didnt94, 10)}><DollarBill x={0} y={-6} s={0.9} t="$100" /></g></Dresser>
        <Person f={f} who="investorF" beats={[[BC, 'idle', 'thinking'], [nothing93, 'shrug', 'thinking'], [wrong, 'think', 'thinking'], [against94, 'present', 'smiling']]} x={330} y={GROUND} s={1.1} />
        <g opacity={on(f, real93, 8)} transform={`translate(1460 ${700 - 12 * pop(f, minus93, 12)})`}><rect x={-230} y={-70} width={460} height={140} rx={24} fill={CORAL} /><text y={22} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 56px "Bebas Neue"' }}>{f >= minus93 ? 'REAL RETURN: − INFLATION' : 'REAL RETURN…'}</text></g>
        <g opacity={on(f, year93, 8)}><Label x={1460} y={840} text="EVERY SINGLE YEAR" size={46} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, time94, 8)} transform="translate(1460 400)"><circle r={70} fill="#16294A" /><text y={16} textAnchor="middle" fill={P.gold} style={{ font: '400 44px "Bebas Neue"' }}>×TIME</text></g>
      </g>}
      <Headline f={f} lines={[[dollars85, 'BACK TO THE DRAWER', P.ink, 108], [one86, 'THE FOUR IDEAS', P.ink, 110], [together, 'TIME IS A MULTIPLIER', P.ink, 110], [d100, 'THE BILL EARNED NOTHING', P.coralInk, 104], [wrong, 'TIME WORKED AGAINST IT', P.coralInk, 104]]} />
      <Vignette id="m4-pay" />
    </g>
  )
}

const BEATS = ['s88:compounding', 's88:30', 's88:example', 's89:years', 's94:drawer', "s94:didn't", 's86:prices', 's87:counts', 's89:against', 's89:card', 's91:pile', 's91:savings', 's86:2000', 's86:bill', 's90:same', 's90:time', 's87:earns', 's87:inflation', 's88:interest', 's88:10000', 's85:dollars', 's85:drawer', 's86:one', 's86:doubled', 's86:half', 's87:two', 's87:8', 's87:losing', 's88:three', 's88:76000', 's88:7', 's89:four', 's89:21', 's89:double', 's90:together', 's90:multiplier', 's91:shrinking', 's91:cash', 's91:growing', 's91:debt', 's92:still', 's92:grows', 's92:inflation', 's92:unpaid', 's93:100', 's93:nothing', 's93:real', 's93:minus', 's93:year', 's94:wrong', 's94:time', 's94:against']
export const M4_PAYOFF = makePiece('m4-payoff', 'Money ideas payoff: the dresser with the $100 bill; four idea cards light in turn — a $100 tag becomes $199 and buys about half, 0.38% vs rising prices losing ground, a growing snowball about $76,000, a red tower doubling at about 21%; a ×TIME dial with cash shrinking on one side and savings and debt towers growing on the other; the drawer again with REAL RETURN: − INFLATION, every single year, time worked against it', {
  mood: 'light', Component: Payoff, beats: BEATS,
  sfx: [['s86:one', 'pop', 0.2], ['s90:multiplier', 'pop', 0.25], ['s93:minus', 'thud', 0.2]] })
