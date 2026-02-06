import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from './Select'

function renderSelect() {
  return render(
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Pick" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Option A</SelectItem>
        <SelectItem value="b">Option B</SelectItem>
        <SelectItem value="c">Option C</SelectItem>
      </SelectContent>
    </Select>
  )
}

describe('Select', () => {
  it('renders the select trigger with placeholder', () => {
    renderSelect()
    const trigger = screen.getByRole('combobox')
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveTextContent('Pick')
  })

  it('opens dropdown on click and shows options', async () => {
    const user = userEvent.setup()
    renderSelect()

    const trigger = screen.getByRole('combobox')

    // Focus then use keyboard to open (more reliable than click in jsdom for Radix Select)
    await user.click(trigger)

    // Radix Select renders options in a portal
    const optionA = await screen.findByRole('option', { name: 'Option A' })
    const optionB = await screen.findByRole('option', { name: 'Option B' })
    const optionC = await screen.findByRole('option', { name: 'Option C' })

    expect(optionA).toBeInTheDocument()
    expect(optionB).toBeInTheDocument()
    expect(optionC).toBeInTheDocument()
  })

  it('selects an option when clicked', async () => {
    const user = userEvent.setup()
    renderSelect()

    const trigger = screen.getByRole('combobox')
    await user.click(trigger)

    const optionA = await screen.findByRole('option', { name: 'Option A' })
    await user.click(optionA)

    // After selection, the trigger should display the selected value
    expect(trigger).toHaveTextContent('Option A')
  })

  it('applies custom className to trigger', () => {
    render(
      <Select>
        <SelectTrigger className="custom-trigger">
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
        </SelectContent>
      </Select>
    )

    const trigger = screen.getByRole('combobox')
    expect(trigger).toHaveClass('custom-trigger')
  })

  it('renders with a default value', () => {
    render(
      <Select defaultValue="b">
        <SelectTrigger>
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
          <SelectItem value="b">Option B</SelectItem>
        </SelectContent>
      </Select>
    )

    const trigger = screen.getByRole('combobox')
    expect(trigger).toHaveTextContent('Option B')
  })

  it('opens with the open prop', () => {
    render(
      <Select open>
        <SelectTrigger>
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
          <SelectItem value="b">Option B</SelectItem>
        </SelectContent>
      </Select>
    )

    // When open prop is true, options should be visible
    expect(screen.getByRole('option', { name: 'Option A' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Option B' })).toBeInTheDocument()
  })
})
