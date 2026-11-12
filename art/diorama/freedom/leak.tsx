// ---------------------------------------------------------------- s24–s38: step two, a cushion, then the costly debt.
// A) A soft cash cushion appears; a rainy street: Maya's car breaks down (smoke, hood up) and a $400 repair bill pops out.
// B) Her empty wallet; the bill slides onto a credit card that heats up red: ABOUT 22% A YEAR (Federal Reserve hall).
// C) The rainy-day fund: cash under an umbrella, three month pages; a stock ticker falling on the same day is crossed; the cushion is used and refills.
// D) Maya's bucket with a $5,000 card hole: coins leak out (more than $1,100 a year) into a drain; a shopping bag stays empty.
// E) She plugs the hole: +$1,100 kept every year; a sure 22% beats the market's ~10% (two ramps); DEBT door first, then INVEST; a gear starts turning.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { Backdrop, Bucket, Bundle, C, Car, Card, Check, CoinG, Cross, Defs, FONT, Grain, Hall, Rain, Signpost, Stack, Tag, Umbrella, fadeIn, scene } from './kit'

const G = 930

// # a plump cushion made of cash (fabric with a bill pattern)
const Cushion: React.FC<{ x: number; y: number; s?: number; o?: number; full?: number }> = ({ x, y, s = 1, o = 1, full = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s} ${s * lerp(0.45, 1, full)})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={250} ry={22} fill="#000" opacity={0.15} />
    <path d="M-230 -10 Q-250 -150 -150 -170 Q0 -200 150 -170 Q250 -150 230 -10 Q0 20 -230 -10 Z" fill="url(#fr-cashg)" />
    <path d="M-230 -10 Q-250 -150 -150 -170 Q-60 -186 0 -186 Q-120 -150 -170 -20 Z" fill="#fff" opacity={0.18} />
    {[-120, 0, 120].map((bx) => <g key={bx}><circle cx={bx} cy={-90} r={22} fill="none" stroke={C.cashD} strokeWidth={5} /><text x={bx} y={-78} textAnchor="middle" fill={C.cashD} style={{ font: `400 34px ${FONT.big}` }}>$</text></g>)}
    {[[-210, -150], [210, -150], [-220, -20], [220, -20]].map(([cx, cy], k) => <circle key={k} cx={cx} cy={cy} r={12} fill={C.cashD} />)}
  </g>
)
// # a little street: a lamp post, a curb and wet reflections
const Street: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <rect x={0} y={G + 20} width={1920} height={140} fill="#4A5266" />
    <rect x={0} y={G - 6} width={1920} height={26} fill="#9AA3B6" />
    {Array.from({ length: 8 }, (_, k) => <rect key={k} x={60 + k * 250} y={G + 80} width={120} height={10} rx={5} fill="#E9E2C8" opacity={0.55} />)}
    <g transform={`translate(1650 ${G})`}><rect x={-8} y={-520} width={16} height={520} fill="#3A3F50" /><path d="M0 -520 q60 -20 90 20" stroke="#3A3F50" strokeWidth={12} fill="none" /><ellipse cx={92} cy={-490} rx={30} ry={16} fill="#FFE7A6" /><path d={`M62 -486 L10 ${-20} L174 ${-20} L122 -486 Z`} fill="#FFE7A6" opacity={0.12 + 0.03 * Math.sin(f / 10)} /></g>
  </g>
)

const Leak: React.FC<PieceProps> = ({ f, c }) => {
  const safety = c('s24:safety'), cushion24 = c('s24:cushion')
  const tuesday = c('s25:tuesday'), car25 = c('s25:car'), breaks = c('s25:breaks'), repair = c('s25:repair'), four25 = c('s25:four')
  const cash26 = c('s26:cash'), saved26 = c('s26:saved'), credit26 = c('s26:credit'), card26 = c('s26:card')
  const expensive = c('s27:expensive'), balance = c('s27:balance'), banks = c('s27:banks'), twentytwo27 = c('s27:twenty'), federal = c('s27:federal')
  const cushion28 = c('s28:cushion'), rainy = c('s28:rainy'), months = c('s28:months'), safe = c('s28:safe'), boring = c('s28:boring')
  const why29 = c('s29:why'), investments29 = c('s29:investments'), market29 = c('s29:market'), down29 = c('s29:down'), breaks29 = c('s29:breaks')
  const used = c('s30:used'), fills = c('s30:fills'), back30 = c('s30:back')
  const costly = c('s31:costly'), debt31 = c('s31:debt')
  const owes = c('s32:owes'), five32 = c('s32:five'), card32 = c('s32:card'), twenty32 = c('s32:twenty')
  const sits = c('s33:sits'), eleven33 = c('s33:eleven'), interest33 = c('s33:interest')
  const leaves = c('s34:leaves'), pocket = c('s34:pocket'), nothing = c('s34:nothing')
  const pays35 = c('s35:pays'), off35 = c('s35:off'), keeps35 = c('s35:keeps'), eleven35 = c('s35:eleven'), single = c('s35:single')
  const effect = c('s36:effect'), sure = c('s36:sure'), twentytwo36 = c('s36:twenty'), double = c('s36:double'), market36 = c('s36:market'), ten36 = c('s36:ten')
  const why37 = c('s37:why'), expensive37 = c('s37:expensive'), investing37 = c('s37:investing')
  const stopped = c('s38:stopped'), engine = c('s38:engine'), start38 = c('s38:start')

  const AB = c('s26') - 6, BC = c('s28') - 6, CD = c('s31') - 6, DE = c('s35') - 6, EF = c('s37') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = scene(f, CD, DE), E = scene(f, DE, EF), F = fadeIn(f, EF)

  return (
    <g>
      <Defs />
      {/* # A) the cushion, then the Tuesday breakdown */}
      {A > 0 && <g opacity={A}>
        <Backdrop sky="rain" f={f} sun={null} ground={G} />
        <Street f={f} />
        <Rain f={f} o={on(f, c('s25:this'), 20)} n={60} />
        <g opacity={win(f, safety - 6, c('s25:picture'), 8)} transform={`translate(0 ${-30 * (1 - pop(f, cushion24, 16))})`}><Cushion x={960} y={G - 40} s={1.2} /></g>
        <g opacity={on(f, car25 - 6, 10)}><Car x={lerp(1300, 900, on(f, car25 - 6, 24))} y={G + 40} f={f} s={1} broken={on(f, breaks, 12)} /></g>
        <Person f={f} who="investorF" beats={[[0, 'idle', 'neutral'], [breaks, 'shock', 'shocked'], [repair, 'facepalm', 'worried']]} x={390} y={G + 40} s={0.95} o={on(f, car25, 10)} />
        <g opacity={on(f, repair - 2, 8)} transform={`translate(900 ${G - 430 - 40 * pop(f, repair, 14)}) rotate(4)`}>
          <rect x={-130} y={-80} width={260} height={160} rx={14} fill="#fff" stroke={C.red} strokeWidth={6} />
          <text y={-26} textAnchor="middle" fill={C.inkSoft} style={{ font: `400 32px ${FONT.big}`, letterSpacing: 2 }}>REPAIR BILL</text>
          <text y={50} textAnchor="middle" fill={C.red} style={{ font: `400 80px ${FONT.big}` }} opacity={on(f, four25, 6)}>$400</text>
        </g>
      </g>}

      {/* # B) no cash saved: the bill lands on a credit card; ~22% a year */}
      {B > 0 && <g opacity={B}>
        <Backdrop sky="rain" f={f} sun={null} ground={G} />
        <Rain f={f} o={0.6} n={40} />
        <Person f={f} who="investorF" beats={[[0, 'emptyPockets', 'worried'], [credit26, 'holdUp', 'neutral'], [expensive, 'shock', 'shocked'], [federal, 'nervous', 'worried']]} x={420} y={G} s={0.95} />
        <Tag x={420} y={G - 570} text="NO CASH SAVED" size={40} o={win(f, cash26, credit26 + 10, 8)} color={C.red} ink="#fff" />
        <g transform={`translate(${lerp(420, 980, span(f, credit26, card26 + 10))} ${lerp(G - 640, G - 400, span(f, credit26, card26 + 10))}) scale(${lerp(0.6, 0.45, span(f, credit26, card26 + 10))})`} opacity={on(f, cash26 - 4, 8) * (1 - on(f, card26 + 10, 8))}>
          <rect x={-130} y={-80} width={260} height={160} rx={14} fill="#fff" stroke={C.red} strokeWidth={6} /><text y={30} textAnchor="middle" fill={C.red} style={{ font: `400 80px ${FONT.big}` }}>$400</text></g>
        <g opacity={on(f, credit26 - 4, 10)}><Card x={1000} y={G - 360} s={1.5 + 0.08 * win(f, c('s27:cards'), c('s27:cards') + 16, 6)} hot={on(f, expensive, 14)} /></g>
        <Tag x={1000} y={G - 610} text="ABOUT 22% A YEAR" size={50} o={on(f, twentytwo27, 8)} color={C.red} ink="#fff" />
        <Tag x={1000} y={G - 150} text="ON CARDS THAT CARRY A BALANCE" size={34} o={on(f, balance, 8)} point="none" />
        <g opacity={on(f, federal - 6, 10)}><Hall x={1600} y={G} s={0.62} text="FEDERAL RESERVE" /></g>
      </g>}

      {/* # C) the rainy-day fund: cash under an umbrella; not investments; refill after use */}
      {Cc > 0 && <g opacity={Cc}>
        <Backdrop sky="rain" f={f} sun={null} ground={G} />
        <Rain f={f} o={0.7} n={60} />
        <Umbrella x={760} y={G} s={1.05} open={on(f, rainy - 8, 14)} />
        <Cushion x={760} y={G - 10} s={0.8} full={lerp(1, 0.25, on(f, used, 12)) + 0.75 * on(f, fills, 30) + 0.06 * win(f, back30, back30 + 14, 6)} o={on(f, cushion28 - 4, 10)} />
        <Tag x={760} y={G - 470} text="RAINY DAY FUND" size={44} o={on(f, rainy, 8)} />
        <g opacity={win(f, c('s28:surprises'), months, 6)} transform={`translate(1040 ${G - 120}) rotate(6)`}><rect x={-70} y={-44} width={140} height={88} rx={10} fill="#fff" stroke={C.red} strokeWidth={4} /><text y={18} textAnchor="middle" fill={C.red} style={{ font: `400 50px ${FONT.big}` }}>$400</text></g>
        {[0, 1, 2].map((k) => <g key={k} opacity={win(f, months + k * 4, why29, 8)} transform={`translate(${1220 + k * 150} ${G - 260})`}><rect x={-60} y={-70} width={120} height={140} rx={10} fill="#fff" /><rect x={-60} y={-70} width={120} height={34} rx={10} fill={C.terra} /><text y={40} textAnchor="middle" fill={C.ink} style={{ font: `400 56px ${FONT.big}` }}>{k + 1}</text></g>)}
        <Tag x={1370} y={G - 90} text="A FEW MONTHS OF SPENDING" size={36} o={win(f, months, why29, 8)} point="none" />
        <g opacity={win(f, safe - 4, why29, 8)}><Stack x={1370} y={G + 60} n={0} /><Tag x={1370} y={G + 60} text="SAFE AND BORING" size={36} o={on(f, boring, 8)} point="none" color={C.sage} ink="#fff" /></g>
        <g opacity={win(f, investments29 - 4, used - 2, 8)}>
          <g transform={`translate(1370 ${G - 290})`}><rect x={-200} y={-140} width={400} height={240} rx={18} fill="#232A3E" />
            <path d={`M-170 -80 L-90 -40 L-20 -90 L40 ${-90 + 160 * on(f, down29, 16)} L110 ${-60 + 160 * on(f, down29, 16)} L170 ${-50 + 170 * on(f, down29, 16)}`} fill="none" stroke={f >= down29 ? C.red : C.cash} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" />
            <text x={0} y={90} textAnchor="middle" fill="#fff" style={{ font: `400 36px ${FONT.big}`, letterSpacing: 2 }}>INVESTMENTS</text></g>
          <Cross x={1370} y={G - 300} r={160} p={on(f, investments29 + 6, 12)} />
          <g opacity={on(f, breaks29 - 4, 8)}><Car x={1370} y={G + 40} f={f} s={0.45} broken={1} /></g>
        </g>
        <Person f={f} who="investorF" beats={[[0, 'present', 'smiling'], [c('s28:first'), 'countOne', 'smiling'], [why29, 'think', 'thinking'], [used, 'reachDown', 'neutral'], [c('s30:cushion'), 'point', 'neutral'], [fills, 'thumbsUp', 'smiling'], [c('s30:moving'), 'confident', 'smiling']]} x={300} y={G} s={0.9} />
        <Tag x={1370} y={G - 300} text={f >= fills ? 'REFILLED' : 'USED'} size={54} o={on(f, used + 4, 8)} color={f >= fills ? C.cashD : C.terra} ink="#fff" point="none" />
      </g>}

      {/* # D) the costly debt: a hole in Maya's bucket */}
      {D > 0 && <g opacity={D}>
        <Backdrop sky="rain" f={f} sun={null} ground={G} />
        <g transform={`translate(900 ${G}) scale(${0.92 + 0.08 * pop(f, debt31, 14)}) translate(-900 ${-G})`}><Bucket x={900} y={G} f={f} level={0.7 - 0.15 * span(f, sits, nothing + 30)} hole={on(f, owes, 10)} s={1.25} /></g>
        <g opacity={on(f, card32 - 4, 8)}><Card x={1300} y={G - 470} s={0.9} hot={1} r={6} /><Tag x={1300} y={G - 620} text={f >= twenty32 ? '$5,000 AT 22%' : '$5,000'} size={42} o={on(f, five32, 8)} color={C.red} ink="#fff" /></g>
        <g opacity={on(f, sits - 4, 10)}>
          <rect x={1230} y={G + 30} width={260} height={30} rx={8} fill="#2E3446" />{[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={1245 + k * 42} y={G + 36} width={22} height={18} rx={3} fill="#151926" />)}
          <Tag x={1360} y={G - 140} text="MORE THAN $1,100 A YEAR" size={44} o={on(f, eleven33, 8)} color={C.red} ink="#fff" />
        </g>
        <g opacity={on(f, c('s34:buys') - 4, 8)}><g transform={`translate(380 ${G})`}><path d="M-80 0 L-96 -190 L96 -190 L80 0 Z" fill="#E7D3B0" /><path d="M-40 -190 Q-40 -250 0 -250 Q40 -250 40 -190" fill="none" stroke="#B88A5A" strokeWidth={10} /></g>
          <Cross x={380} y={G - 110} r={120} p={on(f, nothing + 4, 12)} /><Tag x={380} y={G - 320} text="BUYS NOTHING" size={38} o={on(f, nothing, 8)} /></g>
        <Person f={f} who="investorF" beats={[[0, 'nervous', 'worried'], [eleven33, 'shock', 'shocked'], [interest33, 'despair', 'worried'], [leaves, 'emptyPockets', 'worried']]} x={520} y={G} s={0.9} o={1 - on(f, c('s34:buys') - 8, 8)} />
      </g>}

      {/* # E) she pays it off: the hole is plugged, $1,100 stays every year */}
      {E > 0 && <g opacity={E}>
        <Backdrop sky="day" f={f} sun={[1700, 240]} ground={G} />
        <g opacity={1 - on(f, effect - 4, 10)}>
          <Bucket x={900} y={G} f={f} level={0.55 + 0.25 * span(f, keeps35, single + 20)} hole={1} plug={on(f, off35, 14)} s={1.25} />
          <Person f={f} who="investorF" beats={[[0, 'push', 'neutral'], [off35, 'fistPump', 'smiling'], [keeps35, 'thumbsUp', 'smiling'], [single, 'celebrate', 'smiling']]} x={1380} y={G} s={0.9} flip o={on(f, DE + 14, 8)} />
          <Tag x={900} y={G - 470} text="+$1,100 KEPT EVERY YEAR" size={46} o={on(f, eleven35, 8)} color={C.cashD} ink="#fff" />
        </g>
        <g opacity={on(f, effect - 4, 10)}>
          {[[0, 22.36, C.cash, 'PAYING OFF THE CARD', 'A SURE ~22%', twentytwo36], [1, 10.02, C.skyD, 'STOCK MARKET AVERAGE', 'ABOUT 10%', ten36]].map(([k, v, col, lab, val, at]) => {
            const h = (v as number) * 26 * on(f, at as number, 20) + (k === 0 ? 14 * win(f, c('s36:more'), c('s36:more') + 14, 5) : 0), x = 640 + (k as number) * 640
            return <g key={k as number} opacity={on(f, k === 0 ? effect - 4 : (at as number) - 8, 8)}>
              <rect x={x - 130} y={G - h} width={260} height={h} rx={14} fill={col as string} /><rect x={x - 130} y={G - h} width={60} height={h} rx={10} fill="#fff" opacity={0.18} />
              <Tag x={x} y={G - h - 60} text={val as string} size={46} o={on(f, (at as number) + 8, 8)} />
              <Tag x={x} y={G + 70} text={k === 1 && f >= c('s36:inflation') ? 'MARKET AVERAGE, BEFORE INFLATION' : lab as string} size={34} o={on(f, k === 0 ? c('s36:paying') : market36, 8)} point="none" />
            </g> })}
          <Check x={850} y={G - 650} r={40} p={on(f, sure, 8) * (1 - on(f, why37 - 6, 6))} />
          <Tag x={1280} y={420} text="MORE THAN DOUBLE" size={50} o={on(f, double, 8)} color={C.gold} point="none" />
        </g>
      </g>}

      {/* # F) debt before investing; the engine starts */}
      {F > 0 && <g opacity={F}>
        <Backdrop sky="day" f={f} sun={[1700, 240]} ground={G} />
        <Signpost x={620} y={G} text="CLEAR DEBT" n={1} lit={on(f, expensive37, 8)} s={1.3} o={on(f, why37 - 4, 8)} />
        <Signpost x={1100} y={G} text="INVEST" n={2} lit={on(f, investing37, 8)} s={1.3} o={on(f, investing37 - 6, 8)} />
        <g opacity={on(f, engine - 6, 10)} transform={`translate(1560 ${G - 240})`}>
          {[[0, 0, 120, 1], [150, 110, 70, -1.7]].map(([gx, gy, r, dir], k) => <g key={k} transform={`translate(${gx} ${gy}) rotate(${(dir as number) * on(f, start38 - 6, 20) * (f - start38) * 2})`}>
            {Array.from({ length: 10 }, (_, j) => <rect key={j} x={-14} y={-(r as number) - 24} width={28} height={36} rx={4} fill={C.goldD} transform={`rotate(${j * 36})`} />)}
            <circle r={r as number} fill="url(#fr-goldg)" /><circle r={(r as number) * 0.35} fill={C.goldD} /></g>)}
        </g>
        <Person f={f} who="investorF" beats={[[0, 'explain', 'neutral'], [stopped, 'relief', 'smiling'], [engine, 'pointUp', 'smiling']]} x={300} y={G} s={0.9} />
      </g>}

      <Headline f={f} lines={[[safety, 'STEP 2: A SAFETY CUSHION', C.ink, 100], [repair, 'A SURPRISE BILL', C.redD, 104], [cash26, 'NO CASH? IT GOES ON A CARD', C.ink, 96], [cushion28, 'CASH FIRST, FOR SURPRISES', C.cashD, 100],
        [costly, 'THEN: THE COSTLY DEBT', C.redD, 104], [pays35, 'PAY IT OFF, KEEP THE INTEREST', C.cashD, 96], [why37, 'DEBT BEFORE INVESTING', C.ink, 104]]} />
      <Grain />
    </g>
  )
}

const BEATS = ["s36:more", "s36:inflation", "s25:picture", "s25:this", "s27:cards", "s28:first", "s28:surprises", "s30:cushion", "s30:back", "s30:moving", "s31:debt", "s32:twenty", "s33:interest", "s34:buys", "s35:single", "s36:paying", "s36:market", 's24:cushion', 's25:tuesday', 's25:car', 's25:breaks', 's25:repair', 's25:four', 's26:cash', 's26:saved', 's26:credit', 's26:card', 's27:expensive', 's27:balance', 's27:twenty', 's27:federal',
  's28:cushion', 's28:rainy', 's28:months', 's28:safe', 's28:boring', 's29:why', 's29:investments', 's29:market', 's29:down', 's29:breaks', 's30:used', 's30:fills', 's31:costly', 's32:owes', 's32:five', 's32:card',
  's33:sits', 's33:eleven', 's34:leaves', 's34:nothing', 's35:pays', 's35:off', 's35:keeps', 's35:eleven', 's36:effect', 's36:sure', 's36:twenty', 's36:double', 's36:ten', 's37:why', 's37:expensive', 's37:investing', 's38:stopped', 's38:engine', 's38:start']
export const FR_LEAK = makePiece('fr-leak', 'Freedom step two: a plump cash cushion; a rainy street, Maya\'s car breaks down (smoke) and a $400 REPAIR BILL pops; NO CASH SAVED, the bill lands on a credit card that glows red, ABOUT 22% A YEAR, Federal Reserve hall; cash cushion under an umbrella (RAINY DAY FUND), month pages 1-2-3, SAFE AND BORING, a falling INVESTMENTS screen crossed beside the broken car, the cushion is USED then REFILLED; a bucket with a $5,000 AT 22% card hole leaking coins into a drain, MORE THAN $1,100 A YEAR, an empty shopping bag crossed; Maya plugs the hole, +$1,100 KEPT EVERY YEAR; two bars: a sure ~22% vs the market\'s ~10%, MORE THAN DOUBLE; CLEAR DEBT then INVEST signposts; gears start turning', {
  mood: 'light', Component: Leak, beats: BEATS,
  sfx: [['s25:breaks', 'crack', 0.2], ['s25:repair', 'thud', 0.18], ['s27:twenty', 'impact', 0.15], ['s28:rainy', 'swish', 0.15], ['s30:fills', 'cash', 0.15], ['s33:eleven', 'coin', 0.15], ['s35:off', 'thump', 0.2], ['s36:double', 'ding', 0.15], ['s38:engine', 'click', 0.18]] })
