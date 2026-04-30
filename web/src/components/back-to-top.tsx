'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE_OUT_EXPO, MOTION_DURATIONS } from '@/lib/motion'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 380)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.75 }}
          transition={{ duration: MOTION_DURATIONS.fast, ease: EASE_OUT_EXPO }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-5 lg:right-7 z-40 h-10 w-10 rounded-full bg-forest text-ink-light flex items-center justify-center shadow-[0_4px_20px_-6px_oklch(13%_0.06_24)] hover:opacity-80 transition-opacity"
          aria-label="Back to top"
        >
          <ArrowUp size={15} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
