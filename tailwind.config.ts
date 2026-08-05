import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0A1628',
          800: '#0D1B2A',
          700: '#1B2838',
        },
        gold: {
          DEFAULT: '#D4A853',
          light: '#F0D78C',
          dark: '#A67C2E',
        },
      },
      fontFamily: {
        headline: ['Bebas Neue', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        data: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
