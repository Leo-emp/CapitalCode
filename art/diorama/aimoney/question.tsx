// ---------------------------------------------------------------- s55–s62: will it pay off? Sequoia's David Cahn (2024): chip spending ×2 (buildings, electricity) ×2 (profit for
// the sellers of AI) ≈ $600B of AI revenue needed a year; the same rule on $194B → ≈ $775B; OpenAI reportedly expects ≈ $30B in 2026; the gap is enormous;
// not necessarily a bubble (fast growth, hidden savings) — but the shovel buyers are betting hundreds of billions that the gold is there
import React from 'react'
import { Mini } from '../../rig/Mini'
import { easeOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { beat, type Beat, camera, Col, Headline, Label, Person, Prop, Shovel, win } from './common'

// # one block of the Cahn calculation, with an icon and a caption
const Block: React.FC<{ x: number; y: number; w: number; h: number; color: string; icon?: string; text?: string; o: number; f: number }> = ({ x, y, w, h, color, icon, text, o, f }) => (
  <g opacity={o}>
    <rect x={x} y={y} width={w} height={h} rx={14} fill={color} />
    {icon && <Prop id={icon} x={x + w / 2} y={y + h / 2 - (text ? 18 : 0)} size={Math.min(70, h * 0.6)} f={f} />}
    {text && <text x={x + w / 2} y={y + h - 14} textAnchor="middle" fill="#0E1B33" style={{ font: '400 40px "Bebas Neue"', letterSpacing: 1 }}>{text}</text>}
  </g>
)

const Question: React.FC<PieceProps> = ({ f, c }) => {
  const spending = c('s55:spending'), pay = c('s55:pay')
  const cahn = c('s56:cahn'), sequoia = c('s56:sequoia'), calculation = c('s56:calculation')
  const start = c('s57:start'), double1 = c('s57:double'), buildings = c('s57:buildings'), electricity = c('s57:electricity')
  const again = c('s57a:again'), profit = c('s57a:profit')
  const answer = c('s58:answer'), d600 = c('s58:600'), justify = c('s58:justify')
  const rule = c('s59:rule'), d194 = c('s59:194'), d775 = c('s59:775')
  const comparison = c('s60:comparison'), openai = c('s60:openai'), biggest = c('s60:biggest'), expects = c('s60:expects'), d30 = c('s60:30'), show = c('s61:show')
  const adding = c('s60a:adding'), gap = c('s60a:gap'), enormous = c('s60a:enormous')
  const bubble = c('s61:bubble'), growing = c('s61:growing'), save = c('s61:save'), never = c('s61:never')
  const buying = c('s62:buying'), betting = c('s62:betting'), hundreds = c('s62:hundreds'), gold = c('s62:gold')
  const A = win(f, spending, rule), B = win(f, rule, bubble), Cc = on(f, bubble, 10)
  const hero: Beat[] = [[0, 'idle', 'neutral'], [spending, 'weighA', 'thinking', 'weighB', 18], [cahn, 'point', 'neutral'], [double1, 'countOne', 'neutral'], [again, 'countA', 'neutral'], [d600, 'shock', 'shocked'],
    [rule, 'explain', 'neutral'], [d775, 'oops', 'shocked'], [d30, 'scratchHead', 'thinking'], [enormous, 'despair', 'worried'], [bubble, 'stop', 'neutral'], [growing, 'pointUp', 'smiling'], [buying, 'shrug', 'thinking'], [gold, 'lookFar', 'thinking']]
  const investor: Beat[] = [[0, 'idle', 'neutral'], [calculation, 'type', 'thinking'], [answer, 'present', 'neutral']]
  // # the Cahn blocks: chip spending (1 unit), then ×2 data-center costs, then ×2 profit
  const U = 120, bx = 900, by = 860
  const H = 3 / 4 * 0.8 // # px per $1B on the comparison columns
  return (
    <g>
      <Stage id="qn" frame={f} />
      <Headline f={f} lines={[[c("s56:in"), "IN 2024…", P.ink, 130], [c("s57:spent"), "SPENT ON NVIDIA'S AI CHIPS", P.ink, 110], [c("s57:data"), "A DATA CENTER ALSO NEEDS…", P.ink, 112], [c("s57a:companies"), "COMPANIES SELLING AI…", P.ink, 116], [c("s57a:customers"), "…NEED A PROFIT TOO", P.goldInk, 120], [c("s58:just"), "NEEDED JUST…", P.ink, 124], [c("s59:latest"), "NVIDIA'S LATEST DATA CENTER SALES", P.ink, 100], [c("s59:answer"), "$194B × 2 × 2 = ?", P.ink, 120], [c("s60:in"), "IN 2026 · AS REPORTED", P.ink2, 108], [c("s60a:company"), "EVEN ADDING EVERY OTHER AI COMPANY", P.ink, 98], [c("s61:mean"), "DOES THAT MEAN A BUBBLE?", P.ink, 116], [c("s61:sales"), "NOT COUNTED AS AI SALES", P.ink, 112], [c("s62:mean"), "BUT IT DOES MEAN…", P.ink, 120], [spending, 'WILL THE SPENDING PAY OFF?', P.ink, 112], [cahn, 'DAVID CAHN · SEQUOIA CAPITAL', P.ink, 104], [calculation, 'A SIMPLE CALCULATION (2024)', P.ink, 106],
        [start, 'START: NVIDIA CHIP SPENDING', P.ink, 104], [double1, '× 2: BUILDINGS + ELECTRICITY', P.goldInk, 104], [again, '× 2 AGAIN: PROFIT FOR AI SELLERS', P.goldInk, 96],
        [d600, '≈ $600 BILLION A YEAR', P.coralInk, 124], [justify, '…TO JUSTIFY THE SPENDING', P.ink, 116],
        [rule, 'SAME ROUGH RULE, TODAY', P.ink, 120], [d775, '$194B × 2 × 2 ≈ $775B A YEAR', P.coralInk, 104], [d30, 'OPENAI 2026: ≈ $30B EXPECTED', P.mintInk, 108], [gap, 'THE GAP IS ENORMOUS', P.coralInk, 124],
        [bubble, 'NOT NECESSARILY', P.mintInk, 130], [growing, 'REVENUE IS GROWING FAST', P.mintInk, 116], [save, 'SAVINGS DON’T SHOW AS SALES', P.ink, 108],
        [buying, 'THE SHOVEL BUYERS…', P.ink, 124], [betting, '…ARE BETTING HUNDREDS OF BILLIONS', P.goldInk, 98], [gold, 'THAT THE GOLD IS THERE', P.goldInk, 116]]} />
      <g transform={camera(f, [[d600, 1100, 640, 1.04], [rule, 960, 540, 1], [enormous, 1150, 640, 1.04], [bubble, 960, 540, 1]])}>
        {/* # A: the scale of spending vs payoff, Cahn at his desk, then the blocks: 1 → 2 → 4 */}
        <g opacity={A}>
          <g opacity={on(f, spending, 6) * (1 - on(f, cahn, 8))} transform={`translate(1240 600) scale(${pop(f, spending) * 1.3})`}><Prop id="scale-balance" x={0} y={0} size={240} f={f} />
            <g opacity={on(f, pay, 6)} transform="translate(0 -170)"><circle r={50} fill={P.gold} /><Label x={0} y={26} text="?" size={80} font="Bebas Neue" color={P.navy0} /></g></g>
          <Person f={f} who="investor" beats={investor} x={1700} y={1190} s={1.1} flip life={7} o={on(f, cahn, 8)} />
          <g opacity={on(f, sequoia, 6)} transform={`translate(1700 330) scale(${pop(f, sequoia)})`}><rect x={-170} y={-40} width={340} height={80} rx={16} fill={P.card} /><Label x={0} y={18} text="SEQUOIA · 2024" size={52} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, cahn, 6) * (1 - on(f, calculation, 8))} transform={`translate(1180 600) scale(${pop(f, cahn)})`}><rect x={-260} y={-120} width={520} height={240} rx={26} fill={P.card} /><Label x={0} y={-20} text="AI'S $600B" size={88} font="Bebas Neue" color={P.goldInk} /><Label x={0} y={70} text="QUESTION" size={72} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, calculation, 6) * (1 - on(f, start, 8))} transform={`translate(1240 620) scale(${pop(f, calculation)})`}><Prop id="calculator" x={0} y={0} size={200} f={f} /></g>
          {/* # the blocks */}
          <Block x={bx} y={by - U} w={220} h={U} color={P.mint} icon="ai-chip" text={f >= start ? 'CHIPS' : ''} o={on(f, start, 6)} f={f} />
          <Block x={bx} y={by - 2 * U - 10} w={105} h={U} color={P.sky} icon="warehouse-boxes" o={on(f, buildings, 6)} f={f} />
          <Block x={bx + 115} y={by - 2 * U - 10} w={105} h={U} color={P.gold} icon="lightning" o={on(f, electricity, 6)} f={f} />
          <Block x={bx} y={by - 4 * U - 30} w={220} h={2 * U + 10} color={P.coral} icon="money-bag" text={f >= profit ? 'PROFIT' : ''} o={on(f, again, 6)} f={f} />
          <g opacity={on(f, double1, 6)}><Label x={bx + 250} y={by - 2 * U + 50} text="× 2" size={72} font="Bebas Neue" color={P.goldInk} anchor="start" /></g>
          <g opacity={on(f, again, 6)}><Label x={bx + 250} y={by - 4 * U + 60} text="× 2" size={72} font="Bebas Neue" color={P.goldInk} anchor="start" /></g>
          <g opacity={on(f, d600, 6)} transform={`translate(1360 960) scale(${pop(f, d600)})`}><rect x={-200} y={-56} width={400} height={112} rx={20} fill={P.coral} /><Label x={0} y={32} text="≈ $600B / YR" size={80} font="Bebas Neue" color="#FFFFFF" /></g>
        </g>
        {/* # B: today — a $775B tower vs OpenAI's ≈ $30B expected; the gap braced */}
        <g opacity={B}>
          <g opacity={on(f, c("s59:nvidia's"), 6)}><Col x={900} y={960} h={194 * H * on(f, c("s59:nvidia's"), 16)} w={200} color={P.mint} value={f >= d194 ? '$194B' : ''} label="NVIDIA DC SALES" />
            <Label x={1200} y={250} text="NVIDIA: YEAR TO JAN 2026 · OPENAI: REPORTED FORECAST" size={44} font="Bebas Neue" color={P.ink2} /></g>
          <Col x={1200} y={960} h={775 * H * on(f, d775, 30)} w={200} color={P.coral} value={f >= d775 ? '$775B' : ''} label={f >= d775 ? 'NEEDED / YR' : ''} o={on(f, d775, 6)} />
          <Col x={1500} y={960} h={30 * H * on(f, d30, 14)} w={200} color={P.sky} value={f >= d30 ? '$30B' : ''} label={f >= openai ? 'OPENAI 2026' : ''} o={on(f, comparison, 6)} />
          <g opacity={on(f, gap, 6)} transform={`translate(1395 ${960 - 640 * H}) scale(${pop(f, gap)})`}><rect x={-10} y={-50} width={210} height={100} rx={16} fill={P.card} /><Label x={95} y={-6} text="OPENAI ≈ 4%" size={48} font="Bebas Neue" color={P.mintInk} /><Label x={95} y={36} text="OF $775B" size={44} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, gap, 6)}><path d={`M1620 ${960 - 775 * H} h40 v${775 * H - 30 * H} h-40`} stroke={P.goldInk} strokeWidth={8} fill="none" /><Label x={1690} y={960 - 400 * H} text={f >= enormous ? 'GAP' : ''} size={76} font="Bebas Neue" color={P.goldInk} anchor="start" /></g>
          <g opacity={on(f, biggest, 6) * (1 - on(f, d30, 8))} transform={`translate(1500 ${700 - 40 * on(f, expects, 10)}) scale(${pop(f, biggest)})`}><circle r={80} fill={P.card} /><Prop id="robot-head" x={0} y={-4} size={110} f={f} /><Label x={0} y={130} text={f >= expects ? 'EXPECTS…' : 'BIGGEST'} size={48} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, adding, 6) * (1 - on(f, gap, 8))}><Label x={1500} y={760} text="+ OTHER AI FIRMS" size={48} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        {/* # C: a growth arrow and a piggy bank (savings that never show up as AI sales); then shovel buyers marching toward a hill marked "?" */}
        <g opacity={Cc}>
          <g opacity={on(f, bubble, 6) * (1 - on(f, growing, 8))} transform={`translate(1240 600) scale(${pop(f, bubble)})`}><circle r={190} fill="#9FD4FF" opacity={0.25} /><circle r={190} fill="none" stroke="#BFE4FF" strokeWidth={8} /><ellipse cx={-70} cy={-90} rx={46} ry={26} fill="#FFFFFF" opacity={0.6} transform="rotate(-30)" /><Label x={0} y={40} text="BUBBLE?" size={84} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={1 - on(f, buying, 8)}>
            <g opacity={on(f, growing, 6)} transform={`translate(1000 620) scale(${pop(f, growing) * 1.2})`}><Prop id="arrow-up" x={0} y={0} size={200} f={f} /></g>
            <g opacity={on(f, save, 6)} transform={`translate(1480 620) scale(${pop(f, save) * 1.2})`}><Prop id="piggy-bank" x={0} y={0} size={200} f={f} /><Label x={0} y={160} text={f >= never ? 'NOT IN AI SALES' : 'SAVINGS'} size={52} font="Bebas Neue" color={P.ink} />
              <g opacity={on(f, show, 6)} transform="translate(170 -120)"><circle r={44} fill={P.coral} /><path d="M-18 -18 L18 18 M18 -18 L-18 18" stroke="#FFF" strokeWidth={8} /></g></g>
          </g>
          <g opacity={on(f, buying, 6)}>
            <path d="M1300 980 Q1560 560 1840 980 Z" fill="#7A6A4E" opacity={0.6} />
            <g transform={`translate(1580 640) scale(${pop(f, gold)})`} opacity={on(f, gold, 6)}><circle r={60} fill={P.gold} /><Label x={0} y={32} text="?" size={100} font="Bebas Neue" color={P.navy0} /></g>
            {Array.from({ length: 5 }, (_, k) => { const x = lerp(640 + k * 110, 1000 + k * 110, easeOut(span(f, buying + k * 3, betting + 30))); return <g key={k}><Mini look={['investor', 'owner', 'investor', 'worker', 'owner'][k]} x={x} y={1010} scale={1.0} frame={f} seed={k + 260} />
              <g transform={`translate(${x + 40} 900) rotate(20)`}><Shovel x={0} y={0} s={0.3} /></g></g> })}
            <g opacity={on(f, hundreds, 6)} transform={`translate(1000 560) scale(${pop(f, hundreds)})`}><Prop id="money-bag" x={0} y={0} size={160} f={f} /></g>
          </g>
        </g>
        <Person f={f} who="hero" beats={hero} x={300} y={1190} s={1.4} life={2} />
      </g>
      <Vignette id="qn" />
    </g>
  )
}

export const AI_QUESTION = makePiece('ai-question', 'Long: Sequoia’s $600B question (2024): chip spend ×2 ×2; same rule on $194B ≈ $775B a year vs OpenAI ≈ $30B expected (2026); not necessarily a bubble; shovel buyers bet the gold is there', { mood: 'dark', Component: Question,
  beats: ["s55:spending", "s55:pay", "s56:cahn", "s56:sequoia", "s56:calculation", "s57:start", "s57:double", "s57:buildings", "s57:electricity", "s57a:again", "s57a:profit", "s58:answer", "s58:600", "s58:justify", "s59:rule", "s59:194", "s59:775", "s60:comparison", "s60:openai", "s60:biggest", "s60:expects", "s60:30", "s61:show", "s60a:adding", "s60a:gap", "s60a:enormous", "s61:bubble", "s61:growing", "s61:save", "s61:never", "s62:buying", "s62:betting", "s62:hundreds", "s62:gold", "s56:in", "s57:spent", "s57:data", "s57a:companies", "s57a:customers", "s58:just", "s59:latest", "s59:answer", "s60:in", "s60a:company", "s61:mean", "s61:sales", "s62:mean", "s59:nvidia's"],
  sfx: [['s55:pay', 'riser', 0.3], ['s57:double', 'pop', 0.4], ['s57a:again', 'pop', 0.4], ['s58:600', 'impact', 0.6], ['s59:775', 'impact', 0.6], ['s60:30', 'pop', 0.4], ['s60a:enormous', 'thud', 0.5], ['s61:growing', 'chime', 0.4], ['s62:gold', 'riser', 0.4]] })
