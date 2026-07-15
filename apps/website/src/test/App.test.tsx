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
        name: 'Machines, adapted.',
      }),
    ).toBeInTheDocument()

    const languageLink = screen.getByRole('link', { name: 'Switch language' })
    expect(languageLink).toHaveAttribute('href', '../zh/')

    expect(screen.getByText('Scan a device. Get the interface.')).toBeInTheDocument()
    expect(document.getElementById('top')).toBeInTheDocument()
    expect(document.getElementById('main-content')).toBeInTheDocument()
    expect(document.getElementById('experience')).toBeInTheDocument()
    expect(document.getElementById('approach')).toHaveTextContent('Vision → OpenUI → Native')
    expect(document.getElementById('technology')).toBeInTheDocument()

    const navigation = screen.getByRole('navigation', { name: 'Primary navigation' })
    expect(within(navigation).getByRole('link', { name: 'Demo' })).toHaveAttribute(
      'href',
      '#experience',
    )
    expect(within(navigation).getByRole('link', { name: 'Stack' })).toHaveAttribute(
      'href',
      '#technology',
    )
    expect(within(navigation).getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/gaoachao/relay',
    )

    const generatedInterface = screen.getByRole('article', { name: 'OpenUI' })
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

    expect(screen.getByText('Critical actions always return to Native.')).toBeInTheDocument()
  })

  it('renders the Chinese page with a direct English language route', () => {
    render(<App locale="zh" />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: '让机器适应你。',
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '切换语言' })).toHaveAttribute('href', '../en/')
    expect(screen.getByText('扫描设备，生成界面。')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '实时生成' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '无声引导' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '生成有边界。' })).toBeInTheDocument()
  })
})
