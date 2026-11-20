import { useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarX2, CarFront, Info } from 'lucide-react'
import Button from '../components/common/Button'
import EmptyState from '../components/common/EmptyState'
import PageContainer from '../components/common/PageContainer'
import AvailabilityBadge from '../components/cars/AvailabilityBadge'
import BookingForm from '../components/booking/BookingForm'
import BookingSummary from '../components/booking/BookingSummary'
import { useBookings } from '../context/bookingContext'
import { getCarById } from '../data/cars'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import {
  calculateRentalDays,
  calculateTotal,
  createBookingRecord,
  generateBookingReference,
  initialBookingValues,
  validateBooking,
  bookingFieldIds,
} from '../utils/booking'
import {
  addDays,
  differenceInCalendarDays,
  getMinimumReturnDate,
  getTodayISO,
} from '../utils/dates'

export default function BookingPage() {
  const { id } = useParams()
  const car = getCarById(id)
  const navigate = useNavigate()
  const { bookings, addBooking } = useBookings()
  useDocumentTitle(
    car
      ? car.availability
        ? `Book the ${car.name}`
        : 'Booking unavailable'
      : 'Book a car',
  )

  const [values, setValues] = useState(initialBookingValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submitLock = useRef(false)

  const pickupMin = getTodayISO()
  const returnMin = getMinimumReturnDate(values.pickupDate) || addDays(pickupMin, 1)
  const rentalDays = calculateRentalDays(values.pickupDate, values.returnDate)
  const total = calculateTotal(car?.pricePerDay, rentalDays)

  function focusFirstError(nextErrors) {
    window.setTimeout(() => {
      const firstField = Object.keys(bookingFieldIds).find((field) => nextErrors[field])
      const targetId = firstField
        ? bookingFieldIds[firstField]
        : nextErrors.form
          ? 'booking-form-error'
          : null

      if (targetId) document.getElementById(targetId)?.focus()
    }, 0)
  }

  function handleChange(field, value) {
    setValues((previous) => {
      const nextValues = { ...previous, [field]: value }

      // Clear an existing return date if a new pickup date makes it invalid.
      if (field === 'pickupDate' && nextValues.returnDate) {
        const days = differenceInCalendarDays(value, nextValues.returnDate)
        if (days === null || days < 1) nextValues.returnDate = ''
      }

      return nextValues
    })

    setErrors((previous) => {
      if (!previous[field] && !previous.form && !previous.returnDate) return previous

      const nextErrors = { ...previous }
      delete nextErrors[field]
      delete nextErrors.form

      // A pickup change can invalidate or validate the return date, so its
      // stale message should not linger.
      if (field === 'pickupDate') delete nextErrors.returnDate

      return nextErrors
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (submitLock.current) return

    const nextErrors = validateBooking(values, car)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      focusFirstError(nextErrors)
      return
    }

    const normalizedEmail = values.email.trim().toLowerCase()
    const duplicate = bookings.some(
      (booking) =>
        booking.carId === car.id &&
        booking.customer.email === normalizedEmail &&
        booking.pickupDate === values.pickupDate &&
        booking.returnDate === values.returnDate,
    )

    if (duplicate) {
      const duplicateErrors = {
        form: 'A booking with this vehicle, these dates and this email already exists. Open My Bookings to review it.',
      }
      setErrors(duplicateErrors)
      focusFirstError(duplicateErrors)
      return
    }

    submitLock.current = true
    setIsSubmitting(true)

    try {
      const reference = generateBookingReference(
        bookings.map((booking) => booking.reference),
      )
      const record = createBookingRecord({ values, car, reference })

      addBooking(record)
      navigate(`/booking-success?ref=${encodeURIComponent(reference)}`, {
        replace: true,
      })
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Your booking could not be saved. Please try again.'

      const storageErrors = { form: message }
      setErrors(storageErrors)
      focusFirstError(storageErrors)
      submitLock.current = false
      setIsSubmitting(false)
    }
  }

  if (!car) {
    return (
      <PageContainer className="py-16 sm:py-24">
        <h1 className="sr-only">Car not found</h1>
        <EmptyState
          icon={CarFront}
          title="We couldn't find that car."
          description="The booking link may be out of date or the vehicle may have left the demonstration inventory. Choose a car from the fleet to continue."
          action={
            <>
              <Button to="/fleet">Browse the fleet</Button>
              <Button to="/" variant="secondary">
                Go to homepage
              </Button>
            </>
          }
        />
      </PageContainer>
    )
  }

  if (!car.availability) {
    return (
      <PageContainer className="py-16 sm:py-24">
        <h1 className="sr-only">Booking unavailable</h1>
        <EmptyState
          icon={CalendarX2}
          title={`The ${car.name} isn't available right now.`}
          description="This vehicle is intentionally marked unavailable in the demo. You can still review its details or choose another car from the fleet."
          action={
            <>
              <Button to={`/cars/${car.id}`}>View car details</Button>
              <Button to="/fleet" variant="secondary">
                Browse available cars
              </Button>
            </>
          }
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer className="py-8 lg:py-12">
      <Link
        to={`/cars/${car.id}`}
        className="inline-flex items-center gap-1.5 rounded-lg py-1 text-[11.5px] font-semibold text-mist-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Back to {car.name}
      </Link>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.23em] text-accent">
            <span aria-hidden="true" className="h-px w-7 bg-accent/80" />
            Reservation · Demo only
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-4xl">
            Book the {car.name}
          </h1>
          <p className="mt-3 max-w-2xl text-[13px] leading-6 text-mist-400 sm:text-sm">
            Add your details and rental dates. The summary on the right updates
            live with your USD total before you confirm.
          </p>
        </div>
        <div className="shrink-0">
          <AvailabilityBadge available detailed />
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        <div className="rounded-2xl border border-white/[0.08] bg-ink-900 p-5 sm:p-7 lg:p-8">
          <BookingForm
            values={values}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            rentalDays={rentalDays}
            pickupMin={pickupMin}
            returnMin={returnMin}
          />
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <BookingSummary
            car={car}
            pickupDate={values.pickupDate}
            returnDate={values.returnDate}
            rentalDays={rentalDays}
            total={total}
          />

          <div className="rounded-xl border border-white/[0.07] bg-ink-900/60 p-4">
            <p className="flex items-start gap-2 text-[11px] leading-5 text-mist-400">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mist-500" aria-hidden="true" />
              Rates and availability are sample data. Your booking record is stored
              only in this browser and can be cleared from My Bookings.
            </p>
          </div>
        </aside>
      </div>
    </PageContainer>
  )
}
