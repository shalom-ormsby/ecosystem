import { Code, Link, Spinner, ProgressBar, Switch } from '@sage/ui';
import { Home, Search, Settings, User } from 'lucide-react';
import {
  // Phase 1 & 2 components
  Label, Input, Alert, AlertDescription, AlertTitle, Avatar, AvatarImage, AvatarFallback, Button, Card, Badge, Checkbox, Combobox, Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, DataTable, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Popover, PopoverAnchor, PopoverContent, PopoverTrigger, RadioGroup, RadioGroupItem, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Separator, ScrollArea, Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, Skeleton, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, Textarea, Toaster, ToastProvider, useToast,
  // Phase 3 Batch 1
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
  Collapsible, CollapsibleTrigger, CollapsibleContent,
  HoverCard, HoverCardTrigger, HoverCardContent,
  Tooltip, TooltipTrigger, TooltipContent, TooltipProvider,
  // Phase 3 Batch 2
  Slider,
  Toggle,
  ToggleGroup, ToggleGroupItem,
  AspectRatio,
  Progress,
  // Phase 3 Batch 3
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis,
  ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuGroup, ContextMenuPortal, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuRadioGroup,
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarShortcut, MenubarGroup, MenubarPortal, MenubarSub, MenubarRadioGroup,
  NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuIndicator, NavigationMenuViewport, navigationMenuTriggerStyle,
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
  // Phase 3 Batch 4
  Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription,
  Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext,
  Calendar,
  DatePicker,
  // Phase 3 Batch 5
  InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator,
  ResizablePanelGroup, ResizablePanel, ResizableHandle,
  Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarItem,
} from '@sage/ui';

export interface PropConfig {
  type: 'select' | 'boolean' | 'text' | 'array' | 'object' | 'interface' | 'custom';
  options?: readonly string[];
  default: any;
  description?: string;
  // For displaying complex TypeScript types
  typeDefinition?: string; // e.g., "BreadcrumbItem[]", "{ id: string; label: string }[]"
  required?: boolean; // Mark required props with visual indicator
}

export interface ComponentConfig {
  component: React.ComponentType<any>;
  description: string;
  props: Record<string, PropConfig>;
  examples: Array<{
    label: string;
    props: Record<string, any>;
    children?: React.ReactNode;
  }>;
  // Code examples with CollapsibleCodeBlock
  codeExamples?: Array<{
    title: string;
    code: string;
    description?: string;
  }>;
  // GitHub source link for LLM navigation
  sourceUrl?: string;
  // Accessibility notes for documenting a11y features
  accessibilityNotes?: string[];
}

export const componentRegistry: Record<string, ComponentConfig> = {
  Alert: {
    component: Alert,
    description: 'Displays a callout for user attention. Supports default and destructive variants with optional icon, title, and description.',
    props: {
      variant: {
        type: 'select',
        options: ['default', 'destructive'] as const,
        default: 'default',
        description: 'Visual style variant - default for informational alerts, destructive for errors or warnings',
      },
    },
    examples: [
      {
        label: 'Default',
        props: { variant: 'default' },
        children: (
          <>
            <AlertTitle className="">Heads up!</AlertTitle>
            <AlertDescription className="">
              You can add components to your app using the cli.
            </AlertDescription>
          </>
        ),
      },
      {
        label: 'Destructive',
        props: { variant: 'destructive' },
        children: (
          <>
            <AlertTitle className="">Error</AlertTitle>
            <AlertDescription className="">
              Your session has expired. Please log in again.
            </AlertDescription>
          </>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Alert, AlertDescription, AlertTitle } from '@sage/ui';

<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>`,
        description: 'Simple informational alert with title and description',
      },
      {
        title: 'Destructive Variant',
        code: `import { Alert, AlertDescription, AlertTitle } from '@sage/ui';

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>`,
        description: 'Error alert using destructive variant',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Alert.tsx',
    accessibilityNotes: [
      'Uses role="alert" for screen reader announcements',
      'WCAG 2.1 AA compliant color contrast',
      'Keyboard accessible',
      'Supports both title and description for complete context',
    ],
  },

  Avatar: {
    component: Avatar,
    description: 'An image element with a fallback for representing the user. Migrated to @sage/ui.',
    props: {
      className: {
        type: 'text',
        default: '',
        description: 'Additional CSS classes',
      },
    },
    examples: [
      {
        label: 'Default',
        props: {},
        children: (
          <>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </>
        ),
      },
      {
        label: 'Fallback',
        props: {},
        children: (
          <>
            <AvatarImage src="/broken-image.jpg" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Avatar, AvatarFallback, AvatarImage } from "@sage/ui"

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`,
        description: 'Avatar with image and fallback',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Avatar.tsx',
  },

  Button: {
    component: Button,
    description: 'Interactive button component with multiple variants, sizes, and states. Built with Radix UI primitives for accessibility.',
    props: {
      variant: {
        type: 'select',
        options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const,
        default: 'default',
        description: 'Visual style variant - default for primary actions, destructive for dangerous actions, outline for secondary emphasis, secondary for alternative actions, ghost for subtle actions, link for text-style links',
      },
      size: {
        type: 'select',
        options: ['sm', 'default', 'lg', 'icon'] as const,
        default: 'default',
        description: 'Size variant - sm (h-8) for compact spaces, default (h-9) for standard use, lg (h-10) for prominent actions, icon (h-9 w-9) for icon-only buttons',
      },
      disabled: {
        type: 'boolean',
        default: false,
        description: 'Disable button interaction and show disabled state',
      },
    },
    examples: [
      { label: 'Default', props: { variant: 'default', size: 'default' }, children: 'Default' },
      { label: 'Destructive', props: { variant: 'destructive', size: 'default' }, children: 'Destructive' },
      { label: 'Outline', props: { variant: 'outline', size: 'default' }, children: 'Outline' },
      { label: 'Secondary', props: { variant: 'secondary', size: 'default' }, children: 'Secondary' },
      { label: 'Ghost', props: { variant: 'ghost', size: 'default' }, children: 'Ghost' },
      { label: 'Link', props: { variant: 'link', size: 'default' }, children: 'Link' },
      { label: 'Small', props: { variant: 'default', size: 'sm' }, children: 'Small' },
      { label: 'Large', props: { variant: 'default', size: 'lg' }, children: 'Large' },
      { label: 'Disabled', props: { variant: 'default', size: 'default', disabled: true }, children: 'Disabled' },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Button } from '@sage/ui';

<Button variant="default" onClick={() => console.log('Clicked!')}>
  Click Me
</Button>`,
        description: 'Simple button with click handler',
      },
      {
        title: 'All Variants',
        code: `import { Button } from '@sage/ui';

<div className="flex gap-3">
  <Button variant="default">Default</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</div>`,
        description: 'Showcase of all button variants',
      },
      {
        title: 'Sizes',
        code: `import { Button } from '@sage/ui';

<div className="flex items-center gap-3">
  <Button size="sm">Small</Button>
  <Button size="default">Default</Button>
  <Button size="lg">Large</Button>
</div>`,
        description: 'All available button sizes',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Button.tsx',
    accessibilityNotes: [
      'Uses semantic <button> element for proper keyboard and screen reader support',
      'focus-visible outline ensures visible focus ring only for keyboard navigation',
      'Loading spinner has aria-hidden="true" to prevent screen reader announcement',
      'disabled state properly conveyed to assistive technologies',
      'Extends native HTMLButtonElement, inheriting all standard ARIA attributes',
      'Supports focus management with React.forwardRef',
    ],
  },

  Card: {
    component: Card,
    description: 'Container component with standard and glass-morphism styling. Migrated to @sage/ui.',
    props: {
      variant: {
        type: 'select',
        options: ['default', 'glass', 'outline'] as const,
        default: 'default',
        description: 'Visual style variant',
      },
      hoverEffect: {
        type: 'boolean',
        default: false,
        description: 'Enable hover lift and shadow effect for interactive cards',
      },
    },
    examples: [
      {
        label: 'Default',
        props: { variant: 'default', hoverEffect: false },
        children: 'Standard Card',
      },
      {
        label: 'Glass',
        props: { variant: 'glass', hoverEffect: false },
        children: 'Glass Effect Card',
      },
      {
        label: 'Outline',
        props: { variant: 'outline', hoverEffect: false },
        children: 'Outline Card',
      },
      {
        label: 'With Content',
        props: { variant: 'default', hoverEffect: false },
        children: (
          <div className="p-4">
            <h3 className="font-bold mb-2">Card Title</h3>
            <p className="text-sm text-gray-500">Card description goes here.</p>
          </div>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Card } from '@sage/ui';

<Card>
  <p>Your content goes here</p>
</Card>`,
        description: 'Simple card container',
      },
      {
        title: 'Glass Variant',
        code: `<Card variant="glass" className="p-6">
  <h3 className="text-lg font-semibold mb-2">Glass Card</h3>
  <p className="text-muted-foreground">
    This card uses backdrop-blur and semi-transparent background.
  </p>
</Card>`,
        description: 'Using the glass variant for premium visuals',
      },
      {
        title: 'Interactive Card Grid',
        code: `<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {features.map((feature) => (
    <Card
      key={feature.id}
      hoverEffect={true}
      className="p-6 cursor-pointer"
      onClick={() => handleFeatureClick(feature.id)}
    >
      <h3 className="font-semibold mb-2">{feature.title}</h3>
      <p className="text-sm text-muted-foreground">
        {feature.description}
      </p>
    </Card>
  ))}
</div>`,
        description: 'Grid of interactive cards with click handlers',
      },
      {
        title: 'Structured Content',
        code: `import { Card, CardHeader, CardTitle, CardContent } from '@sage/ui';

<Card>
  <CardHeader>
    <CardTitle>Notifications</CardTitle>
  </CardHeader>
  <CardContent>
    You have 3 unread messages.
  </CardContent>
</Card>`,
        description: 'Using subcomponents for structured layout',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/atoms/Card/Card.tsx',
  },

  Dialog: {
    component: Dialog,
    description: 'A modal dialog that interrupts the user with important content and expects a response. Replaces the legacy Modal component with Radix UI primitives for enhanced accessibility.',
    props: {
      open: {
        type: 'boolean',
        default: false,
        description: 'Controls the open state of the dialog',
      },
    },
    examples: [
      {
        label: 'Basic Dialog',
        props: {},
        children: (
          <>
            <DialogTrigger asChild>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader className="">
                <DialogTitle className="">Are you absolutely sure?</DialogTitle>
                <DialogDescription className="">
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="">
                <Button variant="outline">Cancel</Button>
                <Button variant="destructive">Delete Account</Button>
              </DialogFooter>
            </DialogContent>
          </>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@sage/ui';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description goes here.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
        description: 'Simple dialog with trigger button',
      },
      {
        title: 'Confirmation Dialog',
        code: `import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Button } from '@sage/ui';

<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">Delete Account</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your
        account and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete Account</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
        description: 'Confirmation dialog with footer actions',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Dialog.tsx',
    accessibilityNotes: [
      'Built on Radix UI Dialog primitive with full ARIA support',
      'Focus automatically trapped within dialog when open',
      'Escape key closes the dialog',
      'Click outside closes the dialog',
      'Prevents scrolling of background content when open',
      'Properly announces to screen readers with role="dialog"',
    ],
  },

  Code: {
    component: Code,
    description: 'A semantic code wrapper with enhanced visual styling and automatic syntax highlighting. Features distinct treatments for inline (pale amber background) vs block code (cool gray background with copy-on-hover). Accessible contrast ratios (WCAG AA 4.5:1).',
    props: {
      inline: {
        type: 'boolean',
        default: false,
        description: 'Render as inline code (true) or block code (false)',
      },
      showCopy: {
        type: 'boolean',
        default: true,
        description: 'Show copy button for block code (appears on hover)',
      },
    },
    examples: [
      { label: 'Plain Text', props: { syntax: 'plain', inline: true }, children: 'example' },
      { label: 'Keyword', props: { syntax: 'keyword', inline: true }, children: 'const' },
      { label: 'Function', props: { syntax: 'function', inline: true }, children: 'useState()' },
      { label: 'String', props: { syntax: 'string', inline: true }, children: '"Hello World"' },
      { label: 'Number', props: { syntax: 'number', inline: true }, children: '42' },
      { label: 'Boolean', props: { syntax: 'boolean', inline: true }, children: 'true' },
      { label: 'Property', props: { syntax: 'property', inline: true }, children: 'backgroundColor' },
      { label: 'Class Name', props: { syntax: 'className', inline: true }, children: 'MyComponent' },
      { label: 'Comment', props: { syntax: 'comment', inline: true }, children: '// This is a comment' },
      { label: 'Block Code', props: { syntax: 'plain', inline: false }, children: 'const greeting = "Hello World";\nconsole.log(greeting);' },
      { label: 'Block with Copy', props: { syntax: 'keyword', inline: false, showCopy: true }, children: 'import { useState } from "react";' },
      { label: 'Block No Copy', props: { syntax: 'string', inline: false, showCopy: false }, children: '"No copy button on this block"' },
    ],
    codeExamples: [
      {
        title: 'Inline Code',
        code: `import { Code } from '@sage/ui';

<p>
  Use the <Code syntax="keyword">useState</Code> hook to manage component state.
</p>`,
        description: 'Inline code for variables, functions, or keywords within text',
      },
      {
        title: 'Syntax Highlighting',
        code: `<p>
  The <Code syntax="function">map()</Code> method creates a new array with results
  of calling <Code syntax="keyword">function</Code> for every element.
</p>`,
        description: 'Different syntax highlighting for different code types',
      },
      {
        title: 'Block Code',
        code: `<Code inline={false} showCopy={true}>
  {(\`const greeting = "Hello World";
console.log(greeting);\`)}
</Code>`,
        description: 'Block code with copy button for multi-line snippets',
      },
      {
        title: 'Code in Documentation',
        code: `<div className="space-y-2">
  <p>Import the component:</p>
  <Code inline={false} syntax="keyword">
    import {{ Button }} from '@sage/ui';
  </Code>

  <p>Then use it with <Code syntax="property">variant</Code> prop.</p>
</div>`,
        description: 'Combining inline and block code in documentation',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/atoms/Code/Code.tsx',
  },

  Link: {
    component: Link,
    description: 'Theme-aware link component with multiple style variants. Supports standalone and inline text link styles with accessible focus states.',
    props: {
      variant: {
        type: 'select',
        options: ['default', 'inline'] as const,
        default: 'default',
        description: 'Visual style variant: default for standalone links with background hover, inline for underlined text links',
      },
      hoverEffect: {
        type: 'boolean',
        default: true,
        description: 'Enable hover effect (only applies to default variant)',
      },
    },
    examples: [
      {
        label: 'Default',
        props: { variant: 'default', href: '#' },
        children: 'Default Link',
      },
      {
        label: 'Default No Hover',
        props: { variant: 'default', hoverEffect: false, href: '#' },
        children: 'No Hover Effect',
      },
      {
        label: 'Inline',
        props: { variant: 'inline', href: '#' },
        children: 'Inline Link',
      },
      {
        label: 'Inline in Text',
        props: { variant: 'inline', href: '#' },
        children: (
          <span className="text-[var(--color-text-secondary)]">
            This is some text with an <Link variant="inline" href="#">inline link</Link> embedded in it.
          </span>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Link } from '@sage/ui';

<Link href="/about">Learn More</Link>`,
        description: 'Simple link with default styling',
      },
      {
        title: 'Inline Text Links',
        code: `<p className="text-[var(--color-text-secondary)]">
  Check out our{' '}
  <Link variant="inline" href="/docs">
    documentation
  </Link>{' '}
  to learn more about the features.
</p>`,
        description: 'Links embedded within text paragraphs',
      },
      {
        title: 'External Links',
        code: `<Link
  href="https://github.com/your-repo"
  target="_blank"
  rel="noopener noreferrer"
>
  View on GitHub
</Link>`,
        description: 'Opening links in a new tab with security attributes',
      },
      {
        title: 'Navigation Menu',
        code: `<nav className="flex gap-4">
  {['Home', 'About', 'Services', 'Contact'].map((item) => (
    <Link
      key={item}
      href={\`/\${item.toLowerCase()}\`}
      variant="default"
    >
      {item}
    </Link>
  ))}
</nav>`,
        description: 'Using links in navigation menus',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/atoms/Link/Link.tsx',
  },

  Badge: {
    component: Badge,
    description: 'A small label for displaying status, counts, or categorization. Migrated to @sage/ui.',
    props: {
      variant: {
        type: 'select',
        options: ['default', 'secondary', 'destructive', 'outline', 'success', 'warning', 'error', 'info'] as const,
        default: 'default',
        description: 'Visual variant of the badge',
      },
      size: {
        type: 'select',
        options: ['sm', 'md', 'lg'] as const,
        default: 'md',
        description: 'Size of the badge',
      },
      dot: {
        type: 'boolean',
        default: false,
        description: 'Show animated dot indicator',
      },
    },
    examples: [
      { label: 'Default', props: { variant: 'default', size: 'md' }, children: 'Default' },
      { label: 'Secondary', props: { variant: 'secondary', size: 'md' }, children: 'Secondary' },
      { label: 'Destructive', props: { variant: 'destructive', size: 'md' }, children: 'Destructive' },
      { label: 'Outline', props: { variant: 'outline', size: 'md' }, children: 'Outline' },
      { label: 'Success', props: { variant: 'success', size: 'md', dot: true }, children: 'On track' },
      { label: 'Warning', props: { variant: 'warning', size: 'md', dot: true }, children: 'At risk' },
      { label: 'Error', props: { variant: 'error', size: 'md', dot: true }, children: 'Blocked' },
      { label: 'Info', props: { variant: 'info', size: 'md', dot: true }, children: 'In progress' },
    ],
    codeExamples: [
      {
        title: 'Status Badges',
        code: `import { Badge } from '@sage/ui';

<div className="flex gap-2">
  <Badge variant="success">Active</Badge>
  <Badge variant="warning">Pending</Badge>
  <Badge variant="error">Failed</Badge>
  <Badge variant="info">Info</Badge>
</div>`,
        description: 'Different status indicators using semantic color variants',
      },
      {
        title: 'Notification Counts',
        code: `<div className="flex items-center gap-2">
  <span>Inbox</span>
  <Badge variant="default" size="sm">99+</Badge>
</div>

<div className="flex items-center gap-2">
  <span>Notifications</span>
  <Badge variant="destructive" size="sm">3</Badge>
</div>`,
        description: 'Badge for displaying notification or message counts',
      },
      {
        title: 'Live Indicator',
        code: `<Badge variant="success" dot={true}>
  Live Stream
</Badge>`,
        description: 'Animated dot indicator for live or active states',
      },
      {
        title: 'Category Tags',
        code: `<div className="flex flex-wrap gap-2">
  {['React', 'TypeScript', 'TailwindCSS'].map((tag) => (
    <Badge key={tag} variant="secondary">
      {tag}
    </Badge>
  ))}
</div>`,
        description: 'Using badges as category or technology tags',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Badge.tsx',
  },

  Sidebar: {
    component: Sidebar,
    description: 'A composable, responsive sidebar component with support for nested navigation, headers, and footers. Handles expanded state and active items automatically.',
    props: {
      isOpen: {
        type: 'boolean',
        default: true,
        description: 'Whether the sidebar is expanded (mobile) or visible',
      },
      className: {
        type: 'text',
        default: '!relative !top-auto !left-auto !h-[500px] w-full max-w-[280px] border-r shadow-none',
        description: 'Additional CSS classes. Use "!relative" to force containment within a layout if needed.',
      },
    },
    examples: [
      {
        label: 'Basic Sidebar',
        props: {
          className: '!relative !top-auto !left-auto h-[400px] w-[260px] border rounded-lg overflow-hidden',
        },
        children: (
          <>
            <SidebarHeader>
              <div className="px-2 font-bold text-lg">My App</div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarItem isActive>Overview</SidebarItem>
              <SidebarItem>Analytics</SidebarItem>
              <SidebarItem>Settings</SidebarItem>
            </SidebarContent>
            <SidebarFooter>
              <SidebarItem>Logout</SidebarItem>
            </SidebarFooter>
          </>
        ),
      },
      {
        label: 'Nested Navigation',
        props: {
          className: '!relative !top-auto !left-auto h-[400px] w-[260px] border rounded-lg overflow-hidden',
        },
        children: (
          <SidebarContent>
            <SidebarItem>Dashboard</SidebarItem>
            <SidebarItem hasChildren isExpanded>
              Projects
            </SidebarItem>
            <SidebarItem depth={1} isActive>Project A</SidebarItem>
            <SidebarItem depth={1}>Project B</SidebarItem>
            <SidebarItem>Team</SidebarItem>
          </SidebarContent>
        ),
      },
      {
        label: 'With Icons',
        props: {
          className: '!relative !top-auto !left-auto h-[400px] w-[260px] border rounded-lg overflow-hidden',
        },
        children: (
          <SidebarContent>
            <SidebarItem icon={<Home className="w-4 h-4" />}>Home</SidebarItem>
            <SidebarItem icon={<Search className="w-4 h-4" />}>Search</SidebarItem>
            <SidebarItem icon={<Settings className="w-4 h-4" />}>Settings</SidebarItem>
          </SidebarContent>
        ),
      },
      {
        label: 'Interactive Group',
        props: {
          className: '!relative !top-auto !left-auto h-[400px] w-[260px] border rounded-lg overflow-hidden',
        },
        children: (
          /* note: this is a static example, real interactivity requires state */
          <SidebarContent>
            <SidebarItem>Dashboard</SidebarItem>
            <SidebarItem hasChildren isExpanded>
              Collections
            </SidebarItem>
            <SidebarItem depth={1} isActive>Favorites</SidebarItem>
            <SidebarItem depth={1}>Recent</SidebarItem>

            <SidebarItem hasChildren={true} isExpanded={false}>
              Archives
            </SidebarItem>
          </SidebarContent>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Structure',
        code: `import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarItem } from '@sage/ui';
import { Home, Settings, User } from 'lucide-react';

export default function AppSidebar() {
  return (
    <Sidebar className="fixed left-0 top-0 h-screen w-64 border-r">
      <SidebarHeader>
        <h2>App Name</h2>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarItem icon={<Home className="w-4 h-4" />} isActive>Dashboard</SidebarItem>
        <SidebarItem icon={<Settings className="w-4 h-4" />}>Settings</SidebarItem>
      </SidebarContent>

      <SidebarFooter>
        <SidebarItem icon={<User className="w-4 h-4" />}>Profile</SidebarItem>
      </SidebarFooter>
    </Sidebar>
  );
}`,
        description: 'Standard layout with header, content area, and footer.',
      },
      {
        title: 'Nested Items',
        code: `<SidebarContent>
  <SidebarItem hasChildren isExpanded>
    Collections
  </SidebarItem>
  <SidebarItem depth={1}>Nature</SidebarItem>
  <SidebarItem depth={1}>Architecture</SidebarItem>
</SidebarContent>`,
        description: 'Using the depth prop to create visual hierarchy for nested navigation.',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/layout/Sidebar.tsx',
    accessibilityNotes: [
      'Uses semantically correct <aside> element for the root container.',
      'Navigation items use <button> or Slot for keyboard interaction.',
      'Supports explicit state management for expanded/collapsed sections.',
    ],
  },

  Spinner: {
    component: Spinner,
    description: 'A loading indicator with smooth animation that respects motion preferences.',
    props: {
      size: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl'] as const,
        default: 'md',
        description: 'Size of the spinner',
      },
      variant: {
        type: 'select',
        options: ['primary', 'secondary', 'inherit'] as const,
        default: 'primary',
        description: 'Color variant',
      },
    },
    examples: [
      { label: 'Default', props: { size: 'md', variant: 'primary' }, children: null },
      { label: 'Secondary', props: { size: 'md', variant: 'secondary' }, children: null },
      { label: 'Small', props: { size: 'sm', variant: 'primary' }, children: null },
      { label: 'Large', props: { size: 'lg', variant: 'primary' }, children: null },
    ],
    codeExamples: [
      {
        title: 'Basic Loading State',
        code: `import { Spinner } from '@sage/ui';

<div className="flex justify-center p-8">
  <Spinner />
</div>`,
        description: 'Simple centered loading spinner',
      },
      {
        title: 'Inline with Text',
        code: `<button disabled className="flex items-center gap-2">
  <Spinner size="sm" variant="inherit" />
  Loading...
</button>`,
        description: 'Small spinner inline with button text',
      },
      {
        title: 'Different Sizes',
        code: `<div className="flex items-center gap-4">
  <Spinner size="xs" />
  <Spinner size="sm" />
  <Spinner size="md" />
  <Spinner size="lg" />
  <Spinner size="xl" />
</div>`,
        description: 'Spinner in all available sizes',
      },
      {
        title: 'Loading Overlay',
        code: `<div className="relative min-h-[200px]">
  {isLoading && (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-background)]/80 backdrop-blur-sm">
      <Spinner size="lg" />
    </div>
  )}
  <YourContent />
</div>`,
        description: 'Spinner as loading overlay for content area',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/atoms/Spinner/Spinner.tsx',
  },

  ProgressBar: {
    component: ProgressBar,
    description: 'A visual indicator of progress or completion with determinate and indeterminate modes.',
    props: {
      variant: {
        type: 'select',
        options: ['primary', 'success', 'warning', 'error', 'info'] as const,
        default: 'primary',
        description: 'Color variant',
      },
      size: {
        type: 'select',
        options: ['sm', 'md', 'lg'] as const,
        default: 'md',
        description: 'Size of the progress bar',
      },
      showLabel: {
        type: 'boolean',
        default: false,
        description: 'Show percentage label',
      },
    },
    examples: [
      { label: '25% Progress', props: { value: 25, variant: 'primary', size: 'md' }, children: null },
      { label: '50% with Label', props: { value: 50, variant: 'primary', size: 'md', showLabel: true }, children: null },
      { label: '75% Success', props: { value: 75, variant: 'success', size: 'md' }, children: null },
      { label: '100% Complete', props: { value: 100, variant: 'success', size: 'md', showLabel: true }, children: null },
      { label: 'Warning', props: { value: 40, variant: 'warning', size: 'md' }, children: null },
    ],
    codeExamples: [
      {
        title: 'Upload Progress',
        code: `import { ProgressBar } from '@sage/ui';

const [uploadProgress, setUploadProgress] = useState(0);

<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Uploading file.pdf</span>
    <span>{uploadProgress}%</span>
  </div>
  <ProgressBar value={uploadProgress} variant="default" showLabel={false} />
</div>`,
        description: 'Progress bar for file upload with custom label',
      },
      {
        title: 'Task Completion',
        code: `<div className="space-y-4">
  <div>
    <p className="text-sm mb-1">Profile Complete</p>
    <ProgressBar value={75} variant="success" showLabel={true} />
  </div>

  <div>
    <p className="text-sm mb-1">Storage Used</p>
    <ProgressBar value={85} variant="warning" showLabel={true} />
  </div>
</div>`,
        description: 'Multiple progress indicators with labels',
      },
      {
        title: 'Status Variants',
        code: `<div className="space-y-3">
  <ProgressBar value={100} variant="success" showLabel />
  <ProgressBar value={75} variant="info" showLabel />
  <ProgressBar value={50} variant="warning" showLabel />
  <ProgressBar value={25} variant="error" showLabel />
</div>`,
        description: 'Progress bars with semantic color variants',
      },
      {
        title: 'Dynamic Progress',
        code: `const [progress, setProgress] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
  }, 500);
  return () => clearInterval(timer);
}, []);

<ProgressBar value={progress} variant="default" showLabel />`,
        description: 'Animated progress bar that updates over time',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/atoms/ProgressBar/ProgressBar.tsx',
  },

  Switch: {
    component: Switch,
    description: 'A toggle switch control for binary state changes with smooth animations and theme-aware colors. Features accessible keyboard support and three size variants.',
    props: {
      checked: { type: 'boolean', default: false, description: 'Whether the switch is checked' },
      size: {
        type: 'select',
        options: ['sm', 'md', 'lg'] as const,
        default: 'md',
        description: 'Size variant - sm (w-8), md (w-11), lg (w-14)',
      },
      disabled: { type: 'boolean', default: false, description: 'When true, prevents interaction and shows disabled state' },
      label: { type: 'text', default: 'Label', description: 'Optional label displayed next to the switch' },
    },
    examples: [
      { label: 'Small', props: { size: 'sm', checked: false }, children: null },
      { label: 'Medium', props: { size: 'md', checked: true }, children: null },
      { label: 'Large', props: { size: 'lg', checked: true }, children: null },
      { label: 'Disabled', props: { disabled: true, checked: false }, children: null },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Switch } from '@sage/ui';

const [enabled, setEnabled] = useState(false);

<Switch
  checked={enabled}
  onCheckedChange={setEnabled}
/>`,
        description: 'Controlled switch component'
      },
      {
        title: 'With Label',
        code: `import { Switch } from '@sage/ui';

const [darkMode, setDarkMode] = useState(false);

<label className="flex items-center gap-2 cursor-pointer">
  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
  <span>Dark Mode</span>
</label>`,
        description: 'Switch with an associated label'
      },
      {
        title: 'Different Sizes',
        code: `import { Switch } from '@sage/ui';

<div className="flex items-center gap-4">
  <Switch size="sm" checked={true} onCheckedChange={() => {}} />
  <Switch size="md" checked={true} onCheckedChange={() => {}} />
  <Switch size="lg" checked={true} onCheckedChange={() => {}} />
</div>`,
        description: 'Switch in all available sizes'
      }
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/design-system/atoms/Switch/Switch.tsx',
  },

  Checkbox: {
    component: Checkbox,
    description: 'A control that allows the user to toggle between checked and not checked. Built on Radix UI.',
    props: {
      disabled: { type: 'boolean', default: false, description: 'When true, prevents interaction' },
    },
    examples: [
      { label: 'Default', props: {}, children: null },
      { label: 'Disabled', props: { disabled: true }, children: null },
    ],
    codeExamples: [
      {
        title: 'Terms and Conditions',
        code: `import { Checkbox, Label } from '@sage/ui';

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`,
        description: 'Checkbox with a label'
      }
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Checkbox.tsx',
  },

  Select: {
    component: Select,
    description: 'Displays a list of options for the user to pick from—triggered by a button.',
    props: {},
    examples: [
      {
        label: 'Theme Params',
        props: {},
        children: (
          <>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </>
        )
      }
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@sage/ui';

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>`,
        description: 'Basic select dropdown'
      }
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Select.tsx',
  },

  Separator: {
    component: Separator,
    description: 'Visually or semantically separates content.',
    props: {
      orientation: {
        type: 'select',
        options: ['horizontal', 'vertical'] as const,
        default: 'horizontal',
        description: 'Orientation of the separator'
      }
    },
    examples: [
      {
        label: 'Horizontal',
        props: { orientation: 'horizontal' },
        children: (
          <div className="w-full">
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
              <p className="text-sm text-muted-foreground">
                An open-source UI component library.
              </p>
            </div>
            <Separator className="my-4" />
            <div className="flex h-5 items-center space-x-4 text-sm">
              <div>Blog</div>
              <Separator orientation="vertical" />
              <div>Docs</div>
              <Separator orientation="vertical" />
              <div>Source</div>
            </div>
          </div>
        )
      }
    ],
    codeExamples: [
      {
        title: 'Usage',
        code: `import { Separator } from '@sage/ui';

<div>
  <Separator orientation="vertical" />
</div>`,
        description: 'Basic usage'
      }
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Separator.tsx',
  },

  ScrollArea: {
    component: ScrollArea,
    description: 'Augments native scroll functionality for custom, cross-browser styling.',
    props: {},
    examples: [
      {
        label: 'Default',
        props: {},
        children: (
          <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
            Jokester began sneaking into the castle in the middle of the night and leaving
            jokes all over the place: under the king's pillow, in his soup, even in the
            royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
            then, one day, the people of the kingdom discovered the jokes. They laughed.
            They laughed so hard they cried. And then they realized that the king wasn't
            funny. He was actually quite boring. So, they decided to make Jokester the new
            king.
          </ScrollArea>
        )
      }
    ],
    codeExamples: [
      {
        title: 'Usage',
        code: `import { ScrollArea } from '@sage/ui';

<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
  Content...
</ScrollArea>`,
        description: 'Scrollable area with custom scrollbar'
      }
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/ScrollArea.tsx',
  },

  Skeleton: {
    component: Skeleton,
    description: 'Placeholder component for loading states. Shows an animated pulse effect while content is loading.',
    props: {
      variant: {
        type: 'select',
        options: ['default', 'circular', 'rectangular', 'text'] as const,
        default: 'default',
        description: 'Shape variant of the skeleton',
      },
      width: {
        type: 'text',
        default: '100%',
        description: 'Width of the skeleton (CSS value)',
      },
      height: {
        type: 'text',
        default: '20px',
        description: 'Height of the skeleton (CSS value)',
      },
    },
    examples: [
      {
        label: 'Default',
        props: { variant: 'default', width: '200px', height: '20px' },
        children: null,
      },
      {
        label: 'Circular',
        props: { variant: 'circular', width: '40px', height: '40px' },
        children: null,
      },
      {
        label: 'Text Lines',
        props: { variant: 'text', width: '100%' },
        children: null,
      },
    ],
    codeExamples: [
      {
        title: 'Card Skeleton',
        code: `import { Skeleton } from '@sage/ui';

<div className="space-y-2">
  <Skeleton className="h-12 w-12 rounded-full" />
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
</div>`,
        description: 'Loading skeleton for a user card',
      },
      {
        title: 'List Skeleton',
        code: `import { Skeleton } from '@sage/ui';

<div className="space-y-3">
  {Array.from({ length: 5 }).map((_, i) => (
    <div key={i} className="flex items-center space-x-4">
      <Skeleton variant="circular" className="h-12 w-12" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ))}
</div>`,
        description: 'Loading skeleton for a list of items',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Skeleton.tsx',
  },

  DropdownMenu: {
    component: DropdownMenu,
    description: 'Displays a menu of actions triggered by a button. Replaces the legacy Dropdown component with Radix UI primitives for enhanced accessibility and flexibility.',
    props: {
      open: {
        type: 'boolean',
        default: false,
        description: 'Controls the open state of the dropdown menu',
      },
    },
    examples: [
      {
        label: 'Basic Menu',
        props: {},
        children: (
          <>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Button } from '@sage/ui';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
        description: 'Simple dropdown menu with labeled sections',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/DropdownMenu.tsx',
    accessibilityNotes: [
      'Built on Radix UI DropdownMenu primitive with full ARIA support',
      'Keyboard navigation with arrow keys, Enter, and Escape',
      'Focus management and loop within menu items',
      'Screen reader accessible with proper roles and labels',
      'Supports typeahead to jump to menu items',
    ],
  },

  RadioGroup: {
    component: RadioGroup,
    description: 'A set of checkable buttons—known as radio buttons—where no more than one can be checked at a time. Built on Radix UI for accessibility.',
    props: {
      disabled: {
        type: 'boolean',
        default: false,
        description: 'When true, prevents interaction with all radio items',
      },
    },
    examples: [
      {
        label: 'Default',
        props: {},
        children: (
          <>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" />
              <label htmlFor="r1">Default</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="r2" />
              <label htmlFor="r2">Comfortable</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="r3" />
              <label htmlFor="r3">Compact</label>
            </div>
          </>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { RadioGroup, RadioGroupItem } from '@sage/ui';

<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <label htmlFor="option-one">Option One</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <label htmlFor="option-two">Option Two</label>
  </div>
</RadioGroup>`,
        description: 'Radio group with two options',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/RadioGroup.tsx',
    accessibilityNotes: [
      'Built on Radix UI RadioGroup primitive',
      'Keyboard navigation with arrow keys',
      'Proper radio group semantics with ARIA roles',
      'Screen reader accessible',
      'Focus management within group',
    ],
  },

  Sheet: {
    component: Sheet,
    description: 'Extends the Dialog component to display content that complements the main content of the screen. Slides in from top, right, bottom, or left.',
    props: {
      side: {
        type: 'select',
        options: ['top', 'right', 'bottom', 'left'] as const,
        default: 'right',
        description: 'The side from which the sheet slides in',
      },
    },
    examples: [
      {
        label: 'Right Side (Default)',
        props: {},
        children: (
          <>
            <SheetTrigger asChild>
              <Button variant="outline">Open Sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="">
                <SheetTitle className="">Sheet Title</SheetTitle>
                <SheetDescription className="">
                  This is a sheet that slides in from the right side.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, Button } from '@sage/ui';

<Sheet>
  <SheetTrigger asChild>
    <Button>Open</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Title</SheetTitle>
      <SheetDescription>
        Description goes here.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
        description: 'Sheet that slides from the right (default)',
      },
      {
        title: 'Different Sides',
        code: `// Slide from left
<Sheet>
  <SheetTrigger asChild>
    <Button>Open from Left</Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Navigation</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
        description: 'Sheet sliding from different sides',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Sheet.tsx',
    accessibilityNotes: [
      'Built on Radix UI Dialog primitive (repurposed as sheet)',
      'Focus trap within sheet when open',
      'Escape key closes the sheet',
      'Click outside closes the sheet',
      'Prevents background scroll when open',
      'Proper ARIA roles and labels',
    ],
  },

  Table: {
    component: Table,
    description: 'A responsive table component for displaying tabular data with proper semantic HTML structure.',
    props: {},
    examples: [
      {
        label: 'Simple Table',
        props: {},
        children: (
          <>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jane Smith</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>$150.00</TableCell>
              </TableRow>
            </TableBody>
          </>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@sage/ui';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
        description: 'Simple table with header and body',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Table.tsx',
    accessibilityNotes: [
      'Uses semantic HTML table elements',
      'Proper table structure with thead and tbody',
      'Responsive with horizontal scroll on overflow',
      'Screen reader accessible with table roles',
      'Clear visual distinction between headers and data',
    ],
  },

  Form: {
    component: Form,
    description: 'Building forms with React Hook Form and Zod. Provides composable components for building accessible forms with validation. Replaces the legacy Form component.',
    props: {},
    examples: [
      {
        label: 'Note',
        props: {},
        children: (
          <div className="text-sm text-muted-foreground p-4 border rounded">
            Form component requires react-hook-form and zod. See code examples for usage.
          </div>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Form',
        code: `import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@sage/ui"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@sage/ui"
import { Input } from "@sage/ui"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}`,
        description: 'Complete form with validation using react-hook-form and zod',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Form.tsx',
    accessibilityNotes: [
      'Built on react-hook-form for accessibility',
      'Proper form field associations with labels',
      'Error messages announced to screen readers',
      'Keyboard navigation support',
      'Focus management on validation errors',
    ],
  },

  DataTable: {
    component: DataTable,
    description: 'Powerful data table with built-in sorting, filtering, and pagination using TanStack Table. Essential for dashboards and data display.',
    props: {},
    examples: [
      {
        label: 'Note',
        props: {},
        children: (
          <div className="text-sm text-muted-foreground p-4 border rounded">
            DataTable requires column definitions and data. See code examples for usage.
          </div>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Data Table',
        code: `import { DataTable } from "@sage/ui"
import { ColumnDef } from "@tanstack/react-table"

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]

const data: Payment[] = [
  {
    id: "1",
    amount: 100,
    status: "success",
    email: "user@example.com",
  },
  // ... more data
]

export function PaymentsTable() {
  return <DataTable columns={columns} data={data} />
}`,
        description: 'Data table with sorting and pagination',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/DataTable.tsx',
    accessibilityNotes: [
      'Built on TanStack Table with full accessibility support',
      'Keyboard navigation through table cells',
      'Sortable columns with keyboard activation',
      'Pagination controls are keyboard accessible',
      'Screen reader announces table structure and data',
    ],
  },

  Textarea: {
    component: Textarea,
    description: 'Multi-line text input field. Styled with Sage UI tokens.',
    props: {
      placeholder: {
        type: 'text',
        default: 'Type your message here.',
        description: 'Placeholder text',
      },
      disabled: {
        type: 'boolean',
        default: false,
        description: 'Disables the textarea',
      },
    },
    examples: [
      {
        label: 'Default',
        props: { placeholder: 'Type your message here.' },
        children: null,
      },
      {
        label: 'Disabled',
        props: { placeholder: 'Type your message here.', disabled: true },
        children: null,
      },
      {
        label: 'With Label',
        props: { placeholder: 'Type your message here.' },
        children: (
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">Your message</Label>
            <Textarea placeholder="Type your message here." id="message" />
          </div>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Textarea } from "@sage/ui"

<Textarea placeholder="Type your message here." />`,
        description: 'Simple textarea',
      },
      {
        title: 'With Label',
        code: `import { Label } from "@sage/ui"
import { Textarea } from "@sage/ui"

<div className="grid w-full gap-1.5">
  <Label htmlFor="message">Your message</Label>
  <Textarea placeholder="Type your message here." id="message" />
</div>`,
        description: 'Textarea with a label',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Textarea.tsx',
  },
  Input: {
    component: Input,
    description: 'Text input field supporting various types (text, email, password, number). Fully accessible with keyboard navigation.',
    props: {
      type: {
        type: 'select',
        options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'] as const,
        default: 'text',
        description: 'Input type',
      },
      placeholder: {
        type: 'text',
        default: 'Enter text...',
        description: 'Placeholder text',
      },
      disabled: {
        type: 'boolean',
        default: false,
        description: 'Disables the input',
      },
    },
    examples: [
      {
        label: 'Default',
        props: { type: 'text', placeholder: 'Enter text...' },
        children: null,
      },
      {
        label: 'Email',
        props: { type: 'email', placeholder: 'Enter email...' },
        children: null,
      },
      {
        label: 'Password',
        props: { type: 'password', placeholder: 'Enter password...' },
        children: null,
      },
      {
        label: 'Disabled',
        props: { type: 'text', placeholder: 'Disabled input', disabled: true },
        children: null,
      },
      {
        label: 'With Label',
        props: { type: 'email', placeholder: 'Enter your email' },
        children: (
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Enter your email" />
          </div>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Input } from "@sage/ui"

<Input type="text" placeholder="Enter text..." />`,
        description: 'Simple text input',
      },
      {
        title: 'With Label',
        code: `import { Input, Label } from "@sage/ui"

<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>`,
        description: 'Input with associated label',
      },
      {
        title: 'Form Integration',
        code: `import { Input, Label, Button } from "@sage/ui"

<form className="space-y-4">
  <div className="grid w-full items-center gap-1.5">
    <Label htmlFor="name">Name</Label>
    <Input type="text" id="name" placeholder="John Doe" />
  </div>
  <div className="grid w-full items-center gap-1.5">
    <Label htmlFor="email">Email</Label>
    <Input type="email" id="email" placeholder="john@example.com" />
  </div>
  <Button type="submit">Submit</Button>
</form>`,
        description: 'Input in a form with validation',
      },
    ],
    sourceUrl: 'https://github.com/shadcn-ui/ui/blob/main/apps/www/registry/default/ui/input.tsx',
    accessibilityNotes: [
      'Uses semantic HTML input element',
      'Supports all standard input types (text, email, password, etc.)',
      'Keyboard navigable with Tab key',
      'Properly associates with Label component via htmlFor/id',
      'Supports disabled state with appropriate styling',
      'Respects system focus indicators',
    ],
  },
  Label: {
    component: Label,
    description: 'Form field label with proper accessibility associations. Built on Radix UI Label primitive.',
    props: {
      htmlFor: {
        type: 'text',
        default: '',
        description: 'ID of the associated form control',
      },
    },
    examples: [
      {
        label: 'With Input',
        props: { htmlFor: 'example-input' },
        children: (
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="example-input">Email</Label>
            <Input type="email" id="example-input" placeholder="Enter your email" />
          </div>
        ),
      },
      {
        label: 'With Textarea',
        props: { htmlFor: 'example-textarea' },
        children: (
          <div className="grid w-full gap-1.5">
            <Label htmlFor="example-textarea">Your message</Label>
            <Textarea id="example-textarea" placeholder="Type your message here." />
          </div>
        ),
      },
      {
        label: 'With Checkbox',
        props: { htmlFor: 'example-checkbox' },
        children: (
          <div className="flex items-center space-x-2">
            <Checkbox id="example-checkbox" />
            <Label htmlFor="example-checkbox">Accept terms and conditions</Label>
          </div>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Label, Input } from "@sage/ui"

<div className="grid w-full items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>`,
        description: 'Label paired with input field',
      },
      {
        title: 'With Checkbox',
        code: `import { Label, Checkbox } from "@sage/ui"

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`,
        description: 'Label with checkbox for agreement',
      },
      {
        title: 'With Required Field',
        code: `import { Label, Input } from "@sage/ui"

<div className="grid w-full items-center gap-1.5">
  <Label htmlFor="username">
    Username <span className="text-destructive">*</span>
  </Label>
  <Input type="text" id="username" placeholder="Username" required />
</div>`,
        description: 'Label with required field indicator',
      },
    ],
    sourceUrl: 'https://github.com/shadcn-ui/ui/blob/main/apps/www/registry/default/ui/label.tsx',
    accessibilityNotes: [
      'Built on Radix UI Label primitive for proper semantics',
      'Creates accessible association with form controls via htmlFor',
      'Automatically handles click events to focus associated control',
      'Supports peer-disabled state styling',
      'Properly announces to screen readers',
      'Essential for WCAG 2.1 Level AA compliance',
    ],
  },
  Combobox: {
    component: Combobox,
    description: 'Searchable dropdown component combining Command and Popover primitives. Perfect for forms with searchable select inputs.',
    props: {
      placeholder: {
        type: 'text',
        default: 'Select option...',
        description: 'Placeholder text for the trigger button',
      },
      options: {
        type: 'array',
        default: [
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue' },
          { value: 'angular', label: 'Angular' },
          { value: 'svelte', label: 'Svelte' },
          { value: 'nextjs', label: 'Next.js' },
        ],
        description: 'Array of options to display',
        typeDefinition: '{ value: string; label: string }[]',
      },
      disabled: {
        type: 'boolean',
        default: false,
        description: 'Disables the combobox',
      },
    },
    examples: [
      {
        label: 'Default',
        props: {
          options: [
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue' },
            { value: 'angular', label: 'Angular' },
            { value: 'svelte', label: 'Svelte' },
          ],
          placeholder: 'Select framework...',
        },
        children: null,
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Combobox } from "@sage/ui"

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
]

<Combobox
  options={frameworks}
  placeholder="Select framework..."
  onValueChange={(value) => console.log(value)}
/>`,
        description: 'Searchable select with custom options',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Combobox.tsx',
  },
  Command: {
    component: Command,
    description: 'Command menu component built with cmdk. Perfect for creating command palettes and searchable lists.',
    props: {},
    examples: [
      {
        label: 'Default',
        props: {},
        children: (
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Calendar</CommandItem>
                <CommandItem>Search Emoji</CommandItem>
                <CommandItem>Calculator</CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>Profile</CommandItem>
                <CommandItem>Billing</CommandItem>
                <CommandItem>Settings</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Command Menu',
        code: `import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@sage/ui"

<Command className="rounded-lg border shadow-md">
  <CommandInput placeholder="Type a command..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
        description: 'Command palette with search and grouped items',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Command.tsx',
  },
  Popover: {
    component: Popover,
    description: 'Floating content panel that appears near a trigger element. Built on Radix UI Popover primitive.',
    props: {},
    examples: [
      {
        label: 'Default',
        props: {},
        children: (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Dimensions</h4>
                  <p className="text-sm text-muted-foreground">
                    Set the dimensions for the layer.
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Popover, PopoverContent, PopoverTrigger } from "@sage/ui"
import { Button } from "@sage/ui"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <h4 className="font-medium">Popover Title</h4>
      <p className="text-sm text-muted-foreground">
        Popover content goes here.
      </p>
    </div>
  </PopoverContent>
</Popover>`,
        description: 'Popover with custom content',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Popover.tsx',
  },
  Tabs: {
    component: Tabs,
    description: 'Tabbed interface for organizing content into multiple panels. Built on Radix UI Tabs primitive.',
    props: {
      defaultValue: {
        type: 'text',
        default: 'tab1',
        description: 'Default active tab value',
      },
    },
    examples: [
      {
        label: 'Default',
        props: { defaultValue: 'account' },
        children: (
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card className="p-6">
                <p className="text-sm text-muted-foreground">
                  Make changes to your account here.
                </p>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card className="p-6">
                <p className="text-sm text-muted-foreground">
                  Change your password here.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Tabs',
        code: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@sage/ui"

<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Make changes to your account here.
  </TabsContent>
  <TabsContent value="password">
    Change your password here.
  </TabsContent>
</Tabs>`,
        description: 'Basic tabbed interface',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Tabs.tsx',
  },
  Toaster: {
    component: Toaster,
    description: 'Toast notification component powered by Sonner. Provides elegant, accessible toast notifications with better UX than traditional toasts.',
    props: {},
    examples: [
      {
        label: 'Usage',
        props: {},
        children: (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Add <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">&lt;Toaster /&gt;</code> to your root layout, then use the <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">toast()</code> function from the sonner package.
            </p>
            <Button
              onClick={() => {
                // Example - in actual use: import { toast } from 'sonner'
                console.log('Toast would appear here')
              }}
            >
              Show Toast
            </Button>
          </div>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Setup',
        code: `// Add to your root layout
import { Toaster } from "@sage/ui"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}`,
        description: 'Add Toaster to root layout',
      },
      {
        title: 'Usage',
        code: `import { toast } from "sonner"

// Show a toast
toast("Event has been created")

// Success toast
toast.success("Profile updated")

// Error toast
toast.error("Something went wrong")

// With action
toast("Event created", {
  action: {
    label: "Undo",
    onClick: () => console.log("Undo"),
  },
})`,
        description: 'Using toast notifications',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Sonner.tsx',
  },

  // Phase 3 Batch 1 Components
  Accordion: {
    component: Accordion,
    description: 'Vertically stacked set of interactive headings that reveal content panels. Built on Radix UI.',
    props: {
      type: {
        type: 'select',
        options: ['single', 'multiple'] as const,
        default: 'single',
        description: 'Allow single or multiple items to be open at once',
      },
      collapsible: {
        type: 'boolean',
        default: false,
        description: 'Allow all items to be closed when type is "single"',
      },
    },
    examples: [
      {
        label: 'Default',
        props: { type: 'single', collapsible: true, className: 'w-full' },
        children: (
          <>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>Yes. It comes with default styles that match your theme.</AccordionContent>
            </AccordionItem>
          </>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@sage/ui"

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
        description: 'Simple accordion with collapsible items',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Accordion.tsx',
  },

  AlertDialog: {
    component: AlertDialog,
    description: 'Modal dialog that interrupts the user with important content and expects a response. Built on Radix UI.',
    props: {},
    examples: [
      {
        label: 'Default',
        props: {},
        children: (
          <>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader className="">
                <AlertDialogTitle className="">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="">
                  This action cannot be undone. This will permanently delete your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="">
                <AlertDialogCancel className="">Cancel</AlertDialogCancel>
                <AlertDialogAction className="">Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Confirmation Dialog',
        code: `import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@sage/ui"

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
        description: 'Confirmation dialog for destructive actions',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/AlertDialog.tsx',
  },

  Collapsible: {
    component: Collapsible,
    description: 'Interactive component which expands/collapses a panel. Built on Radix UI.',
    props: {},
    examples: [
      {
        label: 'Default',
        props: {},
        children: (
          <div className="w-[350px] space-y-2">
            <div className="flex items-center justify-between space-x-4 px-4">
              <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">Toggle</Button>
              </CollapsibleTrigger>
            </div>
            <div className="rounded-md border px-4 py-2 font-mono text-sm">
              @radix-ui/primitives
            </div>
            <CollapsibleContent className="space-y-2">
              <div className="rounded-md border px-4 py-2 font-mono text-sm">@radix-ui/colors</div>
              <div className="rounded-md border px-4 py-2 font-mono text-sm">@stitches/react</div>
            </CollapsibleContent>
          </div>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@sage/ui"

<Collapsible>
  <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
  <CollapsibleContent>
    Yes. Free to use for personal and commercial projects.
  </CollapsibleContent>
</Collapsible>`,
        description: 'Collapsible panel with trigger',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Collapsible.tsx',
  },

  HoverCard: {
    component: HoverCard,
    description: 'For sighted users to preview content available behind a link. Built on Radix UI.',
    props: {},
    examples: [
      {
        label: 'Default',
        props: {},
        children: (
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">@nextjs</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">@nextjs</h4>
                <p className="text-sm">The React Framework – created and maintained by @vercel.</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { HoverCard, HoverCardContent, HoverCardTrigger } from "@sage/ui"

<HoverCard>
  <HoverCardTrigger>Hover me</HoverCardTrigger>
  <HoverCardContent>
    The React Framework for the Web
  </HoverCardContent>
</HoverCard>`,
        description: 'Hover card with preview content',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/HoverCard.tsx',
  },

  Tooltip: {
    component: Tooltip,
    description: 'Popup that displays information related to an element when it receives keyboard focus or hover.',
    props: {},
    examples: [
      {
        label: 'Default',
        props: {},
        children: (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@sage/ui"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover</TooltipTrigger>
    <TooltipContent>
      <p>Tooltip content</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
        description: 'Simple tooltip on hover',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Tooltip.tsx',
  },

  // Phase 3 Batch 2 Components
  Slider: {
    component: Slider,
    description: 'Input component for selecting a value from a range. Built on Radix UI.',
    props: {
      min: { type: 'text', default: '0', description: 'Minimum value' },
      max: { type: 'text', default: '100', description: 'Maximum value' },
      step: { type: 'text', default: '1', description: 'Step increment' },
      defaultValue: { type: 'array', default: [50], description: 'Default value' },
    },
    examples: [
      {
        label: 'Default',
        props: { defaultValue: [50], max: 100, step: 1, className: 'w-[60%]' },
        children: null,
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Slider } from "@sage/ui"

<Slider defaultValue={[50]} max={100} step={1} />`,
        description: 'Range slider with default value',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Slider.tsx',
  },

  Toggle: {
    component: Toggle,
    description: 'Two-state button that can be either on or off.',
    props: {
      variant: {
        type: 'select',
        options: ['default', 'outline'] as const,
        default: 'default',
        description: 'Visual style variant',
      },
      size: {
        type: 'select',
        options: ['default', 'sm', 'lg'] as const,
        default: 'default',
        description: 'Size of the toggle',
      },
    },
    examples: [
      {
        label: 'Default',
        props: { 'aria-label': 'Toggle italic' },
        children: 'Toggle',
      },
      {
        label: 'Outline',
        props: { variant: 'outline', 'aria-label': 'Toggle bold' },
        children: 'Outline',
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Toggle } from "@sage/ui"

<Toggle aria-label="Toggle italic">
  Toggle
</Toggle>`,
        description: 'Simple toggle button',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Toggle.tsx',
  },

  ToggleGroup: {
    component: ToggleGroup,
    description: 'A set of two-state buttons that can be toggled on or off.',
    props: {
      type: {
        type: 'select',
        options: ['single', 'multiple'] as const,
        default: 'single',
        description: 'Allow single or multiple items to be selected',
      },
      defaultValue: {
        type: 'text',
        default: 'left',
        description: 'The default value of the item to select',
      },
    },
    examples: [
      {
        label: 'Single',
        props: { type: 'single' },
        children: (
          <>
            <ToggleGroupItem value="left" aria-label="Align left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">Right</ToggleGroupItem>
          </>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { ToggleGroup, ToggleGroupItem } from "@sage/ui"

<ToggleGroup type="single">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
  <ToggleGroupItem value="c">C</ToggleGroupItem>
</ToggleGroup>`,
        description: 'Toggle group with single selection',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/ToggleGroup.tsx',
  },

  AspectRatio: {
    component: AspectRatio,
    description: 'Displays content within a desired aspect ratio. Built on Radix UI.',
    props: {
      ratio: { type: 'text', default: '16/9', description: 'Aspect ratio (e.g., 16/9, 4/3, 1/1)' },
    },
    examples: [
      {
        label: '16:9',
        props: { ratio: 16 / 9, className: 'bg-muted' },
        children: (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">16:9 Aspect Ratio</p>
          </div>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Image Container',
        code: `import { AspectRatio } from "@sage/ui"

<AspectRatio ratio={16 / 9}>
  <img src="/photo.jpg" alt="Photo" className="object-cover" />
</AspectRatio>`,
        description: 'Maintain aspect ratio for images',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/AspectRatio.tsx',
  },

  Progress: {
    component: Progress,
    description: 'Displays an indicator showing the completion progress of a task. Built on Radix UI.',
    props: {
      value: { type: 'text', default: '0', description: 'Progress value (0-100)' },
    },
    examples: [
      {
        label: '60%',
        props: { value: 60, className: 'w-[60%]' },
        children: null,
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Progress } from "@sage/ui"

<Progress value={33} />`,
        description: 'Progress indicator',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Progress.tsx',
  },

  // Phase 3 Batch 3 Components
  Breadcrumb: {
    component: Breadcrumb,
    description: 'Navigation hierarchy that helps users understand their current location.',
    props: {},
    examples: [
      {
        label: 'Default',
        props: {},
        children: (
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="">/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="">/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@sage/ui"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
        description: 'Navigation breadcrumb trail',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Breadcrumb.tsx',
  },

  ContextMenu: {
    component: ContextMenu,
    description: 'Displays a menu at the pointer position, triggered by right-click. Built on Radix UI.',
    props: {},
    examples: [
      {
        label: 'Default',
        props: {},
        children: (
          <>
            <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
              Right click here
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
              <ContextMenuItem>Back</ContextMenuItem>
              <ContextMenuItem>Forward</ContextMenuItem>
              <ContextMenuItem>Reload</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>More tools</ContextMenuItem>
            </ContextMenuContent>
          </>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@sage/ui"

<ContextMenu>
  <ContextMenuTrigger>Right click</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Edit</ContextMenuItem>
    <ContextMenuItem>Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
        description: 'Context menu on right-click',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/ContextMenu.tsx',
  },

  Menubar: {
    component: Menubar,
    description: 'Visually persistent menu common in desktop applications. Built on Radix UI.',
    props: {},
    examples: [
      {
        label: 'Default',
        props: {},
        children: (
          <>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New Tab</MenubarItem>
                <MenubarItem>New Window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Share</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Print</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@sage/ui"

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New</MenubarItem>
      <MenubarItem>Open</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
        description: 'Application menubar',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Menubar.tsx',
  },

  NavigationMenu: {
    component: NavigationMenu,
    description: 'Collection of links for navigating websites. Built on Radix UI.',
    props: {},
    examples: [
      {
        label: 'Default',
        props: {},
        children: (
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Introduction</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Getting started with the library
                  </p>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@sage/ui"

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Item</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
        description: 'Navigation menu with dropdowns',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/NavigationMenu.tsx',
  },

  Pagination: {
    component: Pagination,
    description: 'Navigation for paginated content.',
    props: {},
    examples: [
      {
        label: 'Default',
        props: {},
        children: (
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" className="" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="" isActive={false}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive className="">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="" isActive={false}>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis className="" />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" className="" />
            </PaginationItem>
          </PaginationContent>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@sage/ui"

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
        description: 'Page navigation controls',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Pagination.tsx',
  },

  // Phase 3 Batch 4 Components
  Drawer: {
    component: Drawer,
    description: 'Dialog that slides in from the edge of the screen. Built with Vaul.',
    props: {},
    examples: [
      {
        label: 'Default',
        props: {},
        children: (
          <>
            <DrawerTrigger asChild>
              <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="">
                <DrawerTitle className="">Are you absolutely sure?</DrawerTitle>
                <DrawerDescription className="">This action cannot be undone.</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter className="">
                <Button>Submit</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@sage/ui"

<Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Title</DrawerTitle>
      <DrawerDescription>Description</DrawerDescription>
    </DrawerHeader>
  </DrawerContent>
</Drawer>`,
        description: 'Bottom drawer panel',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Drawer.tsx',
  },

  Carousel: {
    component: Carousel,
    description: 'Carousel for cycling through content. Built with Embla Carousel.',
    props: {},
    examples: [
      {
        label: 'Default',
        props: { className: 'w-full max-w-xs' },
        children: (
          <>
            <CarouselContent>
              <CarouselItem>
                <div className="p-1">
                  <Card className="p-6">
                    <div className="flex aspect-square items-center justify-center">
                      <span className="text-4xl font-semibold">1</span>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="p-1">
                  <Card className="p-6">
                    <div className="flex aspect-square items-center justify-center">
                      <span className="text-4xl font-semibold">2</span>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="p-1">
                  <Card className="p-6">
                    <div className="flex aspect-square items-center justify-center">
                      <span className="text-4xl font-semibold">3</span>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="" />
            <CarouselNext className="" />
          </>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@sage/ui"

<Carousel>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
        description: 'Image/content carousel',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Carousel.tsx',
  },

  Calendar: {
    component: Calendar,
    description: 'Date picker component for selecting dates. Built with react-day-picker.',
    props: {
      mode: {
        type: 'select',
        options: ['single', 'multiple', 'range'] as const,
        default: 'single',
        description: 'Selection mode',
      },
    },
    examples: [
      {
        label: 'Default',
        props: { mode: 'single', className: 'rounded-md border' },
        children: null,
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { Calendar } from "@sage/ui"
import { useState } from "react"

const [date, setDate] = useState<Date | undefined>(new Date())

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
/>`,
        description: 'Single date selection',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Calendar.tsx',
  },

  DatePicker: {
    component: DatePicker,
    description: 'Input field with calendar popover for selecting dates.',
    props: {
      placeholder: {
        type: 'text',
        default: 'Pick a date',
        description: 'Placeholder text',
      },
      disabled: {
        type: 'boolean',
        default: false,
        description: 'Disable the date picker',
      },
    },
    examples: [
      {
        label: 'Default',
        props: { placeholder: 'Pick a date' },
        children: null,
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { DatePicker } from "@sage/ui"

<DatePicker
  date={date}
  onDateChange={setDate}
  placeholder="Pick a date"
/>`,
        description: 'Date input with calendar',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/DatePicker.tsx',
  },

  // Phase 3 Batch 5 Components
  InputOTP: {
    component: InputOTP,
    description: 'One-time password input component. Built with input-otp.',
    props: {
      maxLength: {
        type: 'text',
        default: '6',
        description: 'Maximum number of characters',
      },
    },
    examples: [
      {
        label: 'Default',
        props: { maxLength: 6 },
        children: (
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { InputOTP, InputOTPGroup, InputOTPSlot } from "@sage/ui"

<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
        description: '6-digit OTP input',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/InputOTP.tsx',
  },

  ResizablePanelGroup: {
    component: ResizablePanelGroup,
    description: 'Resizable panel layout. Built with react-resizable-panels.',
    props: {
      direction: {
        type: 'select',
        options: ['horizontal', 'vertical'] as const,
        default: 'horizontal',
        description: 'Panel layout direction',
      },
    },
    examples: [
      {
        label: 'Horizontal',
        props: { direction: 'horizontal', className: 'min-h-[200px] max-w-md rounded-lg border' },
        children: (
          <>
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">One</span>
              </div>
            </ResizablePanel>
            <ResizableHandle className="" withHandle={false} />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Two</span>
              </div>
            </ResizablePanel>
          </>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@sage/ui"

<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={50}>
    <div>Panel 1</div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>
    <div>Panel 2</div>
  </ResizablePanel>
</ResizablePanelGroup>`,
        description: 'Resizable panel layout',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Resizable.tsx',
  },

  // Aliases for navigation compatibility (kebab-case → PascalCase conversion)
  // "input-otp" converts to "InputOtp" but component is registered as "InputOTP"
  InputOtp: {
    component: InputOTP,
    description: 'One-time password input component. Built with input-otp.',
    props: {
      maxLength: {
        type: 'text',
        default: '6',
        description: 'Maximum number of characters',
      },
    },
    examples: [
      {
        label: 'Default',
        props: { maxLength: 6 },
        children: (
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { InputOTP, InputOTPGroup, InputOTPSlot } from "@sage/ui"

<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
        description: '6-digit OTP input',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/InputOTP.tsx',
  },

  // "resizable" converts to "Resizable" but component is registered as "ResizablePanelGroup"
  Resizable: {
    component: ResizablePanelGroup,
    description: 'Resizable panel layout. Built with react-resizable-panels.',
    props: {
      direction: {
        type: 'select',
        options: ['horizontal', 'vertical'] as const,
        default: 'horizontal',
        description: 'Panel layout direction',
      },
    },
    examples: [
      {
        label: 'Horizontal',
        props: { direction: 'horizontal', className: 'min-h-[200px] max-w-md rounded-lg border' },
        children: (
          <>
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">One</span>
              </div>
            </ResizablePanel>
            <ResizableHandle className="" withHandle={false} />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Two</span>
              </div>
            </ResizablePanel>
          </>
        ),
      },
    ],
    codeExamples: [
      {
        title: 'Basic Usage',
        code: `import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@sage/ui"

<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={50}>
    <div>Panel 1</div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>
    <div>Panel 2</div>
  </ResizablePanel>
</ResizablePanelGroup>`,
        description: 'Resizable panel layout',
      },
    ],
    sourceUrl: 'https://github.com/shalom-ormsby/ecosystem/blob/main/packages/ui/src/components/Resizable.tsx',
  },
};
