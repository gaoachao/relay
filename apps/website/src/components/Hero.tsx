import relayMark from '@/assets/relay-app-icon.svg'
import type { SiteCopy } from '@/content/copy'

interface HeroProps {
  copy: SiteCopy
}

export function Hero({ copy }: HeroProps) {
  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      <div className="page-shell hero-inner">
        <p className="hero-eyebrow">{copy.hero.eyebrow}</p>
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
          <a className="text-link" href="#technology">
            {copy.hero.secondaryAction}
            <span className="link-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>

      <div className="hero-statement" aria-hidden="true">
        <span className="hero-statement-source">{copy.hero.sourceLabel}</span>
        <span className="hero-statement-line" />
        <span className="hero-statement-brand">
          <img src={relayMark} alt="" />
          Relay
        </span>
        <span className="hero-statement-line" />
        <span className="hero-statement-result">{copy.hero.resultLabel}</span>
      </div>
      <p className="hero-product-note">{copy.hero.productNote}</p>
    </section>
  )
}
