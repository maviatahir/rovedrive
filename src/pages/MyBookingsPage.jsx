import { useState } from 'react'
import { CalendarX2, ShieldCheck, Trash2 } from 'lucide-react'
import Button from '../components/common/Button'
import ConfirmationModal from '../components/common/ConfirmationModal'
import EmptyState from '../components/common/EmptyState'
import PageContainer from '../components/common/PageContainer'
import Toast from '../components/common/Toast'
import BookingCard from '../components/booking/BookingCard'
import { useBookings } from '../context/bookingContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { pluralize } from '../utils/format'

export default function MyBookingsPage() {
  useDocumentTitle('My Bookings')
  const { bookings, clearBookings } = useBookings()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [toast, setToast] = useState(null)

  function handleClearHistory() {
    const count = bookings.length

    try {
      clearBookings()
      setConfirmOpen(false)
      setToast({
        message: `${count} ${pluralize(count, 'booking')} removed from this browser.`,
        tone: 'success',
      })
    } catch (error) {
      setConfirmOpen(false)
      setToast({
        message:
          error instanceof Error && error.message
            ? error.message
            : 'The booking history could not be cleared.',
        tone: 'error',
      })
    }
  }

  return (
    <PageContainer className="py-10 lg:py-14">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.23em] text-accent">
            <span aria-hidden="true" className="h-px w-7 bg-accent/80" />
            Saved in this browser
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-4xl lg:text-[2.9rem]">
            My bookings.
          </h1>
          <p className="mt-3 max-w-2xl text-[13px] leading-6 text-mist-400 sm:text-sm">
            Every demonstration reservation saved on this device, newest first.
            No account required — the details live only in this browser.
          </p>
        </div>

        {bookings.length > 0 && (
          <Button
            variant="danger"
            onClick={() => setConfirmOpen(true)}
            className="self-start sm:self-auto"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Clear history
          </Button>
        )}
      </div>

      <div className="mt-7 flex items-start gap-2.5 rounded-xl border border-white/[0.07] bg-ink-900/60 p-4">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
        <p className="text-[11.5px] leading-5 text-mist-400">
          Booking data is stored with LocalStorage and never sent to a server. For
          privacy, email addresses are partially masked in this view. Clearing your
          browser's site data will also remove these records.
        </p>
      </div>

      {bookings.length === 0 ? (
        <EmptyState
          className="mt-8"
          icon={CalendarX2}
          title="No bookings saved yet."
          description="When you complete a demonstration booking, it will appear here with its reference, dates and total."
          action={
            <>
              <Button to="/fleet">Explore the fleet</Button>
              <Button to="/" variant="secondary">
                Go to homepage
              </Button>
            </>
          }
        />
      ) : (
        <>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-2">
            <p aria-live="polite" className="text-[12px] text-mist-400">
              <span className="font-semibold text-white">{bookings.length}</span> saved{' '}
              {pluralize(bookings.length, 'booking')}
            </p>
            <p className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-mist-500">
              Newest first
            </p>
          </div>

          <div className="mt-4 space-y-4">
            {bookings.map((booking) => (
              <BookingCard key={booking.reference} booking={booking} />
            ))}
          </div>
        </>
      )}

      <ConfirmationModal
        open={confirmOpen}
        title="Clear all booking history?"
        description={
          <>
            <p>
              This will remove all {bookings.length} saved{' '}
              {pluralize(bookings.length, 'booking')} from this browser, including
              their references and totals.
            </p>
            <p className="mt-2 font-medium text-mist-300">This cannot be undone.</p>
          </>
        }
        confirmLabel="Clear all bookings"
        cancelLabel="Keep my bookings"
        onConfirm={handleClearHistory}
        onCancel={() => setConfirmOpen(false)}
      />

      {toast && (
        <Toast
          message={toast.message}
          tone={toast.tone}
          onClose={() => setToast(null)}
        />
      )}
    </PageContainer>
  )
}
