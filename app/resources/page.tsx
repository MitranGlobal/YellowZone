import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import FaqAccordion from '@/components/ui/FaqAccordion';
import SelfAssessment from '@/components/quiz/SelfAssessment';
import Button from '@/components/ui/Button';
import { DOWNLOADS } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Resources & FAQ',
  description:
    'Download the YellowZone criteria and readiness checklist, and read answers to the questions schools ask most.',
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Everything your school needs to get started"
        lede={
          <p>
            The criteria in full, a checklist to work through offline, and
            straight answers to the questions schools ask most.
          </p>
        }
      />

      {/* Downloads */}
      <section className="border-b border-rule py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading eyebrow="Downloads" title="Documents" />
          </Reveal>

          <Reveal variant="stagger" as="ul" className="mt-12 border-t border-rule">
            {DOWNLOADS.map((doc) => (
              <li
                key={doc.title}
                className="grid gap-x-8 gap-y-3 border-b border-rule py-7 sm:grid-cols-[1.1fr_1.5fr_10rem] sm:items-baseline"
              >
                <h3 className="font-display text-[1.18rem] leading-snug tracking-tight text-ink">
                  {doc.title}
                </h3>
                <p className="text-[0.88rem] leading-relaxed text-ink-soft">
                  {doc.detail}
                </p>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.11em] text-ink-mute sm:text-right">
                  {doc.meta}
                </p>
              </li>
            ))}
          </Reveal>

          <Reveal className="mt-9">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ink-mute">
              {/* [OPEN ITEM] Wire these to real files once approved. */}
              Documents are issued to schools on request and on application.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Self-assessment */}
      <section id="self-assessment" className="scroll-mt-24 border-b border-rule bg-parchment py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Self-assessment"
              title="See where your school stands"
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

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 border-b border-rule py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading eyebrow="FAQ" title="Questions schools ask" />
          </Reveal>

          <Reveal variant="fade" className="mt-14">
            <FaqAccordion />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              title="Still have a question?"
              lede={
                <p>
                  The certification team answers school enquiries directly,
                  including on data protection, pricing bands and whether your
                  existing instruments qualify.
                </p>
              }
            />
            <div className="mt-9">
              <Button href="/contact">Contact the certification team</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
