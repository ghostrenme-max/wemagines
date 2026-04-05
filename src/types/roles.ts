export type JobRole =
  | 'all'
  | 'animator'
  | 'illustrator'
  | 'voice'
  | 'bgm'
  | 'writer'

export const JOB_ROLE_LABELS: Record<Exclude<JobRole, 'all'>, string> = {
  animator: '애니메이터',
  illustrator: '일러스트',
  voice: '성우',
  bgm: 'BGM',
  writer: '스토리작가',
}
