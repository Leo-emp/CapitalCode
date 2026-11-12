// ---------------------------------------------------------------- s43–s49: step five, what the news means by "the market" (evening, the town scoreboard).
// A) A TV in a shop window: MARKET −2% in red; dozens of company buildings slide into a list board; arrows from the list
//    pour into one big scoreboard number.
// B) The S&P 500: a skyline of 500 buildings, a few giants and many small ones; a bar of the whole US market fills to
//    more than 80 %; the tallest giant rises 1 % and the scoreboard needle swings far; a tiny one rises 1 %, it barely moves.
// C) The two-company index: Rosa's bakery ($150,000) and a supermarket chain ($1.35 million) on a scoreboard of
//    $1.5 million; supermarket +10 % → index +9 %; bakery +10 % → index +1 %.
// D) An index fund: a wicker basket that holds a tiny copy of every building; you lift it.
import React from 'react'
import { lerp, on, pop, rnd, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { BB, Bakery, Label, M, Town } from './kit'

const G = 940
// # 500 buildings: heights from a steep power law (few giants, many small) — a drawing, not data
const SKY = Array.from({ length: 500 }, (_, k) => ({ x: 120 + (k % 125) * 13.5 + Math.floor(k / 125) * 4, row: Math.floor(k / 125), h: 18 + 300 / Math.pow(1 + (k * 7919) % 500, 0.62) + rnd(k) * 10, c: ['#C9A68A', '#B98F73', '#D6B596', '#A98A70'][k % 4] }))

const Super: React.FC<{ x: number; y: number; s?: number; o?: number; glow?: number }> = ({ x, y, s = 1, o = 1, glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {glow > 0 && <ellipse cy={-200} rx={460} ry={260} fill={M.butter} opacity={0.22 * glow} />}
    <rect x={-400} y={-320} width={800} height={320} fill="#E7EEF2" /><rect x={-420} y={-360} width={840} height={60} rx={8} fill={M.teal} />
    <text y={-316} textAnchor="middle" fill="#FFFFFF" style={BB(52)}>SUPERMARKET CHAIN</text>
    {Array.from({ length: 6 }, (_, k) => <rect key={k} x={-370 + k * 125} y={-260} width={100} height={140} rx={6} fill="#BFE0EA" />)}
    <rect x={-80} y={-110} width={160} height={110} fill="#9DB7C2" />
  </g>
)
const Board: React.FC<{ x: number; y: number; text: string; sub?: string; o?: number; color?: string }> = ({ x, y, text, sub, o = 1, color = M.butter }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}><rect x={-240} y={-90} width={480} height={180} rx={20} fill="#22252E" /><rect x={-224} y={-74} width={448} height={148} rx={14} fill="#11131A" />
    <text y={sub ? 10 : 30} textAnchor="middle" fill={color} style={BB(84)}>{text}</text>{sub && <text y={60} textAnchor="middle" fill="#C9CED6" style={BB(36)}>{sub}</text>}</g>
)

const Index: React.FC<PieceProps> = ({ f, c }) => {
  const market43 = c('s43:market'), fell43 = c('s43:fell'), today43 = c('s43:today'), shares43 = c('s43:shares'), mean43 = c('s43:mean'), index43 = c('s43:index')
  const list44 = c('s44:list'), companies44 = c('s44:companies'), combined44 = c('s44:combined'), number44 = c('s44:number'), group44 = c('s44:group')
  const n500b = c('s45:500#2'), two47 = c('s47:two'), rosas47 = c("s47:rosa's"), ten48 = c('s48:10'), index48 = c('s48:index'), ten48b = c('s48:10#2'), index48b = c('s48:index#2'), watched45 = c('s45:watched'), sp45 = c('s45:sp'), largest45 = c('s45:largest'), together45 = c('s45:together'), p80 = c('s45:80'), market45 = c('s45:market')
  const bigger46 = c('s46:bigger'), giant46 = c('s46:giant'), rises46 = c('s46:rises'), moves46 = c('s46:moves'), far46 = c('s46:far'), small46 = c('s46:small'), rising46 = c('s46:rising')
  const tiny47 = c('s47:tiny'), imagine47 = c('s47:imagine'), bakery47 = c('s47:bakery'), k150 = c('s47:150000'), supermarket47 = c('s47:supermarket'), million47 = c('s47:million'), together47 = c('s47:together'), million47b = c('s47:million#2')
  const supermarket48 = c('s48:supermarket'), n9 = c('s48:9'), only48 = c('s48:only'), bakery48 = c('s48:bakery'), just48 = c('s48:just')
  const own49 = c('s49:own'), list49 = c('s49:list'), fund49 = c('s49:fund'), buys49 = c('s49:buys'), every49 = c('s49:every')

  const AB = watched45 - 6, BC = tiny47 - 6, CD = own49 - 6
  const A = win(f, 0, AB), B = win(f, AB - 8, BC), Cc = win(f, BC - 8, CD), D = on(f, CD - 8, 10)

  const sky = span(f, sp45, largest45 + 20)
  const giantUp = on(f, rises46, 14), smallUp = on(f, rising46, 14)
  const needle = lerp(-60, -60 + 70 * giantUp * (1 - on(f, small46, 10)) + 8 * smallUp, 1)
  const idx = f >= just48 ? '+1%' : f >= only48 ? '…' : f >= n9 ? '+9%' : f >= together47 ? (f >= million47b ? '$1.5M' : '$1.5…') : ''
  const dBeats: Beat[] = [[CD, 'present', 'smiling'], [fund49, 'holdUp', 'smiling'], [every49, 'thumbsUp', 'smiling']]

  return (
    <g>
      <Town id="mk-i-base" f={f} mood="evening" />
      {/* # A) "the market fell 2%": a list of companies becomes one number */}
      {A > 0 && <g opacity={A}>
        <Town id="mk-i-a" f={f} mood="evening" />
        <g opacity={1 - on(f, list44, 10)}>
          <g transform={`translate(560 ${G})`}><rect x={-260} y={-460} width={520} height={460} fill={M.plaster} /><rect x={-200} y={-400} width={400} height={260} rx={14} fill="#22252E" />
            <rect x={-180} y={-380} width={360} height={220} rx={10} fill="#2E3240" /><text y={-290} textAnchor="middle" fill="#FFFFFF" style={BB(48)}>{f >= market43 ? 'MARKET' : 'NEWS'}</text>
            <text y={-210} textAnchor="middle" fill={M.red} style={BB(84)}>{f >= fell43 ? '−2%' : ''}</text><text y={-120} textAnchor="middle" fill={M.ink} style={BB(36)}>{f >= today43 ? 'TODAY' : ''}</text></g>
          <g opacity={on(f, shares43, 10) * (1 - 0.4 * on(f, companies44, 8))}>{Array.from({ length: 8 }, (_, k) => <g key={k} transform={`translate(${1060 + (k % 4) * 200} ${G - (k > 3 ? 300 : 0)})`}><rect x={-70} y={-220 + rnd(k) * 60} width={140} height={220 - rnd(k) * 60} fill={['#C9A68A', '#B98F73', '#D6B596', '#A98A70'][k % 4]} />
            {[0, 1, 2].map((j) => <rect key={j} x={-50 + j * 36} y={-180 + rnd(k) * 60} width={22} height={30} fill="#F3E2C4" />)}</g>)}</g>
          <g opacity={on(f, mean43, 8)} transform="translate(1360 300)"><circle r={60} fill={M.butter} /><text y={34} textAnchor="middle" fill={M.ink} style={BB(96)}>?</text></g>
          <g opacity={on(f, index43, 8)}><Label x={1360} y={G + 60} text="AN INDEX" size={60} fill={M.ink} ink="#FFFFFF" /></g>
        </g>
        <g opacity={on(f, list44, 10)}>
          <g transform="translate(560 540)"><rect x={-260} y={-330} width={520} height={660} rx={20} fill={M.paper} stroke={M.woodD} strokeWidth={8} />
            <text y={-270} textAnchor="middle" fill={M.ink} style={BB(52)}>THE LIST</text>
            {Array.from({ length: 8 }, (_, k) => <g key={k} opacity={span(f, list44 + k * 3, list44 + k * 3 + 8)}><rect x={-220} y={-230 + k * 66} width={440} height={50} rx={10} fill={k % 2 ? '#F1E5D0' : '#E8D9BF'} />
              <rect x={-205} y={-222 + k * 66} width={34} height={34} rx={4} fill={['#C9A68A', '#B98F73', '#D6B596', '#A98A70'][k % 4]} /><rect x={-155} y={-212 + k * 66} width={200 - rnd(k) * 80} height={14} rx={7} fill={M.stoneD} /></g>)}</g>
          {/* arrows pour into one number */}
          <g opacity={on(f, combined44, 10)}>{[0, 1, 2].map((k) => <path key={k} d={`M 830 ${400 + k * 140} Q 1100 ${420 + k * 70} 1300 520`} fill="none" stroke={M.ink2} strokeWidth={7} strokeDasharray="14 10" />)}</g>
          <Board x={1500} y={520} text={f >= number44 ? '5,417' : ''} sub={f >= group44 ? 'THE WHOLE GROUP' : ''} o={on(f, combined44 + 4, 10)} />
        </g>
      </g>}

      {/* # B) the S&P 500 skyline; bigger companies count more */}
      {B > 0 && <g opacity={B}>
        <Town id="mk-i-b" f={f} mood="evening" roofs={false} />
        <g opacity={on(f, sp45, 10)}>
          {SKY.map((b, k) => { const show = sky * 500 > k, isGiant = k === 0, isSmall = k === 333
            const h = b.h * (isGiant ? 1 + 0.12 * giantUp : 1) * (isSmall ? 1 + 0.6 * smallUp : 1)
            return show ? <rect key={k} x={b.x} y={G - 60 * b.row - h} width={12} height={h} fill={isGiant && f >= giant46 ? M.butterD : isSmall && f >= small46 ? M.teal : b.c} /> : null })}
          <g opacity={on(f, n500b, 8)}><Label x={960} y={G + 60} text={f >= largest45 ? '≈ 500 LARGE US COMPANIES' : '≈ 500'} size={52} fill={M.ink} ink="#FFFFFF" /></g>
        </g>
        {/* more than 80% of the whole US market */}
        <g opacity={win(f, together45, bigger46, 8)} transform="translate(960 300)"><rect x={-500} y={-40} width={1000} height={80} rx={20} fill="#E8DCC8" stroke={M.woodD} strokeWidth={4} />
          <rect x={-496} y={-36} width={992 * 0.83 * on(f, p80, 20)} height={72} rx={18} fill={M.tealD} /><text x={-470} y={16} fill="#FFFFFF" style={BB(48)}>{f >= p80 ? 'MORE THAN 80% OF THE US MARKET' : ''}</text>
          <g opacity={on(f, market45, 8)}><text x={500} y={-60} textAnchor="end" fill={M.ink} style={BB(40)}>WHOLE US STOCK MARKET</text></g></g>
        {/* the needle */}
        <g opacity={on(f, bigger46, 10)} transform="translate(1600 330)"><rect x={-180} y={-120} width={360} height={200} rx={20} fill="#22252E" /><path d="M-140 40 A140 140 0 0 1 140 40" fill="none" stroke="#5A6070" strokeWidth={10} />
          <line x1={0} y1={40} x2={0} y2={-80} stroke={M.butter} strokeWidth={8} strokeLinecap="round" transform={`rotate(${needle} 0 40)`} /><text y={100} textAnchor="middle" fill={M.ink} style={BB(40)}>THE INDEX</text></g>
        <g opacity={win(f, giant46, small46, 8)}><Label x={SKY[0].x + 6} y={G - SKY[0].h - 80} text="GIANT +1%" size={44} fill={M.butterD} ink="#FFFFFF" /></g>
        <g opacity={on(f, far46, 8) * (1 - on(f, small46, 8))}><Label x={1600} y={500} text="MOVES IT A LOT" size={44} /></g>
        <g opacity={on(f, small46, 8)}><Label x={SKY[333].x} y={G - 60 * SKY[333].row - SKY[333].h * 1.6 - 60} text="SMALL +1%" size={44} fill={M.teal} ink="#FFFFFF" /><Label x={1600} y={500} text="BARELY MOVES" size={44} /></g>
        <g opacity={win(f, moves46, small46, 6) * (0.5 + 0.5 * Math.sin(f / 4))}><circle cx={1600} cy={330} r={200} fill='none' stroke={M.butter} strokeWidth={8} /></g>
      </g>}

      {/* # C) the two-company index */}
      {Cc > 0 && <g opacity={Cc}>
        <Town id="mk-i-c" f={f} mood="evening" />
        <g opacity={win(f, two47, rosas47 + 6, 6)}><rect x={240} y={G - 260} width={360} height={260} fill="none" stroke={M.paper} strokeWidth={6} strokeDasharray="18 12" /><rect x={940} y={G - 330} width={720} height={330} fill="none" stroke={M.paper} strokeWidth={6} strokeDasharray="18 12" /></g>
        <Bakery x={420} y={G - 10 * on(f, bakery48, 10)} s={0.55 * (1 + 0.1 * on(f, bakery48, 14))} f={f} o={on(f, rosas47, 10)} glow={on(f, bakery48, 10)} />
        <g opacity={on(f, k150, 8)}><Label x={420} y={G + 60} text={f >= ten48b ? '$150,000 +10%' : '$150,000'} size={50} /></g>
        <Super x={1300} y={G} s={0.9 * (1 + 0.1 * on(f, supermarket48, 14) * (1 - on(f, only48, 10)))} o={on(f, supermarket47, 10)} glow={on(f, supermarket48, 10) * (1 - on(f, only48, 10))} />
        <g opacity={on(f, million47, 8)}><Label x={1300} y={G + 60} text={f >= ten48 && f < only48 ? '$1.35 MILLION +10%' : '$1.35 MILLION'} size={50} /></g>
        <g opacity={(win(f, index48, n9 + 8, 6) + win(f, index48b, just48 + 8, 6)) * (0.5 + 0.5 * Math.sin(f / 4))}><rect x={600} y={190} width={520} height={220} rx={26} fill="none" stroke={M.butter} strokeWidth={8} /></g>
        <Board x={860} y={300} text={idx} sub={f >= together47 ? (f >= n9 ? 'THE INDEX' : 'INDEX TOTAL') : ''} o={on(f, together47 - 6, 10)} color={f >= n9 ? M.green : M.butter} />
      </g>}

      {/* # D) the index fund basket */}
      {D > 0 && <g opacity={D}>
        <Town id="mk-i-d" f={f} mood="evening" />
        <Person f={f} who="investor" beats={dBeats} x={420} y={G} s={0.85} />
        <g transform={`translate(1150 ${G - 30 * on(f, buys49, 14)})`} opacity={on(f, list49 - 6, 10)}>
          {Array.from({ length: 40 }, (_, k) => <rect key={k} x={-260 + (k % 20) * 26} y={-120 - (Math.floor(k / 20)) * 30 - (rnd(k) * 60) * on(f, every49, 14)} width={20} height={40 + rnd(k) * 60} fill={['#C9A68A', '#B98F73', '#D6B596', '#A98A70', M.teal][k % 5]} opacity={on(f, every49 - 10 + k * 0.5, 6)} />)}
          <path d="M-320 -100 L320 -100 L260 120 L-260 120 Z" fill="#C89A5E" />{[0, 1, 2, 3].map((k) => <rect key={k} x={-300 + k * 10} y={-70 + k * 46} width={600 - k * 20} height={12} fill="#A87C44" />)}
          <path d="M-220 -100 Q0 -360 220 -100" fill="none" stroke="#A87C44" strokeWidth={16} />
          <g opacity={on(f, fund49, 8)}><rect x={-160} y={-40} width={320} height={70} rx={14} fill={M.paper} /><text y={10} textAnchor="middle" fill={M.ink} style={BB(52)}>INDEX FUND</text></g>
        </g>
        <g opacity={on(f, every49, 8)}><Label x={1150} y={G + 60} text="A PIECE OF EVERY COMPANY" size={50} fill={M.ink} ink="#FFFFFF" /></g>
      </g>}

      <Headline f={f} lines={[[market43, '"THE MARKET FELL 2%"', M.ink, 100], [index43, 'MEANS: AN INDEX FELL', M.ink, 100], [watched45, 'THE S&P 500', M.ink, 110], [bigger46, 'BIG COMPANIES COUNT MORE', M.ink, 96], [tiny47, 'A 2-COMPANY INDEX', M.ink, 104], [own49, 'BUY THE WHOLE LIST', M.ink, 104]]} />
    </g>
  )
}

export const MK_INDEX = makePiece('mk-index', 'Step five, what "the market" means: a TV in a shop window shows MARKET −2% TODAY, a row of company buildings and a question mark (an index); the buildings fill a list board and arrows pour into one scoreboard number (the whole group); a skyline of 500 buildings, few giants and many small (≈500 large US companies), a bar of the whole US market fills to more than 80%; the giant rises 1% and the index needle swings far, a tiny one rises 1% and it barely moves; Rosa\'s bakery ($150,000) and a supermarket chain ($1.35 million) with a scoreboard of $1.5M: supermarket +10% → +9%, bakery +10% → +1%; an INDEX FUND wicker basket holding a tiny copy of every company, lifted by you', {
  mood: 'light', Component: Index,
  beats: ["s43:market", "s43:fell", "s43:today", "s43:shares", "s43:mean", "s43:index", "s44:list", "s44:companies", "s44:combined", "s44:number", "s44:group", "s45:500#2", "s47:two", "s47:rosa's", "s48:10", "s48:index", "s48:10#2", "s48:index#2", "s45:watched", "s45:sp", "s45:largest", "s45:together", "s45:80", "s45:market", "s46:bigger", "s46:giant", "s46:rises", "s46:moves", "s46:far", "s46:small", "s46:rising", "s47:tiny", "s47:imagine", "s47:150000", "s47:supermarket", "s47:million", "s47:together", "s47:million#2", "s48:supermarket", "s48:9", "s48:only", "s48:bakery", "s48:just", "s49:own", "s49:list", "s49:fund", "s49:buys", "s49:every"],
  sfx: [['s43:fell', 'thud', 0.1], ['s44:number', 'ding', 0.12], ['s46:rises', 'swish', 0.1], ['s48:9', 'pop', 0.12], ['s49:fund', 'chime', 0.12]] })
