import { parseDateOnly } from './dates'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
})

const numberFormatter = new Intl.NumberFormat('en-US')

export function formatCurrency(amount) {
  const number = Number(amount)
  return Number.isFinite(number) ? currencyFormatter.format(number) : '—'
}

/**
 * Formats a date-only string without the UTC-shift bug that comes from
 * passing "YYYY-MM-DD" directly to `new Date()`.
 */
export function formatDate(dateOnly) {
  const date = parseDateOnly(dateOnly)
  return date ? dateFormatter.format(date) : '—'
}

export function formatDateTime(timestamp) {
  const date = new Date(timestamp)
  return Number.isNaN(date.getTime()) ? '—' : dateTimeFormatter.format(date)
}

export function formatNumber(value) {
  const number = Number(value)
  return Number.isFinite(number) ? numberFormatter.format(number) : '—'
}

export function formatMileage(mileage) {
  return `${formatNumber(mileage)} mi`
}

export function pluralize(count, singular, plural = `${singular}s`) {
  return count === 1 ? singular : plural
}

export function maskEmail(email) {
  if (typeof email !== 'string' || !email.includes('@')) return '—'

  const [localPart, domain] = email.split('@')
  if (!localPart || !domain) return '—'

  const visible = localPart.slice(0, 1)
  return `${visible}${'•'.repeat(Math.max(3, localPart.length - 1))}@${domain}`
}
