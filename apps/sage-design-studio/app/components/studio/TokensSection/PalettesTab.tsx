'use client';

import { useState } from 'react';
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
} from '@sage/ui';
import { useTheme } from '@sage/ui/hooks';
import { useCustomizer } from '@sage/ui';
import { colorPalettes, type PaletteCategory } from '@sage/tokens';
import { Check, MoreVertical, Edit, Trash2, Plus } from 'lucide-react';

const CATEGORIES: { value: PaletteCategory | 'all' | 'custom'; label: string; icon: string }[] = [
  { value: 'all', label: 'All', icon: '✨' },
  { value: 'custom', label: 'My Palettes', icon: '⭐' },
  { value: 'professional', label: 'Professional', icon: '💼' },
  { value: 'creative', label: 'Creative', icon: '🎨' },
  { value: 'nature', label: 'Nature', icon: '🌿' },
  { value: 'vibrant', label: 'Vibrant', icon: '⚡' },
  { value: 'minimal', label: 'Minimal', icon: '◻️' },
  { value: 'luxury', label: 'Luxury', icon: '👑' },
  { value: 'playful', label: 'Playful', icon: '🎈' },
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

  const { theme, mode } = useTheme();

  // Use proper Zustand selectors for reactive state
  const applyColorPalette = useCustomizer(state => state.applyColorPalette);
  const resetCustomColors = useCustomizer(state => state.resetCustomColors);
  const deletePalette = useCustomizer(state => state.deletePalette);
  const updatePalette = useCustomizer(state => state.updatePalette);
  const savePalette = useCustomizer(state => state.savePalette);
  const savedPalettes = useCustomizer(state => state.savedPalettes);
  const currentPalette = useCustomizer(state => state.customColors?.[theme]?.[mode] || null);

  // Combine curated and saved palettes
  const allPalettes = [
    ...colorPalettes,
    ...savedPalettes,
  ];

  const filteredPalettes = allPalettes
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
        <Card className="p-4 border-[var(--color-primary)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded border border-[var(--color-border)]"
                style={{ backgroundColor: currentPalette.primary }}
              />
              <div>
                <p className="text-sm font-medium">Custom colors active</p>
                <p className="text-xs text-[var(--color-text-secondary)] font-mono">
                  Primary: {currentPalette.primary.toUpperCase()}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={resetColors}
            >
              Reset to Theme Default
            </Button>
          </div>
        </Card>
      )}

      {/* Filters */}
      <div className="space-y-4">
        {/* Category Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">Category</label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.value)}
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Accessibility Filter */}
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
      </div>

      {/* Palette Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Existing Palettes */}
        {filteredPalettes.map(palette => {
          const isActive = currentPalette?.primary === palette.primary;
          const isCustom = palette.category === 'custom';

          return (
            <Card
              key={palette.id}
              className={`
                p-4 cursor-pointer transition-all
                hover:shadow-lg hover:border-[var(--color-primary)]
                ${isActive ? 'ring-2 ring-[var(--color-primary)]' : ''}
              `}
            >
              {/* Title and Menu */}
              <div className="flex items-start justify-between mb-2">
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
              <div className="space-y-2">
                {/* Mood Tags */}
                <div className="flex flex-wrap gap-1">
                  {palette.mood.map(mood => (
                    <Badge key={mood} variant="secondary" className="text-xs">
                      {mood}
                    </Badge>
                  ))}
                </div>

                {/* Accessibility Badge */}
                {palette.wcagAAA && (
                  <Badge variant="default" className="text-xs bg-green-600">AAA</Badge>
                )}
                {palette.wcagAA && !palette.wcagAAA && (
                  <Badge variant="default" className="text-xs">AA</Badge>
                )}
                {!palette.wcagAA && (
                  <Badge variant="outline" className="text-xs">Vibrant</Badge>
                )}

                {/* Best For */}
                {palette.bestFor && (
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Best for: {palette.bestFor.join(', ')}
                  </p>
                )}
              </div>

              {/* Apply Button */}
              <Button
                onClick={() => applyPalette(palette.id)}
                variant={isActive ? 'outline' : 'default'}
                size="sm"
                className="w-full mt-3"
              >
                {isActive ? 'Currently Active' : 'Apply Palette'}
              </Button>
            </Card>
          );
        })}

        {/* Create New Palette Card */}
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
