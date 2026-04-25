import { defineConfig } from 'tsup'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'

export default defineConfig({
  // Two entry points:
  //   - index   → React component library (CJS + ESM, bundles React peer-externalized)
  //   - html    → Web Components for vanilla HTML projects (no React, browser-native)
  entry: {
    index: 'src/index.ts',
    html: 'src/web-components/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true,
  outDir: 'dist',
  async onSuccess() {
    mkdirSync('dist/fonts', { recursive: true })

    /**
     * Inline all `@import "<spec>"` lines that resolve to a local source partial.
     * Produces a single self-contained CSS file per entry point so consumers don't
     * have to configure their bundler to resolve relative @imports inside node_modules.
     *
     * Imports we DO NOT inline (left for the consumer's bundler/browser to resolve):
     *   - `@import "tailwindcss"` (handled by Tailwind v4 plugin)
     *   - `@import url('https://...')` (browser handles remote URLs at runtime)
     */
    const inlineLocalImports = (parent: string, partials: Record<string, string>): string => {
      let out = parent
      for (const [spec, partialPath] of Object.entries(partials)) {
        const partial = readFileSync(partialPath, 'utf-8')
        const importLine = new RegExp(`^\\s*@import\\s+["']${spec}["'];?\\s*$`, 'm')
        out = out.replace(importLine, partial)
      }
      return out
    }

    const localPartials = {
      './tokens.css': 'src/styles/tokens.css',
      './_react-base.css': 'src/styles/_react-base.css',
      './fonts/inter-bundled.css': 'src/styles/fonts/inter-bundled.css',
      './fonts/inter-cdn.css': 'src/styles/fonts/inter-cdn.css',
    }

    /**
     * Adjust font url() paths after inlining. Source files reference fonts as
     * `../../../assets/fonts/...` (relative to src/styles/fonts/). When the partial
     * is inlined into dist/react.css (which sits at the dist root), the correct
     * relative path becomes `../assets/fonts/...` — one directory hop instead of three.
     */
    const fixInlinedFontPaths = (css: string): string =>
      css.replace(/url\('\.\.\/\.\.\/\.\.\/assets\//g, "url('../assets/")

    // ----- tokens.css: standalone (consumed by vanilla.css and any framework-agnostic target)
    writeFileSync('dist/tokens.css', readFileSync('src/styles/tokens.css', 'utf-8'))

    // ----- vanilla.css: pre-compiled component styles for plain HTML (no React, no Tailwind)
    const vanilla = inlineLocalImports(readFileSync('src/styles/vanilla.css', 'utf-8'), {
      './tokens.css': 'src/styles/tokens.css',
    })
    writeFileSync('dist/vanilla.css', vanilla)

    // ----- react.css: full Tailwind v4 + tokens + fonts (CDN included)
    const react = fixInlinedFontPaths(
      inlineLocalImports(readFileSync('src/styles/react.css', 'utf-8'), localPartials),
    )
    writeFileSync('dist/react.css', react)

    // ----- react-offline.css: same as react.css but no Google Fonts CDN @import
    const reactOffline = fixInlinedFontPaths(
      inlineLocalImports(readFileSync('src/styles/react-offline.css', 'utf-8'), localPartials),
    )
    writeFileSync('dist/react-offline.css', reactOffline)

    // ----- fonts: standalone copies for consumers who want them separately
    writeFileSync(
      'dist/fonts/inter-cdn.css',
      readFileSync('src/styles/fonts/inter-cdn.css', 'utf-8'),
    )
    // inter-bundled.css standalone needs path adjustment from src/styles/fonts/ to dist/fonts/
    // (one less ../ hop): ../../../assets/ → ../../assets/
    writeFileSync(
      'dist/fonts/inter-bundled.css',
      readFileSync('src/styles/fonts/inter-bundled.css', 'utf-8').replace(
        /url\('\.\.\/\.\.\/\.\.\//g,
        "url('../../",
      ),
    )

    // ----- Deprecated aliases (remove in 1.0). Old import paths keep working.
    writeFileSync('dist/globals.css', react)
    writeFileSync('dist/globals-no-cdn.css', reactOffline)
    writeFileSync('dist/google-fonts.css', readFileSync('src/styles/fonts/inter-cdn.css', 'utf-8'))
    // Old fonts.css alias sat at dist root, needed ../assets/ paths.
    writeFileSync(
      'dist/fonts.css',
      readFileSync('src/styles/fonts/inter-bundled.css', 'utf-8').replace(
        /url\('\.\.\/\.\.\/\.\.\//g,
        "url('../",
      ),
    )

    console.log('✓ CSS files emitted: tokens.css, react.css, react-offline.css, fonts/*')
  },
})
