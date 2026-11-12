// ---------------------------------------------------------------- s72–s77: way 10, a big bet on one company (night launch field).
// One big rocket labelled ONE COMPANY on a pad. Three rockets: ONE STOCK · ONE STARTUP · ONE IDEA; a winner launches and
// coins multiply behind it. A professor reads a long study (1926–2016). Then 25 little rockets launch against a steady
// grey balloon line, TREASURY BILLS: most of them sputter and fall below it, and only one (4%) soars far above —
// THE BEST 4% EXPLAIN ALL THE NET GAINS. Last: LEGAL · FASTEST, and a wallet that shrinks: most likely to leave you with less.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { PosterWorld, Vig, Ticket, WayBadge, Rocket, Coin, Life, TXT, CREAM, ORANGE, RED, GOLD, GOLD2, MINT, INK, DEEP, TEAL, SAND, PLUM, SKYB } from './kit'

const GY = 960, LINE = 700
// # 25 rockets: where each one ends (y). Below LINE = worse than T-bills (14 of 25, a majority); index 22 is the 4% winner
const END = Array.from({ length: 25 }, (_, k) => k === 22 ? 520 : [3, 7, 17, 21, 9, 23, 1, 14, 19, 5, 10].includes(k) ? 640 - (k % 4) * 20 : 900 - (k % 5) * 30)

const Bet: React.FC<PieceProps> = ({ f, c }) => {
  const big = c('s72:big'), company = c('s72:company')
  const stock = c('s73:stock'), startup = c('s73:startup'), idea = c('s73:idea'), winner = c('s73:winner'), multiply = c('s73:multiply'), over = c('s73:over')
  const odds = c('s74:odds'), professor = c('s74:professor'), y1926 = c('s74:1926'), y2016 = c('s74:2016')
  const most = c('s75:most'), lifetime = c('s75:lifetime'), worse = c('s75:worse'), treasury = c('s75:treasury'), government = c('s75:government')
  const best = c('s76:best'), d4 = c('s76:4'), gains = c('s76:gains')
  const legal = c('s77:legal'), fastest = c('s77:fastest'), likely = c('s77:likely'), less = c('s77:less')

  const leo: Beat[] = [[big, 'pointUp', 'thinking'], [winner, 'celebrate', 'smiling'], [odds, 'think', 'thinking'], [worse, 'shock', 'worried'], [best, 'pointUp', 'thinking'], [likely, 'nervous', 'worried'], [less, 'emptyPockets', 'worried']]
  const A = 1 - on(f, odds - 10, 8), B = win(f, odds - 2, most - 2, 8), Cc = win(f, most - 2, legal - 2, 8), D = on(f, legal - 2, 8)
  const lift = on(f, winner, 40)

  return (
    <g>
      <PosterWorld f={f} id="rh-bet" tone="night" sunX={1600} sunY={260} />
      <g opacity={on(f, big - 4, 10)}><WayBadge x={200} y={320} n={10} s={pop(f, big, 12)} col={RED} /></g>
      {/* # A) one company; three kinds of one-thing bets; a winner flies */}
      {A > 0.001 && <g opacity={A}>
        <g opacity={1 - on(f, stock - 10, 8)} transform={`translate(1100 ${GY})`}><rect x={-160} y={-10} width={320} height={50} fill={DEEP} /><Rocket x={0} y={0} s={1.6} f={f} /><g opacity={on(f, company, 8)}><Ticket x={0} y={-560} t="ONE COMPANY" size={56} col={RED} tc={CREAM} /></g></g>
        {[[stock, 'ONE STOCK'], [startup, 'ONE STARTUP'], [idea, 'ONE IDEA']].map(([at, t], k) => {
          const a = at as number, x = 800 + k * 360, up = k === 1 ? lift : 0
          return <g key={k} opacity={on(f, a, 8)}>
            <rect x={x - 110} y={GY - 10} width={220} height={50} fill={DEEP} />
            <Rocket x={x} y={GY - 440 * up * up} s={1} f={f} flame={k === 1 ? on(f, winner, 6) : 0} col={[RED, ORANGE, TEAL][k]} />
            <g opacity={1 - up}><Ticket x={x} y={GY - 380} t={t as string} size={40} col={CREAM} /></g>
          </g>
        })}
        {/* coins multiply behind the winner */}
        {f >= multiply && Array.from({ length: 10 }, (_, i) => { const t = on(f, multiply + i * 2, 12); return <Coin key={i} x={1160 + Math.cos(i * 1.7) * 220 * t} y={GY - 420 + Math.sin(i * 1.3) * 120 * t} s={0.7} o={t * (1 - on(f, odds - 8, 8))} /> })}
        <g opacity={on(f, over, 8)}><Ticket x={1560} y={420} t="MANY TIMES OVER" size={50} col={GOLD} /></g>
        <Person f={f} who="worker" beats={leo} x={380} y={GY + 40} s={0.78} />
      </g>}
      {/* # B) the professor and his study */}
      {B > 0.001 && <g opacity={B}>
        <Person f={f} who="investor" beats={[[professor, 'read', 'thinking']]} x={760} y={GY + 40} s={0.8} />
        <g transform={`translate(1260 640) rotate(-4)`}>
          {[0, 1, 2].map((k) => <rect key={k} x={-210 + k * 10} y={-260 + k * 10} width={420} height={520} rx={12} fill={k === 2 ? CREAM : '#E8DCC4'} />)}
          {Array.from({ length: 9 }, (_, k) => <rect key={k} x={-150} y={-180 + k * 46} width={k % 3 === 2 ? 200 : 300} height={14} rx={7} fill="#B9AE98" />)}
          <g opacity={on(f, y1926, 8)}><text x={20} y={-200} textAnchor="middle" fill={INK} style={TXT(56)}>{f >= y2016 ? 'US STOCKS 1926–2016' : 'US STOCKS 1926'}</text></g>
        </g>
        <g opacity={on(f, odds, 8)}><Ticket x={1260} y={330} t="THE ODDS" size={56} col={RED} tc={CREAM} /></g>
      </g>}
      {/* # C) 25 rockets vs the Treasury-bill line */}
      {Cc > 0.001 && <g opacity={Cc}>
        <g opacity={on(f, treasury, 10)}>
          <line x1={120} y1={LINE} x2={1800} y2={LINE} stroke="#C9CED6" strokeWidth={8} strokeDasharray="30 18" />
          <g transform={`translate(1780 ${LINE - 10 + 8 * Math.sin(f / 12)})`}><ellipse rx={46} ry={56} fill="#C9CED6" /><path d="M0 56 L0 110" stroke="#C9CED6" strokeWidth={3} /></g>
          <text x={150} y={LINE - 24} fill="#E6E9EE" style={TXT(44)}>{f >= government ? 'TREASURY BILLS · SHORT LOANS TO THE GOVERNMENT' : 'TREASURY BILLS'}</text>
        </g>
        {END.map((ey, k) => { const t = on(f, most + 6 + k * 1.2, 30), x = 200 + k * 64, win12 = k === 22 ? on(f, best, 30) : 0
          const y = lerp(GY, ey, t) - (k === 22 ? 200 * win12 : 0), fallen = ey > LINE && t > 0.95
          return <g key={k}>
            <rect x={x - 24} y={GY - 6} width={48} height={20} fill={DEEP} />
            <Rocket x={x} y={y} s={0.34} f={f + k} r={fallen ? 160 : ey > LINE ? 20 * t : 0} flame={t > 0.05 && t < 0.9 ? 0.8 : k === 22 && win12 > 0 ? 1 : 0} col={k === 22 ? GOLD : ey > LINE ? '#8E949C' : RED} o={fallen ? 0.6 : 1} />
          </g> })}
        <g opacity={on(f, worse, 8) * (1 - on(f, best, 8))}><Ticket x={960} y={330} t="MOST DID WORSE THAN T-BILLS" size={54} col={CREAM} /></g>
        <g opacity={on(f, d4, 8)}><Ticket x={960} y={330} t={f >= gains ? 'THE BEST 4% EXPLAIN ALL NET GAINS' : 'THE BEST 4%'} size={54} col={GOLD} /></g>
      </g>}
      {/* # D) legal and fastest — and most likely to leave you with less */}
      {D > 0.001 && <g opacity={D}>
        <Person f={f} who="worker" beats={leo} x={560} y={GY + 40} s={0.8} />
        <g opacity={on(f, legal, 8)}><Ticket x={1260} y={420} t={f >= fastest ? 'LEGAL · FASTEST' : 'LEGAL'} size={60} col={MINT} tc={CREAM} /></g>
        <g opacity={on(f, likely, 8)} transform={`translate(1260 760) scale(${1 - 0.45 * on(f, less, 30)})`}>
          <rect x={-170} y={-110} width={340} height={220} rx={30} fill="#8A5A3C" /><rect x={-170} y={-110} width={340} height={70} rx={24} fill="#6E4630" />
          <circle cx={120} cy={10} r={22} fill={GOLD} />
        </g>
        <g opacity={on(f, less, 8)}><Ticket x={1260} y={960} t="MOST LIKELY TO LEAVE YOU WITH LESS" size={42} col={RED} tc={CREAM} /></g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={lifetime} x={960} y={500} kind="glint" />
        <Life f={f} at={c("s74:american")} x={1260} y={640} kind="glint" />
        <Life f={f} at={c("s76:all")} x={960} y={560} kind="glint" />
        <Life f={f} at={c("s77:big")} x={1260} y={760} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="rh-bet" />
      <Headline f={f} lines={[[big, 'PUT A BIG BET ON ONE COMPANY', CREAM, 84], [odds, 'BUT LOOK AT THE ODDS', CREAM, 88], [legal, 'THE FASTEST, AND THE RISKIEST', CREAM, 84]]} />
    </g>
  )
}

export const RH_BET = makePiece('rh-bet', 'Way 10 on a night launch field: one big rocket on its pad, ONE COMPANY; three rockets ONE STOCK · ONE STARTUP · ONE IDEA, and the middle one launches while coins multiply behind it (MANY TIMES OVER); a professor reads a thick study, US STOCKS 1926–2016 — THE ODDS; then twenty-five little rockets launch against a dashed grey line with a floating balloon, TREASURY BILLS · SHORT LOANS TO THE GOVERNMENT: most sputter, tip over and fall back below the line (MOST DID WORSE THAN T-BILLS), a few hover just above it, and one gold rocket soars far above all the others (THE BEST 4% EXPLAIN ALL NET GAINS); finally Leo beside LEGAL · FASTEST and a brown wallet that shrinks: MOST LIKELY TO LEAVE YOU WITH LESS.', {
  mood: 'dark', Component: Bet,
  beats: ["s72:big", "s72:company", "s73:stock", "s73:startup", "s73:idea", "s73:winner", "s73:multiply", "s73:over", "s74:odds", "s74:professor", "s74:1926", "s74:2016", "s75:most", "s75:lifetime", "s75:worse", "s75:treasury", "s75:government", "s76:best", "s76:4", "s76:gains", "s77:legal", "s77:fastest", "s77:likely", "s77:less", "s74:american", "s76:all", "s77:big"],
  sfx: [['s73:winner', 'whoosh', 0.1], ['s75:worse', 'thud', 0.1], ['s76:4', 'chime', 0.08]] })
