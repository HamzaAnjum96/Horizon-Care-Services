'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
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
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-deep/95 backdrop-blur-md border-b border-rule-dark'
            : 'bg-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-ink-light text-[16px] font-semibold leading-none tracking-[-0.01em]"
            style={{ fontVariationSettings: '"opsz" 14, "wght" 600' }}
          >
            Horizon Care Services
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-ink-light opacity-70 hover:opacity-100 transition-opacity tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <Link
              href="/contact"
              className="hidden md:block text-[13px] font-medium text-ink-light opacity-70 hover:opacity-100 transition-opacity tracking-wide"
            >
              Contact
            </Link>
            <Link
              href="/referrals"
              className="hidden md:inline-flex items-center bg-amber text-deep text-[13px] font-semibold px-4 py-2 rounded hover:opacity-90 transition-opacity"
            >
              Make a Referral
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-1.5 -mr-1 text-ink-light"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-deep flex flex-col"
          >
            <div className="flex justify-between items-center px-6 h-16 border-b border-rule-dark">
              <span
                className="font-display text-ink-light text-[16px] font-semibold"
                style={{ fontVariationSettings: '"opsz" 14, "wght" 600' }}
              >
                Horizon Care Services
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-ink-light p-1.5 -mr-1"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-col px-6 py-12 gap-6" aria-label="Mobile">
              {[...navLinks, { href: '/contact', label: 'Contact' }].map(
                (link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.06,
                      duration: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-display text-ink-light text-[2.2rem] font-semibold leading-tight hover:text-amber-dim transition-colors"
                      style={{ fontVariationSettings: '"opsz" 36, "wght" 600' }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ),
              )}
            </nav>

            <div className="px-6 pb-12 mt-auto">
              <Link
                href="/referrals"
                onClick={() => setMobileOpen(false)}
                className="block bg-amber text-deep text-center font-semibold px-6 py-4 rounded text-lg"
              >
                Make a Referral
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
