// ---------------------------------------------------------------- s45–s69: idea three, compounding (cream).
// A) Interest on interest: Ava's $10,000 pile (EXAMPLE RATE 7% sign); year 1 adds a $700 layer, year 2 adds $749 —
//    the extra $49 glows as "interest on interest"; the pile keeps rising.
// B) A snowball rolls downhill, growing as it goes.
// C) Bars at 0/10/20/30 years: compound $10,000 → $19,700 → $38,700 → $76,000 vs simple-interest bars → $31,000.
//    Same money, same rate, same 30 years: three tokens; the compound bars glow "interest keeps working".
// D) Brackets on the compound curve: first 10 years +$9,700, last 10 years +$37,000.
// E) $100 a month: a jar fills with monthly coins; a bar splits into $36,000 put in + $80,000+ interest ≈ $120,000.
// F) Rule of 72: 72 ÷ 7 ≈ 10 years to double (a $10,000 brick becomes two); for inflation at 3.7%, a price tag doubles
//    and a bill's buying power halves in about 19 years.
// G) Recap: the snowball at the bottom of the hill, much bigger.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Label, Person, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { CashBrick, DollarBill } from '../bank/kit'
import { Snowball, Tag } from './kit'

const GROUND = 930
const GREY = '#B9C3D0'

// # a value bar (bottom at GROUND-40), height h, with value label on top and year label below
const VBar: React.FC<{ x: number; h: number; col: string; v: string; yr: string; o?: number; w?: number; glow?: number }> = ({ x, h, col, v, yr, o = 1, w = 120, glow = 0 }) => (
  <g opacity={o}>
    {glow > 0 && <rect x={x - w / 2 - 10} y={GROUND - 40 - h - 10} width={w + 20} height={h + 10} rx={14} fill={P.gold} opacity={0.3 * glow} />}
    <rect x={x - w / 2} y={GROUND - 40 - h} width={w} height={h} rx={10} fill={col} />
    <text x={x} y={GROUND - 56 - h} textAnchor="middle" fill="var(--cc-ink)" style={{ font: '400 46px "Bebas Neue"' }}>{v}</text>
    <text x={x} y={GROUND + 6} textAnchor="middle" fill="var(--cc-ink2)" style={{ font: '400 38px "Bebas Neue"' }}>{yr}</text>
  </g>
)

const Comp: React.FC<PieceProps> = ({ f, c }) => {
  const time45 = c('s45:time'), work45 = c('s45:work')
  const means46 = c('s46:means'), interest46 = c('s46:interest'), interest46b = c('s46:interest#2')
  const year47 = c('s47:year'), maths47 = c('s47:maths'), earns50 = c('s50:earns'), k10700b = c('s50:10700'), only56 = c('s56:only'), example47 = c('s47:example'), p7 = c('s47:7'), promise = c('s47:promise')
  const puts48 = c('s48:puts'), k10 = c('s48:10000'), p7b = c('s48:7')
  const one49 = c('s49:one'), d700 = c('s49:700'), now49 = c('s49:now'), k10700 = c('s49:10700')
  const two50 = c('s50:two'), d749 = c('s50:749'), more50 = c('s50:more'), interest50 = c('s50:interest'), earning50 = c('s50:earning')
  const pile51 = c('s51:pile'), bigger51 = c('s51:bigger'), interest51 = c('s51:interest'), bigger51b = c('s51:bigger#2')
  const snowball = c('s52:snowball'), rolling = c('s52:rolling'), picks = c('s52:picks'), snow = c('s52:snow'), bigger52 = c('s52:bigger')
  const y10 = c('s53:10'), grown = c('s53:grown'), k19 = c('s53:19700')
  const y20 = c('s54:20'), k38 = c('s54:38700')
  const y30 = c('s55:30'), k76 = c('s55:76000')
  const compare = c('s56:compare'), simple56 = c('s56:simple'), first56 = c('s56:first'), d700b = c('s56:700'), year56 = c('s56:year')
  const y30b = c('s57:30'), k31 = c('s57:31000')
  const same58 = c('s58:same'), rate58 = c('s58:rate'), years58 = c('s58:years'), difference = c('s58:difference'), keeps58 = c('s58:keeps'), working = c('s58:working')
  const notice = c('s59:notice'), growth59 = c('s59:growth'), end59 = c('s59:end')
  const first60 = c('s60:first'), k97 = c('s60:9700'), last60 = c('s60:last'), k37 = c('s60:37000')
  const time61 = c('s61:time'), longer = c('s61:longer'), faster = c('s61:faster'), grows61 = c('s61:grows')
  const small62 = c('s62:small'), d100 = c('s62:100'), month62 = c('s62:month'), p7c = c('s62:7')
  const y30c = c('s63:30'), k36 = c('s63:36000'), pile63 = c('s63:pile'), k120 = c('s63:120000')
  const k80 = c('s64:80000'), interest64 = c('s64:interest'), deposits64 = c('s64:deposits'), earlier = c('s64:earlier')
  const trick65 = c('s65:trick'), rule65 = c('s65:rule'), d72 = c('s65:72')
  const comp45 = c('s45:compounding'), ava62 = c('s62:ava'), ex62 = c('s62:example'), which45 = c('s45:which'), comp58 = c('s58:compounding'), trick68 = c('s68:trick'), roughly66 = c('s66:roughly'), divide = c('s66:divide'), yearly = c('s66:yearly'), double66 = c('s66:double')
  const p7d = c('s67:7'), divided67 = c('s67:divided'), ten67 = c('s67:10'), money67 = c('s67:money'), double67 = c('s67:double')
  const inflation68 = c('s68:inflation'), p3 = c('s68:3'), prices68 = c('s68:prices'), double68 = c('s68:double'), halves = c('s68:halves'), d19 = c('s68:19')
  const step69 = c('s69:step'), growth69 = c('s69:growth'), time69 = c('s69:time')

  const AB = snowball - 8, BC = y10 - 8, CD = notice - 6, DE = small62 - 8, EF = trick65 - 8, FG = step69 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cw = win(f, BC, CD), D = win(f, CD, DE), E = win(f, DE, EF), F = win(f, EF, FG), G = on(f, FG, 10)
  const S = 0.0085 // # px per dollar for the 0–30-year bars (76,123 → 800 px)

  return (
    <g>
      <Stage id="m4-comp" frame={f} />
      <Headline f={f} lines={[[work45, 'IDEA 3: COMPOUNDING', P.ink, 110], [means46, 'INTEREST ON INTEREST', P.ink, 106], [example47, 'EXAMPLE RATE: 7% (NOT A PROMISE)', P.ink, 92], [snowball, 'LIKE A SNOWBALL', P.ink, 110], [y10, '$10,000 AT AN EXAMPLE 7%', P.ink, 98], [compare, 'COMPOUND VS SIMPLE', P.ink, 106], [notice, 'MOST GROWTH COMES LATE', P.ink, 104], [small62, '$100 A MONTH, EXAMPLE 7%', P.ink, 100], [trick65, 'THE RULE OF 72', P.ink, 110], [step69, 'GROWTH ON GROWTH', P.ink, 110]]} />

      {/* # A) the growing pile */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [puts48, 'offer', 'smiling'], [d700, 'celebrate', 'smiling'], [d749, 'pointUp', 'smiling'], [bigger51b, 'thumbsUp', 'smiling']]} x={330} y={GROUND} s={1.1} />
        <g opacity={on(f, p7, 8) * (1 - on(f, puts48, 8))} transform={`translate(1100 ${520 - 10 * pop(f, p7, 12) - 10 * pop(f, year47, 12)})`}><rect x={-300} y={-80} width={600} height={160} rx={24} fill="#FFFFFF" stroke="#CDB58C" strokeWidth={4} /><text y={0} textAnchor="middle" fill="#16294A" style={{ font: '400 64px "Bebas Neue"' }}>EXAMPLE: 7% A YEAR</text>
          <text y={56} textAnchor="middle" fill="#C94A3E" opacity={on(f, promise, 8)} style={{ font: '400 40px "Bebas Neue"' }}>NOT A PROMISE</text>
          <g opacity={on(f, maths47, 8) * (1 - on(f, promise, 8))}><text y={56} textAnchor="middle" fill="#5C6F8E" style={{ font: '400 40px "Bebas Neue"' }}>JUST TO SHOW THE MATHS</text></g></g>
        <g opacity={on(f, comp45, 8) * (1 - on(f, example47, 8))}><Coin x={1000} y={640 - 14 * pop(f, which45, 12)} s={2} /><Coin x={1140} y={560} s={1.4} o={on(f, interest46b, 8)} /><path d="M1060 610 Q1100 560 1110 570" stroke={P.goldInk} strokeWidth={5} fill="none" opacity={on(f, interest46b, 8)} /></g>
        {/* the pile: base $10,000 + year layers */}
        <g opacity={on(f, k10, 8)} transform="translate(1100 0)">
          {Array.from({ length: 5 }, (_, k) => <CashBrick key={k} x={0} y={GROUND - 6 - k * 50} s={2.2} />)}
          <Label x={-200} y={GROUND - 120} text="$10,000" size={50} font="Bebas Neue" color={P.ink} anchor="end" />
          <g opacity={on(f, d700, 8)}><rect x={-120} y={GROUND - 6 - 4 * 50 - 50 - 40} width={240} height={40} rx={8} fill={P.gold} /><Label x={160} y={GROUND - 270} text="+$700 (YEAR 1)" size={46} font="Bebas Neue" color={P.goldInk} anchor="start" /></g>
          <g opacity={on(f, d749, 8)}><rect x={-120} y={GROUND - 336 - 42} width={240} height={42} rx={8} fill={P.gold} /><rect x={92} y={GROUND - 336 - 42} width={28} height={42} rx={6} fill={P.mint} />
            <Label x={160} y={GROUND - 344} text="+$749 (YEAR 2)" size={46} font="Bebas Neue" color={P.goldInk} anchor="start" /></g>
          <g opacity={on(f, interest50, 8)}><Label x={160} y={GROUND - 400} text="+$49 = INTEREST ON INTEREST" size={40} font="Bebas Neue" color={P.mintInk} anchor="start" /></g>
          <g opacity={win(f, earns50, d749, 6)}><Label x={160} y={GROUND - 344} text={f >= k10700b ? "7% OF $10,700" : "7% OF…"} size={46} font="Bebas Neue" color={P.goldInk} anchor="start" /></g>
          <g opacity={on(f, k10700, 8) * (1 - on(f, two50, 8))}><Label x={0} y={GROUND - 340} text="$10,700" size={56} font="Bebas Neue" color={P.ink} /></g>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, lerp(pile51, bigger51b, k / 2), 8)}><rect x={-120} y={GROUND - 378 - 46 * (k + 1)} width={240} height={44 + 4 * k} rx={8} fill={P.gold} opacity={0.85} /></g>)}
        </g>
      </g>}

      {/* # B) the snowball */}
      {B > 0 && <g opacity={B}>
        <path d="M-100 380 L2020 960 L2020 1200 L-100 1200 Z" fill="#FFFFFF" /><path d="M-100 380 L2020 960" stroke="#C9D3DF" strokeWidth={8} />
        {(() => { const t = span(f, rolling, bigger52 + 20), x = lerp(120, 1700, t), y = 380 + (x + 100) * (580 / 2120), r = lerp(40, 190, t * t)
          return <Snowball x={x} y={y} r={r} spin={t * 900} /> })()}
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, [picks, snow, bigger52][k], 8)}><Label x={400 + k * 520} y={260} text={['PICKS UP SNOW', 'MORE EACH TURN', 'BECAUSE IT’S BIGGER'][k]} size={48} font="Bebas Neue" color={P.ink} /></g>)}
      </g>}

      {/* # C) compound vs simple bars */}
      {Cw > 0 && <g opacity={Cw}>
        <Ground y={GROUND} />
        <line x1={160} y1={GROUND - 40} x2={1780} y2={GROUND - 40} stroke={P.ink} strokeWidth={4} />
        {([[0, 10000, '$10,000', 'START', y10 - 4], [1, 19672, '$19,700', '10 YRS', k19], [2, 38697, '$38,700', '20 YRS', k38], [3, 76123, '$76,000', '30 YRS', k76]] as [number, number, string, string, number][]).map(([k, v, l, yr, at]) =>
          <VBar key={k} x={300 + k * 420} h={v * S * on(f, at, 16)} col={P.gold} v={l} yr={yr} o={on(f, at, 6)} glow={win(f, comp58, working + 30, 8)} />)}
        {([[0, 10000, '', simple56], [1, 17000, '', only56], [2, 24000, '', first56], [3, 31000, '$31,000', k31]] as [number, number, string, number][]).map(([k, v, l, at]) =>
          <VBar key={k} x={420 + k * 420} h={v * S * on(f, at, 16)} col={GREY} v={l} yr="" o={on(f, at, 6)} w={90} />)}
        <g opacity={on(f, simple56, 8)}><rect x={200} y={380} width={34} height={34} rx={6} fill={GREY} /><Label x={244} y={410} text="SIMPLE INTEREST" size={40} font="Bebas Neue" color={P.ink2} anchor="start" />
          <rect x={200} y={430} width={34} height={34} rx={6} fill={P.gold} /><Label x={244} y={460} text="COMPOUNDING" size={40} font="Bebas Neue" color={P.goldInk} anchor="start" /></g>
        <g opacity={win(f, same58, difference, 6)}>{[['SAME $', same58], ['SAME 7%', rate58], ['SAME 30 YRS', years58]].map(([t, at], k) => <g key={k} opacity={on(f, at as number, 6)}><rect x={300 + k * 260} y={250} width={230} height={70} rx={35} fill="#2E5C9A" /><text x={415 + k * 260} y={298} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>{t as string}</text></g>)}</g>
      </g>}

      {/* # D) first 10 vs last 10 years */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        <line x1={160} y1={GROUND - 40} x2={1780} y2={GROUND - 40} stroke={P.ink} strokeWidth={4} />
        {([[0, 10000, '$10,000', 'START'], [1, 19672, '$19,700', '10 YRS'], [2, 38697, '$38,700', '20 YRS'], [3, 76123, '$76,000', '30 YRS']] as [number, number, string, string][]).map(([k, v, l, yr]) =>
          <VBar key={k} x={360 + k * 420} h={v * S} col={P.gold} v={l} yr={yr} />)}
        <g opacity={on(f, k97, 8)}><path d={`M440 ${GROUND - 40 - 10000 * S} L720 ${GROUND - 40 - 10000 * S} M720 ${GROUND - 40 - 10000 * S} L720 ${GROUND - 40 - 19672 * S}`} stroke={P.mint} strokeWidth={8} fill="none" />
          <Label x={560} y={GROUND - 40 - 19672 * S - 70} text="+$9,700" size={58} font="Bebas Neue" color={P.mintInk} /><Label x={560} y={GROUND - 40 - 19672 * S - 20} text="FIRST 10 YEARS" size={36} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, k37, 8)}><path d={`M1280 ${GROUND - 40 - 38697 * S} L1560 ${GROUND - 40 - 38697 * S} L1560 ${GROUND - 40 - 76123 * S}`} stroke={P.coral} strokeWidth={8} fill="none" />
          <Label x={1340} y={GROUND - 40 - 66000 * S} text="+$37,000" size={64} font="Bebas Neue" color={P.coralInk} /><Label x={1340} y={GROUND - 40 - 66000 * S + 46} text="LAST 10 YEARS" size={36} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, longer, 8)}><Label x={420} y={300} text="THE LONGER IT RUNS…" size={52} font="Bebas Neue" color={P.ink} /><Label x={420} y={360} text="…THE FASTER IT GROWS" size={52} font="Bebas Neue" color={P.goldInk} o={on(f, faster, 8)} /></g>
      </g>}

      {/* # E) $100 a month */}
      {E > 0 && <g opacity={E}>
        <Ground y={GROUND} />
        <Person f={f} who="investorF" beats={[[DE, 'idle', 'smiling'], [ava62, 'waveA', 'smiling'], [d100, 'offer', 'smiling'], [k120, 'celebrate', 'smiling']]} x={300} y={GROUND} s={1.05} />
        <g opacity={on(f, ex62, 8) * (1 - on(f, k36, 8))}><Label x={720} y={440} text="EXAMPLE 7% A YEAR" size={46} font="Bebas Neue" color={P.ink2} /></g>
        <g transform="translate(720 0)"><rect x={-110} y={600} width={220} height={320} rx={36} fill="#DDEBF7" opacity={0.5} stroke="#A9C4DE" strokeWidth={6} />
          <rect x={-104} y={920 - 300 * span(f, month62, k36)} width={208} height={300 * span(f, month62, k36)} rx={28} fill={P.gold} opacity={0.8} />
          <Label x={0} y={GROUND + 60} text="$100 EVERY MONTH" size={44} font="Bebas Neue" color={P.ink} o={on(f, month62, 8)} /></g>
        {f >= d100 && f < k36 && Array.from({ length: 4 }, (_, k) => { const u = ((f - d100) / 40 + k / 4) % 1; return <Coin key={k} x={lerp(400, 720, u)} y={600 - Math.sin(u * Math.PI) * 90} s={0.6} o={Math.sin(u * Math.PI)} /> })}
        {/* the result bar: deposits + interest */}
        <g transform="translate(1380 0)">
          <g opacity={on(f, k36, 8)}><rect x={-120} y={GROUND - 40 - 36000 * 0.0045} width={240} height={36000 * 0.0045} rx={8} fill={GREY} /><Label x={150} y={GROUND - 80} text="$36,000 PUT IN" size={44} font="Bebas Neue" color={P.ink2} anchor="start" /></g>
          <g opacity={on(f, k120, 8)}><rect x={-120} y={GROUND - 40 - 121288 * 0.0045 * on(f, k120, 20)} width={240} height={(121288 - 36000) * 0.0045 * on(f, k120, 20)} rx={8} fill={P.gold} />
            <Label x={0} y={GROUND - 70 - 121288 * 0.0045} text="≈ $120,000" size={58} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, k80, 8)}><Label x={150} y={GROUND - 40 - 80000 * 0.0045} text="80,000+ INTEREST" size={46} font="Bebas Neue" color={P.goldInk} anchor="start" /></g>
          <line x1={-160} y1={GROUND - 40} x2={160} y2={GROUND - 40} stroke={P.ink} strokeWidth={4} />
        </g>
      </g>}

      {/* # F) the rule of 72 */}
      {F > 0 && <g opacity={F}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, inflation68, 10)}>
          <g transform={`translate(960 ${430 - 10 * pop(f, d72, 12)})`}><rect x={-360} y={-90} width={720} height={180} rx={30} fill="#16294A" />
            <text y={30} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 96px "Bebas Neue"' }}>{f >= ten67 ? '72 ÷ 7 ≈ 10 YEARS' : f >= p7d ? '72 ÷ 7…' : f >= yearly ? '72 ÷ RATE' : 'RULE OF 72'}</text></g>
          <g opacity={on(f, roughly66, 8)}><Label x={960} y={570} text={f >= double66 ? "≈ YEARS TO DOUBLE" : "≈ YEARS…"} size={52} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, money67, 8)} transform="translate(960 0)"><CashBrick x={-160} y={GROUND - 20} s={2.4} /><g opacity={on(f, double67, 10)}><CashBrick x={160} y={GROUND - 20} s={2.4} /></g>
            <Label x={0} y={GROUND - 120} text={f >= double67 ? '$10,000 → ≈ $20,000' : '$10,000'} size={50} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={win(f, trick68, inflation68 + 6, 6)}><Label x={960} y={690} text="ALSO WORKS FOR INFLATION" size={52} font="Bebas Neue" color={P.coralInk} /></g>
        <g opacity={on(f, inflation68, 10)}>
          <g transform="translate(560 0)"><Tag x={-80} y={560} t="$100" s={1.3} /><g opacity={on(f, double68, 10)}><Tag x={-80} y={lerp(560, 400, on(f, double68, 16))} t="$200" s={1.5} col="#F06B5B" ink="#FFFFFF" /></g>
            <Label x={0} y={760} text="PRICES DOUBLE" size={50} font="Bebas Neue" color={P.coralInk} o={on(f, prices68, 8)} /></g>
          <g transform="translate(1360 0)" opacity={on(f, c("s68:money's"), 8)}><DollarBill x={0} y={560} s={lerp(1.8, 0.9, on(f, halves, 20))} t="$100" />
            <Label x={0} y={760} text="BUYING POWER HALVES" size={50} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, d19, 8)}><Label x={960} y={880} text="≈ 19 YEARS AT 3.7%" size={60} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}

      {/* # G) recap: the snowball at the bottom */}
      {G > 0 && <g opacity={G}>
        <path d="M-100 380 L2020 960 L2020 1200 L-100 1200 Z" fill="#FFFFFF" /><path d="M-100 380 L2020 960" stroke="#C9D3DF" strokeWidth={8} />
        <Snowball x={1500} y={380 + 1600 * (580 / 2120)} r={lerp(120, 200, on(f, growth69, 20))} spin={f * 2} />
        <g opacity={on(f, time69, 8)}><Label x={600} y={330} text="+ TIME" size={80} font="Bebas Neue" color={P.goldInk} /></g>
      </g>}
      <Vignette id="m4-comp" />
    </g>
  )
}

const BEATS = ['s45:compounding', 's62:ava', 's62:example', 's45:which', 's58:compounding', 's68:trick', 's66:roughly', 's47:year', 's47:maths', 's50:earns', 's50:10700', 's56:only', 's45:time', 's45:work', 's46:means', 's46:interest', 's46:interest#2', 's47:example', 's47:7', 's47:promise', 's48:puts', 's48:10000', 's48:7', 's49:one', 's49:700', 's49:now', 's49:10700', 's50:two', 's50:749', 's50:more', 's50:interest', 's50:earning', 's51:pile', 's51:bigger', 's51:interest', 's51:bigger#2', 's52:snowball', 's52:rolling', 's52:picks', 's52:snow', 's52:bigger', 's53:10', 's53:grown', 's53:19700', 's54:20', 's54:38700', 's55:30', 's55:76000', 's56:compare', 's56:simple', 's56:first', 's56:700', 's56:year', 's57:30', 's57:31000', 's58:same', 's58:rate', 's58:years', 's58:difference', 's58:keeps', 's58:working', 's59:notice', 's59:growth', 's59:end', 's60:first', 's60:9700', 's60:last', 's60:37000', 's61:time', 's61:longer', 's61:faster', 's61:grows', 's62:small', 's62:100', 's62:month', 's62:7', 's63:30', 's63:36000', 's63:pile', 's63:120000', 's64:80000', 's64:interest', 's64:deposits', 's64:earlier', 's65:trick', 's65:rule', 's65:72', 's66:divide', 's66:yearly', 's66:double', 's67:7', 's67:divided', 's67:10', 's67:money', 's67:double', 's68:inflation', 's68:3', 's68:prices', 's68:double', "s68:money's", 's68:halves', 's68:19', 's69:step', 's69:growth', 's69:time']
export const M4_COMP = makePiece('m4-comp', 'Idea three, compounding: interest on interest (a coin makes a smaller coin); an example 7% sign (not a promise); Ava’s $10,000 brick pile gains a $700 year-1 layer and a $749 year-2 layer whose extra $49 is interest on interest, then more layers; a snowball rolls downhill growing; bars at 0/10/20/30 years ($10,000, $19,700, $38,700, $76,000) beside simple-interest bars ending at $31,000; same money, same 7%, same 30 years; first 10 years +$9,700 vs last 10 years +$37,000; $100 a month fills a jar, a bar of $36,000 put in plus 80,000+ interest ≈ $120,000; rule of 72: 72 ÷ 7 ≈ 10 years, a $10,000 brick becomes two; at 3.7% inflation a $100 tag doubles and a bill’s buying power halves in about 19 years; the big snowball plus time', {
  mood: 'light', Component: Comp, beats: BEATS,
  sfx: [['s49:700', 'coin', 0.2], ['s50:749', 'coin', 0.2], ['s55:76000', 'pop', 0.25], ['s57:31000', 'thud', 0.15], ['s63:120000', 'pop', 0.2], ['s67:10', 'pop', 0.2]] })
