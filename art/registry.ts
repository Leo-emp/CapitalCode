// # Shared shape of every art library entry (props, scenes…), so the engine can query them
import type React from 'react'

export type ArtEntry<P> = { id: string; title: string; tags: string[]; Component: React.FC<P> }

export const byId = <T extends { id: string }>(list: T[], id: string, kind: string): T => {
  const hit = list.find((x) => x.id === id)
  if (!hit) throw new Error(`unknown ${kind} "${id}" (known: ${list.map((x) => x.id).join(', ')})`)
  return hit
}
export const byTag = <T extends { tags: string[] }>(list: T[], tag: string): T[] => list.filter((x) => x.tags.includes(tag))
