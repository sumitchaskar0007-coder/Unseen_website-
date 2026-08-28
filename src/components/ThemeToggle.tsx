import { motion } from 'framer-motion'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme, type ThemePreference } from '../theme/ThemeContext'

const modes: { value: ThemePreference; label: string; Icon: typeof Moon }[] = [
  { value: 'dark', label: 'Dark', Icon: Moon },
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'system', label: 'System', Icon: Monitor },
]

export function ThemeToggle() {
  const { preference, setPreference } = useTheme()

  return (
    <div
      role="group"
      aria-label="Theme"
      className="flex items-center rounded-full border border-foreground/10 bg-foreground/[0.06] p-0.5"
    >
      {modes.map(({ value, label, Icon }) => {
        const active = preference === value
        return (
          <motion.button
            key={value}
            type="button"
            title={label}
            aria-pressed={active}
            aria-label={`${label} theme`}
            onClick={() => setPreference(value)}
            className={`relative flex h-9 w-9 items-center justify-center rounded-full text-xs transition-colors ${
              active ? 'text-ink-strong' : 'text-muted hover:text-foreground'
            }`}
          >
            {active ? (
              <motion.span
                layoutId="theme-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-electric to-violet shadow-[0_0_20px_rgba(56,189,248,0.25)]"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              />
            ) : null}
            <Icon className="relative z-10 h-4 w-4" aria-hidden />
          </motion.button>
        )
      })}
    </div>
  )
}
