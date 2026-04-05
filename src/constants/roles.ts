export const ROLES = [
  {
    id: 'writer',
    label: '스토리 작가',
    labelEn: 'Story Writer',
    color: '#c4a87a',
    bgColor: 'rgba(196,168,122,0.08)',
    borderColor: 'rgba(196,168,122,0.4)',
  },
  {
    id: 'visual',
    label: '작화',
    labelEn: 'Visual Artist',
    color: '#fb923c',
    bgColor: 'rgba(251,146,60,0.08)',
    borderColor: 'rgba(251,146,60,0.4)',
  },
  {
    id: 'animator',
    label: '애니메이터',
    labelEn: 'Animator',
    color: '#f87171',
    bgColor: 'rgba(248,113,113,0.08)',
    borderColor: 'rgba(248,113,113,0.4)',
  },
  {
    id: 'voice',
    label: '성우',
    labelEn: 'Voice Actor',
    color: '#34d399',
    bgColor: 'rgba(52,211,153,0.08)',
    borderColor: 'rgba(52,211,153,0.4)',
  },
  {
    id: 'sound',
    label: '사운드 엔지니어',
    labelEn: 'Sound Engineer',
    color: '#a78bfa',
    bgColor: 'rgba(167,139,250,0.08)',
    borderColor: 'rgba(167,139,250,0.4)',
  },
  {
    id: 'editor',
    label: '편집자',
    labelEn: 'Video Editor',
    color: '#38bdf8',
    bgColor: 'rgba(56,189,248,0.08)',
    borderColor: 'rgba(56,189,248,0.4)',
  },
] as const

export type RoleId = (typeof ROLES)[number]['id']

export type RoleDef = (typeof ROLES)[number]

export function getRoleById(id: RoleId): RoleDef {
  const r = ROLES.find((x) => x.id === id)
  if (!r) throw new Error(`Unknown role: ${id}`)
  return r
}
