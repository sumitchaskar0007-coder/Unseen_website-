import { useState, useRef } from 'react'
import { Clock, DollarSign, TrendingUp } from 'lucide-react'

const features = [
  {
    id: 1,
    title: "Save Your Time",
    description:
      "From SEO to social media, we handle it all — so you can stay focused on what matters most to your business.",
    icon: Clock,
  },
  {
    id: 2,
    title: "Affordable Pricing",
    description:
      "Top-notch digital marketing services at a price that fits your budget, without cutting corners on quality.",
    icon: DollarSign,
  },
  {
    id: 3,
    title: "Best Strategy",
    description:
      "Tailored solutions built from real data — from search rankings to social engagement, every move is deliberate.",
    icon: TrendingUp,
  },
]

function BucketFillCard({ feature }: { feature: (typeof features)[number] }) {
  const [filled, setFilled] = useState(false)
  const [animating, setAnimating] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const Icon = feature.icon

  const handleClick = () => {
    if (animating) return
    setAnimating(true)
    setFilled(true)

    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setFilled(false)
      setTimeout(() => setAnimating(false), 600)
    }, 1800)
  }

  return (
    <div
      onClick={handleClick}
      className="relative rounded-2xl overflow-hidden cursor-pointer select-none"
      style={{
        border: '1.5px solid #f0ede8',
        background: '#fff',
        boxShadow: '0 2px 16px 0 rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.2s',
        minHeight: 260,
      }}
    >
      {/* Bucket fill layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(160deg, #f97316 0%, #ea580c 100%)',
          transform: filled ? 'translateY(0%)' : 'translateY(100%)',
          transition: filled
            ? 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)'
            : 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Ripple wave on top of fill */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: 32,
          bottom: filled ? 'calc(100% - 1px)' : '100%',
          transition: filled
            ? 'bottom 0.55s cubic-bezier(0.4, 0, 0.2, 1)'
            : 'bottom 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <svg
          viewBox="0 0 400 32"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <path
            d="M0,16 C40,0 80,32 120,16 C160,0 200,32 240,16 C280,0 320,32 360,16 C380,8 390,20 400,16 L400,32 L0,32 Z"
            fill="#f97316"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* Card Content */}
      <div
        className="relative p-8 flex flex-col gap-4 h-full"
        style={{ zIndex: 2 }}
      >
        {/* Icon */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: filled ? 'rgba(255,255,255,0.2)' : '#fff7ed',
            transition: 'background 0.4s',
          }}
        >
          <Icon
            style={{
              width: 22,
              height: 22,
              color: filled ? '#fff' : '#ea580c',
              transition: 'color 0.3s',
            }}
          />
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1.15rem',
            fontWeight: 700,
            color: filled ? '#fff' : '#111',
            transition: 'color 0.3s',
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {feature.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: '0.92rem',
            lineHeight: 1.65,
            color: filled ? 'rgba(255,255,255,0.85)' : '#6b7280',
            transition: 'color 0.3s',
            margin: 0,
          }}
        >
          {feature.description}
        </p>

        {/* Subtle hint */}
        <div
          style={{
            marginTop: 'auto',
            fontSize: '0.75rem',
            color: filled ? 'rgba(255,255,255,0.5)' : '#d1d5db',
            letterSpacing: '0.04em',
            transition: 'color 0.3s',
          }}
        >
          tap to fill
        </div>
      </div>
    </div>
  )
}

export function WhyUnseen() {
  return (
    <section
      style={{
        padding: '80px 24px',
        background: '#f97316', // Changed from '#fafaf9' to orange
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 56, textAlign: 'center' }}>
          <p
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#fff', // Changed to white for better contrast on orange
              marginBottom: 12,
            }}
          >
            Why Unseen Studio
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 800,
              color: '#fff', // Changed to white for better contrast on orange
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            What makes us{' '}
            <span style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
              different
            </span>
          </h2>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
          }}
        >
          {features.map((feature) => (
            <BucketFillCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUnseen