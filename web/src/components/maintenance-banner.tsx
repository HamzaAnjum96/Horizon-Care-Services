export function MaintenanceBanner() {
  return (
    <div
      role="note"
      aria-label="Site maintenance notice"
      className="w-full bg-amber-dim text-ink-dark border-b border-amber/30 py-2.5 px-4"
    >
      <p className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-center text-[12.5px] leading-snug">
        <span className="text-[11px] font-semibold tracking-[0.13em] uppercase opacity-80">
          Maintenance underway
        </span>
        <span className="opacity-40 hidden sm:inline" aria-hidden="true">—</span>
        <span className="opacity-75">
          Copy and information on this site may be placeholder.
        </span>
      </p>
    </div>
  )
}
