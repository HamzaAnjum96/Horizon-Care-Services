'use client'

import { motion } from 'framer-motion'
import { AuroraBackground } from './aurora-background'
import { FolderPanel } from './folder-panel'

const AREAS = [
  'Bedfordshire',
  'Buckinghamshire',
  'Cambridgeshire',
  'Hertfordshire',
  'Manchester',
  'London',
]

const marqueeText = AREAS.join('  ·  ') + '  ·  '

export function HeroSection() {
  return (
    <section className="relative min-h-svh bg-bg-deep flex flex-col justify-center overflow-hidden">
      <AuroraBackground />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-10 pt-24 pb-16">
        <FolderPanel />
      </div>

      {/* Area marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.95, duration: 0.6 }}
        className="relative z-10 border-t border-white/10 overflow-hidden py-3.5"
        aria-label="Service areas"
      >
        <div className="marquee-track" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="text-green-muted text-[11px] font-medium tracking-[0.12em] uppercase flex-shrink-0 px-4"
            >
              {marqueeText}
            </span>
          ))}
        </div>
        {/* Visible to screen readers only */}
        <span className="sr-only">
          {AREAS.join(', ')}
        </span>
      </motion.div>
    </section>
  )
}
