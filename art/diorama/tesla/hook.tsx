// ---------------------------------------------------------------- s1–s9: the hook.
// A) Tesla's factory with an electric car outside. On "side hustle" a little stall pops up beside it; on "12.7 billion"
//    a coin stack grows on the stall. "Not to drivers": a driver walks up, gets an X. "Other carmakers": two smoky rival
//    factories slide in and coins fly from them into the stall. "Not a car, a battery or software": three icons get
//    crossed out; "a government rule": a rule book drops in.
// B) 2020: a small green profit bar ($721M), then a gold side-hustle bar more than twice as tall ($1.58B), a ×2 bracket;
//    "every year from 2017 to 2025": nine year chips pop in a row, a coin on each.
// C) "Why would carmakers hand billions to their biggest competitor?": a rival boss hands a money bag across to Tesla.
//    "One rule about the average car": a dashed limit line over a row of cars. Then the four step icons.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Mini } from '../../rig/Mini'
import { Coin2, MoneyBag } from '../uber/kit'
import { CreditCert, EVCar, Factory, GasCar, LimitMeter, TSpot } from './kit'

const GROUND = 920
const YEARS = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const side1 = c('s1:side'), d12 = c('s1:12'), billion1 = c('s1:billion')
  const doesnt = c("s2:doesn't"), drivers2 = c('s2:drivers'), sells2 = c('s2:sells'), other2 = c('s2:other'), rivals = c('s2:rivals')
  const car3 = c('s3:car'), battery = c('s3:battery'), software = c('s3:software'), something = c('s3:something'), government = c('s3:government'), rule3 = c('s3:rule')
  const y2020 = c('s4:2020'), first4 = c('s4:first'), profit4 = c('s4:profit'), d721 = c('s4:721')
  const same5 = c('s5:same'), side5 = c('s5:side'), d58 = c('s5:58'), twice = c('s5:twice'), profit5 = c('s5:profit')
  const oneoff = c('s6:oneoff'), money6 = c('s6:money'), every6 = c('s6:every'), y2017 = c('s6:2017'), y2025 = c('s6:2025')
  const why = c('s7:why'), hand = c('s7:hand'), billions7 = c('s7:billions'), competitor = c('s7:competitor')
  const one8 = c('s8:one'), rule8 = c('s8:rule'), average8 = c('s8:average'), car8 = c('s8:car')
  const four9 = c('s9:four'), limit9 = c('s9:limit'), electric9 = c('s9:electric'), deal9 = c('s9:deal'), worth9 = c('s9:worth')
  const AB = y2020 - 6, BC = why - 2
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const C1 = 1 - on(f, one8 - 6, 10), C2 = on(f, one8 - 6, 10) * (1 - on(f, four9 - 6, 10)), C3 = on(f, four9 - 6, 10)
  return (
    <g>
      <Stage id="ts-hook" frame={f} />
      <TSpot f={f} at={side1} x={1180} y={640} rx={220} ry={200} />
      <TSpot f={f} at={twice} x={1100} y={560} rx={200} ry={220} />
      <Headline f={f} lines={[[side1, "TESLA'S SIDE HUSTLE", P.ink, 110], [d12, '≈ $12.7 BILLION', P.goldInk, 110], [other2, 'SOLD TO ITS RIVALS', P.ink, 110], [government, 'A GOVERNMENT RULE', P.ink, 104], [y2020, "2020: TESLA'S FIRST PROFITABLE YEAR", P.ink, 88], [twice, 'MORE THAN TWICE THE PROFIT', P.ink, 96], [every6, 'EVERY YEAR, 2017–2025', P.ink, 100], [why, 'WHY PAY A COMPETITOR?', P.ink, 104], [rule8, 'ONE RULE ABOUT THE AVERAGE CAR', P.ink, 92], [four9, '4 SIMPLE STEPS', P.ink, 110]]} />

      {/* # A) the factory, the stall, the rivals, the rule */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, car3 - 6, 10)}>
          <Factory x={460} y={GROUND} s={1.1} name="TESLA" color="#3E4A61" />
          <EVCar x={460} y={GROUND} s={0.7} f={0} />
          {/* # the side-hustle stall */}
          <g opacity={on(f, side1, 6)} transform={`translate(1060 ${GROUND - 40 * (1 - pop(f, side1, 14))})`}>
            <rect x={-140} y={-170} width={280} height={170} rx={10} fill="#E9C25A" />
            <path d="M-170 -170 L170 -170 L150 -230 L-150 -230 Z" fill={P.coral} />{[-110, -40, 30, 100].map((sx) => <rect key={sx} x={sx} y={-230} width={30} height={60} fill="#FFFFFF" opacity={0.5} />)}
            <text x={0} y={-86} textAnchor="middle" fill={P.navy0} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 2 }}>SIDE HUSTLE</text>
            {/* # the coin stack on the counter */}
            {Array.from({ length: 8 }, (_, k) => <ellipse key={k} cx={0} cy={-246 - k * 18} rx={50} ry={14} fill={P.gold} stroke={P.goldD} strokeWidth={3} opacity={on(f, d12 + k * 2, 4)} />)}
            <g opacity={on(f, billion1, 8)}><text x={0} y={-410} textAnchor="middle" fill={P.goldInk} style={{ font: '400 56px "Bebas Neue"' }}>$12.7B</text></g>
          </g>
          {/* # a driver walks up and gets an X */}
          <g opacity={on(f, doesnt, 8) * (1 - on(f, other2, 10))}><Mini look="buyer" x={lerp(1500, 1300, on(f, doesnt, 16))} y={GROUND} scale={0.8} frame={f} seed={3} mood="neutral" />
            <g opacity={on(f, drivers2, 6)} transform="translate(1300 600)"><path d="M-36 -36 L36 36 M36 -36 L-36 36" stroke={P.coralInk} strokeWidth={14} strokeLinecap="round" /></g></g>
          {/* # the rivals slide in; coins fly to the stall */}
          {[0, 1].map((k) => <g key={k} opacity={on(f, other2 + k * 6, 8)} transform={`translate(${lerp(300, 0, on(f, other2 + k * 6, 16))} 0)`}><Factory x={1500 + k * 300} y={GROUND} s={0.62} name={k ? 'RIVAL B' : 'RIVAL A'} f={f} smoke color={k ? '#7A6A5A' : '#6A5A6A'} /></g>)}
          {f >= sells2 + 20 && [0, 1, 2, 3].map((k) => { const fl = fly(f, other2 + 12 + k * 6, [1500 + (k % 2) * 300, GROUND - 160], [1060, GROUND - 260], 20, 140); return fl.t < 1 ? <Coin2 key={k} x={fl.x} y={fl.y} r={22} t="$" /> : null })}
          <g opacity={on(f, rivals, 8)}><Label x={1650} y={GROUND + 60} text="ITS RIVALS" size={46} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {/* # not a car, a battery or software — but a rule */}
        <g opacity={on(f, car3 - 6, 10)}>
          {([[car3, 'CAR'], [battery, 'BATTERY'], [software, 'SOFTWARE']] as [number, string][]).map(([at, t], k) => {
            const x = 420 + k * 360
            return <g key={k} opacity={on(f, at, 6) * (1 - on(f, something, 8) * 0.6)} transform={`translate(${x} 560)`}>
              <rect x={-120} y={-120} width={240} height={240} rx={28} fill={P.card} stroke={P.edge} strokeWidth={4} />
              {k === 0 && <g transform="translate(0 50) scale(0.5)"><EVCar x={0} y={0} /></g>}
              {k === 1 && <g><rect x={-44} y={-60} width={88} height={130} rx={12} fill="#5A6680" /><rect x={-18} y={-76} width={36} height={18} rx={4} fill="#5A6680" /><path d="M-6 -30 L-20 10 L0 10 L-8 46 L20 -2 L0 -2 L10 -30 Z" fill={P.gold} /></g>}
              {k === 2 && <g><rect x={-70} y={-56} width={140} height={100} rx={10} fill="#2B3A55" /><path d="M-30 -20 L-50 0 L-30 20 M30 -20 L50 0 L30 20" fill="none" stroke={P.mint} strokeWidth={8} strokeLinecap="round" /></g>}
              <text y={170} textAnchor="middle" fill={P.ink} style={{ font: '400 44px "Bebas Neue"' }}>{t}</text>
              <path d="M-90 -90 L90 90" stroke={P.coralInk} strokeWidth={14} strokeLinecap="round" strokeDasharray="260" strokeDashoffset={260 * (1 - span(f, at + 4, at + 14))} />
            </g> })}
          {/* # the rule book */}
          <g opacity={on(f, government, 8)} transform={`translate(1560 ${560 - 30 * (1 - pop(f, government, 14))})`}>
            <rect x={-130} y={-170} width={260} height={340} rx={14} fill="#2B3A55" /><rect x={-110} y={-150} width={220} height={300} rx={8} fill="#EEF3FA" />
            <text x={0} y={-80} textAnchor="middle" fill={P.navy0} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 3 }}>RULE</text>
            {[-30, 10, 50, 90].map((ly) => <rect key={ly} x={-80} y={ly} width={160} height={12} rx={6} fill="#C9D3E1" />)}
            <g opacity={on(f, rule3, 6)}><circle cx={80} cy={130} r={44} fill={P.coral} /><text x={80} y={146} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>LAW</text></g>
          </g>
        </g>
      </g>}

      {/* # B) 2020: the profit and the side hustle; every year */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, oneoff - 4, 10)}>
          <g opacity={on(f, first4, 8)}><rect x={640} y={GROUND - lerp(0, 721 * 0.3, on(f, d721, 20))} width={200} height={lerp(0, 721 * 0.3, on(f, d721, 20))} rx={14} fill={P.mint} />
            <Label x={740} y={GROUND + 60} text="TESLA'S PROFIT" size={44} font="Bebas Neue" color={P.ink} />
            <g opacity={on(f, d721, 8)}><Label x={740} y={GROUND - 721 * 0.3 - 30} text="$721M" size={56} font="Bebas Neue" color={P.mintInk} /></g></g>
          <g opacity={on(f, side5, 8)}><rect x={1000} y={GROUND - lerp(0, 1580 * 0.3, on(f, d58, 22))} width={200} height={lerp(0, 1580 * 0.3, on(f, d58, 22))} rx={14} fill={P.gold} />
            <Label x={1100} y={GROUND + 60} text="SIDE HUSTLE" size={44} font="Bebas Neue" color={P.ink} />
            <g opacity={on(f, d58, 8)} transform={`translate(0 ${-14 * pop(f, c('s5:billion'), 12)})`}><Label x={1100} y={GROUND - 1580 * 0.3 - 30} text="$1.58B" size={56} font="Bebas Neue" color={P.goldInk} /></g></g>
          {/* # ×2: two copies of the profit bar stack beside the gold bar */}
          <g opacity={on(f, c('s5:more'), 8)}>{[0, 1].map((k) => <rect key={k} x={1260} y={GROUND - 721 * 0.3 * (k + 1)} width={120} height={721 * 0.3 - 6} rx={10} fill={P.mint} opacity={on(f, twice + k * 6, 5)} />)}
            <Label x={1320} y={GROUND + 60} text="2 × PROFIT" size={40} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, y2020, 8)} transform={`translate(330 ${430 - 14 * pop(f, y2020, 12)})`}><rect x={-90} y={-44} width={180} height={88} rx={12} fill={P.navy3} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 60px "Bebas Neue"' }}>2020</text></g>
          <Person f={f} who="investor" beats={[[0, 'idle', 'smiling'], [profit4, 'present', 'smiling'], [twice, 'shrug', 'shocked'], [profit5, 'think', 'thinking']]} x={330} y={GROUND} s={0.8} />
        </g>
        {/* # every year from 2017 to 2025: nine chips, a coin dropping on each */}
        <g opacity={on(f, oneoff - 4, 10)}>
          <g opacity={on(f, money6, 8)}><MoneyBag x={960} y={420 - 16 * pop(f, c('s7:so'), 12)} s={lerp(0.8, 1.1, on(f, y2025, 20))} text="$" /></g>
          {YEARS.map((yr, k) => { const at = lerp(every6, y2025, k / 8), x = 220 + k * 185
            return <g key={k} opacity={on(f, at, 6)} transform={`translate(${x} ${760 - 14 * pop(f, at, 12)})`}>
              <rect x={-74} y={-36} width={148} height={72} rx={12} fill={P.navy3} /><text y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"' }}>{yr}</text>
              {(() => { const fl = fly(f, at + 2, [960 - x, 420 - 760], [0, -90], 14, 80); return f >= at + 2 ? <Coin2 x={fl.x} y={fl.y} r={24} t="$" /> : null })()}
            </g> })}
          <g opacity={on(f, y2017, 8)}><Label x={960} y={GROUND + 50} text="EVERY YEAR" size={44} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>}

      {/* # C) why pay a competitor? one rule; four steps */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={C1}>
          <Factory x={360} y={GROUND} s={0.8} name="RIVAL" f={f} smoke color="#6A5A6A" />
          <Factory x={1560} y={GROUND} s={0.8} name="TESLA" color="#3E4A61" />
          <Person f={f} who="owner" beats={[[0, 'idle', 'worried'], [hand, 'offer', 'worried']]} x={760} y={GROUND} s={0.8} />
          <Person f={f} who="hero" beats={[[0, 'idle', 'smiling'], [billions7, 'receive', 'smiling']]} x={1200} y={GROUND} s={0.8} flip />
          {(() => { const fl = fly(f, hand + 4, [820, GROUND - 260], [1140, GROUND - 260], 20, 60); return f >= hand ? <MoneyBag x={fl.x} y={fl.y + 80} s={0.6} text="$" /> : null })()}
          <g opacity={on(f, competitor, 8)}><Label x={1560} y={GROUND + 60} text="BIGGEST COMPETITOR" size={42} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={C2}>
          <line x1={200} y1={520} x2={1720} y2={520} stroke={P.ink} strokeWidth={6} strokeDasharray="20 12" opacity={on(f, rule8, 8)} />
          <g opacity={on(f, rule8, 8)}><Label x={1740} y={532} text="LIMIT" size={44} font="Bebas Neue" color={P.ink} anchor="start" /></g>
          {[0, 1, 2, 3, 4].map((k) => <g key={k} opacity={on(f, one8 + k * 3, 6)}>{k === 2 ? <EVCar x={360 + k * 300} y={GROUND} s={0.6} f={f} /> : <GasCar x={360 + k * 300} y={GROUND} s={0.6} f={f} />}</g>)}
          {/* # the average: one marker sliding to the middle */}
          <g opacity={on(f, average8, 8)} transform={`translate(960 ${lerp(420, 600, on(f, car8, 16))})`}><circle r={40} fill={P.gold} /><text y={14} textAnchor="middle" fill={P.navy0} style={{ font: '400 40px "Bebas Neue"' }}>AVG</text></g>
        </g>
        <g opacity={C3}>
          {([[limit9, 'THE LIMIT'], [electric9, 'THE ELECTRIC CAR'], [deal9, 'THE DEAL'], [worth9, "WHAT IT'S WORTH"]] as [number, string][]).map(([at, t], k) => {
            const x = 300 + k * 440
            return <g key={k} opacity={on(f, Math.min(at, four9 + k * 6), 8)} transform={`translate(${x} ${GROUND - 140 - 20 * pop(f, at, 14)})`}>
              {k === 0 && <g transform="translate(0 -60) scale(0.45)"><LimitMeter x={0} y={0} value={105} /></g>}
              {k === 1 && <g transform="translate(0 -80) scale(0.5)"><EVCar x={0} y={0} f={0} glow={1} /></g>}
              {k === 2 && <g transform="translate(0 -150) scale(0.7)"><CreditCert x={0} y={0} /></g>}
              {k === 3 && <g>{[0, 1, 2, 3].map((j) => <ellipse key={j} cx={0} cy={-110 - j * 26} rx={60} ry={16} fill={P.gold} stroke={P.goldD} strokeWidth={3} />)}</g>}
              <circle cx={0} cy={60} r={36} fill={[P.coral, P.mint, P.sky, P.gold][k]} />
              <text x={0} y={78} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>{k + 1}</text>
              <Label x={0} y={150} text={t} size={44} font="Bebas Neue" color={P.ink} />
            </g> })}
        </g>
      </g>}
      <Vignette id="ts-hook" />
    </g>
  )
}

const BEATS = ['s7:so', 's5:billion', 's5:more', 's1:side', 's1:12', 's1:billion', "s2:doesn't", 's2:drivers', 's2:sells', 's2:other', 's2:rivals', 's3:car', 's3:battery', 's3:software', 's3:something', 's3:government', 's3:rule', 's4:2020', 's4:first', 's4:profit', 's4:721', 's5:same', 's5:side', 's5:58', 's5:twice', 's5:profit', 's6:oneoff', 's6:money', 's6:every', 's6:2017', 's6:2025', 's7:why', 's7:hand', 's7:billions', 's7:competitor', 's8:one', 's8:rule', 's8:average', 's8:car', 's9:four', 's9:limit', 's9:electric', 's9:deal', 's9:worth']
export const TS_HOOK = makePiece('ts-hook', 'Tesla long hook: Tesla factory with a side-hustle stall; $12.7B coin stack; not sold to drivers but to rival carmakers (smoky factories, coins fly in); not a car, battery or software (crossed out) but a government rule book; 2020 profit $721M vs side hustle $1.58B, more than twice; year chips 2017–2025; a rival boss hands a money bag to Tesla; one rule about the average car (limit line over cars, AVG marker); four steps', {
  mood: 'light', Component: Hook, beats: BEATS,
  sfx: [['s1:side', 'pop', 0.25], ['s1:12', 'coin', 0.25], ['s2:other', 'whoosh', 0.2], ['s3:government', 'thud', 0.25], ['s5:58', 'pop', 0.25], ['s6:every', 'coin', 0.2], ['s7:hand', 'swish', 0.2], ['s9:four', 'pop', 0.25]] })
