import { Menu } from 'lucide-react'
import type * as React from 'react'
import { cn } from '../../utils/cn'
import { usePageLayout } from './page-layout-context'

export interface TopbarProps extends React.HTMLAttributes<HTMLElement> {
  left?: React.ReactNode
  right?: React.ReactNode
}

function Topbar({ left, right, className, children, ...props }: TopbarProps) {
  const layout = usePageLayout()

  return (
    <header
      className={cn(
        'flex items-center justify-between',
        'h-[var(--topbar-height)] px-4 sm:px-6',
        'bg-[var(--topbar-bg)]',
        'border-b border-[var(--topbar-border)]',
        'shrink-0',
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Hamburger – only visible on mobile when inside PageLayout */}
        {layout && (
          <button
            type="button"
            onClick={layout.openMobileMenu}
            className={cn(
              'md:hidden flex items-center justify-center',
              'h-8 w-8 rounded-[var(--radius-md)]',
              'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
              'hover:bg-[var(--color-border)]/40',
              'transition-colors duration-[var(--transition-fast)]',
              'shrink-0',
            )}
            aria-label="Navigáció megnyitása"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        {left}
      </div>
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">{right ?? children}</div>
    </header>
  )
}

export { Topbar }
