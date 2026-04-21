import type { Preview } from '@storybook/react'
import { withThemeByClassName } from '@storybook/addon-themes'
import { useEffect } from 'react'
import '@vikingo/ui/styles'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
    backgrounds: { disable: true },
    layout: 'centered',
    viewport: {
      viewports: {
        mobileSm: { name: 'Mobile S (375px)', styles: { width: '375px', height: '812px' } },
        mobileLg: { name: 'Mobile L (430px)', styles: { width: '430px', height: '932px' } },
        tablet: { name: 'Tablet (768px)', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop (1440px)', styles: { width: '1440px', height: '900px' } },
      },
    },
  },
  globalTypes: {
    motion: {
      name: 'Motion',
      description: 'Preview reduced-motion state without changing OS settings',
      defaultValue: 'full',
      toolbar: {
        icon: 'play',
        items: [
          { value: 'full', title: 'Full motion' },
          { value: 'reduced', title: 'Reduced motion' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    (Story, context) => {
      const reduced = context.globals.motion === 'reduced'
      useEffect(() => {
        const cls = 'force-reduce-motion'
        document.body.classList.toggle(cls, reduced)
        return () => document.body.classList.remove(cls)
      }, [reduced])
      return (
        <div className="font-body antialiased">
          <Story />
        </div>
      )
    },
  ],
}

export default preview
