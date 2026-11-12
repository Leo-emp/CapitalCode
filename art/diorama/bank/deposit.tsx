// ---------------------------------------------------------------- s8–s20: step one, your deposit.
// A) Nora's paycheck flies into her phone: the balance reads $1,000. The bank across the street: a promise scroll
//    unrolls between them, "BANK OWES NORA $1,000"; when she asks, a coin hops back to her.
// B) A coat check: Nora hands her red coat to the attendant, it goes onto the rack, a ticket comes back to her.
//    Then a split: on the left her exact coat waits on a hanger; on the right the bank's dollars pour into one big
//    pile with no names (a name box is crossed); the banker carries a stack off to use; her ticket becomes PROMISE.
// C) The vault room: a tall glass column of checking balances with a gold "reserves" layer up to 10%; March 2020 →
//    the requirement drops to 0%; the banker still keeps cash and easy-to-sell assets on the shelf; no stack has
//    Nora's name (crossed tag).
// D) Recap: Nora holds the glowing PROMISE ticket in front of the bank.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Bill, Coin, Headline, Label, Person, fly, hand, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { BankFront, BankPhone, BondCert, CalPage, CashBrick, Coat, DollarBill, NoMark, Street, Ticket, Vault } from './kit'

const GROUND = 930

const Deposit: React.FC<PieceProps> = ({ f, c }) => {
  const happens = c('s8:happens'), deposit8 = c('s8:deposit')
  const nora9 = c('s9:nora'), paid9 = c('s9:paid'), k1000 = c('s9:1000'), lands = c('s9:lands'), checking9 = c('s9:checking')
  const customer9 = c('s9:customer'), step20 = c('s20:step'), number10 = c('s10:number'), owe12 = c('s12:owe'), states16 = c('s16:states'), does19 = c('s19:does'), no19 = c('s19:no')
  const app10 = c('s10:app'), says10 = c('s10:says'), mean10 = c('s10:mean')
  const bank11 = c('s11:bank'), owes11 = c('s11:owes'), balance11 = c('s11:balance'), promise11 = c('s11:promise'), asks11 = c('s11:asks'), pay11 = c('s11:pay')
  const coat12 = c('s12:coat'), hand12 = c('s12:hand'), ticket12 = c('s12:ticket'), proof12 = c('s12:proof')
  const difference = c('s13:difference'), exact13 = c('s13:exact'), hanger = c('s13:hanger'), bank13 = c('s13:bank'), nobody = c('s13:nobody'), aside = c('s13:aside')
  const once14 = c('s14:once'), becomes = c('s14:becomes'), use14 = c('s14:use'), owns = c('s14:owns'), promise14 = c('s14:promise')
  const real15 = c('s15:real'), cash15 = c('s15:cash'), promises15 = c('s15:promises')
  const rule16 = c('s16:rule'), reserves16 = c('s16:reserves'), p10 = c('s16:10'), checking16 = c('s16:checking')
  const march = c('s17:march'), cut17 = c('s17:cut'), zero17 = c('s17:zero'), still17 = c('s17:still'), today17 = c('s17:today')
  const nothing18 = c('s18:nothing'), safety = c('s18:safety'), sense18 = c('s18:sense'), cash18 = c('s18:cash'), easy = c('s18:easytosell'), customers18 = c('s18:customers')
  const stack19 = c('s19:stack'), name19 = c('s19:name')
  const deposit20 = c('s20:deposit'), box20 = c('s20:box'), promise20 = c('s20:promise'), back20 = c('s20:back')

  const AB = coat12 - 10, BC = real15 - 10, CD = step20 - 4
  const A = win(f, 0, AB), B = win(f, AB, BC), C = win(f, BC, CD), D = on(f, CD, 10)
  const B1 = 1 - on(f, difference, 12), B2 = on(f, difference, 12)

  // # A) Nora on the left with her phone; the bank on the right
  const aBeats: Beat[] = [[0, 'idle', 'smiling'], [customer9, 'waveA', 'smiling'], [paid9, 'celebrate', 'smiling'], [app10, 'phone', 'smiling'], [mean10, 'think', 'thinking'], [owes11, 'point', 'smiling'], [asks11, 'offer', 'smiling'], [pay11, 'receive', 'smiling']]
  const coinHop = fly(f, pay11, [1380, 620], [440, 640], 20, 160)

  // # B1) the coat check — Nora on the right hands her coat left to the attendant
  const b1Beats: Beat[] = [[AB, 'idle', 'smiling'], [hand12, 'offer', 'smiling'], [ticket12, 'receive', 'smiling'], [proof12, 'holdUp', 'smiling']]
  const nh = hand(f, b1Beats, 1330, GROUND, 1.1, true)
  const coatT = span(f, hand12, hand12 + 22)
  const coatX = lerp(nh.x - 40, 470, coatT), coatY = lerp(nh.y + 90, 560, coatT) - Math.sin(coatT * Math.PI) * 120

  // # C) the reserves column: gold layer 10% → 0
  const goldH = 0.1 * on(f, p10, 14) * (1 - on(f, zero17, 18))

  return (
    <g>
      <Stage id="bk-dep" frame={f} />
      <Headline f={f} lines={[[happens, 'WHAT HAPPENS WHEN YOU DEPOSIT?', P.ink, 100], [owes11, 'THE BANK OWES YOU', P.ink, 104], [coat12, 'LIKE A COAT CHECK…', P.ink, 104], [difference, '…WITH ONE DIFFERENCE', P.coralInk, 104], [real15, 'HOW MUCH CASH DOES A BANK KEEP?', P.ink, 96], [zero17, 'REQUIRED RESERVES: 0%', P.coralInk, 104], [nothing18, 'STILL: CASH KEPT READY', P.ink, 104], [deposit20, 'A DEPOSIT IS A PROMISE', P.ink, 110]]} />

      {/* # A) the paycheck, the phone, the promise */}
      {A > 0 && <g opacity={A}>
        <Street f={f} ground={GROUND} trees={[1890]} lamps={[1000]} o={0.8} />
        <Ground y={GROUND} />
        <BankFront x={1500} y={GROUND} s={1.1} open={0.25 + 0.75 * on(f, pay11, 10)} glow={win(f, customer9, customer9 + 30, 6)} />
        <Person f={f} who="investorF" beats={aBeats} x={300} y={GROUND} s={1.1} />
        {/* the paycheck flies into the phone on "lands" */}
        <g opacity={on(f, paid9, 8) * (1 - span(f, lands + 10, lands + 14))}>{(() => { const fl = fly(f, lands - 4, [300, 380], [640, 560], 14, 80); return <Bill x={fl.t > 0 ? fl.x : 300} y={fl.t > 0 ? fl.y : 380} s={0.55} r={-6} text="PAYCHECK" /> })()}</g>
        <g opacity={on(f, nora9, 10)}><BankPhone x={640} y={600} s={1.0} amount={f >= k1000 ? '$1,000' : '$0'} pulse={pop(f, k1000, 12) + pop(f, says10, 12)} sub={f >= checking9 ? 'CHECKING' : 'BALANCE'} /></g>
        <g opacity={win(f, number10, owes11, 6)}><ellipse cx={640} cy={590} rx={130} ry={56} fill="none" stroke={P.goldInk} strokeWidth={6} /></g>
        {/* the promise scroll between bank and Nora */}
        {f >= owes11 && <g opacity={on(f, owes11, 10)} transform={`translate(1040 ${420 - 12 * pop(f, promise11, 12)}) scale(1.25)`}>
          <rect x={-210 * on(f, owes11, 16)} y={-60} width={420 * on(f, owes11, 16)} height={120} rx={14} fill="#FFFFFF" stroke="#CDB58C" strokeWidth={4} />
          <circle cx={-210} cy={0} r={20} fill="#E3D3AE" /><circle cx={210} cy={0} r={20} fill="#E3D3AE" />
          <text y={-8} textAnchor="middle" fill="#16294A" opacity={on(f, owes11 + 6, 8)} style={{ font: '400 42px "Bebas Neue"' }}>BANK OWES NORA</text>
          <text y={40} textAnchor="middle" fill="#1E9A63" opacity={on(f, c('s11:1000'), 8)} style={{ font: '400 46px "Bebas Neue"' }}>$1,000</text>
          <g opacity={on(f, promise11, 8)}><rect x={-120} y={70} width={240} height={52} rx={26} fill={P.gold} /><text y={108} textAnchor="middle" fill="#16294A" style={{ font: '400 38px "Bebas Neue"' }}>A PROMISE</text></g>
        </g>}
        {coinHop.t > 0 && coinHop.t < 1 && <Coin x={coinHop.x} y={coinHop.y} s={0.9} o={coinHop.o} />}
      </g>}

      {/* # B) the coat check, then coat vs dollars */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        {B1 > 0 && <g opacity={B1}>
          {/* the coat rack behind the counter */}
          <rect x={250} y={420} width={440} height={12} rx={6} fill="#8E6B48" /><rect x={260} y={420} width={12} height={510} fill="#8E6B48" /><rect x={668} y={420} width={12} height={510} fill="#8E6B48" />
          {[['#3E73B8', 320], ['#7FB77E', 620]].map(([col, x]) => <Coat key={x as number} x={x as number} y={580} s={0.85} col={col as string} />)}
          {f >= hand12 && <Coat x={coatX} y={coatY} s={0.85} col="#C94A3E" />}
          <Person f={f} who="worker" beats={[[AB, 'idle', 'smiling'], [hand12 + 10, 'receive', 'smiling'], [ticket12, 'offer', 'smiling']]} x={820} y={GROUND} s={1.05} />
          <rect x={700} y={700} width={460} height={230} rx={12} fill="#A9744E" /><rect x={680} y={690} width={500} height={26} rx={8} fill="#8E5B3A" />
          <text x={930} y={820} textAnchor="middle" fill="#F2E6CC" style={{ font: '400 50px "Bebas Neue"', letterSpacing: 4 }}>COAT CHECK</text>
          <Person f={f} who="investorF" beats={b1Beats} x={1330} y={GROUND} s={1.1} flip />
          {f < hand12 && <Coat x={nh.x - 40} y={nh.y + 90} s={0.85} col="#C94A3E" />}
          <g opacity={win(f, owe12, difference, 6)}><path d={`M${nh.x - 30} ${nh.y - 10} Q${(nh.x + 470) / 2} 380 470 520`} fill="none" stroke={P.goldInk} strokeWidth={5} strokeDasharray="12 10" /></g>
          <g opacity={on(f, ticket12, 8)}><Ticket x={nh.x - 30} y={nh.y - 10} s={0.8} r={-8} t="No. 17" glow={win(f, proof12, proof12 + 30)} /></g>
        </g>}
        {B2 > 0 && <g opacity={B2}>
          <line x1={960} y1={250} x2={960} y2={930} stroke="#CDB58C" strokeWidth={6} strokeDasharray="14 14" />
          {/* left: the exact coat on its hanger, with her ticket number */}
          <Label x={480} y={300} text="COAT CHECK" size={56} font="Bebas Neue" color={P.ink} />
          <rect x={300} y={420} width={360} height={12} rx={6} fill="#8E6B48" />
          <g opacity={on(f, exact13, 8)}><Coat x={480} y={590} s={1.15} col="#C94A3E" /><g transform="translate(560 700)"><Ticket x={0} y={0} s={0.55} t="No. 17" /></g></g>
          <g opacity={on(f, hanger, 8)}><Label x={480} y={860} text="HER EXACT COAT WAITS" size={46} font="Bebas Neue" color={P.mintInk} /></g>
          {/* right: the bank — dollars pour into one pile, no names */}
          <Label x={1440} y={300} text="BANK" size={56} font="Bebas Neue" color={P.ink} />
          {Array.from({ length: 12 }, (_, k) => { const at = bank13 + k * 3, fl = fly(f, at, [1150 + (k % 4) * 110, 360], [1300 + ((k * 37) % 220), 820 - Math.floor(k / 4) * 40], 16, 40)
            return f >= at ? <DollarBill key={k} x={fl.x} y={fl.y} s={0.9} r={(k * 23) % 30 - 15} t="$1" /> : null })}
          <g opacity={on(f, nobody, 8) * (1 - on(f, becomes, 10))} transform="translate(1690 560)">
            <rect x={-80} y={-50} width={160} height={100} rx={8} fill="#8E5B3A" /><rect x={-56} y={-16} width={112} height={36} rx={6} fill="#FFFFFF" /><text y={12} textAnchor="middle" fill="#16294A" style={{ font: '400 30px "Bebas Neue"' }}>NORA</text>
            <NoMark x={0} y={0} o={on(f, aside - 4, 8)} r={86} /></g>
          {/* the banker carries a stack off to use it */}
          <g opacity={on(f, becomes, 10)}><Person f={f} who="investor" beats={[[becomes, 'idle', 'smiling'], [use14, 'carry', 'smiling']]} x={lerp(1660, 1760, span(f, use14, use14 + 30))} y={GROUND} s={1.0} flip />
            <g opacity={on(f, use14, 8)}><CashBrick x={lerp(1600, 1700, span(f, use14, use14 + 30))} y={600} s={1.1} /></g></g>
          <g opacity={on(f, owns, 8)} transform={`translate(1400 ${470 - 14 * pop(f, promise14, 12)})`}><Ticket x={0} y={0} s={1.2} t={f >= promise14 ? 'PROMISE' : 'No. 17'} glow={on(f, promise14, 10)} /></g>
        </g>}
      </g>}

      {/* # C) the vault room: reserves 10% → 0%, still cash kept ready */}
      {C > 0 && <g opacity={C}>
        <rect x={-100} y={GROUND} width={2120} height={300} fill="#CDBB98" /><rect x={-100} y={GROUND} width={2120} height={10} fill="#B7A47F" />
        <Vault x={1420} y={560} s={0.95} open={on(f, cash15, 18)} fill={0.85} f={f} />
        {/* the checking-balances column with its gold reserves layer */}
        <g opacity={on(f, checking16 - 30, 10)} transform="translate(520 0)">
          <rect x={-120} y={300} width={240} height={560} rx={20} fill="#DDEBF7" opacity={0.55} stroke="#A9C4DE" strokeWidth={6} />
          {Array.from({ length: 9 }, (_, k) => <DollarBill key={k} x={0} y={790 - k * 56} s={0.95} digital={1} o={0.9} />)}
          <rect x={-114} y={856 - 556 * goldH} width={228} height={556 * goldH} rx={14} fill={P.gold} opacity={0.92} />
          <g opacity={on(f, p10, 8) * (1 - on(f, zero17, 10))}><line x1={130} y1={800} x2={190} y2={800} stroke={P.goldD} strokeWidth={5} /><Label x={200} y={815} text="RESERVES 10%" size={46} font="Bebas Neue" color={P.goldInk} anchor="start" /></g>
          <g opacity={on(f, zero17, 8)}><Label x={0} y={912} text="0% REQUIRED" size={50} font="Bebas Neue" color={P.coralInk} /></g>
          <Label x={0} y={260} text="CHECKING BALANCES" size={44} font="Bebas Neue" color={P.ink} o={on(f, checking16, 8)} />
        </g>
        <g opacity={on(f, march, 8) * (1 - on(f, nothing18, 10))} transform={`translate(880 ${420 - 12 * pop(f, march, 12)})`}><CalPage x={0} y={0} s={0.9} m={f >= today17 ? 'TODAY' : 'MARCH'} d={f >= today17 ? '0%' : f >= c('s17:2020') ? '2020' : ''} col={f >= still17 ? '#2E5C9A' : '#C94A3E'} /></g>
        <g opacity={on(f, states16, 8) * (1 - on(f, march, 8))} transform={`translate(860 ${380 - 10 * pop(f, states16, 12)})`}><rect x={-90} y={-56} width={180} height={112} rx={10} fill="#FFFFFF" stroke="#CDB58C" strokeWidth={3} />{[0, 1, 2, 3].map((k) => <rect key={k} x={-80} y={-46 + k * 26} width={160} height={12} fill="#D9483A" opacity={0.85} />)}<rect x={-80} y={-46} width={72} height={52} fill="#2E5C9A" /><text y={86} textAnchor="middle" fill="var(--cc-ink)" style={{ font: '400 40px "Bebas Neue"' }}>UNITED STATES</text></g>
        <g opacity={on(f, rule16, 8) * (1 - on(f, reserves16, 8))}><Label x={860} y={600} text="THE RULE" size={52} font="Bebas Neue" color={P.ink} /></g>
        {/* the banker keeps cash and easy-to-sell assets ready */}
        <g opacity={on(f, safety, 10) * (1 - on(f, stack19 - 4, 8))}>
          <Person f={f} who="investor" beats={[[safety, 'idle', 'neutral'], [cash18, 'carry', 'smiling'], [customers18, 'present', 'smiling']]} x={960} y={GROUND} s={1.0} />
          <g opacity={on(f, cash18, 8)}><CashBrick x={1000} y={590} s={1.1} /></g>
          <g opacity={on(f, easy, 8)}><BondCert x={1800} y={870} s={0.5} t="BONDS" /></g>
          <g opacity={on(f, easy, 8)}><Label x={1380} y={905} text="CASH + EASY-TO-SELL ASSETS" size={40} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, does19, 8)} transform="translate(940 700)">
          <CashBrick x={0} y={0} s={1.3} o={on(f, does19, 6)} /><CashBrick x={0} y={-44} s={1.3} o={on(f, no19, 6)} /><CashBrick x={0} y={-88} s={1.3} o={on(f, stack19, 6)} />
          <g opacity={on(f, name19 - 4, 8)}><rect x={-62} y={-150} width={124} height={40} rx={6} fill="#FFFFFF" stroke="#CDB58C" strokeWidth={3} /><text y={-120} textAnchor="middle" fill="#16294A" style={{ font: '400 32px "Bebas Neue"' }}>NORA</text></g>
          <NoMark x={0} y={-70} o={on(f, name19 + 4, 8)} r={110} />
        </g>
      </g>}

      {/* # D) recap: a deposit is a promise */}
      {D > 0 && <g opacity={D}>
        <Street f={f} ground={GROUND} trees={[80]} lamps={[]} o={0.8} />
        <Ground y={GROUND} />
        <BankFront x={1450} y={GROUND} s={1.1} open={0.4} />
        <Person f={f} who="investorF" beats={[[CD, 'idle', 'smiling'], [promise20, 'holdUp', 'smiling'], [back20, 'thumbsUp', 'smiling']]} x={560} y={GROUND} s={1.1} />
        <g opacity={on(f, box20, 8) * (1 - on(f, promise20, 8))} transform="translate(900 560)"><rect x={-80} y={-50} width={160} height={100} rx={8} fill="#8E5B3A" /><NoMark x={0} y={0} o={on(f, box20 + 2, 6)} r={80} /></g>
        <g opacity={on(f, promise20, 8)} transform={`translate(900 ${520 - 14 * pop(f, promise20, 12)})`}><Ticket x={0} y={0} s={1.3} t="PROMISE" glow={1} /></g>
      </g>}
      <Vignette id="bk-dep" />
    </g>
  )
}

const BEATS = ['s9:customer', 's20:step', 's10:number', 's12:owe', 's16:states', 's19:does', 's19:no', 's8:happens', 's8:deposit', 's9:nora', 's9:paid', 's9:1000', 's9:lands', 's9:checking', 's10:app', 's10:says', 's10:mean', 's11:bank', 's11:owes', 's11:1000', 's11:balance', 's11:promise', 's11:asks', 's11:pay', 's12:coat', 's12:hand', 's12:ticket', 's12:proof', 's13:difference', 's13:exact', 's13:hanger', 's13:bank', 's13:nobody', 's13:aside', 's14:once', 's14:becomes', 's14:use', 's14:owns', 's14:promise', 's15:real', 's15:cash', 's15:promises', 's16:rule', 's16:reserves', 's16:10', 's16:checking', 's17:march', 's17:2020', 's17:cut', 's17:zero', 's17:still', 's17:today', 's18:nothing', 's18:safety', 's18:sense', 's18:cash', 's18:easytosell', 's18:customers', 's19:stack', 's19:name', 's20:deposit', 's20:box', 's20:promise', 's20:back']
export const BK_DEPOSIT = makePiece('bk-deposit', 'Banking step one: Nora’s paycheck flies into her phone ($1,000 balance) and a promise scroll says the bank owes her $1,000; a coat check (coat to the rack, ticket back); split: her exact coat waits on a hanger vs the bank’s dollars poured into one nameless pile (name box crossed), the banker carries a stack off to use, her ticket becomes PROMISE; the vault room: a checking-balances column with a gold 10% reserves layer that drains to 0% in March 2020, the banker still keeps cash and easy-to-sell assets ready, no stack with Nora’s name (crossed)', {
  mood: 'light', Component: Deposit, beats: BEATS,
  sfx: [['s9:lands', 'coin', 0.2], ['s11:owes', 'pop', 0.2], ['s12:ticket', 'pop', 0.2], ['s13:nobody', 'thud', 0.2], ['s17:zero', 'thud', 0.25], ['s20:promise', 'pop', 0.25]] })
