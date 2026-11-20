import { createContext, useContext } from 'react'

export const BookingContext = createContext(null)

export function useBookings() {
  const context = useContext(BookingContext)

  if (!context) {
    throw new Error('useBookings must be used inside a BookingProvider.')
  }

  return context
}
