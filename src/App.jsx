import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import BookingPage from './pages/BookingPage'
import BookingSuccessPage from './pages/BookingSuccessPage'
import CarDetailsPage from './pages/CarDetailsPage'
import FleetPage from './pages/FleetPage'
import HomePage from './pages/HomePage'
import MyBookingsPage from './pages/MyBookingsPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="fleet" element={<FleetPage />} />
        <Route path="cars/:id" element={<CarDetailsPage />} />
        <Route path="booking/:id" element={<BookingPage />} />
        <Route path="booking-success" element={<BookingSuccessPage />} />
        <Route path="my-bookings" element={<MyBookingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
