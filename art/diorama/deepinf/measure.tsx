// ---------------------------------------------------------------- s21–s39: how inflation is measured, and your own number
// A) The statistics office: a paper building BUREAU OF LABOR STATISTICS (s21); a clerk with a clipboard; tiny shop, rental home and doctor icons pop with 80,000 ITEMS (s22);
//    everything drops into one giant basket labelled CPI (s23); a scale card: $1,000 LAST YEAR → $1,037 TODAY = 3.7% (s24).
// B) Weights: the basket becomes a paper pie; SHELTER takes 36% (s26); rent jumps and the thermometer jumps; a pack of gum doubles and the thermometer barely moves (s27);
//    CORE = the basket with food and energy cut out (s28); two thermometers HEADLINE 3.7% / CORE 2.6% (s29–s30); a PCE cousin tag for the Fed target (s31).
// C) Your own number: three paper jars RENT $1,500, FOOD $600, GAS $200 (s34); +$75, +$18, −$4 tags (s35–s37); 89 ÷ 2,300 (s38); your thermometer 3.9% (s39).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { camera } from '../aimoney/common'
import { Back, Basket, C, Cut, Defs, Grain, House, Shop, Tag, Thermo, big, box, fadeIn, scene } from './kit'

const G = 900
const wedge = (r: number, a0: number, a1: number) => { const p = (a: number) => [r * Math.sin(a * 2 * Math.PI), -r * Math.cos(a * 2 * Math.PI)]; const [x0, y0] = p(a0), [x1, y1] = p(a1); return `M0 0 L${x0} ${y0} A ${r} ${r} 0 ${a1 - a0 > 0.5 ? 1 : 0} 1 ${x1} ${y1} Z` }
const Measure: React.FC<PieceProps> = ({ f, c }) => {
  const bureau = c('s21:bureau'), month = c('s22:month'), eighty = c('s22:eighty'), stores = c('s22:stores'), rental = c('s22:rental'), doctors = c('s22:doctors')
  const giant = c('s23:giant'), cpi = c('s23:cpi'), thousand = c('s24:thousand'), thirty = c('s24:thirty'), point = c('s24:point')
  const weighted = c('s25:weighted'), housing = c('s26:housing'), thirtySix = c('s26:thirty'), rents = c('s27:rents'), gum = c('s27:gum'), nobody = c('s27:nobody')
  const core = c('s28:core'), food = c('s28:food'), energy = c('s28:energy'), headline = c('s29:headline'), core29 = c('s29:core'), gap = c('s30:gap'), pce = c('s31:pce')
  const catchW = c('s32:catch'), rent = c('s33:rent'), drive = c('s33:drive'), own = c('s33:own')
  const fifteen = c('s34:fifteen'), six = c('s34:six'), two = c('s34:two'), total = c('s34:total')
  const five = c('s35:five'), seventy = c('s35:seventy'), eighteen = c('s36:eighteen'), four = c('s37:four'), add = c('s38:add'), eightyNine = c('s38:eighty'), personal = c('s39:personal'), rent39 = c('s39:rent')
  const AB = c('s25') - 6, BC = c('s32') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = fadeIn(f, BC)
  const pieOn = 1 - on(f, core - 6, 8)
  return (
    <g transform={camera(f, ACC.map((k, i) => [c(k), 960, 540, i % 2 ? 1 : 1.025] as [number, number, number, number]), 26)}>
      <Defs />
      {A > 0 && <g opacity={A}>
        <Back sky="grey" f={f} sun={null} />
        <g opacity={1 - on(f, thousand - 6, 8)}>
          <g opacity={on(f, bureau - 6, 8)}>
            <Cut d={`${box(260, 380, 520, 520, 6)}`} fill={C.paperD} /><Cut d="M240 390 L520 260 L800 390 Z" fill={C.cream} />
            {[0, 1, 2, 3].map((k) => <rect key={k} x={300 + k * 120} y={420} width={60} height={460} fill={C.cream} stroke={C.ink} strokeWidth={3} />)}
            <rect x={300} y={330} width={440} height={50} rx={6} fill={C.ink} /><text x={520} y={366} textAnchor="middle" fill={C.cream} style={big(30)}>BUREAU OF LABOR STATISTICS</text>
          </g>
          <Person f={f} who="worker" beats={[[0, 'idle', 'neutral'], [month, 'signA', 'neutral', 'signB', 14]]} x={940} y={G + 20} s={0.8} o={on(f, month - 6, 8)} />
          <Tag x={1400} y={300} text="80,000 ITEMS A MONTH" size={48} color={C.mustard} o={on(f, eighty, 8)} />
          <Shop x={1180} y={G - 20} s={0.45} o={pop(f, stores - 2, 10)} name="STORE" />
          <House x={1450} y={G - 20} s={0.9} o={pop(f, rental - 2, 10)} />
          <g opacity={pop(f, doctors - 2, 10)} transform={`translate(1700 ${G - 120})`}><Cut d={box(-80, -100, 160, 200, 10)} fill={C.cream} /><rect x={-14} y={-60} width={28} height={80} fill={C.coral} /><rect x={-40} y={-34} width={80} height={28} fill={C.coral} /></g>
          <g opacity={on(f, giant - 4, 8)}><rect width={1920} height={1080} fill={C.paper} opacity={0.97} /><Basket x={960} y={G - 20} s={lerp(1, 2.2, on(f, giant, 16))} /><Tag x={960} y={330} text="CONSUMER PRICE INDEX (CPI)" size={52} color={C.teal} ink="#fff" o={on(f, cpi - 4, 8)} /></g>
        </g>
        <g opacity={on(f, thousand - 6, 8)}>
          <Basket x={560} y={G - 60} s={1.4} tag="$1,000" />
          <text x={560} y={G + 60} textAnchor="middle" fill={C.ink} style={big(44)}>LAST YEAR</text>
          <Basket x={1300} y={G - 60} s={1.4} tag="$1,037" tagCol={C.coral} o={on(f, thirty - 4, 8)} />
          <text x={1300} y={G + 60} textAnchor="middle" fill={C.ink} opacity={on(f, thirty, 8)} style={big(44)}>TODAY</text>
          <Tag x={960} y={330} text="INFLATION = 3.7%" size={64} color={C.mustard} o={pop(f, point - 2, 12)} />
        </g>
      </g>}
      {B > 0 && <g opacity={B}>
        <Back sky="grey" f={f} sun={null} />
        {pieOn > 0.01 && <g opacity={pieOn}>
          <g transform="translate(640 560)" opacity={on(f, weighted - 4, 8)}>
            <path d={wedge(300, 0, 1)} fill={C.cream} filter="url(#dd-shadow)" />
            {[[0.356, C.coral], [0.5, C.mustard], [0.64, C.teal], [0.78, C.pink], [0.9, C.sky], [1, C.green]].map(([a1, col], k, arr) => { const a0 = k ? (arr[k - 1][0] as number) : 0; return <path key={k} d={wedge(300, a0, a0 + ((a1 as number) - a0) * on(f, weighted + k * 4, 12))} fill={col as string} stroke={C.ink} strokeWidth={3} /> })}
            <path d={wedge(300, 0, 0.356)} fill="url(#dd-dots)" />
            <path d={wedge(320, 0, 0.356)} fill="none" stroke={C.ink} strokeWidth={8} opacity={on(f, housing, 8)} />
            <text x={150} y={-40} fill="#fff" opacity={on(f, thirtySix - 2, 8)} style={big(72)}>36%</text>
          </g>
          <Tag x={640} y={980} text="SHELTER: THE BIGGEST PIECE" size={44} color={C.coral} ink="#fff" o={on(f, housing, 8)} />
          <Thermo x={1460} y={720} v={f >= gum ? lerp(7, 7.05, on(f, gum, 10)) : lerp(3, 7, on(f, rents, 16))} max={10} s={0.95} label={f >= gum ? 'GUM x2: BARELY MOVES' : f >= rents ? 'RENTS JUMP: INDEX JUMPS' : 'THE INDEX'} o={on(f, rents - 6, 8)} />
          <Tag x={1460} y={210} text="GUM PRICE x2" size={40} color={C.pink} o={pop(f, gum - 2, 10) * (1 - on(f, nobody + 30, 8))} />
        </g>}
        <g opacity={on(f, core - 6, 8)}>
          <g opacity={1 - on(f, headline - 6, 8)}>
            <Basket x={960} y={G - 60} s={1.8} />
            <g opacity={pop(f, food - 2, 10)}><Tag x={600} y={420} text="FOOD" size={60} color={C.mustard} rot={-8} /><line x1={500} y1={420} x2={720} y2={420} stroke={C.coral} strokeWidth={12} opacity={on(f, food + 10, 8)} /></g>
            <g opacity={pop(f, energy - 2, 10)}><Tag x={1320} y={420} text="ENERGY" size={60} color={C.mustard} rot={8} /><line x1={1200} y1={420} x2={1460} y2={420} stroke={C.coral} strokeWidth={12} opacity={on(f, energy + 10, 8)} /></g>
            <Tag x={960} y={300} text="CORE = WITHOUT FOOD + ENERGY" size={48} color={C.teal} ink="#fff" o={on(f, core, 8)} />
          </g>
          <g opacity={on(f, headline - 6, 8)}>
            <Thermo x={640} y={780} v={3.7 * on(f, headline, 20)} max={8} label="HEADLINE 3.7%" />
            <Thermo x={1280} y={780} v={2.6 * on(f, core29, 20)} max={8} label="CORE 2.6%" o={on(f, core29 - 4, 8)} />
            <Tag x={960} y={240} text="THE GAP = FOOD + ENERGY PUSHING" size={44} color={C.coral} ink="#fff" o={on(f, gap - 2, 8) * (1 - on(f, pce - 6, 8))} />
            <Tag x={960} y={240} text="THE FED'S TARGET USES PCE, A CLOSE COUSIN" size={40} color={C.mustard} o={on(f, pce - 2, 8)} />
          </g>
        </g>
      </g>}
      {Cc > 0 && <g opacity={Cc}>
        <Back sky="warm" f={f} sun={[1680, 220]} />
        <g opacity={1 - on(f, fifteen - 6, 8)}>
          <Thermo x={560} y={760} v={3.7} max={8} label="THE AVERAGE" o={on(f, catchW - 4, 8)} />
          <g opacity={on(f, rent - 4, 8)}><House x={1180} y={G - 60} s={1.3} col={C.coral} /><Tag x={1180} y={420} text="RENT IN A HOT CITY" size={36} /></g>
          <g opacity={on(f, drive - 4, 8)}><Tag x={1560} y={560} text="DRIVE A LOT" size={36} color={C.mustard} /></g>
          <Thermo x={1480} y={980} v={lerp(3.7, 6, on(f, rent, 20))} max={8} s={0.6} label="" o={on(f, rent, 8) * (1 - on(f, own - 2, 8))} />
          <Tag x={1180} y={300} text="OWN YOUR HOME? MAYBE SLOWER" size={36} color={C.teal} ink="#fff" o={on(f, own, 8)} />
        </g>
        <g opacity={on(f, fifteen - 6, 8)}>
          {([[fifteen, 'RENT', '$1,500', seventy, '+$75', C.coral], [six, 'FOOD', '$600', eighteen, '+$18', C.mustard], [two, 'GAS', '$200', four, '−$4', C.teal]] as [number, string, string, number, string, string][]).map(([a, t, v, b, d, col], k) => { const h = [300, 140, 70][k]
            return <g key={k} opacity={on(f, a - 2, 8)} transform={`translate(${380 + k * 360} 0)`}>
              <Cut d={box(-110, G - 40 - h, 220, h, 12)} fill={col} />
              <text y={G - 60 - h} textAnchor="middle" fill={C.ink} style={big(44)}>{t}</text>
              <text y={G + 50} textAnchor="middle" fill={C.ink} style={big(48)}>{v}</text>
              <Tag x={0} y={G - 120 - h - 60} text={d} size={50} color={k === 2 ? C.teal : C.cream} ink={k === 2 ? '#fff' : C.ink} o={pop(f, b - 2, 10)} />
            </g> })}
          <Tag x={760} y={250} text="TOTAL $2,300 A MONTH" size={44} o={on(f, total - 2, 8) * (1 - on(f, five - 4, 6))} />
          <Tag x={760} y={250} text="RENT +5%" size={44} color={C.coral} ink="#fff" o={win(f, five - 2, eighteen - 4, 6)} />
          <g opacity={on(f, add - 2, 8)}>
            <Cut d={box(500, 160, 520, 120, 16)} fill={C.cream} />
            <text x={760} y={240} textAnchor="middle" fill={C.ink} style={big(56)}>{f >= eightyNine ? '$89 ÷ $2,300' : '75 + 18 − 4'}</text>
          </g>
          <Thermo x={1560} y={760} v={3.87 * on(f, personal - 4, 20)} max={8} label="YOU: 3.9%" o={on(f, personal - 6, 8)} />
          <Tag x={1560} y={250} text="RENT DRIVES YOUR NUMBER" size={40} color={C.coral} ink="#fff" o={on(f, rent39 - 2, 8)} />
        </g>
      </g>}
      <Headline f={f} lines={[[bureau, 'WHO MEASURES IT', C.ink, 104], [weighted, 'NOT ALL PRICES COUNT THE SAME', C.ink, 92], [core, 'HEADLINE VS CORE', C.ink, 104], [catchW, 'YOUR OWN INFLATION', C.ink, 104]]} />
      <Grain />
    </g>
  )
}
const ACC = ["s21:decides","s21:percent","s21:government","s21:statistics","s22:items","s23:those","s23:consumer","s24:like","s24:whole","s24:year","s24:same","s24:inflation","s24:seven#2","s25:basket","s25:same","s25:spend","s26:biggest","s26:shelter","s26:end","s27:jumps","s28:economists","s28:something","s28:that's","s28:two","s28:wildly","s29:september","s29:point","s29:point#2","s30:doing","s31:federal","s31:cousin","s31:index","s31:official","s32:own","s32:very","s32:average","s33:basket","s33:faster","s33:number","s33:maybe","s34:out","s34:step#2","s34:each","s34:food","s34:that's","s35:year","s35:more","s36:goes","s36:percent","s37:gas","s37:gets","s37:cheaper","s38:eighteen","s38:four","s38:twenty","s39:three","s39:even","s39:down","s39:thing","s39:drives"]  // # accent words: a gentle camera push on each (fills >2 s gaps)
const BEATS = ['s21:bureau', 's22:month', 's22:eighty', 's22:stores', 's22:rental', 's22:doctors', 's23:giant', 's23:cpi', 's24:thousand', 's24:thirty', 's24:point', 's25:weighted', 's26:housing', 's26:thirty', 's27:rents', 's27:gum', 's27:nobody', 's28:core', 's28:food', 's28:energy', 's29:headline', 's29:core', 's30:gap', 's31:pce', 's32:catch', 's33:rent', 's33:drive', 's33:own', 's34:fifteen', 's34:six', 's34:two', 's34:total', 's35:five', 's35:seventy', 's36:eighteen', 's37:four', 's38:add', 's38:eighty', 's39:personal', 's39:rent']
export const DD_MEASURE = makePiece('dd-measure', 'Measuring inflation in paper-cut: a BUREAU OF LABOR STATISTICS building and a clerk with a clipboard, 80,000 ITEMS A MONTH from a store, a rental home and a doctor\'s office, all dropping into one giant basket CONSUMER PRICE INDEX (CPI); $1,000 LAST YEAR vs $1,037 TODAY = INFLATION 3.7%; a paper pie where SHELTER is 36% (THE BIGGEST PIECE), a thermometer jumps when RENTS JUMP but barely moves for GUM x2; CORE = WITHOUT FOOD + ENERGY, thermometers HEADLINE 3.7% vs CORE 2.6% (THE GAP = FOOD + ENERGY PUSHING; THE FED\'S TARGET USES PCE); your own inflation: RENT IN A HOT CITY, DRIVE A LOT; paper jars RENT $1,500 +$75, FOOD $600 +$18, GAS $200 −$4, $89 ÷ $2,300, YOU: 3.9%, RENT DRIVES YOUR NUMBER', {
  mood: 'light', Component: Measure, beats: [...BEATS, ...ACC],
  sfx: [['s22:eighty', 'pop', 0.1], ['s23:giant', 'whoosh', 0.1], ['s24:point', 'ding', 0.1], ['s26:thirty', 'pop', 0.1], ['s27:rents', 'riser', 0.08], ['s27:gum', 'softpop', 0.08], ['s28:food', 'swish', 0.08], ['s28:energy', 'swish', 0.08], ['s29:headline', 'tick', 0.08], ['s34:fifteen', 'pop', 0.08], ['s34:six', 'pop', 0.08], ['s34:two', 'pop', 0.08], ['s35:seventy', 'coin', 0.08], ['s36:eighteen', 'coin', 0.08], ['s37:four', 'coin', 0.08], ['s39:personal', 'ding', 0.12]] })
