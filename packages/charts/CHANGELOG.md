# @thesage/charts

## 0.2.0 - 2026-02-06

### Minor Changes

- 39a3bcd: # Sage Design Engine v1.0.0-rc.1: Enterprise Readiness

  ## 🚀 React 19 Migration

  - **Unified Architecture:** All 11 packages and applications now run on React 19.2.1.
  - **Modern Patterns:** 146 instances of `forwardRef` migrated to React 19's `ref` as a prop.
  - **Dependencies:** All 26 Radix UI primitives updated to latest versions.

  ## ⚡️ Performance & Optimization

  - **WebGL Vendoring:** Replaced 80KB `ogl` dependency with a 1.1KB custom WebGL implementation (93% reduction).
  - **Subpath Exports:** Created granular entry points for `@thesage/ui/forms`, `/dates`, `/tables`, `/dnd`, and `/webgl`.
  - **Bundle Size:** Core bundle optimized to 146KB (brotli) with strict CI enforcement.

  ## 🛡️ Enterprise Grade

  - **Test Suite:** Added Vitest + Testing Library with 63 tests across critical components.
  - **Security:** 0 vulnerabilities in `@thesage/ui`.
  - **Accessibility:** Critical fixes applied to Breadcrumbs, Customizer, and Code blocks.

  ## 💅 Brand & Documentation

  - **Rebrand:** "Sage UI" is now **Sage Design Engine**.
  - **Theme:** Default theme renamed to **Terra**.
  - **Documentation:** Complete audit of `thesage.dev` with new CLI guides, troubleshooting, and integration docs.

## 0.1.2 - 2026-01-28

### Patch Changes

- 90e78f4: docs: add standard README.md with installation and usage instructions

## 0.1.1 - 2026-01-28

### Patch Changes

- 76a383b: Syncing npm registry with latest changes from GitHub (auto-generated catch-up).
