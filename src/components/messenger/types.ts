export interface MessageClip {
  start: number
  end: number
  duration: number
}

export interface Message {
  id: string
  author: string
  authorColor: string
  time: string
  text: string
  clip?: MessageClip
}

export interface VideoState {
  progress: number
  playing: boolean
  clipStart: number | null
  clipEnd: number | null
  duration: number
}

/** 타임라인 북마크 (0~1 비율 위치, 팀원별 다중 가능) */
export interface TimelineBookmark {
  id: string
  at: number
  author: string
  authorColor: string
}
