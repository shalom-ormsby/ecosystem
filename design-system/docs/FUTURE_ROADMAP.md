# Future Roadmap - Sage Design System

This document outlines high-impact initiatives to elevate the Sage Design System, focusing on developer experience and AI-enablement for solopreneurs.

## 1. High-Level Patterns Library
**Goal:** Empower users to scaffolding complete features in seconds, not just assemble atoms.
- **DashboardShellPattern**: Pre-wired Sidebar + Header + Content Area + Mobile responsiveness.
- **AuthFormsPattern**: Login, Register, Forgot Password flows with validation visual states.
- **FeatureGridPattern**: Standard marketing site "3-column with icon" layouts.
- **SettingsLayoutPattern**: Sidebar navigation for settings pages with form layouts.

## 2. CLI Tooling (`create-sage-app`)
**Goal:** Remove the friction of manual configuration and monorepo setup.
- Initialize a Next.js application with Sage Design System pre-configured.
- Auto-configure Tailwind CSS content paths and theme variables.
- Option to scaffold a monorepo structure (Turbo).
- "Add Component" command to generate new component files following the architectural spec.

## 3. Sage MCP Server (Model Context Protocol)
**Goal:** Enable AI Agents to write perfect, bug-free Sage code by providing deep system context.
- **Capabilities:**
  - **Component Discovery:** Agents can query available components and their props.
  - **Token Lookup:** Agents can find the correct semantic color/spacing token for a use case.
  - **Validation:** Agents can validate generated code against system rules (e.g., "No ad-hoc colors").
- **Integration:**
  - Allow IDEs (Cursor, VS Code) and Agent Frameworks to "chat with the design system".
  - Documentation automator that updates the MCP context when code changes.

## 4. Strict Component Polish ("The Chakra Standard")
**Goal:** eliminate the need for utility classes in consuming applications.
- **Style Props:** Ensure all components accept intuitive style props (e.g., `mt="4"`, `color="brand.primary"`).
- **Type Safety:** Strict TS types for all variants and sizes.
- **No `className` Dependency:** Developing apps should rarely require passing raw `className` strings for basic layout/styling.
