// ============================================================
// REMOTION ENTRY for the CapitalCode art library.
// Render: npx remotion still art/index.tsx <Id> out.png --port=3177
// ============================================================

import React from 'react'
import { registerRoot } from 'remotion'
import { ArtCompositions } from './compositions'
import { loadBrandFonts } from './fonts'

// # Fonts must be ready before any frame is captured
loadBrandFonts()

registerRoot(() => <ArtCompositions />)
