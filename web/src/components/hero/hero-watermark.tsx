import { HCSLogoMark } from '@/components/hcs-logo'

/**
 * A single oversized logo mark used as a faint watermark in dark hero/header
 * bands. It scales with the container (height-relative), sits bleeding off the
 * right edge, and is filled a touch darker than the background so it just
 * darkens what's beneath: visible if you look, quiet otherwise. Breathes slowly.
 */
export function HeroWatermark() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <div
        className="absolute right-[-5%] top-1/2"
        style={{ height: '95%', aspectRatio: '1 / 1', transform: 'translateY(-50%)' }}
      >
        <HCSLogoMark
          className="watermark-breathe w-full h-full"
          style={{ color: 'oklch(7% 0.012 42)' }}
        />
      </div>
    </div>
  )
}
