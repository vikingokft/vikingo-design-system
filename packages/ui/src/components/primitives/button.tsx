import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import * as React from 'react'
import { cn } from '../../utils/cn'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-body font-medium rounded-[var(--radius-md)]',
    'transition-all duration-[var(--transition-fast)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'cursor-pointer select-none whitespace-nowrap',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'bg-[var(--color-accent)] text-white shadow-[var(--shadow-sm)]',
          'hover:bg-[var(--color-accent-hover)] hover:shadow-[var(--shadow-md)]',
          'btn-press',
        ].join(' '),
        secondary: [
          'bg-[var(--color-surface)] text-[var(--color-text)]',
          'border border-[var(--color-border)] shadow-[var(--shadow-sm)]',
          'hover:bg-[var(--color-bg)] hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-md)]',
          'btn-press',
        ].join(' '),
        ghost: [
          'bg-transparent text-[var(--color-text)]',
          'hover:bg-[var(--color-accent-muted)] hover:text-[var(--color-accent)]',
          'btn-press',
        ].join(' '),
        destructive: [
          'bg-[var(--color-error)] text-white shadow-[var(--shadow-sm)]',
          'hover:bg-[var(--color-error)]/90 hover:shadow-[var(--shadow-md)]',
          'btn-press',
        ].join(' '),
        outline: [
          'border border-[var(--color-accent)] text-[var(--color-accent)] bg-transparent',
          'hover:bg-[var(--color-accent-muted)] hover:shadow-[var(--shadow-sm)]',
          'btn-press',
        ].join(' '),
        link: ['text-[var(--color-accent)] underline-offset-4 hover:underline bg-transparent'].join(
          ' ',
        ),
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-base',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Renders as a child element via Radix Slot — useful for wrapping links (e.g. Next.js `<Link>`) */
  asChild?: boolean
  /** Shows a spinning loader and disables the button. Use during async operations. */
  loading?: boolean
  /** Icon rendered to the left of the label. Hidden while `loading` is true. */
  leftIcon?: React.ReactNode
  /** Icon rendered to the right of the label. Hidden while `loading` is true. */
  rightIcon?: React.ReactNode
  /**
   * Visual style of the button.
   * - `primary` — main call-to-action (accent background)
   * - `secondary` — secondary action (bordered surface)
   * - `ghost` — low-emphasis action (transparent, accent on hover)
   * - `destructive` — irreversible / dangerous action (red background)
   * - `outline` — accent-bordered transparent button
   * - `link` — text-only with underline on hover
   */
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline' | 'link'
  /**
   * Size of the button.
   * - `sm` h-8 · `md` h-10 (default) · `lg` h-12 · `xl` h-14
   * - `icon` h-10 w-10 square · `icon-sm` h-8 w-8 square
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon' | 'icon-sm'
}

/**
 * General-purpose interactive button. Supports 6 visual variants, 6 sizes,
 * loading state, left/right icons, and polymorphic rendering via `asChild`.
 *
 * @example
 * <Button variant="primary" onClick={save}>Mentés</Button>
 * <Button variant="destructive" isLoading>Törlés folyamatban…</Button>
 * <Button asChild><Link href="/settings">Beállítások</Link></Button>
 */
function Button({
  className,
  variant,
  size,
  asChild = false,
  loading,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ref,
  ...props
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : leftIcon ? (
        <span className="flex items-center">{leftIcon}</span>
      ) : null}
      {children}
      {!loading && rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </Comp>
  )
}

export { Button, buttonVariants }
