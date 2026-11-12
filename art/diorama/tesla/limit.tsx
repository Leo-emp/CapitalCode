// ---------------------------------------------------------------- s10–s26: step one — the limit.
// A) A government building puts up the limit meter; on "a little more every few years" the limit line steps down three
//    times. Europe: a gas car drives one kilometer and puts out a small grey cloud marked "grams". Five new cars each
//    with a grams tag; on "average of all the new cars" their tags fly into one AVG tag. A big thirsty car pushes the
//    average up, a clean one pulls it back down.
// B) Big Motors (made up): its factory, a crowd of cars "1,000,000 cars", petrol and diesel pumps. The meter: limit 100,
//    average 105, a red "5 g over" bracket. The penalty: €95 per gram per car. The sum builds chip by chip:
//    5 g × €95 × 1,000,000 = €475M; the fine bill flies to the EU.
// C) The US: a federal building with a fuel gauge; a California sign with a zero-emission share bar; each zero-emission
//    car sold earns a credit card; too few leaves a red gap. "Miss the target, it costs you": a coin drops out.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Coin2 } from '../uber/kit'
import { CreditCert, EVCar, Factory, FineBill, GasCar, LimitMeter, TSpot } from './kit'

const GROUND = 920

// # a simple government building with a pediment and a label
const Gov: React.FC<{ x: number; y: number; s?: number; o?: number; name: string }> = ({ x, y, s = 1, o = 1, name }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-200 -260 L0 -340 L200 -260 Z" fill="#C9D3E1" /><rect x={-200} y={-260} width={400} height={30} fill="#B8C6D9" />
    {[-160, -80, 0, 80, 160].map((cx) => <rect key={cx} x={cx - 18} y={-230} width={36} height={210} fill="#D9DFE8" />)}
    <rect x={-220} y={-20} width={440} height={20} fill="#B8C6D9" />
    <text x={0} y={-282} textAnchor="middle" fill={P.navy0} style={{ font: '400 34px "Bebas Neue"', letterSpacing: 2 }}>{name}</text>
  </g>
)

const Limit: React.FC<PieceProps> = ({ f, c }) => {
  const governments = c('s10:governments'), limit10 = c('s10:limit'), average10 = c('s10:average')
  const goal = c('s11:goal'), cut = c('s11:cut'), pollution = c('s11:pollution'), little = c('s11:little'), every11 = c('s11:every'), years11 = c('s11:years')
  const europe12 = c('s12:europe'), carbon = c('s12:carbon'), grams12 = c('s12:grams'), puts = c('s12:puts'), kilometer = c('s12:kilometer')
  const isnt = c("s13:isn't"), each13 = c('s13:each'), average13 = c('s13:average'), all13 = c('s13:all'), sells13 = c('s13:sells'), year13 = c('s13:year')
  const big14 = c('s14:big'), thirsty = c('s14:thirsty'), cleaner = c('s14:cleaner'), pull = c('s14:pull'), down14 = c('s14:down')
  const meet = c('s15:meet'), madeup15 = c('s15:madeup'), motors15 = c('s15:motors')
  const sells16 = c('s16:sells'), d1m = c('s16:1'), cars16 = c('s16:cars'), petrol = c('s16:petrol'), diesel = c('s16:diesel')
  const limit17 = c('s17:limit'), d100 = c('s17:100'), madeup17 = c('s17:madeup'), average17 = c('s17:average'), d105 = c('s17:105')
  const d5 = c('s18:5'), over18 = c('s18:over')
  const penalty = c('s19:penalty'), d95 = c('s19:95'), gram19 = c('s19:gram'), every19b = c('s19:every#2'), car19 = c('s19:car')
  const g5 = c('s20:5'), times1 = c('s20:times'), e95 = c('s20:95'), times2 = c('s20:times#2'), m1 = c('s20:1'), comes = c('s20:comes'), d475 = c('s20:475')
  const bill21 = c('s21:bill'), year21 = c('s21:year'), paid21 = c('s21:paid'), union = c('s21:union')
  const united = c('s22:united'), rules22 = c('s22:rules'), too22 = c('s22:too')
  const federal = c('s23:federal'), fuel = c('s23:fuel'), emissions23 = c('s23:emissions'), california23 = c('s23:california'), states23 = c('s23:states'), required = c('s23:required'), zero23 = c('s23:zeroemission')
  const californias = c("s24:california's"), each24 = c('s24:each'), sold24 = c('s24:sold'), earned = c('s24:earned'), credits24 = c('s24:credits'), few = c('s24:few'), gap24 = c('s24:gap')
  const different = c('s25:different'), same25 = c('s25:same'), miss = c('s25:miss'), costs25 = c('s25:costs')
  const step26 = c('s26:step'), limit26 = c('s26:limit'), missing26 = c('s26:missing'), expensive = c('s26:expensive')

  const AB = meet - 6, BC = united - 6
  const A = win(f, governments - 40, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const A1 = 1 - on(f, europe12 - 6, 10), A2 = on(f, europe12 - 6, 10) * (1 - on(f, isnt - 6, 10)), A3 = on(f, isnt - 6, 10)
  const B1 = 1 - on(f, limit17 - 6, 10), B2 = on(f, limit17 - 6, 10) * (1 - on(f, penalty - 6, 10)), B3 = on(f, penalty - 6, 10)
  const C1 = 1 - on(f, californias - 6, 10), C2 = on(f, californias - 6, 10) * (1 - on(f, different - 6, 10)), C3 = on(f, different - 6, 10)
  // # the limit steps down a little every few years
  const limitA = 130 - 12 * on(f, little, 10) - 12 * on(f, every11, 10) - 12 * on(f, years11, 10)
  // # the five cars' grams and their average; a thirsty car then a clean one
  const G = [150, 120, 110, 95, 75], avg = G.reduce((a, b) => a + b) / G.length
  const avgNow = avg + 8 * on(f, thirsty, 14) - 22 * on(f, pull, 16)

  return (
    <g>
      <Stage id="ts-limit" frame={f} />
      <TSpot f={f} at={average10} x={1200} y={520} rx={160} ry={220} />
      <TSpot f={f} at={d475} x={1300} y={520} rx={220} ry={180} />
      <Headline f={f} lines={[[governments, 'STEP 1: THE LIMIT', P.ink, 110], [cut, 'LESS POLLUTION, YEAR BY YEAR', P.ink, 92], [carbon, 'EUROPE: CO₂ GRAMS PER KM', P.ink, 96], [average13, 'THE AVERAGE OF ALL NEW CARS', P.ink, 96], [meet, 'BIG MOTORS (MADE UP)', P.ink, 104], [d105, 'LIMIT 100 G · AVERAGE 105 G', P.ink, 92], [d95, '€95 PER GRAM, PER CAR', P.coralInk, 100], [d475, '= €475 MILLION A YEAR', P.coralInk, 104], [united, 'THE US: SIMILAR RULES', P.ink, 100], [different, 'MISS THE TARGET, IT COSTS YOU', P.ink, 92]]} />

      {/* # A) the limit; grams per km; the average */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={A1}>
          <Gov x={480} y={GROUND} s={1} name="GOVERNMENT" />
          <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [limit10, 'point', 'smiling'], [goal, 'present', 'smiling']]} x={800} y={GROUND} s={0.7} />
          <g opacity={on(f, limit10, 8)}><LimitMeter x={1300} y={GROUND - 20} value={110} limit={limitA} scale={4.2} label="NEW CARS' AVERAGE" /></g>
          <g opacity={on(f, pollution, 8)}>{[0, 1, 2].map((k) => <circle key={k} cx={1560 + k * 50} cy={360 - k * 30} r={30 + k * 10} fill="#8A8F99" opacity={0.4 * (1 - on(f, years11, 20))} />)}</g>
          <g opacity={on(f, little, 8)}><path d="M1560 600 L1560 720 M1536 696 L1560 720 L1584 696" fill="none" stroke={P.mintInk} strokeWidth={8} strokeLinecap="round" /><Label x={1600} y={780} text="TIGHTER OVER TIME" size={36} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
        <g opacity={A2}>
          {/* # a car drives one kilometer and leaves a grey cloud marked grams */}
          <line x1={300} y1={GROUND - 10} x2={1620} y2={GROUND - 10} stroke="#5A6680" strokeWidth={8} />
          {[300, 1620].map((x) => <g key={x}><rect x={x - 4} y={GROUND - 110} width={8} height={100} fill={P.ink} /></g>)}
          <g opacity={on(f, kilometer, 8)}><Label x={960} y={GROUND + 60} text="1 KILOMETER" size={48} font="Bebas Neue" color={P.ink} /></g>
          <GasCar x={lerp(420, 1500, span(f, europe12, kilometer + 30))} y={GROUND - 14} s={0.7} f={f} />
          <g opacity={on(f, grams12, 8)} transform={`translate(${lerp(560, 900, span(f, grams12, kilometer + 20))} ${520 - 20 * pop(f, puts, 12)})`}><ellipse rx={150} ry={80} fill="#9AA0AA" opacity={0.85} /><text y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>CO₂ GRAMS</text></g>
        </g>
        <g opacity={A3}>
          {/* # five new cars, each with its grams; the tags fly into one average */}
          {G.map((g, k) => { const x = 260 + k * 300, merge = on(f, all13, 22)
            return <g key={k} opacity={on(f, each13 + k * 3, 6)}>
              {k === 0 && f >= big14 ? <g transform={`translate(0 ${-20 * pop(f, thirsty, 12)})`}><GasCar x={x} y={GROUND} s={0.62} f={f} color="#7A3A2A" /></g> : <GasCar x={x} y={GROUND} s={0.55} f={f} color={['#B5523E', '#8A6A4A', '#5A6680', '#4E7A5A', '#3E6A8A'][k]} />}
              <g transform={`translate(${lerp(x, 960, merge)} ${lerp(GROUND - 200, 420, merge)})`} opacity={1 - merge * 0.85}><rect x={-60} y={-30} width={120} height={60} rx={10} fill={P.card} stroke={P.edge} strokeWidth={3} /><text y={14} textAnchor="middle" fill={P.ink} style={{ font: '400 40px "Bebas Neue"' }}>{`${g} G`}</text></g>
            </g> })}
          <g opacity={on(f, average13 + 10, 8)} transform={`translate(960 ${420 - 16 * pop(f, all13 + 22, 12)})`}><rect x={-120} y={-44} width={240} height={88} rx={14} fill={P.gold} /><text y={18} textAnchor="middle" fill={P.navy0} style={{ font: '400 56px "Bebas Neue"' }}>{`AVG ${Math.round(avgNow)} G`}</text></g>
          <g opacity={on(f, c('s14:carmaker'), 8) * (1 - on(f, big14, 8))}><Label x={960} y={GROUND + 56} text="A CARMAKER CAN STILL…" size={44} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, cleaner, 8)}><EVCar x={lerp(2100, 1760, on(f, cleaner, 16))} y={GROUND} s={0.55} f={f} glow={on(f, pull, 10)} /><Label x={1760} y={GROUND + 56} text="0 G" size={44} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, down14, 8)}><path d="M1120 400 L1120 480 M1100 460 L1120 480 L1140 460" fill="none" stroke={P.mintInk} strokeWidth={8} strokeLinecap="round" /></g>
          <g opacity={on(f, sells13, 8) * (1 - on(f, c('s14:carmaker'), 8))}><Label x={960} y={GROUND + 56} text={f >= year13 ? 'ALL NEW CARS SOLD IN A YEAR' : 'ALL NEW CARS SOLD'} size={44} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}

      {/* # B) Big Motors: the cars, the meter, the fine */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={B1}>
          <Factory x={400} y={GROUND} s={1.1} name="BIG MOTORS" f={f} smoke color="#6A5A6A" />
          <g opacity={on(f, madeup15, 8)} transform="translate(400 330) rotate(-6)"><rect x={-110} y={-30} width={220} height={60} rx={10} fill="none" stroke={P.coralInk} strokeWidth={5} /><text y={14} textAnchor="middle" fill={P.coralInk} style={{ font: '400 40px "Bebas Neue"' }}>MADE UP</text></g>
          {/* # a crowd of cars: 1,000,000 */}
          {Array.from({ length: 12 }, (_, k) => <g key={k} opacity={on(f, sells16 + k * 2, 5)} transform={`translate(${880 + (k % 4) * 230} ${GROUND - 40 - Math.floor(k / 4) * 150}) scale(0.32)`}><GasCar x={0} y={0} f={0} color={['#B5523E', '#5A6680', '#8A6A4A', '#4E7A5A'][k % 4]} puff={0} /></g>)}
          <g opacity={on(f, d1m, 8)}><Label x={1225} y={GROUND + 56} text="1,000,000 NEW CARS A YEAR" size={44} font="Bebas Neue" color={P.ink} /></g>
          {([[petrol, 'PETROL', P.coral], [diesel, 'DIESEL', '#5A5A5A']] as [number, string, string][]).map(([at, t, col], k) => <g key={k} opacity={on(f, at, 8)} transform={`translate(${1500 + k * 220} ${300 - 14 * pop(f, at, 12)})`}><rect x={-60} y={-80} width={120} height={160} rx={14} fill={col} /><rect x={-40} y={-60} width={80} height={44} rx={6} fill="#EEF3FA" /><text y={50} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 34px "Bebas Neue"' }}>{t}</text></g>)}
        </g>
        <g opacity={B2}>
          <GasCar x={420} y={GROUND} s={0.7} f={f} />
          <Label x={420} y={GROUND + 56} text="BIG MOTORS" size={44} font="Bebas Neue" color={P.ink} />
          <LimitMeter x={1100} y={GROUND - 20} value={lerp(0, 105, on(f, average17, 20))} limit={100} scale={4.6} showLimit={on(f, d100, 8)} />
          <g opacity={on(f, madeup17, 8)}><Label x={1100} y={GROUND + 56} text="(LIMIT: A MADE-UP NUMBER)" size={36} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, d5, 8)}><path d={`M1010 ${GROUND - 20 - 105 * 4.6} L990 ${GROUND - 20 - 105 * 4.6} L990 ${GROUND - 20 - 100 * 4.6} L1010 ${GROUND - 20 - 100 * 4.6}`} fill="none" stroke={P.coralInk} strokeWidth={5} />
            <Label x={960} y={GROUND - 20 - 102 * 4.6 + 60} text="5 G OVER" size={48} font="Bebas Neue" color={P.coralInk} anchor="end" /></g>
          <g opacity={on(f, over18, 8)}><Person f={f} who="owner" beats={[[0, 'idle', 'worried'], [over18, 'facepalm', 'worried']]} x={1640} y={GROUND} s={0.75} /></g>
        </g>
        <g opacity={B3}>
          {/* # €95 per gram, per car: a small fine tag on a car */}
          <g opacity={1 - on(f, g5 - 4, 10)}>
            <GasCar x={700} y={GROUND} s={0.8} f={f} />
            <g opacity={on(f, d95, 8)} transform={`translate(700 ${470 - 20 * pop(f, d95, 12)})`}><FineBill x={0} y={0} s={0.8} amount="€95" title="PER GRAM" /></g>
            <g opacity={on(f, gram19, 8)}><Label x={1100} y={560} text="FOR EVERY GRAM OVER" size={48} font="Bebas Neue" color={P.ink} anchor="start" /></g>
            <g opacity={on(f, every19b, 8)}><Label x={1100} y={640} text="ON EVERY NEW CAR" size={48} font="Bebas Neue" color={P.ink} anchor="start" /></g>
            <g opacity={on(f, car19, 8)}>{[0, 1, 2].map((k) => <g key={k} transform={`translate(${1180 + k * 180} 820) scale(0.26)`}><GasCar x={0} y={0} f={0} puff={0} /><g transform="translate(0 -320) scale(2.4)"><rect x={-28} y={-16} width={56} height={32} rx={6} fill={P.coral} /><text y={8} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 22px "Bebas Neue"' }}>€95</text></g></g>)}</g>
          </g>
          {/* # the sum, chip by chip */}
          <g opacity={on(f, g5 - 4, 10) * (1 - on(f, bill21 - 4, 10))}>
            {([[g5, '5 G', P.coral], [e95, '€95', P.coral], [m1, '1,000,000 CARS', P.navy3]] as [number, string, string][]).map(([at, t, col], k) => (
              <g key={k} opacity={on(f, at, 6)} transform={`translate(${380 + k * 420} ${480 - 14 * pop(f, at, 12)})`}><rect x={-160} y={-56} width={320} height={112} rx={18} fill={col} /><text y={22} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 64px "Bebas Neue"' }}>{t}</text></g>))}
            {[times1, times2].map((at, k) => <g key={k} opacity={on(f, at, 6)}><Label x={590 + k * 420} y={500} text="×" size={80} font="Bebas Neue" color={P.ink} /></g>)}
            <g opacity={on(f, comes, 8)}><Label x={960} y={700} text="=" size={90} font="Bebas Neue" color={P.ink} /></g>
            <g opacity={on(f, d475, 8)} transform={`translate(960 ${820 - 20 * pop(f, d475, 14) - 12 * pop(f, c('s20:euros#2'), 12)}) scale(${1 + 0.06 * pop(f, c("s21:that's"), 12)})`}><rect x={-260} y={-70} width={520} height={140} rx={22} fill={P.coralInk} /><text y={30} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 90px "Bebas Neue"' }}>€475 MILLION</text></g>
          </g>
          {/* # the bill flies to the EU */}
          <g opacity={on(f, bill21 - 4, 10)}>
            <Gov x={1500} y={GROUND} s={0.9} name="EUROPEAN UNION" />
            <g transform="translate(1500 470)">{Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2; return <circle key={k} cx={Math.cos(a) * 60} cy={Math.sin(a) * 60} r={9} fill={P.gold} /> })}</g>
            {(() => { const fl = fly(f, paid21, [600, 560], [1220, 620], 26, 160); return <FineBill x={fl.x} y={fl.y} s={lerp(1, 0.6, fl.t)} amount="€475M" r={lerp(-6, 6, fl.t)} /> })()}
            <g opacity={on(f, year21, 8)}><Label x={600} y={GROUND + 56} text="EVERY YEAR IT'S MISSED" size={44} font="Bebas Neue" color={P.ink} /></g>
            <Person f={f} who="owner" beats={[[0, 'emptyPockets', 'worried']]} x={300} y={GROUND} s={0.75} />
          </g>
        </g>
      </g>}

      {/* # C) the US version */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={C1}>
          <g opacity={on(f, united, 8)} transform="translate(300 360)"><rect x={-120} y={-70} width={240} height={140} rx={6} fill="#FFFFFF" />{[0, 1, 2, 3, 4, 5, 6].map((k) => <rect key={k} x={-120} y={-70 + k * 20} width={240} height={10} fill="#C8303A" opacity={k % 2 ? 0 : 1} />)}<rect x={-120} y={-70} width={100} height={70} fill="#1F3A7A" /><Label x={0} y={120} text="UNITED STATES" size={40} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, federal, 8)}><Gov x={760} y={GROUND} s={0.85} name="FEDERAL" /></g>
          <g opacity={on(f, fuel, 8)} transform={`translate(760 ${430 - 12 * pop(f, fuel, 12)})`}><circle r={60} fill={P.card} stroke={P.ink} strokeWidth={6} /><line x1={0} y1={0} x2={lerp(-30, 36, on(f, emissions23, 16))} y2={-36} stroke={P.coral} strokeWidth={7} strokeLinecap="round" /><Label x={0} y={100} text="FUEL & EMISSION TARGETS" size={34} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, california23, 8)} transform={`translate(1400 ${560 - 14 * pop(f, california23, 12)})`}>
            <rect x={-220} y={-160} width={440} height={320} rx={18} fill={P.card} stroke={P.edge} strokeWidth={4} />
            <text y={-100} textAnchor="middle" fill={P.navy0} style={{ font: '400 50px "Bebas Neue"' }}>CALIFORNIA</text>
            <g opacity={on(f, states23, 8)}><text y={-56} textAnchor="middle" fill={P.ink2} style={{ font: '400 34px "Bebas Neue"' }}>+ SEVERAL OTHER STATES</text></g>
            <rect x={-180} y={0} width={360} height={60} rx={10} fill="#D9DFE8" />
            <rect x={-180} y={0} width={lerp(0, 120, on(f, required, 18))} height={60} rx={10} fill={P.mint} />
            <g opacity={on(f, zero23, 8)}><text y={120} textAnchor="middle" fill={P.mintInk} style={{ font: '400 38px "Bebas Neue"' }}>A SHARE MUST BE ZERO-EMISSION</text></g>
          </g>
        </g>
        <g opacity={C2}>
          {/* # each zero-emission car sold earns a credit; too few leaves a gap */}
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, each24 + k * 4, 6)}><EVCar x={300 + k * 320} y={GROUND} s={0.5} f={f} /></g>)}
          {f >= earned && [0, 1, 2].map((k) => { const fl = fly(f, earned + k * 5, [300 + k * 320, GROUND - 140], [300 + k * 320, 420], 16, 60); return <CreditCert key={k} x={fl.x} y={fl.y} s={0.6} /> })}
          <g opacity={on(f, credits24, 8)}><Label x={620} y={GROUND + 56} text="EACH ONE EARNS CREDITS" size={44} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, few, 8)}>
            <GasCar x={1500} y={GROUND} s={0.6} f={f} />
            <g transform="translate(1500 420)">{[0, 1, 2].map((k) => <rect key={k} x={-200 + k * 140} y={-60} width={120} height={120} rx={14} fill={k === 0 ? '#F4FBF6' : 'none'} stroke={k === 0 ? P.mintInk : P.coral} strokeWidth={5} strokeDasharray={k === 0 ? '' : '12 8'} />)}
              <g opacity={on(f, gap24, 8)}><text x={70} y={110} textAnchor="middle" fill={P.coralInk} style={{ font: '400 40px "Bebas Neue"' }}>GAP TO COVER</text></g></g>
            <Label x={1500} y={GROUND + 56} text="SOLD TOO FEW" size={44} font="Bebas Neue" color={P.ink} />
          </g>
        </g>
        <g opacity={C3}>
          {/* # miss the target and it costs you; recap */}
          <line x1={760} y1={300} x2={760} y2={GROUND} stroke={P.ink} strokeWidth={6} strokeDasharray="18 12" />
          <Label x={760} y={280} text="TARGET" size={44} font="Bebas Neue" color={P.ink} />
          <GasCar x={lerp(300, 1100, span(f, miss, costs25 + 10))} y={GROUND} s={0.6} f={f} />
          {(() => { const fl = fly(f, costs25, [1100, GROUND - 160], [1100, GROUND - 10], 16, -60); return f >= costs25 ? <Coin2 x={fl.x} y={fl.y} r={30} t="€" /> : null })()}
          <g opacity={on(f, limit26, 8)}><LimitMeter x={1500} y={GROUND - 20} value={105} limit={100} scale={3.6} /></g>
          <g opacity={on(f, expensive, 8)}><FineBill x={1500} y={300} s={0.8} amount="€€€" r={6} /></g>
          <g opacity={on(f, step26, 8)}><Label x={400} y={400} text="STEP 1" size={60} font="Bebas Neue" color={P.coral} /></g>
        </g>
      </g>}
      <Vignette id="ts-limit" />
    </g>
  )
}

const BEATS = ['s14:carmaker', 's20:euros#2', "s21:that's", 's10:governments', 's10:limit', 's10:average', 's11:goal', 's11:cut', 's11:pollution', 's11:little', 's11:every', 's11:years', 's12:europe', 's12:carbon', 's12:grams', 's12:puts', 's12:kilometer', "s13:isn't", 's13:each', 's13:average', 's13:all', 's13:sells', 's13:year', 's14:big', 's14:thirsty', 's14:cleaner', 's14:pull', 's14:down', 's15:meet', 's15:madeup', 's15:motors', 's16:sells', 's16:1', 's16:cars', 's16:petrol', 's16:diesel', 's17:limit', 's17:100', 's17:madeup', 's17:average', 's17:105', 's18:5', 's18:over', 's19:penalty', 's19:95', 's19:gram', 's19:every#2', 's19:car', 's20:5', 's20:times', 's20:95', 's20:times#2', 's20:1', 's20:comes', 's20:475', 's21:bill', 's21:year', 's21:paid', 's21:union', 's22:united', 's22:rules', 's22:too', 's23:federal', 's23:fuel', 's23:emissions', 's23:california', 's23:states', 's23:required', 's23:zeroemission', "s24:california's", 's24:each', 's24:sold', 's24:earned', 's24:credits', 's24:few', 's24:gap', 's25:different', 's25:same', 's25:miss', 's25:costs', 's26:step', 's26:limit', 's26:missing', 's26:expensive']
export const TS_LIMIT = makePiece('ts-limit', 'Tesla long step 1: a government sets a limit meter on the average new car, tightening every few years; Europe measures CO2 grams per km (a car drives a kilometer leaving a grams cloud); five cars\' grams merge into one average, a thirsty car pushes it up and an electric car pulls it down; made-up Big Motors sells 1,000,000 petrol and diesel cars, limit 100 g vs average 105 g, 5 g over; €95 per gram per car; 5 g × €95 × 1,000,000 = €475 million paid to the EU; the US has federal fuel and emission targets and California + other states required a zero-emission share, each zero-emission car earned credits and too few left a gap; miss the target and it costs you', {
  mood: 'light', Component: Limit, beats: BEATS,
  sfx: [['s10:limit', 'pop', 0.2], ['s13:all', 'whoosh', 0.2], ['s17:105', 'pop', 0.2], ['s18:over', 'thud', 0.25], ['s19:95', 'pop', 0.2], ['s20:475', 'thud', 0.3], ['s21:paid', 'swish', 0.2], ['s24:earned', 'coin', 0.2], ['s25:costs', 'coin', 0.2]] })
