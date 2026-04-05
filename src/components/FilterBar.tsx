import { ROLES } from '../constants/roles'
import type { JobRole } from '../types/roles'

export interface FilterBarProps {
  active: JobRole
  onChange: (role: JobRole) => void
}

export function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="border-b border-wem-border bg-wem-bg px-4 py-3">
      <div className="mx-auto max-w-fhd">
        <div className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          <button
            type="button"
            onClick={() => onChange('all')}
            className={[
              'shrink-0 rounded border px-3 py-2 font-dm text-[9px] font-medium uppercase tracking-wider transition-colors',
              active === 'all'
                ? 'border-wem-accent text-wem-accent bg-wem-accent/10'
                : 'border-wem-border text-wem-text2 bg-wem-surface/40 hover:border-wem-text2/50 hover:text-wem-text',
            ].join(' ')}
          >
            전체
          </button>
          {ROLES.map((r) => {
            const isActive = active === r.id
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => onChange(r.id)}
                className={[
                  'shrink-0 rounded border px-3 py-2 font-dm text-[9px] font-medium uppercase tracking-wider transition-colors',
                  isActive
                    ? ''
                    : 'border-wem-border text-wem-text2 bg-wem-surface/40 hover:border-wem-text2/50 hover:text-wem-text',
                ].join(' ')}
                style={
                  isActive
                    ? {
                        borderColor: r.borderColor,
                        color: r.color,
                        background: r.bgColor,
                      }
                    : undefined
                }
              >
                {r.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
