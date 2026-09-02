// # Barrel export + transition registry for MasterComposition
// # Maps transition name strings from AI Director to React components
// # 8 transitions total — each has a specific editorial purpose

import type React from 'react'
import { CrossDissolve } from './CrossDissolve'
import { ZoomThrough } from './ZoomThrough'
import { WipeRight } from './WipeRight'
import { SlideOver } from './SlideOver'
import { GlitchCut } from './GlitchCut'
import { FilmBurn } from './FilmBurn'
import { MorphZoom } from './MorphZoom'
import { WhipPan } from './WhipPan'

export { CrossDissolve, ZoomThrough, WipeRight, SlideOver, GlitchCut, FilmBurn, MorphZoom, WhipPan }
export type { TransitionProps } from './CrossDissolve'

// # Number of frames each transition spans (0.5s at 30fps)
export const TRANSITION_FRAMES = 15

// # Map AI Director transition names to components
// # Each transition has ONE editorial purpose — the AI Director picks based on segment context
const TRANSITION_REGISTRY: Record<string, React.FC<any>> = {
  // # Soft blend — same-topic continuation, calm segments
  cross_dissolve: CrossDissolve,
  fade: CrossDissolve,
  // # Push through — dramatic stat reveals, topic changes
  zoom_through: ZoomThrough,
  zoom: ZoomThrough,
  // # Left-to-right reveal — sequential data, timeline progression
  wipe: WipeRight,
  wipe_right: WipeRight,
  // # Push slide — context→data, data→data within same topic
  slide: SlideOver,
  // # RGB glitch — ai_tech category, dramatic disruption moments
  glitch: GlitchCut,
  // # Warm amber burn — major topic changes, dramatic pivots
  film_burn: FilmBurn,
  // # Blur morph — chart-to-chart data transforms
  morph: MorphZoom,
  // # Fast camera pan — "but here's the catch" pivots, counter-arguments
  whip_pan: WhipPan,
  // # Legacy alias
  parallax: SlideOver,
}

// # Get transition component by name — defaults to CrossDissolve for unknown types
export function getTransitionComponent(name: string): React.FC<any> {
  return TRANSITION_REGISTRY[name] ?? CrossDissolve
}
