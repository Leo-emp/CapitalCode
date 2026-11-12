// ---------------------------------------------------------------- s18–s28: engine one, the insurance (underwriting)
// A) You (owner) at a price board: WHO TO COVER / HOW MUCH (s18); 10,000 x $1,500 pours in as $15 MILLION (s19).
//    One giant dollar coin is carved: a red 70¢ wedge for claims (s20), a slate wedge for running costs with four little icons (s21),
//    an agent takes a slice (s22), the two wedges join to 97¢ (s23); the combined-ratio dial swings to 97% (s24–s25); a thin 3¢ sliver glows green.
// B) "That's thin": the 3¢ sliver alone, then it crumbles on "gone" (s26); four question cards pop on age, car, live, drive (s27);
//    a balance: price too high, drivers walk to a rival; too low, your coins drain on every crash (s28).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { camera } from '../aimoney/common'
import { Bill, C, Car, Coin, Defs, Dot, Flag, Gauge, Grain, House, Land, Office, Reservoir, SkyBg, big, fadeIn, scene } from './kit'

const G = 920
const wedge = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const p = (a: number) => [cx + r * Math.sin(a * 2 * Math.PI), cy - r * Math.cos(a * 2 * Math.PI)]
  const [x0, y0] = p(a0), [x1, y1] = p(a1)
  return `M${cx} ${cy} L${x0} ${y0} A ${r} ${r} 0 ${a1 - a0 > 0.5 ? 1 : 0} 1 ${x1} ${y1} Z`
}
const Price: React.FC<PieceProps> = ({ f, c }) => {
  const setp = c('s18:price'), under = c('s18:underwriting'), cover = c('s18:cover'), charge = c('s18:charge')
  const fifteen = c('s19:fifteen'), collect = c('s19:collect'), claims = c('s20:claims'), seventy = c('s20:seventy')
  const costs = c('s21:costs'), agents = c('s21:agents'), adverts = c('s21:adverts'), staff = c('s21:staff'), offices = c('s21:offices'), four = c('s21:four')
  const cut = c('s22:cut'), customer = c('s22:customer'), before = c('s22:before'), spend = c('s23:spend'), name = c('s24:name'), twenty = c('s23:twenty'), ninety = c('s23:ninety')
  const combined = c('s24:combined'), under100 = c('s24:under'), made = c('s24:made'), yours = c('s25:ninety'), half = c('s25:half'), three = c('s25:three')
  const thin = c('s26:thin'), gone = c('s26:gone'), age = c('s27:age'), car = c('s27:car'), live = c('s27:live'), drive = c('s27:drive'), risk = c('s27:risk')
  const high = c('s28:high'), leave = c('s28:leave'), low = c('s28:low'), lose = c('s28:lose')
  const AB = c('s26') - 6
  const A = scene(f, -20, AB), B = fadeIn(f, AB)
  const pieOn = on(f, claims - 6, 10), dialOn = on(f, name - 4, 10)
  const ab1 = 1 - on(f, claims - 8, 8)
  const pieX = lerp(960, 640, dialOn)
  return (
    <g transform={camera(f, ACC.map((k, i) => [c(k), 960, 540, i % 2 ? 1 : 1.035] as [number, number, number, number]), 18)}>
      <Defs />
      {A > 0 && <g opacity={A}>
        <SkyBg sky="noon" f={f} sun={[1760, 200]} />
        <Land f={f} G={G} sea={false} />
        {ab1 > 0.01 && <g opacity={ab1}>
          <Office x={1400} y={G} s={0.85} />
          <Person f={f} who="owner" beats={[[0, 'idle', 'neutral'], [setp, 'present', 'smiling'], [cover, 'point', 'thinking'], [collect, 'thumbsUp', 'smiling']]} x={420} y={G + 10} s={0.85} />
          <g opacity={win(f, under, fifteen - 4, 8)}>
            <Flag x={820} y={480} text="WHO TO COVER?" size={44} o={on(f, cover - 4, 8)} />
            <Flag x={820} y={600} text="HOW MUCH TO CHARGE?" size={44} o={on(f, charge - 4, 8)} color={C.lamp} />
          </g>
          <g opacity={on(f, fifteen - 4, 8)}>
            <Bill x={820} y={520} s={1} />
            <text x={980} y={545} fill={C.ink} style={big(70)}>× 10,000</text>
            {[...Array(8)].map((_, k) => { const a = collect + k * 5, t = span(f, a, a + 22); return f >= a && t < 1 ? <Coin key={k} x={lerp(900, 1400, t)} y={lerp(620, G - 260, t) - 90 * Math.sin(Math.PI * t)} r={22} /> : null })}
            <Flag x={1400} y={G - 340} text="$15 MILLION IN" size={48} color={C.gold} o={on(f, collect + 6, 8)} />
          </g>
        </g>}
        {pieOn > 0.01 && <g opacity={pieOn}>
          <g transform={`translate(${pieX} 600)`}>
            <circle cx={8} cy={14} r={300} fill="#000" opacity={0.18} />
            <circle r={300} fill="url(#in-goldG)" stroke={C.goldD} strokeWidth={8} />
            <text y={40} textAnchor="middle" fill={C.goldD} opacity={1 - on(f, seventy - 4, 8)} style={big(200)}>$1</text>
            <path d={wedge(0, 0, 286, 0, lerp(0.001, 0.7, on(f, seventy - 4, 16)))} fill="url(#in-redG)" opacity={on(f, seventy - 4, 6)} />
            <path d={wedge(0, 0, 286, 0.7, lerp(0.7001, 0.967, on(f, costs, 16)))} fill={C.slate} opacity={on(f, costs, 6)} />
            <path d={wedge(0, 0, 292, 0, 0.967)} fill="none" stroke={C.lamp} strokeWidth={10} opacity={win(f, spend, name, 6)} />
            <path d={wedge(0, 0, 286, 0.967, 1)} fill="url(#in-greenG)" opacity={on(f, twenty, 8)} stroke={C.lamp} strokeWidth={on(f, three, 8) * 6} />
            <text x={-80} y={110} textAnchor="middle" fill="#fff" opacity={on(f, seventy, 8)} style={big(80)}>70¢</text>
            <text x={-110} y={-60} textAnchor="middle" fill="#fff" opacity={on(f, twenty, 8)} style={big(64)}>27¢</text>
            <text x={-20} y={-320} textAnchor="middle" fill={C.greenD} opacity={on(f, three, 8)} style={big(56)}>3¢</text>
          </g>
          <g opacity={win(f, seventy, costs, 8) * (1 - dialOn)}><Car x={1450} y={560} s={1.2} hue={C.roof} bent={1} /><Flag x={1450} y={680} text="CLAIMS" size={44} color={C.red} ink="#fff" /></g>
          <g opacity={win(f, costs, twenty, 8) * (1 - dialOn)}>
            {([[agents, 'AGENTS'], [adverts, 'ADVERTS'], [staff, 'STAFF'], [offices, 'OFFICES']] as [number, string][]).map(([a, t], k) =>
              <g key={k} opacity={pop(f, a - 2, 10)} transform={`translate(${1380 + (k % 2) * 260} ${400 + Math.floor(k / 2) * 200})`}>
                <circle r={70} fill={C.cream} stroke={C.slate} strokeWidth={5} />
                {k === 0 && <Dot x={0} y={34} s={2} col={C.slate} />}
                {k === 1 && <g><rect x={-40} y={-30} width={80} height={56} rx={6} fill={C.slate} /><path d="M40 -10 l24 -14 v40 l-24 -14 Z" fill={C.slate} /></g>}
                {k === 2 && <g><Dot x={-24} y={34} s={1.4} col={C.slate} /><Dot x={24} y={34} s={1.4} col={C.slate} /></g>}
                {k === 3 && <g><rect x={-36} y={-36} width={72} height={70} fill={C.slate} />{[0, 1, 2].map((r) => <rect key={r} x={-24} y={-26 + r * 22} width={48} height={10} fill={C.lamp} />)}</g>}
                <text y={104} textAnchor="middle" fill={C.ink} style={big(34)}>{t}</text></g>)}
            <Flag x={1510} y={890} text="ABOUT $4 MILLION" size={40} o={on(f, four - 4, 8)} />
          </g>
          <g opacity={win(f, cut - 6, twenty, 8) * (1 - dialOn)}>
            <Dot x={1500} y={480} s={3} col={C.slate} />
            <Coin x={lerp(1260, 1560, span(f, cut, cut + 18))} y={lerp(560, 420, span(f, cut, cut + 18))} r={30} />
            <Flag x={1500} y={560} text="A CUT OF EVERY SALE" size={36} o={on(f, cut, 8)} />
            <Flag x={1500} y={300} text="BEFORE ANY CRASH" size={36} color={C.lamp} o={on(f, before, 8)} />
          </g>
          <Flag x={pieX} y={1010} text="97¢ SPENT OF EVERY $1" size={44} o={win(f, ninety - 4, combined, 8)} color={C.lamp} />
          <g opacity={dialOn}>
            <Gauge x={1380} y={700} v={lerp(80, 96.7, on(f, yours - 6, 20))} s={0.9} />
            <Flag x={1380} y={380} text="UNDER 100 = THE INSURANCE MADE MONEY" size={32} o={on(f, under100, 8)} color={C.greenL} />
            <Flag x={1380} y={900} text="PROFIT: $500,000" size={44} color={C.green} ink="#fff" o={on(f, half - 2, 8)} />
          </g>
        </g>}
      </g>}
      {B > 0 && <g opacity={B}>
        <SkyBg sky="noon" f={f} sun={[1760, 200]} />
        <Land f={f} G={G} sea={false} />
        <g opacity={1 - on(f, age - 8, 8)}>
          <g transform={`translate(960 560) rotate(${on(f, gone, 10) * 30}) translate(0 ${on(f, gone, 16) * 300})`} opacity={1 - on(f, gone + 6, 10)}>
            <path d={wedge(0, 300, 420, -0.017, 0.017)} fill="url(#in-greenG)" stroke={C.ink} strokeWidth={4} />
            <text x={0} y={-150} textAnchor="middle" fill={C.greenD} style={big(90)}>3¢</text>
          </g>
          <Flag x={960} y={880} text="THIN" size={60} o={on(f, thin - 2, 8) * (1 - on(f, gone, 8))} />
          <Flag x={960} y={880} text="ONE BAD GUESS: GONE" size={50} color={C.red} ink="#fff" o={on(f, gone, 8)} />
        </g>
        <g opacity={win(f, age - 8, high - 6, 8)}>
          {([[age, 'YOUR AGE'], [car, 'YOUR CAR'], [live, 'WHERE YOU LIVE'], [drive, 'HOW MUCH YOU DRIVE']] as [number, string][]).map(([a, t], k) =>
            <g key={k} opacity={pop(f, a - 2, 10)} transform={`translate(${330 + k * 420} 560) rotate(${[-4, 3, -2, 4][k]})`}>
              <rect x={-170} y={-190} width={340} height={380} rx={20} fill="#000" opacity={0.15} transform="translate(8 10)" />
              <rect x={-170} y={-190} width={340} height={380} rx={20} fill={C.cream} stroke={C.navy} strokeWidth={6} />
              {k === 0 && <g><rect x={-80} y={-40} width={160} height={90} rx={10} fill={C.roof} /><rect x={-80} y={-50} width={160} height={24} rx={10} fill={C.wall} />{[-40, 0, 40].map((x) => <g key={x}><rect x={x - 5} y={-100} width={10} height={50} fill={C.gold} /><ellipse cx={x} cy={-108} rx={8} ry={12} fill={C.lamp} /></g>)}</g>}
              {k === 1 && <Car x={0} y={40} s={1.2} hue={C.sea} />}
              {k === 2 && <g><House x={0} y={50} s={1} /><path d="M0 -150 a40 40 0 0 1 40 40 c0 30 -40 70 -40 70 c0 0 -40 -40 -40 -70 a40 40 0 0 1 40 -40 Z" fill={C.red} /><circle cx={0} cy={-110} r={14} fill="#fff" /></g>}
              {k === 3 && <g><path d="M-100 40 A 100 100 0 0 1 100 40" fill="none" stroke={C.navy} strokeWidth={14} /><line x1={0} y1={40} x2={lerp(-60, 70, on(f, drive, 20))} y2={-40} stroke={C.red} strokeWidth={10} strokeLinecap="round" /><circle cx={0} cy={40} r={14} fill={C.navy} /></g>}
              <text y={150} textAnchor="middle" fill={C.ink} style={big(40)}>{t}</text>
            </g>)}
          <Flag x={960} y={900} text="EVERY ANSWER PRICES YOUR RISK" size={44} color={C.lamp} o={on(f, risk - 4, 8)} />
        </g>
        <g opacity={on(f, high - 6, 8)}>
          <Office x={520} y={G} s={0.75} sign="YOU" />
          <Office x={1500} y={G} s={0.75} sign="RIVAL" o={on(f, leave - 6, 8)} />
          {[...Array(5)].map((_, k) => { const t = span(f, leave + k * 5, leave + 40 + k * 5); const t2 = span(f, low + k * 4, low + 36 + k * 4); return <Dot key={k} x={lerp(lerp(720 + k * 30, 1320 + k * 30, t), 700 + k * 40, t2)} y={G + 40} s={2} col={COL5[k]} /> })}
          <Flag x={520} y={G - 380} text="PRICE TOO HIGH" size={44} color={C.lamp} o={win(f, high - 4, low - 4, 8)} />
          <Flag x={520} y={G - 380} text="PRICE TOO LOW" size={44} color={C.red} ink="#fff" o={on(f, low - 4, 8)} />
          <g opacity={on(f, lose - 4, 8)}>
            {[...Array(5)].map((_, k) => { const a = lose + k * 7, t = span(f, a, a + 26); return f >= a && t < 1 ? <Coin key={k} x={460 + k * 30} y={lerp(G - 120, G + 120, t)} r={20} o={1 - t} /> : null })}
            <Car x={980} y={G + 70} s={0.9} hue={C.roof} bent={1} />
          </g>
        </g>
      </g>}
      <Headline f={f} lines={[[setp, 'SETTING THE PRICE', C.navy, 104], [combined, 'THE COMBINED RATIO', C.navy, 104], [thin, 'A THIN MARGIN', C.navy, 104], [high, 'TOO HIGH OR TOO LOW', C.navy, 104]]} />
      <Grain />
    </g>
  )
}
const COL5 = [C.sea, C.roof, C.plum, C.greenD, C.goldD]
const ACC = ["s18:now","s19:charge","s19:million","s20:million","s20:dollar","s21:place","s22:agents","s22:sell","s23:that's","s23:collect","s24:means","s25:percent","s25:profit","s26:guess","s27:insurers","s27:answer","s28:rival","s28:crash"]  // # accent words: a gentle camera push on each (fills >2 s gaps)
const BEATS = ['s18:price', 's18:underwriting', 's18:cover', 's18:charge', 's19:fifteen', 's19:collect', 's20:claims', 's20:seventy', 's21:costs', 's21:agents', 's21:adverts', 's21:staff', 's21:offices', 's21:four', 's22:cut', 's22:customer', 's22:before', 's23:twenty', 's23:spend', 's23:ninety', 's24:name', 's24:combined', 's24:under', 's24:made', 's25:ninety', 's25:half', 's25:three', 's26:thin', 's26:gone', 's27:age', 's27:car', 's27:live', 's27:drive', 's27:risk', 's28:high', 's28:leave', 's28:low', 's28:lose']
export const IN_PRICE = makePiece('ins-price', 'Underwriting: you at your office, WHO TO COVER? / HOW MUCH TO CHARGE?, a $1,500 bill x 10,000 pours $15 MILLION IN; a giant $1 coin carved into a red 70¢ claims wedge, a slate 27¢ running-costs wedge (AGENTS, ADVERTS, STAFF, OFFICES, ABOUT $4 MILLION, A CUT OF EVERY SALE) and a green 3¢ sliver; 97¢ SPENT OF EVERY $1; a COMBINED RATIO dial swings to 97% (UNDER 100 = THE INSURANCE MADE MONEY, PROFIT: $500,000); the 3¢ sliver THIN, ONE BAD GUESS: GONE; four question cards YOUR AGE, YOUR CAR, WHERE YOU LIVE, HOW MUCH YOU DRIVE; PRICE TOO HIGH drivers walk to a RIVAL, PRICE TOO LOW coins drain', {
  mood: 'light', Component: Price, beats: [...BEATS, ...ACC],
  sfx: [['s19:collect', 'coin', 0.1], ['s20:seventy', 'swish', 0.1], ['s21:agents', 'pop', 0.08], ['s21:adverts', 'pop', 0.08], ['s21:staff', 'pop', 0.08], ['s21:offices', 'pop', 0.08], ['s24:combined', 'whoosh', 0.1], ['s25:half', 'ding', 0.1], ['s26:gone', 'crack', 0.12], ['s27:age', 'pop', 0.08], ['s27:car', 'pop', 0.08], ['s27:live', 'pop', 0.08], ['s27:drive', 'pop', 0.08], ['s28:lose', 'thud', 0.1]] })
