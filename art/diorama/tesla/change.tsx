// ---------------------------------------------------------------- s80–s99: the rules change + payoff.
// A) July 2025, US: a law document stamps "PENALTY $0" over the fine; the fuel-economy target line stays but the fine bill
//    shrinks to nothing; rivals stop buying (a credit card bounces back). Tesla's annual report: "restricted".
//    Europe: a calendar strip 2025 · 2026 · 2027 bracketed as one average. Rivals' own EVs roll in instead of buying room.
// B) 2025: the gold bar drops from $2.8B to $2.0B, "−28%"; two arrows into the drop: "rule changes" and "demand"; a
//    rival's meter falls by itself as it sells its own EVs. The rule book gets an eraser: "can be rewritten".
// C) Payoff: the four step icons light up again on their words; then the lesson: two profit piles, one from a product,
//    one from a rule; a switch with the rule's hand on it flips off; finally a profit bar with a rival's coin inside.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Coin2 } from '../uber/kit'
import { CreditCert, EVCar, Factory, FineBill, GasCar, LimitMeter, PoolRing, TSpot } from './kit'

const GROUND = 920

const Change: React.FC<PieceProps> = ({ f, c }) => {
  const then80 = c('s80:then'), started = c('s80:started'), change80 = c('s80:change')
  const july = c('s81:july'), y2025a = c('s81:2025'), law = c('s81:law'), removed = c('s81:removed'), penalties = c('s81:penalties'), rules81 = c('s81:rules')
  const federal = c('s82:federal'), targets = c('s82:targets'), exist = c('s82:exist'), fine82 = c('s82:fine'), zero82 = c('s82:zero')
  const nofine = c('s83:no'), less83 = c('s83:less'), buy83 = c('s83:buy'), anyone83 = c('s83:anyone')
  const annual = c('s84:annual'), report = c('s84:report'), restricted = c('s84:restricted'), programs = c('s84:programs')
  const europe85 = c('s85:europe'), eased = c('s85:eased'), target85 = c('s85:target'), average85 = c('s85:average'), three = c('s85:three'), y2027 = c('s85:2027')
  const gives = c('s86:gives'), time86 = c('s86:time'), sell86 = c('s86:sell'), electric86 = c('s86:electric'), instead86 = c('s86:instead'), room86 = c('s86:room')
  const y2025b = c('s87:2025'), fell = c('s87:fell'), d28 = c('s87:28'), d2 = c('s87:2')
  const drop88 = c('s88:drop'), changes88 = c('s88:changes'), demand = c('s88:demand'), depends = c('s88:depends'), want = c('s88:want')
  const rivals89 = c('s89:rivals'), electric89 = c('s89:electric'), need89 = c('s89:need'), less89 = c('s89:less')
  const rule90 = c('s90:rule'), rewritten = c('s90:rewritten'), shrink = c('s90:shrink')
  const remember = c('s91:remember'), four91 = c('s91:four')
  const governments = c('s92:governments'), limit92 = c('s92:limit'), electric92 = c('s92:electric'), zero92 = c('s92:zero'), rivals92 = c('s92:rivals'), pay92 = c('s92:pay'), spare92 = c('s92:spare'), added = c('s92:added'), billions92 = c('s92:billions')
  const lesson = c('s93:lesson'), beyond = c('s93:beyond')
  const profits94 = c('s94:profits'), sells94 = c('s94:sells'), rules94 = c('s94:rules')
  const rule95 = c('s95:rule'), asking = c('s95:asking'), changes95 = c('s95:changes')
  const written = c('s96:written'), governments96 = c('s96:governments'), minds = c('s96:minds')
  const depends97 = c('s97:depends'), real = c('s97:real'), someone = c('s97:someone'), switch97 = c('s97:switch'), off = c('s97:off')
  const next98 = c('s98:next'), look98 = c('s98:look'), check = c('s98:check'), paying98 = c('s98:paying'), competition = c('s98:competition')
  const how99 = c('s99:how'), advice = c('s99:advice')

  const AB = y2025b - 6, BC = remember - 6
  const A = win(f, then80 - 40, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const A1 = 1 - on(f, annual - 6, 10), A2 = on(f, annual - 6, 10) * (1 - on(f, europe85 - 6, 10)), A3 = on(f, europe85 - 6, 10)
  const C1 = 1 - on(f, lesson - 6, 10), C2 = on(f, lesson - 6, 10) * (1 - on(f, rule95 - 6, 10)), C3 = on(f, rule95 - 6, 10) * (1 - on(f, next98 - 6, 10)), C4 = on(f, next98 - 6, 10)

  return (
    <g>
      <Stage id="ts-change" frame={f} />
      <TSpot f={f} at={zero82} x={1300} y={500} rx={200} ry={180} />
      <TSpot f={f} at={d28} x={1100} y={560} rx={200} ry={220} />
      <Headline f={f} lines={[[then80, 'THEN THE RULES CHANGED', P.ink, 104], [july, 'JULY 2025: NEW US LAW', P.ink, 104], [zero82, 'US FUEL-ECONOMY FINE: $0', P.coralInk, 100], [annual, "TESLA'S ANNUAL REPORT", P.ink, 104], [europe85, 'EUROPE: AVERAGE OVER 2025–2027', P.ink, 92], [y2025b, '2025: −28% TO ≈ $2B', P.coralInk, 104], [rule90, 'RULES CAN BE REWRITTEN', P.ink, 104], [remember, 'THE 4 STEPS', P.ink, 110], [lesson, 'THE LESSON', P.ink, 110], [rule95, 'WHAT IF THE RULE CHANGES?', P.ink, 100], [next98, 'WHO IS REALLY PAYING?', P.ink, 104], [how99, '', P.ink]]} />

      {/* # A) the US law; Tesla's report; Europe's three years */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={A1}>
          <g opacity={on(f, started, 8)} transform={`translate(420 ${560 - 20 * (1 - pop(f, law, 14))})`}>
            <rect x={-170} y={-230} width={340} height={460} rx={12} fill={P.paper} stroke={P.edge} strokeWidth={4} />
            <text y={-160} textAnchor="middle" fill={P.navy0} style={{ font: '400 50px "Bebas Neue"' }}>{f >= law ? 'NEW US LAW' : 'THE RULES'}</text>
            <g opacity={on(f, july, 8)}><text y={-110} textAnchor="middle" fill={P.ink2} style={{ font: '400 40px "Bebas Neue"' }}>JULY 2025</text></g>
            {[-60, -20, 20, 60].map((ly) => <rect key={ly} x={-130} y={ly} width={260} height={12} rx={6} fill="#D9DFE8" />)}
            <g opacity={on(f, removed, 6)} transform={`translate(0 150) rotate(-8) scale(${lerp(1.4, 1, pop(f, removed, 12))})`}><rect x={-150} y={-40} width={300} height={80} rx={10} fill="none" stroke={P.coralInk} strokeWidth={6} /><text y={16} textAnchor="middle" fill={P.coralInk} style={{ font: '400 46px "Bebas Neue"' }}>PENALTIES REMOVED</text></g>
          </g>
          {/* # the target line stays; the fine shrinks to $0 */}
          <g opacity={on(f, federal, 8)}><line x1={900} y1={420} x2={1760} y2={420} stroke={P.ink} strokeWidth={6} strokeDasharray="20 12" /><Label x={1330} y={400} text={f >= exist ? 'FUEL-ECONOMY TARGET: STILL THERE' : 'FUEL-ECONOMY TARGET'} size={40} font="Bebas Neue" color={P.ink} /></g>
          <GasCar x={1100} y={GROUND} s={0.6} f={f} />
          <g opacity={on(f, fine82 - 6, 8)} transform={`translate(1500 640) scale(${lerp(1, 0.6, on(f, zero82, 16))})`}><FineBill x={0} y={0} amount={f >= zero82 ? '$0' : 'FINE'} /></g>
          {/* # no fine → nobody buys: a credit card bounces back */}
          <g opacity={on(f, nofine, 8)}>{(() => { const t = span(f, buy83, buy83 + 30), x = lerp(1000, 1300, Math.sin(Math.min(1, t) * Math.PI)); return <CreditCert x={x} y={300} s={0.5} /> })()}
            <g opacity={on(f, anyone83, 8)}><Label x={1100} y={220} text="WHY BUY CREDITS?" size={44} font="Bebas Neue" color={P.ink2} /></g></g>
        </g>
        <g opacity={A2}>
          <g transform={`translate(960 ${560 - 20 * pop(f, report, 14)})`}>
            <rect x={-260} y={-260} width={520} height={520} rx={14} fill={P.paper} stroke={P.edge} strokeWidth={4} />
            <text y={-190} textAnchor="middle" fill={P.navy0} style={{ font: '400 50px "Bebas Neue"' }}>TESLA ANNUAL REPORT</text>
            {[-130, -90, -50].map((ly) => <rect key={ly} x={-200} y={ly} width={400} height={12} rx={6} fill="#D9DFE8" />)}
            <g opacity={on(f, restricted, 8)}><rect x={-220} y={0} width={440} height={140} rx={12} fill="#FFF3D6" stroke={P.gold} strokeWidth={4} /><text y={60} textAnchor="middle" fill={P.navy0} style={{ font: '400 38px "Bebas Neue"' }}>"RESTRICTED CERTAIN</text><text y={110} textAnchor="middle" fill={P.navy0} style={{ font: '400 38px "Bebas Neue"' }}>REGULATORY CREDIT PROGRAMS"</text></g>
          </g>
          <g opacity={on(f, programs, 8)}><CreditCert x={1500} y={500} s={0.7} r={8} /><path d="M1420 430 L1580 570" stroke={P.coralInk} strokeWidth={10} strokeLinecap="round" /></g>
        </g>
        <g opacity={A3}>
          {/* # Europe: 2025 · 2026 · 2027 judged as one average */}
          {['2025', '2026', '2027'].map((yr, k) => <g key={k} opacity={on(f, k === 0 ? europe85 : three + (k - 1) * 6, 6)} transform={`translate(${620 + k * 340} 380)`}><rect x={-120} y={-50} width={240} height={100} rx={14} fill={P.navy3} /><text y={20} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 60px "Bebas Neue"' }}>{yr}</text></g>)}
          <g opacity={on(f, average85, 8)}><path d="M480 460 Q960 560 1440 460" fill="none" stroke={P.gold} strokeWidth={8} /><Label x={960} y={570} text="ONE AVERAGE" size={48} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, gives, 8)}><Label x={960} y={650} text="MORE TIME" size={46} font="Bebas Neue" color={P.ink} /></g>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, electric86 + k * 4, 6)}><EVCar x={lerp(-200, 360 + k * 220, on(f, electric86 + k * 4, 18))} y={GROUND} s={0.4} f={f} color="#F2D9C9" /></g>)}
          <g opacity={on(f, sell86, 8)}><Label x={580} y={GROUND + 50} text="RIVALS' OWN EVS" size={40} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, instead86, 8)}><Factory x={1550} y={GROUND} s={0.6} name="TESLA" color="#3E4A61" /><CreditCert x={1550} y={560} s={0.5} o={1 - on(f, room86, 10) * 0.6} /></g>
        </g>
      </g>}

      {/* # B) 2025: the drop and its causes */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <Person f={f} who="investor" beats={[[0, 'think', 'thinking'], [d28, 'shrug', 'worried'], [demand, 'point', 'thinking']]} x={250} y={GROUND} s={0.75} />
        <rect x={500} y={GROUND - 2763 * 0.16} width={200} height={2763 * 0.16} rx={14} fill={P.gold} opacity={0.5} />
        <Label x={600} y={GROUND + 56} text="2024" size={48} font="Bebas Neue" color={P.ink} /><Label x={600} y={GROUND - 2763 * 0.16 - 26} text="$2.8B" size={48} font="Bebas Neue" color={P.goldInk} />
        <rect x={820} y={GROUND - lerp(2763, 1993, on(f, fell, 24)) * 0.16} width={200} height={lerp(2763, 1993, on(f, fell, 24)) * 0.16} rx={14} fill={P.gold} />
        <Label x={920} y={GROUND + 56} text="2025" size={48} font="Bebas Neue" color={P.ink} />
        <g opacity={on(f, d2, 8)}><Label x={920} y={GROUND - 1993 * 0.16 - 26} text="≈ $2.0B" size={48} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, d28, 8)} transform={`translate(1150 ${GROUND - 380 - 14 * pop(f, d28, 12)})`}><rect x={-90} y={-44} width={180} height={88} rx={14} fill={P.coral} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 60px "Bebas Neue"' }}>−28%</text></g>
        {/* # two causes */}
        <g opacity={on(f, changes88, 8) * (1 - on(f, rivals89 - 4, 10))}><Label x={1500} y={360} text="RULE CHANGES" size={48} font="Bebas Neue" color={P.ink} /><path d="M1390 380 L1080 520" stroke={P.ink2} strokeWidth={6} strokeDasharray="12 8" /></g>
        <g opacity={on(f, demand, 8) * (1 - on(f, rivals89 - 4, 10))}><Label x={1500} y={520} text={f >= want ? 'DEMAND FROM OTHER CARMAKERS' : 'DEMAND'} size={44} font="Bebas Neue" color={P.ink} /><path d="M1290 540 L1080 600" stroke={P.ink2} strokeWidth={6} strokeDasharray="12 8" /></g>
        {/* # rivals selling their own EVs need less room */}
        <g opacity={on(f, rivals89 - 4, 10) * (1 - on(f, rule90 - 4, 10))}>
          <LimitMeter x={1500} y={GROUND - 20} value={lerp(108, 96, on(f, need89, 24))} limit={100} scale={3.6} label="A RIVAL" />
          {[0, 1].map((k) => <g key={k} opacity={on(f, electric89 + k * 4, 6)}><EVCar x={1250 + k * 0} y={GROUND - k * 120} s={0.3} f={f} color="#F2D9C9" /></g>)}
          <g opacity={on(f, less89, 8)}><Label x={1500} y={300} text="NEEDS LESS ROOM" size={44} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
        {/* # the rule can be rewritten */}
        <g opacity={on(f, rule90 - 4, 10)} transform="translate(1500 560)"><rect x={-130} y={-170} width={260} height={340} rx={14} fill="#2B3A55" /><rect x={-110} y={-150} width={220} height={300} rx={8} fill="#EEF3FA" /><text y={-80} textAnchor="middle" fill={P.navy0} style={{ font: '400 50px "Bebas Neue"' }}>RULE</text>
          {[-30, 10, 50].map((ly, k) => <rect key={ly} x={-80} y={ly} width={lerp(160, 30, on(f, rewritten + k * 4, 12))} height={12} rx={6} fill="#C9D3E1" />)}
          <g transform={`translate(${lerp(-60, 80, span(f, rewritten, shrink))} 20) rotate(-20)`}><rect x={-30} y={-20} width={70} height={40} rx={8} fill="#F2A7B5" /><rect x={-30} y={-20} width={24} height={40} rx={6} fill="#5A6680" /></g></g>
      </g>}

      {/* # C) payoff: four steps; the lesson; the switch; who is paying */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={C1}>
          {([[limit92, 'LIMIT THE AVERAGE', P.coral], [zero92, 'ELECTRIC = ZERO', P.mint], [pay92, 'RIVALS PAY TESLA', P.sky], [billions92, 'BILLIONS', P.gold]] as [number, string, string][]).map(([at, t, col], k) => {
            const x = 300 + k * 440
            return <g key={k} opacity={lerp(0.3, 1, on(f, at, 8)) * on(f, four91, 8)} transform={`translate(${x} ${GROUND - 140 - 20 * pop(f, at, 14)})`}>
              {k === 0 && <g transform="translate(0 -60) scale(0.45)"><LimitMeter x={0} y={0} value={105} /></g>}
              {k === 1 && <g transform="translate(0 -80) scale(0.5)"><EVCar x={0} y={0} f={0} glow={1} /></g>}
              {k === 2 && <g transform="translate(0 -150)">{(() => { const fl = fly(f, pay92, [-90, 0], [90, 0], 14, 60); return <Coin2 x={fl.x} y={fl.y} r={34} t="$" /> })()}</g>}
              {k === 3 && <g>{[0, 1, 2, 3, 4].map((j) => <ellipse key={j} cx={0} cy={-100 - j * 26} rx={60} ry={16} fill={P.gold} stroke={P.goldD} strokeWidth={3} opacity={on(f, (j === 0 ? c('s92:over') : added) + j * 3, 5)} />)}</g>}
              <circle cx={0} cy={60} r={36} fill={col} /><text x={0} y={78} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"' }}>{k + 1}</text>
              <Label x={0} y={150} text={t} size={42} font="Bebas Neue" color={P.ink} />
            </g> })}
        </g>
        <g opacity={C2}>
          {/* # two kinds of profit: from what you sell, from the rules */}
          <g opacity={on(f, lesson, 8)} transform="translate(600 0)"><EVCar x={0} y={GROUND} s={0.6} f={0} /><rect x={-100} y={GROUND - 420} width={200} height={180} rx={14} fill={P.mint} /><Label x={0} y={GROUND - 450} text="FROM WHAT IT SELLS" size={40} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, rules94, 8)} transform="translate(1320 0)"><g transform={`translate(0 ${GROUND - 160})`}><rect x={-90} y={-110} width={180} height={220} rx={12} fill="#2B3A55" /><rect x={-74} y={-94} width={148} height={188} rx={6} fill="#EEF3FA" /><text y={-30} textAnchor="middle" fill={P.navy0} style={{ font: '400 40px "Bebas Neue"' }}>RULE</text></g><rect x={-100} y={GROUND - 460} width={200} height={140} rx={14} fill={P.gold} /><Label x={0} y={GROUND - 490} text="FROM THE RULES" size={40} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, lesson + 6, 8)}><Label x={960} y={330} text="NOT JUST CARS" size={50} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={C3}>
          {/* # the rule as a switch, held by a government hand */}
          <g transform="translate(700 560)">
            <rect x={-120} y={-200} width={240} height={400} rx={30} fill={P.card} stroke={P.edge} strokeWidth={5} />
            <rect x={-50} y={-140} width={100} height={280} rx={50} fill="#D9DFE8" />
            <circle cx={0} cy={lerp(-80, 80, on(f, off, 10))} r={46} fill={f >= off ? P.coral : P.mint} />
            <text y={-230} textAnchor="middle" fill={P.ink} style={{ font: '400 44px "Bebas Neue"' }}>THE RULE</text>
            <text y={250} textAnchor="middle" fill={f >= off ? P.coralInk : P.mintInk} style={{ font: '400 44px "Bebas Neue"' }}>{f >= off ? 'OFF' : 'ON'}</text>
          </g>
          <g opacity={on(f, written, 8)}><Person f={f} who="investorF" beats={[[0, 'idle', 'neutral'], [governments96, 'point', 'neutral'], [switch97, 'offer', 'neutral']]} x={300} y={GROUND} s={0.75} /><Label x={300} y={GROUND + 56} text="GOVERNMENT" size={40} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, asking, 8)} transform={`translate(1350 ${520 - 16 * pop(f, asking, 12)})`}><circle r={70} fill={P.gold} /><text y={28} textAnchor="middle" fill={P.navy0} style={{ font: '400 90px "Bebas Neue"' }}>?</text></g>
          <g opacity={on(f, real, 8)}>{[0, 1, 2, 3].map((k) => <ellipse key={k} cx={1350} cy={GROUND - 30 - k * 30} rx={90} ry={20} fill={P.gold} stroke={P.goldD} strokeWidth={3} opacity={1 - on(f, off + k * 3, 6)} />)}<Label x={1350} y={GROUND + 56} text="REAL MONEY" size={40} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, minds, 8) * (1 - on(f, depends97, 8))}><Label x={1350} y={400} text="GOVERNMENTS CHANGE THEIR MINDS" size={44} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        <g opacity={C4}>
          {/* # look at where the money comes from: a profit bar with a rival's coin inside */}
          <Person f={f} who="investorF" beats={[[0, 'think', 'thinking'], [check, 'point', 'smiling'], [competition, 'present', 'smiling']]} x={300} y={GROUND} s={0.8} />
          <g opacity={on(f, look98, 8)} transform={`translate(0 ${-12 * pop(f, c("s98:company's"), 12)})`}><rect x={760} y={GROUND - 460} width={260} height={460} rx={14} fill={P.mint} /><Label x={890} y={GROUND + 56} text="A COMPANY'S MONEY" size={42} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, paying98, 8)}><rect x={760} y={GROUND - 460} width={260} height={150} rx={14} fill={P.gold} /><text x={890} y={GROUND - 412} textAnchor="middle" fill={P.navy0} style={{ font: '400 40px "Bebas Neue"' }}>PAID BY…?</text></g>
          <g opacity={on(f, competition, 8)}><Factory x={1500} y={GROUND} s={0.7} name="A RIVAL" f={f} smoke color="#6A5A6A" />
            {(() => { const fl = fly(f, competition, [1500, GROUND - 260], [890, GROUND - 350], 20, 120); return <Coin2 x={fl.x} y={fl.y} r={30} t="$" /> })()}</g>
          <g opacity={on(f, advice, 8)}><Label x={960} y={1030} text="HOW THE MONEY WORKS — NOT INVESTMENT ADVICE" size={36} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>}
      <Vignette id="ts-change" />
    </g>
  )
}

const BEATS = ['s92:over', "s98:company's", 's80:then', 's80:started', 's80:change', 's81:july', 's81:2025', 's81:law', 's81:removed', 's81:penalties', 's81:rules', 's82:federal', 's82:targets', 's82:exist', 's82:fine', 's82:zero', 's83:no', 's83:less', 's83:buy', 's83:anyone', 's84:annual', 's84:report', 's84:restricted', 's84:programs', 's85:europe', 's85:eased', 's85:target', 's85:average', 's85:three', 's85:2027', 's86:gives', 's86:time', 's86:sell', 's86:electric', 's86:instead', 's86:room', 's87:2025', 's87:fell', 's87:28', 's87:2', 's88:drop', 's88:changes', 's88:demand', 's88:depends', 's88:want', 's89:rivals', 's89:electric', 's89:need', 's89:less', 's90:rule', 's90:rewritten', 's90:shrink', 's91:remember', 's91:four', 's92:governments', 's92:limit', 's92:electric', 's92:zero', 's92:rivals', 's92:pay', 's92:spare', 's92:added', 's92:billions', 's93:lesson', 's93:beyond', 's94:profits', 's94:sells', 's94:rules', 's95:rule', 's95:asking', 's95:changes', 's96:written', 's96:governments', 's96:minds', 's97:depends', 's97:real', 's97:someone', 's97:switch', 's97:off', 's98:next', 's98:look', 's98:check', 's98:paying', 's98:competition', 's99:how', 's99:advice']
export const TS_CHANGE = makePiece('ts-change', 'Tesla long ending: July 2025 US law removed penalties, the fuel-economy target stays but the fine is $0, no reason to buy credits; Tesla\'s annual report says certain regulatory credit programs were restricted; Europe averages 2025–2027, rivals sell their own EVs; 2025 credits fell 28% from $2.8B to about $2.0B from rule changes and demand; a rival needing less room; a rule can be rewritten; recap of the four steps; profit from what you sell vs from the rules; a government hand on the rule switch turns it off; who is really paying — sometimes the competition; not investment advice', {
  mood: 'light', Component: Change, beats: BEATS,
  sfx: [['s81:removed', 'thud', 0.25], ['s82:zero', 'pop', 0.25], ['s84:restricted', 'swish', 0.2], ['s85:average', 'whoosh', 0.2], ['s87:28', 'thud', 0.25], ['s90:rewritten', 'swish', 0.2], ['s92:pay', 'coin', 0.2], ['s97:off', 'pop', 0.25], ['s98:competition', 'coin', 0.25]] })
