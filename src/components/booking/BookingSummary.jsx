import { CalendarDays, ShieldCheck } from 'lucide-react'
import CarImage from '../cars/CarImage'
import { formatCurrency, formatDate, pluralize } from '../../utils/format'

export default function BookingSummary({ car, pickupDate, returnDate, rentalDays, total }) {
  const hasDates = rentalDays > 0

  return (
    <section
      aria-label="Booking summary"
      className="overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900"
    >
      <CarImage
        src={car.image}
        alt={`${car.name} — demonstration vehicle photo`}
        className="aspect-[16/9]"
      />

      <div className="p-5 sm:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mist-500">
          {car.category} · {car.type}
        </p>
        <h2 className="mt-1.5 font-display text-xl font-bold tracking-[-0.025em] text-white">
          {car.name}
        </h2>

        <dl className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-white/[0.07] bg-ink-950/50 p-3.5">
          <div>
            <dt className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-mist-500">
              <CalendarDays className="h-3 w-3" aria-hidden="true" />
              Pickup
            </dt>
            <dd className="mt-1.5 text-[12.5px] font-medium text-mist-200">
              {pickupDate ? formatDate(pickupDate) : 'Select a date'}
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-mist-500">
              <CalendarDays className="h-3 w-3" aria-hidden="true" />
              Return
            </dt>
            <dd className="mt-1.5 text-[12.5px] font-medium text-mist-200">
              {returnDate ? formatDate(returnDate) : 'Select a date'}
            </dd>
          </div>
        </dl>

        {hasDates ? (
          <div className="mt-5">
            <div className="flex items-baseline justify-between gap-4 text-[13px] text-mist-400">
              <span>
                {formatCurrency(car.pricePerDay)} × {rentalDays}{' '}
                {pluralize(rentalDays, 'day')}
              </span>
              <span className="tabular-nums text-mist-200">{formatCurrency(total)}</span>
            </div>
            <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-white/[0.08] pt-3.5">
              <span className="text-sm font-semibold text-white">Estimated total</span>
              <span className="font-display text-xl font-bold tracking-tight text-accent tabular-nums">
                {formatCurrency(total)}
              </span>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-mist-500">
              Prices in USD. Demo pricing only — no payment is collected.
            </p>
          </div>
        ) : (
          <p className="mt-5 rounded-xl border border-dashed border-ink-600 bg-ink-950/40 p-3.5 text-[12px] leading-5 text-mist-400">
            Choose your pickup and return dates to see the rental total.
          </p>
        )}

        <p className="mt-4 flex items-start gap-2 border-t border-white/[0.07] pt-4 text-[11px] leading-5 text-mist-500">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
          This is a frontend demonstration. No real reservation is created.
        </p>
      </div>
    </section>
  )
}
