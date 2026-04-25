'use client'

import * as React from 'react'
import { cn } from '../../utils/cn'
import { TooltipProvider } from '../primitives/tooltip'
import { PageLayoutContext } from './page-layout-context'

export interface PageLayoutProps {
  sidebar: React.ReactNode
  topbar?: React.ReactNode
  children: React.ReactNode
  className?: string
}

function PageLayout({ sidebar, topbar, children, className }: PageLayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  React.useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileOpen(false)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <PageLayoutContext.Provider value={{ openMobileMenu: () => setMobileOpen(true) }}>
      <TooltipProvider delayDuration={300}>
        <div className={cn('flex h-screen w-full overflow-hidden', className)}>
          {/* Desktop sidebar – hidden on mobile */}
          <div className="hidden md:flex flex-none h-full">{sidebar}</div>

          {/* Mobile overlay + slide-in drawer */}
          <div
            className={cn(
              'fixed inset-0 z-50 md:hidden',
              mobileOpen ? 'pointer-events-auto' : 'pointer-events-none',
            )}
          >
            {/* Backdrop */}
            <div
              className={cn(
                'absolute inset-0 bg-black/60 backdrop-blur-sm',
                'transition-opacity duration-[var(--transition-slow)]',
                mobileOpen ? 'opacity-100' : 'opacity-0',
              )}
              onClick={() => setMobileOpen(false)}
            />
            {/* Sidebar panel */}
            <div
              className={cn(
                'relative flex flex-none h-full',
                'transition-transform duration-[var(--transition-slow)]',
                mobileOpen ? 'translate-x-0' : '-translate-x-full',
              )}
            >
              {sidebar}
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
            {topbar && <div className="flex-none">{topbar}</div>}
            <main className="flex-1 overflow-y-auto bg-[var(--color-bg)]">{children}</main>
          </div>
        </div>
      </TooltipProvider>
    </PageLayoutContext.Provider>
  )
}

export interface PageContentProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  actions?: React.ReactNode
}

function PageContent({
  title,
  description,
  actions,
  children,
  className,
  ...props
}: PageContentProps) {
  return (
    <div className={cn('p-4 sm:p-6 max-w-screen-2xl mx-auto', className)} {...props}>
      {(title || actions) && (
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-6">
          <div>
            {title && (
              <h1 className="font-display font-semibold text-xl sm:text-2xl text-[var(--color-text)] tracking-tight">
                {title}
              </h1>
            )}
            {description && (
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">{description}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  )
}

export { PageLayout, PageContent }
