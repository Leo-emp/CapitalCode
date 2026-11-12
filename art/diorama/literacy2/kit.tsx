// ============================================================
// LONG VIDEO (remake) — "Financial Literacy: Everything You Need to Know"
// Art direction: "TWO LIVES" — a warm picture-book city on cream paper.
// Two coworkers, Maya (sage / teal accents) and Jordan (terracotta
// accents), live the same salary two ways. Settings change part by
// part: their shared office, their two apartments side by side, a
// dinner table, a dentist's room, a street of shops, a bank hall, a
// garden where money grows. Depth: wall gradients, window light, floor
// boards, soft contact shadows, paper grain on top.
// Owner rules: cream is the main background (r57); one picture group at
// a time, the last one leaves before the next arrives (r55/r62/r79);
// nothing overlaps; no zooms (r56); show X then cross it (r68).
// Only engine helpers are shared (timing, Person rig, Headline); the
// small drawn parts reused from this same video's first cut live in
// ../literacy/kit2 (jar, arrow, gauge, scale…).
// ============================================================
import React from 'react'
import { clamp01, lerp } from '../kit'

// ------------------------------------------------------------ palette
export const L = {
  ink: '#22303F', inkSoft: '#56657A',
  cream: '#FBF3E2', creamD: '#EFE2C6', creamL: '#FFF9EE',
  wall: '#F3E6CC', wallD: '#E2CFAA', floor: '#C99A6B', floorD: '#A97B50',
  sage: '#7FB59A', sageD: '#4E8C6E', sageL: '#CFE6D8',
  terra: '#E07A5F', terraD: '#B4553C', terraL: '#F6C9B8',
  dusk: '#9DB4D6', duskD: '#5F7FAE', sky: '#BFE0F2', skyD: '#7FB4D8',
  mustard: '#E9B949', mustardD: '#B88A22', mustardL: '#F7DE9C',
  red: '#D9534A', redD: '#A33A33', cash: '#5DB27F', cashD: '#2F8556', gold: '#F2C14E', goldD: '#B8862A',
  plum: '#7A5C8E', night: '#2C3A55', white: '#FFFFFF',
}
export const FONT = { big: '"Bebas Neue"', body: 'Inter' }

// # cue helper (same shape as the first cut): K = { name: 's9:offer' } → t.name = frame
export const cues = <T extends Record<string, string>>(c: (k: string) => number, K: T) => Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as { [P in keyof T]: number }
// # scene opacity: fades in at a, out at b
export const fadeIn = (f: number, a: number, d = 10) => (f < a - 2 ? 0 : Math.min(1, (f - (a - 2)) / d))
export const scene = (f: number, a: number, b: number, d = 10) => (f >= b + d + 2 ? 0 : fadeIn(f, a, d) * (1 - clamp01((f - b) / d)))
// # visible only between two cues (in at a, out at b)
export const during = (f: number, a: number, b: number, d = 8) => clamp01((f - (a - 2)) / d) * (1 - clamp01((f - b) / d))

// ------------------------------------------------------------ shared gradients + grain
export const LDefs: React.FC = () => (
  <defs>
    <linearGradient id="ll-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFF8EA" /><stop offset="1" stopColor={L.wall} /></linearGradient>
    <linearGradient id="ll-wallcool" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#EEF0F4" /><stop offset="1" stopColor="#D9DEE8" /></linearGradient>
    <linearGradient id="ll-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={L.floor} /><stop offset="1" stopColor={L.floorD} /></linearGradient>
    <linearGradient id="ll-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#A9D6F0" /><stop offset="1" stopColor="#FCE9C8" /></linearGradient>
    <linearGradient id="ll-skydusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6C7FAE" /><stop offset="1" stopColor="#E8B79C" /></linearGradient>
    <linearGradient id="ll-paper" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={L.creamL} /><stop offset="1" stopColor={L.cream} /></linearGradient>
    <linearGradient id="ll-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FBE29A" /><stop offset="1" stopColor={L.goldD} /></linearGradient>
    <radialGradient id="ll-glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#FFF4CC" stopOpacity="0.9" /><stop offset="1" stopColor="#FFF4CC" stopOpacity="0" /></radialGradient>
    <radialGradient id="ll-vig" cx="0.5" cy="0.45" r="0.75"><stop offset="0.6" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#3A2A10" stopOpacity="0.22" /></radialGradient>
    <filter id="ll-grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" /><feColorMatrix values="0 0 0 0 0.3  0 0 0 0 0.25  0 0 0 0 0.2  0 0 0 0.07 0" /></filter>
  </defs>
)
export const LGrain: React.FC = () => <><rect width={1920} height={1080} filter="url(#ll-grain)" pointerEvents="none" /><rect width={1920} height={1080} fill="url(#ll-vig)" pointerEvents="none" /></>

export const FLOOR = 900   // # floor line in rooms

// ------------------------------------------------------------ backdrops
// # a window onto the city (day or dusk), with a skyline and a few lit windows
const Window: React.FC<{ x: number; y: number; w: number; h: number; dusk?: boolean }> = ({ x, y, w, h, dusk }) => (
  <g>
    <rect x={x - 14} y={y - 14} width={w + 28} height={h + 28} rx={8} fill={L.creamD} />
    <rect x={x} y={y} width={w} height={h} fill={`url(#${dusk ? 'll-skydusk' : 'll-sky'})`} />
    {Array.from({ length: 7 }, (_, k) => { const bw = w / 7, bh = h * (0.35 + ((k * 37) % 40) / 100); return (
      <g key={k}><rect x={x + k * bw + 4} y={y + h - bh} width={bw - 8} height={bh} fill={dusk ? '#4C5C80' : '#9FB7CF'} opacity={0.85} />
        {Array.from({ length: 4 }, (_, j) => <rect key={j} x={x + k * bw + 12 + (j % 2) * (bw / 2 - 6)} y={y + h - bh + 16 + Math.floor(j / 2) * 34} width={bw / 4} height={16} fill={dusk ? '#FFD98A' : '#E8F2FA'} opacity={0.8} />)}</g>) })}
    <rect x={x + w / 2 - 5} y={y} width={10} height={h} fill={L.creamD} /><rect x={x} y={y + h / 2 - 5} width={w} height={10} fill={L.creamD} />
    <rect x={x - 24} y={y + h + 8} width={w + 48} height={16} rx={6} fill={L.wallD} />
  </g>
)

// # one apartment room; tone warm (Maya) or cool (Jordan); x0..x1 is its slice of the frame
export const Room: React.FC<{ x0?: number; x1?: number; cool?: boolean; dusk?: boolean; plant?: boolean }> = ({ x0 = 0, x1 = 1920, cool, dusk, plant = true }) => {
  const w = x1 - x0, cx = x0 + w / 2
  return (
    <g>
      <rect x={x0} y={0} width={w} height={FLOOR} fill={`url(#${cool ? 'll-wallcool' : 'll-wall'})`} />
      <rect x={x0} y={FLOOR - 26} width={w} height={26} fill={cool ? '#C9CFDC' : L.wallD} />
      <rect x={x0} y={FLOOR} width={w} height={1080 - FLOOR} fill="url(#ll-floor)" />
      {Array.from({ length: Math.ceil(w / 160) }, (_, k) => <line key={k} x1={x0 + k * 160 + 40} x2={x0 + k * 160 - 40} y1={FLOOR} y2={1080} stroke={L.floorD} strokeWidth={3} opacity={0.5} />)}
      <Window x={cx - Math.min(260, w * 0.22)} y={300} w={Math.min(520, w * 0.44)} h={300} dusk={dusk} />
      {plant && <g transform={`translate(${x0 + 90} ${FLOOR})`}><rect x={-34} y={-80} width={68} height={80} rx={10} fill={cool ? L.duskD : L.terra} />
        {[-40, -10, 22, 46].map((a, k) => <ellipse key={k} cx={Math.sin(a) * 30} cy={-120 - k * 26} rx={22} ry={52} fill={cool ? '#8FA79A' : L.sageD} transform={`rotate(${a} ${Math.sin(a) * 30} ${-120 - k * 26})`} />)}</g>}
    </g>
  )
}

// # Maya's room (left) and Jordan's room (right) side by side, with a centre wall and name plaques
export const TwoRooms: React.FC<{ dusk?: boolean; names?: number }> = ({ dusk, names = 1 }) => (
  <g>
    <Room x0={0} x1={960} dusk={dusk} />
    <Room x0={960} x1={1920} cool dusk={dusk} plant={false} />
    <rect x={948} y={240} width={24} height={840} fill={L.ink} opacity={0.85} /><rect x={930} y={226} width={60} height={20} rx={8} fill={L.ink} opacity={0.85} />
    {names > 0.01 && <g opacity={names}>
      <Plaque x={480} y={250} text="MAYA" color={L.sageD} />
      <Plaque x={1440} y={250} text="JORDAN" color={L.terraD} />
    </g>}
  </g>
)
export const Plaque: React.FC<{ x: number; y: number; text: string; color: string; o?: number }> = ({ x, y, text, color, o = 1 }) => o <= 0.01 ? null : (
  <g opacity={o}><rect x={x - 110} y={y - 38} width={220} height={68} rx={34} fill={color} /><text x={x} y={y + 14} textAnchor="middle" fill="#fff" style={{ font: `400 46px ${FONT.big}`, letterSpacing: 4 }}>{text}</text></g>
)

// # their shared office: big windows, a long wall, two identical desks with screens
export const Office: React.FC<{ desks?: number }> = ({ desks = 1 }) => (
  <g>
    <rect width={1920} height={FLOOR} fill="url(#ll-wall)" />
    {[220, 760, 1300].map((x) => <Window key={x} x={x} y={250} w={400} h={330} />)}
    <rect y={FLOOR - 26} width={1920} height={26} fill={L.wallD} />
    <rect y={FLOOR} width={1920} height={180} fill="#B9A28A" />
    {Array.from({ length: 12 }, (_, k) => <line key={k} x1={k * 170} x2={k * 170 - 60} y1={FLOOR} y2={1080} stroke="#9E8670" strokeWidth={3} opacity={0.5} />)}
    {desks > 0.01 && <g opacity={desks}>{[640, 1280].map((x) => <Desk key={x} x={x} />)}</g>}
  </g>
)
export const Desk: React.FC<{ x: number; y?: number; s?: number }> = ({ x, y = FLOOR + 10, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={250} ry={18} fill="#000" opacity={0.16} />
    <rect x={-230} y={-200} width={460} height={26} rx={8} fill={L.floorD} />
    <rect x={-210} y={-176} width={20} height={176} fill={L.floorD} /><rect x={190} y={-176} width={20} height={176} fill={L.floorD} />
    <rect x={-90} y={-360} width={180} height={124} rx={10} fill={L.ink} /><rect x={-80} y={-350} width={160} height={104} rx={6} fill="#CFE3F0" />
    <rect x={-14} y={-236} width={28} height={36} fill={L.ink} />
    <rect x={150} y={-246} width={40} height={46} rx={8} fill={L.terra} />
  </g>
)

// # plain cream paper with a faint grid: the "explain it" board
export const Paper: React.FC<{ tint?: string }> = ({ tint }) => (
  <g>
    <rect width={1920} height={1080} fill="url(#ll-paper)" />
    {Array.from({ length: 24 }, (_, k) => <line key={'v' + k} x1={k * 84} x2={k * 84} y1={0} y2={1080} stroke={L.creamD} strokeWidth={2} />)}
    {Array.from({ length: 13 }, (_, k) => <line key={'h' + k} x1={0} x2={1920} y1={k * 84} y2={k * 84} stroke={L.creamD} strokeWidth={2} />)}
    {tint && <rect width={1920} height={1080} fill={tint} opacity={0.12} />}
  </g>
)

// # a dentist's room: tiled wall, lamp arm, the chair
export const Clinic: React.FC = () => (
  <g>
    <rect width={1920} height={FLOOR} fill="#E8F3F1" />
    {Array.from({ length: 30 }, (_, k) => <line key={k} x1={k * 70} x2={k * 70} y1={480} y2={FLOOR} stroke="#CFE2DE" strokeWidth={3} />)}
    {Array.from({ length: 6 }, (_, k) => <line key={'h' + k} x1={0} x2={1920} y1={480 + k * 70} y2={480 + k * 70} stroke="#CFE2DE" strokeWidth={3} />)}
    <rect y={FLOOR} width={1920} height={180} fill="#B8C7C4" />
    <g transform="translate(380 250)"><path d="M0 0 L0 110 L200 180" stroke="#9AA9B0" strokeWidth={18} fill="none" /><ellipse cx={220} cy={194} rx={70} ry={40} fill="#DDE6EA" /><ellipse cx={220} cy={210} rx={46} ry={18} fill="#FFF6C8" /></g>
    <g transform={`translate(620 ${FLOOR})`}>
      <ellipse cx={0} cy={6} rx={260} ry={18} fill="#000" opacity={0.15} />
      <rect x={-30} y={-150} width={60} height={150} fill="#9AA9B0" />
      <path d="M-220 -150 L160 -150 L230 -330 L190 -340 L130 -190 L-220 -190 Z" fill={L.sage} />
      <rect x={-240} y={-210} width={120} height={40} rx={18} fill={L.sageD} />
    </g>
  </g>
)

// # a city street: shop fronts and a pavement
export const Street: React.FC<{ dusk?: boolean }> = ({ dusk }) => (
  <g>
    <rect width={1920} height={1080} fill={`url(#${dusk ? 'll-skydusk' : 'll-sky'})`} />
    {[[0, 520, L.terraL], [340, 420, L.sageL], [700, 560, L.mustardL], [1060, 460, '#D9E4F2'], [1420, 540, L.terraL], [1760, 420, L.sageL]].map(([x, h, col], k) => (
      <g key={k}><rect x={x as number} y={FLOOR - (h as number)} width={340} height={h as number} fill={col as string} stroke={L.creamD} strokeWidth={4} />
        {Array.from({ length: 6 }, (_, j) => <rect key={j} x={(x as number) + 40 + (j % 3) * 95} y={FLOOR - (h as number) + 40 + Math.floor(j / 3) * 110} width={60} height={74} rx={6} fill={dusk ? '#FFD98A' : '#FFFFFF'} opacity={0.7} />)}</g>))}
    <rect y={FLOOR} width={1920} height={60} fill="#CBBBA5" /><rect y={FLOOR + 60} width={1920} height={120} fill="#7E8A96" />
    {Array.from({ length: 8 }, (_, k) => <rect key={k} x={k * 260 + 40} y={FLOOR + 112} width={140} height={14} fill="#F2E6C8" />)}
  </g>
)

// ------------------------------------------------------------ small drawn parts for this world
// # a dinner table with two plates (s scales; the table top sits at y)
export const Table: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={190} rx={330} ry={22} fill="#000" opacity={0.15} />
    <rect x={-320} y={-10} width={640} height={30} rx={10} fill={L.floorD} /><rect x={-300} y={20} width={24} height={170} fill={L.floorD} /><rect x={276} y={20} width={24} height={170} fill={L.floorD} />
    <rect x={-330} y={-16} width={660} height={20} rx={8} fill="#FFFFFF" opacity={0.75} />
    {[-160, 160].map((k) => <g key={k}><ellipse cx={k} cy={-14} rx={90} ry={22} fill="#FFFFFF" stroke={L.creamD} strokeWidth={4} /><ellipse cx={k} cy={-20} rx={46} ry={12} fill={L.terra} /></g>)}
  </g>
)

// # a big tooth with a crack that opens (p 0–1)
export const Tooth: React.FC<{ x: number; y: number; s?: number; crack: number; o?: number }> = ({ x, y, s = 1, crack, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={150} rx={110} ry={16} fill="#000" opacity={0.12} />
    <path d="M-110 -120 Q-120 -190 -50 -180 Q0 -170 50 -180 Q120 -190 110 -120 Q100 -40 80 40 Q70 140 40 140 Q20 140 10 60 Q0 20 -10 60 Q-20 140 -40 140 Q-70 140 -80 40 Q-100 -40 -110 -120 Z" fill="#FFFFFF" stroke={L.inkSoft} strokeWidth={6} />
    <path d="M-70 -150 Q-60 -170 -30 -165" stroke={L.sky} strokeWidth={8} fill="none" strokeLinecap="round" />
    {crack > 0.01 && <path d={`M10 -176 L-10 ${-176 + 60 * crack} L20 ${-176 + 110 * crack} L-6 ${-176 + 170 * crack}`} stroke={L.redD} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
  </g>
)

// # an umbrella (insurance) shielding whatever sits under it; open 0–1
export const Umbrella: React.FC<{ x: number; y: number; s?: number; open: number; o?: number; color?: string }> = ({ x, y, s = 1, open, o = 1, color = L.sageD }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d={`M0 -10 L0 260 Q0 300 -40 300`} stroke={L.ink} strokeWidth={14} fill="none" strokeLinecap="round" />
    <g transform={`scale(${lerp(0.25, 1, open)} 1)`}>
      <path d="M-330 0 Q-300 -210 0 -230 Q300 -210 330 0 Q275 -40 220 0 Q165 -40 110 0 Q55 -40 0 0 Q-55 -40 -110 0 Q-165 -40 -220 0 Q-275 -40 -330 0 Z" fill={color} />
      <path d="M-110 0 Q-90 -150 0 -230 M110 0 Q90 -150 0 -230" stroke="#fff" strokeWidth={5} opacity={0.4} fill="none" />
    </g>
    <circle cx={0} cy={-236} r={14} fill={L.ink} />
  </g>
)

// # a credit card showing a balance
export const Card: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; text?: string; color?: string }> = ({ x, y, s = 1, r = 0, o = 1, text, color = L.terraD }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-170} y={-105} width={340} height={210} rx={22} fill="#000" opacity={0.18} transform="translate(8 10)" />
    <rect x={-170} y={-105} width={340} height={210} rx={22} fill={color} />
    <rect x={-170} y={-60} width={340} height={40} fill={L.ink} opacity={0.55} />
    <rect x={-130} y={0} width={64} height={46} rx={8} fill={L.gold} />
    {text && <text x={120} y={80} textAnchor="end" fill="#fff" style={{ font: `400 56px ${FONT.big}`, letterSpacing: 2 }}>{text}</text>}
  </g>
)

// # a big bill / invoice drawn as an object: header colour, a big amount, a stamp area
export const BillSheet: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; head: string; amount: string; color?: string; stamp?: string; stampO?: number }> = ({ x, y, s = 1, r = 0, o = 1, head, amount, color = L.terra, stamp, stampO = 0 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-170} y={-220} width={340} height={440} rx={14} fill="#000" opacity={0.16} transform="translate(8 10)" />
    <rect x={-170} y={-220} width={340} height={440} rx={14} fill="#FFFFFF" />
    <rect x={-170} y={-220} width={340} height={90} rx={14} fill={color} /><rect x={-170} y={-150} width={340} height={20} fill={color} />
    <text x={0} y={-158} textAnchor="middle" fill="#fff" style={{ font: `400 50px ${FONT.big}`, letterSpacing: 3 }}>{head}</text>
    {[0, 1].map((k) => <rect key={k} x={-120} y={-90 + k * 36} width={240 - k * 60} height={14} rx={7} fill={L.creamD} />)}
    <text x={0} y={90} textAnchor="middle" fill={L.ink} style={{ font: `400 ${amount.length > 6 ? 96 : 120}px ${FONT.big}` }}>{amount}</text>
    {stamp && stampO > 0.01 && <g opacity={stampO} transform={`rotate(-12) scale(${lerp(1.4, 1, stampO)})`}><rect x={-140} y={110} width={280} height={84} rx={12} fill="none" stroke={L.cashD} strokeWidth={8} /><text x={0} y={174} textAnchor="middle" fill={L.cashD} style={{ font: `400 64px ${FONT.big}`, letterSpacing: 4 }}>{stamp}</text></g>}
  </g>
)

// # a money tree: trunk + canopy that grows with g (0–1); coins hang when g > 0.5
export const MoneyTree: React.FC<{ x: number; y: number; s?: number; g: number; o?: number; drop?: number }> = ({ x, y, s = 1, g, o = 1, drop = 0 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={200} ry={20} fill="#000" opacity={0.15} />
    <path d={`M-22 0 Q-14 ${-200 * g} -8 ${-330 * g} L8 ${-330 * g} Q14 ${-200 * g} 22 0 Z`} fill={L.floorD} />
    {g > 0.2 && [[-120, -360, 120], [100, -380, 130], [0, -470, 150], [-60, -300, 100], [90, -290, 100]].map(([cx, cy, r], k) => (
      <circle key={k} cx={cx * g} cy={cy * g} r={r * clamp01((g - 0.2) / 0.8)} fill={k % 2 ? L.sage : L.sageD} />))}
    {g > 0.5 && [[-110, -330], [80, -350], [10, -440], [-40, -260], [120, -270]].map(([cx, cy], k) => (
      <g key={k} transform={`translate(${cx * g} ${cy * g})`}><circle r={24} fill={L.gold} stroke={L.goldD} strokeWidth={4} /><text y={10} textAnchor="middle" fill={L.goldD} style={{ font: `400 30px ${FONT.big}` }}>$</text></g>))}
    {drop > 0.01 && [0, 1, 2].map((k) => { const p = (drop + k / 3) % 1; return <g key={'d' + k} transform={`translate(${-60 + k * 60} ${-250 * g + p * 240})`} opacity={1 - p}><circle r={20} fill={L.gold} stroke={L.goldD} strokeWidth={4} /></g> })}
  </g>
)

// # a coin
export const Coin: React.FC<{ x: number; y: number; r?: number; o?: number; label?: string }> = ({ x, y, r = 40, o = 1, label = '$' }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <circle r={r} fill={L.gold} stroke={L.goldD} strokeWidth={r * 0.12} /><circle r={r * 0.72} fill="none" stroke={L.goldD} strokeWidth={r * 0.05} opacity={0.6} />
    <text y={r * 0.3} textAnchor="middle" fill={L.goldD} style={{ font: `400 ${r * (label.length > 2 ? 0.62 : 0.9)}px ${FONT.big}` }}>{label}</text>
  </g>
)

// # a small label tag (short words only)
export const Tag: React.FC<{ x: number; y: number; text: string; o?: number; size?: number; bg?: string; ink?: string }> = ({ x, y, text, o = 1, size = 40, bg = L.ink, ink = '#fff' }) => {
  if (o <= 0.01) return null
  const w = text.length * size * 0.5 + size * 1.1
  return <g opacity={o}><rect x={x - w / 2} y={y - size * 0.82} width={w} height={size * 1.28} rx={size * 0.3} fill={bg} /><text x={x} y={y + size * 0.22} textAnchor="middle" fill={ink} style={{ font: `400 ${size}px ${FONT.big}`, letterSpacing: 2 }}>{text}</text></g>
}

// # big number text
export const Big: React.FC<{ x: number; y: number; text: string; size?: number; color?: string; o?: number; anchor?: 'start' | 'middle' | 'end' }> = ({ x, y, text, size = 90, color = L.ink, o = 1, anchor = 'middle' }) => o <= 0.01 ? null : (
  <text x={x} y={y} textAnchor={anchor} fill={color} opacity={o} style={{ font: `400 ${size}px ${FONT.big}`, letterSpacing: 2 }}>{text}</text>
)

// # a cross drawn over something (p 0–1), comfortable size
export const Cross: React.FC<{ x: number; y: number; r?: number; p: number }> = ({ x, y, r = 110, p }) => {
  if (p <= 0.01) return null
  const a = clamp01(p * 2), b = clamp01(p * 2 - 1)
  return <g strokeLinecap="round" stroke={L.red} strokeWidth={r * 0.16} opacity={0.95}>
    <line x1={x - r} y1={y - r} x2={x - r + 2 * r * a} y2={y - r + 2 * r * a} />
    {b > 0 && <line x1={x + r} y1={y - r} x2={x + r - 2 * r * b} y2={y - r + 2 * r * b} />}
  </g>
}

// # a tick mark (p 0–1)
export const Tick: React.FC<{ x: number; y: number; r?: number; p: number }> = ({ x, y, r = 50, p }) => p <= 0.01 ? null : (
  <g opacity={clamp01(p * 1.5)}><circle cx={x} cy={y} r={r} fill={L.cashD} /><path d={`M${x - r * 0.45} ${y} L${x - r * 0.1} ${y + r * 0.35} L${x + r * 0.5} ${y - r * 0.35}`} stroke="#fff" strokeWidth={r * 0.18} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
)

// # a house
export const House: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string }> = ({ x, y, s = 1, o = 1, color = L.terra }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={190} ry={16} fill="#000" opacity={0.15} />
    <rect x={-150} y={-200} width={300} height={200} fill={L.creamL} stroke={L.creamD} strokeWidth={4} />
    <path d="M-180 -190 L0 -340 L180 -190 Z" fill={color} />
    <rect x={-40} y={-110} width={80} height={110} rx={6} fill={L.floorD} />
    <rect x={-120} y={-160} width={60} height={56} rx={4} fill={L.sky} /><rect x={60} y={-160} width={60} height={56} rx={4} fill={L.sky} />
  </g>
)

// # a sofa (belongings inside a flat)
export const Sofa: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={230} ry={16} fill="#000" opacity={0.15} />
    <rect x={-210} y={-170} width={420} height={110} rx={30} fill={L.dusk} /><rect x={-230} y={-90} width={460} height={80} rx={26} fill={L.duskD} />
    <rect x={-250} y={-130} width={60} height={120} rx={24} fill={L.dusk} /><rect x={190} y={-130} width={60} height={120} rx={24} fill={L.dusk} />
  </g>
)

// # a small person icon (for "one in three" counts)
export const Icon: React.FC<{ x: number; y: number; s?: number; color?: string; o?: number }> = ({ x, y, s = 1, color = L.inkSoft, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><circle cx={0} cy={-150} r={42} fill={color} /><path d="M-70 0 Q-70 -96 0 -96 Q70 -96 70 0 Z" fill={color} /></g>
)
