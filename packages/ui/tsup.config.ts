import { defineConfig } from 'tsup'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true,
  outDir: 'dist',
  async onSuccess() {
    mkdirSync('dist', { recursive: true })

    // globals.css: copy as-is (Tailwind v4 consumer handles @import "tailwindcss")
    writeFileSync('dist/globals.css', readFileSync('src/styles/globals.css', 'utf-8'))

    // globals-no-cdn.css: CDN-free variant for Chrome Extensions / offline apps
    writeFileSync('dist/globals-no-cdn.css', readFileSync('src/styles/globals-no-cdn.css', 'utf-8'))

    // google-fonts.css: standalone CDN import (used by globals.css, can also be imported separately)
    writeFileSync('dist/google-fonts.css', readFileSync('src/styles/google-fonts.css', 'utf-8'))

    // fonts.css: fix font paths – source uses ../../assets/ (from src/styles/),
    // but in dist/ the correct relative path is ../assets/
    const fonts = readFileSync('src/styles/fonts.css', 'utf-8').replace(
      /url\('\.\.\/\.\.\//g,
      "url('../",
    )
    writeFileSync('dist/fonts.css', fonts)

    console.log('✓ CSS files copied to dist/')
  },
})
