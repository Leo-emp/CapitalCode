// ---------------------------------------------------------------- s20–s37: how the auction works (casino-style rebuild).
// One setting for the whole chapter: the auction hall. You stand on the left; the auctioneer at the GOOGLE podium;
// three shoe-shop owners with paddles; a big board on the back wall. Paddles go up with example bids $2, $1.50 and
// $1; a crown floats over the $2 shop, then gets crossed. USEFUL meters rise beside each shop (A low, B high, C mid);
// the board shows what Google also reads from your search (WORDS, PLACE, DEVICE, TIME), then turns into AD RANK.
// Shop A gets a snail (slow page) and an off-topic "BIG SALE!" bubble; Shop B a "RUNNING SHOES ✓" bubble; Shop B takes
// the top spot. A pointer hovers the top ad (seen = $0), then clicks: a coin flies from Shop B to the podium, tagged
// "OFTEN LESS THAN THE BID". The pointer scrolls past ($0); finally coins stream from every shop to Google.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, fly, Headline, Person, win } from '../aimoney/common'
import { PriceTag } from '../charts'
import { gestB } from '../buffett/hook'
import { Pointer } from './kit'
import { PaddleMini, SHOPS } from './search'

// # the back-wall board: a title and three boxes (text + fill colour per box)
const Board: React.FC<{ title: string; boxes: [string, string | null][]; o?: number }> = ({ title, boxes, o = 1 }) => (
  <g transform="translate(1290 355)" opacity={o}>
    <rect x={-400} y={-120} width={800} height={240} rx={18} fill="#0D1424" stroke={P.gold} strokeWidth={6} />
    <text x={0} y={-74} textAnchor="middle" fill={P.gold} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 3 }}>{title}</text>
    {boxes.map(([t, col], k) => <g key={k} transform={`translate(${(k - (boxes.length - 1) / 2) * (720 / boxes.length)} 30)`}>
      <rect x={-330 / boxes.length * 1.0} y={-55} width={660 / boxes.length} height={110} rx={12} fill={col ?? '#2A3448'} />
      <text x={0} y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: `400 ${boxes.length > 3 ? 36 : 42}px "Bebas Neue"` }}>{t}</text>
    </g>)}
  </g>
)
// # Google's vault: a safe with a G on the door and n coins stacked inside (used by the later scenes)
export const Vault: React.FC<{ x: number; y: number; s?: number; n?: number }> = ({ x, y, s = 1, n = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-200} y={-200} width={400} height={400} rx={28} fill="#5B6680" />
    <rect x={-170} y={-170} width={340} height={340} rx={20} fill="#2A3448" />
    {Array.from({ length: Math.max(0, Math.round(n)) }, (_, i) => <ellipse key={i} cx={-60 + (i % 3) * 60} cy={140 - Math.floor(i / 3) * 26} rx={50} ry={14} fill={P.gold} stroke={P.goldD} strokeWidth={4} />)}
    <circle cx={0} cy={-60} r={70} fill="#1A73E8" /><text x={0} y={-30} textAnchor="middle" fill="#FFFFFF" style={{ font: '700 90px Inter' }}>G</text>
  </g>
)
// # a label sized to its text (never runs off its tag)
const Tag: React.FC<{ x: number; y: number; text: string; color: string; ink?: string; s?: number }> = ({ x, y, text, color, ink = '#3A2A12', s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><rect x={-(text.length * 13 + 30)} y={-36} width={text.length * 26 + 60} height={72} rx={16} fill={color} /><text y={16} textAnchor="middle" fill={ink} style={{ font: '400 46px "Bebas Neue"' }}>{text}</text></g>
)
// # a USEFUL meter: a glass tube that fills to v
const Meter: React.FC<{ x: number; v: number; glow?: number; o?: number }> = ({ x, v, glow = 0, o = 1 }) => (
  <g transform={`translate(${x} 1000)`} opacity={o}>
    {glow > 0 && <rect x={-36} y={-336} width={72} height={340} rx={36} fill={P.gold} opacity={0.4 * glow} />}
    <rect x={-22} y={-320} width={44} height={320} rx={22} fill="#2A3448" />
    <rect x={-16} y={-6 - 300 * v} width={32} height={300 * v} rx={16} fill={v > 0.7 ? P.mint : v > 0.45 ? P.gold : P.coral} />
    <text x={0} y={-334} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 30px "Bebas Neue"' }}>USEFUL</text>
  </g>
)
// # a speech bubble above a shop: its ad
const Bubble: React.FC<{ x: number; y: number; text: string; good: boolean; o: number; s?: number }> = ({ x, y, text, good, o, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-170} y={-50} width={340} height={100} rx={22} fill="#FFFFFF" stroke={good ? P.mint : '#9AA3B5'} strokeWidth={6} />
    <path d="M-20 48 L0 80 L20 48 Z" fill="#FFFFFF" />
    <text x={0} y={14} textAnchor="middle" fill={good ? '#1A0DAB' : '#6B7280'} style={{ font: '400 44px "Bebas Neue"' }}>{text}</text>
  </g>
)

const Auction: React.FC<PieceProps> = ({ f, c }) => {
  const wins = c('s20:wins'), bid21 = c('s21:bid'), pay21 = c('s21:pay'), clicks21 = c('s21:clicks')
  const b2 = c('s22:2'), fifty = c('s22:fifty'), b1 = c('s22:1'), highest = c('s23:highest'), simple = c('s23:simple')
  const scores = c('s24:scores'), useful = c('s24:useful'), page24 = c('s24:page'), words = c('s25:words'), device = c('s25:device'), time25 = c('s25:time')
  const helpful = c('s26:helpful'), beat = c('s26:beat'), rank = c('s27:rank'), show = c('s27:show'), order = c('s27:order')
  const shoe28 = c('s28:shoe'), slow = c('s29:slow'), barely = c('s29:barely'), matches = c('s30:matches'), exactly = c('s30:exactly'), top = c('s31:top'), lower31 = c('s31:lower')
  const sense = c('s32:sense'), nobody32 = c('s32:nobody'), key = c('s33:key'), saw = c('s33:saw'), click34 = c('s34:click')
  const most = c('s35:most'), lower35 = c('s35:lower'), scroll = c('s36:scroll'), nobody36 = c('s36:nobody'), click37 = c('s37:click'), money37 = c('s37:money'), google37 = c('s37:google')
  // # extra gesture words
  const G = [c('s24:you'), c('s26:bid#2'), c('s22:say'), c('s23:but'), c('s25:also'), c('s25:looks'), c('s27:google'), c('s27:calls'), c('s29:the'), c('s30:dollar'), c('s31:fifty'), c('s32:nothing'), c('s33:pay'), c('s34:pays'), c('s35:the#2')]
  const SX = [920, 1290, 1660], BIDS = ['$2', '$1.50', '$1'], Q = [0.3, 0.9, 0.6]
  // # paddles: up while bidding; the poor $2 shop drops when the helpful one beats it; all down while the ads talk
  const up = (k: number) => on(f, [b2, fifty, b1][k], 6) * (1 - on(f, shoe28, 8)) * (k === 0 ? 1 - 0.7 * on(f, beat, 8) : 1) + (k === 1 ? on(f, most, 8) * (1 - on(f, scroll, 8)) : 0)
  const meters = win(f, scores - 2, shoe28 + 20, 8)
  // # the board: spots → your search → AD RANK
  const board = f < words - 4
    ? { title: 'AD SPOTS ON YOUR PAGE', boxes: [['SPOT 1', null], ['SPOT 2', null], ['SPOT 3', null]] as [string, string | null][] }
    : f < rank - 4
      ? { title: 'GOOGLE ALSO READS YOUR SEARCH', boxes: ([['WORDS', words], ['PLACE', words + 10], ['DEVICE', device], ['TIME', time25]] as [string, number][]).map(([t, at]) => [f >= at ? t : '·', f >= at ? '#1A73E8' : null]) as [string, string | null][] }
      : { title: 'AD RANK = BID + QUALITY + CONTEXT', boxes: [[f >= top ? 'SHOP B' : '1ST', f >= top ? SHOPS[1][1] : null], ['2ND', null], ['3RD', null]] as [string, string | null][] }
  // # the pointer: hovers the top ad (seen), clicks it, then scrolls down past
  const pX = lerp(lerp(300, 1010, easeInOut(span(f, key, saw))), 1000, on(f, scroll, 10)), pY = lerp(480, 470, 0) + 360 * easeInOut(span(f, scroll, scroll + 30))
  const clickT = span(f, click34, click34 + 12)
  return (
    <g>
      <StageBg id="gg-auction" frame={f} />
      {/* # the hall: dark panelled walls, a light ceiling band behind the headline */}
      <rect x={0} y={0} width={1920} height={1000} fill="#1E2A47" />
      {Array.from({ length: 13 }, (_, k) => <rect key={k} x={40 + k * 150} y={0} width={60} height={1000} fill="#24335A" />)}
      <rect x={0} y={0} width={1920} height={215} fill="#EFE6D6" /><rect x={0} y={205} width={1920} height={22} fill="#8E6A45" />
      <rect x={0} y={1000} width={1920} height={80} fill="#B98F63" /><rect x={0} y={990} width={1920} height={14} fill="#8E6A45" />
      {/* # everything inside the room at 80% (owner: objects and people were too large) */}
      <g transform="translate(960 1000) scale(0.8) translate(-960 -1000)">
      <Board title={board.title} boxes={board.boxes} />
      <g transform="translate(960 1000) scale(0.92) translate(-960 -1000)">
      {/* # a crown over the $2 shop, then crossed out */}
      <g opacity={win(f, highest - 2, helpful, 8)} transform={`translate(${SX[0]} 580) scale(${pop(f, highest)})`}>
        <path d="M-60 30 L-60 -20 L-30 10 L0 -36 L30 10 L60 -20 L60 30 Z" fill={P.gold} />
        <path d="M-80 -50 L80 50 M80 -50 L-80 50" stroke={P.coral} strokeWidth={14} strokeLinecap="round" opacity={on(f, simple, 6)} />
      </g>
      {/* # USEFUL meters */}
      {SX.map((x, k) => <Meter key={k} x={x - 150} v={Q[k] * easeInOut(span(f, useful + k * 4, useful + k * 4 + 18))} glow={k === 1 ? on(f, helpful, 8) * (1 - on(f, rank, 8)) : 0} o={meters} />)}
      {/* # the ads talk: off-topic vs matching; the snail */}
      <Bubble x={SX[0]} y={500} text="BIG SALE!" good={false} o={win(f, barely - 2, sense + 30, 8)} s={pop(f, barely) * 0.85} />
      <Bubble x={SX[1]} y={500} text="RUNNING SHOES ✓" good o={win(f, matches - 2, key, 8)} s={pop(f, matches) * 0.85} />
      <g opacity={win(f, slow - 2, key, 8)} transform={`translate(${SX[0] - 150 + 30 * span(f, slow, key)} 990)`}><ellipse cx={0} cy={-30} rx={50} ry={30} fill="#C98A5A" /><circle cx={-6} cy={-46} r={34} fill="#E9B98C" stroke="#8E5E36" strokeWidth={6} /><path d="M40 -20 q30 -40 20 -60" stroke="#8E5E36" strokeWidth={6} fill="none" /><text x={0} y={-100} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 34px "Bebas Neue"' }}>SLOW PAGE</text></g>
      <g opacity={win(f, nobody32, key, 6)} transform={`translate(${SX[0]} 580) scale(${pop(f, nobody32)})`}><Coin x={0} y={0} s={0.9} text="$0" /><path d="M-60 -60 L60 60" stroke={P.coral} strokeWidth={12} strokeLinecap="round" /></g>
      {/* # the auctioneer at the podium */}
      <Person f={f} who="investor" beats={gestB([[0, 'idle', 'neutral'], [wins, 'explain', 'neutral'], [highest, 'point', 'thinking'], [simple, 'crossNoA', 'smug'], [scores, 'present', 'smiling'], [rank, 'explain', 'smiling'], [top, 'point', 'smiling'], [click34, 'receive', 'smiling'], [google37, 'celebrate', 'smiling']], G)} x={520} y={1000} s={1} />
      <g transform="translate(520 1000)"><rect x={-130} y={-230} width={260} height={230} rx={14} fill="#5A3A22" /><rect x={-150} y={-260} width={300} height={44} rx={10} fill="#1A73E8" /><text x={0} y={-226} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 36px "Bebas Neue"', letterSpacing: 4 }}>GOOGLE</text></g>
      {SHOPS.map((_, k) => <PaddleMini key={k} f={f} x={SX[k]} k={k} up={up(k)} bid={f > (k === 1 && f > most ? most : 9e9) ? 'MAX' : f >= [b2, fifty, b1][k] ? BIDS[k] : '$'} mood={k === 1 && f > top ? 'happy' : k === 0 && f > simple && f < key ? 'sad' : 'neutral'} s={2.4} />)}
      {/* # the click: a coin from Shop B to the podium, tagged "often less than the bid" */}
      {(() => { const p = fly(f, click34 + 6, [SX[1], 700], [520, 720], 20, 200); return <g opacity={p.o}><Coin x={p.x} y={p.y} s={0.8} /></g> })()}
      <g opacity={win(f, lower35 - 4, scroll, 6)}><Tag x={940} y={560} s={pop(f, lower35)} text="OFTEN LESS THAN THE BID" color={P.gold} /></g>
      {/* # seen = $0; scroll past = $0 */}
      <g opacity={win(f, saw, click34, 4)}><Tag x={1290} y={580} text="SEEN, NOT CLICKED: $0" color="#FFFFFF" /></g>
      <g opacity={win(f, nobody36 - 4, click37, 6)}><Tag x={1290} y={580} s={pop(f, nobody36)} text="NO CLICK = $0" color={P.mint} /></g>
      {/* # every click: coins stream from all shops to Google */}
      {Array.from({ length: 9 }, (_, k) => { const p = fly(f, click37 + k * 4, [SX[k % 3], 700], [520, 720], 18, 180); return <g key={k} opacity={p.o}><Coin x={p.x} y={p.y} s={0.6} /></g> })}
      <g opacity={win(f, key - 4, click37 + 40, 8)}><Pointer x={pX} y={pY} s={1.2} click={clickT} /></g>
      {/* # you, on the left */}
      <Person o={on(f, key - 10, 10)} f={f} who="buyer" beats={gestB([[0, 'lookFar', 'thinking'], [bid21, 'explain', 'neutral'], [highest, 'shrug', 'thinking'], [words, 'phone', 'neutral'], [rank, 'point', 'smiling'], [shoe28, 'explain', 'neutral'], [top, 'thumbsUp', 'smiling'], [key, 'phone', 'neutral'], [click34, 'point', 'smiling'], [scroll, 'phone', 'neutral'], [click37, 'present', 'smiling']], G.slice(7))} x={110} y={1000} s={1.15} />
      </g>
      </g>
      <Headline f={f} lines={[[wins, 'WHO WINS?', P.ink, 110], [bid21, 'A BID = MOST IT WILL PAY PER CLICK', P.ink, 92], [b2, 'EXAMPLE BIDS', P.ink, 104], [highest, 'HIGHEST BID WINS? NOT QUITE', P.ink, 100], [scores, 'QUALITY: HOW USEFUL FOR YOU', P.goldInk, 100],
        [words, 'AND THE SEARCH ITSELF', P.ink, 104], [rank, 'AD RANK DECIDES THE ORDER', P.goldInk, 100], [shoe28, 'BACK TO OUR SHOE SHOPS', P.ink, 100], [top, 'LOWER BID, TOP SPOT', P.goldInk, 104], [key, 'THE KEY PART', P.ink, 110],
        [click34, 'PAY ONLY WHEN YOU CLICK', P.goldInk, 104], [most, 'OFTEN LESS THAN THE BID', P.ink, 104], [scroll, 'NO CLICK, NO PAYMENT', P.ink, 104], [click37, 'EVERY CLICK: MONEY TO GOOGLE', P.goldInk, 100]]} />
      <Vignette id="gg-auction" />
    </g>
  )
}

const BEATS = ['s24:you', 's26:bid#2', 's22:say', 's23:but', 's25:also', 's25:looks', 's27:google', 's27:calls', 's29:the', 's30:dollar', 's31:fifty', 's32:nothing', 's33:pay', 's34:pays', 's35:the#2', 's20:wins', 's21:bid', 's21:pay', 's21:clicks', 's22:2', 's22:fifty', 's22:1', 's23:highest', 's23:simple', 's24:scores', 's24:useful', 's24:page', 's25:words', 's25:device', 's25:time', 's26:helpful', 's26:beat', 's27:rank', 's27:show', 's27:order',
  's28:shoe', 's29:slow', 's29:barely', 's30:matches', 's30:exactly', 's31:top', 's31:lower', 's32:sense', 's32:nobody', 's33:key', 's33:saw', 's34:click', 's35:most', 's35:lower', 's36:scroll', 's36:nobody', 's37:click', 's37:money', 's37:google']
export const GG_AUCTION = makePiece('gg-auction', 'Google long (casino-style): the auction hall stays for the whole chapter — you on the left, the auctioneer at the GOOGLE podium, three shoe-shop owners with paddles and a big board; paddles show example bids $2, $1.50 and $1; a crown over the $2 shop gets crossed out; USEFUL meters rise (A low, B high, C mid); the board shows WORDS, PLACE, DEVICE and TIME, then becomes AD RANK; Shop A gets a snail (slow page) and an off-topic BIG SALE! bubble, Shop B a RUNNING SHOES ✓ bubble and takes the top spot; a pointer hovers the top ad (seen = $0), clicks it, and a coin flies from Shop B to Google tagged OFTEN LESS THAN THE BID; the pointer scrolls past (no click = $0); coins stream from every shop to Google', {
  mood: 'light', Component: Auction, beats: BEATS,
  sfx: [['s22:1', 'click', 0.3], ['s23:simple', 'swish', 0.3], ['s27:rank', 'ding', 0.3], ['s31:top', 'chime', 0.3], ['s34:click', 'click', 0.35], ['s37:google', 'coin', 0.35]] })
