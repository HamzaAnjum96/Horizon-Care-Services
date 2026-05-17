export function MaintenanceBanner() {
  return (
    <div
      role="note"
      aria-label="Site maintenance notice"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white text-brand border-t border-rule-light py-2.5 px-4"
    >
      <p className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-center text-[12.5px] leading-snug">
        <span className="text-[11px] font-semibold tracking-[0.13em] uppercase">
          Maintenance underway
        </span>
        <span className="opacity-30 hidden sm:inline" aria-hidden="true">—</span>
        <span className="opacity-80">
          Copy and information on this site may be placeholder.
        </span>
      </p>
    </div>
  )
}
