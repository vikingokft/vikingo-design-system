/*
 * <vk-tabs> / <vk-tab> — tab list with keyboard navigation
 *
 * Usage:
 *   <vk-tabs>
 *     <vk-tab label="Általános" selected>
 *       <p>General tab content</p>
 *     </vk-tab>
 *     <vk-tab label="Beállítások">
 *       <p>Settings tab content</p>
 *     </vk-tab>
 *   </vk-tabs>
 *
 * Keyboard (on focused tab):
 *   - ArrowLeft / ArrowRight  move focus + selection between tabs
 *   - Home / End              jump to first / last tab
 *   - Space / Enter           activate the focused tab
 *
 * Layout uses light DOM so the consumer's vanilla.css `.vk-tab*` rules apply.
 * No Shadow DOM here — we render styles inline for the trigger row only.
 */

const TRIGGER_STYLES = /* css */ `
  vk-tabs > [role="tablist"] {
    display: flex;
    gap: var(--spacing-xs, 4px);
    border-bottom: 1px solid var(--color-border, #E0D9D1);
    margin-bottom: var(--spacing-md, 16px);
  }
  vk-tabs > [role="tablist"] > button {
    padding: 0.5rem var(--spacing-md, 16px);
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    font-family: var(--font-body, sans-serif);
    font-size: 0.875rem;
    color: var(--color-text-muted, #7A6A82);
    cursor: pointer;
    transition: color var(--duration-fast, 120ms) var(--ease-out-quint, ease);
  }
  vk-tabs > [role="tablist"] > button:hover { color: var(--color-text, #3E2E45); }
  vk-tabs > [role="tablist"] > button[aria-selected="true"] {
    color: var(--color-accent, #FF544D);
    border-bottom-color: var(--color-accent, #FF544D);
  }
  vk-tab[hidden] { display: none; }
`

let stylesInjected = false
const ensureStyles = () => {
  if (stylesInjected) return
  const style = document.createElement('style')
  style.textContent = TRIGGER_STYLES
  document.head.appendChild(style)
  stylesInjected = true
}

export class VkTab extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'selected']
  }
  attributeChangedCallback() {
    // Notify parent so the trigger row updates.
    const parent = this.closest('vk-tabs') as VkTabs | null
    parent?.refresh()
  }
}

export class VkTabs extends HTMLElement {
  #tablist: HTMLDivElement | null = null

  connectedCallback() {
    ensureStyles()
    this.#tablist = document.createElement('div')
    this.#tablist.setAttribute('role', 'tablist')
    this.prepend(this.#tablist)
    this.refresh()
  }

  refresh() {
    if (!this.#tablist) return
    const tabs = this.#tabs()
    this.#tablist.innerHTML = ''
    let activeIndex = tabs.findIndex((t) => t.hasAttribute('selected'))
    if (activeIndex === -1 && tabs.length > 0) activeIndex = 0

    tabs.forEach((tab, index) => {
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.setAttribute('role', 'tab')
      btn.setAttribute('aria-selected', String(index === activeIndex))
      btn.tabIndex = index === activeIndex ? 0 : -1
      btn.textContent = tab.getAttribute('label') ?? `Tab ${index + 1}`
      btn.addEventListener('click', () => this.#select(index))
      btn.addEventListener('keydown', (e) => this.#handleKey(e, index))
      this.#tablist?.appendChild(btn)
      tab.hidden = index !== activeIndex
    })
  }

  #tabs(): VkTab[] {
    return Array.from(this.querySelectorAll(':scope > vk-tab')) as VkTab[]
  }

  #select(index: number) {
    const tabs = this.#tabs()
    tabs.forEach((t, i) => {
      if (i === index) t.setAttribute('selected', '')
      else t.removeAttribute('selected')
    })
    // attributeChangedCallback on each tab triggers refresh; we also refresh now
    // so focus management is consistent within a single event loop tick.
    this.refresh()
    const newButton = this.#tablist?.children[index] as HTMLButtonElement | undefined
    newButton?.focus()
    this.dispatchEvent(new CustomEvent('change', { detail: { index }, bubbles: true }))
  }

  #handleKey(event: KeyboardEvent, current: number) {
    const tabs = this.#tabs()
    let next = current
    switch (event.key) {
      case 'ArrowLeft':
        next = (current - 1 + tabs.length) % tabs.length
        break
      case 'ArrowRight':
        next = (current + 1) % tabs.length
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = tabs.length - 1
        break
      case ' ':
      case 'Enter':
        event.preventDefault()
        this.#select(current)
        return
      default:
        return
    }
    event.preventDefault()
    this.#select(next)
  }
}

if (!customElements.get('vk-tab')) customElements.define('vk-tab', VkTab)
if (!customElements.get('vk-tabs')) customElements.define('vk-tabs', VkTabs)
