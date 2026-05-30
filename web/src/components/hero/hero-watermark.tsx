import { HCSLogoMark } from '@/components/hcs-logo'

/**
 * A small logo watermark in the bottom-right of dark hero/header bands. Faint
 * and light-toned (so it doesn't read heavy), with a slow, slight breathe.
 */
export function HeroWatermark() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <HCSLogoMark
        className="watermark-breathe absolute bottom-6 right-6 lg:bottom-8 lg:right-10"
        style={{
          width: 'clamp(56px, 6vw, 96px)',
          height: 'auto',
          aspectRatio: '1 / 1',
          color: 'oklch(82% 0.02 52)',
        }}
      />
    </div>
  )
}
