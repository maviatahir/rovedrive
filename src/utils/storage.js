import { isValidDateOnly } from './dates'

export const BOOKING_STORAGE_KEY = 'rovedrive.bookings.v1'

function hasStorage() {
  if (typeof window === 'undefined') return false

  try {
    // Accessing localStorage itself can throw in browsers that block storage.
    return Boolean(window.localStorage)
  } catch {
    return false
  }
}

/**
 * Guards against malformed data from older versions, manual edits or a
 * partially written LocalStorage entry. Invalid records are simply ignored.
 */
export function isValidBooking(value) {
  if (!value || typeof value !== 'object') return false

  const hasReference =
    typeof value.reference === 'string' && /^RD-[A-Z0-9]{5,12}$/.test(value.reference)
  const hasCar = Boolean(
    value.car &&
      typeof value.car === 'object' &&
      typeof value.car.name === 'string' &&
      typeof value.car.image === 'string',
  )
  const hasCustomer = Boolean(
    value.customer &&
      typeof value.customer === 'object' &&
      typeof value.customer.fullName === 'string' &&
      typeof value.customer.email === 'string',
  )

  return Boolean(
    hasReference &&
      hasCar &&
      hasCustomer &&
      typeof value.carId === 'string' &&
      isValidDateOnly(value.pickupDate) &&
      isValidDateOnly(value.returnDate) &&
      Number.isFinite(value.total) &&
      value.total > 0 &&
      Number.isFinite(value.rentalDays) &&
      value.rentalDays > 0 &&
      typeof value.createdAt === 'string' &&
      !Number.isNaN(new Date(value.createdAt).getTime()),
  )
}

export function readBookingsFromStorage() {
  if (!hasStorage()) return []

  try {
    const rawValue = window.localStorage.getItem(BOOKING_STORAGE_KEY)
    if (!rawValue) return []

    const parsedValue = JSON.parse(rawValue)
    if (!Array.isArray(parsedValue)) {
      window.localStorage.removeItem(BOOKING_STORAGE_KEY)
      return []
    }

    return parsedValue.filter(isValidBooking)
  } catch {
    // Corrupt data should never prevent the application from loading.
    try {
      window.localStorage.removeItem(BOOKING_STORAGE_KEY)
    } catch {
      // Ignore browsers that also block removal (for example, private mode
      // with storage disabled). The application continues with an empty list.
    }
    return []
  }
}

export function writeBookingsToStorage(bookings) {
  if (!hasStorage()) {
    throw new Error('Browser storage is not available.')
  }

  try {
    window.localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(bookings))
  } catch {
    throw new Error('The booking could not be saved in this browser.')
  }
}

export function clearBookingsFromStorage() {
  if (!hasStorage()) {
    throw new Error('Browser storage is not available.')
  }

  try {
    window.localStorage.removeItem(BOOKING_STORAGE_KEY)
  } catch {
    throw new Error('The booking history could not be cleared in this browser.')
  }
}
