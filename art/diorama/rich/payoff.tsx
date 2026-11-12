// ---------------------------------------------------------------- s78–s86: the payoff, the whole trail at sunset.
// The ten-flag trail from the hook climbs the mountain again. As each group of ways is said, its legs light up with the
// way Leo travels there: on foot with his backpack (KEEP MORE, 1–2), on the bike (EARN MORE, 3–5), on the train (OWN MORE,
// 6–9), and the rocket at the summit (BET BIG, 10). Then under every flag a drop line hangs down, longer at each step up:
// faster, and a further fall. Leo stands at flag 1 and starts the climb from the bottom. Coins multiply along the trail
// while a risk dial turns. The last line holds the calm trail.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { PosterWorld, Vig, Ticket, Pack, Bike, Train, Rocket, Coin, Life, TXT, CREAM, ORANGE, RED, GOLD, MINT, INK, DEEP, TEAL } from './kit'
import { TRAIL } from './hook'

const trailD = 'M120 960 ' + TRAIL.map(([x, y]) => `L${x} ${y}`).join(' ') + ' L1760 320'
const COL = [MINT, MINT, GOLD, GOLD, GOLD, ORANGE, ORANGE, ORANGE, ORANGE, RED]

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const order = c('s78:order')
  const one = c('s79:one'), keep = c('s79:keep'), card = c('s79:card'), match = c('s79:match')
  const three = c('s80:three'), earn = c('s80:earn'), job = c('s80:job'), skill = c('s80:skill'), side = c('s80:side')
  const six = c('s81:six'), own = c('s81:own'), index = c('s81:index'), property = c('s81:property'), business = c('s81:business'), runs = c('s81:runs')
  const ten = c('s82:ten'), bets = c('s82:bets')
  const pattern = c('s83:pattern'), faster = c('s83:faster'), fall = c('s83:fall'), further = c('s83:further')
  const safest = c('s84:safest'), bottom = c('s84:bottom'), top = c('s84:top')
  const trick = c('s85:trick'), multiplies = c('s85:multiplies'), choosing = c('s85:choosing'), risk = c('s85:risk')
  const works = c('s86:works')

  const groupAt = [one, one, three, three, three, six, six, six, six, ten]
  const leo: Beat[] = [[order, 'present', 'smiling'], [pattern, 'think', 'thinking'], [safest, 'point', 'smiling'], [bottom, 'walkA', 'smiling', 'walkB', 12], [trick, 'idle', 'smiling'], [choosing, 'confident', 'smiling'], [works, 'thumbsUp', 'smiling']]
  const climb = on(f, bottom, 90)
  const lx = lerp(140, 300, climb), ly = lerp(955, 905, climb)
  const drops = win(f, faster, safest + 20, 10)
  const tags = win(f, one, pattern - 6, 10)
  const dial = lerp(-60, 60, (Math.sin(f / 40) + 1) / 2)

  return (
    <g>
      <PosterWorld f={f} id="rh-payoff" tone="sunset" sunX={1500} sunY={460} />
      <path d={trailD} stroke="rgba(30,20,30,0.22)" strokeWidth={40} fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(6 10)" />
      <path d={trailD} stroke={CREAM} strokeWidth={34} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* the ten flags; each lights when its group is said */}
      {TRAIL.map(([x, y], k) => { const lit = on(f, groupAt[k], 10)
        return <g key={k} transform={`translate(${x} ${y - 20})`} opacity={0.45 + 0.55 * lit}>
          <rect x={-3} y={-90} width={6} height={90} fill={INK} /><path d="M3 -90 L64 -72 L3 -54 Z" fill={COL[k]} />
          <circle cx={0} cy={-120} r={26} fill={CREAM} /><text y={-108} textAnchor="middle" fill={INK} style={TXT(36)}>{k + 1}</text>
          {/* the fall line: longer at each step up */}
          <g opacity={drops}><line x1={0} y1={30} x2={0} y2={30 + (12 + 14 * k) * on(f, fall + k * 2, 10)} stroke={RED} strokeWidth={8} strokeLinecap="round" strokeDasharray="14 10" /></g>
        </g> })}
      {/* how Leo travels on each leg */}
      <g opacity={tags}>
        <g opacity={on(f, keep, 8)}><Pack x={420} y={1000} s={0.42} patch={1} /><Ticket x={300} y={560} t={f >= match ? 'KEEP MORE: NO 22% CARD · +50% MATCH' : f >= card ? 'KEEP MORE: NO 22% CARD' : 'KEEP MORE'} size={30} col={MINT} tc={CREAM} /></g>
        <g opacity={on(f, earn, 8)}><Bike x={820} y={880} s={0.38} spin={f * 6} /><Ticket x={620} y={440} t={f >= side ? 'EARN MORE: JOB · SKILL · SIDE' : f >= skill ? 'EARN MORE: JOB · SKILL' : f >= job ? 'EARN MORE: JOB' : 'EARN MORE'} size={34} col={GOLD} /></g>
        <g opacity={on(f, own, 8)}><Train x={1160} y={780} s={0.3} cars={2} /><Ticket x={980} y={300} t={f >= runs ? 'OWN MORE: FUNDS · PROPERTY · BUSINESS' : f >= business ? 'OWN MORE: FUNDS · PROPERTY · BUSINESS' : f >= property ? 'OWN MORE: FUNDS · PROPERTY' : f >= index ? 'OWN MORE: FUNDS' : 'OWN MORE'} size={34} col={ORANGE} tc={CREAM} /></g>
        <g opacity={on(f, ten, 8)}><Rocket x={1840} y={290} s={0.5} f={f} flame={on(f, bets, 8)} /><Ticket x={1800} y={400} t="BET BIG" size={36} col={RED} tc={CREAM} /></g>
      </g>
      <g opacity={win(f, faster, safest, 8)}><Ticket x={1460} y={880} t={f >= further ? 'FASTER, AND A FURTHER FALL' : 'EACH STEP UP: FASTER'} size={44} col={CREAM} /></g>
      {/* Leo at the foot of the trail; he starts the climb from the bottom */}
      <Person f={f} who="worker" beats={leo} x={lx} y={ly + 40} s={0.5} />
      <g opacity={win(f, safest, trick, 8)}><Ticket x={760} y={1010} t="START AT THE BOTTOM" size={44} col={MINT} tc={CREAM} /></g>
      <g opacity={win(f, top, trick, 8)}><Ticket x={1460} y={880} t="NOT AT THE TOP" size={44} col={RED} tc={CREAM} /></g>
      {/* money that multiplies, and how much risk you carry */}
      <g opacity={on(f, multiplies, 10)}>{Array.from({ length: 8 }, (_, i) => { const t = on(f, multiplies + i * 3, 14); return <Coin key={i} x={TRAIL[i + 2][0]} y={TRAIL[i + 2][1] - 205 - 10 * Math.sin(f / 8 + i)} s={0.4 + 0.5 * t} o={t} /> })}</g>
      <g opacity={on(f, choosing, 10)} transform={`translate(1500 900) scale(${pop(f, choosing, 12)})`}>
        <path d="M-120 0 A120 120 0 0 1 120 0 Z" fill={CREAM} /><path d="M-120 0 A120 120 0 0 1 -42 -112 L0 0 Z" fill={MINT} /><path d="M42 -112 A120 120 0 0 1 120 0 L0 0 Z" fill={RED} />
        <line x1={0} y1={0} x2={100 * Math.sin(dial * Math.PI / 180)} y2={-100 * Math.cos(dial * Math.PI / 180)} stroke={INK} strokeWidth={10} strokeLinecap="round" /><circle r={14} fill={INK} />
        <g opacity={on(f, risk, 8)}><text y={60} textAnchor="middle" fill={CREAM} style={TXT(46)}>YOUR RISK</text></g>
      </g>
      {/* # life:begin */}
      <g>
        <Life f={f} at={c('s78:ways')} x={760} y={660} kind="glint" />
        <Life f={f} at={c("s79:22")} x={760} y={660} kind="glint" />
        <Life f={f} at={c("s85:fast")} x={1500} y={860} kind="glint" />
        <Life f={f} at={c("s86:this")} x={1500} y={860} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="rh-payoff" />
      <Headline f={f} lines={[[order, 'TEN WAYS, IN ORDER', CREAM, 88], [pattern, 'THE PATTERN', CREAM, 92], [trick, 'MONEY THAT MULTIPLIES', CREAM, 88]]} />
    </g>
  )
}

export const RH_PAYOFF = makePiece('rh-payoff', 'Payoff at sunset: the cream ten-flag trail climbs the mountain again (TEN WAYS, IN ORDER); each group of flags lights as it is said with how Leo travels there — his patched backpack (KEEP MORE: NO 22% CARD · +50% MATCH), his bicycle (EARN MORE: JOB · SKILL · SIDE), the poster train (OWN MORE: FUNDS · PROPERTY · BUSINESS) and a rocket lighting at the summit (BET BIG); dashed red drop lines hang under every flag, longer at each step up (EACH STEP UP: FASTER, AND A FURTHER FALL); Leo walks from the foot of the trail to flag 1 (START AT THE BOTTOM, NOT AT THE TOP); coins grow along the trail (MONEY THAT MULTIPLIES) and a dial swings between green and red: YOUR RISK.', {
  mood: 'light', Component: Payoff,
  beats: ["s78:order", "s79:one", "s79:keep", "s79:card", "s79:match", "s80:three", "s80:earn", "s80:job", "s80:skill", "s80:side", "s81:six", "s81:own", "s81:index", "s81:property", "s81:business", "s81:runs", "s82:ten", "s82:bets", "s83:pattern", "s83:faster", "s83:fall", "s83:further", "s84:safest", "s84:bottom", "s84:top", "s85:trick", "s85:multiplies", "s85:choosing", "s85:risk", "s86:works", "s78:ways", "s79:22", "s85:fast", "s86:this"],
  sfx: [['s79:one', 'pop', 0.08], ['s80:three', 'pop', 0.08], ['s81:six', 'pop', 0.08], ['s82:ten', 'whoosh', 0.1]] })
