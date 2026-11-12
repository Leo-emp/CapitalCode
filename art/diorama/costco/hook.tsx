// ---------------------------------------------------------------- s1–s6: Costco sold ≈ $297B of goods (FY2026) and kept ≈ $2 of every $100 after goods and running costs —
// less than a coffee; yet ≈ $11.7B operating profit; about half comes from the membership card; not the TVs, groceries or hot dog
// # picture-first (owner r36/r37/r39): every line is a drawing; text is short labels only; one picture group at a time
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, camera, Headline, Label, Person, Pile, Prop, win } from '../aimoney/common'
import { Cart, CoinGrid, HotDog, MemberCard, Rack, Warehouse } from './kit'

// # a TV on a stand
const TV: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><rect x={-110} y={-80} width={220} height={140} rx={10} fill="#1B2233" /><rect x={-98} y={-68} width={196} height={116} rx={6} fill="#3E95DA" /><path d="M-60 40 L-20 -10 L10 20 L40 -20 L80 40 Z" fill="#7FD3FF" opacity={0.7} /><rect x={-10} y={60} width={20} height={26} fill="#1B2233" /><rect x={-60} y={84} width={120} height={12} rx={6} fill="#1B2233" /></g>
)
// # a tire
const Tire: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}><circle r={80} fill="#1B2233" /><circle r={42} fill="#8A97AA" /><circle r={16} fill="#5C6F8E" />{Array.from({ length: 8 }, (_, k) => <rect key={k} x={-6} y={-80} width={12} height={20} fill="#2E3A52" transform={`rotate(${k * 45})`} />)}</g>
)

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const sold = c('s1:sold'), d297 = c('s1:297'), groceries = c('s1:groceries'), tvs = c('s1:tvs'), tires = c('s1:tires'), everything = c('s1:everything')
  const paying = c('s2:paying'), running = c('s2:running'), kept = c('s2:kept')
  const two = c('s2a:two'), coffee = c('s2a:coffee'), cart = c('s2a:cart')
  const nothing = c('s3:nothing'), yet = c('s3:yet'), d117 = c('s3:117')
  const where = c('s4:where'), come = c('s4:come')
  const half = c('s5:half'), before = c('s5:before'), single = c('s5:single'), card = c('s5:card'), wallet = c('s5:wallet')
  const tvs5 = c('s5a:tvs'), groceries5 = c('s5a:groceries'), hot = c('s5a:hot')
  const open = c('s6:open'), business = c("s6:costco's"), barely = c('s6:barely'), purpose = c('s6:purpose')
  const A = win(f, c('s1'), paying), B = win(f, paying, nothing), Cc = win(f, nothing, half), D = on(f, half, 10)
  const hero: Beat[] = [[0, 'present', 'smiling'], [c('s3:operating'), 'present', 'neutral'], [d297, 'shock', 'shocked'], [paying, 'explain', 'neutral'], [kept, 'countOne', 'neutral'], [coffee, 'hold', 'smiling'], [nothing, 'shrug', 'neutral'], [d117, 'oops', 'shocked'],
    [where, 'scratchHead', 'thinking'], [half, 'present', 'smiling'], [card, 'holdUp', 'smiling'], [tvs5, 'stop', 'neutral'], [open, 'explain', 'neutral'], [purpose, 'pointUp', 'smiling']]
  // # each good rolls into the warehouse door on its word
  const into = (at: number) => ({ x: lerp(1900, 1240, span(f, at, at + 26)), o: on(f, at, 5) * (1 - span(f, at + 22, at + 30)) })
  return (
    <g>
      <Stage id="ch" frame={f} />
      <Headline f={f} lines={[[d297, '$297 BILLION OF SALES', P.goldInk, 116], [kept, 'IT KEPT ≈ $2 OF $100', P.coralInk, 116], [nothing, 'ALMOST NOTHING', P.ink, 130], [d117, '$11.7B PROFIT', P.mintInk, 130],
        [where, 'WHERE FROM?', P.ink, 140], [card, 'THE CARD', P.goldInk, 150], [open, 'INSIDE COSTCO', P.ink, 140], [purpose, 'ON PURPOSE', P.goldInk, 150]]} />
      <g transform={camera(f, [[d297, 1240, 640, 1.04], [paying, 960, 540, 1], [kept, 1300, 620, 1.06], [nothing, 960, 540, 1], [half, 960, 540, 1], [open, 1240, 640, 1.05]])}>
        {/* # A: goods roll into a warehouse; a pile of money grows above it */}
        <g opacity={A}>
          <Warehouse x={1240} y={880} s={1.15} o={on(f, c('s1'), 6)} label="COSTCO" />
          <Rack x={1680} y={880} s={0.55} o={on(f, sold, 6)} seed={2} />
          <g opacity={into(groceries).o} transform={`translate(${into(groceries).x} 760)`}><Prop id="grocery-basket" x={0} y={0} size={170} f={f} /></g>
          <TV x={into(tvs).x} y={740} s={0.8} o={into(tvs).o} />
          <Tire x={into(tires).x} y={790} s={0.8} r={(f - tires) * 6} o={into(tires).o} />
          <g opacity={on(f, everything, 6)}>{[0, 1, 2].map((k) => <g key={k} transform={`translate(${880 + k * 90} 940)`}><rect x={-36} y={-70} width={72} height={70} rx={8} fill={['#E9C25A', '#E05A4C', '#3A6EA8'][k]} /></g>)}</g>
          <g opacity={on(f, d297, 6)}><Pile x={1240} y={480} n={on(f, d297, 24) * 24} s={1.1} /><Label x={1240} y={540} text="$297B" size={64} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
        {/* # B: $100 as 100 coins — 89 to the supplier's truck, 9 to the warehouse, 2 kept; a coffee cup and a full cart for scale */}
        <g opacity={B}>
          <g opacity={on(f, c('s2:every'), 6) * (1 - on(f, two, 8))}>{Array.from({ length: 98 }, (_, k) => <circle key={k} cx={1180 + ((k % 10) - 4.5) * 44} cy={620 + (Math.floor(k / 10) - 4.5) * 44} r={18} fill="none" stroke={P.ink2} strokeWidth={2} strokeDasharray="5 5" />)}</g>
          <CoinGrid f={f} x={1180} y={620} s={1} ta={paying + 4} tb={running + 2} tk={kept} a={[1720, 520]} b={[1720, 860]} />
          <g opacity={on(f, paying, 6) * (1 - on(f, two, 8))}><Prop id="truck" x={1720} y={520} size={200} f={f} /><Label x={1720} y={650} text="SUPPLIERS" size={48} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, running, 6) * (1 - on(f, two, 8))}><Warehouse x={1720} y={940} s={0.4} /><Label x={1720} y={1000} text="RUNNING COSTS" size={46} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, coffee, 6)} transform={`translate(1600 640) scale(${pop(f, coffee) * 1.4})`}><Prop id="coffee-cup" x={0} y={0} size={180} f={f} /></g>
          <g opacity={on(f, cart, 6)} transform={`translate(1760 1000) scale(${pop(f, cart) * 0.6})`}><Cart x={0} y={0} fill={lerp(0.5, 1, on(f, c('s2a:shopping'), 14))} /></g>
          {[0, 1, 2].map((k) => { const t = span(f, c('s2a:shopping') + k * 4, c('s2a:shopping') + k * 4 + 14); return t > 0 && t < 1 ? <rect key={k} x={1700 + k * 30} y={lerp(700, 860, t)} width={40} height={44} rx={6} fill={['#E05A4C', '#3A6EA8', '#3DDC97'][k]} /> : null })}
        </g>
        {/* # C: two tiny coins… and yet a tall tower of profit; a question mark on top */}
        <g opacity={Cc}>
          <g transform="translate(940 900)">{[0, 1].map((k) => <g key={k}><circle cx={k * 50} cy={0} r={20} fill={P.gold} /><circle cx={k * 50} cy={0} r={13} fill="none" stroke={P.goldD} strokeWidth={3} /></g>)}</g>
          <g opacity={on(f, yet, 6)}>{Array.from({ length: Math.round(on(f, yet, 40) * 20) }, (_, k) => <g key={k} transform={`translate(1360 ${960 - k * 24})`}><ellipse cx={0} cy={6} rx={110} ry={20} fill={P.goldD} /><ellipse cx={0} cy={0} rx={110} ry={20} fill={P.gold} /></g>)}
            <g opacity={on(f, d117, 6)}><Label x={1520} y={760} text="$11.7B" size={70} font="Bebas Neue" color={P.mintInk} anchor="start" /></g></g>
          <g opacity={on(f, where, 6)} transform={`translate(1360 ${400 - 10 * Math.sin(f / 7)}) scale(${pop(f, where)})`}><circle r={70} fill={P.gold} /><Label x={0} y={34} text="?" size={110} font="Bebas Neue" color={P.navy0} /></g>
          <g opacity={on(f, come, 6)}>{[0, 1, 2].map((k) => <circle key={k} cx={1240 + k * 120} cy={300 + Math.sin(f / 6 + k) * 10} r={10} fill={P.goldInk} />)}</g>
        </g>
        {/* # D: the tower halves — one half becomes the membership card; three wrong guesses crossed out; a magnifier on Costco */}
        <g opacity={D}>
          <g opacity={1 - on(f, tvs5, 8)}>
            {Array.from({ length: 20 }, (_, k) => { const left = k < 10; return <g key={k} transform={`translate(${left ? 1040 : lerp(1360, 1460, on(f, half, 14))} ${960 - (k % 10) * 26})`}><ellipse cx={0} cy={6} rx={110} ry={20} fill={P.goldD} /><ellipse cx={0} cy={0} rx={110} ry={20} fill={left ? P.gold : '#F2D27A'} /></g> })}
            <g opacity={on(f, before, 6)}><Cart x={1040} y={1050} s={0.5} /></g>
            <MemberCard x={1460} y={540} s={pop(f, single) * 1.1} o={on(f, single, 6)} glow={on(f, card, 10)} r={-6} />
            <g opacity={on(f, wallet, 6)} transform={`translate(1680 760) scale(${pop(f, wallet)})`}><Prop id="wallet" x={0} y={0} size={150} f={f} /></g>
          </g>
          <g opacity={on(f, tvs5, 6) * (1 - on(f, open, 8))}>
            <g opacity={on(f, tvs5, 6) * (1 - on(f, groceries5, 6))} transform={`translate(1240 620) scale(${pop(f, tvs5) * 1.6})`}><TV x={0} y={0} /><path d="M-130 -100 L130 110" stroke={P.coral} strokeWidth={14} strokeLinecap="round" opacity={on(f, tvs5 + 6, 4)} /></g>
            <g opacity={on(f, groceries5, 6) * (1 - on(f, hot, 6))} transform={`translate(1240 620) scale(${pop(f, groceries5) * 1.6})`}><Prop id="grocery-basket" x={0} y={0} size={180} f={f} /><path d="M-110 -100 L110 100" stroke={P.coral} strokeWidth={14} strokeLinecap="round" opacity={on(f, groceries5 + 6, 4)} /></g>
            <g opacity={on(f, hot, 6)} transform={`translate(1240 640) scale(${pop(f, hot) * 1.1})`}><HotDog x={0} y={0} /><path d="M-190 -150 L280 110" stroke={P.coral} strokeWidth={14} strokeLinecap="round" opacity={on(f, hot + 6, 4)} /></g>
          </g>
          <g opacity={on(f, open, 6)}>
            <Warehouse x={1240} y={880} s={1.2} label="COSTCO" />
            <g transform={`translate(${lerp(1000, 1340, span(f, business, barely))} 520) scale(${pop(f, open)})`}><Prop id="magnifier" x={0} y={0} size={220} f={f} /></g>
            <g opacity={on(f, barely, 6)} transform="translate(900 1000)">{[0, 1].map((k) => <circle key={k} cx={k * 46} cy={0} r={20} fill={P.gold} />)}</g>
            <g opacity={on(f, purpose, 6)} transform={`translate(1660 420) scale(${pop(f, purpose)})`}><circle r={70} fill={P.mint} /><path d="M-30 0 l20 22 l42 -46" stroke="#FFF" strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
          </g>
        </g>
        <Person f={f} who="hero" beats={hero} x={320} y={1190} s={1.4} life={2} />
      </g>
      <Vignette id="ch" />
    </g>
  )
}

export const CO_HOOK = makePiece('co-hook', 'Long: Costco ≈ $297B sales, ≈ $2 kept per $100 after goods and running costs; ≈ $11.7B operating profit; about half from membership fees', { mood: 'light', Component: Hook,
  beats: ["s1:sold", "s1:297", "s1:groceries", "s1:tvs", "s1:tires", "s1:everything", "s2:paying", "s2:running", "s2:kept", "s2a:two", "s2a:coffee", "s2a:cart", "s3:nothing", "s3:yet", "s3:117", "s4:where", "s4:come", "s5:half", "s5:before", "s5:single", "s5:card", "s5:wallet", "s5a:tvs", "s5a:groceries", "s5a:hot", "s6:open", "s6:costco's", "s6:barely", "s6:purpose", "s1", "s3:operating", "s2:every", "s2a:shopping"],
  sfx: [['s1:297', 'impact', 0.5], ['s2:paying', 'whoosh', 0.4], ['s2:kept', 'ding', 0.4], ['s3:117', 'impact', 0.5], ['s4:where', 'riser', 0.3], ['s5:card', 'chime', 0.5], ['s5a:hot', 'pop', 0.4]] })
