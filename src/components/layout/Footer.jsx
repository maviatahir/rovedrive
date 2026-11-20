import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import Logo from '../common/Logo'
import PageContainer from '../common/PageContainer'
import SocialIcon from '../common/SocialIcon'
import { siteConfig } from '../../data/site'

const exploreLinks = [
  { label: 'Home', to: '/' },
  { label: 'Our Fleet', to: '/fleet' },
  { label: 'My Bookings', to: '/my-bookings' },
]

const companyLinks = [
  { label: 'About RoveDrive', to: '/#about' },
  { label: 'Why Choose Us', to: '/#why-rovedrive' },
  { label: 'How It Works', to: '/#how-it-works' },
]

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer
      id="contact"
      className="scroll-mt-24 border-t border-white/[0.07] bg-ink-900"
    >
      <PageContainer className="py-14 lg:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-6 text-mist-400">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {siteConfig.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${social.label} — demo social link, opens in a new tab`}
                  title={`${social.label} (demo link)`}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.025] text-mist-400 transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <SocialIcon
                    name={social.label}
                    className="h-4 w-4"
                  />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Explore" className="lg:col-span-2">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mist-500">
              Explore
            </h2>
            <ul className="mt-4 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="inline-flex items-center gap-1 text-sm text-mist-300 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mist-500">
              Company
            </h2>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="inline-flex items-center gap-1 text-sm text-mist-300 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mist-500">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-3.5 text-sm text-mist-300">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-accent"
                >
                  <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phoneHref}`}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-accent"
                >
                  <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <span>
                  {siteConfig.contact.addressLine1}
                  <br />
                  {siteConfig.contact.addressLine2}
                </span>
              </li>
            </ul>
            <p className="mt-4 text-[11px] leading-5 text-mist-500">
              {siteConfig.contact.note}. Please do not use these details for a real
              booking.
            </p>
            <Link
              to="/fleet"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-[#ff8b60]"
            >
              Browse available cars
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-white/[0.07] pt-6">
          <div className="flex flex-col gap-4 text-[11px] leading-5 text-mist-500 lg:flex-row lg:items-start lg:justify-between">
            <p>
              © {currentYear} RoveDrive. All rights reserved. Built as a frontend
              demonstration project.
            </p>
            <p className="max-w-2xl lg:text-right">{siteConfig.demoNotice}</p>
          </div>
        </div>
      </PageContainer>
    </footer>
  )
}
