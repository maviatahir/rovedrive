import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BookingContext } from './bookingContext'
import {
  BOOKING_STORAGE_KEY,
  clearBookingsFromStorage,
  isValidBooking,
  readBookingsFromStorage,
  writeBookingsToStorage,
} from '../utils/storage'

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(readBookingsFromStorage)
  const bookingsRef = useRef(bookings)

  function setBookingState(nextBookings) {
    bookingsRef.current = nextBookings
    setBookings(nextBookings)
  }

  // Keep multiple browser tabs in sync. LocalStorage writes do not fire the
  // `storage` event in the tab that made the change, so local updates are
  // applied directly by addBooking and clearBookings below.
  useEffect(() => {
    function handleStorageChange(event) {
      if (event.key === BOOKING_STORAGE_KEY || event.key === null) {
        setBookingState(readBookingsFromStorage())
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const addBooking = useCallback((booking) => {
    if (!isValidBooking(booking)) {
      throw new Error('The booking data is incomplete.')
    }

    const currentBookings = bookingsRef.current

    if (currentBookings.some((item) => item.reference === booking.reference)) {
      throw new Error('A booking with this reference already exists.')
    }

    const nextBookings = [booking, ...currentBookings]

    // Persist before updating React state. If storage is unavailable, the form
    // can display an error and no false confirmation page is shown.
    writeBookingsToStorage(nextBookings)
    setBookingState(nextBookings)

    return booking
  }, [])

  const clearBookings = useCallback(() => {
    clearBookingsFromStorage()
    setBookingState([])
  }, [])

  const findBookingByReference = useCallback(
    (reference) => {
      if (!reference) return undefined
      return bookings.find((booking) => booking.reference === reference)
    },
    [bookings],
  )

  const value = useMemo(
    () => ({
      bookings,
      addBooking,
      clearBookings,
      findBookingByReference,
    }),
    [bookings, addBooking, clearBookings, findBookingByReference],
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}
