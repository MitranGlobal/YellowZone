import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import Testimonials from '@/components/home/Testimonials';

export const metadata: Metadata = {
  title: 'Why Certify',
  description:
    'The case for YellowZone certification — for school leadership, teachers, parents and students.',
};

const AUDIENCES = [
  {
    audience: 'School leadership',
    points: [
      ['Recognition', 'A credible, external accreditation in a domain where claims are otherwise unverifiable.'],
      ['Structure', 'One coherent standard replacing scattered, ad hoc wellness efforts.'],
      ['Differentiation', 'Most schools have not addressed this in any structured way. Early certification is a genuine position.'],
      ['Continuous improvement', 'The annual cycle keeps practice current rather than a one-time exercise.'],
    ],
  },
  {
    audience: 'Teachers',
    points: [
      ['Staff wellbeing is measured', 'Educator assessment sits alongside student assessment, not behind it.'],
      ['Real training', 'Structured development in positive classroom practice, not another circular.'],
      ['Workload considered', 'Academic policies designed to reduce stress on teachers as well as students.'],
    ],
  },
  {
    audience: 'Parents',
    points: [
      ['An external signal', 'Clear evidence that the school’s commitment to wellbeing is verified, not asserted.'],
      ['Measurement, not claims', 'Proof that the school measures what it says it cares about.'],
      ['A route for concerns', 'A named counsellor, a published policy, and a confidential channel.'],
    ],
  },
  {
    audience: 'Students',
    points: [
      ['Someone to talk to', 'A qualified counsellor with published hours.'],
      ['A calmer calendar', 'An academic year designed with their stress in mind.'],
      ['Support that fits', 'Help targeted to what was actually measured, not assumed.'],
    ],
  },
];

export default function WhyCertifyPage() {
  return (
    <>
      <PageHero
        eyebrow="The case"
        title="The case for certification"
        lede={
          <p>
            Certification serves four groups differently. What follows is what
            each of them gets that they did not have before.
          </p>
        }
      />

      {AUDIENCES.map((group, gi) => (
        <section
          key={group.audience}
          className={`border-b border-rule py-section ${
            gi % 2 === 1 ? 'bg-parchment' : ''
          }`}
        >
          <div className="shell grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <Reveal>
              <SectionHeading eyebrow={`For ${group.audience}`} title={group.audience} />
            </Reveal>

            <Reveal variant="stagger" as="ul" className="border-t border-rule">
              {group.points.map(([label, body]) => (
                <li
                  key={label}
                  className="grid gap-x-8 gap-y-2 border-b border-rule py-6 sm:grid-cols-[13rem_1fr]"
                >
                  <h3 className="font-mono text-[0.68rem] uppercase leading-relaxed tracking-[0.13em] text-gold-ink">
                    {label}
                  </h3>
                  <p className="text-[0.92rem] leading-relaxed text-ink-soft">
                    {body}
                  </p>
                </li>
              ))}
            </Reveal>
          </div>
        </section>
      ))}

      {/* Voices */}
      <section className="border-b border-rule py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading eyebrow="From the first cohort" title="In their words" />
          </Reveal>
          <Reveal variant="fade" className="mt-14">
            <Testimonials />
          </Reveal>
        </div>
      </section>

      {/* Close */}
      <section className="py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              title="Lead, don’t follow."
              lede={
                <p>
                  Most schools have not begun to address this in any structured
                  way. The ones that certify first will be the ones parents
                  remember.
                </p>
              }
            />
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/apply">Apply for certification</Button>
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
