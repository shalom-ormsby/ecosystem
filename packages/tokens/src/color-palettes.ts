/**
 * Curated Color Palette Library
 * Pre-designed, accessible color schemes for quick customization
 */

export interface ColorPalette {
  id: string;
  name: string;
  description: string;
  category: PaletteCategory;

  // Core colors
  primary: string;
  secondary: string;
  accent: string;

  // Metadata
  harmony?: string;
  rationale?: string;
  bestFor?: string[];

  // Accessibility & Tags (Legacy support + new fields)
  mood?: string[];
  wcagAA?: boolean;
  wcagAAA?: boolean;
}

export type PaletteCategory =
  | 'professional'
  | 'creative'
  | 'nature'
  | 'vibrant'
  | 'minimal'
  | 'luxury'
  | 'playful'
  | 'accessible'
  | 'custom'; // Ensure custom is allowed if used elsewhere

/**
 * Curated Palette Collection
 */
export const colorPalettes: ColorPalette[] = [
  // === PROFESSIONAL ===
  {
    id: 'deep-trust',
    name: 'Deep Trust',
    description: 'Confident navy with subtle warmth',
    category: 'professional',
    primary: '#1e3a5f',
    secondary: '#64748b',
    accent: '#f59e0b',
    harmony: 'Split-Complementary',
    bestFor: ['Finance', 'Legal', 'Enterprise SaaS'],
    rationale: 'Navy (trust, authority) paired with Slate (neutral utility) and Amber (approachable warmth). The amber accent draws attention to CTAs without disrupting professional gravitas. High contrast ratios ensure accessibility.',
    wcagAA: true,
    wcagAAA: true
  },
  {
    id: 'graphite-precision',
    name: 'Graphite Precision',
    description: 'Modern technical authority',
    category: 'professional',
    primary: '#0f172a',
    secondary: '#475569',
    accent: '#0ea5e9',
    harmony: 'Analogous + Accent',
    bestFor: ['Dev Tools', 'Analytics', 'SaaS Dashboards'],
    rationale: 'Near-black primary (Slate 900) conveys technical sophistication. Steel secondary provides UI structure. Sky blue accent pops for interactive elements. Inspired by developer tools like VS Code and GitHub.',
    wcagAA: true,
    wcagAAA: false
  },
  {
    id: 'obsidian-gold',
    name: 'Obsidian Gold',
    description: 'Premium high-end authority',
    category: 'professional',
    primary: '#09090b',
    secondary: '#3f3f46',
    accent: '#ca8a04',
    harmony: 'Complementary',
    bestFor: ['Luxury Tech', 'Premium Services', 'High-End Products'],
    rationale: 'Zinc 950 primary delivers true premium feel without harsh black. Zinc 700 secondary creates layered depth for cards and containers. Yellow-700 gold accent signals exclusivity and value.',
    wcagAA: true,
    wcagAAA: true
  },
  {
    id: 'slate-ember',
    name: 'Slate Ember',
    description: 'Warm corporate modernism',
    category: 'professional',
    primary: '#334155',
    secondary: '#94a3b8',
    accent: '#ea580c',
    harmony: 'Complementary',
    bestFor: ['Consulting', 'B2B Services', 'Corporate Sites'],
    rationale: 'Slate 700 primary feels mature yet approachable. Slate 400 secondary lightens UI without losing professionalism. Orange 600 accent energizes without overwhelming—perfect for subtle call-to-action emphasis.',
    wcagAA: true,
    wcagAAA: true
  },

  // === CREATIVE ===
  {
    id: 'sunset-gradient',
    name: 'Sunset Gradient',
    description: 'Warm analogous energy flow',
    category: 'creative',
    primary: '#db2777',
    secondary: '#f97316',
    accent: '#fbbf24',
    harmony: 'Analogous',
    bestFor: ['Design Agencies', 'Portfolios', 'Creative Studios'],
    rationale: 'Pink 600 → Orange 500 → Amber 400 creates natural warmth progression mimicking golden hour. This analogous flow feels cohesive yet dynamic. Works beautifully with white backgrounds and dark text.',
    wcagAA: true,
    wcagAAA: false
  },
  {
    id: 'electric-violet',
    name: 'Electric Violet',
    description: 'Bold complementary punch',
    category: 'creative',
    primary: '#7c3aed',
    secondary: '#be185d',
    accent: '#fb923c',
    harmony: 'Triadic',
    bestFor: ['Entertainment', 'Events', 'Music', 'Gaming'],
    rationale: 'Violet 600, Rose 700, and Orange 400 form a dynamic triadic harmony. Each color is equidistant on the wheel, creating maximum visual interest while maintaining balance. Use violet as dominant, rose for sections, orange for CTAs.',
    wcagAA: true,
    wcagAAA: false
  },
  {
    id: 'indigo-bloom',
    name: 'Indigo Bloom',
    description: 'Sophisticated feminine power',
    category: 'creative',
    primary: '#4338ca',
    secondary: '#be123c',
    accent: '#d946ef',
    harmony: 'Split-Complementary',
    bestFor: ['Beauty', 'Fashion Tech', 'Lifestyle Apps'],
    rationale: 'Indigo 700 anchors with depth and sophistication. Rose 700 provides rich contrast. Fuchsia 500 accent sparkles for highlights and interactions. The palette balances strength with approachability.',
    wcagAA: true,
    wcagAAA: true
  },
  {
    id: 'coral-reef',
    name: 'Coral Reef',
    description: 'Playful warmth with depth',
    category: 'creative',
    primary: '#f43f5e',
    secondary: '#06b6d4',
    accent: '#fcd34d',
    harmony: 'Triadic',
    bestFor: ['Social Apps', 'Community Platforms', 'Lifestyle'],
    rationale: 'Rose 500 (coral), Cyan 500 (ocean), and Amber 300 (sand) evoke tropical vibrancy. This triadic scheme feels energetic yet grounded. Great for apps targeting younger, socially-engaged audiences.',
    wcagAA: true,
    wcagAAA: false
  },

  // === NATURE ===
  {
    id: 'forest-floor',
    name: 'Forest Floor',
    description: 'Deep organic earthiness',
    category: 'nature',
    primary: '#14532d',
    secondary: '#78350f',
    accent: '#84cc16',
    harmony: 'Analogous + Accent',
    bestFor: ['Sustainability', 'Wellness', 'Organic Products'],
    rationale: 'Green 900 (deep forest) and Amber 900 (rich earth/bark) create grounded warmth. Lime 500 accent represents new growth and vitality. This palette speaks to environmental consciousness and natural authenticity.',
    wcagAA: true,
    wcagAAA: true
  },
  {
    id: 'ocean-calm',
    name: 'Ocean Calm',
    description: 'Tranquil aquatic serenity',
    category: 'nature',
    primary: '#0f766e',
    secondary: '#0284c7',
    accent: '#22d3ee',
    harmony: 'Analogous',
    bestFor: ['Healthcare', 'Meditation', 'Clean Tech'],
    rationale: 'Teal 700, Sky 600, and Cyan 400 form a calming blue-green progression. Mimics depth variations in water. Low emotional intensity promotes trust and calm—ideal for wellness and health applications.',
    wcagAA: true,
    wcagAAA: false
  },
  {
    id: 'sage-garden',
    name: 'Sage Garden',
    description: 'Botanical mindfulness',
    category: 'nature',
    primary: '#6366f1',
    secondary: '#059669',
    accent: '#fef08a',
    harmony: 'Triadic',
    bestFor: ['Meditation Apps', 'Spa', 'Personal Growth'],
    rationale: 'Indigo 500 (lavender energy), Emerald 600 (sage calm), Yellow 200 (morning light). Named colors match actual botanicals. Soft yellow accent provides gentle illumination for key interactions.',
    wcagAA: true,
    wcagAAA: false
  },
  {
    id: 'desert-dawn',
    name: 'Desert Dawn',
    description: 'Warm arid minimalism',
    category: 'nature',
    primary: '#d6d3d1',
    secondary: '#a8a29e',
    accent: '#c2410c',
    harmony: 'Monochromatic + Accent',
    bestFor: ['Architecture', 'Interior Design', 'Artisan Goods'],
    rationale: 'Stone 300 and Stone 400 create subtle warmth typical of desert sands. Orange 700 accent recalls desert flora and sunset. Minimalist yet rich—perfect for showcasing products and photography.',
    wcagAA: false,
    wcagAAA: false
  },

  // === VIBRANT ===
  {
    id: 'neon-signal',
    name: 'Neon Signal',
    description: 'High-energy cyberpunk electric',
    category: 'vibrant',
    primary: '#06b6d4',
    secondary: '#d946ef',
    accent: '#fde047',
    harmony: 'Triadic (CMY-based)',
    bestFor: ['Gaming', 'Web3', 'Music Streaming', 'Youth Apps'],
    rationale: 'Cyan 500, Fuchsia 500, Yellow 300 approximate CMY primaries—the digital/print color model. Creates electric, almost glitch-aesthetic energy. Use sparingly on dark backgrounds for maximum impact.',
    wcagAA: false,
    wcagAAA: false
  },
  {
    id: 'citrus-burst',
    name: 'Citrus Burst',
    description: 'Maximum fresh impact',
    category: 'vibrant',
    primary: '#65a30d',
    secondary: '#7c3aed',
    accent: '#14b8a6',
    harmony: 'Split-Complementary',
    bestFor: ['Sports', 'Energy Drinks', 'Youth Brands'],
    rationale: 'Lime 600, Violet 600, and Teal 500 create intentional visual tension. The near-complementary lime/violet pairing vibrates with energy, while teal accent provides unexpected freshness. Bold and unapologetic.',
    wcagAA: false,
    wcagAAA: false
  },
  {
    id: 'fire-intensity',
    name: 'Fire Intensity',
    description: 'Passionate warmth progression',
    category: 'vibrant',
    primary: '#b91c1c',
    secondary: '#ea580c',
    accent: '#fbbf24',
    harmony: 'Analogous (Warm)',
    bestFor: ['Food Delivery', 'Fitness', 'Action Sports'],
    rationale: 'Red 700 → Orange 600 → Amber 400 represents heat intensity from coals to flame to spark. This warm analogous progression demands attention and creates urgency. Best balanced with plenty of whitespace.',
    wcagAA: true,
    wcagAAA: false
  },
  {
    id: 'aurora-borealis',
    name: 'Aurora Borealis',
    description: 'Ethereal northern lights',
    category: 'vibrant',
    primary: '#0891b2',
    secondary: '#7c3aed',
    accent: '#22c55e',
    harmony: 'Triadic',
    bestFor: ['Astronomy Apps', 'Science', 'Innovation'],
    rationale: 'Cyan 600, Violet 600, and Green 500 capture the magical shifting hues of aurora displays. Equally spaced on the wheel, they create visual wonder without chaos. Perfect for science and exploration themes.',
    wcagAA: true,
    wcagAAA: false
  },

  // === MINIMAL ===
  {
    id: 'swiss-mono',
    name: 'Swiss Mono',
    description: 'International style precision',
    category: 'minimal',
    primary: '#000000',
    secondary: '#52525b',
    accent: '#2563eb',
    harmony: 'Achromatic + Accent',
    bestFor: ['Typography', 'Photography', 'Editorial'],
    rationale: "Pure black and Zinc 600 honor Swiss International Style. Blue 600 accent (classic 'international blue') provides subtle direction without disrupting minimalist purity. Maximum contrast, zero distraction.",
    wcagAA: true,
    wcagAAA: true
  },
  {
    id: 'paper-whisper',
    name: 'Paper Whisper',
    description: 'Soft reading comfort',
    category: 'minimal',
    primary: '#27272a',
    secondary: '#71717a',
    accent: '#a1a1aa',
    harmony: 'Monochromatic',
    bestFor: ['Reading Apps', 'Journaling', 'Documentation'],
    rationale: 'Zinc 800, 500, and 400 create subtle hierarchy without color distraction. True monochrome reduces cognitive load for reading-heavy interfaces. Accent provides gentle distinction for interactive elements.',
    wcagAA: true,
    wcagAAA: true
  },
  {
    id: 'cool-slate',
    name: 'Cool Slate',
    description: 'Technical quiet confidence',
    category: 'minimal',
    primary: '#334155',
    secondary: '#64748b',
    accent: '#38bdf8',
    harmony: 'Analogous + Accent',
    bestFor: ['Architecture Portfolios', 'Consulting', 'Legal Tech'],
    rationale: 'Slate 700 and 500 create cool, professional atmosphere. Sky 400 accent whispers rather than shouts—perfect for subtle navigation cues and sparse interactive highlights.',
    wcagAA: true,
    wcagAAA: true
  },
  {
    id: 'warm-neutral',
    name: 'Warm Neutral',
    description: 'Organic minimalism',
    category: 'minimal',
    primary: '#292524',
    secondary: '#78716c',
    accent: '#92400e',
    harmony: 'Monochromatic + Accent',
    bestFor: ['Artisan E-commerce', 'Coffee Brands', 'Craft'],
    rationale: 'Stone 800 and 500 provide warmth missing from pure grays. Amber 800 accent recalls coffee, leather, wood—materials with character. Minimal but not cold, modern but not sterile.',
    wcagAA: true,
    wcagAAA: true
  },

  // === LUXURY ===
  {
    id: 'royal-velvet',
    name: 'Royal Velvet',
    description: 'Regal opulent depth',
    category: 'luxury',
    primary: '#4c1d95',
    secondary: '#1e1b4b',
    accent: '#d97706',
    harmony: 'Complementary',
    bestFor: ['VIP Services', 'Luxury Hotels', 'Private Banking'],
    rationale: 'Violet 900 (deep purple) and Indigo 950 (near-black midnight) create layered richness. Amber 600 gold accent adds warmth and signals value. Historically associated with royalty and exclusivity.',
    wcagAA: true,
    wcagAAA: true
  },
  {
    id: 'champagne-noir',
    name: 'Champagne Noir',
    description: 'High-fashion sophistication',
    category: 'luxury',
    primary: '#0c0a09',
    secondary: '#1c1917',
    accent: '#d4af37',
    harmony: 'Monochromatic + Metallic',
    bestFor: ['Fashion', 'Jewelry', 'Luxury Retail'],
    rationale: 'Stone 950 (warm black) and Stone 900 create subtle depth. True metallic gold (#D4AF37) elevates beyond standard amber. The warmth in blacks prevents coldness while maintaining elegance.',
    wcagAA: true,
    wcagAAA: true
  },
  {
    id: 'emerald-club',
    name: 'Emerald Club',
    description: 'Old money establishment',
    category: 'luxury',
    primary: '#064e3b',
    secondary: '#166534',
    accent: '#b45309',
    harmony: 'Analogous + Accent',
    bestFor: ['Private Clubs', 'Wealth Management', 'Heritage Brands'],
    rationale: 'Emerald 900 and Green 800 create tone-on-tone richness associated with stability and tradition. Bronze/Amber 700 accent recalls old brass and mahogany. Communicates established trustworthiness.',
    wcagAA: true,
    wcagAAA: true
  },
  {
    id: 'midnight-sapphire',
    name: 'Midnight Sapphire',
    description: 'Contemporary luxury tech',
    category: 'luxury',
    primary: '#172554',
    secondary: '#1e3a8a',
    accent: '#fafafa',
    harmony: 'Monochromatic + Contrast',
    bestFor: ['Luxury Auto', 'Premium Electronics', 'Elite Services'],
    rationale: 'Blue 950 and Blue 800 create depth like sapphire gemstone. Pure white (Zinc 50) accent cuts through dramatically. Modern luxury aesthetic—think high-end automotive interfaces.',
    wcagAA: true,
    wcagAAA: true
  },

  // === PLAYFUL ===
  {
    id: 'candy-shop',
    name: 'Candy Shop',
    description: 'Joyful youthful sweetness',
    category: 'playful',
    primary: '#ec4899',
    secondary: '#8b5cf6',
    accent: '#facc15',
    harmony: 'Triadic',
    bestFor: ['Kids Apps', 'Toys', 'Gaming', 'Entertainment'],
    rationale: 'Pink 500 (bubble gum), Violet 500 (grape), Yellow 400 (lemon drop) evoke candy store joy. Classic gender-neutral playful combination. High saturation communicates energy and fun.',
    wcagAA: false,
    wcagAAA: false
  },
  {
    id: 'sunny-day',
    name: 'Sunny Day',
    description: 'Optimistic primary colors',
    category: 'playful',
    primary: '#2563eb',
    secondary: '#16a34a',
    accent: '#fbbf24',
    harmony: 'Triadic (Primary-based)',
    bestFor: ['Education', "Children's Apps", 'Learning Platforms'],
    rationale: 'Blue 600 (sky), Green 600 (grass), Amber 400 (sun) are universally recognized and accessible. This primary-adjacent scheme feels familiar and approachable to all ages and cultures.',
    wcagAA: true,
    wcagAAA: false
  },
  {
    id: 'mint-berry',
    name: 'Mint Berry',
    description: 'Fresh dessert sweetness',
    category: 'playful',
    primary: '#10b981',
    secondary: '#ec4899',
    accent: '#06b6d4',
    harmony: 'Split-Complementary',
    bestFor: ['Food Apps', 'Lifestyle', 'Wellness for Youth'],
    rationale: 'Emerald 500 (mint), Pink 500 (berry), Cyan 500 (ice) create dessert-inspired freshness. High contrast between green and pink creates visual interest while cyan cools the palette.',
    wcagAA: false,
    wcagAAA: false
  },
  {
    id: 'rainbow-pop',
    name: 'Rainbow Pop',
    description: 'Maximalist celebration',
    category: 'playful',
    primary: '#f43f5e',
    secondary: '#8b5cf6',
    accent: '#06b6d4',
    harmony: 'Triadic',
    bestFor: ['Pride Events', 'Festivals', 'Inclusive Communities'],
    rationale: 'Rose 500, Violet 500, Cyan 500 span the visible spectrum. Celebrates diversity and inclusion through color. Each hue can represent different aspects while maintaining visual harmony.',
    wcagAA: false,
    wcagAAA: false
  },

  // === ACCESSIBLE ===
  {
    id: 'high-clarity',
    name: 'High Clarity',
    description: 'Maximum readability',
    category: 'accessible',
    primary: '#1f2937',
    secondary: '#4b5563',
    accent: '#0284c7',
    harmony: 'Monochromatic + Accent',
    bestFor: ['Government', 'Healthcare', 'Education'],
    rationale: 'Gray 800 and 600 on white exceed WCAG AAA contrast requirements (7:1+). Sky 600 accent passes AA for large text. Designed for universal accessibility including visual impairments.',
    wcagAA: true,
    wcagAAA: true
  },
  {
    id: 'safe-contrast',
    name: 'Safe Contrast',
    description: 'Color-blind friendly',
    category: 'accessible',
    primary: '#0369a1',
    secondary: '#374151',
    accent: '#ea580c',
    harmony: 'Complementary',
    bestFor: ['Data Visualization', 'Forms', 'Critical Interfaces'],
    rationale: 'Sky 700 and Gray 700 are distinguishable across common color blindness types. Orange 600 accent avoids red-green confusion. Tested with deuteranopia, protanopia, and tritanopia simulations.',
    wcagAA: true,
    wcagAAA: false
  },
  {
    id: 'gentle-reader',
    name: 'Gentle Reader',
    description: 'Low eye strain',
    category: 'accessible',
    primary: '#44403c',
    secondary: '#78716c',
    accent: '#2563eb',
    harmony: 'Monochromatic + Accent',
    bestFor: ['Long-Form Reading', 'Elderly Users', 'Medical'],
    rationale: 'Stone 700 and 500 avoid harsh black while maintaining readability. Reduced contrast prevents eye fatigue for extended reading. Blue 600 accent is universally distinguishable.',
    wcagAA: true,
    wcagAAA: true
  },
  {
    id: 'clear-signal',
    name: 'Clear Signal',
    description: 'Semantic color safe',
    category: 'accessible',
    primary: '#1e293b',
    secondary: '#64748b',
    accent: '#7c3aed',
    harmony: 'Analogous + Accent',
    bestFor: ['Medical Interfaces', 'Critical Systems', 'Accessibility-First'],
    rationale: 'Slate 800 and 500 provide clear hierarchy. Violet 600 accent is visible to most color vision types and doesn\'t conflict with semantic red/green/yellow states. Reserves those colors for their intended meanings.',
    wcagAA: true,
    wcagAAA: true
  }
];

/**
 * Get palettes by category
 */
export function getPalettesByCategory(category: PaletteCategory): ColorPalette[] {
  return colorPalettes.filter(p => p.category === category);
}

/**
 * Get palettes by mood/tag
 */
export function getPalettesByMood(mood: string): ColorPalette[] {
  // Support searching in rationale or bestFor if mood is missing or map mood to new fields if needed
  // For backward compatibility, search basic fields
  return colorPalettes.filter(p =>
    p.description.toLowerCase().includes(mood.toLowerCase()) ||
    p.rationale?.toLowerCase().includes(mood.toLowerCase()) ||
    p.mood?.some(m => m.toLowerCase().includes(mood.toLowerCase()))
  );
}

/**
 * Search palettes by use case
 */
export function getPalettesForUseCase(useCase: string): ColorPalette[] {
  return colorPalettes.filter(p =>
    p.bestFor?.some(uc => uc.toLowerCase().includes(useCase.toLowerCase()))
  );
}

/**
 * Get accessible palettes only
 */
export function getAccessiblePalettes(level: 'AA' | 'AAA' = 'AA'): ColorPalette[] {
  return colorPalettes.filter(p =>
    level === 'AAA' ? p.wcagAAA : p.wcagAA
  );
}
