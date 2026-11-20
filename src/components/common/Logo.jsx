import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'

export function LogoMark({ className }) {
  return (
    <img
      src="/logo.svg"
      alt=""
      aria-hidden="true"
      className={cn(
        'h-9 w-9 shrink-0 rounded-[11px] shadow-[0_6px_20px_-8px_rgba(255,107,53,0.8)]',
        className,
      )}
    />
  )
}

export default function Logo({ className, onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="RoveDrive — go to homepage"
      className={cn(
        'inline-flex items-center gap-2.5 rounded-lg transition-opacity hover:opacity-90',
        className,
      )}
    >
      <LogoMark />
      <span className="font-display text-[1.35rem] font-extrabold tracking-[-0.035em] text-white">
        Rove<span>Drive</span>
      </span>
    </Link>
  )
}
