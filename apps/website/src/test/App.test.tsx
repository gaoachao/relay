import { render, screen } from '@testing-library/react'
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
        name: /A better interface for what’s in front of you/i,
      }),
    ).toBeInTheDocument()

    const languageLink = screen.getByRole('link', { name: 'Switch language' })
    expect(languageLink).toHaveAttribute('href', '../zh/')

    const oneHandMode = screen.getByRole('button', { name: 'One hand' })
    await user.click(oneHandMode)
    expect(oneHandMode).toHaveAttribute('aria-pressed', 'true')

    await user.click(screen.getByRole('button', { name: 'Start guidance' }))
    expect(screen.getByText('Step confirmed')).toBeInTheDocument()
  })

  it('renders the Chinese page with a direct English language route', () => {
    render(<App locale="zh" />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /为眼前的设备，生成更好用的界面。/,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '切换语言' })).toHaveAttribute('href', '../en/')
  })
})
