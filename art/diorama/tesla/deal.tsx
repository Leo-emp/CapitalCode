// ---------------------------------------------------------------- s40–s57: step three — the deal.
// A) Two meters side by side: Big Motors 105 g (red, over), Tesla 0 g. Big Motors' boss walks over; a pool ring draws
//    round both. Tesla's 200,000 cars (made up) roll in; the pool's meter drops from 105 to 87.5 under a shared limit of
//    100; the fine bill gets a big X: "no fine".
// B) The price: Big Motors pays Tesla (coins flow). Two bars: the €475M fine, and a lower price bar; the difference turns
//    green, "saved". Why not build EVs? A blueprint and a row of year chips (it takes years), while a fine bill drops on
//    every year. A shortcut arrow: "pay a rival".
// C) Real examples: 2019, a FIAT CHRYSLER sign joins a pool with TESLA. 2025: STELLANTIS, TOYOTA, FORD, MAZDA and SUBARU
//    signs pop in, one per name, into a pool with TESLA. A sealed envelope "price: not published"; Tesla's annual report
//    "total, every year". Recap: over the limit → pay Tesla, not the fine.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Coin2, MoneyBag } from '../uber/kit'
import { EVCar, Factory, FineBill, GasCar, LimitMeter, PoolRing, TSpot } from './kit'

const GROUND = 920

// # a carmaker name sign (text only, no logos)
const Sign: React.FC<{ x: number; y: number; t: string; o?: number; col?: string; s?: number }> = ({ x, y, t, o = 1, col = '#6A5A6A', s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><rect x={-130} y={-40} width={260} height={80} rx={14} fill={col} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: `400 ${t.length > 10 ? 36 : 44}px "Bebas Neue"`, letterSpacing: 2 }}>{t}</text></g>
)

const Deal: React.FC<PieceProps> = ({ f, c }) => {
  const step40 = c('s40:step'), deal40 = c('s40:deal')
  const g5 = c('s41:5'), over41 = c('s41:over'), tesla41 = c('s41:tesla'), under41 = c('s41:under')
  const asks = c('s42:asks'), join42 = c('s42:join'), pool42 = c('s42:pool')
  const d200 = c('s43:200'), cars43 = c('s43:cars'), zero43 = c('s43:zero'), madeup43 = c('s43:madeup')
  const together = c('s44:together'), m1 = c('s44:1'), average44 = c('s44:average'), drops = c('s44:drops'), d105 = c('s44:105'), d87 = c('s44:87'), half = c('s44:half')
  const shared = c('s45:shared'), d100 = c('s45:100'), now45 = c('s45:now'), under45 = c('s45:under'), nobody = c('s45:nobody'), fine45 = c('s45:fine')
  const doesnt = c("s46:doesn't"), free = c('s46:free'), pays46 = c('s46:pays'), join46 = c('s46:join')
  const price47 = c('s47:price'), lower = c('s47:lower'), fine47 = c('s47:fine'), sense = c('s47:sense')
  const less48 = c('s48:less'), fine48 = c('s48:fine'), gets = c('s48:gets'), cash48 = c('s48:cash'), never = c('s48:never')
  const why = c('s49:why'), build49 = c('s49:build'), instead49 = c('s49:instead'), time49 = c('s49:time'), many = c('s49:many')
  const takes = c('s50:takes'), years50 = c('s50:years'), design = c('s50:design'), build50 = c('s50:build'), fine50 = c('s50:fine'), arrives = c('s50:arrives'), every50 = c('s50:every')
  const paying = c('s51:paying'), rival51 = c('s51:rival'), quicker = c('s51:quicker'), cheaper = c('s51:cheaper')
  const isnt = c("s52:isn't"), example = c('s52:example')
  const y2019 = c('s53:2019'), fiat = c('s53:fiat'), agreed = c('s53:agreed'), pool53 = c('s53:pool'), teslas53 = c("s53:tesla's")
  const y2025 = c('s54:2025'), stellantis = c('s54:stellantis'), toyota = c('s54:toyota'), ford = c('s54:ford'), mazda = c('s54:mazda'), subaru = c('s54:subaru'), filed = c('s54:filed'), tesla54 = c('s54:tesla')
  const companies55 = c('s55:companies'), publish = c('s55:publish'), much55 = c('s55:much'), paid55 = c('s55:paid')
  const tesla56 = c('s56:tesla'), report = c('s56:report'), total = c('s56:total'), credits56 = c('s56:credits'), every56 = c('s56:every')
  const step57 = c('s57:step'), rivals57 = c('s57:rivals'), miss57 = c('s57:miss'), pay57 = c('s57:pay'), instead57 = c('s57:instead'), fine57 = c('s57:fine')

  const AB = doesnt - 6, BC = isnt - 6
  const A = win(f, step40 - 40, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const A1 = 1 - on(f, together - 6, 10), A2 = on(f, together - 6, 10)
  const B1 = 1 - on(f, why - 6, 10), B2 = on(f, why - 6, 10)
  const C1 = 1 - on(f, companies55 - 6, 10), C2 = on(f, companies55 - 6, 10) * (1 - on(f, step57 - 4, 10)), C3 = on(f, step57 - 4, 10)
  const poolAvg = lerp(105, 87.5, on(f, drops, 30))
  const NAMES: [number, string][] = [[stellantis, 'STELLANTIS'], [toyota, 'TOYOTA'], [ford, 'FORD'], [mazda, 'MAZDA'], [subaru, 'SUBARU']]

  return (
    <g>
      <Stage id="ts-deal" frame={f} />
      <TSpot f={f} at={d87} x={960} y={560} rx={180} ry={220} />
      <TSpot f={f} at={lower} x={1100} y={600} rx={200} ry={200} />
      <Headline f={f} lines={[[step40, 'STEP 3: THE DEAL', P.ink, 110], [asks, 'JOIN MY POOL?', P.ink, 104], [madeup43, 'MADE-UP NUMBERS', P.ink2, 96], [d87, 'POOL AVERAGE ≈ 87.5 G', P.mintInk, 100], [nobody, 'NO FINE', P.mintInk, 120], [free, 'NOT FOR FREE', P.ink, 110], [lower, 'PRICE < FINE', P.ink, 120], [why, 'WHY NOT BUILD EVS?', P.ink, 104], [quicker, 'QUICKER, CHEAPER', P.ink, 110], [y2019, '2019: FIAT CHRYSLER', P.ink, 104], [y2025, '2025: FIVE CARMAKERS', P.ink, 104], [publish, 'PRICES NOT PUBLISHED', P.ink, 100], [report, 'TESLA REPORTS THE TOTAL', P.ink, 100], [step57, 'PAY TESLA, NOT THE FINE', P.ink, 104]]} />

      {/* # A) the two meters; the pool; the shared average */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={A1}>
          <LimitMeter x={480} y={GROUND - 20} value={105} limit={100} scale={4.2} label="BIG MOTORS" showLimit={on(f, g5, 8)} />
          <g opacity={on(f, tesla41, 8)}><LimitMeter x={1440} y={GROUND - 20} value={0} limit={100} scale={4.2} label="TESLA" /></g>
          <g opacity={on(f, under41, 8)}><Label x={1440} y={GROUND - 250} text="FAR UNDER" size={46} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, over41, 8)}><Label x={380} y={560} text="5 G OVER" size={46} font="Bebas Neue" color={P.coralInk} anchor="end" /></g>
          <g opacity={on(f, asks, 8)}><Person f={f} who="owner" beats={[[0, 'walkA', 'worried'], [asks + 10, 'offer', 'smiling']]} x={lerp(700, 1100, on(f, asks, 24))} y={GROUND} s={0.75} /></g>
          <PoolRing x={300} y={300} w={1320} h={660} p={span(f, pool42, pool42 + 24)} label="A POOL" />
          {/* # Tesla's 200,000 cars roll in */}
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, d200 + k * 3, 6)}><EVCar x={lerp(2100, 640 + k * 140, on(f, d200 + k * 3, 16))} y={GROUND} s={0.28} f={f} /></g>)}
          <g opacity={on(f, cars43, 8)}><Label x={780} y={GROUND + 56} text="200,000 TESLAS" size={44} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, zero43, 8)}><Label x={780} y={GROUND - 110} text="ALL 0 G" size={44} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
        <g opacity={A2}>
          {/* # the pool's shared average falls under the shared limit */}
          <PoolRing x={260} y={250} w={1400} h={700} p={1} label="ONE POOL" />
          <g opacity={on(f, together, 8)}>{[0, 1, 2].map((k) => <GasCar key={k} x={420 + k * 170} y={GROUND - 20} s={0.3} f={f} puff={0} />)}<Label x={590} y={GROUND + 40} text="1,000,000 BIG MOTORS CARS" size={36} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, together + 6, 8)}>{[0, 1].map((k) => <EVCar key={k} x={1300 + k * 170} y={GROUND - 20} s={0.3} f={f} />)}<Label x={1385} y={GROUND + 40} text="200,000 TESLAS" size={36} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, average44, 8)}><LimitMeter x={960} y={GROUND - 100} value={poolAvg} limit={100} scale={3.8} showLimit={on(f, shared, 8)} label="" /></g>
          <g opacity={on(f, half, 8)}><Label x={960} y={GROUND - 30} text="105 → 87.5 G" size={44} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, d100, 8)}><Label x={1100} y={GROUND - 100 - 100 * 3.8 - 40} text="SHARED LIMIT 100 G (MADE UP)" size={32} font="Bebas Neue" color={P.ink2} anchor="start" /></g>
          <g opacity={on(f, under45, 8)}><path d="M1250 620 L1270 640 L1310 590" fill="none" stroke={P.mintInk} strokeWidth={12} strokeLinecap="round" /></g>
          <g opacity={on(f, nobody, 8)} transform={`translate(1500 650) scale(${lerp(1.2, 0.8, on(f, fine45, 14))})`}><FineBill x={0} y={0} amount="€475M" /><path d="M-130 -90 L130 90 M130 -90 L-130 90" stroke={P.mintInk} strokeWidth={16} strokeLinecap="round" opacity={on(f, fine45, 6)} /></g>
        </g>
      </g>}

      {/* # B) the price; why not build EVs */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={B1}>
          <Factory x={330} y={GROUND} s={0.75} name="BIG MOTORS" f={f} smoke color="#6A5A6A" />
          <Factory x={1590} y={GROUND} s={0.75} name="TESLA" color="#3E4A61" />
          {f >= pays46 && [0, 1, 2].map((k) => { const fl = fly(f, pays46 + k * 5, [420, GROUND - 200], [1500, GROUND - 200], 22, 140); return fl.t < 1 ? <Coin2 key={k} x={fl.x} y={fl.y} r={26} t="$" /> : null })}
          {/* # fine vs price bars */}
          <g opacity={on(f, price47, 8)}>
            <rect x={700} y={GROUND - lerp(0, 475, on(f, fine47, 16))} width={180} height={lerp(0, 475, on(f, fine47, 16))} rx={12} fill={P.coral} />
            <Label x={790} y={GROUND + 56} text="THE FINE" size={44} font="Bebas Neue" color={P.ink} />
            <rect x={1000} y={GROUND - lerp(0, 300, on(f, price47, 16))} width={180} height={lerp(0, 300, on(f, price47, 16))} rx={12} fill={P.gold} />
            <Label x={1090} y={GROUND + 56} text="TESLA'S PRICE" size={44} font="Bebas Neue" color={P.ink} />
            <g opacity={on(f, less48, 8)}><rect x={1000} y={GROUND - 475} width={180} height={175} rx={12} fill={P.mint} opacity={0.8} /><Label x={1090} y={GROUND - 375} text="SAVED" size={44} font="Bebas Neue" color="#FFFFFF" /></g>
          </g>
          <g opacity={on(f, cash48, 8)}><MoneyBag x={1590} y={GROUND - 330} s={0.7} text="$" /></g>
          <g opacity={on(f, never, 8)}><Label x={1590} y={GROUND - 520} text="ROOM IT DIDN'T NEED" size={40} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={B2}>
          {/* # building EVs takes years; the fine arrives every year */}
          <g opacity={on(f, why, 8)} transform="translate(420 520)"><rect x={-200} y={-140} width={400} height={280} rx={10} fill="#2B5A8A" />{[-100, -40, 20, 80].map((ly) => <line key={ly} x1={-180} y1={ly} x2={180} y2={ly} stroke="#FFFFFF" strokeOpacity={0.2} strokeWidth={2} />)}
            <g transform="translate(0 60) scale(0.7)"><path d="M-196 -36 Q-196 -76 -160 -86 L-70 -100 Q-30 -158 30 -160 L80 -160 Q130 -158 168 -104 L190 -96 Q208 -86 208 -50 L208 -34 L-196 -34 Z" fill="none" stroke="#FFFFFF" strokeWidth={5} strokeDasharray="12 8" /></g>
            <text y={-90} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>NEW EV PLAN</text></g>
          <g opacity={on(f, many, 8)}><Label x={420} y={GROUND + 40} text="MANY DO, OVER TIME" size={40} font="Bebas Neue" color={P.mintInk} /></g>
          {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, takes + k * 6, 6)} transform={`translate(${900 + k * 230} 360)`}><rect x={-90} y={-36} width={180} height={72} rx={12} fill={P.navy3} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>{`YEAR ${k + 1}`}</text>
            <g opacity={on(f, every50 - 18 + k * 6, 6)}><FineBill x={0} y={190} s={0.5} amount="€€€" /></g></g>)}
          <g opacity={on(f, design, 8)}><Label x={1250} y={460} text={f >= build50 ? 'DESIGN, THEN BUILD' : 'DESIGN'} size={40} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, arrives, 8)}><Label x={1250} y={GROUND + 40} text="A FINE EVERY YEAR" size={40} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, paying, 8)}><path d="M650 760 Q960 700 1600 760" fill="none" stroke={P.mintInk} strokeWidth={10} strokeLinecap="round" strokeDasharray="1200" strokeDashoffset={1200 * (1 - span(f, paying, rival51 + 14))} /><Label x={1130} y={700} text="PAY A RIVAL" size={46} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
      </g>}

      {/* # C) the real deals */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={C1}>
          <g opacity={on(f, example, 8) * (1 - on(f, y2025 - 6, 10))}>
            <g opacity={on(f, y2019, 8)} transform={`translate(960 ${330 - 14 * pop(f, y2019, 12)})`}><rect x={-100} y={-44} width={200} height={88} rx={12} fill={P.navy3} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 60px "Bebas Neue"' }}>2019</text></g>
            <Sign x={lerp(200, 620, on(f, fiat, 16))} y={640} t="FIAT CHRYSLER" o={on(f, fiat, 8)} />
            <Sign x={1300} y={640} t="TESLA" col="#3E4A61" o={on(f, agreed, 8)} />
            <PoolRing x={420} y={540} w={1080} h={200} p={span(f, pool53, teslas53 + 20)} label="POOL" />
            <g opacity={on(f, cars53(), 8)}>{[0, 1].map((k) => <GasCar key={k} x={540 + k * 170} y={GROUND} s={0.32} f={f} puff={0} />)}{[0, 1].map((k) => <EVCar key={k} x={1220 + k * 170} y={GROUND} s={0.32} f={f} />)}</g>
          </g>
          <g opacity={on(f, y2025 - 6, 10)}>
            <g opacity={on(f, y2025, 8)} transform={`translate(960 ${300 - 14 * pop(f, y2025, 12)})`}><rect x={-100} y={-44} width={200} height={88} rx={12} fill={P.navy3} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 60px "Bebas Neue"' }}>2025</text></g>
            {NAMES.map(([at, t], k) => <Sign key={k} x={280 + k * 340} y={520 - 14 * pop(f, at, 12)} t={t} o={on(f, at, 6)} s={0.95} />)}
            <Sign x={960} y={760} t="TESLA" col="#3E4A61" o={on(f, tesla54, 8)} />
            <PoolRing x={120} y={440} w={1680} h={400} p={span(f, filed, tesla54 + 20)} label="ONE POOL FOR 2025" />
          </g>
        </g>
        <g opacity={C2}>
          {/* # the price stays private; the total is reported */}
          <g transform="translate(560 560)"><rect x={-200} y={-130} width={400} height={260} rx={14} fill="#E9DCC0" /><path d="M-200 -130 L0 20 L200 -130" fill="none" stroke="#C9B48A" strokeWidth={6} /><circle cx={0} cy={20} r={34} fill={P.coral} />
            <g opacity={on(f, much55, 8)}><text y={110} textAnchor="middle" fill={P.ink} style={{ font: '400 44px "Bebas Neue"' }}>PRICE: ?</text></g></g>
          <g opacity={on(f, paid55, 8)}><Label x={560} y={GROUND + 40} text="EACH DEAL'S PRICE: PRIVATE" size={40} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, tesla56, 8)} transform={`translate(1380 ${560 - 20 * pop(f, report, 14)})`}>
            <rect x={-170} y={-220} width={340} height={440} rx={12} fill={P.paper} stroke={P.edge} strokeWidth={4} />
            <text y={-150} textAnchor="middle" fill={P.navy0} style={{ font: '400 46px "Bebas Neue"' }}>TESLA ANNUAL REPORT</text>
            {[-90, -50, -10].map((ly) => <rect key={ly} x={-130} y={ly} width={260} height={12} rx={6} fill="#D9DFE8" />)}
            <g opacity={on(f, total, 8)}><rect x={-140} y={40} width={280} height={90} rx={12} fill={P.gold} /><text y={100} textAnchor="middle" fill={P.navy0} style={{ font: '400 40px "Bebas Neue"' }}>{f >= credits56 ? 'CREDITS: TOTAL $' : 'TOTAL $'}</text></g>
            <g opacity={on(f, every56, 8)}><text y={180} textAnchor="middle" fill={P.ink2} style={{ font: '400 36px "Bebas Neue"' }}>EVERY YEAR</text></g>
          </g>
        </g>
        <g opacity={C3}>
          <LimitMeter x={420} y={GROUND - 20} value={105} limit={100} scale={3.8} label="A RIVAL" />
          <g opacity={on(f, pay57, 8)}>{(() => { const fl = fly(f, pay57, [520, 500], [1500, 520], 22, 140); return <Coin2 x={fl.x} y={fl.y} r={34} t="$" /> })()}<Factory x={1500} y={GROUND} s={0.7} name="TESLA" color="#3E4A61" /></g>
          <g opacity={on(f, instead57, 8)} transform="translate(960 380)"><FineBill x={0} y={0} s={0.7} amount="FINE" /><path d="M-110 -70 L110 70 M110 -70 L-110 70" stroke={P.coralInk} strokeWidth={14} strokeLinecap="round" opacity={on(f, fine57, 6)} /></g>
        </g>
      </g>}
      <Vignette id="ts-deal" />
    </g>
  )
  function cars53() { return c('s53:cars') }
}

const BEATS = ['s40:step', 's40:deal', 's41:5', 's41:over', 's41:tesla', 's41:under', 's42:asks', 's42:join', 's42:pool', 's43:200', 's43:cars', 's43:zero', 's43:madeup', 's44:together', 's44:1', 's44:average', 's44:drops', 's44:105', 's44:87', 's44:half', 's45:shared', 's45:100', 's45:now', 's45:under', 's45:nobody', 's45:fine', "s46:doesn't", 's46:free', 's46:pays', 's46:join', 's47:price', 's47:lower', 's47:fine', 's47:sense', 's48:less', 's48:fine', 's48:gets', 's48:cash', 's48:never', 's49:why', 's49:build', 's49:instead', 's49:time', 's49:many', 's50:takes', 's50:years', 's50:design', 's50:build', 's50:fine', 's50:arrives', 's50:every', 's51:paying', 's51:rival', 's51:quicker', 's51:cheaper', "s52:isn't", 's52:example', 's53:2019', 's53:fiat', 's53:agreed', 's53:pool', 's53:cars', "s53:tesla's", 's54:2025', 's54:stellantis', 's54:toyota', 's54:ford', 's54:mazda', 's54:subaru', 's54:filed', 's54:tesla', 's55:companies', 's55:publish', 's55:much', 's55:paid', 's56:tesla', 's56:report', 's56:total', 's56:credits', 's56:every', 's57:step', 's57:rivals', 's57:miss', 's57:pay', 's57:instead', 's57:fine']
export const TS_DEAL = makePiece('ts-deal', 'Tesla long step 3: Big Motors 105 g over vs Tesla 0 g; Big Motors asks Tesla to pool; 200,000 Teslas (made up) join; pool average drops 105 → 87.5 g under a shared 100 g limit, no fine; Tesla charges a price lower than the €475M fine, the difference saved; why not build EVs: a new EV plan takes years while a fine arrives every year, paying a rival is quicker; real deals: 2019 Fiat Chrysler pooled with Tesla; 2025 Stellantis, Toyota, Ford, Mazda and Subaru filed to pool with Tesla; prices private, Tesla reports the yearly total; pay Tesla, not the fine', {
  mood: 'light', Component: Deal, beats: BEATS,
  sfx: [['s42:pool', 'whoosh', 0.2], ['s44:87', 'pop', 0.25], ['s45:fine', 'swish', 0.2], ['s46:pays', 'coin', 0.25], ['s48:less', 'pop', 0.2], ['s50:arrives', 'thud', 0.2], ['s53:fiat', 'pop', 0.2], ['s54:stellantis', 'pop', 0.15], ['s56:report', 'swish', 0.2], ['s57:pay', 'coin', 0.25]] })
