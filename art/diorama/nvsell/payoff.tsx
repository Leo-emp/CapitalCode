// ---------------------------------------------------------------- s73–s82: putting it together (dawn over chip city).
// A) Dawn over chip city. Four recap panels light one by one along a glowing circuit road: a ballot (election raised
//    fears) → a chip with -$440B (chip stocks fell) → a giant tower dragging the skyline (index down) → a sunrise
//    arrow with Nvidia's own dark cloud (stocks bounced, except Nvidia).
// B) The lesson: a price tag tied to a FUTURE balloon that can drift overnight.
// C) Mia's phone shows a sea of red; a lit billboard asks the three questions, each ticking on: WHAT CHANGED? WHOLE
//    MARKET OR ONE INDUSTRY? DO I NEED THIS MONEY SOON? Then a calm close card.
import React from 'react'
import { lerp, on, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, Tick, win, type Beat } from '../aimoney/common'
import { AMBER, AppPhone, Ballot, Billboard, ChipCity, Floor, NEON, RED, Skyline, Sky, StormCloud, Sunrise, WeightTower } from './kit'

const K = {
  put73: 's73:put', all73: 's73:all', together73: 's73:together',
  election74: 's74:election', raised74: 's74:raised', fears: 's74:fears', boom74: 's74:boom', slow74: 's74:slow',
  chip75: 's75:chip', priced75: 's75:priced', fell75: 's75:fell', hard75: 's75:hard', nvidia75: 's75:nvidia', k440: 's75:440', day75: 's75:day',
  because76: 's76:because', huge76: 's76:huge', market76: 's76:market', dragged: 's76:dragged', index76: 's76:index', down76: 's76:down',
  then77: 's77:then', fear77: 's77:fear', faded: 's77:faded', bounced: 's77:bounced', except: 's77:except', nvidia77: 's77:nvidia', faced: 's77:faced', worry: 's77:worry',
  lesson: 's78:lesson', simple78: 's78:simple', prices78: 's78:prices', expectations: 's78:expectations', change78: 's78:change', overnight: 's78:overnight',
  next79: 's79:next', open79: 's79:open', app79: 's79:app', sea: 's79:sea', red79: 's79:red', ask: 's79:ask', three79: 's79:three', questions: 's79:questions',
  what80: 's80:what', changed80: 's80:changed', whole80: 's80:whole', industry: 's80:industry', need80: 's80:need', money80: 's80:money', soon: 's80:soon',
  knowing: 's81:knowing', own81: 's81:own', why81: 's81:why', best: 's81:best', calm: 's81:calm', swing: 's81:swing',
  this82: 's82:this', works: 's82:works', advice: 's82:advice',
}
type Key = keyof typeof K

// # a recap panel: framed picture with a caption
const Panel: React.FC<{ x: number; y: number; o: number; lit: number; cap: string; children: React.ReactNode }> = ({ x, y, o, lit, cap, children }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    {lit > 0 && <rect x={-200} y={-230} width={400} height={420} rx={30} fill={NEON} opacity={0.18 * lit} />}
    <rect x={-180} y={-210} width={360} height={380} rx={24} fill="#141230" stroke={lit > 0.5 ? NEON : '#4E4A88'} strokeWidth={5} />
    <g>{children}</g>
    <Label x={0} y={140} text={cap} size={34} font="Bebas Neue" color="#E8E6FF" />
  </g>
)

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const q = Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as Record<Key, number>
  const AB = q.lesson - 8, BC = q.next79 - 8, CD = q.this82 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cc = win(f, BC, CD), D = on(f, CD, 10)
  const qs: [number, string][] = [[q.what80, 'WHAT ACTUALLY CHANGED?'], [q.whole80, 'WHOLE MARKET, OR ONE INDUSTRY?'], [q.need80, 'DO I NEED THIS MONEY SOON?']]
  const mia: Beat[] = [[BC, 'phone', 'worried'], [q.ask, 'think', 'thinking'], [q.what80, 'countOne', 'thinking'], [q.knowing, 'relief', 'smiling'], [q.calm, 'confident', 'smiling']]
  const drift = Math.sin((f - q.change78) / 14) * 60 * on(f, q.change78, 14)
  return (
    <g>
      <Stage id="nv-payoff" frame={f} />
      {/* # A) the four links of the chain */}
      {A > 0 && <g opacity={A}>
        <Sky id="nvp-sky" top="#1A1A50" bottom="#FF9E6B" glow={AMBER} gx={960} gy={1000} f={f} stars={8} />
        <Sunrise x={960} y={1060} t={0.6} r={200} />
        <Skyline y={900} col="#1E1A48" seed={21} h={200} />
        <Floor id="nvp-floor" y={900} top="#221C50" bottom="#0A0820" rim={NEON} />
        <path d={`M200 ${640} L${200 + 1520 * span(f, q.election74, q.worry + 20)} 640`} stroke={NEON} strokeWidth={8} strokeDasharray="22 14" opacity={0.7} />
        <Panel x={300} y={560} o={on(f, q.election74, 10)} lit={win(f, q.election74, q.chip75, 8)} cap="AN ELECTION RAISED FEARS"><Ballot x={0} y={60} s={0.6} drop={1} /></Panel>
        <Panel x={740} y={560} o={on(f, q.chip75, 10)} lit={win(f, q.chip75, q.because76, 8)} cap={f >= q.k440 ? 'NVIDIA -$440B IN A DAY' : 'CHIP STOCKS FELL HARD'}><ChipCity id="nvp-chip" x={0} y={-30} s={0.38} crack={on(f, q.fell75, 14)} dim={on(f, q.fell75, 20)} /></Panel>
        <Panel x={1180} y={560} o={on(f, q.because76, 10)} lit={win(f, q.because76, q.then77, 8)} cap="IT DRAGGED THE INDEX DOWN">
          <WeightTower id="nvp-t" x={-80} y={80} w={90} h={250 * (1 - 0.1 * on(f, q.dragged, 16))} name="" col="#12B872" />{[0, 1, 2, 3].map((k) => <WeightTower key={k} id={`nvp-o${k}`} x={20 + k * 45} y={80} w={34} h={70 * (1 - 0.15 * on(f, q.down76, 16))} name="" col="#5B6AB0" />)}</Panel>
        <Panel x={1620} y={560} o={on(f, q.then77, 10)} lit={win(f, q.then77, q.lesson, 8)} cap={f >= q.except ? 'BOUNCE — EXCEPT NVIDIA' : 'FEAR FADED, STOCKS BOUNCED'}>
          <path d="M-90 40 L-30 -20 L20 10 L90 -80" fill="none" stroke={NEON} strokeWidth={12} strokeLinecap="round" /><path d="M60 -90 L100 -90 L100 -50" fill="none" stroke={NEON} strokeWidth={12} strokeLinecap="round" />
          <g opacity={on(f, q.except, 8)}><StormCloud x={-60} y={-120} s={0.28} f={f} rain={0.5} /></g></Panel>
      </g>}
      {/* # B) the lesson */}
      {B > 0 && <g opacity={B}>
        <Sky id="nvp-sky2" top="#141250" bottom="#5A3A8A" glow={AMBER} gx={960} gy={700} f={f} stars={20} />
        <Skyline y={940} col="#1E1A48" seed={23} h={180} />
        <Floor id="nvp-floor2" y={940} top="#221C50" bottom="#0A0820" rim={AMBER} />
        <g transform={`translate(${960 + drift} ${380 - 20 * pop(f, q.expectations, 12)})`} opacity={on(f, q.expectations, 10)}>
          <ellipse cx={0} cy={0} rx={150} ry={175} fill="#B07AFF" /><ellipse cx={-50} cy={-60} rx={30} ry={50} fill="#FFFFFF" opacity={0.3} />
          <Label x={0} y={14} text="EXPECTATIONS" size={44} font="Bebas Neue" color="#FFFFFF" />
          <path d={`M0 175 Q ${-drift * 0.5} 300 ${-drift} 420`} fill="none" stroke="#E8E6FF" strokeWidth={4} />
        </g>
        <g transform={`translate(960 ${820})`} opacity={on(f, q.prices78, 10)}><path d="M-170 -50 L130 -50 L180 0 L130 50 L-170 50 Z" fill={AMBER} stroke="#1B1546" strokeWidth={4} /><Label x={-20} y={16} text="PRICE" size={56} font="Bebas Neue" color="#1B1546" /></g>
        <g opacity={on(f, q.overnight, 8)}><Label x={960} y={1010} text="EXPECTATIONS CAN CHANGE OVERNIGHT" size={46} font="Bebas Neue" color="#E8E6FF" /></g>
      </g>}
      {/* # C) three questions */}
      {Cc > 0 && <g opacity={Cc}>
        <Sky id="nvp-sky3" top="#0B0A2A" bottom="#1E2A5A" glow={NEON} gx={1200} gy={600} f={f} />
        <Skyline y={940} col="#120E33" seed={25} h={200} />
        <Floor id="nvp-floor3" y={940} top="#1A1240" bottom="#07061A" rim={NEON} />
        <Person f={f} who="investorF" beats={mia} x={270} y={940} s={1.0} />
        <g opacity={win(f, q.open79, q.ask + 10, 8)}><AppPhone x={560} y={560} s={0.7} r={-4} red={on(f, q.red79, 12)} /></g>
        <Billboard x={1230} y={760} w={1060} h={520} o={on(f, q.ask, 10)}>
          <Label x={0} y={-440} text="ASK YOURSELF" size={56} font="Bebas Neue" color={NEON} />
          {qs.map(([at, t], k) => <g key={k} opacity={on(f, at, 8)} transform={`translate(0 ${-8 * pop(f, at, 12)})`}><Label x={-460} y={-320 + k * 130} text={`${k + 1}.`} size={62} anchor="start" font="Bebas Neue" color={AMBER} />
            <Label x={-390} y={-320 + k * 130} text={t} size={58} anchor="start" font="Bebas Neue" color="#E8E6FF" /><Tick x={440} y={-340 + k * 130} o={on(f, at + 30, 8)} r={30} /></g>)}
        </Billboard>
        <g opacity={on(f, q.knowing, 10)}><Label x={1230} y={1020} text="KNOW WHAT YOU OWN, AND WHY" size={50} font="Bebas Neue" color={AMBER} /></g>
      </g>}
      {/* # D) close card */}
      {D > 0 && <g opacity={D}>
        <Sky id="nvp-sky4" top="#07061A" bottom="#1E1A48" glow={NEON} gx={960} gy={560} f={f} />
        <rect x={460} y={420} width={1000} height={240} rx={30} fill="#141230" stroke={NEON} strokeWidth={5} />
        <Label x={960} y={530} text="HOW THE MONEY WORKS" size={84} font="Bebas Neue" color="#E8E6FF" />
        <Label x={960} y={610} text="NOT INVESTMENT ADVICE" size={50} font="Bebas Neue" color="#C9C6F0" o={on(f, q.advice - 10, 8)} />
      </g>}
      <Headline f={f} lines={[[q.put73, 'PUTTING IT TOGETHER', '#E8E6FF', 106], [q.lesson, 'PRICES MOVE ON EXPECTATIONS', '#E8E6FF', 96], [q.next79, 'NEXT TIME IT’S ALL RED', RED, 104]]} until={CD} />
      <Vignette id="nv-payoff" />
    </g>
  )
}

export const NV_PAYOFF = makePiece('nv-payoff', 'Payoff at dawn over chip city: four recap panels light along a glowing circuit road — a ballot (an election raised fears), a cracking chip (Nvidia -$440B in a day), a giant tower dragging small towers down (it dragged the index), a rising line with a small dark cloud (bounce, except Nvidia); an EXPECTATIONS balloon drifting on a string above a PRICE tag (expectations can change overnight); Mia with a red phone beside a lit billboard asking 1. what actually changed? 2. whole market, or one industry? 3. do I need this money soon? with ticks; closing card HOW THE MONEY WORKS · NOT INVESTMENT ADVICE', {
  mood: 'dark', Component: Payoff, beats: Object.values(K),
  sfx: [['s74:election', 'pop', 0.2], ['s75:440', 'thud', 0.2], ['s76:dragged', 'thud', 0.2], ['s77:bounced', 'riser', 0.2], ['s78:overnight', 'whoosh', 0.2], ['s80:what', 'tick', 0.2], ['s80:industry', 'tick', 0.2], ['s80:soon', 'tick', 0.2]] })
