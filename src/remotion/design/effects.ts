// # Visual effect utilities — glow, text mask reveal, shimmer, animated gradient
// # Used across all scene components for cinematic quality

import type { CSSProperties } from 'react'

// # Gold glow text shadow — used on BigStatReveal, CounterAnimation, headlines
// # intensity: 0–1, controls shadow opacity spread
export function goldGlow(intensity = 0.4): CSSProperties {
  // # Multi-layer shadow: inner sharp glow + outer diffuse glow
  return {
    textShadow: `0 0 40px rgba(212,168,83,${intensity}), 0 0 80px rgba(212,168,83,${intensity * 0.5})`,
  }
}

// # Text mask reveal — gradient wipe reveals text left-to-right
// # progress: 0–1, how much text is visible (use with spring interpolation)
export function textMaskStyle(progress: number): CSSProperties {
  // # Gradient position sweeps left-to-right as progress increases
  const pos = -100 + progress * 200
  return {
    backgroundImage: `linear-gradient(90deg, #FFFFFF ${pos}%, #FFFFFF ${pos + 50}%, transparent ${pos + 51}%)`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
  }
}

// # CSS keyframes string for gold shimmer animation
// # name: unique keyframe name to avoid collisions between components
export function shimmerKeyframes(name: string): string {
  return `@keyframes ${name} {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }`
}

// # Shimmer gradient style — moving gold highlight on text or accent elements
// # Apply alongside shimmerKeyframes() injected via <style> tag
export function shimmerStyle(animationName: string, durationMs = 3000): CSSProperties {
  return {
    backgroundImage: 'linear-gradient(90deg, #D4A853 0%, #F0D78C 50%, #D4A853 100%)',
    backgroundSize: '200% auto',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: `${animationName} ${durationMs}ms linear infinite`,
  }
}
