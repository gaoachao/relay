import type { SiteCopy } from '@/content/copy'

interface StackSectionProps {
  copy: SiteCopy
}

export function StackSection({ copy }: StackSectionProps) {
  return (
    <section className="stack-section" id="technology" aria-labelledby="technology-title">
      <div className="page-shell stack-inner">
        <h2 id="technology-title">{copy.technology.title}</h2>

        <ul className="compact-stack">
          {copy.technology.layers.map((layer) => (
            <li key={layer.title}>
              <strong>{layer.title}</strong>
              <span>{layer.meta}</span>
            </li>
          ))}
        </ul>

        <p className="native-boundary">{copy.technology.safety}</p>
      </div>
    </section>
  )
}
