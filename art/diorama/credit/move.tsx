// ---------------------------------------------------------------- s73–s82: how a score actually moves, step by step.
// 1) A phone switches AUTOPAY ON; a calendar collects a tick every month, even a busy one.
// 2) The $1,000 card: balance $900 → $100, its bar drains from 90% to 10%.
// 3) The oldest card ages beside a clock: history keeps growing; it stays open.
// 4) A timeline of applications: a rush of three crossed out, then spaced out with room between.
// 5) A laptop shows three free reports (one per bureau, weekly, AnnualCreditReport.com); a wrong line gets circled,
//    disputed, and stamped CORRECTED.
// 6) The uneven part: green on-time blocks stack slowly; one red late block drops at once and sits there with a 7-year
//    tag; steady ticks march on; an hourglass shows the late mark fading with time.
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, Phone, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Calendar } from '../charts'
import { Arrow } from '../econ/kit'
import { Bureau, Card, Form, Laptop, NoCross, Report, Stopwatch, Tick, GREEN, RED, GOLD, TXT, INK } from './kit'

const GROUND = 930

const Move: React.FC<PieceProps> = ({ f, c }) => {
  const move = c('s73:move'), five = c('s73:five')
  const one = c('s74:one'), time74 = c('s74:time'), automatic = c('s74:automatic'), busy = c('s74:busy'), late74 = c('s74:late')
  const util75 = c('s75:utilization'), card75 = c('s75:card'), america78 = c('s78:america'), report78 = c('s78:report')
  const two = c('s75:two'), d900 = c('s75:900'), d100 = c('s75:100'), p90 = c('s75:90'), p10 = c('s75:10')
  const three = c('s76:three'), old = c('s76:old'), length = c('s76:length'), open = c('s76:open')
  const four = c('s77:four'), spacing = c('s77:spacing'), rush = c('s77:rush')
  const step5 = c('s78:step'), bureaus = c('s78:bureaus'), free = c('s78:free'), week = c('s78:week'), site = c('s78:annualcreditreportcom')
  const mistake = c('s79:mistake'), dispute = c('s79:dispute'), corrected = c('s79:corrected')
  const uneven = c('s80:uneven'), good = c('s80:good'), slowly = c('s80:slowly'), late80 = c('s80:late'), fast = c('s80:fast'), seven = c('s80:seven')
  const steady = c('s81:steady')
  const trick = c('s82:trick'), erases = c('s82:erases'), time82 = c('s82:time')

  const S0 = win(f, 0, one - 4), S1 = win(f, one - 4, two - 4), S2 = win(f, two - 4, three - 4), S3 = win(f, three - 4, four - 4)
  const S4 = win(f, four - 4, step5 - 4), S5 = win(f, step5 - 4, uneven - 4), S6 = on(f, uneven - 4, 10)
  const ticks = f >= time74 ? Math.min(12, 1 + Math.floor((f - time74) / 12)) : 0
  const bal = lerp(900, 100, on(f, d100, 30))
  const greens = f >= good ? Math.min(8, 1 + Math.floor((f - good) / 14)) : 0
  const drop = on(f, late80, 10)
  return (
    <g>
      <Stage id="cs-move" frame={f} />
      <Headline f={f} lines={[[move, 'HOW A SCORE MOVES', P.ink, 100], [one, '1 · PAY ON TIME, EVERY TIME', P.ink, 86], [two, '2 · USE LESS OF YOUR LIMIT', P.ink, 86], [three, '3 · LET HISTORY GROW', P.ink, 86], [four, '4 · SPACE OUT APPLICATIONS', P.ink, 86], [step5, '5 · CHECK YOUR REPORTS', P.ink, 86], [uneven, 'THE UNEVEN PART', P.ink, 100]]} />
      <Ground y={GROUND} />

      {/* # 0) the five parts, as five steps */}
      {S0 > 0 && <g opacity={S0}>
        {[0, 1, 2, 3, 4].map((k) => <g key={k} opacity={on(f, five + k * 4, 8)} transform={`translate(${360 + k * 300} ${560 - 30 * (1 - pop(f, five + k * 4, 12))})`}><circle r={90} fill={['#4F78AA', '#E5634F', '#E9C25A', '#3DBE84', '#B48AD8'][k]} /><text y={34} textAnchor="middle" fill="#FFFFFF" style={TXT(110)}>{k + 1}</text></g>)}
      </g>}

      {/* # 1) on time: autopay */}
      {S1 > 0 && <g opacity={S1}>
        <Person f={f} who="investorF" beats={[[one, 'idle', 'neutral'], [automatic, 'phone', 'smiling'], [busy, 'nervous', 'worried'], [late74, 'thumbsUp', 'smiling']]} x={300} y={GROUND} s={1} />
        <g opacity={on(f, automatic - 6, 8)}><Phone x={700} y={600} s={1.3}><g><rect x={-70} y={-30} width={140} height={60} rx={30} fill={on(f, automatic, 10) > 0.5 ? GREEN : '#C9D3E0'} /><circle cx={lerp(-40, 40, on(f, automatic, 10))} cy={0} r={24} fill="#FFFFFF" /><text y={80} textAnchor="middle" fill={INK} style={TXT(36)}>AUTOPAY</text></g></Phone></g>
        <g opacity={on(f, time74, 8)}>
          <rect x={1060} y={400} width={620} height={420} rx={20} fill="#FFFFFF" stroke="#D6C7A6" strokeWidth={5} /><rect x={1060} y={400} width={620} height={60} rx={18} fill={RED} />
          <text x={1370} y={446} textAnchor="middle" fill="#FFFFFF" style={TXT(44)}>EVERY MONTH</text>
          {Array.from({ length: 12 }, (_, k) => <g key={k} transform={`translate(${1130 + (k % 4) * 160} ${530 + Math.floor(k / 4) * 100})`}><rect x={-60} y={-36} width={120} height={72} rx={10} fill="#F3EFE6" />{k < ticks && <Tick x={0} y={0} s={0.55} />}</g>)}
        </g>
        <g opacity={on(f, busy, 8)}><Label x={1370} y={880} text="EVEN IN A BUSY MONTH" size={46} font="Bebas Neue" color={P.ink} /></g>
      </g>}

      {/* # 2) utilization down */}
      {S2 > 0 && <g opacity={S2}>
        <g opacity={on(f, util75, 8)}><Card x={760} y={520} s={1.5 * (1 + 0.05 * win(f, card75, d900, 5))} used={(f >= d900 ? bal : 0) / 1000} bar label="LIMIT $1,000" /></g>
        <g opacity={on(f, d900, 8)}><Label x={760} y={820} text={`BALANCE $${Math.round(bal / 10) * 10}`} size={70} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, p90, 8)} transform={`translate(1460 560) scale(${pop(f, f >= p10 ? p10 : p90, 12)})`}><text textAnchor="middle" fill={f >= p10 ? GREEN : RED} style={TXT(150)}>{f >= p10 ? '10%' : '90%'}</text></g>
        <g opacity={on(f, p10, 8)}><Arrow x={1460} y={700} dir="down" col={GREEN} s={0.9} /></g>
      </g>}

      {/* # 3) let history grow */}
      {S3 > 0 && <g opacity={S3}>
        <g opacity={on(f, three, 8)}><Card x={700} y={540} s={1.3 * (1 + 0.05 * win(f, old, length, 5))} col={lerp(0, 1, on(f, length, 30)) > 0.5 ? '#8E7A5A' : '#3A6EA8'} label="OLDEST CARD" /></g>
        <g opacity={on(f, length, 8)}><Stopwatch x={1300} y={640} s={1.3} f={f} /><Label x={1300} y={780} text="HISTORY KEEPS GROWING" size={50} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, open, 8)} transform={`translate(700 ${820 - 10 * pop(f, open, 12)})`}><rect x={-140} y={-44} width={280} height={84} rx={14} fill={GREEN} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={TXT(56)}>KEEP OPEN</text></g>
      </g>}

      {/* # 4) space out applications */}
      {S4 > 0 && <g opacity={S4}>
        <line x1={260} y1={760} x2={1660} y2={760} stroke={INK} strokeWidth={6} />
        {Array.from({ length: 12 }, (_, k) => <rect key={k} x={256 + k * 127} y={750} width={8} height={20} fill={INK} />)}
        <g opacity={1 - on(f, rush + 20, 10)}>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, four + k * 4, 8)}><Form x={380 + k * 70} y={620 + (k % 2) * 20} s={0.7} r={-8 + k * 8} /></g>)}
          <NoCross x={450} y={620} s={1.1} o={on(f, spacing, 8)} />
        </g>
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, spacing + 8 + k * 6, 8)}><Form x={700 + k * 420} y={620} s={0.7} /><Tick x={700 + k * 420} y={480} s={0.6} /></g>)}
        <g opacity={on(f, rush, 8)}><Label x={960} y={360} text="NO RUSH OF NEW CREDIT" size={56} font="Bebas Neue" color={P.ink} /></g>
      </g>}

      {/* # 5) check the reports, fix mistakes */}
      {S5 > 0 && <g opacity={S5}>
        <g opacity={1 - on(f, mistake - 6, 10)}>
          <g opacity={on(f, america78, 8)}><Laptop x={620} y={820} s={2.2} /></g>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, Math.min(bureaus, report78 + 10) + k * 5, 8)}><Report x={470 + k * 150} y={600} s={0.32} title={['EQUIFAX', 'EXPERIAN', 'TRANSUNION'][k]} marks={[1, 1, 1, 1, 1, 1]} /></g>)}
          <g opacity={on(f, free, 8)}><Label x={1380} y={500} text="FREE" size={110} font="Bebas Neue" color={GREEN} /></g>
          <g opacity={on(f, week, 8)}><Label x={1380} y={600} text="EVERY WEEK" size={70} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, site, 8)}><Label x={1380} y={690} text="ANNUALCREDITREPORT.COM" size={50} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={on(f, mistake - 6, 10)}>
          <Report x={600} y={600} s={1} marks={[1, 1, 1, 0, 1, 1]} />
          <g opacity={on(f, mistake, 8) * (1 - on(f, corrected, 8))}><ellipse cx={590} cy={690} rx={90} ry={44} fill="none" stroke={RED} strokeWidth={8} /></g>
          <g opacity={on(f, dispute, 8)}><Arrow x={940} y={600} dir="right" col={P.ink2} s={1} /><Bureau x={1360} y={GROUND} s={0.8} name="BUREAU" /></g>
          <g opacity={on(f, corrected, 8)} transform={`translate(600 600) rotate(-12) scale(${pop(f, corrected, 12)})`}><rect x={-170} y={-50} width={340} height={100} rx={12} fill="none" stroke={GREEN} strokeWidth={10} /><text y={22} textAnchor="middle" fill={GREEN} style={TXT(70)}>CORRECTED</text></g>
        </g>
      </g>}

      {/* # 6) slow up, fast down */}
      {S6 > 0 && <g opacity={S6}>
        <g opacity={1 - on(f, trick - 6, 10)}>
          {Array.from({ length: greens }, (_, k) => <g key={k} opacity={on(f, good + k * 14, 8)}><rect x={360} y={GROUND - 70 - k * 64} width={260} height={56} rx={10} fill={GREEN} /></g>)}
          <g opacity={on(f, slowly, 8)}><Label x={490} y={380} text="GOOD MARKS: SLOW" size={56} font="Bebas Neue" color={GREEN} /></g>
          <g opacity={on(f, late80, 6)} transform={`translate(1360 ${lerp(260, GROUND - 130, drop)})`}><rect x={-170} y={-60} width={340} height={120} rx={14} fill={RED} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={TXT(60)}>LATE</text></g>
          <g opacity={on(f, fast, 8)}><Label x={1360} y={380} text="ONE LATE: FAST" size={56} font="Bebas Neue" color={RED} /></g>
          <g opacity={on(f, seven, 8)}><Calendar x={1660} y={600} text="7 YRS" s={1.1} /></g>
          <g opacity={on(f, steady, 8)}>{Array.from({ length: 6 }, (_, k) => <Tick key={k} x={760 + k * 90} y={330} s={0.4 * on(f, steady + k * 3, 6)} />)}</g>
        </g>
        <g opacity={on(f, trick - 6, 10)}>
          <g transform="translate(960 640)">
            <path d="M-120 -220 L120 -220 L20 0 L120 220 L-120 220 L-20 0 Z" fill="#FFFFFF" stroke="#B88A2E" strokeWidth={10} />
            <path d={`M${-90 + 60 * on(f, time82, 40)} -190 L${90 - 60 * on(f, time82, 40)} -190 L0 -10 Z`} fill={RED} opacity={0.85} />
            <path d={`M-90 190 L90 190 L${lerp(0, 60, on(f, time82, 40))} ${lerp(190, 90, on(f, time82, 40))} L${lerp(0, -60, on(f, time82, 40))} ${lerp(190, 90, on(f, time82, 40))} Z`} fill={GOLD} />
          </g>
          <g opacity={on(f, erases, 8)}><Label x={500} y={560} text="NO TRICK ERASES IT" size={56} font="Bebas Neue" color={RED} /></g>
          <g opacity={on(f, time82, 8)}><Label x={1440} y={560} text="TIME FADES IT" size={56} font="Bebas Neue" color={GREEN} /></g>
        </g>
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s73:let's")} x={960} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s73:at")} x={960} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s74:biggest")} x={1370} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s74:many")} x={1370} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s75:on")} x={760} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s75:the")} x={760} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s76:time")} x={700} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s76:keep")} x={700} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s76:which")} x={700} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s76:keep#2")} x={700} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s77:the")} x={960} y={640} rx={230} ry={200} />
        <Spot f={f} at={c("s78:record")} x={900} y={640} rx={230} ry={200} />
        <Spot f={f} at={c("s79:if")} x={600} y={600} rx={200} ry={230} />
        <Spot f={f} at={c("s79:wrong")} x={600} y={600} rx={200} ry={230} />
        <Spot f={f} at={c("s79:removed")} x={600} y={600} rx={200} ry={230} />
        <Spot f={f} at={c("s80:month#2")} x={960} y={640} rx={230} ry={200} />
        <Spot f={f} at={c("s81:the")} x={960} y={640} rx={230} ry={200} />
        <Spot f={f} at={c("s81:clever")} x={960} y={640} rx={230} ry={200} />
        <Spot f={f} at={c("s82:payment")} x={960} y={640} rx={200} ry={230} />
        <Spot f={f} at={c("s82:less")} x={960} y={640} rx={200} ry={230} />
      </g>
      {/* # spots:end */}
      <Vignette id="cs-move" />
    </g>
  )
}

export const CS_MOVE = makePiece('cs-move', 'How a score moves, five steps: five numbered circles; 1 a woman switches AUTOPAY on her phone and a 12-month calendar fills with ticks, even in a busy month; 2 a $1,000-limit card\'s balance drains from $900 to $100 and the bar from 90% to 10%; 3 the oldest card ages next to a stopwatch — history keeps growing, KEEP OPEN; 4 a timeline where a rush of three applications is crossed out and three spaced-out ones get ticks; 5 a laptop shows free weekly reports from Equifax, Experian and TransUnion (AnnualCreditReport.com), then a wrong line is circled, disputed with a bureau and stamped CORRECTED; finally green on-time blocks stack slowly while one red LATE block drops at once with a 7-year calendar, and an hourglass shows the late mark fading with time.', {
  mood: 'light', Component: Move,
  beats: ["s73:move", "s73:five", "s74:one", "s74:time", "s74:automatic", "s74:busy", "s74:late", "s75:utilization", "s75:card", "s78:america", "s78:report", "s75:two", "s75:900", "s75:100", "s75:90", "s75:10", "s76:three", "s76:old", "s76:length", "s76:open", "s77:four", "s77:spacing", "s77:rush", "s78:step", "s78:bureaus", "s78:free", "s78:week", "s78:annualcreditreportcom", "s79:mistake", "s79:dispute", "s79:corrected", "s80:uneven", "s80:good", "s80:slowly", "s80:late", "s80:fast", "s80:seven", "s81:steady", "s82:trick", "s82:erases", "s82:time", "s73:let's", "s73:at", "s74:biggest", "s74:many", "s75:on", "s75:the", "s76:time", "s76:keep", "s76:which", "s76:keep#2", "s77:the", "s78:record", "s79:if", "s79:wrong", "s79:removed", "s80:month#2", "s81:the", "s81:clever", "s82:payment", "s82:less"],
  sfx: [['s74:automatic', 'click', 0.12], ['s75:10', 'chime', 0.12], ['s79:corrected', 'ding', 0.12], ['s80:late', 'thud', 0.15]] })
