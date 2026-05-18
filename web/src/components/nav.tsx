'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { HCSLogoMark } from '@/components/hcs-logo'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE_OUT_EXPO, MOTION_DURATIONS } from '@/lib/motion'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/work-for-us', label: 'Work For Us' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      closeButtonRef.current?.focus()
    } else {
      document.body.style.overflow = ''
      openButtonRef.current?.focus()
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
          scrolled
            ? 'border-b border-rule-light/80 bg-cream/94 backdrop-blur-md shadow-[0_8px_28px_-22px_oklch(13%_0.06_24)]'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-10 h-14 lg:h-16 flex items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-2.5 min-w-0">
            <HCSLogoMark className={cn('h-[28px] w-[28px] lg:h-[30px] lg:w-[30px] flex-shrink-0 transition-colors duration-200', scrolled ? 'text-brand' : 'text-ink-light')} />
            <span
              className={cn('font-display text-[14px] sm:text-[15px] lg:text-[16px] font-semibold leading-none tracking-[-0.01em] truncate transition-colors duration-200', scrolled ? 'text-ink-dark' : 'text-ink-light')}
              style={{ fontVariationSettings: '"opsz" 14, "wght" 600' }}
            >
              Horizon Care Services
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7" aria-label="Main">
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname === link.href || pathname.startsWith(`${link.href}/`)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn('text-[13px] font-medium transition-colors tracking-[0.04em]', scrolled ? 'text-ink-muted-dark hover:text-ink-dark' : 'text-ink-muted-light hover:text-ink-light')}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <button
            ref={openButtonRef}
            onClick={() => setMobileOpen(true)}
            className={cn('md:hidden p-2.5 -mr-1.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/50 rounded', scrolled ? 'text-ink-dark' : 'text-ink-light')}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.42, ease: [0.25, 1, 0.5, 1] } }}
            exit={{ opacity: 0, transition: { duration: 0.12, ease: 'easeIn' } }}
            className="fixed inset-0 z-[60] bg-deep flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-5 h-14 border-b border-rule-dark flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <HCSLogoMark className="h-[26px] w-[26px] flex-shrink-0 text-ink-light" />
                <span
                  className="font-display text-ink-light text-[15px] font-semibold"
                  style={{ fontVariationSettings: '"opsz" 14, "wght" 600' }}
                >
                  Horizon Care Services
                </span>
              </div>
              <button
                ref={closeButtonRef}
                onClick={() => setMobileOpen(false)}
                className="text-ink-light p-1.5 -mr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/50 rounded"
                aria-label="Close navigation menu"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col flex-1 overflow-y-auto" aria-label="Mobile">
              {navLinks.map((link, i) => {
                const isActive = link.href === '/' ? pathname === '/' : pathname === link.href || pathname.startsWith(`${link.href}/`)
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: MOTION_DURATIONS.medium, ease: EASE_OUT_EXPO }}
                    className="border-b border-rule-dark"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'flex items-center justify-between px-6 py-5 transition-colors',
                        isActive ? 'text-amber' : 'text-ink-light hover:text-amber',
                      )}
                    >
                      <div className="flex items-baseline gap-3.5">
                        <span className="font-mono text-[10px] text-ink-muted-light/40 tracking-widest w-5 flex-shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span
                          className="font-display leading-none tracking-[-0.02em]"
                          style={{
                            fontSize: 'clamp(1.35rem, 4vw, 1.55rem)',
                            fontVariationSettings: '"opsz" 24, "wght" 560',
                          }}
                        >
                          {link.label}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={15}
                        aria-hidden="true"
                        className={cn('flex-shrink-0 transition-colors', isActive ? 'text-amber' : 'text-ink-muted-light/30')}
                      />
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            {/* Bottom contact panel */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + navLinks.length * 0.05 + 0.06, duration: MOTION_DURATIONS.medium, ease: EASE_OUT_EXPO }}
              className="border-t border-rule-dark px-6 pt-6 pb-10 flex-shrink-0 space-y-5"
            >
              <p className="section-kicker text-ink-muted-light/60">Get in touch</p>
              <div className="space-y-1.5">
                <a
                  href="tel:02037572767"
                  className="block font-display text-ink-light hover:text-amber transition-colors leading-none tracking-[-0.02em]"
                  style={{ fontSize: 'clamp(1.4rem, 4vw, 1.6rem)', fontVariationSettings: '"opsz" 20, "wght" 580' }}
                >
                  020 3757 2767
                </a>
                <a
                  href="mailto:contact@horizoncareservices.org"
                  className="block text-ink-muted-light text-[13px] hover:text-ink-light transition-colors"
                >
                  contact@horizoncareservices.org
                </a>
              </div>
              <Link
                href="/referrals"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2 bg-brand text-ink-light px-4 py-2.5 rounded-md text-[13px] font-semibold hover:opacity-90 transition-opacity"
              >
                Commission services <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
