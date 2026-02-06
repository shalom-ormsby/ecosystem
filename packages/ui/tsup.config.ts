import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/tokens.ts',
    'src/hooks.ts',
    'src/utils.ts',
    'src/providers.ts',
    'src/webgl.ts',
    'src/forms.ts',
    'src/dates.ts',
    'src/tables.ts',
    'src/dnd.ts',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  banner: {
    js: '"use client";',
  },
});
