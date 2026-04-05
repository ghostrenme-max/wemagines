export interface PeerReviewDemo {
  rating: number
  comment: string
  dateLabel: string
}

const DEMO_REVIEWS: PeerReviewDemo[] = [
  {
    rating: 5,
    comment: '전투씬 타이밍이 정말 좋아요. 음악이랑 싱크가 완벽했어요.',
    dateLabel: '2026.04.02',
  },
  {
    rating: 4,
    comment: '캐릭터 모션이 자연스럽고 배경 일러스트가 특히 인상적이었어요.',
    dateLabel: '2026.04.08',
  },
  {
    rating: 5,
    comment: '성우 연기가 장면 감정을 잘 살렸어요. 다음 작품도 기대돼요.',
    dateLabel: '2026.04.15',
  },
]

const AVG_SCORE = '4.2'
const REVIEW_COUNT = 18

function StarRow({ filled }: { filled: number }) {
  return (
    <span className="inline-flex items-center gap-0 text-[12px] leading-none" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < filled ? 'text-wem-gold' : 'text-wem-muted'}>
          {i < filled ? '★' : '☆'}
        </span>
      ))}
    </span>
  )
}

export function AnonymousReview() {
  return (
    <section
      className="border-b border-wem-border bg-wem-bg py-12 md:py-16 animate-fadeUp"
      aria-labelledby="anonymous-review-heading"
    >
      <div className="mx-auto max-w-fhd px-4 md:px-[52px]">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="font-dm text-[9px] font-medium uppercase tracking-[2px] text-wem-accent2">
              PEER REVIEW
            </p>
            <h2
              id="anonymous-review-heading"
              className="mt-4 whitespace-pre-line font-cormorant font-semibold leading-tight text-wem-text"
              style={{ fontSize: 'clamp(36px, 7vw, 68px)' }}
            >
              {'익명으로\n'}
              <span className="italic text-wem-accent">솔직하게</span>
            </h2>
            <p
              className="mt-6 max-w-md whitespace-pre-line font-noto text-[13px] font-light leading-[2] text-wem-text2"
            >
              {
                '완성된 작품에 다른 크리에이터들이\n익명으로 피드백을 남겨요.\n별점과 짧은 코멘트로\n포트폴리오를 더 단단하게 만들어보세요.'
              }
            </p>
          </div>

          <div
            className="rounded-md border border-wem-border bg-wem-surface p-5"
            style={{ borderRadius: 6 }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-noto text-sm font-medium text-wem-text">별을 삼킨 고양이</h3>
              <span
                className="inline-block rounded-sm border border-wem-accent px-2 py-0.5 font-dm text-[8px] uppercase tracking-wide text-wem-accent"
                style={{ padding: '2px 8px', borderRadius: 2 }}
              >
                판타지
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 border-b border-wem-border pb-4">
              <StarRow filled={4} />
              <span className="font-dm text-xs text-wem-gold">{AVG_SCORE}</span>
              <span className="font-dm text-[9px] text-wem-muted">(리뷰 {REVIEW_COUNT}개)</span>
            </div>

            <ul className="divide-y divide-wem-border">
              {DEMO_REVIEWS.map((r, i) => (
                <li key={i} className="flex gap-3 py-4 first:pt-4">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-wem-border2/60"
                    aria-hidden
                  >
                    <span className="font-noto text-[9px] font-light text-wem-text2">익명</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1">
                      <StarRow filled={r.rating} />
                    </div>
                    <p className="font-noto text-xs font-light leading-[1.8] text-wem-text2">{r.comment}</p>
                    <p className="mt-2 font-dm text-[9px] text-wem-muted">{r.dateLabel}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t border-wem-border pt-4">
              <a
                href="#creators"
                className="inline-flex items-center justify-center border border-wem-accent2 bg-transparent px-4 py-2 font-dm text-[10px] text-wem-accent2 transition-opacity hover:opacity-90"
                style={{ borderRadius: 3, padding: '8px 16px' }}
              >
                나도 익명으로 평가하기 →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
