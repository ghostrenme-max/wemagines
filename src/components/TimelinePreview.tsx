export interface TimelineItem {
  date: string
  title: string
  desc: string
  role: string
  roleColor: string
  isDone: boolean
}

const TIMELINE_DEMO: TimelineItem[] = [
  {
    date: '2026.04.01',
    title: '팀 구성 완료',
    desc: '스토리 작가, 작화, 애니메이터 합류',
    role: '팀 매칭',
    roleColor: '#a78bfa',
    isDone: true,
  },
  {
    date: '2026.04.10',
    title: '스크립트 완성',
    desc: '3막 구조 단편 시나리오 확정',
    role: '스토리작가',
    roleColor: '#c4a87a',
    isDone: true,
  },
  {
    date: '2026.04.22',
    title: '캐릭터 시트 완성',
    desc: '주인공 및 조연 캐릭터 디자인 확정',
    role: '작화',
    roleColor: '#fb923c',
    isDone: true,
  },
  {
    date: '2026.05.08',
    title: '애니메이션 작업 중',
    desc: '씬 1-3 완성, 씬 4-6 진행 중',
    role: '애니메이터',
    roleColor: '#f87171',
    isDone: false,
  },
  {
    date: '2026.05.22',
    title: '성우 녹음 예정',
    desc: '전체 더빙 녹음 세션',
    role: '성우',
    roleColor: '#34d399',
    isDone: false,
  },
  {
    date: '2026.06.05',
    title: '사운드 작업 예정',
    desc: 'OST 3트랙 + 효과음',
    role: '사운드 엔지니어',
    roleColor: '#a78bfa',
    isDone: false,
  },
  {
    date: '2026.06.18',
    title: '최종 완성 & 공개',
    desc: '쇼케이스 페이지 업로드',
    role: '완성',
    roleColor: '#fbbf24',
    isDone: false,
  },
]

type DotState = 'done' | 'active' | 'upcoming'

function TimelineDot({ state }: { state: DotState }) {
  if (state === 'done') {
    return <div className="relative z-[1] h-3 w-3 shrink-0 rounded-full bg-wem-gold" aria-hidden />
  }
  if (state === 'active') {
    return (
      <div
        className="relative z-[1] h-3 w-3 shrink-0 rounded-full bg-wem-accent animate-timelineDotGlow"
        aria-hidden
      />
    )
  }
  return (
    <div
      className="relative z-[1] h-3 w-3 shrink-0 rounded-full border border-wem-border bg-transparent"
      aria-hidden
    />
  )
}

function dotStateFor(item: TimelineItem, index: number, activeIdx: number): DotState {
  if (item.isDone) return 'done'
  if (index === activeIdx) return 'active'
  return 'upcoming'
}

export function TimelinePreview() {
  const activeIdx = TIMELINE_DEMO.findIndex((t) => !t.isDone)

  return (
    <section
      className="border-b border-wem-border bg-wem-bg2 py-12 md:py-16 animate-fadeUp"
      aria-labelledby="timeline-preview-heading"
    >
      <div className="mx-auto max-w-fhd px-4 md:px-[52px]">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="timeline-preview-heading"
              className="font-cormorant text-[30px] font-semibold leading-tight text-wem-text"
            >
              작품이 만들어지는 과정
            </h2>
            <div className="mt-2 h-0.5 rounded-[1px] bg-wem-gold" style={{ width: 32 }} aria-hidden />
            <p className="mt-4 font-noto text-[13px] font-light text-wem-text2">
              팀 구성부터 완성까지, 모든 과정이 기록됩니다
            </p>
          </div>
          <a
            href="#creators"
            className="shrink-0 font-dm text-[10px] text-wem-accent transition-opacity hover:opacity-90"
          >
            전체 보기 →
          </a>
        </header>

        <div className="relative mt-10 md:mt-12">
          {/* 세로 중심선: 트랙(1rem) 가운데 — 역할 열 너비 + 트랙 절반 */}
          <div
            className="absolute bottom-2 left-[calc(5rem+8px-0.5px)] top-2 w-px bg-wem-border md:left-[calc(7.5rem+8px-0.5px)]"
            aria-hidden
          />

          <ul className="relative space-y-8">
            {TIMELINE_DEMO.map((item, i) => (
              <li key={`${item.date}-${item.title}`} className="flex items-start">
                <div className="flex w-20 shrink-0 justify-end pr-3 pt-0.5 md:w-[7.5rem] md:pr-4">
                  <span
                    className="inline-block rounded-sm border px-2 py-0.5 text-right font-noto text-[10px] font-medium leading-tight text-wem-text md:text-xs"
                    style={{ borderColor: item.roleColor, color: item.roleColor }}
                  >
                    {item.role}
                  </span>
                </div>

                <div className="relative z-[1] flex w-4 shrink-0 justify-center pt-1.5">
                  <TimelineDot state={dotStateFor(item, i, activeIdx)} />
                </div>

                <div className="min-w-0 flex-1 pl-2 md:pl-4">
                  <p className="font-dm text-[9px] text-wem-muted">{item.date}</p>
                  <p className="mt-1 font-noto text-sm font-medium text-wem-text">{item.title}</p>
                  <p className="mt-1 font-noto text-xs font-light text-wem-text2">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex justify-center md:justify-start">
          <a
            href="#creators"
            className="inline-flex items-center justify-center bg-wem-gold px-6 py-3 font-dm text-[11px] font-medium text-wem-bg transition-opacity hover:opacity-90"
            style={{ borderRadius: 4, padding: '12px 24px' }}
          >
            내 프로젝트 타임라인 만들기 →
          </a>
        </div>
      </div>
    </section>
  )
}
