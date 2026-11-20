import { Link } from 'react-router-dom'
import { ArrowUpRight, Fuel, Settings2, Users } from 'lucide-react'
import AvailabilityBadge from './AvailabilityBadge'
import CarImage from './CarImage'
import { formatCurrency } from '../../utils/format'

export default function CarCard({ car }) {
  return (
    <Link
      to={`/cars/${car.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900 transition duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
    >
      <div className="relative">
        <CarImage
          src={car.image}
          alt=""
          className="aspect-[16/10]"
          imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-ink-950/10"
        />
        <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-ink-950/70 px-2.5 py-1 text-[11px] font-semibold leading-none text-white backdrop-blur-sm">
            {car.category}
          </span>
          <AvailabilityBadge available={car.availability} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mist-500">
              {car.brand}
            </p>
            <h3 className="mt-1.5 truncate font-display text-lg font-bold tracking-[-0.02em] text-white">
              {car.model}
            </h3>
          </div>
          <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-mist-400 transition-colors group-hover:border-accent/30 group-hover:text-accent">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>

        <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11.5px] text-mist-400">
          <li className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-mist-500" aria-hidden="true" />
            {car.seats} seats
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Settings2 className="h-3.5 w-3.5 text-mist-500" aria-hidden="true" />
            {car.transmission}
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Fuel className="h-3.5 w-3.5 text-mist-500" aria-hidden="true" />
            {car.fuelType}
          </li>
        </ul>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/[0.07] pt-5">
          <p className="flex items-baseline gap-1.5">
            <span className="font-display text-xl font-bold tracking-tight text-white">
              {formatCurrency(car.pricePerDay)}
            </span>
            <span className="text-xs text-mist-500">/ day</span>
          </p>
          <span className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-mist-300 transition-colors group-hover:text-accent">
            View car
          </span>
        </div>
      </div>
    </Link>
  )
}
