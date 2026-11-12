// ---------------------------------------------------------------- s1–s7: the Strip at night, then one roulette table.
// Casino towers light up one by one along the Strip; players' coins arc from the street into the towers ($8.8 billion
// kept). The camera flies through the middle casino's doors to a roulette table: most players' stacks grow ("ahead")
// while the house tray behind the dealer still fills. The ball circles fairly (not luck), the dealer shows open hands
// (not cheating); the camera dives to the two green pockets (one tiny number) and a chip loops the table again and
// again. A $100 bill appears; part of it slides to the house tray; a player's stack rises early, then shrinks.
import React from 'react'
import { easeInOut, lerp, on, P, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, camera, Headline, Person, Coin, fly } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { CasinoTower, Chip, CHIP, loopPoint, SplitBill, Stack, Table, Tray, Wheel } from './kit'

const TOWERS: [number, number, number, string, string][] = [[250, 230, 430, 'ACE', P.sky], [540, 250, 520, 'ORBIT', P.coral], [860, 290, 600, 'CROWN', P.gold], [1180, 250, 540, 'PALM', P.mint], [1470, 230, 470, 'STAR', '#E8B4C8'], [1730, 200, 400, 'LUCKY', P.sky]]

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const s1 = c('s1'), casinos = c('s1:casinos'), strip = c('s1:strip'), kept = c('s1:kept'), b88 = c('s1:88'), players = c('s1:players'), money = c('s1:money')
  const strange = c('s2:strange'), maths = c('s3:maths'), most = c('s3:most'), roulette = c('s3:roulette'), players3 = c('s3:players'), ahead = c('s3:ahead'), night = c('s3:night')
  const casino4 = c('s4:casino'), how4 = c('s4:how'), billions = c('s4:billions'), people = c('s4:people'), winning = c('s4:winning'), way6 = c('s6:way'), tiny2 = c('s6:tiny#2')
  const luck = c('s5:luck'), cheating = c('s5:cheating')
  const tiny = c('s6:tiny'), number = c('s6:number'), way = c('s6:way'), used = c('s6:used'), again = c('s6:again'), again2 = c('s6:again#2')
  const end7 = c('s7:end'), see7 = c('s7:see'), hundred = c('s7:hundred'), expects = c('s7:expects'), keep = c('s7:keep'), winning7 = c('s7:winning'), protect = c('s7:protect')
  // # the inside (roulette table) replaces the street when the camera flies through the doors on "strange"
  const inside = on(f, strange + 10, 10)
  // # the table layout: wheel right, felt centre, dealer + house tray behind, four players behind the far rail
  const WX = 1480, WY = 690, TX = 860, TY = 640
  const P1: [number, string][] = [[420, 'buyer'], [640, 'investor'], [860, 'hero'], [1080, 'worker']]
  const winners = [0, 1, 2]
  const stackN = (k: number) => {
    const base = 4 + (f >= way6 ? 1 : 0), up = winners.includes(k) ? Math.round(5 * on(f, ahead, 20)) : 0
    const down = k === 1 ? Math.round(6 * on(f, protect, 24)) : 0
    const early = k === 1 ? Math.round(3 * on(f, winning7, 14)) : 0
    return Math.max(1, base + up + early - down)
  }
  const face = (k: number): Beat[] => [[0, 'idle', 'neutral'], [ahead + k * 3, winners.includes(k) ? (k === 1 ? 'fistPump' : 'celebrate') : 'think', winners.includes(k) ? 'smiling' : 'thinking'], [people, winners.includes(k) ? 'clapA' : 'idle', winners.includes(k) ? 'smiling' : 'neutral', winners.includes(k) ? 'clapB' : undefined, 8], [winning, winners.includes(k) ? 'thumbsUp' : 'shrug', winners.includes(k) ? 'smiling' : 'thinking'],
    ...(k === 1 ? [[end7, 'lookFar', 'thinking'], [see7, 'point', 'smiling'], [hundred, 'holdUp', 'smiling'], [winning7, 'fistPump', 'smiling'], [protect, 'despair', 'worried']] as Beat[] : [])]
  // # the wheel: spins slowly; the ball rides the rim on "luck", the camera goes to the green pockets on "tiny"
  const rot = f * 0.6, ballA = f >= luck ? -90 + (f - luck) * 9 : undefined
  return (
    <g>
      <Stage id="cs-hook" frame={f} />
      <Headline f={f} lines={[[b88, '$8.8 BILLION KEPT', P.goldInk, 120], [strange, '', P.ink], [ahead, 'MOST ARE AHEAD AT SOME POINT', P.mintInk, 100], [billions, 'YET THE HOUSE MAKES BILLIONS', P.goldInk, 104], [tiny, 'ONE TINY NUMBER', P.ink, 112], [used, 'USED AGAIN AND AGAIN', P.ink, 104], [hundred, 'OUT OF $100…', P.ink, 104], [winning7, 'WINNING EARLY…', P.mintInk, 104], [protect, '…DOES NOT PROTECT YOU', P.coralInk, 104]]} />
      {/* # 1) the Strip */}
      {inside < 1 && <g opacity={1 - inside} transform={camera(f, [[0, 960, 600, 1], [strange, 860, 820, 1.25], [strange + 8, 860, 860, 3.2]], 16)}>
        <rect x={-200} y={860} width={2400} height={400} fill={P.navy1} />
        <rect x={-200} y={860} width={2400} height={10} fill={P.gold} opacity={0.25} />
        {TOWERS.map(([x, w, h, sign, col], k) => <CasinoTower key={sign} x={x} y={860} w={w} h={h} sign={sign} color={col} lit={on(f, casinos + k * 5, 10)} seed={k + 1} f={f} />)}
        {/* # the street crowd: players with coins; on "kept" the coins arc into the towers */}
        {Array.from({ length: 14 }, (_, k) => <Mini key={k} look={['buyer', 'investor', 'hero', 'owner', 'worker'][k % 5]} x={120 + k * 128} y={1000} scale={0.62} frame={f} seed={k + 3} mood={f >= money ? 'neutral' : 'happy'} />)}
        {Array.from({ length: 24 }, (_, k) => {
          const t0 = kept + k * 3, src: [number, number] = [120 + (k % 14) * 128, 880], dst: [number, number] = [TOWERS[k % 6][0], 820]
          const p = fly(f, t0, src, dst, 22, 160)
          return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.5} o={p.o} /> : null
        })}
        {/* # coins collect as a glowing pile in front of each tower on "players' money" */}
        {TOWERS.map(([x], k) => <ellipse key={k} cx={x} cy={850} rx={60 * on(f, players + k * 2, 14)} ry={14 * on(f, players + k * 2, 14)} fill={P.gold} opacity={0.8} />)}
        <g opacity={on(f, strip, 10)}><text x={960} y={1060} textAnchor="middle" fill={P.ink} opacity={0.75} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 8 }}>LAS VEGAS STRIP · 2024</text></g>
      </g>}
      {/* # 2) inside: the roulette table */}
      {inside > 0 && <g opacity={inside} transform={camera(f, [[0, 960, 600, 1], [tiny, WX, WY - 20, 1.9], [way, 900, 640, 1], [hundred, 960, 600, 1]], 18)}>
        <rect x={-200} y={-200} width={2400} height={1500} fill={P.teal0} opacity={0.35} />
        {/* # chandelier glow */}
        {[480, 960, 1440].map((x) => <g key={x}><line x1={x} y1={-40} x2={x} y2={250} stroke={P.goldD} strokeWidth={4} opacity={0.6} /><circle cx={x} cy={262} r={22} fill={P.gold} opacity={0.5 + 0.5 * on(f, night, 12)} /><ellipse cx={x} cy={280} rx={140 * (0.6 + 0.4 * on(f, night, 12))} ry={60} fill={P.gold} opacity={0.08 + 0.08 * on(f, night, 12)} /></g>)}
        {/* # the dealer and the house tray behind the table */}
        <g opacity={on(f, maths, 10)}><Person f={f} who="owner" beats={[[0, 'idle', 'neutral'], [how4, 'think', 'thinking'], [luck, 'present', 'neutral'], [cheating, 'emptyPockets', 'smiling'], [tiny, 'point', 'neutral'], [hundred, 'idle', 'neutral']]} x={1220} y={830} s={0.78} /></g>
        {P1.map(([x, who], k) => <g key={k} opacity={on(f, players3 + k * 4, 8)}><Person f={f} who={who} beats={face(k)} x={x} y={840} s={0.72} /></g>)}
        <g opacity={on(f, maths, 10)}><Table x={TX} y={TY} w={1180} d={300} /></g>
        <Tray o={on(f, maths, 10)} x={1240} y={TY + 215} fill={lerp(0.15, 0.4, on(f, casino4, 14)) + 0.5 * on(f, billions, 20) + 0.1 * on(f, keep, 12)} s={0.55} />
        <Wheel cx={WX} cy={WY} r={150 * on(f, roulette, 12)} rot={rot} ballA={ballA} glowGreen={on(f, tiny, 10) * (0.6 + 0.4 * Math.sin(f / 5)) + 0.6 * on(f, tiny2, 8) * (1 - on(f, used, 10))} numbers={false} />
        {/* # each player's chip stack on the felt */}
        {P1.map(([x], k) => <g key={k} opacity={on(f, maths, 10)}><Stack x={x} y={TY + 110} n={stackN(k)} s={0.7} color={[CHIP.red, CHIP.blue, CHIP.green, CHIP.black][k]} /></g>)}
        {/* # "again and again": one chip loops the table on each "again" */}
        {f >= used && f < hundred && (() => { const u = ((f - used) / 26) % 1, p = loopPoint(TX + 40, TY + 140, 560, 90, u); return <Chip x={p.x} y={p.y} s={0.8} color={CHIP.gold} /> })()}
        {[used, again, again2].map((a, k) => <ellipse key={k} cx={TX + 40} cy={TY + 140} rx={560} ry={90} fill="none" stroke={P.gold} strokeWidth={5} strokeDasharray="6 16" opacity={on(f, a, 8) * (1 - on(f, hundred, 10)) * 0.6} />)}
        {/* # the $100: held up by the investor; on "keep" a slice slides to the house tray */}
        <g opacity={on(f, hundred, 8) * (1 - on(f, winning7, 10))}><SplitBill x={640} y={420} s={0.55} lost={0.35} t={easeInOut(span(f, expects, keep + 12))} dx={1100} dy={760} /></g>
      </g>}
      <Vignette id="cs-hook" />
    </g>
  )
}

const BEATS = ['s3:night', 's4:how', 's4:people', 's4:winning', 's6:way', 's6:tiny#2', 's3:maths', 's3:roulette', 's3:players', 's7:end', 's7:see', 's1', 's1:casinos', 's1:strip', 's1:kept', 's1:88', 's1:money', 's2:strange', 's3:ahead', 's4:casino', 's4:billions', 's5:luck', 's5:cheating', 's6:tiny', 's6:used', 's6:again', 's6:again#2', 's7:hundred', 's7:keep', 's7:winning', 's7:protect']
export const CS_HOOK = makePiece('cs-hook', 'Casino long: the Strip lights up and keeps $8.8bn; inside, most players are ahead while the house tray still fills; green pockets; a chip loops again and again; $100 split; early win then loss', {
  mood: 'dark', Component: Hook, beats: BEATS,
  sfx: [['s1:casinos', 'chime', 0.35], ['s1:kept', 'coin', 0.45], ['s2:strange', 'whoosh', 0.4], ['s3:ahead', 'cash', 0.4], ['s4:billions', 'coin', 0.4], ['s6:tiny', 'ding', 0.35], ['s6:used', 'swish', 0.3], ['s7:keep', 'swish', 0.35], ['s7:protect', 'thud', 0.4]] })
