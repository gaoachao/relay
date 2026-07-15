import { useState } from 'react'
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
      <div className="page-shell">
        <div className="section-intro">
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

        <div className="translation-stage">
          <article className="panel-observation" aria-labelledby="physical-panel-title">
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
              <div className="scan-brackets" />
            </div>
          </article>

          <div className="translation-bridge" aria-hidden="true">
            <span>Relay</span>
            <i />
          </div>

          <article className={`generated-interface mode-${mode}`} aria-labelledby="generated-title">
            <div className="stage-label" id="generated-title">
              {copy.demo.generatedLabel}
            </div>
            <div className="generated-screen">
              <div className="generated-task">
                <p>{copy.demo.taskLabel}</p>
                <strong>{copy.demo.task}</strong>
                <span className="generated-task-detail">{copy.demo.taskDetail}</span>
              </div>
              <div className="generated-step" aria-live="polite">
                <p>{copy.demo.stepLabel}</p>
                <h3>{isComplete ? copy.demo.completed : copy.demo.stepTitle}</h3>
                <span className="generated-step-detail">{copy.demo.stepDetail}</span>
              </div>
              <button
                className={isComplete ? 'demo-action is-complete' : 'demo-action'}
                type="button"
                onClick={() => setIsComplete((complete) => !complete)}
              >
                {isComplete ? copy.demo.reset : copy.demo.action}
              </button>
              <p className="prototype-disclosure">{copy.demo.disclosure}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
