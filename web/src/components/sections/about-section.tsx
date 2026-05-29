import { Register, RegisterRow } from '@/components/dossier/register-row'

const commitments = [
  {
    code: 'Vetting',
    title: 'We check before we place',
    body: "Every worker is DBS-checked, referenced and right-to-work verified before we place them. We don't send anyone whose compliance we haven't confirmed.",
  },
  {
    code: 'Matching',
    title: 'We match people to settings',
    body: "A care home, a hospital ward and a supported living service aren't interchangeable. We look at where someone has actually worked before, not just what's on their CV.",
  },
  {
    code: 'Comms',
    title: 'We communicate clearly',
    body: "You'll always know where things stand. If we can cover the shift, we'll tell you how and when. If we can't, we'll say so straight away, not keep you waiting.",
  },
  {
    code: 'Scope',
    title: 'We support urgent and planned needs',
    body: "Same-day calls and three-month planned rotas are both things we handle. We don't treat one as more important than the other.",
  },
  {
    code: 'After',
    title: 'We stay accountable',
    body: "Getting a worker to you isn't where we stop. We stay reachable, follow up when it matters and sort things out if something goes wrong.",
  },
]

export function AboutSection() {
  return (
    <section className="bg-cream-dim py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[7rem_1fr] gap-x-8 mb-12 lg:mb-16">
          <p className="section-kicker text-ink-muted-dark pt-2 mb-4 lg:mb-0">Why Horizon</p>
          <h2
            className="font-display text-ink-dark leading-[1.05] tracking-[-0.025em] lg:max-w-[18ch]"
            style={{
              fontSize: 'clamp(2rem, 5.2vw, 4.7rem)',
              fontVariationSettings: '"opsz" 48, "wght" 580',
            }}
          >
            Not just names on a rota.
          </h2>
        </div>

        <Register>
          {commitments.map((c) => (
            <RegisterRow key={c.code} code={c.code} title={c.title} body={c.body} />
          ))}
        </Register>
      </div>
    </section>
  )
}
