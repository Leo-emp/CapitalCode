// ============================================================
// SHORT — "Your Gym Sells 22 Memberships Per Spot" (s1–s25, ≈ 2:07),
// five tall pieces. Sourced: NPR Planet Money 30 Dec 2014 (average
// Planet Fitness gym ≈ 6,500 members; most gyms hold ≈ 300 at once);
// Planet Fitness 10-K FY2025 (basic plan from $15 a month);
// DellaVigna & Malmendier, AER 2006 (7,752 members; $70+ plans, 4.3
// visits a month, $17+ a visit vs a $10 ten-visit pass). Our maths:
// 6,500 / 300 ≈ 22; 15 / 12 ≈ $1.25.
// House rules: every picture lands on its spoken word, never before;
// one main group at a time, the last leaves before the next arrives;
// no zooms or camera moves (owner r56) — the drawing itself changes;
// all inside x 60–940, y 380–1270 (captions sit at y 1290–1490).
// The gym objects come from ../gym/kit (shared building blocks).
// ============================================================
import React from 'react'
import { Mini } from '../../rig/Mini'
import { Label } from '../charts'
import { easeOut, lerp, on, P, pop, span, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Calendar, Coin, Doc, fly, Person, Tick } from '../aimoney/common'
import { BankCard, BillCard, FloorPlan, GymFront, KeyTag, PunchCard, SeatRow, SeeSaw, Sofa, SplitBar, Thought, Ticket, Towel, Treadmill, VisitStrip, Zzz } from '../gym/kit'
import { Prop, TallStage } from './tall'

const CX = 500
const LOOKS = ['buyer', 'investor', 'hero', 'worker', 'owner', 'investorF']
// # visible from a to b with clean fades (gone by b)
const win = (f: number, a: number, b: number, d = 5) => on(f, a, d) * (1 - easeOut(span(f, b - d, b)))
// # one headline slot at y 330: each line from its cue until the next line's cue
type Head = [at: number, text: string, color?: string, size?: number]
const Headline: React.FC<{ f: number; lines: Head[]; until?: number; y?: number }> = ({ f, lines, until = 9e9, y = 330 }) => (
  <g>{lines.map(([a, text, color, size], k) => {
    const b = k + 1 < lines.length ? lines[k + 1][0] : until
    const o = on(f, a, 5) * (1 - easeOut(span(f, b - 5, b)))
    return o > 0.001 ? <g key={k} transform={`translate(${CX} ${y}) scale(${0.94 + 0.06 * on(f, a, 8)})`}><Label x={0} y={0} text={text} size={size ?? 96} font="Bebas Neue" color={color ?? P.ink} o={o} /></g> : null
  })}</g>
)
const Tag: React.FC<{ x: number; y: number; text: string; s?: number; o?: number; color?: string }> = ({ x, y, text, s = 1, o = 1, color = '#F08A3C' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><rect x={-100} y={-56} width={200} height={112} rx={20} fill={color} /><text x={0} y={24} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 74px "Bebas Neue"' }}>{text}</text></g>
)

// ------------------------------------------------------------ 1) s1–s5a: 6,500 members, room for 300
const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const s1 = c('s1'), npr = c('s1:npr'), gym = c('s1:gym'), had = c('s1:had'), d6500 = c('s1:6500'), members = c('s1:members')
  const but = c('s2:but'), hold = c('s2:hold'), d300 = c('s2:300'), once = c('s2:once')
  const about3 = c('s3:about'), d22 = c('s3:22'), every3 = c('s3:every'), spot = c('s3:spot'), floor = c('s3:floor')
  const why = c('s4:why'), packed = c('s4:packed'), day4 = c('s4:day')
  const because = c('s5:because'), business = c('s5:business'), pay = c('s5:pay'), month5 = c('s5:month'), come = c('s5:come')
  const cinema = c('s5a:cinema'), sold = c('s5a:sold'), d22b = c('s5a:22'), seat = c('s5a:seat'), show = c('s5a:show'), fight = c('s5a:fight'), gym5 = c('s5a:gym'), away = c('s5a:away')
  const A = win(f, s1, hold + 4), B = win(f, hold, why), C = win(f, why, cinema), D = on(f, cinema, 6)
  const count = Math.round(6500 * span(f, had, d6500 + 16))
  const crowd = 420 * on(f, packed, 16) * (1 - on(f, because, 14))
  return (
    <g>
      <TallStage id="gs-hook" f={f} />
      <Headline f={f} lines={[[npr, 'NPR · 2014', P.ink], [d6500, '≈ 6,500 MEMBERS', P.ink], [d300, 'ROOM FOR ≈ 300', P.ink], [d22, '≈ 22 PER SPOT', P.coralInk, 110], [why, 'WHY NOT PACKED?', P.ink], [business, 'PAY, DON\'T COME', P.goldInk], [cinema, '22 TICKETS PER SEAT?', P.coralInk, 88], [gym5, 'A GYM GETS AWAY WITH IT', P.goldInk, 80]]} />
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, s1, 5) * (1 - on(f, gym, 8))} transform={`translate(330 640) scale(${1.6 * pop(f, s1)})`}><Calendar x={0} y={0} text="2014" s={1} /></g>
        <g opacity={on(f, npr, 5) * (1 - on(f, gym, 8))} transform={`translate(${lerp(1000, 690, on(f, npr, 12))} 640) rotate(-6)`}><Prop id="newspaper" x={0} y={0} size={240} f={f} /></g>
        <g opacity={on(f, gym, 5)} transform={`translate(${CX} 900) scale(${0.78 * pop(f, gym)})`}><GymFront x={0} y={0} lit={1} doors={on(f, gym + 6, 14)} /></g>
        {Array.from({ length: 10 }, (_, k) => { const at = had + k * 3, t = span(f, at, at + 30); return f >= at ? <Mini key={k} look={LOOKS[k % 6]} x={lerp(-60, 260 + k * 46, t)} y={1060} scale={0.85} frame={f} seed={k + 3} mood="happy" /> : null })}
        <g opacity={on(f, d6500, 5)}><rect x={300} y={1120} width={400} height={120} rx={20} fill={P.navy1} /><text x={500} y={1206} textAnchor="middle" fill={P.gold} style={{ font: '400 84px "JetBrains Mono"' }}>{count.toLocaleString('en-US')}</text></g>
        <g opacity={on(f, members, 5)}>{[0, 1, 2].map((k) => <Mini key={k} look={LOOKS[(k + 3) % 6]} x={740 + k * 70} y={1060} scale={0.85} frame={f} seed={k + 20} mood="happy" />)}</g>
        <rect x={380} y={680} width={240} height={220} rx={10} fill={P.coral} opacity={0.35 * on(f, but, 5) * (1 - on(f, but + 12, 6))} />
      </g>}
      {B > 0 && <g opacity={B}>
        <g opacity={1 - 0.7 * on(f, about3, 10)}><FloorPlan x={CX} y={820} w={780} h={700} cols={15} rows={20} taken={on(f, d300, 26)} /></g>
        <rect x={80} y={440} width={840} height={760} rx={34} fill="none" stroke={P.goldInk} strokeWidth={8} opacity={on(f, once, 5) * (1 - on(f, once + 14, 6))} />
        <g opacity={on(f, about3, 5)}>
          <circle cx={CX} cy={820} r={70 * (1 + 0.15 * Math.sin(Math.PI * span(f, spot, spot + 12)))} fill="#F08A3C" stroke="#C96A22" strokeWidth={6} />
          {Array.from({ length: 22 }, (_, k) => { const a = (k / 22) * Math.PI * 2, t = on(f, d22 + k * 0.8, 5); return <g key={k} opacity={t} transform={`translate(${CX + Math.cos(a) * 300 * t} ${820 + Math.sin(a) * 300 * t}) rotate(${(a * 180) / Math.PI + 90}) scale(0.3)`}><KeyTag x={0} y={0} text="" /></g> })}
          {[-1, 1].map((k) => <circle key={k} cx={CX} cy={820 + k * 420} r={46} fill="none" stroke="#C96A22" strokeWidth={5} strokeDasharray="10 8" opacity={on(f, every3, 8)} />)}
          <rect x={80} y={440} width={840} height={760} rx={34} fill="none" stroke={P.goldInk} strokeWidth={6} strokeDasharray="16 12" opacity={on(f, floor, 8)} />
        </g>
      </g>}
      {C > 0 && <g opacity={C}>
        <FloorPlan x={CX} y={760} w={700} h={620} cols={15} rows={20} taken={0} crowd={crowd} f={f} tilt={5 * on(f, packed, 8)} />
        <g opacity={on(f, why, 5) * (1 - on(f, packed, 6))} transform="translate(500 760)"><Prop id="question" x={0} y={0} size={220} f={f} /></g>
        <g opacity={on(f, day4, 5) * (1 - on(f, because, 6))} transform="translate(820 470) scale(1.1)"><Calendar x={0} y={0} text="DAY" s={1} /></g>
        <g opacity={on(f, because, 5)}>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, (k === 0 ? because : pay) + k * 3, 5)}><Sofa x={220 + k * 280} y={1210} s={0.42} /><Mini look={LOOKS[k + 1]} x={220 + k * 280} y={1190} scale={0.8} frame={f} seed={k + 30} /><Zzz x={260 + k * 280} y={1080} f={f} o={on(f, come, 6)} /></g>)}
          {Array.from({ length: 6 }, (_, k) => { const p = fly(f, pay + k * 4, [220 + (k % 3) * 280, 1100], [CX, 760], 22, 160); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.8} o={p.o} /> : null })}
          <g opacity={on(f, business, 5)} transform="translate(840 1000)"><Coin x={0} y={0} s={1.2} text="15" /></g>
          <g opacity={on(f, month5, 5)} transform="translate(160 1000) scale(0.9)"><Calendar x={0} y={0} text="MONTH" s={1} /></g>
        </g>
      </g>}
      {D > 0 && <g opacity={D}>
        <g opacity={1 - on(f, gym5, 8)}>
          <rect x={120} y={480} width={760} height={230} rx={14} fill="#1C2230" /><rect x={140} y={500} width={720} height={190} rx={8} fill="#5BCBFF" opacity={0.35} />
          <SeatRow x={CX} y={1120} n={5} filled={f >= seat ? 5 : 0} s={1.2} />
          {Array.from({ length: 22 }, (_, k) => <g key={k} opacity={on(f, (k < 6 ? sold : d22b) + k * 0.6, 4)} transform={`translate(${CX + ((k * 37) % 300) - 150} ${880 - Math.floor(k / 4) * 26}) rotate(${(k % 5) * 12 - 24}) scale(0.4)`}><Ticket x={0} y={0} text="A1" /></g>)}
          <g opacity={on(f, show, 5)}>{Array.from({ length: 8 }, (_, k) => <Mini key={k} look={LOOKS[k % 6]} x={180 + k * 92 + 10 * Math.sin((f - fight) / 2) * on(f, fight, 4)} y={1240} scale={0.75} frame={f} seed={k + 40} mood={f >= fight ? 'sad' : 'neutral'} />)}</g>
        </g>
        <g opacity={on(f, gym5, 5)}>
          <GymFront x={CX} y={1000} s={0.8} lit={1} doors={1} />
          <Mini look="investorF" x={CX - 120} y={1100} scale={0.9} frame={f} seed={50} mood="happy" />
          <g opacity={on(f, away, 5)}><Tick x={820} y={640} o={1} r={50} /></g>
        </g>
      </g>}
      <Vignette id="gs-hook" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 2) s6–s10: one $15, any number of visits
const Price: React.FC<PieceProps> = ({ f, c }) => {
  const s6 = c('s6'), buy = c('s6:buy'), member = c('s6:member'), basic = c('s6:basic'), d15 = c('s6:15'), month6 = c('s6:month')
  const same = c('s7:same'), d15b = c('s7:15'), everyDay = c('s7:every'), never = c('s7:never'), all = c('s7:all')
  const d12 = c('s8:12'), month8 = c('s8:month'), each = c('s8:each'), dollar = c('s8:dollar')
  const once = c('s9:once'), workout9 = c('s9:workout'), full = c('s9:full'), d15c = c('s9:15')
  const gym10 = c('s10:gym'), both = c('s10:both'), worth = c('s10:worth'), same10 = c('s10:same'), d15d = c('s10:15')
  const A = win(f, s6, same), B = win(f, same, gym10), C = on(f, gym10, 6)
  const parts = f >= once ? 1 : f >= d12 + 6 ? 12 : 1
  const visits = f >= once ? 1 : f >= d12 ? Math.round(12 * span(f, d12, month8 + 8)) : 0
  return (
    <g>
      <TallStage id="gs-price" f={f} />
      <Headline f={f} lines={[[buy, 'WHAT YOU BUY', P.ink], [d15, '$15 A MONTH', P.goldInk, 110], [same, 'SAME $15, ANY USE', P.ink], [dollar, '≈ $1.25 A VISIT', P.mintInk, 104], [full, '$15 A VISIT', P.coralInk, 104], [same10, 'TO THE GYM: THE SAME', P.ink, 90]]} />
      {A > 0 && <g opacity={A}>
        <rect x={140} y={1040} width={720} height={170} rx={20} fill="#C9B48E" /><rect x={140} y={1020} width={720} height={30} rx={12} fill="#E2D2B0" />
        <Person f={f} who="hero" beats={[[0, 'present', 'neutral'], [member, 'receive', 'smiling'], [basic, 'holdUp', 'smiling'], [d15, 'countOne', 'neutral']]} x={330} y={1190} s={0.72} />
        <g opacity={on(f, member, 5)} transform={`translate(700 760) scale(${0.7 * pop(f, member)})`}><KeyTag x={0} y={0} text={f >= basic ? 'BASIC' : 'MEMBER'} /></g>
        <g opacity={on(f, d15, 5)} transform={`translate(700 540) scale(${pop(f, d15)})`}><Coin x={0} y={0} s={2} text="15" /></g>
        <g opacity={on(f, month6, 5)} transform="translate(860 920) scale(0.9)"><Calendar x={0} y={0} text="MONTH" s={1} /></g>
      </g>}
      {B > 0 && <g opacity={B}>
        <g transform={`translate(0 ${-12 * Math.sin(Math.PI * span(f, d15b, d15b + 12))})`}><SplitBar x={CX} y={560} w={780} n={parts} t={span(f, d12 + 6, d12 + 18)} total="$15 A MONTH" each={f >= workout9 ? '$15 A VISIT' : f >= dollar ? '$1.25 A VISIT' : ''} /></g>
        <rect x={110} y={500} width={780 / parts} height={120} rx={14} fill="none" stroke={P.goldInk} strokeWidth={8} opacity={Math.max(on(f, each, 5) * (1 - on(f, once, 5)), on(f, workout9, 5))} />
        <g opacity={on(f, everyDay, 5) * (1 - on(f, d12, 6))}>
          <Treadmill x={290} y={1120} s={0.9} f={f} run={1} used={1} /><Person f={f} who="investorF" beats={[[0, 'runA', 'smiling', 'runB', 12]]} x={265} y={1100} s={0.6} />
          <g opacity={on(f, never, 5)}><Sofa x={730} y={1140} s={0.62} /><Mini look="buyer" x={730} y={1110} scale={1.05} frame={f} seed={9} /><Zzz x={780} y={960} f={f} o={on(f, all, 5)} /></g>
        </g>
        <g opacity={on(f, d12, 5)}><VisitStrip x={CX} y={900} n={visits} w={760} /><Label x={CX} y={990} text={visits === 1 ? '1 VISIT' : `${visits} VISITS`} size={56} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, month8, 5) * (1 - on(f, once, 5))} transform="translate(820 1120) scale(0.9)"><Calendar x={0} y={0} text="MONTH" s={1} /></g>
        <g opacity={on(f, once, 5)}><Sofa x={CX} y={1200} s={0.55} /><Mini look="buyer" x={CX} y={1175} scale={0.95} frame={f} seed={10} /></g>
        <g opacity={on(f, d15c, 5)}><Coin x={760} y={1110} s={1.2} text="15" /></g>
      </g>}
      {C > 0 && <g opacity={C}>
        <GymFront x={CX} y={760} s={0.7} lit={1} />
        <g opacity={on(f, both, 5)}>
          <Treadmill x={270} y={1150} s={0.75} f={f} run={1} used={1} /><Person f={f} who="investorF" beats={[[0, 'runA', 'smiling', 'runB', 12]]} x={250} y={1130} s={0.5} />
          <Sofa x={740} y={1170} s={0.5} /><Mini look="buyer" x={740} y={1145} scale={0.9} frame={f} seed={11} />
        </g>
        {[0, 1].map((k) => { const p = fly(f, worth + k * 5, [k ? 740 : 270, 980], [CX, 700], 20, 120); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={1} o={p.o} text="15" /> : null })}
        <g opacity={on(f, same10, 5)}><Label x={CX} y={1010} text="=" size={150} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, d15d, 5)}><Tag x={CX} y={480} text="$15" s={0.9} /></g>
      </g>}
      <Vignette id="gs-price" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 3) s11–s14a: fixed bills, a stay-home member is pure income
const Owner: React.FC<PieceProps> = ({ f, c }) => {
  const s11 = c('s11'), owner = c("s11:owner's"), bills = c('s11:bills'), rent = c('s11:rent'), machines = c('s11:machines'), staff = c('s11:staff'), power = c('s11:power')
  const cost = c('s12:cost'), same = c('s12:same'), many = c('s12:many'), walk = c('s12:walk')
  const signs = c('s13:signs'), home = c('s13:home'), gets = c('s13:gets'), nothing = c('s13:nothing')
  const sell = c('s14:sell'), memberships = c('s14:memberships'), fit = c('s14:fit')
  const machine = c('s14a:machine'), towel = c('s14a:towel'), washed = c('s14a:washed')
  const A = win(f, s11, signs), B = win(f, signs, sell), C = win(f, sell, machine), D = on(f, machine, 6)
  const BILLS: ['rent' | 'machines' | 'staff' | 'power', string, number][] = [['rent', 'RENT', rent], ['machines', 'MACHINES', machines], ['staff', 'STAFF', staff], ['power', 'POWER', power]]
  const stack = on(f, cost, 14)
  return (
    <g>
      <TallStage id="gs-owner" f={f} />
      <Headline f={f} lines={[[bills, "THE OWNER'S BILLS", P.ink], [same, 'SAME, ANY CROWD', P.ink], [gets, '+$15, ≈ NO COST', P.goldInk], [sell, 'SELL MORE THAN FITS', P.ink, 90], [machine, 'NOTHING WEARS OUT', P.ink, 90]]} />
      {A > 0 && <g opacity={A}>
        <Person f={f} who="owner" beats={[[0, 'present', 'neutral'], [owner, 'point', 'neutral'], [rent, 'countA', 'thinking', 'countB', 14], [cost, 'explain', 'neutral'], [walk, 'shrug', 'smiling']]} x={220} y={1240} s={0.6} />
        {BILLS.map(([kind, label, at], k) => {
          const t = stack, x = lerp(330 + (k % 2) * 330, 600, t), y = lerp(560 + Math.floor(k / 2) * 330, 640 - k * 18, t)
          return <g key={kind} opacity={on(f, at, 5)} transform={`translate(${x} ${y}) scale(${0.95 * pop(f, at)})`}><BillCard x={0} y={0} kind={kind} label={label} /></g>
        })}
        <g opacity={stack}><line x1={430} y1={480} x2={770} y2={480} stroke={P.coralInk} strokeWidth={6} strokeDasharray="12 10" /><Label x={600} y={860} text="EVERY MONTH" size={52} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, many, 5)}>{Array.from({ length: 12 }, (_, k) => <g key={k} opacity={k < 2 || f >= walk + k * 2 ? 1 : 0}><Mini look={LOOKS[k % 6]} x={420 + (k % 6) * 80} y={1060 + Math.floor(k / 6) * 120} scale={0.65} frame={f} seed={k + 60} /></g>)}</g>
      </g>}
      {B > 0 && <g opacity={B}>
        <Person f={f} who="owner" beats={[[0, 'idle', 'neutral'], [gets, 'receive', 'smiling'], [nothing, 'thumbsUp', 'smiling']]} x={220} y={1240} s={0.6} />
        <Sofa x={720} y={1200} s={0.6} />
        <Mini look="buyer" x={lerp(450, 720, span(f, home, home + 26))} y={1170} scale={1.05} frame={f} seed={70} />
        <g opacity={on(f, signs, 5) * (1 - on(f, home, 8))} transform="translate(560 900) scale(0.5)"><KeyTag x={0} y={0} text="JOIN" /></g>
        {(() => { const p = fly(f, gets, [720, 1000], [260, 900], 24, 200); return p.o > 0 ? <Coin x={p.x} y={p.y} s={1.1} o={p.o} text="15" /> : null })()}
        <g opacity={on(f, nothing, 5)}><BillCard x={560} y={620} kind="power" label="SAME BILLS" /><Tick x={700} y={480} o={1} r={44} /></g>
      </g>}
      {C > 0 && <g opacity={C}>
        <GymFront x={330} y={1100} s={0.55} lit={1} />
        <g opacity={on(f, fit, 5)}><Label x={330} y={1190} text="FITS ≈ 300" size={52} font="Bebas Neue" color={P.ink} /></g>
        {Array.from({ length: 30 }, (_, k) => <g key={k} opacity={on(f, (k < 12 ? sell : memberships) + (k % 12), 3)} transform={`translate(${640 + (k % 5) * 56} ${1150 - Math.floor(k / 5) * 110}) rotate(${(k % 3 - 1) * 8}) scale(0.26)`}><KeyTag x={0} y={0} text="" /></g>)}
      </g>}
      {D > 0 && <g opacity={D}>
        <Treadmill x={CX} y={760} s={1.1} f={f} /><Tick x={760} y={520} o={1} r={50} />
        <g opacity={on(f, towel, 5)}><Towel x={CX} y={1140} s={1.4} /><g opacity={on(f, washed, 5)}><Tick x={720} y={1000} o={1} r={44} /></g></g>
      </g>}
      <Vignette id="gs-owner" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 4) s15–s20: we pay for who we plan to be
const Study: React.FC<PieceProps> = ({ f, c }) => {
  const s15 = c('s15'), home15 = c('s15:home'), expect = c('s15:expect')
  const econ = c('s16:economists'), berkeley = c('s16:berkeley'), records = c('s16:records'), d7752 = c('s16:7752')
  const plans = c('s17:plans'), d70 = c('s17:70'), went = c('s17:went'), d4 = c('s17:4')
  const worked = c('s18:worked'), d17 = c('s18:17'), pass = c('s18:10visit'), d10 = c('s18:10')
  const sign19 = c('s19:sign'), plan = c('s19:plan'), are = c('s19:are')
  const signup = c('s19a:signup'), picture = c('s19a:picture'), three = c('s19a:three')
  const busy = c('s19b:busy'), another = c('s19b:another'), payment = c('s19b:payment')
  const low = c('s20:low'), real = c('s20:real'), paid = c('s20:paid'), home20 = c('s20:home')
  const A = win(f, s15, econ), B = win(f, econ, worked), C = win(f, worked, sign19), D = win(f, sign19, low), E = on(f, low, 6)
  const hero = [[0, 'think', 'thinking'], [plan, 'lookFar', 'smiling'], [are, 'shrug', 'thinking'], [signup, 'signA', 'smiling', 'signB', 10], [picture, 'lookFar', 'smiling'], [busy, 'nervous', 'worried'], [payment, 'emptyPockets', 'worried']] as const
  return (
    <g>
      <TallStage id="gs-study" f={f} />
      <Headline f={f} lines={[[home15, 'THEY STAY HOME', P.ink], [berkeley, 'A BERKELEY STUDY', P.ink], [d70, '$70+ A MONTH', P.ink], [d4, '≈ 4 VISITS A MONTH', P.ink, 90], [d17, '$17+ A VISIT', P.coralInk, 104], [d10, 'PASS: $10 A VISIT', P.mintInk, 96], [plan, 'THE PERSON WE PLAN TO BE', P.goldInk, 70], [low, 'PAID FOR BY WHO STAYS HOME', P.goldInk, 66]]} />
      {A > 0 && <g opacity={A}>
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, s15 + k * 6, 5)}><Sofa x={260 + (k % 2) * 460} y={760 + k * 220} s={0.5} /><Mini look={LOOKS[k + 1]} x={260 + (k % 2) * 460} y={740 + k * 220} scale={0.85} frame={f} seed={k + 80} /><Zzz x={300 + (k % 2) * 460} y={620 + k * 220} f={f} o={on(f, home15, 5)} /></g>)}
        <Thought x={CX} y={560} w={640} h={220} o={on(f, expect, 5)}><VisitStrip x={0} y={0} n={12} w={520} /><Label x={0} y={70} text="EXPECTED" size={40} font="Bebas Neue" color={P.ink2} /></Thought>
      </g>}
      {B > 0 && <g opacity={B}>
        <Person f={f} who="investor" beats={[[0, 'read', 'thinking'], [d7752, 'point', 'neutral']]} x={230} y={1240} s={0.55} />
        <Person f={f} who="investorF" beats={[[0, 'measure', 'thinking'], [plans, 'pointUp', 'neutral']]} x={400} y={1240} s={0.55} />
        <g opacity={on(f, berkeley, 5) * (1 - on(f, records, 6))} transform="translate(700 700)"><Prop id="school" x={0} y={0} size={300} f={f} /></g>
        <g opacity={on(f, records, 5) * (1 - on(f, d7752, 6))}>{[0, 1, 2].map((k) => <g key={k} transform={`translate(${380 + k * 200} 700) scale(${pop(f, records + k * 4)})`}><Prop id="newspaper" x={0} y={0} size={170} f={f} /></g>)}</g>
        <g opacity={on(f, d7752, 5) * (1 - on(f, plans, 6))}>{Array.from({ length: 120 }, (_, k) => <circle key={k} cx={200 + (k % 12) * 56} cy={480 + Math.floor(k / 12) * 50} r={16} fill={['#5BCBFF', '#F06B5B', '#3DDC97', '#E9C25A'][k % 4]} opacity={on(f, d7752 + k * 0.12, 4)} />)}<Label x={740} y={1020} text="7,752 MEMBERS" size={60} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, plans, 5)} transform={`translate(640 640) scale(${0.95 * pop(f, plans)})`}><KeyTag x={0} y={0} text={f >= d70 ? '$70+' : 'PLAN'} /></g>
        <g opacity={on(f, went, 5)}><VisitStrip x={CX} y={900} n={f >= d4 ? 4 : 0} w={760} /></g>
      </g>}
      {C > 0 && <g opacity={C}>
        <g opacity={1 - on(f, pass, 6)}>
          <SplitBar x={CX} y={560} w={780} n={f >= worked + 8 ? 4 : 1} t={span(f, worked + 8, worked + 20)} total="$70+ A MONTH" each={f >= d17 ? '$17+ A VISIT' : ''} />
          <VisitStrip x={CX} y={860} n={4} w={760} />
        </g>
        <g opacity={on(f, pass, 5)}>
          <PunchCard x={CX} y={720} s={1.5 * pop(f, pass)} punched={Math.round(10 * span(f, pass + 6, d10))} />
          <Label x={CX} y={1040} text="$10 A VISIT" size={84} font="Bebas Neue" color={P.mintInk} o={on(f, d10, 5)} />
        </g>
      </g>}
      {D > 0 && <g opacity={D}>
        <Person f={f} who="hero" beats={hero as never} x={260} y={1240} s={0.7} />
        <g opacity={on(f, plan, 5) * (1 - on(f, signup, 6))}><ellipse cx={700} cy={960} rx={180} ry={300} fill={P.gold} opacity={0.18} /><g opacity={0.55}><Person f={f} who="hero" beats={[[0, 'runA', 'smiling', 'runB', 14]]} x={700} y={1240} s={0.7} /></g><Label x={700} y={620} text="PLANNED ME" size={50} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, signup, 5) * (1 - on(f, busy, 6))}>
          <g transform="translate(680 1050) rotate(-6)"><rect x={-150} y={-100} width={300} height={200} rx={16} fill={P.paper} stroke={P.edge} strokeWidth={4} /><path d={`M-100 30 Q-50 ${lerp(30, 0, span(f, signup, signup + 18))} 0 30 T100 20`} fill="none" stroke={P.navy3} strokeWidth={5} /></g>
          <Thought x={620} y={620} w={600} h={260} o={on(f, picture, 5)}><VisitStrip x={0} y={0} n={f >= three ? 3 : 0} of={7} w={480} /><Label x={0} y={80} text="3 DAYS A WEEK" size={44} font="Bebas Neue" color={P.ink} /></Thought>
        </g>
        <g opacity={on(f, busy, 5)}>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, (k === 0 ? busy : another) + k * 5, 4)} transform={`translate(${600 + k * 50} ${640 + k * 40}) rotate(${-6 + k * 5}) scale(1.5)`}><Calendar x={0} y={0} text="BUSY" s={1} /></g>)}
          <g opacity={on(f, payment, 5)}><g transform={`rotate(${6 * Math.sin((f - c('s19b:account')) / 2) * on(f, c('s19b:account'), 3) * (1 - on(f, c('s19b:account') + 14, 5))} 680 1050)`}><BankCard x={680} y={1050} s={0.7} r={-4} /></g><g opacity={on(f, c('s20'), 4)}><Label x={680} y={1200} text="EVERY MONTH" size={46} font="Bebas Neue" color={P.ink2} /></g>{Array.from({ length: 4 }, (_, k) => { const p = fly(f, payment + k * 6, [680, 1000], [900, 1260], 20, 100); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.8} o={p.o} /> : null })}</g>
        </g>
      </g>}
      {E > 0 && <g opacity={E}>
        <SeeSaw x={CX} y={1000} w={820} tilt={lerp(-0.5, 0.6, on(f, paid, 20))}
          left={<g><Mini look="investorF" x={-30} y={0} scale={0.8} frame={f} seed={90} mood="happy" /><Mini look="hero" x={40} y={0} scale={0.8} frame={f} seed={91} mood="happy" /></g>}
          right={<g opacity={on(f, paid, 5)}><Sofa x={0} y={0} s={0.4} /><Mini look="buyer" x={-30} y={-10} scale={0.7} frame={f} seed={92} /><Mini look="owner" x={40} y={-10} scale={0.7} frame={f} seed={93} /></g>} />
        <g transform={`translate(${CX} ${lerp(560, 660, on(f, home20, 14))})`} opacity={on(f, real, 5)}><Tag x={0} y={0} text="$15" /></g>
      </g>}
      <Vignette id="gs-study" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 5) s21–s25: which side are you on?
const Test: React.FC<PieceProps> = ({ f, c }) => {
  const want = c('s21:want'), side = c('s21:side')
  const take = c('s22:take'), paid = c('s22:paid'), divide = c('s22:divide'), times = c('s22:times'), went = c('s22:went')
  const dollar = c('s23:dollar'), other = c('s23:other'), helping = c('s23:helping'), workouts = c('s23:workouts')
  const d15 = c('s24:15'), more = c('s24:more'), helping2 = c('s24:helping'), theirs = c('s24:theirs')
  const s25 = c('s25'), d6500 = c('s25:6500'), fit = c('s25:fit'), built = c('s25:built'), d300 = c('s25:300')
  const A = win(f, want, take), B = win(f, take, dollar), C = win(f, dollar, s25), D = on(f, s25, 6)
  return (
    <g>
      <TallStage id="gs-test" f={f} />
      <Headline f={f} lines={[[side, 'WHICH SIDE ARE YOU?', P.ink, 90], [divide, 'PAID ÷ VISITS', P.goldInk, 104], [dollar, '$1–2 A VISIT', P.mintInk, 104], [d15, '$15+ A VISIT', P.coralInk, 104], [d6500, '6,500 MEMBERS…', P.ink], [d300, '…ROOM FOR 300', P.goldInk]]} />
      {A > 0 && <g opacity={A}>
        <SeeSaw x={CX} y={1000} w={820} tilt={0.3 * Math.sin((f - want) / 10) * (1 - on(f, side + 10, 10))}
          left={<g><Treadmill x={0} y={0} s={0.5} f={f} run={1} used={1} /><Person f={f} who="investorF" beats={[[0, 'runA', 'smiling', 'runB', 12]]} x={-14} y={-10} s={0.34} /></g>}
          right={<g opacity={on(f, side, 5)}><Sofa x={0} y={0} s={0.42} /><Mini look="buyer" x={0} y={-16} scale={0.75} frame={f} seed={95} /></g>} />
        <g opacity={on(f, want, 5)} transform="translate(500 620)"><Prop id="question" x={0} y={0} size={200} f={f} /></g>
      </g>}
      {B > 0 && <g opacity={B}>
        <g opacity={on(f, paid, 5)}><Doc x={300} y={720} s={1.3} r={-3} title="LAST MONTH" lines={3} /><Label x={300} y={940} text="PAID" size={56} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, divide, 5)}><Label x={560} y={760} text="÷" size={180} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, times, 5)}><Calendar x={760} y={720} text="MONTH" s={1.3} /><VisitStrip x={CX} y={1100} n={f >= went ? 3 : 0} w={760} /><Label x={CX} y={1200} text="TIMES YOU WENT" size={52} font="Bebas Neue" color={P.ink} o={on(f, went, 5)} /></g>
      </g>}
      {C > 0 && <g opacity={C}>
        <g opacity={1 - on(f, d15, 6)}>
          <Treadmill x={CX} y={1100} s={1.1} f={f} run={1} used={1} /><Person f={f} who="investorF" beats={[[0, 'runA', 'smiling', 'runB', 12]]} x={CX - 30} y={1080} s={0.72} />
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, other + k * 4, 5)}><Sofa x={200 + k * 300} y={560} s={0.36} /><Mini look={LOOKS[k + 1]} x={200 + k * 300} y={545} scale={0.65} frame={f} seed={k + 100} /></g>)}
          {Array.from({ length: 6 }, (_, k) => { const p = fly(f, helping + k * 5, [200 + (k % 3) * 300, 520], [CX, 900], 22, 100); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.8} o={p.o} /> : null })}
          <g opacity={on(f, workouts, 5)}><Tick x={820} y={860} o={1} r={44} /></g>
        </g>
        <g opacity={on(f, d15, 5)}>
          <Sofa x={CX} y={1120} s={0.7} /><Mini look="buyer" x={CX} y={1090} scale={1.2} frame={f} seed={110} />
          <g opacity={on(f, more, 5)}><Tag x={CX} y={760} text="$15+" s={0.9} /></g>
          {Array.from({ length: 4 }, (_, k) => { const p = fly(f, helping2 + k * 5, [CX, 940], [820, 560], 22, 120); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.8} o={p.o} /> : null })}
          <g opacity={on(f, theirs, 5)}><Treadmill x={820} y={620} s={0.55} f={f} run={1} used={1} /></g>
        </g>
      </g>}
      {D > 0 && <g opacity={D}>
        <GymFront x={CX} y={760} s={0.75} lit={1} doors={on(f, fit, 12)} />
        {Array.from({ length: 12 }, (_, k) => { const at = d6500 + k * 2, t = span(f, at, at + 30); return f >= at ? <Mini key={k} look={LOOKS[k % 6]} x={lerp(-60, 160 + k * 60, t)} y={940} scale={0.75} frame={f} seed={k + 120} mood="happy" /> : null })}
        <g opacity={on(f, built, 5)}><FloorPlan x={CX} y={1130} w={600} h={220} cols={30} rows={10} taken={on(f, d300, 20)} /></g>
      </g>}
      <Vignette id="gs-test" w={1080} h={1920} />
    </g>
  )
}

export const GYMSHORT = [
  makePiece('gs-hook', 'Short: NPR 2014 — 6,500 members, room for 300 — 22 per spot — why not packed — they pay and don\'t come — a cinema couldn\'t, a gym can', { canvas: 'tall', mood: 'light', Component: Hook,
    beats: ["s1", "s1:npr", "s1:gym", "s1:had", "s1:6500", "s1:members", "s2:but", "s2:hold", "s2:300", "s2:once", "s3:about", "s3:22", "s3:every", "s3:spot", "s3:floor", "s4:why", "s4:packed", "s4:day", "s5:because", "s5:business", "s5:pay", "s5:month", "s5:come", "s5a:cinema", "s5a:sold", "s5a:22", "s5a:seat", "s5a:show", "s5a:fight", "s5a:gym", "s5a:away"],
    sfx: [['s1:npr', 'flutter', 0.3], ['s1:6500', 'tick', 0.3], ['s2:300', 'tick', 0.3], ['s3:22', 'riser', 0.3], ['s4:packed', 'whoosh', 0.3], ['s5:pay', 'coin', 0.35], ['s5a:fight', 'thud', 0.35], ['s5a:away', 'ding', 0.3]] }),
  makePiece('gs-price', 'Short: $15 a month — same for every day or never — 12 visits = $1.25, 1 visit = $15 — the gym gets the same $15', { canvas: 'tall', mood: 'light', Component: Price,
    beats: ["s6", "s6:buy", "s6:member", "s6:basic", "s6:15", "s6:month", "s7:same", "s7:15", "s7:every", "s7:never", "s7:all", "s8:12", "s8:month", "s8:each", "s8:dollar", "s9:once", "s9:workout", "s9:full", "s9:15", "s10:gym", "s10:both", "s10:worth", "s10:same", "s10:15"],
    sfx: [['s6:member', 'ding', 0.3], ['s6:15', 'coin', 0.35], ['s8:12', 'pop', 0.3], ['s9:once', 'pop', 0.3], ['s10:worth', 'coin', 0.35]] }),
  makePiece('gs-owner', 'Short: rent, machines, staff, power — same bills any crowd — a stay-home member adds $15 at ≈ no cost — sell more than fits — nothing wears out', { canvas: 'tall', mood: 'dark', Component: Owner,
    beats: ["s11", "s11:owner's", "s11:bills", "s11:rent", "s11:machines", "s11:staff", "s11:power", "s12:cost", "s12:same", "s12:many", "s12:walk", "s13:signs", "s13:home", "s13:gets", "s13:nothing", "s14:sell", "s14:memberships", "s14:fit", "s14a:machine", "s14a:towel", "s14a:washed"],
    sfx: [['s11:rent', 'pop', 0.3], ['s11:machines', 'pop', 0.3], ['s11:staff', 'pop', 0.3], ['s11:power', 'pop', 0.3], ['s13:gets', 'coin', 0.4], ['s14:memberships', 'riser', 0.3], ['s14a:washed', 'ding', 0.3]] }),
  makePiece('gs-study', 'Short: they stay home — Berkeley, 7,752 members — $70+ plans, ≈ 4 visits — $17+ a visit vs $10 pass — the person we plan to be — paid for by who stays home', { canvas: 'tall', mood: 'light', Component: Study,
    beats: ["s15", "s15:home", "s15:expect", "s16:economists", "s16:berkeley", "s16:records", "s16:7752", "s17:plans", "s17:70", "s17:went", "s17:4", "s18:worked", "s18:17", "s18:10visit", "s18:10", "s19:sign", "s19:plan", "s19:are", "s19a:signup", "s19a:picture", "s19a:three", "s19b:busy", "s19b:another", "s19b:payment", "s20:low", "s20:real", "s20:paid", "s20:home", "s19b:account", "s20"],
    sfx: [['s16:berkeley', 'pop', 0.3], ['s16:7752', 'tick', 0.3], ['s18:17', 'thud', 0.35], ['s18:10visit', 'click', 0.3], ['s19b:payment', 'coin', 0.35], ['s20:paid', 'swish', 0.3]] }),
  makePiece('gs-test', 'Short: which side are you on — paid ÷ visits — $1–2 others help pay; $15+ you pay for theirs — 6,500 members, room for 300', { canvas: 'tall', mood: 'dark', Component: Test,
    beats: ["s21:want", "s21:side", "s22:take", "s22:paid", "s22:divide", "s22:times", "s22:went", "s23:dollar", "s23:other", "s23:helping", "s23:workouts", "s24:15", "s24:more", "s24:helping", "s24:theirs", "s25", "s25:6500", "s25:fit", "s25:built", "s25:300"],
    sfx: [['s22:divide', 'pop', 0.3], ['s23:helping', 'coin', 0.35], ['s24:helping', 'coin', 0.35], ['s25:300', 'chime', 0.35]] }),
]
