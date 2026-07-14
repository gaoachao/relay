const languagePreferences =
  navigator.languages.length > 0 ? navigator.languages : [navigator.language]
const targetLocale = languagePreferences.some((language) => language.toLowerCase().startsWith('zh'))
  ? 'zh'
  : 'en'
const targetUrl = new URL(
  `./${targetLocale}/${window.location.search}${window.location.hash}`,
  window.location.href,
)

window.location.replace(targetUrl)
