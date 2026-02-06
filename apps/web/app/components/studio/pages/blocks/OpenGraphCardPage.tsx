'use client';

import { useState, useEffect } from 'react';
import {
    OpenGraphCard,
    Card,
    Button,
    Input,
    Label,
    Switch,
    ColorPicker,
    CollapsibleCodeBlock,
    Badge,
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
    type GradientConfig,
} from '@thesage/ui';
import { Eye, Code, Download, Save, Check, Trash2, RefreshCw } from 'lucide-react';

interface SavedOGDesign {
    id: string;
    name: string;
    title: string;
    description: string;
    showIcon: boolean;
    titleFontSize: number;
    descriptionFontSize: number;
    gradientType: 'linear' | 'radial';
    gradientAngle: number;
    gradientColor1: string;
    gradientColor2: string;
    fontFamily: string;
    createdAt: number;
    isActive?: boolean;
}

// Available fonts for OG cards (matching typography system fonts)
const AVAILABLE_FONTS = [
    'Abril Fatface',
    'Cormorant Garamond',
    'Fira Code',
    'Fredoka',
    'IBM Plex Mono',
    'IBM Plex Sans',
    'Instrument Sans',
    'Inter',
    'JetBrains Mono',
    'Karla',
    'Lato',
    'Libre Bodoni',
    'Lora',
    'Manrope',
    'Merriweather',
    'Montserrat',
    'Nunito',
    'Nunito Sans',
    'Open Sans',
    'Outfit',
    'Playfair Display',
    'Poppins',
    'Quicksand',
    'Raleway',
    'Roboto',
    'Roboto Mono',
    'Source Sans 3',
    'Space Grotesk',
    'Work Sans',
].sort();

export function OpenGraphCardPage() {
    // State for all customizable properties
    const [title, setTitle] = useState('Sage Design Engine');
    const [description, setDescription] = useState("The Solopreneur's Development Stack");
    const [showIcon, setShowIcon] = useState(true);
    const [titleFontSize, setTitleFontSize] = useState(96);
    const [descriptionFontSize, setDescriptionFontSize] = useState(42);
    const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
    const [gradientAngle, setGradientAngle] = useState(135);
    const [gradientColor1, setGradientColor1] = useState('#171717');
    const [gradientColor2, setGradientColor2] = useState('#0a0a0a');
    const [fontFamily, setFontFamily] = useState('Space Grotesk');
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

    // Saved designs
    const [savedDesigns, setSavedDesigns] = useState<SavedOGDesign[]>([]);
    const [designName, setDesignName] = useState('');
    const [justSaved, setJustSaved] = useState(false);

    // Load saved designs from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('sage-og-designs');
        if (saved) {
            try {
                setSavedDesigns(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to load saved designs:', e);
            }
        }
    }, []);

    // Save current design
    const saveDesign = () => {
        const design: SavedOGDesign = {
            id: `og-${Date.now()}`,
            name: designName || `Design ${savedDesigns.length + 1}`,
            title,
            description,
            showIcon,
            titleFontSize,
            descriptionFontSize,
            gradientType,
            gradientAngle,
            gradientColor1,
            gradientColor2,
            fontFamily,
            createdAt: Date.now(),
        };

        const updated = [...savedDesigns, design];
        setSavedDesigns(updated);
        localStorage.setItem('sage-og-designs', JSON.stringify(updated));
        setDesignName('');
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 2000);
    };

    // Load a saved design
    const loadDesign = (design: SavedOGDesign) => {
        setTitle(design.title);
        setDescription(design.description);
        setShowIcon(design.showIcon);
        setTitleFontSize(design.titleFontSize);
        setDescriptionFontSize(design.descriptionFontSize);
        setGradientType(design.gradientType);
        setGradientAngle(design.gradientAngle);
        setGradientColor1(design.gradientColor1);
        setGradientColor2(design.gradientColor2);
        setFontFamily(design.fontFamily || 'Space Grotesk');
    };

    // Delete a saved design
    const deleteDesign = (id: string) => {
        const updated = savedDesigns.filter(d => d.id !== id);
        setSavedDesigns(updated);
        localStorage.setItem('sage-og-designs', JSON.stringify(updated));
    };

    // Set active design (to be used by opengraph-image.tsx)
    const [isSyncing, setIsSyncing] = useState(false);

    const setActiveDesign = async (id: string) => {
        const updated = savedDesigns.map(d => ({
            ...d,
            isActive: d.id === id
        }));
        setSavedDesigns(updated);
        localStorage.setItem('sage-og-designs', JSON.stringify(updated));
        localStorage.setItem('sage-og-active', id);

        // Sync to Vercel Edge Config
        const activeDesign = updated.find(d => d.id === id);
        if (activeDesign) {
            setIsSyncing(true);
            try {
                // Format config for storage
                const configForStorage = {
                    title: activeDesign.title,
                    description: activeDesign.description,
                    variant: 'gradient',
                    gradient: {
                        type: activeDesign.gradientType,
                        // Handle angle vs position based on type
                        ...(activeDesign.gradientType === 'linear'
                            ? { angle: activeDesign.gradientAngle }
                            : { position: 'circle at 50% 0%' }),
                        colors: [activeDesign.gradientColor1, activeDesign.gradientColor2],
                    },
                    titleFontSize: activeDesign.titleFontSize,
                    descriptionFontSize: activeDesign.descriptionFontSize,
                    showIcon: activeDesign.showIcon,
                    fontFamily: activeDesign.fontFamily || 'Space Grotesk',
                };

                const response = await fetch('/api/edge-config', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        key: 'og_card_config',
                        value: configForStorage
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Edge Config sync failed:', errorData);
                    throw new Error(errorData.error || 'Failed to sync to Edge Config');
                }

                const result = await response.json();
                console.log('✅ Successfully synced to Edge Config:', result);
                console.log('⏱️  Changes may take up to 5 seconds to propagate globally');
            } catch (err: any) {
                console.error('Failed to sync active design:', err);
                alert(`Saved locally, but failed to sync to Edge Config: ${err.message}`);
            } finally {
                setIsSyncing(false);
            }
        }
    };

    const activeDesign = savedDesigns.find(d => d.isActive);

    // Generate config code for opengraph-image.tsx
    const generateConfigCode = (design: SavedOGDesign) => {
        return `const config = {
  title: '${design.title}',
  description: '${design.description}',
  variant: 'gradient' as const,
  gradient: {
    type: '${design.gradientType}' as const,
    ${design.gradientType === 'linear' ? `angle: ${design.gradientAngle},` : `position: 'circle at 50% 0%',`}
    colors: ['${design.gradientColor1}', '${design.gradientColor2}'],
  },
  titleFontSize: ${design.titleFontSize},
  descriptionFontSize: ${design.descriptionFontSize},
  fontFamily: '${design.fontFamily || 'Space Grotesk'}',
};`;
    };

    // Copy config to clipboard
    const [justCopied, setJustCopied] = useState(false);
    const copyConfig = async (design: SavedOGDesign) => {
        try {
            await navigator.clipboard.writeText(generateConfigCode(design));
            setJustCopied(true);
            setTimeout(() => setJustCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // Build gradient config from current state
    const gradientConfig: GradientConfig = {
        type: gradientType,
        angle: gradientAngle,
        position: 'circle at 50% 0%',
        colors: [gradientColor1, gradientColor2],
    };

    // Generate code example
    const generateCode = () => {
        const iconCode = showIcon ? '' : '\n      icon={null}';
        const gradientCode = `\n      gradient={{
        type: '${gradientType}',
        ${gradientType === 'linear' ? `angle: ${gradientAngle},` : `position: 'circle at 50% 0%',`}
        colors: ['${gradientColor1}', '${gradientColor2}'],
      }}`;
        const titleFontCode = titleFontSize !== 96 ? `\n      titleFontSize={${titleFontSize}}` : '';
        const descFontCode = descriptionFontSize !== 42 ? `\n      descriptionFontSize={${descriptionFontSize}}` : '';
        const fontCode = fontFamily !== 'Space Grotesk' ? `\n      fontFamily="${fontFamily}"` : '';

        return `import { OpenGraphCard } from '@thesage/ui';

export default function OGImage() {
  return (
    <OpenGraphCard
      title="${title}"
      description="${description}"
      variant="gradient"${iconCode}${gradientCode}${titleFontCode}${descFontCode}${fontCode}
    />
  );
}`;
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-24">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
                    Open Graph Card
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl">
                    A specialized component for generating beautiful Open Graph images (1200x630px).
                    Customize in real-time with interactive controls.
                </p>
            </div>

            {/* Interactive Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Controls Panel */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="p-6 space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">
                                Content
                            </h3>
                            <div className="space-y-4">
                                {/* Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter title..."
                                    />
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter description..."
                                    />
                                </div>

                                {/* Show Icon Toggle */}
                                <div className="flex items-center justify-between pt-2">
                                    <Label htmlFor="show-icon" className="cursor-pointer">
                                        Display Icon
                                    </Label>
                                    <Switch
                                        id="show-icon"
                                        checked={showIcon}
                                        onCheckedChange={setShowIcon}
                                    />
                                </div>

                                {/* Title Font Size */}
                                <div className="space-y-2 pt-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="title-size">Title Size</Label>
                                        <span className="text-sm text-[var(--color-text-secondary)]">
                                            {titleFontSize}px
                                        </span>
                                    </div>
                                    <input
                                        id="title-size"
                                        type="range"
                                        min="40"
                                        max="180"
                                        step="4"
                                        value={titleFontSize}
                                        onChange={(e) => setTitleFontSize(Number(e.target.value))}
                                        className="w-full h-2 bg-[var(--color-surface)] rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
                                    />
                                </div>

                                {/* Description Font Size */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="desc-size">Description Size</Label>
                                        <span className="text-sm text-[var(--color-text-secondary)]">
                                            {descriptionFontSize}px
                                        </span>
                                    </div>
                                    <input
                                        id="desc-size"
                                        type="range"
                                        min="20"
                                        max="80"
                                        step="2"
                                        value={descriptionFontSize}
                                        onChange={(e) => setDescriptionFontSize(Number(e.target.value))}
                                        className="w-full h-2 bg-[var(--color-surface)] rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
                                    />
                                </div>

                                {/* Font Family */}
                                <div className="space-y-2 pt-2">
                                    <Label htmlFor="font-family">Font Family</Label>
                                    <Select value={fontFamily} onValueChange={setFontFamily}>
                                        <SelectTrigger id="font-family">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {AVAILABLE_FONTS.map((font) => (
                                                <SelectItem key={font} value={font}>
                                                    {font}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-[var(--color-border)] pt-6">
                            <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">
                                Gradient
                            </h3>
                            <div className="space-y-4">
                                {/* Gradient Type */}
                                <div className="space-y-2">
                                    <Label>Type</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button
                                            variant={gradientType === 'linear' ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setGradientType('linear')}
                                            className="w-full"
                                        >
                                            Linear
                                        </Button>
                                        <Button
                                            variant={gradientType === 'radial' ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setGradientType('radial')}
                                            className="w-full"
                                        >
                                            Radial
                                        </Button>
                                    </div>
                                </div>

                                {/* Angle (for linear) */}
                                {gradientType === 'linear' && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="angle">Angle</Label>
                                            <span className="text-sm text-[var(--color-text-secondary)]">
                                                {gradientAngle}°
                                            </span>
                                        </div>
                                        <input
                                            id="angle"
                                            type="range"
                                            min="0"
                                            max="360"
                                            step="15"
                                            value={gradientAngle}
                                            onChange={(e) => setGradientAngle(Number(e.target.value))}
                                            className="w-full h-2 bg-[var(--color-surface)] rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
                                        />
                                        <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
                                            <span>0°</span>
                                            <span>90°</span>
                                            <span>180°</span>
                                            <span>270°</span>
                                            <span>360°</span>
                                        </div>
                                    </div>
                                )}

                                {/* Color 1 */}
                                <div className="space-y-2">
                                    <ColorPicker
                                        label="Start Color"
                                        value={gradientColor1}
                                        onChange={setGradientColor1}
                                    />
                                </div>

                                {/* Color 2 */}
                                <div className="space-y-2">
                                    <ColorPicker
                                        label="End Color"
                                        value={gradientColor2}
                                        onChange={setGradientColor2}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-[var(--color-border)] pt-6">
                            <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">
                                Save Design
                            </h3>
                            <div className="space-y-3">
                                <div className="space-y-2">
                                    <Label htmlFor="design-name">Design Name</Label>
                                    <Input
                                        id="design-name"
                                        value={designName}
                                        onChange={(e) => setDesignName(e.target.value)}
                                        placeholder="My Custom OG Card"
                                    />
                                </div>
                                <Button
                                    onClick={saveDesign}
                                    className="w-full gap-2"
                                    disabled={justSaved}
                                >
                                    {justSaved ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            Saved!
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            Save Design
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        {savedDesigns.length > 0 && (
                            <div className="border-t border-[var(--color-border)] pt-6">
                                <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">
                                    Saved Designs
                                </h3>
                                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                                    {savedDesigns.map((design) => (
                                        <Card key={design.id} className="p-3">
                                            <div className="space-y-2">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-medium text-sm truncate">
                                                                {design.name}
                                                            </p>
                                                            {design.isActive && (
                                                                <Badge variant="default" className="text-xs">
                                                                    Active
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-[var(--color-text-muted)] truncate">
                                                            {design.title}
                                                        </p>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => deleteDesign(design.id)}
                                                        className="h-8 w-8 p-0 flex-shrink-0"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => loadDesign(design)}
                                                        className="flex-1 gap-2 text-xs"
                                                    >
                                                        <RefreshCw className="w-3 h-3" />
                                                        Load
                                                    </Button>
                                                    <Button
                                                        variant={design.isActive ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => setActiveDesign(design.id)}
                                                        className="flex-1 gap-2 text-xs"
                                                    >
                                                        {isSyncing && design.isActive ? (
                                                            <>
                                                                <RefreshCw className="w-3 h-3 animate-spin" />
                                                                Syncing...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Check className="w-3 h-3" />
                                                                {design.isActive ? 'Active' : 'Set Active'}
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                                {activeDesign && (
                                    <div className="mt-4 p-4 bg-[var(--color-primary)]/10 rounded-lg border border-[var(--color-primary)]/20 space-y-3">
                                        <div>
                                            <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                                                ✓ Active Design: {activeDesign.name}
                                            </p>
                                            <p className="text-xs text-[var(--color-text-muted)]">
                                                Your design is automatically synced to the edge. If you are developing locally without Edge Config, follow these steps:
                                            </p>
                                        </div>
                                        <ol className="text-xs text-[var(--color-text-secondary)] space-y-1 list-decimal list-inside">
                                            <li>Copy the config below</li>
                                            <li>Open <code className="text-[var(--color-primary)] bg-[var(--color-surface)] px-1 py-0.5 rounded text-xs">app/opengraph-image.tsx</code></li>
                                            <li>Replace the <code className="text-[var(--color-primary)] bg-[var(--color-surface)] px-1 py-0.5 rounded text-xs">config</code> object</li>
                                        </ol>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => copyConfig(activeDesign)}
                                            className="w-full gap-2"
                                        >
                                            {justCopied ? (
                                                <>
                                                    <Check className="w-4 h-4" />
                                                    Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <Code className="w-4 h-4" />
                                                    Copy Config for opengraph-image.tsx
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </Card>
                </div>

                {/* Preview Panel */}
                <div className="lg:col-span-2 space-y-4 sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto">
                    {/* Tab Switcher */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant={activeTab === 'preview' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setActiveTab('preview')}
                            className="gap-2"
                        >
                            <Eye className="w-4 h-4" />
                            Preview
                        </Button>
                        <Button
                            variant={activeTab === 'code' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setActiveTab('code')}
                            className="gap-2"
                        >
                            <Code className="w-4 h-4" />
                            Code
                        </Button>
                    </div>

                    {/* Preview */}
                    {activeTab === 'preview' && (
                        <Card className="p-6 bg-[var(--color-surface)]">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-[var(--color-text-secondary)]">
                                        1200 × 630px preview (scaled to fit)
                                    </p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-2"
                                        onClick={() => {
                                            // TODO: Implement download functionality
                                            alert('Download functionality coming soon!');
                                        }}
                                    >
                                        <Download className="w-4 h-4" />
                                        Download
                                    </Button>
                                </div>
                                <div className="w-full overflow-auto">
                                    <div className="min-w-[600px]">
                                        <div
                                            style={{
                                                transform: 'scale(0.5)',
                                                transformOrigin: 'top left',
                                                width: '1200px',
                                                height: '630px',
                                            }}
                                        >
                                            <OpenGraphCard
                                                title={title}
                                                description={description}
                                                variant="gradient"
                                                icon={showIcon ? undefined : null}
                                                gradient={gradientConfig}
                                                titleFontSize={titleFontSize}
                                                descriptionFontSize={descriptionFontSize}
                                                fontFamily={fontFamily}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Code */}
                    {activeTab === 'code' && (
                        <Card className="p-6 bg-[var(--color-surface)]">
                            <CollapsibleCodeBlock
                                id="og-card-custom-code"
                                code={generateCode()}
                                language="tsx"
                                defaultCollapsed={false}
                                showCopy={true}
                            />
                        </Card>
                    )}
                </div>
            </div>

            {/* Documentation Sections */}
            <div className="space-y-8 pt-8 border-t border-[var(--color-border)]">
                {/* Installation */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                        Installation
                    </h2>
                    <CollapsibleCodeBlock
                        id="og-card-install"
                        code="pnpm add @thesage/ui"
                        language="bash"
                        defaultCollapsed={false}
                        showCopy={true}
                    />
                </section>

                {/* Basic Usage */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                        Basic Usage
                    </h2>
                    <CollapsibleCodeBlock
                        id="og-card-basic"
                        code={`import { OpenGraphCard } from '@thesage/ui';

// In your app/opengraph-image.tsx (Next.js)
export default function OGImage() {
  return (
    <OpenGraphCard
      title="My Page"
      description="A description of my page"
    />
  );
}`}
                        language="tsx"
                        defaultCollapsed={false}
                        showCopy={true}
                    />
                </section>

                {/* With Custom Icon */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                        With Custom Icon
                    </h2>
                    <CollapsibleCodeBlock
                        id="og-card-icon"
                        code={`import { OpenGraphCard } from '@thesage/ui';

export default function OGImage() {
  return (
    <OpenGraphCard
      title="My Brand"
      description="Tagline here"
      icon={
        <img
          src="/logo.png"
          width={80}
          height={80}
          alt="Logo"
        />
      }
    />
  );
}`}
                        language="tsx"
                        defaultCollapsed={false}
                        showCopy={true}
                    />
                </section>

                {/* Props Reference */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                        Props
                    </h2>
                    <Card className="p-6">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex items-baseline gap-2">
                                    <code className="text-sm font-mono text-[var(--color-primary)]">title</code>
                                    <span className="text-xs text-[var(--color-text-muted)]">string</span>
                                </div>
                                <p className="text-sm text-[var(--color-text-secondary)]">
                                    Main title text displayed prominently on the card.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-baseline gap-2">
                                    <code className="text-sm font-mono text-[var(--color-primary)]">description</code>
                                    <span className="text-xs text-[var(--color-text-muted)]">string</span>
                                </div>
                                <p className="text-sm text-[var(--color-text-secondary)]">
                                    Subtitle or description text displayed below the title.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-baseline gap-2">
                                    <code className="text-sm font-mono text-[var(--color-primary)]">icon</code>
                                    <span className="text-xs text-[var(--color-text-muted)]">ReactNode</span>
                                </div>
                                <p className="text-sm text-[var(--color-text-secondary)]">
                                    Custom logo, icon, or image element. Pass null to hide the default icon.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-baseline gap-2">
                                    <code className="text-sm font-mono text-[var(--color-primary)]">gradient</code>
                                    <span className="text-xs text-[var(--color-text-muted)]">GradientConfig</span>
                                </div>
                                <p className="text-sm text-[var(--color-text-secondary)]">
                                    Custom gradient configuration with type, colors, angle (linear), or position (radial).
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-baseline gap-2">
                                    <code className="text-sm font-mono text-[var(--color-primary)]">variant</code>
                                    <span className="text-xs text-[var(--color-text-muted)]">'primary' | 'secondary' | 'accent' | 'sage' | 'gradient'</span>
                                </div>
                                <p className="text-sm text-[var(--color-text-secondary)]">
                                    Preset visual style variant. Use 'gradient' with custom gradient prop for full control.
                                </p>
                            </div>
                        </div>
                    </Card>
                </section>
            </div>
        </div>
    );
}
