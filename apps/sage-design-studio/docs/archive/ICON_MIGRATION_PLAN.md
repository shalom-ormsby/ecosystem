# Plan: Icon System Migration (Completed)

**Objective:** Replace all direct emoji usage with `lucide-react` icons throughout the `sage-design-studio` and `design-system` packages to ensure visual consistency, scalability, and better accessibility.

## 1. Audit Current Usage
Identify where emojis are currently used. Common locations include:
- `AddingComponentsSection.tsx`: Step counters (1, 2, 3...) and list bullets.
- `ArchitectureSection.tsx`: Status indicators or visual aids.
- `CommonPatternsSection.tsx`: "Do" and "Don't" examples (✅, ❌).
- `TokensSection`: Token category icons (Colors 🎨, Typography 📝, etc.).
- `Header` and Navigation components: User avatars or menu items.
- Component Registry or Metadata: Accessibility notes (♿).

## 2. Icon Selection Strategy
Map existing emojis to Lucide icons:
- ✅ Checkmark -> `Check` or `CheckCircle`
- ❌ Cross/Error -> `X` or `XCircle`
- ⚠️ Warning -> `AlertTriangle`
- ℹ️ Info -> `Info`
- 🎨 Colors -> `Palette`
- 📝 Typography -> `Type`
- 📏 Spacing -> `Ruler` or `MoveHorizontal`
- 🖱️ Interaction -> `MousePointer` or `Hand`
- ♿ Accessibility -> `Accessibility` (if available) or `PersonStanding`
- 1, 2, 3... (Step counters) -> Use strictly styled `span` circles with text, or numbered icons if desired.

### Sidebar Icons
- 📖 Getting Started -> `BookOpen`
- 🎨 Design Tokens -> `Palette`
- 🧩 Components -> `Component` or `Puzzle` (if available) or `Box`
- 🪝 Hooks -> `Webhook` or `Anchor`
- 📐 Templates -> `LayoutTemplate` or `Ruler`

## 3. Implementation Steps
1.  **Dependencies:** Verify `lucide-react` is installed in `design-system` and `sage-design-studio`.
2.  **Design System Updates:**
    - Update `Accessiblity` indicators in `ComponentPlayground`.
    - Create a reusable `StatusIcon` or `StepIndicator` component if standardizing step numbers.
3.  **Studio App Updates:**
    - Replace emojis in `AddingComponentsSection` lists.
    - Replace emojis in `TokensSection` tabs.
    - Replace status emojis in `CommonPatternsSection`.
4.  **Verification:**
    - Ensure icons scale correctly with text.
    - Verify dark/light mode color adaptation (using `currentColor` or CSS vars).
    - Check accessibility labels (`aria-label` or `sr-only` text) where icons are semantic.

## 4. Work in Progress Tracking
- [x] Audit `AddingComponentsSection.tsx`
- [x] Audit `CommonPatternsSection.tsx`
- [x] Audit `TokensSection/*.tsx`
- [x] Audit `ComponentPlayground.tsx` (Accessibility icon)
- [x] Execute replacements
