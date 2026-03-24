'use client'

import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'
import type { ToasterProps as SonnerToasterProps } from 'sonner'
import { Toaster as SonnerToaster } from 'sonner'

export interface ToasterProps {
  /** Toast position on screen. Default: `'bottom-right'` */
  position?: SonnerToasterProps['position']
}

/**
 * Global toast container. Place once in your root layout.
 *
 * @example
 * <Toaster />
 * <Toaster position="top-center" /> // Chrome extension popups
 */
export const Toaster = ({ position = 'bottom-right' }: ToasterProps) => {
  return (
    <SonnerToaster
      position={position}
      toastOptions={{
        style: {
          background: 'var(--color-surface)',
          color: 'var(--color-text)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          boxShadow: 'var(--shadow-lg)',
        },
        classNames: {
          toast: 'vikingo-toast',
          title: 'font-semibold',
          description: 'text-[var(--color-text-muted)] text-xs mt-0.5',
          actionButton:
            'bg-[var(--color-accent)] text-white text-xs px-3 py-1 rounded-[var(--radius-sm)] font-medium hover:bg-[var(--color-accent-hover)] transition-colors',
          cancelButton:
            'bg-[var(--color-bg)] text-[var(--color-text-muted)] text-xs px-3 py-1 rounded-[var(--radius-sm)] font-medium hover:text-[var(--color-text)] transition-colors',
          closeButton: 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
        },
      }}
      icons={{
        success: <CheckCircle2 className="h-4 w-4 text-[var(--color-success)]" />,
        error: <XCircle className="h-4 w-4 text-[var(--color-error)]" />,
        warning: <AlertTriangle className="h-4 w-4 text-[var(--color-warning)]" />,
        info: <Info className="h-4 w-4 text-[var(--color-info)]" />,
      }}
    />
  )
}

export { toast } from 'sonner'
