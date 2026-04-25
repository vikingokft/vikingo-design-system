/*
 * <vk-radio-group> / <vk-radio> — radio button group with roving tabindex
 *
 * Usage:
 *   <vk-radio-group name="size" value="md">
 *     <vk-radio value="sm" label="Kicsi"></vk-radio>
 *     <vk-radio value="md" label="Közepes"></vk-radio>
 *     <vk-radio value="lg" label="Nagy"></vk-radio>
 *   </vk-radio-group>
 *
 * Keyboard (on focused radio):
 *   - ArrowUp / ArrowLeft   move to previous radio (selects it)
 *   - ArrowDown / ArrowRight move to next radio (selects it)
 *   - Home / End            jump to first / last
 *   - Space                 select the focused radio (also focusing already does it)
 *
 * Events:
 *   - 'change' on <vk-radio-group> (CustomEvent<{ value: string }>)
 */

const RADIO_STYLES = /* css */ `
  :host { display: inline-flex; align-items: center; gap: var(--spacing-sm); cursor: pointer; }
  :host([disabled]) { opacity: 0.5; pointer-events: none; }
  .vk-radio__circle {
    width: 1.125rem;
    height: 1.125rem;
    border: 1.5px solid var(--color-border-strong, #C9BFB6);
    border-radius: 50%;
    background: var(--color-surface, #FFFFFF);
    position: relative;
    transition: border-color var(--duration-fast, 120ms) var(--ease-out-quint, ease);
  }
  .vk-radio__circle:focus-visible {
    outline: 2px solid var(--color-border-focus, #FF544D);
    outline-offset: 2px;
  }
  :host([checked]) .vk-radio__circle { border-color: var(--color-accent, #FF544D); }
  :host([checked]) .vk-radio__circle::after {
    content: '';
    position: absolute;
    inset: 3px;
    background: var(--color-accent, #FF544D);
    border-radius: 50%;
  }
  .vk-radio__label {
    font-family: var(--font-body, sans-serif);
    font-size: 0.875rem;
    color: var(--color-text, #3E2E45);
    user-select: none;
  }
`

export class VkRadio extends HTMLElement {
  static get observedAttributes() {
    return ['checked', 'disabled', 'label']
  }
  #circle: HTMLDivElement | null = null

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    if (!this.shadowRoot) return
    const label = this.getAttribute('label') ?? this.textContent?.trim() ?? ''
    this.shadowRoot.innerHTML = `
      <style>${RADIO_STYLES}</style>
      <div class="vk-radio__circle" role="radio" tabindex="-1" aria-checked="false"></div>
      <span class="vk-radio__label">${label}</span>
    `
    this.#circle = this.shadowRoot.querySelector('.vk-radio__circle')
    this.addEventListener('click', this.#handleSelect)
    this.#circle?.addEventListener('keydown', this.#handleKey)
    this.#sync()
  }

  attributeChangedCallback() {
    this.#sync()
  }

  get checked() {
    return this.hasAttribute('checked')
  }
  get value() {
    return this.getAttribute('value') ?? ''
  }

  focus() {
    this.#circle?.focus()
  }

  #sync() {
    if (!this.#circle) return
    this.#circle.setAttribute('aria-checked', String(this.checked))
    this.#circle.tabIndex = this.checked ? 0 : -1
  }

  #handleSelect = (event: Event) => {
    if (this.hasAttribute('disabled')) return
    event.preventDefault()
    const group = this.closest('vk-radio-group') as VkRadioGroup | null
    group?.selectByValue(this.value)
  }

  #handleKey = (event: KeyboardEvent) => {
    const group = this.closest('vk-radio-group') as VkRadioGroup | null
    if (!group) return
    group.handleRadioKey(event, this)
  }
}

export class VkRadioGroup extends HTMLElement {
  static get observedAttributes() {
    return ['value']
  }

  attributeChangedCallback() {
    this.#syncSelection()
  }

  connectedCallback() {
    // Wait a tick so child <vk-radio> elements have upgraded.
    queueMicrotask(() => this.#syncSelection())
  }

  selectByValue(value: string) {
    if (this.getAttribute('value') === value) return
    this.setAttribute('value', value)
    this.dispatchEvent(new CustomEvent('change', { detail: { value }, bubbles: true }))
    const focused = this.#radios().find((r) => r.value === value)
    focused?.focus()
  }

  handleRadioKey(event: KeyboardEvent, current: VkRadio) {
    const radios = this.#radios().filter((r) => !r.hasAttribute('disabled'))
    const index = radios.indexOf(current)
    let next = index
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        next = (index + 1) % radios.length
        break
      case 'ArrowUp':
      case 'ArrowLeft':
        next = (index - 1 + radios.length) % radios.length
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = radios.length - 1
        break
      case ' ':
        event.preventDefault()
        this.selectByValue(current.value)
        return
      default:
        return
    }
    event.preventDefault()
    this.selectByValue(radios[next]!.value)
  }

  #radios(): VkRadio[] {
    return Array.from(this.querySelectorAll('vk-radio')) as VkRadio[]
  }

  #syncSelection() {
    const value = this.getAttribute('value')
    this.#radios().forEach((r) => {
      if (r.value === value) r.setAttribute('checked', '')
      else r.removeAttribute('checked')
    })
  }
}

if (!customElements.get('vk-radio')) customElements.define('vk-radio', VkRadio)
if (!customElements.get('vk-radio-group')) customElements.define('vk-radio-group', VkRadioGroup)
