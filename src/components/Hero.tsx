import { JOB_ROLE_LABELS } from '../types/roles'

const STATS = [
  { value: '1,247', label: 'Creators' },
  { value: '386', label: 'Projects' },
  { value: '94', label: 'Recruiting' },
  { value: '58', label: 'Completed' },
] as const

export function Hero() {
  const roles = Object.values(JOB_ROLE_LABELS).join(' · ')

  return (
    <section
      id="start"
      className="relative overflow-hidden border-b border-wem-border bg-wem-bg px-4 pb-16 pt-28 md:pb-24 md:pt-32"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 100% 0%, rgba(167,139,250,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 40% 60% at 0% 100%, rgba(244,114,182,0.08) 0%, transparent 60%)
          `,
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-fhd">
        <p
          className="font-dm text-[10px] font-medium uppercase tracking-[0.2em] text-wem-accent animate-fadeUp md:text-[11px]"
          style={{ animationFillMode: 'both' }}
        >
          Animation Collaboration Platform
        </p>

        <h1
          className="mt-4 max-w-4xl font-cormorant font-semibold leading-[1.05] text-wem-text animate-fadeUp"
          style={{
            fontSize: 'clamp(48px, 8vw, 90px)',
            animationDelay: '0.08s',
            animationFillMode: 'both',
          }}
        >
          Make /{' '}
          <span className="italic text-wem-accent">Animation</span> /{' '}
          <span className="italic text-wem-muted">Together</span>
        </h1>

        <p
          className="mt-6 max-w-2xl text-sm leading-relaxed text-wem-text2 animate-fadeUp md:text-base"
          style={{ animationDelay: '0.14s', animationFillMode: 'both' }}
        >
          <span className="text-wem-text">{roles}</span>
          <br className="md:hidden" />
          <span className="md:ml-1">함께 작품을 완성할 팀을 찾아보세요.</span>
        </p>

        <div
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center animate-fadeUp"
          style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
        >
          <a
            href="#creators"
            className="inline-flex items-center justify-center rounded border border-wem-accent bg-wem-accent px-6 py-3 font-noto text-sm font-medium text-wem-bg transition-opacity hover:opacity-90"
            style={{ borderRadius: 4 }}
          >
            포트폴리오 등록하기
          </a>
          <a
            href="#creators"
            className="inline-flex items-center justify-center gap-1 rounded border border-wem-border bg-transparent px-6 py-3 font-noto text-sm font-medium text-wem-text transition-colors hover:border-wem-accent hover:text-wem-accent"
            style={{ borderRadius: 4 }}
          >
            크리에이터 탐색 <span aria-hidden>→</span>
          </a>
        </div>

        <div
          className="mt-14 grid grid-cols-2 gap-px rounded border border-wem-border bg-wem-border md:grid-cols-4 animate-fadeUp"
          style={{ animationDelay: '0.26s', animationFillMode: 'both' }}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-wem-surface2 px-4 py-5 text-center md:px-6 md:py-6"
            >
              <p className="stat-num font-cormorant text-[34px] leading-none text-wem-accent">
                {s.value}
              </p>
              <p className="mt-2 font-dm text-[9px] uppercase tracking-wider text-wem-text2">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
