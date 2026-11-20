import { cn } from '../../utils/cn'

/**
 * Small status pill used on cards, details and summaries.
 * The label is always text, not colour alone, so it remains accessible.
 */
export default function AvailabilityBadge({ available, detailed = false, className }) {
  const label = available
    ? detailed
      ? 'Available to book'
      : 'Available'
    : detailed
      ? 'Currently unavailable'
      : 'Unavailable'

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold leading-none backdrop-blur-sm',
        available
          ? 'border-emerald-400/25 bg-emerald-950/70 text-emerald-300'
          : 'border-white/15 bg-ink-950/70 text-mist-300',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          available ? 'bg-emerald-400' : 'bg-mist-500',
        )}
      />
      {label}
    </span>
  )
}
