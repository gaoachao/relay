import { useState } from 'react'
import type { AccessMode, SiteCopy } from '@/content/copy'

interface GeneratedGuidesProps {
  copy: SiteCopy['demo']
  isComplete: boolean
  mode: AccessMode
  onToggleComplete: () => void
}

interface GuideProps {
  copy: SiteCopy['demo']
  isComplete: boolean
  onToggleComplete: () => void
}

interface GuideActionProps {
  action: string
  isComplete: boolean
  reset: string
  onToggleComplete: () => void
}

function GuideAction({ action, isComplete, onToggleComplete, reset }: GuideActionProps) {
  return (
    <button
      className={isComplete ? 'demo-action is-complete' : 'demo-action'}
      type="button"
      onClick={onToggleComplete}
    >
      {isComplete ? reset : action}
    </button>
  )
}

function LowVisionGuide({ copy, isComplete, onToggleComplete }: GuideProps) {
  const variant = copy.variants.lowVision

  return (
    <div className="generated-screen low-vision-screen">
      <div className="low-vision-meta">{variant.stepLabel}</div>
      <div className="low-vision-focus" aria-live="polite">
        <span>{variant.targetLabel}</span>
        <strong>{variant.targetNumber}</strong>
        <h3>{isComplete ? variant.completed : variant.instruction}</h3>
      </div>
      <p className="low-vision-detail">{variant.detail}</p>
      <GuideAction
        action={variant.action}
        isComplete={isComplete}
        onToggleComplete={onToggleComplete}
        reset={variant.reset}
      />
    </div>
  )
}

function OneHandGuide({ copy, isComplete, onToggleComplete }: GuideProps) {
  const [hand, setHand] = useState<'left' | 'right'>('right')
  const variant = copy.variants.oneHand

  return (
    <div className="generated-screen one-hand-screen" data-hand={hand}>
      <div className="one-hand-task">
        <span>{copy.task.label}</span>
        <strong>{copy.task.title}</strong>
        <small>{copy.task.detail}</small>
      </div>

      <div className="reach-field" aria-hidden="true">
        <span className="reach-target">8</span>
        <span className="reach-arc" />
      </div>

      <div className="thumb-dock">
        <fieldset className="hand-picker">
          <legend className="visually-hidden">{variant.handLabel}</legend>
          <span aria-hidden="true">{variant.handLabel}</span>
          <div>
            <button type="button" aria-pressed={hand === 'left'} onClick={() => setHand('left')}>
              {variant.leftHand}
            </button>
            <button type="button" aria-pressed={hand === 'right'} onClick={() => setHand('right')}>
              {variant.rightHand}
            </button>
          </div>
        </fieldset>

        <div className="one-hand-instruction" aria-live="polite">
          <span>{variant.stepLabel}</span>
          <h3>{isComplete ? variant.completed : variant.instruction}</h3>
          <p>{variant.detail}</p>
        </div>

        <GuideAction
          action={variant.action}
          isComplete={isComplete}
          onToggleComplete={onToggleComplete}
          reset={variant.reset}
        />
      </div>
    </div>
  )
}

function NoAudioGuide({ copy, isComplete, onToggleComplete }: GuideProps) {
  const variant = copy.variants.quiet

  return (
    <div className="generated-screen no-audio-screen">
      <div className="no-audio-status">
        <span>{variant.soundOff}</span>
        <span>{variant.hapticsOn}</span>
      </div>

      <div className="no-audio-heading" aria-live="polite">
        <span>{variant.eyebrow}</span>
        <h3>{isComplete ? variant.completed : variant.instruction}</h3>
      </div>

      <ol className="signal-timeline">
        {variant.signals.map((signal, index) => (
          <li
            data-state={isComplete ? 'complete' : index === 0 ? 'current' : 'pending'}
            key={signal}
          >
            <span>{index + 1}</span>
            <strong>{signal}</strong>
            <small>
              {isComplete
                ? variant.doneLabel
                : index === 0
                  ? variant.currentLabel
                  : variant.nextLabel}
            </small>
          </li>
        ))}
      </ol>

      <div className="haptic-pattern">
        <span>{variant.hapticLabel}</span>
        <i aria-hidden="true" />
        <i aria-hidden="true" />
        <i aria-hidden="true" className="is-long" />
      </div>

      <p className="no-audio-detail">{variant.detail}</p>
      <GuideAction
        action={variant.action}
        isComplete={isComplete}
        onToggleComplete={onToggleComplete}
        reset={variant.reset}
      />
    </div>
  )
}

export function GeneratedGuides({
  copy,
  isComplete,
  mode,
  onToggleComplete,
}: GeneratedGuidesProps) {
  const guideProps = { copy, isComplete, onToggleComplete }

  if (mode === 'oneHand') {
    return <OneHandGuide {...guideProps} />
  }

  if (mode === 'quiet') {
    return <NoAudioGuide {...guideProps} />
  }

  return <LowVisionGuide {...guideProps} />
}
