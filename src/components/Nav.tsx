import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { label: '크리에이터', href: '#creators' },
  { label: '모집 게시판', href: '#recruit' },
  { label: '작품', href: '#works' },
  { label: '팀 매칭', href: '#match' },
  { label: '로그인', href: '#login' },
] as const

export function Nav() {
  const [open, setOpen] = useState(false)

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

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-wem-border bg-wem-bg/80 backdrop-blur-md animate-fadeUp">
        <div className="mx-auto flex max-w-fhd items-center justify-between gap-4 px-4 py-3 md:py-3.5">
          <a
            href="#"
            className="font-cormorant text-xl font-semibold tracking-tight text-wem-accent md:text-2xl"
          >
            Wemagines
          </a>

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="주요 메뉴"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-noto text-sm text-wem-text2 transition-colors hover:text-wem-text"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#start"
              className="hidden rounded border border-transparent bg-wem-accent px-3 py-1.5 font-noto text-sm font-medium text-wem-bg transition-opacity hover:opacity-90 md:inline-flex"
              style={{ borderRadius: 4 }}
            >
              시작하기
            </a>

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
            <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="모바일 메뉴">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded px-3 py-3 font-noto text-wem-text transition-colors hover:bg-wem-border/40"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="border-t border-wem-border p-4">
              <a
                href="#start"
                className="block w-full rounded bg-wem-accent py-2.5 text-center font-noto text-sm font-medium text-wem-bg"
                style={{ borderRadius: 4 }}
                onClick={() => setOpen(false)}
              >
                시작하기
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
