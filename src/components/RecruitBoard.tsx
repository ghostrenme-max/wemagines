import type { JobRole } from '../types/roles'
import { JOB_ROLE_LABELS } from '../types/roles'
import { getRoleById } from '../constants/roles'

export interface RecruitItem {
  id: string
  title: string
  author: string
  roles: Exclude<JobRole, 'all'>[]
  date: string
  slotsTotal: number
  slotsFilled: number
}

export interface RecruitBoardProps {
  items: RecruitItem[]
}

export function RecruitBoard({ items }: RecruitBoardProps) {
  return (
    <section
      id="recruit"
      className="border-t border-b border-wem-border bg-wem-bg2 px-4 py-12 md:py-16"
    >
      <div className="mx-auto max-w-fhd">
        <h2 className="font-cormorant text-2xl font-semibold text-wem-text md:text-3xl">
          모집 중인 팀
        </h2>
        <div
          className="h-0.5 w-8 rounded-[1px] bg-wem-gold"
          style={{ marginTop: 6 }}
          aria-hidden
        />
        <p className="mt-2 font-noto text-sm text-wem-text2">
          팀에 필요한 직군과 남은 슬롯을 한눈에 확인하세요.
        </p>

        <ul className="mt-8 flex flex-col gap-px rounded border border-wem-border bg-wem-border">
          {items.map((item) => (
            <li
              key={item.id}
              className="bg-wem-bg2 px-4 py-4 transition-colors hover:bg-wem-surface2/40 md:px-5"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="font-noto text-base font-medium text-wem-text">{item.title}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 font-noto text-xs text-wem-text2">
                    <span>{item.author}</span>
                    <span className="hidden text-wem-border sm:inline" aria-hidden>
                      ·
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.roles.map((r) => {
                        const meta = getRoleById(r)
                        return (
                          <span
                            key={r}
                            className="rounded border px-2 py-0.5 font-dm text-[9px] uppercase tracking-wide"
                            style={{
                              borderColor: meta.borderColor,
                              color: meta.color,
                              background: meta.bgColor,
                            }}
                          >
                            {JOB_ROLE_LABELS[r]}
                          </span>
                        )
                      })}
                    </div>
                    <span className="w-full text-wem-muted sm:w-auto">{item.date}</span>
                  </div>
                </div>
                <div
                  className="flex shrink-0 items-center gap-1.5 md:pt-1"
                  aria-label={`슬롯 ${item.slotsFilled} / ${item.slotsTotal} 채움`}
                >
                  {Array.from({ length: item.slotsTotal }, (_, i) => (
                    <span
                      key={i}
                      className={`h-2 w-2 rounded-full border ${
                        i < item.slotsFilled
                          ? 'border-wem-gold bg-wem-gold'
                          : 'border-wem-border bg-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
