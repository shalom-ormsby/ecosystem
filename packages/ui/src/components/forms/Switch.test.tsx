import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { createRef } from 'react'
import { Switch } from './Switch'

describe('Switch', () => {
  it('renders the switch', () => {
    render(<Switch />)
    const switchEl = screen.getByRole('switch')
    expect(switchEl).toBeInTheDocument()
  })

  it('is unchecked by default', () => {
    render(<Switch />)
    const switchEl = screen.getByRole('switch')
    expect(switchEl).toHaveAttribute('data-state', 'unchecked')
  })

  it('toggles on click', async () => {
    const user = userEvent.setup()
    render(<Switch />)

    const switchEl = screen.getByRole('switch')
    expect(switchEl).toHaveAttribute('data-state', 'unchecked')

    await user.click(switchEl)
    expect(switchEl).toHaveAttribute('data-state', 'checked')

    await user.click(switchEl)
    expect(switchEl).toHaveAttribute('data-state', 'unchecked')
  })

  it('calls onCheckedChange when toggled', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Switch onCheckedChange={handleChange} />)

    const switchEl = screen.getByRole('switch')
    await user.click(switchEl)

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('can be disabled', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Switch disabled onCheckedChange={handleChange} />)

    const switchEl = screen.getByRole('switch')
    expect(switchEl).toBeDisabled()

    await user.click(switchEl)
    expect(handleChange).not.toHaveBeenCalled()
    expect(switchEl).toHaveAttribute('data-state', 'unchecked')
  })

  it('can be initially checked', () => {
    render(<Switch defaultChecked />)
    const switchEl = screen.getByRole('switch')
    expect(switchEl).toHaveAttribute('data-state', 'checked')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Switch ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('applies custom className', () => {
    render(<Switch className="custom-switch" />)
    const switchEl = screen.getByRole('switch')
    expect(switchEl).toHaveClass('custom-switch')
  })
})
