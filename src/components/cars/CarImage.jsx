import { useState } from 'react'
import { CarFront } from 'lucide-react'
import { cn } from '../../utils/cn'

/**
 * Shared vehicle image with a graceful fallback if a local asset ever fails.
 * `className` controls the frame (and therefore the aspect ratio), while
 * `imageClassName` is applied to the image itself for effects such as hover zoom.
 */
export default function CarImage({
  src,
  alt,
  className,
  imageClassName,
  priority = false,
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={cn('relative overflow-hidden bg-ink-800', className)}>
      {failed ? (
        <div
          role="img"
          aria-label={alt}
          className="grid h-full w-full place-items-center bg-gradient-to-br from-ink-800 to-ink-900"
        >
          <CarFront className="h-12 w-12 text-mist-500" aria-hidden="true" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className={cn('h-full w-full object-cover', imageClassName)}
        />
      )}
    </div>
  )
}
