// ---------------------------------------------------------------- s55–s60: how long the bond has left
// Three seesaws side by side, short to long: a 2-year, a 10-year and a 30-year bond. RATES sits on the left end,
// the bond on the right. When rates rise from 4% to 5% all three tip; the longer the plank, the further its bond
// end drops (drawn to scale: about 2%, 8% and 15%). The 30-year gets a brass ring: LOCKED IN LONGER.
// s60: the planks shiver and the paper darkens toward night — 2022 is next.
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline } from '../aimoney/common'
import { B, BDefs, BGrain, Certificate, FLOOR, Flourish, Parchment, Tag, cues, FONT } from './kit'

const K = {
  piece55: 's55:piece', long55: 's55:long', left55: 's55:left',
  rates56: 's56:rates', four56: 's56:four', five56: 's56:five', two56: 's56:two', falls56: 's56:falls', percent56: 's56:percent',
  ten57: 's57:ten', eight57: 's57:eight',
  thirty58: 's58:thirty', fifteen58: 's58:fifteen',
  longer59: 's59:longer', locked59: 's59:locked', lower59: 's59:lower', drop59: 's59:drop',
  twenty60: 's60:twenty', exactly60: 's60:exactly', giant60: 's60:giant',
}
// # one small seesaw: plank w, end drop d px (positive = bond end down)
const Mini: React.FC<{ x: number; w: number; drop: number; o: number; years: string; pct: string; pctO: number; shake: number; yO: number }> = ({ x, w, drop, o, years, pct, pctO, shake, yO }) => {
  if (o <= 0.01) return null
  const a = Math.asin(Math.max(-1, Math.min(1, drop / (w / 2)))) * 180 / Math.PI + shake
  return <g opacity={o} transform={`translate(${x} ${FLOOR})`}>
    <ellipse cx={0} cy={6} rx={w * 0.3} ry={14} fill="#000" opacity={0.15} />
    <path d="M-70 0 L0 -150 L70 0 Z" fill={B.brass} stroke={B.brassD} strokeWidth={5} /><circle cx={0} cy={-150} r={14} fill={B.brassD} />
    <g transform={`translate(0 -150) rotate(${a})`}>
      <rect x={-w / 2} y={-16} width={w} height={28} rx={12} fill={B.green} stroke={B.greenD} strokeWidth={4} />
      <g transform={`translate(${-w / 2 + 60} -16) rotate(${-a})`}><rect x={-60} y={-80} width={120} height={80} rx={12} fill={B.ox} /><text y={-28} textAnchor="middle" fill="#fff" style={{ font: `400 38px ${FONT.big}` }}>RATES</text></g>
      <g transform={`translate(${w / 2 - 80} -16) rotate(${-a})`}><Certificate x={0} y={-62} s={0.24} n={0} seal={false} amount={years.split(' ')[0] + 'Y'} title="BOND" /></g>
    </g>
    <Tag x={0} y={74} text={pctO > 0.5 ? `${years}: ${pct}` : years} size={pctO > 0.5 ? 46 : 40} bg={pctO > 0.5 ? B.ox : B.ink} o={yO} />
  </g>
}

const Seesaw2: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const rise = easeInOut(span(f, t.rates56, t.five56 + 14))
  const shake = on(f, t.giant60 - 4, 6) * Math.sin(f / 2.5) * 3
  const PX = 12   // # px per percent of price drop
  const dark = on(f, t.exactly60, 30)
  return (
    <g>
      <BDefs />
      <Parchment />
      <Mini x={330} w={300} drop={2 * PX * rise} o={on(f, c('s55') + 2, 10)} years="2 YEARS" pct="−2%" pctO={on(f, t.percent56 - 2, 8)} shake={shake} yO={on(f, t.two56 - 2, 8)} />
      <Mini x={880} w={500} drop={8 * PX * rise} o={on(f, c('s55') + 8, 10)} years="10 YEARS" pct="−8%" pctO={on(f, t.eight57, 8)} shake={shake} yO={on(f, t.ten57 - 2, 8)} />
      <Mini x={1500} w={700} drop={15 * PX * rise} o={on(f, c('s55') + 14, 10)} years="30 YEARS" pct="−15%" pctO={on(f, t.fifteen58, 8)} shake={shake} yO={on(f, t.thirty58 - 2, 8)} />
      {/* rates 4% → 5% */}
      <g opacity={on(f, t.rates56 - 2, 8)}>
        <Tag x={960} y={300} text={rise > 0.5 ? 'RATES: 4% → 5%' : 'RATES: 4%'} size={50} bg={B.ox} />
      </g>
      <Tag x={1500} y={FLOOR + 140} text="LOCKED IN LONGER" size={40} bg={B.brassD} o={on(f, t.locked59, 8) * (1 - on(f, t.twenty60, 8))} />
      <rect width={1920} height={1080} fill={B.navyD} opacity={0.55 * dark} />
      <Headline f={f} lines={[[t.piece55, 'HOW LONG IS LEFT?', B.ink, 112], [t.longer59, 'LONGER = BIGGER DROP', B.ink, 108], [t.twenty60, 'AND THEN, 2022', B.ox, 116]]} />
      <Flourish f={f} at={(EXTRA['bd-seesaw2'] ?? []).map(c)} />
      <BGrain />
    </g>
  )
}

export const BD_SEESAW2 = makePiece('bd-seesaw2', "How long the bond has left: three seesaws side by side, a 2-year, a 10-year and a 30-year bond with RATES on one end; when rates rise from 4% to 5% all three tip and the longer the plank the further its bond end drops, about −2%, −8% and −15%; a brass ring around the 30-year, LOCKED IN LONGER; then the planks shiver and the paper darkens toward 2022", {
  mood: 'light', Component: Seesaw2, beats: [...Object.values(K), ...(EXTRA['bd-seesaw2'] ?? [])],
  sfx: [['s56:falls', 'swish', 0.08], ['s58:fifteen', 'thud', 0.1], ['s60:giant', 'riser', 0.08]] })
