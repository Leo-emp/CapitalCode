// ---------------------------------------------------------------- s1–s7: the hook — twelve people set a price you pay
// A) s1–s2  a round committee table in a marble hall with twelve seated figures; three things you own hang from it
//           on copper wires as they are named: a credit card, a piggy bank (savings), a loan paper.
// B) s3     September: a calendar page, a vote board of twelve lights turning green one by one: 12–0, +0.25%.
// C) s4–s6  you shrug at a tiny 0.25% coin; it rolls along a long copper pipe all the way into a wallet.
// D) s7     the road of the video: five stops drawn as objects — the Fed building, a two-pan balance, the lever,
//           a wallet, a printing press — each lighting up as it is named.
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person } from '../aimoney/common'
import { CalPage, Coin, CreditCard, F, FDefs, FGrain, FLOOR, FedBuilding, Hall, Lever, LoanPaper, Mark, Piggy, Seat, Street, Tag, cues, fadeIn, scene, FONT } from './kit'

const K = {
  price1: 's1:price', twelve1: 's1:twelve', seen1: 's1:seen',
  card2: 's2:credit', savings2: 's2:savings', loan2: 's2:loan',
  september3: 's3:september', room3: 's3:room', voted3: 's3:voted', zero3: 's3:zero', raise3: 's3:raise', quarter3: 's3:quarter',
  quarter4: 's4:quarter', cares4: 's4:cares',
  small5: 's5:small', travels5: 's5:travels', wallet5: 's5:wallet',
  degree6: 's6:degree',
  step7: 's7:step', fed7: 's7:federal', trying7: 's7:trying', moves7: 's7:moves', reaches7: 's7:reaches', prints7: 's7:prints',
}
// # a wallet
export const Wallet: React.FC<{ x: number; y: number; s?: number; o?: number; open?: number }> = ({ x, y, s = 1, o = 1, open = 0 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-110} width={300} height={190} rx={26} fill="#8A5A36" />
    <rect x={-150} y={-110 - 30 * open} width={300} height={70} rx={26} fill="#A36D44" />
    <rect x={40} y={-40} width={120} height={70} rx={16} fill="#6E4628" /><circle cx={95} cy={-5} r={12} fill={F.gold} />
  </g>
)
// # a printing press
export const Press: React.FC<{ x: number; y: number; s?: number; o?: number; run?: number }> = ({ x, y, s = 1, o = 1, run = 0 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={220} ry={16} fill="#000" opacity={0.15} />
    <rect x={-200} y={-200} width={400} height={200} rx={16} fill={F.slateL} />
    <circle cx={-90} cy={-110} r={60} fill={F.copper} stroke={F.copperD} strokeWidth={6} /><circle cx={90} cy={-110} r={60} fill={F.copper} stroke={F.copperD} strokeWidth={6} />
    <g transform={`rotate(${run * 360} -90 -110)`}><rect x={-96} y={-170} width={12} height={120} fill={F.copperD} /></g>
    <g transform={`rotate(${-run * 360} 90 -110)`}><rect x={84} y={-170} width={12} height={120} fill={F.copperD} /></g>
    <rect x={-240} y={-30} width={480} height={30} rx={8} fill={F.slate} />
    <rect x={120} y={-60 - 40 * ((run * 3) % 1)} width={140} height={60} rx={6} fill="#9BD3A8" stroke={F.greenD} strokeWidth={3} />
  </g>
)
// # a two-pan balance
export const Balance: React.FC<{ x: number; y: number; s?: number; o?: number; tilt?: number }> = ({ x, y, s = 1, o = 1, tilt = 0 }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-14} y={-360} width={28} height={360} fill={F.copperD} /><rect x={-110} y={-24} width={220} height={24} rx={8} fill={F.copperD} />
    <g transform={`translate(0 -360) rotate(${tilt})`}><rect x={-300} y={-12} width={600} height={24} rx={12} fill="url(#fed-copper)" />
      {[-280, 280].map((d) => <g key={d} transform={`translate(${d} 0) rotate(${-tilt})`}><line x1={0} y1={0} x2={-90} y2={130} stroke={F.copperD} strokeWidth={4} /><line x1={0} y1={0} x2={90} y2={130} stroke={F.copperD} strokeWidth={4} /><path d="M-110 130 L110 130 L80 170 L-80 170 Z" fill={F.copper} /></g>)}
    </g>
  </g>
)

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s3') - 4, BC = c('s4') - 4, CD = c('s7') - 4
  const A = scene(f, -20, AB), Bs = scene(f, AB, BC), Cs = scene(f, BC, CD), Ds = fadeIn(f, CD)
  const lights = Math.floor(lerp(0, 12, span(f, t.voted3, t.zero3 + 4)) + 0.001)
  const roll = easeInOut(span(f, t.travels5, t.wallet5 + 10))
  const pipe = (u: number) => ({ x: lerp(620, 1560, u), y: 640 + Math.sin(u * Math.PI * 1.5) * 70 })
  const stops: [string, number, number][] = [['fed', 330, t.fed7], ['bal', 680, t.trying7], ['lever', 1010, t.moves7], ['wallet', 1330, t.reaches7], ['press', 1650, t.prints7]]
  return (
    <g>
      <FDefs />
      {/* ---------------- A) twelve people at one table ---------------- */}
      {A > 0 && <g opacity={A}>
        <Hall />
        <g opacity={on(f, t.twelve1 - 4, 10)}>
          {Array.from({ length: 12 }, (_, k) => { const a = Math.PI * (k / 11); const sx = 960 - Math.cos(a) * 470, sy = 520 - Math.sin(a) * 60
            return <Seat key={k} x={sx} y={sy} s={0.8} o={on(f, t.twelve1 - 4 + k, 6)} color={k < 7 ? F.slate : F.tealD} /> })}
          <ellipse cx={960} cy={600} rx={430} ry={110} fill={F.copperD} /><ellipse cx={960} cy={585} rx={410} ry={95} fill="url(#fed-copper)" />
        </g>
        {[[540, t.card2], [960, t.savings2], [1380, t.loan2]].map(([x, at], k) => { const o = on(f, (at as number) - 2, 10); return o > 0.01 && <g key={k} opacity={o}>
          <line x1={x as number} y1={680} x2={x as number} y2={760} stroke={F.copper} strokeWidth={5} />
          {k === 0 && <CreditCard x={540} y={860} s={0.6} />}
          {k === 1 && <Piggy x={960} y={960} s={0.75} />}
          {k === 2 && <LoanPaper x={1380} y={890} s={0.5} />}
        </g> })}
      </g>}

      {/* ---------------- B) September: 12–0 ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <Hall />
        <CalPage x={430} y={600} top="SEPTEMBER" big="2026" s={1.05} o={on(f, t.september3 - 4, 8)} />
        <g opacity={on(f, t.room3 - 2, 8)}>
          <rect x={800} y={330} width={900} height={420} rx={24} fill={F.slate} />
          <text x={1250} y={400} textAnchor="middle" fill="#fff" style={{ font: `400 46px ${FONT.big}`, letterSpacing: 6 }}>THE VOTE</text>
          {Array.from({ length: 12 }, (_, k) => <circle key={k} cx={880 + (k % 6) * 148} cy={490 + Math.floor(k / 6) * 120} r={44} fill={k < lights ? F.green : '#3A4C6E'} stroke="#0F1828" strokeWidth={5} />)}
        </g>
        <Tag x={1250} y={830} text="12 – 0" size={64} bg={F.greenD} o={on(f, t.zero3, 8)} />
        <Tag x={1250} y={940} text="RATE +0.25%" size={56} bg={F.coral} o={on(f, t.quarter3, 8)} />
      </g>}

      {/* ---------------- C) a quarter of a percent travels to your wallet ---------------- */}
      {Cs > 0 && <g opacity={Cs}>
        <Street />
        <Person f={f} who="hero" beats={[[0, 'idle', 'neutral'], [t.cares4, 'shrug', 'smug'], [t.travels5, 'point', 'thinking'], [t.degree6, 'thumbsUp', 'smiling']]} x={300} y={1060} s={0.82} />
        <path d={'M' + Array.from({ length: 41 }, (_, k) => pipe(k / 40)).map((p) => `${p.x} ${p.y}`).join(' L')} stroke="url(#fed-copper)" strokeWidth={36} fill="none" strokeLinecap="round" opacity={on(f, t.small5 - 4, 10)} />
        <Coin x={pipe(roll).x} y={pipe(roll).y - 50} r={46} label="0.25%" o={on(f, t.quarter4 - 2, 8) * (1 - on(f, t.wallet5 + 10, 6))} />
        <Wallet x={1640} y={720} s={0.8} o={on(f, t.wallet5 - 6, 8)} open={on(f, t.wallet5 + 4, 10)} />
      </g>}

      {/* ---------------- D) the road of the video ---------------- */}
      {Ds > 0 && <g opacity={Ds}>
        <Hall />
        <rect x={200} y={FLOOR - 20} width={1600} height={16} rx={8} fill={F.copper} opacity={on(f, t.step7 - 2, 8)} />
        {stops.map(([kind, x, at], k) => { const o = on(f, at - 2, 8); return o > 0.01 && <g key={k} opacity={o}>
          {kind === 'fed' && <FedBuilding x={x} y={FLOOR - 20} s={0.38} sign="THE FED" />}
          {kind === 'bal' && <Balance x={x} y={FLOOR - 20} s={0.5} tilt={Math.sin(f / 14) * 6} />}
          {kind === 'lever' && <Lever x={x} y={FLOOR - 20} s={0.7} v={Math.sin(f / 12)} />}
          {kind === 'wallet' && <Wallet x={x} y={FLOOR - 110} s={0.7} />}
          {kind === 'press' && <Press x={x} y={FLOOR - 20} s={0.55} run={f / 60} />}
          <Tag x={x} y={FLOOR + 70} text={['WHAT IT IS', 'ITS GOAL', 'HOW IT WORKS', 'YOUR MONEY', 'PRINTING?'][k]} size={34} bg={F.slate} />
        </g> })}
      </g>}

      <Headline f={f} lines={[[t.twelve1, 'TWELVE PEOPLE, ONE RATE', F.ink, 104], [t.september3, 'SEPTEMBER 2026', F.ink, 110], [t.quarter4, 'JUST 0.25%?', F.ink, 116], [t.step7, 'STEP BY STEP', F.ink, 110]]} />
      <Mark f={f} at={(EXTRA['fed-hook'] ?? []).map(c)} />
      <FGrain />
    </g>
  )
}

export const FD_HOOK = makePiece('fed-hook', "Hook: twelve figures around a round copper table in a marble hall; a credit card, a piggy bank and a loan paper hang from it on copper wires; a September 2026 calendar and a vote board where twelve lights turn green, 12–0, rate +0.25%; you shrug as a tiny 0.25% coin rolls along a copper pipe into a wallet; the road of the video: the Fed building, a balance, a lever, a wallet, a printing press", {
  mood: 'light', Component: Hook, beats: [...Object.values(K), ...(EXTRA['fed-hook'] ?? [])],
  sfx: [['s3:zero', 'ding', 0.1], ['s5:wallet', 'coin', 0.1], ['s7:prints', 'chime', 0.08]] })
