/** 카드 하단 작품 슬롯용 라인(스트로크) 아이콘 — 이모지 대체 */

const stroke = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function WorkThumbIcon({ variant }: { variant: 0 | 1 | 2 }) {
  const className = 'h-[22px] w-[26px] shrink-0 text-wem-text2/75'

  if (variant === 0) {
    return (
      <svg className={className} viewBox="0 0 28 22" aria-hidden>
        <rect x="2" y="3" width="24" height="16" rx="2" {...stroke} />
        <path d="M11 9.5v5l4-2.5-4-2.5z" {...stroke} />
      </svg>
    )
  }

  if (variant === 1) {
    return (
      <svg className={className} viewBox="0 0 28 22" aria-hidden>
        <rect x="2" y="3" width="24" height="16" rx="2" {...stroke} />
        <path d="M6 15l5-5 4 4 5-6" {...stroke} />
        <circle cx="9" cy="8" r="1.5" {...stroke} />
      </svg>
    )
  }

  return (
    <svg className={className} viewBox="0 0 28 22" aria-hidden>
      <rect x="2" y="3" width="24" height="16" rx="2" {...stroke} />
      <path d="M7 9h14M7 12h10M7 15h12" {...stroke} />
    </svg>
  )
}
