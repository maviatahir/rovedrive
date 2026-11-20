import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/cn'

const variantClasses = {
  primary:
    'bg-accent text-ink-950 shadow-[0_12px_30px_-14px_rgba(255,107,53,0.75)] hover:bg-[#ff8255] active:bg-[#f75f29]',
  secondary:
    'border border-white/15 bg-white/[0.035] text-white hover:border-white/25 hover:bg-white/[0.075]',
  ghost: 'text-mist-300 hover:bg-white/[0.06] hover:text-white',
  danger:
    'border border-red-400/25 bg-red-400/10 text-red-300 hover:border-red-400/40 hover:bg-red-400/15 hover:text-red-200',
}

const sizeClasses = {
  sm: 'h-9 px-3.5 text-[13px] gap-1.5 rounded-lg',
  md: 'h-11 px-5 text-sm gap-2 rounded-xl',
  lg: 'h-12 px-6 text-[15px] gap-2.5 rounded-xl',
}

/**
 * Shared action component for links and buttons.
 * Renders a router link when `to` is provided, an anchor for `href`,
 * otherwise a native button. Keeps focus states consistent everywhere.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  to,
  href,
  isLoading = false,
  disabled = false,
  type = 'button',
  fullWidth = false,
  ...props
}) {
  const classes = cn(
    'inline-flex select-none items-center justify-center whitespace-nowrap font-semibold transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950',
    'disabled:cursor-not-allowed disabled:opacity-50',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    className,
  )

  const content = (
    <>
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {content}
    </button>
  )
}
