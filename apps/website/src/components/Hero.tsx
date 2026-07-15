import type { SiteCopy } from '@/content/copy'

interface HeroProps {
  copy: SiteCopy
}

export function Hero({ copy }: HeroProps) {
  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      <div className="page-shell hero-inner">
        <h1 id="hero-title" aria-label={copy.hero.titleLabel}>
          {copy.hero.title.split('\n').map((line) => (
            <span className="hero-title-line" key={line}>
              {line}{' '}
            </span>
          ))}
        </h1>
        <p className="hero-lead">{copy.hero.lead}</p>
        <div className="hero-actions">
          <a className="primary-link" href="#experience">
            {copy.hero.primaryAction}
            <span className="link-arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
        <p className="hero-flow" id="approach">
          {copy.hero.flow}
        </p>
      </div>
    </section>
  )
}
