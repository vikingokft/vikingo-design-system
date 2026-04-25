/*
 * <vk-checkbox> — checkbox Custom Element
 *
 * Usage:
 *   <vk-checkbox checked label="Elfogadom"></vk-checkbox>
 *
 * Attributes:
 *   - checked    (boolean) on/off state.
 *   - disabled   (boolean) disable interaction.
 *   - label      (string)  visible label. Falls back to slotted text.
 *   - name       (string)  form field name.
 *   - value      (string)  form value when checked. Default 'on'.
 *   - indeterminate (boolean) tri-state mixed visual; ignored once user toggles.
 *
 * Events:
 *   - 'change' (CustomEvent<{ checked: boolean }>)
 */

const STYLES = /* css */ `
  :host { display: inline-flex; align-items: center; gap: var(--spacing-sm); cursor: pointer; }
  :host([disabled]) { opacity: 0.5; pointer-events: none; }

  .vk-checkbox__box {
    position: relative;
    width: 1.125rem;
    height: 1.125rem;
    background: var(--color-surface, #FFFFFF);
    border: 1.5px solid var(--color-border-strong, #C9BFB6);
    border-radius: var(--radius-sm, 4px);
    transition: background var(--duration-fast, 120ms) var(--ease-out-quint, ease),
                border-color var(--duration-fast, 120ms) var(--ease-out-quint, ease);
  }
  .vk-checkbox__box:focus-visible {
    outline: 2px solid var(--color-border-focus, #FF544D);
    outline-offset: 2px;
  }
  :host([checked]) .vk-checkbox__box,
  :host([indeterminate]) .vk-checkbox__box {
    background: var(--color-accent, #FF544D);
    border-color: var(--color-accent, #FF544D);
  }
  .vk-checkbox__check {
    position: absolute;
    inset: 0;
    display: none;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1;
  }
  :host([checked]) .vk-checkbox__check,
  :host([indeterminate]) .vk-checkbox__check { display: flex; }
  :host([indeterminate]) .vk-checkbox__check::after { content: '−'; }
  :host([checked]:not([indeterminate])) .vk-checkbox__check::after { content: '✓'; }

  .vk-checkbox__label {
    font-family: var(--font-body, sans-serif);
    font-size: 0.875rem;
    color: var(--color-text, #3E2E45);
    user-select: none;
  }
`

export class VkCheckbox extends HTMLElement {
  static formAssociated = true
  static get observedAttributes() {
    return ['checked', 'disabled', 'label', 'indeterminate']
  }

  #internals: ElementInternals | null = null
  #box: HTMLDivElement | null = null

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    if (typeof this.attachInternals === 'function') {
      this.#internals = this.attachInternals()
    }
  }

  connectedCallback() {
    if (!this.shadowRoot) return
    const label = this.getAttribute('label') ?? this.textContent?.trim() ?? ''
    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <div class="vk-checkbox__box" role="checkbox" tabindex="0" aria-checked="false">
        <span class="vk-checkbox__check"></span>
      </div>
      <span class="vk-checkbox__label">${label}</span>
    `
    this.#box = this.shadowRoot.querySelector('.vk-checkbox__box')
    this.#box?.addEventListener('click', this.#handleToggle)
    this.#box?.addEventListener('keydown', this.#handleKey)
    this.addEventListener('click', this.#handleHostClick)
    this.#sync()
  }

  disconnectedCallback() {
    this.#box?.removeEventListener('click', this.#handleToggle)
    this.#box?.removeEventListener('keydown', this.#handleKey)
    this.removeEventListener('click', this.#handleHostClick)
  }

  attributeChangedCallback() {
    this.#sync()
  }

  get checked() {
    return this.hasAttribute('checked')
  }
  set checked(v: boolean) {
    v ? this.setAttribute('checked', '') : this.removeAttribute('checked')
  }
  get disabled() {
    return this.hasAttribute('disabled')
  }

  #sync() {
    if (!this.#box) return
    const ariaChecked = this.hasAttribute('indeterminate') ? 'mixed' : String(this.checked)
    this.#box.setAttribute('aria-checked', ariaChecked)
    this.#box.tabIndex = this.disabled ? -1 : 0
    this.#internals?.setFormValue(this.checked ? (this.getAttribute('value') ?? 'on') : null)
  }

  #handleHostClick = (event: MouseEvent) => {
    // Clicking the label area outside the box should also toggle.
    if (event.composedPath()[0] !== this.#box && !this.disabled) this.#handleToggle(event)
  }

  #handleToggle = (event: Event) => {
    if (this.disabled) return
    event.preventDefault()
    event.stopPropagation()
    this.removeAttribute('indeterminate')
    this.checked = !this.checked
    this.dispatchEvent(
      new CustomEvent('change', { detail: { checked: this.checked }, bubbles: true }),
    )
  }

  #handleKey = (event: KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      this.#handleToggle(event)
    }
  }
}

if (!customElements.get('vk-checkbox')) customElements.define('vk-checkbox', VkCheckbox)
