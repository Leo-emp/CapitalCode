// ---------------------------------------------------------------- s1–s8: the extra charge, its cause, the hidden line.
// A) A cream street: a power plant, pylons, homes and shops; the wires draw in on "power grid"; on "charged" a coin
//    rises from every building into one pot (about $29 billion extra, 2025→2029).
// B) Acted out: in a cut-away living room a family switches on the lamp and TV, the meter spins (the power they use);
//    the hero outside points at it, then crosses his forearms in an X and shakes his head ("not for"); same for the wire;
//    a line worker pulls a new wire at the street pole (new wires); a cart of gold coins (the extra charges) rolls along
//    the road past both and into a data center that slides in, grows giant, blinks (internet waves, AI chip).
// C) A family in front of their home; the data center's door is locked (never been inside); a dotted path draws from
//    the data center to the home and an envelope (the bill) travels along it.
// D) The bill as an envelope: a bulb, a pole and a closed crate drop out (the crate is the hidden part); its lid lifts
//    ("what it is"), gears turn inside ("how it works"), a coin lands beside one small person ("per person").
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, Bill as Envelope, Coin, fly, hand, Headline, Jar, Person, Prop, win } from '../aimoney/common'
import { BigBulb, CoinCart, DataHall, Home, HomeCutaway, PowerPlant, Pylon, Shop, UtilityPole, Wire } from './kit'

// # the street: [x, kind] — homes and shops on the ground line
const STREET: [number, 'home' | 'shop'][] = [[820, 'home'], [1080, 'home'], [1370, 'shop']]
const GROUND = 900

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const y2025 = c('s1:2025'), y2029 = c('s1:2029'), end8 = c('s8:end'), s1 = c('s1'), four1 = c('s1:four'), years1 = c('s1:years'), from1 = c('s1:from'), homes = c('s1:homes'), businesses = c('s1:businesses'), power = c('s1:power'), grid = c('s1:grid'), charged = c('s1:charged'), d29 = c('s1:29')
  const not2 = c('s2'), power2 = c('s2:power'), used = c('s2:used')
  const wires = c('s3:wires'), streets = c('s3:streets')
  const extra4 = c('s4:extra'), driven = c('s4:driven'), data = c('s4:data'), giant = c('s4:giant'), computers = c('s4:computers'), internet = c('s4:internet'), artificial = c('s4:artificial')
  // # no brand card mid-narration (owner r64): the family part starts on s5 itself
  const most5 = c('s5'), never5 = c('s5:never'), inside5 = c('s5:inside')
  const how6 = c('s6:how'), building6 = c('s6:building'), computers6 = c('s6:computers'), end6 = c('s6:end'), bill6 = c('s6:bill')
  const answer7 = c('s7:answer'), hidden = c('s7:hidden'), part7 = c('s7:part'), people7 = c('s7:people'), never7 = c('s7:never'), heard = c('s7:heard')
  const what8 = c('s8:what'), how8 = c('s8:how'), costs = c('s8:costs')
  // # four layouts; each fades out over 8 frames ending at X and the next fades in over 8 frames from X (owner r55/r62)
  const AB = not2 + 2, BC = most5 + 2, CD = answer7 - 4
  const A = win(f, s1, AB), B = win(f, AB, BC), C = win(f, BC, CD), D = on(f, CD, 8)
  const dcS = lerp(0.75, 0.95, on(f, giant, 16))
  const DCX = 1480, DCY = 900
  return (
    <g>
      <Stage id="pw-hook" frame={f} />
      <Headline f={f} lines={[[y2025, '2025', P.ink, 104], [y2029, '2025 → 2029', P.ink, 104], [d29, '≈ $29 BILLION EXTRA', P.goldInk, 112], [not2, '', P.ink], [driven, 'DRIVEN BY DATA CENTERS', P.ink, 100], [BC, '', P.ink]]} />

      {/* # A) the street on the grid */}
      {A > 0 && <g opacity={A}>
        <rect x={-100} y={GROUND} width={2120} height={240} fill="#D9C7A6" />
        <rect x={-100} y={GROUND} width={2120} height={10} fill="#BFAE8E" />
        <g opacity={on(f, four1, 8)} transform={`translate(270 ${GROUND}) scale(${pop(f, four1)}) translate(-270 ${-GROUND})`}><PowerPlant x={270} y={GROUND} s={1.1} ready={0.4 * on(f, from1, 12) + 0.6 * on(f, power, 14)} f={f} /></g>
        <g opacity={on(f, years1, 8)} transform={`translate(600 ${GROUND}) scale(${pop(f, years1)}) translate(-600 ${-GROUND})`}><Pylon x={600} y={GROUND} s={1.15} /></g>
        <Wire a={[540, GROUND - 218]} b={[466, GROUND - 186]} draw={span(f, power, grid + 8)} sag={30} glow={on(f, charged, 10)} />
        {STREET.map(([x], k) => <Wire key={k} a={[660, GROUND - 218]} b={[x, GROUND - 236]} draw={span(f, grid + k * 3, grid + 16 + k * 3)} sag={46} glow={on(f, charged, 10)} />)}
        {STREET.map(([x, kind], k) => {
          const at = kind === 'home' ? homes + k * 3 : businesses + k * 2, g = pop(f, at)
          return <g key={k} transform={`translate(${x} ${GROUND}) scale(${g}) translate(${-x} ${-GROUND})`} opacity={on(f, at, 6)}>
            {kind === 'home' ? <Home x={x} y={GROUND} s={1.1} lit={on(f, grid, 12)} /> : <Shop x={x} y={GROUND} s={1.1} lit={on(f, grid, 12)} />}
          </g>
        })}
        {/* # the extra charge: a coin rises from every building into one pot */}
        <g opacity={on(f, charged, 10)} transform={`translate(1720 ${GROUND - 10}) scale(${pop(f, charged)}) translate(-1720 ${-(GROUND - 10)})`}><Jar x={1720} y={GROUND - 10} s={1.3} fill={0.08 + 0.92 * on(f, d29, 30)} label="EXTRA" /></g>
        {Array.from({ length: 12 }, (_, k) => {
          const p = fly(f, charged + k * 3, [STREET[k % 3][0], GROUND - 330], [1720, 515], 22, 220)
          return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.7} o={p.o} /> : null
        })}
      </g>}

      {/* # B) acted out: inside the home a family member switches on the lamp and the TV (the power they use), the meter
          spins; at the pole a line worker pulls a new wire to the street (the wires); a cart of gold coins (the extra
          charges) rolls along the road in front, past both, into a data center that slides in, grows, blinks, lights AI */}
      {B > 0 && <g opacity={B}>
        <rect x={-100} y={GROUND} width={2120} height={240} fill="#D9C7A6" />
        <rect x={-100} y={GROUND} width={2120} height={10} fill="#BFAE8E" />
        <rect x={-100} y={GROUND + 100} width={2120} height={70} fill="#BFAE8E" opacity={0.6} />
        {/* # the sky: soft clouds drifting and a distant power line on small pylons */}
        {[[700, 330, 0.9], [1250, 290, 0.8], [1720, 340, 1.0]].map(([cx, cy, cs], k) => <g key={k} transform={`translate(${cx + Math.sin(f / 90 + k) * 14} ${cy}) scale(${cs})`} opacity={0.9}><ellipse cx={0} cy={0} rx={110} ry={34} fill="#FFFFFF" /><ellipse cx={-50} cy={-18} rx={60} ry={40} fill="#FFFFFF" /><ellipse cx={40} cy={-26} rx={66} ry={46} fill="#FFFFFF" /></g>)}
        {[160, 760, 1360, 1960].map((px) => <Pylon key={px} x={px} y={560} s={0.42} o={0.35} />)}
        {[160, 760, 1360].map((px) => <Wire key={px} a={[px + 24, 480]} b={[px + 624, 480]} sag={26} o={0.35} />)}
        <HomeCutaway x={330} y={GROUND} s={1.02} lamp={on(f, power2, 8)} tv={on(f, power2 + 6, 10)} meter={on(f, used, 6)} f={f} />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'neutral'], [power2 - 6, 'reachUp', 'smiling'], [used, 'point', 'smiling'], [wires, 'idle', 'neutral']]} x={215} y={GROUND - 40} s={0.46} />
        <Person f={f} who="buyer" beats={[[0, 'idle', 'neutral'], [used, 'relax', 'smiling'], [streets + 10, 'lookFar', 'thinking']]} x={320} y={GROUND - 40} s={0.46} />
        {/* # "not for power they used": the hero, outside by the meter, points at the lit room on "power", then crosses his
            forearms in an X and shakes his head ("no"); he does the same at the new wire on "not for new wires" */}
        <Person f={f} who="hero" flip beats={[[0, 'idle', 'neutral'], [AB + 4, 'present', 'neutral'], [power2, 'point', 'neutral'], [used + 4, 'crossNoA', 'neutral', 'crossNoB', 10], [wires - 6, 'idle', 'neutral'],
          [wires + 4, 'point', 'neutral'], [streets + 4, 'crossNoA', 'neutral', 'crossNoB', 10], [data - 4, 'lookFar', 'thinking'], [artificial, 'point', 'shocked']]} x={810} y={GROUND} s={0.72} o={on(f, AB, 10)} />
        {/* # the street: a pole, a line worker pulling a new wire across to the next pole */}
        <g opacity={on(f, wires - 8, 10)}>
          <UtilityPole x={1060} y={GROUND} s={1.05} />
          <Person f={f} who="worker" beats={[[0, 'idle', 'neutral'], [wires, 'pull', 'neutral', 'push', 14], [streets + 6, 'thumbsUp', 'smiling']]} x={1200} y={GROUND} s={0.55} o={1 - on(f, data - 6, 8)} />
          <Wire a={[1180, GROUND - 425]} b={[1360, GROUND - 400]} draw={span(f, wires, streets + 6)} sag={36} />
        </g>
        <g opacity={on(f, data, 10)} transform={`translate(${lerp(300, 0, on(f, data, 18))} 0)`}>
          <DataHall x={DCX + 60} y={DCY} s={dcS} f={f} lit={on(f, computers, 10)} waves={on(f, internet, 10)} ai={on(f, artificial, 12)} />
        </g>
        {/* # the cart of extra money rolls along the road in front, into the data center's door */}
        {(() => {
          const x = f < used ? lerp(-160, 360, on(f, AB, 50)) : f < wires ? lerp(360, 640, span(f, used, wires)) : f < streets ? lerp(640, 1060, span(f, wires, streets + 10)) : f < data ? 1060 : lerp(1060, 1520, span(f, data, giant + 10))
          const o = 1 - on(f, giant + 10, 10)
          return <CoinCart x={x} y={GROUND + 165} s={0.72} roll={x * 0.8} o={o} />
        })()}
      </g>}

      {/* # C) one wire, two users: the family's home (cut away) on the left, the data center on the right, both on the same
          grid wire. "Never been inside": the data center's door locks, the family shrug. "AI computers": power pulses race
          from the pylon into the data center. "End up on a family's bill": a gold coin runs back along the wire into the
          home and drops onto the bill in the woman's hands; both read it and are shocked */}
      {C > 0 && <g opacity={C}>
        <rect x={-100} y={GROUND} width={2120} height={240} fill="#D9C7A6" />
        <rect x={-100} y={GROUND} width={2120} height={10} fill="#BFAE8E" />
        {[[760, 300, 0.9], [1240, 250, 0.8]].map(([cx, cy, cs], k) => <g key={k} transform={`translate(${cx + Math.sin(f / 90 + k) * 14} ${cy}) scale(${cs})`}><ellipse cx={0} cy={0} rx={110} ry={34} fill="#FFFFFF" /><ellipse cx={-50} cy={-18} rx={60} ry={40} fill="#FFFFFF" /><ellipse cx={40} cy={-26} rx={66} ry={46} fill="#FFFFFF" /></g>)}
        <HomeCutaway x={330} y={GROUND} s={1.02} lamp={1} tv={0.6} meter={1} f={f} />
        <Pylon x={960} y={GROUND} s={1.2} />
        <Wire a={[680, GROUND - 205]} b={[900, GROUND - 228]} sag={30} glow={on(f, end6, 8) * (1 - on(f, bill6, 10))} />
        <Wire a={[1020, GROUND - 228]} b={[DCX - 300, DCY - 250]} sag={40} glow={on(f, computers6, 8)} />
        <DataHall x={DCX + 40} y={DCY} s={0.92} f={f} lit={1} ai={1} waves={on(f, computers6, 10)} locked={on(f, inside5, 10)} />
        {/* # power pulses race into the data center */}
        {f >= computers6 && Array.from({ length: 4 }, (_, k) => { const t = ((f - computers6) / 24 + k / 4) % 1, x = lerp(1020, DCX - 300, t), y = lerp(GROUND - 228, DCY - 250, t) + Math.sin(t * Math.PI) * 30; return <circle key={k} cx={x} cy={y} r={12} fill={P.gold} opacity={(1 - on(f, end6, 8)) * 0.9} /> })}
        {/* # the gold coin runs back from the data center, along the wire, into the home's bill */}
        {f >= end6 && f < bill6 + 14 && (() => {
          const t = span(f, end6, bill6), pts: [number, number][] = [[DCX - 300, DCY - 250], [1020, GROUND - 228], [900, GROUND - 228], [680, GROUND - 205], [400, GROUND - 250]]
          const seg = Math.min(3, Math.floor(t * 4)), u = t * 4 - seg, a = pts[seg], b = pts[seg + 1]
          return <Coin x={lerp(a[0], b[0], u)} y={lerp(a[1], b[1], u) - 30} s={0.8} o={1 - on(f, bill6 + 4, 8)} />
        })()}
        {(() => {
          const wb: Beat[] = [[0, 'idle', 'neutral'], [never5, 'shrug', 'smiling'], [how6, 'think', 'thinking'], [building6, 'read', 'thinking'], [bill6, 'read', 'shocked']]
          const hp = hand(f, wb, 215, GROUND - 40, 0.46)
          return <g>
            <Person f={f} who="investorF" beats={wb} x={215} y={GROUND - 40} s={0.46} />
            <g opacity={on(f, building6, 8)}><Envelope x={hp.x + 10} y={hp.y - 10} s={0.32} r={-6} /></g>
          </g>
        })()}
        <Person f={f} who="buyer" beats={[[0, 'idle', 'neutral'], [never5 + 4, 'shrug', 'smiling'], [how6, 'scratchHead', 'thinking'], [bill6, 'shock', 'shocked']]} x={330} y={GROUND - 40} s={0.46} />
      </g>}

      {/* # D) what you pay for, as one pile of money: a coin pile splits three ways on "part of the bill" — to a lit bulb, to a
          power pole, and behind the curtain of a little booth (the hidden part). A row of people walk in; on "never heard of"
          they shrug, question marks pop over their heads. "What it is": the curtain draws back onto a glowing power plant
          standing ready; "how it works": gears turn above it; "per person": a coin drops into each person's hands */}
      {D > 0 && <g opacity={D}>
        <rect x={-100} y={GROUND} width={2120} height={240} fill="#D9C7A6" />
        <rect x={-100} y={GROUND} width={2120} height={10} fill="#BFAE8E" />
        {/* # the booth with its curtain (right) */}
        <g opacity={on(f, hidden, 10)} transform={`translate(1530 ${GROUND}) scale(${pop(f, hidden)})`}>
          <ellipse cx={0} cy={8} rx={300} ry={22} fill="#000" opacity={0.12} />
          <rect x={-270} y={-540} width={540} height={540} rx={16} fill="#8E6232" />
          <rect x={-240} y={-500} width={480} height={500} fill="#2A2418" />
          {/* # behind the curtain: a power plant, standing ready, lit from inside */}
          <g opacity={on(f, what8, 12)}>
            <ellipse cx={0} cy={-200} rx={230} ry={200} fill={P.gold} opacity={0.25} />
            <PowerPlant x={-40} y={-10} s={0.62} ready={1} f={f} />
          </g>
          {/* # gears turning above the plant (how it works) */}
          <g opacity={on(f, how8, 10)}>
            <g transform={`translate(-60 -420) rotate(${(f - how8) * 2.4})`}>{Array.from({ length: 10 }, (_, k) => <rect key={k} x={-8} y={-56} width={16} height={18} rx={3} fill={P.goldD} transform={`rotate(${k * 36})`} />)}<circle r={42} fill={P.goldD} /><circle r={14} fill="#2A2418" /></g>
            <g transform={`translate(30 -390) rotate(${-(f - how8) * 3.4 + 18})`}>{Array.from({ length: 8 }, (_, k) => <rect key={k} x={-6} y={-38} width={12} height={12} rx={3} fill={P.gold} transform={`rotate(${k * 45})`} />)}<circle r={28} fill={P.gold} /><circle r={10} fill="#2A2418" /></g>
          </g>
          {/* # the curtain: two drapes that draw apart */}
          {[-1, 1].map((d) => { const w = 240 * (1 - 0.62 * on(f, what8, 16)); return <path key={d} d={d < 0 ? `M-240 -500 L${-240 + w} -500 Q${-250 + w} -250 ${-230 + w} 0 L-240 0 Z` : `M240 -500 L${240 - w} -500 Q${250 - w} -250 ${230 - w} 0 L240 0 Z`} fill="#B23A2F" /> })}
          {Array.from({ length: 9 }, (_, k) => <rect key={k} x={-252 + k * 60} y={-540} width={44} height={50} rx={10} fill="#C94A3E" />)}
        </g>
        {/* # the bulb and the pole the other two piles go to; they leave once the people arrive */}
        <g opacity={on(f, answer7, 10) * (1 - on(f, people7, 10))} transform={`translate(0 ${30 * on(f, people7, 10)})`}>
          <BigBulb x={330} y={GROUND} s={0.8} glow={1} f={f} />
          <UtilityPole x={720} y={GROUND} s={0.95} />
        </g>
        {/* # the pile of money that splits three ways */}
        {Array.from({ length: 9 }, (_, k) => {
          const dest = k % 3, start: [number, number] = [960 + ((k % 3) - 1) * 50, GROUND - 30 - Math.floor(k / 3) * 34]
          const end: [number, number] = dest === 0 ? [330, GROUND - 30] : dest === 1 ? [720, GROUND - 30] : [1530, GROUND - 30]
          const p = fly(f, part7 + k * 2, start, end, 18, 120)
          const settled = f >= part7 + k * 2 + 18
          const o = on(f, answer7, 8) * (dest === 2 ? 1 - on(f, part7 + k * 2 + 14, 6) : 1 - on(f, people7, 10))
          if (f < part7 + k * 2) return <Coin key={k} x={start[0]} y={start[1]} s={0.8} o={o} />
          return settled ? (dest === 2 ? null : <Coin key={k} x={end[0]} y={end[1] - Math.floor(k / 3) * 30} s={0.8} o={o} />) : <Coin key={k} x={p.x} y={p.y} s={0.8} o={o * p.o} />
        })}
        {/* # the people: walk in, shrug, wonder, then each catches a coin */}
        {[0, 1, 2, 3].map((k) => {
          const who = ['buyer', 'investorF', 'worker', 'investor'][k], x = 170 + k * 285, at = people7 + 10 + k * 4
          const beats: Beat[] = [[0, 'idle', 'neutral'], [at, 'waveA', 'smiling'], [at + 16, 'idle', 'neutral'], [never7 + k * 2, 'shrug', 'thinking'], [end8 + k * 2, 'lookFar', 'thinking'], [what8, 'point', 'smiling'], [costs + k * 4, 'receive', 'shocked']]
          const hp = hand(f, beats, x, GROUND, 0.66)
          return <g key={k} opacity={on(f, at, 8)} transform={`translate(0 ${lerp(40, 0, on(f, at, 14))})`}>
            <Person f={f} who={who} beats={beats} x={x} y={GROUND} s={0.66} />
            <g opacity={on(f, heard + k * 2, 6) * (1 - on(f, what8, 8))} transform={`translate(${x} ${GROUND - 560 - 10 * on(f, heard + k * 2, 8)})`}><circle r={44} fill={P.paper} stroke={P.edge} strokeWidth={3} /><text y={14} textAnchor="middle" fill={P.navy2} style={{ font: '800 58px Inter' }}>?</text></g>
            {f >= costs + k * 4 && <Coin x={hp.x} y={lerp(hp.y - 300, hp.y - 20, on(f, costs + k * 4, 12))} s={0.75} o={on(f, costs + k * 4, 6)} text="¢" />}
          </g>
        })}
      </g>}
      <Vignette id="pw-hook" />
    </g>
  )
}

const BEATS = ['s1', 's1:homes', 's1:businesses', 's1:power', 's1:grid', 's1:charged', 's1:29', 's2', 's2:power', 's2:used', 's3:wires', 's3:streets', 's4:extra', 's4:driven', 's4:data', 's4:giant', 's4:computers', 's4:internet', 's4:artificial', 's5', 's5:never', 's5:inside', 's6:how', 's6:building', 's6:computers', 's6:end', 's6:bill', 's7:answer', 's7:hidden', 's7:part', 's7:people', 's7:never', 's7:heard', 's8:what', 's8:how', 's8:costs', 's1:four', 's1:years', 's1:from', 's1:2025', 's1:2029', 's8:end']
export const PW_HOOK = makePiece('pw-hook', 'Power long: a street on the grid pays $29bn extra into a pot; the pot unfolds into a bill (not power used, not wires — an extra line wired to a data center); a family never inside; the bill travels to their home; the hidden line, how it works, per person', {
  mood: 'light', Component: Hook, beats: BEATS,
  sfx: [['s1:homes', 'pop', 0.25], ['s1:grid', 'swish', 0.3], ['s1:charged', 'coin', 0.4], ['s2:power', 'click', 0.3], ['s3:wires', 'swish', 0.3], ['s4:data', 'whoosh', 0.35], ['s4:artificial', 'ding', 0.3], ['s5:inside', 'click', 0.35], ['s6:end', 'swish', 0.3], ['s6:bill', 'thud', 0.35], ['s7:part', 'coin', 0.35], ['s7:heard', 'softpop', 0.3], ['s8:what', 'flutter', 0.35], ['s8:how', 'tick', 0.3], ['s8:costs', 'coin', 0.35]] })
