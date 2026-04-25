/*
 * <vk-tooltip> — show a label on hover or focus
 *
 * Usage:
 *   <vk-tooltip text="Mentés Cmd+S-szel">
 *     <button class="vk-button vk-button--primary">Mentés</button>
 *   </vk-tooltip>
 *
 * Attributes:
 *   - text    (string)  the tooltip text. Required.
 *   - placement (top|right|bottom|left) default 'top'. Best-effort positioning.
 *   - delay-ms  (number) hover-open delay in ms. Default 200.
 *
 * Accessibility:
 *   - The tooltip is exposed via aria-describedby on the slotted trigger element.
 *   - Esc dismisses an open tooltip.
 *   - The trigger keeps its own focus ring; the tooltip never receives focus.
 */

const STYLES = /* css */ `
  :host { display: inline-block; position: relative; }
  .vk-tooltip__bubble {
    position: absolute;
    z-index: 1000;
    padding: 0.375rem 0.625rem;
    font-family: var(--font-body, sans-serif);
    font-size: 0.75rem;
    line-height: 1.25;
    color: #FFFFFF;
    background: var(--color-text, #3E2E45);
    border-radius: var(--radius-sm, 4px);
    box-shadow: var(--shadow-md, 0 4px 12px rgba(0,0,0,0.1));
    pointer-events: none;
    opacity: 0;
    transform: scale(0.95);
    transition: opacity var(--duration-fast, 120ms) var(--ease-out-quint, ease),
                transform var(--duration-fast, 120ms) var(--ease-out-quint, ease);
    white-space: nowrap;
    max-width: 16rem;
  }
  :host([data-open="true"]) .vk-tooltip__bubble { opacity: 1; transform: scale(1); }

  :host([placement="top"])    .vk-tooltip__bubble { bottom: calc(100% + 0.375rem); left: 50%; transform: translateX(-50%) scale(0.95); }
  :host([placement="bottom"]) .vk-tooltip__bubble { top:    calc(100% + 0.375rem); left: 50%; transform: translateX(-50%) scale(0.95); }
  :host([placement="left"])   .vk-tooltip__bubble { right:  calc(100% + 0.375rem); top: 50%;  transform: translateY(-50%) scale(0.95); }
  :host([placement="right"])  .vk-tooltip__bubble { left:   calc(100% + 0.375rem); top: 50%;  transform: translateY(-50%) scale(0.95); }

  :host([placement="top"][data-open="true"])    .vk-tooltip__bubble { transform: translateX(-50%) scale(1); }
  :host([placement="bottom"][data-open="true"]) .vk-tooltip__bubble { transform: translateX(-50%) scale(1); }
  :host([placement="left"][data-open="true"])   .vk-tooltip__bubble { transform: translateY(-50%) scale(1); }
  :host([placement="right"][data-open="true"])  .vk-tooltip__bubble { transform: translateY(-50%) scale(1); }
`

let nextId = 0

export class VkTooltip extends HTMLElement {
  static get observedAttributes() {
    return ['text', 'placement']
  }

  #bubble: HTMLDivElement | null = null
  #trigger: HTMLElement | null = null
  #openTimer: number | null = null
  #id = `vk-tooltip-${++nextId}`

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    if (!this.hasAttribute('placement')) this.setAttribute('placement', 'top')
  }

  connectedCallback() {
    if (!this.shadowRoot) return
    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <slot></slot>
      <div class="vk-tooltip__bubble" id="${this.#id}" role="tooltip"></div>
    `
    this.#bubble = this.shadowRoot.querySelector('.vk-tooltip__bubble')
    this.#syncText()
    this.#bindTrigger()
  }

  disconnectedCallback() {
    this.#unbindTrigger()
    if (this.#openTimer != null) clearTimeout(this.#openTimer)
  }

  attributeChangedCallback() {
    this.#syncText()
  }

  #syncText() {
    if (this.#bubble) this.#bubble.textContent = this.getAttribute('text') ?? ''
  }

  #bindTrigger() {
    // The first slotted element is the trigger.
    const slot = this.shadowRoot?.querySelector('slot')
    const assigned = slot?.assignedElements()
    this.#trigger = (assigned && (assigned[0] as HTMLElement)) ?? null
    if (!this.#trigger) return

    this.#trigger.setAttribute('aria-describedby', this.#id)
    this.#trigger.addEventListener('mouseenter', this.#scheduleOpen)
    this.#trigger.addEventListener('mouseleave', this.#close)
    this.#trigger.addEventListener('focus', this.#open)
    this.#trigger.addEventListener('blur', this.#close)
    this.#trigger.addEventListener('keydown', this.#handleKey)
  }

  #unbindTrigger() {
    this.#trigger?.removeEventListener('mouseenter', this.#scheduleOpen)
    this.#trigger?.removeEventListener('mouseleave', this.#close)
    this.#trigger?.removeEventListener('focus', this.#open)
    this.#trigger?.removeEventListener('blur', this.#close)
    this.#trigger?.removeEventListener('keydown', this.#handleKey)
  }

  #scheduleOpen = () => {
    const delay = Number.parseInt(this.getAttribute('delay-ms') ?? '200', 10)
    this.#openTimer = window.setTimeout(() => this.#open(), delay)
  }

  #open = () => {
    if (this.#openTimer != null) {
      clearTimeout(this.#openTimer)
      this.#openTimer = null
    }
    this.dataset.open = 'true'
  }

  #close = () => {
    if (this.#openTimer != null) {
      clearTimeout(this.#openTimer)
      this.#openTimer = null
    }
    this.dataset.open = 'false'
  }

  #handleKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') this.#close()
  }
}

if (!customElements.get('vk-tooltip')) {
  customElements.define('vk-tooltip', VkTooltip)
}
