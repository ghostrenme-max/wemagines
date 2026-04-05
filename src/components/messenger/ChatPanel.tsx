import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from 'react'
import type { Message } from './types'
import type { VideoPanelHandle } from './VideoPanel'
import { formatTime } from './VideoPanel'

export interface ChatPanelProps {
  messages: Message[]
  onMessagesChange: Dispatch<SetStateAction<Message[]>>
  videoRef: RefObject<VideoPanelHandle | null>
  pendingClip: { start: number; end: number } | null
  onPendingClipChange: (clip: { start: number; end: number } | null) => void
  videoDuration: number
  onSeek: (ratio: number, autoplay: boolean) => void
}

function formatClipRange(start: number, end: number, duration: number) {
  return `${formatTime(start, duration)} — ${formatTime(end, duration)}`
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PlayMiniIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  )
}

export function ChatPanel({
  messages,
  onMessagesChange,
  videoRef,
  pendingClip,
  onPendingClipChange,
  videoDuration,
  onSeek,
}: ChatPanelProps) {
  const [text, setText] = useState('')
  const listRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const taRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages.length, scrollToBottom])

  const resizeTa = useCallback(() => {
    const el = taRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(80, el.scrollHeight)}px`
  }, [])

  useEffect(() => {
    resizeTa()
  }, [text, resizeTa])

  const sendMessage = useCallback(() => {
    const trimmed = text.trim()
    if (!trimmed && !pendingClip) return

    const clip =
      pendingClip != null
        ? { start: pendingClip.start, end: pendingClip.end, duration: videoDuration }
        : undefined

    const now = new Date()
    const timeStr = now.toLocaleTimeString('ko-KR', { hour: 'numeric', minute: '2-digit', hour12: true })

    const msg: Message = {
      id: `m-${Date.now()}`,
      author: '나',
      authorColor: '#34d399',
      time: timeStr,
      text: trimmed || (clip ? '클립을 첨부했습니다.' : ''),
      clip,
    }

    onMessagesChange((prev) => [...prev, msg])
    setText('')
    onPendingClipChange(null)
    requestAnimationFrame(scrollToBottom)
  }, [text, pendingClip, videoDuration, onMessagesChange, onPendingClipChange, scrollToBottom])

  const onTaKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === '[') {
        e.preventDefault()
        videoRef.current?.startClip()
        return
      }
      if (e.key === ']') {
        e.preventDefault()
        videoRef.current?.endClip()
        return
      }
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        sendMessage()
      }
    },
    [videoRef, sendMessage],
  )

  return (
    <div className="flex h-full min-h-0 w-full flex-col border-wem-border bg-wem-bg md:w-[360px] md:shrink-0 md:border-l">
      <header className="shrink-0 border-b border-wem-border px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="truncate font-noto text-sm font-medium text-wem-text">별을 삼킨 고양이</h1>
            <p className="mt-0.5 font-dm text-[9px] text-wem-muted">
              스토리 · 작화 · 애니 · 성우 · 사운드 · 편집
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-wem-accent3 animate-pulse"
              aria-hidden
            />
            <span className="font-dm text-[9px] text-wem-accent3">4명 접속 중</span>
          </div>
        </div>
      </header>

      <div
        ref={listRef}
        className="messenger-scrollbar flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-4 py-3"
        style={{ gap: 10 }}
      >
        {messages.map((m) => (
          <article
            key={m.id}
            className="animate-msgIn"
            style={{ animationFillMode: 'both' }}
          >
            <div className="mb-1 flex flex-wrap items-baseline gap-2">
              <span className="font-noto text-xs font-medium" style={{ color: m.authorColor }}>
                {m.author}
              </span>
              <span className="font-dm text-[9px] text-wem-muted">{m.time}</span>
            </div>
            <div
              className="rounded border border-wem-border bg-wem-surface px-3 py-2.5"
              style={{ borderRadius: 4, padding: '10px 12px' }}
            >
              {m.clip && (
                <button
                  type="button"
                  className="mb-2 flex w-full items-center justify-between gap-2 rounded border px-2.5 py-1.5 text-left transition-opacity hover:opacity-90"
                  style={{
                    borderRadius: 4,
                    background: 'rgba(251,191,36,0.1)',
                    borderColor: 'rgba(251,191,36,0.35)',
                  }}
                  onClick={() => onSeek(m.clip!.start, true)}
                >
                  <span className="flex items-center gap-2 text-wem-gold">
                    <PlayMiniIcon />
                    <span className="font-dm text-[10px]">
                      {formatClipRange(m.clip.start, m.clip.end, m.clip.duration)}
                    </span>
                  </span>
                  <span className="shrink-0 font-dm text-[9px] text-wem-muted">▶ 재생</span>
                </button>
              )}
              <p className="whitespace-pre-wrap font-noto text-xs font-light leading-[1.7] text-wem-text2">
                {m.text}
              </p>
            </div>
          </article>
        ))}
        <div ref={endRef} aria-hidden />
      </div>

      <div className="shrink-0 border-t border-wem-border px-4 py-3">
        {pendingClip && (
          <div
            className="mb-2 flex items-center justify-between gap-2 rounded border px-2.5 py-1.5"
            style={{
              borderRadius: 4,
              background: 'rgba(251,191,36,0.08)',
              borderColor: 'rgba(251,191,36,0.3)',
              padding: '6px 10px',
            }}
          >
            <span className="font-dm text-[10px] text-wem-gold">
              클립: {formatClipRange(pendingClip.start, pendingClip.end, videoDuration)}
            </span>
            <button
              type="button"
              className="font-dm text-sm leading-none text-wem-muted hover:text-wem-text"
              aria-label="클립 취소"
              onClick={() => onPendingClipChange(null)}
            >
              ×
            </button>
          </div>
        )}

        <div className="flex items-end gap-2">
          <textarea
            ref={taRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onTaKeyDown}
            rows={1}
            placeholder="메시지 입력... [ 키로 구간 시작"
            className="min-h-[40px] max-h-[80px] min-w-0 flex-1 resize-none rounded border border-wem-border bg-wem-surface px-3 py-2 font-noto text-sm text-wem-text placeholder:text-wem-muted focus:outline-none focus:ring-1 focus:ring-wem-accent"
            style={{ borderRadius: 4 }}
          />
          <button
            type="button"
            onClick={sendMessage}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-wem-accent transition-opacity hover:opacity-90"
            style={{ borderRadius: 4 }}
            aria-label="메시지 전송"
          >
            <SendIcon />
          </button>
        </div>

        <p className="mt-2 font-dm text-[9px] text-wem-muted">
          <kbd className="rounded border border-wem-border px-0.5">[</kbd> 구간시작 ·{' '}
          <kbd className="rounded border border-wem-border px-0.5">]</kbd> 구간끝·첨부 · Enter 전송
        </p>
      </div>
    </div>
  )
}
