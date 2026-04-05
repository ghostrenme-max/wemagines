import { useCallback, useMemo, useRef, useState } from 'react'
import { Nav } from '../components/Nav'
import { ChatPanel } from '../components/messenger/ChatPanel'
import type { Message, TimelineBookmark } from '../components/messenger/types'
import { VideoPanel, type VideoPanelHandle } from '../components/messenger/VideoPanel'

const VIDEO_DURATION = 332

/** 채팅·북마크에 쓰는 로컬 사용자 표시 이름 */
const MESSENGER_SELF_AUTHOR = '나'

const MESSENGER_INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    author: '정서',
    authorColor: '#fb923c',
    time: '오후 2:14',
    text: '이 구간 배경 톤이 너무 밝은 것 같아요. 좀 더 어둡게 가면 어떨까요?',
    clip: { start: 0.15, end: 0.23, duration: VIDEO_DURATION },
  },
  {
    id: '2',
    author: '미래',
    authorColor: '#f87171',
    time: '오후 2:18',
    text: '맞아요, 배경이 캐릭터랑 분리가 잘 안되는 느낌이에요. 수정해볼게요!',
  },
  {
    id: '3',
    author: '유진',
    authorColor: '#a78bfa',
    time: '오후 2:31',
    text: '여기 사운드가 갑자기 끊기는데 크로스페이드 처리할게요.',
    clip: { start: 0.55, end: 0.61, duration: VIDEO_DURATION },
  },
]

const INITIAL_BOOKMARKS: TimelineBookmark[] = [
  { id: 'bk-seed-1', at: 0.18, author: '정서', authorColor: '#fb923c' },
  { id: 'bk-seed-1b', at: 0.182, author: '미래', authorColor: '#f87171' },
  { id: 'bk-seed-2', at: 0.56, author: '유진', authorColor: '#a78bfa' },
]

export default function Messenger() {
  const videoRef = useRef<VideoPanelHandle>(null)
  const [messages, setMessages] = useState<Message[]>(MESSENGER_INITIAL_MESSAGES)
  const [bookmarks, setBookmarks] = useState<TimelineBookmark[]>(INITIAL_BOOKMARKS)
  const [pendingClip, setPendingClip] = useState<{ start: number; end: number } | null>(null)

  const clipMarkers = useMemo(
    () =>
      messages
        .filter((m): m is Message & { clip: NonNullable<Message['clip']> } => Boolean(m.clip))
        .map((m) => ({ start: m.clip.start, end: m.clip.end })),
    [messages],
  )

  const onClipReady = useCallback((start: number, end: number) => {
    setPendingClip({ start, end })
  }, [])

  const onSeek = useCallback((ratio: number, autoplay: boolean) => {
    videoRef.current?.seek(ratio, autoplay)
  }, [])

  const onAddBookmark = useCallback((at: number) => {
    const r = Math.max(0, Math.min(1, at))
    setBookmarks((prev) => [
      ...prev,
      {
        id: `bk-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        at: r,
        author: MESSENGER_SELF_AUTHOR,
        authorColor: '#34d399',
      },
    ])
  }, [])

  const onRemoveBookmark = useCallback((id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id))
  }, [])

  return (
    <div className="flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden bg-wem-bg">
      <Nav />
      <div className="flex min-h-0 flex-1 flex-col pt-14 md:flex-row">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <VideoPanel
            ref={videoRef}
            clipMarkers={clipMarkers}
            bookmarks={bookmarks}
            onAddBookmark={onAddBookmark}
            bookmarkCurrentUserAuthor={MESSENGER_SELF_AUTHOR}
            onRemoveBookmark={onRemoveBookmark}
            onClipReady={onClipReady}
            duration={VIDEO_DURATION}
          />
        </div>
        <div className="flex max-h-[42vh] min-h-[240px] w-full shrink-0 flex-col border-t border-wem-border md:max-h-none md:min-h-0 md:w-auto md:border-l md:border-t-0">
          <ChatPanel
            messages={messages}
            onMessagesChange={setMessages}
            videoRef={videoRef}
            pendingClip={pendingClip}
            onPendingClipChange={setPendingClip}
            videoDuration={VIDEO_DURATION}
            onSeek={onSeek}
          />
        </div>
      </div>
    </div>
  )
}
