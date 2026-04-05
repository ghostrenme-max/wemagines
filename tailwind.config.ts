import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        fhd: '1920px',
      },
      colors: {
        wem: {
          bg: '#0d0d1a',
          bg2: '#111122',
          surface: '#16162a',
          surface2: '#1e1e35',
          border: '#2a2a4a',
          border2: '#3d3d6a',
          accent: '#a78bfa',
          accent2: '#f472b6',
          accent3: '#34d399',
          text: '#f0eeff',
          text2: '#a8a4cc',
          muted: '#5c5880',
          animator: '#f87171',
          illust: '#fb923c',
          voice: '#34d399',
          bgm: '#a78bfa',
          writer: '#f472b6',
        },
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        noto: ['"Noto Sans KR"', 'sans-serif'],
        dm: ['"DM Mono"', 'monospace'],
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.65s ease-out forwards',
        pulse: 'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
