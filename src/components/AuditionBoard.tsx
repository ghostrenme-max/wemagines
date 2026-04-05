import type { RoleId } from '../constants/roles'
import { getRoleById } from '../constants/roles'

export interface AuditionItem {
  name: string
  handle: string
  role: string
  roleColor: RoleId
  sample: string
  tags: string[]
  likes: number
  isNew: boolean
}

const AUDITION_ITEMS: AuditionItem[] = [
  {
    name: '최편집',
    handle: '@editmax',
    role: '편집자',
    roleColor: 'editor',
    sample: '단편 애니메이션 편집 + 색보정 샘플',
    tags: ['컷편집', '색보정', '최종렌더'],
    likes: 22,
    isNew: true,
  },
  {
    name: '하늘',
    handle: '@haneul_v',
    role: '성우',
    roleColor: 'voice',
    sample: '소녀/청년 계열 감정 연기 샘플',
    tags: ['소녀', '청년', '나레이션'],
    likes: 34,
    isNew: true,
  },
  {
    name: '웨이브',
    handle: '@wave_bgm',
    role: '사운드 엔지니어',
    roleColor: 'sound',
    sample: '오케스트라+신스 하이브리드 전투 BGM',
    tags: ['전투', '감동', '오케스트라'],
    likes: 28,
    isNew: false,
  },
  {
    name: '루나',
    handle: '@luna_draw',
    role: '작화',
    roleColor: 'visual',
    sample: '판타지 배경 일러스트 3종',
    tags: ['배경', '판타지', '컬러'],
    likes: 51,
    isNew: true,
  },
  {
    name: '민준',
    handle: '@minjun_story',
    role: '스토리 작가',
    roleColor: 'writer',
    sample: '이세계 단편 시나리오 샘플',
    tags: ['이세계', '단편', '감성'],
    likes: 19,
    isNew: false,
  },
]

export function AuditionBoard() {
  return (
    <section
      id="audition"
      className="border-t border-b border-wem-border bg-wem-bg py-12 md:py-16 animate-fadeUp"
    >
      <div className="mx-auto max-w-fhd px-4 md:px-[52px]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <h2 className="font-cormorant text-[30px] font-semibold leading-tight text-wem-text">
              오디션 게시판
            </h2>
            <div
              className="h-0.5 w-8 rounded-[1px] bg-wem-gold"
              style={{ marginTop: 6 }}
              aria-hidden
            />
            <p className="mt-3 font-noto text-[13px] font-light leading-relaxed text-wem-text2">
              샘플을 올리고 팀의 선택을 기다려요
            </p>
          </div>
          <a
            href="#audition"
            className="shrink-0 font-dm text-[10px] uppercase tracking-wide text-wem-accent transition-opacity hover:opacity-80 lg:pt-2"
          >
            전체 보기 →
          </a>
        </div>

        <ul className="mt-10 flex flex-col gap-px rounded border border-wem-border bg-wem-border">
          {AUDITION_ITEMS.map((item) => {
            const meta = getRoleById(item.roleColor)
            return (
              <li
                key={item.handle}
                className="bg-wem-bg px-4 py-5 transition-colors hover:bg-wem-surface/20 md:px-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
                  <div className="flex min-w-0 shrink-0 items-start gap-3 md:w-[200px] lg:w-[220px]">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-cormorant text-sm font-semibold text-wem-bg"
                      style={{ backgroundColor: meta.color }}
                      aria-hidden
                    >
                      {item.name.slice(0, 1)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-noto text-sm font-medium text-wem-text">{item.name}</span>
                        {item.isNew && (
                          <span className="rounded border border-wem-coral/40 px-1 py-px font-dm text-[8px] font-medium uppercase text-wem-coral">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="font-dm text-xs text-wem-muted">{item.handle}</p>
                      <p className="mt-1 font-noto text-xs text-wem-text2">{item.role}</p>
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-noto text-sm text-wem-text">{item.sample}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-wem-border px-2 py-0.5 font-dm text-[9px] text-wem-text2"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-row items-center justify-between gap-4 md:flex-col md:items-end lg:flex-row lg:items-center">
                    <span className="font-dm text-xs text-wem-muted">♥ {item.likes}</span>
                    <button
                      type="button"
                      className="rounded bg-wem-gold px-4 py-2 font-noto text-xs font-medium text-wem-bg transition-opacity hover:opacity-90"
                      style={{ borderRadius: 8 }}
                    >
                      섭외하기
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
