import * as TabsPrimitive from '@radix-ui/react-tabs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'
import { cn } from '../../utils/cn'

const Tabs = TabsPrimitive.Root

type TabsListElement = React.ComponentRef<typeof TabsPrimitive.List>

function TabsList({
  className,
  variant = 'default',
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
  variant?: 'default' | 'pills' | 'underline'
  ref?: React.Ref<TabsListElement>
}) {
  const innerRef = React.useRef<TabsListElement | null>(null)
  const [showLeft, setShowLeft] = React.useState(false)
  const [showRight, setShowRight] = React.useState(false)

  const updateArrows = React.useCallback(() => {
    const el = innerRef.current
    if (!el) return
    setShowLeft(el.scrollLeft > 2)
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2)
  }, [])

  React.useEffect(() => {
    const el = innerRef.current
    if (!el) return
    updateArrows()
    el.addEventListener('scroll', updateArrows, { passive: true })
    const ro = new ResizeObserver(updateArrows)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', updateArrows)
      ro.disconnect()
    }
  }, [updateArrows])

  const mergedRef = React.useCallback(
    (node: TabsListElement | null) => {
      innerRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) (ref as React.RefObject<TabsListElement | null>).current = node
    },
    [ref],
  )

  return (
    <div className="relative flex items-center min-w-0 w-full">
      {showLeft && (
        <button
          type="button"
          aria-hidden="true"
          tabIndex={-1}
          onClick={() => innerRef.current?.scrollBy({ left: -120, behavior: 'smooth' })}
          className={cn(
            'absolute left-0 z-10 flex items-center justify-center h-full w-8 shrink-0',
            'bg-gradient-to-r from-[var(--color-bg)] to-transparent',
            'text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors',
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}
      <TabsPrimitive.List
        ref={mergedRef}
        className={cn(
          'flex items-center overflow-x-auto scrollbar-none w-full',
          variant === 'default' && [
            'h-10 rounded-[var(--radius-md)] bg-[var(--color-bg)]',
            'border border-[var(--color-border)] p-1 gap-1',
          ],
          variant === 'pills' && 'gap-1',
          variant === 'underline' && ['border-b border-[var(--color-border)] gap-0'],
          className,
        )}
        data-variant={variant}
        {...props}
      />
      {showRight && (
        <button
          type="button"
          aria-hidden="true"
          tabIndex={-1}
          onClick={() => innerRef.current?.scrollBy({ left: 120, behavior: 'smooth' })}
          className={cn(
            'absolute right-0 z-10 flex items-center justify-center h-full w-8 shrink-0',
            'bg-gradient-to-l from-[var(--color-bg)] to-transparent',
            'text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors',
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

function TabsTrigger({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
  ref?: React.Ref<React.ComponentRef<typeof TabsPrimitive.Trigger>>
}) {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-1.5',
        'px-3 py-1.5 text-sm font-medium font-body',
        'whitespace-nowrap cursor-pointer',
        'transition-all duration-[var(--transition-fast)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
        'disabled:pointer-events-none disabled:opacity-50',
        '[&[data-state=active]]:bg-[var(--color-surface)] [&[data-state=active]]:text-[var(--color-text)]',
        '[&[data-state=active]]:shadow-[var(--shadow-sm)] [&[data-state=active]]:rounded-[var(--radius-sm)]',
        'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
        '[.tabs-underline_&]:rounded-none [.tabs-underline_&]:border-b-2 [.tabs-underline_&]:border-transparent',
        '[.tabs-underline_&[data-state=active]]:border-[var(--color-accent)] [.tabs-underline_&[data-state=active]]:text-[var(--color-accent)]',
        '[.tabs-underline_&[data-state=active]]:bg-transparent [.tabs-underline_&[data-state=active]]:shadow-none',
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
  ref?: React.Ref<React.ComponentRef<typeof TabsPrimitive.Content>>
}) {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        'mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
        className,
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
