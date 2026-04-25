import type { Meta, StoryObj } from '@storybook/react'
import { Info, HelpCircle, Settings } from 'lucide-react'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, Button } from '@vikingo/ui'

const meta: Meta = {
  title: 'Overlays/Tooltip',
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={0}>
        <Story />
      </TooltipProvider>
    ),
  ],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  render: () => (
    <div className="p-8 bg-[var(--color-bg)]">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary">Mutasd a tooltipet</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Ez egy hasznos tipp a funkcióról</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}

export const Positions: Story = {
  name: 'Positions · Pozíciók',
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-6 p-12 bg-[var(--color-bg)]">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="secondary" size="sm">
              {side}
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side}>
            <p>Tooltip {side} irányban</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
}

export const IconTrigger: Story = {
  name: 'Icon Trigger · Ikon triggerrel',
  render: () => (
    <div className="flex items-center gap-6 p-8 bg-[var(--color-bg)]">
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
            <HelpCircle className="h-5 w-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Súgó: A konverziós arány a kattintások és vásárlások aránya</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
            <Info className="h-5 w-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Az adat naponta frissül automatikusan</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
            <Settings className="h-5 w-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Beállítások módosítása</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}
