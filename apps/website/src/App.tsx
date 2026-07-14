import { ArchitectureSection } from '@/components/ArchitectureSection'
import { Hero } from '@/components/Hero'
import { ProcessSection } from '@/components/ProcessSection'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { TranslationDemo } from '@/components/TranslationDemo'
import { type Locale, siteCopy } from '@/content/copy'

export interface AppProps {
  locale: Locale
}

export function App({ locale }: AppProps) {
  const copy = siteCopy[locale]

  return (
    <>
      <a className="skip-link" href="#main-content">
        {copy.skipLink}
      </a>
      <SiteHeader copy={copy} locale={locale} />
      <main id="main-content">
        <Hero copy={copy} />
        <TranslationDemo copy={copy} />
        <ProcessSection copy={copy} />
        <ArchitectureSection copy={copy} />
        <section className="closing-section" aria-labelledby="closing-title">
          <div className="page-shell closing-inner">
            <h2 id="closing-title" aria-label={copy.closing.titleLabel}>
              {copy.closing.title.split('\n').map((line) => (
                <span className="closing-title-line" key={line}>
                  {line}{' '}
                </span>
              ))}
            </h2>
            <p>{copy.closing.body}</p>
            <a className="text-link text-link-on-dark" href="#technology">
              {copy.closing.action}
              <span className="link-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </section>
      </main>
      <SiteFooter copy={copy} locale={locale} />
    </>
  )
}
