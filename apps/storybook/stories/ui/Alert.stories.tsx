import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Alert } from '@vikingo/ui'

const meta: Meta = {
  title: 'Display/Alert',
  parameters: { layout: 'padded', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const Variants: Story = {
  name: 'Variants · Variánsok',
  render: () => (
    <div className="flex flex-col gap-3 max-w-lg p-4 bg-[var(--color-bg)]">
      <Alert variant="info" title="Tájékoztatás">
        Az adatok naponta egyszer szinkronizálódnak. Az utolsó frissítés: ma, 02:14.
      </Alert>
      <Alert variant="success" title="Sikeresen közzétéve">
        A kampány most már él, és hamarosan megjelenik a platformon.
      </Alert>
      <Alert variant="warning" title="Büdzsé figyelmeztetés">
        A Facebook Ads büdzsé 88%-a felhasználásra került. 5 nap van hátra.
      </Alert>
      <Alert variant="error" title="API csatlakozási hiba">
        Nem sikerült csatlakozni a Meta Marketing API-hoz. Ellenőrizd a hozzáférési tokent.
      </Alert>
    </div>
  ),
}

export const Closeable: Story = {
  name: 'Closeable · Bezárható',
  render: () => {
    const [alerts, setAlerts] = useState(['info', 'success', 'warning', 'error'])

    return (
      <div className="flex flex-col gap-3 max-w-lg p-4 bg-[var(--color-bg)]">
        {alerts.length === 0 && (
          <p className="text-sm text-[var(--color-text-muted)] text-center py-4">
            Minden értesítés bezárva.
          </p>
        )}
        {alerts.includes('info') && (
          <Alert
            variant="info"
            title="Új funkció elérhető"
            onClose={() => setAlerts((a) => a.filter((x) => x !== 'info'))}
          >
            A Google Analytics 4 integráció mostantól elérhető a beállításokban.
          </Alert>
        )}
        {alerts.includes('success') && (
          <Alert
            variant="success"
            title="Import befejezve"
            onClose={() => setAlerts((a) => a.filter((x) => x !== 'success'))}
          >
            348 hirdetés sikeresen importálva a Facebook könyvtárból.
          </Alert>
        )}
        {alerts.includes('warning') && (
          <Alert
            variant="warning"
            onClose={() => setAlerts((a) => a.filter((x) => x !== 'warning'))}
          >
            A TikTok hozzáférési token 3 nap múlva lejár. Újítsd meg időben.
          </Alert>
        )}
        {alerts.includes('error') && (
          <Alert
            variant="error"
            title="Szinkronizálás sikertelen"
            onClose={() => setAlerts((a) => a.filter((x) => x !== 'error'))}
          >
            A Meta API visszautasította a kérést (kód: 190). Ellenőrizd a jogosultságokat.
          </Alert>
        )}
      </div>
    )
  },
}

export const WithoutTitle: Story = {
  name: 'Without Title · Cím nélkül',
  render: () => (
    <div className="flex flex-col gap-3 max-w-lg p-4 bg-[var(--color-bg)]">
      <Alert variant="info">Az adatok naponta frissülnek.</Alert>
      <Alert variant="success">Mentés sikeres.</Alert>
      <Alert variant="warning">A büdzsé közel van a limithez.</Alert>
      <Alert variant="error">Hiba történt a mentés során.</Alert>
    </div>
  ),
}
