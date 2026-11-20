import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchX, SlidersHorizontal, X } from 'lucide-react'
import Button from '../components/common/Button'
import EmptyState from '../components/common/EmptyState'
import PageContainer from '../components/common/PageContainer'
import CarFilters from '../components/cars/CarFilters'
import CarGrid from '../components/cars/CarGrid'
import SearchBar from '../components/cars/SearchBar'
import SortSelect from '../components/cars/SortSelect'
import { cars } from '../data/cars'
import { useCarFilters } from '../hooks/useCarFilters'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function FleetPage() {
  useDocumentTitle('Our Fleet')
  const [searchParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const initialFilters = useMemo(() => {
    const maxPrice = searchParams.get('maxPrice')
    const filters = {
      query: searchParams.get('q') ?? '',
      category: searchParams.get('category') ?? 'all',
    }

    if (maxPrice !== null) filters.maxPrice = maxPrice
    return filters
  }, [searchParams])

  const {
    filters,
    filteredCars,
    totalCount,
    activeFilterCount,
    hasActiveFilters,
    priceBounds,
    categories,
    types,
    sortOptions,
    setFilter,
    clearFilters,
  } = useCarFilters(cars, initialFilters)

  const availableCount = cars.filter((car) => car.availability).length

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-pattern opacity-60" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-24 h-80 w-80 rounded-full bg-accent/[0.07] blur-[120px]"
        />

        <PageContainer className="relative py-10 sm:py-14">
          <p className="flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.23em] text-accent">
            <span aria-hidden="true" className="h-px w-7 bg-accent/80" />
            Our fleet
          </p>

          <div className="mt-4 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="font-display text-3xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-4xl lg:text-[2.9rem]">
                Find the right car for the road ahead.
              </h1>
              <p className="mt-4 max-w-xl text-[14px] leading-7 text-mist-400 sm:text-[15px]">
                Search and combine filters to narrow the fleet, then sort the
                results to suit your trip. Every rate is a sample USD daily price.
              </p>
            </div>

            <dl className="flex shrink-0 gap-7 rounded-xl border border-white/[0.08] bg-ink-900/70 px-5 py-4 backdrop-blur-sm">
              <div>
                <dt className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-mist-500">
                  In the fleet
                </dt>
                <dd className="mt-1 font-display text-2xl font-bold tracking-tight text-white">
                  {cars.length}
                </dd>
              </div>
              <div className="border-l border-white/[0.08] pl-7">
                <dt className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-mist-500">
                  Available
                </dt>
                <dd className="mt-1 font-display text-2xl font-bold tracking-tight text-emerald-300">
                  {availableCount}
                </dd>
              </div>
            </dl>
          </div>
        </PageContainer>
      </section>

      <section className="py-8 lg:py-12">
        <PageContainer>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchBar
              id="fleet-search"
              value={filters.query}
              onChange={(value) => setFilter('query', value)}
              onClear={() => setFilter('query', '')}
              className="flex-1"
            />

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setFiltersOpen((open) => !open)}
                aria-expanded={filtersOpen}
                aria-controls="fleet-filters"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-ink-600 bg-ink-900 px-4 text-[13px] font-semibold text-mist-200 transition-colors hover:bg-ink-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
              >
                {filtersOpen ? (
                  <X className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                )}
                {filtersOpen ? 'Hide filters' : 'Filters'}
                {activeFilterCount > 0 && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-ink-950">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <SortSelect
                id="fleet-sort"
                value={filters.sort}
                onChange={(value) => setFilter('sort', value)}
                options={sortOptions}
                className="w-full sm:w-[190px]"
              />
            </div>
          </div>

          <div className="mt-7 grid gap-8 lg:grid-cols-[272px_minmax(0,1fr)] xl:grid-cols-[288px_minmax(0,1fr)] lg:items-start">
            <CarFilters
              id="fleet-filters"
              cars={cars}
              filters={filters}
              categories={categories}
              types={types}
              priceBounds={priceBounds}
              hasActiveFilters={hasActiveFilters}
              setFilter={setFilter}
              clearFilters={clearFilters}
              isOpen={filtersOpen}
              className="lg:sticky lg:top-24"
            />

            <div className="min-w-0">
              <h2 className="sr-only">Fleet results</h2>
              <div className="flex flex-col gap-2 border-b border-white/[0.07] pb-5 sm:flex-row sm:items-center sm:justify-between">
                <p aria-live="polite" className="text-[12.5px] text-mist-400">
                  Showing{' '}
                  <span className="font-semibold text-white">{filteredCars.length}</span>{' '}
                  of {totalCount} vehicles
                  {activeFilterCount > 0 && (
                    <span className="text-mist-500">
                      {' '}
                      · {activeFilterCount} active{' '}
                      {activeFilterCount === 1 ? 'filter' : 'filters'}
                    </span>
                  )}
                </p>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1.5 self-start rounded-lg px-2 py-1.5 text-[11.5px] font-semibold text-mist-400 transition-colors hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                    Clear all
                  </button>
                )}
              </div>

              {filteredCars.length > 0 ? (
                <CarGrid cars={filteredCars} className="mt-5 xl:grid-cols-3" />
              ) : (
                <EmptyState
                  className="mt-5"
                  icon={SearchX}
                  title="No cars match these filters."
                  description="Try a different search term or widen your budget. Resetting the filters will bring back the full demonstration fleet."
                  action={
                    <>
                      <Button onClick={clearFilters}>Reset all filters</Button>
                      <Button to="/" variant="secondary">
                        Back to homepage
                      </Button>
                    </>
                  }
                />
              )}

              <p className="mt-8 text-[10.5px] leading-5 text-mist-500">
                Vehicle data, availability and rates are sample content for this
                frontend demonstration. Two vehicles are intentionally marked
                unavailable to show the full booking state.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  )
}
