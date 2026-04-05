import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { HomeScrollState } from '../components/Nav'
import { RecruitBoard, type RecruitItem } from '../components/RecruitBoard'
import { Nav } from '../components/Nav'
import { Hero } from '../components/Hero'
import { CreatorsSection } from '../components/CreatorsSection'
import { ShowcaseGallery } from '../components/ShowcaseGallery'
import { AuditionBoard } from '../components/AuditionBoard'
import { Footer } from '../components/Footer'

const RECRUIT_SEED: RecruitItem[] = [
  {
    id: '1',
    title: '단편 애니 「별자리 편지」 팀원 모집',
    author: '모아필름',
    roles: ['animator', 'voice', 'sound'],
    date: '2026.06.02',
    slotsTotal: 5,
    slotsFilled: 3,
  },
  {
    id: '2',
    title: 'MV 프로젝트 — 네온 시티 배경 일러스트',
    author: 'NEONLAB',
    roles: ['visual'],
    date: '2026.05.18',
    slotsTotal: 4,
    slotsFilled: 4,
  },
  {
    id: '3',
    title: '웹툰 영상화 파일럿 — 시나리오·보이스',
    author: 'PageTurn',
    roles: ['writer', 'voice'],
    date: '2026.04.28',
    slotsTotal: 6,
    slotsFilled: 2,
  },
  {
    id: '4',
    title: '판타지 단편 최종 편집자 모집 — 컷편집 + 색보정',
    author: '@mirae_frames',
    roles: ['editor'],
    date: '3일 전',
    slotsTotal: 1,
    slotsFilled: 0,
  },
]

/**
 * 홈 화면 섹션 (위→아래)
 * Hero → CreatorsSection → RecruitBoard → ShowcaseGallery → AuditionBoard → Footer
 */
export default function Home() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const scrollTo = (location.state as HomeScrollState | null)?.scrollTo
    if (!scrollTo) return
    const id = scrollTo
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    })
    navigate('/', { replace: true, state: {} })
  }, [location.state, navigate])

  return (
    <div className="min-h-svh bg-wem-bg">
      <Nav />
      <main>
        <Hero />
        <CreatorsSection />
        <RecruitBoard items={RECRUIT_SEED} />
        <ShowcaseGallery />
        <AuditionBoard />
      </main>
      <Footer />
    </div>
  )
}
