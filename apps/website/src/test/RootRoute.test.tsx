import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from '@/App'

describe('Relay website root route', () => {
  it('renders English directly with a base-relative Chinese route', () => {
    render(<App locale="en" languageHref="./zh/" />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Machines, adapted.',
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Switch language' })).toHaveAttribute('href', './zh/')
  })
})
