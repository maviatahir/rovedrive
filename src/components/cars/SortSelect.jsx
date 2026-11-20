import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'

export default function SortSelect({
  id = 'fleet-sort',
  label = 'Sort vehicles',
  value,
  onChange,
  options,
  className,
}) {
  return (
    <div className={cn('relative', className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full appearance-none rounded-xl border border-ink-600 bg-ink-900 pl-4 pr-10 text-[13px] font-medium text-mist-200 focus:border-accent/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/20"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mist-500"
        aria-hidden="true"
      />
    </div>
  )
}
