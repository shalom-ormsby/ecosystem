import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { createRef } from 'react'
import { Input } from './Input'

describe('Input', () => {
  it('renders input element', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
    expect(input.tagName).toBe('INPUT')
  })

  it('applies custom className', () => {
    render(<Input className="custom-input" placeholder="styled" />)
    const input = screen.getByPlaceholderText('styled')
    expect(input).toHaveClass('custom-input')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Input ref={ref} placeholder="ref test" />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('handles controlled input', async () => {
    const user = userEvent.setup()
    render(<Input placeholder="type here" />)
    const input = screen.getByPlaceholderText('type here')

    await user.type(input, 'Hello World')
    expect(input).toHaveValue('Hello World')
  })

  it('handles different types', () => {
    const { rerender } = render(<Input type="password" placeholder="password" />)
    expect(screen.getByPlaceholderText('password')).toHaveAttribute('type', 'password')

    rerender(<Input type="email" placeholder="email" />)
    expect(screen.getByPlaceholderText('email')).toHaveAttribute('type', 'email')

    rerender(<Input type="number" placeholder="number" />)
    expect(screen.getByPlaceholderText('number')).toHaveAttribute('type', 'number')
  })
})
