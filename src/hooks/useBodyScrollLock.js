import { useEffect } from 'react'

/**
 * Locks page scrolling while a drawer or modal is open and restores the
 * previous inline value on cleanup. Used by the mobile menu and modal.
 */
export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [locked])
}
