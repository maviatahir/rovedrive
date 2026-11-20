import { Compass, Home, MapPinOff } from 'lucide-react'
import Button from '../components/common/Button'
import PageContainer from '../components/common/PageContainer'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFoundPage() {
  useDocumentTitle('Page not found')

  return (
    <PageContainer className="flex min-h-[65vh] flex-col items-center justify-center py-16 text-center sm:py-24">
      <span className="grid h-16 w-16 place-items-center rounded-2xl border border-accent/20 bg-accent/[0.08] text-accent">
        <MapPinOff className="h-7 w-7" aria-hidden="true" />
      </span>

      <p className="mt-6 font-mono text-xs font-semibold tracking-[0.3em] text-accent">
        404
      </p>
      <h1 className="mt-3 max-w-xl font-display text-3xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl">
        This road leads nowhere.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-mist-400">
        The page you were looking for may have moved, or the link might be
        incomplete. Let's get you back to somewhere worth driving.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button to="/">
          <Home className="h-4 w-4" aria-hidden="true" />
          Back to homepage
        </Button>
        <Button to="/fleet" variant="secondary">
          <Compass className="h-4 w-4" aria-hidden="true" />
          Explore the fleet
        </Button>
      </div>
    </PageContainer>
  )
}
