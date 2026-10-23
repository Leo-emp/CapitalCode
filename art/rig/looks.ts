// ============================================================
// LOOKS — colours and accessories that turn the one rig into
// different people. HERO = the owner-approved character
// (spike/AluxSync.tsx, 2026-10-23); tie now in brand champagne.
// Supporting looks are added in Task 5.
// ============================================================

import { COLORS } from '../tokens'

export type Look = {
  jacket: [string, string, string]   // # light, mid, deep
  jacketShade: string
  sleeve: [string, string]           // # upper arm, forearm
  outline: string
  rim: string
  collar: string
  tie: string
  pants: [string, string]
  skin: [string, string]
  hair: 'short' | 'bald' | 'long' | 'cap'
  hairColor: string
  glasses: boolean
  accessory: 'none' | 'apron' | 'hardhat'
}

export const HERO: Look = {
  jacket: ['#5BCBFF', COLORS.blue, '#0D5A96'],
  jacketShade: '#0A4F86',
  sleeve: ['#0F67A8', '#0C4E86'],
  outline: '#07365E',
  rim: '#7FD6FF',
  collar: '#E6F4FF',
  tie: COLORS.champagne,
  pants: ['#0B1A2E', '#16304F'],
  skin: ['#20344F', '#0A1422'],
  hair: 'short',
  hairColor: '#0A2F4E',
  glasses: true,
  accessory: 'none',
}

// # Buyer: grey suit, red tie, bald — the person who pays
export const BUYER: Look = {
  jacket: ['#B3BDC8', '#7D8896', '#47515E'], jacketShade: '#3A434F', sleeve: ['#6E7987', '#5A6472'], outline: '#2B323C',
  rim: '#DCE6F0', collar: '#F2F5F8', tie: COLORS.red, pants: ['#1A1F27', '#2C333E'], skin: ['#2C3346', '#121722'],
  hair: 'bald', hairColor: '#0E1320', glasses: false, accessory: 'none',
}
// # Investor: dark navy suit, champagne tie, swept-back long hair
export const INVESTOR: Look = {
  jacket: ['#3E5578', '#24365A', '#121E36'], jacketShade: '#0E1830', sleeve: ['#22335A', '#1A2948'], outline: '#0A1226',
  rim: '#8FB2E6', collar: '#E6EEF8', tie: COLORS.champagne, pants: ['#0A101E', '#18233A'], skin: ['#2A2436', '#120F19'],
  hair: 'long', hairColor: '#1A1220', glasses: false, accessory: 'none',
}
// # Shop owner: green shirt + cream apron
export const OWNER: Look = {
  jacket: ['#6FD3A0', '#2E8B62', '#1C5C40'], jacketShade: '#174A34', sleeve: ['#2A7D58', '#236A4A'], outline: '#0F3324',
  rim: '#A8F0CB', collar: '#E8F8EF', tie: '#E8F8EF', pants: ['#1A1A22', '#2A2A36'], skin: ['#2B2A3A', '#13121C'],
  hair: 'short', hairColor: '#20160F', glasses: false, accessory: 'apron',
}
// # Worker: orange hi-vis tone + hard hat
export const WORKER: Look = {
  jacket: ['#FFB067', '#E8792A', '#9C4C14'], jacketShade: '#7E3D10', sleeve: ['#D06A22', '#B85C1C'], outline: '#5A2A08',
  rim: '#FFD2A8', collar: '#FFF1E2', tie: '#C9D2DA', pants: ['#1A2230', '#2B3648'], skin: ['#2E2A36', '#15121A'],
  hair: 'short', hairColor: '#1A1410', glasses: false, accessory: 'hardhat',
}

export const LOOKS: Record<string, Look> = { hero: HERO, buyer: BUYER, investor: INVESTOR, owner: OWNER, worker: WORKER }

// # Engine-facing lookup: never silently fall back to the hero on a typo
export const getLook = (id: string): Look => {
  const l = LOOKS[id]
  if (!l) throw new Error(`unknown look "${id}" (known: ${Object.keys(LOOKS).join(', ')})`)
  return l
}
