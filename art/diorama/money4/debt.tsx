// ---------------------------------------------------------------- s70–s84: idea four, compounding against you (navy).
// A) The same snowball, now red, rolling the other way (savings ↔ debt); a credit card shows ≈ 21% APR (August 2026,
//    American banks) with a label "ANNUAL PERCENTAGE RATE".
// B) Every single day: a strip of 365 small day-boxes; APR ÷ 365; each day's interest drops onto the balance and
//    tomorrow's is charged on it too (two coins, the second smaller, feeding a growing stack).
// C) Ava's $1,000 card balance with NO PAYMENTS: a red tower grows to ≈ $1,236 (not $1,212 — a ghost line marks the
//    simple figure); "TRUE YEARLY COST ≈ 23.6%"; then year 2 ≈ $1,528 and year 3 ≈ $1,888.
// D) Rule of 72 again: 72 ÷ 21 ≈ 3.5 → the balance doubles in a bit over 3 years (two red bricks).
// E) Same maths, other way: the gold snowball and the red one side by side; Ava pays down — coins leave the red tower.
// F) Recap: a multiplier dial that points at SAVINGS or DEBT.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Label, Person, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { CalPage, CashBrick } from '../bank/kit'
import { CoinTower, CreditCard, Snowball } from './kit'

const GROUND = 930
const CORAL = '#F06B5B'

// # the red debt snowball (a tinted snowball)
const RedBall: React.FC<{ x: number; y: number; r: number; spin?: number; o?: number }> = ({ x, y, r, spin = 0, o = 1 }) => (
  <g opacity={o} transform={`translate(${x} ${y - r})`}><circle r={r} fill="#F2A79C" stroke={CORAL} strokeWidth={5} /><g transform={`rotate(${spin})`}>{[0, 1, 2].map((k) => <circle key={k} cx={Math.cos(k * 2.1) * r * 0.5} cy={Math.sin(k * 2.1) * r * 0.5} r={r * 0.13} fill="#E98A7D" />)}</g></g>
)

const Debt: React.FC<PieceProps> = ({ f, c }) => {
  const against70 = c('s70:against')
  const everything = c('s71:everything'), great = c('s71:great'), savings71 = c('s71:savings'), painful = c('s71:painful'), debt71 = c('s71:debt')
  const august = c('s72:august'), credit72 = c('s72:credit'), american = c('s72:american'), charged72 = c('s72:charged'), p21 = c('s72:21')
  const apr73 = c('s73:apr'), annual = c('s73:annual'), rate73 = c('s73:rate')
  const many74 = c('s74:many'), every74 = c('s74:every'), day74 = c('s74:day'), apr74 = c('s74:apr'), divide74 = c('s74:divide'), d365 = c('s74:365'), charge74 = c('s74:charge'), balance74 = c('s74:balance')
  const tomorrows = c("s75:tomorrow's"), todays = c("s75:today's"), interest75b = c('s75:interest#2')
  const ava76 = c('s76:ava'), owes76 = c('s76:owes'), k1000 = c('s76:1000'), card76 = c('s76:card'), p21b = c('s76:21'), no76 = c('s76:no'), whole = c('s76:whole')
  const added = c('s77:added'), day77 = c('s77:day'), owe77 = c('s77:owe'), d1236 = c('s77:1236'), not77 = c('s77:not'), d1212 = c('s77:1212')
  const true78 = c('s78:true'), cost78 = c('s78:cost'), d23 = c('s78:23'), p6 = c('s78:6'), label78 = c('s78:label')
  const daily83 = c('s83:daily'), number73 = c('s73:number'), more78 = c('s78:more'), l21_78 = c('s78:21'), comp84 = c('s84:compounding'), care84 = c('s84:care'), pay79 = c('s79:payments'), k1000_79 = c('s79:1000'), going = c('s79:going'), d1528 = c('s79:1528'), two79 = c('s79:two'), d1888 = c('s79:1888'), three79 = c('s79:three')
  const rule80 = c('s80:rule'), d72b = c('s80:72#2'), d21c = c('s80:21'), half80 = c('s80:half')
  const alone = c('s81:alone'), balance81 = c('s81:balance'), doubles = c('s81:doubles'), years81 = c('s81:years')
  const same82 = c('s82:same'), savings82 = c("s82:ava's"), other82 = c('s82:other')
  const reverse = c('s83:reverse'), pays83 = c('s83:pays'), down83 = c('s83:down'), paid83 = c('s83:paid'), grow83 = c('s83:grow')
  const step84 = c('s84:step'), savings84 = c('s84:savings'), debt84 = c('s84:debt'), multiplies = c('s84:multiplies'), given = c('s84:given')

  const AB = many74 - 8, BC = ava76 - 8, CD = rule80 - 8, DE = same82 - 8, EF = step84 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cw = win(f, BC, CD), D = win(f, CD, DE), E = win(f, DE, EF), F = on(f, EF, 10)
  // # C) the debt tower: 1,000 → 1,236 → 1,528 → 1,888 (0.11 px per dollar above the $1,000 base of 10 coins)
  const owed = 1000 + 236 * on(f, d1236, 20) + 292 * on(f, d1528, 20) + 360 * on(f, d1888, 20)

  return (
    <g>
      <Stage id="m4-debt" frame={f} />
      <Headline f={f} lines={[[against70, 'IDEA 4: COMPOUNDING AGAINST YOU', P.coralInk, 96], [august, 'CARDS: ≈ 21% A YEAR (APR)', P.ink, 100], [many74, 'INTEREST, EVERY SINGLE DAY', P.ink, 100], [ava76, '$1,000 ON A CARD, NO PAYMENTS', P.ink, 96], [true78, 'TRUE YEARLY COST ≈ 23.6%', P.coralInk, 104], [rule80, 'RULE OF 72, AGAIN', P.ink, 106], [same82, 'SAME MATHS, OTHER WAY', P.ink, 106], [step84, 'IT MULTIPLIES WHATEVER IT GETS', P.ink, 96]]} />

      {/* # A) the red snowball; the card's APR */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} dark />
        <g opacity={1 - on(f, credit72, 10)}>
          <g opacity={on(f, great, 8)}><Snowball x={560} y={GROUND} r={lerp(60, 150, on(f, savings71, 20))} spin={f} /><Label x={560} y={GROUND + 60} text="SAVINGS" size={50} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, painful, 8)}><RedBall x={1360} y={GROUND} r={lerp(60, 150, on(f, debt71, 20))} spin={-f} /><Label x={1360} y={GROUND + 60} text="DEBT" size={50} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        <g opacity={on(f, credit72, 10)}>
          <g transform={`translate(760 ${560 - 12 * pop(f, p21, 12)})`}><CreditCard x={0} y={0} s={1.6} r={-6} /></g>
          <g transform="translate(1400 0)"><CalPage x={0} y={420} s={0.85} m="AUGUST" d={f >= c('s72:2026') ? '2026' : ''} /></g>
          <g opacity={on(f, p21, 8)} transform={`translate(1400 ${700 - 12 * pop(f, apr73, 12) - 12 * pop(f, number73, 12)})`}><rect x={-170} y={-70} width={340} height={140} rx={24} fill={CORAL} /><text y={20} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 74px "Bebas Neue"' }}>{f >= apr73 ? '≈ 21% APR' : '≈ 21%'}</text></g>
          <g opacity={on(f, annual, 8)}><Label x={1400} y={840} text={f >= rate73 ? 'ANNUAL PERCENTAGE RATE' : 'ANNUAL…'} size={44} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, american, 8)}><Label x={760} y={820} text="AVERAGE AT AMERICAN BANKS" size={42} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>}

      {/* # B) every single day */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} dark />
        {/* 365 small day-boxes in a grid (19 × 20 minus 15), lighting up */}
        <g opacity={on(f, every74, 8)} transform="translate(180 260)">{Array.from({ length: 365 }, (_, k) => <rect key={k} x={(k % 37) * 22} y={Math.floor(k / 37) * 22} width={18} height={18} rx={3} fill={k < 365 * span(f, day74, balance74) ? CORAL : '#2B4A78'} />)}
          <Label x={407} y={-20} text={f >= d365 ? 'APR ÷ 365 = A DAILY RATE' : f >= divide74 ? 'APR ÷ …' : '365 DAYS'} size={48} font="Bebas Neue" color={P.ink} /></g>
        <g transform="translate(1500 0)">
          <CoinTower x={0} y={GROUND - 20} n={10 + 6 * span(f, charge74, interest75b + 20)} red />
          <Label x={0} y={GROUND + 60} text="BALANCE" size={46} font="Bebas Neue" color={P.coralInk} o={on(f, balance74, 8)} />
          {[0, 1].map((k) => { const at = k === 0 ? todays : interest75b, t = span(f, at, at + 18); return t > 0 && t < 1 ? <Coin key={k} x={lerp(1260 - 1500, 0, t)} y={lerp(600, GROUND - 200, t) - Math.sin(t * Math.PI) * 80} s={k === 0 ? 0.9 : 0.6} /> : null })}
          <g opacity={on(f, tomorrows, 8)}><Label x={-280} y={560} text="INTEREST ON INTEREST" size={44} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
      </g>}

      {/* # C) Ava's $1,000 balance */}
      {Cw > 0 && <g opacity={Cw}>
        <Ground y={GROUND} dark />
        <Person f={f} who="investorF" beats={[[BC, 'idle', 'neutral'], [owes76, 'holdUp', 'neutral'], [no76, 'crossNoA', 'neutral'], [d1236, 'shock', 'shocked'], [d1888, 'despair', 'worried']]} x={330} y={GROUND} s={1.1} />
        <g opacity={on(f, card76, 8)}><CreditCard x={720} y={420} s={0.8} r={-8} /></g>
        <g opacity={on(f, no76, 8)} transform={`translate(720 600) scale(${1 + 0.15 * win(f, pay79, pay79 + 20, 6)})`}><rect x={-160} y={-40} width={320} height={80} rx={40} fill="#2B4A78" /><text y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"' }}>NO PAYMENTS</text></g>
        <g transform="translate(1320 0)" opacity={on(f, k1000, 8)}>
          <g transform={`translate(0 ${-14 * pop(f, k1000_79, 12)})`}><CoinTower x={0} y={GROUND - 20} n={10 + (owed - 1000) * 0.03} red w={160} /></g>
          <Label x={0} y={GROUND + 60} text="WHAT AVA OWES" size={44} font="Bebas Neue" color={P.ink} />
          <Label x={140} y={GROUND - 20 - 16 * (9 + (owed - 1000) * 0.03) - 10} text={owed >= 1887 ? '≈ $1,888' : owed >= 1527 ? '≈ $1,528' : owed > 1001 ? '≈ $1,236' : '$1,000'} size={60} font="Bebas Neue" color={P.coralInk} anchor="start" />
          <g opacity={win(f, not77, d1528, 8)}><line x1={-120} y1={GROUND - 20 - 16 * (9 + 212 * 0.03)} x2={120} y2={GROUND - 20 - 16 * (9 + 212 * 0.03)} stroke="#C2B9B1" strokeWidth={4} strokeDasharray="10 8" />
            <Label x={-140} y={GROUND - 10 - 16 * (9 + 212 * 0.03)} text={f >= d1212 ? 'NOT $1,212' : 'NOT…'} size={44} font="Bebas Neue" color={P.ink2} anchor="end" /></g>
          <g opacity={on(f, two79, 8)}><Label x={-160} y={GROUND - 20 - 16 * (9 + 528 * 0.03)} text="2 YEARS" size={40} font="Bebas Neue" color={P.ink2} anchor="end" /></g>
          <g opacity={on(f, three79, 8)}><Label x={-160} y={GROUND - 20 - 16 * (9 + 888 * 0.03)} text="3 YEARS" size={40} font="Bebas Neue" color={P.ink2} anchor="end" /></g>
        </g>
        <g opacity={on(f, d23, 8) * (1 - on(f, going, 8))} transform="translate(720 780)"><rect x={-230} y={-60} width={460} height={120} rx={20} fill={CORAL} /><text y={22} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 64px "Bebas Neue"' }}>{f >= p6 ? '≈ 23.6% A YEAR' : '≈ 23…'}</text></g>
        <g opacity={on(f, more78, 8) * (1 - on(f, going, 8))}><path d="M600 862 L840 862" stroke="#C2B9B1" strokeWidth={5} /></g>
        <g opacity={on(f, l21_78, 8) * (1 - on(f, going, 8))}><Label x={720} y={900} text="VS 21% ON THE LABEL" size={42} font="Bebas Neue" color={P.ink2} /></g>
      </g>}

      {/* # D) rule of 72 */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} dark />
        <g transform={`translate(960 ${420 - 10 * pop(f, d72b, 12)})`}><rect x={-380} y={-90} width={760} height={180} rx={30} fill="#F2E6CC" />
          <text y={32} textAnchor="middle" fill="#16294A" style={{ font: '400 96px "Bebas Neue"' }}>{f >= half80 ? '72 ÷ 21 ≈ 3.5' : f >= d21c ? '72 ÷ 21…' : '72 ÷ …'}</text></g>
        <g opacity={on(f, balance81, 8)} transform="translate(960 0)"><CashBrick x={-170} y={GROUND - 20} s={2.4} /><g opacity={on(f, doubles, 10)}><CashBrick x={170} y={GROUND - 20} s={2.4} /></g>
          <Label x={0} y={GROUND - 120} text={f >= years81 ? 'DOUBLES IN A BIT OVER 3 YEARS' : f >= doubles ? 'DOUBLES…' : 'LEFT ALONE'} size={52} font="Bebas Neue" color={P.coralInk} /></g>
      </g>}

      {/* # E) same maths, other way; paying down */}
      {E > 0 && <g opacity={E}>
        <Ground y={GROUND} dark />
        <g opacity={1 - on(f, reverse, 10)}>
          <Snowball x={560} y={GROUND} r={140} spin={f * 2} /><Label x={560} y={GROUND + 60} text="AVA'S SAVINGS" size={46} font="Bebas Neue" color={P.mintInk} o={on(f, savings82, 8)} />
          <g opacity={on(f, other82, 8)}><RedBall x={1360} y={GROUND} r={140} spin={-f * 2} /><Label x={1360} y={GROUND + 60} text="A CARD BALANCE" size={46} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        <g opacity={on(f, reverse, 10)}>
          <Person f={f} who="investorF" beats={[[reverse, 'idle', 'smiling'], [pays83, 'offer', 'smiling'], [grow83, 'thumbsUp', 'smiling']]} x={420} y={GROUND} s={1.1} />
          <g transform="translate(1300 0)"><CoinTower x={0} y={GROUND - 20} n={22 - 12 * span(f, down83, grow83 + 10)} red w={160} />
            <Label x={0} y={GROUND + 60} text="BALANCE SHRINKS" size={46} font="Bebas Neue" color={P.mintInk} o={on(f, paid83, 8)} />
            <Label x={0} y={300} text="LESS LEFT FOR DAILY INTEREST" size={44} font="Bebas Neue" color={P.ink} o={on(f, daily83, 8)} /></g>
          {f >= down83 && Array.from({ length: 3 }, (_, k) => { const u = ((f - down83) / 30 + k / 3) % 1; return <Coin key={k} x={lerp(560, 1260, u)} y={560 - Math.sin(u * Math.PI) * 120} s={0.8} o={Math.sin(u * Math.PI)} /> })}
        </g>
      </g>}

      {/* # F) the multiplier dial */}
      {F > 0 && <g opacity={F}>
        <Ground y={GROUND} dark />
        <g opacity={on(f, comp84, 10)} transform="translate(960 640)">
          <circle r={230} fill="#16294A" stroke={P.gold} strokeWidth={10} />
          <text y={-100} textAnchor="middle" fill={P.gold} style={{ font: '400 64px "Bebas Neue"' }}>× TIME</text>
          <g transform={`rotate(${-50 + 20 * Math.sin(f / 4) * win(f, care84, care84 + 20, 4) + 100 * on(f, debt84, 16) - 50 * on(f, multiplies, 16)})`}><rect x={-10} y={-190} width={20} height={190} rx={10} fill="#FFFFFF" /></g><circle r={26} fill={P.gold} />
        </g>
        <g opacity={on(f, savings84, 8)}><Snowball x={400} y={GROUND} r={110} spin={f} /><Label x={400} y={GROUND + 60} text="SAVINGS" size={48} font="Bebas Neue" color={P.mintInk} /></g>
        <g opacity={on(f, debt84, 8)}><RedBall x={1520} y={GROUND} r={110} spin={-f} /><Label x={1520} y={GROUND + 60} text="DEBT" size={48} font="Bebas Neue" color={P.coralInk} /></g>
      </g>}
      <Vignette id="m4-debt" />
    </g>
  )
}

const BEATS = ['s83:daily', 's73:number', 's78:more', 's78:21', 's84:compounding', 's84:care', 's79:payments', 's79:1000', 's70:against', 's71:everything', 's71:great', 's71:savings', 's71:painful', 's71:debt', 's72:august', 's72:2026', 's72:credit', 's72:american', 's72:charged', 's72:21', 's73:apr', 's73:annual', 's73:rate', 's74:many', 's74:every', 's74:day', 's74:apr', 's74:divide', 's74:365', 's74:charge', 's74:balance', "s75:tomorrow's", "s75:today's", 's75:interest#2', 's76:ava', 's76:owes', 's76:1000', 's76:card', 's76:21', 's76:no', 's76:whole', 's77:added', 's77:day', 's77:owe', 's77:1236', 's77:not', 's77:1212', 's78:true', 's78:cost', 's78:23', 's78:6', 's78:label', 's79:going', 's79:1528', 's79:two', 's79:1888', 's79:three', 's80:rule', 's80:72#2', 's80:21', 's80:half', 's81:alone', 's81:balance', 's81:doubles', 's81:years', 's82:same', "s82:ava's", 's82:other', 's83:reverse', 's83:pays', 's83:down', 's83:paid', 's83:grow', 's84:step', 's84:savings', 's84:debt', 's84:multiplies', 's84:given']
export const M4_DEBT = makePiece('m4-debt', 'Idea four, compounding against you (navy): a white savings snowball and a red debt snowball; a credit card with about 21% APR (August 2026, average at American banks); 365 day-boxes light up as APR ÷ 365 is charged daily and interest lands on interest; Ava’s $1,000 card balance with no payments grows as a red coin tower to about $1,236 (not $1,212), a true yearly cost of about 23.6% vs 21% on the label, then about $1,528 after two years and $1,888 after three; 72 ÷ 21 ≈ 3.5, the balance doubles in a bit over 3 years; same maths the other way; Ava pays down and the red tower shrinks; a ×TIME dial points at savings or debt', {
  mood: 'dark', Component: Debt, beats: BEATS,
  sfx: [['s72:21', 'pop', 0.2], ['s74:365', 'pop', 0.15], ['s77:1236', 'thud', 0.2], ['s79:1888', 'thud', 0.2], ['s81:doubles', 'thud', 0.2]] })
