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
            Horizon Care Services is a healthcare staffing agency supplying vetted
            health and social care professionals to local authorities, NHS trusts,
            care homes, residential services, supported living providers and
            healthcare organisations.
          </p>
          <p className="text-ink-muted-dark text-[16px] leading-relaxed">
            Staffing gaps affect safety, continuity and morale. We help organisations
            keep services running by supplying suitable professionals for urgent
            shifts, planned absence, rota pressure and longer-term workforce needs.
          </p>
          <p className="text-ink-muted-dark text-[16px] leading-relaxed">
            Fast cover matters, but the wrong placement creates more pressure than
            it solves. We focus on suitability, compliance and communication so the
            person arriving on shift is someone your service can work with confidently.
          </p>
        </div>
      </div>
    </section>
  )
}
