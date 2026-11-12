// ---------------------------------------------------------------- s7–s12: 1848, gold in California, tens of thousands rush west to dig; most never got rich;
// Sam Brannan bought up picks, shovels and pans and sold them to the miners — known as California's first millionaire; the rule: sell the shovels; AI is a gold rush
import React from 'react'
import { Mini } from '../../rig/Mini'
import { easeInOut, easeOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { beat, type Beat, camera, Calendar, fly, Coin, Gpu, Headline, Label, Pan, Person, Pick, Prop, Shovel, win } from './common'

// # rolling hills and a river along the bottom of the stage
const Hills: React.FC<{ o: number }> = ({ o }) => (
  <g opacity={o}>
    <path d="M0 760 Q300 640 620 720 T1260 700 T1920 690 L1920 1080 L0 1080 Z" fill="#CDB98C" />
    <path d="M0 840 Q420 760 900 830 T1920 800 L1920 1080 L0 1080 Z" fill="#B99E6C" />
    <path d="M0 980 Q500 930 1000 970 T1920 950 L1920 1010 Q1400 1000 960 1020 T0 1040 Z" fill="#7FC3E8" opacity={0.9} />
  </g>
)
// # the store front with a sign
const Store: React.FC<{ x: number; y: number; o: number; sign: number }> = ({ x, y, o, sign }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-230} y={-330} width={460} height={330} rx={10} fill="#A8743F" /><path d="M-260 -330 L0 -430 L260 -330 Z" fill="#7A4E26" />
    <rect x={-200} y={-180} width={400} height={180} rx={6} fill="#6B4523" /><rect x={-190} y={-170} width={380} height={12} fill="#000" opacity={0.15} />
    <g opacity={sign}><rect x={-180} y={-300} width={360} height={80} rx={10} fill={P.cream} /><text x={0} y={-244} textAnchor="middle" fill="#5A3A1C" style={{ font: '400 52px "Bebas Neue"', letterSpacing: 3 }}>BRANNAN'S STORE</text></g>
  </g>
)

const GoldRush: React.FC<PieceProps> = ({ f, c }) => {
  const in1848 = c('s7:in'), gold = c('s7:gold'), california = c('s7:california'), thousands = c('s7:thousands'), rushed = c('s7:rushed'), dig = c('s7:dig')
  const most = c('s8:most'), never = c('s8:never'), rich = c('s8:rich')
  const shopkeeper = c('s9:shopkeeper'), brannan = c('s9:brannan'), picks = c('s9:picks'), shovels = c('s9:shovels'), pans = c('s9:pans'), sold = c('s9:sold'), miners = c('s9:miners')
  const known = c('s10:known'), millionaire = c('s10:millionaire')
  const need = c('s10a:need'), himself = c('s10a:himself'), believing = c('s10a:believing')
  const oldest = c('s11:oldest'), nobody = c('s11:nobody'), strike = c('s11:strike'), safest = c('s11:safest'), selling = c('s11:selling')
  const ai = c('s12:ai'), find = c('s12:find'), sell12 = c('s12:selling'), digging = c('s12:digging')
  const A = win(f, in1848, oldest), B = win(f, oldest, ai), Cc = on(f, ai, 10)
  const brannanB: Beat[] = [[0, 'idle', 'neutral'], [picks, 'present', 'smiling'], [sold, 'offer', 'smiling'], [miners, 'countA', 'smiling', 'countB', 14], [millionaire, 'celebrate', 'smiling'],
    [need, 'shrug', 'smug'], [believing, 'confident', 'smug'], [oldest, 'explain', 'neutral'], [safest, 'pointUp', 'smiling'], [ai, 'point', 'thinking']]
  // # the miners: they walk in on "rushed", dig on "dig", slump on "never"
  const minerX = (k: number) => 300 + (k % 6) * 130 + (k > 5 ? 70 : 0)
  return (
    <g>
      <Stage id="gr" frame={f} />
      <Headline f={f} lines={[[c("s10a:only"), "HE NEEDED MINERS TO BELIEVE", P.ink, 112], [c("s12:so"), "SO LET'S FIND OUT…", P.ink, 120], [in1848, '1848', P.ink, 150], [gold, 'GOLD!', P.goldInk, 150], [california, 'CALIFORNIA', P.ink, 140], [thousands, 'TENS OF THOUSANDS RUSH WEST', P.ink, 110], [never, 'MOST NEVER GOT RICH', P.coralInk, 124],
        [shopkeeper, 'A SAN FRANCISCO SHOPKEEPER', P.ink, 110], [brannan, 'SAM BRANNAN', P.ink, 130], [picks, 'PICKS · SHOVELS · PANS', P.goldInk, 116], [sold, 'SOLD TO THE MINERS', P.mintInk, 120],
        [known, "CALIFORNIA'S FIRST MILLIONAIRE", P.goldInk, 108], [need, 'NO GOLD NEEDED', P.ink, 124], [believing, 'JUST MINERS WHO KEEP BELIEVING', P.ink, 104],
        [oldest, 'THE OLDEST RULE', P.ink, 130], [nobody, 'NOBODY KNOWS WHO STRIKES GOLD…', P.ink, 104], [safest, '…SO SELL THE SHOVELS', P.goldInk, 120],
        [ai, 'AI IS A GOLD RUSH', P.goldInk, 130], [sell12, 'WHO SELLS THE SHOVELS?', P.ink, 116], [digging, 'WHO IS STILL DIGGING?', P.coralInk, 116]]} />
      <g transform={camera(f, [[thousands, 1000, 640, 1.04], [shopkeeper, 1300, 640, 1.06], [sold, 960, 540, 1], [oldest, 960, 540, 1], [ai, 960, 540, 1]])}>
        <Hills o={A + B * 0.6} />
        {/* # A: the gold rush — a calendar, a nugget, the miners, and Brannan's store */}
        <g opacity={A}>
          <g opacity={on(f, in1848, 6) * (1 - on(f, gold, 8))} transform={`translate(1240 520) scale(${pop(f, in1848)})`}><Calendar x={0} y={0} text="1848" s={1.4} /></g>
          <g opacity={on(f, gold, 6) * (1 - on(f, thousands, 8))} transform={`translate(1240 560) scale(${pop(f, gold) * 1.8})`}><g>{[[-40, 10, 34], [10, -6, 42], [52, 14, 28], [-6, 30, 26]].map(([nx, ny, r], q) => <ellipse key={q} cx={nx} cy={ny} rx={r} ry={r * 0.78} fill={q % 2 ? "#E9C25A" : "#F2D27A"} stroke="#B88A2E" strokeWidth={5} />)}</g>
            {[0, 1, 2, 3].map((k) => <path key={k} d="M0 -18 L5 -5 L18 0 L5 5 L0 18 L-5 5 L-18 0 L-5 -5 Z" fill="#FFF3B0" transform={`translate(${Math.cos(k * 1.7) * 110} ${Math.sin(k * 1.7) * 70}) scale(${0.6 + 0.4 * Math.sin(f / 5 + k)})`} />)}</g>
          <g opacity={on(f, california, 6) * (1 - on(f, thousands, 8))} transform="translate(1620 760)"><rect x={-12} y={-160} width={24} height={160} fill="#7A4E26" /><rect x={-150} y={-230} width={300} height={90} rx={10} fill="#E2C48E" stroke="#7A4E26" strokeWidth={6} /><Label x={0} y={-168} text="CALIFORNIA" size={56} font="Bebas Neue" color="#5A3A1C" /></g>
          {Array.from({ length: 11 }, (_, k) => { const t = easeOut(span(f, thousands + k * 2, thousands + k * 2 + 30)), x = lerp(-120, minerX(k), t), y = 900 + (k > 5 ? 60 : 0)
            const digB = f >= dig && f < shopkeeper ? Math.abs(Math.sin((f - dig) / 6 + k)) * 12 : 0
            return <g key={k} opacity={on(f, thousands + k, 6) * (1 - on(f, sold, 10) * 0.35)}>
              <Mini look={['worker', 'hero', 'owner', 'buyer', 'investor'][k % 5]} x={x} y={y + digB} scale={1.05} frame={f} seed={k + 40} mood={f >= never ? 'sad' : 'neutral'} />
              {f >= dig && <g transform={`translate(${x + 40} ${y - 40}) rotate(${-30 + digB * 2})`}><Shovel x={0} y={0} s={0.35} /></g>}
              {f >= never && k % 2 === 0 && <Pan x={x - 30} y={y + 20} s={0.45} o={on(f, never, 6)} />}
            </g> })}
          {/* # the store, and what it sells */}
          <Store x={1600} y={900} o={on(f, shopkeeper, 8)} sign={on(f, brannan, 6)} />
          <g opacity={on(f, picks, 6)} transform="translate(1480 700)"><Pick x={0} y={0} s={0.55} r={-10} /></g>
          <g opacity={on(f, shovels, 6)} transform="translate(1600 780)"><Shovel x={0} y={0} s={0.55} /></g>
          <g opacity={on(f, pans, 6)} transform="translate(1730 790)"><Pan x={0} y={0} s={0.7} /></g>
          {Array.from({ length: 6 }, (_, k) => { const m = fly(f, sold + 6 + k * 6, [minerX(k), 820], [1560, 640], 20, 160); return <Coin key={k} x={m.x} y={m.y} s={0.7} o={m.o} /> })}
          <g opacity={on(f, millionaire, 6)} transform={`translate(1600 380) scale(${pop(f, millionaire)})`}><Prop id="money-bag" x={0} y={0} size={170} f={f} /></g>
          {/* # Brannan never digs: the miners' thought bubbles are full of gold */}
          <g opacity={on(f, believing, 6)}>{[1, 3, 5].map((k) => <g key={k} transform={`translate(${minerX(k) + 40} 690) scale(${pop(f, believing + k)})`}><circle r={60} fill={P.white} /><circle cx={-40} cy={70} r={14} fill={P.white} /><g transform="scale(0.45)"><g>{[[-40, 10, 34], [10, -6, 42], [52, 14, 28], [-6, 30, 26]].map(([nx, ny, r], q) => <ellipse key={q} cx={nx} cy={ny} rx={r} ry={r * 0.78} fill={q % 2 ? "#E9C25A" : "#F2D27A"} stroke="#B88A2E" strokeWidth={5} />)}</g></g></g>)}</g>
          <Person f={f} who="investor" beats={brannanB} x={1210} y={1190} s={1.1} flip life={7} o={on(f, shopkeeper, 8)} />
        </g>
        {/* # B: the rule — diggers with question marks; the shovel seller with a full till */}
        <g opacity={B}>
          {Array.from({ length: 5 }, (_, k) => <g key={k} opacity={on(f, nobody + k * 2, 6)}><Mini look={['worker', 'hero', 'owner', 'buyer', 'worker'][k]} x={520 + k * 150} y={940} scale={1.05} frame={f} seed={k + 60} mood="neutral" />
            <g transform={`translate(${520 + k * 150} 620) scale(${pop(f, strike + k * 2) * 0.6})`} opacity={on(f, strike + k * 2, 6) * (1 - on(f, safest, 8))}><circle r={44} fill={P.gold} /><Label x={0} y={24} text="?" size={70} font="Bebas Neue" color={P.navy0} /></g></g>)}
          <g opacity={on(f, oldest, 6)} transform={`translate(1500 640) scale(${pop(f, oldest)})`}><rect x={-230} y={-200} width={460} height={400} rx={30} fill={P.card} />
            <Shovel x={-70} y={40} s={0.9} r={-12} /><Pick x={90} y={-30} s={0.6} r={18} />
            <Label x={0} y={170} text={f >= selling ? 'SELL THE SHOVELS' : 'RULE #1'} size={64} font="Bebas Neue" color={P.goldInk} /></g>
          {Array.from({ length: 5 }, (_, k) => { const m = fly(f, safest + 4 + k * 5, [520 + k * 150, 840], [1500, 600], 20, 180); return <Coin key={k} x={m.x} y={m.y} s={0.7} o={m.o} /> })}
        </g>
        {/* # C: today's version — an AI chip glinting like gold; diggers on the left, a shovel stall on the right */}
        <g opacity={Cc}>
          <g transform={`translate(960 520) scale(${pop(f, ai) * 0.9})`}><Gpu x={0} y={0} glow={1} /><circle r={200} fill={P.gold} opacity={0.12 + 0.06 * Math.sin(f / 6)} /></g>
          <g opacity={on(f, digging, 6)}>{[0, 1, 2].map((k) => <g key={k}><Mini look={['hero', 'buyer', 'worker'][k]} x={400 + k * 160} y={1000} scale={1.1} frame={f} seed={k + 80} /><g transform={`translate(${440 + k * 150} 900) rotate(${-30 + Math.abs(Math.sin(f / 6 + k)) * 24})`}><Shovel x={0} y={0} s={0.35} /></g></g>)}
            <Label x={550} y={1050} text="STILL DIGGING" size={48} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, sell12, 6)} transform={`translate(1500 900) scale(${pop(f, sell12)})`}><rect x={-200} y={-120} width={400} height={120} rx={14} fill="#A8743F" /><Shovel x={-100} y={-130} s={0.5} /><Shovel x={0} y={-130} s={0.5} /><Shovel x={100} y={-130} s={0.5} />
            <Label x={0} y={-40} text="SHOVELS" size={56} font="Bebas Neue" color={P.cream} /></g>
          <g opacity={on(f, find, 6) * (1 - on(f, sell12, 8))} transform="translate(1500 860)"><Prop id="magnifier" x={0} y={0} size={160} f={f} /></g>
        </g>
      </g>
      <Vignette id="gr" />
    </g>
  )
}

export const AI_GOLDRUSH = makePiece('ai-goldrush', 'Long: 1848 California gold rush; most miners never got rich; Sam Brannan sold picks, shovels and pans — known as the first millionaire; the rule: sell the shovels; AI is a gold rush', { mood: 'light', Component: GoldRush,
  beats: ["s7:in", "s7:gold", "s7:california", "s7:thousands", "s7:rushed", "s7:dig", "s8:most", "s8:never", "s8:rich", "s9:shopkeeper", "s9:brannan", "s9:picks", "s9:shovels", "s9:pans", "s9:sold", "s9:miners", "s10:known", "s10:millionaire", "s10a:need", "s10a:himself", "s10a:believing", "s11:oldest", "s11:nobody", "s11:strike", "s11:safest", "s11:selling", "s12:ai", "s12:find", "s12:selling", "s12:digging", "s10a:only", "s12:so"],
  sfx: [['s7:gold', 'chime', 0.5], ['s7:rushed', 'whoosh', 0.4], ['s8:never', 'thud', 0.4], ['s9:picks', 'pop', 0.4], ['s9:pans', 'pop', 0.4], ['s9:sold', 'coin', 0.5], ['s10:millionaire', 'ding', 0.5], ['s11:selling', 'coin', 0.4], ['s12:ai', 'impact', 0.5]] })
