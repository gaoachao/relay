import { TranslationDemo } from '@/components/TranslationDemo'
import type { SiteCopy } from '@/content/copy'

interface HeroProps {
  copy: SiteCopy
}

export function Hero({ copy }: HeroProps) {
  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      <div className="page-shell hero-layout">
        <div className="hero-copy">
          <h1 id="hero-title" aria-label={copy.hero.titleLabel}>
            {copy.hero.title}
          </h1>
          <p className="hero-lead">{copy.hero.lead}</p>
          <p className="hero-flow" id="approach">
            {copy.hero.flow}
          </p>
        </div>

        <TranslationDemo copy={copy} />
      </div>
    </section>
  )
}
