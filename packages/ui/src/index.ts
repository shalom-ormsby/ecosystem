// ============================================================================
// MAIN BARREL EXPORTS - Backward Compatible
// ============================================================================
// All components remain importable from '@sds/ui' root
// Example: import { Button, Card, Dialog } from '@sds/ui'

// Actions
export * from './components/actions/Button';
export * from './components/actions/Link';
export * from './components/actions/Toggle';
export * from './components/actions/ToggleGroup';

// Forms
export * from './components/forms/Checkbox';
export * from './components/forms/Combobox';
export * from './components/forms/Form';
export * from './components/forms/Input';
export * from './components/forms/InputOTP';
export * from './components/forms/Label';
export * from './components/forms/RadioGroup';
export * from './components/forms/Select';
export * from './components/forms/Slider';
export * from './components/forms/Switch';
export * from './components/forms/Textarea';
export * from './components/forms/ThemeSwitcher';
export * from './components/forms/ThemeToggle';

// Navigation
export * from './components/navigation/Breadcrumb';
export * from './components/navigation/Command';
export * from './components/navigation/Menubar';
export * from './components/navigation/NavLink';
export * from './components/navigation/NavigationMenu';
export * from './components/navigation/Pagination';
export * from './components/navigation/Tabs';

// Overlays
export * from './components/overlays/AlertDialog';
export * from './components/overlays/ContextMenu';
export * from './components/overlays/Dialog';
export * from './components/overlays/Drawer';
export * from './components/overlays/DropdownMenu';
export * from './components/overlays/HoverCard';
export * from './components/overlays/Popover';
export * from './components/overlays/Sheet';
export * from './components/overlays/Tooltip';

// Feedback
export * from './components/feedback/Alert';
export * from './components/feedback/Progress';
export * from './components/feedback/Skeleton';
export * from './components/feedback/Sonner';
export * from './components/feedback/Toast';


// Data Display
export * from './components/data-display/Avatar';
export * from './components/data-display/Badge';
export * from './components/data-display/Calendar';
export * from './components/data-display/Card';
export * from './components/data-display/Code';
export * from './components/data-display/CollapsibleCodeBlock';
export * from './components/data-display/DataTable';
export * from './components/data-display/GitHubIcon';
export * from './components/data-display/Heading';
export * from './components/data-display/Table';
export * from './components/data-display/Text';

// Layout
export * from './components/layout/Accordion';
export * from './components/layout/AspectRatio';
export * from './components/layout/Carousel';
export * from './components/layout/Collapsible';
export * from './components/layout/DatePicker';
export * from './components/layout/Footer';
export * from './components/layout/Header';
export * from './components/layout/Resizable';
export * from './components/layout/ScrollArea';
export * from './components/layout/Separator';

// Providers
export * from './providers/ThemeProvider';

// Hooks
export * from './hooks/useTheme';
export * from './hooks/useMotionPreference';
export * from './hooks/useForm';

// Stores
export * from './lib/store';

// Utilities
export * from './lib/utils';
export * from './lib/validation';
export * from './lib/syntax-parser';

// ============================================================================
// OPTIONAL CATEGORY-BASED EXPORTS (Future Use)
// ============================================================================
// These allow category-specific imports for better code organization
// Example: import { Button } from '@sds/ui/actions'
// Note: These require package.json exports configuration

// Re-export categories for convenience
export * as Actions from './components/actions';
export * as Forms from './components/forms';
export * as Navigation from './components/navigation';
export * as Overlays from './components/overlays';
export * as Feedback from './components/feedback';
export * as DataDisplay from './components/data-display';
export * as Layout from './components/layout';
export * as Providers from './providers';
export * as Hooks from './hooks';
