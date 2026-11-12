// ---------------------------------------------------------------- s65–s71: way 9, own the business, not the job (dusk).
// Two poster columns of "everything they own" stand on two plinths, each 100% tall and split to scale:
// RICHEST 1% — 68% stocks, funds and private businesses (a factory, a share certificate, a little shop drawn in the block);
// BOTTOM HALF — 68% their homes, cars and other belongings (a house, a car and a sofa drawn in the block).
// Then three things in a row: a car whose price tag shrinks, a home with a coin dripping out (upkeep), and a business
// that pays coins to its owner and gets a SOLD stamp. A manager and gears keep it running; a buyer walks up with a case.
// Last: a rocket appears on the dark horizon — the one faster way.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { PosterWorld, Vig, Ticket, WayBadge, Home, Coin, Building, Rocket, Life, TXT, CREAM, ORANGE, RED, GOLD, GOLD2, MINT, INK, DEEP, TEAL, SAND, PLUM, RUST } from './kit'

const GY = 960, HT = 560                               // column height = 100% of what they own

const Factory: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-70 0 L-70 -60 L-30 -90 L-30 -60 L10 -90 L10 -60 L50 -90 L50 0 Z" fill={CREAM} /><rect x={30} y={-140} width={18} height={60} fill={CREAM} />
    {[-50, -10, 30].map((wx) => <rect key={wx} x={wx - 8} y={-40} width={16} height={18} fill={DEEP} />)}
  </g>
)
const MiniCar: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-80 -16 L-66 -46 L-20 -60 L36 -60 L66 -36 L84 -30 L84 -16 Z" fill={CREAM} />
    <circle cx={-46} cy={-12} r={16} fill={INK} /><circle cx={50} cy={-12} r={16} fill={INK} />
  </g>
)

const Column: React.FC<{ x: number; f: number; at: number; share: number; col: string; rest: string; title: string; o: number; kind: 'rich' | 'half'; tAt: number }> = ({ x, f, at, share, col, rest, title, o, kind, tAt }) => {
  const g = on(f, at, 24), hb = HT * share * g
  return (
    <g opacity={o} transform={`translate(${x} 0)`}>
      <rect x={-170} y={GY - 20} width={340} height={30} rx={8} fill={DEEP} />
      <rect x={-140 + 10} y={GY - 20 - HT + 12} width={280} height={HT} fill="rgba(30,20,30,0.22)" />
      <rect x={-140} y={GY - 20 - HT} width={280} height={HT} fill={rest} />
      <rect x={-140} y={GY - 20 - hb} width={280} height={hb} fill={col} />
      {g > 0.6 && <g opacity={(g - 0.6) * 2.5}>{kind === 'rich'
        ? <g><Factory x={-50} y={GY - 120} s={1.1} /><g transform={`translate(60 ${GY - 250})`}><rect x={-46} y={-60} width={92} height={120} rx={6} fill={CREAM} /><path d="M-30 20 L-10 0 L10 10 L32 -24" stroke={MINT} strokeWidth={8} fill="none" /></g></g>
        : <g><Home x={-40} y={GY - 60} s={0.36} /><MiniCar x={60} y={GY - 230} s={1} /><g transform={`translate(-30 ${GY - 320})`}><rect x={-60} y={-30} width={120} height={40} rx={10} fill={CREAM} /><rect x={-66} y={-60} width={24} height={70} rx={8} fill={CREAM} /><rect x={42} y={-60} width={24} height={70} rx={8} fill={CREAM} /></g></g>}</g>}
      <text x={220} y={GY - 20 - hb / 2 + 26} textAnchor="middle" fill={col} style={TXT(84)} opacity={on(f, at + 10, 8)}>68%</text>
      <text y={GY + 56} textAnchor="middle" fill={CREAM} style={TXT(48)} opacity={on(f, tAt, 8)}>{title}</text>
    </g>
  )
}

const Own: React.FC<PieceProps> = ({ f, c }) => {
  const own = c('s65:own'), job = c('s65:job')
  const fortunes = c('s66:fortunes'), sit = c('s66:sit')
  const mid = c('s67:mid'), richest = c('s67:richest'), d68 = c('s67:68'), stocks = c('s67:stocks'), businesses = c('s67:businesses')
  const bottom = c('s68:bottom'), d68b = c('s68:68'), homes = c('s68:homes'), cars = c('s68:cars'), belongings = c('s68:belongings')
  const car = c('s69:car'), loses = c('s69:loses'), home = c('s69:home'), keep = c('s69:keep'), business = c('s69:business'), pay = c('s69:pay'), sold = c('s69:sold')
  const hire = c('s70:hire'), managers = c('s70:managers'), systems = c('s70:systems'), without = c('s70:without'), buyer = c('s70:buyer')
  const faster = c('s71:faster'), skips = c('s71:skips'), bets = c('s71:bets'), thing = c('s71:thing')

  const leo: Beat[] = [[own, 'confident', 'smiling'], [richest, 'lookFar', 'thinking'], [bottom, 'think', 'thinking'], [car, 'explain', 'neutral'], [pay, 'receive', 'smiling'], [hire, 'handshake', 'smiling'], [buyer, 'present', 'smiling'], [faster, 'lookFar', 'thinking']]
  const A = 1 - on(f, car - 10, 8), B = win(f, car - 2, faster - 2, 8), Cc = on(f, faster - 2, 8)
  const tag = 1 - 0.45 * on(f, loses, 30)

  return (
    <g>
      <PosterWorld f={f} id="rh-own" tone="sunset" sunX={960} sunY={560} />
      <g opacity={on(f, c('s65:number') - 4, 10)}><WayBadge x={200} y={320} n={9} s={pop(f, c('s65:number'), 12)} col={ORANGE} /></g>
      {/* # A) what the richest 1% and the bottom half hold */}
      {A > 0.001 && <g opacity={A}>
        <g opacity={win(f, fortunes, stocks, 8)}><Ticket x={960} y={330} t="WHERE BIG FORTUNES SIT" size={54} col={CREAM} /></g>
        <Column x={620} f={f} at={d68} share={0.68} col={GOLD} rest="#7E6B8E" title="RICHEST 1%" o={on(f, fortunes, 10)} kind="rich" tAt={richest} />
        <Column x={1300} f={f} at={d68b} share={0.68} col={ORANGE} rest="#7E6B8E" title="BOTTOM HALF" o={on(f, fortunes + 6, 10)} kind="half" tAt={bottom} />
        <g opacity={on(f, stocks, 8)}><Ticket x={620} y={330} t={f >= businesses ? 'STOCKS, FUNDS, BUSINESSES' : 'STOCKS, FUNDS'} size={42} col={GOLD} /></g>
        <g opacity={on(f, homes, 8)}><Ticket x={1300} y={330} t={f >= belongings ? 'HOMES, CARS, BELONGINGS' : f >= cars ? 'HOMES, CARS' : 'HOMES'} size={42} col={ORANGE} tc={CREAM} /></g>
        <g opacity={on(f, mid, 8)}><text x={960} y={1064} textAnchor="middle" fill={CREAM} style={TXT(30)}>SHARE OF EVERYTHING THEY OWN · MID 2026 · FEDERAL RESERVE</text></g>
      </g>}
      {/* # B) a car loses value, a home costs to keep, a business pays its owner and can be sold */}
      {B > 0.001 && <g opacity={B}>
        <g opacity={on(f, car, 8)} transform={`translate(420 ${GY})`}>
          <ellipse cx={10} cy={6} rx={180} ry={16} fill="rgba(30,20,30,0.22)" />
          <MiniCar x={0} y={0} s={2} />
          <g transform={`translate(0 -230) scale(${1.4 * tag})`}><rect x={-90} y={-36} width={180} height={64} rx={10} fill={CREAM} /><text y={14} textAnchor="middle" fill={RED} style={TXT(44)}>VALUE ↓</text></g>
        </g>
        <g opacity={on(f, home, 8)}>
          <Home x={960} y={GY} s={0.8} />
          {f >= keep && [0, 1].map((k) => { const p = ((f - keep + k * 15) % 30) / 30; return <Coin key={k} x={1080} y={GY - 40 + 90 * p} s={0.55} o={1 - p} /> })}
          <g opacity={on(f, keep, 8)}><Ticket x={960} y={600} t="COSTS TO KEEP" size={40} col={CREAM} /></g>
        </g>
        <g opacity={on(f, business, 8)}>
          <Building x={1520} y={GY} w={300} h={360} col={SAND} sign="BUSINESS" s={1 + 0.06 * on(f, systems, 12)} />
          {f >= pay && [0, 1, 2].map((k) => { const p = ((f - pay + k * 10) % 30) / 30; return <Coin key={k} x={lerp(1480, 1240, p)} y={GY - 160 - 80 * Math.sin(Math.PI * p)} s={0.6} o={(1 - on(f, hire, 10))} /> })}
          <g opacity={on(f, sold, 8)} transform={`translate(1520 ${GY - 220}) rotate(-10) scale(${pop(f, sold, 12)})`}><rect x={-120} y={-44} width={240} height={88} rx={10} fill="none" stroke={RED} strokeWidth={10} /><text y={22} textAnchor="middle" fill={RED} style={TXT(70)}>SOLD</text></g>
          {/* gears = systems, then a buyer with a case */}
          <g opacity={on(f, systems, 8)}>{[0, 1].map((k) => <g key={k} transform={`translate(${1440 + k * 80} ${GY - 580}) rotate(${(k ? -1 : 1) * f * 2})`}>{Array.from({ length: 8 }, (_, i) => <rect key={i} x={-8} y={-44} width={16} height={18} fill={DEEP} transform={`rotate(${i * 45})`} />)}<circle r={32} fill={DEEP} /><circle r={12} fill={SAND} /></g>)}</g>
        </g>
        <g opacity={on(f, managers, 8)}><Person f={f} who="investorF" beats={[[managers, 'explain', 'smiling'], [without, 'thumbsUp', 'smiling']]} x={1260} y={GY + 40} s={0.58} /></g>
        <g opacity={on(f, buyer, 8)}><Person f={f} who="investor" beats={[[buyer, 'offer', 'smiling']]} x={1780} y={GY + 40} s={0.58} flip /></g>
        <Person f={f} who="worker" beats={leo} x={160} y={GY + 40} s={0.66} />
      </g>}
      {/* # C) one faster way: a rocket on the dark horizon */}
      {Cc > 0.001 && <g opacity={Cc}>
        <rect x={-40} y={-40} width={2000} height={1160} fill="#141B33" opacity={0.45 * on(f, faster, 30)} />
        <g transform={`translate(1240 ${GY - 40})`}>
          <rect x={-120} y={-10} width={240} height={50} fill={DEEP} />
          <Rocket x={0} y={0} s={1.3} f={f} flame={on(f, bets, 10) * 0.5} />
        </g>
        <g opacity={on(f, skips, 8)}><Ticket x={1240} y={360} t={f >= thing ? 'BET BIG ON ONE THING' : 'SKIP THE SLOW BUILDING'} size={52} col={RED} tc={CREAM} /></g>
        <Person f={f} who="worker" beats={leo} x={560} y={GY + 40} s={0.78} />
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={job} x={960} y={420} kind="glint" />
        <Life f={f} at={sit} x={960} y={420} kind="glint" />
        <Life f={f} at={without} x={1520} y={500} kind="spark" />
        <Life f={f} at={c("s67:they")} x={960} y={420} kind="glint" />
        <Life f={f} at={c("s69:year")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s71:but")} x={1240} y={600} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="rh-own" />
      <Headline f={f} lines={[[own, 'OWN THE BUSINESS, NOT THE JOB', CREAM, 84], [faster, 'ONE WAY IS FASTER STILL', CREAM, 88]]} />
    </g>
  )
}

export const RH_OWN = makePiece('rh-own', 'Way 9 at sunset: OWN THE BUSINESS, NOT THE JOB — WHERE BIG FORTUNES SIT; two tall columns of everything they own, split to scale: RICHEST 1% with a gold 68% block holding a factory, a rising share certificate and a shop (STOCKS, FUNDS, BUSINESSES) and BOTTOM HALF with an orange 68% block holding a house, a car and a sofa (HOMES, CARS, BELONGINGS) — SHARE OF EVERYTHING THEY OWN · MID 2026 · FED; then a car whose VALUE ↓ tag shrinks, a home that drips coins (COSTS TO KEEP) and a BUSINESS that sends coins to its owner and gets a red SOLD stamp, while turning gears and a manager keep it running and a buyer with a briefcase walks up; finally the sky darkens and a rocket on a launch pad lights its flame: SKIP THE SLOW BUILDING · BET BIG ON ONE THING.', {
  mood: 'light', Component: Own,
  beats: ["s65:own", "s65:job", "s66:fortunes", "s66:sit", "s67:mid", "s67:richest", "s67:68", "s67:stocks", "s67:businesses", "s68:bottom", "s68:68", "s68:homes", "s68:cars", "s68:belongings", "s69:car", "s69:loses", "s69:home", "s69:keep", "s69:business", "s69:pay", "s69:sold", "s70:hire", "s70:managers", "s70:systems", "s70:without", "s70:buyer", "s71:faster", "s71:skips", "s71:bets", "s71:thing", "s65:number", "s67:they", "s69:year", "s71:but"],
  sfx: [['s67:68', 'pop', 0.08], ['s68:68', 'pop', 0.08], ['s69:sold', 'impact', 0.1]] })
