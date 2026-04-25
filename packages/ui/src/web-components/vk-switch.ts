/*
 * <vk-switch> — toggle Custom Element
 *
 * Usage:
 *   <vk-switch checked label="Értesítések"></vk-switch>
 *
 * Attributes:
 *   - checked   (boolean)  on/off state. Reflects to the attribute.
 *   - disabled  (boolean)  disable interaction.
 *   - label     (string)   accessible label. Falls back to slotted text content.
 *   - name      (string)   form field name. The element participates in form
 *                          submission via ElementInternals when supported.
 *
 * Events:
 *   - 'change' (CustomEvent<{ checked: boolean }>) fired on toggle.
 *
 * Keyboard:
 *   - Space / Enter toggle the switch when focused.
 */

const TEMPLATE = /* html */ `
  <button type="button" part="track" class="vk-switch__track" role="switch" aria-checked="false" tabindex="0">
    <span part="thumb" class="vk-switch__thumb"></span>
  </button>
`

const STYLES = /* css */ `
  :host { display: inline-flex; align-items: center; gap: var(--spacing-sm); }
  :host([disabled]) { opacity: 0.5; pointer-events: none; }

  .vk-switch__track {
    position: relative;
    width: 2.5rem;
    height: 1.5rem;
    background: var(--color-border-strong, #C9BFB6);
    border: none;
    border-radius: var(--radius-full, 9999px);
    cursor: pointer;
    padding: 0;
    transition: background var(--duration-fast, 120ms) var(--ease-out-quint, cubic-bezier(0.22, 1, 0.36, 1));
  }
  .vk-switch__track:focus-visible {
    outline: 2px solid var(--color-border-focus, #FF544D);
    outline-offset: 2px;
  }
  .vk-switch__track[aria-checked="true"] { background: var(--color-accent, #FF544D); }

  .vk-switch__thumb {
    position: absolute;
    top: 0.125rem;
    left: 0.125rem;
    width: 1.25rem;
    height: 1.25rem;
    background: #FFFFFF;
    border-radius: 50%;
    box-shadow: var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.1));
    transition: transform var(--duration-fast, 120ms) var(--ease-out-quint, cubic-bezier(0.22, 1, 0.36, 1));
  }
  .vk-switch__track[aria-checked="true"] .vk-switch__thumb { transform: translateX(1rem); }
`

export class VkSwitch extends HTMLElement {
  static formAssociated = true
  static get observedAttributes() {
    return ['checked', 'disabled', 'label']
  }

  #internals: ElementInternals | null = null
  #track: HTMLButtonElement | null = null

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    if (typeof this.attachInternals === 'function') {
      this.#internals = this.attachInternals()
    }
  }

  connectedCallback() {
    if (!this.shadowRoot) return
    this.shadowRoot.innerHTML = `<style>${STYLES}</style>${TEMPLATE}`
    this.#track = this.shadowRoot.querySelector('.vk-switch__track')

    this.#track?.addEventListener('click', this.#handleToggle)
    this.#track?.addEventListener('keydown', this.#handleKeydown)
    this.#sync()
  }

  disconnectedCallback() {
    this.#track?.removeEventListener('click', this.#handleToggle)
    this.#track?.removeEventListener('keydown', this.#handleKeydown)
  }

  attributeChangedCallback() {
    this.#sync()
  }

  get checked() {
    return this.hasAttribute('checked')
  }
  set checked(value: boolean) {
    if (value) this.setAttribute('checked', '')
    else this.removeAttribute('checked')
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }
  set disabled(value: boolean) {
    if (value) this.setAttribute('disabled', '')
    else this.removeAttribute('disabled')
  }

  #sync() {
    if (!this.#track) return
    const checked = this.checked
    this.#track.setAttribute('aria-checked', String(checked))
    const label = this.getAttribute('label') ?? this.textContent?.trim() ?? ''
    if (label) this.#track.setAttribute('aria-label', label)
    this.#track.tabIndex = this.disabled ? -1 : 0
    this.#internals?.setFormValue(checked ? (this.getAttribute('value') ?? 'on') : null)
  }

  #handleToggle = (event: Event) => {
    if (this.disabled) return
    event.preventDefault()
    this.checked = !this.checked
    this.dispatchEvent(
      new CustomEvent('change', { detail: { checked: this.checked }, bubbles: true }),
    )
  }

  #handleKeydown = (event: KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      this.#handleToggle(event)
    }
  }
}

if (!customElements.get('vk-switch')) {
  customElements.define('vk-switch', VkSwitch)
}
