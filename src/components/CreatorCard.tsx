import type { JobRole } from '../types/roles'
import { getRoleById } from '../constants/roles'
import { WorkThumbIcon } from './WorkThumbIcons'

export interface CreatorCardProps {
  name: string
  handle: string
  role: Exclude<JobRole, 'all'>
  bio: string
  creditCount: number
  isOpen: boolean
}

export function CreatorCard({
  name,
  handle,
  role,
  bio,
  creditCount,
  isOpen,
}: CreatorCardProps) {
  const meta = getRoleById(role)

  return (
    <article
      className="group relative flex overflow-hidden border border-wem-border transition-[border-color] duration-200"
      style={{
        background: 'linear-gradient(135deg, #16162a 0%, #1a1a2e 100%)',
        ['--role-c' as string]: meta.color,
      }}
    >
      <div
        className="w-0.5 shrink-0 self-stretch transition-opacity group-hover:opacity-90"
        style={{ backgroundColor: meta.color }}
        aria-hidden
      />

      <div className="min-w-0 flex-1 p-4 md:p-5">
        <div className="flex gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-cormorant text-lg font-semibold text-wem-bg transition-opacity group-hover:opacity-90"
            style={{ backgroundColor: meta.color }}
            aria-hidden
          >
            {name.slice(0, 1)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-noto text-base font-medium text-wem-text">{name}</h3>
              <span className="font-dm text-xs text-wem-muted">{handle}</span>
            </div>
            <span
              className="mt-1 inline-block rounded border px-2 py-0.5 font-dm text-[9px] font-medium uppercase tracking-wider"
              style={{
                borderColor: meta.borderColor,
                color: meta.color,
                background: meta.bgColor,
              }}
            >
              {meta.label}
            </span>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-wem-text2 line-clamp-3">{bio}</p>

        <div className="mt-3 flex gap-1.5" aria-label="작품 미리보기 슬롯">
          {([0, 1, 2] as const).map((i) => (
            <div
              key={i}
              className="flex h-[38px] w-[50px] shrink-0 items-center justify-center rounded border border-wem-border bg-wem-bg2"
              style={{ borderRadius: 4 }}
            >
              <WorkThumbIcon variant={i} />
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-wem-border/60 pt-3">
          <span className="font-noto text-xs text-wem-text2">
            참여작 <span className="text-wem-text">{creditCount}</span>편
          </span>
          <span
            className={`flex items-center gap-1.5 font-noto text-xs ${isOpen ? 'text-wem-gold' : 'text-wem-coral'}`}
          >
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${isOpen ? 'bg-wem-gold shadow-[0_0_6px_rgba(251,191,36,0.5)]' : 'bg-wem-coral'}`}
              aria-hidden
            />
            {isOpen ? '협업가능' : '현재마감'}
          </span>
        </div>
      </div>
    </article>
  )
}
