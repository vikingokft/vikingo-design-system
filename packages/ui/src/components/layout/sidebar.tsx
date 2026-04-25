'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import type * as React from 'react'
import { cn } from '../../utils/cn'
import { Badge } from '../primitives/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '../primitives/tooltip'

export interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: string | number
  active?: boolean
  onClick?: () => void
}

export interface NavSection {
  label?: string
  items: NavItem[]
}

export interface SidebarProps {
  logo?: React.ReactNode
  logoCollapsed?: React.ReactNode
  sections: NavSection[]
  footer?: React.ReactNode
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  /** 'dark' = sötét lila (alapértelmezett), 'light' = fehér, világos */
  variant?: 'dark' | 'light'
  className?: string
}

function SidebarNavItem({
  item,
  collapsed,
  variant = 'dark',
}: {
  item: NavItem
  collapsed: boolean
  variant?: 'dark' | 'light'
}) {
  const isLight = variant === 'light'

  const content = (
    <a
      href={item.href}
      onClick={item.onClick}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5',
        'rounded-[var(--radius-md)]',
        'text-sm font-body font-medium',
        'transition-all duration-[var(--transition-fast)]',
        'cursor-pointer select-none',
        // Dark variant
        !isLight &&
          item.active &&
          'bg-[var(--sidebar-bg-active)] text-[var(--sidebar-text-active)] shadow-[var(--shadow-sm)]',
        !isLight &&
          !item.active &&
          'text-[var(--sidebar-text-muted)] hover:bg-[var(--sidebar-bg-hover)] hover:text-[var(--sidebar-text)]',
        // Light variant
        isLight &&
          item.active &&
          'bg-[var(--sidebar-light-bg-active)] text-[var(--sidebar-light-text-active)] font-semibold',
        isLight &&
          !item.active &&
          'text-[var(--sidebar-light-text-muted)] hover:bg-[var(--sidebar-light-bg-hover)] hover:text-[var(--sidebar-light-text)]',
        collapsed && 'justify-center px-2',
      )}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">{item.icon}</span>
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge !== undefined && (
            <Badge variant={isLight ? 'accent' : 'solid'} size="sm">
              {item.badge}
            </Badge>
          )}
        </>
      )}
    </a>
  )

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right">
          <span>{item.label}</span>
          {item.badge !== undefined && (
            <span className="ml-2 font-mono text-xs opacity-70">{item.badge}</span>
          )}
        </TooltipContent>
      </Tooltip>
    )
  }

  return content
}

function Sidebar({
  logo,
  logoCollapsed,
  sections,
  footer,
  collapsed = false,
  onCollapsedChange,
  variant = 'dark',
  className,
}: SidebarProps) {
  const isLight = variant === 'light'

  return (
    <aside
      className={cn(
        'flex flex-col h-full',
        'transition-[width] duration-[var(--transition-slow)]',
        collapsed ? 'w-[var(--sidebar-width-collapsed)]' : 'w-[var(--sidebar-width)]',
        // Dark variant
        !isLight && 'bg-[var(--sidebar-bg)] border-r border-[var(--sidebar-border)]',
        // Light variant
        isLight && 'bg-[var(--sidebar-light-bg)] border-r border-[var(--sidebar-light-border)]',
        className,
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          'flex items-center h-[var(--topbar-height)] px-4 shrink-0',
          !isLight && 'border-b border-[var(--sidebar-border)]',
          isLight && 'border-b border-[var(--sidebar-light-border)]',
          collapsed && 'justify-center px-2',
        )}
      >
        {collapsed ? (logoCollapsed ?? logo) : logo}
      </div>

      {/* Navigáció */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
        {sections.map((section, i) => (
          <div key={i}>
            {section.label && !collapsed && (
              <p
                className={cn(
                  'px-3 mb-1.5 text-[10px] font-mono uppercase tracking-widest',
                  !isLight && 'text-[var(--sidebar-text-muted)]',
                  isLight && 'text-[var(--sidebar-light-text-muted)]',
                )}
              >
                {section.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.href}>
                  <SidebarNavItem item={item} collapsed={collapsed} variant={variant} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      {footer && (
        <div
          className={cn(
            'shrink-0 p-3',
            !isLight && 'border-t border-[var(--sidebar-border)]',
            isLight && 'border-t border-[var(--sidebar-light-border)]',
            collapsed && 'flex justify-center',
          )}
        >
          {footer}
        </div>
      )}

      {/* Összecsuk gomb – mobilon rejtett */}
      {onCollapsedChange && (
        <button
          onClick={() => onCollapsedChange(!collapsed)}
          className={cn(
            'hidden md:flex shrink-0 items-center justify-center h-10',
            'transition-colors duration-[var(--transition-fast)] cursor-pointer',
            !isLight &&
              'border-t border-[var(--sidebar-border)] text-[var(--sidebar-text-muted)] hover:text-[var(--sidebar-text)] hover:bg-[var(--sidebar-bg-hover)]',
            isLight &&
              'border-t border-[var(--sidebar-light-border)] text-[var(--sidebar-light-text-muted)] hover:text-[var(--sidebar-light-text)] hover:bg-[var(--sidebar-light-bg-hover)]',
          )}
          aria-label={collapsed ? 'Kinyitás' : 'Összecsukás'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      )}
    </aside>
  )
}

export { Sidebar }
