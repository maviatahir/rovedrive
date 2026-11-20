import { cn } from '../../utils/cn'

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-600 bg-ink-900/50 px-6 py-14 text-center sm:px-10',
        className,
      )}
    >
      {Icon && (
        <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-ink-800 text-accent">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
      )}
      <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-md text-sm leading-6 text-mist-400">{description}</p>
      )}
      {action && <div className="mt-7 flex flex-wrap justify-center gap-3">{action}</div>}
    </div>
  )
}
