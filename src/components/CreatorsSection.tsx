import { useMemo, useState } from 'react'
import { FilterBar } from './FilterBar'
import { CreatorCard, type CreatorCardProps } from './CreatorCard'
import type { JobRole } from '../types/roles'

const CREATOR_SEED: CreatorCardProps[] = [
  {
    name: '김하늘',
    handle: '@skyframe',
    role: 'animator',
    bio: '2D 캐릭터 애니메이션 · 액션 연출 위주로 단편과 MV를 작업합니다.',
    creditCount: 12,
    isOpen: true,
  },
  {
    name: '이빛나',
    handle: '@lumen_art',
    role: 'visual',
    bio: '판타지 톤의 키비주얼과 배경 일러스트. 팀 톤에 맞춘 컬러 스터디 가능합니다.',
    creditCount: 28,
    isOpen: true,
  },
  {
    name: '박소리',
    handle: '@voicepark',
    role: 'voice',
    bio: '청년·중년 톤 내레이션, 캐릭터 보이스. 홈 스튜디오 녹음.',
    creditCount: 9,
    isOpen: false,
  },
  {
    name: '최웨이브',
    handle: '@wave_audio',
    role: 'sound',
    bio: '어쿠스틱·일렉트로닉 BGM, SFX 보조. 짧은 루프 샘플 제공 가능.',
    creditCount: 17,
    isOpen: true,
  },
  {
    name: '최편집 / Choi',
    handle: '@editmax',
    role: 'editor',
    bio: '단편 애니메이션 컷편집 + 색보정 전문. Premiere Pro + DaVinci Resolve 사용. 최종 렌더 납품 가능.',
    creditCount: 7,
    isOpen: true,
  },
  {
    name: '정서사',
    handle: '@script_j',
    role: 'writer',
    bio: '12분 단편 각본, 캐릭터 시트·대사 톤 정리. 협업 툴 노션 위주.',
    creditCount: 6,
    isOpen: true,
  },
]

export function CreatorsSection() {
  const [filter, setFilter] = useState<JobRole>('all')

  const creators = useMemo(() => {
    if (filter === 'all') return CREATOR_SEED
    return CREATOR_SEED.filter((c) => c.role === filter)
  }, [filter])

  return (
    <div id="creators" className="border-t border-wem-border">
      <div className="mx-auto max-w-fhd bg-wem-bg px-4 pt-10 md:pt-12">
        <h2 className="font-cormorant text-2xl font-semibold text-wem-text md:text-3xl">크리에이터</h2>
        <div
          className="h-0.5 w-8 rounded-[1px] bg-wem-gold"
          style={{ marginTop: 6 }}
          aria-hidden
        />
      </div>
      <FilterBar active={filter} onChange={setFilter} />
      <section className="bg-wem-border px-4 py-10 md:py-14">
        <div className="mx-auto grid max-w-fhd grid-cols-1 gap-px md:grid-cols-2">
          {creators.map((c) => (
            <CreatorCard key={c.handle} {...c} />
          ))}
        </div>
      </section>
    </div>
  )
}
