// ---------------------------------------------------------------- s17–s24: step two, how a share pays you (inside the bakery, by the counter).
// A) You hold your $100 share; two wooden signposts WAY 1 / WAY 2; with two shops the till fills to $20,000 a year.
// B) The $20,000 pile splits in half: $10,000 goes to the owners, ÷ 1,000 shares → one $10 coin slides across the
//    counter to you: a DIVIDEND.
// C) Way two: the profit bar doubles; a buyer walks in and offers more; the price tag on your share climbs 100 → 150;
//    he hands you $150 and takes the share; the tally: paid 100, +10, sold 150 → +$60 = 60%.
// D) A rival bakery opens next door; Rosa's profit bar shrinks red, your dividend coin shrinks, the tag drops to $70.
//    A young startup shop keeps all its coins inside and grows taller — NO DIVIDEND, only way two.
//    Last: a balance with a green WINS arrow and a red LOSSES arrow.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { BB, Bakery, Coin, Label, M, Share } from './kit'

const G = 940

// # the bakery interior: back wall with bread shelves, a counter, warm lights
const Interior: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <rect x={-100} y={-100} width={2200} height={1300} fill="#F3DFC0" />
    {Array.from({ length: 20 }, (_, k) => <rect key={k} x={k * 100} y={0} width={4} height={G} fill="#E8CFA8" />)}
    {[260, 420].map((y) => <g key={y}><rect x={120} y={y} width={1680} height={18} fill={M.woodD} />
      {Array.from({ length: 16 }, (_, k) => <ellipse key={k} cx={180 + k * 104} cy={y - 26} rx={40} ry={22} fill={k % 3 ? M.bread : M.breadD} />)}</g>)}
    {[480, 960, 1440].map((x) => <g key={x}><line x1={x} y1={0} x2={x} y2={110} stroke="#3B3A40" strokeWidth={4} /><circle cx={x} cy={130} r={26} fill={M.lamp} /><circle cx={x} cy={130} r={70 + 4 * Math.sin(f / 20)} fill={M.lamp} opacity={0.18} /></g>)}
    <rect x={-100} y={G} width={2200} height={300} fill="#B98E62" />
    <rect x={600} y={G - 260} width={1320} height={260} fill={M.wood} /><rect x={580} y={G - 280} width={1360} height={30} rx={8} fill={M.woodD} />
  </g>
)
const Post: React.FC<{ x: number; y: number; o?: number; text: string; lit?: number }> = ({ x, y, o = 1, text, lit = 0 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}><rect x={-10} y={-300} width={20} height={300} fill={M.woodD} />
    <path d="M-120 -300 L110 -300 L150 -260 L110 -220 L-120 -220 Z" fill={lit > 0.5 ? M.butter : M.paper} stroke={M.woodD} strokeWidth={5} />
    <text x={-5} y={-245} textAnchor="middle" fill={M.ink} style={BB(52)}>{text}</text></g>
)
const Bar: React.FC<{ x: number; y: number; h: number; color: string; label?: string; o?: number }> = ({ x, y, h, color, label, o = 1 }) => (
  <g opacity={o}><rect x={x - 60} y={y - h} width={120} height={h} rx={12} fill={color} />{label && <text x={x} y={y - h - 20} textAnchor="middle" fill={M.ink} style={BB(46)}>{label}</text>}</g>
)

const Pays: React.FC<PieceProps> = ({ f, c }) => {
  const bought17 = c('s17:bought'), d100 = c('s17:100'), money17 = c('s17:money'), two17 = c('s17:two'), ways17 = c('s17:ways')
  const one18 = c('s18:one'), profits18 = c('s18:profits'), paid18 = c('s18:paid'), shops18 = c('s18:shops'), k20 = c('s18:20000')
  const owners19 = c('s19:owners'), split19 = c('s19:split'), k1000 = c('s19:1000'), d10 = c('s19:10'), each19 = c('s19:each'), dividend19 = c('s19:dividend')
  const two20 = c('s20:two'), valuable20 = c('s20:valuable'), earns20 = c('s20:earns'), twice20 = c('s20:twice'), worth20 = c('s20:worth'), people20 = c('s20:people'), willing20 = c('s20:willing'), piece20 = c('s20:piece')
  const buys21 = c('s21:buys'), d150 = c('s21:150'), paid21 = c('s21:paid'), collected21 = c('s21:collected'), sold21 = c('s21:sold'), d60 = c('s21:60'), gain21 = c('s21:gain'), pct21 = c('s21:60#2')
  const other22 = c('s22:other'), opens22 = c('s22:opens'), door22 = c('s22:door'), fall22 = c('s22:fall'), shrink22 = c('s22:shrink'), buyers22 = c('s22:buyers'), d70 = c('s22:70')
  const every23 = c('s23:every'), younger23 = c('s23:younger'), keep23 = c('s23:keep'), grow23 = c('s23:grow'), rely23 = c('s23:rely'), two23 = c('s23:two')
  const deal24 = c('s24:deal'), wins24 = c('s24:wins'), losses24 = c('s24:losses')

  const AB = owners19 - 6, BC = two20 - 4, CD = other22 - 4
  const A = win(f, 0, AB), B = win(f, AB - 8, BC), Cc = win(f, BC - 8, CD), D = on(f, CD - 8, 10)

  const aBeats: Beat[] = [[0, 'holdUp', 'smiling'], [two17, 'countA', 'thinking', 'countB', 14], [one18, 'countOne', 'smiling'], [k20, 'celebrate', 'smiling']]
  const bBeats: Beat[] = [[AB, 'idle', 'smiling'], [split19, 'explain', 'neutral'], [d10, 'receive', 'smiling'], [dividend19, 'thumbsUp', 'smiling']]
  const cBeats: Beat[] = [[BC, 'hold', 'smiling'], [twice20, 'pointUp', 'smiling'], [piece20, 'holdUp', 'smiling'], [buys21, 'offer', 'smiling'], [d60, 'fistPump', 'smiling']]
  const buyerBeats: Beat[] = [[BC, 'idle', 'neutral'], [willing20, 'talk', 'smiling'], [buys21, 'offer', 'smiling'], [sold21, 'receive', 'smiling']]
  const dBeats: Beat[] = [[CD, 'idle', 'neutral'], [fall22, 'shock', 'worried'], [d70, 'despair', 'worried'], [every23, 'think', 'thinking'], [rely23, 'point', 'neutral'], [wins24, 'celebrate', 'smiling'], [losses24, 'facepalm', 'worried']]
  const tagV = Math.round(lerp(100, 150, span(f, worth20, d150)))
  const hand = span(f, buys21 + 6, buys21 + 30)

  return (
    <g>
      <Interior f={f} />
      {/* # A) your $100 share; two ways; the till */}
      {A > 0 && <g opacity={A}>
        <Person f={f} who="hero" beats={aBeats} x={330} y={G} s={0.85} />
        <Share x={520} y={480} s={0.75} r={-6} big={f >= d100 ? '$100' : '1 SHARE'} o={on(f, bought17, 10)} />
        <g opacity={on(f, money17, 8)}><Post x={900} y={G - 280} text="WAY 1" o={on(f, two17, 8)} lit={on(f, one18, 6)} /><Post x={1260} y={G - 280} text="WAY 2" o={on(f, ways17, 8)} /></g>
        <g opacity={on(f, profits18, 10)} transform={`translate(1620 ${G - 280})`}>
          <rect x={-120} y={-160} width={240} height={160} rx={16} fill="#6E6A72" /><rect x={-90} y={-140} width={180} height={60} rx={8} fill="#BFE7C9" />
          <text y={-96} textAnchor="middle" fill={M.greenD} style={BB(48)}>{f >= k20 ? '$20,000' : '$'}</text>
          {f >= paid18 && [0, 1, 2].map((k) => { const t = ((f - paid18) / 30 + k / 3) % 1; return <Coin key={k} x={-60 + k * 60} y={-180 - 60 * t} s={0.35} o={1 - t} /> })}
          <g opacity={on(f, shops18, 8)}><text y={60} textAnchor="middle" fill={M.ink} style={BB(40)}>2 SHOPS · A YEAR</text></g>
        </g>
      </g>}

      {/* # B) the dividend */}
      {B > 0 && <g opacity={B}>
        <Person f={f} who="hero" beats={bBeats} x={330} y={G} s={0.85} />
        <g transform={`translate(1100 ${G - 280})`}>
          {/* the $20,000 pile splits */}
          {Array.from({ length: 12 }, (_, k) => { const half = k % 2, dx = half ? lerp(0, 260, on(f, owners19, 14)) : lerp(0, -260, on(f, owners19, 14))
            return <Coin key={k} x={dx + (Math.floor(k / 2) % 3) * 54 - 54} y={-30 - Math.floor(k / 6) * 34} s={0.6} /> })}
          <g opacity={on(f, owners19, 8)}><text x={-260} y={60} textAnchor="middle" fill={M.ink} style={BB(44)}>KEPT · $10,000</text><text x={260} y={60} textAnchor="middle" fill={M.greenD} style={BB(44)}>TO OWNERS · $10,000</text></g>
          <g opacity={on(f, split19, 10)}><Label x={260} y={-200} text={f >= k1000 ? '÷ 1,000 SHARES' : '÷'} size={54} fill={M.ink} ink="#FFFFFF" /></g>
        </g>
        {f >= d10 && (() => { const t = span(f, d10, d10 + 24); return <Coin x={lerp(1360, 560, t)} y={lerp(G - 320, 600, t) - 120 * Math.sin(t * Math.PI)} s={0.9} text="$10" /> })()}
        <g opacity={on(f, each19, 8)}><Label x={560} y={480} text="$10 PER SHARE" size={50} /></g>
        <g opacity={on(f, dividend19, 8)}><Label x={560} y={760} text="A DIVIDEND" size={60} fill={M.greenD} ink="#FFFFFF" /></g>
      </g>}

      {/* # C) way two: the price rises; you sell for $150 */}
      {Cc > 0 && <g opacity={Cc}>
        <Person f={f} who="hero" beats={cBeats} x={330} y={G} s={0.85} />
        <Person f={f} who="buyer" beats={buyerBeats} x={1120} y={G} s={0.85} o={on(f, people20, 10)} />
        <g opacity={on(f, valuable20, 10) * (1 - on(f, buys21, 8))}>
          <Bar x={1560} y={G - 280} h={on(f, earns20, 12) * 120 * (1 + on(f, twice20, 16))} color={M.green} label={f >= twice20 ? 'PROFIT × 2' : 'PROFIT'} />
        </g>
        {/* your share and its price tag */}
        {(() => { const sx = lerp(560, 1000, hand), sy = lerp(470, 470, hand); return <g>
          <Share x={sx} y={sy} s={0.7} r={-6} big="1 SHARE" />
          <g transform={`translate(${sx + 140} ${sy - 110 - 8 * pop(f, worth20, 12)})`}><path d="M-60 -30 L50 -30 L80 0 L50 30 L-60 30 Z" fill={M.brick} /><text x={-4} y={14} textAnchor="middle" fill="#FFFFFF" style={BB(44)}>${f >= worth20 ? tagV : 100}</text></g></g> })()}
        {f >= buys21 + 6 && <Coin x={lerp(1000, 560, hand)} y={lerp(560, 620, hand)} s={0.8} text="$150" />}
        <g opacity={on(f, paid21, 8)} transform="translate(1560 300)">
          <rect x={-200} y={-40} width={400} height={330} rx={20} fill={M.paper} />
          <text x={-170} y={20} fill={M.ink} style={BB(48)}>PAID</text><text x={170} y={20} textAnchor="end" fill={M.red} style={BB(48)}>−$100</text>
          <g opacity={on(f, collected21, 8)}><text x={-170} y={84} fill={M.ink} style={BB(48)}>DIVIDEND</text><text x={170} y={84} textAnchor="end" fill={M.greenD} style={BB(48)}>+$10</text></g>
          <g opacity={on(f, sold21, 8)}><text x={-170} y={148} fill={M.ink} style={BB(48)}>SOLD</text><text x={170} y={148} textAnchor="end" fill={M.greenD} style={BB(48)}>+$150</text></g>
          <g opacity={on(f, d60, 8)}><rect x={-180} y={170} width={360} height={4} fill={M.ink} /><text x={-170} y={236} fill={M.ink} style={BB(54)}>{f >= gain21 ? 'GAIN' : ''}</text><text x={170} y={236} textAnchor="end" fill={M.greenD} style={BB(54)}>{f >= pct21 ? '+$60 = 60%' : '+$60'}</text></g>
        </g>
      </g>}

      {/* # D) the other way; no-dividend companies; wins and losses */}
      {D > 0 && <g opacity={D}>
        <g opacity={1 - on(f, every23, 10)}>
          <Person f={f} who="investorF" beats={dBeats} x={330} y={G} s={0.85} />
          <Bar x={700} y={G - 280} h={240 * (1 - 0.5 * on(f, fall22, 16))} color={f >= fall22 ? M.red : M.green} label="ROSA'S PROFIT" />
          <g opacity={on(f, opens22, 12)} transform={`translate(${lerp(2200, 1500, on(f, opens22, 20))} 0)`}><Bakery x={0} y={G - 280} s={0.7} f={f} sign="NEW BAKERY" awning="#7C6BAA" /></g>
          <g opacity={on(f, door22, 8) * (1 - on(f, fall22, 8))}><Label x={1500} y={G - 230} text="NEXT DOOR" size={44} /></g>
          <Coin x={1000} y={520} s={0.9 * (1 - 0.45 * on(f, shrink22, 14))} text="$10" o={on(f, shrink22 - 8, 8)} />
          <g opacity={on(f, buyers22, 8)} transform={`translate(1050 ${700 + 30 * on(f, d70, 12)})`}><path d="M-60 -30 L50 -30 L80 0 L50 30 L-60 30 Z" fill={M.red} /><text x={-4} y={14} textAnchor="middle" fill="#FFFFFF" style={BB(44)}>{f >= d70 ? '$70' : '$100'}</text></g>
        </g>
        <g opacity={on(f, every23, 10) * (1 - on(f, deal24, 10))}>
          <Person f={f} who="investorF" beats={dBeats} x={330} y={G} s={0.85} />
          <g transform={`translate(1100 ${G - 280})`} opacity={on(f, younger23, 10)}>
            <rect x={-140} y={-(220 + 160 * on(f, grow23, 24))} width={280} height={220 + 160 * on(f, grow23, 24)} fill="#BFD8E8" /><rect x={-150} y={-(240 + 160 * on(f, grow23, 24))} width={300} height={30} fill="#5A7BA0" />
            <text y={-(250 + 160 * on(f, grow23, 24)) - 20} textAnchor="middle" fill={M.ink} style={BB(46)}>YOUNG COMPANY</text>
            {f >= keep23 && Array.from({ length: 6 }, (_, k) => <circle key={k} cx={-80 + (k % 3) * 80} cy={-60 - Math.floor(k / 3) * 60} r={20} fill={M.gold} />)}</g>
          <g opacity={on(f, keep23, 8)}><Label x={1100} y={G - 200} text="NO DIVIDEND" size={50} fill={M.ink} ink="#FFFFFF" /></g>
          <g opacity={on(f, rely23, 8)}><Post x={1560} y={G - 280} text="WAY 2" lit={on(f, two23, 6)} /></g>
        </g>
        <g opacity={on(f, deal24, 10)} transform="translate(960 0)">
          <rect x={-12} y={G - 680} width={24} height={400} fill={M.woodD} /><path d="M-120 -280 L120 -280 L80 -320 L-80 -320 Z" transform={`translate(0 ${G})`} fill={M.woodD} />
          <g transform={`rotate(${3 * Math.sin(f / 16)} 0 ${G - 680})`}><rect x={-380} y={G - 690} width={760} height={18} rx={9} fill={M.wood} />
            <g transform={`translate(-340 ${G - 670})`} opacity={on(f, wins24, 10)}><path d="M0 0 L0 100" stroke={M.woodD} strokeWidth={4} /><path d="M-30 210 L0 150 L30 210 Z M-12 210 L12 210 L12 260 L-12 260 Z" fill={M.green} transform="translate(0 -40)" /><text y={260} textAnchor="middle" fill={M.greenD} style={BB(54)}>WINS</text></g>
            <g transform={`translate(340 ${G - 670})`} opacity={on(f, losses24, 10)}><path d="M0 0 L0 100" stroke={M.woodD} strokeWidth={4} /><path d="M-30 170 L0 230 L30 170 Z M-12 170 L12 170 L12 120 L-12 120 Z" fill={M.red} /><text y={300} textAnchor="middle" fill={M.redD} style={BB(54)}>LOSSES</text></g>
          </g>
        </g>
      </g>}

      <Headline f={f} lines={[[bought17, 'YOUR $100 SHARE', M.ink, 100], [two17, 'TWO WAYS IT PAYS', M.ink, 100], [dividend19, 'WAY 1: A DIVIDEND', M.greenD, 100], [two20, 'WAY 2: A HIGHER PRICE', M.ink, 100], [other22, 'IT WORKS BOTH WAYS', M.red, 100], [younger23, 'SOME PAY NO DIVIDEND', M.ink, 100], [deal24, 'WINS AND LOSSES', M.ink, 100]]} />
    </g>
  )
}

export const MK_PAYS = makePiece('mk-pays', 'Step two, how a share pays: inside the bakery by the counter you hold your $100 share, two wooden signposts WAY 1 / WAY 2, the till fills to $20,000 a year with two shops; the coin pile splits in half, $10,000 to owners ÷ 1,000 shares, one $10 coin slides to you (a dividend); the profit bar doubles, a buyer walks in, the price tag climbs 100 → 150, he hands you $150 and takes the share, a tally: −$100, +$10, +$150 = +$60 = 60%; a NEW BAKERY opens next door, Rosa\'s profit bar shrinks red, the dividend coin shrinks, the tag drops to $70; a young company keeps its coins and grows taller (no dividend, way 2 only); a balance with a green WINS arrow and a red LOSSES arrow', {
  mood: 'light', Component: Pays,
  beats: ["s17:bought", "s17:100", "s17:money", "s17:two", "s17:ways", "s18:one", "s18:profits", "s18:paid", "s18:shops", "s18:20000", "s19:owners", "s19:split", "s19:1000", "s19:10", "s19:each", "s19:dividend", "s20:two", "s20:valuable", "s20:earns", "s20:twice", "s20:worth", "s20:people", "s20:willing", "s20:piece", "s21:buys", "s21:150", "s21:paid", "s21:collected", "s21:sold", "s21:60", "s21:gain", "s21:60#2", "s22:other", "s22:opens", "s22:door", "s22:fall", "s22:shrink", "s22:buyers", "s22:70", "s23:every", "s23:younger", "s23:keep", "s23:grow", "s23:rely", "s23:two", "s24:deal", "s24:wins", "s24:losses"],
  sfx: [['s18:20000', 'cash', 0.12], ['s19:10', 'coin', 0.14], ['s21:150', 'coin', 0.12], ['s22:fall', 'thud', 0.12], ['s24:losses', 'thud', 0.1]] })
