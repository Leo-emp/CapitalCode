// ---------------------------------------------------------------- s105–s132: who wins and who loses, what it means for you, the whole picture
// A) A park see-saw of winners and losers (s105). Cash savers: a savings jar labelled 0.4% next to a 3% thermometer: REAL RETURN BELOW ZERO, −2.5% A YEAR (s106–s108);
//    your $10,000 bundles melting (s109). Borrowers: a fixed loan stone; repaid with smaller dollars (s110); lenders charge more (s111);
//    a $2,000 mortgage payment tag that FEELS LIKE $1,490 after 10 years (s112–s113).
// B) Workers: pay vs prices bars 2022 (+5.4% vs +9%) and 2020–2026 (+33% vs +31%) (s115–s116); owners of homes and businesses (s117); governments' debt shrinks (s118).
// C) Your kitchen table: four paper cards 1 KNOW YOUR INFLATION, 2 CASH MELTS, 3 CHECK YOUR DEBTS, 4 JUDGE EVERY RAISE (3% RAISE − 4% INFLATION = PAY CUT) (s119–s124).
// D) The whole picture: a row of paper icons recapping each idea (s125–s131); the basket tag ticks up one last time (s132; no logo while the voice speaks).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { camera } from '../aimoney/common'
import { Back, Barrel, Basket, C, Cash, Cut, Defs, Dollar, Grain, House, Loaf, Tag, Thermo, big, box, fadeIn, scene } from './kit'

const G = 900
const Who: React.FC<PieceProps> = ({ f, c }) => {
  const lose = c('s105:lose'), win1 = c('s105:win'), savers = c('s106:savers'), zero = c('s106:zero'), nominal = c('s107:nominal'), below = c('s107:below'), half = c('s108:half'), melting = c('s109:melting')
  const borrowers = c('s110:borrowers'), worth = c('s110:worth'), lenders = c('s111:lenders'), higher = c('s111:higher'), thirty = c('s112:thirty'), same = c('s112:same')
  const two = c('s113:two'), ten = c('s113:ten'), fourteen = c('s113:fourteen'), workers = c('s114:workers'), june = c('s115:june'), five = c('s115:five'), nine = c('s115:nine'), backwards = c('s115:backwards')
  const longer = c('s116:longer'), thirtyThree = c('s116:thirty'), thirtyOne = c('s116:thirty#2'), caught = c('s116:caught'), own = c('s117:own'), homes = c('s117:homes'), governments = c('s118:governments'), owe = c('s118:owe')
  const actually = c('s119:actually'), k1 = c('s120:one'), k2 = c('s121:two'), k3 = c('s122:three'), k4 = c('s123:four'), cut = c('s123:cut'), panicking = c('s124:panicking'), real = c('s124:real')
  const works = c('s125:works'), greedy = c('s126:greedy'), basket = c('s127:basket'), caused = c('s128:caused'), purpose = c('s129:purpose'), wealth = c('s130:wealth'), news = c('s131:news'), speed = c('s131:speed'), next = c('s132:next'), why = c('s132:why')
  const AB = c('s114') - 6, BC = c('s119') - 6, CD = c('s125') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = fadeIn(f, CD)
  const a1 = 1 - on(f, borrowers - 6, 8)
  return (
    <g transform={camera(f, ACC.map((k, i) => [c(k), 960, 540, i % 2 ? 1 : 1.025] as [number, number, number, number]), 26)}>
      <Defs />
      {A > 0 && <g opacity={A}>
        <Back sky="day" f={f} />
        {a1 > 0.01 && <g opacity={a1}>
          <Tag x={560} y={300} text="SOME LOSE" size={50} color={C.coral} ink="#fff" o={on(f, lose - 2, 8) * (1 - on(f, savers - 4, 8))} />
          <Tag x={1360} y={300} text="SOME QUIETLY WIN" size={50} color={C.teal} ink="#fff" o={on(f, win1 - 2, 8) * (1 - on(f, savers - 4, 8))} />
          <g opacity={on(f, savers - 6, 8)}>
            <Cut d={box(360, 440, 320, 420, 60)} fill={C.sky} /><Cash x={520} y={820} n={lerp(10, 7, on(f, melting - 4, 30))} s={1} />
            <Tag x={520} y={380} text="SAVINGS: 0.4%" size={48} color={C.mustard} o={on(f, zero - 2, 8)} />
            <Thermo x={1060} y={800} v={3} max={8} label="PRICES: 3%" o={on(f, half - 10, 8)} />
            <Tag x={1500} y={420} text="WHAT THE BANK SAYS: 0.4%" size={36} o={on(f, nominal - 2, 8)} />
            <Tag x={1500} y={540} text="REAL RETURN: BELOW ZERO" size={40} color={C.coral} ink="#fff" o={on(f, below - 2, 8)} />
            <Tag x={1500} y={660} text="−2.5% BUYING POWER A YEAR" size={40} color={C.coral} ink="#fff" o={on(f, half - 2, 8)} />
            <Tag x={520} y={940} text="YOUR $10,000, MELTING" size={40} color={C.coral} ink="#fff" o={on(f, melting - 2, 8)} />
          </g>
        </g>}
        <g opacity={on(f, borrowers - 6, 8)}>
          <g opacity={1 - on(f, thirty - 6, 8)}>
            <Cut d={box(300, 560, 380, 280, 30)} fill={C.grey} /><text x={490} y={720} textAnchor="middle" fill={C.ink} style={big(56)}>FIXED LOAN</text>
            <Dollar x={1100} y={640} s={1.3} power={lerp(1, 0.7, on(f, worth - 2, 20))} />
            <Tag x={1100} y={440} text="REPAID IN SMALLER DOLLARS" size={40} color={C.teal} ink="#fff" o={on(f, worth - 2, 8)} />
            <Tag x={1500} y={760} text="LENDERS LOSE" size={44} color={C.coral} ink="#fff" o={on(f, lenders - 2, 8)} />
            <Tag x={1500} y={880} text="SO THEY CHARGE MORE INTEREST" size={36} o={on(f, higher - 2, 8)} />
          </g>
          <g opacity={on(f, thirty - 6, 8)}>
            <House x={520} y={G} s={2} col={C.pink} />
            <Tag x={520} y={300} text="30-YEAR FIXED MORTGAGE" size={44} color={C.mustard} />
            <Tag x={1260} y={460} text="$2,000 A MONTH" size={64} color={C.cream} o={on(f, two - 2, 8)} />
            <Tag x={1260} y={600} text="AFTER 10 YEARS OF 3%" size={40} o={on(f, ten - 2, 8)} />
            <Tag x={1260} y={740} text="FEELS LIKE ~$1,490" size={64} color={C.teal} ink="#fff" o={pop(f, fourteen - 2, 12)} />
          </g>
        </g>
      </g>}
      {B > 0 && <g opacity={B}>
        <Back sky="warm" f={f} sun={[1680, 220]} />
        <g opacity={1 - on(f, own - 6, 8)}>
          <Tag x={960} y={290} text="DOES PAY KEEP UP?" size={50} o={on(f, workers - 2, 8)} />
          {([[june, 'YEAR TO JUNE 2022', five, 5.4, nine, 9.1, backwards, 'REAL PAY WENT BACKWARDS'], [longer, 'JAN 2020 → SEP 2026', thirtyThree, 33, thirtyOne, 31, caught, 'ONLY JUST CAUGHT UP']] as [number, string, number, number, number, number, number, string][]).map(([a, t, pa, pv, qa, qv, ra, rt], k) => {
            const x = 560 + k * 800, sc = k ? 9 : 40
            return <g key={k} opacity={on(f, a - 4, 8)}>
              <text x={x} y={G + 60} textAnchor="middle" fill={C.ink} opacity={k ? on(f, c('s116:2020') - 2, 8) : 1} style={big(40)}>{t}</text>{k === 1 && <circle cx={x + 230} cy={G + 46} r={14} fill={C.coral} opacity={on(f, c('s116:2026') - 2, 8)} />}
              <Cut d={box(x - 170, G - pv * sc * on(f, pa - 2, 16), 140, Math.max(1, pv * sc * on(f, pa - 2, 16)), 8)} fill={C.teal} />
              <text x={x - 100} y={G - pv * sc - 20} textAnchor="middle" fill={C.tealD} opacity={on(f, pa, 8)} style={big(44)}>PAY +{pv}%</text>
              <Cut d={box(x + 30, G - qv * sc * on(f, qa - 2, 16), 140, Math.max(1, qv * sc * on(f, qa - 2, 16)), 8)} fill={C.coral} />
              <text x={x + 100} y={G - qv * sc - 20} textAnchor="middle" fill={C.coralD} opacity={on(f, qa, 8)} style={big(44)}>PRICES +{qv}%</text>
              <Tag x={x} y={380} text={rt} size={36} color={k ? C.mustard : C.coral} ink={k ? C.ink : '#fff'} o={on(f, ra - 2, 8)} />
            </g> })}
        </g>
        <g opacity={on(f, own - 6, 8)}>
          <House x={480} y={G} s={1.6} o={pop(f, homes - 2, 10)} col={C.mustard} />
          <g opacity={pop(f, homes + 6, 10)}><Cut d={box(700, 600, 300, 300, 8)} fill={C.teal} /><text x={850} y={770} textAnchor="middle" fill="#fff" style={big(44)}>BUSINESS</text></g>
          <Tag x={740} y={360} text="OWNERS OFTEN HOLD UP BETTER THAN CASH" size={40} color={C.teal} ink="#fff" o={on(f, own, 8)} />
          <g opacity={on(f, governments - 4, 8)}><Cut d={box(1300, 520, 360, 380, 6)} fill={C.cream} /><path d="M1280 520 L1480 420 L1680 520 Z" fill={C.paperD} /><Tag x={1480} y={340} text="GOVERNMENT DEBT" size={40} /><Tag x={1480} y={960} text="SHRINKS IN REAL TERMS" size={36} color={C.mustard} o={on(f, owe - 2, 8)} /></g>
        </g>
      </g>}
      {Cc > 0 && <g opacity={Cc}>
        <Back sky="warm" f={f} sun={null} street={false} />
        <Cut d={box(120, 620, 1680, 60, 10)} fill={C.brown} />
        {([[k1, '1', 'KNOW YOUR OWN INFLATION'], [k2, '2', 'CASH SITTING STILL MELTS'], [k3, '3', 'FIXED DEBT GETS LIGHTER'], [k4, '4', 'JUDGE EVERY RAISE']] as [number, string, string][]).map(([a, n, t], k) => <g key={k} opacity={pop(f, a - 2, 10)} transform={`translate(${330 + k * 420} 440) rotate(${[-3, 2, -2, 3][k]})`}>
          <Cut d={box(-180, -190, 360, 380, 18)} fill={C.cream} /><circle cy={-100} r={50} fill={[C.coral, C.teal, C.mustard, C.pink][k]} /><text y={-80} textAnchor="middle" fill={C.ink} style={big(64)}>{n}</text>
          {[t.split(' ').slice(0, Math.ceil(t.split(' ').length / 2)).join(' '), t.split(' ').slice(Math.ceil(t.split(' ').length / 2)).join(' ')].map((ln, j) => <text key={j} y={40 + j * 52} textAnchor="middle" fill={C.ink} style={big(46)}>{ln}</text>)}</g>)}
        <Tag x={960} y={860} text="3% RAISE − 4% INFLATION = A PAY CUT" size={50} color={C.coral} ink="#fff" o={on(f, cut - 4, 8) * (1 - on(f, panicking - 4, 8))} />
        <Tag x={960} y={860} text="SEE THE REAL NUMBER" size={56} color={C.mustard} o={on(f, real - 4, 8)} />
      </g>}
      {D > 0 && <g opacity={D}>
        <Back sky="dusk" f={f} sun={[1560, 560]} />
        {([[greedy, 'money', 'BUYING POWER FALLS'], [basket, 'basket', '80,000 PRICES'], [caused, 'causes', 'MONEY · COSTS · EXPECTATIONS'], [purpose, 'thermo', '2% ON PURPOSE'], [wealth, 'seesaw', 'WEALTH MOVES']] as [number, string, string][]).map(([a, k, t], i) => <g key={i} opacity={pop(f, a - 2, 10) * (1 - on(f, next - 6, 8))} transform={`translate(${250 + i * 355} 560)`}>
          <circle r={130} fill={C.cream} filter="url(#dd-shadow)" />
          {k === 'money' && <Dollar x={0} y={0} s={0.6} power={0.7} />}
          {k === 'basket' && <Basket x={0} y={60} s={0.6} />}
          {k === 'causes' && <g><Loaf x={-50} y={10} s={0.7} /><Barrel x={50} y={60} s={0.45} /></g>}
          {k === 'thermo' && <Thermo x={0} y={40} v={2} max={8} s={0.3} label="" />}
          {k === 'seesaw' && <g><rect x={-90} y={-6} width={180} height={12} fill={C.brownD} transform="rotate(-12)" /><path d="M-16 40 L0 6 L16 40 Z" fill={C.ink} /></g>}
          <Tag x={0} y={i % 2 ? 250 : 190} text={t} size={28} /></g>)}
        <Tag x={960} y={300} text="AN AVERAGE BASKET · A SPEED, NOT A LEVEL" size={44} color={C.mustard} o={on(f, speed - 4, 8) * (1 - on(f, next - 6, 8))} />
        <g opacity={on(f, next - 6, 8)}><Basket x={960} y={G - 20} s={2} tag={f >= c('s132:cost') ? 'NEXT YEAR: MORE' : '$120'} tagCol={f >= c('s132:cost') ? C.coral : C.cream} /></g>
      </g>}
      <Headline f={f} lines={[[lose, 'WHO WINS, WHO LOSES', C.ink, 104], [workers, 'WORKERS', C.ink, 108], [actually, 'WHAT IT MEANS FOR YOU', C.ink, 104], [works, 'HOW INFLATION WORKS', C.cream, 104], [c('s132:now'), 'NOW YOU KNOW WHY', C.cream, 108]]} />
      <Grain />
    </g>
  )
}
const ACC = ["s105:inflation","s105:hit","s105:way","s106:average","s106:2026","s107:real","s107:point","s107:bank","s107:inflation","s108:say","s108:percent","s108:account","s108:every","s109:that's","s109:single","s110:win","s110:pay","s110:borrowed","s111:reason","s111:more","s111:want","s111:dollars","s112:payment","s112:hopefully","s112:pay","s113:say","s113:month","s113:inflation","s113:same","s113:today's","s114:depending","s114:pay","s114:up","s115:average","s115:prices","s116:prices","s116:average","s117:rise","s117:often","s117:better","s117:cash","s118:some","s118:because","s118:real","s120:inflation","s120:look","s120:like","s120:food","s120:watch","s121:still","s121:melting","s121:keep","s121:safety","s121:rest","s121:value","s122:debts","s122:fixed","s122:inflation","s122:variable","s122:get","s122:rise","s123:raise","s123:buys","s123:three","s123:inflation","s124:none","s124:tag","s124:every#3","s125:that's","s126:isn't","s126:money","s126:buying","s127:measured","s127:thousand","s127:weighted","s127:buy","s128:goods","s128:costs","s128:expectations","s128:themselves","s129:wreck","s129:central","s129:fight","s129:rates","s130:every","s130:borrowers","s130:people","s130:behind","s130:own","s131:next","s131:average","s131:level","s131:interest","s132:hundred"]  // # accent words: a gentle camera push on each (fills >2 s gaps)
const BEATS = ['s116:2020', 's116:2026', 's105:lose', 's105:win', 's106:savers', 's106:zero', 's107:nominal', 's107:below', 's108:half', 's109:melting', 's110:borrowers', 's110:worth', 's111:lenders', 's111:higher', 's112:thirty', 's112:same', 's113:two', 's113:ten', 's113:fourteen', 's114:workers', 's115:june', 's115:five', 's115:nine', 's115:backwards', 's116:longer', 's116:thirty', 's116:thirty#2', 's116:caught', 's117:own', 's117:homes', 's118:governments', 's118:owe', 's119:actually', 's120:one', 's121:two', 's122:three', 's123:four', 's123:cut', 's124:panicking', 's124:real', 's125:works', 's126:greedy', 's127:basket', 's128:caused', 's129:purpose', 's130:wealth', 's131:news', 's131:speed', 's132:next', 's132:cost', 's132:now', 's132:why']
export const DD_WHO = makePiece('dd-who', 'Winners and losers, your moves and the recap, paper-cut: SOME LOSE / SOME QUIETLY WIN; a savings jar SAVINGS: 0.4% beside a thermometer PRICES: 3% (WHAT THE BANK SAYS: 0.4%, REAL RETURN: BELOW ZERO, −2.5% BUYING POWER A YEAR, YOUR $10,000, MELTING); a FIXED LOAN stone and a shrinking dollar REPAID IN SMALLER DOLLARS, LENDERS LOSE, SO THEY CHARGE MORE INTEREST; a house 30-YEAR FIXED MORTGAGE, $2,000 A MONTH, AFTER 10 YEARS OF 3%, FEELS LIKE ~$1,490; pay vs prices bars YEAR TO JUNE 2022 PAY +5.4% / PRICES +9.1% (REAL PAY WENT BACKWARDS) and JAN 2020 → SEP 2026 PAY +33% / PRICES +31% (ONLY JUST CAUGHT UP); a house and a business (OWNERS OFTEN HOLD UP BETTER THAN CASH), GOVERNMENT DEBT SHRINKS IN REAL TERMS; four kitchen-table cards KNOW YOUR OWN INFLATION, CASH SITTING STILL MELTS, FIXED DEBT GETS LIGHTER, JUDGE EVERY RAISE (3% RAISE − 4% INFLATION = A PAY CUT, SEE THE REAL NUMBER); recap discs BUYING POWER FALLS, 80,000 PRICES, MONEY · COSTS · EXPECTATIONS, 2% ON PURPOSE, WEALTH MOVES; your basket NEXT YEAR: MORE — NOW YOU KNOW WHY', {
  mood: 'light', Component: Who, beats: [...BEATS, ...ACC],
  sfx: [['s106:zero', 'pop', 0.08], ['s107:below', 'thud', 0.08], ['s109:melting', 'swish', 0.1], ['s110:worth', 'softpop', 0.08], ['s113:fourteen', 'ding', 0.1], ['s115:backwards', 'thump', 0.08], ['s116:caught', 'ding', 0.08], ['s120:one', 'pop', 0.08], ['s121:two', 'pop', 0.08], ['s122:three', 'pop', 0.08], ['s123:four', 'pop', 0.08], ['s126:greedy', 'pop', 0.07], ['s127:basket', 'pop', 0.07], ['s128:caused', 'pop', 0.07], ['s129:purpose', 'pop', 0.07], ['s130:wealth', 'pop', 0.07], ['s132:why', 'riser', 0.1]] })
