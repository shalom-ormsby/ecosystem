import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs'

describe('Tabs', () => {
  const renderTabs = (defaultValue = 'tab1') =>
    render(
      <Tabs defaultValue={defaultValue}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content for tab 1</TabsContent>
        <TabsContent value="tab2">Content for tab 2</TabsContent>
        <TabsContent value="tab3">Content for tab 3</TabsContent>
      </Tabs>
    )

  it('renders tabs with content', () => {
    renderTabs()
    expect(screen.getByRole('tab', { name: /tab 1/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /tab 2/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /tab 3/i })).toBeInTheDocument()
    expect(screen.getByText('Content for tab 1')).toBeInTheDocument()
  })

  it('switches content on tab click', async () => {
    const user = userEvent.setup()
    renderTabs()

    expect(screen.getByText('Content for tab 1')).toBeInTheDocument()
    expect(screen.queryByText('Content for tab 2')).not.toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: /tab 2/i }))
    expect(screen.queryByText('Content for tab 1')).not.toBeInTheDocument()
    expect(screen.getByText('Content for tab 2')).toBeInTheDocument()
  })

  it('defaults to first tab', () => {
    renderTabs('tab1')
    const tab1 = screen.getByRole('tab', { name: /tab 1/i })
    expect(tab1).toHaveAttribute('data-state', 'active')
    expect(screen.getByText('Content for tab 1')).toBeInTheDocument()
  })
})
