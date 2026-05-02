'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { HCSLogoMark } from '@/components/hcs-logo'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE_OUT_EXPO, MOTION_DURATIONS } from '@/lib/motion'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/work-for-us', label: 'Work For Us' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn('text-[13px] font-medium transition-colors tracking-[0.04em]', scrolled ? 'text-ink-muted-dark hover:text-ink-dark' : 'text-ink-muted-light hover:text-ink-light')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className={cn('hidden md:block text-[13px] font-medium transition-colors tracking-wide', scrolled ? 'text-ink-muted-dark hover:text-ink-dark' : 'text-ink-muted-light hover:text-ink-light')}
            >
              Contact
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className={cn('md:hidden p-2.5 -mr-1.5 transition-colors duration-200', scrolled ? 'text-ink-dark' : 'text-ink-light')}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: MOTION_DURATIONS.base, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 z-[60] bg-deep flex flex-col"
          >
            {/* Mobile menu header */}
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
                onClick={() => setMobileOpen(false)}
                className="text-ink-light p-1.5 -mr-1"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col flex-1 overflow-y-auto" aria-label="Mobile">
              {[...navLinks, { href: '/contact', label: 'Contact' }].map((link) => (
                <div key={link.href} className="border-b border-rule-dark">
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center px-5 py-5 font-display text-ink-light text-[1.6rem] font-semibold leading-none tracking-[-0.02em] hover:text-amber transition-colors"
                    style={{ fontVariationSettings: '"opsz" 28, "wght" 580' }}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Bottom contact strip */}
            <div className="px-5 pb-8 pt-5 border-t border-rule-dark flex-shrink-0 space-y-2">
              <a
                href="tel:07572701349"
                className="block text-ink-light font-display text-[1.15rem] font-semibold hover:text-amber transition-colors"
                style={{ fontVariationSettings: '"opsz" 18, "wght" 580' }}
              >
                07572 701 349
              </a>
              <p className="text-ink-muted-light text-[11px] tracking-[0.1em] uppercase">Urgent, 24/7</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
