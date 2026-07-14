import type { Locale, SiteCopy } from '@/content/copy'

interface SiteFooterProps {
  copy: SiteCopy
  locale: Locale
}

export function SiteFooter({ copy, locale }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-inner">
        <div>
          <strong>{copy.footer.line}</strong>
          <p>{copy.footer.disclaimer}</p>
        </div>
        <nav aria-label={locale === 'zh' ? '相关文档' : 'Related documentation'}>
          <a
            href="https://lynxjs.org/next/guide/start/integrate-with-existing-apps.html?platform=ios"
            target="_blank"
            rel="noreferrer"
          >
            {copy.footer.lynxDocs}
          </a>
          <a
            href="https://lynxjs.org/next/react/genui/openui.html"
            target="_blank"
            rel="noreferrer"
          >
            {copy.footer.openUiDocs}
          </a>
        </nav>
      </div>
    </footer>
  )
}
