import type { Meta, StoryObj } from '@storybook/react'
import {
  LayoutGrid,
  List,
  Map as MapIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sun,
  Moon,
  Monitor,
} from 'lucide-react'
import { useState } from 'react'
import { SegmentedControl } from '@vikingo/ui'

const meta: Meta<typeof SegmentedControl> = {
  title: 'Forms/SegmentedControl',
  component: SegmentedControl,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof SegmentedControl>

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  render: () => {
    const [val, setVal] = useState('list')
    return (
      <SegmentedControl
        options={[
          { value: 'list', icon: <List className="h-4 w-4" />, label: 'Lista' },
          { value: 'grid', icon: <LayoutGrid className="h-4 w-4" />, label: 'Rács' },
          { value: 'map', icon: <MapIcon className="h-4 w-4" />, label: 'Térkép' },
        ]}
        value={val}
        onChange={setVal}
      />
    )
  },
}

export const IconOnly: Story = {
  name: 'Icon Only · Csak ikon',
  render: () => {
    const [val, setVal] = useState('left')
    return (
      <SegmentedControl
        options={[
          { value: 'left', icon: <AlignLeft className="h-4 w-4" /> },
          { value: 'center', icon: <AlignCenter className="h-4 w-4" /> },
          { value: 'right', icon: <AlignRight className="h-4 w-4" /> },
        ]}
        value={val}
        onChange={setVal}
      />
    )
  },
}

export const LabelOnly: Story = {
  name: 'Label Only · Csak szöveg',
  render: () => {
    const [val, setVal] = useState('week')
    return (
      <SegmentedControl
        options={[
          { value: 'day', label: 'Nap' },
          { value: 'week', label: 'Hét' },
          { value: 'month', label: 'Hónap' },
          { value: 'year', label: 'Év' },
        ]}
        value={val}
        onChange={setVal}
      />
    )
  },
}

export const Sizes: Story = {
  name: 'Sizes · Méretek',
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <SegmentedControl
        size="sm"
        defaultValue="a"
        options={[
          { value: 'a', label: 'Small' },
          { value: 'b', label: 'Opt' },
          { value: 'c', label: 'Opt' },
        ]}
      />
      <SegmentedControl
        size="md"
        defaultValue="a"
        options={[
          { value: 'a', label: 'Medium' },
          { value: 'b', label: 'Opt' },
          { value: 'c', label: 'Opt' },
        ]}
      />
      <SegmentedControl
        size="lg"
        defaultValue="a"
        options={[
          { value: 'a', label: 'Large' },
          { value: 'b', label: 'Opt' },
          { value: 'c', label: 'Opt' },
        ]}
      />
    </div>
  ),
}

export const ThemeSwitch: Story = {
  name: 'Theme Switch · Téma váltó',
  render: () => {
    const [theme, setTheme] = useState('system')
    return (
      <div className="flex flex-col gap-3 items-center">
        <SegmentedControl
          options={[
            { value: 'light', icon: <Sun className="h-4 w-4" />, label: 'Világos' },
            { value: 'system', icon: <Monitor className="h-4 w-4" />, label: 'Rendszer' },
            { value: 'dark', icon: <Moon className="h-4 w-4" />, label: 'Sötét' },
          ]}
          value={theme}
          onChange={setTheme}
        />
        <p className="text-xs text-[var(--color-text-muted)]">Téma: {theme}</p>
      </div>
    )
  },
}

export const WithDisabled: Story = {
  name: 'With Disabled Option · Letiltott opcióval',
  render: () => (
    <SegmentedControl
      defaultValue="free"
      options={[
        { value: 'free', label: 'Ingyenes' },
        { value: 'pro', label: 'Pro' },
        { value: 'enterprise', label: 'Enterprise', disabled: true },
      ]}
    />
  ),
}

export const Disabled: Story = {
  name: 'Disabled · Letiltott',
  args: {
    disabled: true,
    defaultValue: 'b',
    options: [
      { value: 'a', label: 'Opció A' },
      { value: 'b', label: 'Opció B' },
      { value: 'c', label: 'Opció C' },
    ],
  },
}
