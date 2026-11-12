// ---------------------------------------------------------------- s10–s24: step one — where your fare goes.
// A) Mia and her phone: the map, a $20 price (made-up). She taps BOOK; rings spread to three nearby cars; one lights up
//    (accepts). The car drives to her, she gets in, it drives across town; the phone says PAID $20.
// B) One big $20 bill. It splits: most of it slides to the driver (fuel, the car, insurance pop up around him); a slice
//    (≈21% in 2019, after driver bonuses) slides to the app — a little over $4 — and on to a small office building.
// C) Food works the same way: a delivery bag's money splits three ways. All of it in 2019: a $65B bill whose slice is
//    Uber's revenue, about $13B.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win, type Beat } from '../aimoney/common'
import { Ground, Office } from '../power/kit2'
import { Mini } from '../../rig/Mini'
import { CityRoad, Coin2, CostTile, FareBill, MapPhone, RideCar, USpot } from './kit'

const GROUND = 920

const Split: React.FC<PieceProps> = ({ f, c }) => {
  const fare10 = c('s10:fare'), split10 = c('s10:split')
  const mia11 = c('s11:mia'), books = c('s11:books'), ride11 = c('s11:ride'), app11 = c('s11:app'), price = c('s11:price'), d20 = c('s11:20')
  const madeup = c('s12:madeup'), money12 = c('s12:money')
  const taps = c('s13:taps'), button = c('s13:button'), sends = c('s13:sends'), drivers13 = c('s13:drivers'), nearby = c('s13:nearby'), accepts = c('s13:accepts')
  const picks = c('s14:picks'), up14 = c('s14:up'), drives = c('s14:drives'), town14 = c('s14:town'), charges = c('s14:charges'), card = c('s14:card')
  const ends = c('s15:ends'), d20b = c('s15:20'), doesnt = c("s15:doesn't"), driver15 = c('s15:driver')
  const most = c('s16:most'), earns = c('s16:earns'), living = c('s16:living'), fuel = c('s16:fuel'), car16 = c('s16:car'), insurance = c('s16:insurance')
  const keeps17 = c('s17:keeps'), slice17 = c('s17:slice'), running = c('s17:running'), matched = c('s17:matched')
  const said = c('s18:said'), rides18 = c('s18:rides'), d21 = c('s18:21'), bonuses = c('s18:bonuses'), drivers18 = c('s18:drivers')
  const mias19 = c("s19:mia's"), kept = c('s19:kept'), d4 = c('s19:4'), rest19 = c('s19:rest')
  const slice20 = c('s20:slice'), money20 = c('s20:money'), company = c('s20:company')
  const step21 = c('s21:step'), splits = c('s21:splits'), driver21 = c('s21:driver'), keeps21 = c('s21:keeps')
  const food = c('s22:food'), order = c('s22:order'), eats = c('s22:eats'), keeps22 = c('s22:keeps'), restaurant = c('s22:restaurant'), courier = c('s22:courier')
  const everything = c('s23:everything'), spent = c('s23:spent'), d65 = c('s23:65'), apps23 = c('s23:apps')
  const revenue24 = c('s24:revenue'), slices24 = c('s24:slices'), d13 = c('s24:13')
  const AB = ends - 4, BC = food - 6
  const A = win(f, fare10 - 30, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const carX = f < accepts ? 1500 : f < up14 ? lerp(1500, 620, span(f, accepts, up14 + 6)) : lerp(620, 1500, span(f, drives, charges))
  return (
    <g>
      <Stage id="ub-split" frame={f} />
      <USpot f={f} at={money12} x={520} y={540} rx={200} ry={260} />
      <Headline f={f} lines={[[fare10, 'STEP 1: THE FARE GETS SPLIT', P.ink, 96], [d20, '$20 (A MADE-UP ROUND NUMBER)', P.ink, 92], [taps, '', P.ink], [charges, 'PAID: $20', P.ink, 104], [doesnt, '', P.ink], [most, 'MOST GOES TO THE DRIVER', P.ink, 96], [slice17, 'UBER KEEPS A SLICE', P.ink, 104], [d21, '2019: ≈ 21%', P.ink, 104], [d4, 'A LITTLE OVER $4', P.ink, 104], [splits, '', P.ink], [food, 'FOOD: THE SAME SPLIT', P.ink, 100], [d65, '2019: ≈ $65 BILLION SPENT', P.ink, 96], [d13, "UBER'S SLICES: ≈ $13 BILLION", P.ink, 92]]} />

      {/* # A) Mia books, a car accepts, the ride, the charge */}
      {A > 0 && <g opacity={A}>
        <CityRoad y={GROUND + 60} f={f >= drives ? f : 0} />
        {(() => { const beats: Beat[] = [[0, 'phone', 'smiling'], [taps, 'phone', 'smiling'], [accepts, 'thumbsUp', 'smiling']]
          return <g opacity={on(f, mia11, 8) * (1 - on(f, up14, 10))}><Person f={f} who="investorF" beats={beats} x={300} y={GROUND} s={0.8} /><Label x={300} y={GROUND + 60} text="MIA" size={44} font="Bebas Neue" color={P.ink} /></g> })()}
        <g opacity={on(f, ride11, 8) * (1 - on(f, picks, 8))} transform={`translate(660 ${300 - 16 * pop(f, c('s11:town'), 12)})`}><rect x={-3} y={-60} width={6} height={60} fill={P.ink} /><path d="M3 -60 L50 -46 L3 -32 Z" fill={P.coral} /></g>
        <g opacity={on(f, books, 10)} transform={`translate(0 ${-14 * pop(f, app11, 12)})`}><MapPhone x={620} y={460} s={0.9} price={f >= d20 ? '$20' : undefined} pin={span(f, drives, charges)} press={on(f, button, 4) * (1 - on(f, button + 8, 6))} status={f >= card ? 'PAID' : f >= accepts ? 'DRIVER ON THE WAY' : f >= sends ? 'FINDING A DRIVER…' : undefined} /></g>
        {/* # the request spreads to nearby cars */}
        <g opacity={on(f, sends, 6) * (1 - on(f, accepts + 10, 8))}>{[0, 1, 2].map((k) => { const r = ((f - sends + k * 10) % 30) / 30; return <circle key={k} cx={620} cy={420} r={60 + r * 420} fill="none" stroke={P.skyD} strokeWidth={6} opacity={1 - r} /> })}</g>
        {[0, 1].map((k) => <g key={k} opacity={on(f, drivers13 + k * 4, 8) * (1 - on(f, picks, 8))}><RideCar x={[1150, 1800][k]} y={GROUND} s={0.6} f={0} color="#5A6680" /></g>)}
        <g opacity={on(f, nearby, 8)}><RideCar x={carX} y={GROUND} s={0.75} f={f} rider={f >= up14 + 6} flip={f >= accepts && f < up14} /></g>
        <g opacity={on(f, accepts, 6) * (1 - on(f, picks, 8))}><circle cx={1500} cy={GROUND - 200} r={60} fill={P.mint} opacity={0.3} /><path d="M1478 -200 L1494 -184 L1524 -216" transform={`translate(0 ${GROUND})`} fill="none" stroke={P.mint} strokeWidth={10} strokeLinecap="round" /></g>
      </g>}

      {/* # B) the $20 bill splits: driver, slice, the office */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <FareBill x={900} y={240} w={800} split={on(f, most, 16)} driverLabel={f >= driver15 ? 'DRIVER' : ''} sliceLabel={f >= d21 ? '21%' : 'UBER'} />
        <g opacity={on(f, mias19, 8) * (1 - on(f, slice20, 8))}><Label x={1320} y={520} text={f >= d4 ? 'A LITTLE OVER $4' : ''} size={56} font="Bebas Neue" color={P.ink} /></g>
        {/* # the driver, and what his share pays for */}
        <g opacity={on(f, driver15, 10)} transform={`translate(0 ${-30 * pop(f, driver21, 12) - 20 * pop(f, c('s21:most'), 10)})`}><Mini look="worker" x={520} y={GROUND} scale={1.2} frame={f} seed={12} mood="happy" /><Label x={520} y={GROUND + 60} text="DRIVER" size={44} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, fuel, 8) * (1 - on(f, slice17, 10))} transform="translate(260 640)"><rect x={-40} y={-60} width={80} height={110} rx={10} fill={P.coral} /><rect x={-26} y={-46} width={52} height={36} rx={6} fill="#FFFFFF" /><Label x={0} y={90} text="FUEL" size={36} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, car16, 8) * (1 - on(f, slice17, 10))}><RideCar x={760} y={700} s={0.4} f={0} /><Label x={760} y={760} text="THE CAR" size={36} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, insurance, 8) * (1 - on(f, slice17, 10))}><CostTile x={260} y={430} kind="insurance" s={0.55} label={false} /><Label x={260} y={510} text="INSURANCE" size={36} font="Bebas Neue" color={P.ink} /></g>
        {/* # the slice goes to the app, and on to run the company */}
        <g opacity={on(f, keeps17, 10)}><MapPhone x={1500} y={700} s={0.5} /></g>
        <g opacity={on(f, c('s18:2019'), 8) * (1 - on(f, mias19, 8))} transform={`translate(1500 ${330 - 14 * pop(f, c('s18:2019'), 12)})`}><rect x={-80} y={-40} width={160} height={80} rx={12} fill={P.navy3} /><text y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>2019</text></g>
        {(() => { const fl = fly(f, drivers18, [1240, 640], [560, GROUND - 260], 18, 120); return f >= drivers18 && fl.t < 1 ? <Coin2 x={fl.x} y={fl.y} r={24} t="+" /> : null })()}
        <g opacity={on(f, bonuses, 8) * (1 - on(f, mias19, 8))}><CostTile x={1240} y={640} kind="bonuses" s={0.6} label={false} /><Label x={1240} y={720} text="AFTER DRIVER BONUSES" size={34} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, company, 10)}><Office x={1760} y={GROUND} s={0.8} /><Label x={1760} y={GROUND + 60} text="RUNS THE COMPANY" size={40} font="Bebas Neue" color={P.ink} /></g>
        {f >= money20 && [0, 1, 2].map((k) => { const fl = fly(f, money20 + k * 6, [1500, 520], [1760, GROUND - 260], 22, 100); return fl.t < 1 ? <Coin2 key={k} x={fl.x} y={fl.y} r={22} t="$" /> : null })}
      </g>}

      {/* # C) food the same way; all of 2019 */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, everything, 10)}>
          <g opacity={on(f, food, 8)} transform="translate(420 700)"><path d="M-110 120 L-90 -60 L90 -60 L110 120 Z" fill="#C98F5A" /><path d="M-50 -60 Q-50 -120 0 -120 Q50 -120 50 -60" fill="none" stroke="#8E5B3A" strokeWidth={12} /><text x={0} y={50} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"' }}>FOOD</text></g>
          <FareBill x={1150} y={300} w={720} split={on(f, keeps22, 16)} text="ORDER" driverLabel={f >= courier ? 'RESTAURANT + COURIER' : f >= restaurant ? 'RESTAURANT' : ''} sliceLabel="UBER" />
          <g opacity={on(f, restaurant, 8)}><Mini look="owner" x={980} y={GROUND} scale={1.0} frame={f} seed={21} mood="happy" /></g>
          <g opacity={on(f, courier, 8)}><Mini look="worker" x={1200} y={GROUND} scale={1.0} frame={f} seed={22} mood="happy" /></g>
        </g>
        <g opacity={on(f, everything, 10)}>
          <FareBill x={960} y={360} w={1200} split={on(f, slices24, 16)} slice={0.2} text={f >= d65 ? (f >= c('s23:2019') ? '$65 BILLION · 2019' : '$65 BILLION') : ''} driverLabel="DRIVERS, RESTAURANTS, COURIERS" sliceLabel={f >= d13 ? '$13B' : 'UBER'} />
          <g opacity={on(f, c('s24:that'), 8)}><rect x={1430} y={300} width={260} height={240} rx={22} fill="none" stroke={P.gold} strokeWidth={8} transform={`translate(1560 420) scale(${1 + 0.1 * pop(f, c('s24:that'), 12)}) translate(-1560 -420)`} /></g>
          <g opacity={on(f, apps23, 8)}>{[0, 1, 2, 3, 4].map((k) => <Mini key={k} look={['buyer', 'investorF', 'hero', 'investor', 'owner'][k]} x={560 + k * 200} y={GROUND} scale={0.75} frame={f} seed={k + 30} mood="happy" />)}</g>
        </g>
      </g>}
      <Vignette id="ub-split" />
    </g>
  )
}

const BEATS = ['s10:fare', 's10:split', 's11:mia', 's11:books', 's11:ride', 's11:town', 's11:app', 's11:price', 's11:20', 's12:madeup', 's12:money', 's13:taps', 's13:button', 's13:sends', 's13:drivers', 's13:nearby', 's13:accepts', 's14:picks', 's14:up', 's14:drives', 's14:charges', 's14:card', 's15:ends', "s15:doesn't", 's15:driver', 's16:most', 's16:living', 's16:fuel', 's16:car', 's16:insurance', 's17:keeps', 's17:slice', 's17:matched', 's18:2019', 's18:said', 's18:21', 's18:bonuses', 's18:drivers', "s19:mia's", 's19:4', 's19:rest', 's20:money', 's20:company', 's21:step', 's21:splits', 's21:driver', 's21:most', 's21:keeps', 's22:food', 's22:eats', 's22:keeps', 's22:restaurant', 's22:courier', 's23:everything', 's23:65', 's23:2019', 's23:apps', 's24:revenue', 's24:slices', 's24:13', 's24:that']
export const UB_SPLIT = makePiece('ub-split', 'Uber long step 1: Mia books a $20 ride on a map phone (made-up price), the request pings nearby cars, one accepts, picks her up and drives across town, PAID $20; one $20 bill splits — most to the driver (fuel, the car, insurance), a 21% slice (2019, after driver bonuses), a little over $4, to the app and on to run the company; food orders split the same way; 2019: a $65B bill whose slice is $13B of revenue', {
  mood: 'light', Component: Split, beats: BEATS,
  sfx: [['s13:button', 'pop', 0.2], ['s13:accepts', 'ding', 0.2], ['s14:drives', 'whoosh', 0.2], ['s14:card', 'cash', 0.25], ['s16:most', 'swish', 0.2], ['s19:4', 'coin', 0.25], ['s23:65', 'thud', 0.25]] })
