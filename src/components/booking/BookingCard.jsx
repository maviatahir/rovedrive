import { Link } from 'react-router-dom'
import {
  BadgeCheck,
  CalendarDays,
  ChevronRight,
  Clock,
  Receipt,
} from 'lucide-react'
import CarImage from '../cars/CarImage'
import { getCarById } from '../../data/cars'
import { formatCurrency, formatDate, formatDateTime, maskEmail, pluralize } from '../../utils/format'

export default function BookingCard({ booking }) {
  const currentCar = getCarById(booking.carId)

  return (
    <article className="overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900">
      <div className="grid md:grid-cols-[210px_minmax(0,1fr)]">
        <CarImage
          src={booking.car.image}
          alt={`${booking.car.name} — demonstration vehicle photo`}
          className="h-44 md:h-full"
        />

        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[11px] font-semibold tracking-[0.12em] text-mist-400">
              {booking.reference}
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-2.5 py-1 text-[10.5px] font-semibold leading-none text-emerald-300">
              <BadgeCheck className="h-3 w-3" aria-hidden="true" />
              Saved locally
            </span>
          </div>

          <div className="mt-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mist-500">
              {booking.car.category} · {booking.car.type}
            </p>
            <h2 className="mt-1 font-display text-lg font-bold tracking-[-0.02em] text-white">
              {currentCar ? (
                <Link
                  to={`/cars/${currentCar.id}`}
                  className="rounded transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {booking.car.name}
                </Link>
              ) : (
                booking.car.name
              )}
            </h2>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-white/[0.07] py-4 sm:grid-cols-4">
            <div>
              <dt className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-mist-500">
                <CalendarDays className="h-3 w-3" aria-hidden="true" />
                Pickup
              </dt>
              <dd className="mt-1 text-[12px] font-medium text-mist-200">
                <time dateTime={booking.pickupDate}>{formatDate(booking.pickupDate)}</time>
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-mist-500">
                <CalendarDays className="h-3 w-3" aria-hidden="true" />
                Return
              </dt>
              <dd className="mt-1 text-[12px] font-medium text-mist-200">
                <time dateTime={booking.returnDate}>{formatDate(booking.returnDate)}</time>
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-mist-500">
                <Clock className="h-3 w-3" aria-hidden="true" />
                Duration
              </dt>
              <dd className="mt-1 text-[12px] font-medium text-mist-200">
                {booking.rentalDays} {pluralize(booking.rentalDays, 'day')}
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-mist-500">
                <Receipt className="h-3 w-3" aria-hidden="true" />
                Total
              </dt>
              <dd className="mt-1 text-[12px] font-semibold text-accent">
                {formatCurrency(booking.total)}
              </dd>
            </div>
          </dl>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11.5px] leading-5 text-mist-500">
              Reserved for{' '}
              <span className="font-medium text-mist-300">{booking.customer.fullName}</span>
              <span className="mx-1.5 text-mist-500" aria-hidden="true">
                ·
              </span>
              {maskEmail(booking.customer.email)}
              <span className="mt-1 block text-[10.5px] text-mist-500">
                Saved {formatDateTime(booking.createdAt)}
              </span>
            </p>

            <div className="flex flex-wrap items-center gap-2">
              {currentCar && (
                <Link
                  to={`/cars/${currentCar.id}`}
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-[11.5px] font-semibold text-mist-300 transition-colors hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  View car
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              )}
              {currentCar?.availability && (
                <Link
                  to={`/booking/${currentCar.id}`}
                  className="inline-flex items-center gap-1 rounded-lg border border-accent/25 bg-accent/[0.08] px-2.5 py-1.5 text-[11.5px] font-semibold text-accent transition-colors hover:bg-accent/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Book again
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
