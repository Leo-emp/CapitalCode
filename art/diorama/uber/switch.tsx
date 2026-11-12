// ---------------------------------------------------------------- s60–s81: step four — the switch.
// A) A zero line: on "2023" a green bar rises above it (+$1.1B), on "2025" a taller one (+$5.6B); the investor cheers.
//    Trips: a 2019 row of cars, then a 2025 row twice as long; a day dial with a stream of cars (37 million a day).
//    "Divide again": the old red −$1.25 coin flips to a gold +41¢ coin. The note: a box marked OPERATING PROFIT holds a car
//    and a food bag; taxes and an investments chart get pushed outside it ("leaves out").
// B) "What changed?" First: two coin stacks per trip, $1.88 (2019) → $3.83 (2025). The UK caveat: a fare bill goes
//    whole into Uber's revenue box, and the driver's pay leaves as a cost. Revenue bars 13 → 52 (×4). People spend
//    $193B through the apps: a basket; per trip $9.40 → $14.30; a car and a food bag mixed, a price tag rising: not clean.
// C) Second: costs. Cost bars 21.6 → 46.5 beside revenue 13 → 52: double vs quadruple. The same app, engineers and
//    offices (three tiles) carry a cost slab; it is cut over twice as many cars, each piece smaller. Mia's ride today:
//    the slice taller than its share of costs, a green coin left over. Recap: three icons → LOSS flips to PROFIT.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { CostTile, FareBill, RideCar, USpot } from './kit'

const GROUND = 920

// # a food delivery bag (Uber Eats side), drawn simply
const FoodBag: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-60 -110 L60 -110 L70 0 L-70 0 Z" fill="#7FC98F" /><path d="M-30 -110 Q-30 -150 0 -150 Q30 -150 30 -110" fill="none" stroke="#3E8E5A" strokeWidth={8} />
    <circle cx={0} cy={-56} r={22} fill="#FFFFFF" /><path d="M-8 -64 L-8 -46 M8 -64 L8 -46" stroke="#3E8E5A" strokeWidth={4} />
  </g>
)

// # a coin with a value, red for a loss and gold for a profit; `flip` 0–1 turns it edge-on and back
const ValueCoin: React.FC<{ x: number; y: number; r: number; flip: number; a: string; b: string }> = ({ x, y, r, flip, a, b }) => {
  const sx = Math.abs(Math.cos(flip * Math.PI)), second = flip > 0.5
  return <g transform={`translate(${x} ${y}) scale(${Math.max(0.04, sx)} 1)`}>
    <circle r={r} fill={second ? P.gold : P.coral} /><circle r={r * 0.8} fill="none" stroke={second ? P.goldD : '#B5413A'} strokeWidth={6} />
    <text y={r * 0.22} textAnchor="middle" fill={second ? P.navy0 : '#FFFFFF'} style={{ font: `400 ${Math.round(r * 0.62)}px "Bebas Neue"` }}>{second ? b : a}</text>
  </g>
}

const Switch: React.FC<PieceProps> = ({ f, c }) => {
  const step60 = c('s60:step'), bet60 = c('s60:bet'), pay60 = c('s60:pay')
  const y23 = c('s61:2023'), operating61 = c('s61:operating'), first61 = c('s61:first'), d11 = c('s61:11')
  const y25 = c('s62:2025'), reached = c('s62:reached'), d56 = c('s62:56')
  const handled = c('s63:handled'), d136 = c('s63:136'), trips63 = c('s63:trips'), twice63 = c('s63:twice'), y19b = c('s63:2019')
  const d37 = c('s64:37'), every64 = c('s64:every'), day64 = c('s64:day')
  const divide = c('s65:divide'), makes = c('s65:makes'), d41 = c('s65:41'), instead = c('s65:instead'), losing65 = c('s65:losing')
  const note = c('s66:note'), operating66 = c('s66:operating'), running66 = c('s66:running'), business66 = c('s66:business')
  const leaves = c('s67:leaves'), taxes = c('s67:taxes'), value67 = c('s67:value'), investments = c('s67:investments'), shows = c('s67:shows'), rides67 = c('s67:rides'), deliveries67 = c('s67:deliveries'), pay67 = c('s67:pay')
  const what = c('s68:what'), changed = c('s68:changed')
  const first69 = c('s69:first'), collects = c('s69:collects'), more69 = c('s69:more')
  const y19 = c('s70:2019'), revenue70 = c('s70:revenue'), d88 = c('s70:88'), trip70 = c('s70:trip'), y25b = c('s70:2025'), d83 = c('s70:83')
  const jump = c('s71:jump'), accounting = c('s71:accounting'), countries = c('s71:countries'), uk = c('s71:uk'), whole = c('s71:whole'), revenue71 = c('s71:revenue'), drivers71 = c("s71:driver's"), cost71 = c('s71:cost')
  const bigger72 = c('s72:bigger'), revenue72 = c('s72:revenue'), d13 = c('s72:13'), d52 = c('s72:52'), four72 = c('s72:four')
  const people73 = c('s73:people'), spend = c('s73:spend'), apps = c('s73:apps'), d193 = c('s73:193')
  const per74 = c('s74:per'), d14 = c('s74:14'), up74 = c('s74:up'), d9 = c('s74:9')
  const mixes = c('s75:mixes'), food = c('s75:food'), prices = c('s75:prices'), rose = c('s75:rose'), clean = c('s75:clean')
  const second = c('s76:second'), costs76 = c('s76:costs'), slowly = c('s76:slowly')
  const y19c = c('s77:2019'), spent = c('s77:spent'), d216 = c('s77:216'), everything77 = c('s77:everything'), y25c = c('s77:2025'), d465 = c('s77:465')
  const double = c('s78:double'), revenue78 = c('s78:revenue'), quadrupled = c('s78:quadrupled')
  const same79 = c('s79:same'), app79 = c('s79:app'), engineers = c('s79:engineers'), offices = c('s79:offices'), serve = c('s79:serve'), twice79 = c('s79:twice'), each79 = c('s79:each'), less79 = c('s79:less')
  const mia80 = c('s80:mia'), today80 = c('s80:today'), slice80 = c('s80:slice'), bigger80 = c('s80:bigger'), costs80 = c('s80:costs'), money80 = c('s80:money'), left80 = c('s80:left')
  const step81 = c('s81:step'), trips81 = c('s81:trips'), money81 = c('s81:money'), slower = c('s81:slowergrowing'), turned = c('s81:turned'), profit81 = c('s81:profit')

  const AB = what - 6, BC = second - 6
  const A = win(f, step60 - 30, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const A1 = 1 - on(f, d136 - 6, 10), A2 = on(f, d136 - 6, 10) * (1 - on(f, divide - 6, 10)), A3 = on(f, divide - 6, 10) * (1 - on(f, note - 4, 10)), A4 = on(f, note - 4, 10)
  const B1 = 1 - on(f, jump - 6, 10), B2 = on(f, jump - 6, 10) * (1 - on(f, bigger72 - 4, 10)), B3 = on(f, bigger72 - 4, 10) * (1 - on(f, people73 - 4, 10)), B4 = on(f, people73 - 4, 10)
  const C1 = 1 - on(f, app79 - 6, 10), C2 = on(f, app79 - 6, 10) * (1 - on(f, mia80 - 6, 10)), C3 = on(f, mia80 - 6, 10) * (1 - on(f, step81 - 4, 10)), C4 = on(f, step81 - 4, 10)

  return (
    <g>
      <Stage id="ub-switch" frame={f} />
      <USpot f={f} at={d56} x={1180} y={420} rx={200} ry={200} />
      <USpot f={f} at={d41} x={1260} y={520} rx={200} ry={200} />
      <USpot f={f} at={d83} x={1280} y={560} rx={200} ry={220} />
      <USpot f={f} at={quadrupled} x={1300} y={560} rx={220} ry={220} />
      <USpot f={f} at={left80} x={1280} y={420} rx={160} ry={160} />
      <Headline f={f} lines={[[step60, 'STEP 4: THE SWITCH', P.ink, 104], [d11, '2023: FIRST OPERATING PROFIT ≈ $1.1B', P.mintInk, 84], [d56, '2025: ≈ $5.6B', P.mintInk, 104], [d136, '≈ 13.6 BILLION TRIPS A YEAR', P.ink, 96], [d37, '≈ 37 MILLION A DAY', P.ink, 104], [d41, '≈ +41¢ PER TRIP', P.mintInk, 110], [note, 'OPERATING PROFIT = THE BUSINESS ITSELF', P.ink, 80], [what, 'WHAT CHANGED?', P.ink, 110], [first69, '1) MORE PER TRIP', P.ink, 104], [accounting, 'PART OF IT: AN ACCOUNTING CHANGE', P.ink, 84], [d52, 'REVENUE ×4', P.ink, 110], [d193, '≈ $193B SPENT IN THE APPS (2025)', P.ink, 84], [clean, 'NOT A CLEAN FARE COMPARISON', P.ink2, 84], [second, '2) COSTS GREW SLOWER', P.ink, 104], [quadrupled, 'COSTS ×2.15, REVENUE ×4', P.ink, 96], [each79, 'LESS COST PER TRIP', P.ink, 104], [left80, 'MONEY LEFT OVER', P.mintInk, 104], [step81, 'LOSS → PROFIT', P.ink, 110]]} />

      {/* # A) the profit bars, the trips, the coin flip, the note */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={A1}>
          <Person f={f} who="investor" beats={[[0, 'think', 'thinking'], [pay60, 'celebrate', 'smiling'], [d11, 'thumbsUp', 'smiling'], [d56, 'fistPump', 'smiling']]} x={330} y={GROUND} s={0.85} />
          <line x1={720} y1={720} x2={1620} y2={720} stroke={P.ink} strokeWidth={5} /><Label x={700} y={732} text="$0" size={44} font="Bebas Neue" color={P.ink} anchor="end" />
          {/* # the old red losses fade below the line as "the bet started to pay" */}
          <g opacity={on(f, step60, 8) * (1 - on(f, y23, 10))}>{[4.1, 3, 8.6, 4.9, 3.8, 1.8].map((v, k) => <rect key={k} x={760 + k * 140} y={720} width={90} height={v * 18} rx={8} fill={P.coral} opacity={0.6} />)}</g>
          {([[y23, operating61, 1.1, '2023', '+$1.1B', 900], [y25, reached, 5.6, '2025', '+$5.6B', 1180]] as [number, number, number, string, string, number][]).map(([yk, gk, v, t, lab, x], k) => {
            const h = lerp(0, v * 70, on(f, gk, 20))
            return <g key={k} opacity={on(f, yk, 8)}>
              <rect x={x - 80} y={720 - h} width={160} height={h} rx={12} fill={P.mint} />
              <Label x={x} y={790} text={t} size={48} font="Bebas Neue" color={P.ink} />
              <g opacity={on(f, k === 0 ? d11 : d56, 8)}><Label x={x} y={700 - h} text={lab} size={52} font="Bebas Neue" color={P.mintInk} /></g>
            </g> })}
          <g opacity={on(f, first61, 8)}><g transform={`translate(900 520) rotate(-8) scale(${lerp(0.7, 1, pop(f, first61, 14))})`}><rect x={-120} y={-40} width={240} height={80} rx={12} fill="none" stroke={P.mintInk} strokeWidth={6} /><text y={16} textAnchor="middle" fill={P.mintInk} style={{ font: '400 46px "Bebas Neue"' }}>FIRST TIME</text></g></g>
        </g>
        <g opacity={A2}>
          {/* # trips: 2019 row vs 2025 row, twice as long */}
          <g opacity={on(f, handled, 8) * (1 - on(f, d37 - 4, 10))}>
            <g opacity={on(f, twice63, 8)}><Label x={180} y={480} text="2019" size={50} font="Bebas Neue" color={P.ink2} anchor="start" />
              {Array.from({ length: 4 }, (_, k) => <g key={k} transform={`translate(${420 + k * 170} 470) scale(0.32)`}><RideCar x={0} y={0} f={0} color="#8A97AA" /></g>)}<Label x={1160} y={480} text="≈ 6.9B" size={46} font="Bebas Neue" color={P.ink2} anchor="start" /></g>
            <Label x={180} y={720} text="2025" size={50} font="Bebas Neue" color={P.ink} anchor="start" />
            {Array.from({ length: 8 }, (_, k) => <g key={k} opacity={on(f, d136 + k * 3, 6)} transform={`translate(${420 + k * 170} 710) scale(0.32)`}><RideCar x={0} y={0} f={f} /></g>)}
            <g opacity={on(f, trips63, 8)}><Label x={1800} y={720} text="≈ 13.6B" size={46} font="Bebas Neue" color={P.ink} anchor="end" /></g>
          </g>
          {/* # 37 million a day: a day dial with cars streaming past */}
          <g opacity={on(f, d37, 8)}>
            {Array.from({ length: 9 }, (_, k) => <g key={k} transform={`translate(${((k * 240 + (f - d37) * 14) % 2160) - 120} ${GROUND - 10}) scale(0.3)`}><RideCar x={0} y={0} f={f} /></g>)}
            <g opacity={on(f, every64, 8)} transform="translate(960 500) scale(1.6)"><circle r={90} fill={P.card} stroke={P.ink} strokeWidth={6} /><line x1={0} y1={0} x2={0} y2={-64} stroke={P.ink} strokeWidth={7} strokeLinecap="round" transform={`rotate(${(f - day64) * 12})`} /><Label x={0} y={140} text="EVERY DAY" size={42} font="Bebas Neue" color={P.ink} /></g>
          </g>
        </g>
        <g opacity={A3}>
          {/* # divide again: the profit pile over the trips; the coin flips from −$1.25 to +41¢ */}
          <rect x={300} y={GROUND - 340} width={220} height={340} rx={14} fill={P.mint} /><Label x={410} y={GROUND + 60} text="$5.6B PROFIT" size={44} font="Bebas Neue" color={P.ink} />
          <Label x={690} y={GROUND - 170} text="÷" size={140} font="Bebas Neue" color={P.ink} />
          {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, divide + k * 2, 6)} transform={`translate(${880 + (k % 3) * 180} ${GROUND - 40 - Math.floor(k / 3) * 150}) scale(0.28)`}><RideCar x={0} y={0} f={f} /></g>)}
          <Label x={1060} y={GROUND + 60} text="13.6B TRIPS" size={44} font="Bebas Neue" color={P.ink} />
          <g opacity={on(f, makes, 8)}><ValueCoin x={1560} y={520} r={150} flip={on(f, d41 - 8, 16)} a="−$1.25" b="+41¢" /></g>
          <g opacity={on(f, losing65, 8)} transform={`translate(1560 ${780 - 16 * pop(f, c('s65:25'), 12)})`}><ValueCoin x={0} y={0} r={60} flip={0} a="−$1.25" b="" /><Label x={0} y={110} text="2019" size={40} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        <g opacity={A4}>
          {/* # the note: what's inside operating profit, and what's left out */}
          <g opacity={on(f, operating66, 8)}><rect x={520} y={300} width={880} height={560} rx={28} fill="none" stroke={P.mintInk} strokeWidth={8} /><Label x={960} y={290} text="OPERATING PROFIT" size={52} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, running66, 8)}><RideCar x={800} y={760} s={0.9} f={f} /></g>
          <g opacity={on(f, business66, 8)}><FoodBag x={1180} y={760} s={1.3} /></g>
          <g opacity={on(f, rides67, 8)}><Label x={800} y={560} text="RIDES" size={46} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, deliveries67, 8)}><Label x={1180} y={560} text="DELIVERIES" size={46} font="Bebas Neue" color={P.ink} /></g>
          {/* # taxes and investments pushed outside the box */}
          <g opacity={on(f, taxes, 8)} transform={`translate(260 ${560 - 16 * pop(f, taxes, 12)})`}><rect x={-90} y={-110} width={180} height={220} rx={10} fill={P.paper} stroke={P.edge} strokeWidth={4} /><text y={-50} textAnchor="middle" fill={P.navy0} style={{ font: '400 46px "Bebas Neue"' }}>TAX</text>{[0, 1, 2].map((k) => <rect key={k} x={-60} y={-10 + k * 30} width={120} height={10} rx={5} fill="#D9DFE8" />)}</g>
          <g opacity={on(f, value67, 8)} transform={`translate(1660 ${560 - 16 * pop(f, value67, 12)})`}><rect x={-110} y={-100} width={220} height={200} rx={14} fill={P.card} stroke={P.edge} strokeWidth={4} /><path d="M-80 50 L-30 0 L10 30 L80 -50" fill="none" stroke={P.sky} strokeWidth={8} strokeLinecap="round" /><text y={140} textAnchor="middle" fill={P.ink} style={{ font: '400 36px "Bebas Neue"' }}>INVESTMENTS</text></g>
          <g opacity={on(f, leaves, 8)}><Label x={260} y={760} text="LEFT OUT" size={40} font="Bebas Neue" color={P.ink2} /><Label x={1660} y={760} text="LEFT OUT" size={40} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, pay67, 8)} transform={`translate(960 440) scale(${lerp(0.6, 1, pop(f, pay67, 14))})`}><circle r={44} fill={P.mint} /><path d="M-18 0 L-4 14 L20 -14" fill="none" stroke="#FFFFFF" strokeWidth={9} strokeLinecap="round" /></g>
          <g opacity={on(f, shows, 8) * (1 - on(f, pay67, 8))} transform="translate(960 440)"><circle r={44} fill={P.gold} /><text y={18} textAnchor="middle" fill={P.navy0} style={{ font: '400 54px "Bebas Neue"' }}>?</text></g>
        </g>
      </g>}

      {/* # B) more per trip; the UK caveat; revenue ×4; spending through the apps */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={B1}>
          <Person f={f} who="hero" beats={[[0, 'shrug', 'thinking'], [first69, 'point', 'smiling'], [d83, 'present', 'smiling']]} x={300} y={GROUND} s={0.8} />
          <g opacity={on(f, changed, 8) * (1 - on(f, collects, 8))}><Label x={300} y={GROUND - 430} text="?" size={110} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, collects, 8)}>
            <RideCar x={880} y={GROUND - 10} s={0.55} f={0} color="#8A97AA" /><RideCar x={1380} y={GROUND - 10} s={0.55} f={0} />
          </g>
          {/* # revenue per trip: a coin stack on each car */}
          {([[y19, d88, 4, '2019', '$1.88', 880], [y25b, d83, 8, '2025', '$3.83', 1380]] as [number, number, number, string, string, number][]).map(([yk, vk, n, t, lab, x], k) => (
            <g key={k} opacity={on(f, yk, 8)} transform={k === 1 ? `translate(0 ${-20 * pop(f, c('s71:part'), 12)})` : undefined}>
              {Array.from({ length: n }, (_, j) => <g key={j} opacity={on(f, (k === 0 ? revenue70 : y25b + 6) + j * 3, 5)}><ellipse cx={x} cy={GROUND - 150 - j * 36} rx={70} ry={20} fill={P.gold} stroke={P.goldD} strokeWidth={4} /></g>)}
              <Label x={x} y={GROUND + 60} text={t} size={48} font="Bebas Neue" color={P.ink} />
              <g opacity={on(f, vk, 8)}><Label x={x} y={GROUND - 200 - n * 36} text={lab} size={60} font="Bebas Neue" color={P.goldInk} /></g>
            </g>))}
          <g opacity={on(f, trip70, 8)}><Label x={1130} y={340} text="UBER'S REVENUE PER TRIP" size={44} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={B2}>
          {/* # the UK caveat: the whole fare counted as revenue, driver's pay as a cost */}
          <g opacity={on(f, accounting, 8)} transform="translate(300 400)"><rect x={-110} y={-70} width={220} height={140} rx={10} fill="#1F3A7A" /><path d="M-110 -70 L110 70 M110 -70 L-110 70" stroke="#FFFFFF" strokeWidth={22} /><path d="M-110 -70 L110 70 M110 -70 L-110 70" stroke="#C8303A" strokeWidth={8} /><rect x={-110} y={-18} width={220} height={36} fill="#FFFFFF" /><rect x={-18} y={-70} width={36} height={140} fill="#FFFFFF" /><rect x={-110} y={-10} width={220} height={20} fill="#C8303A" /><rect x={-10} y={-70} width={20} height={140} fill="#C8303A" />
            <g opacity={on(f, uk, 8)}><Label x={0} y={120} text="E.G. THE UK" size={44} font="Bebas Neue" color={P.ink} /></g></g>
          <g transform={`translate(${lerp(0, 380, on(f, whole, 18))} ${lerp(0, 120, on(f, whole, 18))})`}><g opacity={on(f, whole, 6)}><Label x={900} y={196} text="THE WHOLE FARE" size={44} font="Bebas Neue" color={P.ink} /></g><FareBill x={900} y={240} w={600} split={0} text="FARE" /></g>
          <g opacity={on(f, revenue71, 8)}><rect x={950} y={330} width={700} height={290} rx={20} fill="none" stroke={P.navy3} strokeWidth={8} /><Label x={1300} y={670} text="UBER'S REVENUE" size={46} font="Bebas Neue" color={P.ink} /></g>
          {(() => { const fl = fly(f, drivers71, [1500, 500], [520, GROUND - 160], 22, 120)
            return f >= drivers71 ? <g transform={`translate(${fl.x} ${fl.y})`}><rect x={-110} y={-50} width={220} height={100} rx={12} fill="#9D7FD0" /><text y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 42px "Bebas Neue"' }}>DRIVER'S PAY</text></g> : null })()}
          <g opacity={on(f, cost71, 8)}><Label x={520} y={GROUND + 60} text="COUNTED AS A COST" size={44} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={B3}>
          {([[bigger72, d13, 13, '2019', '$13B', 800], [d52 - 20, d52, 52, '2025', '$52B', 1200]] as [number, number, number, string, string, number][]).map(([at, vk, v, t, lab, x], k) => {
            const h = lerp(0, v * 10.5, on(f, k === 0 ? at + 4 : vk, 22))
            return <g key={k} opacity={on(f, at, 8)}><rect x={x - 100} y={GROUND - h} width={200} height={h} rx={14} fill={P.navy3} /><Label x={x} y={GROUND + 60} text={t} size={48} font="Bebas Neue" color={P.ink} /><g opacity={on(f, vk, 8)}><Label x={x} y={GROUND - h - 30} text={lab} size={56} font="Bebas Neue" color={P.ink} /></g></g> })}
          {/* # ×4: four copies of the small bar stack up beside the big one */}
          <g opacity={on(f, four72, 8)}>{[0, 1, 2, 3].map((k) => <rect key={k} x={1420} y={GROUND - 136.5 * (k + 1)} width={120} height={130} rx={10} fill={P.navy3} opacity={on(f, four72 + k * 3, 5)} />)}<Label x={1480} y={GROUND + 60} text="= 4 × 2019" size={44} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, bigger72, 8)}><Label x={400} y={500} text="REVENUE" size={60} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={B4}>
          {/* # people spend through the apps: a basket filling */}
          {Array.from({ length: 5 }, (_, k) => <g key={k} opacity={on(f, people73 + k * 2, 6) * (1 - on(f, per74 - 4, 10))}><Person f={f} who={['buyer', 'investorF', 'hero', 'worker', 'owner'][k]} beats={[[0, 'phone', 'smiling']]} x={140 + k * 150} y={GROUND} s={0.5} /></g>)}
          {f >= spend && [0, 1, 2, 3, 4].map((k) => { const fl = fly(f, spend + k * 4, [140 + k * 150, GROUND - 200], [1100, 560], 20, 120); return fl.t < 1 ? <ellipse key={k} cx={fl.x} cy={fl.y} rx={30} ry={16} fill={P.gold} /> : null })}
          <g opacity={on(f, apps, 8) * (1 - on(f, mixes - 4, 10))} transform="translate(1100 620)"><path d="M-170 -60 L170 -60 L130 140 L-130 140 Z" fill="#C9A15A" /><path d="M-120 -60 Q0 -200 120 -60" fill="none" stroke="#8E6A2E" strokeWidth={12} /><rect x={-150} y={-60 - lerp(0, 60, on(f, d193, 20))} width={300} height={lerp(0, 60, on(f, d193, 20))} rx={20} fill={P.gold} />
            <g opacity={on(f, d193, 8)}><text y={60} textAnchor="middle" fill="#FFF6E2" style={{ font: '400 70px "Bebas Neue"' }}>$193B</text></g>
            <g opacity={on(f, c('s73:2025'), 8)} transform={`translate(0 ${200 - 12 * pop(f, c('s73:2025'), 12)})`}><rect x={-80} y={-34} width={160} height={68} rx={12} fill={P.navy3} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"' }}>IN 2025</text></g></g>
          {/* # per trip: a receipt $9.40 → $14.30 */}
          <g opacity={on(f, per74, 8)} transform="translate(1600 520)"><rect x={-140} y={-170} width={280} height={340} rx={10} fill={P.paper} stroke={P.edge} strokeWidth={4} /><text y={-110} textAnchor="middle" fill={P.ink2} style={{ font: '400 38px "Bebas Neue"' }}>SPENT PER TRIP</text>
            <g opacity={on(f, d14, 8)}><text y={-20} textAnchor="middle" fill={P.navy0} style={{ font: '400 80px "Bebas Neue"' }}>$14.30</text><text y={20} textAnchor="middle" fill={P.ink2} style={{ font: '400 32px "Bebas Neue"' }}>2025</text></g>
            <g opacity={on(f, d9, 8)} transform={`translate(0 ${-10 * pop(f, c('s74:2019'), 12)})`}><text y={100} textAnchor="middle" fill={P.ink2} style={{ font: '400 56px "Bebas Neue"' }}>$9.40</text><text y={136} textAnchor="middle" fill={P.ink2} opacity={on(f, c('s74:2019'), 8)} style={{ font: '400 30px "Bebas Neue"' }}>2019</text></g>
            <g opacity={on(f, up74, 8)}><path d="M160 60 L160 -60 M136 -36 L160 -60 L184 -36" fill="none" stroke={P.mintInk} strokeWidth={8} strokeLinecap="round" /></g></g>
          {/* # the caveat: rides and food mixed; prices rose */}
          <g opacity={on(f, mixes, 8)}>
            <g opacity={on(f, food, 8)}><FoodBag x={1100} y={330} s={0.8} /></g><g transform="translate(860 330) scale(0.4)"><RideCar x={0} y={0} f={0} /></g>
            <g opacity={on(f, prices, 8)} transform={`translate(1360 ${300 - 40 * on(f, rose, 14)})`}><rect x={-70} y={-34} width={140} height={68} rx={10} fill={P.paper} stroke={P.edge} strokeWidth={3} /><text y={16} textAnchor="middle" fill={P.navy0} style={{ font: '400 40px "Bebas Neue"' }}>PRICES</text><path d="M90 30 L90 -30 M72 -12 L90 -30 L108 -12" fill="none" stroke={P.coralInk} strokeWidth={7} strokeLinecap="round" /></g>
          </g>
        </g>
      </g>}

      {/* # C) costs grew slower; the same fixed costs over more trips; Mia today; recap */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={C1}>
          {/* # costs vs revenue, 2019 and 2025 */}
          {([[y19c, spent, 21.6, 600, '#9D7FD0', '$21.6B'], [y25c, d465, 46.5, 820, '#9D7FD0', '$46.5B'], [revenue78, revenue78, 13, 1180, P.navy3, '$13B'], [revenue78, quadrupled, 52, 1400, P.navy3, '$52B']] as [number, number, number, number, string, string][]).map(([at, vk, v, x, col, lab], k) => {
            const h = lerp(0, v * 9, on(f, vk, 20))
            return <g key={k} opacity={on(f, at, 8)}><rect x={x - 90} y={GROUND - h} width={180} height={h} rx={12} fill={col} /><Label x={x} y={GROUND + 56} text={k % 2 === 0 ? '2019' : '2025'} size={44} font="Bebas Neue" color={P.ink} /><g opacity={on(f, vk, 8)}><Label x={x} y={GROUND - h - 26} text={lab} size={48} font="Bebas Neue" color={P.ink} /></g></g> })}
          <g opacity={on(f, costs76, 8)}><Label x={710} y={300} text="COSTS" size={56} font="Bebas Neue" color={'#6F55A8'} /></g>
          <g opacity={on(f, revenue78, 8)}><Label x={1290} y={300} text="REVENUE" size={56} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, double, 8)}><Label x={710} y={360} text="×2.15" size={50} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, quadrupled, 8)}><Label x={1290} y={360} text="×4" size={50} font="Bebas Neue" color={P.mintInk} /></g>
          <Person f={f} who="hero" beats={[[0, 'point', 'smiling'], [slowly, 'present', 'smiling'], [quadrupled, 'thumbsUp', 'smiling']]} x={230} y={GROUND} s={0.75} />
          <g opacity={on(f, spent, 8) * (1 - on(f, y25c, 8))}><Label x={710} y={420} text="TO RUN EVERYTHING" size={40} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={C2}>
          {/* # the same app, engineers, offices: one cost slab, split over more trips */}
          {([[app79, 'engineers', 400], [engineers, 'engineers', 640], [offices, 'offices', 880]] as [number, 'engineers' | 'offices', number][]).map(([at, kind, x], k) => <g key={k} opacity={on(f, at, 8)}>{k === 0 ? <g transform={`translate(${x} 380)`}><rect x={-80} y={-80} width={160} height={160} rx={24} fill={P.navy3} /><rect x={-40} y={-64} width={80} height={128} rx={14} fill="#EEF3FA" /><text x={0} y={118} textAnchor="middle" fill={P.ink} style={{ font: '400 36px "Bebas Neue"' }}>APP</text></g> : <CostTile x={x} y={380} kind={kind} s={1} />}</g>)}
          {(() => { const n = f >= twice79 ? 8 : 4, w = 1200
            return <g opacity={on(f, app79, 8)}>
              {Array.from({ length: n }, (_, k) => { const x = 360 + (w / n) * (k + 0.5)
                return <g key={`${n}${k}`}><rect x={x - (w / n) / 2 + 6} y={600} width={w / n - 12} height={lerp(70, 40, on(f, less79, 14))} rx={8} fill="#9D7FD0" />
                  <g transform={`translate(${x} ${GROUND - 20}) scale(${n === 8 ? 0.26 : 0.36})`}><RideCar x={0} y={0} f={f} /></g></g> })}
              <Label x={960} y={580} text={f >= each79 ? 'EACH TRIP: A SMALLER SHARE' : 'SAME COSTS'} size={44} font="Bebas Neue" color={P.ink} />
            </g> })()}
        </g>
        <g opacity={C3}>
          {/* # Mia's ride today: the slice is now bigger than its share of the costs */}
          <Person f={f} who="investorF" beats={[[0, 'phone', 'smiling'], [today80, 'idle', 'smiling']]} x={300} y={GROUND} s={0.8} />
          <g opacity={on(f, mia80, 8)}><rect x={900} y={GROUND - 460} width={200} height={460} rx={14} fill="none" stroke={P.navy3} strokeWidth={4} strokeDasharray="10 8" /><rect x={900} y={GROUND - lerp(0, 460, on(f, slice80, 18))} width={200} height={lerp(0, 460, on(f, slice80, 18))} rx={14} fill={P.navy3} /><Label x={1000} y={GROUND + 56} text="UBER'S SLICE" size={42} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, mia80, 8)}><rect x={1180} y={GROUND - 360} width={200} height={360} rx={14} fill="none" stroke="#9D7FD0" strokeWidth={4} strokeDasharray="10 8" /><rect x={1180} y={GROUND - lerp(0, 360, on(f, costs80, 18))} width={200} height={lerp(0, 360, on(f, costs80, 18))} rx={14} fill="#9D7FD0" /><Label x={1280} y={GROUND + 56} text="ITS SHARE OF COSTS" size={42} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, bigger80, 8)}><rect x={900} y={GROUND - 460} width={200} height={100} rx={12} fill="none" stroke={P.mintInk} strokeWidth={6} strokeDasharray="12 8" /></g>
          {(() => { const fl = fly(f, money80, [1000, GROUND - 410], [1520, GROUND - 260], 20, 140); return f >= money80 ? <g transform={`translate(${fl.x} ${fl.y})`}><circle r={56} fill={P.mint} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 52px "Bebas Neue"' }}>+</text></g> : null })()}
          <g opacity={on(f, mia80, 8)}><RideCar x={560} y={GROUND - 10} s={0.55} f={f} rider /></g>
        </g>
        <g opacity={C4}>
          {/* # recap: three causes → the flip */}
          {([[trips81, 'MORE TRIPS'], [money81, 'MORE PER TRIP'], [slower, 'SLOWER COSTS']] as [number, string][]).map(([at, t], k) => (
            <g key={k} opacity={on(f, at, 8)} transform={`translate(${300 + k * 420} ${560 - 20 * pop(f, at, 14)})`}>
              <circle r={110} fill={[P.sky, P.gold, '#9D7FD0'][k]} opacity={0.35} />
              {k === 0 && <g transform="scale(0.38)"><RideCar x={0} y={60} f={f} /></g>}
              {k === 1 && [0, 1, 2].map((j) => <ellipse key={j} cx={0} cy={40 - j * 30} rx={60} ry={18} fill={P.gold} stroke={P.goldD} strokeWidth={4} />)}
              {k === 2 && <path d="M-60 40 Q0 20 60 -30" fill="none" stroke="#6F55A8" strokeWidth={10} strokeLinecap="round" />}
              <text y={170} textAnchor="middle" fill={P.ink} style={{ font: '400 46px "Bebas Neue"' }}>{t}</text>
            </g>))}
          <g opacity={on(f, step81, 8)} transform={`translate(1580 ${560 - 14 * pop(f, turned, 12)})`}>
            <g transform={`scale(${Math.max(0.04, Math.abs(Math.cos(on(f, profit81, 16) * Math.PI)))} 1)`}>
              <rect x={-170} y={-80} width={340} height={160} rx={24} fill={on(f, profit81, 16) > 0.5 ? P.mint : P.coral} />
              <text y={30} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 90px "Bebas Neue"' }}>{on(f, profit81, 16) > 0.5 ? 'PROFIT' : 'LOSS'}</text>
            </g>
          </g>
        </g>
      </g>}
      <Vignette id="ub-switch" />
    </g>
  )
}

const BEATS = ['s60:step', 's60:bet', 's60:pay', 's61:2023', 's61:operating', 's61:first', 's61:11', 's62:2025', 's62:reached', 's62:56', 's63:handled', 's63:136', 's63:trips', 's63:twice', 's63:2019', 's64:37', 's64:every', 's64:day', 's65:divide', 's65:makes', 's65:41', 's65:instead', 's65:losing', 's65:25', 's66:note', 's66:operating', 's66:running', 's66:business', 's67:leaves', 's67:taxes', 's67:value', 's67:investments', 's67:shows', 's67:rides', 's67:deliveries', 's67:pay', 's68:what', 's68:changed', 's69:first', 's69:collects', 's69:more', 's70:2019', 's70:revenue', 's70:88', 's70:trip', 's70:2025', 's70:83', 's71:part', 's71:jump', 's71:accounting', 's71:countries', 's71:uk', 's71:whole', 's71:revenue', "s71:driver's", 's71:cost', 's72:bigger', 's72:revenue', 's72:13', 's72:52', 's72:four', 's73:people', 's73:spend', 's73:apps', 's73:193', 's73:2025', 's74:per', 's74:14', 's74:up', 's74:9', 's74:2019', 's75:mixes', 's75:food', 's75:prices', 's75:rose', 's75:clean', 's76:second', 's76:costs', 's76:slowly', 's77:2019', 's77:spent', 's77:216', 's77:everything', 's77:2025', 's77:465', 's78:double', 's78:revenue', 's78:quadrupled', 's79:same', 's79:app', 's79:engineers', 's79:offices', 's79:serve', 's79:twice', 's79:each', 's79:less', 's80:mia', 's80:today', 's80:slice', 's80:bigger', 's80:costs', 's80:money', 's80:left', 's81:step', 's81:trips', 's81:money', 's81:slowergrowing', 's81:turned', 's81:profit']
export const UB_SWITCH = makePiece('ub-switch', 'Uber long step 4: green operating-profit bars rise above $0 (2023 +$1.1B first time, 2025 +$5.6B); trips 6.9B → 13.6B a year, 37 million a day; divide again: a red −$1.25 coin flips to gold +41¢; operating profit box holds rides and deliveries, taxes and investments pushed out; what changed: revenue per trip coin stacks $1.88 → $3.83, the UK accounting change (whole fare as revenue, driver pay as cost), revenue $13B → $52B ×4, $193B spent in the apps, $9.40 → $14.30 per trip with caveats; costs $21.6B → $46.5B (×2) vs revenue ×4; the same app/engineers/offices split over twice as many trips; Mia today: slice bigger than its share of costs, money left over; recap flips LOSS to PROFIT', {
  mood: 'light', Component: Switch, beats: BEATS,
  sfx: [['s61:11', 'pop', 0.25], ['s62:56', 'pop', 0.25], ['s64:37', 'whoosh', 0.2], ['s65:41', 'coin', 0.3], ['s67:taxes', 'swish', 0.2], ['s70:83', 'coin', 0.25], ['s71:driver\'s', 'swish', 0.2], ['s72:52', 'thud', 0.25], ['s73:193', 'coin', 0.25], ['s78:quadrupled', 'pop', 0.25], ['s80:left', 'coin', 0.25], ['s81:profit', 'whoosh', 0.3]] })
