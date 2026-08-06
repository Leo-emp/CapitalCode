// # Barrel export + transition registry for MasterComposition
// # Maps transition name strings from AI Director to React components

import type React from 'react'
import { CrossDissolve } from './CrossDissolve'
import { ZoomThrough } from './ZoomThrough'
import { WipeRight } from './WipeRight'

export { CrossDissolve, ZoomThrough, WipeRight }
export type { TransitionProps } from './CrossDissolve'

// # Number of frames each transition spans (0.5s at 30fps)
// # Scenes overlap by this many frames during transitions
export const TRANSITION_FRAMES = 15

// # Map AI Director transition names to components
const TRANSITION_REGISTRY: Record<string, React.FC<any>> = {
  cross_dissolve: CrossDissolve,
  zoom_through: ZoomThrough,
  wipe_right: WipeRight,
  // # Legacy/alias names the AI Director might output
  fade: CrossDissolve,
  zoom: ZoomThrough,
  wipe: WipeRight,
  morph: CrossDissolve,     // # morph falls back to dissolve
  parallax: CrossDissolve,  // # parallax falls back to dissolve
}

// # Get transition component by name — defaults to CrossDissolve for unknown types
export function getTransitionComponent(name: string): React.FC<any> {
  return TRANSITION_REGISTRY[name] ?? CrossDissolve
}
