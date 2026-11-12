// ---------------------------------------------------------------- s12–s30: step one — the store.
// A) Sam (made up) taps "order" on a phone: headphones. The warehouse: a worker picks the parcel off a shelf, it rides the
//    conveyor, a van drives it to Sam's door next day. Other sellers' stalls hand goods to Amazon, a fee coin flies back
//    ($172B of seller fees in 2025).
// B) The costs: a "warehouses $109B" bag and a "shipping $103B" bag fall out of the store's money pile; trucks, a plane,
//    drivers and a return arrow pop on their words. Money in (a tall gold column) and money straight back out.
// C) The thin slice: $588B of sales as a huge block, $34B of profit as a thin slice on top; "6¢ per $1". A $100 order:
//    94 coins go out to products, warehouses, delivery; 6 stay. "Outside North America": red bars 2021–2023, green 2024.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Mini } from '../../rig/Mini'
import { Coin2, MapPhone, MoneyBag } from '../uber/kit'
import { ASpot, Parcel, Van, Warehouse } from './kit'

const GROUND = 900

// # a small market stall for another seller
const Stall: React.FC<{ x: number; y: number; o?: number; col: string; t: string }> = ({ x, y, o = 1, col, t }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}><rect x={-90} y={-120} width={180} height={120} rx={8} fill="#F2E6CC" stroke="#C9B48A" strokeWidth={4} /><path d="M-110 -120 L110 -120 L95 -170 L-95 -170 Z" fill={col} /><text y={-50} textAnchor="middle" fill={P.navy0} style={{ font: '400 30px "Bebas Neue"' }}>{t}</text></g>
)

const Store: React.FC<PieceProps> = ({ f, c }) => {
  const step12 = c('s12:step'), store12 = c('s12:store')
  const meet = c('s13:meet'), sam = c('s13:sam'), madeup = c('s13:madeup'), orders = c('s13:orders'), headphones = c('s13:headphones')
  const find = c('s14:find'), warehouse14 = c('s14:warehouse'), pack = c('s14:pack'), get14 = c('s14:get'), door = c('s14:door'), next14 = c('s14:next'), day14 = c('s14:day')
  const costs15 = c('s15:costs'), every15 = c('s15:every'), order15 = c('s15:order')
  const arent = c("s16:aren't"), own16 = c('s16:own'), other16 = c('s16:other'), sellers = c('s16:sellers'), charges = c('s16:charges'), fees16 = c('s16:fees'), delivering = c('s16:delivering')
  const fees17 = c('s17:fees'), d172 = c('s17:172')
  const spent18 = c('s18:spent'), d109 = c('s18:109'), warehouses18 = c('s18:warehouses'), work18 = c('s18:work')
  const d103 = c('s19:103'), shipping = c('s19:shipping'), boxes19 = c('s19:boxes'), place19 = c('s19:place#2')
  const trucks = c('s20:trucks'), planes = c('s20:planes'), drivers = c('s20:drivers'), returns = c('s20:returns')
  const doesnt21 = c("s21:doesn't"), trip = c('s21:trip'), reverse = c('s21:reverse')
  const brings = c('s22:brings'), huge2 = c('s22:huge#2'), goes = c('s22:goes'), out22 = c('s22:out')
  const businesses23 = c('s23:businesses'), north = c('s23:north'), world = c('s23:world'), d588 = c('s23:588')
  const operating24 = c('s24:operating'), d34 = c('s24:34')
  const d6 = c('s25:6'), cents25 = c('s25:cents'), dollar25 = c('s25:dollar')
  const nothing = c('s26:nothing'), boxes26 = c('s26:boxes'), thin = c('s26:thin'), slice26 = c('s26:slice')
  const picture = c('s27:picture'), d100 = c('s27:100'), average27 = c('s27:average'), d94 = c('s27:94'), goes27 = c('s27:goes'), products27 = c('s27:products'), warehouses27 = c('s27:warehouses'), delivery27 = c('s27:delivery'), d6b = c('s27:6'), left27 = c('s27:left')
  const giant = c('s28:giant'), pie = c('s28:pie'), lot28 = c('s28:lot'), d34b = c('s28:34')
  const hasnt = c("s29:hasn't"), outside = c('s29:outside'), lost29 = c('s29:lost'), y2021 = c('s29:2021'), y2023 = c('s29:2023'), turned = c('s29:turned'), y2024 = c('s29:2024')
  const step30 = c('s30:step'), enormous = c('s30:enormous'), keeps30 = c('s30:keeps'), little = c('s30:little')

  const AB = c('s18:2025') - 6, BC = c('s23:2025') - 4
  const A = win(f, step12 - 40, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const A1 = 1 - on(f, arent - 6, 10), A2 = on(f, arent - 6, 10)
  const C1 = 1 - on(f, picture - 6, 10), C2 = on(f, picture - 6, 10) * (1 - on(f, hasnt - 6, 10)), C3 = on(f, hasnt - 6, 10) * (1 - on(f, step30 - 4, 10)), C4 = on(f, step30 - 4, 10)
  // # the parcel's journey: shelf → conveyor → van → door
  const vanX = lerp(900, 1500, span(f, get14, door + 10))

  return (
    <g>
      <Stage id="az-store" frame={f} />
      <ASpot f={f} at={d172} x={1100} y={500} rx={200} ry={160} />
      <ASpot f={f} at={d6} x={1100} y={330} rx={220} ry={120} />
      <Headline f={f} lines={[[step12, 'STEP 1: THE STORE', P.ink, 110], [madeup, 'SAM (MADE UP)', P.ink, 104], [costs15, 'EVERY ORDER COSTS MONEY', P.ink, 96], [other16, 'OTHER SELLERS', P.ink, 110], [d172, 'SELLER FEES: ≈ $172B (2025)', P.ink, 96], [d109, 'WAREHOUSES: ≈ $109B', P.coralInk, 100], [d103, 'SHIPPING: ≈ $103B', P.coralInk, 100], [goes, 'MONEY IN… MONEY OUT', P.ink, 104], [d588, 'STORE SALES: ≈ $588B', P.ink, 100], [d34, 'OPERATING PROFIT: ≈ $34B', P.mintInk, 100], [d6, '≈ 6¢ PER $1', P.ink, 120], [d100, 'A $100 ORDER', P.ink, 110], [outside, 'OUTSIDE NORTH AMERICA', P.ink, 100], [step30, 'ENORMOUS, BUT A THIN SLICE', P.ink, 96]]} />

      {/* # A) Sam's order; the journey; other sellers */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={A1}>
          <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [orders, 'phone', 'smiling'], [door, 'receive', 'smiling'], [costs15, 'idle', 'smiling']]} x={240} y={GROUND} s={0.8} />
          <g opacity={on(f, sam, 8)}><Label x={240} y={GROUND + 56} text="SAM" size={44} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, orders, 8) * (1 - on(f, find, 10))}><MapPhone x={460} y={500} s={0.7} price={f >= headphones ? 'HEADPHONES' : undefined} status="ORDER" press={on(f, headphones, 4) * (1 - on(f, headphones + 8, 6))} /></g>
          <g opacity={on(f, warehouse14, 8)}><Warehouse x={760} y={GROUND} s={0.8} f={f >= pack ? f : 0} /></g>
          <g opacity={on(f, find, 8) * (1 - on(f, warehouse14 + 20, 8))}><Mini look="worker" x={880} y={GROUND} scale={0.8} frame={f} seed={14} mood="happy" /></g>
          <g opacity={on(f, get14, 8)}><Van x={vanX} y={GROUND} s={0.6} f={f >= get14 && f < door + 10 ? f : 0} /></g>
          {/* # the door */}
          <g opacity={on(f, door - 10, 8)}><rect x={1640} y={GROUND - 260} width={200} height={260} rx={8} fill="#B5523E" /><circle cx={1810} cy={GROUND - 130} r={9} fill={P.gold} />
            <g opacity={on(f, door + 6, 8)}><Parcel x={1740} y={GROUND} s={0.9} label="SAM" /></g></g>
          <g opacity={on(f, next14, 8)} transform={`translate(1740 ${330 - 12 * pop(f, day14, 12)})`}><rect x={-110} y={-36} width={220} height={72} rx={12} fill={P.navy3} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 42px "Bebas Neue"' }}>NEXT DAY</text></g>
          {/* # every order costs money: coins drop out at each stop */}
          {f >= costs15 && [0, 1, 2].map((k) => { const at = [costs15, every15, order15][k], x = [760, 1200, 1740][k], fl = fly(f, at, [x, GROUND - 300], [x, GROUND - 40], 14, -40); return <g key={k} opacity={1 - on(f, at + 16, 6)}><Coin2 x={fl.x} y={fl.y} r={22} t="$" /></g> })}
        </g>
        <g opacity={A2}>
          {/* # other sellers' goods; the fees */}
          <Warehouse x={960} y={GROUND} s={0.85} f={f} label="AMAZON" />
          {([[other16, P.sky, 'SELLER A', 260], [sellers, P.mint, 'SELLER B', 1460], [sellers + 8, '#9D7FD0', 'SELLER C', 1720]] as [number, string, string, number][]).map(([at, col, t, x], k) => <g key={k} opacity={on(f, at, 8)}><Stall x={x} y={GROUND} col={col} t={t} /></g>)}
          {f >= charges && [0, 1, 2].map((k) => { const sx = [260, 1460, 1720][k], fl = fly(f, charges + k * 5, [sx, GROUND - 160], [960, GROUND - 300], 18, 120); return fl.t < 1 ? <Coin2 key={k} x={fl.x} y={fl.y} r={22} t="$" /> : null })}
          {f >= own16 && [0, 1].map((k) => { const sx = [260, 1460][k], fl = fly(f, own16 + 14 + k * 8, [sx, GROUND - 140], [960, GROUND - 120], 16, 80); return fl.t < 1 ? <Parcel key={k} x={fl.x} y={fl.y} s={0.6} /> : null })}
          <g opacity={on(f, fees16, 8)} transform={`translate(0 ${-10 * pop(f, c('s16:goods'), 12)})`}><Label x={960} y={GROUND + 56} text={f >= delivering ? 'FEES FOR SELLING & DELIVERING' : 'FEES'} size={44} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, c('s17:2025'), 8)}><MoneyBag x={960} y={420 - 14 * pop(f, d172, 12) - 10 * pop(f, c('s17:billion'), 12)} s={lerp(0.8, 1.2, on(f, d172, 16))} text="$172B" /></g>
        </g>
      </g>}

      {/* # B) the costs pour out */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <rect x={810} y={GROUND - 520} width={300} height={520} rx={16} fill={P.gold} />
        <Label x={960} y={GROUND + 56} text={f >= brings ? 'MONEY IN' : "THE STORE'S MONEY, 2025"} size={46} font="Bebas Neue" color={P.ink} />
        {([[d109, 'WAREHOUSES $109B', 420, spent18], [d103, 'SHIPPING $103B', 1500, shipping]] as [number, string, number, number][]).map(([at, t, x, start], k) => {
          const fl = fly(f, start, [960, GROUND - 400], [x, GROUND - 120], 22, 120)
          return f >= start ? <g key={k}><MoneyBag x={fl.x} y={fl.y + 100} s={lerp(0.6, 1.1, on(f, at, 14))} text="$" /><g opacity={on(f, at, 8)}><Label x={x} y={GROUND + 56} text={t} size={44} font="Bebas Neue" color={P.coralInk} /></g></g> : null })}
        <g opacity={on(f, warehouses18, 8)}><Label x={420} y={GROUND - 330} text={f >= work18 ? 'AND THE WORK AROUND THEM' : 'RUNNING WAREHOUSES'} size={36} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, boxes19, 8)}>{[0, 1, 2].map((k) => <Parcel key={k} x={lerp(1300, 1700, ((f - boxes19) / 40 + k / 3) % 1)} y={GROUND - 300} s={0.5} />)}</g>
        {/* # trucks, planes, drivers, returns */}
        {([[trucks, 'TRUCKS'], [planes, 'PLANES'], [drivers, 'DRIVERS'], [returns, 'RETURNS']] as [number, string][]).map(([at, t], k) => <g key={k} opacity={on(f, at, 6) * (1 - on(f, brings - 4, 10))} transform={`translate(${360 + k * 400} ${300 - 14 * pop(f, at, 12)})`}>
          <rect x={-110} y={-40} width={220} height={80} rx={14} fill={P.coral} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"' }}>{t}</text></g>)}
        {/* # the return trip */}
        <g opacity={on(f, doesnt21, 8) * (1 - on(f, brings - 4, 10))}>{(() => { const t = span(f, trip, reverse + 20); return <g><Van x={lerp(1700, 1200, t)} y={GROUND} s={0.4} f={f} flip /><Parcel x={lerp(1700, 1200, t) - 40} y={GROUND - 90} s={0.4} /></g> })()}
          <g opacity={on(f, reverse, 8)}><path d="M1700 420 Q1450 340 1200 420" fill="none" stroke={P.coralInk} strokeWidth={8} /><path d="M1222 396 L1200 420 L1230 432" fill="none" stroke={P.coralInk} strokeWidth={8} strokeLinecap="round" /></g></g>
        {/* # money straight back out */}
        {f >= goes && [0, 1, 2, 3, 4].map((k) => { const fl = fly(f, goes + k * 4, [960, GROUND - 500], [k % 2 ? 1600 : 320, GROUND - 60], 20, 120); return fl.t < 1 ? <Coin2 key={k} x={fl.x} y={fl.y} r={24} t="$" /> : null })}
        <g opacity={on(f, out22, 8)}><Label x={960} y={GROUND - 560} text="STRAIGHT BACK OUT" size={44} font="Bebas Neue" color={P.coralInk} /></g>
      </g>}

      {/* # C) the thin slice; $100 order; outside North America; recap */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={C1}>
          <rect x={560} y={GROUND - lerp(0, 588, on(f, BC + 6, 60))} width={800} height={lerp(0, 588, on(f, BC + 6, 60))} rx={16} fill="#E9A23B" />
          <g opacity={on(f, businesses23, 8) * (1 - on(f, d588, 8))}><text x={960} y={GROUND - 260} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 64px "Bebas Neue"' }}>THE STORE'S SALES</text></g>
          <g opacity={on(f, d588, 8)}><text x={960} y={GROUND - 260} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 70px "Bebas Neue"' }}>STORE SALES $588B</text></g>
          <g opacity={on(f, north, 8)}><Label x={960} y={GROUND + 56} text={f >= world ? 'NORTH AMERICA + REST OF THE WORLD' : 'NORTH AMERICA'} size={42} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, operating24, 8)}><rect x={560} y={GROUND - 588 - lerp(0, 34, on(f, d34, 14))} width={800} height={lerp(0, 34, on(f, d34, 14))} rx={6} fill={P.mint} />
            <g opacity={on(f, d34, 8)}><path d="M1370 300 L1460 260" stroke={P.mintInk} strokeWidth={5} /><Label x={1470} y={270} text="PROFIT $34B" size={46} font="Bebas Neue" color={P.mintInk} anchor="start" /></g></g>
          <g opacity={on(f, thin, 8)}><Label x={1470} y={330} text="A THIN SLICE" size={40} font="Bebas Neue" color={P.ink2} anchor="start" /></g>
          <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [d588, 'present', 'smiling'], [d6, 'countA', 'thinking'], [thin, 'shrug', 'thinking']]} x={300} y={GROUND} s={0.75} />
          <g opacity={on(f, cents25, 8)} transform={`translate(1600 ${600 - 14 * pop(f, cents25, 12) - 12 * pop(f, c('s25:sales'), 12) - 10 * pop(f, c('s26:six'), 12)})`}><Coin2 x={0} y={0} r={60} t="6¢" /><Label x={0} y={110} text={f >= dollar25 ? 'PER $1 OF SALES' : ''} size={36} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={C2}>
          {/* # a $100 order: 94 coins go out, 6 stay */}
          <g opacity={on(f, d100, 8)} transform="translate(960 470)"><rect x={-170} y={-70} width={340} height={140} rx={14} fill="#7FC98F" /><text y={30} textAnchor="middle" fill="#245C3A" style={{ font: '400 90px "Bebas Neue"' }}>$100</text></g>
          {([[products27, 'PRODUCTS', 380], [warehouses27, 'WAREHOUSES', 760], [delivery27, 'DELIVERY', 1160], [delivery27 + 14, 'EVERYTHING ELSE', 1560]] as [number, string, number][]).map(([at, t, x], k) => <g key={k} opacity={on(f, at, 6)}>
            {(() => { const fl = fly(f, at, [960, 470], [x, GROUND - 130], 18, 100); return <Coin2 x={fl.x} y={fl.y} r={34} t="$" /> })()}
            <Label x={x} y={GROUND + 56} text={t} size={40} font="Bebas Neue" color={P.ink} /></g>)}
          <g opacity={on(f, d94, 8)}><Label x={960} y={GROUND - 30} text="≈ $94 GOES BACK OUT" size={48} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, d6b, 8)} transform={`translate(960 ${280 - 14 * pop(f, left27, 12)})`}><rect x={-140} y={-44} width={280} height={88} rx={14} fill={P.mint} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 56px "Bebas Neue"' }}>≈ $6 LEFT</text></g>
          <g opacity={on(f, giant, 8)} transform={`translate(0 ${-12 * pop(f, c('s28:2025'), 12)})`}><Label x={960} y={380} text={f >= c('s28:2025') ? 'STILL ≈ $34 BILLION IN 2025' : f >= d34b ? 'STILL ≈ $34 BILLION' : 'A GIANT PIE'} size={48} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
        <g opacity={C3}>
          {/* # outside North America: losses 2021–2023, profit 2024 */}
          <line x1={500} y1={560} x2={1500} y2={560} stroke={P.ink} strokeWidth={5} /><Label x={480} y={572} text="$0" size={42} font="Bebas Neue" color={P.ink} anchor="end" />
          {([[y2021, -0.9, '2021'], [y2021 + 12, -7.7, '2022'], [y2023, -2.7, '2023'], [y2024, 3.8, '2024']] as [number, number, string][]).map(([at, v, t], k) => { const x = 640 + k * 240, h = Math.abs(v) * 34 * on(f, at + 4, 14)
            return <g key={k} opacity={on(f, at, 6)}><rect x={x - 70} y={v < 0 ? 560 : 560 - h} width={140} height={h} rx={10} fill={v < 0 ? P.coral : P.mint} /><Label x={x} y={v < 0 ? 520 : 600} text={t} size={42} font="Bebas Neue" color={P.ink} /></g> })}
          <g opacity={on(f, lost29, 8)}><Label x={880} y={900} text="LOST MONEY" size={44} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, turned, 8)}><Label x={1360} y={400} text="PROFIT" size={44} font="Bebas Neue" color={P.mintInk} /></g>
          <Person f={f} who="worker" beats={[[0, 'idle', 'thinking'], [lost29, 'facepalm', 'worried'], [turned, 'thumbsUp', 'smiling']]} x={1720} y={GROUND} s={0.75} flip />
        </g>
        <g opacity={C4}>
          <g transform="translate(700 0)">{Array.from({ length: 6 }, (_, k) => <Parcel key={k} x={(k % 3) * 130 - 130} y={GROUND - Math.floor(k / 3) * 95} s={1} />)}</g>
          <g opacity={on(f, enormous, 8)}><Label x={700} y={GROUND + 56} text="ENORMOUS" size={48} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, keeps30, 8)} transform={`translate(1300 ${600 - 14 * pop(f, little, 12)})`}><Coin2 x={0} y={0} r={50} t="6¢" /><Label x={0} y={100} text="KEPT FROM EACH $1" size={40} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
      </g>}
      <Vignette id="az-store" />
    </g>
  )
}

const BEATS = ['s23:2025', 's17:billion', 's25:sales', 's26:six', 's28:2025', 's16:goods', 's17:2025', 's18:2025', 's12:step', 's12:store', 's13:meet', 's13:sam', 's13:madeup', 's13:orders', 's13:headphones', 's14:find', 's14:warehouse', 's14:pack', 's14:get', 's14:door', 's14:next', 's14:day', 's15:costs', 's15:every', 's15:order', "s16:aren't", 's16:own', 's16:other', 's16:sellers', 's16:charges', 's16:fees', 's16:delivering', 's17:fees', 's17:172', 's18:spent', 's18:109', 's18:warehouses', 's18:work', 's19:103', 's19:shipping', 's19:boxes', 's19:place#2', 's20:trucks', 's20:planes', 's20:drivers', 's20:returns', "s21:doesn't", 's21:trip', 's21:reverse', 's22:brings', 's22:huge#2', 's22:goes', 's22:out', 's23:businesses', 's23:north', 's23:world', 's23:588', 's24:operating', 's24:34', 's25:6', 's25:cents', 's25:dollar', 's26:nothing', 's26:boxes', 's26:thin', 's26:slice', 's27:picture', 's27:100', 's27:average', 's27:94', 's27:goes', 's27:products', 's27:warehouses', 's27:delivery', 's27:6', 's27:left', 's28:giant', 's28:pie', 's28:lot', 's28:34', "s29:hasn't", 's29:outside', 's29:lost', 's29:2021', 's29:2023', 's29:turned', 's29:2024', 's30:step', 's30:enormous', 's30:keeps', 's30:little']
export const AZ_STORE = makePiece('az-store', 'Amazon long step 1: Sam (made up) orders headphones; a warehouse worker picks and packs, a van delivers next day; every order costs money; other sellers pay fees ($172B in 2025); warehouses $109B and shipping $103B bags fall out of the store\'s money; trucks, planes, drivers, returns; money in, straight back out; store sales $588B with a thin $34B profit slice, about 6 cents per dollar; a $100 order: about $94 goes out, $6 left; stores outside North America lost money 2021–2023 and turned a profit in 2024; enormous but a thin slice', {
  mood: 'light', Component: Store, beats: BEATS,
  sfx: [['s13:orders', 'pop', 0.2], ['s14:get', 'whoosh', 0.2], ['s16:charges', 'coin', 0.2], ['s17:172', 'pop', 0.2], ['s18:109', 'thud', 0.2], ['s19:103', 'thud', 0.2], ['s22:goes', 'coin', 0.2], ['s24:34', 'pop', 0.2], ['s25:6', 'pop', 0.25], ['s27:left', 'pop', 0.2], ['s29:turned', 'pop', 0.2]] })
