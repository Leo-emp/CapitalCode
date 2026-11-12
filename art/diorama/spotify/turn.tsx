// ---------------------------------------------------------------- s62–s89: step four (how it turned a profit) + payoff.
// A) Three changes as three numbered cards. 1) More money in: revenue bars €13.2B (2023) → €17.2B (2025), +30%; new
//    subscribers file in (+27M in 2025); a price tag ticks up (+25 euro cents a month on average from price increases).
//    2) A bigger share kept: the "kept" slice widens from 26¢ to 32¢. 3) Running costs down: €3.8B → €3.3B; app-building
//    spend €1.7B → €1.4B.
// B) The bathtub: a tap pours in (more money), a smaller drain labelled MUSIC, fewer leaks; the water level rises. Net profit
//    bars: 2024 €1.1B, 2025 €2.2B; a note: net profit comes after taxes and money gains or losses. Six red years, then black.
// C) Payoff: the four step icons light; a river of coins passing through a narrow middleman gate; Lina's phone as a shop
//    window with the song owners behind it; the question "how much stays behind?".
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Mini } from '../../rig/Mini'
import { Euro, GREEN, LabelHQ, MusicPhone, SSpot, Stack } from './kit'

const GROUND = 900
const LOOKS = ['buyer', 'investorF', 'hero', 'worker', 'owner', 'investor']

const Turn: React.FC<PieceProps> = ({ f, c }) => {
  const step62 = c('s62:step'), finally62 = c('s62:finally'), profit62 = c('s62:profit')
  const three = c('s63:three'), changed = c('s63:changed')
  const first64 = c('s64:first'), more64 = c('s64:more')
  const revenue65 = c('s65:revenue'), d13 = c('s65:2'), y2023 = c('s65:2023'), d17 = c('s65:2#2'), y2025 = c('s65:2025'), d30 = c('s65:30')
  const signed = c('s66:signed'), raised = c('s66:raised'), prices66 = c('s66:prices'), countries66 = c('s66:countries')
  const added67 = c('s67:added'), d27 = c('s67:27'), subscribers67 = c('s67:subscribers')
  const price68 = c('s68:price'), d25 = c('s68:25'), cents68 = c('s68:cents'), average68 = c('s68:average')
  const second69 = c('s69:second'), bigger69 = c('s69:bigger'), stayed = c('s69:stayed'), music69 = c('s69:music')
  const y2023b = c('s70:2023'), d26 = c('s70:26'), y2025b = c('s70:2025'), d32 = c('s70:32')
  const third71 = c('s71:third'), cost71 = c('s71:cost'), down71 = c('s71:down'), up71 = c('s71:up')
  const less72 = c('s72:less'), building72 = c('s72:building'), d14 = c('s72:4'), d17b = c('s72:7')
  const fell = c('s73:fell'), d38 = c('s73:8'), d33 = c('s73:3#3'), grew73 = c('s73:grew')
  const together = c('s74:together'), loss74 = c('s74:loss'), profit74 = c('s74:profit')
  const bathtub = c('s75:bathtub'), water = c('s75:water'), flowing = c('s75:flowing'), drain = c('s75:drain'), leaks = c('s75:leaks'), level = c('s75:level'), rise = c('s75:rise')
  const y2024 = c('s76:2024'), d11 = c('s76:1#2'), net76 = c('s76:net'), y2025c = c('s76:2025'), d22 = c('s76:2#2')
  const final77 = c('s77:final'), taxes = c('s77:taxes'), gains = c('s77:gains'), match = c('s77:match')
  const six = c('s78:six'), losses78 = c('s78:losses'), black = c('s78:black')
  const step79 = c('s79:step'), money79 = c('s79:money'), kept79 = c('s79:kept'), lower79 = c('s79:lower'), profit79 = c('s79:profit')
  const remember = c('s80:remember'), four80 = c('s80:four')
  const less81 = c('s81:less'), plans81 = c('s81:plans'), thirds81 = c('s81:thirds'), third81 = c('s81:third'), recently = c('s81:recently'), profit81 = c('s81:profit')
  const business82 = c('s82:business'), pile82 = c('s82:pile'), passes = c('s82:passes')
  const middle = c('s83:middle'), grow83 = c('s83:grow'), slice83 = c('s83:slice'), spend83 = c('s83:spend')
  const linas84 = c("s84:lina's"), app84 = c('s84:app'), music84 = c('s84:music')
  const window85 = c('s85:window'), songs85 = c('s85:songs'), first85 = c('s85:first')
  const next86 = c('s86:next'), giant86 = c('s86:giant'), assume = c('s86:assume')
  const ask87 = c('s87:ask'), stays = c('s87:stays')
  const biggest88 = c('s88:biggest'), middlemen = c('s88:middlemen'), moment = c('s88:moment')
  const how89 = c('s89:how'), advice = c('s89:advice')

  const AB = bathtub - 6, BC = remember - 6
  const A = win(f, step62 - 40, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const A1 = 1 - on(f, second69 - 6, 10), A2 = on(f, second69 - 6, 10) * (1 - on(f, third71 - 6, 10)), A3 = on(f, third71 - 6, 10) * (1 - on(f, together - 4, 10)), A4 = on(f, together - 4, 10)
  const B1 = 1 - on(f, y2024 - 6, 10), B2 = on(f, y2024 - 6, 10)
  const C1 = 1 - on(f, business82 - 6, 10), C2 = on(f, business82 - 6, 10) * (1 - on(f, linas84 - 6, 10)), C3 = on(f, linas84 - 6, 10) * (1 - on(f, next86 - 6, 10)), C4 = on(f, next86 - 6, 10)
  const levelNow = lerp(0.2, 0.75, span(f, flowing, rise + 20))

  return (
    <g>
      <Stage id="sp-turn" frame={f} />
      <SSpot f={f} at={d30} x={1300} y={500} rx={200} ry={200} />
      <SSpot f={f} at={black} x={1300} y={500} rx={200} ry={200} />
      <Headline f={f} lines={[[step62, 'STEP 4: HOW IT TURNED A PROFIT', P.ink, 96], [first64, '1) MORE MONEY IN', P.ink, 110], [second69, '2) MORE OF EACH € KEPT', P.ink, 104], [third71, '3) LOWER RUNNING COSTS', P.ink, 104], [together, 'LOSS → PROFIT', P.mintInk, 110], [bathtub, 'LIKE A BATHTUB', P.ink, 110], [net76, 'NET PROFIT', P.mintInk, 110], [black, 'FINALLY IN THE BLACK', P.mintInk, 104], [remember, 'THE 4 STEPS', P.ink, 110], [passes, 'MOSTLY PASSING THROUGH', P.ink, 104], [window85, 'THE APP IS THE SHOP WINDOW', P.ink, 96], [stays, 'HOW MUCH STAYS BEHIND?', P.ink, 104], [how89, '', P.ink]]} />

      {/* # A) the three changes */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={on(f, step62, 8) * (1 - on(f, together - 4, 10))}>{['MORE IN', 'MORE KEPT', 'LOWER COSTS'].map((t, k) => <g key={k} opacity={lerp(0.35, 1, on(f, [first64, second69, third71][k], 8))} transform={`translate(${560 + k * 400} 280)`}><rect x={-160} y={-36} width={320} height={72} rx={14} fill={[GREEN, P.gold, P.coral][k]} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>{`${k + 1}. ${t}`}</text></g>)}</g>
        <g opacity={A1}>
          {([[y2023, d13, 13.2, '2023', '€13.2B', 560], [y2025, d17, 17.2, '2025', '€17.2B', 860]] as [number, number, number, string, string, number][]).map(([ya, va, v, t, lab, x], k) => { const h = lerp(0, v * 26, on(f, k === 0 ? revenue65 : va - 10, 18))
            return <g key={k} opacity={on(f, k === 0 ? revenue65 : y2023 + 10, 8)}><rect x={x - 100} y={GROUND - h} width={200} height={h} rx={12} fill={GREEN} /><Label x={x} y={GROUND + 50} text={t} size={46} font="Bebas Neue" color={P.ink} /><g opacity={on(f, va, 8)}><Label x={x} y={GROUND - v * 26 - 26} text={lab} size={46} font="Bebas Neue" color={P.mintInk} /></g></g> })}
          <g opacity={on(f, d30, 8)} transform={`translate(1060 ${GROUND - 470 - 14 * pop(f, d30, 12)})`}><rect x={-80} y={-34} width={160} height={68} rx={12} fill={P.gold} /><text y={14} textAnchor="middle" fill={P.navy0} style={{ font: '400 44px "Bebas Neue"' }}>+30%</text></g>
          {/* # new subscribers file in; a price tag ticks up */}
          {Array.from({ length: 5 }, (_, k) => <g key={k} opacity={on(f, signed + k * 3, 6) * (1 - on(f, price68 - 4, 10))}><Mini look={LOOKS[k]} x={lerp(2100, 1240 + k * 120, on(f, signed + k * 3, 18))} y={GROUND} scale={0.7} frame={f} seed={k + 70} mood="happy" /></g>)}
          <g opacity={on(f, c('s67:2025'), 8) * (1 - on(f, price68 - 4, 10))} transform={`translate(0 ${-10 * pop(f, c('s67:alone'), 12) - 10 * pop(f, d27, 12)})`}><Label x={1480} y={GROUND + 50} text="+27M SUBSCRIBERS (2025)" size={42} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, raised, 8)} transform={`translate(1480 ${lerp(520, 470, on(f, prices66, 14))})`}><rect x={-120} y={-44} width={240} height={88} rx={12} fill={P.paper} stroke={P.edge} strokeWidth={4} /><text y={16} textAnchor="middle" fill={P.navy0} style={{ font: '400 46px "Bebas Neue"' }}>PRICE ↑</text></g>
          <g opacity={on(f, d25, 8)} transform={`translate(1480 ${640 - 14 * pop(f, cents68, 12)})`}><Euro x={0} y={0} r={50} t="+25¢" /><Label x={0} y={90} text={f >= average68 ? 'AVERAGE PER SUBSCRIBER / MONTH' : ''} size={34} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={A2}>
          {/* # the kept slice widens: 26¢ → 32¢ */}
          <text x={430} y={575} textAnchor="end" fill={P.ink} style={{ font: '400 60px "Bebas Neue"' }}>€1</text>
          {(() => { const kept = lerp(0.26, 0.32, on(f, y2025b, 20)); return <g>
            <rect x={460} y={510} width={1000 * (1 - kept)} height={100} rx={12} fill="#9D7FD0" /><text x={460 + 500 * (1 - kept)} y={575} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"' }}>MUSIC</text>
            <rect x={460 + 1000 * (1 - kept)} y={510} width={1000 * kept} height={100} rx={12} fill={P.gold} /><text x={460 + 1000 * (1 - kept / 2)} y={575} textAnchor="middle" fill={P.navy0} style={{ font: '400 46px "Bebas Neue"' }}>{f >= d32 ? '32¢ KEPT' : f >= d26 ? '26¢ KEPT' : 'KEPT'}</text></g> })()}
          <g opacity={on(f, y2023b, 8)} transform={`translate(0 ${-10 * pop(f, c('s70:costs'), 12)})`}><Label x={960} y={460} text={f >= y2025b ? '2023 → 2025' : '2023'} size={48} font="Bebas Neue" color={P.ink} /></g>
          <Person f={f} who="investorF" beats={[[0, 'present', 'smiling'], [d32, 'thumbsUp', 'smiling']]} x={1700} y={GROUND} s={0.75} flip />
        </g>
        <g opacity={A3}>
          {/* # running costs down */}
          {([[cost71, 3843, '2023', '€3.8B', 600], [fell, 3298, '2025', '€3.3B', 900]] as [number, number, string, string, number][]).map(([at, v, t, lab, x], k) => { const h = lerp(0, v * 0.11, on(f, k === 0 ? at : d33 - 10, 18))
            return <g key={k} opacity={on(f, k === 0 ? at : fell, 8)}><rect x={x - 100} y={GROUND - h} width={200} height={h} rx={12} fill={P.coral} /><Label x={x} y={GROUND + 50} text={t} size={46} font="Bebas Neue" color={P.ink} /><g opacity={on(f, k === 0 ? d38 : d33, 8)}><Label x={x} y={GROUND - v * 0.11 - 26} text={lab} size={46} font="Bebas Neue" color={P.coralInk} /></g></g> })}
          <g opacity={on(f, down71, 8)} transform={`translate(-40 ${-60 -10 * pop(f, c('s73:other'), 12) - 10 * pop(f, c('s73:2023'), 12) - 10 * pop(f, c('s73:2025'), 12)})`}><path d="M720 420 L860 500" stroke={P.mintInk} strokeWidth={8} strokeLinecap="round" /><path d="M836 500 L860 500 L852 476" fill="none" stroke={P.mintInk} strokeWidth={8} strokeLinecap="round" /></g>
          <g opacity={on(f, building72, 8)} transform={`translate(1420 ${520 - 10 * pop(f, c('s72:billion'), 12) - 10 * pop(f, c('s72:down'), 12)})`}><Mini look="worker" x={-60} y={380} scale={0.75} frame={f} seed={93} mood="happy" /><rect x={20} y={240} width={110} height={70} rx={8} fill="#2B3A55" />
            <g transform={`translate(0 ${-10 * pop(f, c('s72:2025'), 12) - 10 * pop(f, c('s72:2023'), 12) - 10 * pop(f, c('s72:billion#2'), 12)})`}><Label x={30} y={180} text={f >= d17b ? 'APP BUILDING: €1.7B → €1.4B' : f >= d14 ? 'APP BUILDING: €1.4B (2025)' : 'BUILDING THE APP'} size={40} font="Bebas Neue" color={P.ink} /></g></g>
          <g opacity={on(f, grew73, 8)}><Label x={750} y={360} text="EVEN AS IT GREW" size={44} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
        <g opacity={A4}>
          <g transform={`translate(960 520) scale(${Math.max(0.04, Math.abs(Math.cos(on(f, profit74, 16) * Math.PI)))} 1)`}><rect x={-200} y={-90} width={400} height={180} rx={24} fill={on(f, profit74, 16) > 0.5 ? P.mint : P.coral} /><text y={34} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 100px "Bebas Neue"' }}>{on(f, profit74, 16) > 0.5 ? 'PROFIT' : 'LOSS'}</text></g>
        </g>
      </g>}

      {/* # B) the bathtub; net profit */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={B1}>
          <g transform={`translate(860 ${GROUND - 60})`}>
            <path d="M-340 -320 L340 -320 L310 0 Q300 30 270 30 L-270 30 Q-300 30 -310 0 Z" fill="#EEF3FA" stroke="#9AA8BC" strokeWidth={8} />
            <rect x={-320} y={-300 + 300 * (1 - levelNow)} width={640} height={300 * levelNow} rx={10} fill="#7FB8E8" opacity={0.85} />
            <g opacity={on(f, drain, 8)}><circle cx={240} cy={20} r={lerp(30, 16, on(f, drain, 14))} fill="#5A6680" /><Label x={240} y={90} text="SMALLER DRAIN: MUSIC" size={36} font="Bebas Neue" color={P.ink} /></g>
            <g opacity={on(f, leaks, 8)} transform={`translate(0 ${-8 * pop(f, c('s75:pipes'), 12)})`}>{[-200, -60].map((lx, k) => <g key={k}><circle cx={lx} cy={30} r={8} fill="#7FB8E8" opacity={1 - on(f, leaks + 10, 14)} /><path d={`M${lx - 14} 50 L${lx + 14} 70 M${lx + 14} 50 L${lx - 14} 70`} stroke={P.mintInk} strokeWidth={5} opacity={on(f, leaks + 10, 8)} /></g>)}<Label x={-130} y={110} text="FEWER LEAKS" size={36} font="Bebas Neue" color={P.ink} /></g>
            <g opacity={on(f, c('s75:finally'), 8)}><Label x={420} y={-300 + 300 * (1 - levelNow)} text="LEVEL RISING" size={40} font="Bebas Neue" color={P.mintInk} anchor="start" /></g>
          </g>
          <g opacity={on(f, water, 8)} transform={`translate(560 ${GROUND - 470})`}><rect x={-30} y={-80} width={60} height={60} rx={8} fill="#8A97AA" /><rect x={-10} y={-20} width={20} height={30} fill="#8A97AA" />
            <rect x={-6 - 6 * on(f, flowing, 10)} y={10} width={12 + 12 * on(f, flowing, 10)} height={300} fill="#7FB8E8" opacity={0.8} /><Label x={-90} y={-60} text="MORE MONEY IN" size={38} font="Bebas Neue" color={P.ink} anchor="end" /></g>
          <Person f={f} who="investorF" beats={[[0, 'present', 'smiling'], [rise, 'celebrate', 'smiling']]} x={1650} y={GROUND} s={0.75} flip />
        </g>
        <g opacity={B2}>
          <line x1={400} y1={560} x2={1500} y2={560} stroke={P.ink} strokeWidth={5} /><Label x={380} y={572} text="€0" size={44} font="Bebas Neue" color={P.ink} anchor="end" />
          {['2018', '2019', '2020', '2021', '2022', '2023'].map((t, k) => <g key={k} opacity={on(f, six + k * 2, 5) * 0.6}><rect x={460 + k * 110} y={560} width={80} height={[78, 186, 581, 34, 430, 532][k] * 0.3} rx={6} fill={P.coral} /></g>)}
          <g opacity={on(f, losses78, 8)} transform={`translate(0 ${-10 * pop(f, c('s78:listed'), 12) - 10 * pop(f, c('s78:finally'), 12)})`}><Label x={735} y={800} text="6 YEARS OF NET LOSSES" size={40} font="Bebas Neue" color={P.coralInk} /></g>
          {([[y2024, d11, 1138, '2024', '€1.1B', 1180], [y2025c, d22, 2212, '2025', '€2.2B', 1360]] as [number, number, number, string, string, number][]).map(([ya, va, v, t, lab, x], k) => { const h = lerp(0, v * 0.13, on(f, va - 6, 16))
            return <g key={k} opacity={on(f, ya, 8)}><rect x={x - 70} y={560 - h} width={140} height={h} rx={10} fill={P.mint} /><Label x={x} y={600} text={t} size={42} font="Bebas Neue" color={P.ink} /><g opacity={on(f, va, 8)}><Label x={x} y={560 - v * 0.13 - 22} text={lab} size={42} font="Bebas Neue" color={P.mintInk} /></g></g> })}
          <g opacity={on(f, final77, 8) * (1 - on(f, c('s78:either'), 10))} transform={`translate(960 ${840 - 10 * pop(f, c('s77:operating'), 12)})`}><rect x={-420} y={-40} width={840} height={80} rx={12} fill={P.card} stroke={P.edge} strokeWidth={3} /><text y={14 - 8 * pop(f, c('s77:losses'), 12) - 8 * pop(f, c('s77:holds'), 12)} textAnchor="middle" fill={P.ink2} style={{ font: '400 36px "Bebas Neue"' }}>{f >= gains ? 'NET = AFTER TAXES AND GAINS OR LOSSES ON MONEY IT HOLDS' : 'NET PROFIT: THE FINAL NUMBER'}</text></g>
          <Person f={f} who="investorF" beats={[[0, 'point', 'smiling'], [black, 'celebrate', 'smiling']]} x={1700} y={GROUND} s={0.75} flip />
          <g opacity={on(f, step79, 8)} transform={`translate(0 ${-10 * pop(f, c('s79:turned'), 12) - 10 * pop(f, c('s79:losses'), 12)})`}><Label x={960} y={880} text="MORE IN · MORE KEPT · LOWER COSTS" size={40} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}

      {/* # C) payoff */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={C1}>
          {([[less81, 'YOU PAY LESS THAN YOU THINK', P.sky], [thirds81, '2/3 TO THE MUSIC OWNERS', '#9D7FD0'], [third81, '1/3 KEPT, MOSTLY COSTS', P.gold], [recently, 'PROFIT, ONLY RECENTLY', GREEN]] as [number, string, string][]).map(([at, t, col], k) => {
            const x = 300 + k * 440
            return <g key={k} opacity={lerp(0.3, 1, on(f, at, 8)) * on(f, four80, 8)} transform={`translate(${x} ${GROUND - 140 - 20 * pop(f, at, 14) - (k === 1 ? 12 * pop(f, c('s81:owners'), 12) : 0) - (k === 2 ? 12 * pop(f, c('s81:keeps'), 12) + 12 * pop(f, c('s81:spends'), 12) + 10 * pop(f, c('s81:running'), 12) : 0) - (k === 0 ? 12 * pop(f, c('s81:discounts'), 12) + 10 * pop(f, c('s81:countries'), 12) : 0)})`}>
              <circle cx={0} cy={-60} r={60} fill={col} opacity={0.25} /><text y={-40} textAnchor="middle" fill={P.navy0} style={{ font: '400 60px "Bebas Neue"' }}>{['€', '♪', '¢', '↑'][k]}</text>
              <circle cx={0} cy={50} r={34} fill={col} /><text x={0} y={66} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 46px "Bebas Neue"' }}>{k + 1}</text>
              <Label x={0} y={130} text={t} size={34} font="Bebas Neue" color={P.ink} />
            </g> })}
        </g>
        <g opacity={C2}>
          {/* # a river of coins through a narrow middleman gate */}
          {f >= business82 && Array.from({ length: 12 }, (_, k) => { const t = ((f - business82) / 60 + k / 12) % 1; return <Euro key={k} x={lerp(200, 1720, t)} y={560 + Math.sin(t * 6 + k) * 30} r={22} /> })}
          <g transform="translate(960 560)"><rect x={-90} y={-150} width={180} height={300} rx={20} fill="#191F2E" opacity={0.9} /><text y={-170} textAnchor="middle" fill={P.ink} style={{ font: '400 40px "Bebas Neue"' }}>THE MIDDLEMAN</text></g>
          <g opacity={on(f, grow83, 8)}><Label x={420} y={360} text="GROW THE PILE" size={40} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, slice83, 8)}><Label x={960} y={790} text="KEEP A BIGGER SLICE" size={40} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, spend83, 8)} transform={`translate(0 ${-10 * pop(f, c('s83:itself'), 12)})`}><Label x={1500} y={360} text="SPEND LESS" size={40} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        <g opacity={C3}>
          <Person f={f} who="investorF" beats={[[0, 'phone', 'smiling'], [music84, 'present', 'smiling']]} x={260} y={GROUND} s={0.8} />
          <MusicPhone x={640} y={560} s={0.9} f={f} playing={1} title="SHOP WINDOW" />
          <g opacity={on(f, songs85, 8)} transform={`translate(0 ${-10 * pop(f, c('s85:buying'), 12) - 10 * pop(f, c('s85:own'), 12)})`}><LabelHQ x={1300} y={GROUND} s={0.8} f={f} t="THE SONGS' OWNERS" />
            {f >= first85 && [0, 1, 2].map((k) => { const fl = fly(f, first85 + k * 4, [740, 560], [1300, GROUND - 300], 16, 100); return fl.t < 1 ? <Euro key={k} x={fl.x} y={fl.y} r={22} /> : null })}</g>
          <g opacity={on(f, c('s84:shows'), 8)} transform={`translate(0 ${-10 * pop(f, c('s84:payment'), 12) - 10 * pop(f, c('s84:most'), 12)})`}><Label x={640} y={260} text={f >= music84 ? 'YOU PAY FOR THE MUSIC' : 'NOT MAINLY THE APP…'} size={44} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={C4}>
          {/* # a giant company; how much stays behind */}
          <g transform="translate(960 0)"><rect x={-260} y={GROUND - 440} width={520} height={440} rx={14} fill="#3E4A61" />{Array.from({ length: 12 }, (_, k) => <rect key={k} x={-220 + (k % 4) * 115} y={GROUND - 400 + Math.floor(k / 4) * 110} width={80} height={60} rx={6} fill="#BFE3FF" opacity={0.8} />)}<text y={GROUND - 460} textAnchor="middle" fill={P.ink} style={{ font: '400 44px "Bebas Neue"' }}>A GIANT COMPANY</text></g>
          {f >= giant86 && Array.from({ length: 6 }, (_, k) => { const t = ((f - giant86) / 50 + k / 6) % 1; return <Euro key={k} x={lerp(300, 1650, t)} y={360} r={20} o={0.9} /> })}
          <g opacity={on(f, c('s86:millions'), 8) * (1 - on(f, assume, 8))}><Label x={960} y={300} text={f >= c('s86:customers') ? 'MILLIONS OF PAYING CUSTOMERS' : 'MILLIONS…'} size={44} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, c('s87:euro'), 8)} transform={`translate(960 ${GROUND - 160 - 14 * pop(f, c('s87:dollar'), 12) - 14 * pop(f, stays, 12)})`}><Euro x={0} y={0} r={46} t="?" /></g>
          <Person f={f} who="investorF" beats={[[0, 'think', 'thinking'], [ask87, 'point', 'smiling'], [middlemen, 'shrug', 'smiling']]} x={1680} y={GROUND} s={0.8} flip />
          <g opacity={on(f, middlemen, 8)}><Label x={960} y={300} text="OFTEN, THE BUSIEST MIDDLEMEN" size={44} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, advice, 8)}><Label x={960} y={250} text="HOW THE MONEY WORKS — NOT INVESTMENT ADVICE" size={34} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>}
      <Vignette id="sp-turn" />
    </g>
  )
}

const BEATS = ['s81:keeps', 's72:billion', 's72:down', 's75:pipes', 's75:finally', 's77:operating', 's78:either', 's67:2025', 's67:alone', 's84:shows', 's84:payment', 's84:most', 's81:discounts', 's81:countries', 's83:itself', 's70:costs', 's78:listed', 's78:finally', 's79:turned', 's79:losses', 's81:spends', 's81:running', 's86:millions', 's86:customers', 's72:2025', 's72:2023', 's72:billion#2', 's73:other', 's73:2023', 's73:2025', 's77:losses', 's77:holds', 's81:owners', 's85:buying', 's85:own', 's87:euro', 's87:dollar', 's62:step', 's62:finally', 's62:profit', 's63:three', 's63:changed', 's64:first', 's64:more', 's65:revenue', 's65:2', 's65:2023', 's65:2#2', 's65:2025', 's65:30', 's66:signed', 's66:raised', 's66:prices', 's66:countries', 's67:added', 's67:27', 's67:subscribers', 's68:price', 's68:25', 's68:cents', 's68:average', 's69:second', 's69:bigger', 's69:stayed', 's69:music', 's70:2023', 's70:26', 's70:2025', 's70:32', 's71:third', 's71:cost', 's71:down', 's71:up', 's72:less', 's72:building', 's72:4', 's72:7', 's73:fell', 's73:8', 's73:3#3', 's73:grew', 's74:together', 's74:loss', 's74:profit', 's75:bathtub', 's75:water', 's75:flowing', 's75:drain', 's75:leaks', 's75:level', 's75:rise', 's76:2024', 's76:1#2', 's76:net', 's76:2025', 's76:2#2', 's77:final', 's77:taxes', 's77:gains', 's77:match', 's78:six', 's78:losses', 's78:black', 's79:step', 's79:money', 's79:kept', 's79:lower', 's79:profit', 's80:remember', 's80:four', 's81:less', 's81:plans', 's81:thirds', 's81:third', 's81:recently', 's81:profit', 's82:business', 's82:pile', 's82:passes', 's83:middle', 's83:grow', 's83:slice', 's83:spend', "s84:lina's", 's84:app', 's84:music', 's85:window', 's85:songs', 's85:first', 's86:next', 's86:giant', 's86:assume', 's87:ask', 's87:stays', 's88:biggest', 's88:middlemen', 's88:moment', 's89:how', 's89:advice']
export const SP_TURN = makePiece('sp-turn', 'Spotify long step 4 and payoff: three changes — more money in (revenue €13.2B in 2023 to €17.2B in 2025, +30%; 27 million more subscribers in 2025; price increases added about 25 euro cents a month on average), more of each euro kept after the music (26 to 32 cents), lower running costs (€3.8B to €3.3B, app building €1.7B to €1.4B); loss flips to profit; a bathtub with more water in, a smaller music drain and fewer leaks, the level rising; net profit €1.1B in 2024 and €2.2B in 2025 after six years of net losses; payoff: the four steps, money mostly passing through a middleman, the app as a shop window for the songs\' owners, ask how much stays behind; not investment advice', {
  mood: 'light', Component: Turn, beats: BEATS,
  sfx: [['s65:30', 'pop', 0.2], ['s67:27', 'pop', 0.15], ['s68:25', 'coin', 0.2], ['s70:32', 'pop', 0.2], ['s73:3#3', 'pop', 0.2], ['s74:profit', 'whoosh', 0.25], ['s75:rise', 'pop', 0.2], ['s76:2#2', 'coin', 0.2], ['s78:black', 'pop', 0.25], ['s87:stays', 'pop', 0.2]] })
