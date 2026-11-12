// ---------------------------------------------------------------- s42–s59: step three — who paid the gap.
// A) Mia's $20 again: driver's part, Uber's slice, and the taller cost bar with a dashed red gap; a "?" sits in the gap.
//    The company (a small office block) turns its pockets out; on "investors" an investor walks in with a money bag.
//    "Buy a piece of it": a round company pie loses one slice, which flies to the investor as a SHARES card; the cash
//    flies the other way ("today"); on "worth much more later" the slice in the investor's hand grows.
// B) "For years": three bags — FIRMS, BANKS, FUNDS — tip coins into Uber's vault; a crown hovers ("win the market").
//    May 2019: a calendar page, a stock-exchange front, a queue of the public; a big $8.1B bag drops into the vault.
// C) The running total: a gauge at $0. Each year of losses red coins leave the vault and the gauge sinks; 2022: −$32.8B.
//    The money goes out a door into discounts, bonuses, ads, and a ride's price tag drops. Then one ride: the cost bar,
//    the slice, and a gold investor coin filling the gap; finally a row of rides, a gold coin dropping under each.
// D) Why? A small car grows huge ("get huge first"), a clock ("profit later"). The loop: riders → drivers → shorter
//    waits → more riders, each node lighting on its word and the arrows spinning. "The app everyone uses": a crowd
//    gathers round one phone; "stop paying so much": the discount coupons stop flowing.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win } from '../aimoney/common'
import { Calendar } from '../charts'
import { Ground } from '../power/kit2'
import { Mini } from '../../rig/Mini'
import { Coin2, FareBill, MapPhone, MoneyBag, RideCar, TotalGauge, USpot } from './kit'

const GROUND = 920
const LOOKS = ['buyer', 'investorF', 'hero', 'investor', 'worker', 'owner']

// # a small office block: the company itself
const Office: React.FC<{ x: number; y: number; s?: number; o?: number; sign?: string }> = ({ x, y, s = 1, o = 1, sign = 'UBER' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-120} y={-300} width={240} height={300} rx={12} fill="#2F2F3A" />
    {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={-90 + c * 66} y={-260 + r * 70} width={48} height={40} rx={5} fill="#BFE3FF" opacity={0.85} />))}
    <rect x={-30} y={-60} width={60} height={60} rx={4} fill="#1B1B22" />
    <rect x={-80} y={-336} width={160} height={44} rx={10} fill={P.gold} /><text x={0} y={-302} textAnchor="middle" fill={P.navy0} style={{ font: '400 34px "Bebas Neue"', letterSpacing: 2 }}>{sign}</text>
  </g>
)

// # the company as a round pie; `cut` pulls one slice out (0–1)
const Pie: React.FC<{ x: number; y: number; r?: number; cut?: number; o?: number }> = ({ x, y, r = 130, cut = 0, o = 1 }) => {
  const a0 = -Math.PI / 2, a1 = a0 + Math.PI / 4
  const pt = (a: number) => `${(r * Math.cos(a)).toFixed(1)} ${(r * Math.sin(a)).toFixed(1)}`
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <path d={`M0 0 L${pt(a1)} A${r} ${r} 0 1 1 ${pt(a0)} Z`} fill="#2F2F3A" />
    <g opacity={1 - cut}><path d={`M0 0 L${pt(a0)} A${r} ${r} 0 0 1 ${pt(a1)} Z`} fill={P.gold} /></g>
    <text x={-10} y={30} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"', letterSpacing: 2 }}>UBER</text>
  </g>
}

// # a share card: the piece the investor owns
const ShareCard: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-80} y={-56} width={160} height={112} rx={12} fill={P.paper} stroke={P.goldD} strokeWidth={4} />
    <path d="M-50 -20 L-50 -44 A24 24 0 0 1 -26 -20 Z" fill={P.gold} transform="translate(0 6)" />
    <text x={18} y={-10} textAnchor="middle" fill={P.navy0} style={{ font: '400 34px "Bebas Neue"', letterSpacing: 2 }}>SHARES</text>
    {[12, 30].map((yy) => <rect key={yy} x={-56} y={yy} width={112} height={8} rx={4} fill="#D9DFE8" />)}
  </g>
)

// # a vault: Uber's cash box; `fill` 0–1 shows how much is inside
const Vault: React.FC<{ x: number; y: number; fill: number; o?: number }> = ({ x, y, fill, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-170} y={-340} width={340} height={340} rx={20} fill="#5A6680" />
    <rect x={-150} y={-320} width={300} height={300} rx={14} fill="#EEF3FA" />
    <rect x={-150} y={-20 - 300 * Math.max(0, Math.min(1, fill))} width={300} height={300 * Math.max(0, Math.min(1, fill))} rx={14} fill={P.gold} />
    <rect x={-80} y={-376} width={160} height={44} rx={10} fill="#2F2F3A" /><text x={0} y={-342} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 32px "Bebas Neue"', letterSpacing: 2 }}>UBER'S CASH</text>
  </g>
)

const Investors: React.FC<PieceProps> = ({ f, c }) => {
  const step42 = c('s42:step'), who42 = c('s42:who'), missing = c('s42:missing')
  const company43 = c('s43:company'), losing = c('s43:losing'), get43 = c('s43:get'), somewhere = c('s43:somewhere')
  const uber44 = c('s44:uber'), investors44 = c('s44:investors')
  const invest45 = c('s45:invest'), company45 = c('s45:company'), buy45 = c('s45:buy'), piece45 = c('s45:piece'), shares45 = c('s45:shares')
  const gets46 = c('s46:gets'), cash46 = c('s46:cash'), today = c('s46:today'), hope = c('s46:hope'), worth = c('s46:worth'), more46 = c('s46:more')
  const years47 = c('s47:years'), firms = c('s47:firms'), banks = c('s47:banks'), funds = c('s47:funds'), billions47 = c('s47:billions'), win47 = c('s47:win'), later47 = c('s47:later')
  const may = c('s48:may'), d2019 = c('s48:2019'), sold = c('s48:sold'), public48 = c('s48:public'), raised = c('s48:raised'), d81 = c('s48:81')
  const every49 = c('s49:every'), losses49 = c('s49:losses'), ate = c('s49:ate'), money49 = c('s49:money')
  const running = c('s50:running'), total50 = c('s50:total'), lost50 = c('s50:lost'), earned50 = c('s50:earned'), day50 = c('s50:day')
  const end51 = c('s51:end'), d2022 = c('s51:2022'), d328 = c('s51:328'), red51 = c('s51:red')
  const out52 = c('s52:out'), door = c('s52:door'), discounts = c('s52:discounts'), bonuses = c('s52:bonuses'), advertising = c('s52:advertising'), rides52 = c('s52:rides'), cheaper = c('s52:cheaper'), common = c('s52:common')
  const every53 = c('s53:every'), cheap53 = c('s53:cheap'), paid53 = c('s53:paid'), investors53 = c('s53:investors'), not53 = c('s53:not'), rider53 = c('s53:rider')
  const mias = c("s54:mia's"), average = c('s54:average'), costs54 = c('s54:costs'), bigger54 = c('s54:bigger'), slice54 = c('s54:slice'), investors54 = c('s54:investors'), covered54 = c('s54:covered')
  const step55 = c('s55:step'), filled = c('s55:filled'), ride55 = c('s55:ride'), ride55b = c('s55:ride#2'), year55 = c('s55:year')
  const why = c('s56:why'), anyone = c('s56:anyone'), pay56 = c('s56:pay')
  const bet57 = c('s57:bet'), huge = c('s57:huge'), first57 = c('s57:first'), profit57 = c('s57:profit'), later57 = c('s57:later')
  const idea = c('s58:idea'), riders58 = c('s58:riders'), drivers58 = c('s58:drivers'), shorter = c('s58:shorter'), waits = c('s58:waits'), attract2 = c('s58:attract#2'), riders58b = c('s58:riders#2')
  const become = c('s59:become'), everyone = c('s59:everyone'), stop = c('s59:stop'), paying = c('s59:paying'), win59 = c('s59:win'), over59 = c('s59:over')

  const AB = years47 - 6, BC = every49 - 6, CD = why - 6
  const A = win(f, step42 - 30, AB), B = win(f, AB, BC), C = win(f, BC, CD), D = on(f, CD, 10)
  // # inside C: the gauge part, the "one ride" part, the "ride after ride" part
  const C1 = 1 - on(f, mias - 6, 10), C2 = on(f, mias - 6, 10) * (1 - on(f, step55 - 4, 10)), C3 = on(f, step55 - 4, 10)
  // # inside A: Mia's gap first, then the investor and the pie
  const A1 = 1 - on(f, invest45 - 6, 10), A2 = on(f, invest45 - 6, 10)
  // # the running total sinks year by year: 0 → −32.8 by "2022"
  const total = -32.8 * Math.max(on(f, ate, 50) * 0.35, on(f, lost50, 20) * 0.45, on(f, d2022, 24) * 0.8, on(f, d328, 20))
  // # the cash in the vault: fills on "billions" and "8.1", drains as losses eat it
  const vault = Math.min(1, 0.15 + 0.35 * on(f, billions47, 24) + 0.4 * on(f, d81, 20)) - 0.75 * on(f, ate, 40)

  return (
    <g>
      <Stage id="ub-investors" frame={f} />
      <USpot f={f} at={missing} x={1110} y={560} rx={160} ry={180} />
      <USpot f={f} at={piece45} x={700} y={560} rx={200} ry={200} />
      <USpot f={f} at={d81} x={1400} y={600} rx={220} ry={200} />
      <USpot f={f} at={d328} x={420} y={640} rx={180} ry={220} />
      <USpot f={f} at={covered54} x={1100} y={560} rx={200} ry={200} />
      <Headline f={f} lines={[[step42, 'STEP 3: WHO PAID THE GAP?', P.ink, 96], [investors44, 'INVESTORS', P.ink, 110], [shares45, 'YOU BUY A PIECE: SHARES', P.ink, 96], [years47, 'FOR YEARS: BILLIONS IN', P.ink, 100], [d81, 'MAY 2019: ≈ $8.1B RAISED', P.ink, 100], [running, 'A RUNNING TOTAL', P.ink, 104], [d328, 'END OF 2022: ≈ −$32.8B', P.coralInk, 100], [discounts, 'CHEAPER RIDES', P.ink, 104], [investors53, 'PAID BY INVESTORS', P.ink, 104], [mias, "MIA'S RIDE, ON AVERAGE", P.ink, 100], [step55, 'INVESTORS FILLED THE GAP', P.ink, 100], [why, 'WHY PAY FOR THAT?', P.ink, 104], [huge, 'GET HUGE FIRST', P.ink, 110], [idea, 'MORE RIDERS ↔ MORE DRIVERS', P.ink, 96], [everyone, 'THE APP EVERYONE USES', P.ink, 100]]} />

      {/* # A) the gap, the company with empty pockets, the investor, the pie */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={A1}>
          <FareBill x={640} y={300} w={760} split={1} driverLabel="DRIVER" sliceLabel="SLICE" />
          <rect x={1230} y={300} width={170} height={420} rx={14} fill="#9D7FD0" /><Label x={1315} y={760} text="COSTS" size={44} font="Bebas Neue" color={P.ink} />
          <rect x={977} y={480} width={163} height={240} rx={12} fill={P.coral} opacity={0.15 + 0.15 * on(f, missing, 8)} stroke={P.coral} strokeWidth={6} strokeDasharray="12 8" />
          <g opacity={on(f, who42, 8)} transform={`translate(1058 ${600 - 20 * pop(f, who42, 14)})`}><circle r={46} fill={P.coral} /><text y={20} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 60px "Bebas Neue"' }}>?</text></g>
          {/* # the company with its pockets out; arrows "from somewhere" */}
          <g opacity={on(f, company43, 8)}><Office x={1620} y={GROUND} s={0.9} /></g>
          {f >= losing && [0, 1, 2].map((k) => { const fl = fly(f, losing + k * 5, [1620, GROUND - 150], [1030, 600], 20, 90); return fl.t < 1 ? <Coin2 key={k} x={fl.x} y={fl.y} r={22} t="$" o={fl.o} /> : null })}
          <g opacity={on(f, get43, 8) * (1 - on(f, investors44, 8))}>{[[-1, 0], [1, 0], [0, -1]].map(([dx, dy], k) => <g key={k} opacity={on(f, get43 + k * 4, 6)}><path d={`M${1620 + dx * 260} ${GROUND - 200 + dy * 260} L${1620 + dx * 170} ${GROUND - 200 + dy * 170}`} stroke={P.ink2} strokeWidth={8} strokeLinecap="round" /><circle cx={1620 + dx * 280} cy={GROUND - 200 + dy * 280} r={30} fill={P.gold} /><text x={1620 + dx * 280} y={GROUND - 188 + dy * 280} textAnchor="middle" fill={P.navy0} style={{ font: '400 34px "Bebas Neue"' }}>?</text></g>)}</g>
          <g opacity={on(f, uber44, 8)}><Label x={1620} y={GROUND + 60} text="UBER" size={44} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, investors44, 8)} transform={`translate(${lerp(260, 0, on(f, investors44, 16))} 0)`}>
            <Person f={f} who="investor" beats={[[0, 'walkA', 'smiling'], [investors44 + 10, 'carry', 'smiling']]} x={1840} y={GROUND} s={0.62} />
          </g>
        </g>
        <g opacity={A2}>
          <Pie x={700} y={560} r={190} cut={on(f, piece45, 10)} />
          <Person f={f} who="investor" beats={[[0, 'idle', 'smiling'], [buy45, 'offer', 'smiling'], [shares45, 'receive', 'smiling'], [hope, 'think', 'thinking'], [more46, 'celebrate', 'smiling']]} x={1450} y={GROUND} s={0.8} />
          <g opacity={on(f, company45, 8)}><Label x={700} y={GROUND - 60} text="THE COMPANY" size={46} font="Bebas Neue" color={P.ink} /></g>
          {/* # the slice flies to the investor and becomes a share card that grows later */}
          {(() => { const fl = fly(f, piece45, [740, 430], [1300, GROUND - 330], 20, 120)
            return f >= piece45 ? <ShareCard x={fl.x} y={fl.y} s={lerp(0.7, 1.4, on(f, worth, 24))} /> : null })()}
          <g opacity={on(f, worth, 8)}><Label x={1300} y={GROUND - 460} text="WORTH MORE LATER?" size={44} font="Bebas Neue" color={P.mintInk} /></g>
          {/* # the cash flies the other way */}
          {f >= gets46 && [0, 1, 2, 3].map((k) => { const fl = fly(f, gets46 + k * 4, [1400, GROUND - 260], [700, 560], 20, 120); return fl.t < 1 ? <Coin2 key={k} x={fl.x} y={fl.y} r={26} t="$" o={fl.o} /> : null })}
          <g opacity={on(f, today, 8) * (1 - on(f, hope, 8))}><Label x={700} y={300} text="CASH TODAY" size={46} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
      </g>}

      {/* # B) the private money, then the IPO */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <Vault x={1400} y={GROUND} fill={vault} />
        {([[firms, 'FIRMS'], [banks, 'BANKS'], [funds, 'FUNDS']] as [number, string][]).map(([at, t], k) => {
          const x = 260 + k * 260, gone = on(f, may - 6, 10)
          return <g key={k} opacity={on(f, at, 8) * (1 - gone)}>
            <MoneyBag x={x} y={GROUND - 60} s={0.9} r={lerp(0, 24, on(f, billions47, 12))} text="$" />
            <Label x={x} y={GROUND + 50} text={t} size={44} font="Bebas Neue" color={P.ink} />
            {f >= billions47 && [0, 1].map((j) => { const fl = fly(f, billions47 + k * 3 + j * 8, [x + 60, GROUND - 180], [1400, GROUND - 200], 22, 160); return fl.t < 1 ? <Coin2 key={j} x={fl.x} y={fl.y} r={24} t="$" o={fl.o} /> : null })}
          </g> })}
        {/* # the crown: "win the market" */}
        <g opacity={on(f, win47, 8) * (1 - on(f, may - 6, 10))} transform={`translate(1400 ${360 - 16 * pop(f, win47, 14)})`}><path d="M-80 30 L-80 -30 L-40 0 L0 -50 L40 0 L80 -30 L80 30 Z" fill={P.gold} stroke={P.goldD} strokeWidth={5} /><text x={0} y={80} textAnchor="middle" fill={P.ink2} style={{ font: '400 40px "Bebas Neue"' }}>{f >= later47 ? 'PROFIT LATER?' : 'WIN THE MARKET'}</text></g>
        {/* # May 2019: the calendar, the exchange, the public */}
        <g opacity={on(f, may, 8)}>
          <Calendar x={300} y={330} text={f >= d2019 ? 'MAY 2019' : 'MAY'} s={0.9} />
          <g opacity={on(f, sold, 8)}><rect x={480} y={GROUND - 360} width={420} height={360} rx={10} fill="#D9DFE8" />{[0, 1, 2, 3, 4].map((k) => <rect key={k} x={510 + k * 76} y={GROUND - 300} width={40} height={300} rx={6} fill="#B8C6D9" />)}<path d={`M460 ${GROUND - 360} L690 ${GROUND - 450} L920 ${GROUND - 360} Z`} fill="#C9D3E1" /><Label x={690} y={GROUND - 380} text="STOCK EXCHANGE" size={34} font="Bebas Neue" color={P.ink} /></g>
          {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, public48 + k * 2, 6) * (1 - on(f, raised, 10))}><Mini look={LOOKS[k]} x={160 + k * 140} y={GROUND} scale={0.55} frame={f} seed={k + 60} mood="happy" /></g>)}
          {f >= public48 && [0, 1, 2, 3, 4].map((k) => { const fl = fly(f, public48 + 6 + k * 4, [200 + k * 140, GROUND - 160], [1400, GROUND - 200], 20, 160); return fl.t < 1 ? <Coin2 key={k} x={fl.x} y={fl.y} r={20} t="$" o={fl.o} /> : null })}
          <g opacity={on(f, raised, 8)} transform={`translate(0 ${-260 * (1 - on(f, d81, 16))})`}><MoneyBag x={1720} y={GROUND} s={lerp(0.8, 1.2, on(f, d81, 16))} text="$8.1B" /></g>
        </g>
      </g>}

      {/* # C) the running total; out the door; one ride; ride after ride */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={C1}>
          <g opacity={on(f, running, 8) * (1 - on(f, out52 - 4, 10))}><TotalGauge x={420} y={330} value={total} scale={14} /></g>
          <g opacity={on(f, d328, 8) * (1 - on(f, out52 - 4, 10))}><Label x={420} y={330 + 32.8 * 14 + 100} text="−$32.8B" size={60} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, lost50, 8) * (1 - on(f, end51, 8))}><Label x={620} y={300} text="− LOST" size={42} font="Bebas Neue" color={P.coralInk} anchor="start" /></g>
          <g opacity={on(f, earned50, 8) * (1 - on(f, end51, 8))}><Label x={620} y={250} text="+ EARNED" size={42} font="Bebas Neue" color={P.mintInk} anchor="start" /></g>
          <g opacity={on(f, day50, 8) * (1 - on(f, d2022, 8))}><Calendar x={760} y={560} text="DAY ONE" s={0.7} /></g>
          <g opacity={on(f, d2022, 8) * (1 - on(f, out52 - 4, 10))}><Calendar x={760} y={560} text="END 2022" s={0.7} /></g>
          {/* # the vault drains into the gauge on "ate" */}
          <g opacity={on(f, every49, 8) * (1 - on(f, out52, 8))}><Vault x={1400} y={GROUND} fill={vault} />
            {f >= ate && [0, 1, 2, 3, 4].map((k) => { const fl = fly(f, ate + k * 4, [1400, GROUND - 200], [420, 360], 20, 120); return fl.t < 1 ? <circle key={k} cx={fl.x} cy={fl.y} r={20} fill={P.coral} opacity={fl.o} /> : null })}</g>
          {/* # out the door: discounts, bonuses, advertising */}
          <g opacity={on(f, out52, 8) * (1 - on(f, every53 - 4, 8))}>
            <g transform={`translate(560 ${GROUND})`}><rect x={-70} y={-220} width={140} height={220} rx={8} fill="#5A6680" /><path d={`M-62 -212 L${lerp(-62, 30, on(f, door, 10))} -196 L${lerp(-62, 30, on(f, door, 10))} -16 L-62 0 Z`} fill="#8A97AA" /><Label x={0} y={50} text="OUT THE DOOR" size={40} font="Bebas Neue" color={P.ink2} /></g>
            {([[discounts, '% OFF', '#F2A7B5'], [bonuses, '+$ BONUS', P.goldD], [advertising, 'ADS', P.coral]] as [number, string, string][]).map(([at, t, col], k) => {
              const fl = fly(f, at - 6, [560, GROUND - 120], [860 + k * 260, 420], 18, 120)
              return f >= at - 6 ? <g key={k} transform={`translate(${fl.x} ${fl.y})`}><rect x={-80} y={-40} width={160} height={80} rx={14} fill={col} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 38px "Bebas Neue"' }}>{t}</text></g> : null })}
            <g opacity={on(f, rides52, 8)}><RideCar x={1500} y={GROUND - 10} s={0.7} f={f} />
              {/* # the price tag sinks and shrinks on "cheaper" (no made-up price: just lower) */}
              <g transform={`translate(1660 ${GROUND - 260 + 60 * on(f, cheaper, 14)}) scale(${lerp(1, 0.75, on(f, cheaper, 14))})`}><rect x={-70} y={-34} width={140} height={68} rx={10} fill={P.paper} stroke={P.edge} strokeWidth={3} /><text y={16} textAnchor="middle" fill={f >= cheaper ? P.mintInk : P.navy0} style={{ font: '400 46px "Bebas Neue"' }}>PRICE</text>
                <path d="M0 50 L0 110 M-22 88 L0 110 L22 88" fill="none" stroke={P.mintInk} strokeWidth={8} strokeLinecap="round" opacity={on(f, cheaper, 6)} /></g></g>
            {/* # "more common": more cars on the road */}
            <g opacity={on(f, common, 8)}>{[0, 1].map((k) => <g key={k} transform={`translate(${1200 - k * 220} ${GROUND - 10}) scale(0.4)`}><RideCar x={0} y={0} f={f} color="#5A6680" /></g>)}</g>
          </g>
          {/* # every cheap ride: a car with a gold coin from the investor underneath */}
          <g opacity={on(f, every53, 8)}>
            {[0, 1, 2].map((k) => <g key={k} opacity={on(f, cheap53 + k * 3, 6)} transform={`translate(${1150 + k * 280} 640) scale(0.45)`}><RideCar x={0} y={0} f={f} rider /></g>)}
            <g opacity={on(f, investors53, 8)}><Mini look="investor" x={1820} y={GROUND} scale={0.7} frame={f} seed={77} mood="happy" /></g>
            {f >= paid53 && [0, 1, 2].map((k) => { const fl = fly(f, paid53 + k * 4, [1800, GROUND - 200], [1150 + k * 280, 700], 20, 120); return <Coin2 key={k} x={fl.x} y={fl.y} r={24} t="$" /> })}
            <g opacity={on(f, not53, 8)}><Mini look="buyer" x={1000} y={GROUND} scale={0.7} frame={f} seed={78} mood="happy" /><Label x={1000} y={GROUND + 60} text="RIDER" size={40} font="Bebas Neue" color={P.ink2} /></g>
          </g>
        </g>
        {/* # one ride, on average: slice vs cost; the investor coin fills the difference */}
        <g opacity={C2}>
          <Person f={f} who="investorF" beats={[[0, 'phone', 'smiling'], [costs54, 'idle', 'smiling']]} x={300} y={GROUND} s={0.8} />
          <MapPhone x={560} y={560} s={0.8} price="$20" pin={span(f, mias, average)} status="ON AVERAGE" />
          <g opacity={on(f, costs54, 8)}><rect x={900} y={GROUND - lerp(0, 500, on(f, costs54, 18))} width={200} height={lerp(0, 500, on(f, costs54, 18))} rx={14} fill="#9D7FD0" /><Label x={1000} y={GROUND + 60} text="COST PER TRIP" size={42} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, slice54, 8)}><rect x={1180} y={GROUND - lerp(0, 380, on(f, slice54, 16))} width={200} height={lerp(0, 380, on(f, slice54, 16))} rx={14} fill={P.navy3} /><Label x={1280} y={GROUND + 60} text="UBER'S SLICE" size={42} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, bigger54, 8) * (1 - on(f, covered54, 10))}><rect x={1180} y={GROUND - 500} width={200} height={120} rx={12} fill="none" stroke={P.coral} strokeWidth={6} strokeDasharray="12 8" /></g>
          <g opacity={on(f, covered54, 8)}><rect x={1180} y={GROUND - 500} width={200} height={lerp(0, 120, on(f, covered54, 16))} rx={12} fill={P.gold} /><Label x={1280} y={GROUND - 530} text="INVESTORS' CASH" size={42} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, investors54, 8)}><MoneyBag x={1660} y={GROUND} s={0.9} />
            {(() => { const fl = fly(f, investors54 + 6, [1660, GROUND - 160], [1280, GROUND - 440], 18, 120); return fl.t < 1 ? <Coin2 x={fl.x} y={fl.y} r={28} t="$" /> : null })()}</g>
        </g>
        {/* # ride after ride, year after year */}
        <g opacity={C3}>
          <MoneyBag x={1700} y={GROUND} s={lerp(1.2, 0.8, span(f, filled, year55 + 30))} />
          {Array.from({ length: 8 }, (_, k) => { const at = [step55, step55 + 8, filled, filled + 6, ride55, ride55b, year55, year55 + 6][k], x = 240 + (k % 4) * 330, y = k < 4 ? 520 : 820
            return <g key={k} opacity={on(f, at, 6)}>
              <g transform={`translate(${x} ${y}) scale(0.45)`}><RideCar x={0} y={0} f={f} /></g>
              {(() => { const fl = fly(f, at + 2, [1700, GROUND - 180], [x, y - 120], 16, 100); return <Coin2 x={fl.x} y={fl.y} r={22} t="$" /> })()}
            </g> })}
        </g>
      </g>}

      {/* # D) why? get huge first; the loop; the app everyone uses */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, riders58 - 4, 10)}>
          <Person f={f} who="hero" beats={[[0, 'shrug', 'thinking'], [bet57, 'point', 'smiling']]} x={300} y={GROUND} s={0.8} />
          <g opacity={on(f, anyone, 8)}><Label x={300} y={GROUND - 420} text="?" size={110} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, pay56, 8)}><RideCar x={960} y={GROUND - 20} s={lerp(0.35, 1.5, on(f, huge, 22))} f={f} /></g>
          <g opacity={on(f, first57, 8)}><Label x={960} y={GROUND + 60} text="① GET BIG" size={46} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, profit57, 8)} transform="translate(1620 520)"><circle r={110} fill={P.card} stroke={P.ink} strokeWidth={8} /><line x1={0} y1={0} x2={0} y2={-74} stroke={P.ink} strokeWidth={8} strokeLinecap="round" transform={`rotate(${lerp(0, 300, span(f, profit57, later57 + 20))})`} /><line x1={0} y1={0} x2={50} y2={0} stroke={P.ink} strokeWidth={8} strokeLinecap="round" /><Label x={0} y={180} text="② PROFIT LATER" size={46} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {/* # the loop: riders → drivers → shorter waits → more riders */}
        <g opacity={on(f, riders58 - 4, 10) * (1 - on(f, become - 4, 10))}>
          {([[riders58 - 4, 'RIDERS', 960, 420, 'buyer'], [drivers58, 'DRIVERS', 1400, 760, 'worker'], [shorter, 'SHORTER WAITS', 520, 760, '']] as [number, string, number, number, string][]).map(([at, t, x, y, look], k) => (
            <g key={k} opacity={on(f, at, 8)} transform={`translate(${x} ${y}) scale(${1 + 0.12 * pop(f, at, 14) - 0.12 * on(f, at + 14, 1)})`}>
              <circle r={120} fill={[P.sky, P.mint, P.gold][k]} opacity={0.35} />
              {look ? <g>{[-40, 0, 40].map((dx, j) => <g key={j} opacity={j === 0 || f >= (k === 0 ? riders58b : attract2) ? 1 : 0.0}><Mini look={look} x={dx} y={70} scale={0.32} frame={f} seed={k * 5 + j + 80} mood="happy" /></g>)}</g>
                : <g><circle r={64} fill={P.card} stroke={P.ink} strokeWidth={6} />{[0, 90, 180, 270].map((a) => <line key={a} x1={0} y1={-50} x2={0} y2={-40} stroke={P.ink} strokeWidth={5} transform={`rotate(${a})`} />)}<line x1={0} y1={0} x2={0} y2={-42} stroke={P.ink} strokeWidth={6} strokeLinecap="round" transform={`rotate(${lerp(0, 270, span(f, waits, attract2 + 20))})`} /><line x1={0} y1={0} x2={26} y2={0} stroke={P.ink} strokeWidth={6} strokeLinecap="round" /><circle r={6} fill={P.ink} /></g>}
              <text x={k === 0 ? 0 : k === 1 ? 150 : -150} y={k === 0 ? -140 : 180} textAnchor={k === 0 ? 'middle' : k === 1 ? 'start' : 'end'} fill={P.ink} style={{ font: '400 50px "Bebas Neue"' }}>{t}</text>
            </g>))}
          {/* # the arrows between them, drawn on their words */}
          {([[c('s58:attract'), 'M1090 470 Q1330 520 1390 630'], [c('s58:mean'), 'M1270 800 Q960 880 650 800'], [attract2, 'M520 630 Q580 470 830 450']] as [number, string][]).map(([at, d], k) => (
            <path key={k} d={d} fill="none" stroke={P.ink2} strokeWidth={8} strokeLinecap="round" strokeDasharray="1200" strokeDashoffset={1200 * (1 - span(f, at, at + 14))} />))}
        </g>
        {/* # the app everyone uses; stop paying so much */}
        <g opacity={on(f, become - 4, 10)}>
          <MapPhone x={960} y={560} s={1} price="RIDE" pin={span(f, become, uses59())} />
          {Array.from({ length: 10 }, (_, k) => { const x = [260, 400, 540, 680, 1240, 1380, 1520, 1660, 1800, 120][k], y = GROUND
            return <g key={k} opacity={on(f, everyone + k * 2, 6)}><Mini look={LOOKS[k % 6]} x={x} y={y} scale={0.7} frame={f} seed={k + 90} mood="happy" /></g> })}
          {/* # coupons fly out until "stop", then stop */}
          {[0, 1, 2, 3].map((k) => { const at = become + k * 10; if (at > stop) return null; const fl = fly(f, at, [960, 400], [400 + k * 380, 300], 20, 100)
            return f >= at ? <g key={k} opacity={fl.o * (1 - on(f, stop, 8))} transform={`translate(${fl.x} ${fl.y})`}><rect x={-60} y={-26} width={120} height={52} rx={10} fill="#F2A7B5" /><text y={12} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 32px "Bebas Neue"' }}>% OFF</text></g> : null })}
          <g opacity={on(f, stop, 8)} transform={`translate(1500 420) scale(${lerp(0.6, 1, pop(f, stop, 14))})`}><rect x={-120} y={-44} width={240} height={88} rx={14} fill="#F2A7B5" /><text y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>% OFF</text><line x1={-130} y1={50} x2={130} y2={-50} stroke={P.coralInk} strokeWidth={6} strokeLinecap="round" opacity={on(f, paying, 6)} /></g>
          <g opacity={on(f, win59, 8)}><Label x={1500} y={540} text="FEWER DISCOUNTS NEEDED" size={42} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, over59, 8)}><Label x={960} y={GROUND + 60} text="EVERYONE'S DEFAULT APP" size={44} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}
      <Vignette id="ub-investors" />
    </g>
  )
  function uses59() { return c('s59:uses') }
}

const BEATS = ['s42:step', 's42:who', 's42:missing', 's43:company', 's43:losing', 's43:get', 's43:somewhere', 's44:uber', 's44:investors', 's45:invest', 's45:company', 's45:buy', 's45:piece', 's45:shares', 's46:gets', 's46:cash', 's46:today', 's46:hope', 's46:worth', 's46:more', 's47:years', 's47:firms', 's47:banks', 's47:funds', 's47:billions', 's47:win', 's47:later', 's48:may', 's48:2019', 's48:sold', 's48:public', 's48:raised', 's48:81', 's49:every', 's49:losses', 's49:ate', 's50:running', 's50:total', 's50:lost', 's50:earned', 's50:day', 's51:end', 's51:2022', 's51:328', 's51:red', 's52:out', 's52:door', 's52:discounts', 's52:bonuses', 's52:advertising', 's52:rides', 's52:cheaper', 's52:common', 's53:every', 's53:cheap', 's53:paid', 's53:investors', 's53:not', 's53:rider', "s54:mia's", 's54:average', 's54:costs', 's54:bigger', 's54:slice', 's54:investors', 's54:covered', 's55:step', 's55:filled', 's55:ride', 's55:ride#2', 's55:year', 's56:why', 's56:anyone', 's56:pay', 's57:bet', 's57:huge', 's57:first', 's57:profit', 's57:later', 's58:idea', 's58:riders', 's58:attract', 's58:drivers', 's58:mean', 's58:shorter', 's58:waits', 's58:attract#2', 's58:riders#2', 's59:become', 's59:everyone', 's59:uses', 's59:stop', 's59:paying', 's59:win', 's59:over']
export const UB_INVESTORS = makePiece('ub-investors', 'Uber long step 3: Mia\'s fare leaves a red gap below the costs; the company turns to investors; buying shares (a pie slice flies to an investor as a share card, cash flies back); firms, banks and funds fill Uber\'s cash vault; May 2019 IPO raises $8.1B; losses drain the vault and a running-total gauge sinks to −$32.8B by end 2022; money goes out the door as discounts, bonuses and ads, cheaper rides; investors\' gold coin fills each ride\'s gap; why: get huge first, profit later; the riders–drivers–shorter waits loop; the app everyone uses needs fewer discounts', {
  mood: 'light', Component: Investors, beats: BEATS,
  sfx: [['s42:who', 'pop', 0.2], ['s44:investors', 'whoosh', 0.2], ['s45:piece', 'swish', 0.2], ['s47:billions', 'coin', 0.25], ['s48:81', 'thud', 0.3], ['s51:328', 'thud', 0.3], ['s52:door', 'swish', 0.2], ['s54:covered', 'coin', 0.25], ['s57:huge', 'whoosh', 0.2], ['s58:attract', 'pop', 0.2], ['s59:stop', 'pop', 0.2]] })
