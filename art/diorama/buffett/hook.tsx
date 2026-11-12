// ---------------------------------------------------------------- s1–s10: the hook (casino-style rebuild).
// One stormy Wall Street that stays on screen: three big banks, rain, a crowd that panics and runs. Lightning on
// "panic"; the crowd turns sad and the banks crack on "fear… nobody knew". Buffett walks in against the crowd and
// a big cheque sails into Goldman Sachs. Then the street slides: Buffett beside Goldman as notes stream back into a
// growing tower ($5.5B) and 10% coins rain in yearly; Bank of America rolls in, a cheque flies to it and a tower
// climbs from $5B to $20.7B. Last, the crowd flees both ways while Buffett alone walks up the bank steps.
import React from 'react'
import { easeInOut, lerp, on, P, pop, rnd, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, Coin, Headline, Person, fly, win } from '../aimoney/common'
import { Mini } from '../../rig/Mini'
import { Note } from '../gift/kit'
import { Bank, Cheque, Storm } from './kit'

// # Buffett: the investor in a suit with a small name plate
export const Buffett: React.FC<{ f: number; beats: Beat[]; x: number; y?: number; s?: number; flip?: boolean; plate?: number }> = ({ f, beats, x, y = 1000, s = 1, flip, plate = 1 }) => (
  <g>
    <Person f={f} who="investor" beats={beats} x={x} y={y} s={s} flip={flip} />
    {plate > 0 && <g opacity={plate} transform={`translate(${x} ${y + 40 * s})`}><rect x={-120} y={-26} width={240} height={52} rx={12} fill={P.navy2} /><text x={0} y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 38px "Bebas Neue"', letterSpacing: 3 }}>WARREN BUFFETT</text></g>}
  </g>
)
export const CoinTower: React.FC<{ x: number; y: number; n: number; s?: number; label?: string; color?: string }> = ({ x, y, n, s = 1, label, color = P.gold }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: Math.max(0, Math.round(n)) }, (_, i) => <g key={i}><ellipse cx={0} cy={-i * 26 + 8} rx={100} ry={24} fill={P.goldD} /><ellipse cx={0} cy={-i * 26} rx={100} ry={24} fill={color} /></g>)}
    {label && <text x={0} y={-Math.round(n) * 26 - 50} textAnchor="middle" fill={P.ink} style={{ font: '400 80px "Bebas Neue"' }}>{label}</text>}
  </g>
)
// # a wet street: kerb, lamp posts and puddles
export const Street: React.FC<{ f: number; y?: number; lamps?: number[] }> = ({ f, y = 1000, lamps = [260, 1660] }) => (
  <g>
    <rect x={0} y={y} width={1920} height={80} fill="#1B2A44" /><rect x={0} y={y} width={1920} height={10} fill="#3A4F73" />
    {lamps.map((x) => <g key={x}><rect x={x - 6} y={y - 380} width={12} height={380} fill="#2A3448" /><rect x={x - 30} y={y - 400} width={60} height={26} rx={8} fill="#2A3448" /><ellipse cx={x} cy={y - 370} rx={60} ry={24} fill={P.gold} opacity={0.18 + 0.05 * Math.sin(f / 9)} /></g>)}
    {[400, 900, 1400].map((x, k) => <ellipse key={k} cx={x} cy={y + 40} rx={110} ry={10} fill="#5B7BA8" opacity={0.25 + 0.1 * Math.sin(f / 7 + k)} />)}
  </g>
)

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const s1 = c('s1'), panic = c('s1:panic'), fear = c('s2:fear'), nobody = c('s2:nobody'), brk = c('s2:break')
  const middle = c('s3:middle'), man = c('s3:man'), handed = c('s3:handed'), goldman3 = c('s3:goldman')
  const name = c('s4:name'), buffett4 = c('s4:buffett')
  const paid5 = c('s5:paid'), back5 = c('s5:back'), n500 = c('s5:500'), year5 = c('s5:year')
  const again = c('s6:again'), bank6 = c('s6:bank'), america = c('s6:america')
  const time7 = c('s7:time'), turned = c('s7:turned'), worth7 = c('s7:worth'), n207 = c('s7:207')
  const why8 = c('s8:why'), scared8 = c('s8:scared'), scared9 = c('s9:scared'), deals = c('s9:deals'), find = c('s10:find'), step = c('s10:step')
  const A = win(f, 0, paid5 - 4, 10), B = win(f, paid5 - 4, again - 2, 10), Cw = win(f, again - 2, why8 - 4, 10), D = on(f, why8 - 4, 10)
  // # the crowd: calm, then running in panic (back and forth), then away from the bank on "scared"
  const crowd = (k: number) => { const base = 140 + k * 128, run = on(f, panic, 10) * Math.sin(f / 7 + k) * 40; return base + run }
  const me: Beat[] = [[0, 'walkA', 'neutral', 'walkB', 10], [man + 26, 'idle', 'neutral'], [handed, 'offer', 'smiling'], [name, 'confident', 'smiling']]
  const walkIn = easeInOut(span(f, middle, man + 26))
  // # extra gesture words (each pause gets Buffett acting on a word)
  const G = [c('s6:three'), c('s6:in'), c('s1:wall'), c('s3:5'), c('s5:in'), c('s5:dollars'), c('s6:deal'), c('s6:goldman')]
  return (
    <g>
      <StageBg id="wb-hook" frame={f} />
      <Headline f={f} lines={[[s1, 'SEPTEMBER 2008', P.ink, 100], [fear, 'FEAR EVERYWHERE', P.coralInk, 110], [handed, '$5 BILLION TO GOLDMAN SACHS', P.goldInk, 100], [name, 'WARREN BUFFETT', P.ink, 110],
        [paid5, 'PAID BACK $5.5 BILLION', P.goldInk, 104], [n500, '+ $500 MILLION A YEAR', P.goldInk, 104], [again, '2011: BANK OF AMERICA', P.ink, 104], [n207, '$5B → ABOUT $20.7B', P.goldInk, 110],
        [why8, 'WHY BUY WHEN OTHERS ARE SCARED?', P.ink, 96], [deals, 'WHY SUCH GOOD DEALS?', P.ink, 104]]} />
      {/* # A: Wall Street in a storm; the crowd panics; Buffett walks in and the cheque sails into Goldman */}
      {A > 0 && <g opacity={A}>
        <Street f={f} />
        {[['BANK', -560], ['GOLDMAN SACHS', 0], ['BANK', 560]].map(([nm, dx], k) => (
          <Bank key={k} x={960 + (dx as number) * lerp(1, 1.25, on(f, goldman3, 14))} y={1000} s={k === 1 ? lerp(0.95, 1.15, on(f, goldman3, 14)) : 0.8} name={nm as string} f={f}
            shake={on(f, panic, 6) * (1 - on(f, middle, 10)) * 0.8} crack={on(f, nobody + k * 6, 10) * (k === 1 ? 0.6 : 1)} o={k === 1 ? 1 : 1 - 0.5 * on(f, goldman3, 12)} />
        ))}
        {/* # the falling sign on "break" */}
        <g opacity={on(f, brk, 4)} transform={`translate(1520 ${lerp(600, 960, easeInOut(span(f, brk, brk + 14)))}) rotate(${lerp(0, 70, on(f, brk, 14))})`}><rect x={-130} y={-30} width={260} height={60} rx={8} fill={P.navy2} /></g>
        {/* # the crowd in the street */}
        {Array.from({ length: 14 }, (_, k) => <g key={k} opacity={1 - on(f, middle, 12) * 0.6}><Mini look={['buyer', 'investor', 'hero', 'owner', 'worker'][k % 5]} x={crowd(k) + (k < 7 ? -1 : 1) * 300 * on(f, middle, 30)} y={1060} scale={0.8} frame={f} seed={k + 3} mood={f >= fear ? 'sad' : 'neutral'} /></g>)}
        <g transform={`translate(${lerp(1500, 1300, on(f, s1, 30))} 400)`}><Storm x={0} y={0} s={1.2} f={f} bolt={on(f, panic, 3) * (1 - on(f, panic + 8, 5)) + on(f, brk, 3) * (1 - on(f, brk + 8, 5))} /></g>
        <g opacity={on(f, middle, 6)}><Buffett f={f} beats={me} x={lerp(-200, 520, walkIn)} y={1060} s={lerp(1, 1.25, on(f, name, 14))} plate={on(f, buffett4, 8)} /></g>
        {(() => { const p = fly(f, handed + 6, [620, 640], [960, 560], 22, 260); return <g opacity={on(f, handed, 6) * (1 - on(f, handed + 30, 8))}><Cheque x={p.t > 0 ? p.x : 640} y={p.t > 0 ? p.y : 640} s={lerp(0.7, 0.4, p.t)} r={-6} to="GOLDMAN SACHS" amount="$5B" signed={on(f, handed, 12)} /></g> })()}
      </g>}
      {/* # B: Goldman pays back: notes stream into a tower; 10% coins every year */}
      {B > 0 && <g opacity={B}>
        <Street f={f} />
        <Bank x={1380} y={1000} s={1.15} name="GOLDMAN SACHS" f={f} />
        <Buffett f={f} beats={gestB([[0, 'idle', 'smiling'], [back5, 'receive', 'smiling'], [n500, 'celebrate', 'smiling']], G)} x={360} y={1060} s={1.15} plate={0} />
        {Array.from({ length: 10 }, (_, k) => { const p = fly(f, back5 + k * 3, [1380, 640], [680, 900 - Math.min(k, 9) * 20], 18, 240); return <g key={k} opacity={p.t > 0 && p.t < 1 ? 1 : 0}><Note x={p.x} y={p.y} s={0.8} text="$" /></g> })}
        <CoinTower x={700} y={980} n={on(f, back5 + 8, 4) * Math.min(11, (f - back5 - 8) / 2.5)} s={1} label={f > back5 + 40 ? '$5.5B' : undefined} />
        {Array.from({ length: 3 }, (_, k) => { const p = fly(f, year5 + k * 8, [1380, 420], [480, 520], 18, 220); return <g key={k} opacity={p.o}><Coin x={p.x} y={p.y} s={1.4} text="10%" /></g> })}
      </g>}
      {/* # C: Bank of America rolls in; a cheque flies; a tower climbs from $5B to $20.7B */}
      {Cw > 0 && <g opacity={Cw}>
        <Street f={f} />
        <g transform={`translate(${lerp(900, 0, easeInOut(span(f, again - 2, again + 20)))} 0)`}><Bank x={1380} y={1000} s={1.15} name="BANK OF AMERICA" f={f} color="#F1D9D9" shake={on(f, bank6, 6) * (1 - on(f, time7, 8)) * 0.5} /></g>
        <Buffett f={f} beats={gestB([[0, 'idle', 'neutral'], [america, 'offer', 'smiling'], [n207, 'celebrate', 'smiling']], G)} x={300} y={1060} s={1.1} plate={0} />
        {(() => { const p = fly(f, america + 4, [440, 640], [1380, 600], 20, 220); return <g opacity={on(f, america, 6) * (1 - on(f, time7, 6))}><Cheque x={p.t > 0 ? p.x : 440} y={p.t > 0 ? p.y : 640} s={0.42} to="BANK OF AMERICA" amount="$5B" /></g> })()}
        <g opacity={on(f, time7, 8)}>
          <CoinTower x={560} y={980} n={5} s={0.9} label="$5B" color={P.sky} />
          <g opacity={on(f, turned, 6)}><path d="M660 760 L760 760" stroke={P.goldInk} strokeWidth={14} strokeLinecap="round" /><path d="M760 734 l36 26 l-36 26 Z" fill={P.goldInk} /></g>
          <CoinTower x={900} y={980} n={on(f, worth7, 4) * Math.min(21, (f - worth7) / 1.1)} s={0.9} label={f > n207 ? '$20.7B' : undefined} />
        </g>
      </g>}
      {/* # D: everyone runs away, Buffett walks up the bank steps; a handshake at the door; the steps light up */}
      {D > 0 && <g opacity={D}>
        <Street f={f} lamps={[160, 1760]} />
        <Bank x={1300} y={1000} s={1.25} name="A SCARED BANK" f={f} shake={0.3} />
        {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={960 + k * 30} y={1000 - k * 22} width={520 - k * 60} height={22} fill={k <= (f - step) / 6 ? P.gold : '#8C9BB5'} opacity={0.9} />)}
        {Array.from({ length: 12 }, (_, k) => { const t = easeInOut(span(f, scared8 + k * 1.5, scared8 + k * 1.5 + 40)); return <g key={k} opacity={1 - t * 0.7}><Mini look={['buyer', 'hero', 'owner', 'worker'][k % 4]} x={(k % 2 ? lerp(700, 2100, t) : lerp(500, -200, t)) + rnd(k) * 80} y={1060} scale={0.75} frame={f} seed={k + 30} mood="sad" /></g> })}
        <Buffett f={f} beats={gestB([[0, 'scratchHead', 'thinking'], [scared9, 'walkA', 'neutral', 'walkB', 10], [deals - 4, 'handshake', 'smug']], G)} x={lerp(420, 860, easeInOut(span(f, scared9, deals - 4)))} y={1060} s={1.05} plate={0} />
        <g opacity={on(f, deals - 6, 8)}><Person f={f} who="owner" beats={[[0, 'nervous', 'worried'], [deals - 4, 'handshake', 'neutral']]} x={1080} y={1000} s={1} flip /></g>
        <text x={480} y={500} textAnchor="middle" fill={P.goldInk} opacity={on(f, why8, 6) * (1 - on(f, scared9, 8))} transform={`translate(480 460) scale(${pop(f, why8)}) translate(-480 -460)`} style={{ font: '400 200px "Bebas Neue"' }}>?</text>
        <g opacity={on(f, find, 6)} transform={`translate(600 360) scale(${pop(f, find)})`}><rect x={-170} y={-56} width={340} height={112} rx={20} fill={P.gold} /><text y={30} textAnchor="middle" fill="#0E1B33" style={{ font: '400 80px "Bebas Neue"' }}>STEP BY STEP</text></g>
      </g>}
      <Vignette id="wb-hook" />
    </g>
  )
}

const BEATS = ['s6:three', 's6:in', 's1:wall', 's3:5', 's5:in', 's5:dollars', 's6:deal', 's6:goldman', 's1', 's1:panic', 's2:fear', 's2:nobody', 's2:break', 's3:middle', 's3:man', 's3:handed', 's3:goldman', 's4:name', 's4:buffett', 's5:paid', 's5:back', 's5:500', 's5:year', 's6:again', 's6:bank', 's6:america',
  's7:time', 's7:turned', 's7:worth', 's7:207', 's8:why', 's8:scared', 's9:scared', 's9:deals', 's10:find', 's10:step']
export const WB_HOOK = makePiece('wb-hook', 'Buffett long (casino-style): a stormy Wall Street with three big banks, rain and a panicking crowd; lightning, cracks and a falling sign; Buffett walks in against the crowd and a $5B cheque sails into Goldman Sachs; he grows with a name plate; Goldman streams notes back into a $5.5B tower while 10% coins fly in; Bank of America rolls in, a cheque flies and a tower climbs from $5B to $20.7B; the crowd flees both ways while Buffett walks up the bank steps to shake a nervous banker\'s hand', {
  mood: 'dark', Component: Hook, beats: BEATS,
  sfx: [['s1:panic', 'thud', 0.35], ['s3:handed', 'swish', 0.3], ['s5:back', 'coin', 0.3], ['s6:america', 'swish', 0.3], ['s7:207', 'ding', 0.35], ['s9:deals', 'pop', 0.3]] })

// # gestures on extra spoken words: Buffett explains, points, presents… on each frame in `at`, unless he is walking,
// # carrying or sitting then (those beats are kept as they are)
const GEST: [string, string][] = [['explain', 'smiling'], ['point', 'smiling'], ['present', 'smiling'], ['confident', 'smug']]
export const gestB = (beats: Beat[], at: number[]): Beat[] => {
  const busy = (fr: number) => { const cur = [...beats].filter((b) => b[0] <= fr).pop(); return !!cur && /walk|carry|relax|run|sit/.test(cur[1]) }
  const add = at.filter((fr) => !busy(fr) && !beats.some((b) => Math.abs(b[0] - fr) < 12)).map((fr, k) => [fr, GEST[k % 4][0], GEST[k % 4][1]] as Beat)
  return [...beats, ...add].sort((a, b) => a[0] - b[0])
}
