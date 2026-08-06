// # Font loading for Remotion — registers local font files
// # Called once at composition root level
import { staticFile } from 'remotion'

// # CSS @font-face declarations for all three families
export function getFontFaces(): string {
  return `
    @font-face {
      font-family: 'Bebas Neue';
      src: url('${staticFile('fonts/BebasNeue-Regular.ttf')}') format('truetype');
      font-weight: 400;
      font-display: block;
    }
    @font-face {
      font-family: 'Inter';
      src: url('${staticFile('fonts/Inter-Variable.ttf')}') format('truetype');
      font-weight: 100 900;
      font-display: block;
    }
    @font-face {
      font-family: 'JetBrains Mono';
      src: url('${staticFile('fonts/JetBrainsMono-Regular.ttf')}') format('truetype');
      font-weight: 400;
      font-display: block;
    }
    @font-face {
      font-family: 'JetBrains Mono';
      src: url('${staticFile('fonts/JetBrainsMono-Bold.ttf')}') format('truetype');
      font-weight: 700;
      font-display: block;
    }
  `
}
