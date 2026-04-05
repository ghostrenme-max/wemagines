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
          gold: '#fbbf24',
          coral: '#f87171',
          editor: '#38bdf8',
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
        timelineDotGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgb(167 139 250 / 0%)' },
          '50%': { boxShadow: '0 0 14px 6px rgb(167 139 250 / 40%)' },
        },
        msgIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        recBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
        loginPageFadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.65s ease-out forwards',
        pulse: 'pulse 2s ease-in-out infinite',
        timelineDotGlow: 'timelineDotGlow 2s ease-in-out infinite',
        msgIn: 'msgIn 0.3s ease forwards',
        recBlink: 'recBlink 1s ease-in-out infinite',
        loginPageFadeUp: 'loginPageFadeUp 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
} satisfies Config
