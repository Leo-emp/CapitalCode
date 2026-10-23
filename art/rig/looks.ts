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

export const LOOKS: Record<string, Look> = { hero: HERO }
