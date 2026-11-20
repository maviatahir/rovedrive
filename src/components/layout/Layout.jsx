import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

/**
 * Keeps page position predictable:
 * - route changes scroll to the top;
 * - links such as /#about scroll to their target after the route renders.
 */
function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (location.hash) {
      const timer = window.setTimeout(() => {
        const targetId = decodeURIComponent(location.hash.slice(1))
        const target = document.getElementById(targetId)

        if (target) {
          target.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start',
          })
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        }
      }, 0)

      return () => window.clearTimeout(timer)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    return undefined
  }, [location.key, location.pathname, location.hash])

  return null
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-ink-950">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink-950 focus:outline-none"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <ScrollManager />
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
