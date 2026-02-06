import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { createRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './Card'

describe('Card', () => {
  it('renders with children', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders CardHeader, CardTitle, CardContent, and CardFooter', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>My Title</CardTitle>
        </CardHeader>
        <CardContent>Body text</CardContent>
        <CardFooter>Footer text</CardFooter>
      </Card>
    )

    expect(screen.getByText('My Title')).toBeInTheDocument()
    expect(screen.getByText('Body text')).toBeInTheDocument()
    expect(screen.getByText('Footer text')).toBeInTheDocument()
  })

  it('renders CardTitle as an h3 element', () => {
    render(<CardTitle>Heading</CardTitle>)
    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Heading')
  })

  it('applies default variant classes', () => {
    const { container } = render(<Card>Default</Card>)
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('bg-surface')
    expect(card).toHaveClass('border-border')
  })

  it('applies glass variant classes', () => {
    const { container } = render(<Card variant="glass">Glass</Card>)
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('bg-glass')
    expect(card).toHaveClass('backdrop-blur-md')
  })

  it('applies outline variant classes', () => {
    const { container } = render(<Card variant="outline">Outline</Card>)
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('bg-transparent')
    expect(card).toHaveClass('border-border')
  })

  it('applies hover effect classes when hoverEffect is true', () => {
    const { container } = render(<Card hoverEffect>Hover</Card>)
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('hover:shadow-lg')
    expect(card).toHaveClass('hover:-translate-y-1')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Card ref={ref}>Ref Card</Card>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('applies custom className', () => {
    const { container } = render(<Card className="my-custom">Custom</Card>)
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('my-custom')
  })

  it('forwards ref on CardHeader', () => {
    const ref = createRef<HTMLDivElement>()
    render(<CardHeader ref={ref}>Header</CardHeader>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('forwards ref on CardContent', () => {
    const ref = createRef<HTMLDivElement>()
    render(<CardContent ref={ref}>Content</CardContent>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('forwards ref on CardFooter', () => {
    const ref = createRef<HTMLDivElement>()
    render(<CardFooter ref={ref}>Footer</CardFooter>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
