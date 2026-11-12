// ---------------------------------------------------------------- s50–s58: step six, time changes the risk (the road of 98 year-stones).
// A) A cobbled road of 98 stones, one per year 1928 → 2025, laid in two rows; a 1-stone frame hops along; the 26 years that
//    lost money turn red (about 1 in 4); 1931 (−44%), 2008 (−37%) and 2009 (+26%) pulse with their numbers.
// B) A 10-stone frame slides along the road and drops a result dot for each stretch: 89 dots, only 5 red. Then a
//    20-stone frame: 79 dots, all green; a badge: EVEN AFTER INFLATION.
// C) Why: a storm cloud hits a single stone (one year), but over twenty stones the sunny ones outweigh it on a balance
//    (so far); then the road runs on into fog with a question mark — the past is not a promise; fees and taxes tags.
// D) A roulette wheel spins and stops (a bet is over) next to Rosa's bakery, oven glowing, coins still coming (a share
//    keeps working); then an hourglass and you relaxing on a bench: how long can you leave it alone?
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { BB, Bakery, Coin, Label, M, No, Town } from './kit'
import { UP1, UP10, UP20 } from './data'

const G = 940
const SX = (i: number) => 150 + (i % 49) * 33, SY = (i: number) => (i < 49 ? 470 : 640)

const Road: React.FC<{ n: number; red: number; dim?: number; hi?: number[] }> = ({ n, red, dim = 0, hi = [] }) => (
  <g>
    {[470, 640].map((y) => <rect key={y} x={120} y={y - 30} width={49 * 33 + 30} height={60} rx={30} fill="#BFA98A" />)}
    {UP1.map((u, i) => i < n ? <rect key={i} x={SX(i) - 14} y={SY(i) - 20} width={28} height={40} rx={8} fill={!u && red > 0 ? M.red : u ? M.stone : M.stoneD} opacity={(!u ? 1 : 1 - 0.5 * dim) * (hi.length && !hi.includes(i) ? 0.55 : 1)} /> : null)}
  </g>
)
const Dots: React.FC<{ arr: number[]; n: number; y: number; label: string; o?: number }> = ({ arr, n, y, label, o = 1 }) => (
  <g opacity={o}>{arr.map((u, i) => i < n ? <circle key={i} cx={150 + i * (1620 / arr.length)} cy={y} r={8} fill={u ? M.green : M.red} /> : null)}
    <text x={150} y={y - 26} fill={M.ink} style={BB(44)}>{label}</text></g>
)

const Time: React.FC<PieceProps> = ({ f, c }) => {
  const stocks50 = c('s50:stocks'), one51b = c('s51:one#2'), next52 = c('s52:next'), n26b = c('s52:26'), y1928b = c('s54:1928'), twenty56 = c('s56:twenty'), same56 = c('s56:same'), gambling50 = c('s50:gambling'), test50 = c('s50:test'), real50 = c('s50:real'), dividends50 = c('s50:dividends'), y1928 = c('s50:1928'), y2025 = c('s50:2025')
  const held51 = c('s51:held'), year51 = c('s51:year'), lost51 = c('s51:lost'), n26 = c('s51:26'), n98 = c('s51:98'), four51 = c('s51:four')
  const worst52 = c('s52:worst'), y1931 = c('s52:1931'), p44 = c('s52:44'), y2008 = c('s52:2008'), p37 = c('s52:37'), y2009 = c('s52:2009'), rose52 = c('s52:rose')
  const stretch53 = c('s53:stretch'), n89 = c('s53:89'), ten53 = c('s53:tenyear'), only53 = c('s53:only'), n5 = c('s53:5'), started53 = c('s53:started')
  const n79 = c('s54:79'), twenty54 = c('s54:twentyyear'), y1947 = c('s54:1947'), y1948 = c('s54:1948'), single54 = c('s54:single'), lost54 = c('s54:lost'), inflation54 = c('s54:inflation')
  const why55 = c('s55:why'), bad55 = c('s55:bad'), hit55 = c('s55:hit'), twenty55 = c('s55:twenty'), good55 = c('s55:good'), far55 = c('s55:far'), always55 = c('s55:always'), ones55 = c('s55:ones')
  const doesnt56 = c("s56:doesn't"), next56 = c('s56:next'), past56 = c('s56:past'), promise56 = c('s56:promise'), fees56 = c('s56:fees'), taxes56 = c('s56:taxes')
  const shows57 = c('s57:shows'), gambling57 = c('s57:gambling'), owning57 = c('s57:owning'), bet57 = c('s57:bet'), stops57 = c('s57:stops'), keeps57 = c('s57:keeps'), working57 = c('s57:working')
  const question58 = c('s58:question'), own58 = c('s58:own'), long58 = c('s58:long'), leave58 = c('s58:leave'), alone58 = c('s58:alone')

  const AB = stretch53 - 4, BC = why55 - 6, CD = shows57 - 6
  const A = win(f, 0, AB), B = win(f, AB - 8, BC), Cc = win(f, BC - 8, CD), D = on(f, CD - 8, 10)

  const laid = Math.round(98 * span(f, real50, y2025 + 10))
  const hop = f >= held51 ? Math.floor(((f - held51) / 4) % 98) : -1
  const w10 = Math.round(89 * span(f, ten53, started53 + 20)), w20 = Math.round(79 * span(f, twenty54, single54 + 10))
  const frameLen = f >= twenty54 ? 20 : 10, frameAt = f >= twenty54 ? Math.min(78, w20) : Math.min(88, w10)
  const hiYear = (y: number) => y - 1928
  const spin = f < stops57 ? (f - bet57) * 14 : (stops57 - bet57) * 14
  const dBeats: Beat[] = [[CD, 'explain', 'neutral'], [owning57, 'point', 'smiling'], [question58, 'think', 'thinking'], [leave58, 'relax', 'smiling']]

  return (
    <g>
      <Town id="mk-t-base" f={f} mood="morning" roofs={false} />
      {/* # A) 98 year-stones; one-year results */}
      {A > 0 && <g opacity={A}>
        <Town id="mk-t-a" f={f} mood="morning" roofs={false} />
        <g opacity={on(f, test50, 10)}><Road n={laid} red={on(f, lost51, 8)} dim={on(f, worst52, 8)} hi={f >= worst52 ? [hiYear(1931), hiYear(2008), hiYear(2009)] : []} /></g>
        <g opacity={on(f, y1928, 8) * (1 - on(f, y1931 - 4, 6))}><text x={150} y={400} fill={M.ink} style={BB(46)}>1928</text></g>
        <g opacity={on(f, y2025, 8)}><text x={SX(97) + 14} y={720} textAnchor="end" fill={M.ink} style={BB(46)}>2025</text></g>
        <g opacity={win(f, gambling50, test50 + 6, 6)} transform="translate(1700 300)"><rect x={-60} y={-60} width={120} height={120} rx={20} fill={M.paper} stroke={M.ink} strokeWidth={5} />{[[-28, -28], [28, 28], [0, 0], [28, -28], [-28, 28]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r={10} fill={M.ink} />)}</g>
        <g opacity={on(f, stocks50, 8) * (1 - on(f, held51, 8))}><Label x={960} y={820} text={f >= dividends50 ? 'US STOCKS, DIVIDENDS PUT BACK IN' : 'US STOCKS'} size={48} /></g>
        {hop >= 0 && f < worst52 && <rect x={SX(hop) - 20} y={SY(hop) - 28} width={40} height={56} rx={10} fill="none" stroke={M.ink} strokeWidth={5} opacity={on(f, year51, 6)} />}
        <g opacity={on(f, n26, 8) * (1 - on(f, worst52, 8))}><Label x={700} y={830} text={f >= n98 ? '26 OF 98 YEARS LOST MONEY' : '26 YEARS LOST MONEY'} size={52} fill={M.red} ink="#FFFFFF" /></g>
        <g opacity={on(f, one51b, 8) * (1 - on(f, worst52, 8))} transform="translate(1500 830)"><circle r={60} fill={M.stone} /><path d="M0 0 L0 -60 A60 60 0 0 1 60 0 Z" fill={M.red} /><text x={90} y={16} fill={M.ink} style={BB(44)}>1 IN 4</text></g>
        {[[y1931, p44, 1931, '−44%', M.red], [y2008, p37, 2008, '−37%', M.red], [y2009, n26b, 2009, '+26%', M.green]].map(([a, b, y, t, col], k) => { const i = hiYear(y as number)
          return <g key={k} opacity={on(f, a as number, 8)}><circle cx={SX(i)} cy={SY(i)} r={34 + 4 * Math.sin(f / 5)} fill="none" stroke={col as string} strokeWidth={6} />
            <g transform={`translate(${SX(i) + (k === 2 ? 70 : k === 1 ? -70 : 0)} ${SY(i) + (i < 49 ? -90 : 100)})`}><Label x={0} y={0} text={f >= (b as number) ? `${y} ${t}` : `${y}`} size={44} fill={col as string} ink="#FFFFFF" /></g></g> })}
      </g>}

      <g opacity={win(f, next52, n26b + 20, 6) * A}><path d={`M ${SX(80)} ${SY(80) + 30} Q ${SX(80) + 16} ${SY(80) + 70} ${SX(81)} ${SY(81) + 30}`} fill="none" stroke={M.green} strokeWidth={6} /></g>
      {/* # B) 10-year and 20-year stretches */}
      {B > 0 && <g opacity={B}>
        <Town id="mk-t-b" f={f} mood="noon" roofs={false} />
        <Road n={98} red={1} dim={0.5} />
        {f >= ten53 && <rect x={SX(frameAt) - 20} y={SY(frameAt) - 32} width={Math.min(frameLen, 49 - (frameAt % 49)) * 33 + 6} height={64} rx={12} fill={M.butter} opacity={0.35} stroke={M.butterD} strokeWidth={5} />}
        <Dots arr={UP10} n={w10} y={810} label={f >= only53 ? (f >= n5 ? '89 TEN-YEAR STRETCHES: ONLY 5 LOST' : '89 TEN-YEAR STRETCHES') : f >= n89 ? '89 TEN-YEAR STRETCHES' : ''} o={on(f, ten53, 8)} />
        <Dots arr={UP20} n={w20} y={920} label={f >= single54 ? '79 TWENTY-YEAR STRETCHES: 0 LOST' : f >= n79 ? '79 TWENTY-YEAR STRETCHES' : ''} o={on(f, twenty54, 8)} />
        <g opacity={win(f, y1928b, single54, 6)}><Label x={500} y={330} text={f >= y1948 ? '1929 → 1948 …' : f >= y1947 ? '1928 → 1947' : '1928 →'} size={50} /></g>
        <g opacity={on(f, lost54, 8)} transform={`translate(1500 ${330 - 10 * pop(f, lost54, 12)})`}><Label x={0} y={0} text={f >= inflation54 ? 'EVEN AFTER INFLATION' : 'NONE LOST MONEY'} size={52} fill={M.greenD} ink="#FFFFFF" /></g>
      </g>}

      {/* # C) one storm vs twenty years; the road into fog */}
      {Cc > 0 && <g opacity={Cc}>
        <Town id="mk-t-c" f={f} mood={f >= next56 ? 'grey' : 'noon'} roofs={false} />
        <g opacity={1 - on(f, next56, 10)}>
          {/* one stone hit by a storm */}
          <g transform="translate(450 0)" opacity={on(f, bad55 - 4, 8)}><rect x={-40} y={600} width={80} height={110} rx={14} fill={M.red} />
            <g transform={`translate(0 ${430 + 6 * Math.sin(f / 9)})`}><ellipse rx={150} ry={50} fill="#5B6478" /><ellipse cx={-50} cy={-30} rx={80} ry={50} fill="#6E7891" /><ellipse cx={50} cy={-36} rx={70} ry={56} fill="#6E7891" />
              {f >= hit55 && <path d="M0 40 L-30 110 L0 110 L-20 180 L40 90 L10 90 L30 40 Z" fill={M.lamp} opacity={Math.abs(Math.sin(f / 4))} />}</g>
            <text y={780} textAnchor="middle" fill={M.ink} style={BB(46)}>ONE YEAR</text></g>
          {/* twenty stones on a balance */}
          <g opacity={on(f, twenty55, 10)} transform="translate(1250 0)">
            <rect x={-10} y={420} width={20} height={300} fill={M.woodD} /><path d="M-90 720 L90 720 L50 690 L-50 690 Z" fill={M.woodD} />
            <g transform={`rotate(${-8 * on(f, good55, 20)} 0 420)`}><rect x={-420} y={410} width={840} height={16} rx={8} fill={M.wood} />
              <g transform="translate(-340 430)">{Array.from({ length: 15 }, (_, k) => <rect key={k} x={-80 + (k % 5) * 34} y={30 - Math.floor(k / 5) * 44} width={28} height={40} rx={8} fill={M.green} />)}<text y={110} textAnchor="middle" fill={M.greenD} style={BB(40)}>GOOD YEARS</text></g>
              <g transform="translate(340 430)">{Array.from({ length: 5 }, (_, k) => <rect key={k} x={-80 + k * 34} y={30} width={28} height={40} rx={8} fill={M.red} />)}<text y={110} textAnchor="middle" fill={M.redD} style={BB(40)}>BAD YEARS</text></g></g>
            <g opacity={on(f, far55, 8)}><Label x={0} y={330} text={f >= always55 ? 'SO FAR: GOOD > BAD' : 'SO FAR'} size={48} /></g>
            <g opacity={on(f, ones55, 8) * 0.9}><text y={820} textAnchor="middle" fill={M.ink} style={BB(46)}>TWENTY YEARS</text></g>
          </g>
        </g>
        <g opacity={on(f, next56, 10)}>
          <path d={`M 300 ${G} L 1500 520 L 1620 540 L 600 ${G + 40} Z`} fill="#BFA98A" />
          {Array.from({ length: 12 }, (_, k) => { const t = k / 11; return <rect key={k} x={lerp(420, 1520, t) - 14 * (1 - t * 0.6)} y={lerp(G - 20, 520, t)} width={28 * (1 - t * 0.6)} height={18 * (1 - t * 0.6)} rx={4} fill={M.stone} opacity={1 - t * 0.7} /> })}
          <rect x={1200} y={300} width={800} height={500} fill="#E3E6EA" opacity={0.7} />
          <g transform={`translate(1560 ${420 + 6 * Math.sin(f / 8)})`}><circle r={70} fill={M.paper} /><text y={38} textAnchor="middle" fill={M.ink2} style={BB(110)}>?</text></g>
          <g opacity={win(f, twenty56, past56, 6)}><Label x={700} y={420} text={f >= same56 ? 'THE SAME WAY?' : 'THE NEXT 20 YEARS?'} size={56} /></g>
          <g opacity={on(f, past56, 8)}><Label x={700} y={420} text="THE PAST ≠ A PROMISE" size={56} fill={M.ink} ink="#FFFFFF" /></g>
          <g opacity={on(f, promise56, 8) * (0.5 + 0.5 * Math.sin(f / 5))}><circle cx={1560} cy={420} r={96} fill="none" stroke={M.butterD} strokeWidth={8} /></g>
          <g opacity={on(f, fees56, 8)}><Label x={500} y={560} text="BEFORE FEES" size={44} fill={M.red} ink="#FFFFFF" /></g>
          <g opacity={on(f, taxes56, 8)}><Label x={840} y={560} text="+ TAXES" size={44} fill={M.red} ink="#FFFFFF" /></g>
        </g>
      </g>}

      {/* # D) a bet ends; a share keeps working; how long can you leave it? */}
      {D > 0 && <g opacity={D}>
        <Town id="mk-t-d" f={f} mood="morning" />
        <g opacity={1 - on(f, question58, 12)}>
          <g transform="translate(560 560)" opacity={on(f, gambling57, 10)}>
            <circle r={210} fill={M.woodD} /><circle r={180} fill="#2A2A30" />
            <g transform={`rotate(${spin})`}>{Array.from({ length: 16 }, (_, k) => <path key={k} d={`M0 0 L${180 * Math.cos(k * Math.PI / 8)} ${180 * Math.sin(k * Math.PI / 8)} A180 180 0 0 1 ${180 * Math.cos((k + 1) * Math.PI / 8)} ${180 * Math.sin((k + 1) * Math.PI / 8)} Z`} fill={k % 2 ? M.red : '#22252E'} />)}<circle r={50} fill={M.gold} /></g>
            <g opacity={on(f, stops57, 8)}><Label x={0} y={280} text="A BET: OVER" size={52} fill={M.ink} ink="#FFFFFF" /></g>
          </g>
          <g opacity={on(f, owning57, 10)}>
            <Bakery x={1350} y={G} s={0.85} f={f} glow={on(f, keeps57, 10)} />
            {f >= keeps57 && [0, 1, 2].map((k) => { const t = ((f - keeps57) / 40 + k / 3) % 1; return <Coin key={k} x={1350 + 160 * t} y={520 - 120 * t} s={0.45} o={1 - t} /> })}
            <g opacity={on(f, working57, 8)}><Label x={1350} y={G + 60} text="A SHARE: KEEPS WORKING" size={52} fill={M.greenD} ink="#FFFFFF" /></g>
          </g>
        </g>
        <g opacity={on(f, question58, 12)}>
          <Person f={f} who="investorF" beats={dBeats} x={560} y={G} s={0.85} />
          <g transform={`translate(1200 ${560})`} opacity={on(f, long58, 10)}><path d="M-90 -160 L90 -160 L14 0 L90 160 L-90 160 L-14 0 Z" fill="#E8F1F4" stroke={M.wood} strokeWidth={12} />
            {(() => { const t = span(f, long58, alone58 + 40); return <g><path d={`M${-76 + 62 * t} ${-148 + 140 * t} L${76 - 62 * t} ${-148 + 140 * t} L0 0 Z`} fill={M.butterD} /><path d={`M${-76 * t} ${148 - 140 * t} L${76 * t} ${148 - 140 * t} L76 148 L-76 148 Z`} fill={M.butterD} /></g> })()}</g>
          <g opacity={on(f, own58, 8)}><Label x={1200} y={300} text={f >= leave58 ? 'HOW LONG CAN YOU WAIT?' : 'WHAT YOU OWN'} size={52} /></g>
        </g>
      </g>}

      <Headline f={f} lines={[[gambling50, 'IS IT JUST GAMBLING?', M.ink, 100], [held51, '1 YEAR: LOST 1 IN 4', M.red, 100], [stretch53, 'STRETCH IT OUT', M.ink, 104], [twenty54, '20 YEARS: NEVER LOST', M.greenD, 100], [why55, 'WHY?', M.ink, 110], [doesnt56, 'NOT A PROMISE', M.ink, 104], [shows57, 'GAMBLING VS OWNING', M.ink, 104], [question58, 'TIME MATTERS', M.ink, 104]]} />
    </g>
  )
}

export const MK_TIME = makePiece('mk-time', 'Step six, time and risk: a cobbled road of 98 year-stones 1928 → 2025 (US stocks with dividends) is laid; a frame hops stone to stone and the 26 losing years turn red (26 of 98, 1 in 4); 1931 −44%, 2008 −37%, 2009 +26% pulse; a 10-stone frame slides along dropping 89 result dots, only 5 red; a 20-stone frame drops 79 dots, all green (none lost, even after inflation); a storm cloud hits one red stone (one year) while a balance of 20 stones tips to the good years (so far); the road runs into fog with a question mark (the past is not a promise, before fees + taxes); a roulette wheel spins and stops (a bet: over) beside Rosa\'s glowing bakery still sending out coins (a share keeps working); an hourglass runs while you relax (how long can you wait?)', {
  mood: 'light', Component: Time,
  beats: ["s50:stocks", "s51:one#2", "s52:next", "s52:26", "s54:1928", "s56:twenty", "s56:same", "s50:gambling", "s50:test", "s50:real", "s50:dividends", "s50:1928", "s50:2025", "s51:held", "s51:year", "s51:lost", "s51:26", "s51:98", "s52:worst", "s52:1931", "s52:44", "s52:2008", "s52:37", "s52:2009", "s53:stretch", "s53:89", "s53:tenyear", "s53:only", "s53:5", "s53:started", "s54:79", "s54:twentyyear", "s54:1947", "s54:1948", "s54:single", "s54:lost", "s54:inflation", "s55:why", "s55:bad", "s55:hit", "s55:twenty", "s55:good", "s55:far", "s55:always", "s55:ones", "s56:next", "s56:past", "s56:promise", "s56:fees", "s56:taxes", "s57:shows", "s57:gambling", "s57:owning", "s57:bet", "s57:stops", "s57:keeps", "s57:working", "s58:question", "s58:own", "s58:long", "s58:leave", "s58:alone"],
  sfx: [['s51:lost', 'thud', 0.1], ['s52:1931', 'crack', 0.12], ['s54:single', 'chime', 0.14], ['s55:hit', 'crack', 0.1], ['s57:stops', 'click', 0.12]] })
