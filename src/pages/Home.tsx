import { useMemo, useState } from 'react'
import { Nav } from '../components/Nav'
import { Hero } from '../components/Hero'
import { FilterBar } from '../components/FilterBar'
import { CreatorCard, type CreatorCardProps } from '../components/CreatorCard'
import { RecruitBoard, type RecruitItem } from '../components/RecruitBoard'
import { ClipFeature } from '../components/ClipFeature'
import { Footer } from '../components/Footer'
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
    role: 'illustrator',
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
    role: 'bgm',
    bio: '어쿠스틱·일렉트로닉 BGM, SFX 보조. 짧은 루프 샘플 제공 가능.',
    creditCount: 17,
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

const RECRUIT_SEED: RecruitItem[] = [
  {
    id: '1',
    title: '단편 애니 「별자리 편지」 팀원 모집',
    author: '모아필름',
    roles: ['animator', 'voice', 'bgm'],
    date: '2025.11.02',
    slotsTotal: 5,
    slotsFilled: 3,
  },
  {
    id: '2',
    title: 'MV 프로젝트 — 네온 시티 배경 일러스트',
    author: 'NEONLAB',
    roles: ['illustrator'],
    date: '2025.10.28',
    slotsTotal: 4,
    slotsFilled: 4,
  },
  {
    id: '3',
    title: '웹툰 영상화 파일럿 — 시나리오·보이스',
    author: 'PageTurn',
    roles: ['writer', 'voice'],
    date: '2025.10.21',
    slotsTotal: 6,
    slotsFilled: 2,
  },
]

export default function Home() {
  const [filter, setFilter] = useState<JobRole>('all')

  const creators = useMemo(() => {
    if (filter === 'all') return CREATOR_SEED
    return CREATOR_SEED.filter((c) => c.role === filter)
  }, [filter])

  return (
    <div className="min-h-svh bg-wem-bg">
      <Nav />
      <main>
        <Hero />
        <div id="creators">
          <FilterBar active={filter} onChange={setFilter} />
          <section className="bg-wem-border px-4 py-10 md:py-14">
            <div className="mx-auto grid max-w-fhd grid-cols-1 gap-px md:grid-cols-2">
              {creators.map((c) => (
                <CreatorCard key={c.handle} {...c} />
              ))}
            </div>
          </section>
        </div>
        <RecruitBoard items={RECRUIT_SEED} />
        <ClipFeature />
      </main>
      <Footer />
    </div>
  )
}
