import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from '@vikingo/ui'

const meta: Meta = {
  title: 'Forms/Select',
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div className="w-64 p-4 bg-[var(--color-bg)]">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger>
            <SelectValue placeholder="Válassz időszakot..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Utolsó 7 nap</SelectItem>
            <SelectItem value="30d">Utolsó 30 nap</SelectItem>
            <SelectItem value="90d">Utolsó 90 nap</SelectItem>
            <SelectItem value="all">Teljes időszak</SelectItem>
          </SelectContent>
        </Select>
      </div>
    )
  },
}

export const Grouped: Story = {
  name: 'Grouped · Csoportosított',
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div className="w-72 p-4 bg-[var(--color-bg)]">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger>
            <SelectValue placeholder="Válassz platformot..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Közösségi média</SelectLabel>
              <SelectItem value="facebook">Facebook Ads</SelectItem>
              <SelectItem value="instagram">Instagram Ads</SelectItem>
              <SelectItem value="tiktok">TikTok Ads</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Keresőmarketing</SelectLabel>
              <SelectItem value="google">Google Ads</SelectItem>
              <SelectItem value="bing">Microsoft Ads</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    )
  },
}

export const Disabled: Story = {
  name: 'Disabled · Letiltott',
  render: () => (
    <div className="w-64 p-4 bg-[var(--color-bg)]">
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Nem elérhető" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Opció A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}
