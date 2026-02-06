import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion'

describe('Accordion', () => {
  const renderAccordion = () =>
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content for section 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content for section 2</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Section 3</AccordionTrigger>
          <AccordionContent>Content for section 3</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

  it('renders accordion items', () => {
    renderAccordion()
    expect(screen.getByText('Section 1')).toBeInTheDocument()
    expect(screen.getByText('Section 2')).toBeInTheDocument()
    expect(screen.getByText('Section 3')).toBeInTheDocument()
  })

  it('expands item on click', async () => {
    const user = userEvent.setup()
    renderAccordion()

    const trigger = screen.getByText('Section 1')
    await user.click(trigger)

    expect(screen.getByText('Content for section 1')).toBeVisible()
  })

  it('collapses when another item is clicked (single mode)', async () => {
    const user = userEvent.setup()
    renderAccordion()

    await user.click(screen.getByText('Section 1'))
    expect(screen.getByText('Content for section 1')).toBeVisible()

    await user.click(screen.getByText('Section 2'))
    expect(screen.getByText('Content for section 2')).toBeVisible()

    // In single mode, the first item's content should be hidden
    // Radix adds hidden attribute which removes from accessible tree
    const item1Content = screen.queryByText('Content for section 1')
    if (item1Content) {
      expect(item1Content).not.toBeVisible()
    }
  })

  it('shows chevron icon', () => {
    renderAccordion()
    // The AccordionTrigger renders a ChevronDown SVG icon
    const svgs = document.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThanOrEqual(3) // One chevron per accordion item
  })
})
