import { TranslationDemo } from '@/components/TranslationDemo'
import type { SiteCopy } from '@/content/copy'

interface HeroProps {
  copy: SiteCopy
}

export function Hero({ copy }: HeroProps) {
  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      <div className="page-shell hero-layout">
        <div className="hero-intro">
          <h1 id="hero-title" aria-label={copy.hero.titleLabel}>
            <span className="hero-title-primary">{copy.hero.titlePrimary}</span>
            <span className="hero-title-secondary">{copy.hero.titleSecondary}</span>
          </h1>
          <p className="hero-lead">{copy.hero.lead}</p>
          <a className="hero-action" href="#experience">
            <span>{copy.hero.action}</span>
            <span className="hero-action-icon" aria-hidden="true">
              ↓
            </span>
          </a>
          <p className="hero-flow" id="approach">
            {copy.hero.flow}
          </p>
        </div>

        <TranslationDemo copy={copy} />
      </div>
    </section>
  )
}
