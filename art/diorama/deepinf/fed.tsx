// ---------------------------------------------------------------- s92–s104: how central banks fight it
// A) The lever room: a big paper lever labelled INTEREST RATE (s92); two scale pans STABLE PRICES / JOBS (s93); the lever goes up and loan tags fly up in price:
//    MORTGAGES, CAR LOANS, CREDIT CARDS, BUSINESS LOANS (s94); fewer shoppers, a savings jar fills (s95); the bread pile of money shrinks back (s96);
//    a slow paper clock: MONTHS, A YEAR OR MORE (s97); an anchor on the thermometer: EXPECTATIONS (s98).
// B) Two fights: 1981 rate lever at 19% (s99), thermometer 15% → under 3% by mid-1983 (s100), a dark cloud RECESSION (s101);
//    2021 ~0% → 5.3% Aug 2023 (s102) → 3.9% Oct 2026 (s103); a see-saw TOO LITTLE / TOO MUCH (s104).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, win } from '../aimoney/common'
import { camera } from '../aimoney/common'
import { Back, C, Cash, Cut, Defs, Dollar, Grain, Tag, Thermo, big, box, fadeIn, scene } from './kit'

const G = 900
const Lever: React.FC<{ x: number; y: number; t: number; v?: string; o?: number }> = ({ x, y, t, v, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <Cut d={box(-120, -40, 240, 80, 16)} fill={C.ink} />
    <g transform={`rotate(${lerp(50, -50, t)})`}><rect x={-14} y={-300} width={28} height={300} rx={12} fill={C.grey} /><circle cy={-310} r={46} fill={C.coral} filter="url(#dd-shadow)" /></g>
    {v && <text y={110} textAnchor="middle" fill={C.ink} style={big(64)}>{v}</text>}
  </g>
)
const Fed: React.FC<PieceProps> = ({ f, c }) => {
  const hot = c('s92:hot'), tool = c('s92:tool'), interest = c('s92:interest'), jobs = c('s93:jobs'), stable = c('s93:stable'), employed = c('s93:employed'), opposite = c('s93:opposite')
  const raises = c('s94:raises'), mortgages = c('s94:mortgages'), car = c('s94:car'), credit = c('s94:credit'), business = c('s94:business')
  const borrow = c('s95:borrow'), saving = c('s95:saving'), cool = c('s96:cool'), reverse = c('s96:reverse'), slow = c('s97:slow'), months = c('s97:months'), year = c('s97:year')
  const expectations = c('s98:expectations'), serious = c('s98:serious'), fuel = c('s98:fuel')
  const famous = c('s99:famous'), volcker = c('s99:volcker'), nineteen = c('s99:nineteen'), fifteen = c('s100:fifteen'), y1983 = c('s100:1983'), three = c('s100:three'), recession = c('s101:recession'), lost = c('s101:lost')
  const latest = c('s102:latest'), zero = c('s102:zero'), five = c('s102:five'), august = c('s102:august'), october = c('s103:october'), threeNine = c('s103:three')
  const balancing = c('s104:balancing'), little = c('s104:little'), much = c('s104:much'), crush = c('s104:crush')
  const AB = c('s99') - 6
  const A = scene(f, -20, AB), B = fadeIn(f, AB)
  const lv = f < raises ? 0.2 : lerp(0.2, 0.9, on(f, raises, 16))
  const a1 = 1 - on(f, slow - 6, 8)
  const rate = f < latest ? lerp(0, 19.1, on(f, nineteen - 6, 20)) : f < five ? lerp(19.1, 0.08, on(f, latest, 12)) : f < threeNine ? lerp(0.08, 5.33, on(f, five - 4, 20)) : lerp(5.33, 3.88, on(f, threeNine - 4, 16))
  return (
    <g transform={camera(f, ACC.map((k, i) => [c(k), 960, 540, i % 2 ? 1 : 1.025] as [number, number, number, number]), 26)}>
      <Defs />
      {A > 0 && <g opacity={A}>
        <Back sky="mint" f={f} sun={null} />
        {a1 > 0.01 && <g opacity={a1}>
          <Lever x={420} y={G - 20} t={lv} o={on(f, tool - 6, 8)} />
          <Tag x={420} y={G + 90} text="INTEREST RATE" size={44} color={C.mustard} o={on(f, interest - 2, 8)} />
          <g opacity={win(f, jobs - 4, raises - 4, 8)}>
            <line x1={960} y1={330} x2={1560} y2={330} stroke={C.ink} strokeWidth={10} transform={`rotate(${4 * Math.sin((f - jobs) / 10)} 1260 330)`} /><path d="M1230 330 L1260 280 L1290 330 Z" fill={C.ink} />
            <Tag x={1000} y={460} text="STABLE PRICES" size={40} color={C.teal} ink="#fff" o={on(f, stable - 2, 8)} />
            <Tag x={1520} y={460} text="MAX JOBS" size={40} color={C.coral} ink="#fff" o={on(f, employed - 2, 8)} />
            <Tag x={1260} y={640} text="CAN PULL OPPOSITE WAYS" size={40} o={on(f, opposite - 2, 8)} />
          </g>
          {([[mortgages, 'MORTGAGES'], [car, 'CAR LOANS'], [credit, 'CREDIT CARDS'], [business, 'BUSINESS LOANS']] as [number, string][]).map(([a, t], k) => <g key={k} opacity={pop(f, a - 2, 10) * (1 - on(f, borrow - 6, 8))} transform={`translate(${900 + (k % 2) * 480} ${lerp(460, 380, on(f, a, 16)) + Math.floor(k / 2) * 200})`}><Tag x={0} y={0} text={`${t} ↑`} size={44} color={C.coral} ink="#fff" /></g>)}
          <g opacity={on(f, borrow - 6, 8)}>
            <Tag x={1160} y={380} text="BORROW LESS, SPEND LESS" size={44} color={C.mustard} o={1 - on(f, cool - 6, 8)} />
            <g opacity={on(f, saving - 4, 8) * (1 - on(f, cool - 6, 8))}><Cut d={box(1060, 520, 200, 260, 40)} fill={C.sky} /><Cash x={1160} y={760} n={lerp(1, 7, on(f, saving, 30))} s={0.8} /><Tag x={1160} y={860} text="SAVING PAYS MORE" size={36} /></g>
            <g opacity={on(f, cool - 6, 8)}><Cash x={1260} y={G - 20} n={lerp(12, 6, on(f, cool, 24))} s={1.2} /><Tag x={1260} y={420} text="PRICES COOL" size={56} color={C.teal} ink="#fff" /><Tag x={1260} y={540} text="THE BREAD MARKET IN REVERSE" size={36} o={on(f, reverse - 2, 8)} /></g>
          </g>
        </g>}
        <g opacity={on(f, slow - 6, 8)}>
          <g transform="translate(560 540)"><circle r={200} fill={C.cream} filter="url(#dd-shadow)" /><line x1={0} y1={0} x2={0} y2={-150} stroke={C.ink} strokeWidth={10} transform={`rotate(${(f - slow) * 0.6})`} /><circle r={16} fill={C.ink} /></g>
          <Tag x={560} y={830} text={f >= year ? 'MONTHS, A YEAR OR MORE' : 'IT\'S SLOW'} size={44} color={C.mustard} o={on(f, months - 6, 8)} />
          <Thermo x={1360} y={800} v={lerp(8, 4, on(f, serious, 30))} max={10} label="" o={on(f, expectations - 6, 8)} />
          <g opacity={on(f, expectations, 8)} transform="translate(1480 640)"><circle cy={-120} r={22} fill="none" stroke={C.ink} strokeWidth={10} /><line x1={0} y1={-100} x2={0} y2={40} stroke={C.ink} strokeWidth={12} /><path d="M-70 0 Q0 90 70 0" fill="none" stroke={C.ink} strokeWidth={12} /></g>
          <Tag x={1360} y={300} text="BELIEVED = EXPECTATIONS ANCHORED" size={40} color={C.teal} ink="#fff" o={on(f, serious - 2, 8)} />
          <Tag x={1360} y={420} text="THE SPIRAL LOSES ITS FUEL" size={40} o={on(f, fuel - 2, 8)} />
        </g>
      </g>}
      {B > 0 && <g opacity={B}>
        <Back sky={f >= latest ? 'day' : 'sepia'} f={f} />
        <Lever x={420} y={G - 20} t={rate / 20} v={`${rate.toFixed(rate < 1 ? 2 : 1)}%`} />
        <Tag x={1500} y={300} text="1981" size={70} color={C.cream} o={pop(f, c('s99:1981') - 2, 10) * (1 - on(f, fifteen - 4, 8))} />
        <Tag x={420} y={300} text={f >= october ? 'OCT 2026' : f >= august ? 'AUG 2023' : f >= latest ? 'END OF 2021' : '1981: PAUL VOLCKER'} size={44} color={C.mustard} o={on(f, famous - 4, 8) * (1 - on(f, balancing - 6, 8))} />
        <g opacity={1 - on(f, latest - 6, 8)}>
          <Thermo x={1060} y={800} v={f < y1983 ? 14.8 : lerp(14.8, 2.6, on(f, y1983, 24))} max={16} label={f >= three ? 'MID-1983: UNDER 3%' : '1980: NEARLY 15%'} o={on(f, fifteen - 6, 8)} />
          <g opacity={on(f, recession - 4, 8)}><Cut d="M1380 360 q 60 -90 150 -40 q 70 -60 150 10 q 70 10 60 80 H1380 Z" fill="#59647E" /><Tag x={1560} y={560} text="DEEP RECESSION" size={44} color={C.ink} ink={C.cream} /><Tag x={1560} y={680} text="LOST JOBS" size={40} color={C.coral} ink="#fff" o={on(f, lost - 2, 8)} /></g>
        </g>
        <g opacity={on(f, latest - 6, 8) * (1 - on(f, balancing - 6, 8))}>
          {[[zero, '~0%', 'END 2021'], [five, '5.3%', 'AUG 2023'], [threeNine, '3.9%', 'OCT 2026']].map(([a, v, t], k) => <g key={k} opacity={pop(f, (a as number) - 2, 10)} transform={`translate(${940 + k * 330} ${560 - [0, 160, 90][k]})`}><Tag x={0} y={0} text={v as string} size={60} color={[C.teal, C.coral, C.mustard][k]} ink={k === 1 ? '#fff' : C.ink} /><text y={80} textAnchor="middle" fill={C.ink} style={big(36)}>{t}</text></g>)}
        </g>
        <g opacity={on(f, balancing - 6, 8)}>
          <rect width={1920} height={1080} fill={C.paper} opacity={0.97} />
          {(() => { const tilt = f < much ? -10 * on(f, little, 12) : lerp(-10, 10, on(f, much, 14)); return <g transform={`translate(960 760) rotate(${tilt})`}><rect x={-600} y={-20} width={1200} height={30} rx={12} fill={C.brownD} /><g transform="translate(-480 -20)"><Thermo x={0} y={-10} v={9} max={10} s={0.5} label="" /></g><g transform="translate(480 -20)"><Cut d={box(-90, -140, 180, 140, 16)} fill={C.teal} /><text y={-50} textAnchor="middle" fill="#fff" style={big(44)}>JOBS</text></g></g> })()}
          <path d="M910 820 L960 760 L1010 820 Z" fill={C.ink} />
          <Tag x={480} y={400} text="TOO LITTLE: INFLATION STICKS" size={40} color={C.coral} ink="#fff" o={on(f, little - 2, 8)} />
          <Tag x={1440} y={400} text="TOO MUCH: JOBS CRUSHED" size={40} color={C.teal} ink="#fff" o={on(f, crush - 4, 8)} />
        </g>
      </g>}
      <Headline f={f} lines={[[hot, 'HOW THE FED FIGHTS IT', C.ink, 104], [famous, 'THE FAMOUS FIGHTS', C.ink, 104], [balancing, 'A BALANCING ACT', C.ink, 108]]} />
      <Grain />
    </g>
  )
}
const ACC = ["s92:when","s92:actually","s93:us","s93:possible","s93:inflation","s93:those","s94:more","s95:people","s95:spend","s95:more","s96:spending","s96:same","s96:our","s97:rise","s97:bite","s98:if","s98:expecting","s98:rises","s98:spiral","s99:1980s","s100:inflation","s100:1980","s102:rate","s102:2021","s103:back","s103:percent","s104:sticks"]  // # accent words: a gentle camera push on each (fills >2 s gaps)
const BEATS = ['s99:1981', 's92:hot', 's92:tool', 's92:interest', 's93:jobs', 's93:stable', 's93:employed', 's93:opposite', 's94:raises', 's94:mortgages', 's94:car', 's94:credit', 's94:business', 's95:borrow', 's95:saving', 's96:cool', 's96:reverse', 's97:slow', 's97:months', 's97:year', 's98:expectations', 's98:serious', 's98:fuel', 's99:famous', 's99:volcker', 's99:nineteen', 's100:fifteen', 's100:1983', 's100:three', 's101:recession', 's101:lost', 's102:latest', 's102:zero', 's102:five', 's102:august', 's103:october', 's103:three', 's104:balancing', 's104:little', 's104:much', 's104:crush']
export const DD_FED = makePiece('dd-fed', 'How central banks fight inflation, paper-cut lever room: a big INTEREST RATE lever, a balance STABLE PRICES vs MAX JOBS (CAN PULL OPPOSITE WAYS), loan tags rise MORTGAGES ↑, CAR LOANS ↑, CREDIT CARDS ↑, BUSINESS LOANS ↑, BORROW LESS, SPEND LESS, a savings jar fills (SAVING PAYS MORE), a cash pile shrinks (PRICES COOL, THE BREAD MARKET IN REVERSE); a slow clock MONTHS, A YEAR OR MORE; an anchor on the thermometer (BELIEVED = EXPECTATIONS ANCHORED, THE SPIRAL LOSES ITS FUEL); sepia 1981: PAUL VOLCKER lever at 19.1%, thermometer 1980: NEARLY 15% → MID-1983: UNDER 3%, a cloud DEEP RECESSION, LOST JOBS; then ~0% END 2021, 5.3% AUG 2023, 3.9% OCT 2026; a see-saw TOO LITTLE: INFLATION STICKS / TOO MUCH: JOBS CRUSHED', {
  mood: 'light', Component: Fed, beats: [...BEATS, ...ACC],
  sfx: [['s92:interest', 'click', 0.1], ['s94:raises', 'riser', 0.08], ['s94:mortgages', 'pop', 0.07], ['s94:car', 'pop', 0.07], ['s94:credit', 'pop', 0.07], ['s94:business', 'pop', 0.07], ['s96:cool', 'chime', 0.1], ['s99:nineteen', 'impact', 0.12], ['s100:three', 'ding', 0.1], ['s101:recession', 'thud', 0.1], ['s102:five', 'pop', 0.08], ['s103:three', 'pop', 0.08], ['s104:much', 'swish', 0.08]] })
