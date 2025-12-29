import { Button, Card, Link } from '@ecosystem/design-system';

export interface PropConfig {
  type: 'select' | 'boolean' | 'text';
  options?: readonly string[];
  default: any;
  description?: string;
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
}

export const componentRegistry: Record<string, ComponentConfig> = {
  Button: {
    component: Button,
    description: 'Interactive button component with multiple variants and sizes. Supports keyboard navigation and respects motion preferences.',
    props: {
      variant: {
        type: 'select',
        options: ['primary', 'secondary', 'ghost'] as const,
        default: 'primary',
        description: 'Visual style variant',
      },
      size: {
        type: 'select',
        options: ['sm', 'md', 'lg'] as const,
        default: 'md',
        description: 'Size variant',
      },
    },
    examples: [
      { label: 'Primary', props: { variant: 'primary', size: 'md' }, children: 'Click me' },
      { label: 'Secondary', props: { variant: 'secondary', size: 'md' }, children: 'Secondary' },
      { label: 'Ghost', props: { variant: 'ghost', size: 'md' }, children: 'Ghost' },
      { label: 'Large Primary', props: { variant: 'primary', size: 'lg' }, children: 'Large Button' },
      { label: 'Small Secondary', props: { variant: 'secondary', size: 'sm' }, children: 'Small' },
    ],
  },

  Card: {
    component: Card,
    description: 'Container component with glass-morphism styling and optional hover effects. Uses theme-aware borders and shadows.',
    props: {
      hoverEffect: {
        type: 'boolean',
        default: true,
        description: 'Enable hover lift and shadow effect',
      },
    },
    examples: [
      {
        label: 'With Hover',
        props: { hoverEffect: true },
        children: 'Card content with hover effect',
      },
      {
        label: 'Without Hover',
        props: { hoverEffect: false },
        children: 'Card content without hover',
      },
    ],
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
  },
};
