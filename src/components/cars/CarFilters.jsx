import { RotateCcw, SlidersHorizontal } from 'lucide-react'
import { formatCurrency } from '../../utils/format'
import { cn } from '../../utils/cn'

function FilterSection({ title, children, className }) {
  return (
    <fieldset className={cn('min-w-0', className)}>
      <legend className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-500">
        {title}
      </legend>
      {children}
    </fieldset>
  )
}

export default function CarFilters({
  id,
  cars,
  filters,
  categories,
  types,
  priceBounds,
  hasActiveFilters,
  setFilter,
  clearFilters,
  isOpen = false,
  className,
}) {
  const priceLabel =
    filters.maxPrice >= priceBounds.max ? 'Any price' : `${formatCurrency(filters.maxPrice)} / day`

  return (
    <aside
      id={id}
      aria-label="Fleet filters"
      className={cn(
        'rounded-2xl border border-white/[0.08] bg-ink-900 p-5',
        isOpen ? 'block' : 'hidden lg:block',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-display text-sm font-bold tracking-tight text-white">
          <SlidersHorizontal className="h-4 w-4 text-accent" aria-hidden="true" />
          Refine your search
        </h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-semibold text-mist-400 transition-colors hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            Reset
          </button>
        )}
      </div>

      <div className="mt-6 space-y-6">
        <FilterSection title="Category">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              aria-pressed={filters.category === 'all'}
              onClick={() => setFilter('category', 'all')}
              className={cn(
                'col-span-2 flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-[12.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                filters.category === 'all'
                  ? 'border-accent/40 bg-accent/10 text-white'
                  : 'border-white/[0.06] bg-white/[0.025] text-mist-300 hover:border-white/15 hover:bg-white/[0.05]',
              )}
            >
              All cars
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none',
                  filters.category === 'all'
                    ? 'bg-accent/15 text-accent'
                    : 'bg-white/[0.06] text-mist-500',
                )}
              >
                {cars.length}
              </span>
            </button>

            {categories.map((category) => {
              const count = cars.filter((car) => car.category === category).length
              const active = filters.category === category

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter('category', category)}
                  className={cn(
                    'flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-[12.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    active
                      ? 'border-accent/40 bg-accent/10 text-white'
                      : 'border-white/[0.06] bg-white/[0.025] text-mist-300 hover:border-white/15 hover:bg-white/[0.05]',
                  )}
                >
                  {category}
                  <span
                    className={cn(
                      'rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none',
                      active ? 'bg-accent/15 text-accent' : 'bg-white/[0.06] text-mist-500',
                    )}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </FilterSection>

        <div className="border-t border-white/[0.07] pt-6">
          <FilterSection title="Body type">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                aria-pressed={filters.type === 'all'}
                onClick={() => setFilter('type', 'all')}
                className={cn(
                  'rounded-lg border px-3 py-2 text-[12.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                  filters.type === 'all'
                    ? 'border-accent/40 bg-accent/10 text-white'
                    : 'border-white/[0.06] bg-white/[0.025] text-mist-300 hover:border-white/15 hover:bg-white/[0.05]',
                )}
              >
                All
              </button>
              {types.map((type) => {
                const active = filters.type === type

                return (
                  <button
                    key={type}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter('type', type)}
                    className={cn(
                      'rounded-lg border px-3 py-2 text-[12.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                      active
                        ? 'border-accent/40 bg-accent/10 text-white'
                        : 'border-white/[0.06] bg-white/[0.025] text-mist-300 hover:border-white/15 hover:bg-white/[0.05]',
                    )}
                  >
                    {type}
                  </button>
                )
              })}
            </div>
          </FilterSection>
        </div>

        <div className="border-t border-white/[0.07] pt-6">
          <FilterSection title="Daily budget">
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor="fleet-max-price"
                className="text-[12.5px] font-medium text-mist-200"
              >
                Maximum rate
              </label>
              <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent">
                {priceLabel}
              </span>
            </div>
            <input
              id="fleet-max-price"
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              step={5}
              value={filters.maxPrice}
              aria-valuetext={priceLabel}
              onChange={(event) => setFilter('maxPrice', Number(event.target.value))}
              className="mt-4 h-1.5 w-full cursor-pointer accent-accent"
            />
            <div className="mt-2 flex items-center justify-between text-[10.5px] font-medium text-mist-500">
              <span>{formatCurrency(priceBounds.min)}</span>
              <span>Up to {formatCurrency(priceBounds.max)}</span>
            </div>
          </FilterSection>
        </div>

        <div className="border-t border-white/[0.07] pt-6">
          <button
            type="button"
            role="switch"
            aria-checked={filters.availableOnly}
            onClick={() => setFilter('availableOnly', !filters.availableOnly)}
            className="flex w-full items-center justify-between gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5 text-left transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span>
              <span className="block text-[12.5px] font-medium text-mist-200">
                Available only
              </span>
              <span className="mt-0.5 block text-[11px] leading-5 text-mist-500">
                Hide vehicles that are currently unavailable
              </span>
            </span>
            <span
              aria-hidden="true"
              className={cn(
                'relative h-6 w-11 shrink-0 rounded-full border transition-colors',
                filters.availableOnly
                  ? 'border-accent/60 bg-accent'
                  : 'border-ink-500 bg-ink-700',
              )}
            >
              <span
                className={cn(
                  'absolute top-0.5 h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-transform',
                  filters.availableOnly ? 'translate-x-[21px]' : 'translate-x-0.5',
                )}
              />
            </span>
          </button>
        </div>
      </div>
    </aside>
  )
}
