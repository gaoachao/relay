import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/App'
import '@/styles/global.css'

document.documentElement.lang = 'en'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Missing #root mount element')
}

createRoot(root).render(
  <StrictMode>
    <App locale="en" languageHref="./zh/" />
  </StrictMode>,
)
