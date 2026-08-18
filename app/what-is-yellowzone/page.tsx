import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import ArrowLink from '@/components/ui/ArrowLink';
import TierLadder from '@/components/tiers/TierLadder';
import { MANDATORY_COUNT, RECOMMENDED_COUNT } from '@/lib/criteria';

export const metadata: Metadata = {
  title: 'What is YellowZone?',
  description:
    'YellowZone is an independent accreditation for emotional wellness in schools — 5 pillars, 13 criteria, evidence-based verification.',
};

const NOT = [
  {
    title: 'It is not a wellbeing test.',
    body: 'Assessment is one criterion group among five pillars. A school that measures well but governs badly is not certified.',
  },
  {
    title: 'It is not a workshop or a training package.',
    body: 'We support training as part of getting a school to the standard, but the certification is the verified outcome — not the sessions delivered along the way.',
  },
  {
    title: 'It is not permanent.',
    body: 'Certification lapses if standards lapse. A 12-month cycle with annual renewal, and material changes must be reported.',
  },
  {
    title: 'It is not a paid badge.',
    body: 'We help schools reach the standard — but the seal is only issued once the Mandatory criteria are genuinely met and verified. A mark that could not be withheld would signal nothing.',
  },
];

export default function WhatIsPage() {
  return (
    <>
      <PageHero
        eyebrow="The standard"
        title="A school doesn’t claim emotional wellness. It earns it."
        lede={
          <p>
            YellowZone is an independent, criteria-based accreditation that
            recognises schools providing a strong, structured and measurable
            environment for the emotional wellbeing of their students and school
            community.
          </p>
        }
      />

      {/* The principle */}
      <section className="border-b border-rule py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="The principle"
              title="Certification, not a product"
              lede={
                <>
                  <p>
                    YellowZone is an accreditation, not a product. A school
                    earns it by demonstrating real practice across thirteen
                    defined criteria — documented, evidenced and verified — not
                    by purchasing a service or completing a single test.
                  </p>
                  <p>
                    Every criterion states three things: what the school must
                    have, what evidence it must show, and how that evidence is
                    checked. Nothing is awarded on intent.
                  </p>
                  <p className="text-ink">
                    That is the whole point. A mark that could not be withheld
                    would tell a parent nothing.
                  </p>
                </>
              }
            />
          </Reveal>
        </div>
      </section>

      {/* What we assess */}
      <section className="border-b border-rule bg-parchment py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="What we assess"
              title="Five pillars, thirteen criteria"
              lede={
                <p>
                  Certification spans the full institution — leadership,
                  measurement, staff capability, academic design and school
                  culture. {MANDATORY_COUNT} criteria are Mandatory and must be
                  met in full. {RECOMMENDED_COUNT} are Recommended, and how many
                  of those a school evidences sets the level it is awarded.
                </p>
              }
            />
          </Reveal>

          <Reveal className="mt-10">
            <ArrowLink href="/criteria">See every criterion in detail</ArrowLink>
          </Reveal>
        </div>
      </section>

      {/* Levels */}
      <section className="border-b border-rule py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Levels of award"
              title="One gate, three levels"
              lede={
                <p>
                  Clearing the Mandatory gate is what makes a school certified.
                  The level above it reflects how far the school has gone beyond
                  the minimum.
                </p>
              }
            />
          </Reveal>

          <div className="mt-14">
            <TierLadder />
          </div>
        </div>
      </section>

      {/* Blue Zones */}
      <section className="border-b border-rule bg-parchment py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Where it comes from"
              title="Inspired by Blue Zones"
              lede={
                <>
                  <p>
                    The global Blue Zones model identified communities where
                    people live measurably healthier lives because of shared
                    cultural, environmental and social practices — then studied
                    and replicated what those communities did.
                  </p>
                  <p>
                    YellowZone applies the same logic to schools. Schools are
                    assessed. High-performing schools are studied. Their
                    practices are documented, standardised and replicated. Other
                    schools implement them and are certified in turn.
                  </p>
                </>
              }
            />
          </Reveal>
        </div>
      </section>

      {/* What it is not */}
      <section className="py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading eyebrow="To be clear" title="What YellowZone is not" />
          </Reveal>

          <Reveal variant="stagger" as="ul" className="mt-14 border-t border-rule">
            {NOT.map((item) => (
              <li
                key={item.title}
                className="grid gap-x-10 gap-y-3 border-b border-rule py-8 sm:grid-cols-[1fr_1.4fr]"
              >
                <h3 className="font-display text-[1.22rem] leading-snug tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="text-[0.9rem] leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </li>
            ))}
          </Reveal>

          <Reveal className="mt-12">
            <ArrowLink href="/resources#self-assessment">
              Start your self-assessment
            </ArrowLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
