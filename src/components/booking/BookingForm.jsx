import { AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react'
import Button from '../common/Button'
import { bookingFieldIds } from '../../utils/booking'
import { cn } from '../../utils/cn'
import { pluralize } from '../../utils/format'

function Field({
  id,
  label,
  type = 'text',
  value,
  error,
  hint,
  onChange,
  autoComplete,
  placeholder,
  min,
  disabled,
  inputMode,
  className,
}) {
  const hintId = hint ? `${id}-hint` : ''
  const errorId = error ? `${id}-error` : ''
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[12.5px] font-medium text-mist-200">
        {label}
        <span className="ml-0.5 text-accent" aria-hidden="true">
          *
        </span>
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        min={min}
        disabled={disabled}
        required
        inputMode={inputMode}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        className={cn(
          'mt-2 h-11 w-full rounded-xl border bg-ink-950/70 px-3.5 text-sm text-white placeholder:text-mist-500 transition-colors focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60',
          error
            ? 'border-red-400/60 focus-visible:ring-red-400/25'
            : 'border-ink-600 focus:border-accent/60 focus-visible:ring-accent/20',
        )}
      />
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-[11.5px] leading-5 text-mist-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-[11.5px] font-medium leading-5 text-red-300">
          {error}
        </p>
      )}
    </div>
  )
}

export default function BookingForm({
  values,
  errors,
  onChange,
  onSubmit,
  isSubmitting,
  rentalDays,
  pickupMin,
  returnMin,
}) {
  return (
    <form noValidate onSubmit={onSubmit} aria-describedby="booking-form-note">
      <div>
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid h-7 w-7 place-items-center rounded-full border border-accent/25 bg-accent/10 font-mono text-[11px] font-bold text-accent"
          >
            01
          </span>
          <h2 className="font-display text-lg font-bold tracking-tight text-white">
            Driver details
          </h2>
        </div>
        <p className="mt-2 max-w-lg text-[12.5px] leading-6 text-mist-400">
          These details are saved with your booking record in this browser only.
        </p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field
            id={bookingFieldIds.fullName}
            label="Full name"
            value={values.fullName}
            error={errors.fullName}
            onChange={(value) => onChange('fullName', value)}
            autoComplete="name"
            placeholder="Alex Morgan"
            disabled={isSubmitting}
            className="sm:col-span-2"
          />
          <Field
            id={bookingFieldIds.email}
            label="Email address"
            type="email"
            value={values.email}
            error={errors.email}
            onChange={(value) => onChange('email', value)}
            autoComplete="email"
            placeholder="alex@example.com"
            inputMode="email"
            disabled={isSubmitting}
          />
          <Field
            id={bookingFieldIds.phone}
            label="Phone number"
            type="tel"
            value={values.phone}
            error={errors.phone}
            onChange={(value) => onChange('phone', value)}
            autoComplete="tel"
            placeholder="+1 (555) 010-4820"
            inputMode="tel"
            hint="7–15 digits. Spaces and dashes are fine."
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="mt-8 border-t border-white/[0.08] pt-8">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid h-7 w-7 place-items-center rounded-full border border-accent/25 bg-accent/10 font-mono text-[11px] font-bold text-accent"
          >
            02
          </span>
          <h2 className="font-display text-lg font-bold tracking-tight text-white">
            Rental dates
          </h2>
        </div>
        <p className="mt-2 max-w-lg text-[12.5px] leading-6 text-mist-400">
          Pickup can start today. Return must be at least one calendar day later.
        </p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field
            id={bookingFieldIds.pickupDate}
            label="Pickup date"
            type="date"
            value={values.pickupDate}
            error={errors.pickupDate}
            onChange={(value) => onChange('pickupDate', value)}
            min={pickupMin}
            disabled={isSubmitting}
          />
          <Field
            id={bookingFieldIds.returnDate}
            label="Return date"
            type="date"
            value={values.returnDate}
            error={errors.returnDate}
            onChange={(value) => onChange('returnDate', value)}
            min={returnMin}
            disabled={isSubmitting}
          />
        </div>

        <p
          aria-live="polite"
          className="mt-3 flex items-center gap-1.5 text-[11.5px] font-medium text-mist-400"
        >
          {rentalDays > 0 ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              {rentalDays} rental {pluralize(rentalDays, 'day')} selected
            </>
          ) : (
            'Rental length is calculated from your pickup and return dates.'
          )}
        </p>
      </div>

      {errors.form && (
        <div
          id="booking-form-error"
          role="alert"
          tabIndex={-1}
          className="mt-7 flex items-start gap-2.5 rounded-xl border border-red-400/25 bg-red-400/[0.08] p-4 text-[12.5px] leading-6 text-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" aria-hidden="true" />
          <span>{errors.form}</span>
        </div>
      )}

      <div className="mt-7">
        <Button type="submit" size="lg" fullWidth isLoading={isSubmitting}>
          {isSubmitting ? 'Saving booking…' : 'Confirm booking'}
        </Button>
        <p
          id="booking-form-note"
          className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] leading-5 text-mist-500"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
          Demonstration only. No payment is required or collected.
        </p>
      </div>
    </form>
  )
}
