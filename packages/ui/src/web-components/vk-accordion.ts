/*
 * <vk-accordion> / <vk-accordion-item> — collapsible content panels
 *
 * Usage:
 *   <vk-accordion type="single">  <!-- single | multiple (default 'single') -->
 *     <vk-accordion-item label="Általános" open>
 *       <p>General content</p>
 *     </vk-accordion-item>
 *     <vk-accordion-item label="Beállítások">
 *       <p>Settings content</p>
 *     </vk-accordion-item>
 *   </vk-accordion>
 *
 * Keyboard (on focused trigger):
 *   - Space / Enter           toggle the item
 *   - ArrowUp / ArrowDown     move focus between triggers
 *   - Home / End              jump to first / last trigger
 */

const STYLES = /* css */ `
  vk-accordion-item {
    display: block;
    border-bottom: 1px solid var(--color-border, #E0D9D1);
  }
  vk-accordion-item > button[role="button"] {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-md, 16px) 0;
    background: transparent;
    border: none;
    font-family: var(--font-body, sans-serif);
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--color-text, #3E2E45);
    cursor: pointer;
    text-align: left;
  }
  vk-accordion-item > button[role="button"]::after {
    content: '+';
    font-size: 1.25rem;
    line-height: 1;
    color: var(--color-text-muted, #7A6A82);
    transition: transform var(--duration-fast, 120ms) var(--ease-out-quint, ease);
  }
  vk-accordion-item[open] > button[role="button"]::after { content: '−'; }
  vk-accordion-item > .vk-accordion-item__panel {
    padding-bottom: var(--spacing-md, 16px);
    color: var(--color-text-muted, #7A6A82);
    font-size: 0.875rem;
  }
  vk-accordion-item:not([open]) > .vk-accordion-item__panel { display: none; }
`

let stylesInjected = false
const ensureStyles = () => {
  if (stylesInjected) return
  const style = document.createElement('style')
  style.textContent = STYLES
  document.head.appendChild(style)
  stylesInjected = true
}

export class VkAccordionItem extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'open']
  }

  #trigger: HTMLButtonElement | null = null
  #panel: HTMLDivElement | null = null

  connectedCallback() {
    ensureStyles()
    this.#mount()
  }

  attributeChangedCallback(name: string) {
    if (name === 'label' && this.#trigger)
      this.#trigger.firstChild!.textContent = this.getAttribute('label') ?? ''
    if (name === 'open' && this.#trigger)
      this.#trigger.setAttribute('aria-expanded', String(this.hasAttribute('open')))
  }

  #mount() {
    // Wrap existing children inside a panel div, prepend a trigger button.
    if (this.querySelector(':scope > [role="button"]')) return // already mounted

    const panel = document.createElement('div')
    panel.className = 'vk-accordion-item__panel'
    panel.setAttribute('role', 'region')
    while (this.firstChild) panel.appendChild(this.firstChild)

    const trigger = document.createElement('button')
    trigger.type = 'button'
    trigger.setAttribute('role', 'button')
    trigger.setAttribute('aria-expanded', String(this.hasAttribute('open')))
    const labelSpan = document.createElement('span')
    labelSpan.textContent = this.getAttribute('label') ?? ''
    trigger.appendChild(labelSpan)
    trigger.addEventListener('click', () => this.#toggle())
    trigger.addEventListener('keydown', (e) => this.#handleKey(e))

    this.appendChild(trigger)
    this.appendChild(panel)
    this.#trigger = trigger
    this.#panel = panel
  }

  #toggle() {
    const accordion = this.closest('vk-accordion') as VkAccordion | null
    if (!accordion) return
    accordion.toggleItem(this)
  }

  #handleKey(event: KeyboardEvent) {
    const accordion = this.closest('vk-accordion') as VkAccordion | null
    if (!accordion) return
    accordion.handleItemKey(event, this)
  }
}

export class VkAccordion extends HTMLElement {
  toggleItem(item: VkAccordionItem) {
    const items = this.#items()
    const willOpen = !item.hasAttribute('open')
    if (this.getAttribute('type') !== 'multiple' && willOpen) {
      for (const i of items) i.removeAttribute('open')
    }
    if (willOpen) item.setAttribute('open', '')
    else item.removeAttribute('open')
    this.dispatchEvent(
      new CustomEvent('change', { detail: { item, open: willOpen }, bubbles: true }),
    )
  }

  handleItemKey(event: KeyboardEvent, current: VkAccordionItem) {
    const items = this.#items()
    const index = items.indexOf(current)
    let next = index
    switch (event.key) {
      case 'ArrowDown':
        next = (index + 1) % items.length
        break
      case 'ArrowUp':
        next = (index - 1 + items.length) % items.length
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = items.length - 1
        break
      case ' ':
      case 'Enter':
        event.preventDefault()
        this.toggleItem(current)
        return
      default:
        return
    }
    event.preventDefault()
    const trigger = items[next]?.querySelector(
      ':scope > [role="button"]',
    ) as HTMLButtonElement | null
    trigger?.focus()
  }

  #items(): VkAccordionItem[] {
    return Array.from(this.querySelectorAll(':scope > vk-accordion-item')) as VkAccordionItem[]
  }
}

if (!customElements.get('vk-accordion-item'))
  customElements.define('vk-accordion-item', VkAccordionItem)
if (!customElements.get('vk-accordion')) customElements.define('vk-accordion', VkAccordion)
