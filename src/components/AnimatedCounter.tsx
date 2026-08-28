import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

type AnimatedCounterProps = {
  end: number
  suffix?: string
  durationMs?: number
}

export function AnimatedCounter({ end, suffix = '', durationMs = 2000 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    let raf = 0

    function easeOutCubic(t: number) {
      return 1 - (1 - t) ** 3
    }

    function tick(now: number) {
      const t = Math.min(1, (now - start) / durationMs)
      const eased = easeOutCubic(t)
      setVal(Math.floor(eased * end))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setVal(end)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, end, durationMs])

  return (
    <span ref={ref} className="tabular-nums">
      {val}
      {suffix}
    </span>
  )
}
