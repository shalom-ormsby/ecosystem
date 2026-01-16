import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true, // Generate TypeScript declarations
  splitting: false,
  sourcemap: true,
  clean: true,
  banner: {
    js: '"use client";',
  },
});
