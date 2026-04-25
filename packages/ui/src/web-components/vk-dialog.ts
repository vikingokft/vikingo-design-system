/*
 * <vk-dialog> — modal dialog Custom Element
 *
 * Built on the native <dialog> element so we get focus management, modal
 * semantics, and the inert background for free. Adds:
 *   - escape-to-close (built-in to <dialog>; we just style it)
 *   - click-on-backdrop-to-close (configurable via close-on-backdrop attribute)
 *   - body scroll lock while open
 *
 * Usage:
 *   <vk-dialog id="confirm">
 *     <h2 slot="title">Megerősítés</h2>
 *     <p>Biztosan törölni szeretnéd?</p>
 *     <div slot="footer">
 *       <button class="vk-button vk-button--secondary" onclick="document.getElementById('confirm').close()">Mégse</button>
 *       <button class="vk-button vk-button--destructive">Törlés</button>
 *     </div>
 *   </vk-dialog>
 *   <button onclick="document.getElementById('confirm').showModal()">Open</button>
 *
 * Methods:
 *   - showModal()  open as modal
 *   - close(returnValue?)  close. Fires 'close' event with the return value.
 *
 * Attributes:
 *   - close-on-backdrop  (boolean, default true) close when the backdrop is clicked.
 */

const STYLES = /* css */ `
  :host { display: contents; }

  dialog {
    border: none;
    padding: 0;
    background: transparent;
    color: inherit;
    max-width: 32rem;
    width: 90vw;
  }
  dialog::backdrop {
    background: rgba(62, 46, 69, 0.6);
    backdrop-filter: blur(4px);
  }
  dialog[open] {
    animation: vk-dialog-in var(--duration-base, 200ms) var(--ease-out-quint, ease);
  }
  @keyframes vk-dialog-in {
    from { opacity: 0; transform: scale(0.96); }
    to   { opacity: 1; transform: scale(1); }
  }

  .vk-dialog__panel {
    background: var(--color-surface, #FFFFFF);
    border-radius: var(--radius-lg, 12px);
    box-shadow: var(--shadow-xl, 0 16px 40px rgba(0,0,0,0.2));
    overflow: hidden;
    display: flex;
    flex-direction: column;
    max-height: 90vh;
  }
  .vk-dialog__header {
    padding: var(--spacing-lg, 24px);
    border-bottom: 1px solid var(--color-border, #E0D9D1);
    font-family: var(--font-display, sans-serif);
    font-size: 1.125rem;
    font-weight: 600;
  }
  .vk-dialog__body {
    padding: var(--spacing-lg, 24px);
    overflow-y: auto;
    color: var(--color-text, #3E2E45);
    font-family: var(--font-body, sans-serif);
    font-size: 0.875rem;
  }
  .vk-dialog__footer {
    padding: var(--spacing-md, 16px) var(--spacing-lg, 24px);
    border-top: 1px solid var(--color-border, #E0D9D1);
    display: flex;
    gap: var(--spacing-sm, 8px);
    justify-content: flex-end;
  }
  .vk-dialog__footer:empty,
  .vk-dialog__header:empty { display: none; }
`

export class VkDialog extends HTMLElement {
  #dialog: HTMLDialogElement | null = null

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    if (!this.shadowRoot) return
    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <dialog>
        <div class="vk-dialog__panel" role="document">
          <div class="vk-dialog__header"><slot name="title"></slot></div>
          <div class="vk-dialog__body"><slot></slot></div>
          <div class="vk-dialog__footer"><slot name="footer"></slot></div>
        </div>
      </dialog>
    `
    this.#dialog = this.shadowRoot.querySelector('dialog')
    this.#dialog?.addEventListener('click', this.#handleBackdropClick)
    this.#dialog?.addEventListener('close', this.#handleClose)
  }

  disconnectedCallback() {
    this.#dialog?.removeEventListener('click', this.#handleBackdropClick)
    this.#dialog?.removeEventListener('close', this.#handleClose)
    document.body.style.overflow = ''
  }

  showModal() {
    this.#dialog?.showModal()
    document.body.style.overflow = 'hidden'
    this.dispatchEvent(new CustomEvent('open', { bubbles: true }))
  }

  show() {
    this.#dialog?.show()
  }

  close(returnValue?: string) {
    this.#dialog?.close(returnValue)
  }

  get open() {
    return this.#dialog?.open ?? false
  }

  #handleClose = () => {
    document.body.style.overflow = ''
    this.dispatchEvent(
      new CustomEvent('close', {
        detail: { returnValue: this.#dialog?.returnValue },
        bubbles: true,
      }),
    )
  }

  #handleBackdropClick = (event: MouseEvent) => {
    if (this.getAttribute('close-on-backdrop') === 'false') return
    // The dialog element itself receives the click only when the backdrop is hit;
    // clicks on the panel bubble up but originate from the panel, so check target.
    if (event.target === this.#dialog) this.close()
  }
}

if (!customElements.get('vk-dialog')) customElements.define('vk-dialog', VkDialog)
