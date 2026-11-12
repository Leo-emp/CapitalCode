// ---------------------------------------------------------------- s18–s30a: selling more spots than it has.
// A) The owner beside the gym; four bill cards arrive on their words (building, machines, staff, electricity) and
//    stack into one monthly pile whose height never moves while a handful, then a few hundred people come in. One new
//    member takes a tag and walks home to the sofa; his coin arcs to the owner; the pile stays the same height. No
//    machine wears (a still treadmill), no towel is washed (a folded towel).
// B) A cinema row: as many tickets as seats. Then one gym spot with 24 tags fanned around it.
// C) The test: a crowd and a week strip with 4 ticks; a door counter climbs to 4,100 a day; the floor fills to 300 and
//    the day dial fills ~14 hours; queues form at every treadmill and the last people turn and walk out.
// D) Real life: two people on a quiet floor; two bars — PAY (tall) vs SHOW UP (short) — with the $15 tag in the gap;
//    if they really came, the floor fills, a treadmill cracks and the tag rises.
import React from 'react'
import { Mini } from '../../rig/Mini'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Calendar, Coin, fly, Headline, Label, Person, Prop, Tick, win } from '../aimoney/common'
import { BillCard, DayDial, FloorPlan, GymFront, KeyTag, SeatRow, Sofa, Ticket, Towel, Treadmill, VisitStrip } from './kit'

const LOOKS = ['buyer', 'investor', 'hero', 'worker', 'owner', 'investorF']

const Spots: React.FC<PieceProps> = ({ f, c }) => {
  const s18 = c('s18'), owner = c("s18:owner's"), side = c('s18:side'), open19 = c('s19:open')
  const building = c('s19:building'), machines = c('s19:machines'), staff = c('s19:staff'), electricity = c('s19:electricity')
  const roughly = c('s20:roughly'), handful = c('s20:handful'), hundred = c('s20:hundred')
  const signs = c('s21:signs'), home = c('s21:home'), collects = c('s21:collects'), nothingX = c('s21:nothing')
  const wears = c('s22:wears'), towel = c('s22:towel')
  const sell = c('s23:sell'), fit = c('s23:fit')
  const cinema = c('s23a:cinema'), tickets = c('s23a:tickets'), seats = c('s23a:seats')
  const gym23 = c('s23b:gym'), d24 = c('s23b:24'), spot23 = c('s23b:spot'), floor23 = c('s23b:floor'), never = c('s23b:never')
  const walk29 = c('s29:walk'), most29 = c('s29:most'), really30 = c('s30a:really'), planned30 = c('s30a:planned')
  const test = c('s24:test'), d7200 = c('s25:7200'), promise = c('s25:promise'), d4 = c('s25:4'), week = c('s25:week')
  const d4100 = c('s26:4100'), day26 = c('s26:day')
  const hour = c('s27:hour'), packed = c('s27:packed'), d300 = c('s27:300'), d14 = c('s27:14')
  const line = c('s28:line'), treadmill = c('s28:treadmill'), doors = c('s28:doors')
  const waiting = c('s28a:waiting'), giveUp = c('s28a:give'), walk = c('s28a:walk')
  const s29 = c('s29'), less = c('s29:less')
  const gap = c('s30:gap'), pay = c('s30:pay'), show = c('s30:show'), price30 = c('s30:price')
  const floor = c('s30a:floor'), wear = c('s30a:wear'), up = c('s30a:up')
  const A = win(f, s18, sell), B = win(f, sell, test), C2 = win(f, test, s29), D = on(f, s29, 12)
  const BILLS: ['rent' | 'machines' | 'staff' | 'power', string, number][] = [['rent', 'BUILDING', building], ['machines', 'MACHINES', machines], ['staff', 'STAFF', staff], ['power', 'POWER', electricity]]
  const pile = on(f, roughly, 14)
  const count = Math.round(4100 * span(f, d4100, d4100 + 40))
  return (
    <g>
      <Stage id="gm-spots" frame={f} />
      <Headline f={f} lines={[[owner, "THE OWNER'S SIDE", P.ink, 100], [roughly, 'SAME BILLS, ANY CROWD', P.ink, 100], [nothingX, '+ $15, ≈ NO EXTRA COST', P.goldInk, 100], [sell, 'SELL MORE THAN FITS', P.ink, 104], [cinema, 'ONE TICKET PER SEAT', P.ink, 104], [d24, '≈ 24 PER SPOT', P.goldInk, 116], [test, 'THE 4-VISITS TEST', P.ink, 104], [d4100, '≈ 4,100 VISITS A DAY', P.coralInk, 104], [d14, 'FULL ≈ 14 HOURS A DAY', P.coralInk, 104], [s29, 'REAL LIFE', P.ink, 104], [gap, 'THE GAP KEEPS IT CHEAP', P.goldInk, 104], [up, 'PRICE WOULD RISE', P.coralInk, 104]]} />
      {/* # the drawing sits a little larger on the stage (static, never a zoom) */}
      <g transform="translate(960 900) scale(1.15) translate(-960 -900)">
      {/* # A) the owner and the fixed bills */}
      {A > 0 && <g opacity={A}>
        <Person f={f} who="owner" beats={[[0, 'present', 'neutral'], [side, 'point', 'neutral'], [open19, 'present', 'smiling'], [building, 'countA', 'thinking', 'countB', 14], [roughly, 'explain', 'neutral'], [collects, 'receive', 'smiling'], [nothingX, 'thumbsUp', 'smiling']]} x={300} y={960} s={0.72} />
        <g opacity={on(f, open19, 4) * (1 - on(f, building, 6))}><GymFront x={1100} y={900} s={0.9} lit={on(f, open19, 14)} doors={on(f, open19 + 6, 14)} /></g>
        {BILLS.map(([kind, label, at], k) => {
          const t = span(f, roughly, roughly + 18), x = lerp(640 + k * 260, 760, t), y = lerp(560, 600 - k * 30, t)
          return <g key={kind} opacity={on(f, at, 4) * (1 - on(f, signs, 6) * 0)} transform={`translate(${x} ${y}) scale(${0.95 * pop(f, at) * (1 - 0.15 * t)})`}><BillCard x={0} y={0} kind={kind} label={pile < 0.5 ? label : undefined} /></g>
        })}
        <g opacity={pile}><Label x={760} y={820} text="MONTHLY BILLS" size={50} font="Bebas Neue" color={P.ink} /><line x1={600} y1={440} x2={940} y2={440} stroke={P.coralInk} strokeWidth={5} strokeDasharray="12 10" /></g>
        {/* # a handful, then a few hundred people come in — the bills line does not move */}
        <g opacity={on(f, handful, 4) * (1 - on(f, signs, 6))}>{Array.from({ length: 18 }, (_, k) => <g key={k} opacity={k < 3 || f >= hundred + (k - 3) * 2 ? 1 : 0}><Mini look={LOOKS[k % 6]} x={1180 + (k % 6) * 110} y={720 + Math.floor(k / 6) * 150} scale={0.75} frame={f} seed={k + 40} /></g>)}</g>
        {/* # one new member takes a tag and goes home to the sofa; his coin arcs to the owner */}
        <g opacity={on(f, signs, 4)}>
          <Sofa x={1500} y={960} s={0.75} />
          <Mini look="buyer" x={lerp(1150, 1500, span(f, home, home + 30))} y={940} scale={1.2} frame={f} seed={77} />
          <g opacity={on(f, signs, 4) * (1 - on(f, home, 6))} transform="translate(1150 640) scale(0.5)"><KeyTag x={0} y={0} /></g>
          {(() => { const p = fly(f, collects, [1500, 760], [380, 560], 26, 220); return p.o > 0 ? <Coin x={p.x} y={p.y} s={1} o={p.o} text="15" /> : null })()}
          <g opacity={on(f, c('s21:monthly'), 4) * (1 - on(f, wears, 4))} transform="translate(380 400)"><Calendar x={0} y={0} text="MONTH" s={0.9} /></g>
          <line x1={600} y1={440} x2={940} y2={440} stroke={P.gold} strokeWidth={12} opacity={0.6 * on(f, c('s21:costs'), 4) * (1 - on(f, nothingX, 4))} />
          <g opacity={on(f, nothingX, 4)}><Tick x={940} y={440} o={1} r={40} /></g>
        </g>
        <g opacity={on(f, wears, 4)}><Treadmill x={1220} y={560} s={0.7} f={f} /><Tick x={1340} y={360} o={1} r={34} /></g>
        <g opacity={on(f, towel, 4)}><Towel x={1620} y={560} s={1} /><g opacity={on(f, c('s22:washed'), 4)}><Tick x={1710} y={430} o={1} r={34} /></g></g>
      </g>}
      {/* # B) the cinema row, then one gym spot with 24 tags around it */}
      {B > 0 && <g opacity={B}>
        <g opacity={on(f, sell, 4) * (1 - on(f, cinema, 6))}>
          <GymFront x={760} y={880} s={0.8} />
          {Array.from({ length: 30 }, (_, k) => <g key={k} opacity={on(f, (k < 12 ? sell : c('s23:memberships')) + (k % 12), 4)} transform={`translate(${1380 + (k % 6) * 70} ${860 - Math.floor(k / 6) * 90}) rotate(${(k % 3 - 1) * 8}) scale(0.26)`}><KeyTag x={0} y={0} text="" /></g>)}
          <g opacity={on(f, fit, 4)}><Label x={760} y={980} text="FITS ≈ 300" size={52} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, cinema, 4) * (1 - on(f, gym23, 6))}>
          <rect x={460} y={300} width={1000} height={200} rx={14} fill="#1C2230" /><rect x={480} y={318} width={960} height={164} rx={8} fill="#5BCBFF" opacity={0.35} />
          <SeatRow x={960} y={880} n={8} filled={8 * span(f, seats, seats + 24)} />
          {Array.from({ length: 8 }, (_, k) => <g key={k} opacity={on(f, tickets + k * 2, 4) * (1 - on(f, seats + k * 3, 4))}><Ticket x={570 + k * 110} y={620} s={0.42} r={-8} text="1" /></g>)}
        </g>
        <g opacity={on(f, gym23, 4)}>
          {[-1, 1].map((k) => <circle key={k} cx={960 + k * 560} cy={640} r={70} fill="none" stroke="#C96A22" strokeWidth={5} strokeDasharray="10 8" opacity={on(f, floor23, 6)} />)}
          <circle cx={960} cy={640} r={90 * (1 + 0.12 * Math.sin(Math.PI * span(f, spot23, spot23 + 14)))} fill="#F08A3C" stroke="#C96A22" strokeWidth={6} />
          {Array.from({ length: 24 }, (_, k) => { const a = (k / 24) * Math.PI * 2, t = on(f, d24 + k, 4); return <g key={k} opacity={t} transform={`translate(${960 + Math.cos(a) * 330 * t} ${640 + Math.sin(a) * 270 * t}) rotate(${(a * 180) / Math.PI + 90}) scale(0.36)`}><KeyTag x={0} y={0} text="" /></g> })}
          <g opacity={on(f, never, 4)}>{[0, 1, 2].map((k) => <Mini key={k} look={LOOKS[k]} x={1500 + k * 120 + (k - 1) * 160 * on(f, c('s23b:time'), 20)} y={1010} scale={0.8} frame={f} seed={k + 60} />)}<Label x={1620} y={800} text="NEVER ALL AT ONCE" size={44} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>}
      {/* # C) the 4-visits test */}
      {C2 > 0 && <g opacity={C2}>
        <g opacity={on(f, c('s24:numbers'), 4) * (1 - on(f, c('s25:imagine'), 4))} transform="translate(960 620)"><Prop id="calculator" x={0} y={0} size={420} f={f} /></g>
        <g opacity={on(f, c('s25:imagine'), 4) * (1 - on(f, d4100, 6))}>
          {Array.from({ length: 30 }, (_, k) => k < 10 || f >= d7200 + (k - 10) ? <Mini key={k} look={LOOKS[k % 6]} x={260 + (k % 15) * 100} y={760 + Math.floor(k / 15) * 170} scale={0.75} frame={f} seed={k + 3} mood={f >= promise ? 'happy' : 'neutral'} /> : null)}
          <g opacity={on(f, d4, 4)}><VisitStrip x={960} y={440} n={4} of={7} w={700} /><Label x={960} y={540} text="4 TIMES A WEEK" size={48} font="Bebas Neue" color={P.ink} o={on(f, week, 4)} /></g>
        </g>
        <g opacity={on(f, d4100, 4) * (1 - on(f, hour, 6))}>
          <GymFront x={760} y={880} s={0.9} doors={1} />
          <rect x={1260} y={470} width={440} height={170} rx={22} fill={P.navy1} /><text x={1480} y={590} textAnchor="middle" fill={P.gold} style={{ font: '400 110px "JetBrains Mono"' }}>{count.toLocaleString('en-US')}</text>
          <Label x={1480} y={700} text={`EVERY ${f >= day26 ? 'SINGLE DAY' : 'DAY'}`} size={46} font="Bebas Neue" color={P.ink} />
        </g>
        <g opacity={on(f, hour, 4) * (1 - on(f, line, 6))}>
          <g opacity={on(f, hour, 4)} transform="translate(420 600)"><Prop id="clock" x={0} y={0} size={170} f={f} /><Label x={0} y={150} text="1 HOUR EACH" size={44} font="Bebas Neue" color={P.ink} /></g>
          <FloorPlan x={1000} y={600} w={560} h={360} cols={20} rows={15} taken={on(f, packed, 24)} o={on(f, packed, 4)} />
          <g opacity={on(f, d300, 4)}><Label x={1000} y={850} text="FULL: 300" size={48} font="Bebas Neue" color={P.coralInk} /></g>
          <DayDial x={1560} y={720} r={190} hours={14} t={span(f, d14, d14 + 30)} o={on(f, d14, 4)} />
          <g opacity={on(f, c('s27:every'), 4)}>{Array.from({ length: 7 }, (_, k) => <rect key={k} x={1330 + k * 66} y={880} width={52} height={52} rx={10} fill={f >= c('s27:week') + k * 2 ? '#F08A3C' : 'none'} stroke="#C96A22" strokeWidth={4} />)}</g>
        </g>
        <g opacity={on(f, line, 4)}>
          {[0, 1, 2].map((k) => {
            const tx = 520 + k * 460
            return (
              <g key={k}>
                <Treadmill x={tx} y={760} s={0.85} f={f} run={1} used={1} />
                <Person f={f} who={LOOKS[k]} beats={[[0, 'runA', 'neutral', 'runB', 12]]} x={tx - 20} y={740} s={0.48} />
                {Array.from({ length: 4 }, (_, q) => { const out = q === 3 ? span(f, walk + k * 6, walk + k * 6 + 40) : 0; return <g key={q} opacity={1 - out}><Mini look={LOOKS[(k + q + 2) % 6]} x={tx + 120 + q * 70 + out * 300 + 14 * Math.sin(Math.PI * span(f, c('s28a:machines') + q * 3, c('s28a:machines') + q * 3 + 12))} y={1000} scale={0.7} frame={f} seed={k * 7 + q} mood={f >= waiting ? 'sad' : 'neutral'} /></g> })}
              </g>
            )
          })}
          <g opacity={on(f, doors, 4) * (1 - on(f, c('s28a:day'), 4))}><Label x={960} y={340} text="OPEN → QUEUES" size={48} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, c('s28a:day'), 4)} transform="translate(960 360)"><Prop id="clock" x={0} y={0} size={150} f={f} /></g>
        </g>
      </g>}
      {/* # D) real life: a quiet floor; PAY vs SHOW UP; if they came, it breaks and the price rises */}
      {D > 0 && <g opacity={D}>
        <g opacity={1 - on(f, gap, 6)}>
          {[0, 1, 2, 3].map((k) => <Treadmill key={k} x={420 + k * 380} y={820} s={0.85} f={f} run={k === 1 ? 1 : 0} used={k === 1 ? 1 : 0} />)}
          <Person f={f} who="investorF" beats={[[0, 'runA', 'smiling', 'runB', 12]]} x={780} y={800} s={0.5} />
          <g opacity={on(f, walk29, 4)}><Mini look="hero" x={lerp(1900, 1560, span(f, walk29, walk29 + 30))} y={1010} scale={0.9} frame={f} seed={33} /></g>
          <g opacity={on(f, most29, 6)}><Label x={1000} y={980} text="MOSTLY EMPTY" size={46} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, less, 4)}><DayDial x={1500} y={520} r={150} hours={3} t={1} /><Label x={1500} y={600} text="FAR LESS OFTEN" size={44} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={on(f, gap, 4) * (1 - on(f, floor, 6))}>
          <rect x={640} y={980 - 560 * on(f, pay, 16)} width={220} height={560 * on(f, pay, 16)} rx={14} fill="#F08A3C" />
          <Label x={750} y={1040} text="PAY" size={50} font="Bebas Neue" color={P.ink} />
          <rect x={1060} y={980 - 90 * on(f, show, 16)} width={220} height={90 * on(f, show, 16)} rx={14} fill="#5BCBFF" />
          <Label x={1170} y={1040} text="SHOW UP" size={50} font="Bebas Neue" color={P.ink} />
          <g opacity={on(f, c('s30:exactly'), 4)}><path d="M1300 420 L1340 420 L1340 890 L1300 890" fill="none" stroke={P.goldInk} strokeWidth={6} /><Label x={1460} y={660} text="THE GAP" size={48} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, c('s30:exist'), 4)}><GymFront x={1600} y={900} s={0.3} lit={1} /></g>
          <g opacity={on(f, price30, 4)} transform={`translate(1170 ${lerp(760, 620, on(f, price30, 14))})`}><rect x={-90} y={-50} width={180} height={100} rx={18} fill="#F08A3C" /><text x={0} y={22} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 66px "Bebas Neue"' }}>$15</text></g>
        </g>
        <g opacity={on(f, really30, 4) * (1 - on(f, floor, 6))}>{Array.from({ length: 12 }, (_, k) => <Mini key={k} look={LOOKS[k % 6]} x={320 + k * 115} y={lerp(1200, 1000, on(f, really30 + k * 2, 6))} scale={0.8} frame={f} seed={k + 300} mood={f >= planned30 ? 'happy' : 'neutral'} />)}</g>
        <g opacity={on(f, floor, 4)}>
          <FloorPlan x={760} y={600} w={560} h={360} cols={20} rows={15} taken={1} />
          <g opacity={on(f, wear, 4)}><Treadmill x={1300} y={760} s={0.8} f={f} /><Prop id="cracks" x={1300} y={680} size={160} f={f} /><g opacity={on(f, c('s30a:faster'), 4)}><Prop id="cracks" x={1240} y={760} size={130} f={f} /></g></g>
          <g opacity={on(f, c('s30a:price'), 4)} transform={`translate(1640 ${lerp(720, 520, on(f, up, 16))})`}><rect x={-90} y={-50} width={180} height={100} rx={18} fill="#F08A3C" /><text x={0} y={22} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 66px "Bebas Neue"' }}>$$$</text><Prop id="arrow-up" x={130} y={0} size={90} f={f} /></g>
        </g>
      </g>}
      </g>
      <Vignette id="gm-spots" />
    </g>
  )
}

export const GM_SPOTS = makePiece('gm-spots', 'Gym long: fixed bills, a stay-home member adds $15 at no cost; cinema one ticket per seat vs 24 tags per gym spot; the 4-visits test (4,100 a day, full 14 hours, queues); real life: pay vs show up gap keeps $15', {
  mood: 'dark', Component: Spots,
  beats: ["s18", "s18:owner's", "s18:side", "s19:open", "s19:building", "s19:machines", "s19:staff", "s19:electricity", "s20:roughly", "s20:handful", "s20:hundred", "s21:signs", "s21:home", "s21:collects", "s21:nothing", "s22:wears", "s22:towel", "s23:sell", "s23:fit", "s23a:cinema", "s23a:tickets", "s23a:seats", "s23b:gym", "s23b:24", "s23b:spot", "s23b:floor", "s23b:never", "s29:walk", "s29:most", "s30a:really", "s30a:planned", "s24:test", "s25:7200", "s25:promise", "s25:4", "s25:week", "s26:4100", "s26:day", "s27:hour", "s27:packed", "s27:300", "s27:14", "s28:line", "s28:treadmill", "s28:doors", "s28a:waiting", "s28a:walk", "s29", "s29:less", "s30:gap", "s30:pay", "s30:show", "s30:price", "s30a:floor", "s30a:wear", "s30a:up", "s21:monthly", "s21:costs", "s22:washed", "s23:memberships", "s23b:time", "s24:numbers", "s25:imagine", "s27:every", "s27:week", "s28a:machines", "s28a:day", "s30:exactly", "s30:exist", "s30a:faster", "s30a:price"],
  sfx: [['s19:building', 'pop', 0.3], ['s19:machines', 'pop', 0.3], ['s19:staff', 'pop', 0.3], ['s19:electricity', 'pop', 0.3], ['s21:collects', 'coin', 0.4], ['s23a:seats', 'softpop', 0.3], ['s23b:24', 'riser', 0.3], ['s26:4100', 'tick', 0.3], ['s27:14', 'riser', 0.3], ['s28a:walk', 'swish', 0.3], ['s30:gap', 'chime', 0.3], ['s30a:up', 'impact', 0.35]] })
