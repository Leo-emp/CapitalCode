// ---------------------------------------------------------------- s55–s67: step four — the tug of war.
// A sunny paper park. A) Two teams on a rope: BUYERS (high rates: less to spend) pull left — the house-shaped PRICE flag
//    slides down-left; LOCKED-IN OWNERS (few homes for sale) pull right — the flag comes back; in 2026 it ends near the
//    middle. B) A park notice board: SALES ≈ 3.99M A YEAR ↓, PRICES +1.3%, below June's $442,800 record (prices ease after
//    summer), the WEST −0.3%. C) An auction stand with only two bidders' paddles and only two houses on offer; buyer vs seller;
//    then a paper traffic jam that creeps forward but never turns back. D) More room for buyers: FOR SALE +4.6%, 33 DAYS;
//    the lock loosening: a padlock clicks open and a bar grows 7.5% → 22.5% (loans at 6%+); new job / new baby / new city —
//    each house's padlock pops off.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { DayWorld, House, Tag, Padlock, Paper, Vig, TXT, INK, CORAL, MINT, MUSTARD, PAPER, SLATE, TEAL, ROOFS, WALLS, SAGE2, Life } from './kit'

const GY = 940

const Card: React.FC<{ x: number; y: number; big: string; small: string; col: string; o?: number; s?: number }> = ({ x, y, big, small, col, o = 1, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <Paper d="M-170 -110 L170 -110 L170 110 L-170 110 Z" fill={PAPER} />
    <rect x={-170} y={-110} width={340} height={52} fill={col} /><text y={-72} textAnchor="middle" fill="#FFFFFF" style={TXT(36)}>{small}</text>
    <text y={40} textAnchor="middle" fill={INK} style={TXT(76)}>{big}</text>
  </g>
)
const PaperCar: React.FC<{ x: number; y: number; col: string }> = ({ x, y, col }) => (
  <g transform={`translate(${x} ${y})`}>
    <Paper d="M-70 -24 L-58 -54 L36 -54 L60 -24 L74 -24 L74 8 L-74 8 Z" fill={col} dx={3} dy={4} />
    <rect x={-46} y={-48} width={36} height={20} rx={3} fill="#BFE3F0" /><rect x={-2} y={-48} width={36} height={20} rx={3} fill="#BFE3F0" />
    <circle cx={-42} cy={10} r={14} fill={SLATE} /><circle cx={44} cy={10} r={14} fill={SLATE} />
  </g>
)

const Tug: React.FC<PieceProps> = ({ f, c }) => {
  const side1 = c('s55:side'), shrink = c('s55:shrink'), down = c('s55:down')
  const other = c('s56:other'), locked = c('s56:lockedin'), off = c('s56:off'), up = c('s56:up')
  const y2026 = c('s57:2026'), cancelled = c('s57:cancelled')
  const sales = c('s58:sales'), d399 = c('s58:399'), fewer = c('s58:fewer')
  const barely = c('s59:barely'), d13 = c('s59:13')
  const june = c('s60:june'), d442 = c('s60:442800'), ease = c('s60:ease')
  const west = c('s61:west'), d03 = c('s61:03')
  const auction = c('s62:auction'), bidders = c('s62:bidders'), houses62 = c('s62:houses')
  const buyer63 = c('s63:buyer'), seller63 = c('s63:seller'), rival = c('s63:rival')
  const crash = c('s64:crash'), slowed = c('s64:slowed'), jam = c('s64:jam'), turns = c('s64:turns')
  const room = c('s65:room'), d46 = c('s65:46'), d33 = c('s65:33')
  const loosening = c('s66:loosening'), d225 = c('s66:225'), d75 = c('s66:75')
  const anyway = c('s67:anyway'), job = c('s67:job'), baby = c('s67:baby'), city = c('s67:city'), disappears = c('s67:disappears')

  const A = 1 - on(f, sales - 6, 12), B = win(f, sales - 6, auction - 6, 12), C = win(f, auction - 6, room - 6, 12), D = on(f, room - 6, 12)
  // # the price flag: pulled left (down) by buyers, back right by owners, ending a touch right of centre
  const flagX = 960 - 160 * on(f, down - 10, 24) + 160 * on(f, up - 10, 24) + 18 * on(f, cancelled, 20)
  const pullL: Beat[] = [[side1, 'idle', 'neutral'], [shrink, 'pull', 'worried'], [up, 'pull', 'worried'], [cancelled, 'idle', 'neutral']]
  const pullR: Beat[] = [[other, 'idle', 'neutral'], [locked, 'pull', 'smiling'], [cancelled, 'idle', 'neutral']]
  const jamX = (k: number) => 120 + k * 250 + 60 * on(f, slowed, 60) + 40 * on(f, turns, 40)

  return (
    <g>
      <DayWorld f={f} id="re-tug" />
      <rect x={-40} y={GY} width={2000} height={200} fill="#8CC08F" /><rect x={-40} y={GY} width={2000} height={10} fill="#7AB07E" />

      {/* # A) the tug of war */}
      {A > 0.001 && <g opacity={A}>
        <path d={`M240 760 L${flagX} 760 L1680 760`} stroke="#B98457" strokeWidth={14} fill="none" />
        <line x1={960} y1={GY} x2={960} y2={680} stroke="#FFFFFF" strokeWidth={6} strokeDasharray="16 12" />
        <g transform={`translate(${flagX} 760)`}><Paper d="M-60 0 L-60 -90 L0 -140 L60 -90 L60 0 Z" fill={MUSTARD} dx={4} dy={5} /><text y={-30} textAnchor="middle" fill={INK} style={TXT(36)}>PRICE</text></g>
        <g opacity={on(f, side1, 8)}>{[0, 1, 2].map((k) => <Person key={k} f={f} who={['buyer', 'investorF', 'hero'][k]} beats={pullL} x={300 + k * 150} y={GY} s={0.6} />)}
          <Tag x={450} y={430} t="BUYERS" size={52} col={CORAL} tc="#FFFFFF" /><g opacity={on(f, shrink, 8)}><Tag x={450} y={520} t="HIGH RATES: LESS TO SPEND" size={34} /></g></g>
        <g opacity={on(f, other, 8)}>{[0, 1, 2].map((k) => <Person key={k} f={f} who={['worker', 'owner', 'investor'][k]} beats={pullR} x={1620 - k * 150} y={GY} s={0.6} flip />)}
          <Tag x={1470} y={430} t="LOCKED-IN OWNERS" size={52} col={TEAL} tc="#FFFFFF" /><g opacity={on(f, off, 8)}><Tag x={1470} y={520} t="FEW HOMES FOR SALE" size={34} /></g></g>
        <g opacity={win(f, down, other, 6)}><path d="M960 640 L780 640 M800 615 L770 640 L800 665" stroke={CORAL} strokeWidth={10} fill="none" strokeLinecap="round" /></g>
        <g opacity={win(f, up, y2026, 6)}><path d="M960 640 L1140 640 M1120 615 L1150 640 L1120 665" stroke={TEAL} strokeWidth={10} fill="none" strokeLinecap="round" /></g>
        <g opacity={on(f, cancelled, 8)}><Tag x={960} y={330} t="2026: ALMOST CANCELLED OUT" size={52} col={MUSTARD} /></g>
      </g>}

      {/* # B) the park notice board */}
      {B > 0.001 && <g opacity={B}>
        <rect x={300} y={360} width={1320} height={560} rx={20} fill="#B98457" /><rect x={320} y={380} width={1280} height={520} rx={12} fill="#D9B48A" />
        <rect x={420} y={GY - 20} width={24} height={30} fill="#8B6A4E" /><rect x={1476} y={GY - 20} width={24} height={30} fill="#8B6A4E" />
        <g opacity={on(f, sales, 8)}><Card x={560} y={560} big={f >= d399 ? '3.99M' : '…'} small="SALES A YEAR" col={CORAL} s={pop(f, sales, 12)} /><g opacity={on(f, fewer, 8)}><text x={560} y={720} textAnchor="middle" fill={INK} style={TXT(40)}>FEWER THAN A YEAR AGO ↓</text></g></g>
        <g opacity={on(f, barely, 8)}><Card x={960} y={560} big={f >= d13 ? '+1.3%' : '…'} small="PRICE VS A YEAR AGO" col={MINT} s={pop(f, barely, 12)} /></g>
        <g opacity={on(f, june, 8)}><Card x={1360} y={560} big={f >= d442 ? '$442,800' : '…'} small="JUNE RECORD" col="#5C8FC2" s={pop(f, june, 12)} /><g opacity={on(f, ease, 8)}><text x={1360} y={720} textAnchor="middle" fill={INK} style={TXT(36)}>SEPT: $417,500</text></g></g>
        <g opacity={on(f, west, 8)} transform={`translate(960 800) scale(${pop(f, west, 12)})`}><Paper d="M-190 -46 L190 -46 L190 46 L-190 46 Z" fill={PAPER} /><text y={16} textAnchor="middle" fill={INK} style={TXT(50)}>{f >= d03 ? 'THE WEST: −0.3%' : 'THE WEST'}</text></g>
      </g>}

      {/* # C) the auction, then the traffic jam */}
      {C > 0.001 && <g opacity={C}>
        <g opacity={1 - on(f, crash - 6, 10)}>
          <Paper d="M680 940 L700 640 L1240 640 L1260 940 Z" fill="#8E5B3A" />
          <rect x={660} y={620} width={620} height={30} rx={8} fill="#6E4A2E" /><text x={970} y={800} textAnchor="middle" fill="#FFE9B0" style={TXT(60)}>AUCTION</text>
          <g opacity={on(f, houses62, 8)}>{[0, 1].map((k) => <House key={k} x={840 + k * 260} y={620} s={0.42} roof={ROOFS[k + 1]} wall={WALLS[k]} />)}</g>
          <g opacity={on(f, bidders, 8)}>{[0, 1].map((k) => <g key={k} transform={`translate(${380 + k * 1160} 0)`}><Person f={f} who={k ? 'investorF' : 'buyer'} beats={[[bidders, 'holdUp', 'thinking']]} x={0} y={GY} s={0.6} flip={k === 1} /></g>)}</g>
          <g opacity={on(f, buyer63, 8)}><Tag x={380} y={360} t="LESS TO SPEND" size={40} col={CORAL} tc="#FFFFFF" /></g>
          <g opacity={on(f, seller63, 8)}><Tag x={1540} y={360} t="FEWER BUYERS…" size={40} /></g>
          <g opacity={on(f, rival, 8)}><Tag x={1540} y={450} t="…BUT FEWER RIVAL HOUSES" size={36} col={MINT} tc="#FFFFFF" /></g>
        </g>
        <g opacity={on(f, crash - 6, 10)}>
          <rect x={-40} y={800} width={2000} height={160} fill="#6D6A72" />{Array.from({ length: 12 }, (_, i) => <rect key={i} x={i * 180 - 20} y={872} width={90} height={10} rx={5} fill="#F2E7C9" />)}
          {Array.from({ length: 7 }, (_, k) => <PaperCar key={k} x={jamX(k)} y={860} col={[CORAL, MUSTARD, TEAL, '#5C8FC2', MINT, '#7A6BB0', CORAL][k]} />)}
          <g opacity={on(f, crash, 8)}><Tag x={960} y={330} t={f >= slowed ? 'NOT A CRASH: A SLOWDOWN' : 'A CRASH?'} size={56} /></g>
          <g opacity={on(f, turns, 8)}><Tag x={960} y={440} t="NOBODY TURNS BACK" size={40} col={MUSTARD} /></g>
        </g>
      </g>}

      {/* # D) more room, and the lock loosening */}
      {D > 0.001 && <g opacity={D}>
        <g opacity={1 - on(f, loosening - 6, 10)}>
          <Card x={680} y={620} big={f >= d46 ? '+4.6%' : '…'} small="HOMES FOR SALE" col={MINT} s={pop(f, room, 12)} />
          <g opacity={on(f, d33, 8)}><Card x={1240} y={620} big="33 DAYS" small="TYPICAL TIME TO SELL" col="#5C8FC2" s={pop(f, d33, 12)} /></g>
          <Tag x={960} y={330} t="BUYERS GET A BIT MORE ROOM" size={50} />
        </g>
        <g opacity={win(f, loosening - 6, anyway - 6, 10)}>
          <g transform="translate(560 640)"><path d={`M-40 -20 L-40 ${-70 - 40 * on(f, loosening, 16)} Q0 ${-120 - 40 * on(f, loosening, 16)} 40 ${-70 - 40 * on(f, loosening, 16)} L40 ${-50 - 40 * on(f, loosening, 16)}`} fill="none" stroke="#8A6A2E" strokeWidth={16} /><Paper d="M-62 -24 L62 -24 L62 76 L-62 76 Z" fill={MUSTARD} dx={5} dy={6} /></g>
          <g transform="translate(860 560)">
            <rect x={0} y={0} width={800} height={70} rx={14} fill={SLATE} opacity={0.15} />
            <rect x={0} y={0} width={800 * (lerp(7.5, 22.5, on(f, d225, 30)) / 30)} height={70} rx={14} fill={CORAL} />
            <text x={400} y={-24} textAnchor="middle" fill={INK} style={TXT(40)}>LOANS AT 6% OR MORE</text>
            <g opacity={on(f, d75, 8)}><text x={800 * (7.5 / 30)} y={120} textAnchor="middle" fill={INK} style={TXT(40)}>7.5% (EARLY 2022)</text></g>
            <g opacity={on(f, d225, 8)}><text x={800 * (22.5 / 30) - 10} y={50} textAnchor="end" fill="#FFFFFF" style={TXT(48)}>22.5% NOW</text></g>
          </g>
        </g>
        <g opacity={on(f, anyway - 6, 10)}>
          {[[job, 'NEW JOB'], [baby, 'NEW BABY'], [city, 'NEW CITY']].map(([at, t], k) => <g key={k} opacity={on(f, at as number, 8)}>
            <House x={520 + k * 440} y={GY - 10} s={0.62} roof={ROOFS[k + 3]} wall={WALLS[k + 1]} lock={1 - on(f, (at as number) + 10, 10)} />
            <g opacity={1 - on(f, (at as number) + 10, 10)}><Padlock x={520 + k * 440} y={lerp(GY - 140, GY - 300, on(f, (at as number) + 10, 14))} s={0.4} /></g>
            <Tag x={520 + k * 440} y={GY - 340} t={t as string} size={40} />
          </g>)}
          <g opacity={on(f, disappears, 8)}><Tag x={960} y={330} t="ONE MORE OLD LOW-RATE LOAN GONE" size={48} col={MUSTARD} /></g>
        </g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={c("s55:pay")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s60:they")} x={960} y={560} kind="glint" />
        <Life f={f} at={c("s61:slipped")} x={960} y={560} kind="glint" />
        <Life f={f} at={c("s63:to")} x={970} y={700} kind="glint" />
        <Life f={f} at={c("s63:the")} x={970} y={700} kind="glint" />
        <Life f={f} at={c("s64:so")} x={960} y={820} kind="flutter" />
        <Life f={f} at={c("s64:through")} x={960} y={820} kind="flutter" />
        <Life f={f} at={c("s65:are")} x={960} y={620} kind="glint" />
        <Life f={f} at={c("s65:and")} x={960} y={620} kind="glint" />
        <Life f={f} at={c("s66:and")} x={960} y={620} kind="glint" />
        <Life f={f} at={c("s66:6")} x={960} y={620} kind="glint" />
        <Life f={f} at={c("s67:every")} x={960} y={740} kind="glint" />
        <Life f={f} at={c("s66:2022")} x={960} y={620} kind="glint" />
        <Life f={f} at={c("s67:old")} x={960} y={740} kind="glint" />
      </g>
      {/* # life:end */}
      <Life f={f} at={c("s55:on")} x={960} y={700} kind="glint" />
      <Vig id="re-tug" />
      <Headline f={f} lines={[[side1, 'A TUG OF WAR', INK, 96], [sales, 'THE 2026 SCOREBOARD', INK, 88], [auction, 'FEWER BIDDERS, FEWER HOUSES', INK, 84], [room, 'SLOWLY LOOSENING', INK, 90]]} />
    </g>
  )
}

export const RE_TUG = makePiece('re-tug', "Step four in a sunny paper park: a tug of war — three BUYERS (HIGH RATES: LESS TO SPEND) pull a rope left and the house-shaped PRICE flag slides down, three LOCKED-IN OWNERS (FEW HOMES FOR SALE) pull it back — 2026: ALMOST CANCELLED OUT; a park notice board pins up cards: 3.99M SALES A YEAR (fewer than a year ago ↓), +1.3% PRICE VS A YEAR AGO, $442,800 JUNE RECORD (Sept $417,500, eases after summer), THE WEST: −0.3%; an auction stand with only two houses and two bidders — LESS TO SPEND vs FEWER BUYERS… BUT FEWER RIVAL HOUSES; a paper traffic jam that creeps forward: NOT A CRASH: A SLOWDOWN, NOBODY TURNS BACK; cards +4.6% HOMES FOR SALE and 33 DAYS to sell — BUYERS GET A BIT MORE ROOM; a padlock clicks open as a bar grows from 7.5% (early 2022) to 22.5% NOW of loans at 6% or more; NEW JOB, NEW BABY, NEW CITY — each house's padlock pops off: ONE MORE OLD LOW-RATE LOAN GONE.", {
  mood: 'light', Component: Tug,
  beats: ["s55:side", "s55:shrink", "s55:down", "s56:other", "s56:lockedin", "s56:off", "s56:up", "s57:2026", "s57:cancelled", "s58:sales", "s58:399", "s58:fewer", "s59:barely", "s59:13", "s60:june", "s60:442800", "s60:ease", "s61:west", "s61:03", "s62:auction", "s62:bidders", "s62:houses", "s63:buyer", "s63:seller", "s63:rival", "s64:crash", "s64:slowed", "s64:jam", "s64:turns", "s65:room", "s65:46", "s65:33", "s66:loosening", "s66:225", "s66:75", "s67:anyway", "s67:job", "s67:baby", "s67:city", "s67:disappears", "s55:pay", "s60:they", "s61:slipped", "s63:to", "s63:the", "s64:so", "s64:through", "s65:are", "s65:and", "s66:and", "s66:6", "s67:every", "s66:2022", "s67:old", "s55:on"],
  sfx: [['s55:down', 'swish', 0.1], ['s56:up', 'swish', 0.1], ['s64:crash', 'thud', 0.1], ['s66:loosening', 'pop', 0.1]] })
