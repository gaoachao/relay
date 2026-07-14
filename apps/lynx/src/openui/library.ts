import { createOpenUiLibrary } from '@lynx-js/genui/openui'

import { AccessModeBar } from '../components/AccessModeBar.js'
import { ConfidenceNotice } from '../components/ConfidenceNotice.js'
import { ControlChoice } from '../components/ControlChoice.js'
import { GuidedStep } from '../components/GuidedStep.js'
import { PanelMap } from '../components/PanelMap.js'
import { PrimaryAction } from '../components/PrimaryAction.js'
import { VerifyGate } from '../components/VerifyGate.js'

export const relayOpenUiLibrary = createOpenUiLibrary({
  components: [
    AccessModeBar,
    GuidedStep,
    PanelMap,
    ControlChoice,
    ConfidenceNotice,
    VerifyGate,
    PrimaryAction,
  ],
})
