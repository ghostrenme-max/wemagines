import { useEffect, useRef, useState, type ReactNode } from 'react'

/** 씬당 체류: 애니메이션 완료 후 여유 ~4초 (기존 2.5s + 4s) */
const INNER_SCENE_MS = 6500
const INNER_COUNT = 6

export interface InnerScene {
  id: number
  label: string
  labelColor: string
  title: ReactNode
  svgComponent: ReactNode
}

function useTriggerDraws(isActive: boolean) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!isActive) return
    const svg = svgRef.current
    if (!svg) return
    const draws = svg.querySelectorAll<SVGElement>('.draw')
    draws.forEach((el) => el.classList.remove('go'))
    void svg.getBoundingClientRect()
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        draws.forEach((el) => el.classList.add('go'))
      })
    })
  }, [isActive])

  return svgRef
}

const svgCommon = {
  viewBox: '0 0 560 220',
  width: '100%' as const,
  height: 'auto',
  fill: 'none' as const,
  className: 'max-h-[min(40vh,220px)] w-full',
}

function Scene1Writer({ isActive }: { isActive: boolean }) {
  const ref = useTriggerDraws(isActive)
  return (
    <svg ref={ref} {...svgCommon} aria-hidden>
      <path
        className="draw"
        d="M60 160 H500 V175 H60 Z"
        stroke="#2a2a4a"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 900, ['--dur' as string]: '0.8s', ['--delay' as string]: '0s' }}
      />
      <path
        className="draw"
        d="M160 60 H380 V155 H160 Z"
        stroke="#c4a87a"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 700, ['--dur' as string]: '0.9s', ['--delay' as string]: '0.7s' }}
      />
      <path
        className="draw"
        d="M178 85 H362"
        stroke="#c4a87a"
        strokeOpacity={0.5}
        strokeWidth={1.2}
        style={{ ['--len' as string]: 200, ['--dur' as string]: '0.4s', ['--delay' as string]: '1.5s' }}
      />
      <path
        className="draw"
        d="M178 100 H362"
        stroke="#c4a87a"
        strokeOpacity={0.5}
        strokeWidth={1.2}
        style={{ ['--len' as string]: 200, ['--dur' as string]: '0.4s', ['--delay' as string]: '1.7s' }}
      />
      <path
        className="draw"
        d="M178 115 H362"
        stroke="#c4a87a"
        strokeOpacity={0.5}
        strokeWidth={1.2}
        style={{ ['--len' as string]: 200, ['--dur' as string]: '0.4s', ['--delay' as string]: '1.9s' }}
      />
      <path
        className="draw"
        d="M178 130 H362"
        stroke="#c4a87a"
        strokeOpacity={0.5}
        strokeWidth={1.2}
        style={{ ['--len' as string]: 200, ['--dur' as string]: '0.4s', ['--delay' as string]: '2.1s' }}
      />
      <path
        className="draw"
        d="M370 75 L395 50 L402 57 L377 82 Z"
        stroke="#c4a87a"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 150, ['--dur' as string]: '0.5s', ['--delay' as string]: '2.3s' }}
      />
      <line
        className="draw"
        x1={395}
        y1={50}
        x2={405}
        y2={40}
        stroke="#c4a87a"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 20, ['--dur' as string]: '0.2s', ['--delay' as string]: '2.7s' }}
      />
      <path
        className="draw"
        d="M420 120 H460 V150 Q440 158 420 150 Z"
        stroke="#5c5880"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 200, ['--dur' as string]: '0.5s', ['--delay' as string]: '2.5s' }}
      />
      <path
        className="draw"
        d="M460 130 Q475 130 475 140 Q475 150 460 150"
        stroke="#5c5880"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 80, ['--dur' as string]: '0.3s', ['--delay' as string]: '2.9s' }}
      />
      <path
        className="draw"
        d="M430 108 Q432 100 434 108"
        stroke="#5c5880"
        strokeWidth={1}
        strokeDasharray="3 3"
        style={{ ['--len' as string]: 40, ['--dur' as string]: '0.25s', ['--delay' as string]: '3.1s' }}
      />
      <path
        className="draw"
        d="M438 104 Q440 96 442 104"
        stroke="#5c5880"
        strokeWidth={1}
        strokeDasharray="3 3"
        style={{ ['--len' as string]: 40, ['--dur' as string]: '0.25s', ['--delay' as string]: '3.2s' }}
      />
    </svg>
  )
}

function Scene2Illustrator({ isActive }: { isActive: boolean }) {
  const ref = useTriggerDraws(isActive)
  return (
    <svg ref={ref} {...svgCommon} aria-hidden>
      <path
        className="draw"
        d="M100 40 H440 Q450 40 450 50 V170 Q450 180 440 180 H100 Q90 180 90 170 V50 Q90 40 100 40 Z"
        stroke="#fb923c"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 900, ['--dur' as string]: '1s', ['--delay' as string]: '0s' }}
      />
      <rect
        className="draw"
        x={110}
        y={55}
        width={290}
        height={115}
        rx={2}
        stroke="#fb923c"
        strokeOpacity={0.5}
        strokeWidth={1.5}
        style={{ ['--len' as string]: 820, ['--dur' as string]: '0.7s', ['--delay' as string]: '0.9s' }}
      />
      <circle
        className="draw"
        cx={220}
        cy={105}
        r={38}
        stroke="#fb923c"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 240, ['--dur' as string]: '0.8s', ['--delay' as string]: '1.5s' }}
      />
      <path
        className="draw"
        d="M205 98 Q210 94 215 98"
        stroke="#fb923c"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 30, ['--dur' as string]: '0.3s', ['--delay' as string]: '2.2s' }}
      />
      <path
        className="draw"
        d="M225 98 Q230 94 235 98"
        stroke="#fb923c"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 30, ['--dur' as string]: '0.3s', ['--delay' as string]: '2.4s' }}
      />
      <path
        className="draw"
        d="M218 105 Q220 112 222 105"
        stroke="#fb923c"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 20, ['--dur' as string]: '0.2s', ['--delay' as string]: '2.6s' }}
      />
      <path
        className="draw"
        d="M210 116 Q220 124 230 116"
        stroke="#fb923c"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 40, ['--dur' as string]: '0.3s', ['--delay' as string]: '2.8s' }}
      />
      <path
        className="draw"
        d="M182 100 Q185 68 220 67 Q255 68 258 100"
        stroke="#fb923c"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 120, ['--dur' as string]: '0.5s', ['--delay' as string]: '3s' }}
      />
      <path
        className="draw"
        d="M440 55 L470 25 L478 33 L448 63 Z"
        stroke="#5c5880"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 120, ['--dur' as string]: '0.4s', ['--delay' as string]: '1.2s' }}
      />
      <rect
        className="draw"
        x={315}
        y={60}
        width={75}
        height={100}
        stroke="#5c5880"
        strokeOpacity={0.5}
        strokeWidth={1.2}
        style={{ ['--len' as string]: 350, ['--dur' as string]: '0.5s', ['--delay' as string]: '1.4s' }}
      />
      <path
        className="draw"
        d="M325 78 H380"
        stroke="#5c5880"
        strokeOpacity={0.5}
        strokeWidth={1}
        style={{ ['--len' as string]: 55, ['--dur' as string]: '0.2s', ['--delay' as string]: '1.8s' }}
      />
      <path
        className="draw"
        d="M325 98 H380"
        stroke="#5c5880"
        strokeOpacity={0.5}
        strokeWidth={1}
        style={{ ['--len' as string]: 55, ['--dur' as string]: '0.2s', ['--delay' as string]: '1.95s' }}
      />
      <path
        className="draw"
        d="M325 118 H375"
        stroke="#5c5880"
        strokeOpacity={0.5}
        strokeWidth={1}
        style={{ ['--len' as string]: 50, ['--dur' as string]: '0.2s', ['--delay' as string]: '2.1s' }}
      />
    </svg>
  )
}

function Scene3Animator({ isActive }: { isActive: boolean }) {
  const ref = useTriggerDraws(isActive)
  const frames = [
    'M125 95 L135 115 L145 95 M135 95 L135 85 M128 82 L142 82',
    'M175 92 L185 118 L195 92 M185 92 L185 78 M178 75 L192 75',
    'M225 90 L235 120 L245 90 M235 90 L235 72 M228 68 L242 68',
    'M275 92 L285 118 L295 92 M285 92 L285 78 M278 75 L292 75',
    'M325 95 L335 115 L345 95 M335 95 L335 85 M328 82 L342 82',
  ]
  return (
    <svg ref={ref} {...svgCommon} aria-hidden>
      <path
        className="draw"
        d="M80 20 H420 Q430 20 430 30 V150 Q430 160 420 160 H80 Q70 160 70 150 V30 Q70 20 80 20 Z"
        stroke="#f87171"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 1000, ['--dur' as string]: '1s', ['--delay' as string]: '0s' }}
      />
      <path
        className="draw"
        d="M220 160 L210 185 H290 L280 160"
        stroke="#2a2a4a"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 150, ['--dur' as string]: '0.4s', ['--delay' as string]: '0.9s' }}
      />
      <rect
        className="draw"
        x={85}
        y={30}
        width={335}
        height={120}
        rx={2}
        stroke="#f87171"
        strokeOpacity={0.4}
        strokeWidth={1.5}
        style={{ ['--len' as string]: 920, ['--dur' as string]: '0.6s', ['--delay' as string]: '0.8s' }}
      />
      {frames.map((d, i) => (
        <path
          key={i}
          className="draw"
          d={d}
          stroke="#f87171"
          strokeWidth={1.2}
          strokeLinecap="round"
          style={{
            ['--len' as string]: 120,
            ['--dur' as string]: '0.35s',
            ['--delay' as string]: `${1.5 + i * 0.3}s`,
          }}
        />
      ))}
      <path
        className="draw"
        d="M100 92 Q200 88 310 85"
        stroke="#f87171"
        strokeWidth={1}
        strokeOpacity={0.4}
        strokeDasharray="3 4"
        fill="none"
        style={{ ['--len' as string]: 220, ['--dur' as string]: '0.5s', ['--delay' as string]: '3s' }}
      />
      <rect
        className="draw"
        x={85}
        y={125}
        width={335}
        height={20}
        stroke="#2a2a4a"
        strokeWidth={1.2}
        style={{ ['--len' as string]: 720, ['--dur' as string]: '0.45s', ['--delay' as string]: '1.2s' }}
      />
      {[140, 200, 260, 320].map((x, i) => (
        <path
          key={x}
          className="draw"
          d={`M${x} 125 L${x + 10} 135 L${x} 145 L${x - 10} 135 Z`}
          stroke="#f87171"
          strokeWidth={1.2}
          style={{
            ['--len' as string]: 60,
            ['--dur' as string]: '0.25s',
            ['--delay' as string]: `${1.8 + i * 0.2}s`,
          }}
        />
      ))}
      <line
        className="draw"
        x1={220}
        y1={125}
        x2={220}
        y2={145}
        stroke="#fbbf24"
        strokeWidth={2}
        style={{ ['--len' as string]: 20, ['--dur' as string]: '0.2s', ['--delay' as string]: '2.6s' }}
      />
      <path
        className="draw"
        d="M220 125 L228 120 L228 130 Z"
        fill="none"
        stroke="#fbbf24"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 35, ['--dur' as string]: '0.2s', ['--delay' as string]: '2.75s' }}
      />
    </svg>
  )
}

function Scene4Voice({ isActive }: { isActive: boolean }) {
  const ref = useTriggerDraws(isActive)
  return (
    <svg ref={ref} {...svgCommon} aria-hidden>
      <line
        className="draw"
        x1={260}
        y1={190}
        x2={260}
        y2={120}
        stroke="#34d399"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 80, ['--dur' as string]: '0.5s', ['--delay' as string]: '0s' }}
      />
      <path
        className="draw"
        d="M220 190 Q260 185 300 190"
        stroke="#34d399"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 100, ['--dur' as string]: '0.4s', ['--delay' as string]: '0.4s' }}
      />
      <path
        className="draw"
        d="M240 120 Q238 75 260 70 Q282 75 280 120 Z"
        stroke="#34d399"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 200, ['--dur' as string]: '0.7s', ['--delay' as string]: '0.7s' }}
      />
      <line
        className="draw"
        x1={248}
        y1={90}
        x2={272}
        y2={90}
        stroke="#34d399"
        strokeOpacity={0.5}
        strokeWidth={1}
        style={{ ['--len' as string]: 24, ['--dur' as string]: '0.15s', ['--delay' as string]: '1.3s' }}
      />
      <line
        className="draw"
        x1={248}
        y1={100}
        x2={272}
        y2={100}
        stroke="#34d399"
        strokeOpacity={0.5}
        strokeWidth={1}
        style={{ ['--len' as string]: 24, ['--dur' as string]: '0.15s', ['--delay' as string]: '1.4s' }}
      />
      <line
        className="draw"
        x1={248}
        y1={110}
        x2={272}
        y2={110}
        stroke="#34d399"
        strokeOpacity={0.5}
        strokeWidth={1}
        style={{ ['--len' as string]: 24, ['--dur' as string]: '0.15s', ['--delay' as string]: '1.5s' }}
      />
      <circle
        className="draw"
        cx={260}
        cy={95}
        r={32}
        stroke="#2a2a4a"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 202, ['--dur' as string]: '0.5s', ['--delay' as string]: '0.9s' }}
      />
      <line
        className="draw"
        x1={260}
        y1={63}
        x2={260}
        y2={120}
        stroke="#2a2a4a"
        strokeWidth={1.2}
        style={{ ['--len' as string]: 57, ['--dur' as string]: '0.3s', ['--delay' as string]: '1.3s' }}
      />
      <path
        className="draw"
        d="M80 120 Q95 100 110 120 Q125 140 140 120 Q155 100 170 120"
        stroke="#34d399"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 200, ['--dur' as string]: '0.5s', ['--delay' as string]: '1.8s' }}
      />
      <path
        className="draw"
        d="M70 120 Q90 95 110 120 Q130 145 150 120"
        stroke="#34d399"
        strokeOpacity={0.4}
        strokeWidth={1.2}
        style={{ ['--len' as string]: 180, ['--dur' as string]: '0.45s', ['--delay' as string]: '2.3s' }}
      />
      <path
        className="draw"
        d="M350 120 Q365 95 380 120 Q395 145 410 120 Q425 95 440 120"
        stroke="#34d399"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 200, ['--dur' as string]: '0.5s', ['--delay' as string]: '2s' }}
      />
      <rect
        className="draw"
        x={80}
        y={155}
        width={400}
        height={35}
        stroke="#2a2a4a"
        strokeWidth={1.2}
        style={{ ['--len' as string]: 880, ['--dur' as string]: '0.5s', ['--delay' as string]: '2.5s' }}
      />
      <path
        className="draw"
        d="M95 178 Q120 165 145 178 T195 178 T245 178 T295 178 T345 178 T385 172"
        stroke="#34d399"
        strokeWidth={1.2}
        fill="none"
        style={{ ['--len' as string]: 320, ['--dur' as string]: '0.6s', ['--delay' as string]: '2.9s' }}
      />
    </svg>
  )
}

function Scene5Bgm({ isActive }: { isActive: boolean }) {
  const ref = useTriggerDraws(isActive)
  const whiteKeyXs = [75, 115, 155, 195, 235]
  const blackKeyXs = [95, 135, 175, 215]
  return (
    <svg ref={ref} {...svgCommon} aria-hidden>
      <rect
        className="draw"
        x={60}
        y={80}
        width={200}
        height={100}
        rx={4}
        stroke="#a78bfa"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 600, ['--dur' as string]: '0.7s', ['--delay' as string]: '0s' }}
      />
      {whiteKeyXs.map((x, i) => (
        <line
          key={x}
          className="draw"
          x1={x}
          y1={100}
          x2={x}
          y2={175}
          stroke="#a78bfa"
          strokeOpacity={0.5}
          strokeWidth={1.2}
          style={{
            ['--len' as string]: 75,
            ['--dur' as string]: '0.2s',
            ['--delay' as string]: `${0.6 + i * 0.1}s`,
          }}
        />
      ))}
      {blackKeyXs.map((x, i) => (
        <rect
          key={x}
          className="draw"
          x={x}
          y={100}
          width={18}
          height={45}
          stroke="#a78bfa"
          strokeWidth={1.2}
          style={{
            ['--len' as string]: 130,
            ['--dur' as string]: '0.2s',
            ['--delay' as string]: `${1.1 + i * 0.1}s`,
          }}
        />
      ))}
      <path
        className="draw"
        d="M300 60 Q310 40 320 60 Q330 80 340 55"
        stroke="#a78bfa"
        strokeWidth={1.3}
        fill="none"
        style={{ ['--len' as string]: 80, ['--dur' as string]: '0.35s', ['--delay' as string]: '1.6s' }}
      />
      <path
        className="draw"
        d="M355 50 L365 45 L365 70 M360 58 L372 52"
        stroke="#a78bfa"
        strokeWidth={1.2}
        fill="none"
        style={{ ['--len' as string]: 70, ['--dur' as string]: '0.35s', ['--delay' as string]: '1.9s' }}
      />
    </svg>
  )
}

const EDITOR = '#38bdf8'

function Scene6Editor({ isActive }: { isActive: boolean }) {
  const ref = useTriggerDraws(isActive)
  return (
    <svg ref={ref} {...svgCommon} aria-hidden>
      {/* 타임라인 트랙 */}
      <rect
        className="draw"
        x={72}
        y={118}
        width={216}
        height={14}
        rx={3}
        stroke={EDITOR}
        strokeWidth={1.5}
        style={{ ['--len' as string]: 480, ['--dur' as string]: '0.65s', ['--delay' as string]: '0s' }}
      />
      {[128, 158, 188].map((x, i) => (
        <line
          key={x}
          className="draw"
          x1={x}
          y1={108}
          x2={x}
          y2={132}
          stroke={EDITOR}
          strokeWidth={1.1}
          style={{
            ['--len' as string]: 28,
            ['--dur' as string]: '0.2s',
            ['--delay' as string]: `${0.5 + i * 0.12}s`,
          }}
        />
      ))}
      <rect
        className="draw"
        x={78}
        y={122}
        width={44}
        height={6}
        rx={2}
        fill={`${EDITOR}28`}
        stroke={EDITOR}
        strokeWidth={1}
        style={{ ['--len' as string]: 180, ['--dur' as string]: '0.35s', ['--delay' as string]: '0.85s' }}
      />
      <rect
        className="draw"
        x={138}
        y={122}
        width={36}
        height={6}
        rx={2}
        fill={`${EDITOR}28`}
        stroke={EDITOR}
        strokeWidth={1}
        style={{ ['--len' as string]: 160, ['--dur' as string]: '0.35s', ['--delay' as string]: '1s' }}
      />
      <line
        className="draw"
        x1={232}
        y1={168}
        x2={268}
        y2={188}
        stroke={EDITOR}
        strokeWidth={1.3}
        style={{ ['--len' as string]: 50, ['--dur' as string]: '0.25s', ['--delay' as string]: '1.2s' }}
      />
      <line
        className="draw"
        x1={232}
        y1={188}
        x2={268}
        y2={168}
        stroke={EDITOR}
        strokeWidth={1.3}
        style={{ ['--len' as string]: 50, ['--dur' as string]: '0.25s', ['--delay' as string]: '1.35s' }}
      />
      <circle
        className="draw"
        cx={218}
        cy={168}
        r={10}
        stroke={EDITOR}
        strokeWidth={1.2}
        style={{ ['--len' as string]: 65, ['--dur' as string]: '0.3s', ['--delay' as string]: '1.45s' }}
      />
      <circle
        className="draw"
        cx={218}
        cy={188}
        r={10}
        stroke={EDITOR}
        strokeWidth={1.2}
        style={{ ['--len' as string]: 65, ['--dur' as string]: '0.3s', ['--delay' as string]: '1.55s' }}
      />
      <circle
        className="draw"
        cx={92}
        cy={168}
        r={9}
        stroke={EDITOR}
        strokeWidth={1}
        opacity={0.65}
        style={{ ['--len' as string]: 58, ['--dur' as string]: '0.25s', ['--delay' as string]: '1.7s' }}
      />
      <circle
        className="draw"
        cx={112}
        cy={168}
        r={9}
        stroke={EDITOR}
        strokeWidth={1}
        opacity={0.65}
        style={{ ['--len' as string]: 58, ['--dur' as string]: '0.25s', ['--delay' as string]: '1.82s' }}
      />
      <circle
        className="draw"
        cx={102}
        cy={186}
        r={9}
        stroke={EDITOR}
        strokeWidth={1}
        opacity={0.65}
        style={{ ['--len' as string]: 58, ['--dur' as string]: '0.25s', ['--delay' as string]: '1.94s' }}
      />
      {/* 완성 연출 */}
      <circle
        className="draw"
        cx={420}
        cy={110}
        r={70}
        stroke="#fbbf24"
        strokeWidth={1.5}
        style={{ ['--len' as string]: 440, ['--dur' as string]: '0.85s', ['--delay' as string]: '2.15s' }}
      />
      <line
        className="draw"
        x1={380}
        y1={95}
        x2={460}
        y2={95}
        stroke="#fbbf24"
        strokeOpacity={0.6}
        strokeWidth={1}
        style={{ ['--len' as string]: 80, ['--dur' as string]: '0.25s', ['--delay' as string]: '2.85s' }}
      />
      <line
        className="draw"
        x1={385}
        y1={110}
        x2={455}
        y2={110}
        stroke="#fbbf24"
        strokeOpacity={0.5}
        strokeWidth={1}
        style={{ ['--len' as string]: 70, ['--dur' as string]: '0.25s', ['--delay' as string]: '3.05s' }}
      />
      <line
        className="draw"
        x1={390}
        y1={125}
        x2={450}
        y2={125}
        stroke="#fbbf24"
        strokeOpacity={0.4}
        strokeWidth={1}
        style={{ ['--len' as string]: 60, ['--dur' as string]: '0.25s', ['--delay' as string]: '3.25s' }}
      />
      <path
        className="draw"
        d="M395 108 L412 126 L448 90"
        stroke="#fbbf24"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ ['--len' as string]: 80, ['--dur' as string]: '0.5s', ['--delay' as string]: '2.95s' }}
      />
    </svg>
  )
}

const INNER_SCENES_DATA: Omit<InnerScene, 'svgComponent'>[] = [
  {
    id: 0,
    label: 'Story Writer',
    labelColor: '#c4a87a',
    title: '이야기가 시작됩니다',
  },
  {
    id: 1,
    label: '작화',
    labelColor: '#fb923c',
    title: '캐릭터가 그려집니다',
  },
  {
    id: 2,
    label: 'Animator',
    labelColor: '#f87171',
    title: '움직임이 생깁니다',
  },
  {
    id: 3,
    label: 'Voice Actor',
    labelColor: '#34d399',
    title: '목소리가 담깁니다',
  },
  {
    id: 4,
    label: 'Sound Engineer',
    labelColor: '#a78bfa',
    title: '사운드가 얹어집니다',
  },
  {
    id: 5,
    label: 'Video Editor',
    labelColor: '#38bdf8',
    title: (
      <>
        편집으로 마무리되고
        <br />
        작품이 <em className="not-italic text-wem-gold">완성</em>됩니다
      </>
    ),
  },
]

const SCENE_SVGS = [Scene1Writer, Scene2Illustrator, Scene3Animator, Scene4Voice, Scene5Bgm, Scene6Editor]

export function HeroSlide3Workflow({
  onWorkflowComplete,
}: {
  onWorkflowComplete: () => void
}) {
  const [sceneIdx, setSceneIdx] = useState(0)

  useEffect(() => {
    if (sceneIdx >= INNER_COUNT - 1) return
    const t = window.setTimeout(() => {
      setSceneIdx((i) => i + 1)
    }, INNER_SCENE_MS)
    return () => clearTimeout(t)
  }, [sceneIdx])

  useEffect(() => {
    if (sceneIdx !== INNER_COUNT - 1) return
    const t = window.setTimeout(() => {
      onWorkflowComplete()
    }, INNER_SCENE_MS)
    return () => clearTimeout(t)
  }, [sceneIdx, onWorkflowComplete])

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col bg-[#0d0d1a] pt-28 md:pt-32">
      <div className="pointer-events-none relative z-[1] flex min-h-[120px] shrink-0 flex-col items-center justify-center px-4 pt-2 md:min-h-[140px] md:pt-3">
        {INNER_SCENES_DATA.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-x-0 top-0 flex flex-col items-center justify-center px-4 pt-1 transition-opacity duration-500 md:pt-2 ${
              sceneIdx === i ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <p
              className="font-dm text-[10px] font-medium uppercase tracking-[3px]"
              style={{ color: s.labelColor }}
            >
              {s.label}
            </p>
            <h2
              className="mt-3 max-w-[90vw] font-cormorant text-2xl font-semibold leading-tight text-wem-text sm:text-3xl md:text-4xl"
              style={{ fontSize: 'clamp(28px, 5vw, 44px)' }}
            >
              {s.title}
            </h2>
          </div>
        ))}
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden px-2">
        <div
          className="flex h-full w-full"
          style={{
            transform: `translateX(-${sceneIdx * 100}%)`,
            transition: 'transform 0.9s cubic-bezier(0.77, 0, 0.18, 1)',
          }}
        >
          {INNER_SCENES_DATA.map((_, i) => {
            const Svg = SCENE_SVGS[i]!
            return (
              <div
                key={i}
                className="flex h-full w-full shrink-0 items-center justify-center px-2 py-4"
              >
                <div className="w-full max-w-[560px]">
                  <Svg isActive={sceneIdx === i} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
