export interface WemaginesLogoProps {
  width?: number
  variant?: 'dark' | 'light'
}

export default function WemaginesLogo({ width = 200, variant = 'dark' }: WemaginesLogoProps) {
  const accent = variant === 'dark' ? '#A78BFA' : '#7C5CBF'
  const gold = variant === 'dark' ? '#FBBF24' : '#C8860A'
  const textMain = variant === 'dark' ? '#F0EEFF' : '#1A1440'
  const divider = variant === 'dark' ? '#1E1E35' : '#DDD8F5'

  const height = Math.round((width * 80) / 340)

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 340 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable="false"
    >
      <path
        d="M6 14 Q4 6 12 6 Q20 6 23 14 L32 44 L40 22 L48 44 L57 14 Q60 6 68 6 Q76 6 74 14 L74 56 Q74 62 68 62 L12 62 Q6 62 6 56 Z"
        stroke={accent}
        strokeWidth="2.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M32 44 L40 22 L48 44"
        stroke={gold}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <line x1="0" y1="62" x2="10" y2="62" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      <line x1="70" y1="62" x2="80" y2="62" stroke={accent} strokeWidth="2" strokeLinecap="round" />

      <line x1="92" y1="8" x2="92" y2="66" stroke={divider} strokeWidth="0.8" />

      <text
        x="106"
        y="50"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="34"
        fontStyle="italic"
        fontWeight="400"
        fill={accent}
        letterSpacing="0.5"
      >
        We
      </text>

      <text
        x="166"
        y="50"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="34"
        fontWeight="400"
        fill={textMain}
        letterSpacing="0.5"
      >
        magines
      </text>
    </svg>
  )
}
