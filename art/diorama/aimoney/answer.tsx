// ---------------------------------------------------------------- s68–s72: who is making money from AI? Today mostly the bottom of the stack — chip designers, chip factories,
// cloud landlords — paid first, whichever app wins; the model makers still spend far more than they earn; it flips only if people pay more for AI than it costs
// to run; until then, don't watch the diggers — follow the shovels
import React from 'react'
import { Mini } from '../../rig/Mini'
import { on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { beat, type Beat, camera, Coin, Headline, Label, Layer, Person, Pile, Prop, Shovel, win } from './common'

const LAYERS: [string, string, string][] = [['APPS', '#7C6CF0', 'phone'], ['AI MODELS', '#E0705C', 'robot-head'], ['CLOUD', '#2E8FD6', 'cloud'], ['CHIPS', '#2BA36B', 'ai-chip']]

const Answer: React.FC<PieceProps> = ({ f, c }) => {
  const who = c('s68:who'), actually = c('s68:actually')
  const today = c('s69:today'), bottom = c('s69:bottom'), designers = c('s69:designers'), factories = c('s69:factories'), landlords = c('s69:landlords')
  const paid = c('s69a:paid'), first = c('s69a:first'), which = c('s69a:which'), wins = c('s69a:wins')
  const building = c('s70:building'), spending = c('s70:spending'), earn = c('s70:earn')
  const flips = c('s71:flips'), thing = c('s71:thing'), paying = c('s71:paying'), costs = c('s71:costs'), run = c('s71:run')
  const until = c('s72:until'), watch = c('s72:watch'), diggers = c('s72:diggers'), follow = c('s72:follow'), shovels = c('s72:shovels')
  const A = win(f, who, flips), B = win(f, flips, until), Cc = on(f, until, 10)
  const hero: Beat[] = [[0, 'idle', 'neutral'], [who, 'scratchHead', 'thinking'], [today, 'pointDown', 'neutral'], [paid, 'countA', 'smiling', 'countB', 14], [which, 'shrug', 'neutral'], [spending, 'despair', 'worried'],
    [flips, 'weighA', 'thinking', 'weighB', 18], [run, 'explain', 'neutral'], [until, 'idle', 'neutral'], [diggers, 'stop', 'neutral'], [follow, 'pointUp', 'smiling'], [shovels, 'confident', 'smug']]
  const ly = (k: number) => 360 + k * 140
  // # scale tilt: pay side vs cost side, eased in on "paying" then balancing out on "run" (the open question)
  const tilt = 14 * on(f, costs, 16) - 9 * on(f, run, 24)
  return (
    <g>
      <Stage id="an" frame={f} />
      <Headline f={f} lines={[[c("s68:money"), "MAKING MONEY FROM AI?", P.goldInk, 124], [c("s69:mostly"), "MOSTLY THE BOTTOM OF THE STACK", P.goldInk, 108], [c("s70:talks"), "THE AI EVERYONE TALKS ABOUT…", P.ink, 112], [c("s71:people"), "WHETHER PEOPLE…", P.ink, 124], [c("s72:winning"), "WHO IS WINNING A GOLD RUSH?", P.ink, 112], [who, 'SO WHO IS ACTUALLY…', P.ink, 124], [today, 'TODAY…', P.ink, 130], [designers, 'CHIP DESIGNERS', P.mintInk, 124], [factories, 'CHIP FACTORIES', P.mintInk, 124], [landlords, 'CLOUD LANDLORDS', P.skyInk, 124],
        [paid, 'PAID FIRST', P.goldInk, 140], [which, 'WHICHEVER APP WINS', P.ink, 124], [building, 'THE AI MODEL MAKERS…', P.ink, 120], [spending, '…SPEND FAR MORE THAN THEY EARN', P.coralInk, 100],
        [flips, 'WHAT WOULD FLIP IT?', P.ink, 130], [paying, 'WHAT PEOPLE PAY FOR AI', P.mintInk, 116], [costs, 'VS WHAT IT COSTS TO RUN', P.coralInk, 112],
        [until, 'UNTIL THEN…', P.ink, 130], [watch, "DON'T WATCH THE DIGGERS", P.ink, 120], [follow, 'FOLLOW THE SHOVELS', P.goldInk, 140]]} />
      <g transform={camera(f, [[bottom, 1150, 720, 1.05], [which, 960, 540, 1], [flips, 960, 540, 1], [until, 960, 540, 1], [shovels, 1150, 600, 1.06]])}>
        {/* # A: the stack — the bottom three layers glow with growing piles; the model layer leaks coins */}
        <g opacity={A}>
          {LAYERS.map(([n, col, icon], k) => <Layer key={k} x={1050} y={ly(k)} color={col} name={n} icon={icon} f={f} o={on(f, who + k * 2, 6)} glow={k >= 2 ? on(f, k === 3 ? designers : landlords, 8) : 0} dim={k === 0 ? on(f, bottom, 10) * (1 - on(f, which, 8)) : 0} />)}
          {/* # who sits in the bottom layers */}
          {[[designers, 'CHIP DESIGNERS', 3, 0], [factories, 'CHIP FACTORIES', 3, 1], [landlords, 'CLOUD LANDLORDS', 2, 0]].map(([at, t, k, j], i) => <g key={i} opacity={on(f, at as number, 6)} transform={`translate(1500 ${ly(k as number) + (j as number) * 100}) scale(${pop(f, at as number)})`}>
            <rect x={-20} y={-40} width={300} height={80} rx={16} fill={P.gold} /><Label x={130} y={18} text={t as string} size={50} font="Bebas Neue" color={P.navy0} /></g>)}
          {Array.from({ length: 8 }, (_, k) => { const t = span(f, paid + k * 4, paid + k * 4 + 20); return f >= paid ? <Coin key={k} x={600} y={ly(0) + t * (ly(2 + (k % 2)) - ly(0))} s={0.5} o={on(f, paid + k * 4, 3) * (1 - span(f, paid + k * 4 + 18, paid + k * 4 + 22))} /> : null })}
          <Pile x={1640} y={ly(3) + 250} n={on(f, first, 30) * 15} s={0.9} />
          <g opacity={on(f, which, 6) * (1 - on(f, building, 8))}>{['phone', 'laptop', 'robot-head'].map((id, k) => <g key={k} transform={`translate(${1500 + k * 130} ${ly(0)}) scale(${pop(f, which + k * 3) * 0.8})`}><circle r={56} fill={P.card} /><Prop id={id} x={0} y={-4} size={70} f={f} />
            <g opacity={on(f, wins, 6)} transform="translate(40 -50)"><circle r={22} fill={P.gold} /><Label x={0} y={12} text="?" size={36} font="Bebas Neue" color={P.navy0} /></g></g>)}</g>
          <g opacity={on(f, building, 6)}>
            <rect x={1050 - 400} y={ly(1) - 62} width={800} height={124} rx={28} fill="none" stroke={P.coralInk} strokeWidth={8} />
            {Array.from({ length: 6 }, (_, k) => { const t = ((f - spending) / 30 + k / 6) % 1; return f >= spending ? <Coin key={k} x={1500 + t * 240} y={ly(1) - t * 40 + Math.sin(t * Math.PI) * -80} s={0.45} o={Math.sin(t * Math.PI)} /> : null })}
            <g opacity={on(f, earn, 6)} transform={`translate(1600 ${ly(1)}) scale(${pop(f, earn)})`}><rect x={-110} y={-36} width={220} height={72} rx={14} fill={P.coral} /><Label x={0} y={18} text="SPEND > EARN" size={44} font="Bebas Neue" color="#FFFFFF" /></g>
          </g>
        </g>
        {/* # B: the balance — what people pay for AI vs what it costs to run */}
        <g opacity={B}>
          <g transform="translate(1240 640)">
            <rect x={-12} y={-20} width={24} height={360} fill="#8A99B0" /><g opacity={on(f, run, 8)} transform="translate(0 -110)"><circle r={50} fill={P.gold} /><Label x={0} y={26} text="?" size={80} font="Bebas Neue" color={P.navy0} /></g><path d="M-90 340 L90 340 L60 300 L-60 300 Z" fill="#8A99B0" />
            <g transform={`rotate(${tilt})`}>
              <rect x={-420} y={-30} width={840} height={20} rx={10} fill="#5C6F8E" />
              <g transform="translate(-380 0)"><path d="M0 -10 L-80 120 M0 -10 L80 120" stroke="#5C6F8E" strokeWidth={4} /><ellipse cx={0} cy={124} rx={100} ry={20} fill="#9AA6B6" />
                <g opacity={on(f, paying, 6)}><Pile x={0} y={110} n={6} s={0.8} /><Label x={0} y={210} text="PEOPLE PAY" size={50} font="Bebas Neue" color={P.mintInk} /></g></g>
              <g transform="translate(380 0)"><path d="M0 -10 L-80 120 M0 -10 L80 120" stroke="#5C6F8E" strokeWidth={4} /><ellipse cx={0} cy={124} rx={100} ry={20} fill="#9AA6B6" />
                <g opacity={on(f, costs, 6)}><g transform="translate(0 70) scale(0.35)"><rect x={-150} y={-100} width={300} height={200} rx={18} fill="#1E2A3E" /><rect x={-60} y={-50} width={120} height={100} rx={10} fill="#5FE3A1" /></g><Label x={0} y={210} text="COST TO RUN" size={50} font="Bebas Neue" color={P.coralInk} /></g></g>
            </g>
          </g>
          <g opacity={on(f, thing, 6) * (1 - on(f, paying, 8))} transform={`translate(1240 400) scale(${pop(f, thing)})`}><circle r={60} fill={P.gold} /><Label x={0} y={30} text="1" size={90} font="Bebas Neue" color={P.navy0} /></g>
        </g>
        {/* # C: the ending — diggers fade to grey; one big golden shovel */}
        <g opacity={Cc}>
          <g opacity={on(f, c('s72:gold'), 6) * (1 - on(f, follow, 10))}><path d="M1300 1000 Q1560 560 1840 1000 Z" fill="#CDB98C" /><g transform={`translate(1570 700) scale(${pop(f, c('s72:gold'))})`}><circle r={56} fill={P.gold} /><Label x={0} y={30} text="?" size={90} font="Bebas Neue" color={P.navy0} /></g></g>
          <g opacity={on(f, until, 6) * (1 - on(f, follow, 10) * 0.7)}>{[0, 1, 2].map((k) => <g key={k}><Mini look={['hero', 'buyer', 'worker'][k]} x={700 + k * 250} y={1030} scale={1.5} frame={f} seed={k + 300} />
            <g transform={`translate(${770 + k * 250} 920) rotate(${-30 + Math.abs(Math.sin(f / 6 + k)) * 24})`}><Shovel x={0} y={0} s={0.32} /></g></g>)}
            <g opacity={on(f, diggers, 6)}><path d="M600 1060 L1320 720 M1320 1060 L600 720" stroke={P.coral} strokeWidth={10} opacity={0.6} /></g></g>
          <g opacity={on(f, follow, 6)} transform={`translate(1480 820) rotate(-12) scale(${pop(f, follow) * 2.2})`}><circle cx={0} cy={-80} r={150} fill={P.gold} opacity={0.18 + 0.08 * Math.sin(f / 7)} /><Shovel x={0} y={0} /></g>
          {Array.from({ length: 6 }, (_, k) => { const t = ((f - shovels) / 40 + k / 6) % 1; return f >= shovels ? <Coin key={k} x={1480 + Math.cos(k) * 220 * t} y={560 - t * 200} s={0.5} o={Math.sin(t * Math.PI)} /> : null })}
        </g>
        <Person f={f} who="hero" beats={hero} x={300} y={1190} s={1.4} life={2} />
      </g>
      <Vignette id="an" />
    </g>
  )
}

export const AI_ANSWER = makePiece('ai-answer', 'Long: the answer — the bottom of the stack (chip designers, factories, cloud landlords) gets paid first; model makers spend more than they earn; pay vs cost decides; follow the shovels', { mood: 'light', Component: Answer,
  beats: ["s68:who", "s68:actually", "s69:today", "s69:bottom", "s69:designers", "s69:factories", "s69:landlords", "s69a:paid", "s69a:first", "s69a:which", "s69a:wins", "s70:building", "s70:spending", "s70:earn", "s71:flips", "s71:thing", "s71:paying", "s71:costs", "s71:run", "s72:until", "s72:watch", "s72:diggers", "s72:follow", "s72:shovels", "s68:money", "s69:mostly", "s70:talks", "s71:people", "s72:winning", "s72:gold"],
  sfx: [['s69:designers', 'pop', 0.4], ['s69:factories', 'pop', 0.4], ['s69:landlords', 'pop', 0.4], ['s69a:paid', 'coin', 0.5], ['s70:spending', 'thud', 0.4], ['s71:costs', 'swish', 0.4], ['s72:follow', 'impact', 0.5], ['s72:shovels', 'chime', 0.5]] })
