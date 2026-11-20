import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AlertTriangle } from 'lucide-react'
import Button from './Button'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'

/**
 * Accessible confirmation dialog used before destructive actions.
 * Handles Escape, backdrop clicks, focus trapping and focus restoration.
 */
export default function ConfirmationModal({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  tone = 'danger',
}) {
  const titleId = useId()
  const descriptionId = useId()
  const dialogRef = useRef(null)
  const previousFocusRef = useRef(null)
  const onCancelRef = useRef(onCancel)

  useBodyScrollLock(open)

  useEffect(() => {
    onCancelRef.current = onCancel
  }, [onCancel])

  useEffect(() => {
    if (!open) return undefined

    previousFocusRef.current = document.activeElement
    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.querySelector('[data-autofocus]')?.focus()
    }, 0)

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCancelRef.current?.()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusableElements = dialogRef.current.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )

      if (!focusableElements.length) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus()
      }
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-ink-800 p-6 shadow-2xl shadow-black/50 sm:p-7"
      >
        <div
          className={
            tone === 'danger'
              ? 'mb-5 grid h-12 w-12 place-items-center rounded-xl border border-red-400/20 bg-red-400/10 text-red-300'
              : 'mb-5 grid h-12 w-12 place-items-center rounded-xl border border-accent/20 bg-accent/10 text-accent'
          }
        >
          <AlertTriangle className="h-5 w-5" aria-hidden="true" />
        </div>

        <h2
          id={titleId}
          className="font-display text-xl font-bold tracking-tight text-white"
        >
          {title}
        </h2>
        <div id={descriptionId} className="mt-3 text-sm leading-6 text-mist-400">
          {description}
        </div>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onCancel} data-autofocus>
            {cancelLabel}
          </Button>
          <Button variant={tone === 'danger' ? 'danger' : 'primary'} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
