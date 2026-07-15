import { Hero } from '@/components/Hero'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { StackSection } from '@/components/StackSection'
import { type Locale, siteCopy } from '@/content/copy'

export interface AppProps {
  locale: Locale
  languageHref?: string
}

export function App({ languageHref, locale }: AppProps) {
  const copy = siteCopy[locale]
  const resolvedLanguageHref = languageHref ?? (locale === 'zh' ? '../en/' : '../zh/')

  return (
    <>
      <a className="skip-link" href="#main-content">
        {copy.skipLink}
      </a>
      <SiteHeader copy={copy} languageHref={resolvedLanguageHref} locale={locale} />
      <main id="main-content">
        <Hero copy={copy} />
        <StackSection copy={copy} />
      </main>
      <SiteFooter copy={copy} locale={locale} />
    </>
  )
}
