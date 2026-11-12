// ============================================================
// db-y2000 (s70–s79, cream): the second chance. A) the year page flips
// 1835 → 2000; four coin stacks for the surplus years 1998–2001; a +$236B sack.
// B) lenders hand bonds back to the Treasury and get coins; the "owed to outside
// lenders" column shrinks $3.79T (1997) → $3.34T (2001).  C) a Senate hearing:
// the Fed chair at the witness desk, three senators; 2010 "on track"; his worry:
// with the debt at $0 the extra money buys share certificates from factories —
// crossed out (never happened); by September 2002 the column climbs to $3.55T.
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece } from '../registry'
import { Mini } from '../../rig/Mini'
import { type Beat, fly, Headline, Person, win } from '../aimoney/common'
import { Bond, bump, C, Coin, Column, CoinStack, Counter, Defs, Sack, Street, Treasury, YearPage , Backdrop } from './kit'

const GROUND = 880
// # a factory with a sawtooth roof and a chimney (a private company)
const Factory: React.FC<{ x: number; y: number; s?: number; o?: number; f: number }> = ({ x, y, s = 1, o = 1, f }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-200} y={-220} width={400} height={220} fill="#8FA3B8" />
    {[0, 1, 2, 3].map((k) => <path key={k} d={`M${-200 + k * 100} -220 L${-200 + k * 100} -290 L${-100 + k * 100} -220 Z`} fill="#6F8399" />)}
    <rect x={120} y={-360} width={40} height={140} fill="#6F8399" />
    {[0, 1, 2].map((k) => <circle key={k} cx={140 + Math.sin(f / 20 + k) * 8} cy={-390 - k * 34 - ((f / 2) % 34)} r={18 + k * 4} fill="#E9E4DA" opacity={0.7 - k * 0.2} />)}
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-170 + k * 90} y={-160} width={60} height={60} rx={4} fill={C.glow} opacity={0.8} />)}
  </g>
)
// # a share certificate (green border, "SHARE")
const Share: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-100} y={-64} width={200} height={128} rx={8} fill="#F1F7EE" stroke={C.forest} strokeWidth={5} /><Label x={0} y={14} text="SHARE" size={40} font="Bebas Neue" color={C.forest} />
  </g>
)
// # the hearing desk: a long table with name plates
const Desk: React.FC<{ x: number; y: number; w: number; label?: string }> = ({ x, y, w, label }) => (
  <g><rect x={x - w / 2} y={y - 120} width={w} height={120} fill={C.woodD} /><rect x={x - w / 2 - 10} y={y - 132} width={w + 20} height={18} rx={4} fill={C.wood} />
    {label && <g><rect x={x - 90} y={y - 100} width={180} height={50} rx={6} fill={C.parch} /><Label x={x} y={y - 64} text={label} size={34} font="Bebas Neue" color={C.sepia} /></g>}</g>
)

const Y2000: React.FC<{ f: number; c: (k: string) => number }> = ({ f, c }) => {
  const later = c('s70:later'), another = c('s70:another'), chance = c('s70:chance')
  const gov71 = c('s71:government'), four = c('s71:four'), row = c('s71:row')
  const y2000 = c('s72:2000'), collected = c('s72:collected'), d236 = c('s72:236')
  const used = c('s73:used'), buy = c('s73:buy'), bonds73 = c('s73:bonds'), lenders73 = c('s73:lenders')
  const between = c('s74'), fell = c('s74:fell'), d379 = c('s74:379'), d334 = c('s74:334')
  const january = c('s75:january'), federal = c('s75:federal'), senate = c('s75:senate'), track = c('s75:track'), y2010 = c('s75:2010')
  const worry76 = c('s76:worry'), unusual = c('s76:unusual')
  const zero = c('s77:zero'), kept77 = c('s77:kept'), buying = c('s77:buying'), shares = c('s77:shares'), companies = c('s77:companies')
  const never78 = c('s78:never'), true78 = c('s78:true')
  const ended = c('s79:ended'), september = c('s79:september'), climbing = c('s79:climbing'), d355 = c('s79:355')
  const A = win(f, c('s70') - 20, used), B = win(f, used, january), D1 = win(f, january, zero), D2 = on(f, zero, 8)
  const chair: Beat[] = [[0, 'talk', 'neutral'], [c('s75:greenspan'), 'explain', 'neutral'], [track, 'present', 'smiling'], [y2010, 'pointUp', 'smiling'], [unusual, 'nervous', 'worried']]
  return (
    <g>
      <Defs />
      <Stage id="db-y2000" frame={f} />
      <Headline f={f} lines={[[later, 'ANOTHER CHANCE', P.ink, 120], [gov71, 'SURPLUSES', C.forest, 120], [c('s71:2001'), '1998–2001: SURPLUSES', C.forest, 104], [y2000, 'THE YEAR 2000', C.forest, 110], [d236, 'THE YEAR 2000: +$236 BILLION', C.forest, 96],
        [used, 'BUYING BACK BONDS', P.ink, 110], [between, 'OWED TO OUTSIDE LENDERS', P.ink, 104], [january, 'THE SENATE', P.ink, 120], [c('s75:2001'), 'JANUARY 2001: THE SENATE', P.ink, 104], [unusual, 'AN UNUSUAL WORRY', C.brick, 110],
        [zero, 'IF THE DEBT HIT $0…', P.ink, 110], [never78, 'IT NEVER HAPPENED', C.brick, 110], [ended, 'CLIMBING AGAIN', C.brick, 110], [c('s79:2002'), 'SEPTEMBER 2002: CLIMBING AGAIN', C.brick, 96]]} />

      {/* # A) 1835 → 2000; four surplus years; +$236B */}
      {A > 0 && <g opacity={A}>
        <Backdrop kind="modern" f={f} />
        <Street y={GROUND} />
        <g opacity={1 - on(f, gov71, 8)}><YearPage x={960} y={540} s={1.4 * bump(f, later, 0.06) * bump(f, chance, 0.05) * bump(f, c('s71:from'), 0.05)} year={f >= another ? '2000' : '1835'} top={f >= another ? 'NOW' : 'THEN'} /></g>
        {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, gov71 + k * 5, 8)}><CoinStack x={430 + k * 230} y={GROUND - 10} n={Math.round(on(f, gov71 + k * 5, 18) * [5, 9, 13, 6][k])} w={130} />
          <g opacity={on(f, k === 0 ? c('s71:1998') : c('s71:2001'), 8)}><Label x={430 + k * 230} y={GROUND + 60} text={String(1998 + k)} size={44} font="Bebas Neue" color={C.sepia} /></g></g>)}
        <g opacity={on(f, row, 8)}><Label x={775} y={650} text="4 YEARS IN A ROW" size={52} font="Bebas Neue" color={C.forest} /></g>
        <g opacity={on(f, y2000, 8)}><YearPage x={1560} y={420} s={0.8 * pop(f, y2000)} year="2000" top="FISCAL YEAR" /></g>
        <g opacity={on(f, d236, 8)}><Sack x={1560} y={GROUND} s={1.2 * pop(f, d236) * bump(f, collected, 0.03) * bump(f, c('s72:spent'), 0.06) * bump(f, c('s72:more'), 0.05)} label="+$236B" /></g>
      </g>}

      {/* # B) buying back bonds; the column shrinks */}
      {B > 0 && <g opacity={B}>
        <Backdrop kind="modern" f={f} />
        <Street y={GROUND} />
        <Treasury x={480} y={GROUND} s={0.8 * bump(f, used, 0.04)} door={on(f, buy, 10)} />
        <g opacity={on(f, lenders73 - 8, 8) * (1 - on(f, between, 8))}>{[0, 1, 2].map((k) => <Mini key={k} look={['investor', 'buyer', 'owner'][k]} x={1380 + k * 160} y={GROUND} scale={0.9} frame={f} seed={k + 60} mood={f >= lenders73 + 20 ? 'happy' : 'neutral'} />)}</g>
        {f >= bonds73 && f < between && [0, 1, 2].map((k) => { const fl = fly(f, bonds73 + k * 8, [1380 + k * 160, 640], [560, 660], 22, 110); return fl.t < 1 ? <Bond key={k} x={fl.x} y={fl.y} s={0.45} o={fl.o} /> : null })}
        {f >= lenders73 && f < between && [0, 1, 2].map((k) => { const fl = fly(f, lenders73 + k * 8, [620, 600], [1380 + k * 160, 640], 22, 90); return fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} r={22} o={fl.o} /> : null })}
        <g opacity={on(f, between, 8)}>
          <g opacity={on(f, c('s74:debt'), 8)}><rect x={1180} y={GROUND - 14} width={240} height={14} rx={6} fill={C.sepia} /><Label x={1300} y={250} text="OWED TO OUTSIDE LENDERS" size={40} font="Bebas Neue" color={C.sepia} o={on(f, c('s74:outside'), 8)} /></g>
          <Column x={1300} y={GROUND - 10} h={lerp(lerp(0, 380, on(f, d379, 16)), 335, on(f, d334, 20))} w={200} color={C.roof} />
          <Counter x={1300} y={GROUND + 64} f={f} t0={d334} t1={d334 + 20} a={3.79} b={3.34} size={56} color={C.ink} fmt={(v) => `${v.toFixed(2)} TRILLION`} o={on(f, d379, 8)} />
          <g opacity={on(f, c('s74:2001'), 8)}><YearPage x={1620} y={520} s={0.7} year="2001" top="SEPT" /></g>
          <g opacity={on(f, c('s74:1997'), 8) * (1 - on(f, c('s74:2001'), 8))}><YearPage x={1620} y={520} s={0.7} year="1997" top="SEPT" /></g>
          <g opacity={on(f, fell, 8)}><path d="M1420 300 L1420 420 M1396 396 L1420 426 L1444 396" stroke={C.forest} strokeWidth={10} fill="none" strokeLinecap="round" /></g>
        </g>
      </g>}

      {/* # D1) the Senate hearing */}
      {D1 > 0 && <g opacity={D1}>
        <rect x={-40} y={300} width={2000} height={GROUND - 300} fill="#E9DCC2" /><Street y={GROUND} />
        {/* # the senators' bench on the right */}
        <g opacity={on(f, senate, 8)}>{[0, 1, 2].map((k) => <Mini key={k} look={['owner', 'buyer', 'worker'][k]} x={1300 + k * 170} y={GROUND - 110} scale={0.75} frame={f} seed={k + 70} />)}<Desk x={1470} y={GROUND} w={560} label="SENATE" /></g>
        <Person f={f} who="investor" beats={chair} x={560} y={GROUND} s={0.95} o={on(f, c('s75:head'), 8)} />
        <g opacity={on(f, c('s75:head'), 8)}><Desk x={560} y={GROUND} w={340} label="FED CHAIR" /></g>
        <g opacity={on(f, y2010, 8)}><YearPage x={1050} y={430} s={0.8 * pop(f, y2010)} year="2010" top="DEBT PAID BY" /></g>
      </g>}

      {/* # D2) the worry and what really happened */}
      {D2 > 0 && <g opacity={D2}>
        <Backdrop kind="modern" f={f} />
        <Street y={GROUND} />
        <Treasury x={460} y={GROUND} s={0.75 * bump(f, c('s77:government'), 0.05)} door={on(f, kept77, 10)} />
        <g opacity={on(f, zero, 8) * (1 - on(f, ended, 8))}><Label x={460} y={GROUND + 64} text="DEBT: $0" size={52} font="Bebas Neue" color={C.forest} /></g>
        {f >= kept77 && f < never78 && [0, 1].map((k) => { const t0 = kept77 + k * 10 + Math.floor((f - kept77) / 24) * 24, fl = fly(f, t0, [960, 260], [520, 700], 18, 40); return fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} r={22} o={fl.o} /> : null })}
        <g opacity={on(f, companies, 8) * (1 - on(f, ended, 8))}><Factory x={1450} y={GROUND} s={0.9 * pop(f, companies)} f={f} /></g>
        <g opacity={on(f, shares, 8) * (1 - on(f, ended, 8))}>{[0, 1].map((k) => { const t = easeInOut(span(f, buying + k * 8, buying + k * 8 + 26))
          return <Share key={k} x={lerp(1450, 800 + k * 230, t)} y={lerp(560, 600, t)} s={0.8} r={-4 + k * 8} /> })}
          {/* # crossed out: it never happened */}
          <g opacity={on(f, never78, 8)} transform={`translate(915 600) scale(${0.8 + 0.2 * on(f, never78, 8)})`}><path d="M-110 -90 L110 90 M110 -90 L-110 90" stroke="#FFFFFF" strokeWidth={30} strokeLinecap="round" opacity={0.9} /><path d="M-110 -90 L110 90 M110 -90 L-110 90" stroke={C.brick} strokeWidth={18} strokeLinecap="round" /></g></g>
        {/* # what really happened: the column climbs again */}
        <g opacity={on(f, ended, 8)}>
          <Column x={1300} y={GROUND - 10} h={lerp(335, 356, on(f, climbing, 20)) * bump(f, d355, 0.04) * bump(f, c('s79:debt'), 0.04) * bump(f, c('s79:lenders'), 0.04)} w={200} color={C.roof} />
          <Counter x={1300} y={GROUND + 64} f={f} t0={climbing} t1={d355} a={3.34} b={3.55} size={56} color={C.brick} fmt={(v) => `${v.toFixed(2)} TRILLION`} />
          <g opacity={on(f, c('s79:2002'), 8)}><YearPage x={1620} y={520} s={0.7 * bump(f, september, 0)} year="2002" top="SEPT" /></g>
          <g opacity={on(f, climbing, 8)}><path d="M1420 420 L1420 300 M1396 324 L1420 294 L1444 324" stroke={C.brick} strokeWidth={10} fill="none" strokeLinecap="round" /></g>
        </g>
      </g>}
      <Vignette id="db-y2000" />
    </g>
  )
}

const BEATS = ["s70:later", "s70:another", "s70:chance", "s71:government", "s71:four", "s71:row", "s72:2000", "s72:collected", "s72:236", "s73:used", "s73:buy", "s73:bonds", "s73:lenders", "s74", "s74:fell", "s74:379", "s74:334", "s75:january", "s75:federal", "s75:senate", "s75:track", "s75:2010", "s76:unusual", "s77:zero", "s77:kept", "s77:buying", "s77:shares", "s77:companies", "s78:never", "s79:ended", "s79:september", "s79:climbing", "s79:355", "s70", "s75:greenspan", "s71:from", "s71:1998", "s71:2001", "s72:spent", "s72:more", "s74:debt", "s74:outside", "s74:2001", "s74:1997", "s75:head", "s77:government", "s79:debt", "s79:lenders", "s79:2002"]
export const DB_Y2000 = makePiece('db-y2000', 'Debt 1835 ch5: year page flips 1835→2000; four surplus coin stacks 1998–2001; +$236B sack; lenders hand bonds back to the Treasury for coins; column of debt owed to outside lenders shrinks $3.79T→$3.34T; Senate hearing with the Fed chair (2010 on track); worry: debt $0, factory share certificates flow to the Treasury, crossed out; column climbs to $3.55T by Sept 2002', {
  mood: 'light', Component: Y2000, beats: BEATS,
  sfx: [['s72:236', 'coin', 0.2], ['s73:buy', 'whoosh', 0.2], ['s78:never', 'click', 0.2], ['s79:climbing', 'pop', 0.2]],
})
