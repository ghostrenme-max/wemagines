import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
  type RefObject,
} from 'react'
import { Link } from 'react-router-dom'
import WemaginesLogo from '../components/WemaginesLogo'
import { ROLES, type RoleId } from '../constants/roles'

export interface LoginState {
  tab: 'login' | 'signup'
  selectedRole: RoleId | null
  showPassword: boolean
  showSignupPassword: boolean
  agreed: boolean
}

/** 회원가입 직군 그리드: 2열 × 3행 (마지막 행 스토리 작가 | 편집자) */
const SIGNUP_ROLE_ORDER: readonly RoleId[] = ['visual', 'animator', 'voice', 'sound', 'writer', 'editor'] as const

const ORDERED_SIGNUP_ROLES = SIGNUP_ROLE_ORDER.map((id) => ROLES.find((r) => r.id === id)!)

function fadeStyle(duration: string, delay: string) {
  return {
    opacity: 0,
    animation: `loginPageFadeUp ${duration} ease-out ${delay} forwards`,
  } as const
}

function LeftDecorSvg() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.35]"
      viewBox="0 0 600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden
    >
      <rect
        x={40}
        y={120}
        width={180}
        height={240}
        rx={2}
        stroke="#a78bfa"
        strokeWidth={0.7}
        opacity={0.3}
      />
      {[155, 175, 195, 215].map((y) => (
        <line
          key={y}
          x1={55}
          y1={y}
          x2={205}
          y2={y}
          stroke="#a78bfa"
          strokeWidth={0.6}
          opacity={0.2}
        />
      ))}
      <path
        d="M195 128 L215 108 L222 115 L202 135 Z"
        stroke="#fbbf24"
        strokeWidth={0.7}
        fill="none"
        opacity={0.4}
      />
      <rect
        x={280}
        y={200}
        width={280}
        height={200}
        rx={6}
        stroke="#fb923c"
        strokeWidth={0.75}
        fill="none"
        opacity={0.25}
      />
      <circle cx={380} cy={300} r={50} stroke="#fb923c" strokeWidth={0.7} fill="none" opacity={0.2} />
      <path
        d="M40 550 Q70 520 100 550 Q130 580 160 550 Q190 520 220 550"
        stroke="#34d399"
        strokeWidth={0.7}
        fill="none"
        opacity={0.25}
      />
      <rect
        x={300}
        y={480}
        width={260}
        height={120}
        rx={3}
        stroke="#a78bfa"
        strokeWidth={0.7}
        fill="none"
        opacity={0.2}
      />
      {[352, 404, 456, 508, 532].map((x, i) => (
        <line
          key={i}
          x1={x}
          y1={492}
          x2={x}
          y2={588}
          stroke="#a78bfa"
          strokeWidth={0.6}
          opacity={0.15}
        />
      ))}
      <path
        d="M120 400 Q200 360 280 400"
        stroke="#2a2a4a"
        strokeWidth={0.6}
        strokeDasharray="4 4"
        fill="none"
        opacity={0.4}
      />
      <path
        d="M320 420 Q400 380 480 420"
        stroke="#2a2a4a"
        strokeWidth={0.6}
        strokeDasharray="4 4"
        fill="none"
        opacity={0.4}
      />
      <circle cx={480} cy={720} r={100} stroke="#fbbf24" strokeWidth={0.7} fill="none" opacity={0.12} />
      <path
        d="M445 718 L465 738 L515 695"
        stroke="#fbbf24"
        strokeWidth={0.7}
        fill="none"
        opacity={0.2}
      />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-white">
      <svg width={14} height={14} viewBox="0 0 24 24" aria-hidden>
        <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.26-.96 2.33-2.04 3.05l3.3 2.56C20.66 17.7 22 15.18 22 12c0-.91-.08-1.8-.24-2.65H12v4.85z" />
        <path fill="#34A853" d="M5.5 14.13 3.02 15.9C4.58 19.12 8.02 21.3 12 21.3c2.64 0 4.85-.87 6.46-2.35l-3.3-2.56c-.92.62-2.1.99-3.16.99-2.42 0-4.47-1.64-5.2-3.84z" />
        <path fill="#4A90E2" d="M4.04 7.07A11.89 11.89 0 0 0 2.7 12c0 1.93.46 3.75 1.28 5.36l3.3-2.56A7.13 7.13 0 0 1 6.7 12c0-.62.1-1.22.29-1.79z" />
        <path fill="#FBBC05" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C16.45 2.09 14.32 1.2 12 1.2 8.02 1.2 4.58 3.38 3.02 6.6l3.48 2.7C7.53 7.1 9.58 5.38 12 5.38z" />
      </svg>
    </span>
  )
}

function KakaoIcon() {
  return (
    <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full" style={{ background: '#FEE500' }}>
      <svg width={12} height={11} viewBox="0 0 24 22" fill="none" aria-hidden>
        <path
          d="M12 2C6.48 2 2 5.58 2 10.02c0 2.8 1.84 5.27 4.6 6.68L5.5 20l4.48-2.4c.64.08 1.3.12 2.02.12 5.52 0 10-3.58 10-8.02S17.52 2 12 2z"
          fill="#3C1E1E"
        />
      </svg>
    </span>
  )
}

function EyeOpen() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" className="text-wem-muted" aria-hidden>
      <path
        d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <circle cx={12} cy={12} r={3} stroke="currentColor" strokeWidth={1.5} />
    </svg>
  )
}

function EyeOff() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" className="text-wem-muted" aria-hidden>
      <path
        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <line x1={1} y1={1} x2={23} y2={23} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  )
}

function RoleIconAnimator({ color }: { color: string }) {
  return (
    <svg width={40} height={40} viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x={6} y={8} width={28} height={20} rx={2} stroke={color} strokeWidth={1.2} />
      <rect x={10} y={12} width={20} height={12} rx={1} stroke={color} strokeWidth={0.8} opacity={0.5} />
      <circle cx={20} cy={18} r={3} stroke={color} strokeWidth={1} fill="none" />
      <path d="M10 32 L15 28 M30 32 L25 28" stroke={color} strokeWidth={1} />
      <line x1={14} y1={32} x2={26} y2={32} stroke={color} strokeWidth={1.2} />
      <line x1={10} y1={35} x2={30} y2={35} stroke={color} strokeWidth={0.6} opacity={0.4} />
      {[14, 20, 26].map((cx) => (
        <circle key={cx} cx={cx} cy={35} r={1.5} stroke={color} strokeWidth={0.8} fill="none" />
      ))}
    </svg>
  )
}

function RoleIconVisual({ color }: { color: string }) {
  return (
    <svg width={40} height={40} viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x={8} y={6} width={24} height={28} rx={2} stroke={color} strokeWidth={1.2} />
      <path
        d="M12 26 L18 14 L24 20 L28 10 L32 26"
        stroke={color}
        strokeWidth={1}
        fill="none"
        strokeLinejoin="round"
      />
      <circle cx={18} cy={14} r={2} stroke={color} strokeWidth={1} fill="none" />
      <circle cx={28} cy={10} r={2} stroke={color} strokeWidth={1} fill="none" />
      <path d="M28 8 L32 4 L35 7 L31 11 Z" stroke={color} strokeWidth={1} fill="none" opacity={0.6} />
    </svg>
  )
}

function RoleIconVoice({ color }: { color: string }) {
  return (
    <svg width={40} height={40} viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x={15} y={6} width={10} height={16} rx={5} stroke={color} strokeWidth={1.2} />
      {[11, 14, 17].map((y) => (
        <line key={y} x1={17} y1={y} x2={23} y2={y} stroke={color} strokeWidth={0.8} />
      ))}
      <path d="M10 20 Q10 28 20 28 Q30 28 30 20" stroke={color} strokeWidth={1.2} fill="none" />
      <line x1={20} y1={28} x2={20} y2={34} stroke={color} strokeWidth={1.2} />
      <line x1={15} y1={34} x2={25} y2={34} stroke={color} strokeWidth={1.2} />
      <path d="M6 20 Q4 17 6 14" stroke={color} strokeWidth={0.8} fill="none" opacity={0.5} />
      <path d="M34 20 Q36 17 34 14" stroke={color} strokeWidth={0.8} fill="none" opacity={0.5} />
    </svg>
  )
}

function RoleIconSound({ color }: { color: string }) {
  return (
    <svg width={40} height={40} viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x={7} y={22} width={5} height={10} rx={1} stroke={color} strokeWidth={1} />
      <rect x={14} y={16} width={5} height={16} rx={1} stroke={color} strokeWidth={1} />
      <rect x={21} y={19} width={5} height={13} rx={1} stroke={color} strokeWidth={1} />
      <rect x={28} y={12} width={5} height={20} rx={1} stroke={color} strokeWidth={1} />
      <path d="M22 10 L28 6 L28 14 L22 18 Z" stroke={color} strokeWidth={1} fill="none" />
      <path d="M8 8 Q12 4 16 8 Q20 4 24 8" stroke={color} strokeWidth={0.8} fill="none" opacity={0.4} />
      <line x1={7} y1={34} x2={33} y2={34} stroke={color} strokeWidth={0.6} opacity={0.3} />
    </svg>
  )
}

function RoleIconEditor({ color }: { color: string }) {
  return (
    <svg width={40} height={40} viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x={6} y={16} width={28} height={4} rx={2} stroke={color} strokeWidth={1.2} />
      <line x1={14} y1={12} x2={14} y2={24} stroke={color} strokeWidth={1} />
      <line x1={21} y1={12} x2={21} y2={24} stroke={color} strokeWidth={1} />
      <line x1={28} y1={12} x2={28} y2={24} stroke={color} strokeWidth={1} />
      <rect x={7} y={17} width={6} height={2} rx={1} fill={color} fillOpacity={0.3} />
      <rect x={15} y={17} width={5} height={2} rx={1} fill={color} fillOpacity={0.3} />
      <line x1={22} y1={28} x2={32} y2={34} stroke={color} strokeWidth={1.2} />
      <line x1={22} y1={34} x2={32} y2={28} stroke={color} strokeWidth={1.2} />
      <circle cx={20} cy={28} r={3} stroke={color} strokeWidth={1} fill="none" />
      <circle cx={20} cy={34} r={3} stroke={color} strokeWidth={1} fill="none" />
      <circle cx={10} cy={30} r={3} stroke={color} strokeWidth={1} fill="none" opacity={0.6} />
      <circle cx={14} cy={30} r={3} stroke={color} strokeWidth={1} fill="none" opacity={0.6} />
      <circle cx={12} cy={34} r={3} stroke={color} strokeWidth={1} fill="none" opacity={0.6} />
    </svg>
  )
}

function RoleIconWriter({ color }: { color: string }) {
  return (
    <svg width={36} height={36} viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x={8} y={6} width={22} height={28} rx={2} stroke={color} strokeWidth={1.2} />
      {[13, 17, 21, 25].map((y, i) => (
        <line key={y} x1={13} y1={y} x2={i % 2 ? 22 : 25} y2={y} stroke={color} strokeWidth={0.8} opacity={0.5} />
      ))}
      <path d="M24 26 L28 22 L32 26 L28 30 Z" stroke={color} strokeWidth={1} fill="none" />
      <line x1={28} y1={18} x2={28} y2={22} stroke={color} strokeWidth={1} />
      <circle cx={28} cy={16} r={2} stroke={color} strokeWidth={1} fill="none" />
    </svg>
  )
}

const ROLE_ICONS: Record<RoleId, ComponentType<{ color: string }>> = {
  animator: RoleIconAnimator,
  visual: RoleIconVisual,
  voice: RoleIconVoice,
  sound: RoleIconSound,
  writer: RoleIconWriter,
  editor: RoleIconEditor,
}

/** 좌측 직군 호버 시 — 1문단: 세부 역할 나열, 2문단: 안내(줄바꿈 명확) */
const LOGIN_LEFT_ROLE_VARIETY: Record<RoleId, { rolesLine: string; footer: string }> = {
  writer: {
    rolesLine: '시나리오 작가, 각본가, 세계관·설정, 캐릭터 시트, 대사 톤 등',
    footer: '글로 팀을 이끄는 일은 이곳에서 만나보세요.',
  },
  visual: {
    rolesLine: '일러스트레이터, 콘티 작가, 배경 작가, 채색/보정가 등',
    footer: '그림으로 돕는 일들은 이곳을 방문하세요.',
  },
  animator: {
    rolesLine: '원화·동화, 리깅, 모션 연출, 이펙트, 2D·3D 등',
    footer: '움직임을 만드는 일은 이곳에서 팀을 찾아보세요.',
  },
  voice: {
    rolesLine: '캐릭터 연기, 나레이션, 노래·코러스, 군중 보이스 등',
    footer: '목소리로 돕는 일은 이곳에서 팀을 만나보세요.',
  },
  sound: {
    rolesLine: 'BGM 작·편곡, 효과음·Foley, 믹싱, 마스터링 등',
    footer: '소리로 완성도를 올리는 분은 이곳을 방문하세요.',
  },
  editor: {
    rolesLine: '컷편집, 색보정, 자막·타이포, 그래픽, 최종 렌더 등',
    footer: '편집으로 마무리하는 일은 이곳에서 팀을 찾아보세요.',
  },
}

function useSvgStrokeDrawAnimation(containerRef: RefObject<HTMLDivElement | null>, roleId: RoleId | null) {
  useLayoutEffect(() => {
    const root = containerRef.current
    if (roleId == null || !root) return

    const svg = root.querySelector('svg')
    if (!svg) return

    const candidates = svg.querySelectorAll<SVGGeometryElement>('path, line, polyline, polygon, circle, rect, ellipse')
    const toAnimate: SVGGeometryElement[] = []

    candidates.forEach((el) => {
      const stroke = el.getAttribute('stroke')
      if (stroke == null || stroke === 'none') return
      let len = 0
      try {
        len = el.getTotalLength()
      } catch {
        return
      }
      if (!Number.isFinite(len) || len <= 0) return
      el.style.strokeDasharray = String(len)
      el.style.strokeDashoffset = String(len)
      el.style.transition = 'none'
      toAnimate.push(el)
    })

    void svg.getBoundingClientRect()
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toAnimate.forEach((el, i) => {
          el.style.transition = `stroke-dashoffset 0.5s cubic-bezier(0.33, 1, 0.68, 1) ${i * 0.035}s`
          el.style.strokeDashoffset = '0'
        })
      })
    })

    return () => {
      cancelAnimationFrame(raf)
      toAnimate.forEach((el) => {
        el.style.transition = ''
        el.style.strokeDasharray = ''
        el.style.strokeDashoffset = ''
      })
    }
  }, [roleId])
}

function LeftPanelRoleLinePreview({ roleId }: { roleId: RoleId | null }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  useSvgStrokeDrawAnimation(wrapRef, roleId)

  if (roleId == null) return null

  const meta = ROLES.find((r) => r.id === roleId)!
  const Icon = ROLE_ICONS[roleId]
  const { rolesLine, footer } = LOGIN_LEFT_ROLE_VARIETY[roleId]

  return (
    <div
      className="pointer-events-none absolute bottom-8 left-8 z-[2] flex max-w-[300px] flex-col gap-3 rounded-lg border border-wem-border/40 bg-wem-surface/40 p-4 shadow-[0_0_40px_rgba(0,0,0,0.35)] backdrop-blur-[3px] md:max-w-[340px]"
      role="status"
      aria-live="polite"
      aria-label={`${meta.label} 직군 안내. ${rolesLine} ${footer}`}
    >
      <div className="flex items-center gap-3">
        <div
          ref={wrapRef}
          className="flex h-[104px] w-[104px] shrink-0 items-center justify-center rounded-md border border-wem-border/25 bg-wem-bg/30 [&_svg]:drop-shadow-[0_0_12px_rgba(0,0,0,0.4)]"
        >
          <div className="origin-center scale-[1.9]">
            <Icon color={meta.color} />
          </div>
        </div>
        <p className="min-w-0 font-noto text-sm font-medium leading-snug text-wem-text" style={{ color: meta.color }}>
          {meta.label}
        </p>
      </div>
      <div className="flex flex-col gap-0">
        <p className="break-keep font-noto text-[11px] font-normal leading-[1.75] tracking-[-0.01em] text-wem-text2">
          {rolesLine}
        </p>
        <p className="mt-3 break-keep border-t border-wem-border/35 pt-3 font-noto text-[11px] font-light leading-[1.75] text-wem-muted">
          {footer}
        </p>
      </div>
    </div>
  )
}

export default function Login() {
  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [selectedRole, setSelectedRole] = useState<RoleId | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showSignupPassword, setShowSignupPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [leftHoverRole, setLeftHoverRole] = useState<RoleId | null>(null)

  const toggleRole = useCallback((id: RoleId) => {
    setSelectedRole((prev) => (prev === id ? null : id))
  }, [])

  return (
    <div className="grid h-[100vh] max-h-[100vh] grid-cols-1 overflow-hidden bg-wem-bg md:grid-cols-2">
      {/* Left panel */}
      <div
        className="relative hidden h-full flex-col overflow-hidden border-r border-wem-border bg-wem-bg2 md:flex"
        style={{ padding: 40 }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 10%, rgba(167,139,250,0.12) 0%, transparent 60%),
              radial-gradient(ellipse 60% 70% at 80% 90%, rgba(251,191,36,0.08) 0%, transparent 60%)
            `,
          }}
          aria-hidden
        />
        <LeftDecorSvg />

        <div className="relative z-[1] flex h-full min-h-0 flex-col">
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }} aria-label="Wemagines 홈">
            <WemaginesLogo width={180} variant="dark" />
          </Link>

          <div className="flex min-h-0 flex-1 flex-col justify-center">
            <p
              className="font-dm text-[10px] font-medium uppercase tracking-[3px] text-wem-gold"
              style={fadeStyle('0.5s', '0.2s')}
            >
              Animation Collaboration
            </p>
            <h1
              className="mt-4 font-cormorant font-semibold leading-[1.1] text-wem-text"
              style={{ ...fadeStyle('0.6s', '0.3s'), fontSize: 'clamp(32px,3.5vw,52px)' }}
            >
              <span className="block">함께 만드는</span>
              <span className="block italic text-wem-accent">애니메이션의</span>
              <span className="block">시작</span>
            </h1>
            <p
              className="mt-5 max-w-md whitespace-pre-line font-noto text-[13px] font-light leading-[2] text-wem-text2"
              style={fadeStyle('0.6s', '0.4s')}
            >
              {
                '애니메이터, 작화, 성우,\n사운드 엔지니어, 스토리 작가, 편집자.\n당신의 직군으로 팀을 찾고\n함께 작품을 완성하세요.'
              }
            </p>
            <div className="mt-7 flex flex-wrap gap-2" style={fadeStyle('0.6s', '0.5s')}>
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className="cursor-pointer font-dm text-[9px] uppercase tracking-wide transition-opacity hover:opacity-90"
                  style={{
                    border: `1px solid ${r.color}66`,
                    color: r.color,
                    background: r.bgColor,
                    borderRadius: 3,
                    padding: '5px 12px',
                    letterSpacing: '1px',
                  }}
                  onMouseEnter={() => setLeftHoverRole(r.id)}
                  onMouseLeave={() => setLeftHoverRole(null)}
                  onFocus={() => setLeftHoverRole(r.id)}
                  onBlur={() => setLeftHoverRole(null)}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <LeftPanelRoleLinePreview roleId={leftHoverRole} />
      </div>

      {/* Right panel */}
      <div
        className="flex min-h-0 items-center justify-center overflow-y-auto bg-wem-bg px-6 py-10 md:px-12"
        style={{ padding: '40px 48px' }}
      >
        <div className="w-full max-w-[380px]" style={fadeStyle('0.7s', '0.2s')}>
          {tab === 'login' ? (
            <>
              <h2 className="mb-1.5 font-cormorant text-[32px] font-semibold leading-tight text-wem-text">
                <em className="not-italic font-semibold text-wem-accent">로그인</em>하기
              </h2>
              <p className="mb-4 font-noto text-[13px] font-light text-wem-muted">
                처음이신가요?{' '}
                <button type="button" className="text-wem-accent hover:underline" onClick={() => setTab('signup')}>
                  회원가입
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="mb-1.5 font-cormorant text-[32px] font-semibold leading-tight text-wem-text">
                <em className="not-italic font-semibold text-wem-accent">함께</em> 시작해요
              </h2>
              <p className="mb-4 font-noto text-[13px] font-light text-wem-muted">
                이미 계정이 있나요?{' '}
                <button type="button" className="text-wem-accent hover:underline" onClick={() => setTab('login')}>
                  로그인
                </button>
              </p>
            </>
          )}

          <div className="mb-6 border-b border-wem-border">
            <div className="flex">
              <button
                type="button"
                className={`relative font-dm text-[11px] tracking-wide transition-colors duration-200 ${
                  tab === 'login' ? 'text-wem-text' : 'text-wem-muted'
                }`}
                style={{ letterSpacing: '1px', padding: '10px 20px' }}
                onClick={() => setTab('login')}
              >
                로그인
                {tab === 'login' && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-wem-accent" aria-hidden />
                )}
              </button>
              <button
                type="button"
                className={`relative font-dm text-[11px] tracking-wide transition-colors duration-200 ${
                  tab === 'signup' ? 'text-wem-text' : 'text-wem-muted'
                }`}
                style={{ letterSpacing: '1px', padding: '10px 20px' }}
                onClick={() => setTab('signup')}
              >
                회원가입
                {tab === 'signup' && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-wem-accent" aria-hidden />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2.5 rounded border border-wem-border bg-wem-surface py-[11px] pl-4 pr-4 font-noto text-[13px] font-normal text-wem-text2 transition-colors duration-200 hover:border-wem-border2 hover:text-wem-text"
              style={{ borderRadius: 4, padding: '11px 16px' }}
              onClick={() => console.log('[login] Google')}
            >
              <GoogleIcon />
              Google로 계속하기
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2.5 rounded border border-wem-border bg-wem-surface py-[11px] pl-4 pr-4 font-noto text-[13px] font-normal text-wem-text2 transition-colors duration-200 hover:border-wem-border2 hover:text-wem-text"
              style={{ borderRadius: 4, padding: '11px 16px' }}
              onClick={() => console.log('[login] Kakao')}
            >
              <KakaoIcon />
              카카오로 계속하기
            </button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-wem-border" aria-hidden />
            <span className="font-dm text-[9px] uppercase tracking-[2px] text-wem-muted">또는</span>
            <span className="h-px flex-1 bg-wem-border" aria-hidden />
          </div>

          {tab === 'login' ? (
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault()
                console.log('[login] submit email form')
              }}
            >
              <div>
                <label className="mb-[7px] block font-dm text-[10px] uppercase tracking-wide text-wem-text2" style={{ letterSpacing: '1.5px' }}>
                  이메일
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="hello@wemagines.com"
                  className="w-full rounded border border-wem-border bg-wem-surface px-3.5 py-[11px] font-noto text-[13px] text-wem-text placeholder:text-xs placeholder:text-wem-muted focus:border-wem-accent focus:outline-none focus:ring-[3px] focus:ring-wem-accent/10"
                  style={{ borderRadius: 4, fontSize: 13 }}
                />
              </div>
              <div>
                <label className="mb-[7px] block font-dm text-[10px] uppercase tracking-wide text-wem-text2" style={{ letterSpacing: '1.5px' }}>
                  비밀번호
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
                    className="w-full rounded border border-wem-border bg-wem-surface py-[11px] pl-3.5 pr-10 font-noto text-[13px] text-wem-text placeholder:text-xs placeholder:text-wem-muted focus:border-wem-accent focus:outline-none focus:ring-[3px] focus:ring-wem-accent/10"
                    style={{ borderRadius: 4, fontSize: 13 }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? <EyeOff /> : <EyeOpen />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded border-none bg-wem-accent py-[13px] font-dm text-xs font-medium text-wem-bg transition-all hover:-translate-y-px hover:bg-[#9070f0] hover:shadow-[0_4px_16px_rgba(167,139,250,0.3)] active:translate-y-0"
                style={{ borderRadius: 4, letterSpacing: '1.5px', marginBottom: 14 }}
              >
                로그인
              </button>
              <div className="flex justify-between font-dm text-[10px] text-wem-muted">
                <button type="button" className="hover:text-wem-accent" onClick={() => console.log('[login] forgot password')}>
                  비밀번호 찾기
                </button>
                <button type="button" className="hover:text-wem-accent" onClick={() => setTab('signup')}>
                  회원가입 →
                </button>
              </div>
            </form>
          ) : (
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault()
                console.log('[signup] submit', { selectedRole, agreed })
              }}
            >
              <div>
                <label className="mb-[7px] block font-dm text-[10px] uppercase tracking-wide text-wem-text2" style={{ letterSpacing: '1.5px' }}>
                  닉네임
                </label>
                <input
                  type="text"
                  name="nickname"
                  placeholder="활동명을 입력하세요"
                  className="w-full rounded border border-wem-border bg-wem-surface px-3.5 py-[11px] font-noto text-[13px] text-wem-text placeholder:text-xs placeholder:text-wem-muted focus:border-wem-accent focus:outline-none focus:ring-[3px] focus:ring-wem-accent/10"
                  style={{ borderRadius: 4, fontSize: 13 }}
                />
              </div>
              <div>
                <label className="mb-[7px] block font-dm text-[10px] uppercase tracking-wide text-wem-text2" style={{ letterSpacing: '1.5px' }}>
                  이메일
                </label>
                <input
                  type="email"
                  name="signup-email"
                  placeholder="hello@wemagines.com"
                  className="w-full rounded border border-wem-border bg-wem-surface px-3.5 py-[11px] font-noto text-[13px] text-wem-text placeholder:text-xs placeholder:text-wem-muted focus:border-wem-accent focus:outline-none focus:ring-[3px] focus:ring-wem-accent/10"
                  style={{ borderRadius: 4, fontSize: 13 }}
                />
              </div>
              <div>
                <label className="mb-[7px] block font-dm text-[10px] uppercase tracking-wide text-wem-text2" style={{ letterSpacing: '1.5px' }}>
                  비밀번호
                </label>
                <div className="relative">
                  <input
                    type={showSignupPassword ? 'text' : 'password'}
                    name="signup-password"
                    placeholder="8자 이상"
                    className="w-full rounded border border-wem-border bg-wem-surface py-[11px] pl-3.5 pr-10 font-noto text-[13px] text-wem-text placeholder:text-xs placeholder:text-wem-muted focus:border-wem-accent focus:outline-none focus:ring-[3px] focus:ring-wem-accent/10"
                    style={{ borderRadius: 4, fontSize: 13 }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    aria-label={showSignupPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                    onClick={() => setShowSignupPassword((v) => !v)}
                  >
                    {showSignupPassword ? <EyeOff /> : <EyeOpen />}
                  </button>
                </div>
              </div>

              <div>
                <p className="mb-2 font-dm text-[10px] uppercase tracking-wide text-wem-text2" style={{ letterSpacing: '1.5px' }}>
                  주요 직군 선택
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {ORDERED_SIGNUP_ROLES.map((role) => {
                    const selected = selectedRole === role.id
                    const Icon = ROLE_ICONS[role.id]
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => toggleRole(role.id)}
                        className={`relative flex cursor-pointer flex-col items-center gap-2.5 rounded-md border bg-wem-surface transition-all duration-200 ${
                          selected ? '' : 'border-wem-border'
                        }`}
                        style={{
                          borderRadius: 6,
                          padding: '16px 12px 12px',
                          borderColor: selected ? role.color : undefined,
                          background: selected ? '#111122' : undefined,
                        }}
                      >
                        <span
                          className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full border-2"
                          style={{
                            borderColor: selected ? role.color : '#2a2a4a',
                            background: selected ? role.color : 'transparent',
                          }}
                        >
                          {selected && (
                            <svg width={10} height={8} viewBox="0 0 10 8" fill="none" aria-hidden>
                              <path d="M1 4 L3.5 6.5 L9 1" stroke="white" strokeWidth={1.5} strokeLinecap="round" />
                            </svg>
                          )}
                        </span>
                        <Icon color={role.color} />
                        <span
                          className="font-dm text-[11px] uppercase tracking-wide text-wem-muted"
                          style={{
                            letterSpacing: '1px',
                            color: selected ? role.color : undefined,
                          }}
                        >
                          {role.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border border-wem-border"
                  style={{ accentColor: 'var(--accent)' }}
                />
                <label htmlFor="terms" className="font-noto text-[11px] font-light leading-relaxed text-wem-muted">
                  <button type="button" className="text-wem-accent hover:underline">
                    이용약관
                  </button>{' '}
                  및{' '}
                  <button type="button" className="text-wem-accent hover:underline">
                    개인정보처리방침
                  </button>
                  에 동의합니다.
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded border-none bg-wem-accent py-[13px] font-dm text-xs font-medium text-wem-bg transition-all hover:-translate-y-px hover:bg-[#9070f0] hover:shadow-[0_4px_16px_rgba(167,139,250,0.3)] active:translate-y-0"
                style={{ borderRadius: 4, letterSpacing: '1.5px' }}
              >
                가입하기
              </button>
              <button
                type="button"
                className="font-dm text-[10px] text-wem-muted hover:text-wem-accent"
                onClick={() => setTab('login')}
              >
                ← 이미 계정이 있어요
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
