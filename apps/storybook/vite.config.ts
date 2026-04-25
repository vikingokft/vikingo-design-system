import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    fs: {
      // Allow Vite dev server to serve files from the monorepo root
      // (needed for packages/ui/assets/fonts/* and assets/*.svg)
      allow: ['../..'],
    },
  },
  resolve: {
    alias: [
      // Subpath aliases must precede the generic '@vikingo/ui' resolver below.
      {
        find: '@vikingo/ui/styles/react',
        replacement: resolve(__dirname, '../../packages/ui/src/styles/react.css'),
      },
      {
        // Backwards-compat alias for the legacy '@vikingo/ui/styles' import.
        find: '@vikingo/ui/styles',
        replacement: resolve(__dirname, '../../packages/ui/src/styles/react.css'),
      },
      {
        find: '@vikingo/ui/fonts/inter-bundled',
        replacement: resolve(__dirname, '../../packages/ui/src/styles/fonts/inter-bundled.css'),
      },
      {
        // Legacy '@vikingo/ui/fonts' alias.
        find: '@vikingo/ui/fonts',
        replacement: resolve(__dirname, '../../packages/ui/src/styles/fonts/inter-bundled.css'),
      },
      // Use the TypeScript source directly to avoid `dist/` externalization issues
      // (e.g. recharts and any future @vikingo/ui peer-dependency surprises).
      {
        find: '@vikingo/ui',
        replacement: resolve(__dirname, '../../packages/ui/src/index.ts'),
      },
    ],
  },
})
