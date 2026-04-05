import type { JobRole } from '../types/roles'

export interface FilterBarProps {
  active: JobRole
  onChange: (role: JobRole) => void
}

const FILTERS: { id: JobRole; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'animator', label: '애니메이터' },
  { id: 'illustrator', label: '일러스트' },
  { id: 'voice', label: '성우' },
  { id: 'bgm', label: 'BGM' },
  { id: 'writer', label: '스토리작가' },
]

const roleColorClass: Record<Exclude<JobRole, 'all'>, string> = {
  animator: 'border-wem-animator text-wem-animator bg-wem-animator/10',
  illustrator: 'border-wem-illust text-wem-illust bg-wem-illust/10',
  voice: 'border-wem-voice text-wem-voice bg-wem-voice/10',
  bgm: 'border-wem-bgm text-wem-bgm bg-wem-bgm/10',
  writer: 'border-wem-writer text-wem-writer bg-wem-writer/10',
}

export function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="border-b border-wem-border bg-wem-bg px-4 py-3">
      <div className="mx-auto max-w-fhd">
        <div className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {FILTERS.map((f) => {
            const isActive = active === f.id
            const activeClass =
              f.id === 'all'
                ? 'border-wem-accent text-wem-accent bg-wem-accent/10'
                : roleColorClass[f.id]

            return (
              <button
                key={f.id}
                type="button"
                onClick={() => onChange(f.id)}
                className={[
                  'shrink-0 rounded border px-3 py-2 font-dm text-[9px] font-medium uppercase tracking-wider transition-colors',
                  isActive
                    ? activeClass
                    : 'border-wem-border text-wem-text2 bg-wem-surface/40 hover:border-wem-text2/50 hover:text-wem-text',
                ].join(' ')}
              >
                {f.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
