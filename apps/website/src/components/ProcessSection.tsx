import type { SiteCopy } from '@/content/copy'

interface ProcessSectionProps {
  copy: SiteCopy
}

export function ProcessSection({ copy }: ProcessSectionProps) {
  return (
    <section className="process-section" id="approach" aria-labelledby="approach-title">
      <div className="page-shell">
        <div className="section-intro section-intro-wide">
          <h2 id="approach-title">{copy.approach.title}</h2>
          <p>{copy.approach.lead}</p>
        </div>

        <ol className="process-list">
          {copy.approach.steps.map((step) => (
            <li key={step.number}>
              <span className="process-number" aria-hidden="true">
                {step.number}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <span className="process-detail">{step.detail}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
