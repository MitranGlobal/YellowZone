import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import CriteriaExplorer from '@/components/criteria/CriteriaExplorer';
import TierLadder from '@/components/tiers/TierLadder';
import { PILLARS, MANDATORY_COUNT, RECOMMENDED_COUNT } from '@/lib/criteria';

export const metadata: Metadata = {
  title: 'The YellowZone Criteria',
  description:
    'The full YellowZone certification criteria for schools — requirements, evidence and verification methods across five pillars.',
};

export default function CriteriaPage() {
  return (
    <>
      <PageHero
        eyebrow="The criteria"
        title="5 pillars. 13 criteria. One standard."
        lede={
          <p>
            Every criterion defines what the school must have, what evidence it
            must provide, and how YellowZone verifies it. Mandatory criteria
            must be met in full. Recommended criteria strengthen the school’s
            profile and set the level awarded.
          </p>
        }
      >
        <Button href="/resources">Download the criteria (PDF)</Button>
      </PageHero>

      {/* Pillar overview */}
      <section className="border-b border-rule py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading eyebrow="Overview" title="How the standard is organised" />
          </Reveal>

          <Reveal variant="stagger" as="ul" className="mt-12 border-t border-rule">
            {PILLARS.map((p) => {
              const mandatory = p.criteria.filter(
                (c) => c.weight === 'Mandatory'
              ).length;
              const recommended = p.criteria.length - mandatory;
              return (
                <li
                  key={p.letter}
                  className="grid gap-x-10 gap-y-4 border-b border-rule py-8 lg:grid-cols-[3rem_1.1fr_1.3fr_11rem]"
                >
                  <span className="font-mono text-[0.95rem] text-gold-ink">
                    {p.letter}
                  </span>

                  <h3 className="font-display text-[1.25rem] leading-snug tracking-tight text-ink">
                    {p.name}
                  </h3>

                  <p className="text-[0.9rem] leading-relaxed text-ink-soft">
                    {p.focus}
                  </p>

                  <p className="font-mono text-[0.65rem] uppercase leading-relaxed tracking-[0.1em] text-ink-mute lg:text-right">
                    {mandatory} mandatory
                    {recommended ? ` · ${recommended} recommended` : ''}
                  </p>
                </li>
              );
            })}
          </Reveal>

          <Reveal className="mt-8">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-mute">
              {MANDATORY_COUNT} mandatory · {RECOMMENDED_COUNT} recommended ·{' '}
              {MANDATORY_COUNT + RECOMMENDED_COUNT} criteria total
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pillar principles */}
      <section className="border-b border-rule bg-parchment py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="The pillars"
              title="What each pillar is for"
            />
          </Reveal>

          <Reveal
            variant="stagger"
            as="ul"
            className="mt-14 grid gap-px bg-rule md:grid-cols-2 lg:grid-cols-3"
          >
            {PILLARS.map((p) => (
              <li key={p.letter} className="bg-paper p-8">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-gold-ink">
                  Pillar {p.letter}
                </span>
                <h3 className="mt-4 font-display text-[1.3rem] leading-snug tracking-tight text-ink">
                  {p.name}
                </h3>
                <span aria-hidden className="mt-5 block h-px w-10 bg-gold" />
                <p className="mt-5 text-[0.88rem] leading-relaxed text-ink-soft">
                  {p.principle}
                </p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Explorer */}
      <section id="library" className="border-b border-rule py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Criteria library"
              title="Every criterion, in full"
              lede={
                <p>
                  Filter by pillar or weight, then open a criterion to read its
                  requirement, the evidence your school submits, and how that
                  evidence is verified.
                </p>
              }
            />
          </Reveal>

          <div className="mt-14">
            <CriteriaExplorer />
          </div>

          {PILLARS.filter((p) => p.note).map((p) => (
            <Reveal key={p.letter} className="mt-12">
              <aside className="border-l-2 border-gold bg-gold-pale/25 px-7 py-6">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-gold-ink">
                  Note on Pillar {p.letter}
                </p>
                <p className="mt-3 max-w-prose text-[0.9rem] leading-relaxed text-ink-soft">
                  {p.note}
                </p>
              </aside>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Thresholds */}
      <section className="border-b border-rule bg-parchment py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Thresholds"
              title="Two gates decide the outcome"
            />
          </Reveal>

          <Reveal variant="stagger" as="ul" className="mt-12 grid gap-px bg-rule md:grid-cols-2">
            <li className="bg-paper p-8">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-gold-ink">
                Gate 1 — Mandatory
              </p>
              <p className="mt-4 font-display text-[1.3rem] leading-snug tracking-tight text-ink">
                All {MANDATORY_COUNT} Mandatory criteria met in full.
              </p>
              <p className="mt-4 text-[0.88rem] leading-relaxed text-ink-soft">
                Any unmet Mandatory criterion blocks certification until it is
                remediated. There is no partial credit and no level at which a
                school can be certified without clearing this gate.
              </p>
            </li>
            <li className="bg-paper p-8">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-gold-ink">
                Gate 2 — Recommended
              </p>
              <p className="mt-4 font-display text-[1.3rem] leading-snug tracking-tight text-ink">
                How many of {RECOMMENDED_COUNT} Recommended criteria are met.
              </p>
              <p className="mt-4 text-[0.88rem] leading-relaxed text-ink-soft">
                This does not decide whether a school is certified — it decides
                the level it is certified at, from Certified through to
                Platinum.
              </p>
            </li>
          </Reveal>

          <Reveal className="mt-12">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-mute">
              Outcomes: Certified · Certification deferred (remediation plan
              issued) · Not certified (may re-apply in a future cycle)
            </p>
          </Reveal>

          <div className="mt-16">
            <TierLadder />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              title="See where your school already stands."
              lede={
                <p>
                  The self-assessment walks the same thirteen criteria and shows
                  you which ones you can already evidence.
                </p>
              }
            />
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/resources#self-assessment">
                Start the self-assessment
              </Button>
              <Button href="/apply" variant="secondary">
                Apply for certification
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
