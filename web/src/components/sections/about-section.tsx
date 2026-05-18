export function AboutSection() {
  return (
    <section className="bg-cream-dim py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="w-10 h-[2px] bg-amber mb-3" />

        <p className="section-kicker text-ink-muted-dark mb-6">
          Who we are
        </p>

        <h2
          className="font-display text-ink-dark leading-[1.05] tracking-[-0.025em] mb-14 lg:mb-16 max-w-[16ch]"
          style={{
            fontSize: 'clamp(2rem, 5.2vw, 4.7rem)',
            fontVariationSettings: '"opsz" 48, "wght" 580',
          }}
        >
          Staffing built on relationships, not just rotas.
        </h2>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 border-t border-rule-light pt-10 lg:pt-12">
          <p className="text-ink-muted-dark text-[16px] leading-relaxed">
            Horizon Care Services is a healthcare staffing agency with three years
            of experience placing professionals across England. We supply registered
            nurses, social workers, OTs, physiotherapists, HCAs, and support workers
            to NHS trusts, local authorities, and care organisations.
          </p>
          <p className="text-ink-muted-dark text-[16px] leading-relaxed">
            We are selective about who we place and where. Every professional on our
            register is DBS checked, reference verified, and assessed against the
            settings they work in. Quality over volume — every time.
          </p>
          <p className="text-ink-muted-dark text-[16px] leading-relaxed">
            We work closely with ward managers, team leads, and commissioning
            teams. When a requirement comes in, we respond quickly, confirm
            availability clearly, and stay accountable once a placement is made.
          </p>
        </div>
      </div>
    </section>
  )
}
