/**
 * Date-only helpers.
 *
 * `<input type="date">` works with "YYYY-MM-DD" strings. Parsing those with
 * `new Date("YYYY-MM-DD")` treats them as UTC, which can shift the day in some
 * timezones. These helpers deliberately build and compare local dates.
 */

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000

export function parseDateOnly(value) {
  if (typeof value !== 'string' || !DATE_PATTERN.test(value)) return null

  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  // Reject impossible calendar dates such as 2026-02-31.
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null
  }

  return date
}

export function toDateOnlyString(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return ''

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function getTodayISO() {
  return toDateOnlyString(new Date())
}

export function addDays(dateOnly, amount) {
  const date = parseDateOnly(dateOnly)
  if (!date || !Number.isFinite(amount)) return ''

  date.setDate(date.getDate() + Number(amount))
  return toDateOnlyString(date)
}

/**
 * Returns the number of whole calendar days between two date-only strings.
 * Uses UTC timestamps internally so daylight-saving changes cannot skew the
 * result by a fraction of a day.
 */
export function differenceInCalendarDays(startDateOnly, endDateOnly) {
  const start = parseDateOnly(startDateOnly)
  const end = parseDateOnly(endDateOnly)

  if (!start || !end) return null

  const startUTC = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())
  const endUTC = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate())

  return Math.round((endUTC - startUTC) / MILLISECONDS_PER_DAY)
}

export function isValidDateOnly(value) {
  return parseDateOnly(value) !== null
}

export function isPastDate(dateOnly) {
  const difference = differenceInCalendarDays(getTodayISO(), dateOnly)
  return difference !== null && difference < 0
}

export function getMinimumReturnDate(pickupDate) {
  return pickupDate ? addDays(pickupDate, 1) : ''
}
