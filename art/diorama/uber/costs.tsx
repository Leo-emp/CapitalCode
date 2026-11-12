// ---------------------------------------------------------------- s25–s41: step two — the slice wasn't enough.
// A) Uber's navy slice on the left; on each named cost a tile drops into a row (engineers, offices, insurance,
//    support, ads, discounts, bonuses). A coupon flies to a rider, a bonus coin to a driver; coins leave the slice.
// B) Two bars: what it earned and what it cost — the cost bar taller; the gap glows red: −$8.6B in 2019. The gap
//    pours into a row of small cars: −$1.25 a trip, some coins bigger, some smaller (an average).
// C) Six years below a zero line, each red bar dropping on its year as it is said (4.1, 3, 8.6, 4.9, 3.8, 1.8);
//    a trend arrow: shrinking, still losses. Then Mia's $20: the driver's part and the slice, and the costs taller.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, fly, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Mini } from '../../rig/Mini'
import { Coin2, CostTile, FareBill, RideCar, USpot, type CostKind } from './kit'

const GROUND = 920
const TILES: [string, CostKind][] = [['s27:engineers', 'engineers'], ['s27:offices', 'offices'], ['s27:insurance', 'insurance'], ['s27:customer', 'support'], ['s28:advertising', 'ads'], ['s28:discounts', 'discounts'], ['s28:bonuses', 'bonuses']]
const YEARS: [string, string, number, string][] = [['s38:2017', 's38:41', 4.08, '2017'], ['s38:2018', 's38:3', 3.03, '2018'], ['s38:2019', 's38:86', 8.6, '2019'], ['s39:2020', 's39:49', 4.86, '2020'], ['s39:2021', 's39:38', 3.83, '2021'], ['s39:2022', 's39:18', 1.83, '2022']]

const Costs: React.FC<PieceProps> = ({ f, c }) => {
  const step25 = c('s25:step'), slice25 = c('s25:slice'), smaller = c('s25:smaller'), costs25 = c('s25:costs')
  const out26 = c('s26:out'), pay26 = c('s26:pay'), everything = c('s26:everything')
  const every27 = c('s27:every'), day27 = c('s27:day')
  const win28 = c('s28:win'), keep28 = c('s28:keep'), back28 = c('s28:back')
  const codes = c('s29:codes'), cheaper29 = c('s29:cheaper'), drivers29 = c('s29:drivers'), cash29 = c('s29:cash')
  const offers = c('s30:offers'), attractive = c('s30:attractive'), pocket = c('s30:pocket')
  const add = c('s31:add'), costs31 = c('s31:costs'), bigger = c('s31:bigger'), earned = c('s31:earned')
  const operating = c('s32:operating'), loss32 = c('s32:loss'), d86 = c('s32:86')
  const spread = c('s33:spread'), d69 = c('s33:69'), trips33 = c('s33:trips'), d25 = c('s33:25'), each33 = c('s33:each')
  const average = c('s34:average'), more34 = c('s34:more'), less34 = c('s34:less')
  const d2019 = c('s35:2019'), unusual = c('s35:unusual')
  const lost36 = c('s36:lost'), every36 = c('s36:every')
  const pattern = c('s37:pattern'), year37 = c('s37:year')
  const shrinking = c('s40:shrinking'), still40 = c('s40:still')
  const step41 = c('s41:step'), mias41 = c("s41:mia's"), covered = c('s41:covered'), driver41 = c('s41:driver'), part41 = c('s41:part'), costs41 = c("s41:costs"), not41 = c('s41:not')
  const AB = add - 4, BC = d2019 - 6
  const A = win(f, step25 - 30, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const C2 = on(f, step41 - 4, 10)
  return (
    <g>
      <Stage id="ub-costs" frame={f} />
      <USpot f={f} at={everything} x={240} y={560} rx={160} ry={220} />
      <USpot f={f} at={every27} x={960} y={520} rx={240} ry={140} />
      <USpot f={f} at={win28} x={1440} y={520} rx={200} ry={140} />
      <USpot f={f} at={pattern} x={960} y={420} rx={240} ry={120} />
      <Headline f={f} lines={[[step25, "STEP 2: THE SLICE WASN'T ENOUGH", P.ink, 92], [out26, 'IT HAD TO PAY FOR…', P.ink, 100], [codes, 'DISCOUNTS AND BONUSES', P.ink, 100], [pocket, "…OUT OF UBER'S POCKET", P.coralInk, 100], [bigger, 'COSTS > EARNINGS', P.ink, 104], [d86, '2019 OPERATING LOSS: ≈ $8.6B', P.coralInk, 96], [d25, '≈ −$1.25 PER TRIP', P.coralInk, 104], [average, 'AN AVERAGE', P.ink, 104], [lost36, 'LOSSES EVERY YEAR, 2017–2022', P.ink, 96], [shrinking, 'SHRINKING, BUT STILL LOSSES', P.ink, 96], [step41, '', P.ink]]} />

      {/* # A) the slice, and the cost tiles it has to pay for */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={on(f, slice25, 10)} transform={`translate(${-12 * pop(f, c('s26:slice'), 12)} ${-16 * pop(f, c('s26:slice'), 12)}) `}><rect x={150} y={GROUND - 460} width={180} height={460} rx={18} fill={P.navy3} />
          {(() => { const fl = fly(f, c('s26:pay'), [240, GROUND - 480], [240, GROUND - 640], 14, 60); return f >= c('s26:pay') && fl.t < 1 ? <Coin2 x={fl.x} y={fl.y} r={24} t="$" o={1 - fl.t * 0.5} /> : null })()}<Label x={240} y={GROUND - 480} text="UBER'S SLICE" size={44} font="Bebas Neue" color={P.ink} /></g>
        {TILES.map(([k, kind], i) => { const at = c(k), x = 520 + (i % 4) * 330, y = i < 4 ? 340 : 640
          return <g key={i} opacity={on(f, at, 8) * (kind === 'discounts' || kind === 'bonuses' ? 1 : 1 - on(f, codes - 6, 10))} transform={`translate(0 ${-30 * (1 - pop(f, at, 12))})`}><CostTile x={x} y={y} kind={kind} s={0.95} /></g> })}
        {/* # s26: the bills waiting to be paid out of the slice (they turn into the cost tiles on s27) */}
        <g opacity={on(f, out26, 8) * (1 - on(f, c('s27:engineers') - 4, 10))}>{[0, 1, 2, 3, 4].map((k) => <g key={k} opacity={on(f, out26 + k * 5, 6)} transform={`translate(${760 + k * 40} ${GROUND - 120 - k * 70}) rotate(${(k % 2 ? 4 : -4)})`}><rect x={-150} y={-90} width={300} height={180} rx={12} fill={P.paper} stroke={P.edge} strokeWidth={4} /><text y={-30} textAnchor="middle" fill={P.navy0} style={{ font: '400 42px "Bebas Neue"' }}>BILL</text>{[10, 40].map((yy) => <rect key={yy} x={-100} y={yy} width={200} height={10} rx={5} fill="#D9DFE8" />)}</g>)}
          <g opacity={on(f, everything, 8)}><Label x={860} y={GROUND + 60} text="ALMOST EVERYTHING" size={44} font="Bebas Neue" color={P.ink} /></g></g>
        {/* # offices in hundreds of cities: pins pop round the offices tile */}
        {[[-110, -90], [110, -100], [0, -140], [-130, 20], [130, 30]].map(([dx, dy], k) => <g key={k} opacity={on(f, c('s27:cities') + k * 3, 5) * (1 - on(f, c('s27:insurance'), 8))} transform={`translate(${850 + dx} ${340 + dy})`}><path d="M0 0 C-14 -16 -14 -32 0 -36 C14 -32 14 -16 0 0 Z" fill={P.coral} /><circle cy={-22} r={5} fill="#FFFFFF" /></g>)}
        {/* # a coupon to a rider, a bonus coin to a driver */}
        <g opacity={on(f, c('s28:riders'), 8) * (1 - on(f, add - 8, 8))}><Mini look="investorF" x={1760} y={GROUND} scale={0.9} frame={f} seed={41} mood="happy" />
          {(() => { const fl = fly(f, codes, [1180, 640], [1760, GROUND - 220], 22, 100); return fl.t < 1 ? <rect x={fl.x - 40} y={fl.y - 20} width={80} height={40} rx={8} fill="#F2A7B5" /> : null })()}</g>
        <g opacity={on(f, c('s28:drivers'), 8) * (1 - on(f, add - 8, 8))}><Mini look="worker" x={1580} y={GROUND} scale={0.9} frame={f} seed={42} mood="happy" />
          {(() => { const fl = fly(f, cash29, [1510, 640], [1580, GROUND - 230], 22, 100); return fl.t < 1 ? <Coin2 x={fl.x} y={fl.y} r={24} t="+" /> : null })()}</g>
        {/* # "coming back": a return arrow over the pair; trip pips for the driver's bonus; cheaper / attractive badges */}
        <g opacity={on(f, back28, 8) * (1 - on(f, codes, 8))}><path d="M1560 600 A110 70 0 1 1 1780 600" fill="none" stroke={P.ink2} strokeWidth={8} strokeLinecap="round" /><path d="M1760 580 L1780 604 L1804 584" fill="none" stroke={P.ink2} strokeWidth={8} strokeLinecap="round" /></g>
        <g opacity={on(f, c('s29:finishing'), 8) * (1 - on(f, add - 8, 8))}>{[0, 1, 2].map((k) => <circle key={k} cx={1530 + k * 50} cy={GROUND - 300} r={16} fill={on(f, c('s29:finishing') + k * 6, 4) > 0.5 && f >= c('s29:trips') - 12 + k * 6 ? P.mint : '#D9DFE8'} />)}</g>
        <g opacity={on(f, c('s30:cheaper'), 8) * (1 - on(f, add - 8, 8))} transform="translate(1760 660)"><rect x={-66} y={-30} width={132} height={60} rx={10} fill={P.paper} stroke={P.edge} strokeWidth={3} /><text y={12} textAnchor="middle" fill={P.mintInk} style={{ font: '400 34px "Bebas Neue"' }}>CHEAPER</text><path d="M80 -20 L80 24 M64 8 L80 24 L96 8" fill="none" stroke={P.mintInk} strokeWidth={6} strokeLinecap="round" /></g>
        <g opacity={on(f, attractive, 8) * (1 - on(f, add - 8, 8))} transform={`translate(1580 ${560 - 14 * pop(f, attractive, 12)})`}><circle r={40} fill={P.goldD} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>+$</text></g>
        {/* # the slice empties into the tiles */}
        {f >= pocket && [0, 1, 2, 3].map((k) => { const fl = fly(f, c('s30:every') + k * 6, [240, GROUND - 400], [520 + k * 330, 340], 20, 80); return fl.t < 1 ? <Coin2 key={k} x={fl.x} y={fl.y} r={22} t="$" o={fl.o} /> : null })}
      </g>}

      {/* # B) earned vs cost; the gap; spread over trips */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={on(f, c('s31:2019'), 8) * (1 - on(f, operating, 8))} transform={`translate(1500 ${400 - 14 * pop(f, c('s31:2019'), 12)})`}><rect x={-90} y={-44} width={180} height={88} rx={12} fill={P.navy3} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 56px "Bebas Neue"' }}>2019</text></g>
        <g opacity={on(f, add, 10)}>
          <rect x={300} y={GROUND - lerp(0, 300, on(f, add + 4, 20))} width={180} height={lerp(0, 300, on(f, add + 4, 20))} rx={14} fill={P.navy3} />
          <rect x={540} y={GROUND - (lerp(0, 300, on(f, add + 10, 20)) + lerp(0, 200, on(f, costs31, 20)))} width={180} height={lerp(0, 300, on(f, add + 10, 20)) + lerp(0, 200, on(f, costs31, 20))} rx={14} fill="#9D7FD0" />
          <Label x={390} y={GROUND + 60} text="EARNED" size={44} font="Bebas Neue" color={P.ink} /><Label x={630} y={GROUND + 60} text="COSTS" size={44} font="Bebas Neue" color={P.ink} />
          {/* # the gap */}
          <g opacity={on(f, operating, 8)}><rect x={300} y={GROUND - 500} width={180} height={200} rx={10} fill="none" stroke={P.coral} strokeWidth={6} strokeDasharray="12 8" /><rect x={300} y={GROUND - 500} width={180} height={200} rx={10} fill={P.coral} opacity={0.25 * on(f, loss32, 8)} />
            <g opacity={on(f, c('s32:business'), 8)}><Label x={390} y={GROUND - 400} text="JUST RUNNING IT" size={34} font="Bebas Neue" color={P.coralInk} /></g>
            <rect x={300} y={GROUND - 500} width={180} height={200} rx={10} fill={P.coral} opacity={0.35 * (pop(f, c('s32:lost'), 12) - on(f, c('s32:lost') + 12, 1))} />
            <g opacity={on(f, d86, 8)}><Label x={390} y={GROUND - 520} text="−$8.6B" size={56} font="Bebas Neue" color={P.coralInk} /></g></g>
        </g>
        {/* # the trips, each getting a red coin of its own size */}
        <g opacity={on(f, spread, 10)}>
          {Array.from({ length: 12 }, (_, k) => <g key={k} opacity={on(f, d69 + k, 6)} transform={`translate(${960 + (k % 4) * 230} ${GROUND - 40 - Math.floor(k / 4) * 170}) scale(0.32)`}><g transform={`translate(0 ${-50 * pop(f, c('s33:each') + k, 10) - 40 * pop(f, c('s34:rides') + k, 10)})`}><RideCar x={0} y={0} f={0} color={k % 3 === 2 ? '#5A6680' : '#2F2F3A'} /></g></g>)}
          <g opacity={on(f, c('s34:food'), 8) * (1 - on(f, d2019 - 8, 8))} transform="translate(1820 540)"><path d="M-40 -70 L40 -70 L46 0 L-46 0 Z" fill="#7FC98F" /><path d="M-20 -70 Q-20 -96 0 -96 Q20 -96 20 -70" fill="none" stroke="#3E8E5A" strokeWidth={6} /></g>
          {f >= trips33 && Array.from({ length: 12 }, (_, k) => { const fl = fly(f, trips33 + k * 2, [390, GROUND - 400], [960 + (k % 4) * 230, GROUND - 120 - Math.floor(k / 4) * 170], 20, 100), sz = f >= c('s34:some') ? 14 + ((k * 7) % 5) * 4 : 20 + 6 * pop(f, c('s33:lost'), 12)
            return <g key={k}><circle cx={fl.x} cy={fl.y} r={sz} fill={P.coral} /></g> })}
          <g opacity={on(f, d25, 8)}><Label x={1300} y={GROUND + 60} text="≈ −$1.25 EACH, ON AVERAGE" size={46} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
      </g>}

      {/* # C) six years of losses; then Mia's $20 */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={1 - C2}>
          <line x1={240} y1={360} x2={1700} y2={360} stroke={P.ink} strokeWidth={5} /><Label x={220} y={372} text="$0" size={44} font="Bebas Neue" color={P.ink} anchor="end" />
          {([['s36:2017', '2017', 360], ['s36:2022', '2022', 1560]] as [string, string, number][]).map(([k, t, x]) => <g key={k} opacity={on(f, c(k), 8) * (1 - on(f, c('s38:2017'), 8))} transform={`translate(${x} ${560 - 16 * pop(f, c(k), 12)})`}><rect x={-80} y={-36} width={160} height={72} rx={12} fill={P.coral} /><text y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>{t}</text></g>)}
          <g opacity={on(f, c('s36:to'), 8) * (1 - on(f, c('s38:2017'), 8))}><path d="M460 560 L1460 560" stroke={P.coral} strokeWidth={8} strokeDasharray="16 12" /></g>
          <g opacity={on(f, d2019, 8) * (1 - on(f, c('s38:2017'), 8))}><Label x={960} y={300} text="2019 WASN'T UNUSUAL" size={44} font="Bebas Neue" color={P.ink2} /></g>
          {YEARS.map(([yk, vk, v, t], i) => { const x = 360 + i * 240, h = lerp(0, v * 52, on(f, c(vk), 18))
            return <g key={i} opacity={on(f, c(yk), 8)}>
              <rect x={x - 70} y={360} width={140} height={h} rx={10} fill={P.coral} />
              <Label x={x} y={340} text={t} size={46} font="Bebas Neue" color={P.ink} />
              <g opacity={on(f, c(vk), 8)}><Label x={x} y={360 + h + 50} text={`−$${v.toFixed(1)}B`} size={44} font="Bebas Neue" color={P.coralInk} /></g>
            </g> })}
          <g opacity={on(f, shrinking, 8)}><path d={`M1080 ${360 + 8.6 * 52 + 90} Q1400 ${360 + 200} 1640 ${360 + 1.83 * 52 + 120}`} fill="none" stroke={P.mintInk} strokeWidth={8} strokeDasharray="14 10" /><path d={`M1612 ${360 + 1.83 * 52 + 96} L1640 ${360 + 1.83 * 52 + 120} L1606 ${360 + 1.83 * 52 + 132}`} fill="none" stroke={P.mintInk} strokeWidth={8} strokeLinecap="round" /></g>
        </g>
        <g opacity={C2}>
          <FareBill x={720} y={260} w={760} split={on(f, mias41, 16)} driverLabel="DRIVER" sliceLabel="SLICE" />
          <g opacity={on(f, c('s41:covered'), 8)} transform={`translate(560 ${230 - 12 * pop(f, driver41, 12)})`}><circle r={34} fill={P.mint} /><path d="M-14 0 L-4 12 L16 -12" fill="none" stroke="#FFFFFF" strokeWidth={7} strokeLinecap="round" /></g>
          <g opacity={on(f, part41, 8)} transform="translate(1015 230)"><circle r={34} fill={P.gold} /><text y={12} textAnchor="middle" fill={P.navy0} style={{ font: '400 34px "Bebas Neue"' }}>½</text></g>
          <g opacity={on(f, costs41, 8)}><rect x={1210} y={260} width={170} height={lerp(200, 420, on(f, not41, 16))} rx={14} fill="#9D7FD0" /><Label x={1295} y={720} text="COSTS" size={44} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, not41, 8)}><rect x={1030} y={460} width={160} height={220} rx={12} fill="none" stroke={P.coral} strokeWidth={6} strokeDasharray="12 8" /><Label x={1110} y={720} text="NOT COVERED" size={40} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
      </g>}
      <Vignette id="ub-costs" />
    </g>
  )
}

const BEATS = ['s25:step', 's25:slice', 's25:smaller', 's25:costs', 's26:out', 's26:slice', 's26:pay', 's26:everything', 's27:engineers', 's27:offices', 's27:cities', 's27:insurance', 's27:customer', 's27:every', 's28:advertising', 's28:win', 's28:riders', 's28:drivers', 's28:back', 's28:discounts', 's28:bonuses', 's29:codes', 's29:drivers', 's29:cash', 's29:finishing', 's29:trips', 's30:offers', 's30:cheaper', 's30:attractive', 's30:every', 's30:pocket', 's31:2019', 's31:add', 's31:costs', 's31:bigger', 's31:earned', 's32:operating', 's32:loss', 's32:lost', 's32:business', 's32:86', 's33:spread', 's33:69', 's33:trips', 's33:25', 's33:lost', 's33:each', 's34:average', 's34:rides', 's34:food', 's34:some', 's34:more', 's35:2019', 's36:lost', 's36:every', 's36:2017', 's36:to', 's36:2022', 's37:pattern', 's38:2017', 's38:41', 's38:2018', 's38:3', 's38:2019', 's38:86', 's39:2020', 's39:49', 's39:2021', 's39:38', 's39:2022', 's39:18', 's40:shrinking', 's40:still', 's41:step', "s41:mia's", 's41:covered', 's41:driver', 's41:part', 's41:costs', 's41:not']
export const UB_COSTS = makePiece('ub-costs', 'Uber long step 2: Uber\'s slice has to pay for engineers, offices, insurance, support, ads, discounts and bonuses (a coupon to a rider, a bonus to a driver, coins leaving the slice); costs bar taller than earned, the gap −$8.6B in 2019; spread over trips: −$1.25 each on average; six years of red bars below $0 (4.1, 3, 8.6, 4.9, 3.8, 1.8 billion), shrinking but still losses; Mia\'s $20 covers the driver and the slice but not all the costs', {
  mood: 'light', Component: Costs, beats: BEATS,
  sfx: [['s27:engineers', 'pop', 0.2], ['s28:discounts', 'pop', 0.2], ['s30:pocket', 'coin', 0.2], ['s32:86', 'thud', 0.3], ['s33:trips', 'coin', 0.2], ['s38:2019', 'thud', 0.25], ['s41:not', 'swish', 0.2]] })
