import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { createRef } from 'react'
import { Progress } from './Progress'

describe('Progress', () => {
  it('renders the progress bar', () => {
    render(<Progress value={50} />)
    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toBeInTheDocument()
  })

  it('has a max value of 100 by default', () => {
    render(<Progress value={50} />)
    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveAttribute('data-max', '100')
  })

  it('shows indicator with correct transform based on value', () => {
    render(<Progress value={60} />)
    const progressbar = screen.getByRole('progressbar')
    // The indicator is the child inside the progress root
    const indicator = progressbar.firstElementChild as HTMLElement
    expect(indicator).toBeInTheDocument()
    expect(indicator.style.transform).toBe('translateX(-40%)')
  })

  it('shows indicator at 0% when value is 0', () => {
    render(<Progress value={0} />)
    const progressbar = screen.getByRole('progressbar')
    const indicator = progressbar.firstElementChild as HTMLElement
    expect(indicator.style.transform).toBe('translateX(-100%)')
  })

  it('shows indicator at 100% when value is 100', () => {
    render(<Progress value={100} />)
    const progressbar = screen.getByRole('progressbar')
    const indicator = progressbar.firstElementChild as HTMLElement
    expect(indicator.style.transform).toBe('translateX(-0%)')
  })

  it('defaults to 0 when no value is provided', () => {
    render(<Progress />)
    const progressbar = screen.getByRole('progressbar')
    const indicator = progressbar.firstElementChild as HTMLElement
    expect(indicator.style.transform).toBe('translateX(-100%)')
  })

  it('applies custom className', () => {
    render(<Progress value={50} className="custom-progress" />)
    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveClass('custom-progress')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Progress ref={ref} value={50} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
