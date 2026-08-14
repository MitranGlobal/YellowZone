import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import ArrowLink from '@/components/ui/ArrowLink';
import ProcessTimeline from '@/components/home/ProcessTimeline';
import { PREPARE, SITE, STAGES } from '@/lib/site';

export const metadata: Metadata = {
  title: 'How to Get Certified',
  description:
    'The YellowZone certification process for schools — application, evidence, verification, findings and renewal.',
};

export default function GetCertifiedPage() {
  return (
    <>
      <PageHero
        eyebrow="The process"
        title="From application to certification"
        lede={
          <p>
            A clear, evidence-led process. Your school knows exactly what is
            being assessed, and exactly what it needs to show.
          </p>
        }
      >
        <Button href="/apply">Start your application</Button>
      </PageHero>

      {/* Stages */}
      <section className="border-b border-rule py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Stages"
              title={`The ${STAGES.length} stages`}
              lede={
                <p>
                  Each stage gates the next. Timings are indicative and depend
                  on how quickly evidence is submitted and any gaps are closed.
                </p>
              }
            />
          </Reveal>

          <Reveal variant="fade" className="mt-14">
            <ProcessTimeline />
          </Reveal>

          <Reveal className="mt-10">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-mute">
              Certification decision — approximately day{' '}
              {SITE.decisionDays.replace(/\D/g, '')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Prepare */}
      <section className="border-b border-rule bg-parchment py-section">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Before you apply"
              title="What your school needs to prepare"
              lede={
                <p>
                  Most schools already hold more of this than they expect. The
                  work is usually documentation rather than new programmes.
                </p>
              }
            />
            <div className="mt-9">
              <ArrowLink href="/resources#self-assessment">
                Download the self-assessment checklist
              </ArrowLink>
            </div>
          </Reveal>

          <Reveal variant="stagger" as="ul" className="border-t border-rule-strong/50">
            {PREPARE.map((item, i) => (
              <li
                key={item}
                className="flex items-baseline gap-5 border-b border-rule-strong/50 py-5"
              >
                <span className="font-mono text-[0.7rem] text-gold-ink">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[0.95rem] leading-relaxed text-ink">
                  {item}
                </span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Renewal */}
      <section className="border-b border-rule py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Renewal"
              title="Certification is a cycle, not a plaque"
              lede={
                <>
                  <p>
                    Certification is valid for {SITE.validity}. Renewal requires
                    a refreshed assessment cycle and updated evidence against
                    all Mandatory criteria.
                  </p>
                  <p>
                    Any material change — a counsellor departing without
                    replacement, a lapsed policy — must be reported and triggers
                    a remediation window of {SITE.remediation}. Schools that do
                    not renew or remediate have their YellowZone status
                    suspended until re-certified.
                  </p>
                </>
              }
            />
          </Reveal>
        </div>
      </section>

      {/* Investment */}
      <section className="py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Investment"
              title="Certification is priced by enrolment band"
              lede={
                <p>
                  Fees cover assessment administration, evidence review,
                  verification and the certification decision. Request the
                  banding for your school size and the certification team will
                  send it with the evidence submission guide.
                </p>
              }
            />
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/apply">Request certification pricing</Button>
              <Button href="/criteria" variant="secondary">
                Review the criteria
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
