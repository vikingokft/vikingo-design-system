import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-themes', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    // Use the "source" export condition so @vikingo/ui resolves to TypeScript source
    // (defined in packages/ui/package.json exports) — no __dirname needed
    config.resolve ??= {}
    config.resolve.conditions = ['source', ...(config.resolve.conditions ?? [])]

    // Prevent Vite from pre-bundling @vikingo/ui (would cache the dist version)
    config.optimizeDeps ??= {}
    config.optimizeDeps.exclude = [...(config.optimizeDeps.exclude ?? []), '@vikingo/ui']

    return config
  },
}

export default config
