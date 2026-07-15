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

    const oneHandMode = screen.getByRole('button', { name: 'One hand' })
    await user.click(oneHandMode)
    expect(oneHandMode).toHaveAttribute('aria-pressed', 'true')

    await user.click(screen.getByRole('button', { name: 'Start guidance' }))
    expect(screen.getByText('Step confirmed')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Replay demo' }))
    expect(screen.getByText('Press the highlighted button on the right')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Start guidance' }))
    await user.click(screen.getByRole('button', { name: 'Quiet' }))
    expect(screen.getByRole('button', { name: 'Start guidance' })).toBeInTheDocument()

    expect(screen.getByText('Critical actions always return to Native.')).toBeInTheDocument()
  })

  it('renders the Chinese page with a direct English language route', () => {
    render(<App locale="zh" />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: '机器，适应你。',
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '切换语言' })).toHaveAttribute('href', '../en/')
    expect(screen.getByText('扫描设备，生成界面。')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '实时生成' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '生成有边界。' })).toBeInTheDocument()
  })
})
