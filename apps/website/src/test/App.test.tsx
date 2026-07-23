import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { App } from '@/App'

describe('Relay website', () => {
  it('renders the English page and switches the interactive access mode', async () => {
    const user = userEvent.setup()
    render(<App locale="en" />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Every machine, made for you.',
      }),
    ).toBeInTheDocument()

    const languageLink = screen.getByRole('link', { name: 'Switch language' })
    expect(languageLink).toHaveAttribute('href', '../zh/')

    expect(
      screen.getByText(
        'Point the camera. Say what you need. Relay turns an unfamiliar control panel into a clear, accessible interface.',
      ),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'See it adapt' })).toHaveLength(2)
    expect(document.getElementById('top')).toBeInTheDocument()
    expect(document.getElementById('main-content')).toBeInTheDocument()
    expect(document.getElementById('experience')).toBeInTheDocument()
    expect(document.getElementById('approach')).toHaveTextContent(
      'Camera → intent → one clear action',
    )
    expect(document.getElementById('technology')).toBeInTheDocument()

    const navigation = screen.getByRole('navigation', { name: 'Primary navigation' })
    expect(within(navigation).getByRole('link', { name: 'Live demo' })).toHaveAttribute(
      'href',
      '#experience',
    )
    expect(within(navigation).getByRole('link', { name: 'How it works' })).toHaveAttribute(
      'href',
      '#technology',
    )
    expect(within(navigation).getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/gaoachao/relay',
    )

    const generatedInterface = screen.getByRole('article', { name: 'What you get' })
    expect(within(generatedInterface).getByRole('heading', { name: 'Press once' })).toBeVisible()
    expect(
      within(generatedInterface).getByRole('button', { name: 'Start visual guide' }),
    ).toBeVisible()

    const oneHandMode = screen.getByRole('button', { name: 'One hand' })
    await user.click(oneHandMode)
    expect(oneHandMode).toHaveAttribute('aria-pressed', 'true')

    expect(
      within(generatedInterface).getByRole('heading', { name: 'Point at the panel' }),
    ).toBeVisible()
    const handPicker = within(generatedInterface).getByRole('group', {
      name: 'Choose operating hand',
    })
    const leftHand = within(handPicker).getByRole('button', { name: 'Left' })
    const rightHand = within(handPicker).getByRole('button', { name: 'Right' })
    expect(rightHand).toHaveAttribute('aria-pressed', 'true')
    await user.click(leftHand)
    expect(leftHand).toHaveAttribute('aria-pressed', 'true')

    await user.click(within(generatedInterface).getByRole('button', { name: 'Locate button 8' }))
    expect(
      within(generatedInterface).getByRole('heading', { name: 'Button 8 found' }),
    ).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'No audio' }))
    expect(
      within(generatedInterface).getByRole('heading', { name: 'Follow the signal' }),
    ).toBeVisible()
    expect(within(generatedInterface).getByText('Haptic pattern')).toBeVisible()
    await user.click(
      within(generatedInterface).getByRole('button', { name: 'Start no-audio guide' }),
    )
    expect(
      within(generatedInterface).getByRole('heading', {
        name: 'Confirmed on screen and by haptic',
      }),
    ).toBeVisible()
    const replayNoAudioGuide = within(generatedInterface).getByRole('button', {
      name: 'Replay no-audio guide',
    })
    expect(replayNoAudioGuide.closest('.no-audio-footer')).not.toBeNull()

    expect(
      screen.getByText('Relay changes how you operate a device, never its safety boundary.'),
    ).toBeInTheDocument()
  })

  it('renders the Chinese page with a direct English language route', () => {
    render(<App locale="zh" />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: '设备再陌生，也能轻松上手。',
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '切换到英文' })).toHaveAttribute('href', '../en/')
    expect(
      screen.getByText('对准设备，说出要做什么。Relay 会把陌生面板变成清楚、顺手的操作界面。'),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '同一台设备，换种方式操作' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '无声引导' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '生成，但不越界。' })).toBeInTheDocument()
  })
})
