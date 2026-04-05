import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { ROLES, type RoleId } from '../constants/roles'
import { HeroLogoAnimation } from './HeroLogoAnimation'
import { HeroSlide3Workflow } from './HeroSlide3Workflow'

const SLIDE_COUNT = 4
/** 메인(로고) — 텍스트 페이드가 3.3s+0.5s까지 이어지므로 그 이후 여유 체류 */
const AUTO_MS_SLIDE_MAIN = 6800
/** 직군 슬라이드 자동 전환 */
const AUTO_MS_SLIDE_ROLES = 2600
/** 인디케이터 4(시작) — 기존과 동일한 체류 */
const AUTO_MS_SLIDE_4 = 4000
const SWIPE_PX = 50

interface Slide {
  id: number
  label: string
  component: ReactNode
}

const ROLE_EMOJI: Record<RoleId, string> = {
  writer: '✍️',
  visual: '🎨',
  animator: '🎬',
  voice: '🎤',
  sound: '🎵',
  editor: '✂️',
}

const SLIDE_BACKGROUNDS = [
  'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(167,139,250,0.15) 0%, transparent 60%)',
  'radial-gradient(ellipse 50% 60% at 20% 80%, rgba(244,114,182,0.1) 0%, transparent 60%)',
  '#0d0d1a',
  'radial-gradient(ellipse 60% 60% at 60% 30%, rgba(167,139,250,0.12) 0%, transparent 60%)',
] as const

function SlideShell({
  active,
  background,
  fullBleed,
  centerTall,
  children,
}: {
  active: boolean
  background: string
  fullBleed?: boolean
  /** 슬라이드 1 — 로고 애니메이션 전체 높이 중앙 */
  centerTall?: boolean
  children: ReactNode
}) {
  return (
    <div
      className={`absolute inset-0 flex flex-col transition-[opacity,transform] duration-[600ms] ease ${
        fullBleed ? 'px-0' : 'items-center justify-center px-4'
      } ${
        active
          ? 'z-10 translate-y-0 opacity-100'
          : 'pointer-events-none z-0 translate-y-4 opacity-0'
      }`}
      aria-hidden={!active}
    >
      <div className="pointer-events-none absolute inset-0" style={{ background }} aria-hidden />
      <div
        className={`relative z-[1] flex w-full flex-col ${
          fullBleed
            ? 'h-full min-h-0 max-w-none'
            : centerTall
              ? 'h-full min-h-0 max-w-none items-center justify-center'
              : 'max-w-4xl items-center justify-center text-center'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

const slideContents: ReactNode[] = [
  null,
  <>
    <p className="font-dm text-[10px] font-medium uppercase tracking-[3px] text-wem-accent2">
      WHO WE ARE
    </p>
    <h2
      className="mt-6 whitespace-pre-line font-cormorant font-semibold leading-tight text-wem-text"
      style={{ fontSize: 'clamp(40px, 8vw, 80px)' }}
    >
      {'모든 역할이\n여기 있어요'}
    </h2>
    <div className="mt-10 mx-auto grid w-full max-w-md grid-cols-3 gap-2 px-1 sm:max-w-xl sm:gap-3 md:max-w-2xl">
      {ROLES.map((r) => (
        <span
          key={r.id}
          className="inline-flex min-h-[3.25rem] min-w-0 flex-col items-center justify-center gap-0.5 rounded border px-1.5 py-2 text-center font-noto text-[11px] leading-snug sm:min-h-0 sm:flex-row sm:gap-1.5 sm:px-3 sm:py-2.5 sm:text-sm"
          style={{
            borderRadius: 4,
            borderColor: r.borderColor,
            color: r.color,
            background: r.bgColor,
          }}
        >
          <span aria-hidden className="shrink-0 text-sm sm:text-base">
            {ROLE_EMOJI[r.id]}
          </span>
          <span className="max-w-full break-keep px-0.5">{r.label}</span>
        </span>
      ))}
    </div>
  </>,
  null,
  <>
    <p className="font-dm text-[10px] font-medium uppercase tracking-[3px] text-wem-accent">
      GET STARTED
    </p>
    <h2
      className="mt-6 whitespace-pre-line font-cormorant font-semibold leading-tight text-wem-text"
      style={{ fontSize: 'clamp(40px, 8vw, 80px)' }}
    >
      {'지금 팀을\n찾아보세요'}
    </h2>
    <div className="mt-10 flex w-full max-w-xl flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
      <a
        href="#creators"
        className="pointer-events-auto inline-flex items-center justify-center bg-wem-accent font-dm text-[11px] font-medium uppercase tracking-[1px] text-wem-bg transition-opacity hover:opacity-90"
        style={{ borderRadius: 4, padding: '14px 28px' }}
      >
        포트폴리오 등록하기
      </a>
      <a
        href="#creators"
        className="pointer-events-auto inline-flex items-center justify-center gap-1 border border-wem-border2 font-dm text-[11px] font-medium uppercase tracking-[1px] text-wem-text2 transition-colors hover:border-wem-accent hover:text-wem-accent"
        style={{ borderRadius: 4, padding: '14px 28px' }}
      >
        크리에이터 탐색 <span aria-hidden>→</span>
      </a>
    </div>
  </>,
]

const SLIDES: Slide[] = slideContents.map((component, id) => ({
  id,
  label: ['메인', '직군', '제작흐름', '시작'][id]!,
  component,
}))

export type HeroProps = {
  onSlideChange?: (index: number) => void
}

export function Hero({ onSlideChange }: HeroProps = {}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [flowKey, setFlowKey] = useState(0)
  const [slide1AnimKey, setSlide1AnimKey] = useState(0)
  const pointerStartX = useRef<number | null>(null)
  const capturingRef = useRef(false)

  const prevSlideRef = useRef(activeIndex)
  useLayoutEffect(() => {
    if (activeIndex === 2 && prevSlideRef.current !== 2) {
      setFlowKey((k) => k + 1)
    }
    prevSlideRef.current = activeIndex
  }, [activeIndex])

  const prevForSlide1Ref = useRef(activeIndex)
  useEffect(() => {
    if (activeIndex === 0 && prevForSlide1Ref.current !== 0) {
      setSlide1AnimKey((k) => k + 1)
    }
    prevForSlide1Ref.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    onSlideChange?.(activeIndex)
  }, [activeIndex, onSlideChange])

  useEffect(() => {
    if (isPaused || activeIndex === 2) return
    const delay =
      activeIndex === 3
        ? AUTO_MS_SLIDE_4
        : activeIndex === 0
          ? AUTO_MS_SLIDE_MAIN
          : AUTO_MS_SLIDE_ROLES
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % SLIDE_COUNT)
    }, delay)
    return () => clearInterval(id)
  }, [isPaused, activeIndex])

  const go = useCallback((delta: number) => {
    setActiveIndex((i) => (i + delta + SLIDE_COUNT) % SLIDE_COUNT)
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    const el = e.target as HTMLElement | null
    if (el?.closest('a, button')) return

    pointerStartX.current = e.clientX
    capturingRef.current = true
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (!capturingRef.current || pointerStartX.current == null) {
      pointerStartX.current = null
      capturingRef.current = false
      return
    }
    const dx = e.clientX - pointerStartX.current
    pointerStartX.current = null
    capturingRef.current = false
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
    if (dx > SWIPE_PX) go(-1)
    else if (dx < -SWIPE_PX) go(1)
  }

  const onPointerCancel = () => {
    pointerStartX.current = null
    capturingRef.current = false
  }

  return (
    <section
      id="start"
      className="relative h-[100vh] min-h-[100vh] w-full overflow-hidden border-b border-wem-border bg-wem-bg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      role="region"
      aria-roledescription="carousel"
      aria-label="온보딩 슬라이드"
    >
      <div className="relative h-full w-full pt-20 md:pt-24">
        {SLIDES.map((slide, i) => (
          <SlideShell
            key={slide.id}
            active={activeIndex === i}
            background={SLIDE_BACKGROUNDS[i]!}
            fullBleed={i === 2}
            centerTall={i === 0}
          >
            {i === 0 ? (
              <HeroLogoAnimation key={slide1AnimKey} />
            ) : i === 2 ? (
              activeIndex === 2 && (
                <HeroSlide3Workflow
                  key={flowKey}
                  onWorkflowComplete={() => setActiveIndex(3)}
                />
              )
            ) : (
              slide.component
            )}
          </SlideShell>
        ))}
      </div>

      <div
        className="pointer-events-auto absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2"
        role="tablist"
        aria-label="슬라이드 선택"
      >
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={activeIndex === i}
            aria-label={`${s.label} 슬라이드`}
            className={`h-[7px] rounded-full transition-all duration-300 ease-out ${
              activeIndex === i ? 'w-6 bg-wem-accent' : 'w-[7px] bg-wem-muted'
            }`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </section>
  )
}
