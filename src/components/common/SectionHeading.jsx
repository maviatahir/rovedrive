import { cn } from '../../utils/cn'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  headingId,
  className,
}) {
  const isCentered = align === 'center'

  return (
    <div
      className={cn(
        'flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between',
        isCentered && 'sm:flex-col sm:items-center sm:text-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', isCentered && 'mx-auto text-center')}>
        {eyebrow && (
          <p
            className={cn(
              'mb-4 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.23em] text-accent',
              isCentered && 'justify-center',
            )}
          >
            <span aria-hidden="true" className="h-px w-7 bg-accent/80" />
            {eyebrow}
          </p>
        )}
        <h2
          id={headingId}
          className="font-display text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-white sm:text-4xl lg:text-[2.65rem]"
        >
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-[15px] leading-7 text-mist-400 sm:text-base">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
