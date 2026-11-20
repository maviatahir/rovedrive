import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AlertCircle, CheckCircle2, X } from 'lucide-react'
import { cn } from '../../utils/cn'

const toneStyles = {
  success: {
    icon: CheckCircle2,
    iconClass: 'text-emerald-300',
    borderClass: 'border-emerald-400/20',
  },
  error: {
    icon: AlertCircle,
    iconClass: 'text-red-300',
    borderClass: 'border-red-400/25',
  },
}

export default function Toast({ message, onClose, tone = 'success', duration = 4200 }) {
  const onCloseRef = useRef(onClose)
  const { icon: Icon, iconClass, borderClass } = toneStyles[tone] || toneStyles.success

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const timer = window.setTimeout(() => onCloseRef.current?.(), duration)
    return () => window.clearTimeout(timer)
  }, [duration, message])

  return createPortal(
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      aria-live={tone === 'error' ? 'assertive' : 'polite'}
      className={cn(
        'animate-toast-in fixed bottom-5 right-4 z-[130] flex w-[calc(100%-2rem)] max-w-sm items-start gap-3 rounded-xl border bg-ink-800 p-4 shadow-2xl shadow-black/40 sm:right-6',
        borderClass,
      )}
    >
      <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', iconClass)} aria-hidden="true" />
      <p className="flex-1 text-sm leading-6 text-mist-100">{message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss notification"
        className="-mr-1 -mt-1 rounded-md p-1.5 text-mist-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>,
    document.body,
  )
}
