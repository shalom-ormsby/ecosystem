# Design System

> **The heart of the ecosystem.** This design system is how we make our design philosophy tangible.

Every token, component, and pattern here exists to serve one purpose: helping us build products that make people feel *seen*, *capable*, and *empowered*. If a component doesn't contribute to that goal, it doesn't belong here.

---

## Why This Exists

Most design systems optimize for consistency and efficiency. Those matter here too. But they're not the point.

This design system exists to encode **human-centered principles** into reusable building blocks—so that every app in the ecosystem inherits not just visual consistency, but *philosophical* consistency. When you use these components, you're not just shipping pixels. You're shipping values.

The goal isn't "looks the same everywhere." The goal is "feels lovable everywhere."

---

## Architecture

```
design-system/
├── tokens/              # The foundation — design decisions as code
│   ├── base.ts         # Shared scales (spacing, typography, motion)
│   ├── studio.ts       # Studio theme (professional, balanced)
│   ├── sage.ts         # Sage theme (calm, organic)
│   ├── volt.ts         # Volt theme (bold, electric)
│   └── index.ts        # Theme types and exports
├── atoms/               # Primitives — no internal dependencies
│   ├── Button/         # Button component with variants
│   ├── Card/           # Card container component
│   ├── Link/           # Link component
│   ├── Motion/         # Animation components (FadeIn, Stagger)
│   ├── Icon/           # Icon components (GitHubIcon)
│   ├── Input/          # Form inputs (TextField, TextArea, Checkbox, Radio, Select, Switch)
│   └── index.ts
├── molecules/           # Composed components — built from atoms
│   ├── Form/           # Form patterns (FormField, SearchBar, RadioGroup, CheckboxGroup)
│   └── index.ts
├── organisms/           # Complex compositions — functional sections
│   ├── Header/         # Primary navigation (sticky header)
│   ├── SecondaryNav/   # 1st stacking row navigation
│   ├── TertiaryNav/    # 2nd stacking row navigation
│   ├── Footer/         # Swiss grid footer
│   └── index.ts
├── hooks/               # Custom React hooks
│   ├── useMotionPreference.ts  # Motion settings + prefers-reduced-motion
│   ├── useTheme.ts             # Theme and mode control
│   └── index.ts
├── features/            # Philosophy embodied — flagship features
│   └── customizer/     # User customization controls
│       ├── CustomizerPanel.tsx  # Full customizer UI
│       ├── store.ts             # Zustand state management
│       └── index.ts
├── providers/           # React context providers
│   └── ThemeProvider.tsx  # Applies theme CSS variables
├── store/               # Global state management
│   └── theme.ts        # Theme + mode state (Zustand)
├── config/              # Configuration
│   └── fonts.ts        # Theme-specific font loading
├── src/                 # Package entry point
│   └── index.ts        # Main exports
└── README.md            # You are here
```

### Why This Structure?

**Tokens as the foundation** means design decisions live in code, not in someone's head or a Figma file that drifts out of sync. Change a token, change everywhere.

**Atoms first** enforces discipline: build from primitives up. This prevents the "custom one-off for every situation" entropy that kills design systems.

**Molecules reduce boilerplate** by composing atoms into common patterns (FormField, SearchBar, RadioGroup). This makes developers more productive while maintaining consistency.

**Organisms manage layout** and compose molecules/atoms into complete interface sections (Header, Footer, Navigation). They handle state and coordinate multiple components.

**Hooks for behavior** separates stateful logic from UI, making it reusable across components and enabling custom implementations.

**Features at the top level** signals that the Customizer isn't just another component—it's the embodiment of "User Control & Freedom."

---

## Quick Start

### Installation

This package is part of the monorepo and consumed by apps via workspace references.

```typescript
// In your app's package.json
{
  "dependencies": {
    "@ecosystem/design-system": "workspace:*"
  }
}
```

### Basic Setup

1. **Wrap your app with ThemeProvider:**

```typescript
import { ThemeProvider } from '@ecosystem/design-system'

export default function App({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}
```

2. **Add the Customizer:**

```typescript
import { CustomizerPanel } from '@ecosystem/design-system'

export default function Layout({ children }) {
  return (
    <>
      {children}
      <CustomizerPanel />
    </>
  )
}
```

3. **Use components and tokens:**

```typescript
import { Button, Card } from '@ecosystem/design-system'
import { spacing, typography } from '@ecosystem/design-system/tokens'
```

---

## Core Concepts

### Three Themes, Infinite Expressions

Each theme has a distinct personality and embodies different design values:

| Theme | Personality | Fonts | Use Case |
|-------|-------------|-------|----------|
| **Studio** | Professional, balanced, modern | Geist Sans, Geist Mono | Portfolio, professional work |
| **Sage** | Calm, organic, thoughtful | Lora (serif), Instrument Sans | Wellness, mindfulness apps |
| **Volt** | Bold, electric, energetic | Space Grotesk | High-energy, tech-forward apps |

Each theme includes:
- Light and dark color modes
- Theme-specific typography pairings
- Custom motion personalities (Studio: smooth, Sage: flowing, Volt: snappy)
- Semantic color tokens that adapt to the theme

### Motion That Respects Users

The motion system is built on respect for user preferences:

```typescript
import { useMotionPreference } from '@ecosystem/design-system/hooks'

function AnimatedComponent() {
  const { scale, shouldAnimate, prefersReducedMotion } = useMotionPreference()

  // scale: 0-10 (user preference)
  // shouldAnimate: false if scale is 0 OR system prefers-reduced-motion
  // prefersReducedMotion: synced with system preference

  if (!shouldAnimate) {
    return <div>Content (no animation)</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.3 * (scale / 10) // Scale animation speed
      }}
    >
      Content with animation
    </motion.div>
  )
}
```

**Key principle:** When `shouldAnimate` is false, there should be zero animation—instant state changes only. This is non-negotiable accessibility.

---

## The Customizer

**Principle embodied:** User Control & Freedom

The Customizer gives users ownership of their experience. Not as an afterthought. As a first-class feature.

```typescript
import { CustomizerPanel } from '@ecosystem/design-system'

// Renders a floating button that opens the full customizer
<CustomizerPanel />
```

**What it controls:**
- **Motion Intensity** — 0 to 10 scale. Automatically syncs with system `prefers-reduced-motion`.
- **Theme** — Studio, Sage, or Volt. Each with distinct personality.
- **Color Mode** — Light or dark mode.
- **X-Ray Mode** — Toggle for transparency features (in development).

**The deeper point:** Users aren't just *permitted* to adjust these settings. They're *invited* to. The Customizer says: "This is your space. Make it yours."

All preferences persist to localStorage and survive page reloads.

---

## Tokens

Tokens are the single source of truth for visual properties. Every component references tokens—never hardcoded values.

### Spacing

```typescript
import { spacing } from '@ecosystem/design-system/tokens'

spacing.xs    // 4px  — Tight internal padding
spacing.sm    // 8px  — Default gap
spacing.md    // 16px — Section padding
spacing.lg    // 24px — Card padding
spacing.xl    // 32px — Section margins
spacing['2xl'] // 48px — Page sections
spacing['3xl'] // 64px — Major divisions
```

**Rule:** Use the scale. If you need something between `md` and `lg`, you probably don't—reconsider the layout.

### Typography

```typescript
import { typography } from '@ecosystem/design-system/tokens'

// Font families (set by theme)
typography.fonts.sans      // UI text
typography.fonts.serif     // Long-form reading (Sage theme)
typography.fonts.mono      // Code

// Size scale
typography.sizes.xs        // 12px — Fine print
typography.sizes.sm        // 14px — Secondary text
typography.sizes.base      // 16px — Body text
typography.sizes.lg        // 18px — Lead paragraphs
typography.sizes.xl        // 20px — Section headers
typography.sizes['2xl']    // 24px — Page headers
typography.sizes['3xl']    // 30px — Hero text

// Weights
typography.weights.normal    // 400
typography.weights.medium    // 500
typography.weights.semibold  // 600
typography.weights.bold      // 700

// Line heights
typography.leading.tight     // 1.25 — Headings
typography.leading.normal    // 1.5  — Body
typography.leading.relaxed   // 1.625 — Spacious reading
```

### Colors (CSS Variables)

The ThemeProvider automatically exposes theme colors as CSS variables:

```typescript
// Use in your components via CSS variables
const styles = {
  backgroundColor: 'var(--color-background)',
  color: 'var(--color-text-primary)',
  borderColor: 'var(--color-border)',
}

// Available semantic color variables:
--color-background          // Page background
--color-background-secondary // Secondary background
--color-foreground          // Main foreground color
--color-surface             // Card/container background
--color-text-primary        // Main text
--color-text-secondary      // Supporting text
--color-text-muted          // De-emphasized text
--color-border              // Default borders
--color-focus               // Focus rings

// Primary colors with foreground variants
--color-primary             // Primary brand color
--color-primary-foreground  // Text on primary background
--color-secondary           // Secondary color
--color-secondary-foreground // Text on secondary background
--color-accent              // Accent color
--color-accent-foreground   // Text on accent background

// State colors with foreground variants
--color-success             // Success state
--color-success-foreground  // Text on success background
--color-warning             // Warning state
--color-warning-foreground  // Text on warning background
--color-error               // Error state
--color-error-foreground    // Text on error background
--color-info                // Info state
--color-info-foreground     // Text on info background

// Glass/effects
--color-glass               // Glassmorphism background
--color-glass-border        // Glassmorphism border

// Interactive states
--color-hover               // Hover state background
--color-active              // Active state background
--color-link-hover          // Link hover state
--color-link-hover-foreground // Link hover text color
```

### Component Typography (CSS Variables)

**Principle:** Components should control their own typography through CSS variables, not through props.

The design system uses dedicated CSS variables for component-level typography customization:

```css
/* Define in your app's globals.css */
:root {
  /* Header Component Typography */
  --font-header-logo: var(--font-sage-sans);  /* Logo/brand font */
  --font-header-nav: var(--font-sage-sans);   /* Navigation link font */
}
```

**How This Works:**

1. **Components consume CSS variables internally** - The Header component uses `var(--font-header-nav)` by default for navigation links
2. **Single source of truth** - Change the CSS variable in globals.css, all instances update automatically
3. **No prop passing required** - Consumers don't pass `fontFamily` props (though it's available as an override)
4. **Theme independence** - Component typography is separate from theme fonts (Studio/Sage/Volt)

**Example - Header Component:**

```typescript
// ✅ CORRECT - Component uses CSS variables internally
<Header
  logo={
    <a href="/" style={{ fontFamily: 'var(--font-header-logo)' }}>
      Brand
    </a>
  }
  navLinks={navigation}
  // No fontFamily prop needed - uses var(--font-header-nav) by default
/>

// ❌ AVOID - Passing fonts as props defeats single source of truth
<Header
  logo={<a href="/">Brand</a>}
  navLinks={navigation}
  fontFamily="var(--font-sage-sans)"  // Don't do this on every instance
/>
```

**To Customize Component Typography Ecosystem-Wide:**

1. Define CSS variables in your app's `globals.css`:
```css
:root {
  --font-header-logo: var(--font-sage-sans);
  --font-header-nav: var(--font-sage-sans);
}
```

2. Change the variable value to update all instances:
```css
:root {
  --font-header-logo: var(--font-volt-sans);  /* Now all headers use Volt */
  --font-header-nav: var(--font-volt-sans);
}
```

**Benefits of This Pattern:**

- **Maintainability** - One change updates the entire ecosystem
- **Consistency** - Components automatically stay in sync
- **Flexibility** - Easy to experiment with different fonts
- **Performance** - No prop drilling through component trees
- **Type Safety** - CSS variables are validated by the browser

**When to Use Props vs CSS Variables:**

- **Use CSS Variables** - For ecosystem-wide typography that should be consistent and easily changeable
- **Use Props** - For one-off overrides or component-specific customization needs

**CRITICAL: Always Use Foreground Variants**

When using colored backgrounds, ALWAYS use the corresponding foreground color variable:

```typescript
// ✅ CORRECT - Adapts to both light and dark modes
<button className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
  Click Me
</button>

// ❌ WRONG - Hardcoded white breaks in dark mode
<button className="bg-[var(--color-primary)] text-white">
  Click Me
</button>
```

**Why This Matters:**
- Light mode: `--color-primary` might be dark (#0a0a0a), so `--color-primary-foreground` is light (#ffffff)
- Dark mode: `--color-primary` might be light (#f5f5f5), so `--color-primary-foreground` is dark (#0a0a0a)
- Hardcoded colors like `text-white` or `text-black` will break in one mode or the other

### Motion

```typescript
import { motion } from '@ecosystem/design-system/tokens'

// Durations
motion.duration.instant    // 0ms    — No animation
motion.duration.fast       // 150ms  — Micro-interactions
motion.duration.normal     // 300ms  — Standard transitions
motion.duration.slow       // 500ms  — Emphasis animations

// Easings
motion.easing.default      // ease-out — Most transitions
motion.easing.spring       // Custom spring — Playful interactions
motion.easing.linear       // linear — Progress indicators
```

#### Variable Weight Motion

For variable fonts (like Clash Display), use the `VariableWeightText` behavior to create a "breathing" effect that animates font weight. This animation automatically centers the text to ensure symmetrical expansion and contraction, preventing layout shifts.

```typescript
import { VariableWeightText } from '@ecosystem/design-system'

<VariableWeightText minWeight={200} maxWeight={700}>
  Variable Font Text
</VariableWeightText>
```

**Note:** For motion that respects user preferences, use the `useMotionPreference` hook or the built-in `<FadeIn>`, `<StaggerContainer>`, and `<VariableWeightText>` components.

---

## Components

### Atoms

#### Button

```typescript
import { Button } from '@ecosystem/design-system'

<Button variant="primary" size="md" onClick={handleClick}>
  Save Changes
</Button>

// Props
variant?: 'primary' | 'secondary' | 'ghost'  // Default: 'primary'
size?: 'sm' | 'md' | 'lg'                    // Default: 'md'
// + all standard button HTML attributes
```

Features:
- Three visual variants
- Three size options
- Automatic focus-visible styles using theme focus color
- Ref forwarding support
- Active press scaling animation

#### Card

```typescript
import { Card } from '@ecosystem/design-system'

<Card hoverEffect={true}>
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>

// Props
hoverEffect?: boolean  // Default: true (adds hover lift and shadow)
// + all standard div HTML attributes
```

Features:
- Glass-morphism styling with theme-aware borders
- Optional hover lift effect
- Automatic shadows from theme tokens
- Ref forwarding support

#### Header

```typescript
import { Header } from '@ecosystem/design-system'

<Header
  logo={<a href="/"><img src="/logo.svg" alt="Brand" /></a>}
  navLinks={[
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
  ]}
  actions={
    <>
      <a href="#signin">Sign In</a>
      <Button variant="primary">Get Started</Button>
    </>
  }
  glassOnScroll={true}
/>

// Props
logo?: React.ReactNode                // Brand/logo element
navLinks?: NavLink[]                  // Array of { label, href }
actions?: React.ReactNode             // Right-side content (CTA, auth buttons)
glassOnScroll?: boolean              // Apply glass effect on scroll (default: true)
scrollThreshold?: number             // Scroll px before glass effect (default: 10)
sticky?: boolean                     // Fixed position header (default: true)
fontFamily?: string                  // Navigation font (default: var(--font-header-nav))
// + all standard header HTML attributes
```

**Typography Customization:**

The Header uses CSS variables for typography (see [Component Typography](#component-typography-css-variables)):
- `--font-header-logo` - Controls logo/brand font
- `--font-header-nav` - Controls navigation link font (default for component)

Define these in your `globals.css` to customize typography ecosystem-wide. The `fontFamily` prop is available for one-off overrides but should be avoided in favor of CSS variables.

Features:
- Sticky header with glass morphism on scroll
- Responsive mobile menu with hamburger toggle
- Respects motion preferences (animations disabled when shouldAnimate is false)
- Theme-aware colors using CSS variables
- Typography controlled by CSS variables (`--font-header-logo`, `--font-header-nav`)
- Full keyboard navigation and ARIA labels
- Mobile menu locks body scroll when open
- Staggered animations for mobile menu items
- Focus-visible styles on all interactive elements
- Ref forwarding support

#### Motion Components

```typescript
import { FadeIn, StaggerContainer, StaggerItem } from '@ecosystem/design-system'

// Single element fade-in
<FadeIn delay={0.2}>
  <div>Fades in when in viewport</div>
</FadeIn>

// Staggered children animation
<StaggerContainer stagger={0.1}>
  <StaggerItem><div>Item 1</div></StaggerItem>
  <StaggerItem><div>Item 2</div></StaggerItem>
  <StaggerItem><div>Item 3</div></StaggerItem>
</StaggerContainer>
```

All motion components:
- Automatically respect the motion intensity slider
- Skip animations when user has `prefers-reduced-motion`
- Use theme-specific easing curves and durations

#### Input Components

Form input primitives for capturing user data. All components are theme-aware, fully accessible, and support error states.

##### TextField

```typescript
import { TextField } from '@ecosystem/design-system'

<TextField
  label="Email"
  type="email"
  placeholder="you@example.com"
  required
  error={!!errors.email}
  helperText="We'll never share your email"
  variant="outlined"
  size="md"
/>

// Props
variant?: 'outlined' | 'filled'  // Default: 'outlined'
size?: 'sm' | 'md' | 'lg'        // Default: 'md'
error?: boolean                  // Error state
helperText?: string              // Helper text below input
label?: string                   // Input label
required?: boolean               // Required indicator
// + all standard input HTML attributes
```

Features:
- Two visual variants (outlined, filled)
- Three size options
- Error state with red border
- Optional label and helper text
- Theme-aware colors using CSS variables
- Full keyboard accessibility
- Ref forwarding support

##### TextArea

```typescript
import { TextArea } from '@ecosystem/design-system'

<TextArea
  label="Description"
  rows={4}
  placeholder="Enter description..."
  resize="vertical"
  variant="outlined"
/>

// Props
variant?: 'outlined' | 'filled'
error?: boolean
helperText?: string
label?: string
required?: boolean
resize?: 'none' | 'vertical' | 'horizontal' | 'both'  // Default: 'vertical'
rows?: number  // Default: 4
// + all standard textarea HTML attributes
```

##### Checkbox

```typescript
import { Checkbox } from '@ecosystem/design-system'

<Checkbox
  label="I agree to the terms"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
  size="md"
/>

// Props
label?: React.ReactNode
size?: 'sm' | 'md' | 'lg'
error?: boolean
helperText?: string
// + all standard input[type="checkbox"] HTML attributes
```

##### Radio

```typescript
import { Radio } from '@ecosystem/design-system'

<Radio
  name="plan"
  value="pro"
  label="Pro Plan"
  checked={plan === 'pro'}
  onChange={() => setPlan('pro')}
/>

// Props
label?: React.ReactNode
size?: 'sm' | 'md' | 'lg'
error?: boolean
helperText?: string
// + all standard input[type="radio"] HTML attributes
```

Note: Radio buttons should be grouped using the same `name` prop, or use the `RadioGroup` molecule for easier management.

##### Select

```typescript
import { Select } from '@ecosystem/design-system'

<Select
  label="Country"
  placeholder="Select country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
  ]}
  variant="outlined"
  size="md"
/>

// Or with children
<Select label="Country">
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
  <option value="ca">Canada</option>
</Select>

// Props
variant?: 'outlined' | 'filled'
size?: 'sm' | 'md' | 'lg'
error?: boolean
helperText?: string
label?: string
required?: boolean
options?: SelectOption[]  // { value, label, disabled? }[]
placeholder?: string
// + all standard select HTML attributes
```

##### Switch

```typescript
import { Switch } from '@ecosystem/design-system'

<Switch
  label="Enable notifications"
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
  size="md"
  labelLeft={false}
/>

// Props
label?: React.ReactNode
size?: 'sm' | 'md' | 'lg'
helperText?: string
labelLeft?: boolean  // Label on left side (default: false)
// + all standard input[type="checkbox"] HTML attributes
```

Features:
- Smooth toggle animation
- Label can appear left or right
- Theme-aware colors
- `role="switch"` for screen readers

---

### Molecules

Composed components built from atoms that provide common UI patterns with reduced boilerplate.

#### FormField

The most impactful molecule - wraps any input component with consistent label, error, and helper text layout.

```typescript
import { FormField, TextField } from '@ecosystem/design-system'

<FormField
  label="Email"
  required
  error={errors.email}
  helperText="We'll never share your email"
  htmlFor="email-input"
>
  <TextField
    id="email-input"
    type="email"
    placeholder="you@example.com"
  />
</FormField>

// Props
label?: string
required?: boolean
error?: string  // Error message (presence indicates error state)
helperText?: string  // Helper text when no error
children: React.ReactNode  // The input component
htmlFor?: string  // Connects label to input
className?: string
```

**Benefits:**
- Reduces boilerplate by ~5 lines per field
- Consistent label/error/helper layout
- Automatic `role="alert"` for errors
- Works with any input component

**Before:**
```typescript
<div>
  <label htmlFor="email">
    Email <span className="text-red-500">*</span>
  </label>
  <TextField id="email" error={!!errors.email} />
  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
</div>
```

**After:**
```typescript
<FormField label="Email" required error={errors.email} htmlFor="email">
  <TextField id="email" />
</FormField>
```

#### SearchBar

A specialized text field for search functionality with search icon, clear button, and debounced callbacks.

```typescript
import { SearchBar } from '@ecosystem/design-system'

<SearchBar
  placeholder="Search products..."
  onSearch={(query) => fetchProducts(query)}
  debounceMs={500}
  size="lg"
/>

// Props
onSearch?: (value: string) => void  // Debounced callback
debounceMs?: number  // Default: 300
showClearButton?: boolean  // Default: true
onClear?: () => void
// + all TextField props
```

Features:
- Built-in search icon (left)
- Optional clear button (X on right)
- Debounced `onSearch` callback (reduces API calls)
- Keyboard shortcut (Escape to clear)
- Controlled and uncontrolled modes

#### RadioGroup

Manages a group of radio buttons with consistent layout and error handling.

```typescript
import { RadioGroup } from '@ecosystem/design-system'

<RadioGroup
  name="subscription"
  label="Choose your plan"
  value={plan}
  onChange={setPlan}
  required
  error={errors.plan}
  direction="vertical"
  options={[
    {
      value: 'free',
      label: 'Free Plan',
      helperText: '$0/month - Perfect for trying out'
    },
    {
      value: 'pro',
      label: 'Pro Plan',
      helperText: '$10/month - All features included'
    },
    {
      value: 'enterprise',
      label: 'Enterprise',
      helperText: 'Contact us for pricing',
      disabled: true
    },
  ]}
/>

// Props
name: string  // Required for grouping
options: RadioOption[]  // { value, label, disabled?, helperText? }[]
value?: string
onChange?: (value: string) => void
label?: string
required?: boolean
error?: string
helperText?: string
size?: 'sm' | 'md' | 'lg'
direction?: 'vertical' | 'horizontal'
className?: string
```

Features:
- Proper `<fieldset>` and `<legend>` for accessibility
- Individual radio helper text
- Vertical or horizontal layout
- Group-level error handling
- Full keyboard navigation

#### CheckboxGroup

Manages a group of checkboxes for multiple selections.

```typescript
import { CheckboxGroup } from '@ecosystem/design-system'

<CheckboxGroup
  name="interests"
  label="Select your interests"
  value={selectedInterests}
  onChange={setSelectedInterests}
  direction="horizontal"
  options={[
    { value: 'design', label: 'Design', helperText: 'UI/UX design' },
    { value: 'dev', label: 'Development', helperText: 'Frontend & backend' },
    { value: 'marketing', label: 'Marketing', helperText: 'Growth & content' },
  ]}
/>

// Props
name: string
options: CheckboxOption[]  // { value, label, disabled?, helperText? }[]
value?: string[]  // Array of selected values
onChange?: (values: string[]) => void
label?: string
required?: boolean  // At least one must be selected
error?: string
helperText?: string
size?: 'sm' | 'md' | 'lg'
direction?: 'vertical' | 'horizontal'
className?: string
```

---

### Form Validation Patterns

#### With React Hook Form

The design system components work seamlessly with [react-hook-form](https://react-hook-form.com/):

```typescript
import { useForm } from 'react-hook-form'
import { FormField, TextField, Select, CheckboxGroup } from '@ecosystem/design-system'

function SignupForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        label="Email"
        required
        error={errors.email?.message}
        htmlFor="email"
      >
        <TextField
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />
      </FormField>

      <FormField
        label="Country"
        required
        error={errors.country?.message}
        htmlFor="country"
      >
        <Select
          id="country"
          placeholder="Select country"
          options={countries}
          {...register('country', { required: 'Country is required' })}
        />
      </FormField>

      <CheckboxGroup
        name="interests"
        label="Interests"
        value={watch('interests') || []}
        onChange={(values) => setValue('interests', values)}
        options={interestOptions}
        error={errors.interests?.message}
      />

      <Button type="submit" variant="primary" size="lg">
        Sign Up
      </Button>
    </form>
  )
}
```

#### Error Handling Best Practices

1. **Show errors on blur, not on change** - Less disruptive to the user
2. **Clear errors on input** - Immediate feedback when user starts fixing
3. **Use FormField for consistent layout** - Reduces boilerplate
4. **Provide helpful error messages** - Tell users how to fix the issue
5. **Use native validation when possible** - `required`, `min`, `max`, `pattern`

```typescript
// Good error messages
"Email is required"
"Password must be at least 8 characters"
"Please select a valid country"

// Bad error messages
"Invalid input"
"Error"
"Field cannot be empty"
```

---

## Hooks

### useMotionPreference

Access motion settings and system preferences.

```typescript
import { useMotionPreference } from '@ecosystem/design-system/hooks'

function MyComponent() {
  const { scale, shouldAnimate, prefersReducedMotion } = useMotionPreference()

  // scale: 0-10 (user's motion intensity setting)
  // shouldAnimate: boolean (false if scale=0 or system prefers reduced motion)
  // prefersReducedMotion: boolean (system preference)

  return shouldAnimate ? <Animated /> : <Static />
}
```

This hook automatically syncs with the system's `prefers-reduced-motion` media query.

### useTheme

Control theme and color mode.

```typescript
import { useTheme } from '@ecosystem/design-system/hooks'

function ThemeSelector() {
  const { theme, mode, setTheme, setMode, toggleMode } = useTheme()

  return (
    <>
      <button onClick={() => setTheme('sage')}>Sage Theme</button>
      <button onClick={() => setTheme('volt')}>Volt Theme</button>
      <button onClick={toggleMode}>Toggle {mode} Mode</button>
    </>
  )
}
```

Theme changes trigger smooth CSS variable transitions managed by the ThemeProvider.

---

## Package Exports

```typescript
// Main export (everything)
import { Button, TextField, FormField, useTheme } from '@ecosystem/design-system'

// Scoped exports
import { spacing, typography } from '@ecosystem/design-system/tokens'
import { Button, Card, TextField, Checkbox } from '@ecosystem/design-system/atoms'
import { FormField, SearchBar, RadioGroup } from '@ecosystem/design-system/molecules'
import { Header, Footer } from '@ecosystem/design-system/organisms'
import { useMotionPreference, useTheme } from '@ecosystem/design-system/hooks'
import { CustomizerPanel } from '@ecosystem/design-system/features'
```

---

## Accessibility

This isn't a section you skip. It's the whole point.

### Motion Accessibility

✅ **Implemented:**
- Motion intensity slider (0-10)
- Automatic sync with system `prefers-reduced-motion`
- `useMotionPreference` hook exposes both settings
- All motion components respect `shouldAnimate` flag
- Zero animation when disabled (instant state changes)

### Keyboard & Focus

✅ **Implemented:**
- All interactive components support keyboard navigation
- Visible focus rings using theme `--color-focus`
- Focus ring configuration in base tokens
- Ref forwarding on all components

### Color Contrast

✅ **All theme color combinations meet WCAG AA standards (4.5:1 minimum)**

### Accessibility Checklist

Before shipping any component:

- [ ] Works with motion preference = 0
- [ ] Keyboard navigable with visible focus
- [ ] Screen reader announces purpose correctly
- [ ] Color contrast meets AA minimum
- [ ] No information conveyed by color alone
- [ ] Touch targets are at least 44x44px

---

## State Management

The design system uses **Zustand** for state management with localStorage persistence:

- **Theme state** ([store/theme.ts](store/theme.ts)): Current theme name and color mode
- **Customizer state** ([features/customizer/store.ts](features/customizer/store.ts)): Motion intensity, x-ray mode, system preferences

Both stores persist to localStorage and survive page reloads.

---

## Technology Stack

- **React 18** - Component library
- **TypeScript** - Type safety throughout
- **Framer Motion** - Animation library
- **Zustand** - State management with persistence
- **tsup** - Build tool (ESM + CJS outputs)
- **Tailwind CSS** - Utility-first styling (via CSS variables)

---

## Roadmap

### Recently Completed ✅

- **Input Atoms** - TextField, TextArea, Checkbox, Radio, Select, Switch
- **Form Molecules** - FormField, SearchBar, RadioGroup, CheckboxGroup
- **Complete Color System** - All themes now have foreground variants for proper light/dark mode support
- **Comprehensive Documentation** - Full examples and validation patterns

### Coming Soon

- **XRayMode Component** - Visual overlay showing design tokens, component boundaries, and accessibility info
- **AINote Component** - Document AI collaboration directly in the UI
- **Additional Patterns** - Layout components (PageLayout, Modal, Dropdown, Tooltip)
- **Compound Components** - Card.Header, Card.Body, Card.Footer for complex layouts
- **Additional Atoms** - Text (typography component), Badge, Avatar, Spinner
- **Token JSON Export** - For use in native platforms (iOS, Android)
- **Storybook** - Interactive component documentation
- **Testing Suite** - Unit, visual regression, and a11y tests
- **Form Builder** - Visual form builder using the molecule components

---

## Philosophy in Practice

When building or extending this design system, remember:

**Lovable by Design** isn't achieved by adding more features. It's achieved by making every existing feature feel like it was crafted with care. Smooth transitions. Thoughtful defaults. Generous touch targets. Text that's easy to read.

**Transparent by Design** means the system itself should be understandable. If someone can't figure out how to use a component by reading its types and looking at one example, we've failed.

**User Control & Freedom** means components should have sensible defaults but allow customization. Don't force decisions on users that they should make themselves.

**Generous by Design** means this code should teach. Comments explain *why*. Types are explicit. Examples are plentiful. Someone learning React should be able to learn from this codebase.

---

## Relationship to Apps

The design system is consumed by all apps in the ecosystem:

| App | How It Uses the Design System |
|-----|------------------------------|
| **Portfolio** | Full integration. The Customizer is a hero feature showcasing design philosophy. |
| **Sage Stocks** | Components + custom financial visualizations built on tokens. |
| **Creative Powerup** | Components + community-specific patterns. |
| **SageOS** | (Future) Will extend with productivity-specific components. |

Apps can extend but should rarely override. If you find yourself overriding frequently, the design system might need to evolve.

---

## Contributing

### Adding a New Token

1. Add to the appropriate file in `tokens/`
2. Export from `tokens/index.ts`
3. Document the use case in comments
4. Update ThemeProvider if it needs to be a CSS variable
5. Update this README

### Adding a New Component

1. Determine the right level (atom, molecule, pattern, feature)
2. Create directory with component file, types
3. Forward refs for all components
4. Use only tokens for styling—no hardcoded values
5. **Use CSS variables for component-level customization** (see [Component Typography](#component-typography-css-variables))
   - Define dedicated CSS variables (e.g., `--font-mycomponent-text`)
   - Make components consume these variables internally
   - Avoid requiring typography props on every instance
   - Document the CSS variables in component examples
6. Include accessibility from the start (focus, keyboard, ARIA)
7. Export from the level's `index.ts`
8. Add to main `src/index.ts` if appropriate
9. Update this README with usage examples including CSS variable setup

---

## Extending the Design System

### Adding a New Typography Theme

The typography system is built for extensibility. To add a new font theme:

**1. Update Typography Tokens** ([tokens/typography.ts](tokens/typography.ts))

```typescript
// Add to fontFamilies
mystique: {
  heading: 'Playfair Display',
  body: 'Inter',
  mono: 'Fira Code',
  description: 'Elegant serif headings with modern sans body',
  usage: {
    heading: 'Elegant headings, editorial content',
    body: 'Clean, readable UI text',
    mono: 'Code blocks, technical content',
  },
},

// Add to fontLoadingConfig
mystique: {
  heading: { family: 'Playfair Display', weights: ['400', '600', '700'] },
  body: { family: 'Inter', weights: ['400', '500', '600', '700'] },
  mono: { family: 'Fira Code', weights: ['400', '500', '600', '700'] },
},
```

**2. Update Theme Tokens** (create `tokens/mystique.ts`)

Follow the pattern from `studio.ts`, `sage.ts`, or `volt.ts` to define colors, effects, and motion for your theme.

**3. Load Fonts in App** (app layout)

```typescript
import { Playfair_Display, Inter, Fira_Code } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-mystique-heading',
  weight: ['400', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-mystique-body',
  weight: ['400', '500', '600', '700'],
});
```

**4. Update ThemeProvider** ([providers/ThemeProvider.tsx](providers/ThemeProvider.tsx))

Add font family mappings to the `fontFamilies` object (around line 23).

**5. Update Customizer** ([features/customizer/CustomizerPanel.tsx](features/customizer/CustomizerPanel.tsx))

Add your theme to the theme selector array (around line 75).

**6. Export from Tokens**

```typescript
// tokens/index.ts
export * from './mystique';

// Update THEME_NAMES
export const THEME_NAMES = ['studio', 'sage', 'volt', 'mystique'] as const;
```

**Complete Typography System:**
The `typographySystem` export includes comprehensive scales, presets, and utilities:
- Font families for all themes
- Font size scale (xs → 9xl) with responsive values
- Font weights, line heights, letter spacing
- Type presets (heading-1 through heading-6, body variants, etc.)
- Utility functions for CSS variable generation

### Sticky Navigation Patterns

The design system supports multi-level sticky navigation following Swiss grid principles:

**When to Use Triple-Stack Navigation:**

Use `TertiaryNav` when you need **three levels of navigation hierarchy**:
1. **Primary (Header)**: Site-wide navigation
2. **Secondary (SecondaryNav)**: Page sections (e.g., Overview | Tokens | Atoms)
3. **Tertiary (TertiaryNav)**: Sub-sections or component selectors (e.g., Colors | Typography | Spacing)

**Pattern Implementation:**

```typescript
import { Header, SecondaryNav, TertiaryNav } from '@ecosystem/design-system';

// Header: top-0, z-50, h-16 lg:h-20
<Header sticky={true} />

// SecondaryNav: top-16 lg:top-20, z-40, h-16
<SecondaryNav
  items={sections}
  activeId={activeSection}
  onItemChange={setActiveSection}
/>

// TertiaryNav: top-32 lg:top-36, z-30, h-14
<TertiaryNav
  items={subsections}
  activeId={activeSubsection}
  onItemChange={setActiveSubsection}
/>
```

**Positioning Math:**
- Each level's `top` = sum of all previous heights
- Header: 64px/80px (mobile/desktop)
- SecondaryNav: 64px
- TertiaryNav starts at: 128px/144px (64+64 / 80+64)

**Visual Hierarchy:**
- Z-index decreases: 50 → 40 → 30
- Background opacity decreases for depth
- Padding/text size decreases for subordination

**When NOT to use triple-stack:**
- Only 1-2 navigation levels needed
- Mobile-first designs where screen space is limited
- Simple pages with minimal hierarchy

**Documentation Reference:**
See the full pattern documentation in Sage Design Studio > Organisms > Triple-Stack Sticky Navigation Pattern.

### Spacing System (Swiss Grid)

The spacing system uses an **8px base unit** following Swiss grid principles:

```typescript
import { typographySystem } from '@ecosystem/design-system';

// Spacing tokens
xs:   4px  (0.5 units) - Icon padding, tight elements
sm:   8px  (1 unit)    - Compact spacing
md:   16px (2 units)   - Default spacing
lg:   24px (3 units)   - Generous padding
xl:   32px (4 units)   - Major component spacing
2xl:  48px (6 units)   - Large section spacing
3xl:  64px (8 units)   - Spacious sections
4xl:  96px (12 units)  - Hero sections
5xl:  128px (16 units) - Maximum whitespace
```

**Best Practices:**
1. **Embrace negative space** - Use larger values liberally for clarity
2. **Consistent vertical rhythm** - Same hierarchy = same spacing
3. **Scale appropriately** - Larger elements = larger spacing
4. **Avoid arbitrary values** - Stick to the defined scale

See Tokens > Spacing in Sage Design Studio for full documentation.

---

## Related Documentation

- [DESIGN-PHILOSOPHY.md](/DESIGN-PHILOSOPHY.md) — The North Star (read this first)
- [AGENTS.md](/AGENTS.md) — Technical setup and agent guidelines
- [Component Workflow Guide](docs/COMPONENT_WORKFLOW.md) — Step-by-step component creation checklist

---

**Remember:** This design system isn't a constraint. It's a foundation. Use it to build things that make people feel seen, capable, and empowered.

The components are the easy part. The hard part is remembering why they exist.
