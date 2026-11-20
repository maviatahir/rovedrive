import {
  differenceInCalendarDays,
  isPastDate,
  isValidDateOnly,
} from './dates'

export const bookingFieldIds = {
  fullName: 'booking-fullName',
  email: 'booking-email',
  phone: 'booking-phone',
  pickupDate: 'booking-pickupDate',
  returnDate: 'booking-returnDate',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/
const PHONE_ALLOWED_PATTERN = /^\+?[\d\s().-]+$/
const REFERENCE_CHARACTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export const initialBookingValues = {
  fullName: '',
  email: '',
  phone: '',
  pickupDate: '',
  returnDate: '',
}

export function calculateRentalDays(pickupDate, returnDate) {
  const days = differenceInCalendarDays(pickupDate, returnDate)
  return days !== null && days > 0 ? days : 0
}

export function calculateTotal(pricePerDay, rentalDays) {
  const price = Number(pricePerDay)
  const days = Number(rentalDays)

  if (!Number.isFinite(price) || !Number.isFinite(days) || days < 1) return 0
  return price * days
}

/**
 * Central validation used by both the form and individual field checks.
 * Each message is intentionally short and attached to a single field.
 */
export function validateBooking(values, car) {
  const errors = {}
  const fullName = values.fullName.trim()
  const email = values.email.trim()
  const phone = values.phone.trim()
  const phoneDigits = phone.replace(/\D/g, '')

  if (!fullName) {
    errors.fullName = 'Please enter your full name.'
  } else if (fullName.length < 2) {
    errors.fullName = 'Please enter at least two characters.'
  } else if (fullName.length > 80) {
    errors.fullName = 'Please keep your name under 80 characters.'
  }

  if (!email) {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address, such as name@example.com.'
  }

  if (!phone) {
    errors.phone = 'Please enter your phone number.'
  } else if (!PHONE_ALLOWED_PATTERN.test(phone)) {
    errors.phone = 'Use only numbers, spaces, brackets, dots, dashes or a leading +.'
  } else if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone = 'Phone numbers should contain between 7 and 15 digits.'
  }

  if (!values.pickupDate) {
    errors.pickupDate = 'Please choose a pickup date.'
  } else if (!isValidDateOnly(values.pickupDate)) {
    errors.pickupDate = 'Please choose a valid pickup date.'
  } else if (isPastDate(values.pickupDate)) {
    errors.pickupDate = 'Pickup cannot be in the past.'
  }

  if (!values.returnDate) {
    errors.returnDate = 'Please choose a return date.'
  } else if (!isValidDateOnly(values.returnDate)) {
    errors.returnDate = 'Please choose a valid return date.'
  } else if (
    !errors.pickupDate &&
    (!isValidDateOnly(values.pickupDate) ||
      differenceInCalendarDays(values.pickupDate, values.returnDate) < 1)
  ) {
    errors.returnDate = 'Return must be at least one day after pickup.'
  }

  // The page prevents this earlier, but this final guard protects the submit path.
  if (!car) {
    errors.form = 'The selected vehicle could not be found.'
  } else if (!car.availability) {
    errors.form = 'This vehicle is currently unavailable for booking.'
  }

  return errors
}

export function validateField(fieldName, values, car) {
  const errors = validateBooking(values, car)
  return errors[fieldName] || ''
}

function randomReferenceChunk(length = 6) {
  const characters = []

  for (let index = 0; index < length; index += 1) {
    let randomValue

    if (globalThis.crypto?.getRandomValues) {
      const buffer = new Uint32Array(1)
      globalThis.crypto.getRandomValues(buffer)
      randomValue = buffer[0]
    } else {
      randomValue = Math.floor(Math.random() * REFERENCE_CHARACTERS.length)
    }

    characters.push(REFERENCE_CHARACTERS[randomValue % REFERENCE_CHARACTERS.length])
  }

  return characters.join('')
}

/**
 * Produces a short, human-readable reference such as RD-K7M2QX.
 * Collisions are checked against references already saved in the browser.
 */
export function generateBookingReference(existingReferences = []) {
  let reference = ''
  let attempts = 0

  do {
    reference = `RD-${randomReferenceChunk()}`
    attempts += 1
  } while (existingReferences.includes(reference) && attempts < 25)

  // A timestamp suffix makes an eventual collision practically impossible
  // without making the normal reference less readable.
  if (existingReferences.includes(reference)) {
    reference = `RD-${randomReferenceChunk(4)}${Date.now().toString(36).slice(-3).toUpperCase()}`
  }

  return reference
}

/**
 * Booking records contain a small vehicle snapshot. The inventory always
 * remains the source of truth, but the snapshot keeps a saved booking readable
 * if sample inventory changes in a future version of the demo.
 */
export function createBookingRecord({ values, car, reference }) {
  const pickupDate = values.pickupDate
  const returnDate = values.returnDate
  const rentalDays = calculateRentalDays(pickupDate, returnDate)

  return {
    reference,
    carId: car.id,
    car: {
      id: car.id,
      name: car.name,
      brand: car.brand,
      model: car.model,
      category: car.category,
      type: car.type,
      pricePerDay: car.pricePerDay,
      image: car.image,
    },
    customer: {
      fullName: values.fullName.trim(),
      email: values.email.trim().toLowerCase(),
      phone: values.phone.trim(),
    },
    pickupDate,
    returnDate,
    rentalDays,
    dailyRate: car.pricePerDay,
    total: calculateTotal(car.pricePerDay, rentalDays),
    createdAt: new Date().toISOString(),
  }
}
