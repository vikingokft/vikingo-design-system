import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from '@vikingo/ui'

const meta: Meta = {
  title: 'Forms/Textarea',
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  render: () => (
    <div className="w-80 p-4 bg-[var(--color-bg)]">
      <Textarea
        label="Kampány leírása"
        placeholder="Írd le a kampány célját, célközönségét és üzenetét..."
        hint="Legalább 50 karakter ajánlott"
      />
    </div>
  ),
}

export const States: Story = {
  name: 'States · Állapotok',
  render: () => (
    <div className="flex flex-col gap-4 w-80 p-4 bg-[var(--color-bg)]">
      <Textarea label="Alap" placeholder="Tartalom..." />
      <Textarea
        label="Kitöltött"
        defaultValue="Ez egy előre kitöltött szöveg, amelyet a felhasználó módosíthat. A textarea automatikusan átméretezhető."
      />
      <Textarea
        label="Hiba állapot"
        defaultValue="Érvénytelen tartalom"
        error="A leírás nem tartalmazhat tilos szavakat."
      />
      <Textarea label="Letiltott" defaultValue="Ez szerkeszthetetlen" disabled />
    </div>
  ),
}

export const CampaignMessage: Story = {
  name: 'Campaign Message · Kampányüzenet',
  render: () => (
    <div className="w-96 p-4 bg-[var(--color-bg)]">
      <div className="flex flex-col gap-4">
        <Textarea
          label="Elsődleges szöveg"
          placeholder="Az a szöveg, amit a hirdetésedben látnak..."
          hint="Ajánlott hossz: 90–150 karakter"
          rows={3}
        />
        <Textarea
          label="Leírás"
          placeholder="Rövid kiegészítő leírás..."
          hint="Max. 30 karakter"
          rows={2}
        />
      </div>
    </div>
  ),
}
