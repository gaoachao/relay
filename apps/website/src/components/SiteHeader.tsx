import relayMark from '@/assets/relay-app-icon.svg'
import type { Locale, SiteCopy } from '@/content/copy'

interface SiteHeaderProps {
  copy: SiteCopy
  locale: Locale
}

export function SiteHeader({ copy, locale }: SiteHeaderProps) {
  const languageHref = locale === 'zh' ? '../en/' : '../zh/'

  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <a className="wordmark" href="#top" aria-label={`Relay · ${copy.brandDescriptor}`}>
          <img src={relayMark} alt="" />
          <span>Relay</span>
        </a>

        <nav
          className="primary-navigation"
          aria-label={locale === 'zh' ? '主要导航' : 'Primary navigation'}
        >
          <a href="#experience">{copy.navigation.experience}</a>
          <a href="#approach">{copy.navigation.approach}</a>
          <a href="#technology">{copy.navigation.technology}</a>
        </nav>

        <a
          className="language-link"
          href={languageHref}
          hrefLang={locale === 'zh' ? 'en' : 'zh-CN'}
          aria-label={copy.navigation.languageLabel}
        >
          {copy.navigation.languageName}
        </a>
      </div>
    </header>
  )
}
