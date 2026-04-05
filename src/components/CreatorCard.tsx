import type { JobRole } from '../types/roles'
import { JOB_ROLE_LABELS } from '../types/roles'
import { WorkThumbIcon } from './WorkThumbIcons'

export interface CreatorCardProps {
  name: string
  handle: string
  role: Exclude<JobRole, 'all'>
  bio: string
  creditCount: number
  isOpen: boolean
}

const roleBarClass: Record<CreatorCardProps['role'], string> = {
  animator: 'bg-wem-animator',
  illustrator: 'bg-wem-illust',
  voice: 'bg-wem-voice',
  bgm: 'bg-wem-bgm',
  writer: 'bg-wem-writer',
}

const roleAvatarClass: Record<CreatorCardProps['role'], string> = {
  animator: 'bg-wem-animator',
  illustrator: 'bg-wem-illust',
  voice: 'bg-wem-voice',
  bgm: 'bg-wem-bgm',
  writer: 'bg-wem-writer',
}

const roleBadgeClass: Record<CreatorCardProps['role'], string> = {
  animator: 'border-wem-animator/50 text-wem-animator bg-wem-animator/15',
  illustrator: 'border-wem-illust/50 text-wem-illust bg-wem-illust/15',
  voice: 'border-wem-voice/50 text-wem-voice bg-wem-voice/15',
  bgm: 'border-wem-bgm/50 text-wem-bgm bg-wem-bgm/15',
  writer: 'border-wem-writer/50 text-wem-writer bg-wem-writer/15',
}

const roleHoverBorder: Record<CreatorCardProps['role'], string> = {
  animator: 'hover:border-wem-animator',
  illustrator: 'hover:border-wem-illust',
  voice: 'hover:border-wem-voice',
  bgm: 'hover:border-wem-bgm',
  writer: 'hover:border-wem-writer',
}

export function CreatorCard({
  name,
  handle,
  role,
  bio,
  creditCount,
  isOpen,
}: CreatorCardProps) {
  return (
    <article
      className={`relative flex overflow-hidden border border-wem-border transition-[border-color] duration-200 ${roleHoverBorder[role]}`}
      style={{
        background: 'linear-gradient(135deg, #16162a 0%, #1a1a2e 100%)',
      }}
    >
      <div className={`w-0.5 shrink-0 self-stretch ${roleBarClass[role]}`} aria-hidden />

      <div className="min-w-0 flex-1 p-4 md:p-5">
        <div className="flex gap-3">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-cormorant text-lg font-semibold text-wem-bg ${roleAvatarClass[role]}`}
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
              className={`mt-1 inline-block rounded border px-2 py-0.5 font-dm text-[9px] font-medium uppercase tracking-wider ${roleBadgeClass[role]}`}
            >
              {JOB_ROLE_LABELS[role]}
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
          <span className="flex items-center gap-1.5 font-noto text-xs text-wem-text2">
            <span
              className={`h-1.5 w-1.5 rounded-full ${isOpen ? 'bg-wem-accent3' : 'bg-wem-muted'}`}
              aria-hidden
            />
            {isOpen ? '협업가능' : '현재마감'}
          </span>
        </div>
      </div>
    </article>
  )
}
