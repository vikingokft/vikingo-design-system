import type * as React from 'react'
import { cn } from '../../utils/cn'
import { Badge } from './badge'

export interface ImageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  alt: string
  title?: string
  description?: string
  tags?: string[]
  meta?: string
  actions?: React.ReactNode
  aspectRatio?: '1/1' | '16/9' | '4/3' | '3/2'
  badge?: string
  badgeVariant?: 'default' | 'accent' | 'success' | 'warning' | 'error'
}

function ImageCard({
  src,
  alt,
  title,
  description,
  tags,
  meta,
  actions,
  aspectRatio = '4/3',
  badge,
  badgeVariant = 'default',
  className,
  ...props
}: ImageCardProps) {
  const aspectClasses = {
    '1/1': 'aspect-square',
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
  }

  return (
    <div
      className={cn(
        'group relative flex flex-col',
        'bg-[var(--color-surface)] rounded-[var(--radius-lg)]',
        'border border-[var(--color-border)]',
        'overflow-hidden',
        'shadow-[var(--shadow-sm)]',
        'transition-shadow duration-[var(--transition-base)]',
        'hover:shadow-[var(--shadow-md)]',
        className,
      )}
      {...props}
    >
      {/* Image */}
      <div
        className={cn('relative overflow-hidden bg-[var(--color-bg)]', aspectClasses[aspectRatio])}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-[var(--transition-slow)] group-hover:scale-[1.02]"
        />
        {badge && (
          <div className="absolute top-2 left-2">
            <Badge variant={badgeVariant} size="sm">
              {badge}
            </Badge>
          </div>
        )}
        {actions && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--transition-fast)]">
            {actions}
          </div>
        )}
      </div>

      {/* Content */}
      {(title || description || tags || meta) && (
        <div className="flex flex-col gap-2 p-3">
          {title && (
            <h3 className="font-body font-medium text-sm text-[var(--color-text)] leading-snug line-clamp-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-xs text-[var(--color-text-muted)] line-clamp-2">{description}</p>
          )}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <Badge key={tag} variant="default" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          {meta && (
            <p className="text-[10px] font-mono text-[var(--color-text-subtle)] mt-0.5">{meta}</p>
          )}
        </div>
      )}
    </div>
  )
}

export { ImageCard }
