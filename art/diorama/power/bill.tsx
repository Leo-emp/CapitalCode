// ---------------------------------------------------------------- s10–s23: what your bill really pays for.
// A) One green note (what you pay) splits into three thirds that fly to what they pay for: the poles and wires to a home,
//    the meter and a glowing bulb (energy used each month), and a scroll that unrolls (a promise).
// B) The promise acted out: the sun heats up, a thermometer climbs, every home's air conditioner switches on; two plants on
//    the hill stand ready and the homes' lights stay on. "Peak": a gauge needle swings into the red. "Hard to store": a
//    small battery fills and overflows with lightning; on "run" the plants' steam bursts.
// C) A plant standing ready on a quiet day costs money: coins leave it day after day (calendar); workers are paid; a
//    mechanic fixes the turbine; the grid operator hands the plant a coin bag ("just to be available"), tagged CAPACITY.
// D) Who buys: PJM's control house; the region map with people filling it; 67 million, 13 states and Washington, D.C.;
//    pins drop on New Jersey, Pennsylvania, Virginia, Ohio and Illinois as each is named.
import React from 'react'
import { Mini } from '../../rig/Mini'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Calendar, Coin, fly, Headline, Label, Person, win } from '../aimoney/common'
import { BigBulb, Home, PowerPlant, UtilityPole, Wire } from './kit'
import { AC, Battery, Clouds, ControlHouse, Ground, Pin, RegionMap, Scroll, Sun, Thermo } from './kit2'

const GROUND = 900
// # a third of the green note (k = 0,1,2), drawn as one piece of a long bill
const NoteThird: React.FC<{ k: number; x: number; y: number; s?: number; o?: number; r?: number }> = ({ k, x, y, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-100} y={-90} width={200} height={180} rx={k === 0 ? 14 : 4} fill="#5FBF7F" />
    <rect x={-100} y={-90} width={200} height={34} rx={k === 0 ? 14 : 4} fill="#FFFFFF" opacity={0.12} />
    <rect x={-86} y={-76} width={172} height={152} rx={8} fill="none" stroke="#2E8B57" strokeWidth={5} strokeDasharray={k === 1 ? '0' : '0'} />
    {k === 1 && <g><circle r={56} fill="#2E8B57" opacity={0.35} /><text y={26} textAnchor="middle" fill="#1F5A3E" style={{ font: '800 76px Inter' }}>$</text></g>}
    {k !== 1 && <circle cx={k === 0 ? -30 : 30} cy={0} r={30} fill="#2E8B57" opacity={0.3} />}
  </g>
)

const Bill: React.FC<PieceProps> = ({ f, c }) => {
  const s10 = c('s10'), more = c('s10:more')
  const part11 = c('s11:part'), poles = c('s11:poles'), wires = c('s11:wires'), home = c('s11:home')
  const elec12 = c('s12:electricity'), region23 = c('s23:region'), part12 = c('s12:part'), energy = c('s12:energy'), use12 = c('s12:use'), month = c('s12:month')
  const part13 = c('s13:part'), promise13 = c('s13:promise')
  const promise14 = c('s14:promise'), hottest = c('s14:hottest'), afternoon = c('s14:afternoon'), air = c('s14:air'), running = c('s14:running'), enough = c('s14:enough'), ready14 = c('s14:ready'), lights = c('s14:lights')
  const busiest = c('s15:busiest'), peak = c('s15:peak')
  const s16 = c('s16'), store = c('s16:store'), amounts = c('s16:amounts'), run16 = c('s16:run')
  const s17 = c('s17'), stands = c('s17:stands'), costs = c('s17:costs'), every = c('s17:every'), nobody = c('s17:nobody')
  const staff = c('s18:staff'), paid18 = c('s18:paid'), machines = c('s18:machines'), working = c('s18:working')
  const grid19 = c('s19:grid'), pays19 = c('s19:pays'), available = c('s19:available')
  const capacity = c('s20:capacity')
  const s21 = c('s21'), eastern = c('s21:eastern'), buys = c('s21:buys'), pjm21 = c('s21:pjm')
  const runs = c('s22:runs'), d67 = c('s22:67'), people = c('s22:people'), d13 = c('s22:13'), washington = c('s22:washington')
  const jersey = c('s23:jersey'), penn = c('s23:pennsylvania'), virginia = c('s23:virginia'), ohio = c('s23:ohio'), illinois = c('s23:illinois')
  // # four layouts, each out over 8 frames ending at X, the next in from X (never two at once)
  const AB = promise14 - 4, BC = s17 - 2, CD = s21 - 2
  const A = win(f, s10, AB), B = win(f, AB, BC), C = win(f, BC, CD), D = on(f, CD, 8)
  // # where each third of the note flies to
  const DEST: [number, number][] = [[430, 560], [960, 560], [1500, 560]]
  const leave = [part11, part12, part13]
  return (
    <g>
      <Stage id="pw-bill" frame={f} />
      <Headline f={f} lines={[[peak, 'THE PEAK', P.coralInk, 104], [s16, '', P.ink], [capacity, 'CAPACITY', P.goldInk, 120], [CD, '', P.ink], [d67, '67 MILLION PEOPLE', P.ink, 100], [d13, '13 STATES + WASHINGTON, D.C.', P.ink, 96], [jersey, '', P.ink]]} />

      {/* # A) the note splits three ways */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        {/* # the destinations, each arriving on its words */}
        <g opacity={on(f, poles, 10)}>
          <Home x={300} y={GROUND} s={1.0} lit={on(f, home, 10)} />
          <UtilityPole x={560} y={GROUND} s={0.95} />
          <Wire a={[480, GROUND - 386]} b={[380, GROUND - 236]} draw={span(f, wires, home + 6)} sag={20} glow={on(f, home, 10)} />
        </g>
        <g opacity={on(f, energy, 10)}>
          <BigBulb x={900} y={GROUND} s={0.9 * (1 + 0.06 * on(f, elec12, 6) * (1 - on(f, elec12 + 14, 10)))} glow={on(f, energy + 6, 10)} f={f} />
          <g transform={`translate(1040 ${GROUND - 210})`}>
            <rect x={0} y={-60} width={100} height={130} rx={12} fill="#E9EEF5" stroke="#9AA5B5" strokeWidth={4} />
            <circle cx={50} cy={-6} r={34} fill="#FFFFFF" stroke="#9AA5B5" strokeWidth={3} />
            <line x1={50} y1={-6} x2={50 + 26 * Math.cos(f * 0.3 * on(f, use12, 6))} y2={-6 + 26 * Math.sin(f * 0.3 * on(f, use12, 6))} stroke={P.coral} strokeWidth={5} strokeLinecap="round" />
          </g>
          <g opacity={on(f, month, 8)}><Calendar x={1110} y={GROUND - 420} text="1 MONTH" s={0.7} flip={on(f, month, 14)} /></g>
        </g>
        <g opacity={on(f, promise13, 10)}>
          <ellipse cx={1500} cy={GROUND + 6} rx={150} ry={16} fill="#000" opacity={0.12} />
          <rect x={1400} y={GROUND - 90} width={200} height={90} rx={12} fill="#B9864C" />
          <Scroll x={1500} y={GROUND - 270} s={0.9} open={on(f, promise13 + 4, 16)} />
        </g>
        {/* # the note: whole on "paying", splits on "more", each third flies on its "part" */}
        {[0, 1, 2].map((k) => {
          const sx = 960 + (k - 1) * 200 * 1.5, sy = 380, gap = 40 * on(f, more, 10) * (k - 1)
          const t = on(f, leave[k], 20), x = lerp(sx + gap, DEST[k][0], t), y = lerp(sy, DEST[k][1] - 140, t) - Math.sin(t * Math.PI) * 120
          const land = on(f, leave[k] + 20, 8)
          return <NoteThird key={k} k={k} x={x} y={y} s={lerp(1.5, 0.6, t)} o={on(f, s10, 8) * (1 - land)} r={lerp(0, (k - 1) * 12, t)} />
        })}
      </g>}

      {/* # B) the hottest afternoon: sun, heat, air conditioners, plants ready; the peak; too big to store */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <Sun x={1580} y={250} heat={on(f, hottest, 20)} f={f} o={on(f, promise14, 10)} />
        <g opacity={on(f, afternoon, 8) * (1 - on(f, busiest, 8))}><Thermo x={1280} y={460} level={lerp(0.3, 0.9, on(f, afternoon, 30))} s={0.9} /></g>
        {/* # the gauge: needle swings into the red on "peak" */}
        <g opacity={on(f, busiest, 10) * (1 - on(f, s16, 8))} transform="translate(1010 470)">
          <path d="M-170 0 A170 170 0 0 1 170 0" fill="none" stroke="#E9EEF5" strokeWidth={46} />
          <path d="M60 -159 A170 170 0 0 1 170 0" fill="none" stroke={P.coral} strokeWidth={46} />
          <line x1={0} y1={0} x2={150 * Math.cos(Math.PI * lerp(1.0, 1.85, on(f, peak, 18)))} y2={150 * Math.sin(Math.PI * lerp(1.0, 1.85, on(f, peak, 18)))} stroke={P.navy2} strokeWidth={12} strokeLinecap="round" />
          <circle r={20} fill={P.navy2} />
        </g>
        {[0, 1, 2].map((k) => {
          const x = 170 + k * 290
          return <g key={k}>
            <Home x={x} y={GROUND} s={0.9} lit={on(f, lights, 8)} />
            <g opacity={on(f, air + k * 3, 8)}><AC x={x + 52} y={GROUND - 64} s={0.62} run={on(f, running, 8)} f={f} /></g>
          </g>
        })}
        {/* # the plants that stand ready (right) */}
        {[1290, 1720].map((x, k) => <g key={x} opacity={on(f, enough + k * 4, 10)}><PowerPlant x={x} y={GROUND} s={0.66} ready={on(f, ready14, 12) * 0.5 + 0.5 * on(f, run16, 8)} f={f * (1 + 2 * on(f, run16, 6))} /></g>)}
        {/* # electricity is hard to store: a small battery overflows */}
        <g opacity={on(f, store, 10)}>
          <Battery x={1010} y={GROUND} s={0.85} fill={on(f, store, 20)} overflow={on(f, amounts, 8) * (1 - on(f, run16, 10))} f={f} />
        </g>
      </g>}

      {/* # C) a plant standing ready costs money every day; the grid pays it to be available: capacity */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <Clouds f={f} at={[[300, 260, 1], [1500, 220, 0.9]]} />
        <PowerPlant x={560} y={GROUND} s={1.25} ready={0.4} f={f} />
        {/* # coins leave the plant, one each "day" (the calendar flips) */}
        {Array.from({ length: 6 }, (_, k) => {
          const p = fly(f, costs + k * 12, [700, GROUND - 260], [900, GROUND - 40], 22, 120)
          return p.o > 0 && f < staff ? <Coin key={k} x={p.x} y={p.y} s={0.9} o={p.o} /> : null
        })}
        <g opacity={on(f, every, 8) * (1 - on(f, staff, 8))}><Calendar x={960} y={360} text={`DAY ${1 + Math.min(9, Math.floor(Math.max(0, f - every) / 12))}`} s={0.8} flip={((f - every) % 12) / 12} /></g>
        {/* # nobody needs it today: a quiet, dark home with a sleeping figure */}
        <g opacity={on(f, nobody, 10) * (1 - on(f, staff, 8))}><Home x={1500} y={GROUND} s={1.0} lit={0} /><circle cx={1640} cy={GROUND - 420} r={44} fill="#F6E7B8" /><circle cx={1662} cy={GROUND - 432} r={40} fill="#F3E9D6" /></g>
        {/* # staff paid, machines kept working */}
        <g opacity={on(f, staff, 10) * (1 - on(f, grid19, 8))}>
          <Person f={f} who="worker" beats={[[0, 'idle', 'neutral'], [paid18, 'receive', 'smiling']]} x={980} y={GROUND} s={0.6} />
          {f >= paid18 && <Coin x={lerp(760, 1010, on(f, paid18, 12))} y={lerp(GROUND - 300, GROUND - 260, on(f, paid18, 12))} s={0.6} o={1} />}
          <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [machines, 'reachUp', 'neutral', 'push', 14], [working + 10, 'thumbsUp', 'smiling']]} x={1260} y={GROUND} s={0.6} />
          <g opacity={on(f, machines, 8)} transform={`translate(1350 ${GROUND - 160}) rotate(${(f - machines) * 4})`}>{Array.from({ length: 8 }, (_, k) => <rect key={k} x={-8} y={-52} width={16} height={18} rx={3} fill={P.navy3} transform={`rotate(${k * 45})`} />)}<circle r={40} fill={P.navy3} /><circle r={14} fill="#FFFFFF" /></g>
        </g>
        {/* # the grid operator brings a coin bag on "pays"; the plant's READY lamp lights on "available" */}
        <g opacity={on(f, grid19, 10)}>
          <Person f={f} who="owner" beats={[[0, 'walkA', 'neutral', 'walkB', 12], [pays19, 'offer', 'smiling'], [capacity, 'present', 'smiling']]} x={lerp(1500, 1120, on(f, grid19, 30))} y={GROUND} s={0.62} />
          <g transform={`translate(${lerp(1420, 940, on(f, pays19, 16))} ${GROUND - 120})`}>
            <path d="M-70 0 Q-80 -110 0 -120 Q80 -110 70 0 Q60 40 0 40 Q-60 40 -70 0 Z" fill="#B9864C" />
            <path d="M-30 -118 L0 -150 L30 -118" fill="none" stroke="#8E6232" strokeWidth={10} />
            <text y={14} textAnchor="middle" fill="#5A3A22" style={{ font: '800 54px Inter' }}>$</text>
          </g>
          <g opacity={on(f, available, 8)} transform={`translate(780 ${GROUND - 240})`}><circle r={30} fill={P.mint} /><circle r={52} fill={P.mint} opacity={0.25 * (0.6 + 0.4 * Math.sin(f / 6))} /></g>
        </g>
      </g>}

      {/* # D) who buys the promises: PJM, its region, its people */}
      {D > 0 && <g opacity={D}>
        <g opacity={on(f, eastern, 12)}><RegionMap x={1150} y={600} s={1.15} lit={Math.max(on(f, d13, 14) * (1 - on(f, jersey, 10)), 0.6 * on(f, region23, 8))} /></g>
        <g opacity={on(f, buys, 10)} transform={`translate(${lerp(-200, 0, on(f, buys, 16))} 0)`}>
          <Ground y={GROUND + 60} />
          <ControlHouse x={330} y={GROUND + 60} s={0.85} f={f} name={f >= pjm21 ? 'PJM' : ''} />
          {/* # promise scrolls flow from the control house to the plants it buys from */}
          {Array.from({ length: 3 }, (_, k) => { const p = fly(f, buys + 10 + k * 10, [300, GROUND - 200], [600 + k * 30, GROUND - 330], 22, 100); return p.o > 0 && f < runs ? <Scroll key={k} x={p.x} y={p.y} s={0.25} o={p.o} /> : null })}
        </g>
        {/* # the people of the region fill the map */}
        {Array.from({ length: 14 }, (_, k) => {
          const a = (k * 137.5) % 360, rr = 50 + (k % 5) * 50, x = 1150 + Math.cos((a * Math.PI) / 180) * rr * 1.5, y = 660 + Math.sin((a * Math.PI) / 180) * rr * 0.6
          return f >= people + k ? <g key={k} opacity={1 - on(f, d13, 10)}><Mini look={['buyer', 'investorF', 'worker', 'hero', 'investor', 'owner'][k % 6]} x={x} y={y} scale={0.95 * pop(f, people + k)} frame={f} seed={k + 40} mood="happy" /></g> : null
        })}
        <g opacity={on(f, washington, 8)}><Pin x={1420} y={640} label="D.C." /></g>
        <g opacity={on(f, jersey, 8)}><Pin x={1490} y={460} label="NEW JERSEY" s={0.9} /></g>
        <g opacity={on(f, penn, 8)}><Pin x={1240} y={440} label="PENNSYLVANIA" s={0.9} /></g>
        <g opacity={on(f, virginia, 8)}><Pin x={1330} y={760} label="VIRGINIA" s={0.9} /></g>
        <g opacity={on(f, ohio, 8)}><Pin x={1000} y={500} label="OHIO" s={0.9} /></g>
        <g opacity={on(f, illinois, 8)}><Pin x={790} y={560} label="ILLINOIS" s={0.9} /></g>
      </g>}
      <Vignette id="pw-bill" />
    </g>
  )
}

const BEATS = ['s10', 's10:more', 's11:part', 's11:poles', 's11:wires', 's11:home', 's12:part', 's12:energy', 's12:use', 's12:month', 's13:part', 's13:promise', 's14:promise', 's14:hottest', 's14:afternoon', 's14:air', 's14:running', 's14:enough', 's14:ready', 's14:lights', 's15:busiest', 's15:peak', 's16', 's16:store', 's16:amounts', 's16:run', 's17', 's17:costs', 's17:every', 's17:nobody', 's18:staff', 's18:paid', 's18:machines', 's18:working', 's19:grid', 's19:pays', 's19:available', 's20:capacity', 's21', 's21:eastern', 's21:buys', 's21:pjm', 's22:runs', 's22:67', 's22:people', 's22:13', 's22:washington', 's23:jersey', 's23:pennsylvania', 's23:virginia', 's23:ohio', 's23:illinois', 's12:electricity', 's23:region']
export const PW_BILL = makePiece('pw-bill', 'Power long: the note splits three ways (wires, energy, a promise); the hottest afternoon, ACs on, plants ready, the peak, too big to store; a ready plant costs money, the grid pays it — capacity; PJM, its region, people and states', {
  mood: 'light', Component: Bill, beats: BEATS,
  sfx: [['s10:more', 'swish', 0.3], ['s11:part', 'whoosh', 0.3], ['s12:part', 'whoosh', 0.3], ['s13:part', 'whoosh', 0.3], ['s13:promise', 'flutter', 0.3], ['s14:running', 'click', 0.3], ['s15:peak', 'riser', 0.3], ['s16:amounts', 'glitch', 0.25], ['s17:costs', 'coin', 0.3], ['s19:pays', 'cash', 0.35], ['s20:capacity', 'ding', 0.35], ['s21:pjm', 'pop', 0.3], ['s22:people', 'softpop', 0.3], ['s23:jersey', 'tick', 0.25], ['s23:illinois', 'tick', 0.25]] })
