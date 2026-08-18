import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import CriteriaExplorer from '@/components/criteria/CriteriaExplorer';
import SelfAssessment from '@/components/quiz/SelfAssessment';
import { PILLARS } from '@/lib/criteria';

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
      />

      {/* Pillar principles */}
      <section className="border-b border-rule py-section">
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
      <section id="library" className="border-b border-rule bg-parchment py-section">
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

      {/* Self-assessment */}
      <section
        id="self-assessment"
        className="scroll-mt-24 border-b border-rule py-section"
      >
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Self-assessment"
              title="See where your school already stands"
              lede={
                <p>
                  Thirteen questions, one per criterion. Nothing is submitted —
                  answers stay in your browser, and the result is indicative
                  only, not a certification decision.
                </p>
              }
            />
          </Reveal>

          <Reveal variant="fade" className="mt-14">
            <SelfAssessment />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-parchment py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              title="Not where you hoped? That is where we start."
              lede={
                <p>
                  Schools are not expected to meet these criteria before they
                  contact us. We establish where you stand, plan the gaps, and
                  work through them with you.
                </p>
              }
            />
            <div className="mt-9">
              <Button href="/contact">Talk to Us</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
