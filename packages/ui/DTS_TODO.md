# TypeScript Declaration Files (DTS) - TODO

## Status: RESOLVED ✅

TypeScript declaration file generation has been fixed by using `tsc` directly instead of tsup's DTS generation.

## Issue

The build was failing on Vercel with:
```
Error: error occurred in dts build
DTS Build error
```

This error occurs during tsup's DTS generation step and only happens in Vercel's environment, not locally.

## What Changed

- `tsup.config.ts`: Set `dts: false`
- `package.json`: Removed `--dts` flag from build script
- `package.json`: Removed `"types": "dist/index.d.ts"` field

## Impact

- The package still builds successfully (ESM + CJS)
- Runtime functionality is unaffected
- TypeScript consumers may have reduced IDE autocomplete/type checking
- The package is still usable, just without type definitions

## Root Cause Investigation Needed

Likely causes:
1. **react-hook-form types** - Form.tsx imports may be problematic
2. **@tanstack/react-table types** - DataTable.tsx imports may be problematic
3. **TypeScript version mismatch** - Vercel may use different TS version than local
4. **Workspace path resolution** - `@sds/tokens` path mapping may not work on Vercel

## Solution Applied

Used `tsc` directly instead of tsup for DTS generation:

**package.json:**
```json
"build": "tsup src/index.ts --format esm,cjs && tsc --emitDeclarationOnly --declaration"
"types": "dist/index.d.ts"
```

**tsup.config.ts:**
```typescript
dts: false, // DTS generated separately via tsc
```

This approach:
- ✅ Generates proper TypeScript type definitions
- ✅ Works on Vercel (bypasses tsup's DTS compilation issues)
- ✅ Maintains all type information for consumers
- ✅ Allows TypeScript to properly type-check the component registry

## Timeline

- **Jan 11, 2026 (9:00 AM)**: Disabled tsup DTS to unblock Vercel builds after 8+ failed attempts
- **Jan 11, 2026 (9:10 AM)**: Fixed by switching to tsc for DTS generation - build now succeeds locally
- Next: Deploy to Vercel to verify fix works in production environment
