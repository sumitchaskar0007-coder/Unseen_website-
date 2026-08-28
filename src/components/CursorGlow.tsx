import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'
import { useTheme } from '../theme/ThemeContext'

function usePointerSprings() {
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)
  const sx = useSpring(mx, { stiffness: 280, damping: 28, mass: 0.35 })
  const sy = useSpring(my, { stiffness: 280, damping: 28, mass: 0.35 })

  useEffect(() => {
    function move(e: PointerEvent) {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [mx, my])

  return { sx, sy }
}

function DarkCursorGlow() {
  const { sx, sy } = usePointerSprings()
  const gradient = useMotionTemplate`radial-gradient(420px circle at ${sx}px ${sy}px, rgba(56,189,248,0.14), rgba(168,85,247,0.08) 35%, transparent 60%)`

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] mix-blend-screen"
      style={{ background: gradient }}
    />
  )
}

function LightCursorGlow() {
  const { sx, sy } = usePointerSprings()
  const gradient = useMotionTemplate`radial-gradient(420px circle at ${sx}px ${sy}px, rgba(2,132,199,0.09), rgba(124,58,237,0.06) 35%, transparent 60%)`

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] mix-blend-multiply opacity-50"
      style={{ background: gradient }}
    />
  )
}

export function CursorGlow() {
  const { resolved } = useTheme()
  return resolved === 'dark' ? <DarkCursorGlow /> : <LightCursorGlow />
}
