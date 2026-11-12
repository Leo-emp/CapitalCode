// ---------------------------------------------------------------- s34–s42: step four, why prices move (the town square with the news board).
// A) The square: a price sign over the bakery flickers every few seconds; thought bubbles over buyers and sellers show
//    different prices (changing their minds); then a road of coin bags runs to the horizon: the profits of the future.
// B) Market value: the bakery's 1,000-piece grid fills with $150 tags → $150,000; then 20,000 profit bags line up one by
//    one, 7½ of them reach the $150,000 bar: 7½ years of today's profits.
// C) Two buyers: one dreams of 1 shop ($20,000 a year) and stops at $150; the other dreams of 3 shops and bids $180;
//    the price tag jumps to $180.
// D) The news board: PROFITS TO GROW → more buyers walk in, the tag rises; then FLOUR ×2 → owners rush off with their
//    shares, the tag falls — while the profit bar beside it hasn't moved (PROFIT: SAME).
// E) Short run vs long run: a jittery price line on top, a calm rising profit line under it.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { BB, Bakery, Coin, Flour, Folk, Label, M, News, Town } from './kit'

const G = 940

const Tag: React.FC<{ x: number; y: number; text: string; color?: string; s?: number; o?: number }> = ({ x, y, text, color = M.brick, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><path d="M-70 -34 L56 -34 L90 0 L56 34 L-70 34 Z" fill={color} /><circle cx={62} cy={0} r={8} fill={M.paper} /><text x={-8} y={16} textAnchor="middle" fill="#FFFFFF" style={BB(48)}>{text}</text></g>
)
const Bubble: React.FC<{ x: number; y: number; o?: number; children: React.ReactNode; w?: number; h?: number }> = ({ x, y, o = 1, children, w = 300, h = 200 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}><ellipse rx={w / 2} ry={h / 2} fill="#FFFFFF" /><circle cx={-w * 0.2} cy={h / 2 + 30} r={18} fill="#FFFFFF" /><circle cx={-w * 0.28} cy={h / 2 + 62} r={10} fill="#FFFFFF" />{children}</g>
)
const Bag: React.FC<{ x: number; y: number; s?: number; o?: number; half?: boolean }> = ({ x, y, s = 1, o = 1, half }) => (
  <g transform={`translate(${x} ${y}) scale(${half ? s * 0.6 : s})`} opacity={o}><path d="M-50 0 Q-64 -70 -24 -96 L24 -96 Q64 -70 50 0 Z" fill="#CFA25E" /><rect x={-22} y={-112} width={44} height={20} rx={8} fill="#A97F3E" /><text y={-30} textAnchor="middle" fill="#FFFFFF" style={BB(38)}>$</text></g>
)

const Prices: React.FC<PieceProps> = ({ f, c }) => {
  const change34 = c('s34:change'), seconds34 = c('s34:seconds'), buyers34 = c('s34:buyers'), sellers34 = c('s34:sellers'), minds34 = c('s34:minds'), worth34 = c('s34:worth')
  const comes35 = c('s35:comes'), profits35 = c('s35:profits'), expect35 = c('s35:expect'), future35 = c('s35:future')
  const simple36 = c('s36:simple'), d150 = c('s36:150'), k1000 = c('s36:1000'), k150k = c('s36:150000'), market36 = c('s36:market')
  const earns37 = c('s37:earns'), k20 = c('s37:20000'), paying37 = c('s37:paying'), whole37 = c('s37:whole'), seven37 = c('s37:seven'), half37 = c('s37:half'), profits37 = c('s37:profits')
  const picture38 = c('s38:picture'), one38 = c('s38:one'), k20b = c('s38:20000'), wont38 = c("s38:won't"), d150b = c('s38:150')
  const other39 = c('s39:other'), third39 = c('s39:third'), bigger39 = c('s39:bigger'), happy39 = c('s39:happy'), d180 = c('s39:180'), convinced39 = c('s39:convinced'), sets39 = c('s39:sets')
  const news40 = c('s40:news'), grow40 = c('s40:grow'), buyers40 = c('s40:buyers'), show40 = c('s40:show'), higher40 = c('s40:higher'), rises40 = c('s40:rises')
  const rumour41 = c('s41:rumour'), flour41 = c('s41:flour'), double41 = c('s41:double'), nervous41 = c('s41:nervous'), rush41 = c('s41:rush'), accept41 = c('s41:accept'), falls41 = c('s41:falls'), even41 = c('s41:even'), changed41 = c('s41:changed')
  const swing42 = c('s42:swing'), headline42 = c('s42:headline'), short42 = c('s42:short'), follow42 = c('s42:follow'), feel42 = c('s42:feel'), long42 = c('s42:long'), actually42 = c('s42:actually'), matter42 = c('s42:matter')

  const AB = simple36 - 4, BC = picture38 - 6, CD = news40 - 6, DE = swing42 - 6
  const A = win(f, 0, AB), B = win(f, AB - 8, BC), Cc = win(f, BC - 8, CD), D = win(f, CD - 8, DE), E = on(f, DE - 8, 10)

  const flick = ['$148', '$151', '$149', '$150', '$152'][Math.floor(f / 18) % 5]
  const bags = Math.min(7.5, 7.5 * span(f, paying37, seven37 + 10))
  const b1: Beat[] = [[BC, 'think', 'thinking'], [wont38, 'stop', 'neutral']]
  const b2: Beat[] = [[BC, 'idle', 'neutral'], [other39, 'think', 'smiling'], [happy39, 'holdUp', 'smiling'], [sets39, 'celebrate', 'smiling']]
  const crowdIn = on(f, buyers40, 20) * (1 - on(f, rumour41, 10))
  const rush = span(f, rush41, accept41 + 20)
  const tagD = f >= falls41 ? '$120' : f >= rises40 ? '$180' : f >= higher40 ? '$165' : '$150'

  return (
    <g>
      <Town id="mk-p-base" f={f} mood="noon" />
      {/* # A) the price flickers; minds change; the future */}
      {A > 0 && <g opacity={A}>
        <Town id="mk-p-a" f={f} mood="noon" />
        <g opacity={1 - on(f, comes35, 10)}>
          <Bakery x={960} y={G} s={0.9} f={f} />
          <g transform="translate(960 380)" opacity={on(f, change34 - 6, 8)}><rect x={-150} y={-46} width={300} height={92} rx={14} fill="#22252E" /><text y={24} textAnchor="middle" fill={M.butter} style={BB(70)}>{f >= seconds34 ? flick : '$150'}</text></g>
          {[0, 1].map((k) => <Folk key={k} x={300 + k * 120} y={G} s={2.2} c={[M.teal, '#7C6BAA'][k]} o={on(f, buyers34, 8)} />)}
          {[0, 1].map((k) => <Folk key={k} x={1500 + k * 120} y={G} s={2.2} c={[M.brick, '#5E8F6E'][k]} o={on(f, sellers34, 8)} />)}
          <g opacity={on(f, minds34, 8)}><Bubble x={360} y={480} w={240} h={130}><text y={18} textAnchor="middle" fill={M.greenD} style={BB(56)}>{Math.floor(f / 24) % 2 ? '$146' : '$153'}</text></Bubble>
            <Bubble x={1560} y={480} w={240} h={130}><text y={18} textAnchor="middle" fill={M.redD} style={BB(56)}>{Math.floor(f / 24) % 2 ? '$155' : '$149'}</text></Bubble></g>
          <g opacity={on(f, worth34, 8)}><Label x={960} y={G + 60} text="WHAT IS IT WORTH?" size={52} /></g>
        </g>
        <g opacity={on(f, comes35, 10)}>
          <Bakery x={360} y={G} s={0.7} f={f} />
          {/* a road of profit bags to the horizon */}
          <path d={`M 620 ${G} L 1800 620 L 1860 640 L 760 ${G + 40} Z`} fill="#D8C7A6" opacity={0.8} />
          {Array.from({ length: 8 }, (_, k) => { const t = k / 7; return <Bag key={k} x={lerp(760, 1780, t)} y={lerp(G, 640, t)} s={lerp(1.2, 0.4, t)} o={on(f, profits35 + k * 3, 8)} /> })}
          <g opacity={on(f, expect35, 8)}><Label x={1300} y={500} text="PROFITS PEOPLE EXPECT" size={50} /></g>
          <g opacity={on(f, future35, 8)}><Label x={1780} y={560} text="FUTURE" size={44} fill={M.ink} ink="#FFFFFF" /></g>
        </g>
      </g>}

      {/* # B) market value; 7½ years of profit */}
      {B > 0 && <g opacity={B}>
        <Town id="mk-p-b" f={f} mood="noon" />
        <g opacity={1 - on(f, earns37, 10)}>
          <Bakery x={760} y={G} s={1.0} f={f} grid={on(f, k1000 - 6, 12)} />
          <g opacity={on(f, d150, 8)}><Tag x={1260} y={460} text="$150" /><text x={1260} y={540} textAnchor="middle" fill={M.ink} style={BB(44)}>A SHARE</text></g>
          <g opacity={on(f, k1000, 8)}><Label x={1300} y={660} text="× 1,000 SHARES" size={54} /></g>
          <g opacity={on(f, k150k, 8)}><Label x={1300} y={780} text="= $150,000" size={70} fill={M.ink} ink="#FFFFFF" /></g>
          <g opacity={on(f, market36, 8)}><Label x={760} y={G + 60} text="MARKET VALUE" size={56} fill={M.tealD} ink="#FFFFFF" /></g>
        </g>
        <g opacity={on(f, earns37, 10)}>
          <g transform="translate(260 0)"><rect x={0} y={G - 40} width={1400} height={14} rx={7} fill={M.woodD} />
            {Array.from({ length: 8 }, (_, k) => k < bags ? <Bag key={k} x={90 + k * 170} y={G - 40} s={1.1} half={k === 7} /> : null)}
            {f >= profits37 && <rect x={20} y={G - 190} width={1290} height={150} rx={30} fill={M.butter} opacity={0.2 + 0.1 * Math.sin(f / 6)} />}
            <rect x={1300} y={G - 420} width={16} height={380} fill={M.red} /><text x={1310} y={G - 440} textAnchor="middle" fill={M.redD} style={BB(52)}>{f >= paying37 ? '$150,000' : ''}</text></g>
          <g opacity={on(f, k20, 8)}><Label x={600} y={420} text="1 BAG = $20,000 A YEAR" size={50} /></g>
          <g opacity={on(f, whole37, 8)}><Label x={1560} y={360} text="THE WHOLE BAKERY" size={44} /></g>
          <g opacity={on(f, seven37, 8)}><Label x={960} y={G + 70} text={f >= half37 ? '≈ 7½ YEARS OF PROFIT' : '7…'} size={60} fill={M.ink} ink="#FFFFFF" /></g>
        </g>
      </g>}

      {/* # C) two buyers, two dreams */}
      {Cc > 0 && <g opacity={Cc}>
        <Town id="mk-p-c" f={f} mood="noon" />
        <Person f={f} who="buyer" beats={b1} x={420} y={G} s={0.85} o={on(f, one38 - 4, 8)} />
        <Person f={f} who="investorF" beats={b2} x={1500} y={G} s={0.85} o={on(f, other39 - 6, 8)} />
        <Bubble x={560} y={330} w={420} h={260} o={on(f, k20b - 6, 10)}><Bakery x={0} y={80} s={0.3} f={f} /><text y={-70} textAnchor="middle" fill={M.ink} style={BB(40)}>$20,000 A YEAR</text></Bubble>
        <g opacity={on(f, wont38, 8)}><Tag x={760} y={620} text={f >= d150b ? 'MAX $150' : 'MAX'} color={M.ink2} s={1.1} /></g>
        <Bubble x={1360} y={320} w={500} h={270} o={on(f, third39 - 4, 10)}>{[0, 1, 2].map((k) => <g key={k} opacity={k < 2 || f >= third39 ? 1 : 0}><Bakery x={-140 + k * 140} y={80} s={0.25} f={f} awning={k === 2 ? M.brick : M.teal} /></g>)}
          <g opacity={on(f, bigger39, 8)}><text y={-80} textAnchor="middle" fill={M.greenD} style={BB(40)}>BIGGER PROFITS</text></g></Bubble>
        <g opacity={on(f, happy39, 8)}><Tag x={1180} y={640} text={f >= d180 ? 'BIDS $180' : 'BIDS'} color={M.greenD} s={1.1} /></g>
        <g opacity={on(f, convinced39, 10)} transform={`translate(960 ${780 - 12 * pop(f, sets39, 12)})`}><Tag x={0} y={0} text="$180" s={1.4} /><text y={80} textAnchor="middle" fill={M.ink} style={BB(46)}>NEXT PRICE</text></g>
      </g>}

      {/* # D) the news board: good news, then a rumour */}
      {D > 0 && <g opacity={D}>
        <Town id="mk-p-d" f={f} mood={f >= rumour41 ? 'grey' : 'noon'} />
        <Bakery x={1000} y={G} s={0.85} f={f} />
        <g transform="translate(330 0)"><rect x={-8} y={G - 300} width={16} height={300} fill={M.woodD} />
          <News x={0} y={G - 470} s={0.9} head={f >= rumour41 ? 'FLOUR TO DOUBLE?' : 'PROFITS TO GROW'} icon={f >= rumour41 ? 'flour' : 'up'} o={on(f, news40, 10)} r={-2} /></g>
        <g transform={`translate(1000 ${380 - 30 * on(f, higher40, 14) + 60 * on(f, falls41, 14)})`}><Tag x={0} y={0} text={tagD} color={f >= falls41 ? M.red : M.brick} s={1.3} /></g>
        {/* buyers stream in on good news */}
        {Array.from({ length: 5 }, (_, k) => <Folk key={k} x={lerp(2100, 1360 + k * 110, crowdIn)} y={G} s={2} c={[M.teal, '#7C6BAA', M.green, '#5A7BA0', '#C27A5E'][k]} o={on(f, show40, 10) * (1 - on(f, rumour41, 10))} />)}
        {/* owners rush out on the rumour, shares in hand */}
        {Array.from({ length: 4 }, (_, k) => <g key={k} opacity={on(f, nervous41, 8)} transform={`translate(${lerp(1360 + k * 110, -200, rush)} 0)`}><Folk x={0} y={G} s={2} c={[M.brick, '#B08A3C', '#5E8F6E', '#8A5A8A'][k]} /><rect x={20} y={G - 120} width={40} height={30} rx={4} fill={M.paper} stroke={M.teal} strokeWidth={3} /></g>)}
        <g opacity={on(f, flour41, 10)}><Flour x={620} y={G} s={0.9} tag={f >= double41 ? '×2?' : ''} /></g>
        <g opacity={on(f, even41, 10)} transform={`translate(1600 ${G})`}><rect x={-60} y={-240} width={120} height={240} rx={12} fill={M.green} /><text y={-260} textAnchor="middle" fill={M.ink} style={BB(44)}>PROFIT</text>
          <g opacity={on(f, changed41, 8)}><Label x={0} y={60} text="SAME" size={52} /></g></g>
      </g>}

      {/* # E) short run vs long run */}
      {E > 0 && <g opacity={E}>
        <Town id="mk-p-e" f={f} mood="evening" />
        <g transform="translate(260 0)">
          <rect x={0} y={260} width={1400} height={600} rx={30} fill={M.paper} opacity={0.92} />
          {(() => { const pts = Array.from({ length: 60 }, (_, k) => { const x = 40 + k * 22, base = 640 - k * 4, j = (Math.sin(k * 2.3) * 60 + Math.sin(k * 0.9) * 40) * on(f, swing42, 10); return `${x} ${base + j}` })
            return <g><path d={`M ${pts.slice(0, Math.max(2, Math.round(60 * span(f, swing42, short42 + 20)))).join(' L ')}`} fill="none" stroke={M.red} strokeWidth={7} strokeLinejoin="round" />
              <g opacity={on(f, long42, 12)}><path d={`M 40 700 L ${40 + 59 * 22} ${700 - 59 * 4.2}`} fill="none" stroke={M.greenD} strokeWidth={14} strokeLinecap="round" /></g></g> })()}
          <g opacity={on(f, headline42, 8) * (1 - on(f, short42, 6))}><News x={1150} y={400} s={0.5} head="BREAKING!" icon="down" /></g>
          <g opacity={on(f, short42, 8)}><Label x={350} y={330} text={f >= feel42 ? 'SHORT RUN: EXPECTATIONS + FEELINGS' : f >= follow42 ? 'SHORT RUN: EXPECTATIONS' : 'SHORT RUN'} size={46} fill={M.red} ink="#FFFFFF" w={720} /></g>
          <g opacity={on(f, long42, 8)}><Label x={1000} y={790} text={f >= actually42 ? 'LONG RUN: REAL PROFITS' : 'LONG RUN'} size={46} fill={M.greenD} ink="#FFFFFF" w={500} /></g>
          <g opacity={on(f, matter42, 8)}><circle cx={40 + 59 * 22} cy={700 - 59 * 4.2} r={20 + 4 * Math.sin(f / 5)} fill={M.greenD} /></g>
        </g>
      </g>}

      <Headline f={f} lines={[[change34, 'WHY PRICES CHANGE', M.ink, 104], [comes35, 'EXPECTED PROFITS', M.ink, 104], [simple36, '$150 × 1,000 SHARES', M.ink, 100], [earns37, '7½ YEARS OF PROFIT', M.ink, 100], [picture38, 'TWO BUYERS, TWO GUESSES', M.ink, 96], [news40, 'GOOD NEWS → BUYERS', M.greenD, 100], [rumour41, 'A RUMOUR → SELLERS', M.redD, 100], [swing42, 'SHORT RUN VS LONG RUN', M.ink, 100]]} />
    </g>
  )
}

export const MK_PRICES = makePiece('mk-prices', 'Step four, why prices move: in the town square a price sign over the bakery flickers ($148–$152), thought bubbles over buyers and sellers show different prices, then a road of profit bags runs to the horizon (profits people expect, the future); the bakery grid with a $150 tag × 1,000 shares = $150,000 market value; profit bags of $20,000 line up until 7½ of them reach the $150,000 bar; two buyers dream: one of 1 shop ($20,000 a year, max $150), the other of 3 shops (bigger profits, bids $180), the next price tag $180; a news board PROFITS TO GROW brings buyers in and the tag rises, then FLOUR TO DOUBLE? in a grey sky, owners rush off with their shares, the tag falls red while the profit bar stays the same; a jittery red short-run price line over a calm green long-run profit line', {
  mood: 'light', Component: Prices,
  beats: ["s34:change", "s34:seconds", "s34:buyers", "s34:sellers", "s34:minds", "s34:worth", "s35:comes", "s35:profits", "s35:expect", "s35:future", "s36:simple", "s36:150", "s36:1000", "s36:150000", "s36:market", "s37:earns", "s37:20000", "s37:paying", "s37:whole", "s37:seven", "s37:half", "s37:profits", "s38:picture", "s38:one", "s38:20000", "s38:won't", "s38:150", "s39:other", "s39:third", "s39:bigger", "s39:happy", "s39:180", "s39:convinced", "s39:sets", "s40:news", "s40:buyers", "s40:show", "s40:higher", "s40:rises", "s41:rumour", "s41:flour", "s41:double", "s41:nervous", "s41:rush", "s41:accept", "s41:falls", "s41:even", "s41:changed", "s42:swing", "s42:headline", "s42:short", "s42:follow", "s42:feel", "s42:long", "s42:actually", "s42:matter"],
  sfx: [['s36:150000', 'chime', 0.12], ['s39:180', 'pop', 0.12], ['s40:rises', 'riser', 0.1], ['s41:falls', 'thud', 0.14]] })
