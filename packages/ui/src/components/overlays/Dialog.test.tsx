import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './Dialog'

describe('Dialog', () => {
  it('renders trigger and opens on click', async () => {
    const user = userEvent.setup()
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog description text</DialogDescription>
        </DialogContent>
      </Dialog>
    )

    expect(screen.getByRole('button', { name: /open dialog/i })).toBeInTheDocument()
    expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /open dialog/i }))
    expect(screen.getByText('Dialog Title')).toBeInTheDocument()
  })

  it('renders content when open', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Visible Title</DialogTitle>
          <DialogDescription>Visible description</DialogDescription>
        </DialogContent>
      </Dialog>
    )

    expect(screen.getByText('Visible Title')).toBeInTheDocument()
    expect(screen.getByText('Visible description')).toBeInTheDocument()
  })

  it('closes on close button click', async () => {
    const user = userEvent.setup()
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <DialogClose>Close Dialog</DialogClose>
        </DialogContent>
      </Dialog>
    )

    await user.click(screen.getByRole('button', { name: /open/i }))
    expect(screen.getByText('Title')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /close dialog/i }))
    expect(screen.queryByText('Title')).not.toBeInTheDocument()
  })

  it('renders title and description', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>My Title</DialogTitle>
          <DialogDescription>My Description</DialogDescription>
        </DialogContent>
      </Dialog>
    )

    expect(screen.getByText('My Title')).toBeInTheDocument()
    expect(screen.getByText('My Description')).toBeInTheDocument()
  })
})
