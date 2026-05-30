import { HCSLogoMark } from '@/components/hcs-logo'

/**
 * A single oversized logo mark used as a faint watermark in dark hero/header
 * bands. It scales with the container (height-relative), sits bleeding off the
 * right edge, and uses multiply blending with a fill slightly darker than the
 * background so it only darkens what's beneath it: visible if you look, quiet
 * otherwise.
 */
export function HeroWatermark() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <HCSLogoMark
        className="absolute right-[-8%] top-1/2"
        style={{
          height: '160%',
          width: 'auto',
          aspectRatio: '1 / 1',
          transform: 'translateY(-50%)',
          color: 'oklch(6% 0.012 42)',
          opacity: 0.6,
        }}
      />
    </div>
  )
}
