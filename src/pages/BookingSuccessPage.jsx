import { useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  CalendarX2,
  CheckCircle2,
  Info,
  ShieldCheck,
} from 'lucide-react'
import Button from '../components/common/Button'
import EmptyState from '../components/common/EmptyState'
import PageContainer from '../components/common/PageContainer'
import BookingSummary from '../components/booking/BookingSummary'
import { useBookings } from '../context/bookingContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatDate, formatDateTime, maskEmail } from '../utils/format'

export default function BookingSuccessPage() {
  const [searchParams] = useSearchParams()
  const reference = searchParams.get('ref')?.trim() ?? ''
  const { findBookingByReference } = useBookings()
  const booking = findBookingByReference(reference)
  useDocumentTitle(booking ? 'Booking confirmed' : 'Booking not found')

  if (!booking) {
    return (
      <PageContainer className="py-16 sm:py-24">
        <h1 className="sr-only">Booking not found</h1>
        <EmptyState
          icon={CalendarX2}
          title="We couldn't locate that booking."
          description={
            reference
              ? 'This confirmation link does not match a booking saved in this browser. The history may have been cleared, or the link may be incomplete.'
              : 'This page needs a booking reference. Open My Bookings to see any reservations saved in this browser.'
          }
          action={
            <>
              <Button to="/my-bookings">View my bookings</Button>
              <Button to="/fleet" variant="secondary">
                Browse the fleet
              </Button>
            </>
          }
        />
        <p className="mx-auto mt-6 max-w-lg text-center text-[11px] leading-5 text-mist-500">
          Bookings are stored only in this browser. Clearing site data or browser
          storage removes them permanently.
        </p>
      </PageContainer>
    )
  }

  return (
    <PageContainer className="py-12 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <section className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-ink-900 px-6 py-10 text-center sm:px-10 lg:py-12">
          <div aria-hidden="true" className="absolute inset-0 bg-grid-pattern opacity-50" />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 left-1/2 h-56 w-[30rem] -translate-x-1/2 rounded-full bg-emerald-400/[0.09] blur-[100px]"
          />

          <div className="relative">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
              <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
            </span>
            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-300">
              Booking confirmed
            </p>
            <h1 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-4xl">
              You're all set for the road.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[13.5px] leading-7 text-mist-400 sm:text-sm">
              Your demonstration reservation has been saved in this browser. Keep
              the reference below to find it again in My Bookings.
            </p>

            <div className="mx-auto mt-7 max-w-sm rounded-2xl border border-white/[0.1] bg-ink-950/70 px-5 py-4 backdrop-blur-sm">
              <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-mist-500">
                Booking reference
              </p>
              <p className="mt-1.5 font-mono text-2xl font-bold tracking-[0.12em] text-white">
                {booking.reference}
              </p>
            </div>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button to="/my-bookings" size="lg">
                View my bookings
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button to="/fleet" variant="secondary" size="lg">
                Browse the fleet
              </Button>
            </div>
            <p className="mt-5 flex items-center justify-center gap-1.5 text-[10.5px] text-mist-500">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              Demo only — no payment was collected and no real booking exists.
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <section className="rounded-2xl border border-white/[0.08] bg-ink-900 p-5 sm:p-6">
            <h2 className="font-display text-lg font-bold tracking-tight text-white">
              Reservation details
            </h2>
            <p className="mt-1.5 text-[11.5px] leading-5 text-mist-500">
              A snapshot of the details saved with this booking.
            </p>

            <dl className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              <div>
                <dt className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-mist-500">
                  Driver
                </dt>
                <dd className="mt-1 text-[13px] font-medium text-mist-200">
                  {booking.customer.fullName}
                </dd>
              </div>
              <div>
                <dt className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-mist-500">
                  Email
                </dt>
                <dd className="mt-1 text-[13px] font-medium text-mist-200">
                  {maskEmail(booking.customer.email)}
                </dd>
              </div>
              <div>
                <dt className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-mist-500">
                  Vehicle
                </dt>
                <dd className="mt-1 text-[13px] font-medium text-mist-200">
                  {booking.car.name}
                </dd>
              </div>
              <div>
                <dt className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-mist-500">
                  Category
                </dt>
                <dd className="mt-1 text-[13px] font-medium text-mist-200">
                  {booking.car.category} · {booking.car.type}
                </dd>
              </div>
              <div>
                <dt className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-mist-500">
                  Pickup
                </dt>
                <dd className="mt-1 text-[13px] font-medium text-mist-200">
                  <time dateTime={booking.pickupDate}>{formatDate(booking.pickupDate)}</time>
                </dd>
              </div>
              <div>
                <dt className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-mist-500">
                  Return
                </dt>
                <dd className="mt-1 text-[13px] font-medium text-mist-200">
                  <time dateTime={booking.returnDate}>{formatDate(booking.returnDate)}</time>
                </dd>
              </div>
            </dl>

            <p className="mt-5 border-t border-white/[0.07] pt-4 text-[11px] leading-5 text-mist-500">
              Saved in this browser on {formatDateTime(booking.createdAt)}. Personal
              details are partially masked after saving.
            </p>

            <div className="mt-5 flex items-start gap-2 rounded-xl border border-white/[0.07] bg-ink-950/40 p-4 text-[11.5px] leading-5 text-mist-400">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mist-500" aria-hidden="true" />
              <span>
                Clearing this site's browser data will remove the booking history.
                No confirmation email is sent in this demonstration.
              </span>
            </div>
          </section>

          <BookingSummary
            car={booking.car}
            pickupDate={booking.pickupDate}
            returnDate={booking.returnDate}
            rentalDays={booking.rentalDays}
            total={booking.total}
          />
        </div>
      </div>
    </PageContainer>
  )
}
