import { useState } from 'react'
import { GeneratedGuides } from '@/components/demo/GeneratedGuides'
import type { AccessMode, SiteCopy } from '@/content/copy'

interface TranslationDemoProps {
  copy: SiteCopy
}

const accessModes: AccessMode[] = ['lowVision', 'oneHand', 'quiet']
const panelControls = Array.from({ length: 12 }, (_, index) => ({
  id: `panel-control-${index + 1}`,
  label: index + 1,
}))

export function TranslationDemo({ copy }: TranslationDemoProps) {
  const [mode, setMode] = useState<AccessMode>('lowVision')
  const [isComplete, setIsComplete] = useState(false)

  function chooseMode(nextMode: AccessMode) {
    setMode(nextMode)
    setIsComplete(false)
  }

  return (
    <section className="demo-section" id="experience" aria-labelledby="demo-title">
      <div className="console-head">
        <div className="console-title">
          <span className="console-signal" aria-hidden="true" />
          <h2 id="demo-title">{copy.demo.title}</h2>
        </div>

        <fieldset className="mode-picker">
          <legend className="visually-hidden">{copy.demo.modesLabel}</legend>
          {accessModes.map((accessMode) => (
            <button
              className="mode-button"
              type="button"
              key={accessMode}
              aria-pressed={mode === accessMode}
              onClick={() => chooseMode(accessMode)}
            >
              {copy.demo.modes[accessMode]}
            </button>
          ))}
        </fieldset>
      </div>

      <div className={`relay-stage mode-${mode}${isComplete ? ' is-complete' : ''}`}>
        <article className="physical-layer" aria-labelledby="physical-panel-title">
          <div className="stage-label" id="physical-panel-title">
            {copy.demo.panelLabel}
          </div>
          <div className="physical-panel" role="img" aria-label={copy.demo.panelDescription}>
            <div className="panel-display">
              <span className="panel-display-value">23</span>
              <small>min</small>
            </div>
            <div className="panel-grid">
              {panelControls.map((control, index) => (
                <span
                  className={index === 7 ? 'panel-control is-target' : 'panel-control'}
                  key={control.id}
                >
                  {control.label}
                </span>
              ))}
            </div>
            <div className="panel-reticle" aria-hidden="true" />
          </div>
        </article>

        <article className="generated-layer" aria-labelledby="generated-title">
          <div className="stage-label" id="generated-title">
            {copy.demo.generatedLabel}
          </div>
          <GeneratedGuides
            copy={copy.demo}
            isComplete={isComplete}
            key={mode}
            mode={mode}
            onToggleComplete={() => setIsComplete((complete) => !complete)}
          />
        </article>

        <div className="relay-gate" aria-hidden="true">
          <span>RELAY</span>
        </div>
      </div>

      <p className="prototype-disclosure">{copy.demo.disclosure}</p>
    </section>
  )
}
