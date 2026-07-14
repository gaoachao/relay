import { root } from '@lynx-js/react'

import { RelaySurface } from './app/RelaySurface.js'
import './styles/tokens.css'
import './styles/app.css'

lynx.registerDataProcessors({
  defaultDataProcessor(rawInitData) {
    return rawInitData && typeof rawInitData === 'object' ? rawInitData : {}
  },
})

root.render(<RelaySurface />)
