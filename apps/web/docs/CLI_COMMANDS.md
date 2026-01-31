# CLI Commands Reference

Quick reference for common commands when working with the Sage UI ecosystem monorepo.

---

## Package Development

### Build Commands

**Build all packages:**
```bash
pnpm build
```
Turborepo automatically builds dependencies first (e.g., `@thesage/ui` before apps).

**Build specific package:**
```bash
pnpm build --filter @thesage/ui
pnpm build --filter @thesage/mcp
pnpm build --filter @thesage/tokens
```

**Build with dependencies:**
```bash
pnpm build --filter @thesage/ui...
```
The `...` suffix builds the package and all its dependents.

**Development mode (watch):**
```bash
pnpm dev --filter @thesage/ui
```
Automatically rebuilds on file changes.

---

## Application Development

### Run Development Servers

**Run Sage Studio (documentation site):**
```bash
pnpm dev --filter web
```
Defaults to [http://localhost:3001](http://localhost:3001) (or next available port).

**Run Portfolio:**
```bash
pnpm dev --filter portfolio
```
Defaults to [http://localhost:3000](http://localhost:3000).

**Run Creative Powerup:**
```bash
pnpm dev --filter creative-powerup
```

**Run all apps concurrently:**
```bash
pnpm dev
```
Uses Turborepo's `--concurrency 20` setting (see root `package.json`).

### Build Applications

**Build all apps (production):**
```bash
pnpm build
```
Builds packages first, then applications.

**Build specific app:**
```bash
pnpm build --filter web
pnpm build --filter portfolio
```

---

## Code Quality

### Type Checking

**Check TypeScript across all packages:**
```bash
pnpm typecheck
```

**Check specific package:**
```bash
pnpm typecheck --filter @thesage/ui
pnpm typecheck --filter web
```

### Linting

**Lint all packages:**
```bash
pnpm lint
```

**Auto-fix linting issues:**
```bash
pnpm lint --fix
```

**Lint specific package:**
```bash
pnpm lint --filter @thesage/ui
```

---

## Clean & Reset

### Clear Build Artifacts

**Clear Turborepo cache and build outputs:**
```bash
rm -rf .turbo packages/*/dist apps/*/.next
pnpm build
```
Use this when you see stale builds or caching issues.

**Full clean (including node_modules):**
```bash
rm -rf node_modules packages/*/node_modules apps/*/node_modules
pnpm install
```

**Clear pnpm store (nuclear option):**
```bash
pnpm store prune
rm -rf node_modules packages/*/node_modules apps/*/node_modules
pnpm install
```
Only needed for corrupted dependency issues.

---

## Package Management

### Install Dependencies

**Install all dependencies (respects workspace):**
```bash
pnpm install
```

**Add dependency to specific package:**
```bash
pnpm add <package-name> --filter @thesage/ui
```

**Add dev dependency:**
```bash
pnpm add -D <package-name> --filter @thesage/ui
```

**Add peer dependency:**
```bash
pnpm add <package-name> --save-peer --filter @thesage/ui
```

### Update Dependencies

**Update all dependencies (interactive):**
```bash
pnpm update -i
```

**Update specific dependency:**
```bash
pnpm update <package-name>
```

---

## Version Management & Publishing

> **Note:** These commands are for maintainers only.

### Changesets (Recommended)

**Create a changeset:**
```bash
pnpm changeset
```
Follow the interactive prompts to describe your changes.

**Version packages (update versions based on changesets):**
```bash
pnpm version-packages
```
This runs `changeset version` and appends changelog dates.

**Publish to npm:**
```bash
pnpm release
```
Builds all packages and publishes with `changeset publish`.

### Manual Versioning (Alternative)

**Bump version manually:**
```bash
cd packages/ui
pnpm version patch  # 0.0.5 → 0.0.6
pnpm version minor  # 0.0.5 → 0.1.0
pnpm version major  # 0.0.5 → 1.0.0
```

**Publish specific package:**
```bash
pnpm publish --filter @thesage/ui
pnpm publish --filter @thesage/mcp
```

---

## MCP Server Development

### Build & Test MCP Server

**Build MCP server:**
```bash
pnpm build --filter @thesage/mcp
```

**Watch mode:**
```bash
pnpm dev --filter @thesage/mcp
```

**Test local MCP server:**
```bash
node packages/sds-mcp-server/dist/index.js
```

**Configure local MCP in Claude Desktop:**
See [MCP Installation Guide](https://thesage.dev/docs#mcp-server/installation) for configuration details.

---

## Turborepo Commands

### Cache Management

**Clear Turborepo cache:**
```bash
rm -rf .turbo
```

**Run without cache:**
```bash
pnpm build --force
```

**View build graph:**
```bash
turbo run build --graph
```
Generates `graph.html` visualizing the build dependency graph.

---

## Git & Changesets Workflow

### Standard Contribution Flow

1. **Create feature branch:**
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make changes and commit:**
   ```bash
   git add .
   git commit -m "feat(ui): add new component"
   ```

3. **Create changeset (for version bumps):**
   ```bash
   pnpm changeset
   ```
   Select affected packages and change type (patch/minor/major).

4. **Push and create PR:**
   ```bash
   git push origin feat/your-feature-name
   ```

5. **After merge, maintainer runs:**
   ```bash
   pnpm version-packages  # Update versions
   pnpm release           # Publish to npm
   ```

---

## Troubleshooting Commands

### Common Issues

**"Cannot find module @thesage/ui"**
```bash
pnpm build --filter @thesage/ui
```

**TypeScript errors after pulling:**
```bash
pnpm build --filter @thesage/ui  # Regenerate type definitions
pnpm typecheck
```

**Port already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or let Next.js auto-increment
pnpm dev --filter portfolio
# Will try 3000, then 3001, then 3002, etc.
```

**Stale Tailwind styles:**
```bash
rm -rf apps/web/.next
pnpm build --filter web
```

---

## Useful Filters

### Common pnpm Filter Patterns

**Run command in package:**
```bash
--filter @thesage/ui
--filter web
--filter portfolio
```

**Run in package and dependencies:**
```bash
--filter @thesage/ui...
```

**Run in package and dependents:**
```bash
--filter ...@thesage/ui
```

**Run in multiple packages:**
```bash
--filter @thesage/ui --filter @thesage/tokens
```

**Run in all apps:**
```bash
--filter "./apps/*"
```

**Run in all packages:**
```bash
--filter "./packages/*"
```

---

## Quick Reference Table

| Task | Command |
|------|---------|
| Install deps | `pnpm install` |
| Build all | `pnpm build` |
| Build package | `pnpm build --filter @thesage/ui` |
| Dev mode | `pnpm dev --filter web` |
| Type check | `pnpm typecheck` |
| Lint | `pnpm lint` |
| Clean build | `rm -rf .turbo packages/*/dist apps/*/.next && pnpm build` |
| Create changeset | `pnpm changeset` |
| Version packages | `pnpm version-packages` |
| Publish | `pnpm release` |

---

## Environment Variables

### Required for Deployment

**Vercel (automatic):**
- `NEXT_PUBLIC_SITE_URL` - Auto-set by Vercel
- `NODE_ENV` - Auto-set by Vercel

**Local development:**
```bash
# .env.local (create in app root if needed)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Additional Resources

- **Turborepo Docs:** https://turbo.build/repo/docs
- **pnpm Workspace:** https://pnpm.io/workspaces
- **Changesets:** https://github.com/changesets/changesets
- **Sage Studio:** https://thesage.dev/
- **GitHub:** https://github.com/shalomormsby/ecosystem

---

**Last Updated:** 2026-01-30
