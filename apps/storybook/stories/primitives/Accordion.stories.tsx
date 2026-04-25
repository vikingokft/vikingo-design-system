import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@vikingo/ui'

const meta: Meta = {
  title: 'Navigation/Accordion',
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

const faqItems = [
  {
    value: 'q1',
    question: 'Milyen platformokat támogat a rendszer?',
    answer:
      'Jelenleg a Facebook Ads, Instagram Ads, Google Ads, TikTok Ads és Microsoft Ads platformokat támogatjuk. Hamarosan Pinterest és Snapchat integrációk is érkeznek.',
  },
  {
    value: 'q2',
    question: 'Milyen sűrűn frissülnek az adatok?',
    answer:
      'Az adatok naponta egyszer szinkronizálódnak, általában hajnali 2–4 óra között. A valós idejű adatokhoz prémium csomag szükséges.',
  },
  {
    value: 'q3',
    question: 'Lehet-e több fiókot kezelni egy platformon?',
    answer:
      'Igen, Pro és Business csomagban több reklámfiók is hozzáadható ugyanahhoz a platformhoz. A Starter csomag csak egy fiókot támogat platformonként.',
  },
  {
    value: 'q4',
    question: 'Hogyan működik a büdzsé riasztás?',
    answer:
      'Megadhatsz egy százalékos küszöbértéket (pl. 80%), és ha egy kampány büdzséje ezt eléri, e-mail vagy push értesítést küldünk.',
  },
]

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  render: () => (
    <div className="w-[480px] p-4 bg-[var(--color-bg)]">
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4">
        <Accordion type="single" collapsible defaultValue="q1">
          {faqItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  ),
}

export const MultipleOpen: Story = {
  name: 'Multiple Open · Több szakasz egyszerre',
  render: () => (
    <div className="w-[480px] p-4 bg-[var(--color-bg)]">
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4">
        <Accordion type="multiple" defaultValue={['q1', 'q3']}>
          {faqItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  ),
}

export const SettingsPanel: Story = {
  name: 'Settings Panel · Beállítási panel',
  render: () => (
    <div className="w-[480px] p-4 bg-[var(--color-bg)]">
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4">
        <Accordion type="single" collapsible defaultValue="notifications">
          <AccordionItem value="account">
            <AccordionTrigger>Fiókadatok</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                <p className="text-sm">
                  <span className="font-medium">Név:</span> Nagy Bence
                </p>
                <p className="text-sm">
                  <span className="font-medium">E-mail:</span> bence@vikingo.hu
                </p>
                <p className="text-sm">
                  <span className="font-medium">Csomag:</span> Pro
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="notifications">
            <AccordionTrigger>Értesítési beállítások</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm mb-2">
                E-mail értesítéseket kapni: kampány sikeresen indult, büdzsé riasztás, heti
                összefoglaló.
              </p>
              <p className="text-xs text-[var(--color-text-subtle)]">
                Push értesítések a böngészőben is bekapcsolhatók.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="billing">
            <AccordionTrigger>Számlázás</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm">Következő számlázási dátum: 2025. június 1. · 4 900 Ft/hó</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="danger">
            <AccordionTrigger className="text-[var(--color-error)] hover:text-[var(--color-error)]">
              Veszélyes zóna
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm mb-3">
                A fiók törlése végleges és nem vonható vissza. Minden adat elvész.
              </p>
              <button className="text-xs font-medium text-[var(--color-error)] border border-[var(--color-error)]/30 rounded-[var(--radius-md)] px-3 py-1.5 hover:bg-[var(--color-error)]/8 transition-colors">
                Fiók törlése
              </button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
}
