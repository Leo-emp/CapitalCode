// ============================================================
// db-maths (s93–s98, cream): could America pay it off again? The 1835 sheet
// ($33,733) beside today's $40.6T tower; the best year (2000) page and its
// +$236B sack; sacks drop into the tower every "year" while it shrinks and a
// year counter runs to ≈172; "PAID OFF?" date card gets crossed out; the real
// question: tax coins split between the interest chute and schools, roads and
// hospitals — every coin that goes to interest leaves one of them dim.
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece } from '../registry'
import { fly, Headline, win } from '../aimoney/common'
import { BondPile, bump, C, Coin, Column, Counter, Defs, Sack, Street, YearPage , Backdrop } from './kit'

const GROUND = 880
// # small public buildings the money could have gone to (school, road, hospital)
const Public: React.FC<{ x: number; y: number; kind: number; dim: number; o: number }> = ({ x, y, kind, dim, o }) => (
  <g opacity={o * (1 - 0.55 * dim)} transform={`translate(${x} ${y})`}>
    {kind === 0 && <g><rect x={-90} y={-140} width={180} height={140} fill="#D98C5F" /><path d="M-104 -140 L0 -200 L104 -140 Z" fill={C.brickD} /><rect x={-14} y={-210} width={28} height={30} fill={C.gold} /><rect x={-26} y={-70} width={52} height={70} fill="#5A3A22" /></g>}
    {kind === 1 && <g><path d="M-110 0 L-40 -150 L40 -150 L110 0 Z" fill="#7C8794" /><path d="M0 -140 L0 -110 M0 -80 L0 -50 M0 -24 L0 0" stroke="#F4EFE5" strokeWidth={8} /><rect x={70} y={-200} width={10} height={200} fill={C.woodD} /><path d="M80 -200 L150 -186 L80 -172 Z" fill={C.gold} /></g>}
    {kind === 2 && <g><rect x={-100} y={-160} width={200} height={160} fill="#F4EFE5" stroke={C.stoneD} strokeWidth={5} /><rect x={-16} y={-136} width={32} height={80} fill={C.brick} /><rect x={-40} y={-112} width={80} height={32} fill={C.brick} /></g>}
    <Label x={0} y={60} text={['SCHOOLS', 'ROADS', 'HOSPITALS'][kind]} size={40} font="Bebas Neue" color={C.sepia} />
  </g>
)

const Maths: React.FC<{ f: number; c: (k: string) => number }> = ({ f, c }) => {
  const could = c('s93:could'), pay93 = c('s93:pay'), again93 = c('s93:again')
  const maths = c('s94:maths'), best = c('s94:best'), ever94 = c('s94:ever')
  const record = c('s95:record'), y2000 = c('s95:2000'), d236 = c('s95:236')
  const saved = c('s96:saved'), every96 = c('s96:every'), stopped96 = c('s96:stopped'), d406 = c('s96:406'), take = c('s96:take'), d172 = c('s96:172')
  const real = c('s97:real'), not97 = c('s97:not'), paid97 = c('s97:paid')
  const how98 = c('s98:how'), bill98 = c('s98:bill'), every98 = c('s98:every'), spent98 = c('s98:spent'), notspent = c('s98:not'), anything = c('s98:anything')
  const A = win(f, c('s93') - 20, real), B = on(f, real, 8)
  // # the tower shrinks while sacks drop in, from "saved" to "172"
  const drain = easeInOut(span(f, saved, d172))
  return (
    <g>
      <Defs />
      <Stage id="db-maths" frame={f} />
      <Headline f={f} lines={[[could, 'COULD IT HAPPEN AGAIN?', P.ink, 110], [maths, "LET'S DO THE MATHS", P.ink, 110], [record, 'THE RECORD', C.forest, 120], [d236, 'THE RECORD: +$236B IN 2000', C.forest, 100],
        [saved, 'SAVE THAT EVERY YEAR…', P.ink, 104], [d172, '≈ 172 YEARS', C.brick, 130], [real, 'THE REAL QUESTION', P.ink, 110], [how98, 'HOW BIG THE INTEREST BILL GETS', C.brick, 96]]} />

      {/* # A) 1835 sheet vs today's tower; the best year; 172 years */}
      {A > 0 && <g opacity={A}>
        <Backdrop kind="modern" f={f} />
        <Street y={GROUND} />
        <g opacity={on(f, could, 8)}><BondPile x={380} y={GROUND} n={1} s={0.9 * bump(f, c('s93:like'), 0.12)} /><Label x={380} y={GROUND + 64} text="1835: $33,733" size={44} font="Bebas Neue" color={C.sepia} /></g>
        {/* # today's tower (40.6T) that drains as the yearly sacks drop in */}
        <g opacity={on(f, pay93, 8)}><Column x={1420} y={GROUND - 10} h={lerp(560, 30, drain) * bump(f, again93, 0.04) * bump(f, c('s97:today'), 0.06)} w={240} color="#4A6FA5" />
          <g opacity={on(f, pay93, 8) * (1 - on(f, saved, 8))}><Label x={1420} y={GROUND + 64} text="TODAY: $40.6T" size={48} font="Bebas Neue" color={C.brick} /></g>
          <g opacity={on(f, d406, 8)}><Label x={1420} y={GROUND + 64} text="$40.6T AT $236B A YEAR" size={44} font="Bebas Neue" color={C.brick} /></g></g>
        <g opacity={on(f, best, 8) * (1 - on(f, saved, 8))}><YearPage x={850} y={480} s={1.0 * pop(f, best) * bump(f, ever94, 0.05)} year="2000" top="BEST YEAR" /></g>
        <g opacity={on(f, d236, 8)}><Sack x={850} y={GROUND} s={1.1 * pop(f, d236) * bump(f, y2000, 0.03) * bump(f, c('s96:if'), 0.06)} label="$236B" /></g>
        {/* # every year one sack flies into the tower */}
        {f >= every96 && f < d172 + 20 && [0, 1].map((k) => { const t0 = every96 + k * 12 + Math.floor((f - every96) / 24) * 24, fl = fly(f, t0, [850, 700], [1420, 380], 18, 120); return fl.t < 1 ? <Sack key={k} x={fl.x} y={fl.y + 60} s={0.45} o={fl.o} label="$" /> : null })}
        <g opacity={on(f, saved, 8)}><Counter x={850} y={420} f={f} t0={saved} t1={d172} a={0} b={172} prefix="YEAR " size={84} color={C.brick} /></g>
        <g opacity={on(f, stopped96, 8)}><Label x={850} y={500} text="(IF THE DEBT STOPPED GROWING)" size={36} font="Bebas Neue" color={C.sepia} /></g>
      </g>}

      {/* # B) the real question: not "when paid off" but how big the interest bill gets */}
      {B > 0 && <g opacity={B}>
        <Backdrop kind="modern" f={f} />
        <Street y={GROUND} />
        <g opacity={1 - on(f, how98, 8)}><Column x={420} y={GROUND - 10} h={420 * bump(f, c('s97:today'), 0.05)} w={200} color="#4A6FA5" /><Label x={420} y={GROUND + 64} text="TODAY: $40.6T" size={48} font="Bebas Neue" color={C.brick} /></g>
        <g opacity={on(f, paid97, 8) * (1 - on(f, how98, 8))}><YearPage x={1100} y={520} s={1.3 * pop(f, paid97)} year="?" top="PAID OFF" />
          <g opacity={on(f, paid97 + 8, 8)} transform="translate(1100 520)"><path d="M-130 -130 L130 130 M130 -130 L-130 130" stroke="#FFFFFF" strokeWidth={30} strokeLinecap="round" opacity={0.9} /><path d="M-130 -130 L130 130 M130 -130 L-130 130" stroke={C.brick} strokeWidth={18} strokeLinecap="round" /></g></g>
        <g opacity={on(f, not97, 8) * (1 - on(f, how98, 8))}><Label x={1100} y={GROUND + 64} text="NOT THE QUESTION" size={52} font="Bebas Neue" color={C.brick} /></g>
        {/* # the tax pot: coins go either down the interest chute or to public buildings */}
        <g opacity={on(f, how98, 8)}>
          <g transform={`translate(380 ${GROUND})`}><path d="M-120 -260 L120 -260 L90 0 L-90 0 Z" fill={C.goldD} /><rect x={-130} y={-280} width={260} height={30} rx={10} fill={C.gold} /><Label x={0} y={-110} text="TAXES" size={52} font="Bebas Neue" color="#FFF5EA" /></g>
          <g transform={`translate(860 ${GROUND}) scale(${bump(f, bill98, 0.06)})`}><rect x={-90} y={-300} width={180} height={300} rx={12} fill={C.brick} /><Label x={0} y={-150} text="INTEREST" size={44} font="Bebas Neue" color="#FFF5EA" /></g>
          {[0, 1, 2].map((k) => <Public key={k} x={1250 + k * 260} y={GROUND} kind={k} o={on(f, how98 + 6 + k * 3, 8)} dim={on(f, notspent + k * 4, 10)} />)}
          {f >= every98 && [0, 1, 2].map((k) => { const t0 = every98 + k * 9 + Math.floor((f - every98) / 27) * 27, fl = fly(f, t0, [380, 560], [860, 560], 18, 110); return fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} r={24} o={fl.o} /> : null })}
          <g opacity={on(f, spent98, 8)}><Label x={860} y={GROUND + 64} text="$1 HERE…" size={44} font="Bebas Neue" color={C.brick} /></g>
          <g opacity={on(f, anything, 8)}><Label x={1510} y={GROUND + 120} text="…IS $1 NOT SPENT HERE" size={44} font="Bebas Neue" color={C.sepia} /></g>
        </g>
      </g>}
      <Vignette id="db-maths" />
    </g>
  )
}

const BEATS = ["s93:could", "s93:pay", "s93:again", "s94:maths", "s94:best", "s94:ever", "s95:record", "s95:2000", "s95:236", "s96:saved", "s96:every", "s96:stopped", "s96:406", "s96:take", "s96:172", "s97:real", "s97:not", "s97:paid", "s98:how", "s98:bill", "s98:every", "s98:spent", "s98:not", "s98:anything", "s93", "s93:like", "s97:today", "s96:if"]
export const DB_MATHS = makePiece('db-maths', 'Debt 1835 ch6b: 1835 sheet vs today’s $40.6T tower; best year 2000 page and $236B sack; sacks fly into the tower each year as it drains and a counter runs to ≈172 years; PAID OFF ? card crossed out; tax pot coins go down the INTEREST chute while schools, roads and hospitals dim', {
  mood: 'light', Component: Maths, beats: BEATS,
  sfx: [['s95:236', 'coin', 0.2], ['s96:172', 'pop', 0.25], ['s97:paid', 'click', 0.2]],
})
