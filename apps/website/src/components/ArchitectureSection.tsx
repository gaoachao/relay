import type { SiteCopy } from '@/content/copy'

interface ArchitectureSectionProps {
  copy: SiteCopy
}

export function ArchitectureSection({ copy }: ArchitectureSectionProps) {
  return (
    <section className="architecture-section" id="technology" aria-labelledby="technology-title">
      <div className="page-shell">
        <p className="architecture-statement">{copy.technology.statement}</p>
        <div className="architecture-heading">
          <h2 id="technology-title">{copy.technology.title}</h2>
          <p>{copy.technology.lead}</p>
        </div>

        <div className="architecture-stack">
          {copy.technology.layers.map((layer) => (
            <article key={layer.label}>
              <span className="layer-label">{layer.label}</span>
              <div className="layer-copy">
                <h3>{layer.title}</h3>
                <p>{layer.body}</p>
              </div>
              <span className="layer-meta">{layer.meta}</span>
            </article>
          ))}
        </div>
        <p className="platform-note">{copy.technology.platformNote}</p>

        <section className="trust-block" aria-labelledby="trust-title">
          <div className="trust-heading">
            <h2 id="trust-title">{copy.trust.title}</h2>
            <p>{copy.trust.lead}</p>
          </div>
          <div className="trust-principles">
            {copy.trust.principles.map((principle) => (
              <article key={principle.title}>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}
