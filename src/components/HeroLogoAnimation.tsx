import type { CSSProperties } from 'react'

function drawStyle(dash: number, duration: string, delay: string): CSSProperties {
  return {
    strokeDasharray: dash,
    strokeDashoffset: dash,
    animation: `heroLogoAnim_draw ${duration} ease forwards`,
    animationDelay: delay,
  }
}

export function HeroLogoAnimation() {
  return (
    <div className="flex h-full min-h-0 w-full flex-col items-center justify-center px-6 py-6 md:px-10">
      <svg
        className="hero-logo-anim-svg w-full max-w-[min(100%,560px)] md:max-w-[720px]"
        viewBox="0 0 600 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Wemagines 로고 애니메이션"
        role="img"
      >
        <title>Wemagines</title>

        <path
          className="hero-logo-anim-draw"
          d="M24 48 Q20 24 36 24 Q52 24 57 48 L78 120 L100 66 L122 120 L143 48 Q148 24 164 24 Q180 24 176 48 L176 144 Q176 156 164 156 L36 156 Q24 156 24 144 Z"
          fill="none"
          stroke="#A78BFA"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={drawStyle(900, '1.4s', '0s')}
        />

        <line
          className="hero-logo-anim-draw"
          x1={8}
          y1={156}
          x2={28}
          y2={156}
          fill="none"
          stroke="#A78BFA"
          strokeWidth={3}
          strokeLinecap="round"
          style={drawStyle(20, '0.2s', '1.3s')}
        />
        <line
          className="hero-logo-anim-draw"
          fill="none"
          x1={172}
          y1={156}
          x2={192}
          y2={156}
          stroke="#A78BFA"
          strokeWidth={3}
          strokeLinecap="round"
          style={drawStyle(20, '0.2s', '1.3s')}
        />

        <path
          className="hero-logo-anim-draw"
          d="M78 120 L100 66 L122 120"
          fill="none"
          stroke="#FBBF24"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={drawStyle(120, '0.6s', '1.5s')}
        />

        <g className="hidden md:inline">
          <text
            className="hero-logo-anim-fade"
            x={210}
            y={110}
            fill="#A78BFA"
            fontFamily="Georgia, serif"
            fontSize={42}
            fontStyle="italic"
            fontWeight={400}
            style={{
              opacity: 0,
              animation: 'heroLogoAnim_fadeInUp 0.6s ease forwards',
              animationDelay: '2.8s',
            }}
          >
            We
          </text>
          <text
            className="hero-logo-anim-fade"
            x={210}
            y={148}
            fill="#F0EEFF"
            fontFamily="Georgia, serif"
            fontSize={42}
            fontWeight={400}
            style={{
              opacity: 0,
              animation: 'heroLogoAnim_fadeInUp 0.6s ease forwards',
              animationDelay: '3.0s',
            }}
          >
            magines
          </text>
          <text
            className="hero-logo-anim-fade"
            x={210}
            y={164}
            fill="#3D3D6A"
            fontFamily="var(--font-dm), ui-monospace, monospace"
            fontSize={9}
            letterSpacing={3}
            style={{
              opacity: 0,
              animation: 'heroLogoAnim_fadeInUp 0.5s ease forwards',
              animationDelay: '3.3s',
            }}
          >
            MAKE · ANIMATION · TOGETHER
          </text>
        </g>
      </svg>

      <div className="mt-6 flex w-full max-w-[360px] flex-col items-center text-center md:hidden">
        <span
          className="hero-logo-anim-fade font-serif text-[2.25rem] italic text-[#A78BFA]"
          style={{
            opacity: 0,
            animation: 'heroLogoAnim_fadeInUp 0.6s ease forwards',
            animationDelay: '2.8s',
          }}
        >
          We
        </span>
        <span
          className="hero-logo-anim-fade font-serif text-[2.25rem] text-wem-text"
          style={{
            opacity: 0,
            animation: 'heroLogoAnim_fadeInUp 0.6s ease forwards',
            animationDelay: '3.0s',
          }}
        >
          magines
        </span>
        <span
          className="hero-logo-anim-fade mt-2 font-dm text-[9px] tracking-[3px] text-[#3D3D6A]"
          style={{
            opacity: 0,
            animation: 'heroLogoAnim_fadeInUp 0.5s ease forwards',
            animationDelay: '3.3s',
          }}
        >
          MAKE · ANIMATION · TOGETHER
        </span>
      </div>
    </div>
  )
}
