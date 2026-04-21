import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { FileUpload } from '@vikingo/ui'

const meta: Meta = {
  title: 'Forms/FileUpload',
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  render: () => (
    <div className="w-96 p-6 bg-[var(--color-bg)]">
      <FileUpload hint="PNG, JPG, GIF maximum 10 MB" maxSize={10 * 1024 * 1024} />
    </div>
  ),
}

export const ImageOnly: Story = {
  name: 'Image Only · Képfájl',
  render: () => (
    <div className="w-96 p-6 bg-[var(--color-bg)]">
      <FileUpload accept="image/*" hint="PNG, JPG, WEBP – max. 5 MB" maxSize={5 * 1024 * 1024} />
    </div>
  ),
}

export const MultipleFiles: Story = {
  name: 'Multiple Files · Több fájl',
  render: () => {
    const [files, setFiles] = useState<File[]>([])
    return (
      <div className="w-96 p-6 bg-[var(--color-bg)]">
        <FileUpload
          multiple
          accept=".csv,.xlsx,.pdf"
          hint="CSV, Excel vagy PDF – max. 25 MB / fájl"
          maxSize={25 * 1024 * 1024}
          onFileSelect={setFiles}
        />
        {files.length > 0 && (
          <p className="text-xs text-[var(--color-text-muted)] mt-2">
            {files.length} fájl kiválasztva
          </p>
        )}
      </div>
    )
  },
}

export const WithProgress: Story = {
  name: 'Uploading · Feltöltés közben',
  render: () => (
    <div className="w-96 p-6 bg-[var(--color-bg)]">
      <FileUpload progress={62} hint="PNG, JPG – max. 10 MB" />
    </div>
  ),
}

export const WithError: Story = {
  name: 'Error · Hiba állapot',
  render: () => (
    <div className="w-96 p-6 bg-[var(--color-bg)]">
      <FileUpload
        error="A feltöltés sikertelen. Kérjük, próbáld újra."
        hint="PNG, JPG – max. 10 MB"
      />
    </div>
  ),
}

export const WithSuccess: Story = {
  name: 'Success · Sikeres feltöltés',
  render: () => (
    <div className="w-96 p-6 bg-[var(--color-bg)]">
      <FileUpload success="A fájl sikeresen feltöltve!" disabled hint="PNG, JPG – max. 10 MB" />
    </div>
  ),
}
