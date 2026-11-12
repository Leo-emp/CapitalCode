// ---------------------------------------------------------------- s9–s19: step one, the tax they want to beat.
// A) A portrait on an easel (someone has died); the things left behind slide in (house, cash, shares, car); a dashed ESTATE ring draws round them.
// B) One tall cash column = the estate: the bottom $15M glows green (tax-free); a 1 billion example; the top 40% of the rest
//    turns red and lifts away into the tax office (about $394M).
// C) 10,000 dots, 7 light up red (2019: about 7 in every 10,000 deaths owed it).
// D) The billionaire carries a present towards his kids; the tax office slides in: the gift tax.
// E) A small $19,000 envelope passes to his son with a tick; a big present drains a lifetime-allowance bar; once empty, 40% turns red.
// F) Two roads, ALIVE (present) and AT DEATH (portrait), both end at the same tax office, whose door opens.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Car, Headline, Person, hand, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { TaxOffice, Cert } from '../bbd/kit'
import { Present } from '../gift/kit'
import { NoMark } from '../bank/kit'
import { CashColumn, DotField, EstateRing, Mansion, Pill, Portrait, RedBill, TAXRED } from './kit'

const GROUND = 930

// # a lifetime allowance bar: level 0–1 of $15M left
const Allowance: React.FC<{ x: number; y: number; level: number; o?: number }> = ({ x, y, level, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-300} y={-40} width={600} height={80} rx={40} fill="#FFFFFF" stroke="#CDB58C" strokeWidth={5} />
    <rect x={-288} y={-28} width={576 * Math.max(0, level)} height={56} rx={28} fill="#3DB57A" />
    <text x={0} y={-62} textAnchor="middle" fill="#16294A" style={{ font: '400 46px "Bebas Neue"', letterSpacing: 2 }}>LIFETIME ALLOWANCE: $15 MILLION</text>
  </g>
)

const Tax: React.FC<PieceProps> = ({ f, c }) => {
  const first13 = c('s13:first'), these8 = c('s8:these'), hit15 = c('s15:hit'), give19 = c('s19:give'), tax8 = c('s8:tax'), beat8 = c('s8:beat'), dies = c('s9:dies'), looks = c('s9:looks'), everything9 = c('s9:everything'), leave9 = c('s9:leave'), behind = c('s9:behind'), estate9 = c('s9:estate')
  const y2026 = c('s10:2026'), m15 = c('s10:15'), person10 = c('s10:person'), free10 = c('s10:taxfree')
  const above = c('s11:above'), taxed11 = c('s11:taxed'), p40 = c('s11:40')
  const picture = c('s12:picture'), leaves12 = c('s12:leaves'), b1 = c('s12:1'), kids12 = c('s12:kids')
  const free13 = c('s13:free'), m985 = c('s13:985'), p40b = c('s13:40'), bill13 = c('s13:bill'), m394 = c('s13:394')
  const now14 = c('s14:now'), few = c('s14:few'), y2019 = c('s14:2019'), seven = c('s14:7'), tenk = c('s14:10000'), owed = c('s14:owed')
  const enormous = c('s15:enormous'), question = c('s15:question'), give15 = c('s15:give'), away15 = c('s15:away'), die15 = c('s15:die')
  const thought = c('s16:thought'), gift16 = c('s16:gift')
  const give17 = c('s17:give'), k19 = c('s17:19000'), year17 = c('s17:year'), counting = c('s17:counting')
  const bigger = c('s18:bigger'), uses = c('s18:uses'), allowance = c('s18:allowance'), gone = c('s18:gone'), p40c = c('s18:40')
  const alive = c('s19:alive'), leave19 = c('s19:leave'), die19 = c('s19:die'), waiting = c('s19:waiting')

  const AB = c('s10') - 8, BC = c('s14') - 8, CD = c('s15:but') + 30, DE = c('s17') - 8, EF = c('s19') - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cw = win(f, BC, CD), D = win(f, CD, DE), E = win(f, DE, EF), F = on(f, EF, 10)

  // # B) the estate column: 600 px = $1 billion example; 15M is a thin green base (made thicker so it reads: 30 px)
  const colH = 600, base = 30
  const cutShare = 0.394 * on(f, p40b, 14)  // # 394 of 1,000 turns red
  const lift = 90 * span(f, bill13, m394 + 10)

  // # D/E) the billionaire carrying a present
  const dBeats: Beat[] = [[0, 'idle', 'thinking'], [enormous, 'shock', 'shocked'], [question, 'think', 'thinking'], [give15, 'hold', 'smiling'], [gift16, 'despair', 'worried']]
  const dp = hand(f, dBeats, 640, GROUND, 1.05)
  const eBeats: Beat[] = [[0, 'idle', 'neutral'], [give17, 'offer', 'smiling'], [counting, 'thumbsUp', 'smiling'], [bigger, 'carryHeavy', 'thinking'], [gone, 'facepalm', 'worried']]
  const ep = hand(f, eBeats, 520, GROUND, 1.05)
  const env = span(f, k19, counting)
  const level = 1 - span(f, uses, gone)

  return (
    <g>
      <Stage id="tt-tax" frame={f} />
      <Headline f={f} lines={[[dies, 'WHEN SOMEONE DIES…', P.ink, 100], [estate9, 'EVERYTHING LEFT = THE ESTATE', P.ink, 96], [y2026, 'IN 2026', P.ink, 110], [p40, 'ABOVE THAT: UP TO 40% TAX', P.coralInk, 100],
        [b1, 'EXAMPLE: $1 BILLION', P.ink, 104], [m394, 'TAX BILL ≈ $394 MILLION', P.coralInk, 100], [few, 'VERY FEW FAMILIES PAY IT', P.ink, 100], [enormous, 'BUT THE BILL IS ENORMOUS', P.ink, 100],
        [question, 'WHY NOT GIVE IT AWAY FIRST?', P.ink, 100], [gift16, 'THE GIFT TAX', P.coralInk, 112], [k19, '$19,000 A YEAR PER PERSON: FREE', P.mintInk, 92], [bigger, 'BIGGER GIFTS USE THE ALLOWANCE', P.ink, 92],
        [p40c, 'THEN UP TO 40% TAX', P.coralInk, 104], [alive, 'ALIVE OR AT DEATH…', P.ink, 104], [waiting, 'THE TAX IS WAITING', P.coralInk, 110]]} />

      {/* # A) what someone leaves behind becomes the estate */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={win(f, these8 - 4, dies, 8)} transform={`translate(0 ${-40 * (1 - pop(f, these8, 14))})`}><TaxOffice x={960} y={GROUND} s={1.3} eat={on(f, beat8, 12)} /></g>
        <g opacity={on(f, estate9 - 4, 8)}><EstateRing x={1240} y={GROUND - 20} rx={560} ry={80} label="" t={span(f, estate9 - 4, estate9 + 20)} /><Pill x={1240} y={1010} text="THE ESTATE" size={50} color="#B4821C" w={300} /></g>
        <Portrait x={330} y={GROUND} s={1.05} o={on(f, dies - 12, 12)}>
          <circle cy={-130} r={56} fill="#1F2B4A" /><path d="M-90 0 Q-90 -70 0 -70 Q90 -70 90 0 Z" fill="#22306E" /><path d="M-60 -170 Q0 -215 60 -170 Q30 -190 -10 -186 Z" fill="#1A1636" />
        </Portrait>
        <g opacity={on(f, looks, 10)} transform={`translate(${lerp(120, 0, on(f, looks, 16))} 0)`}><Mansion x={860} y={GROUND} s={0.72} /></g>
        <g opacity={on(f, everything9, 10)}><CashColumn x={1180} y={GROUND} h={260} w={150} /></g>
        <g opacity={on(f, leave9, 10)} transform={`translate(0 ${-30 * (1 - pop(f, leave9, 14))})`}><Cert x={1390} y={GROUND - 210} s={0.85} r={-6} /><Cert x={1400} y={GROUND - 110} s={0.85} r={4} /></g>
        <g opacity={on(f, behind, 10)}><Car x={1700} y={GROUND} s={0.75} color="#C94A3E" /></g>
      </g>}

      {/* # B) the estate column, the free base, the 40% bite */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={on(f, AB, 12)}><CashColumn x={960} y={GROUND} h={lerp(260, colH, on(f, picture, 18))} w={260} cut={cutShare} lift={lift} /></g>
        {/* the tax-free base, glowing green, from "15" */}
        <g opacity={on(f, m15, 8)}><rect x={820} y={GROUND - base - 4} width={280} height={base + 8} rx={8} fill="none" stroke="#1E9A63" strokeWidth={8 + 8 * win(f, first13, first13 + 24, 6)} /></g>
        <Pill x={1280} y={GROUND - 20} text={f >= free13 ? 'FIRST $15M: FREE' : '$15M: TAX-FREE'} size={44} color="#1E7A4C" o={on(f, m15, 8)} w={330} />
        {/* above the base: up to 40%, then the 1 billion example */}
        <g opacity={on(f, above, 8) * (1 - on(f, picture, 8))}><path d={`M1110 ${GROUND - 60} L1110 ${GROUND - 250}`} stroke={TAXRED} strokeWidth={6} strokeDasharray="12 10" /><Pill x={1290} y={GROUND - 160} text="UP TO 40%" size={50} color={TAXRED} o={on(f, taxed11, 8)} w={260} /></g>
        <Pill x={960} y={GROUND - colH - 60} text="$1 BILLION" size={56} color="#16294A" o={on(f, b1, 8) * (1 - on(f, p40b, 8))} w={340} />
        <Pill x={600} y={GROUND - 300} text="$985M TAXED" size={46} color="#16294A" o={on(f, m985, 8) * (1 - on(f, bill13, 8))} w={330} />
        <Pill x={600} y={GROUND - colH + 60 - lift} text="40% ≈ $394M" size={50} color={TAXRED} o={on(f, m394, 8)} w={330} />
        <Person f={f} who="investor" beats={[[0, 'idle', 'smug'], [leaves12, 'present', 'smiling'], [m985, 'think', 'thinking'], [bill13, 'shock', 'shocked']]} x={350} y={GROUND} s={0.95} o={on(f, picture, 10)} />
        <g opacity={on(f, kids12, 10)}>
          <Person f={f} who="buyer" beats={[[0, 'idle', 'smiling'], [bill13, 'despair', 'worried']]} x={1560} y={GROUND} s={0.9} flip />
          <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [bill13, 'nervous', 'worried']]} x={1750} y={GROUND} s={0.9} flip />
        </g>
      </g>}

      {/* # C) 10,000 deaths, about 7 owed the tax (2019) */}
      {Cw > 0 && <g opacity={Cw}>
        <DotField id="tt-dots" x={560} y={250} w={800} h={640 * (0.4 + 0.6 * on(f, now14, 16))} lit={[[13, 22], [71, 9], [44, 57], [88, 73], [20, 81], [62, 38], [35, 94]]} litT={span(f, seven, tenk + 10)} o={on(f, BC, 12)} />
        <Pill x={960} y={960} text={f >= y2019 ? '2019: ABOUT 7 IN EVERY 10,000 DEATHS' : '10,000 DEATHS'} size={48} color="#16294A" o={on(f, few, 8)} w={860} />
        <g opacity={on(f, hit15, 8)} transform={`translate(1600 ${560 - 30 * (1 - pop(f, hit15, 14))})`}><RedBill x={0} y={0} s={0.6} r={-6} amount="HUGE" /></g>
        <g opacity={on(f, owed, 8)}><circle cx={560 + 13.5 * 8} cy={250 + 22.5 * 6.4} r={46} fill="none" stroke={TAXRED} strokeWidth={6} /></g>
      </g>}

      {/* # D) carrying a present to the kids; the gift tax arrives */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        <Person f={f} who="investor" beats={dBeats} x={640} y={GROUND} s={1.05} />
        <g opacity={on(f, give15, 10)}><Present x={dp.x + 40} y={dp.y + 70} s={0.42} color="#3A6EA8" /></g>
        <g opacity={on(f, away15, 10)}>
          <Person f={f} who="buyer" beats={[[0, 'waveA', 'smiling', 'waveB', 14], [gift16, 'shrug', 'worried']]} x={1500} y={GROUND} s={0.95} flip />
          <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [gift16, 'shock', 'shocked']]} x={1700} y={GROUND} s={0.95} flip />
        </g>
        <g opacity={on(f, thought, 10)} transform={`translate(0 ${-400 * (1 - pop(f, thought, 18))})`}><TaxOffice x={1150} y={GROUND} s={0.9} eat={on(f, gift16, 12)} /></g>
        <g opacity={on(f, gift16 + 6, 8)}><RedBill x={dp.x + 40} y={dp.y - 120} s={0.42} r={-6} amount="GIFT TAX" top="" /></g>
      </g>}

      {/* # E) the small yearly gift passes; big gifts drain the allowance */}
      {E > 0 && <g opacity={E}>
        <Ground y={GROUND} />
        <Person f={f} who="investor" beats={eBeats} x={520} y={GROUND} s={1.05} />
        <Person f={f} who="buyer" beats={[[0, 'idle', 'smiling'], [year17, 'receive', 'smiling'], [counting, 'celebrate', 'smiling'], [bigger, 'idle', 'thinking']]} x={1520} y={GROUND} s={1} flip />
        {/* the $19,000 envelope flies over to the son */}
        <g opacity={on(f, k19 - 4, 8) * (1 - on(f, bigger, 8))} transform={`translate(${lerp(ep.x + 60, 1400, env)} ${lerp(ep.y, 620, env) - 120 * Math.sin(Math.PI * env)})`}>
          <rect x={-90} y={-56} width={180} height={112} rx={10} fill="#FFFFFF" stroke="#CDB58C" strokeWidth={4} /><path d="M-90 -56 L0 6 L90 -56" fill="none" stroke="#CDB58C" strokeWidth={4} />
          <text y={44} textAnchor="middle" fill="#1E7A4C" style={{ font: '400 40px "Bebas Neue"' }}>$19,000</text>
        </g>
        <g opacity={on(f, counting, 8) * (1 - on(f, bigger, 8))}><circle cx={1400} cy={470} r={40} fill="#3DB57A" /><path d="M1380 470 L1395 487 L1422 455" fill="none" stroke="#FFF" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" /></g>
        {/* the big present and the allowance bar */}
        <g opacity={on(f, bigger, 10)}><Present x={ep.x + 70} y={ep.y + 150} s={0.7} color="#3A6EA8" /></g>
        <Allowance x={1040} y={330} level={level} o={on(f, allowance - 10, 10)} />
                <Pill x={1040} y={470} text="NEXT GIFTS: UP TO 40% TAX" size={46} color={TAXRED} o={on(f, p40c, 8)} w={620} />
      </g>}

      {/* # F) both roads end at the same tax office */}
      {F > 0 && <g opacity={F}>
        <Ground y={GROUND} />
        <path d={`M300 ${GROUND - 20} Q700 ${GROUND - 160} 860 ${GROUND - 60}`} fill="none" stroke="#B4821C" strokeWidth={10} strokeDasharray="22 14" strokeDashoffset={-f} opacity={on(f, alive, 10)} />
        <path d={`M1620 ${GROUND - 20} Q1220 ${GROUND - 160} 1060 ${GROUND - 60}`} fill="none" stroke="#B4821C" strokeWidth={10} strokeDasharray="22 14" strokeDashoffset={-f} opacity={on(f, leave19, 10)} />
        <g opacity={on(f, give19, 10)}><Present x={260} y={GROUND} s={0.6} color="#3A6EA8" /><Pill x={260} y={GROUND - 200} text="WHILE ALIVE" size={42} o={1} w={260} /></g>
        <g opacity={on(f, die19, 10)}><Portrait x={1660} y={GROUND} s={0.62}><circle cy={-130} r={56} fill="#1F2B4A" /><path d="M-90 0 Q-90 -70 0 -70 Q90 -70 90 0 Z" fill="#22306E" /></Portrait><Pill x={1660} y={GROUND - 330} text="AT DEATH" size={42} o={1} w={240} /></g>
        <TaxOffice x={960} y={GROUND} s={1.1} eat={on(f, waiting, 12)} />
      </g>}
      <Vignette id="tt-tax" />
    </g>
  )
}

const BEATS = ['s13:first', 's8:these', 's8:beat', 's15:hit', 's19:give', 's14:now', 's14:hits', 's9:dies', 's9:looks', 's9:everything', 's9:leave', 's9:behind', 's9:estate', 's10:2026', 's10:15', 's10:taxfree', 's11:above', 's11:taxed', 's11:40', 's12:picture', 's12:leaves', 's12:1', 's12:kids',
  's13:free', 's13:985', 's13:40', 's13:bill', 's13:394', 's14:few', 's14:2019', 's14:7', 's14:10000', 's14:owed', 's15:enormous', 's15:question', 's15:give', 's15:away', 's16:thought', 's16:gift',
  's17:give', 's17:19000', 's17:year', 's17:counting', 's18:bigger', 's18:uses', 's18:allowance', 's18:gone', 's18:40', 's19:alive', 's19:leave', 's19:die', 's19:waiting']
export const TT_TAX = makePiece('tt-tax', 'Trusts step one: a portrait on an easel; house, cash, shares and car slide in and an ESTATE ring draws round them; one tall cash column with a green $15M tax-free base and a 40% line; the $1B example: 985M taxed, the top 39.4% turns red and lifts away (≈$394M) while the kids look worried; 10,000 dots with 7 lit red (2019); the billionaire carries a present to his kids and a tax office drops in (gift tax); a $19,000 envelope flies to the son with a tick; a big present drains the $15M lifetime allowance bar, then 40%; two roads (while alive / at death) end at the same tax office', {
  mood: 'light', Component: Tax, beats: BEATS,
  sfx: [['s9:estate', 'pop', 0.15], ['s13:394', 'thud', 0.25], ['s14:7', 'pop', 0.15], ['s16:gift', 'thud', 0.2], ['s17:counting', 'pop', 0.15], ['s19:waiting', 'thud', 0.2]] })
