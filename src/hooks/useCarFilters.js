import { useMemo, useState } from 'react'
import { carCategories, carTypes } from '../data/cars'

export const fleetSortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
]

function getPriceBounds(cars) {
  if (!cars.length) return { min: 0, max: 0 }

  const prices = cars.map((car) => car.pricePerDay)
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  }
}

function normalizeFilters(initialFilters, priceBounds) {
  const category = carCategories.includes(initialFilters.category)
    ? initialFilters.category
    : 'all'
  const type = carTypes.includes(initialFilters.type) ? initialFilters.type : 'all'

  const rawMaxPrice = initialFilters.maxPrice
  const requestedMax =
    rawMaxPrice === '' || rawMaxPrice === null || rawMaxPrice === undefined
      ? Number.NaN
      : Number(rawMaxPrice)
  const maxPrice = Number.isFinite(requestedMax)
    ? Math.min(Math.max(requestedMax, priceBounds.min), priceBounds.max)
    : priceBounds.max

  const sort = fleetSortOptions.some((option) => option.value === initialFilters.sort)
    ? initialFilters.sort
    : 'recommended'

  return {
    query: typeof initialFilters.query === 'string' ? initialFilters.query : '',
    category,
    type,
    maxPrice,
    availableOnly: Boolean(initialFilters.availableOnly),
    sort,
  }
}

function matchesFilters(car, filters) {
  const searchTokens = filters.query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)

  const searchableText =
    `${car.brand} ${car.model} ${car.name} ${car.category} ${car.type} ${car.fuelType}`.toLowerCase()

  const matchesSearch = searchTokens.every((token) => searchableText.includes(token))
  const matchesCategory = filters.category === 'all' || car.category === filters.category
  const matchesType = filters.type === 'all' || car.type === filters.type
  const matchesPrice = car.pricePerDay <= filters.maxPrice
  const matchesAvailability = !filters.availableOnly || car.availability

  return (
    matchesSearch &&
    matchesCategory &&
    matchesType &&
    matchesPrice &&
    matchesAvailability
  )
}

/**
 * Owns all fleet-page filtering state and derives the result list.
 * Search, category, body type, price and availability are combined, then the
 * remaining results are sorted.
 */
export function useCarFilters(cars, initialFilters = {}) {
  const priceBounds = useMemo(() => getPriceBounds(cars), [cars])
  const [filters, setFilters] = useState(() =>
    normalizeFilters(
      {
        query: '',
        category: 'all',
        type: 'all',
        availableOnly: false,
        sort: 'recommended',
        ...initialFilters,
      },
      priceBounds,
    ),
  )

  const filteredCars = useMemo(() => {
    const results = cars.filter((car) => matchesFilters(car, filters))

    switch (filters.sort) {
      case 'price-asc':
        return [...results].sort((a, b) => a.pricePerDay - b.pricePerDay)
      case 'price-desc':
        return [...results].sort((a, b) => b.pricePerDay - a.pricePerDay)
      case 'name-asc':
        return [...results].sort((a, b) => a.name.localeCompare(b.name))
      default:
        return results
    }
  }, [cars, filters])

  const activeFilterCount = [
    filters.category !== 'all',
    filters.type !== 'all',
    filters.maxPrice < priceBounds.max,
    filters.availableOnly,
  ].filter(Boolean).length

  const hasActiveFilters = activeFilterCount > 0 || filters.query.trim() !== ''

  function setFilter(key, value) {
    setFilters((previous) => ({ ...previous, [key]: value }))
  }

  function clearFilters() {
    setFilters((previous) => ({
      query: '',
      category: 'all',
      type: 'all',
      maxPrice: priceBounds.max,
      availableOnly: false,
      sort: previous.sort,
    }))
  }

  return {
    filters,
    filteredCars,
    totalCount: cars.length,
    activeFilterCount,
    hasActiveFilters,
    priceBounds,
    categories: carCategories,
    types: carTypes,
    sortOptions: fleetSortOptions,
    setFilter,
    clearFilters,
  }
}
