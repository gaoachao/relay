import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from '@/App'

describe('Relay website root route', () => {
  it('renders Chinese directly with a base-relative English route', () => {
    render(<App locale="zh" languageHref="./en/" />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: '机器，适应你。',
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '切换语言' })).toHaveAttribute('href', './en/')
  })
})
