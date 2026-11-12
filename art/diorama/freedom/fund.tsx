// ---------------------------------------------------------------- s61–s70: step four, put the money to work.
// A) An orchard: Maya plants saved dollars like seeds; a block of cash shrinks as price tags rise beside it.
// B) A broad index fund: a wicker basket that holds a tiny city of 500 little company buildings (20 × 25).
// C) Not one company: a single tower on a die is crossed; Maya holds a slice cut from the whole city; no trophy-picking, no newspaper; the fund follows the list (ticks).
// D) The companies drop gold coins (profits → dividends) into the basket and a price arrow climbs.
// E) Funds that try to beat it: 100 runners, 79 fall behind (grey). Fees: two $100 jars — 9 cents vs 57 cents taken each year; taken coins can't grow (a sprout wilts).
import React from 'react'
import { lerp, on, pop, span, rnd } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { Backdrop, Bundle, C, Check, CoinG, Cross, Defs, FONT, Grain, Mini, Tag, fadeIn, scene } from './kit'

const G = 930

// # a tiny company building (one of the 500)
const Mini500: React.FC<{ x: number; y: number; k: number; o?: number }> = ({ x, y, k, o = 1 }) => {
  const h = 16 + Math.floor(rnd(k) * 22), col = [C.skyD, C.terra, C.sage, C.plum, C.gold][k % 5]
  return <g opacity={o}><rect x={x} y={y - h} width={14} height={h} fill={col} /><rect x={x} y={y - h} width={4} height={h} fill="#fff" opacity={0.2} /></g>
}
// # the wicker basket (index fund) — front drawn over its contents
const Basket: React.FC<{ x: number; y: number; s?: number; o?: number; children?: React.ReactNode; label?: string }> = ({ x, y, s = 1, o = 1, children, label }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={430} ry={30} fill="#000" opacity={0.18} />
    <path d="M-380 -260 Q0 -520 380 -260" fill="none" stroke="#A8763E" strokeWidth={22} />
    {children}
    <path d="M-400 -260 L400 -260 L340 0 L-340 0 Z" fill="#C9935E" />
    {Array.from({ length: 6 }, (_, r) => <path key={r} d={`M${-395 + r * 10} ${-240 + r * 42} L${395 - r * 10} ${-240 + r * 42}`} stroke="#A8763E" strokeWidth={8} />)}
    {Array.from({ length: 15 }, (_, k) => <path key={'v' + k} d={`M${-380 + k * 54} -260 L${-322 + k * 46} 0`} stroke="#B8844E" strokeWidth={6} />)}
    <rect x={-410} y={-280} width={820} height={30} rx={14} fill="#A8763E" />
    {label && <g transform="translate(0 -130)"><rect x={-250} y={-46} width={500} height={92} rx={18} fill={C.cream} /><text y={20} textAnchor="middle" fill={C.ink} style={{ font: `400 54px ${FONT.big}`, letterSpacing: 2 }}>{label}</text></g>}
  </g>
)
// # a glass jar of $100 with coins; taken 0–1 lifts some coins out (n of them)
const Jar100: React.FC<{ x: number; y: number; n: number; taken: number; label: string; o?: number }> = ({ x, y, n, taken, label, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={170} ry={18} fill="#000" opacity={0.15} />
    <rect x={-150} y={-380} width={300} height={380} rx={40} fill="#DCEBF5" opacity={0.55} />
    <rect x={-130} y={-300} width={260} height={290} rx={26} fill="url(#fr-cashg)" opacity={0.9} />
    <text y={-140} textAnchor="middle" fill="#fff" style={{ font: `400 80px ${FONT.big}` }}>$100</text>
    <rect x={-110} y={-420} width={220} height={50} rx={14} fill={C.woodD} />
    <path d="M-150 -340 L-120 -340 L-120 -40 L-150 -60 Z" fill="#fff" opacity={0.45} />
    {Array.from({ length: n }, (_, k) => <g key={k} opacity={on(taken, k * 0.12, 0.2)}><CoinG x={lerp(0, 230 + (k % 3) * 56, taken)} y={lerp(-200, -470 - Math.floor(k / 3) * 56, taken)} s={0.55} /></g>)}
    <text y={70} textAnchor="middle" fill={C.ink} style={{ font: `400 40px ${FONT.big}` }}>{label}</text>
  </g>
)

const Fund: React.FC<PieceProps> = ({ f, c }) => {
  const putting = c('s61:putting'), saved61 = c('s61:saved'), work61 = c('s61:work')
  const cash62 = c('s62:cash'), loses = c('s62:loses'), prices = c('s62:prices'), rise = c('s62:rise'), invested62 = c('s62:invested')
  const simple63 = c('s63:simple'), broad = c('s63:broad'), index63 = c('s63:index'), fund63 = c('s63:fund')
  const buys = c('s64:buys'), piece64 = c('s64:piece'), list64 = c('s64:list'), five64 = c('s64:five'), companies64 = c('s64:companies'), sp64 = c('s64:sp')
  const betting = c('s65:betting'), one65 = c('s65:one'), owns = c('s65:owns'), slice65 = c('s65:slice'), all65 = c('s65:all')
  const pick = c('s66:pick'), winners = c('s66:winners'), news = c('s66:news'), follows = c('s66:follows'), list66 = c('s66:list')
  const profits = c('s67:profits'), slice67 = c('s67:slice'), dividends = c('s67:dividends'), rising = c('s67:rising'), prices67 = c('s67:prices')
  const actively68 = c('s68:actively'), funds68 = c('s68:funds'), beat68 = c('s68:beat'), charge = c('s68:charge'), most = c('s68:most'), y2025 = c('s68:2025'), seventy68 = c('s68:seventy'), worse68 = c('s68:worse')
  const fees = c('s69:fees'), nine69 = c('s69:nine'), hundred69 = c('s69:hundred'), actively = c('s69:actively'), fifty69 = c('s69:fifty')
  const tiny70 = c('s70:tiny'), decades70 = c('s70:decades'), grow70 = c('s70:grow'), anymore = c('s70:anymore')

  const AB = c('s63') - 6, BC = c('s65') - 6, CD = c('s67') - 6, DE = c('s68') - 6, EF = c('s69') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = scene(f, CD, DE), E = scene(f, DE, EF), F = fadeIn(f, EF)

  // # the tiny city: 500 buildings in 20 rows of 25 (drawn inside the basket)
  const city = (o: number, appearA: number, appearB: number, dx = 0, dy = 0, sc = 1) => (
    <g opacity={o} transform={`translate(${dx} ${dy}) scale(${sc})`}>
      {Array.from({ length: 500 }, (_, k) => { const col = k % 25, row = Math.floor(k / 25)
        return <Mini500 key={k} x={-330 + col * 26.5 + (row % 2) * 6} y={-300 + row * 10 - 220} k={k} o={on(f, lerp(appearA, appearB, (row * 25 + col) / 499), 4)} /> })}
    </g>)
  const cityRow = (y0: number, o: number) => <g opacity={o}>{Array.from({ length: 25 }, (_, k) => <Mini500 key={k} x={-330 + k * 26.5} y={y0} k={k * 7} />)}</g>

  return (
    <g>
      <Defs />
      {/* # A) put saved dollars to work; cash alone melts as prices rise */}
      {A > 0 && <g opacity={A}>
        <Backdrop sky="orchard" f={f} sun={[1650, 230]} ground={G} />
        {[0, 1, 2, 3].map((k) => { const at = lerp(saved61, work61, k / 3), gx = 300 + k * 170
          return <g key={k} opacity={on(f, at - 4, 8)}>
            <ellipse cx={gx} cy={G + 10} rx={60} ry={14} fill="#6E4A2E" />
            <g transform={`translate(${gx} ${lerp(G - 120, G - 10, on(f, at, 12))}) scale(0.5)`}><CoinG x={0} y={0} /></g>
            <path d={`M${gx} ${G} q -6 ${-40 * on(f, at + 14, 12)} 0 ${-80 * on(f, at + 14, 12)}`} stroke={C.moss} strokeWidth={8} fill="none" />
            <ellipse cx={gx + 18} cy={G - 70 * on(f, at + 14, 12)} rx={20 * on(f, at + 14, 12)} ry={10 * on(f, at + 14, 12)} fill={C.sage} />
          </g> })}
        <Person f={f} who="investorF" beats={[[0, 'reachDown', 'smiling'], [work61 + 10, 'idle', 'smiling'], [loses, 'nervous', 'worried'], [c('s62:grow'), 'think', 'thinking'], [invested62, 'pointUp', 'smiling']]} x={1000} y={G} s={0.9} />
        <g opacity={on(f, cash62 - 6, 10)} transform={`translate(1450 ${G})`}>
          <g transform={`scale(${lerp(1, 0.6, on(f, loses, 40))})`}>{[0, 1, 2].map((r) => [0, 1].map((k) => <Bundle key={r + '-' + k} x={-62 + k * 124} y={-26 - r * 46} />))}</g>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, lerp(prices, rise + 6, k / 2), 8)} transform={`translate(${180 + k * 10} ${-150 - k * 90 - 30 * on(f, rise, 20)}) rotate(${8 - k * 6})`}><rect x={-60} y={-30} width={120} height={60} rx={10} fill={C.cream} stroke={C.terra} strokeWidth={4} /><circle cx={-40} cy={0} r={8} fill={C.terra} /><text x={10} y={16} textAnchor="middle" fill={C.terra} style={{ font: `400 42px ${FONT.big}` }}>↑ $</text></g>)}
          <Tag x={0} y={G - G + 70} text="CASH LOSES VALUE" size={36} o={on(f, loses, 8)} point="none" />
        </g>
      </g>}

      {/* # B) the broad index fund: a basket of 500 companies */}
      {B > 0 && <g opacity={B}>
        <Backdrop sky="orchard" f={f} sun={[1700, 230]} ground={G} />
        <Basket x={960} y={G} s={1.05} label={f >= fund63 ? 'INDEX FUND' : undefined}>{city(1, buys, five64 + 10)}</Basket>
        <Tag x={960} y={300} text={f >= c('s64:500') ? '500 BIG US COMPANIES · S&P 500' : '500 BIG US COMPANIES'} size={44} o={on(f, five64, 8)} point="none" color={C.cream} />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'neutral'], [c('s63:simple'), 'present', 'smiling'], [c('s63:people'), 'explain', 'smiling'], [piece64, 'point', 'neutral'], [c('s64:companies'), 'present', 'smiling'], [sp64, 'thumbsUp', 'smiling']]} x={250} y={G} s={0.85} />
      </g>}

      {/* # C) not one company: a slice of all of them; no picking, no news */}
      {Cc > 0 && <g opacity={Cc}>
        <Backdrop sky="orchard" f={f} sun={[1700, 230]} ground={G} />
        <g opacity={win(f, betting - 6, owns, 8)} transform={`translate(560 ${G})`}>
          <rect x={-110} y={-220} width={220} height={220} rx={26} fill={C.cream} stroke="#C9B48E" strokeWidth={5} />{[[-50, -170], [50, -50], [0, -110]].map(([dx, dy], k) => <circle key={k} cx={dx} cy={dy} r={16} fill={C.ink} />)}
          <rect x={-50} y={-520} width={100} height={300} fill={C.skyD} /><rect x={-50} y={-520} width={26} height={300} fill="#fff" opacity={0.2} />
          <Cross x={0} y={-300} r={170} p={on(f, one65 + 6, 12)} />
        </g>
        <g opacity={on(f, owns - 4, 10)}>
          <Basket x={1360} y={G} s={0.62}>{city(1, -1e9, -1e9)}</Basket>
          <g transform={`translate(${lerp(1360, 620, on(f, slice65, 20))} ${lerp(G - 300, G - 420, on(f, slice65, 20))}) scale(0.9)`}><rect x={-345} y={-36} width={690} height={46} rx={10} fill={C.cream} />{cityRow(0, 1)}</g>
          <Tag x={620} y={G - 520} text="A TINY SLICE OF ALL 500" size={40} o={on(f, all65, 8)} />
          <Person f={f} who="investorF" beats={[[0, 'holdUp', 'smiling'], [pick, 'crossNoA', 'neutral', 'crossNoB', 10], [follows, 'relax', 'smiling']]} x={620} y={G} s={0.85} o={on(f, slice65 + 10, 8)} />
        </g>
        <g opacity={on(f, winners - 6, 8) * (1 - on(f, follows, 8))}>
          <g transform={`translate(1000 ${G - 260})`}><path d="M-60 -80 L60 -80 L50 0 Q0 50 -50 0 Z" fill={C.gold} /><rect x={-14} y={30} width={28} height={50} fill={C.goldD} /><rect x={-60} y={80} width={120} height={24} rx={6} fill={C.goldD} /></g><Cross x={1000} y={G - 240} r={120} p={on(f, winners + 4, 12)} />
        </g>
        <g opacity={on(f, news - 6, 8) * (1 - on(f, follows, 8))}>
          <g transform={`translate(1000 ${G - 560}) rotate(-6)`}><rect x={-120} y={-80} width={240} height={160} rx={8} fill="#F4F1EA" /><rect x={-100} y={-62} width={200} height={26} fill={C.ink} /><rect x={-100} y={-20} width={90} height={80} fill="#C9CED8" />{[0, 1, 2, 3].map((k) => <rect key={k} x={10} y={-20 + k * 20} width={90} height={8} fill="#C9CED8" />)}</g><Cross x={1000} y={G - 560} r={120} p={on(f, news + 4, 12)} />
        </g>
        <g opacity={on(f, list66 - 4, 8)}>{[0, 1, 2].map((k) => <Check key={k} x={1050} y={G - 600 + k * 120} r={40} p={on(f, list66 + k * 4, 8)} />)}<Tag x={1260} y={G - 480} text="FOLLOWS THE LIST" size={40} o={on(f, list66, 8)} point="none" /></g>
      </g>}

      {/* # D) profits flow back: dividends and rising share prices */}
      {D > 0 && <g opacity={D}>
        <Backdrop sky="orchard" f={f} sun={[1700, 230]} ground={G} />
        <Basket x={800} y={G} s={1}>{city(1, -1e9, -1e9)}</Basket>
        {Array.from({ length: 10 }, (_, k) => { const t0 = lerp(profits, dividends + 20, k / 9), t = span(f, t0, t0 + 18)
          return t > 0 && t < 1 ? <g key={k}><CoinG x={500 + k * 66} y={lerp(G - 560, G - 300, t)} s={0.6} o={1 - t * 0.3} /></g> : null })}
        <Tag x={800} y={300} text="PROFITS → DIVIDENDS" size={44} o={on(f, dividends, 8)} point="none" color={C.gold} />
        <g opacity={on(f, rising - 6, 10)} transform={`translate(1500 ${G - 120})`}>
          <path d={`M-160 120 L-60 40 L20 70 L160 ${120 - 300 * on(f, rising, 30)}`} fill="none" stroke={C.cashD} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" />
          <path d={`M160 ${120 - 300 * on(f, rising, 30)} l -40 10 l 30 30 Z`} fill={C.cashD} />
          <Tag x={0} y={200} text="RISING SHARE PRICES" size={36} o={on(f, prices67, 8)} point="none" />
        </g>
      </g>}

      {/* # E) 79 of 100 active funds did worse than the S&P 500 in 2025 */}
      {E > 0 && <g opacity={E}>
        <Backdrop sky="orchard" f={f} sun={null} ground={G} />
        {Array.from({ length: 100 }, (_, k) => { const col = k % 20, row = Math.floor(k / 20), behind = ((k * 37) % 100) < 79
          const lose = behind ? on(f, lerp(actively68, worse68, ((k * 37) % 100) / 79), 6) : 0
          return <g key={k} opacity={on(f, lerp(beat68 - 4, c('s68:most'), (col + row) / 23), 6)}><Mini x={430 + col * 56} y={420 + row * 100 + 30 * lose} s={0.9} tone={lose > 0.5 ? 'grey' : 'warm'} /></g> })}
        <rect x={380} y={360} width={8} height={520} fill={C.cashD} opacity={0} />
        <Tag x={1640} y={300} text="IN 2025" size={40} o={on(f, y2025, 8)} point="none" color={C.gold} />
        <Tag x={960} y={G + 70} text={f >= c('s68:sp') ? '79 IN 100 DID WORSE THAN THE S&P 500' : f >= worse68 ? '79 IN 100 DID WORSE' : '79 IN 100'} size={38} o={on(f, seventy68, 8)} point="none" color={C.terra} ink="#fff" />
        <Tag x={960} y={290} text={f >= actively68 ? 'ACTIVELY MANAGED LARGE US STOCK FUNDS' : 'ACTIVE FUNDS: THEY CHARGE MORE'} size={40} o={on(f, charge, 8)} point="none" />
      </g>}

      {/* # F) fees: 9 cents vs 57 cents a year per $100; taken money can't grow */}
      {F > 0 && <g opacity={F}>
        <Backdrop sky="orchard" f={f} sun={[1700, 230]} ground={G} />
        <g opacity={on(f, c('s69:broad') - 4, 8)} transform={`translate(620 ${G - 20}) scale(${0.94 + 0.06 * pop(f, hundred69, 14)}) translate(-620 ${-(G - 20)})`}><Jar100 x={620} y={G - 20} n={1} taken={span(f, nine69, nine69 + 20)} label="BROAD INDEX FUND" /></g>
        <Tag x={620} y={G + 130} text="PER $100 INVESTED" size={30} o={on(f, c('s69:invested'), 8)} point="none" />
        <Tag x={860} y={G - 560} text="ABOUT 9¢ A YEAR" size={42} o={on(f, nine69 + 10, 8)} color={C.cashD} ink="#fff" />
        <Jar100 x={1300} y={G - 20} n={6} taken={span(f, fifty69, fifty69 + 26)} label="ACTIVE FUND" o={on(f, actively - 6, 10)} />
        <Tag x={1560} y={G - 640} text="ABOUT 57¢ A YEAR" size={42} o={on(f, c('s69:seven'), 8)} color={C.terra} ink="#fff" />
        <g opacity={on(f, c('s70:taken'), 8)}><Tag x={1300} y={G + 130} text="TAKEN EVERY YEAR" size={32} o={1} point="none" color={C.terra} ink="#fff" /></g>
        <rect x={1150} y={G - 420} width={300} height={10} rx={5} fill={C.gold} opacity={win(f, c('s70:few'), c('s70:tiny') + 10, 4)} />
        <g opacity={on(f, decades70 - 6, 10)} transform={`translate(1640 ${G})`}>
          <path d={`M0 0 q ${-10 - 40 * on(f, grow70, 20)} -60 ${-30 * on(f, grow70, 20)} -120`} stroke={C.moss} strokeWidth={10} fill="none" />
          <ellipse cx={-30 * on(f, grow70, 20) + 20} cy={-120 + 60 * on(f, grow70, 20)} rx={34} ry={16} fill={f >= c('s70:money') ? '#B9A46A' : C.sage} />
          <ellipse cx={-30 * on(f, grow70, 20) - 10} cy={-80 + 40 * on(f, anymore, 20)} rx={24} ry={12} fill={f >= anymore ? '#A8925A' : C.sage} opacity={on(f, decades70, 8)} />
          <Tag x={0} y={70} text="TAKEN MONEY CAN'T GROW" size={32} o={on(f, grow70, 8)} point="none" />
        </g>
      </g>}

      <Headline f={f} lines={[[putting, 'STEP 4: PUT THE MONEY TO WORK', C.ink, 96], [cash62, 'CASH SLOWLY LOSES VALUE', C.terraD, 100], [broad, 'A BROAD INDEX FUND', C.ink, 104], [betting, 'NOT ONE COMPANY: ALL OF THEM', C.ink, 96],
        [profits, 'HER SLICE SHARES THE PROFITS', C.cashD, 96], [beat68, 'TRYING TO BEAT THE MARKET', C.ink, 100], [fees, 'FEES MATTER TOO', C.terraD, 104], [tiny70, 'EVERY YEAR, FOR DECADES', C.ink, 104]]} />
      <Grain />
    </g>
  )
}

const BEATS = ["s62:grow", "s63:fund", "s64:every", "s64:list", "s64:companies", "s64:500", "s67:time", "s67:slice", "s68:large", "s68:stock", "s68:sp", "s69:seven", "s70:few", "s70:tiny", "s70:taken", "s70:money", "s70:anymore", 's61:saved', 's61:work', 's62:cash', 's62:loses', 's62:prices', 's62:rise', 's62:invested', 's63:simple', 's63:people', 's63:broad', 's63:index', 's64:buys', 's64:piece', 's64:five', 's64:sp',
  's65:betting', 's65:one', 's65:owns', 's65:slice', 's65:all', 's66:pick', 's66:winners', 's66:news', 's66:follows', 's66:list', 's67:profits', 's67:dividends', 's67:rising', 's67:prices',
  's68:beat', 's68:charge', 's68:most', 's68:2025', 's68:seventy', 's68:actively', 's68:funds', 's68:worse', 's69:fees', 's69:broad', 's69:charged', 's69:nine', 's69:hundred', 's69:invested', 's69:actively', 's69:fifty', 's70:tiny', 's70:decades', 's70:grow']
export const FR_FUND = makePiece('fr-fund', 'Freedom step four: Maya plants coins that sprout in an orchard; a block of cash shrinks as ↑$ price tags rise (CASH LOSES VALUE); a wicker basket INDEX FUND holding a tiny city of 500 company buildings (500 BIG US COMPANIES · S&P 500); a single tower on a die crossed, Maya holds a slice of the whole city (A TINY SLICE OF ALL 500), a trophy and a newspaper crossed, FOLLOWS THE LIST ticks; gold coins drop from the companies into the basket (PROFITS → DIVIDENDS) and a price arrow climbs; 100 little runners, 79 sink grey (79 IN 100 DID WORSE THAN THE S&P 500, 2025); two $100 jars: about 9¢ vs about 57¢ taken a year; a sprout wilts (TAKEN MONEY CAN\'T GROW)', {
  mood: 'light', Component: Fund, beats: BEATS,
  sfx: [['s61:work', 'softpop', 0.15], ['s62:rise', 'tick', 0.12], ['s63:index', 'chime', 0.15], ['s65:one', 'swish', 0.15], ['s67:dividends', 'coin', 0.15], ['s68:seventy', 'thud', 0.15], ['s69:nine', 'coin', 0.12], ['s69:fifty', 'coin', 0.15]] })
