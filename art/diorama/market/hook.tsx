// ---------------------------------------------------------------- s1–s8: the hook (morning, Market Street).
// A) You (hero) on the street with your phone; two account boxes appear (401(K), IRA), coins drop in, and a pipe runs
//    from them into a grand STOCK MARKET hall; then a crowd of 100 townsfolk, 62 light up (own stock).
// B) A share certificate with a question mark, a jumping price line, the crowd goes quiet ("…"); a thick jargon book;
//    a slot machine and a top hat appear (gambling for rich people in suits?) — crossed.
// C) The bakery on your street: a grid covers its front, one tiny piece lifts out toward you, a coin of profit pops out;
//    then six shop signs along the street light one by one — the six steps.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { BB, Bakery, Coin, Folk, Label, M, No, Phone, Share, Slot, TopHat, Town } from './kit'

const G = 940

const Box: React.FC<{ x: number; y: number; o?: number; label: string; coins: number }> = ({ x, y, o = 1, label, coins }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-110} y={-150} width={220} height={150} rx={14} fill={M.wood} /><rect x={-110} y={-150} width={220} height={30} rx={10} fill={M.woodD} />
    <rect x={-70} y={-104} width={140} height={54} rx={10} fill={M.paper} /><text y={-64} textAnchor="middle" fill={M.ink} style={BB(42)}>{label}</text>
    {Array.from({ length: coins }, (_, k) => <circle key={k} cx={-60 + k * 30} cy={-160} r={14} fill={M.gold} stroke={M.goldD} strokeWidth={3} />)}
  </g>
)
const Hall: React.FC<{ x: number; y: number; s?: number; o?: number; glow?: number }> = ({ x, y, s = 1, o = 1, glow = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {glow > 0 && <ellipse cy={-220} rx={360} ry={280} fill={M.butter} opacity={0.25 * glow} />}
    <rect x={-300} y={-60} width={600} height={60} fill={M.stoneD} /><rect x={-280} y={-380} width={560} height={320} fill={M.cream} />
    {Array.from({ length: 6 }, (_, k) => <rect key={k} x={-250 + k * 96} y={-370} width={40} height={310} fill="#E4D3B5" />)}
    <path d="M-320 -380 L0 -520 L320 -380 Z" fill={M.stone} /><text y={-410} textAnchor="middle" fill={M.ink} style={BB(52)}>STOCK MARKET</text>
  </g>
)

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const own1 = c('s1:own'), stocks1 = c('s1:stocks'), know1 = c('s1:know')
  const k401 = c('s2:401k'), ira2 = c('s2:ira'), work2 = c('s2:work'), bank2 = c('s2:bank'), chance2 = c('s2:chance'), money2 = c('s2:money'), stock2 = c('s2:stock'), now2 = c('s2:now')
  const p62 = c('s3:62'), americans3 = c('s3:americans'), counting3 = c('s3:counting'), accounts3 = c('s3:accounts')
  const ask4 = c('s4:ask'), actually4 = c('s4:actually'), jumps4 = c('s4:jumps'), every4 = c('s4:every'), quiet4 = c('s4:quiet')
  const fault5 = c('s5:fault'), never5 = c('s5:never'), simply5 = c('s5:simply')
  const thinking6 = c('s6:thinking'), gambling6 = c('s6:gambling'), rich6 = c('s6:rich'), suits6 = c('s6:suits'), not6 = c('s6:not'), okay6 = c('s6:okay')
  const imagine7 = c('s7:imagine'), slice7 = c('s7:slice'), bakery7 = c('s7:bakery'), street7 = c('s7:street'), paid7 = c('s7:paid'), profit7 = c('s7:profit'), idea7 = c('s7:idea')
  const six8 = c('s8:six'), steps8 = c('s8:steps'), share8 = c('s8:share'), pays8 = c('s8:pays'), works8 = c('s8:works'), move8 = c('s8:move'), news8 = c('s8:news'), time8 = c('s8:time'), risk8 = c('s8:risk')

  const AB = ask4 - 6, BC = imagine7 - 6
  const A = win(f, 0, AB), B = win(f, AB - 8, BC), Cc = on(f, BC - 8, 10)
  const crowd = on(f, p62 - 4, 12)

  const aBeats: Beat[] = [[0, 'phone', 'neutral'], [know1, 'shrug', 'thinking'], [k401, 'point', 'neutral'], [bank2, 'pointUp', 'neutral'], [now2, 'shock', 'shocked']]
  const bBeats: Beat[] = [[AB, 'scratchHead', 'thinking'], [jumps4, 'nervous', 'worried'], [fault5, 'stop', 'smiling'], [never5, 'shrug', 'neutral'], [thinking6, 'think', 'thinking'], [not6, 'crossNoA', 'smiling', 'crossNoB', 12], [okay6, 'explain', 'smiling']]
  const cBeats: Beat[] = [[BC, 'explain', 'smiling'], [slice7, 'reachUp', 'smiling'], [paid7, 'receive', 'smiling'], [idea7, 'thumbsUp', 'smiling'], [six8, 'present', 'smiling'], [risk8, 'thumbsUp', 'smiling']]
  const lift = on(f, slice7, 18)
  const signs = [share8, pays8, works8, move8, news8, time8]
  const SIGN = ['A SHARE', 'IT PAYS', 'THE MARKET', 'PRICES', 'THE NEWS', 'TIME']

  return (
    <g>
      <Town id="mk-h-base" f={f} mood="morning" />
      {/* # A) your accounts flow into the stock market */}
      {A > 0 && <g opacity={A}>
        <Town id="mk-h-a" f={f} mood="morning" />
        <g opacity={1 - crowd}>
          <Person f={f} who="hero" beats={aBeats} x={300} y={G} s={0.85} />
          <Phone x={470} y={560} s={0.6} price="$" title="MY ACCOUNT" o={win(f, own1, k401, 8)} line={on(f, stocks1, 20)} />
          <Box x={760} y={G} label="401(K)" coins={f >= money2 ? 4 : 0} o={on(f, k401, 10)} />
          <Box x={1010} y={G} label="IRA" coins={f >= money2 ? 3 : 0} o={on(f, ira2, 10)} />
          <g opacity={on(f, work2, 8) * (1 - on(f, chance2, 8))}><Label x={760} y={G - 260} text="AT WORK" size={40} /></g>
          <g opacity={on(f, bank2, 8) * (1 - on(f, chance2, 8))}><Label x={1010} y={G - 260} text="AT THE BANK" size={40} /></g>
          <g opacity={on(f, stock2, 12)}>
            <path d={`M 880 ${G - 150} Q 1100 ${G - 420} 1340 ${G - 300}`} fill="none" stroke="#9AA6B2" strokeWidth={22} strokeLinecap="round" />
            {[0, 1, 2].map((k) => { const t = ((f - stock2) / 36 + k / 3) % 1; return <Coin key={k} x={lerp(880, 1340, t)} y={lerp(G - 150, G - 300, t) - 200 * Math.sin(t * Math.PI)} s={0.4} /> })}
          </g>
          <Hall x={1560} y={G} s={0.9} o={on(f, stock2 - 4, 12)} glow={on(f, now2, 10)} />
        </g>
        {/* 100 townsfolk, 62 light up */}
        <g opacity={crowd}>
          {Array.from({ length: 100 }, (_, k) => { const col = k % 20, row = Math.floor(k / 20), lit = k < 62 && f >= p62 + (k / 62) * 14
            return <Folk key={k} x={330 + col * 66} y={420 + row * 110} s={1.2} c={lit ? M.teal : '#B9B2A6'} o={on(f, p62 - 4 + k * 0.2, 6)} /> })}
          <g opacity={on(f, americans3, 8)}><Label x={700} y={G - 40} text="62 IN 100 OWN STOCK" size={52} fill={M.tealD} ink="#FFFFFF" /></g>
          <g opacity={on(f, counting3, 8)}>{[0, 1, 2].map((k) => <rect key={k} x={1290 + k * 70} y={G - 80 - 8 * pop(f, accounts3 + k * 4, 12)} width={56} height={40} rx={6} fill={M.wood} />)}
            <text x={1360} y={G - 100} textAnchor="middle" fill={M.ink} style={BB(40)}>401(K) · IRA · FUNDS</text></g>
        </g>
      </g>}

      {/* # B) the questions: what is a stock? gambling? */}
      {B > 0 && <g opacity={B}>
        <Town id="mk-h-b" f={f} mood="noon" />
        <Person f={f} who="hero" beats={bBeats} x={330} y={G} s={0.85} />
        <g opacity={win(f, ask4, gambling6, 10)}>
          <Share x={900} y={520} s={1.1} r={-4} o={on(f, actually4 - 4, 10)} />
          <g opacity={on(f, actually4, 8)} transform={`translate(1060 ${380 + 6 * Math.sin(f / 8)})`}><circle r={52} fill={M.butter} /><text y={30} textAnchor="middle" fill={M.ink} style={BB(84)}>?</text></g>
          <g opacity={on(f, jumps4, 10)} transform="translate(1340 520)"><rect x={-200} y={-140} width={400} height={260} rx={20} fill="#22252E" />
            <path d={`M-170 60 ${Array.from({ length: 12 }, (_, k) => `L${-170 + k * 30} ${40 * Math.sin(k * 1.7 + (f >= every4 ? f / 5 : 0))}`).join(' ')}`} fill="none" stroke={M.green} strokeWidth={6} /></g>
          <g opacity={on(f, quiet4, 8)}>{[0, 1, 2].map((k) => <g key={k}><Folk x={760 + k * 120} y={G} s={1.6} c={['#C27A5E', M.teal, '#7C6BAA'][k]} /><g transform={`translate(${790 + k * 120} ${G - 170})`}><rect x={-34} y={-24} width={68} height={40} rx={18} fill="#FFFFFF" /><text y={8} textAnchor="middle" fill={M.ink2} style={BB(36)}>…</text></g></g>)}</g>
          {/* a thick jargon book */}
          <g opacity={win(f, never5, gambling6, 8)} transform={`translate(1500 ${G - 120}) rotate(-6)`}><rect x={-130} y={-180} width={260} height={180} rx={10} fill="#5A4A82" /><rect x={-120} y={-30} width={240} height={30} fill="#EFE7DA" />
            <text y={-110} textAnchor="middle" fill="#FFFFFF" style={BB(40)}>JARGON</text><text y={-66} textAnchor="middle" fill="#FFFFFF" style={BB(30)}>VOL. 12</text></g>
          <g opacity={on(f, simply5, 8) * (1 - on(f, gambling6, 6))}><No x={1500} y={G - 210} r={130} o={1} /></g>
        </g>
        <g opacity={on(f, gambling6, 10)}>
          <Slot x={1000} y={G} s={1.15} f={f} />
          <TopHat x={1400} y={G - 200} s={1.1} o={on(f, rich6, 10)} />
          <g opacity={on(f, suits6, 10)}><rect x={1330} y={G - 190} width={140} height={190} rx={20} fill="#2A2A30" /><path d="M1400 -190 L1380 -120 L1400 -60 L1420 -120 Z" transform={`translate(0 ${G})`} fill={M.red} /></g>
          <No x={1200} y={G - 230} r={190} o={on(f, not6, 10)} />
        </g>
      </g>}

      {/* # C) a slice of the bakery on your street; six signs */}
      {Cc > 0 && <g opacity={Cc}>
        <Town id="mk-h-c" f={f} mood="morning" />
        <g opacity={1 - on(f, six8, 12)}>
          <Bakery x={1150} y={G} s={1.05} f={f} grid={on(f, slice7 - 6, 14)} lift={lift} o={on(f, bakery7 - 10, 10)} glow={on(f, street7, 10) * (1 - lift)} />
          <Person f={f} who="hero" beats={cBeats} x={420} y={G} s={0.85} />
          {f >= paid7 && (() => { const t = span(f, paid7, paid7 + 22); return t < 1 ? <Coin x={lerp(1120, 600, t)} y={lerp(560, 600, t) - 160 * Math.sin(t * Math.PI)} s={0.7} /> : <Coin x={600} y={600} s={0.7} /> })()}
          <g opacity={on(f, profit7, 8)}><Label x={1150} y={G + 60} text="A SLICE OF THE PROFIT" size={44} /></g>
        </g>
        {/* six shop signs along the street */}
        <g opacity={on(f, six8, 12)}>
          {SIGN.map((t, k) => { const a = signs[k], x = 250 + k * 285
            return <g key={k} transform={`translate(${x} ${G})`}>
              <rect x={-110} y={-420} width={220} height={420} fill={k % 2 ? '#E9CDA9' : M.plaster} />
              <path d={`M-130 -420 L0 -500 L130 -420 Z`} fill={k % 2 ? M.brickD : '#9C6555'} />
              <rect x={-40} y={-140} width={80} height={140} rx={6} fill={M.wood} />
              <g transform={`translate(0 ${-300 - 10 * pop(f, a, 12) + 10})`}><rect x={-100} y={-40} width={200} height={72} rx={12} fill={f >= a ? M.butter : M.paper} stroke={M.woodD} strokeWidth={4} />
                <text y={10} textAnchor="middle" fill={M.ink} style={BB(t.length > 8 ? 36 : 42)}>{t}</text></g>
              <circle cx={0} cy={-200} r={28} fill={f >= a ? M.ink : '#B9B2A6'} /><text y={-189} textAnchor="middle" fill="#FFFFFF" style={BB(36)}>{k + 1}</text>
            </g> })}
        </g>
      </g>}

      <Headline f={f} lines={[[own1, 'YOU PROBABLY OWN STOCKS', M.ink, 96], [p62, '62% OF AMERICANS', M.tealD, 100], [actually4, 'WHAT IS A STOCK?', M.ink, 100], [gambling6, 'JUST GAMBLING?', M.redD, 100], [imagine7, 'A SLICE OF A REAL BUSINESS', M.ink, 96], [steps8, '6 SMALL STEPS', M.ink, 104]]} />
    </g>
  )
}

export const MK_HOOK = makePiece('mk-hook', 'Stock-market hook on Market Street: you on the street with your phone, a 401(K) and an IRA box fill with coins and pipe into a grand STOCK MARKET hall; a crowd of 100 townsfolk where 62 light up (own stock, counting 401(k)/IRA/funds); a share certificate with a question mark, a jumping price screen, quiet townsfolk with "…" bubbles, a JARGON book crossed; a slot machine, top hat and suit (gambling for rich people?) crossed; the bakery on your street gets a grid and one tiny piece lifts out, a coin of profit flies to you; six shop signs light up for the six steps', {
  mood: 'light', Component: Hook,
  beats: ["s1:own", "s1:stocks", "s1:know", "s2:401k", "s2:ira", "s2:work", "s2:bank", "s2:chance", "s2:money", "s2:stock", "s2:now", "s3:62", "s3:americans", "s3:counting", "s3:accounts", "s4:ask", "s4:actually", "s4:jumps", "s4:every", "s4:quiet", "s5:fault", "s5:never", "s5:simply", "s6:thinking", "s6:gambling", "s6:rich", "s6:suits", "s6:not", "s6:okay", "s7:imagine", "s7:slice", "s7:bakery", "s7:street", "s7:paid", "s7:profit", "s7:idea", "s8:six", "s8:share", "s8:pays", "s8:works", "s8:move", "s8:news", "s8:time", "s8:risk"],
  sfx: [['s2:money', 'coin', 0.12], ['s3:62', 'pop', 0.12], ['s6:not', 'thud', 0.14], ['s7:slice', 'swish', 0.12], ['s7:paid', 'coin', 0.14]] })
