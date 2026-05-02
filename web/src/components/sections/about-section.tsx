export function AboutSection() {
  return (
    <section className="bg-cream-dim py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="w-10 h-[2px] bg-amber mb-3" />

        <p className="section-kicker text-ink-muted-dark mb-6">
          Who we are
        </p>

        <blockquote
          className="font-display text-ink-dark leading-[1.05] tracking-[-0.025em] mb-14 lg:mb-16 max-w-[16ch]"
          style={{
            fontSize: 'clamp(2rem, 5.2vw, 4.7rem)',
            fontVariationSettings: '"opsz" 48, "wght" 580',
          }}
        >
          Care built around the person, not the process.
        </blockquote>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 border-t border-rule-light pt-10 lg:pt-12">
          <p className="text-ink-muted-dark text-[16px] leading-relaxed">
            Horizon Care Services is a registered health and social care
            provider with three years of experience operating across England.
            We deliver home care, specialist support, and clinical staffing to
            individuals, families, and care organisations.
          </p>
          <p className="text-ink-muted-dark text-[16px] leading-relaxed">
            Our approach is grounded in strength-based practice and a genuine
            recovery model. We work with each person to understand what matters
            to them, assess what they need, and build a care plan around their
            goals.
          </p>
          <p className="text-ink-muted-dark text-[16px] leading-relaxed">
            We work alongside NHS trusts, local authorities, families, and
            the people in our care to make sure support is joined up, reviewed
            regularly, and always moving forward.
          </p>
        </div>
      </div>
    </section>
  )
}
