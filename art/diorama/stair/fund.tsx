// ---------------------------------------------------------------- s42–s52: step four, what to actually buy (the orchard valley).
// A) A wooden crate stamped 401(K) sits empty (an account is just a box); its lid opens and a sprout pushes up (what's
//    inside grows). Maya freezes in front of a wall of 60 seed packets (thousands of choices).
// B) One broad index fund: the crate opens into a walled orchard plot; rows of small company trees grow (hundreds, then
//    thousands); one tree wilts (a tiny part); the rest grow and bear gold fruit (profits) and the whole plot glows;
//    seeds spread across it (diversification).
// C) A target-date fund: a glass jar with green tree-layers (stocks) over blue stones (bonds); a year dial runs toward the
//    retirement year and the stones rise, the trees shrink (safer as the year gets closer).
// D) The fee: two harvest baskets of $10,000: a little sparrow takes $14 a year from the index ETF basket, a big crow takes
//    $100 a year from the 1% basket — every year; then two trees across the decades: the low-fee tree ends taller.
// E) Maya plants a sapling in her 401(K) crate and drops her leftover $1,000 coin into a small IRA crate beside it.
import React from 'react'
import { lerp, on, pop, rnd, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { C, Coin, Ground, Sky, Tree, TXT } from './kit'

const GROUND = 940

const Crate: React.FC<{ x: number; y: number; w?: number; h?: number; o?: number; lid?: number; label?: string }> = ({ x, y, w = 360, h = 220, o = 1, lid = 0, label }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={w * 0.62} ry={16} fill="#000" opacity={0.14} />
    <rect x={-w / 2} y={-h} width={w} height={h} rx={10} fill={C.wood} />
    {[0.25, 0.5, 0.75].map((t) => <rect key={t} x={-w / 2} y={-h + h * t - 4} width={w} height={8} fill={C.woodD} opacity={0.6} />)}
    <rect x={-w / 2} y={-h} width={14} height={h} fill={C.woodD} /><rect x={w / 2 - 14} y={-h} width={14} height={h} fill={C.woodD} />
    {label && <g><rect x={-90} y={-h / 2 - 34} width={180} height={64} rx={12} fill={C.paper} /><text y={-h / 2 + 14} textAnchor="middle" fill={C.ink} style={TXT(48)}>{label}</text></g>}
    <g transform={`translate(${-w / 2} ${-h}) rotate(${-70 * lid})`}><rect x={0} y={-24} width={w} height={26} rx={8} fill="#8E6242" /></g>
  </g>
)
const Bird: React.FC<{ x: number; y: number; s?: number; o?: number; f: number; big?: boolean }> = ({ x, y, s = 1, o = 1, f, big }) => {
  const flap = Math.sin(f / 3) * 18
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <ellipse cx={0} cy={0} rx={50} ry={34} fill={big ? '#2B2F3A' : '#9A6B4A'} /><circle cx={40} cy={-24} r={24} fill={big ? '#2B2F3A' : '#9A6B4A'} />
      <path d="M60 -26 L84 -20 L60 -14 Z" fill={C.gold} /><circle cx={46} cy={-30} r={5} fill="#FFFFFF" />
      <path d={`M-10 -10 Q-40 ${-50 - flap} -70 ${-20 - flap / 2} Q-40 -10 -10 0 Z`} fill={big ? '#3D4352' : '#B5876A'} />
      <path d="M-46 6 L-80 20 L-48 -4 Z" fill={big ? '#2B2F3A' : '#9A6B4A'} />
    </g>
  )
}
const Basket: React.FC<{ x: number; y: number; o?: number; n: number; label: string }> = ({ x, y, o = 1, n, label }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    {Array.from({ length: n }, (_, k) => <circle key={k} cx={-140 + (k % 10) * 31} cy={-110 - Math.floor(k / 10) * 24} r={16} fill={C.gold} stroke={C.goldD} strokeWidth={3} />)}
    <path d="M-190 -120 L190 -120 L150 0 L-150 0 Z" fill="#C89A5E" />{[0, 1, 2].map((k) => <rect key={k} x={-180 + k * 8} y={-96 + k * 34} width={360 - k * 16} height={10} fill="#A87C44" />)}
    <rect x={-160} y={-80} width={320} height={60} rx={12} fill={C.paper} /><text y={-36} textAnchor="middle" fill={C.ink} style={TXT(44)}>{label}</text>
  </g>
)

const Fund: React.FC<PieceProps> = ({ f, c }) => {
  const account42 = c('s42:account'), box42 = c('s42:box'), inside42 = c('s42:inside'), grows42 = c('s42:grows')
  const beginners43 = c('s43:beginners'), freeze43 = c('s43:freeze'), thousands43 = c('s43:thousands'), choices43 = c('s43:choices')
  const simple44 = c('s44:simple'), index44 = c('s44:index'), owns44 = c('s44:owns'), hundreds44 = c('s44:hundreds'), thousands44 = c('s44:thousands'), companies44 = c('s44:companies')
  const fails45 = c('s45:fails'), tiny45 = c('s45:tiny'), grow45 = c('s45:grow'), profits45 = c('s45:profits'), whole45 = c('s45:whole')
  const spreading46 = c('s46:spreading'), diversification46 = c('s46:diversification'), point46 = c('s46:point'), k401a = c('s47:401k')
  const target47 = c('s47:targetdate'), mixes47 = c('s47:mixes'), stocks47 = c('s47:stocks'), bonds47 = c('s47:bonds'), slowly47 = c('s47:slowly'), closer47 = c('s47:closer')
  const fee48 = c('s48:fee'), expense48 = c('s48:expense'), taken48 = c('s48:taken'), index49 = c('s49:index'), charged49 = c('s49:charged')
  const etfs49 = c('s49:etfs'), four49 = c('s49:4'), d14 = c('s49:14'), k10a = c('s49:10000')
  const charging50 = c('s50:charging'), d100 = c('s50:100'), whether50 = c('s50:whether')
  const decades51 = c('s51:decades'), gap51 = c('s51:gap'), fees51 = c('s51:fees'), never51 = c('s51:never')
  const picks52 = c('s52:picks'), k401 = c('s52:401k'), leftover52 = c('s52:leftover'), ira52 = c('s52:ira')

  const y2025s49 = c('s49:2025'), one44 = c('s44:one'), single44 = c('s44:single'), retirement47 = c('s47:retirement'), every48 = c('s48:every'), k10b = c('s50:10000'), every50 = c('s50:every'), taken51 = c('s51:taken'), grow51 = c('s51:grow'), lowfee52 = c('s52:lowfee'), similar52 = c('s52:similar')
  const AB = simple44 - 6, BC = k401a - 4, CD = fee48 - 6, DE = picks52 - 6
  const A = win(f, 0, AB), B = win(f, AB - 8, BC), Cc = win(f, BC - 8, CD), D = win(f, CD - 8, DE), E = on(f, DE - 8, 10)

  // # A) the empty box, the sprout; the wall of choices
  const aBeats: Beat[] = [[0, 'present', 'neutral'], [box42, 'point', 'neutral'], [grows42, 'celebrate', 'smiling'], [freeze43, 'shock', 'shocked'], [choices43, 'scratchHead', 'thinking']]
  const wall = on(f, beginners43 - 4, 12)
  // # B) the orchard
  const nTrees = Math.round(lerp(0, 24, span(f, owns44, hundreds44)) + lerp(0, 72, span(f, hundreds44, companies44 + 10)))
  const fruit = on(f, profits45, 16)
  // # C) the target-date jar
  const tdShift = span(f, slowly47, closer47 + 20)
  const yr = Math.round(lerp(2026, 2060, tdShift))
  // # D) two baskets, two birds; then two trees over the decades
  const birds = on(f, four49 - 2, 10)
  const decades = on(f, decades51, 12)
  // # E) planting
  const eBeats: Beat[] = ([...[[DE, 'reachDown', 'smiling'], [leftover52, 'offer', 'smiling'], [ira52, 'thumbsUp', 'smiling']], [lowfee52, 'point', 'smiling'], [similar52, 'nodA', 'smiling', 'nodB', 14]] as Beat[]).sort((p, q) => p[0] - q[0])

  return (
    <g>
      <Sky id="sv-f-base" f={f} mood="noon" />
      {/* # A) the box; the wall of choices */}
      {A > 0 && <g opacity={A}>
        <Sky id="sv-f-a" f={f} mood="noon" /><Ground y={GROUND - 20} seed={27} />
        <Person f={f} who="investorF" beats={aBeats} x={360} y={GROUND} s={0.88} />
        <g opacity={1 - wall}>
          <Crate x={1150} y={GROUND - 10} w={420} h={250} label="401(K)" lid={on(f, inside42, 16)} o={on(f, account42 - 6, 10)} />
          <g opacity={on(f, grows42, 10)}><Tree x={1150} y={GROUND - 250} s={0.9} grow={on(f, grows42, 30) * 0.7} /></g>
          <g opacity={win(f, box42, inside42, 8)}><text x={1150} y={GROUND - 340} textAnchor="middle" fill={C.ink2} style={TXT(52)}>EMPTY BOX</text></g>
        </g>
        {/* the wall of seed packets */}
        <g opacity={wall}>
          {Array.from({ length: 60 }, (_, k) => { const col = k % 12, row = Math.floor(k / 12), show = on(f, thousands43 + k * 0.4, 6)
            const hue = ['#E58C6B', '#6DBA72', '#5BBBD0', '#F2C14E', '#B18BD6', '#E5A1C0'][Math.floor(rnd(k) * 6)]
            return <g key={k} opacity={show} transform={`translate(${780 + col * 92} ${300 + row * 120})`}><rect x={-38} y={-50} width={76} height={100} rx={8} fill={hue} /><rect x={-28} y={-38} width={56} height={40} rx={20} fill="#FFFFFF" opacity={0.6} /><rect x={-28} y={12} width={56} height={8} fill="#FFFFFF" opacity={0.5} /></g> })}
          <g opacity={on(f, freeze43, 8)}>{Array.from({ length: 6 }, (_, k) => <path key={k} d={`M${380 + Math.cos(k) * 160} ${560 + Math.sin(k) * 200} l10 -18 l10 18 l-10 18 Z`} fill="#BDE7EF" opacity={0.85} />)}</g>
        </g>
      </g>}

      {/* # B) the orchard of companies */}
      {B > 0 && <g opacity={B}>
        <Sky id="sv-f-b" f={f} mood="dawn" /><Ground y={GROUND - 20} seed={29} />
        <g transform="translate(960 0)" opacity={on(f, index44, 10)}>
          <path d={`M-760 ${GROUND - 10} L760 ${GROUND - 10} L640 ${GROUND - 470} L-640 ${GROUND - 470} Z`} fill="#9CC48E" />
          <path d={`M-760 ${GROUND - 10} L760 ${GROUND - 10} L760 ${GROUND + 14} L-760 ${GROUND + 14} Z`} fill={C.wood} />
          <g opacity={Math.max(on(f, whole45, 12), win(f, single44, fails45, 8)) * (0.5 + 0.3 * Math.sin(f / 8))}><path d={`M-760 ${GROUND - 10} L760 ${GROUND - 10} L640 ${GROUND - 470} L-640 ${GROUND - 470} Z`} fill="none" stroke={C.goldL} strokeWidth={14} /></g>
          {Array.from({ length: 96 }, (_, k) => { const col = k % 16, row = Math.floor(k / 16), t = row / 5
            const xx = lerp(-640, 640, col / 15) * lerp(0.86, 1, t), yy = lerp(GROUND - 440, GROUND - 40, t)
            const wilt = k === 37 ? on(f, fails45, 14) : 0
            return k < nTrees ? <Tree key={k} x={xx} y={yy} s={lerp(0.28, 0.42, t) * (1 + 0.25 * on(f, grow45, 20) * (k === 37 ? 0 : 1))} grow={on(f, hundreds44 + (k % 24), 10)} wilt={wilt} hue={k} fruit={k === 37 ? 0 : fruit} /> : null })}
          <g opacity={on(f, tiny45, 8) * (1 - on(f, grow45, 8))}>{(() => { const xx = lerp(-640, 640, 5 / 15) * lerp(0.86, 1, 2 / 5), yy = lerp(GROUND - 440, GROUND - 40, 2 / 5); return <circle cx={xx} cy={yy - 30} r={60} fill="none" stroke={C.red} strokeWidth={8} /> })()}</g>
          {f >= spreading46 && Array.from({ length: 14 }, (_, k) => { const t = span(f, spreading46 + k * 2, spreading46 + k * 2 + 26); return t > 0 && t < 1 ? <circle key={k} cx={lerp(0, -620 + k * 95, t)} cy={lerp(GROUND - 520, GROUND - 120 - rnd(k) * 300, t) - 120 * Math.sin(t * Math.PI)} r={9} fill={C.goldD} /> : null })}
        </g>
        <g opacity={on(f, simple44, 8) * (1 - on(f, index44, 8))}><Crate x={960} y={GROUND - 10} w={420} h={250} lid={on(f, one44, 12)} /></g>
        <g opacity={on(f, index44, 10)}><rect x={760} y={GROUND + 20} width={400} height={64} rx={14} fill={C.ink} /><text x={960} y={GROUND + 68} textAnchor="middle" fill="#FFFFFF" style={TXT(48)}>ONE BROAD INDEX FUND</text></g>
        <g opacity={on(f, point46, 10)} transform={`translate(960 ${GROUND - 560 - 12 * pop(f, point46, 12)})`}><rect x={-6} y={-90} width={12} height={110} fill={C.woodD} /><path d="M6 -90 L130 -64 L6 -38 Z" fill={C.terra} /><text x={52} y={-56} textAnchor="middle" fill="#FFFFFF" style={TXT(30)}>1 FUND</text></g>
        <g opacity={on(f, diversification46, 10)}><rect x={1440} y={260} width={420} height={70} rx={16} fill={C.paper} /><text x={1650} y={310} textAnchor="middle" fill={C.ink} style={TXT(50)}>DIVERSIFICATION</text></g>
      </g>}

      {/* # C) the target-date jar: trees (stocks) over stones (bonds), shifting toward the year */}
      {Cc > 0 && <g opacity={Cc}>
        <Sky id="sv-f-c" f={f} mood="noon" /><Ground y={GROUND - 20} seed={31} />
        <g transform="translate(900 0)">
          <g opacity={on(f, target47, 12)}><rect x={-240} y={GROUND - 560} width={480} height={540} rx={50} fill={C.glass} opacity={0.6} stroke="#FFFFFF" strokeWidth={8} /></g>
          <rect x={-200} y={GROUND - 610} width={400} height={50} rx={16} fill={C.woodD} opacity={on(f, target47, 12)} />
          {(() => { const bondH = lerp(150, 380, tdShift) * on(f, bonds47, 12), base = GROUND - 40
            return <g>
              <rect x={-220} y={base - bondH} width={440} height={bondH} rx={30} fill="#7FA7D9" />
              {Array.from({ length: Math.round(bondH / 50) * 4 }, (_, k) => <ellipse key={k} cx={-170 + (k % 4) * 115} cy={base - 25 - Math.floor(k / 4) * 50} rx={44} ry={20} fill="#5D86BD" />)}
              <g opacity={on(f, stocks47, 10)}>{Array.from({ length: 5 }, (_, k) => <Tree key={k} x={-180 + k * 90} y={base - bondH} s={lerp(0.6, 0.45, tdShift)} hue={k} />)}</g>
            </g> })()}
          <g opacity={on(f, stocks47, 8)}><rect x={280} y={GROUND - 520} width={200} height={60} rx={14} fill={C.greenD} /><text x={380} y={GROUND - 476} textAnchor="middle" fill="#FFFFFF" style={TXT(46)}>STOCKS</text></g>
          <g opacity={on(f, bonds47, 8)}><rect x={280} y={GROUND - 200} width={200} height={60} rx={14} fill="#3E68A8" /><text x={380} y={GROUND - 156} textAnchor="middle" fill="#FFFFFF" style={TXT(46)}>BONDS</text></g>
          <g opacity={on(f, mixes47 - 6, 8)}><text x={0} y={GROUND + 60} textAnchor="middle" fill={C.ink} style={TXT(50)}>TARGET-DATE FUND</text></g>
        </g>
        <g opacity={on(f, slowly47, 10)}><g transform={`translate(1600 ${470 - 12 * pop(f, retirement47, 12) + 12})`}><circle r={130} fill={C.paper} stroke={C.terra} strokeWidth={10} />
          <text y={-30} textAnchor="middle" fill={C.ink2} style={TXT(40)}>RETIRE IN</text><text y={50} textAnchor="middle" fill={C.ink} style={TXT(90)}>{yr}</text></g></g>
        <g opacity={on(f, closer47, 8)}><text x={1600} y={690} textAnchor="middle" fill={C.ink} style={TXT(50)}>MORE BONDS, SAFER</text></g>
      </g>}

      {/* # D) the fee: two baskets, two birds; then the decades */}
      {D > 0 && <g opacity={D}>
        <Sky id="sv-f-d" f={f} mood="dawn" /><Ground y={GROUND - 20} seed={33} />
        <g opacity={1 - decades}>
          <g opacity={on(f, expense48, 10)}><Basket x={620} y={GROUND - 20} n={50} label={f >= etfs49 ? 'INDEX ETF 0.14%' : f >= index49 ? 'INDEX FUND' : '$10,000'} /></g>
          <g opacity={on(f, charging50, 10)}><Basket x={1320} y={GROUND - 20} n={50} label={f >= k10b ? '1% · $10,000' : '1% FUND'} /></g>
          <g opacity={on(f, fee48, 10) * (1 - on(f, expense48, 10))}><Coin x={960} y={520} s={1.4} text="FEE" /></g>
          {(() => { const t = span(f, every48, every48 + 24); return t > 0 && t < 1 ? <Coin x={lerp(620, 760, t)} y={lerp(700, 420, t)} s={0.5} o={1 - t} /> : null })()}
          {(() => { const t = span(f, taken48, taken48 + 24); return t > 0 && t < 1 ? <Coin x={lerp(620, 760, t)} y={lerp(700, 420, t)} s={0.5} o={1 - t} /> : null })()}
          <g opacity={win(f, y2025s49, charged49, 6)}><text x={620} y={420} textAnchor="middle" fill={C.ink} style={TXT(48)}>IN 2025</text></g>
          <g opacity={win(f, charged49, d14, 8)}><text x={620} y={420} textAnchor="middle" fill={C.ink} style={TXT(48)}>EVERY YEAR</text></g>
          {/* the birds take their cut */}
          <g opacity={birds}><Bird x={lerp(560, 760, (f % 90) / 90)} y={560 - 40 * Math.sin((f % 90) / 90 * Math.PI)} s={0.55} f={f} />
            <g opacity={on(f, d14, 8)}><rect x={480} y={330} width={280} height={70} rx={16} fill={C.paper} /><text x={620} y={380} textAnchor="middle" fill={C.ink} style={TXT(52)}>$14 A YEAR</text></g></g>
          <g opacity={on(f, charging50, 10)}><Bird x={lerp(1240, 1460, ((f + 30) % 90) / 90)} y={560 - 50 * Math.sin(((f + 30) % 90) / 90 * Math.PI)} s={1.1} f={f} big />
            <g opacity={on(f, d100, 8)}><rect x={1170} y={330} width={300} height={70} rx={16} fill={C.red} /><text x={1320} y={380} textAnchor="middle" fill="#FFFFFF" style={TXT(52)}>$100 A YEAR</text></g></g>
          {(() => { const t = span(f, every50, every50 + 24); return t > 0 && t < 1 ? <Coin x={lerp(1320, 1500, t)} y={lerp(700, 460, t)} s={0.5} o={1 - t} /> : null })()}
          <g opacity={on(f, k10a, 8)}><text x={960} y={GROUND + 60} textAnchor="middle" fill={C.ink} style={TXT(48)}>ON EVERY $10,000</text></g>
          <g opacity={on(f, whether50, 8)}><text x={1320} y={280} textAnchor="middle" fill={C.ink2} style={TXT(42)}>GOOD YEAR OR BAD</text></g>
        </g>
        <g opacity={decades}>
          <g transform={`translate(0 ${-14 * Math.sin(Math.PI * span(f, grow51, grow51 + 16))})`}><Tree x={700} y={GROUND - 20} s={1.2 + 0.8 * span(f, decades51, never51 + 20)} grow={1} fruit={1} /></g>
          {(() => { const t = span(f, taken51, taken51 + 24); return t > 0 && t < 1 ? <Coin x={lerp(1290, 1440, t)} y={lerp(600, 420, t)} s={0.4} o={1 - t} /> : null })()}
          <Tree x={1260} y={GROUND - 20} s={1.2 + 0.45 * span(f, decades51, never51 + 20)} grow={1} fruit={0.6} hue={2} />
          <g transform={`translate(700 ${GROUND + 50})`}><text textAnchor="middle" fill={C.ink} style={TXT(48)}>LOW FEE</text></g>
          <g transform={`translate(1260 ${GROUND + 50})`}><text textAnchor="middle" fill={C.ink} style={TXT(48)}>1% FEE</text></g>
          {(() => { const g = span(f, decades51, never51 + 20), yA = GROUND - 20 - 192 * (1.2 + 0.8 * g), yB = GROUND - 20 - 192 * (1.2 + 0.45 * g)
            return <g opacity={on(f, gap51, 8)}><line x1={780} y1={yA} x2={1000} y2={yA} stroke={C.red} strokeWidth={5} strokeDasharray="10 8" /><line x1={1180} y1={yB} x2={1000} y2={yB} stroke={C.red} strokeWidth={5} strokeDasharray="10 8" />
              <line x1={1000} y1={yA} x2={1000} y2={yB} stroke={C.red} strokeWidth={10} /><text x={1000} y={yA - 24} textAnchor="middle" fill={C.red} style={TXT(50)}>THE GAP</text></g> })()}
          <g opacity={on(f, fees51, 8)}><Bird x={1460} y={420} s={0.9} f={f} big /><text x={1600} y={560} textAnchor="middle" fill={C.ink} style={TXT(46)}>{f >= never51 ? 'FEES NEVER GROW' : 'FEES'}</text></g>
        </g>
      </g>}

      {/* # E) Maya plants: a sapling in the 401(K) crate, $1,000 into a small IRA crate */}
      {E > 0 && <g opacity={E}>
        <Sky id="sv-f-e" f={f} mood="noon" /><Ground y={GROUND - 20} seed={35} />
        <Person f={f} who="investorF" beats={eBeats} x={420} y={GROUND} s={0.88} />
        <Crate x={980} y={GROUND - 10} w={400} h={220} label="401(K)" lid={1} />
        <Tree x={980} y={GROUND - 230} s={0.9} grow={0.3 + 0.2 * on(f, lowfee52, 16) + 0.4 * on(f, k401, 30)} hue={1} />
        <g opacity={on(f, ira52 - 8, 10)}><Crate x={1520} y={GROUND - 10} w={280} h={170} label="IRA" lid={1} /></g>
        {(() => { const t = span(f, leftover52, leftover52 + 24); return t > 0 ? <Coin x={lerp(560, 1520, t)} y={lerp(620, GROUND - 200, t) - 200 * Math.sin(t * Math.PI)} s={0.8} text="$1K" o={1 - span(f, ira52 + 20, ira52 + 30)} /> : null })()}
        <g opacity={on(f, similar52, 10)}><Tree x={1520} y={GROUND - 180} s={0.6} grow={0.4} hue={3} /></g>
      </g>}

      <Headline f={f} lines={[[box42, 'AN ACCOUNT IS JUST A BOX', C.ink, 96], [thousands43, 'THOUSANDS OF CHOICES', C.ink, 96], [index44, 'ONE FUND, HUNDREDS OF COMPANIES', C.ink, 90], [diversification46, 'SPREAD THE RISK', C.ink, 96], [target47, 'A TARGET-DATE FUND', C.ink, 96], [fee48, 'THE FEE: EXPENSE RATIO', C.ink, 96], [four49, '0.14% VS 1%', C.ink, 104], [decades51, 'THE GAP GROWS', C.red, 100], [picks52, 'STEP 4: ONE LOW-FEE FUND', C.greenD, 96]]} />
    </g>
  )
}

export const SV_FUND = makePiece('sv-fund', 'Step four, what to buy: a wooden 401(K) crate sits empty (an account is just a box), the lid opens and a sprout pushes up; Maya freezes in front of a wall of 60 colourful seed packets (thousands of choices); one broad index fund: a walled orchard plot fills with rows of company trees (hundreds, then thousands), one tree wilts (a tiny part), the rest grow and bear gold fruit (profits), the plot glows, seeds spread (diversification); a target-date jar of trees (stocks) over blue stones (bonds), a RETIRE IN dial runs to 2060 and the stones rise (safer); two $10,000 harvest baskets: a sparrow takes $14 a year from the 0.14% index ETF basket, a big crow takes $100 a year from the 1% fund basket; across decades the low-fee tree grows taller than the 1%-fee tree (the gap); Maya plants a sapling in her 401(K) crate and drops her $1,000 coin into a small IRA crate', {
  mood: 'light', Component: Fund,
  beats: ["s42:account", "s42:box", "s42:inside", "s42:grows", "s43:beginners", "s43:freeze", "s43:thousands", "s43:choices", "s44:simple", "s44:index", "s44:owns", "s44:hundreds", "s44:companies", "s45:fails", "s45:tiny", "s45:grow", "s45:profits", "s45:whole", "s46:spreading", "s46:diversification", "s46:point", "s47:401k", "s47:targetdate", "s47:mixes", "s47:stocks", "s47:bonds", "s47:slowly", "s47:closer", "s48:fee", "s48:expense", "s48:taken", "s49:index", "s49:charged", "s49:etfs", "s49:4", "s49:14", "s49:10000", "s50:charging", "s50:100", "s50:whether", "s51:decades", "s51:gap", "s51:fees", "s51:never", "s52:picks", "s52:401k", "s52:leftover", "s52:ira", "s49:2025", "s44:one", "s44:single", "s47:retirement", "s48:every", "s50:10000", "s50:every", "s51:taken", "s51:grow", "s52:lowfee", "s52:similar"],
  sfx: [['s42:inside', 'click', 0.12], ['s43:thousands', 'flutter', 0.1], ['s44:hundreds', 'pop', 0.12], ['s45:fails', 'thud', 0.12], ['s45:profits', 'chime', 0.12], ['s50:100', 'coin', 0.12], ['s52:ira', 'softpop', 0.12]] })
