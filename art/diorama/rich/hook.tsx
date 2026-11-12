// ---------------------------------------------------------------- s1–s6: the hook, at sunset.
// A) a phone ad: a man leaning on a rented sports car, RICH BY NEXT MONTH! — a little crowd looks and shrugs.
// B) the ad folds away; a travel-poster trail climbs a mountain to a gold summit; a lucky clover gets a cross;
//    a speed dial swings into the red: FAST = RISKY.
// C) Leo walks in: LEO, 28 · $54,000 A YEAR · a card that owes $6,000.
// D) ten numbered flags pop up along the trail — 1 SAFEST at the foot, 10 FASTEST at the top.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { PosterWorld, Vig, Ticket, Cross, Card, Coin, Life, TXT, CREAM, ORANGE, RED, GOLD, MINT, INK, DEEP, TEAL, PLUM, SHADE } from './kit'

// # the trail up the mountain: ten flag points from the foot (left) to the summit (right)
export const TRAIL: [number, number][] = [[260, 900], [430, 860], [600, 820], [760, 770], [920, 720], [1080, 660], [1230, 600], [1380, 530], [1530, 450], [1680, 360]]
const trailD = 'M120 960 ' + TRAIL.map(([x, y]) => `L${x} ${y}`).join(' ') + ' L1760 320'

const Car: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={10} cy={6} rx={240} ry={18} fill={SHADE} />
    <path d="M-230 -20 L-210 -70 L-90 -90 L-30 -140 L110 -140 L170 -90 L230 -80 L240 -20 Z" fill={RED} />
    <path d="M-20 -128 L100 -128 L150 -92 L-60 -92 Z" fill="#BFE6F0" /><path d="M40 -128 L40 -92" stroke={RED} strokeWidth={8} />
    <path d="M-230 -50 L240 -50" stroke="#FFFFFF" strokeWidth={6} opacity={0.35} />
    {[-140, 150].map((cx) => <g key={cx}><circle cx={cx} cy={-14} r={42} fill={INK} /><circle cx={cx} cy={-14} r={18} fill="#C9CED6" /></g>)}
  </g>
)

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const ads = c('s1:ads'), rented = c('s1:rented'), rich = c('s1:rich'), month = c('s1:month')
  const easy = c('s2:easy'), everybody = c('s2:everybody'), already = c('s2:already')
  const real = c('s3:real'), legal = c('s3:legal'), wealth = c('s3:wealth'), lucky = c('s3:lucky'), first = c('s3:first')
  const fast = c('s4:fast'), risky = c('s4:risky'), partly = c('s4:partly'), rank = c('s4:rank')
  const leo = c('s5:leo'), d28 = c('s5:28'), d54 = c('s5:54000'), d6 = c('s5:6000'), card = c('s5:card')
  const ten = c('s6:ten'), safest = c('s6:safest'), pays = c('s6:pays'), fastest = c('s6:fastest'), fortune = c('s6:fortune'), wipe = c('s6:wipe')

  const A = 1 - on(f, real - 10, 8), B = win(f, real - 2, leo - 2, 8), Cc = win(f, leo - 2, ten - 2, 8), D = on(f, ten - 2, 8)
  const crowd: Beat[] = [[easy, 'idle', 'neutral'], [everybody, 'shrug', 'thinking'], [already, 'armsCrossed', 'smug']]
  const leoB: Beat[] = [[leo, 'waveA', 'smiling', 'waveB', 10], [d28, 'idle', 'smiling'], [d54, 'present', 'smiling'], [d6, 'nervous', 'worried']]
  const leoD: Beat[] = [[ten, 'pointUp', 'thinking'], [safest, 'point', 'smiling'], [fastest, 'lookFar', 'thinking'], [wipe, 'nervous', 'worried']]
  const needle = lerp(-70, 70, on(f, fast, 24)) + 6 * Math.sin(f / 4) * on(f, risky, 10)

  return (
    <g>
      <PosterWorld f={f} id="rh-hook" tone="sunset" sunX={1500} sunY={440} />
      {/* # A) the phone ad and the crowd */}
      {A > 0.001 && <g opacity={A}>
        <g transform={`translate(960 600) scale(${pop(f, ads, 14)})`}>
          <rect x={-420} y={-330} width={840} height={600} rx={50} fill={SHADE} transform="translate(12 16)" />
          <rect x={-420} y={-330} width={840} height={600} rx={50} fill={INK} />
          <rect x={-390} y={-300} width={780} height={540} rx={30} fill="#FCE7C8" />
          <rect x={-390} y={-300} width={780} height={260} rx={30} fill="#F6B784" />
          <g opacity={on(f, rented, 10)}><Car x={20} y={170} s={1.05} /></g>
          <Person f={f} who="investor" beats={[[ads, 'confident', 'smug'], [rich, 'taDa', 'smug']]} x={-250} y={240} s={0.5} />
          <g opacity={on(f, rich, 8)} transform={`translate(70 -200) scale(${pop(f, rich, 12)}) rotate(-4)`}>
            <rect x={-300} y={-58} width={600} height={96} rx={18} fill={GOLD} /><text y={20} textAnchor="middle" fill={INK} style={TXT(70)}>RICH BY NEXT MONTH!</text>
          </g>
        </g>
        {[0, 1, 2, 3, 4].map((k) => <g key={k} opacity={on(f, easy + k * 3, 8)}><Person f={f} who={['buyer', 'worker', 'investorF', 'owner', 'buyer'][k]} beats={crowd} x={[150, 300, 1620, 1770, 1470][k]} y={1040} s={0.42} flip={k > 1} /></g>)}
      </g>}
      {/* # B) the real trail, the clover, the speed dial */}
      {B > 0.001 && <g opacity={B}>
        <path d={trailD} stroke={SHADE} strokeWidth={40} fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(6 10)" />
        <path d={trailD} stroke={CREAM} strokeWidth={34} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3000" strokeDashoffset={3000 * (1 - on(f, real, 40))} />
        <g opacity={on(f, wealth, 10)} transform={`translate(1760 320) scale(${pop(f, wealth, 12)})`}><rect x={-4} y={-150} width={8} height={150} fill={INK} /><path d="M4 -150 L110 -120 L4 -90 Z" fill={GOLD} /><Coin x={0} y={-190} s={1.1} /></g>
        <g opacity={on(f, legal, 8)}><Ticket x={560} y={500} t="REAL · LEGAL" size={50} col={MINT} tc={CREAM} /></g>
        <g opacity={win(f, lucky, fast, 8)} transform="translate(360 640)">
          {[0, 90, 180, 270].map((a) => <path key={a} d="M0 0 C-40 -50 -10 -90 0 -60 C10 -90 40 -50 0 0 Z" fill="#3E9A5A" transform={`rotate(${a}) scale(1.3)`} />)}
          <path d="M0 0 Q20 60 10 110" stroke="#2D7A44" strokeWidth={10} fill="none" />
          <g opacity={on(f, lucky + 8, 8)}><Cross x={0} y={0} s={0.9} /></g>
        </g>
        <g opacity={on(f, fast, 10)} transform={`translate(560 520) scale(${pop(f, fast, 12)})`}>
          <path d="M-170 0 A170 170 0 0 1 170 0 Z" fill={CREAM} /><path d="M60 -159 A170 170 0 0 1 170 0 L0 0 Z" fill={RED} opacity={0.85} />
          <path d="M-170 0 A170 170 0 0 1 -60 -159 L0 0 Z" fill={MINT} opacity={0.85} />
          <line x1={0} y1={0} x2={150 * Math.sin(needle * Math.PI / 180)} y2={-150 * Math.cos(needle * Math.PI / 180)} stroke={INK} strokeWidth={12} strokeLinecap="round" /><circle r={18} fill={INK} />
          <text x={-110} y={50} textAnchor="middle" fill={INK} style={TXT(40)}>SLOW</text><text x={110} y={50} textAnchor="middle" fill={RED} style={TXT(40)}>FAST</text>
          <g opacity={on(f, risky, 8)}><text y={110} textAnchor="middle" fill={RED} style={TXT(52)}>FAST = MORE RISK</text></g>
        </g>
        <g opacity={on(f, rank, 8)}>{TRAIL.map(([x, y], k) => <g key={k} opacity={on(f, rank + k * 2, 6)} transform={`translate(${x} ${y - 20})`}><rect x={-3} y={-70} width={6} height={70} fill={INK} /><path d="M3 -70 L50 -56 L3 -42 Z" fill={k < 2 ? MINT : k < 5 ? GOLD : k < 9 ? ORANGE : RED} /></g>)}</g>
        <g opacity={on(f, partly, 8)}><Life f={f} at={partly} x={560} y={400} /></g>
      </g>}
      {/* # C) meet Leo */}
      {Cc > 0.001 && <g opacity={Cc}>
        <Person f={f} who="worker" beats={leoB} x={720} y={1000} s={0.8} />
        <g opacity={on(f, d28, 8)}><Ticket x={1260} y={420} t="LEO, 28" size={64} col={DEEP} tc={CREAM} /></g>
        <g opacity={on(f, d54, 8)}><Ticket x={1260} y={560} t="EARNS $54,000 A YEAR" size={50} col={GOLD} /></g>
        <g opacity={on(f, d6, 8)} transform={`translate(1260 760) scale(${pop(f, d6, 12)})`}><Card x={0} y={0} s={0.9} r={-6} /></g>
        <g opacity={on(f, card, 8)}><Ticket x={1260} y={950} t="OWES $6,000" size={50} col={RED} tc={CREAM} /></g>
      </g>}
      {/* # D) ten ways along the trail */}
      {D > 0.001 && <g opacity={D}>
        <path d={trailD} stroke={SHADE} strokeWidth={40} fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(6 10)" />
        <path d={trailD} stroke={CREAM} strokeWidth={34} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {TRAIL.map(([x, y], k) => <g key={k} opacity={on(f, ten + k * 3, 6)} transform={`translate(${x} ${y - 20}) scale(${pop(f, ten + k * 3, 10)})`}>
          <rect x={-3} y={-90} width={6} height={90} fill={INK} /><path d="M3 -90 L64 -72 L3 -54 Z" fill={k < 2 ? MINT : k < 5 ? GOLD : k < 9 ? ORANGE : RED} />
          <circle cx={0} cy={-120} r={26} fill={CREAM} /><text y={-108} textAnchor="middle" fill={INK} style={TXT(36)}>{k + 1}</text>
        </g>)}
        <Person f={f} who="worker" beats={leoD} x={150} y={1010} s={0.5} />
        <g opacity={on(f, safest, 8)}><Ticket x={300} y={720} t="SAFEST" size={46} col={MINT} tc={CREAM} /></g>
        <g opacity={on(f, pays, 8)}><Coin x={420} y={640} s={0.9} /></g>
        <g opacity={on(f, fastest, 8)}><Ticket x={1560} y={250} t="FASTEST" size={46} col={RED} tc={CREAM} /></g>
        {/* a fortune bursts out at the top, then wipes away */}
        {[0, 1, 2, 3, 4, 5, 6].map((k) => { const t = on(f, fortune + k, 16), g = 1 - on(f, wipe, 10); return <Coin key={k} x={1680 + Math.cos(k) * 120 * t} y={260 - 30 - Math.sin(k + 1) * 80 * t} s={0.7} o={t * g} /> })}
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={c("s1:promising")} x={1030} y={420} kind="glint" />
        <Life f={f} at={c("s3:break")} x={360} y={560} kind="glint" />
        <Life f={f} at={c("s5:year")} x={1260} y={520} kind="glint" />
        <Life f={f} at={c("s3:here's")} x={760} y={520} kind="glint" />
        <Life f={f} at={c("s3:do")} x={760} y={520} kind="glint" />
        <Life f={f} at={c("s4:you're")} x={760} y={520} kind="glint" />
        <Life f={f} at={c("s4:so")} x={760} y={520} kind="glint" />
        <Life f={f} at={c("s6:we'll")} x={960} y={700} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="rh-hook" />
      <Headline f={f} lines={[[real, 'REAL WAYS TO GET RICH', CREAM, 88], [leo, 'MEET LEO', CREAM, 88], [ten, 'TEN WAYS · SAFEST TO FASTEST', CREAM, 84]]} />
    </g>
  )
}

export const RH_HOOK = makePiece('rh-hook', 'Hook at sunset on a travel-poster mountain: a phone ad shows a man leaning on a rented red sports car, RICH BY NEXT MONTH!, while a little crowd shrugs; the ad folds away and a cream trail draws itself up the mountain to a gold summit flag (REAL · LEGAL); a lucky four-leaf clover gets a red cross; a speed dial swings from SLOW to FAST into the red (FAST = MORE RISK) and ten little flags appear; Leo walks in and waves — LEO, 28 · EARNS $54,000 A YEAR · a purple credit card that OWES $6,000; ten numbered flags pop up along the trail from 1 SAFEST at the foot to 10 FASTEST at the top, where a burst of coins appears and then wipes away.', {
  mood: 'light', Component: Hook,
  beats: ["s1:ads", "s1:rented", "s1:rich", "s1:month", "s2:easy", "s2:everybody", "s2:already", "s3:real", "s3:legal", "s3:wealth", "s3:lucky", "s3:first", "s4:fast", "s4:risky", "s4:partly", "s4:rank", "s5:leo", "s5:28", "s5:54000", "s5:6000", "s5:card", "s6:ten", "s6:safest", "s6:pays", "s6:fastest", "s6:fortune", "s6:wipe", "s1:promising", "s3:break", "s5:year", "s3:here's", "s3:do", "s4:you're", "s4:so", "s6:we'll"],
  sfx: [['s1:rich', 'cash', 0.1], ['s3:lucky', 'pop', 0.08], ['s6:ten', 'chime', 0.08]] })
