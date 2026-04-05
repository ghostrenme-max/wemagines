export function ClipFeature() {
  return (
    <section className="border-b border-wem-border bg-wem-bg px-4 py-12 md:py-20">
      <div className="mx-auto grid max-w-fhd gap-10 md:grid-cols-2 md:items-center md:gap-14">
        <div className="animate-fadeUp">
          <p className="font-dm text-[10px] font-medium uppercase tracking-[0.2em] text-wem-accent">
            Clip
          </p>
          <h2 className="mt-3 font-cormorant text-3xl font-semibold leading-tight text-wem-text md:text-4xl">
            클립으로 / <span className="italic text-wem-accent">소통하기</span>
          </h2>
          <p className="mt-4 font-noto text-sm leading-relaxed text-wem-text2 md:text-base">
            타임라인에 코멘트를 남기고 구간을 공유해 피드백 루프를 짧게 유지하세요. 팀원 모두가 같은
            프레임을 바라보며 논의할 수 있습니다.
          </p>
        </div>

        <div
          className="rounded border border-wem-border bg-wem-surface p-4 shadow-lg animate-fadeUp md:p-5"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="overflow-hidden rounded border border-wem-border bg-wem-bg2">
            <div className="flex items-center justify-between border-b border-wem-border px-3 py-2">
              <span className="font-dm text-[10px] uppercase tracking-wider text-wem-text2">
                preview_clip_v2.mp4
              </span>
              <span className="h-2 w-2 rounded-full bg-wem-accent3 animate-pulse" aria-hidden />
            </div>
            <div className="aspect-video bg-gradient-to-br from-wem-border/40 to-wem-bg flex items-center justify-center">
              <span className="font-dm text-[9px] uppercase tracking-widest text-wem-muted">
                Video
              </span>
            </div>
            <div className="border-t border-wem-border px-3 py-3">
              <div className="flex h-8 items-end gap-0.5">
                {Array.from({ length: 24 }, (_, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-sm bg-wem-border"
                    style={{ height: `${20 + (i % 5) * 8}%` }}
                  />
                ))}
              </div>
              <div className="mt-2 h-1 rounded-full bg-wem-border">
                <div className="h-full w-1/3 rounded-full bg-wem-accent" />
              </div>
            </div>
          </div>
          <button
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded border border-wem-accent bg-wem-accent/10 py-2.5 font-noto text-sm font-medium text-wem-accent transition-colors hover:bg-wem-accent/20"
            style={{ borderRadius: 4 }}
          >
            <span className="font-dm text-xs uppercase tracking-wide">Share</span>
            <span aria-hidden>↗</span>
          </button>
        </div>
      </div>
    </section>
  )
}
