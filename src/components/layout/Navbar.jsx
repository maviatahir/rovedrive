import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import Logo from '../common/Logo'
import Button from '../common/Button'
import PageContainer from '../common/PageContainer'
import { useBookings } from '../../context/bookingContext'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import { cn } from '../../utils/cn'

const navLinks = [
  { label: 'Home', to: '/', activeKey: 'home' },
  { label: 'Our Fleet', to: '/fleet', activeKey: 'fleet' },
  { label: 'About', to: '/#about', activeKey: 'about' },
  { label: 'Contact', to: '/#contact', activeKey: 'contact' },
  { label: 'My Bookings', to: '/my-bookings', activeKey: 'bookings' },
]

export default function Navbar() {
  const [mobileOpenLocationKey, setMobileOpenLocationKey] = useState(null)
  const { bookings } = useBookings()
  const location = useLocation()
  const menuButtonRef = useRef(null)
  const mobileOpen = mobileOpenLocationKey === location.key

  useBodyScrollLock(mobileOpen)

  useEffect(() => {
    if (!mobileOpen) return undefined

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setMobileOpenLocationKey(null)
        menuButtonRef.current?.focus()
      }
    }

    const desktopQuery = window.matchMedia('(min-width: 1024px)')
    function handleViewportChange(event) {
      if (event.matches) setMobileOpenLocationKey(null)
    }

    document.addEventListener('keydown', handleEscape)
    desktopQuery.addEventListener('change', handleViewportChange)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      desktopQuery.removeEventListener('change', handleViewportChange)
    }
  }, [mobileOpen])

  function isActive(activeKey) {
    if (activeKey === 'home') {
      return (
        location.pathname === '/' &&
        location.hash !== '#about' &&
        location.hash !== '#contact'
      )
    }

    if (activeKey === 'fleet') {
      return (
        location.pathname === '/fleet' ||
        location.pathname.startsWith('/cars/') ||
        location.pathname.startsWith('/booking/')
      )
    }

    if (activeKey === 'about' || activeKey === 'contact') {
      return location.pathname === '/' && location.hash === `#${activeKey}`
    }

    if (activeKey === 'bookings') {
      return location.pathname === '/my-bookings'
    }

    return false
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-ink-950/95 backdrop-blur-md">
      <PageContainer>
        <div className="flex h-[4.5rem] items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => {
                const active = isActive(link.activeKey)
                const isBookingsLink = link.activeKey === 'bookings'

                return (
                  <li key={link.activeKey}>
                    <Link
                      to={link.to}
                      aria-current={
                        active
                          ? link.activeKey === 'about' || link.activeKey === 'contact'
                            ? 'location'
                            : 'page'
                          : undefined
                      }
                      className={cn(
                        'group relative inline-flex items-center gap-1.5 rounded-md py-2 text-[13px] font-medium tracking-wide transition-colors',
                        active ? 'text-white' : 'text-mist-400 hover:text-white',
                      )}
                    >
                      {link.label}
                      {isBookingsLink && bookings.length > 0 && (
                        <span
                          aria-hidden="true"
                          className={cn(
                            'grid h-[18px] min-w-[18px] place-items-center rounded-full px-1 text-[10px] font-bold leading-none',
                            active
                              ? 'bg-accent text-ink-950'
                              : 'bg-white/[0.08] text-mist-300',
                          )}
                        >
                          {bookings.length}
                        </span>
                      )}
                      {isBookingsLink && bookings.length > 0 && (
                        <span className="sr-only">, {bookings.length} saved</span>
                      )}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-x-0 -bottom-0.5 h-px bg-accent transition-opacity',
                          active ? 'opacity-100' : 'opacity-0 group-hover:opacity-30',
                        )}
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button to="/fleet" size="sm">
              Explore Cars
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() =>
              setMobileOpenLocationKey((openLocationKey) =>
                openLocationKey === location.key ? null : location.key,
              )
            }
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Close main menu' : 'Open main menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] text-mist-100 transition-colors hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </PageContainer>

      {mobileOpen && (
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Close main menu"
            tabIndex={-1}
            className="fixed inset-x-0 bottom-0 top-[4.5rem] cursor-default bg-black/55"
            onClick={() => setMobileOpenLocationKey(null)}
          />
          <div
            id="mobile-navigation"
            className="animate-panel-in absolute inset-x-0 top-full max-h-[calc(100svh-4.5rem)] overflow-y-auto border-t border-white/[0.07] bg-ink-950 px-5 pb-8 pt-3 shadow-2xl shadow-black/40 sm:px-8"
          >
            <nav aria-label="Mobile primary">
              <ul className="divide-y divide-white/[0.06]">
                {navLinks.map((link) => {
                  const active = isActive(link.activeKey)

                  return (
                    <li key={link.activeKey}>
                      <Link
                        to={link.to}
                        aria-current={
                          active
                            ? link.activeKey === 'about' || link.activeKey === 'contact'
                              ? 'location'
                              : 'page'
                            : undefined
                        }
                        onClick={() => setMobileOpenLocationKey(null)}
                        className={cn(
                          'flex items-center justify-between gap-4 py-4 text-[15px] font-medium transition-colors',
                          active ? 'text-accent' : 'text-mist-200 hover:text-white',
                        )}
                      >
                        <span className="flex items-center gap-3">
                          {link.label}
                          {link.activeKey === 'bookings' && bookings.length > 0 && (
                            <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-ink-950">
                              {bookings.length}
                            </span>
                          )}
                        </span>
                        <ArrowUpRight
                          className="h-4 w-4 text-mist-500"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <Button
              to="/fleet"
              fullWidth
              className="mt-6"
              onClick={() => setMobileOpenLocationKey(null)}
            >
              Explore Cars
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Button>

            <p className="mt-5 text-center text-[11px] leading-5 text-mist-500">
              RoveDrive is a demonstration experience. No real reservations are
              created.
            </p>
          </div>
        </div>
      )}
    </header>
  )
}
