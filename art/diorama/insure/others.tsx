// ---------------------------------------------------------------- s75–s79: other kinds of insurers
// A) Health: a clinic on the hill; a $1 coin pours at least 80–85¢ into the clinic (s76); if they spend less, a REBATE envelope flies back to customers (s77);
//    a lid caps the small margin stack, then the insurer's crowd of customers grows (bigger).
// B) Life: a sapling grows into a great oak as the years roll by (DECADES) (s78); beside it a very deep reservoir feeds a huge, slow wheel (s79).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline } from '../aimoney/common'
import { camera } from '../aimoney/common'
import { Bill, C, Coin, Defs, Dot, Flag, Grain, Land, Reservoir, SkyBg, Stack, Wheel, big, fadeIn, scene } from './kit'

const G = 920
const Clinic: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={240} ry={16} fill="#000" opacity={0.18} />
    <rect x={-220} y={-260} width={440} height={260} fill={C.wall} /><rect x={120} y={-260} width={100} height={260} fill="#000" opacity={0.07} />
    <rect x={-240} y={-280} width={480} height={26} fill={C.stoneD} />
    {[-150, -70, 70, 150].map((wx) => [-200, -120].map((wy) => <rect key={wx + '' + wy} x={wx - 26} y={wy} width={52} height={44} fill="#9FCBDA" stroke={C.ink} strokeWidth={3} />))}
    <rect x={-40} y={-90} width={80} height={90} fill={C.seaD} />
    <g transform="translate(0 -180)"><rect x={-40} y={-14} width={80} height={28} fill={C.red} /><rect x={-14} y={-40} width={28} height={80} fill={C.red} /></g>
  </g>
)
const Tree: React.FC<{ x: number; y: number; g: number }> = ({ x, y, g }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={6} rx={60 + 160 * g} ry={14} fill="#000" opacity={0.18} />
    <path d={`M${-10 - 30 * g} 0 L${-6 - 14 * g} ${-80 - 260 * g} L${6 + 14 * g} ${-80 - 260 * g} L${10 + 30 * g} 0 Z`} fill="#7A5235" />
    {[[-1, 0.9], [1, 0.95], [0, 1.25], [-0.6, 1.2], [0.6, 1.15]].map(([dx, dy], k) => <circle key={k} cx={dx * (40 + 130 * g)} cy={-(80 + 260 * g) * dy} r={40 + 120 * g} fill={k % 2 ? C.grassD : C.grass} />)}
  </g>
)
const Others: React.FC<PieceProps> = ({ f, c }) => {
  const every = c('s75:every'), game = c('s75:game'), health = c('s76:health'), limit = c('s76:limit'), spend = c('s76:spend'), eighty = c('s76:eighty'), care = c('s76:care')
  const less = c('s77:less'), rebate = c('s77:rebate'), capped = c('s77:capped'), bigger = c('s77:bigger'), earn = c('s77:earn')
  const life = c('s78:life'), extreme = c('s78:extreme'), decades = c('s78:decades'), pays = c('s78:pays'), hold = c('s79:hold'), long = c('s79:long'), investing = c('s79:investing'), business = c('s79:business')
  const AB = c('s78') - 6
  const A = scene(f, -20, AB), B = fadeIn(f, AB)
  return (
    <g transform={camera(f, ACC.map((k, i) => [c(k), 960, 540, i % 2 ? 1 : 1.035] as [number, number, number, number]), 18)}>
      <Defs />
      {A > 0 && <g opacity={A}>
        <SkyBg sky="morning" f={f} sun={[1700, 230]} />
        <Land f={f} G={G} sea={false} />
        <g opacity={1 - on(f, health - 6, 8)}>
          {[['CAR', C.sea], ['HEALTH', C.red], ['LIFE', C.green]].map(([t, col], k) => <g key={k} opacity={pop(f, every - 2 + k * 6, 10)}><Flag x={520 + k * 440} y={560} text={t as string} size={70} color={col as string} ink="#fff" /></g>)}
          <Flag x={960} y={760} text="DIFFERENT GAMES" size={44} o={on(f, game - 2, 8)} />
        </g>
        <g opacity={on(f, health - 6, 8)}>
          <Clinic x={1360} y={G} s={0.9} />
          <Coin x={500} y={520} r={150} v="$1" o={on(f, limit - 6, 8)} />
          {[...Array(8)].map((_, k) => { const a = spend + k * 5, t = span(f, a, a + 26); return f >= a && t < 1 && f < less ? <Coin key={k} x={lerp(600, 1260, t)} y={lerp(520, G - 140, t) - 100 * Math.sin(Math.PI * t)} r={22} /> : null })}
          <Flag x={940} y={330} text="AT LEAST 80–85% ON CARE" size={50} color={C.red} ink="#fff" o={on(f, eighty - 2, 8) * (1 - on(f, less - 4, 8))} />
          <Flag x={1360} y={G + 80} text="MEDICAL CARE" size={40} o={on(f, care - 4, 8) * (1 - on(f, less - 4, 8))} />
          <g opacity={on(f, less - 4, 8)}>
            {(() => { const t = span(f, rebate - 4, rebate + 24); return <g transform={`translate(${lerp(1360, 520, t)} ${lerp(G - 300, 760, t) - 120 * Math.sin(Math.PI * t)}) scale(0.7)`}><Bill x={0} y={0} text="REBATE" /></g> })()}
            {[0, 1, 2].map((k) => <Dot key={k} x={420 + k * 90} y={G + 60} s={2} col={[C.sea, C.plum, C.roof][k]} />)}
            <Flag x={940} y={330} text="SPEND LESS? SEND A REBATE" size={44} color={C.lamp} o={on(f, rebate, 8) * (1 - on(f, capped - 4, 8))} />
            <g opacity={on(f, capped - 4, 8)} transform="translate(940 640)"><Stack x={0} y={0} n={4} r={40} /><rect x={-70} y={-90} width={140} height={20} rx={6} fill={C.navy} /><Flag x={0} y={-160} text="MARGIN CAPPED" size={40} /></g>
            {[...Array(16)].map((_, k) => <Dot key={k} x={1080 + (k % 8) * 60} y={G + 70 + Math.floor(k / 8) * 50} s={1.3} col={[C.sea, C.plum, C.roof, C.greenD][k % 4]} o={on(f, bigger - 2 + k * 2, 6)} />)}
            <Flag x={1300} y={G - 340} text="BIGGER = EARN MORE" size={40} color={C.green} ink="#fff" o={on(f, earn - 4, 8)} />
          </g>
        </g>
      </g>}
      {B > 0 && <g opacity={B}>
        <SkyBg sky="evening" f={f} sun={[1600, 360]} />
        <Land f={f} G={G} sea={false} />
        <Tree x={520} y={G} g={on(f, decades - 10, 50)} />
        <Flag x={520} y={250} text={f >= decades ? 'DECADES' : 'A LIFE POLICY'} size={56} color={C.lamp} o={on(f, life - 2, 8)} />
        <text x={520} y={1010} textAnchor="middle" fill={C.cream} opacity={on(f, decades - 10, 8)} style={big(48)}>{`YEAR ${Math.round(lerp(1, 40, on(f, decades - 10, 50)))}`}</text>
        <Flag x={520} y={340} text="THEN IT PAYS OUT" size={40} o={on(f, pays - 2, 8)} />
        <g opacity={on(f, hold - 6, 8)}>
          <Reservoir x={1300} y={G + 10} w={560} h={lerp(260, 520, on(f, long - 6, 30))} level={0.85} f={f} />
          <Wheel x={1780} y={G - 330} r={130} spin={f * 1.6} o={on(f, investing - 6, 8)} glow={0.5 * on(f, business, 10)} />
          <Flag x={1300} y={G + 90} text="HELD FOR A VERY LONG TIME" size={40} o={on(f, long - 2, 8)} />
          <Flag x={1600} y={210} text="INVESTING IS HUGE" size={44} color={C.gold} o={on(f, investing, 8)} />
        </g>
      </g>}
      <Headline f={f} lines={[[every, 'NOT EVERY INSURER', C.navy, 104], [health, 'HEALTH INSURERS (US)', C.navy, 100], [life, 'LIFE INSURERS', C.cream, 104]]} />
      <Grain />
    </g>
  )
}
const ACC = ["s75:exactly","s76:us","s76:percent","s77:have","s78:policy"]  // # accent words: a gentle camera push on each (fills >2 s gaps)
const BEATS = ['s75:every', 's75:game', 's76:health', 's76:limit', 's76:spend', 's76:eighty', 's76:care', 's77:less', 's77:rebate', 's77:capped', 's77:bigger', 's77:earn', 's78:life', 's78:extreme', 's78:decades', 's78:pays', 's79:hold', 's79:long', 's79:investing', 's79:business']
export const IN_OTHERS = makePiece('ins-others', 'Other insurers: CAR, HEALTH, LIFE pennants (DIFFERENT GAMES); a US clinic on the hill, a big $1 coin pours coins into it (AT LEAST 80–85% ON CARE, MEDICAL CARE), a REBATE envelope flies back to customers (SPEND LESS? SEND A REBATE), a lid on a small stack (MARGIN CAPPED), a growing crowd (BIGGER = EARN MORE); life: a sapling grows into a great oak as YEAR 1 → 40 counts (A LIFE POLICY → DECADES, THEN IT PAYS OUT), a very deep reservoir (HELD FOR A VERY LONG TIME) feeds a huge glowing wheel (INVESTING IS HUGE)', {
  mood: 'light', Component: Others, beats: [...BEATS, ...ACC],
  sfx: [['s75:every', 'pop', 0.08], ['s76:eighty', 'ding', 0.1], ['s77:rebate', 'whoosh', 0.1], ['s77:capped', 'click', 0.1], ['s78:decades', 'riser', 0.08], ['s79:investing', 'chime', 0.1]] })
