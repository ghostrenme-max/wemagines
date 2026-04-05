import type { RoleId } from '../constants/roles'
import { getRoleById } from '../constants/roles'

export interface ShowcaseTeamMember {
  roleId: RoleId
}

export interface ShowcaseCard {
  title: string
  genre: string
  thumbnail: string
  duration: string
  team: ShowcaseTeamMember[]
  views: number
}

const SHOWCASE_ITEMS: ShowcaseCard[] = [
  {
    title: '별을 삼킨 고양이',
    genre: '판타지',
    thumbnail: '🐱',
    duration: '4:32',
    team: [{ roleId: 'animator' }, { roleId: 'voice' }, { roleId: 'sound' }],
    views: 1240,
  },
  {
    title: '마지막 편지',
    genre: '드라마',
    thumbnail: '✉️',
    duration: '7:15',
    team: [
      { roleId: 'visual' },
      { roleId: 'animator' },
      { roleId: 'voice' },
      { roleId: 'writer' },
    ],
    views: 892,
  },
  {
    title: '리듬 오브 네온',
    genre: '액션',
    thumbnail: '⚡',
    duration: '3:48',
    team: [{ roleId: 'animator' }, { roleId: 'sound' }],
    views: 2341,
  },
  {
    title: '봄의 끝에서',
    genre: '감성',
    thumbnail: '🌸',
    duration: '5:20',
    team: [{ roleId: 'visual' }, { roleId: 'writer' }, { roleId: 'sound' }, { roleId: 'voice' }],
    views: 673,
  },
]

function ShowcaseCardItem({ item }: { item: ShowcaseCard }) {
  return (
    <article className="group border border-wem-border bg-wem-surface transition-[border-color] duration-200 hover:border-wem-accent">
      <div className="relative flex h-[160px] items-center justify-center bg-wem-surface2 transition-[filter] duration-200 group-hover:brightness-110">
        <span className="absolute right-2 top-2 rounded border border-wem-border px-1.5 py-0.5 font-dm text-[8px] uppercase tracking-wide text-wem-text2">
          {item.genre}
        </span>
        <span className="text-[48px] leading-none" aria-hidden>
          {item.thumbnail}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-noto text-sm font-medium text-wem-text">{item.title}</h3>
        <p className="mt-1 font-dm text-[10px] text-wem-muted">{item.duration}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {item.team.map((m) => {
            const r = getRoleById(m.roleId)
            return (
              <span
                key={`${item.title}-${m.roleId}`}
                className="rounded border px-1.5 py-0.5 font-dm text-[8px] font-medium uppercase tracking-wide"
                style={{
                  borderRadius: 2,
                  borderColor: r.borderColor,
                  color: r.color,
                  background: r.bgColor,
                }}
              >
                {r.label}
              </span>
            )
          })}
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="font-dm text-[9px] text-wem-muted">
            조회 {item.views.toLocaleString()}
          </span>
          <button
            type="button"
            className="font-dm text-[9px] text-wem-accent transition-opacity hover:opacity-80"
          >
            클립 보기 →
          </button>
        </div>
      </div>
    </article>
  )
}

export function ShowcaseGallery() {
  return (
    <section
      id="showcase"
      className="border-t border-b border-wem-border bg-wem-bg2 py-12 md:py-16 animate-fadeUp"
    >
      <div className="mx-auto max-w-fhd px-4 md:px-[52px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-cormorant text-[30px] font-semibold leading-tight text-wem-text">
              완성된 작품들
            </h2>
            <div
              className="h-0.5 w-8 rounded-[1px] bg-wem-gold"
              style={{ marginTop: 6 }}
              aria-hidden
            />
          </div>
          <a
            href="#showcase"
            className="shrink-0 font-dm text-[10px] uppercase tracking-wide text-wem-accent transition-opacity hover:opacity-80"
          >
            전체 보기 →
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-px bg-wem-border sm:grid-cols-2 lg:grid-cols-3">
          {SHOWCASE_ITEMS.map((item) => (
            <ShowcaseCardItem key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
