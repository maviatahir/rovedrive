import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CarFront,
  Check,
  ChevronRight,
  Fuel,
  Gauge,
  Info,
  MapPin,
  Settings2,
  ShieldCheck,
  Users,
} from 'lucide-react'
import Button from '../components/common/Button'
import EmptyState from '../components/common/EmptyState'
import PageContainer from '../components/common/PageContainer'
import SectionHeading from '../components/common/SectionHeading'
import AvailabilityBadge from '../components/cars/AvailabilityBadge'
import CarGrid from '../components/cars/CarGrid'
import CarImage from '../components/cars/CarImage'
import { getCarById, getRelatedCars } from '../data/cars'
import { siteConfig } from '../data/site'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatCurrency, formatMileage } from '../utils/format'

const includedItems = [
  'Standard protection cover (sample)',
  '24/7 roadside assistance (sample)',
  'Additional driver included (sample)',
  'Free cancellation up to 48 hours before pickup (sample)',
]

const goodToKnowItems = [
  'Drivers must be at least 25 with a valid licence (sample policy).',
  'Pickup and return at the fictional Miami demo location.',
  'Return the vehicle with the same fuel or charge level.',
  'No payment is collected and no real rental agreement is created.',
]

export default function CarDetailsPage() {
  const { id } = useParams()
  const car = getCarById(id)
  useDocumentTitle(car ? car.name : 'Car not found')

  if (!car) {
    return (
      <PageContainer className="py-16 sm:py-24">
        <h1 className="sr-only">Car not found</h1>
        <EmptyState
          icon={CarFront}
          title="We couldn't find that car."
          description="The link may be out of date, or the vehicle may have left the demonstration inventory. Head back to the fleet to see every car currently listed."
          action={
            <>
              <Button to="/fleet">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to the fleet
              </Button>
              <Button to="/" variant="secondary">
                Go to homepage
              </Button>
            </>
          }
        />
      </PageContainer>
    )
  }

  const relatedCars = getRelatedCars(car, 3)

  const specs = [
    { icon: Users, label: 'Seats', value: `${car.seats} seats` },
    { icon: Settings2, label: 'Transmission', value: car.transmission },
    { icon: Fuel, label: 'Fuel type', value: car.fuelType },
    { icon: CalendarDays, label: 'Model year', value: car.year },
    { icon: Gauge, label: 'Odometer', value: formatMileage(car.mileage) },
    { icon: CarFront, label: 'Body type', value: car.type },
  ]

  return (
    <PageContainer className="py-8 lg:py-12">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-[11.5px] text-mist-500">
          <li>
            <Link
              to="/"
              className="rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3 w-3" />
          </li>
          <li>
            <Link
              to="/fleet"
              className="rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Fleet
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3 w-3" />
          </li>
          <li aria-current="page" className="font-medium text-mist-300">
            {car.name}
          </li>
        </ol>
      </nav>

      <header className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[10.5px] font-semibold leading-none text-mist-300">
              {car.category}
            </span>
            <span className="text-[11px] font-medium text-mist-500">
              {car.type} · {car.year}
            </span>
            <AvailabilityBadge available={car.availability} detailed />
          </div>

          <h1 className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-4xl lg:text-[2.9rem]">
            {car.name}
          </h1>
          <p className="mt-2.5 max-w-2xl text-[13px] leading-6 text-mist-400 sm:text-sm">
            {car.brand} {car.model} · {car.transmission} · {car.fuelType}
          </p>
        </div>

        <div className="flex items-end justify-between gap-5 sm:flex-col sm:items-end sm:gap-3">
          <p className="flex items-baseline gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-mist-500">
              From
            </span>
            <span className="font-display text-2xl font-bold tracking-tight text-white">
              {formatCurrency(car.pricePerDay)}
            </span>
            <span className="text-xs text-mist-500">/ day</span>
          </p>

          <Button
            to={car.availability ? `/booking/${car.id}` : '/fleet'}
            size="sm"
            variant={car.availability ? 'primary' : 'secondary'}
            className="lg:hidden"
          >
            {car.availability ? 'Book this car' : 'Find an available car'}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        </div>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div className="min-w-0 space-y-10">
          <CarImage
            src={car.image}
            alt={`${car.name} — demonstration vehicle photo`}
            className="aspect-[16/10] rounded-2xl border border-white/[0.08]"
            priority
          />

          <section aria-labelledby="overview-heading">
            <h2
              id="overview-heading"
              className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl"
            >
              Overview
            </h2>
            <p className="mt-3.5 max-w-3xl text-[13.5px] leading-7 text-mist-400 sm:text-sm">
              {car.description}
            </p>
          </section>

          <section aria-labelledby="specs-heading">
            <h2
              id="specs-heading"
              className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl"
            >
              Specifications
            </h2>
            <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {specs.map((spec) => {
                const Icon = spec.icon

                return (
                  <div
                    key={spec.label}
                    className="rounded-xl border border-white/[0.07] bg-ink-900 p-4"
                  >
                    <dt className="flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-mist-500">
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {spec.label}
                    </dt>
                    <dd className="mt-1.5 text-[13px] font-semibold text-white">
                      {spec.value}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </section>

          <section aria-labelledby="features-heading">
            <h2
              id="features-heading"
              className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl"
            >
              Features & equipment
            </h2>
            <p className="mt-2 text-[12.5px] leading-6 text-mist-500">
              Sample equipment list for this demonstration vehicle.
            </p>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {car.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 rounded-lg border border-white/[0.06] bg-ink-900/60 px-3.5 py-3 text-[12.5px] leading-5 text-mist-300"
                >
                  <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                    <Check className="h-2.5 w-2.5" aria-hidden="true" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="rental-info-heading"
            className="rounded-2xl border border-white/[0.08] bg-ink-900 p-5 sm:p-6"
          >
            <h2
              id="rental-info-heading"
              className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-white sm:text-2xl"
            >
              <ShieldCheck className="h-5 w-5 text-accent" aria-hidden="true" />
              Rental information
            </h2>
            <p className="mt-2 text-[12.5px] leading-6 text-mist-500">
              Sample terms for this frontend demonstration. No real rental
              agreement is created.
            </p>

            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mist-500">
                  Included in this demo
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {includedItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[12px] leading-5 text-mist-300"
                    >
                      <Check
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mist-500">
                  Good to know
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {goodToKnowItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[12px] leading-5 text-mist-300"
                    >
                      <Info
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mist-500"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900">
            <div className="border-b border-white/[0.07] p-5 sm:p-6">
              <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-mist-500">
                Sample daily rate
              </p>
              <p className="mt-2 flex items-baseline gap-1.5">
                <span className="font-display text-3xl font-bold tracking-tight text-white">
                  {formatCurrency(car.pricePerDay)}
                </span>
                <span className="text-xs text-mist-500">/ day</span>
              </p>
              <div className="mt-3">
                <AvailabilityBadge available={car.availability} detailed />
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <ul className="space-y-2.5">
                {[
                  'Live USD total before confirming',
                  'No account or sign-up required',
                  'Saved locally for later reference',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[12px] leading-5 text-mist-300"
                  >
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {car.availability ? (
                <Button to={`/booking/${car.id}`} size="lg" fullWidth className="mt-5">
                  Book this car
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              ) : (
                <>
                  <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] p-3.5 text-[12px] leading-5 text-amber-200">
                    This vehicle is currently unavailable for booking. Explore the
                    rest of the fleet for a similar option.
                  </div>
                  <Button to="/fleet" variant="secondary" size="lg" fullWidth className="mt-3">
                    Browse available cars
                  </Button>
                </>
              )}

              <p className="mt-3 text-center text-[10.5px] leading-5 text-mist-500">
                Demonstration only. No payment is collected.
              </p>
            </div>

            <div className="border-t border-white/[0.07] bg-ink-950/40 p-5 text-[11.5px] leading-5 text-mist-400 sm:p-6">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  Pickup at {siteConfig.contact.addressLine1},{' '}
                  {siteConfig.contact.addressLine2}
                  <span className="mt-1 block text-[10px] text-mist-500">
                    Fictional demo location
                  </span>
                </span>
              </p>
              <p className="mt-3 flex items-start gap-2">
                <CalendarDays className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                Choose your pickup and return dates during booking.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <section className="mt-16 border-t border-white/[0.07] pt-12 lg:mt-20">
        <SectionHeading
          eyebrow="Keep exploring"
          title="You might also like."
          description="Alternatives from the demo fleet, prioritising the same body type and category."
          action={
            <Button to="/fleet" variant="secondary">
              View all cars
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          }
        />
        <CarGrid cars={relatedCars} className="mt-8 lg:grid-cols-3" />
      </section>
    </PageContainer>
  )
}
