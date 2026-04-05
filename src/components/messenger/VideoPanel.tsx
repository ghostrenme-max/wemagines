import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { TimelineBookmark, VideoState } from './types'

export interface VideoPanelHandle {
  startClip: () => void
  endClip: () => void
  togglePlay: () => void
  /** autoplay true면 재생 시작 */
  seek: (ratio: number, autoplay?: boolean) => void
}

export interface ClipMarker {
  start: number
  end: number
}

export interface VideoPanelProps {
  fileName?: string
  clipMarkers: ClipMarker[]
  bookmarks: TimelineBookmark[]
  onAddBookmark?: (at: number) => void
  /** 이 이름과 같은 작성자의 북마크는 클릭 시 제거됨 */
  bookmarkCurrentUserAuthor?: string
  onRemoveBookmark?: (id: string) => void
  onClipReady: (start: number, end: number) => void
  duration?: number
}

/** ratio 0~1, duration 초 → MM:SS */
export function formatTime(ratio: number, duration: number): string {
  const sec = Math.max(0, Math.min(duration, ratio * duration))
  const whole = Math.floor(sec)
  const m = Math.floor(whole / 60)
  const s = whole % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function isTypingTarget(el: EventTarget | null): boolean {
  if (!el || !(el instanceof HTMLElement)) return false
  const tag = el.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
  return el.isContentEditable
}

function bookmarkStackIndices(bookmarks: TimelineBookmark[]): Map<string, number> {
  const sorted = [...bookmarks].sort((a, b) => a.at - b.at || a.id.localeCompare(b.id))
  const map = new Map<string, number>()
  let prev = -Infinity
  let stack = 0
  for (const b of sorted) {
    if (b.at - prev < 0.01) stack += 1
    else stack = 0
    prev = b.at
    map.set(b.id, stack)
  }
  return map
}

export const VideoPanel = forwardRef<VideoPanelHandle, VideoPanelProps>(function VideoPanel(
  {
    fileName = 'preview_clip_v2.mp4',
    clipMarkers,
    bookmarks,
    onAddBookmark,
    bookmarkCurrentUserAuthor,
    onRemoveBookmark,
    onClipReady,
    duration: durationProp = 332,
  },
  ref,
) {
  const [state, setState] = useState<VideoState>({
    progress: 0,
    playing: false,
    clipStart: null,
    clipEnd: null,
    duration: durationProp,
  })

  useEffect(() => {
    setState((s) => (s.duration === durationProp ? s : { ...s, duration: durationProp }))
  }, [durationProp])

  const { progress, playing, clipStart, duration } = state
  const barRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const clipFlashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [clipFlash, setClipFlash] = useState<{ start: number; end: number } | null>(null)
  const [timelineHot, setTimelineHot] = useState(false)
  const [scrubbing, setScrubbing] = useState(false)
  const [bookmarkTipId, setBookmarkTipId] = useState<string | null>(null)
  const progressRef = useRef(progress)
  const timelineHotRef = useRef(timelineHot)

  progressRef.current = progress
  timelineHotRef.current = timelineHot

  const bookmarkStacks = useMemo(() => bookmarkStackIndices(bookmarks), [bookmarks])

  const applySeek = useCallback((ratio: number, autoplay?: boolean) => {
    const r = Math.max(0, Math.min(1, ratio))
    setState((s) => ({
      ...s,
      progress: r,
      playing: autoplay === true ? true : s.playing,
    }))
    const v = videoRef.current
    if (v && v.duration && !Number.isNaN(v.duration)) {
      v.currentTime = r * v.duration
    }
  }, [])

  const togglePlay = useCallback(() => {
    setState((s) => ({ ...s, playing: !s.playing }))
  }, [])

  const startClip = useCallback(() => {
    setState((s) => ({
      ...s,
      clipStart: s.progress,
      clipEnd: null,
    }))
  }, [])

  const endClip = useCallback(() => {
    setState((s) => {
      if (s.clipStart == null) return s
      const end = s.progress
      const a = Math.min(s.clipStart, end)
      const b = Math.max(s.clipStart, end)
      requestAnimationFrame(() => {
        onClipReady(a, b)
        setClipFlash({ start: a, end: b })
        if (clipFlashTimerRef.current) window.clearTimeout(clipFlashTimerRef.current)
        clipFlashTimerRef.current = window.setTimeout(() => {
          setClipFlash(null)
          clipFlashTimerRef.current = null
        }, 1400)
      })
      return { ...s, clipStart: null, clipEnd: null }
    })
  }, [onClipReady])

  useEffect(() => {
    return () => {
      if (clipFlashTimerRef.current) window.clearTimeout(clipFlashTimerRef.current)
    }
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      startClip,
      endClip,
      togglePlay,
      seek: applySeek,
    }),
    [startClip, endClip, togglePlay, applySeek],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(document.activeElement)) return
      if (e.key === '[') {
        e.preventDefault()
        startClip()
      } else if (e.key === ']') {
        e.preventDefault()
        endClip()
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault()
        togglePlay()
      } else if ((e.key === 'k' || e.key === 'K') && timelineHotRef.current && onAddBookmark) {
        e.preventDefault()
        onAddBookmark(progressRef.current)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [startClip, endClip, togglePlay, onAddBookmark])

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      setState((s) => {
        const next = s.progress + 0.05 / s.duration
        if (next >= 1) return { ...s, progress: 1, playing: false }
        return { ...s, progress: next }
      })
    }, 50)
    return () => clearInterval(id)
  }, [playing])

  const onBarMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const bar = barRef.current
      if (!bar) return
      const rect = bar.getBoundingClientRect()
      const apply = (clientX: number) => {
        const ratio = (clientX - rect.left) / rect.width
        applySeek(Math.max(0, Math.min(1, ratio)))
      }
      apply(e.clientX)
      setScrubbing(true)
      const move = (ev: MouseEvent) => apply(ev.clientX)
      const up = () => {
        setScrubbing(false)
        window.removeEventListener('mousemove', move)
        window.removeEventListener('mouseup', up)
      }
      window.addEventListener('mousemove', move)
      window.addEventListener('mouseup', up)
    },
    [applySeek],
  )

  const selectionLeft = clipStart != null ? Math.min(clipStart, progress) : null
  const selectionRight = clipStart != null ? Math.max(clipStart, progress) : null

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-[#060610]">
      <div className="relative min-h-0 flex-1">
        <span className="absolute left-3 top-3 z-10 font-dm text-[11px] text-wem-muted">{fileName}</span>

        <div className="absolute right-3 top-3 z-10 min-h-[1.25rem] text-right">
          {clipStart != null && (
            <span className="flex items-center justify-end gap-1 font-dm text-[11px] text-wem-coral">
              <span className="inline-block animate-recBlink" aria-hidden>
                ●
              </span>
              REC {formatTime(clipStart, duration)}
            </span>
          )}
          {clipFlash && (
            <span className="font-dm text-[11px] text-wem-gold">
              {formatTime(clipFlash.start, duration)} — {formatTime(clipFlash.end, duration)}
            </span>
          )}
        </div>

        <div className="relative flex h-full min-h-[200px] items-center justify-center p-4 md:min-h-[280px]">
          <video
            ref={videoRef}
            className="relative z-0 max-h-full max-w-full rounded border border-wem-border/40 bg-black/40 object-contain opacity-90"
            playsInline
            muted
            aria-label="협업 영상 (데모)"
          />
          <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center p-8">
            <div className="rounded border border-wem-border2/60 bg-wem-bg/80 px-6 py-4 text-center backdrop-blur-sm">
              <p className="font-dm text-[10px] uppercase tracking-widest text-wem-muted">No source</p>
              <p className="mt-2 font-noto text-xs text-wem-text2">데모 타임라인 · 커스텀 재생</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="shrink-0 border-t border-wem-border px-4 py-2.5"
        style={{ background: '#11112a' }}
      >
        <div className="flex items-center justify-end font-dm text-[11px]">
          <span className="text-wem-muted">전체 {formatTime(1, duration)}</span>
        </div>

        <div
          className="relative mt-2 rounded outline-none ring-wem-accent/30 focus-within:ring-1"
          style={{ borderRadius: 4 }}
          onMouseEnter={() => setTimelineHot(true)}
          onMouseLeave={() => setTimelineHot(false)}
          onFocusCapture={() => setTimelineHot(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setTimelineHot(false)
          }}
        >
          {bookmarks.length > 0 && (
            <div className="relative mb-1 min-h-[18px] w-full">
              {bookmarks.map((b) => {
                const stack = bookmarkStacks.get(b.id) ?? 0
                const isMine =
                  Boolean(onRemoveBookmark && bookmarkCurrentUserAuthor && b.author === bookmarkCurrentUserAuthor)
                return (
                  <div
                    key={b.id}
                    className="pointer-events-auto absolute bottom-0 z-[2]"
                    style={{
                      left: `${b.at * 100}%`,
                      transform: `translateX(calc(-50% + ${stack * 10}px))`,
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    {bookmarkTipId === b.id && (
                      <div
                        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1 w-max max-w-[200px] -translate-x-1/2 rounded border border-wem-border2 bg-wem-bg2 px-2 py-1 shadow-lg"
                        style={{ borderRadius: 4 }}
                        role="tooltip"
                      >
                        <p className="font-noto text-[11px] font-medium" style={{ color: b.authorColor }}>
                          {b.author}
                        </p>
                        <p className="font-dm text-[9px] text-wem-muted">{formatTime(b.at, duration)}</p>
                        {isMine && (
                          <p className="mt-0.5 font-dm text-[8px] text-wem-accent3">클릭하면 제거</p>
                        )}
                      </div>
                    )}
                    <button
                      type="button"
                      aria-label={
                        isMine
                          ? `내 북마크 ${formatTime(b.at, duration)} — 클릭하여 제거`
                          : `북마크 ${formatTime(b.at, duration)}, ${b.author}`
                      }
                      className={`flex items-end justify-center px-0.5 pb-px ${isMine ? 'cursor-pointer' : ''}`}
                      onMouseEnter={() => setBookmarkTipId(b.id)}
                      onMouseLeave={() => setBookmarkTipId(null)}
                      onFocus={() => setBookmarkTipId(b.id)}
                      onBlur={() => setBookmarkTipId(null)}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (isMine && onRemoveBookmark) {
                          onRemoveBookmark(b.id)
                          setBookmarkTipId(null)
                        } else {
                          applySeek(b.at, true)
                        }
                      }}
                    >
                      <svg
                        width={11}
                        height={14}
                        viewBox="0 0 11 14"
                        fill="none"
                        className="shrink-0 drop-shadow-[0_0_6px_rgba(56,189,248,0.5)]"
                        aria-hidden
                      >
                        <path
                          d="M2 1h7v12L5.5 9.5 2 13V1Z"
                          stroke={b.authorColor}
                          strokeWidth={1.2}
                          strokeLinejoin="round"
                          fill={`${b.authorColor}22`}
                        />
                      </svg>
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          <div
            ref={barRef}
            role="slider"
            tabIndex={0}
            aria-valuenow={Math.round(progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="재생 타임라인. 마우스를 올린 뒤 K로 북마크"
            className="relative h-9 cursor-pointer rounded border border-wem-border bg-wem-surface"
            style={{ borderRadius: 4 }}
            onMouseDown={onBarMouseDown}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') {
                e.preventDefault()
                applySeek(progress - 0.02)
              } else if (e.key === 'ArrowRight') {
                e.preventDefault()
                applySeek(progress + 0.02)
              }
            }}
          >
            <div
              className={`pointer-events-none absolute left-2 top-1/2 z-[4] min-w-[3.1rem] -translate-y-1/2 rounded px-1.5 py-0.5 font-dm text-[10px] tabular-nums leading-none ${
                scrubbing ? 'text-wem-accent' : 'text-wem-text'
              }`}
              style={{
                background: scrubbing ? 'rgba(0,0,0,0.78)' : 'rgba(0,0,0,0.55)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.06)',
              }}
              aria-live="polite"
              aria-atomic="true"
            >
              {formatTime(progress, duration)}
            </div>

            <div
              className="pointer-events-none absolute inset-y-0 left-0 rounded-sm"
              style={{
                width: `${progress * 100}%`,
                background: 'linear-gradient(90deg, rgba(167,139,250,0.25), rgba(167,139,250,0.1))',
              }}
            />

            {clipMarkers.map((c, i) => (
              <button
                key={`${c.start}-${c.end}-${i}`}
                type="button"
                className="pointer-events-auto absolute inset-y-0 z-[1] border border-wem-gold bg-wem-gold/15 hover:bg-wem-gold/25"
                style={{
                  left: `${c.start * 100}%`,
                  width: `${(c.end - c.start) * 100}%`,
                  borderRadius: 2,
                }}
                title={`클립 ${formatTime(c.start, duration)} — ${formatTime(c.end, duration)}`}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation()
                  applySeek(c.start, true)
                }}
              />
            ))}

            {selectionLeft != null && selectionRight != null && (
              <div
                className="pointer-events-none absolute inset-y-0 z-[2] border-2 border-wem-gold bg-wem-gold/20"
                style={{
                  left: `${selectionLeft * 100}%`,
                  width: `${(selectionRight - selectionLeft) * 100}%`,
                  borderRadius: 2,
                }}
              />
            )}

            <div
              className="pointer-events-none absolute bottom-0 top-0 z-[3] w-0.5 bg-wem-accent"
              style={{
                left: `${progress * 100}%`,
                transform: 'translateX(-50%)',
                boxShadow: '0 0 10px rgba(167,139,250,0.85)',
              }}
            />
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="font-dm text-[10px] text-wem-muted">
            <kbd className="rounded border border-wem-border px-1">[</kbd> 시작점{' '}
            <kbd className="rounded border border-wem-border px-1">]</kbd> 끝점 · 타임라인에 포인터를 올리고{' '}
            <kbd className="rounded border border-wem-border px-1">K</kbd> 북마크
          </p>
          <button
            type="button"
            onClick={togglePlay}
            className="rounded bg-wem-accent px-3 py-1.5 font-dm text-[11px] font-medium text-wem-bg transition-opacity hover:opacity-90"
            style={{ borderRadius: 3 }}
          >
            {playing ? '일시정지' : '재생'}
          </button>
        </div>
      </div>
    </div>
  )
})

VideoPanel.displayName = 'VideoPanel'
