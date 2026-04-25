import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '../../utils/cn'

// ── Types ────────────────────────────────────────────────────────────────────

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** How many items to show at once */
  itemsPerView?: 1 | 2 | 3 | 'auto'
  /** Show prev/next arrow buttons */
  showArrows?: boolean
  /** Show dot indicators */
  showDots?: boolean
  /** Loop around at the ends */
  loop?: boolean
  /** Gap between items in px */
  gap?: number
  /** Auto-advance interval in ms (0 = disabled) */
  autoplay?: number
}

// ── CarouselItem ─────────────────────────────────────────────────────────────

export interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CarouselItem({ className, children, ...props }: CarouselItemProps) {
  return (
    <div className={cn('shrink-0 snap-start', className)} {...props}>
      {children}
    </div>
  )
}

// ── Carousel ─────────────────────────────────────────────────────────────────

export function Carousel({
  itemsPerView = 1,
  showArrows = true,
  showDots = true,
  loop = false,
  gap = 16,
  autoplay = 0,
  className,
  children,
  ...props
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const items = React.Children.toArray(children)
  const count = items.length

  const getItemWidth = useCallback(() => {
    if (!trackRef.current || itemsPerView === 'auto') return 0
    return (trackRef.current.offsetWidth - gap * (itemsPerView - 1)) / itemsPerView
  }, [itemsPerView, gap])

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!trackRef.current) return
      const clamped = loop
        ? ((index % count) + count) % count
        : Math.max(0, Math.min(index, count - 1))

      if (itemsPerView !== 'auto') {
        const itemW = getItemWidth()
        trackRef.current.scrollTo({ left: clamped * (itemW + gap), behavior: 'smooth' })
      }
      setActiveIndex(clamped)
    },
    [count, gap, getItemWidth, itemsPerView, loop],
  )

  // Sync dots/arrows on scroll
  const onScroll = useCallback(() => {
    if (!trackRef.current || itemsPerView === 'auto') return
    const itemW = getItemWidth()
    if (itemW === 0) return
    const { scrollLeft, scrollWidth, offsetWidth } = trackRef.current
    const idx = Math.round(scrollLeft / (itemW + gap))
    setActiveIndex(idx)
    setCanPrev(scrollLeft > 4)
    setCanNext(scrollLeft < scrollWidth - offsetWidth - 4)
  }, [gap, getItemWidth, itemsPerView])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => track.removeEventListener('scroll', onScroll)
  }, [onScroll])

  // Autoplay
  useEffect(() => {
    if (!autoplay) return
    autoplayRef.current = setInterval(() => {
      setActiveIndex((i) => {
        const next = loop ? (i + 1) % count : Math.min(i + 1, count - 1)
        scrollToIndex(next)
        return next
      })
    }, autoplay)
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [autoplay, loop, count, scrollToIndex])

  // Keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scrollToIndex(activeIndex - 1)
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      scrollToIndex(activeIndex + 1)
    }
  }

  // Touch/swipe
  const touchStartX = useRef(0)
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }
  function handleTouchEnd(e: React.TouchEvent) {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      scrollToIndex(diff > 0 ? activeIndex + 1 : activeIndex - 1)
    }
  }

  // Compute item flex style
  const itemStyle: React.CSSProperties =
    itemsPerView !== 'auto'
      ? { width: `calc((100% - ${gap * (itemsPerView - 1)}px) / ${itemsPerView})` }
      : {}

  const styledChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child
    return React.cloneElement(child as React.ReactElement<CarouselItemProps>, {
      style: { ...itemStyle, ...(child.props as CarouselItemProps).style },
    })
  })

  return (
    <div
      className={cn('relative group/carousel', className)}
      onKeyDown={handleKeyDown}
      role="region"
      aria-roledescription="carousel"
      style={{ outline: 'none' }}
      {...props}
    >
      {/* Track */}
      <div
        ref={trackRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none"
        style={{ gap }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {styledChildren}
      </div>

      {/* Arrow buttons */}
      {showArrows && (
        <>
          <button
            type="button"
            aria-label="Előző"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={!loop && !canPrev}
            className={cn(
              'absolute left-2 top-1/2 -translate-y-1/2 z-10',
              'h-8 w-8 rounded-full flex items-center justify-center',
              'bg-[var(--color-surface)]/90 backdrop-blur-sm border border-[var(--color-border)]',
              'shadow-[var(--shadow-md)] text-[var(--color-text)]',
              'transition-all duration-[var(--transition-fast)]',
              'opacity-0 group-hover/carousel:opacity-100',
              'hover:bg-[var(--color-bg)] hover:scale-105 active:scale-95',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40',
              !loop && !canPrev && 'opacity-0 pointer-events-none',
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            aria-label="Következő"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={!loop && !canNext}
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2 z-10',
              'h-8 w-8 rounded-full flex items-center justify-center',
              'bg-[var(--color-surface)]/90 backdrop-blur-sm border border-[var(--color-border)]',
              'shadow-[var(--shadow-md)] text-[var(--color-text)]',
              'transition-all duration-[var(--transition-fast)]',
              'opacity-0 group-hover/carousel:opacity-100',
              'hover:bg-[var(--color-bg)] hover:scale-105 active:scale-95',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40',
              !loop && !canNext && 'opacity-0 pointer-events-none',
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && count > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1}. elem`}
              onClick={() => scrollToIndex(i)}
              className={cn(
                'rounded-full transition-all duration-[var(--transition-base)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40',
                i === activeIndex
                  ? 'w-5 h-2 bg-[var(--color-accent)]'
                  : 'w-2 h-2 bg-[var(--color-border-strong)] hover:bg-[var(--color-text-muted)]',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
