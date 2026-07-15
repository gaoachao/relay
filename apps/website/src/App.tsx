import { Hero } from '@/components/Hero'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { StackSection } from '@/components/StackSection'
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
        <StackSection copy={copy} />
      </main>
      <SiteFooter copy={copy} locale={locale} />
    </>
  )
}
