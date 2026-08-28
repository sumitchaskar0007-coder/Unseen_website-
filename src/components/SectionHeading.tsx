import { Reveal } from './Reveal'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'left' }: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'mx-auto text-center' : 'text-left'

  return (
    <div className={`mb-14 max-w-3xl space-y-4 ${alignClass}`}>
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-electric/90">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle ? (
        <Reveal delay={0.12}>
          <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>
        </Reveal>
      ) : null}
    </div>
  )
}
