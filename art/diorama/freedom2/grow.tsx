// ---------------------------------------------------------------- s40–s53: step four, grow the pile first.
// A) A city park: Leo plants a small money tree; it drops one tiny coin (tiny income); an arrow up for growth (s40–s41).
// B) A broad mix: a crate of hundreds of tiny company buildings, Leo drops his coins in (s42).
// C) The record since 1928: a jagged line climbing; tags ~10% A YEAR BEFORE INFLATION, ~7% AFTER; a lower, careful dashed line 5% for Leo, TODAY'S DOLLARS (s43–s44).
// D) The tree's coins fall and roll back into its roots — dividends and gains go straight back in (s45).
// E) 2008: a storm bends the tree, a bar drops more than a third; Leo keeps feeding it and his $1,250 buys more pieces when prices are low (s46–s47).
// F) Decades: the tree grows in three stages beside an envelope (its 4% paycheck): $7,500, $20,000, $40,000 a year; three bars show the jumps (s48–s52);
//    growth on top of growth, so investing comes first (s53).
import React from 'react'
import { lerp, on, pop, rnd, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { Axes, C, City, Cross, Defs, Envelope, FONT, Grain, MoneyTree, Tag, fadeIn, scene } from './kit'

const G = 930
const Park: React.FC<{ f: number; sky?: 'day' | 'storm' | 'gold' | 'dawn' }> = ({ f, sky = 'day' }) => (
  <g><City sky={sky} f={f} sun={sky === 'storm' ? null : [1700, 250]} ground={G} />
    <rect x={0} y={G - 8} width={1920} height={160} fill={sky === 'storm' ? '#4E6A55' : '#7DB26E'} /><rect x={0} y={G - 8} width={1920} height={10} fill="#fff" opacity={0.12} /></g>
)
const MiniCo: React.FC<{ x: number; y: number; k: number; o: number }> = ({ x, y, k, o }) => <g opacity={o} transform={`translate(${x} ${y})`}><rect x={-14} y={-30 - (k % 3) * 8} width={28} height={30 + (k % 3) * 8} fill={[C.teal, C.brick, C.violet, C.amber, '#7D93B8'][k % 5]} /><rect x={-8} y={-22 - (k % 3) * 8} width={6} height={6} fill="#fff" opacity={0.7} /><rect x={2} y={-22 - (k % 3) * 8} width={6} height={6} fill="#fff" opacity={0.7} /></g>
// # a coin (falling / rolling)
const Coin: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}><circle r={22} cy={4} fill={C.goldD} /><circle r={22} fill={C.gold} /><text y={9} textAnchor="middle" fill={C.goldD} style={{ font: `400 26px ${FONT.big}` }}>$</text></g>

// # an illustrative jagged climb (not data; the headline facts are in the tags)
const PATH_PTS = Array.from({ length: 41 }, (_, k) => { const t = k / 40; return [t, Math.pow(t, 2.2) * 0.9 + 0.04 + (rnd(k + 4) - 0.5) * 0.06 * (1 + t) - (k === 20 ? 0.06 : 0) - (k === 32 ? 0.12 : 0)] as [number, number] })

const Grow: React.FC<PieceProps> = ({ f, c }) => {
  const growing = c('s40:growing')
  const early = c('s41:early'), small = c('s41:small'), income = c('s41:income'), tiny41 = c('s41:tiny'), growth41 = c('s41:growth')
  const broad = c('s42:broad'), stocks = c('s42:stocks'), hundreds = c('s42:hundreds'), companies = c('s42:companies'), once = c('s42:once')
  const since = c('s43:since'), dividends43 = c('s43:dividends'), grew = c('s43:grew'), ten = c('s43:ten'), seven43 = c('s43:seven'), after43 = c('s43:after')
  const careful = c('s44:careful'), five44 = c('s44:five'), today = c('s44:every')
  const earns = c('s45:earns'), spend45 = c('s45:spend'), dividend45 = c('s45:dividend'), gain45 = c('s45:gain'), straight = c('s45:straight'), earning = c('s45:earning')
  const road = c('s46:road'), fell = c('s46:fell'), third = c('s46:third'), smooth = c('s46:smooth'), in46 = c('s46:in')
  const month47 = c('s47:month'), keeps = c('s47:investing') - 8, low = c('s47:low'), twelve = c('s47:twelve'), buys = c('s47:buys')
  const peek = c('s48:peek'), second48 = c('s48:second'), four48 = c('s48:four'), ten49 = c('s49:ten'), ninety = c('s49:ninety'), seven49 = c('s49:seven')
  const twenty50 = c('s50:twenty'), five50 = c('s50:five'), twenty50b = c('s50:twenty#2')
  const thirty = c('s51:thirty'), million = c('s51:million'), forty51 = c('s51:forty')
  const jumps = c('s52:jumps'), seven52 = c('s52:seven'), twenty52 = c('s52:twenty'), forty52 = c('s52:forty'), decade = c('s52:decade')
  const growth53 = c('s53:growth'), why = c('s53:why'), first53 = c('s53:first')

  const AB = c('s42') - 6, BC = c('s43') - 6, CD = c('s45') - 6, DE = c('s46') - 6, EF = c('s48') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = scene(f, CD, DE), E = scene(f, DE, EF), F = fadeIn(f, EF)
  // # F) decade stage: 0 before "ten" (s49), then 1, 2, 3
  const stage = f < ten49 ? 0.25 : f < twenty50 ? lerp(0.25, 0.45, span(f, ten49, ten49 + 20)) : f < thirty ? lerp(0.45, 0.7, span(f, twenty50, twenty50 + 20)) : lerp(0.7, 1, span(f, thirty, thirty + 20))
  const payLabel = f < seven49 ? '' : f < twenty50b ? '$7,500 A YEAR' : f < forty51 ? '$20,000 A YEAR' : '$40,000 A YEAR'
  const pileLabel = f < ninety ? 'YEAR 10' : f < five50 ? 'YEAR 10 · $190,000' : f < million ? 'YEAR 20 · $500,000' : 'YEAR 30 · $1 MILLION'
  const cx = 360, cy = G - 60, cw = 1200, ch = 520
  const curve = (p: number) => 'M' + PATH_PTS.filter(([t]) => t <= p + 1e-6).map(([t, v]) => `${cx + t * cw} ${cy - v * ch}`).join(' L')

  return (
    <g>
      <Defs />
      {/* # A) a small tree, a tiny coin */}
      {A > 0 && <g opacity={A}>
        <Park f={f} />
        <MoneyTree x={960} y={G} g={lerp(0.05, 0.2, span(f, c('s40:pile'), small + 20))} f={f} s={1} o={on(f, c('s40:pile') - 4, 8)} />
        <Tag x={960} y={G - 300} text="BEFORE ANYTHING ELSE" size={36} o={win(f, c('s40:anything'), early, 8)} point="none" />
        <Person f={f} who="investor" beats={[[0, 'reachDown', 'smiling'], [small, 'point', 'neutral'], [growth41, 'pointUp', 'smiling']]} x={560} y={G} s={0.92} />
        <Tag x={960} y={G + 60} text="LEO'S PILE: SMALL" size={38} o={on(f, small, 8)} point="none" />
        <g opacity={win(f, income - 4, growth41, 8)}><Coin x={1100} y={lerp(G - 220, G - 20, span(f, income, income + 14))} s={0.7} /><Tag x={1260} y={G - 140} text="TINY INCOME" size={36} o={on(f, tiny41, 8)} point="none" /></g>
        <g opacity={on(f, growth41 - 4, 8)} transform={`translate(1400 ${G - 200})`}><path d="M0 120 L0 -120 M-50 -70 L0 -130 L50 -70" stroke={C.cashD} strokeWidth={26} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
        <Tag x={1400} y={G - 380} text="GROWTH MATTERS NOW" size={40} o={on(f, growth41, 8)} color={C.cash} ink="#fff" />
      </g>}

      {/* # B) a broad mix */}
      {B > 0 && <g opacity={B}>
        <Park f={f} />
        <g transform={`translate(1100 ${G})`}>
          <path d="M-420 0 L-460 -300 L460 -300 L420 0 Z" fill="#B88A5A" /><path d="M-460 -300 L460 -300 L450 -270 L-450 -270 Z" fill="#8E6440" />
          {Array.from({ length: 60 }, (_, k) => <MiniCo key={k} x={-390 + (k % 15) * 56} y={-284 - Math.floor(k / 15) * 46} k={k} o={on(f, lerp(stocks - 4, companies, rnd(k + 1)), 6)} />)}
          {[0, 1, 2, 3].map((k) => <rect key={k} x={-430} y={-230 + k * 60} width={860} height={8} fill="#8E6440" opacity={0.5} />)}
        </g>
        <Tag x={1100} y={G - 520} text="HUNDREDS OF BIG COMPANIES" size={42} o={on(f, hundreds, 8)} />
        <Person f={f} who="investor" beats={[[0, 'idle', 'smiling'], [broad, 'present', 'smiling'], [once, 'push', 'smiling']]} x={330} y={G} s={0.92} />
        {[0, 1, 2].map((k) => { const at = once + k * 6, t = span(f, at, at + 16); return f >= at && t < 1 ? <Coin key={k} x={lerp(460, 1000 + k * 60, t)} y={lerp(G - 320, G - 380, t) - 120 * Math.sin(Math.PI * t)} s={0.8} /> : null })}
        <Tag x={1100} y={G + 60} text="A BROAD MIX OF STOCKS" size={38} o={on(f, broad, 8)} point="none" />
      </g>}

      {/* # C) the record since 1928, and Leo's careful 5% */}
      {Cc > 0 && <g opacity={Cc}>
        <Park f={f} sky="dawn" />
        <Axes x={cx} y={cy} w={cw} h={ch} o={on(f, BC, 8)} xl="2025" />
        <text x={cx} y={cy + 46} fill={C.inkSoft} style={{ font: `400 34px ${FONT.big}` }} opacity={on(f, since, 8)}>1928</text>
        <path d={curve(span(f, since + 6, grew + 20))} fill="none" stroke={C.cashD} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" />
        <Tag x={cx + cw * 0.55} y={cy - ch * 0.72} text={f >= dividends43 ? 'S&P 500, DIVIDENDS PUT BACK IN' : 'S&P 500'} size={34} o={on(f, c('s43:sp'), 8)} point="none" />
        <Tag x={cx + cw * 0.55} y={cy - ch * 0.56} text={f >= c('s43:inflation') ? 'ABOUT 10% A YEAR BEFORE INFLATION' : 'ABOUT 10% A YEAR'} size={36} o={on(f, ten, 8)} point="none" color={C.sun} />
        <Tag x={cx + cw * 0.55} y={cy - ch * 0.4} text="CLOSE TO 7% AFTER" size={36} o={on(f, seven43, 8)} point="none" color={C.cash} ink="#fff" />
        <path d={`M${cx} ${cy - 20} Q ${cx + cw * 0.7} ${cy - 40} ${cx + cw} ${cy - ch * 0.42}`} fill="none" stroke={C.amber} strokeWidth={8} strokeDasharray="22 14" opacity={on(f, careful, 10)} pathLength={1000} />
        <Tag x={cx + cw * 0.3} y={cy - 110} text={f >= c('s44:inflation') ? 'LEO: 5% A YEAR AFTER INFLATION' : 'LEO: 5% A YEAR'} size={36} o={on(f, five44, 8)} point="down" color={C.amber} />
        <Tag x={cx + cw * 0.3} y={cy - ch + 10} text={f >= c("s44:today's") ? "EVERY NUMBER IN TODAY'S DOLLARS" : 'EVERY NUMBER FROM HERE'} size={34} o={on(f, today, 8)} point="none" />
      </g>}

      {/* # D) everything goes back in */}
      {D > 0 && <g opacity={D}>
        <Park f={f} />
        <MoneyTree x={960} y={G} g={0.35} f={f} s={1} />
        {Array.from({ length: 6 }, (_, k) => { const at = lerp(earns, earning, k / 5), t = span(f, at, at + 22), sx = 880 + (k % 3) * 80, x = t < 0.5 ? sx : lerp(sx, 960, (t - 0.5) * 2), y = t < 0.5 ? lerp(G - 380, G - 20, t * 2) : G - 20
          return f >= at && t < 1 ? <Coin key={k} x={x} y={y} s={0.7} o={1 - span(f, at + 18, at + 22)} /> : null })}
        <path d={`M760 ${G + 20} Q960 ${G + 70} 1160 ${G + 20}`} stroke={C.gold} strokeWidth={10} fill="none" opacity={on(f, straight, 8)} strokeDasharray="16 12" />
        <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [spend45, 'crossNoA', 'smiling'], [straight, 'point', 'smiling']]} x={420} y={G} s={0.92} />
        <Tag x={1420} y={G - 480} text="DIVIDENDS" size={38} o={on(f, dividend45, 8)} point="none" />
        <Tag x={1420} y={G - 400} text="GAINS" size={38} o={on(f, gain45, 8)} point="none" />
        <Tag x={1420} y={G - 300} text="STRAIGHT BACK IN" size={42} o={on(f, straight, 8)} point="none" color={C.cash} ink="#fff" />
        <Tag x={960} y={G + 70} text="EARNINGS START EARNING" size={36} o={on(f, earning - 4, 8)} point="none" color={C.sun} />
      </g>}

      {/* # E) the 2008 storm; Leo keeps going */}
      {E > 0 && <g opacity={E}>
        <Park f={f} sky={f < low + 20 ? 'storm' : 'day'} />
        {f >= smooth - 4 && f < low + 20 && Array.from({ length: 60 }, (_, k) => { const x = rnd(k) * 1920, y = ((rnd(k + 3) * 1080 + f * 22) % 1180) - 100; return <line key={k} x1={x} y1={y} x2={x - 10} y2={y + 36} stroke="#DCE4F2" strokeWidth={3} opacity={0.5 * (1 - span(f, low, low + 20))} /> })}
        <MoneyTree x={760} y={G} g={0.4} f={f} s={1} storm={1 - span(f, low, low + 30)} />
        <g opacity={win(f, in46 - 4, keeps, 8)} transform={`translate(1400 ${G})`}>
          <rect x={-80} y={-420} width={160} height={420} fill="#C9CED8" opacity={0.6} /><rect x={-80} y={-420 * (1 - 0.3655 * on(f, fell, 18))} width={160} height={420 * (1 - 0.3655 * on(f, fell, 18))} fill={C.red} />
          <Tag x={0} y={-460} text={f >= fell ? '2008: DOWN MORE THAN A THIRD' : 'S&P 500 IN 2008'} size={36} o={on(f, c('s46:sp'), 8)} color={C.red} ink="#fff" />
        </g>
        <Person f={f} who="investor" beats={[[0, 'nervous', 'worried'], [keeps, 'push', 'smiling'], [buys, 'thumbsUp', 'smiling']]} x={1260} y={G} s={0.92} o={on(f, c('s47:leo') - 4, 8)} flip />
        {[0, 1, 2].map((k) => { const at = month47 + k * 14, t = span(f, at, at + 16); return f >= at && t < 1 ? <Coin key={k} x={lerp(1180, 860, t)} y={lerp(G - 340, G - 300, t) - 100 * Math.sin(Math.PI * t)} s={0.7} /> : null })}
        <g opacity={on(f, twelve - 4, 8)} transform={`translate(1560 ${G - 480})`}>
          <Envelope x={0} y={0} s={0.7} text="$1,250" />
          {Array.from({ length: f >= buys ? 6 : 3 }, (_, k) => <g key={k} opacity={k < 3 ? 1 : on(f, buys + (k - 3) * 4, 6)}><MiniCo x={-100 + k * 40} y={110} k={k} o={1} /></g>)}
          <Tag x={0} y={170} text="BUYS MORE WHEN PRICES ARE LOW" size={30} o={on(f, buys, 8)} point="none" color={C.cash} ink="#fff" />
        </g>
      </g>}

      {/* # F) the decades and the second paycheck */}
      {F > 0 && <g opacity={F}>
        <Park f={f} sky={f < thirty ? 'day' : 'gold'} />
        <g opacity={1 - on(f, jumps - 6, 10)}>
          <MoneyTree x={600} y={G} g={stage} f={f} s={0.82} />
          <Tag x={600} y={G + 60} text={pileLabel} size={40 * (1 + 0.1 * pop(f, c('s49:pile'), 12))} o={on(f, ten49, 8)} point="none" />
          <g opacity={on(f, peek - 4, 8)} transform={`translate(1360 ${G - 380}) scale(${lerp(0.7, 1.4, (stage - 0.25) / 0.75) * (1 + 0.05 * pop(f, seven49, 12) + 0.05 * pop(f, twenty50b, 12) + 0.05 * pop(f, forty51, 12))})`}><Envelope x={0} y={0} text={f >= four48 && (f < ten49 || f >= c('s49:four')) ? '4%' : '$'} color={C.cashL} /></g>
          <g transform={`translate(1360 ${G - 120}) scale(${1 + 0.1 * pop(f, c('s49:year'), 12)}) translate(-1360 ${-(G - 120)})`}><Tag x={1360} y={G - 120} text={payLabel} size={50} o={on(f, seven49, 8)} point="none" color={C.sun} /></g>
          <Tag x={1360} y={G - 40} text="HIS SECOND PAYCHECK" size={34} o={on(f, second48, 8)} point="none" />
        </g>
        <g opacity={on(f, jumps - 6, 10)}>
          {[[seven52, 7.5, '$7,500'], [twenty52, 20, '$20,000'], [forty52, 40, '$40,000']].map(([at, v, t], k) => { const h = (v as number) * 11 * on(f, at as number, 14), x = 560 + k * 400
            return <g key={k} opacity={on(f, (at as number) - 4, 6)}><rect x={x - 90} y={G - h} width={180} height={h} rx={10} fill={C.cash} /><rect x={x - 90} y={G - h} width={40} height={h} fill="#fff" opacity={0.15} />
              <Tag x={x} y={G - h - 50} text={t as string} size={40} /><text x={x} y={G + 60} textAnchor="middle" fill={C.ink} style={{ font: `400 38px ${FONT.big}` }}>{['YEAR 10', 'YEAR 20', 'YEAR 30'][k]}</text></g> })}
          {[0, 1].map((k) => <path key={k} d={`M${680 + k * 400} ${G - 200 - k * 160} l40 -40 l40 40`} stroke={C.cashD} strokeWidth={12} fill="none" strokeLinecap="round" opacity={on(f, c('s52:more') + k * 6, 6)} />)}
          <Tag x={1500} y={G - 560} text="EACH DECADE ADDS MORE" size={40} o={on(f, decade, 8)} color={C.cash} ink="#fff" />
          <Tag x={760} y={G - 600} text="INVESTING COMES FIRST" size={44} o={on(f, why, 8)} color={C.sun} />
        </g>
      </g>}

      <Headline f={f} lines={[[growing, 'STEP 4: GROW THE PILE FIRST', C.ink, 100], [broad, 'A BROAD MIX OF STOCKS', C.ink, 104], [since, 'THE RECORD SINCE 1928', C.ink, 104], [careful, 'LEO STAYS CAREFUL: 5%', C.ink, 100],
        [earns, 'EVERYTHING GOES BACK IN', C.ink, 100], [road, "THE ROAD WON'T BE SMOOTH", C.cream, 100], [keeps, 'LEO KEEPS INVESTING', C.ink, 104], [peek, 'HIS SECOND PAYCHECK', C.ink, 104],
        [jumps, 'LOOK AT THE JUMPS', C.ink, 104], [growth53, 'GROWTH ON TOP OF GROWTH', C.ink, 100]]} />
      <Grain />
    </g>
  )
}

const BEATS = ["s46:sp", "s49:pile", "s43:inflation", "s52:more", "s47:leo", "s49:four", "s49:year", "s40:pile", "s40:anything", "s44:inflation", "s44:today's", "s43:sp", "s44:every", "s46:smooth", "s46:in", "s47:month", "s48:second", "s48:four", 's40:growing', 's41:early', 's41:small', 's41:income', 's41:tiny', 's41:growth', 's42:broad', 's42:stocks', 's42:hundreds', 's42:companies', 's42:once', 's43:since', 's43:dividends', 's43:grew', 's43:ten', 's43:seven', 's43:after',
  's44:careful', 's44:five', 's45:earns', 's45:spend', 's45:dividend', 's45:gain', 's45:straight', 's45:earning', 's46:road', 's46:fell', 's46:third', 's47:low', 's47:twelve', 's47:buys',
  's48:peek', 's49:ten', 's49:ninety', 's49:seven', 's50:twenty', 's50:five', 's50:twenty#2', 's51:thirty', 's51:million', 's51:forty', 's52:jumps', 's52:seven', 's52:twenty', 's52:forty', 's52:decade', 's53:growth', 's53:why', 's53:first']
export const FF_GROW = makePiece('ff-grow', 'Freedom step four: a city park, Leo plants a small money tree (LEO\'S PILE: SMALL), one tiny coin (TINY INCOME), an up arrow (GROWTH MATTERS NOW); a crate of 60 tiny company buildings, Leo drops coins in (HUNDREDS OF BIG COMPANIES, A BROAD MIX OF STOCKS); a jagged line since 1928 (ABOUT 10% A YEAR BEFORE INFLATION, CLOSE TO 7% AFTER) and a careful dashed line (LEO: 5% A YEAR AFTER INFLATION, ALL IN TODAY\'S DOLLARS); coins fall and roll back into the roots (STRAIGHT BACK IN, EARNINGS START EARNING); a 2008 storm, a red bar drops a third, Leo keeps feeding the tree and $1,250 buys six pieces instead of three; the tree grows by decade with a 4% envelope $7,500 / $20,000 / $40,000 A YEAR; three bars (EACH DECADE ADDS MORE, INVESTING COMES FIRST)', {
  mood: 'light', Component: Grow, beats: BEATS,
  sfx: [['s41:tiny', 'softpop', 0.12], ['s42:hundreds', 'pop', 0.12], ['s43:ten', 'pop', 0.12], ['s45:straight', 'coin', 0.15], ['s46:fell', 'thud', 0.18], ['s47:buys', 'coin', 0.15], ['s49:seven', 'ding', 0.15], ['s50:twenty#2', 'ding', 0.15], ['s51:forty', 'ding', 0.15], ['s53:first', 'chime', 0.15]] })
