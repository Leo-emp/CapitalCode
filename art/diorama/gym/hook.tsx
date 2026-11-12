// ---------------------------------------------------------------- s1–s6: 6,500 members, room for 300 (NPR 2014); today 7,200.
// A) 2014: a calendar page and an NPR paper; a budget gym opens (a $10 tag, a chain of gyms behind it); the average gym
//    comes forward and members stream in while a counter under it climbs to 6,500.
// B) The gym becomes its floor plan from above: 300 spots fill. One spot lights up and 20+ member tags fan out round it.
// C) Today: a cloud of members (20.8 million) spreads over a grid of gyms (2,896); one gym comes forward and its members
//    stream in to about 7,200. Inside, the floor is calm (not overflowing); a die rolls in and is crossed out (not luck).
// D) The gym floor with a few people vs homes with sleeping members whose coins arc in; follow one coin to the sign-up.
import React from 'react'
import { Mini } from '../../rig/Mini'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Calendar, Coin, fly, Headline, Label, Person, Prop, Tick, win } from '../aimoney/common'
import { FloorPlan, GymFront, KeyTag, MiniGym, Sofa, Treadmill, Zzz } from './kit'

const LOOKS = ['buyer', 'investor', 'hero', 'worker', 'owner', 'investorF']

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  // # A) 2014
  const s1 = c('s1'), npr = c('s1:npr'), inside = c('s1:inside'), budget = c('s1:budget'), chain = c('s1:chain'), planet = c('s1:planet')
  const found = c('s2:found'), average = c('s2:average'), gym2 = c('s2:gym'), had = c('s2:had'), d6500 = c('s2:6500'), members2 = c('s2:members')
  const but = c('s3:but'), hold = c('s3:hold'), d300 = c('s3:300'), once = c('s3:once')
  // # B) per spot
  const more = c('s3a:more'), d20 = c('s3a:20'), every = c('s3a:every'), spot = c('s3a:spot'), floor = c('s3a:floor')
  // # C) today
  const about = c('s3b:about'), d208 = c('s3b:208'), million = c('s3b:million'), spread = c('s3b:spread'), d2896 = c('s3b:2896'), gyms = c('s3b:gyms')
  const roughly = c('s3b:roughly'), d7200 = c('s3b:7200'), each = c('s3b:each')
  const yet = c('s4:yet'), overflowing = c('s4:overflowing'), that4 = c('s4:that'), luck = c('s4:luck')
  // # D) the business
  const whole = c('s5:whole'), most = c('s5:most'), pay = c('s5:pay'), hardly = c('s5:hardly')
  const follow = c('s6:follow'), money = c('s6:money'), step = c('s6:step'), sign = c('s6:sign')
  const A = win(f, s1, hold + 4), B = win(f, hold, about), C = win(f, about, whole), D = on(f, whole, 12)
  const count = Math.round(6500 * span(f, had, d6500 + 20))
  const count2 = Math.round(7200 * span(f, roughly, d7200 + 24))
  return (
    <g>
      <Stage id="gm-hook" frame={f} />
      <Headline f={f} lines={[[npr, 'NPR · 2014', P.ink, 104], [d6500, '≈ 6,500 MEMBERS PER GYM', P.ink, 100], [d300, 'ROOM FOR ≈ 300', P.ink, 110], [d20, '20+ MEMBERS PER SPOT', P.coralInk, 108], [d208, '≈ 20.8M MEMBERS · 2,896 GYMS', P.ink, 92], [d7200, 'TODAY ≈ 7,200 PER GYM', P.goldInk, 104], [overflowing, 'NOT OVERFLOWING', P.ink, 104], [whole, 'MOST WHO PAY HARDLY GO', P.ink, 100], [follow, 'FOLLOW THE MONEY', P.goldInk, 104]]} />
      {/* # A) 2014: the calendar, the paper, the budget gym and its members */}
      {A > 0 && <g opacity={A}>
        <rect x={-100} y={900} width={2120} height={200} fill="#D9C7A6" /><rect x={-100} y={900} width={2120} height={10} fill="#BFAE8E" />
        <g opacity={on(f, s1, 4) * (1 - on(f, average, 6))} transform={`translate(300 420) scale(${1.4 * pop(f, s1)})`}><Calendar x={0} y={0} text="2014" s={1} /></g>
        <g opacity={on(f, npr, 4) * (1 - on(f, average, 6))} transform={`translate(${lerp(1900, 1640, on(f, npr, 14))} 420) rotate(-6)`}><Prop id="newspaper" x={0} y={0} size={200} f={f} /><Label x={0} y={150} text="NPR" size={50} font="Bebas Neue" color={P.ink} /></g>
        {/* # the chain: two smaller gyms behind, they leave when the average gym comes forward */}
        <g opacity={on(f, chain, 4) * (1 - on(f, average, 6))}><GymFront x={420} y={900} s={0.55} lit={on(f, planet, 6)} /><GymFront x={1640} y={900} s={0.55} lit={on(f, planet, 6)} /></g>
        <g opacity={on(f, inside, 4)} transform={`translate(${lerp(1030, 960, on(f, average, 14))} 900) scale(${lerp(0.9, 1.15, on(f, average, 14)) * pop(f, inside)})`}><GymFront x={0} y={0} s={1} lit={on(f, planet, 6)} doors={on(f, inside, 16)} /></g>
        <g opacity={on(f, budget, 4) * (1 - on(f, average, 6))} transform={`translate(1350 560) rotate(${-10 + 10 * on(f, budget, 12)})`}><rect x={-80} y={-46} width={160} height={92} rx={18} fill="#F08A3C" /><text x={0} y={22} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 60px "Bebas Neue"' }}>$10</text></g>
        {/* # members stream to the door; the counter climbs to 6,500 */}
        {Array.from({ length: 18 }, (_, k) => {
          const at = (k < 9 ? gym2 : members2) + (k % 9) * 3, t = span(f, at, at + 40), x = lerp(-80 - (k % 9) * 60, 860 - k * 34, t)
          return f >= at ? <Mini key={k} look={LOOKS[k % 6]} x={x} y={1030} scale={1.05} frame={f} seed={k + 5} mood="happy" /> : null
        })}
        <g opacity={on(f, had, 4)}><rect x={1300} y={930} width={420} height={120} rx={20} fill={P.navy1} /><text x={1510} y={1014} textAnchor="middle" fill={P.gold} style={{ font: '400 80px "JetBrains Mono"' }}>{count.toLocaleString('en-US')}</text></g>
        <g opacity={on(f, found, 4) * (1 - on(f, average, 4))}><Prop id="magnifier" x={1640} y={640} size={130} f={f} /></g>
        {/* # "but": the stream stops — a door frame flashes */}
        <rect x={880} y={700} width={160} height={200} rx={8} fill={P.coral} opacity={0.35 * on(f, but, 4) * (1 - on(f, but + 14, 4))} />
      </g>}
      {/* # B) the floor plan: 300 spots; one spot with 20+ tags around it */}
      {B > 0 && <g opacity={B} transform={`translate(0 ${30 * (1 - on(f, hold, 14))})`}>
        <g opacity={1 - 0.75 * on(f, more, 12)}><FloorPlan x={960} y={600} w={1100} h={640} cols={20} rows={15} taken={on(f, d300, 30)} /></g>
        <rect x={350} y={240} width={1220} height={720} rx={36} fill="none" stroke={P.goldInk} strokeWidth={8} opacity={on(f, once, 4) * (1 - on(f, once + 16, 4))} />
        <g opacity={on(f, more, 4)}>
          <circle cx={960} cy={600} r={80 * (1 + 0.15 * Math.sin(Math.PI * span(f, spot, spot + 14)))} fill="#F08A3C" stroke="#C96A22" strokeWidth={6} />
          {Array.from({ length: 21 }, (_, k) => { const a = (k / 21) * Math.PI * 2, t = on(f, d20 + k * 0.8, 4); return <g key={k} opacity={t} transform={`translate(${960 + Math.cos(a) * 300 * t} ${600 + Math.sin(a) * 240 * t}) rotate(${(a * 180) / Math.PI + 90}) scale(0.32)`}><KeyTag x={0} y={0} text="" /></g> })}
          {[-1, 1].map((k) => <circle key={k} cx={960 + k * 560} cy={600} r={60} fill="none" stroke="#C96A22" strokeWidth={5} strokeDasharray="10 8" opacity={on(f, every, 6)} />)}
          <rect x={350} y={240} width={1220} height={720} rx={36} fill="none" stroke={P.goldInk} strokeWidth={6} strokeDasharray="16 12" opacity={on(f, floor, 6)} />
        </g>
      </g>}
      {/* # C) today: members over a grid of gyms; one gym comes forward to 7,200; calm inside; not luck */}
      {C > 0 && <g opacity={C}>
        <g opacity={1 - on(f, roughly, 12)}>
          {Array.from({ length: 40 }, (_, k) => <MiniGym key={k} x={420 + (k % 10) * 120} y={560 + Math.floor(k / 10) * 120} s={0.95} o={on(f, spread + k * 0.4, 4)} lit={on(f, gyms, 6)} />)}
          {Array.from({ length: 140 }, (_, k) => {
            const sx = 960 + Math.cos(k * 2.4) * (60 + (k % 7) * 20 * (0.4 + on(f, million, 12))), sy = 340 + Math.sin(k * 2.4) * (30 + (k % 5) * 12)
            const tx = 420 + (k % 10) * 120 + ((k * 37) % 50) - 25, ty = 520 + (Math.floor(k / 10) % 4) * 120 + ((k * 53) % 30) - 15
            const t = on(f, d2896 + (k % 20), 14)
            return <circle key={k} cx={lerp(sx, tx, t)} cy={lerp(sy, ty, t)} r={6} fill={['#5BCBFF', '#F06B5B', '#3DDC97', '#E9C25A'][k % 4]} opacity={on(f, d208 + (k % 12), 4)} />
          })}
          <g opacity={on(f, across(c), 4)}><Label x={960} y={1050} text="2,896 GYMS" size={52} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, roughly, 4) * (1 - on(f, yet, 6))}>
          <GymFront x={960} y={880} s={1.15 * pop(f, roughly)} lit={1} doors={1} sign="ONE GYM" />
          {Array.from({ length: 18 }, (_, k) => { const at = roughly + k * 2, t = span(f, at, at + 36); return f >= at ? <Mini key={k} look={LOOKS[k % 6]} x={lerp(2000 + (k % 6) * 60, 1160 + (k % 9) * 70, t)} y={1030} scale={0.95} frame={f} seed={k + 50} mood="happy" /> : null })}
          <g opacity={on(f, d7200, 4)}><rect x={200} y={930} width={420} height={120} rx={20} fill={P.navy1} /><text x={410} y={1014} textAnchor="middle" fill={P.gold} style={{ font: '400 80px "JetBrains Mono"' }}>{count2.toLocaleString('en-US')}</text></g>
          <g opacity={on(f, each, 4)}><Tick x={620} y={930} o={1} r={40} /></g>
        </g>
        <g opacity={on(f, yet, 4)}>
          <FloorPlan x={900} y={600} w={900} h={520} cols={20} rows={15} taken={0.05 * on(f, overflowing, 12)} />
          <g opacity={on(f, overflowing, 4)}>{[0, 1, 2].map((k) => <Mini key={k} look={LOOKS[k]} x={640 + k * 260} y={720} scale={0.8} frame={f} seed={k + 70} mood="happy" />)}</g>
          <g opacity={on(f, that4, 4)} transform={`translate(${lerp(1900, 1620, on(f, that4, 14))} 640) rotate(${lerp(200, 0, on(f, that4, 14))})`}><Prop id="dice" x={0} y={0} size={180} f={f} /></g>
          <g opacity={on(f, luck, 4)} transform="translate(1620 640)"><Prop id="cross" x={0} y={0} size={220} f={f} /></g>
        </g>
      </g>}
      {/* # D) gym floor with a few people vs homes with the members who pay and stay away */}
      {D > 0 && <g opacity={D}>
        <g transform={`translate(0 ${40 * (1 - on(f, c('s5:built'), 14))})`}><rect x={140} y={430} width={760} height={520} rx={30} fill="#E7DCC6" stroke="#CDB58C" strokeWidth={5} />
        <rect x={140} y={430} width={760} height={520} rx={30} fill={P.gold} opacity={0.18 * on(f, c('s6:works'), 6)} />
        <g transform={`translate(330 880) scale(${pop(f, c('s5:fact'))}) translate(-330 -880)`}><Treadmill x={330} y={880} s={0.8} f={f} run={1} used={1} /></g><g opacity={on(f, c('s5:fact') + 4, 4)}><Treadmill x={700} y={880} s={0.8} f={f} run={0} used={0} /></g></g>
        <Person f={f} who="investorF" beats={[[0, 'runA', 'smiling', 'runB', 12]]} x={300} y={862} s={0.62} />
        {[0, 1, 2].map((k) => {
          const hx = 1190 + k * 300, hy = 600 + (k % 2) * 330
          return (
            <g key={k} opacity={on(f, most + k * 5, 6)}>
              <Sofa x={hx} y={hy} s={0.56} />
              <Mini look={LOOKS[k + 1]} x={hx} y={hy - 30} scale={0.95} frame={f} seed={k + 30} />
              <Zzz x={hx + 40} y={hy - 140} f={f} o={on(f, hardly, 6)} />
            </g>
          )
        })}
        {/* # each home's coin arcs into the gym on "pay" */}
        {Array.from({ length: 9 }, (_, k) => {
          const src: [number, number] = [1190 + (k % 3) * 300, 480 + (k % 2) * 330], p = fly(f, pay + k * 5, src, [520, 470], 24, 180)
          return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.7} o={p.o} /> : null
        })}
        {/* # follow the money: one coin rolls along a dotted path to a member key tag */}
        <path d="M1190 760 C 1100 900, 900 980, 760 980" fill="none" stroke={P.goldInk} strokeWidth={5} strokeDasharray="10 14" opacity={on(f, c('s6:see'), 6) * 0.8} />
        {f >= money && (() => { const t = span(f, money, step + 10), x = lerp(1180, 760, t), y = lerp(760, 960, t) - Math.sin(t * Math.PI) * 60; return <Coin x={x} y={y} s={0.6} /> })()}
        <g opacity={on(f, sign, 4)} transform={`translate(720 960) scale(${0.6 * pop(f, sign)})`}><KeyTag x={0} y={0} text="JOIN" /></g>
      </g>}
      <Vignette id="gm-hook" />
    </g>
  )
}
// # the "across" cue (kept out of the main list so the label lands with the spoken word)
const across = (c: (k: string) => number) => c('s3b:across')

export const GM_HOOK = makePiece('gm-hook', 'Gym long: NPR 2014 — the average Planet Fitness had 6,500 members, room for 300 (20+ per spot); today 20.8M members across 2,896 gyms ≈ 7,200 each; not overflowing, not luck; most who pay stay home; follow the money to sign-up', {
  mood: 'light', Component: Hook,
  beats: ["s1", "s1:npr", "s1:inside", "s1:budget", "s1:chain", "s1:planet", "s2:found", "s2:average", "s2:gym", "s2:had", "s2:6500", "s2:members", "s3:but", "s3:hold", "s3:300", "s3:once", "s3a:more", "s3a:20", "s3a:every", "s3a:spot", "s3a:floor", "s3b:about", "s3b:208", "s3b:million", "s3b:spread", "s3b:2896", "s3b:gyms", "s3b:roughly", "s3b:7200", "s3b:each", "s4:yet", "s4:overflowing", "s4:that", "s4:luck", "s5:whole", "s5:most", "s5:pay", "s5:hardly", "s6:follow", "s6:money", "s6:step", "s6:sign", "s5:built", "s6:works", "s5:fact", "s6:see", "s3b:across"],
  sfx: [['s1:npr', 'flutter', 0.3], ['s1:inside', 'pop', 0.3], ['s2:6500', 'tick', 0.3], ['s3:300', 'tick', 0.3], ['s3a:20', 'riser', 0.3], ['s3b:spread', 'swish', 0.3], ['s3b:7200', 'pop', 0.3], ['s4:luck', 'thud', 0.35], ['s5:pay', 'coin', 0.4], ['s6:sign', 'ding', 0.35]] })
