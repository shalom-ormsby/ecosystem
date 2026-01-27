// ============================================================================
// MAIN BARREL EXPORTS - Backward Compatible
// ============================================================================
// All components remain importable from '@thesage/ui' root
// Example: import { Button, Card, Dialog } from '@thesage/ui'

// Actions
export * from './components/actions/Button';
export * from './components/actions/Link';
export * from './components/actions/Toggle';
export * from './components/actions/ToggleGroup';
export * from './components/actions/Magnetic';

// Forms
export * from './components/forms/Checkbox';
export * from './components/forms/ColorPicker';
export * from './components/forms/Combobox';
export * from './components/forms/DragDrop';
export * from './components/forms/FilterButton';
export * from './components/forms/Form';
export * from './components/forms/Input';
export * from './components/forms/InputOTP';
export * from './components/forms/Label';
export * from './components/forms/RadioGroup';
export * from './components/forms/SearchBar';
export * from './components/forms/Select';
export * from './components/forms/Slider';
export * from './components/forms/Switch';
export * from './components/forms/TextField';
export * from './components/forms/Textarea';
export * from './components/forms/ThemeSwitcher';
export * from './components/forms/ThemeToggle';

// Navigation
export * from './components/navigation/Breadcrumb';
export * from './components/navigation/Breadcrumbs';
export * from './components/navigation/Command';
export * from './components/navigation/Menubar';
export * from './components/navigation/NavLink';
export * from './components/navigation/NavigationMenu';
export * from './components/navigation/Pagination';
export * from './components/navigation/SecondaryNav';
export * from './components/navigation/Tabs';
export * from './components/navigation/TertiaryNav';

// Overlays
export * from './components/overlays/AlertDialog';
export * from './components/overlays/ContextMenu';
export * from './components/overlays/Dialog';
export * from './components/overlays/Drawer';
export * from './components/overlays/Dropdown';
export * from './components/overlays/DropdownMenu';
export * from './components/overlays/HoverCard';
export * from './components/overlays/Modal';
export * from './components/overlays/Popover';
export * from './components/overlays/Sheet';
export * from './components/overlays/Tooltip';

// Feedback
export * from './components/feedback/Alert';
export * from './components/feedback/Progress';
export * from './components/feedback/ProgressBar';
export * from './components/feedback/Skeleton';
export * from './components/feedback/Sonner';
export * from './components/feedback/Spinner';
export * from './components/feedback/Toast';


// Data Display
export * from './components/data-display/AspectImage';
export * from './components/data-display/Avatar';
export * from './components/data-display/Badge';
export * from './components/data-display/Brand';
export * from './components/data-display/Calendar';
export * from './components/data-display/Card';
export * from './components/data-display/Code';
export * from './components/data-display/CollapsibleCodeBlock';
export * from './components/data-display/DataTable';
export * from './components/data-display/DescriptionList';
export * from './components/data-display/GitHubIcon';
export * from './components/data-display/Heading';
export * from './components/data-display/Table';
export * from './components/data-display/Text';
export * from './components/data-display/VariableWeightText';
export * from './components/data-display/Typewriter';
export * from './components/blocks/social/OpenGraphCard';

// Layout
export * from './components/layout/Accordion';
export * from './components/layout/AspectRatio';
export * from './components/layout/Carousel';
export * from './components/layout/Collapsible';
export * from './components/layout/Container';
export * from './components/layout/CustomizerPanel';
export * from './components/layout/DatePicker';
export * from './components/layout/Footer';
export * from './components/layout/Grid';
export * from './components/layout/Header';
export * from './components/layout/PageLayout';
export * from './components/layout/PageTemplate';
export * from './components/layout/Resizable';
export * from './components/layout/ScrollArea';
export * from './components/layout/Separator';
export * from './components/layout/Sidebar';
export * from './components/layout/Stack';

// Backgrounds
export * from './components/backgrounds/WarpBackground';
export * from './components/backgrounds/FaultyTerminal';

// Motion
export * from "./components/motion/AnimatedBeam";
export * from "./components/backgrounds/OrbBackground";
export * from "./components/blocks/Hero";
export * from './components/cursor/SplashCursor';
export * from './components/cursor/TargetCursor';

// Providers
export * from './providers/ThemeProvider';

// Hooks
export * from './hooks/useTheme';
export * from './hooks/useMotionPreference';
export * from './hooks/useForm';

// Stores
export * from './lib/store';

// Utilities
export * from './lib/animations';
export * from './lib/breadcrumbs';
export * from './lib/colors';
export * from './lib/utils';
export * from './lib/validation';
export * from './lib/syntax-parser';

// Tokens (selective re-exports)
export { typographySystem } from '@thesage/tokens';

// Component Registry (metadata)
export * from './component-registry';

// ============================================================================
// OPTIONAL CATEGORY-BASED EXPORTS (Future Use)
// ============================================================================
// These allow category-specific imports for better code organization
// Example: import { Button } from '@thesage/ui/actions'
// Note: These require package.json exports configuration

// Re-export categories for convenience
export * as Actions from './components/actions';
export * as Forms from './components/forms';
export * as Navigation from './components/navigation';
export * as Overlays from './components/overlays';
export * as Feedback from './components/feedback';
export * as DataDisplay from './components/data-display';
export * as Layout from './components/layout';
export * as Backgrounds from './components/backgrounds';
export * as Motion from './components/cursor';
export * as Providers from './providers';
export * as Hooks from './hooks';
