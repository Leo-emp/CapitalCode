// ============================================================
// COVERS — "What a Bank Really Does With Your Money"
// Story: your balance is a promise, not cash in a box — banks keep
// little cash (reserve requirement 0% since 2020) and most money is
// screen money. Picture: a shocked customer whose phone says $1,000
// stands at a wide-open vault with empty shelves.
// ============================================================
import React from 'react'
import { CoverCanvas, Burst, Ground, Glow, Sky } from './kit'
import { Hero, Part } from './cast'
import { Words } from './words'
import { makeCover } from './registry'

const JOB = '20261109-0311_what-a-bank-really-does-with-your-money'
const NAVY = '#16294A', GOLD = '#F2B632', INK = '#05070C'

// # a big open vault: round frame, empty shelves inside, the door swung to the right (centre x, y; ~760 wide)
const OpenVault: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`} strokeLinejoin="round">
    <rect x={-330} y={-330} width={660} height={660} rx={40} fill="#5D6878" stroke={INK} strokeWidth={10} />
    <circle r={265} fill="#1B2230" stroke={INK} strokeWidth={10} />
    <circle r={265} fill="none" stroke="#8B97A8" strokeWidth={18} />
    {/* empty shelves with a few dust specks and one lonely coin */}
    {[-110, 0, 110].map((sy) => <rect key={sy} x={-190} y={sy} width={380} height={16} rx={6} fill="#8B97A8" stroke={INK} strokeWidth={5} />)}
    <circle cx={120} cy={92} r={16} fill={GOLD} stroke={INK} strokeWidth={4} />
    {[[-140, -140], [40, -30], [-60, 80], [150, -150]].map(([dx, dy], k) => <circle key={k} cx={dx} cy={dy} r={5} fill="#5D6878" />)}
    {/* the swung-open door */}
    <g transform="translate(400 0) scale(0.42 1)">
      <circle r={250} fill="#B8C3D1" stroke={INK} strokeWidth={14} /><circle r={180} fill="#CBD4DF" stroke={INK} strokeWidth={8} />
      {[0, 60, 120].map((a) => <rect key={a} x={-12} y={-150} width={24} height={300} rx={12} fill="#7E8A9B" stroke={INK} strokeWidth={5} transform={`rotate(${a})`} />)}
    </g>
  </g>
)
// # a phone showing a bank balance (centre x, y), tilted
const BalancePhone: React.FC<{ x: number; y: number; r: number; s: number }> = ({ x, y, r, s }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} strokeLinejoin="round">
    <rect x={-110} y={-200} width={220} height={400} rx={34} fill={INK} />
    <rect x={-94} y={-180} width={188} height={360} rx={22} fill="#F7FAFF" />
    <rect x={-94} y={-180} width={188} height={80} rx={22} fill="#2E5C9A" /><rect x={-94} y={-130} width={188} height={30} fill="#2E5C9A" />
    <text y={-122} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 34px "Bebas Neue"' }}>MY BANK</text>
    <text y={10} textAnchor="middle" fill={NAVY} style={{ font: '400 72px "Bebas Neue"' }}>$1,000</text>
    {[0, 1].map((k) => <rect key={k} x={-70} y={50 + k * 50} width={140} height={30} rx={8} fill="#E2E8F0" />)}
  </g>
)

// # 1 — shocked customer with her $1,000 phone at an empty vault
export const BANK_1 = makeCover({
  id: 'bank-1', job: JOB, canvas: 'wide',
  concept: 'Your balance says $1,000 but the vault is empty: a shocked customer holds up her phone at a wide-open, empty vault — the money isn\'t sitting in there.',
  Component: () => (
    <CoverCanvas canvas="wide" emblem="tl">
      <Sky canvas="wide" top="#3FA9E8" bottom="#1E5FA8" />
      <Burst canvas="wide" cx={1250} cy={620} color="#FFFFFF" opacity={0.18} rays={20} />
      <Glow id="vault" x={1250} y={640} r={430} color={GOLD} opacity={0.4} />
      <Ground canvas="wide" y={990} color="#123B6E" edge="#5B9BD8" />
      <Part name="vault" kind="object" x={930} y={340} w={690} h={600}><g transform="translate(1250 640) scale(0.9) translate(-1250 -640)"><OpenVault x={1250} y={640} /></g></Part>
      <Hero who="investorF" pose="holdUp" expression="shocked" x={430} y={1380} scale={2.05}
        hold={(h) => <Part name="phone" kind="object" x={h.x - 20} y={h.y - 260} w={240} h={330} touches={['hero']}><BalancePhone x={h.x + 100} y={h.y - 100} r={12} s={0.78} /></Part>} />
      <Words lines={[{ t: "YOUR MONEY ISN'T", size: 108 }, { t: 'IN THE VAULT', size: 136, color: GOLD }]} x={1330} y={40} rotate={-2} ring={NAVY} />
    </CoverCanvas>
  ),
})
