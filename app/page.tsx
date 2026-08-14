import Link from 'next/link';
import Hero from '@/components/home/Hero';
import Testimonials from '@/components/home/Testimonials';
import TierLadder from '@/components/tiers/TierLadder';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import ArrowLink from '@/components/ui/ArrowLink';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import { PILLARS, MANDATORY_COUNT, RECOMMENDED_COUNT } from '@/lib/criteria';
import { SITE } from '@/lib/site';

const RECOGNITION = [
  {
    title: 'The YellowZone Certificate',
    body: `Issued on award and valid for ${SITE.validity}, naming the level your school achieved.`,
  },
  {
    title: 'Name and badge rights',
    body: 'Use the YellowZone Certified School name and seal across your website, prospectus, communications and signage.',
  },
  {
    title: 'A digital badge',
    body: 'A verifiable web badge linking back to your entry in the register.',
  },
  {
    title: 'Listing in the register',
    body: 'Your school appears in the YellowZone School Register alongside its level and certification dates.',
  },
];

const PATH = [
  ['Apply', 'Register your school and nominate a coordinator.'],
  ['Evidence', 'Submit documentation against each criterion.'],
  ['Verify', 'Our assessment team reviews evidence and data, and conducts verification.'],
  ['Certify', `Meet both gates and your school is awarded YellowZone Certification, valid for ${SITE.validity}.`],
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* The gap */}
      <section className="border-b border-rule py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="The gap"
              title="Every school measures marks. Almost none measure how students feel."
              lede={
                <>
                  <p>
                    Academic performance is tracked every term, in every school.
                    Emotional wellbeing — which shapes learning outcomes,
                    behaviour, attendance and retention — is rarely measured at
                    all.
                  </p>
                  <p>
                    Schools that do care about wellbeing usually run scattered,
                    well-intentioned efforts: a counsellor here, a workshop
                    there, an awareness day in July. What is missing is a
                    standard. A defined bar, independently verified, that tells a
                    school — and its parents — that the work is real.
                  </p>
                  <p className="text-ink">That is what YellowZone is.</p>
                </>
              }
            />
          </Reveal>
        </div>
      </section>

      {/* Five pillars */}
      <section className="border-b border-rule bg-parchment py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="What certification means"
              title="What a YellowZone School has demonstrated"
              lede={
                <p>
                  A YellowZone School has been assessed against{' '}
                  <strong className="font-medium text-ink">
                    {MANDATORY_COUNT + RECOMMENDED_COUNT} criteria across five
                    pillars
                  </strong>{' '}
                  and met the bar — not by buying a product or running a single
                  test, but by evidencing real practice.
                </p>
              }
            />
          </Reveal>

          <Reveal variant="stagger" as="ul" className="mt-14 border-t border-rule-strong/60">
            {PILLARS.map((pillar) => (
              <li
                key={pillar.letter}
                className="grid gap-x-8 gap-y-3 border-b border-rule-strong/60 py-8 md:grid-cols-[2.5rem_1fr_1.4fr]"
              >
                <span className="font-mono text-[0.8rem] text-gold-ink">
                  {pillar.letter}
                </span>
                <h3 className="font-display text-[1.3rem] leading-snug tracking-tight text-ink">
                  {pillar.name}
                </h3>
                <p className="text-[0.92rem] leading-relaxed text-ink-soft">
                  {pillar.principle}
                </p>
              </li>
            ))}
          </Reveal>

          <Reveal className="mt-10">
            <ArrowLink href="/criteria">
              Explore all {MANDATORY_COUNT + RECOMMENDED_COUNT} criteria
            </ArrowLink>
          </Reveal>
        </div>
      </section>

      {/* Certification levels */}
      <section className="border-b border-rule py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Certification levels"
              title="One gate. Five levels."
              lede={
                <p>
                  Every level requires the full Mandatory gate — all{' '}
                  {MANDATORY_COUNT} Mandatory criteria met. The level awarded
                  then reflects how many of the {RECOMMENDED_COUNT} Recommended
                  criteria the school also evidences.
                </p>
              }
            />
          </Reveal>

          <Reveal className="mt-16">
            <TierLadder />
          </Reveal>
        </div>
      </section>

      {/* The path */}
      <section className="border-b border-rule bg-parchment py-section">
        <div className="shell grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <SectionHeading
              eyebrow="The path"
              title="Four steps to certification"
              lede={
                <p>
                  Roughly {SITE.decisionDays} from application to decision,
                  depending on how quickly evidence arrives and any gaps are
                  closed.
                </p>
              }
            />
            <div className="mt-9">
              <ArrowLink href="/get-certified">See the full process</ArrowLink>
            </div>
          </Reveal>

          <Reveal variant="stagger" as="ol" className="border-t border-rule-strong/60">
            {PATH.map(([title, body], i) => (
              <li
                key={title}
                className="flex gap-6 border-b border-rule-strong/60 py-7"
              >
                <span className="font-mono text-[0.78rem] text-gold-ink">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-[1.2rem] tracking-tight text-ink">
                    {title}
                  </h3>
                  <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ink-soft">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Recognition */}
      <section className="border-b border-rule py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Recognition"
              title="What your school receives"
            />
          </Reveal>

          <Reveal variant="stagger" as="ul" className="mt-14 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {RECOGNITION.map((item) => (
              <li key={item.title} className="bg-paper p-7">
                <span aria-hidden className="block h-px w-9 bg-gold" />
                <h3 className="mt-6 font-display text-[1.12rem] leading-snug tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-3.5 text-[0.87rem] leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-rule bg-parchment py-section">
        <div className="shell">
          <Reveal>
            <Eyebrow>From certified schools</Eyebrow>
          </Reveal>
          <Reveal className="mt-10">
            <Testimonials />
          </Reveal>
        </div>
      </section>

      {/* Scale */}
      <section className="border-b border-rule py-section">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Scale of the opportunity"
              title="A standard built for 1.47 million schools"
              lede={
                <p>
                  Emotional wellbeing is measured in almost none of them.
                  YellowZone is being built as a national standard — starting in
                  India, designed to extend across Asia and the Middle East.
                </p>
              }
            />
          </Reveal>

          <Reveal variant="stagger" as="ul" className="grid gap-px bg-rule sm:grid-cols-3">
            {[
              ['127M', 'students in Classes 6–12'],
              ['10.7M', 'teachers'],
              ['1.47M', 'schools'],
            ].map(([figure, label]) => (
              <li key={label} className="bg-paper px-6 py-8">
                <p className="font-display text-[clamp(2rem,4vw,2.7rem)] leading-none tracking-tight text-ink">
                  {figure}
                </p>
                <p className="mt-4 font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.14em] text-ink-mute">
                  {label}
                </p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Closing */}
      <section className="py-section">
        <div className="shell">
          <Reveal className="max-w-3xl">
            <h2 className="text-title text-balance text-ink">
              Lead, don&rsquo;t follow.
            </h2>
            <p className="mt-7 text-lede text-pretty text-ink-soft">
              Most schools have not begun to address this in any structured way.
              The ones that certify first will be the ones parents remember.
            </p>
            <div className="mt-11 flex flex-wrap gap-3.5">
              <Button href="/apply">Apply for Certification</Button>
              <Button href="/resources" variant="secondary">
                Download the Criteria
              </Button>
            </div>
            <p className="mt-8 text-[0.87rem] text-ink-mute">
              Not ready to apply?{' '}
              <Link
                href="/resources#self-assessment"
                className="link-underline text-ink"
              >
                Run the self-assessment
              </Link>{' '}
              and see where your school stands.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
