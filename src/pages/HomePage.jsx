import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeDollarSign,
  CalendarCheck2,
  CarFront,
  CheckCircle2,
  ChevronDown,
  Info,
  LockKeyhole,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react'
import Button from '../components/common/Button'
import PageContainer from '../components/common/PageContainer'
import SectionHeading from '../components/common/SectionHeading'
import CarGrid from '../components/cars/CarGrid'
import CarImage from '../components/cars/CarImage'
import { carCategories, cars, fleetPriceRange, getFeaturedCars } from '../data/cars'
import { siteConfig } from '../data/site'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatCurrency } from '../utils/format'

const featuredCars = getFeaturedCars()

const reasons = [
  {
    icon: BadgeDollarSign,
    title: 'Clear daily pricing',
    description:
      'Every vehicle shows its daily rate in USD. What you see in the summary is the total used throughout the demo.',
  },
  {
    icon: CalendarCheck2,
    title: 'Availability at a glance',
    description:
      'Unavailable vehicles are labelled before you book, so you never invest time in a reservation that cannot proceed.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Filters that actually combine',
    description:
      'Search, category, body type, budget and availability work together, with sorting applied to the remaining results.',
  },
  {
    icon: LockKeyhole,
    title: 'No account required',
    description:
      'Bookings are stored in your browser with no fake login flow and no personal data sent to a server.',
  },
  {
    icon: CarFront,
    title: 'The details up front',
    description:
      'Specifications, features and sample rental terms are visible before you commit to anything.',
  },
  {
    icon: ShieldCheck,
    title: 'Demo-safe by design',
    description:
      'No payments, no backend and no real rental agreements. A transparent frontend showcase from start to finish.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Browse and compare',
    description:
      'Explore the full fleet, narrow it down with combined filters, and open any car for specifications and features.',
  },
  {
    number: '02',
    title: 'Choose your dates',
    description:
      'Select a pickup and return date. The booking summary updates live with the rental length and USD total.',
  },
  {
    number: '03',
    title: 'Save your booking',
    description:
      'Confirm the form to create a unique reference and store the record safely in this browser.',
  },
]

const marques = ['BMW', 'Mercedes-Benz', 'Porsche', 'Land Rover', 'Tesla', 'Toyota']

export default function HomePage() {
  useDocumentTitle()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  function handleSearch(event) {
    event.preventDefault()
    const params = new URLSearchParams()

    if (query.trim()) params.set('q', query.trim())
    if (category !== 'all') params.set('category', category)

    const search = params.toString()
    navigate(search ? `/fleet?${search}` : '/fleet')
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-pattern opacity-70" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-1/4 h-[34rem] w-[34rem] rounded-full bg-accent/[0.07] blur-[150px]"
        />

        <PageContainer className="relative py-12 sm:py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.07] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                Premium car rental · Demo experience
              </p>

              <h1 className="mt-6 max-w-2xl font-display text-[2.7rem] font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-[4.25rem]">
                Drive your next <span className="text-accent">adventure.</span>
              </h1>

              <p className="mt-6 max-w-xl text-[15px] leading-7 text-mist-400 sm:text-base">
                A carefully curated fleet, clear daily rates and a booking flow that
                stays out of your way. Choose a car, pick your dates, and keep the
                details in one place.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button to="/fleet" size="lg">
                  Explore the fleet
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button to="/#how-it-works" variant="secondary" size="lg">
                  How it works
                </Button>
              </div>

              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5 text-[11.5px] font-medium text-mist-400">
                <li className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                  No account needed
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                  Instant booking record
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                  Clear daily pricing
                </li>
              </ul>

              <form
                onSubmit={handleSearch}
                aria-label="Find a car"
                className="mt-9 max-w-2xl rounded-2xl border border-white/[0.1] bg-ink-900/85 p-3.5 shadow-float backdrop-blur sm:p-4"
              >
                <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_11rem] lg:grid-cols-[minmax(0,1fr)_11rem_auto]">
                  <div>
                    <label
                      htmlFor="hero-search"
                      className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-mist-500"
                    >
                      Search the fleet
                    </label>
                    <div className="relative">
                      <Search
                        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mist-500"
                        aria-hidden="true"
                      />
                      <input
                        id="hero-search"
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Brand, model or type"
                        autoComplete="off"
                        className="h-11 w-full rounded-xl border border-ink-600 bg-ink-950/70 pl-10 pr-3 text-[13px] text-white placeholder:text-mist-500 focus:border-accent/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="hero-category"
                      className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-mist-500"
                    >
                      Category
                    </label>
                    <div className="relative">
                      <select
                        id="hero-category"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        className="h-11 w-full appearance-none rounded-xl border border-ink-600 bg-ink-950/70 pl-3.5 pr-9 text-[13px] text-white focus:border-accent/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/20"
                      >
                        <option value="all">All categories</option>
                        {carCategories.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist-500"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 lg:col-span-1 lg:self-end">
                    <Button type="submit" size="md" fullWidth className="h-11">
                      Search fleet
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Button>
                  </div>
                </div>

                <p className="mt-3 px-1 text-[10.5px] leading-5 text-mist-500">
                  {cars.length} vehicles across {carCategories.length} categories. No
                  dates required to explore.
                </p>
              </form>
            </div>

            <div className="relative mx-auto w-full max-w-[540px] animate-fade-up [animation-delay:120ms] lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[2rem] border border-white/[0.05]"
              />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-800 shadow-card">
                <CarImage
                  src="/images/hero.jpg"
                  alt="A dark Mercedes-Benz coupe in a moody parking garage — demonstration hero photo"
                  className="aspect-[5/4] sm:aspect-[16/11] lg:aspect-[4/5]"
                  imageClassName="object-center"
                  priority
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25"
                />

                <div className="absolute left-5 top-5">
                  <span className="inline-flex items-center rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[10.5px] font-semibold text-white backdrop-blur-md">
                    From {formatCurrency(fleetPriceRange.min)} / day
                  </span>
                </div>

                <div className="absolute inset-x-5 bottom-5 rounded-xl border border-white/10 bg-ink-950/75 p-4 backdrop-blur-md">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-mist-400">
                        Curated fleet
                      </p>
                      <p className="mt-1 font-display text-[15px] font-bold tracking-tight text-white">
                        {cars.length} vehicles ready to explore
                      </p>
                    </div>
                    <Link
                      to="/fleet"
                      aria-label="Browse the full fleet"
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white transition-colors hover:border-accent/40 hover:bg-accent hover:text-ink-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-center text-[10px] text-mist-500 lg:text-left">
                {siteConfig.tagline} Demonstration imagery only.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      <div className="border-b border-white/[0.06] bg-ink-900/40">
        <PageContainer className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mist-500">
            Marques in the demo fleet
          </p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2 font-display text-[13px] font-bold tracking-tight text-mist-500">
            {marques.map((marque) => (
              <li key={marque}>{marque}</li>
            ))}
          </ul>
        </PageContainer>
      </div>

      <section
        id="about"
        className="scroll-mt-24 border-b border-white/[0.06] py-20 lg:py-28"
      >
        <PageContainer>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="relative order-2 lg:order-1">
              <div className="grid grid-cols-12 gap-4">
                <CarImage
                  src="/images/cars/range-rover-sport.jpg"
                  alt="Range Rover Sport — demonstration vehicle photo"
                  className="col-span-12 aspect-[4/3] rounded-2xl border border-white/[0.08] sm:col-span-8 sm:aspect-[4/5]"
                />
                <CarImage
                  src="/images/cars/porsche-911.jpg"
                  alt="Porsche 911 Carrera — demonstration vehicle photo"
                  className="hidden rounded-2xl border border-white/[0.08] sm:col-span-4 sm:mt-16 sm:block sm:aspect-[3/4]"
                />
              </div>

              <div className="absolute -bottom-5 left-5 rounded-xl border border-white/10 bg-ink-800 px-4 py-3 shadow-float sm:left-8">
                <p className="font-display text-2xl font-bold tracking-tight text-white">
                  {formatCurrency(fleetPriceRange.min)}
                  <span className="ml-1 text-xs font-medium text-mist-400">/ day</span>
                </p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.15em] text-mist-500">
                  Entry daily rate
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <SectionHeading
                eyebrow="About RoveDrive"
                title="Rental, without the runaround."
                description="RoveDrive was designed as a calm, considered alternative to cluttered rental sites — a clear fleet, honest sample pricing and a reservation flow that tells you exactly what happens next."
              />

              <ul className="mt-8 space-y-3.5">
                {[
                  'Clear daily rates in USD, shown upfront on every vehicle.',
                  'Availability visible before you invest time in a booking.',
                  'Booking records saved in this browser — no account, no server.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-mist-300">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button to="/fleet" size="md">
                  Meet the fleet
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Link
                  to="/#how-it-works"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-mist-300 transition-colors hover:text-accent"
                >
                  See how booking works
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>

              <p className="mt-7 flex items-start gap-2 text-[11px] leading-5 text-mist-500">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                RoveDrive is a fictional brand created for this portfolio demonstration.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="border-b border-white/[0.06] py-20 lg:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Featured vehicles"
            title="A car for every kind of escape."
            description="Six favourites from the demo inventory — from an efficient city sedan to a weekend-ready sports car. All specifications and rates are sample content."
            action={
              <Button to="/fleet" variant="secondary">
                View all {cars.length} vehicles
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            }
          />

          <CarGrid cars={featuredCars} className="mt-10 lg:grid-cols-3" />
        </PageContainer>
      </section>

      <section
        id="why-rovedrive"
        className="scroll-mt-24 border-b border-white/[0.06] bg-ink-900/40 py-20 lg:py-24"
      >
        <PageContainer>
          <SectionHeading
            eyebrow="Why RoveDrive"
            title="The details that make the difference."
            description="A demonstration built around the parts of car rental that usually cause friction — unclear prices, hidden availability and unnecessary accounts."
            align="center"
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason) => {
              const Icon = reason.icon

              return (
                <div
                  key={reason.title}
                  className="rounded-2xl border border-white/[0.07] bg-ink-950/40 p-6 transition-colors hover:border-accent/20 hover:bg-ink-900/70"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-accent/20 bg-accent/[0.08] text-accent">
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-base font-bold tracking-tight text-white">
                    {reason.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-6 text-mist-400">
                    {reason.description}
                  </p>
                </div>
              )
            })}
          </div>
        </PageContainer>
      </section>

      <section
        id="how-it-works"
        className="scroll-mt-24 border-b border-white/[0.06] py-20 lg:py-24"
      >
        <PageContainer>
          <SectionHeading
            eyebrow="How it works"
            title="Three steps to the open road."
            description="No payment details, no account creation, no waiting for a confirmation email. Just a clear record you can find again."
            align="center"
          />

          <div className="relative mt-12 grid gap-5 lg:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative rounded-2xl border border-white/[0.08] bg-ink-900 p-6 sm:p-7"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-4xl font-extrabold tracking-tight text-mist-600"
                >
                  {step.number}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[13px] leading-6 text-mist-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-9 flex justify-center">
            <Button to="/fleet" variant="secondary">
              Start browsing
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </PageContainer>
      </section>

      <section className="py-20 lg:py-24">
        <PageContainer>
          <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-ink-900 px-6 py-14 text-center sm:px-12 lg:py-16">
            <div aria-hidden="true" className="absolute inset-0 bg-grid-pattern opacity-50" />
            <div
              aria-hidden="true"
              className="absolute -bottom-28 left-1/2 h-64 w-[32rem] -translate-x-1/2 rounded-full bg-accent/[0.14] blur-[100px]"
            />

            <div className="relative">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">
                The open road is calling
              </p>
              <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-4xl lg:text-[2.8rem]">
                Ready when you are.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-mist-400 sm:text-[15px]">
                Choose a car, set your dates and save a booking in a couple of
                minutes. Your next great drive is closer than you think.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button to="/fleet" size="lg">
                  Explore the fleet
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button to="/my-bookings" variant="secondary" size="lg">
                  View my bookings
                </Button>
              </div>
              <p className="mt-5 text-[10.5px] leading-5 text-mist-500">
                Demonstration experience. No payment is collected and no real
                reservation is created.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  )
}
