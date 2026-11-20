import { useRef } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '../../utils/cn'

export default function SearchBar({
  id = 'fleet-search',
  label = 'Search the fleet',
  placeholder = 'Search by brand, model or type…',
  value,
  onChange,
  onClear,
  className,
}) {
  const inputRef = useRef(null)

  function handleClear() {
    onClear?.()
    inputRef.current?.focus()
  }

  return (
    <div className={cn('relative', className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-mist-500"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="h-12 w-full rounded-xl border border-ink-600 bg-ink-900 pl-11 pr-12 text-sm text-white placeholder:text-mist-500 focus:border-accent/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/20"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-mist-400 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
