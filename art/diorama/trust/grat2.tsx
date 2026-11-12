// ---------------------------------------------------------------- s42–s52: step two, why a GRAT can't really lose, and its history.
// A) The stock falls: the column inside the GRAT shrinks (red arrow down); everything left slides back to the billionaire;
//    the kids shrug with empty hands; a small lawyer's-fees envelope ($5,000–$10,000).
// B) A big gold coin: HEADS (growth → kids) flips to TAILS (all back to him).
// C) A conveyor of GRAT boxes: new ones keep popping on, several at once.
// D) The risk: an hourglass (the GRAT's term); a portrait appears before the sand runs out; the box is pulled into an ESTATE ring.
// E) The Capitol; a 1990 law scroll unrolls and a small GRAT box slides out of it (by accident).
// F) The Tax Court: the IRS office on one side, Audrey Walton on the other; the gavel falls; an APPROVED tick and a $0 gift tag.
// G) Proposals fly up to the Capitol from 2009 on and bounce back, each crossed: none passed.
// H) A gold column of lost tax grows 2000 → 2013 to ≈ $100 billion beside the Treasury.
// I) A series of GRAT boxes passes ≈ $0.5 billion to a family; a red $200M+ tax bill is crossed (Laurene Powell Jobs, per ProPublica).
// J) The kids with their stack; the tax office looms behind them with a question: what happens when they die?
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, Stamp, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { TaxOffice } from '../bbd/kit'
import { NoMark } from '../bank/kit'
import { BigArrow } from '../buffett/kit'
import { Hourglass } from '../money4/kit'
import { Capitol, Scroll } from '../debt1835/kit'
import { CashColumn, Court, EstateRing, FlipCoin, Pill, Portrait, RedBill, TrustBox, TAXRED } from './kit'

const GROUND = 930

const Grat2: React.FC<PieceProps> = ({ f, c }) => {
  const falls = c('s42:falls'), extra = c('s42:extra'), hands = c('s42:hands'), back42 = c('s42:back')
  const kids43 = c('s43:kids'), nothing43 = c('s43:nothing'), lost43 = c('s43:lost'), cost43 = c('s43:cost'), fees = c('s43:fees'), k5 = c('s43:5000'), k10 = c('s43:10000')
  const nickname = c('s44:nickname'), heads = c('s44:heads'), win44 = c('s44:win'), tails = c('s44:tails'), tie = c('s44:tie')
  const failed = c('s45:failed'), little = c('s45:little'), start45 = c('s45:start'), new45 = c('s45:new'), over45 = c('s45:over'), several = c('s45:several'), once = c('s45:once')
  const risk = c('s46:risk'), dies46 = c('s46:dies'), ends46 = c('s46:ends'), counted = c('s46:counted'), estate46 = c('s46:estate'), fails46 = c('s46:fails')
  const congress = c('s47:congress'), create = c('s47:create'), y1990 = c('s47:1990'), law47 = c('s47:law'), close47 = c('s47:close'), loophole = c('s47:loophole')
  const fought = c('s48:fought'), lost48 = c('s48:lost'), y2000 = c('s48:2000'), ruled = c('s48:ruled'), walton = c('s48:walton'), walmart = c('s48:walmart\'s'), approved = c('s48:approved'), zero48 = c('s48:zero')
  const y2009 = c('s49:2009'), proposals = c('s49:proposals'), limit = c('s49:limit'), none49 = c('s49:none'), passed = c('s49:passed')
  const y2013 = c('s50:2013'), pioneered = c('s50:pioneered'), cost50 = c('s50:cost'), b100 = c('s50:100'), y2000b = c('s50:2000')
  const grat48 = c('s48:grat'), estimated = c('s50:estimated'), anything43 = c('s43:anything'), tax51 = c('s51:tax'), powell = c('s51:powell'), grat52 = c('s52:grat'), laurene = c('s51:laurene'), series = c('s51:series'), half = c('s51:half'), family = c('s51:family'), avoiding = c('s51:avoiding'), m200 = c('s51:200')
  const solves = c('s52:solves'), generation = c('s52:generation'), happens = c('s52:happens'), kids52 = c('s52:kids'), die52 = c('s52:die')

  const cut = [c('s44') - 8, c('s45') - 8, c('s46') - 8, c('s47') - 8, c('s48') - 8, c('s49') - 8, c('s50') - 8, c('s51') - 8, c('s52') - 8]
  const W = [win(f, 0, cut[0]), ...cut.slice(0, -1).map((a, k) => win(f, a, cut[k + 1])), on(f, cut[cut.length - 1], 10)]
  const [A, B, C, D, E, F, G, H, I, J] = W

  // # A) the column falls, then slides back to him
  const colH = lerp(300, 170, on(f, falls, 24))
  const backT = on(f, hands, 24)

  // # B) the coin flips on "tails"
  const flip = span(f, tails - 4, tails + 10)

  // # C) the conveyor: boxes enter at the left on their cue and ride right
  const boxAt = [failed - 20, start45, new45, over45, several, once]

  // # H) the lost-tax column
  const lostH = 470 * span(f, y2013, b100 + 10)

  return (
    <g>
      <Stage id="tt-grat2" frame={f} />
      <Headline f={f} lines={[[falls, 'WHAT IF THE STOCK FALLS?', P.ink, 100], [hands, 'IT ALL GOES BACK TO HIM', P.ink, 100], [kids43, 'KIDS GET NOTHING', P.ink, 104], [lost43, '… BUT HE LOSES NOTHING', P.mintInk, 100], [fees, 'ONLY LAWYER FEES', P.ink, 104],
        [heads, 'HEADS I WIN…', P.goldInk, 112], [tails, '… TAILS WE TIE', P.ink, 112], [failed, 'A FAILED GRAT COSTS LITTLE', P.ink, 100], [new45, 'SO THEY START NEW ONES', P.ink, 100],
        [risk, 'ONE REAL RISK', P.coralInk, 110], [ends46, 'DYING BEFORE IT ENDS', P.coralInk, 100], [fails46, 'THE PLAN MOSTLY FAILS', P.coralInk, 100],
        [congress, "CONGRESS DIDN'T MEAN IT", P.ink, 100], [y1990, 'A 1990 LAW', P.ink, 110], [fought, 'THE IRS FOUGHT IT…', P.ink, 104], [lost48, '… AND LOST', P.ink, 110], [y2000, '2000: THE TAX COURT', P.ink, 104],
        [approved, 'GIFT VALUED AT ≈ $0: APPROVED', P.mintInk, 92], [y2009, 'SINCE 2009: PLANS TO LIMIT IT', P.ink, 96], [none49, 'NONE HAS PASSED', P.coralInk, 110],
        [cost50, 'MAY HAVE COST ≈ $100 BILLION', P.ink, 96], [laurene, 'LAURENE POWELL JOBS', P.ink, 104], [half, '≈ $0.5 BILLION TO HER FAMILY', P.goldInk, 96], [avoiding, '$200M+ TAX AVOIDED', P.mintInk, 104],
        [solves, 'BUT ONLY ONE GENERATION', P.ink, 104], [die52, 'WHEN THE KIDS DIE…?', P.coralInk, 104]]} />

      {/* # A) the stock falls; everything goes back */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <Person f={f} who="investor" beats={[[0, 'idle', 'thinking'], [falls, 'shock', 'shocked'], [back42, 'receive', 'neutral'], [lost43, 'relief', 'smiling'], [anything43, 'thumbsUp', 'smiling'], [fees, 'shrug', 'smiling']]} x={300} y={GROUND} s={1.05} />
        <CashColumn x={lerp(960, 560, backT)} y={GROUND} h={colH} w={lerp(220, 170, backT)} />
        <g opacity={win(f, falls, hands, 8)}><g transform={`translate(1180 ${GROUND - 300})`}><BigArrow x={0} y={0} s={0.9} dir={-1} color={TAXRED} t={on(f, falls, 14)} /></g></g>
        <Pill x={960} y={GROUND + 64} text="INSIDE THE GRAT" size={40} w={320} o={1 - on(f, hands, 10)} />
        <Pill x={960} y={GROUND - 400} text="NOTHING EXTRA" size={46} w={330} o={win(f, extra, hands, 8)} color={TAXRED} />
        <Person f={f} who="buyer" beats={[[0, 'idle', 'smiling'], [falls, 'nervous', 'worried'], [nothing43, 'emptyPockets', 'worried']]} x={1560} y={GROUND} s={0.95} flip />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [falls, 'shock', 'shocked'], [nothing43, 'shrug', 'worried']]} x={1740} y={GROUND} s={0.95} flip />
        <g opacity={on(f, cost43, 8)} transform={`translate(560 ${GROUND - 330 - 20 * (1 - pop(f, cost43, 12))})`}>
          <rect x={-130} y={-60} width={260} height={120} rx={12} fill="#FFFFFF" stroke="#CDB58C" strokeWidth={4} />
          <text y={-14} textAnchor="middle" fill="#5C6F8E" style={{ font: '400 34px "Bebas Neue"', letterSpacing: 2 }}>LAWYER FEES</text>
          <text y={38} textAnchor="middle" fill="#16294A" style={{ font: '400 46px "Bebas Neue"' }}>{f >= k10 ? '$5,000–$10,000' : f >= k5 ? '$5,000' : '$'}</text>
        </g>
      </g>}

      {/* # B) heads I win, tails we tie */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <Person f={f} who="investor" beats={[[cut[0], 'idle', 'smug'], [heads, 'celebrate', 'smiling'], [tails, 'confident', 'smug']]} x={360} y={GROUND} s={1.05} />
        <g transform={`translate(0 ${-120 * Math.sin(Math.PI * flip)})`}><FlipCoin x={960} y={520} r={170} t={flip} a="HEADS" b="TAILS" o={on(f, nickname, 10)} /></g>
        <Pill x={960} y={830} text={f >= tails ? 'TIE: IT ALL GOES BACK TO HIM' : 'WIN: THE GROWTH GOES TO THE KIDS'} size={46} w={720} color={f >= tails ? '#16294A' : '#B4821C'} o={on(f, win44, 8)} />
        <Person f={f} who="hero" beats={[[cut[0], 'idle', 'neutral'], [nickname, 'explain', 'smiling'], [tie, 'shrug', 'smiling']]} x={1560} y={GROUND} s={1.0} flip />
      </g>}

      {/* # C) new GRATs, over and over, several at once */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <rect x={0} y={GROUND - 30} width={1920} height={30} fill="#5C6F8E" opacity={0.5} />
        {Array.from({ length: 24 }, (_, k) => <circle key={k} cx={((k * 80 + f * 3) % 1920)} cy={GROUND - 15} r={9} fill="#3A4A66" opacity={0.6} />)}
        {boxAt.map((at, k) => f >= at - 2 ? <g key={k} opacity={on(f, at, 8)} transform={`translate(0 ${-60 * (1 - pop(f, at, 14))})`}><TrustBox x={260 + k * 280} y={GROUND - 30} s={0.62} label="GRAT" lock={1} glow={win(f, at, at + 24)} /></g> : null)}
        <Pill x={960} y={460} text={f >= several ? 'SEVERAL AT ONCE' : 'FAILED? START A NEW ONE'} size={56} w={640} o={on(f, little, 8)} />
      </g>}

      {/* # D) the risk: dying before the term ends */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        <Hourglass x={560} y={600} s={1.15} t={span(f, cut[2] + 10, ends46 + 40)} />
        <Pill x={560} y={340} text="THE GRAT'S TERM" size={44} w={360} />
        <g opacity={on(f, dies46, 10)}><Portrait x={1200} y={GROUND} s={0.8}><circle cy={-130} r={56} fill="#1F2B4A" /><path d="M-90 0 Q-90 -70 0 -70 Q90 -70 90 0 Z" fill="#22306E" /><path d="M-60 -170 Q0 -215 60 -170 Q30 -190 -10 -186 Z" fill="#1A1636" /></Portrait></g>
        <g opacity={on(f, counted - 10, 10)}><EstateRing x={1330} y={GROUND - 10} rx={420} ry={70} label="" t={span(f, counted - 10, estate46 + 10)} /><Pill x={1330} y={1010} text="HIS ESTATE" size={44} color="#B4821C" w={280} /></g>
        <TrustBox x={lerp(900, 1560, on(f, counted, 22))} y={GROUND} s={0.6} label="GRAT" lock={1} />
        <Pill x={1300} y={330} text="THE PLAN MOSTLY FAILS" size={50} w={560} color={TAXRED} o={on(f, fails46, 8)} />
      </g>}

      {/* # E) Congress, by accident, in 1990 */}
      {E > 0 && <g opacity={E}>
        <Ground y={GROUND} />
        <Capitol x={600} y={GROUND} s={1.1} />
        <g opacity={on(f, y1990 - 6, 8)}><Scroll x={1250} y={GROUND - 260} s={1.2} title="1990 LAW" open={on(f, law47, 16)} /></g>
        <Pill x={1250} y={GROUND - 520} text="CLOSING A DIFFERENT LOOPHOLE" size={42} w={600} o={on(f, close47, 8)} />
        <g opacity={on(f, loophole, 8)} transform={`translate(${lerp(1250, 1600, on(f, loophole, 20))} ${GROUND})`}><TrustBox x={0} y={0} s={0.5} label="GRAT" lock={1} glow={1} /></g>
        <g opacity={win(f, create, y1990, 8)}><TrustBox x={1250} y={GROUND} s={0.5} label="GRAT" lock={1} /><NoMark x={1250} y={GROUND - 70} o={1} r={90} /></g>
      </g>}

      {/* # F) the Tax Court, 2000 */}
      {F > 0 && <g opacity={F}>
        <Ground y={GROUND} />
        <Court x={960} y={GROUND} s={1.05} />
        <g opacity={on(f, fought - 6, 8)}><TaxOffice x={330} y={GROUND} s={0.75} /><Pill x={330} y={GROUND + 70} text="IRS" size={44} w={140} /></g>
        <g opacity={on(f, lost48, 8)}><NoMark x={330} y={GROUND - 150} o={win(f, lost48, y2000, 6)} r={80} /></g>
        <g opacity={on(f, walton - 10, 10)}><Person f={f} who="investorF" beats={[[cut[4], 'idle', 'neutral'], [ruled, 'celebrate', 'smiling'], [approved, 'thumbsUp', 'smiling']]} x={1590} y={GROUND} s={1.0} flip /><Pill x={1560} y={GROUND + 70} text={f >= walmart ? 'AUDREY WALTON (WALMART FAMILY)' : 'AUDREY WALTON'} size={40} w={f >= walmart ? 560 : 300} /></g>
        <g opacity={on(f, ruled, 6) * (1 - on(f, zero48 - 4, 8))}><Stamp x={960} y={330} text="RULED FOR WALTON" f={f} at={ruled} color="#1E9A63" size={60} /></g>
        <g opacity={on(f, grat48, 8)}><TrustBox x={1300} y={GROUND} s={0.42 * pop(f, grat48, 14)} label="GRAT" lock={1} /></g>
        <Pill x={960} y={330} text="GIFT ≈ $0: APPROVED" size={48} w={460} color="#1E7A4C" o={on(f, zero48, 8)} />
      </g>}

      {/* # G) proposals since 2009 bounce off the Capitol */}
      {G > 0 && <g opacity={G}>
        <Ground y={GROUND} />
        <Capitol x={960} y={GROUND} s={1.2} />
        {[proposals, lerp(proposals, limit, 0.5), limit, lerp(limit, none49, 0.5)].map((at, k) => { const t = span(f, at, at + 26), x = lerp(300 + k * 80, 860 + k * 60, Math.min(1, t * 1.6)), y = lerp(GROUND - 100, GROUND - 420, Math.min(1, t * 1.6)) + (t > 0.62 ? (t - 0.62) * 600 : 0)
          return f >= at ? <g key={k} opacity={1 - on(f, at + 30, 8)} transform={`translate(${t > 0.62 ? x - (t - 0.62) * 900 : x} ${y}) rotate(${-8 + k * 5}) scale(0.5)`}>
            <rect x={-150} y={-190} width={300} height={380} rx={18} fill="#FFFFFF" stroke="#CDB58C" strokeWidth={6} /><text y={-110} textAnchor="middle" fill="#16294A" style={{ font: '400 64px "Bebas Neue"' }}>LIMIT GRATS</text>
            {[0, 1, 2, 3].map((j) => <rect key={j} x={-110} y={-60 + j * 46} width={220 - (j % 2) * 60} height={16} rx={8} fill="#D8CBB0" />)}
            <NoMark x={0} y={0} o={on(f, at + 18, 6)} r={200} />
          </g> : null })}
        <Pill x={960} y={340} text={f >= passed ? 'NONE PASSED' : 'SINCE 2009'} size={56} w={380} color={f >= passed ? TAXRED : '#16294A'} o={on(f, y2009, 8)} />
      </g>}

      {/* # H) ≈ $100 billion since 2000 */}
      {H > 0 && <g opacity={H}>
        <Ground y={GROUND} />
        <g opacity={on(f, estimated, 8)}><TrustBox x={380} y={GROUND} s={0.5} label="GRAT" lock={1} /></g>
        <CashColumn x={760} y={GROUND} h={lostH} w={300} color="gold" />
        <Pill x={760} y={GROUND - lostH - 60} text="≈ $100 BILLION" size={56} w={380} color="#B4821C" o={on(f, b100, 8)} />
        <Pill x={760} y={GROUND + 64} text={f >= y2000b ? '2000 → 2013' : '2013'} size={44} w={260} o={on(f, y2013, 8)} />
        <g opacity={on(f, cost50, 10)}><TaxOffice x={1380} y={GROUND} s={0.95} /><Pill x={1380} y={GROUND + 64} text="TAX NOT COLLECTED" size={40} w={360} color={TAXRED} /></g>
        <Pill x={760} y={330} text="ESTIMATE BY THE LAWYER WHO PIONEERED IT" size={40} w={800} o={on(f, pioneered, 8)} color="#5C6F8E" />
      </g>}

      {/* # I) a series of GRATs: about half a billion to the family */}
      {I > 0 && <g opacity={I}>
        <Ground y={GROUND} />
        <Pill x={260} y={GROUND + 64} text="LAURENE POWELL JOBS" size={36} w={360} o={on(f, powell, 8)} />
        <Person f={f} who="investorF" beats={[[cut[7], 'idle', 'smiling'], [series, 'present', 'smiling'], [avoiding, 'confident', 'smug']]} x={260} y={GROUND} s={1.0} />
        {[0, 1, 2, 3].map((k) => { const at = lerp(series, half, k / 3); return <g key={k} opacity={on(f, at, 8)}><TrustBox x={560 + k * 220} y={GROUND} s={0.42 * pop(f, at, 12)} label="GRAT" lock={1} /></g> })}
        <CashColumn x={1520} y={GROUND} h={330 * on(f, half, 20)} w={220} color="gold" />
        <Pill x={1520} y={GROUND - 330 * on(f, half, 20) - 60} text="≈ $0.5 BILLION" size={48} w={330} color="#B4821C" o={on(f, half, 8)} />
        <Pill x={1520} y={GROUND + 64} text="HER FAMILY" size={42} w={250} o={on(f, family, 8)} />
        <g opacity={on(f, m200, 8)} transform={`translate(1100 ${GROUND - 560})`}><RedBill x={0} y={0} s={0.6} amount="$200M+" /><NoMark x={0} y={0} o={on(f, tax51, 8)} r={100} /></g>
      </g>}

      {/* # J) one generation only */}
      {J > 0 && <g opacity={J}>
        <Ground y={GROUND} />
        <g opacity={on(f, die52 - 10, 14)}><TaxOffice x={1450} y={GROUND} s={1.1} eat={on(f, die52, 12)} /></g>
        <CashColumn x={700} y={GROUND} h={200} w={200} color="gold" />
        <g opacity={on(f, grat52, 8)}><TrustBox x={700} y={GROUND - 200} s={0.4} label="GRAT" lock={1} /></g>
        <Person f={f} who="buyer" beats={[[cut[8], 'idle', 'smiling'], [generation, 'countOne', 'smiling'], [kids52, 'think', 'thinking'], [die52, 'nervous', 'worried']]} x={380} y={GROUND} s={1.0} />
        <Person f={f} who="investorF" beats={[[cut[8], 'idle', 'smiling'], [happens, 'scratchHead', 'thinking'], [die52, 'shock', 'worried']]} x={1030} y={GROUND} s={1.0} flip />
        <Pill x={700} y={GROUND - 340} text="ONE GENERATION" size={46} w={360} o={on(f, generation, 8)} />
      </g>}
      <Vignette id="tt-grat2" />
    </g>
  )
}

const BEATS = ['s48:grat', 's50:estimated', 's43:anything', 's43:cost', 's51:tax', 's51:powell', 's52:grat', 's42:falls', 's42:extra', 's42:hands', 's42:back', 's43:kids', 's43:nothing', 's43:lost', 's43:fees', 's43:5000', 's43:10000', 's44:nickname', 's44:heads', 's44:win', 's44:tails', 's44:tie',
  's45:failed', 's45:little', 's45:start', 's45:new', 's45:over', 's45:several', 's45:once', 's46:risk', 's46:dies', 's46:ends', 's46:counted', 's46:estate', 's46:fails',
  's47:congress', 's47:create', 's47:1990', 's47:law', 's47:close', 's47:loophole', 's48:fought', 's48:lost', 's48:2000', 's48:ruled', 's48:walton', "s48:walmart's", 's48:approved', 's48:zero',
  's49:2009', 's49:proposals', 's49:limit', 's49:none', 's49:passed', 's50:2013', 's50:pioneered', 's50:cost', 's50:100', 's50:2000', 's51:laurene', 's51:series', 's51:half', 's51:family', 's51:avoiding', 's51:200',
  's52:solves', 's52:generation', 's52:happens', 's52:kids', 's52:die']
export const TT_GRAT2 = makePiece('tt-grat2', 'Trusts step two, part two: the column inside the GRAT shrinks under a red down arrow and slides back to the billionaire while the kids shrug with empty pockets, a lawyer-fees card ($5,000–$10,000); a big gold coin flips HEADS (growth to the kids) to TAILS (all back to him); a conveyor of GRAT boxes, new ones popping on, several at once; an hourglass for the term, a portrait appears and the box is pulled into an ESTATE ring (plan mostly fails); the Capitol and a 1990 law scroll out of which a GRAT box slides; the Tax Court between the IRS (crossed, lost) and Audrey Walton, gavel falls, gift ≈ $0 approved; LIMIT GRATS papers fly at the Capitol and bounce back crossed (since 2009, none passed); a gold column of ≈ $100 billion of tax not collected 2000 → 2013; four GRAT boxes pass ≈ $0.5 billion to a family, a $200M+ tax bill crossed; the kids with one generation’s stack while the tax office opens behind them', {
  mood: 'light', Component: Grat2, beats: BEATS,
  sfx: [['s42:falls', 'whoosh', 0.2], ['s43:fees', 'pop', 0.15], ['s44:tails', 'coin', 0.25], ['s45:new', 'pop', 0.15], ['s46:dies', 'thud', 0.2], ['s48:ruled', 'impact', 0.25], ['s49:none', 'thud', 0.2], ['s50:100', 'cash', 0.2], ['s51:200', 'pop', 0.2], ['s52:die', 'thud', 0.2]] })
