/*
 * <vk-toast-host> — toast notification container
 * vkToast() — imperative API to fire a toast
 *
 * Usage:
 *   <vk-toast-host position="bottom-right"></vk-toast-host>
 *
 *   import { vkToast } from '@vikingo/ui/html'
 *   vkToast.success('Mentve')
 *   vkToast.error('Hiba történt', { description: 'Próbáld újra.' })
 *   vkToast({ title: 'Egyedi', description: '...', variant: 'info' })
 *
 * Mount the host once at app root. The imperative API will lazily create one if
 * none exists yet (appended to `document.body`).
 *
 * Each toast auto-dismisses after `duration` ms (default 4000). Hover pauses
 * the timer; mouseleave resumes it.
 */

type Variant = 'default' | 'success' | 'warning' | 'error' | 'info'
type Position = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export interface ToastOptions {
  title: string
  description?: string
  variant?: Variant
  duration?: number
}

const HOST_STYLES = /* css */ `
  :host {
    position: fixed;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    pointer-events: none;
  }
  :host([position="top-right"])    { top: 1rem; right: 1rem; }
  :host([position="top-left"])     { top: 1rem; left: 1rem; }
  :host([position="bottom-right"]) { bottom: 1rem; right: 1rem; }
  :host([position="bottom-left"])  { bottom: 1rem; left: 1rem; }

  .vk-toast {
    pointer-events: auto;
    min-width: 18rem;
    max-width: 24rem;
    padding: var(--spacing-md, 16px);
    background: var(--color-surface, #FFFFFF);
    color: var(--color-text, #3E2E45);
    border: 1px solid var(--color-border, #E0D9D1);
    border-radius: var(--radius-md, 8px);
    box-shadow: var(--shadow-lg, 0 8px 24px rgba(0,0,0,0.1));
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-family: var(--font-body, sans-serif);
    font-size: 0.875rem;
    transform: translateY(0);
    opacity: 1;
    transition: opacity var(--duration-base, 200ms) var(--ease-out-quint, ease),
                transform var(--duration-base, 200ms) var(--ease-out-quint, ease);
  }
  .vk-toast--leaving { opacity: 0; transform: translateY(-8px); }
  .vk-toast__title { font-weight: 600; }
  .vk-toast__description { color: var(--color-text-muted, #7A6A82); }

  .vk-toast--success { border-left: 4px solid var(--color-success, #22C55E); }
  .vk-toast--warning { border-left: 4px solid var(--color-warning, #F59E0B); }
  .vk-toast--error   { border-left: 4px solid var(--color-error, #EF4444); }
  .vk-toast--info    { border-left: 4px solid var(--color-info, #3B82F6); }
`

export class VkToastHost extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }
  connectedCallback() {
    if (!this.hasAttribute('position')) this.setAttribute('position', 'bottom-right')
    if (this.shadowRoot) this.shadowRoot.innerHTML = `<style>${HOST_STYLES}</style>`
  }
  show(options: ToastOptions) {
    if (!this.shadowRoot) return
    const variant = options.variant ?? 'default'
    const duration = options.duration ?? 4000

    const el = document.createElement('div')
    el.className = `vk-toast vk-toast--${variant}`
    el.setAttribute('role', variant === 'error' ? 'alert' : 'status')

    const title = document.createElement('div')
    title.className = 'vk-toast__title'
    title.textContent = options.title
    el.appendChild(title)

    if (options.description) {
      const desc = document.createElement('div')
      desc.className = 'vk-toast__description'
      desc.textContent = options.description
      el.appendChild(desc)
    }

    this.shadowRoot.appendChild(el)

    let timer: number | null = null
    const dismiss = () => {
      el.classList.add('vk-toast--leaving')
      window.setTimeout(() => el.remove(), 250)
    }
    const start = () => {
      timer = window.setTimeout(dismiss, duration)
    }
    const stop = () => {
      if (timer != null) clearTimeout(timer)
    }

    el.addEventListener('mouseenter', stop)
    el.addEventListener('mouseleave', start)
    start()
  }
}

if (!customElements.get('vk-toast-host')) {
  customElements.define('vk-toast-host', VkToastHost)
}

const ensureHost = (): VkToastHost => {
  let host = document.querySelector('vk-toast-host') as VkToastHost | null
  if (!host) {
    host = document.createElement('vk-toast-host') as VkToastHost
    document.body.appendChild(host)
  }
  return host
}

const toast = (options: ToastOptions) => ensureHost().show(options)
toast.success = (title: string, opts: Partial<ToastOptions> = {}) =>
  ensureHost().show({ title, variant: 'success', ...opts })
toast.error = (title: string, opts: Partial<ToastOptions> = {}) =>
  ensureHost().show({ title, variant: 'error', ...opts })
toast.warning = (title: string, opts: Partial<ToastOptions> = {}) =>
  ensureHost().show({ title, variant: 'warning', ...opts })
toast.info = (title: string, opts: Partial<ToastOptions> = {}) =>
  ensureHost().show({ title, variant: 'info', ...opts })

export const vkToast = toast
