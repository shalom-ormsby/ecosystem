import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: {
    resolve: true,
    compilerOptions: {
      skipLibCheck: true,
      skipDefaultLibCheck: true,
      noImplicitAny: false,
      strictNullChecks: false,
      strict: false,
    },
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  banner: {
    js: '"use client";',
  },
});
