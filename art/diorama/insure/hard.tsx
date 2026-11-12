// ---------------------------------------------------------------- s67–s74: then you pay more
// A) After the storm, a rainbow. You raise prices (s67): the bill tag goes $1,500 → $1,650, +10% (s68); coins pour into your reservoir: $16.5 MILLION,
//    and a tick: BACK IN PROFIT (s69).
// B) The whole country: two harbour reservoirs, $851 BILLION (2023) and a bigger $926 BILLION (2024) (s70); PRICES RAISED TO MATCH THE RISK (s71).
// C) The tide of the market: a harbour tide gauge; HARD MARKET high tide, prices up, fewer umbrellas on the rack (s72);
//    rival boats sail in, the tide drops (SOFT), a circling arrow: THE CYCLE (s73).
// D) Your bill grows although you never crashed; storm clouds over other towns, a repair spanner with a rising price tag (s74).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person } from '../aimoney/common'
import { camera } from '../aimoney/common'
import { Bill, C, Cloud, Coin, Defs, Flag, Grain, Hail, House, Land, Lighthouse, Reservoir, SkyBg, Tick, Umbrella, Rainbow, big, fadeIn, scene } from './kit'

const G = 920
const Boat: React.FC<{ x: number; y: number; s?: number; col?: string; o?: number }> = ({ x, y, s = 1, col = C.red, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-80 0 L80 0 L60 34 L-60 34 Z" fill={col} stroke={C.ink} strokeWidth={4} /><line x1={0} y1={0} x2={0} y2={-130} stroke={C.ink} strokeWidth={5} />
    <path d="M4 -126 L70 -20 L4 -20 Z" fill={C.cream} stroke={C.ink} strokeWidth={3} />
  </g>
)
const Hard: React.FC<PieceProps> = ({ f, c }) => {
  const after = c('s67:after'), raise = c('s67:raise'), prices = c('s67:prices'), sixteen = c('s68:sixteen'), instead = c('s68:instead'), ten = c('s68:ten')
  const collect = c('s69:collect'), sixteen2 = c('s69:sixteen'), profit = c('s69:profit')
  const country = c('s70:country'), wrote = c('s70:wrote'), eight = c('s70:eight'), premiums = c('s70:premiums'), nine = c('s70:nine')
  const verisk = c('s71:verisk'), turnaround = c('s71:turnaround'), increases = c('s71:increases'), risk = c('s71:risk')
  const hard = c('s72:hard'), rise = c('s72:rise'), harder = c('s72:harder'), profits = c('s73:profits'), rivals = c('s73:rivals'), soften = c('s73:soften'), cycle = c('s73:cycle'), again = c('s73:again')
  const bill = c('s74:bill'), jumps = c('s74:jumps'), noCrash = c('s74:crash'), storms = c('s74:storms'), repairs = c('s74:repairs'), more = c('s74:more')
  const AB = c('s70') - 6, BC = c('s72') - 6, CD = c('s74') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = fadeIn(f, CD)
  const tide = f < soften ? lerp(0.35, 0.85, on(f, rise - 4, 30)) : lerp(0.85, 0.3, on(f, soften, 30))
  return (
    <g transform={camera(f, ACC.map((k, i) => [c(k), 960, 540, i % 2 ? 1 : 1.035] as [number, number, number, number]), 18)}>
      <Defs />
      {A > 0 && <g opacity={A}>
        <SkyBg sky="after" f={f} sun={[1700, 260]} />
        <Rainbow cx={960} cy={G - 100} r={760} t={on(f, after, 50)} />
        <Land f={f} G={G} />
        <Lighthouse x={1820} y={G - 70} s={0.8} f={f} />
        <Person f={f} who="owner" beats={[[0, 'idle', 'worried'], [raise, 'point', 'thinking'], [collect, 'present', 'smiling'], [profit, 'thumbsUp', 'smiling']]} x={300} y={G + 20} s={0.85} />
        <g transform={`translate(720 480) scale(${1 + 0.12 * pop(f, sixteen - 2, 12) - 0.12 * on(f, sixteen + 10, 8)})`} opacity={on(f, prices - 4, 8)}><Bill x={0} y={0} s={1.3} text={f >= sixteen ? '$1,650' : '$1,500'} /></g>
        <Flag x={720} y={680} text="+10%" size={56} color={C.lamp} o={pop(f, ten - 2, 10)} />
        <Reservoir x={1340} y={G + 10} w={520} h={320} level={lerp(0.25, 0.75, span(f, collect, profit + 20))} f={f} o={on(f, collect - 6, 8)} />
        {[...Array(10)].map((_, k) => { const a = collect + k * 5, t = span(f, a, a + 22); return f >= a && t < 1 ? <Coin key={k} x={lerp(840, 1300 + (k % 4) * 30, t)} y={lerp(560, G - 280, t) - 80 * Math.sin(Math.PI * t)} r={22} /> : null })}
        <Flag x={1340} y={G - 400} text="$16.5 MILLION IN" size={48} color={C.gold} o={on(f, sixteen2 - 2, 8)} />
        <Tick x={1640} y={G - 520} s={0.9} o={pop(f, profit - 2, 10)} />
        <Flag x={1340} y={G + 80} text="BACK IN PROFIT" size={44} color={C.green} ink="#fff" o={on(f, profit, 8)} />
      </g>}
      {B > 0 && <g opacity={B}>
        <SkyBg sky="after" f={f} sun={[1700, 260]} />
        <Land f={f} G={G} />
        <Reservoir x={560} y={G + 10} w={520} h={300} level={0.8} f={f} o={on(f, eight - 4, 8)} />
        <Flag x={560} y={G - 390} text="2023: $851 BILLION" size={48} o={on(f, eight, 8)} />
        <Reservoir x={1360} y={G + 10} w={lerp(520, 580, on(f, nine, 20))} h={lerp(300, 330, on(f, nine, 20))} level={0.82} f={f} o={on(f, nine - 4, 8)} />
        <Flag x={1360} y={G - 420} text="2024: $926 BILLION" size={48} color={C.gold} o={on(f, nine, 8)} />
        <Flag x={960} y={360} text="US PREMIUMS WRITTEN" size={40} o={on(f, wrote - 4, 8)} />
        <Flag x={960} y={G + 100} text="PRICES RAISED TO MATCH THE RISK" size={44} color={C.lamp} o={on(f, increases - 4, 8)} />
      </g>}
      {Cc > 0 && <g opacity={Cc}>
        <SkyBg sky="after" f={f} sun={[1700, 260]} />
        <rect x={0} y={G - 400 + (1 - tide) * 300} width={1920} height={900} fill="url(#in-seaG)" />
        {[...Array(12)].map((_, k) => <path key={k} d={`M${(k * 170 + f) % 2080 - 160} ${G - 390 + (1 - tide) * 300 + (k % 3) * 40} q 20 -8 40 0 t 40 0`} fill="none" stroke={C.foam} strokeWidth={3} opacity={0.6} />)}
        <g transform="translate(300 0)">
          <rect x={-40} y={G - 500} width={80} height={520} fill={C.cream} stroke={C.ink} strokeWidth={4} />
          {[...Array(10)].map((_, k) => <line key={k} x1={-40} y1={G - 480 + k * 50} x2={k % 2 ? 0 : 20} y2={G - 480 + k * 50} stroke={C.ink} strokeWidth={4} />)}
          <text x={70} y={G - 450} fill={C.red} style={big(40)}>HIGH PRICES</text><text x={70} y={G - 20} fill={C.greenD} style={big(40)}>LOW PRICES</text>
        </g>
        <Flag x={960} y={380} text="HARD MARKET" size={60} color={C.red} ink="#fff" o={on(f, hard - 2, 8) * (1 - on(f, soften - 4, 8))} />
        <Flag x={960} y={380} text="SOFT MARKET" size={60} color={C.green} ink="#fff" o={on(f, soften - 2, 8) * (1 - on(f, cycle - 4, 8))} />
        <g opacity={on(f, harder - 4, 8) * (1 - on(f, profits - 4, 8))} transform="translate(1300 760)">
          <rect x={-200} y={-10} width={400} height={20} fill={C.roofD} />
          {[0, 1, 2, 3].map((k) => <Umbrella key={k} x={-150 + k * 100} y={-20} s={0.4} o={k < 1 ? 1 : 1 - on(f, harder + k * 4, 8)} />)}
          <Flag x={0} y={80} text="COVER HARDER TO FIND" size={36} />
        </g>
        {[0, 1, 2].map((k) => <Boat key={k} x={lerp(2100 + k * 200, 900 + k * 260, on(f, rivals - 4 + k * 6, 30))} y={G - 380 + (1 - tide) * 300} s={0.8} col={[C.plum, C.sea, C.gold][k]} o={on(f, rivals - 6, 6)} />)}
        <Flag x={1300} y={560} text="NEW RIVALS PILE IN" size={40} o={on(f, rivals, 8) * (1 - on(f, cycle - 4, 8))} />
        <g opacity={on(f, cycle - 4, 8)} transform={`translate(960 420) rotate(${(f - cycle) * 2})`}>
          <path d="M-150 0 A150 150 0 1 1 0 150" fill="none" stroke={C.navy} strokeWidth={18} /><path d="M-20 130 L20 150 L-20 175 Z" fill={C.navy} transform="rotate(10)" />
        </g>
        <text x={960} y={440} textAnchor="middle" fill={C.navy} opacity={on(f, cycle, 8)} style={big(60)}>THE CYCLE</text>
      </g>}
      {D > 0 && <g opacity={D}>
        <SkyBg sky="after" f={f} sun={[1700, 260]} />
        <Land f={f} G={G} sea={false} />
        <g transform={`translate(560 520) scale(${1.2 + 0.3 * on(f, jumps, 14)})`}><Bill x={0} y={0} s={1} text={f >= jumps ? '$1,650' : '$1,500'} /></g>
        <Tick x={560} y={800} s={0.7} o={on(f, noCrash - 2, 8)} />
        <Flag x={560} y={900} text="NO CRASH" size={36} o={on(f, noCrash - 2, 8)} />
        <g opacity={on(f, storms - 4, 8)}>
          {[0, 1].map((k) => <g key={k} transform={`translate(${1160 + k * 380} 0)`}><Cloud x={0} y={330} s={0.8} dark /><Hail f={f} o={0.8} x0={-90} x1={90} /><House x={0} y={600} s={0.7} /></g>)}
          <Flag x={1350} y={680} text="OTHER PEOPLE'S STORMS" size={40} />
        </g>
        <g opacity={on(f, repairs - 4, 8)} transform="translate(1350 860)">
          <path d="M-120 20 L60 -40 a30 30 0 1 1 20 26 L-110 46 Z" fill={C.stoneD} stroke={C.ink} strokeWidth={4} />
          <Flag x={220} y={-10} text={f >= more ? 'REPAIRS: $$$' : 'REPAIRS: $$'} size={40} color={C.lamp} />
        </g>
      </g>}
      <Headline f={f} lines={[[after, 'THEN PRICES GO UP', C.navy, 104], [country, 'ACROSS THE COUNTRY', C.navy, 104], [hard, 'THE INSURANCE CYCLE', C.navy, 100], [bill, 'WHY YOUR BILL JUMPS', C.navy, 104]]} />
      <Grain />
    </g>
  )
}
const ACC = ["s67:what","s68:year","s68:fifteen","s69:million","s70:that's","s70:billion#2","s72:insurers","s73:win","s74:paying","s74:used"]  // # accent words: a gentle camera push on each (fills >2 s gaps)
const BEATS = ['s67:after', 's67:raise', 's67:prices', 's68:sixteen', 's68:instead', 's68:ten', 's69:collect', 's69:sixteen', 's69:profit', 's70:country', 's70:wrote', 's70:eight', 's70:premiums', 's70:nine', 's71:verisk', 's71:turnaround', 's71:increases', 's71:risk', 's72:hard', 's72:rise', 's72:harder', 's73:profits', 's73:rivals', 's73:soften', 's73:cycle', 's73:again', 's74:bill', 's74:jumps', 's74:crash', 's74:storms', 's74:repairs', 's74:more']
export const IN_HARD = makePiece('ins-hard', 'Then you pay more: a rainbow after the storm, you raise the bill $1,500 → $1,650 (+10%), coins pour into your reservoir $16.5 MILLION IN, a tick BACK IN PROFIT; two harbour reservoirs 2023: $851 BILLION and 2024: $926 BILLION (US PREMIUMS WRITTEN, PRICES RAISED TO MATCH THE RISK); a harbour tide gauge HIGH PRICES/LOW PRICES, HARD MARKET at high tide with fewer umbrellas on a rack (COVER HARDER TO FIND), rival sailboats sail in (NEW RIVALS PILE IN), SOFT MARKET at low tide, a circling arrow THE CYCLE; your bill grows with NO CRASH, storm clouds over other houses (OTHER PEOPLE\'S STORMS) and a spanner REPAIRS: $$$', {
  mood: 'light', Component: Hard, beats: [...BEATS, ...ACC],
  sfx: [['s67:after', 'chime', 0.1], ['s68:sixteen', 'pop', 0.1], ['s69:collect', 'coin', 0.1], ['s69:profit', 'ding', 0.12], ['s70:eight', 'pop', 0.08], ['s70:nine', 'pop', 0.1], ['s72:hard', 'thud', 0.1], ['s73:rivals', 'whoosh', 0.1], ['s73:cycle', 'swish', 0.1], ['s74:jumps', 'pop', 0.1], ['s74:storms', 'thump', 0.08]] })
