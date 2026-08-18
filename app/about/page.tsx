import type { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About',
  description:
    'YellowZone is developed by MiTran Global — building wellbeing infrastructure for education: a standard, a verification process, and the technology behind measurement at scale.',
};

const FACTORS = [
  'Emotional regulation',
  'Sense of purpose',
  'Self-awareness',
  'Healthy lifestyle',
  'Adaptability',
  'Leadership',
  'Self-management',
  'Resilience',
  'Interpersonal skills',
  'Decision-making',
];

const SCALE = [
  { figure: '127M', label: 'students in Classes 6–12' },
  { figure: '10.7M', label: 'teachers across government and private schools' },
  { figure: '1.47M', label: 'schools across the country' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Building the emotional wellbeing infrastructure for education"
        lede={
          <p>
            YellowZone is developed by MiTran Global. We are not building a
            standalone assessment product — we are building wellbeing
            infrastructure for schools: a standard, a verification process, and
            the technology that makes measurement possible at scale.
          </p>
        }
      />

      {/* Scale */}
      <section className="border-b border-rule py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="The opportunity"
              title="A standard built for 1.47 million schools"
              lede={
                <p>
                  India alone represents a very large and under-addressed
                  education market. Emotional wellbeing is measured in almost
                  none of it.
                </p>
              }
            />
          </Reveal>

          <Reveal variant="stagger" as="ul" className="mt-14 grid gap-px bg-rule sm:grid-cols-3">
            {SCALE.map((s) => (
              <li key={s.figure} className="bg-paper px-8 py-10">
                <p className="font-display text-[clamp(2.4rem,5vw,3.4rem)] leading-none tracking-tight text-gold-ink">
                  {s.figure}
                </p>
                <p className="mt-5 max-w-[18rem] text-[0.88rem] leading-relaxed text-ink-soft">
                  {s.label}
                </p>
              </li>
            ))}
          </Reveal>

          <Reveal className="mt-10">
            <p className="max-w-prose leading-relaxed text-ink-soft">
              Across Asia and the Middle East there is a growing focus on
              student wellbeing, emotional resilience and school-level support
              systems — yet emotional wellbeing is still rarely measured in a
              structured way. YellowZone starts in India and is designed to
              extend outward from there.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Positivity Hubs */}
      <section id="positivity-hubs" className="border-b border-rule bg-parchment py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="The vision"
              title="Positivity Hubs"
              lede={
                <>
                  <p>
                    YellowZone certification is the first layer of a wider
                    programme we call Positivity Hubs: a national and regional
                    emotional wellbeing standard for schools, benchmarked in the
                    spirit of NABH for healthcare quality and LEED for
                    sustainable buildings.
                  </p>
                  <p>
                    Schools are assessed. High-performing schools are studied.
                    Their practices are documented, standardised and replicated.
                    The programme extends across India first, then to other
                    education markets in Asia and the Middle East.
                  </p>
                </>
              }
            />
          </Reveal>
        </div>
      </section>

      {/* Technology */}
      <section className="border-b border-rule py-section">
        <div className="shell grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="The technology"
              title="EPPT — the Emotion AI Powered Positivity Tracker"
              lede={
                <>
                  <p>
                    Structured measurement is what makes a wellbeing standard
                    possible rather than aspirational. EPPT is MiTran Global’s
                    Emotion-AI-based assessment instrument, measuring ten
                    wellbeing factors in a 15-minute online assessment.
                  </p>
                  <p className="text-ink">
                    It sits inside the standard as an instrument for Pillar B.
                    It is not the certification.
                  </p>
                </>
              }
            />
          </Reveal>

          <Reveal variant="stagger" as="ul" className="grid grid-cols-2 gap-px self-start bg-rule">
            {FACTORS.map((f, i) => (
              <li key={f} className="bg-paper px-5 py-5">
                <span className="font-mono text-[0.62rem] text-gold-ink">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-2 text-[0.85rem] leading-snug text-ink">{f}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Partnerships */}
      <section id="partnerships" className="border-b border-rule bg-parchment py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Partnerships"
              title="Built with partners, not alone"
              lede={
                <p>
                  A standard earns its authority partly from who stands behind
                  it. We are developing YellowZone alongside public health
                  organisations, school networks and clinical advisors.
                </p>
              }
            />
          </Reveal>

          <Reveal className="mt-12">
            {/* [PLACEHOLDER] Replace with partner logos and one line per
                partner once agreements are signed. */}
            <div className="border border-dashed border-rule-strong bg-paper px-8 py-12 text-center">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-mute">
                Partner listings to be confirmed
              </p>
              <p className="mx-auto mt-4 max-w-prose text-[0.9rem] leading-relaxed text-ink-soft">
                Partner logos and descriptions are added here as agreements are
                completed.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Parent brand + CTA */}
      <section className="py-section">
        <div className="shell">
          <Reveal>
            <Image
              src="/logos/mitran-global.png"
              alt="MiTran Global — every child has the right to feel #positive"
              width={420}
              height={86}
              className="h-auto w-64 sm:w-80"
            />
            <div className="mt-10 max-w-prose">
              <p className="text-lede leading-relaxed text-ink-soft">
                MiTran Global builds emotional wellbeing infrastructure for
                education. YellowZone is how that work becomes a standard other
                schools can be held to.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/contact">Partner with us</Button>
              <Button href="/criteria" variant="secondary">
                See the criteria
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
