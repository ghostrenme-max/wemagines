import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import WemaginesLogo from './WemaginesLogo'

/** 홈 앵커 스크롤용 `navigate` state */
export type HomeScrollState = {
  scrollTo?: string
}

const SECTION_LINKS = [
  { label: '크리에이터', id: 'creators' },
  { label: '모집 게시판', id: 'recruit' },
  { label: '작품', id: 'showcase' },
  { label: '오디션', id: 'audition' },
] as const

const DRAWER_CLOSE_MS = 280

export function Nav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const scrollToSectionId = useCallback(
    (sectionId: string) => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    },
    [],
  )

  const goToHomeSection = useCallback(
    (sectionId: string, afterDrawerClose: boolean) => {
      const run = () => {
        if (location.pathname === '/') {
          scrollToSectionId(sectionId)
        } else {
          navigate('/', { state: { scrollTo: sectionId } satisfies HomeScrollState })
        }
      }
      if (afterDrawerClose) {
        setOpen(false)
        window.setTimeout(run, DRAWER_CLOSE_MS)
      } else {
        run()
      }
    },
    [location.pathname, navigate, scrollToSectionId],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const loginButtonClass =
    'inline-flex items-center justify-center border border-wem-border2 bg-transparent font-dm text-[11px] text-wem-text2 transition-colors hover:border-wem-accent hover:text-wem-accent'
  const loginStyle = {
    borderRadius: 4,
    letterSpacing: '1px',
    padding: '8px 18px',
  } as const

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-wem-border bg-wem-bg/80 backdrop-blur-md animate-fadeUp">
        <div className="mx-auto flex max-w-fhd items-center justify-between gap-4 px-4 py-3 md:py-3.5">
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }} aria-label="Wemagines 홈">
            <WemaginesLogo width={200} variant="dark" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="주요 메뉴">
            {SECTION_LINKS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="font-noto text-sm text-wem-text2 transition-colors hover:text-wem-text"
                onClick={() => goToHomeSection(item.id, false)}
              >
                {item.label}
              </button>
            ))}
            <Link
              to="/messenger"
              className="font-noto text-sm text-wem-text2 transition-colors hover:text-wem-text"
            >
              팀 채팅
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className={`${loginButtonClass} hidden md:inline-flex`}
              style={loginStyle}
            >
              로그인
            </Link>

            <button
              type="button"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded border border-wem-border bg-wem-surface/60 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-drawer"
              aria-label="메뉴 열기"
              onClick={() => setOpen(true)}
            >
              <span className="h-0.5 w-5 bg-wem-text" />
              <span className="h-0.5 w-5 bg-wem-text" />
              <span className="h-0.5 w-5 bg-wem-text" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="메뉴 닫기"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-drawer"
            className="absolute right-0 top-0 flex h-full w-[min(100%,280px)] flex-col border-l border-wem-border bg-wem-surface shadow-xl animate-fadeUp"
          >
            <div className="flex items-center justify-between border-b border-wem-border px-4 py-3">
              <span className="font-cormorant text-lg text-wem-accent">Menu</span>
              <button
                type="button"
                className="rounded border border-wem-border px-2 py-1 text-sm text-wem-text2"
                onClick={() => setOpen(false)}
              >
                닫기
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3" aria-label="모바일 메뉴">
              {SECTION_LINKS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="rounded px-3 py-3 text-left font-noto text-wem-text transition-colors hover:bg-wem-border/40"
                  onClick={() => goToHomeSection(item.id, true)}
                >
                  {item.label}
                </button>
              ))}
              <Link
                to="/messenger"
                className="rounded px-3 py-3 font-noto text-wem-text transition-colors hover:bg-wem-border/40"
                onClick={() => setOpen(false)}
              >
                팀 채팅
              </Link>
              <Link
                to="/login"
                className={`${loginButtonClass} mt-1 w-full`}
                style={loginStyle}
                onClick={() => setOpen(false)}
              >
                로그인
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
