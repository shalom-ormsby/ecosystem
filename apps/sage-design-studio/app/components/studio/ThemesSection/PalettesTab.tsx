'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Badge,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  Input,
  Label,
  ColorPicker,
  DragDropList,
  DragDropHandle,
} from '@sage/ui';
import { rectSortingStrategy } from '@dnd-kit/sortable';
import { useTheme } from '@sage/ui';
import { useCustomizer } from '@sage/ui';
import { SecondaryNav, type SecondaryNavItem } from '@sage/ui';
import { colorPalettes, type PaletteCategory } from '@sage/tokens';
import {
  Check, MoreVertical, Edit, Trash2, Plus,
  Briefcase, Palette, Leaf, Zap, Minimize,
  Crown, Smile, Eye, Star, LayoutGrid
} from 'lucide-react';

const NAV_ITEMS: SecondaryNavItem[] = [
  { id: 'all', label: 'All', icon: <LayoutGrid className="w-4 h-4" /> },
  { id: 'custom', label: 'My Palettes', icon: <Star className="w-4 h-4" /> },
  { id: 'professional', label: 'Professional', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'creative', label: 'Creative', icon: <Palette className="w-4 h-4" /> },
  { id: 'nature', label: 'Nature', icon: <Leaf className="w-4 h-4" /> },
  { id: 'vibrant', label: 'Vibrant', icon: <Zap className="w-4 h-4" /> },
  { id: 'minimal', label: 'Minimal', icon: <Minimize className="w-4 h-4" /> },
  { id: 'luxury', label: 'Luxury', icon: <Crown className="w-4 h-4" /> },
  { id: 'playful', label: 'Playful', icon: <Smile className="w-4 h-4" /> },
  { id: 'accessible', label: 'Accessible', icon: <Eye className="w-4 h-4" /> },
];

export function PalettesTab() {
  const [selectedCategory, setSelectedCategory] = useState<PaletteCategory | 'all' | 'custom'>('all');
  const [accessibleOnly, setAccessibleOnly] = useState(false);
  const [editingPalette, setEditingPalette] = useState<any>(null);
  const [deletingPalette, setDeletingPalette] = useState<any>(null);
  const [creatingPalette, setCreatingPalette] = useState(false);
  const [newPaletteName, setNewPaletteName] = useState('');
  const [newPaletteDescription, setNewPaletteDescription] = useState('');
  const [editedPrimaryColor, setEditedPrimaryColor] = useState('');
  const [editedSecondaryColor, setEditedSecondaryColor] = useState('');
  const [editedAccentColor, setEditedAccentColor] = useState('');
  const [localPaletteOrder, setLocalPaletteOrder] = useState<any[]>([]);

  const { theme, mode } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);



  // Use proper Zustand selectors for reactive state
  const applyColorPalette = useCustomizer(state => state.applyColorPalette);
  const resetCustomColors = useCustomizer(state => state.resetCustomColors);
  const deletePalette = useCustomizer(state => state.deletePalette);
  const updatePalette = useCustomizer(state => state.updatePalette);
  const savePalette = useCustomizer(state => state.savePalette);
  const reorderPalettes = useCustomizer(state => state.reorderPalettes);
  const savedPalettes = useCustomizer(state => state.savedPalettes);

  // Subscribe to entire customColors object to ensure reactivity, then derive current palette
  const customColors = useCustomizer(state => state.customColors);

  const currentPalette = customColors?.[theme]?.[mode] || null;

  // Combine curated and saved palettes
  const allPalettes = [
    ...colorPalettes,
    ...savedPalettes,
  ];

  // Initialize local palette order on mount or when source data changes
  useEffect(() => {
    setLocalPaletteOrder(allPalettes);
  }, [savedPalettes.length]); // Only re-sync when saved palettes count changes

  if (!mounted) {
    return null;
  }

  // Use local order if available, otherwise use allPalettes
  const displayPalettes = localPaletteOrder.length > 0 ? localPaletteOrder : allPalettes;

  const filteredPalettes = displayPalettes
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p => !accessibleOnly || p.wcagAA);

  const applyPalette = (paletteId: string) => {
    const palette = allPalettes.find(p => p.id === paletteId);
    if (!palette) return;

    // Apply all three colors atomically in a single update
    applyColorPalette(theme, mode, {
      primary: palette.primary,
      secondary: palette.secondary,
      accent: palette.accent,
      name: palette.name,
      description: palette.description,
    });
  };

  const handleDeletePalette = (paletteId: string) => {
    deletePalette(paletteId);
    setDeletingPalette(null);
  };

  const handleEditPalette = () => {
    if (editingPalette && newPaletteName.trim()) {
      const isCustom = editingPalette.category === 'custom';

      if (isCustom) {
        // Update existing custom palette (including name)
        updatePalette(editingPalette.id, {
          name: newPaletteName.trim(),
          primary: editedPrimaryColor,
          secondary: editedSecondaryColor,
          accent: editedAccentColor,
        });
      } else {
        // Create a copy of curated palette with edited colors and name
        savePalette({
          name: newPaletteName.trim(),
          description: editingPalette.description || `Custom version of ${editingPalette.name}`,
          primary: editedPrimaryColor,
          secondary: editedSecondaryColor,
          accent: editedAccentColor,
          wcagAA: editingPalette.wcagAA || false,
          wcagAAA: editingPalette.wcagAAA || false,
          mood: editingPalette.mood || [],
          bestFor: editingPalette.bestFor,
        });
      }

      setEditingPalette(null);
      setNewPaletteName('');
    }
  };

  const handleCreatePalette = () => {
    if (newPaletteName.trim() && editedPrimaryColor && editedAccentColor) {
      savePalette({
        name: newPaletteName.trim(),
        description: newPaletteDescription.trim() || 'Custom palette',
        primary: editedPrimaryColor,
        secondary: editedSecondaryColor,
        accent: editedAccentColor,
        wcagAA: false,
        wcagAAA: false,
        mood: [],
      });

      setCreatingPalette(false);
      setNewPaletteName('');
      setNewPaletteDescription('');
      setEditedPrimaryColor('');
      setEditedSecondaryColor('');
      setEditedAccentColor('');
    }
  };

  const resetColors = () => {
    resetCustomColors(theme, mode);
  };

  const renderPaletteCard = (palette: any, isDragging = false) => {
    const isActive = currentPalette?.primary === palette.primary;
    const isCustom = palette.category === 'custom';

    return (
      <Card
        key={palette.id}
        className={`
          p-4 transition-all flex flex-col h-full
          ${!isDragging ? 'hover:shadow-lg hover:border-[var(--color-primary)]' : 'shadow-xl'}
          ${isActive ? 'ring-2 ring-[var(--color-primary)]' : ''}
        `}
      >
        {/* Title and Menu */}
        <div className="flex items-start justify-between mb-2">
          {/* Drag Handle */}
          <div className="mr-2 mt-1">
            <DragDropHandle />
          </div>
          <div className="flex-1 pr-2">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium">{palette.name}</h4>
              {isActive && (
                <Badge variant="default" className="text-xs">
                  <Check className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              )}
            </div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              {palette.description}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={(e) => {
                e.stopPropagation();
                setEditingPalette(palette);
                setNewPaletteName(palette.name);
                setEditedPrimaryColor(palette.primary);
                setEditedSecondaryColor(palette.secondary || palette.primary);
                setEditedAccentColor(palette.accent);
              }}>
                <Edit className="mr-2 h-4 w-4" />
                {isCustom ? 'Edit' : 'Edit (creates copy)'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeletingPalette(palette);
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Color Preview */}
        <div className="flex gap-2 mb-3">
          {/* Primary Color */}
          <div className="flex-1">
            <div
              className="h-16 rounded mb-1"
              style={{ backgroundColor: palette.primary }}
              title={`Primary: ${palette.primary}`}
            />
            <div className="text-xs text-center text-[var(--color-text-secondary)] font-medium">
              Primary
            </div>
          </div>
          {/* Secondary Color */}
          <div className="flex-1">
            <div
              className="h-16 rounded mb-1"
              style={{ backgroundColor: palette.secondary || palette.primary }}
              title={`Secondary: ${palette.secondary || palette.primary}`}
            />
            <div className="text-xs text-center text-[var(--color-text-secondary)] font-medium">
              Secondary
            </div>
          </div>
          {/* Accent Color */}
          <div className="flex-1">
            <div
              className="h-16 rounded mb-1"
              style={{ backgroundColor: palette.accent }}
              title={`Accent: ${palette.accent}`}
            />
            <div className="text-xs text-center text-[var(--color-text-secondary)] font-medium">
              Accent
            </div>
          </div>
        </div>

        {/* Palette Info */}
        <div className="space-y-2 mb-4">
          {/* Mood Tags */}
          <div className="flex flex-wrap gap-1">
            {palette.mood?.map((mood: string) => (
              <Badge key={mood} variant="secondary" className="text-xs">
                {mood}
              </Badge>
            ))}
          </div>

          {/* Accessibility Badge */}
          <div className="flex gap-2 items-center">
            {palette.wcagAAA && (
              <Badge variant="default" className="text-xs bg-green-700 text-white hover:bg-green-800 border-none">AAA</Badge>
            )}
            {palette.wcagAA && !palette.wcagAAA && (
              <Badge variant="default" className="text-xs bg-green-500 text-white hover:bg-green-600 border-none">AA</Badge>
            )}
            {palette.harmony && (
              <Badge variant="outline" className="text-xs text-[var(--color-text-secondary)]">{palette.harmony}</Badge>
            )}
          </div>

          {/* Rationale & Best For */}
          {palette.rationale && (
            <p className="text-xs text-[var(--color-text-tertiary)] mt-2">
              {palette.rationale}
            </p>
          )}

          {palette.bestFor && (
            <p className="text-xs text-[var(--color-text-secondary)]">
              <span className="font-semibold">Best for:</span> {palette.bestFor.join(', ')}
            </p>
          )}
        </div>

        {/* Apply Button */}
        <Button
          onClick={() => applyPalette(palette.id)}
          variant="default"
          size="sm"
          className={`
            w-full mt-auto transition-all border-none justify-center
            ${isActive
              ? 'bg-[var(--color-accent)] text-[var(--color-accent-foreground)] ring-1 ring-[var(--color-accent)]'
              : ''}
          `}
        >
          {isActive ? 'Currently Active' : 'Apply Palette'}
        </Button>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Curated Color Palettes</h3>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Pre-designed, accessible color schemes for quick customization.
          Choose a palette to instantly update your theme.
        </p>
      </div>

      {/* Color Logic Explanation */}
      <Card className="p-4 bg-[var(--color-surface)] border-[var(--color-border)]">
        <div className="space-y-2">
          <p className="text-sm font-medium">How Color Customization Works</p>
          <ul className="text-xs text-[var(--color-text-secondary)] space-y-1 list-disc list-inside">
            <li><strong>Primary</strong>: Main brand color for buttons, links, and key UI elements</li>
            <li><strong>Secondary</strong>: Supporting color for less prominent actions (Advanced mode)</li>
            <li><strong>Accent</strong>: Highlight color for special elements and call-to-actions (Advanced mode)</li>
          </ul>
          <p className="text-xs text-[var(--color-text-tertiary)] italic mt-2">
            Colors are saved per theme ({theme}) and mode ({mode}). Switch modes in the Customizer panel.
          </p>
        </div>
      </Card>

      {/* Current Status */}
      {currentPalette && (
        <Card className="p-4 border-[var(--color-primary)] bg-[var(--color-primary)]/5 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[var(--color-primary)]" />
                <span className="text-sm font-semibold">Active Theme Colors</span>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {/* Primary */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full border shadow-sm ring-1 ring-[var(--color-border)]"
                    style={{ backgroundColor: currentPalette.primary }}
                  />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-[var(--color-text-secondary)] tracking-wider font-semibold">Primary</span>
                    <span className="text-xs font-mono">{currentPalette.primary}</span>
                  </div>
                </div>

                {/* Secondary */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full border shadow-sm ring-1 ring-[var(--color-border)]"
                    style={{ backgroundColor: currentPalette.secondary || currentPalette.primary }}
                  />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-[var(--color-text-secondary)] tracking-wider font-semibold">Secondary</span>
                    <span className="text-xs font-mono">{currentPalette.secondary || currentPalette.primary}</span>
                  </div>
                </div>

                {/* Accent */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full border shadow-sm ring-1 ring-[var(--color-border)]"
                    style={{ backgroundColor: currentPalette.accent || currentPalette.primary }}
                  />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-[var(--color-text-secondary)] tracking-wider font-semibold">Accent</span>
                    <span className="text-xs font-mono">{currentPalette.accent || currentPalette.primary}</span>
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="default"
              size="sm"
              onClick={resetColors}
              className="w-full lg:w-auto whitespace-nowrap shrink-0 border-none"
            >
              Reset to Default
            </Button>
          </div>
        </Card>
      )}

      {/* Filters Header (Sticky) */}
      <SecondaryNav
        items={NAV_ITEMS}
        activeId={selectedCategory}
        onItemChange={(id) => setSelectedCategory(id as PaletteCategory | 'all' | 'custom')}
        mode="standalone"
      />

      {/* Additional Filters */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="accessible-only"
          checked={accessibleOnly}
          onChange={(e) => setAccessibleOnly(e.target.checked)}
          className="rounded"
        />
        <label htmlFor="accessible-only" className="text-sm">
          Show only WCAG AA compliant palettes
        </label>
      </div>

      {/* Palette Grid with Drag & Drop */}
      <div className="space-y-4">
        <DragDropList
          items={filteredPalettes as any}
          onReorder={(reordered) => {
            // Create a map of reordered items by ID
            const reorderedMap = new Map(reordered.map((p: any, index) => [p.id, { item: p, newIndex: index }]));

            // Build new order by replacing reordered items in their new positions
            const newOrder = [...displayPalettes];
            const itemsToReorder = newOrder.filter(p => reorderedMap.has(p.id));

            // Remove reordered items from their current positions
            const filteredOut = newOrder.filter(p => !reorderedMap.has(p.id));

            // Insert reordered items at the start (since they're the visible filtered items)
            const finalOrder = [...reordered, ...filteredOut];

            setLocalPaletteOrder(finalOrder);

            // Also update saved palettes in store for persistence
            const reorderedSaved = reordered.filter((p: any) => p.category === 'custom');
            if (reorderedSaved.length > 0) {
              reorderPalettes(reorderedSaved as any);
            }
          }}
          renderItem={(palette, isDragging) => renderPaletteCard(palette, isDragging)}
          withHandle={true}
          strategy={rectSortingStrategy}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        />

        {/* Create New Palette Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            className="p-4 cursor-pointer transition-all border-dashed border-2 hover:shadow-lg hover:border-[var(--color-primary)] flex flex-col items-center justify-center min-h-[300px]"
            onClick={() => {
              setCreatingPalette(true);
              setEditedPrimaryColor('#0066cc');
              setEditedSecondaryColor('#5a67d8');
              setEditedAccentColor('#ff6b35');
            }}
          >
            <Plus className="h-12 w-12 mb-3 text-[var(--color-text-secondary)]" />
            <p className="text-lg font-medium text-[var(--color-text-secondary)]">Create New Palette</p>
            <p className="text-sm text-[var(--color-text-tertiary)] mt-1">
              Design your own color scheme
            </p>
          </Card>
        </div>
      </div>

      {filteredPalettes.length === 0 && (
        <div className="text-center py-12 text-[var(--color-text-secondary)]">
          No palettes found. Try a different category or disable accessibility filter.
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingPalette} onOpenChange={() => setDeletingPalette(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Palette</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingPalette?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeletePalette(deletingPalette?.id)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Palette Dialog */}
      <Dialog open={!!editingPalette} onOpenChange={() => {
        setEditingPalette(null);
        setNewPaletteName('');
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Palette</DialogTitle>
            <DialogDescription>
              {editingPalette?.category === 'custom'
                ? 'Modify the name and colors of your palette'
                : 'Editing will create a custom copy of this palette'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-palette-name">Palette Name</Label>
              <Input
                id="edit-palette-name"
                value={newPaletteName}
                onChange={(e) => setNewPaletteName(e.target.value)}
                placeholder="Enter palette name"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newPaletteName.trim()) {
                    handleEditPalette();
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Primary Color</Label>
              <ColorPicker
                value={editedPrimaryColor}
                onChange={setEditedPrimaryColor}
              />
            </div>
            <div className="space-y-2">
              <Label>Secondary Color</Label>
              <ColorPicker
                value={editedSecondaryColor}
                onChange={setEditedSecondaryColor}
              />
            </div>
            <div className="space-y-2">
              <Label>Accent Color</Label>
              <ColorPicker
                value={editedAccentColor}
                onChange={setEditedAccentColor}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setEditingPalette(null);
              setNewPaletteName('');
            }}>
              Cancel
            </Button>
            <Button onClick={handleEditPalette} disabled={!newPaletteName.trim()}>
              {editingPalette?.category === 'custom' ? 'Save Changes' : 'Create Copy'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create New Palette Dialog */}
      <Dialog open={creatingPalette} onOpenChange={setCreatingPalette}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Palette</DialogTitle>
            <DialogDescription>
              Design your own custom color palette
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-palette-name">Palette Name</Label>
              <Input
                id="new-palette-name"
                value={newPaletteName}
                onChange={(e) => setNewPaletteName(e.target.value)}
                placeholder="My Custom Palette"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newPaletteName.trim() && editedPrimaryColor && editedAccentColor) {
                    handleCreatePalette();
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-palette-description">Description (optional)</Label>
              <Input
                id="new-palette-description"
                value={newPaletteDescription}
                onChange={(e) => setNewPaletteDescription(e.target.value)}
                placeholder="A description of your palette"
              />
            </div>
            <div className="space-y-2">
              <Label>Primary Color</Label>
              <ColorPicker
                value={editedPrimaryColor}
                onChange={setEditedPrimaryColor}
              />
            </div>
            <div className="space-y-2">
              <Label>Secondary Color</Label>
              <ColorPicker
                value={editedSecondaryColor}
                onChange={setEditedSecondaryColor}
              />
            </div>
            <div className="space-y-2">
              <Label>Accent Color</Label>
              <ColorPicker
                value={editedAccentColor}
                onChange={setEditedAccentColor}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setCreatingPalette(false);
              setNewPaletteName('');
              setNewPaletteDescription('');
              setEditedPrimaryColor('');
              setEditedSecondaryColor('');
              setEditedAccentColor('');
            }}>
              Cancel
            </Button>
            <Button
              onClick={handleCreatePalette}
              disabled={!newPaletteName.trim() || !editedPrimaryColor || !editedAccentColor}
            >
              Create Palette
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
