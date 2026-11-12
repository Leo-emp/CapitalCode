// ---------------------------------------------------------------- s20–s25: what a trust is.
// A) The trust box rises; the padlock clicks on "locked"; the rulebook stands beside it.
// B) The billionaire tosses a cash brick and a share certificate into the open box; the trustee (with a key) stands guard
//    and opens the rulebook; a coin flies out of the box to the children he named.
// C) IRREVOCABLE: the lock snaps shut; he pulls at the lid, it will not open; the trustee shakes his head.
// D) An ESTATE ring round the billionaire and his house; the box slides out of the ring ("no longer yours"), a tick.
// E) A red GIFT TAX bill lands on the box ("still counts as a gift").
// F) A price tag on the box flips from its full value to ≈ $0 ("value at almost nothing").
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Person, hand, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Cert, FlipTag } from '../bbd/kit'
import { NoMark, Spot } from '../bank/kit'
import { EstateRing, Mansion, Pill, RedBill, Rulebook, TrustBox } from './kit'

const GROUND = 930

const Box: React.FC<PieceProps> = ({ f, c }) => {
  const trusts = c('s20:trusts'), locked = c('s20:locked'), rulebook = c('s20:rulebook')
  const put = c('s21:put'), money21 = c('s21:money'), stock = c('s21:stock'), trustee = c('s21:trustee'), looks = c('s21:looks'), rules = c('s21:rules'), wrote = c('s21:wrote'), people = c('s21:people'), children = c('s21:children'), inside = c('s21:inside')
  const putting24 = c('s24:putting'), way25 = c('s25:way'), like20 = c('s20:like'), give23 = c('s23:give'), rich22 = c('s22:kind'), irrevocable = c('s22:irrevocable'), goes = c('s22:goes'), cant = c('s22:can\'t'), back = c('s22:back')
  const good = c('s23:good'), longer = c('s23:longer'), yours = c('s23:yours'), die = c('s23:die'), estate23 = c('s23:estate')
  const counts = c('s24:counts'), gift24 = c('s24:gift'), taxed = c('s24:taxed')
  const trick = c('s25:trick'), box25 = c('s25:box'), putting = c('s25:putting'), value = c('s25:value'), nothing = c('s25:nothing')

  const AB = c('s22') - 8, BC = c('s24') - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)

  // # A) the billionaire throws in money then stock; the lid is open from "put" to "looks"
  const bBeats: Beat[] = [[0, 'idle', 'smiling'], [put, 'offer', 'smiling'], [stock, 'present', 'smiling'], [rules, 'point', 'smug'], [people, 'present', 'smiling']]
  const hp = hand(f, bBeats, 360, GROUND, 1.05)
  const lidA = win(f, put - 6, looks + 4, 8)
  const toss = (t0: number) => { const t = span(f, t0, t0 + 16); return { x: lerp(hp.x, 960, t), y: lerp(hp.y, GROUND - 230, t) - 160 * Math.sin(Math.PI * t), o: on(f, t0, 4) * (1 - on(f, t0 + 14, 4)) } }
  const m = toss(money21), s = toss(stock)
  const coinT = span(f, children, inside + 6)

  // # B) the box leaves the ring on "longer"
  const out = on(f, longer, 22)
  const cBeats: Beat[] = [[AB, 'idle', 'smug'], [rich22, 'point', 'smug'], [goes, 'present', 'smiling'], [cant, 'pull', 'worried'], [give23, 'offer', 'smiling'], [good - 14, 'walkA', 'neutral', 'walkB', 12], [good + 8, 'shrug', 'neutral'], [die, 'idle', 'thinking']]
  const bossX = lerp(610, 250, span(f, good - 14, good + 8))

  return (
    <g>
      <Stage id="tt-box" frame={f} />
      <Headline f={f} lines={[[trusts, 'A TRUST = A LOCKED BOX', P.ink, 104], [rulebook, '… WITH A RULEBOOK', P.ink, 104], [trustee, 'A TRUSTEE LOOKS AFTER IT', P.ink, 100], [children, 'YOUR CHILDREN GET IT', P.ink, 104],
        [irrevocable, 'IRREVOCABLE', P.ink, 120], [back, "YOU CAN'T TAKE IT BACK", P.coralInk, 104], [longer, 'NO LONGER YOURS', P.ink, 110], [estate23, 'NOT IN YOUR ESTATE', P.mintInk, 104],
        [counts, 'BUT IT COUNTS AS A GIFT', P.coralInk, 100], [trick, 'THE TRICK:', P.ink, 110], [value, 'A GIFT VALUED AT ≈ $0', P.mintInk, 104]]} />

      {/* # A) the box, the rulebook, the trustee, the children */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g transform={`translate(0 ${120 * (1 - pop(f, trusts - 10, 18))})`} opacity={on(f, trusts - 10, 10)}>
          <TrustBox x={960} y={GROUND} s={1.0} open={lidA} lock={on(f, locked, 8) * (1 - lidA)} glow={win(f, locked, locked + 30)}>
            {f > money21 + 14 && <g opacity={lidA}><rect x={-120} y={-250} width={110} height={34} rx={5} fill="#5FBF7F" stroke="#2E8B57" strokeWidth={3} /></g>}
            {f > stock + 14 && <g opacity={lidA}><rect x={10} y={-256} width={120} height={44} rx={6} fill="#F7F1E1" stroke="#C9B27A" strokeWidth={3} /></g>}
          </TrustBox>
        </g>
        <Spot f={f} at={like20} x={960} y={GROUND - 120} rx={230} ry={150} />
        <g opacity={on(f, rulebook, 8)} transform={`translate(0 ${-40 * (1 - pop(f, rulebook, 14))})`}><Rulebook x={680} y={GROUND - 120} s={0.8} open={on(f, rules, 14)} /></g>
        <Person f={f} who="investor" beats={bBeats} x={360} y={GROUND} s={1.05} o={on(f, put - 14, 10)} />
        {f >= money21 && m.o > 0 && <g opacity={m.o} transform={`translate(${m.x} ${m.y})`}><rect x={-50} y={-17} width={100} height={34} rx={5} fill="#5FBF7F" stroke="#2E8B57" strokeWidth={3} /><rect x={-11} y={-17} width={22} height={34} fill="#F2E6CC" /></g>}
        {f >= stock && s.o > 0 && <Cert x={s.x} y={s.y} s={0.5} r={-10} o={s.o} />}
        <g opacity={on(f, trustee, 10)}>
          <Person f={f} who="hero" beats={[[trustee, 'holdUp', 'smiling'], [looks, 'measure', 'thinking'], [wrote, 'read', 'thinking'], [people, 'present', 'smiling']]} x={1300} y={GROUND} s={1.0} flip />
          <Pill x={1300} y={GROUND + 70} text="TRUSTEE" size={40} w={200} />
        </g>
        <g opacity={on(f, people, 10)}>
          <Person f={f} who="buyer" beats={[[people, 'idle', 'smiling'], [inside, 'receive', 'smiling']]} x={1590} y={GROUND} s={0.9} flip />
          <Person f={f} who="investorF" beats={[[people, 'idle', 'smiling'], [inside, 'celebrate', 'smiling']]} x={1770} y={GROUND} s={0.9} flip />
          <Pill x={1680} y={GROUND + 70} text="CHILDREN" size={40} w={220} />
        </g>
        {coinT > 0 && coinT < 1 && <Coin x={lerp(960, 1600, coinT)} y={lerp(GROUND - 260, GROUND - 330, coinT) - 220 * Math.sin(Math.PI * coinT)} s={1.1} />}
      </g>}

      {/* # B) irrevocable, then out of the estate */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={on(f, good - 10, 10)}><EstateRing x={470} y={GROUND - 10} rx={400} ry={70} label="" t={span(f, good - 10, good + 14)} /><Pill x={470} y={1010} text="HIS ESTATE" size={46} color="#B4821C" w={280} /></g>
        <g opacity={on(f, good - 10, 10)}><Mansion x={540} y={GROUND} s={0.5} /></g>
        <Person f={f} who="investor" beats={cBeats} x={bossX} y={GROUND} s={1.05} />
        <TrustBox x={lerp(900, 1360, out)} y={GROUND} s={0.8} lock={1} glow={win(f, irrevocable, irrevocable + 30)}
          label="TRUST" />
        <g opacity={win(f, cant, good, 6)}><NoMark x={900} y={GROUND - 110} o={on(f, back, 8)} r={90} /></g>
        <Pill x={lerp(900, 1360, out)} y={GROUND - 330} text="IRREVOCABLE" size={50} color="#16294A" o={on(f, irrevocable, 8)} w={330} />
        <g opacity={on(f, estate23, 8)}><circle cx={1560} cy={GROUND - 300} r={44} fill="#3DB57A" /><path d="M1538 700 L1555 717 L1584 684" transform={`translate(0 ${GROUND - 300 - 700})`} fill="none" stroke="#FFF" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" /></g>
        <Person f={f} who="hero" beats={[[AB, 'idle', 'neutral'], [back, 'crossNoA', 'neutral', 'crossNoB', 12], [good, 'idle', 'neutral'], [estate23, 'thumbsUp', 'smiling']]} x={1720} y={GROUND} s={0.95} flip />
      </g>}

      {/* # C) a gift — but valued at almost nothing */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <TrustBox x={960} y={GROUND} s={1.15} lock={1} glow={win(f, nothing, nothing + 40)} />
        <g opacity={on(f, gift24, 8) * (1 - on(f, trick, 10))} transform={`translate(0 ${-200 * (1 - pop(f, gift24, 16))})`}><RedBill x={960} y={560} s={0.7} r={-5} amount="GIFT TAX" top="40%" /></g>
        <g opacity={on(f, taxed, 8) * (1 - on(f, trick, 10))}><Pill x={1380} y={500} text="UP TO 40%" size={50} color="#D9483A" w={260} /></g>
        <g opacity={on(f, box25, 8)}><path d={`M1180 ${GROUND - 180} Q1300 ${GROUND - 260} 1330 ${GROUND - 320}`} fill="none" stroke="#B88A2E" strokeWidth={6} /></g>
        <Spot f={f} at={way25} x={1420} y={GROUND - 380} rx={210} ry={110} />
        <FlipTag x={1420} y={GROUND - 380} s={0.95} o={on(f, box25, 10)} a="$$$" b="≈ $0" t={span(f, nothing - 6, nothing + 8)} color={f > nothing ? '#7FD3A0' : P.gold} />
        <Person f={f} who="investor" beats={[[BC, 'idle', 'worried'], [putting24, 'offer', 'neutral'], [counts, 'scratchHead', 'worried'], [trick, 'confident', 'smug'], [putting, 'present', 'smiling'], [nothing, 'taDa', 'smug']]} x={420} y={GROUND} s={1.05} />
      </g>}
      <Vignette id="tt-box" />
    </g>
  )
}

const BEATS = ['s20:trusts', 's20:locked', 's20:rulebook', 's21:put', 's21:money', 's21:stock', 's21:trustee', 's21:looks', 's21:rules', 's21:people', 's21:children', 's21:inside', 's22:kind', 's24:putting', 's25:way', 's20:like', 's23:give', 's22:irrevocable', 's22:goes', "s22:can't", 's22:back',
  's23:good', 's23:longer', 's23:die', 's23:estate', 's24:counts', 's24:gift', 's24:taxed', 's25:trick', 's25:box', 's25:putting', 's25:value', 's25:nothing']
export const TT_BOX = makePiece('tt-box', 'Trusts: what a trust is — a locked box rises (padlock clicks) beside a rulebook; the billionaire tosses a cash brick and a share certificate in; the trustee with the rulebook; a coin flies out to his two children; IRREVOCABLE: he pulls the lid and it will not open, the trustee shakes his head; an ESTATE ring round him and his house, the box slides out of it with a tick; a red GIFT TAX bill lands on the box; a price tag on the box flips from $$$ to ≈ $0', {
  mood: 'light', Component: Box, beats: BEATS,
  sfx: [['s20:locked', 'click', 0.25], ['s21:money', 'pop', 0.15], ['s22:back', 'thud', 0.2], ['s24:gift', 'thud', 0.2], ['s25:nothing', 'pop', 0.25]] })
