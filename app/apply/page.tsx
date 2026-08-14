import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import ApplyForm from '@/components/apply/ApplyForm';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Apply for Certification',
  description:
    'Start your school’s YellowZone certification. Register your interest and the certification team will confirm next steps.',
};

export default function ApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Apply"
        title="Start your school’s certification"
        lede={
          <p>
            Register your school and nominate a coordinator. The certification
            team responds within {SITE.responseTime} with next steps and the
            evidence submission guide.
          </p>
        }
      />

      <section className="border-b border-rule py-section">
        <div className="shell grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <Reveal variant="fade">
            <ApplyForm />
          </Reveal>

          <Reveal className="lg:pt-2">
            <div className="border-t border-rule pt-8">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-gold-ink">
                Not ready to apply?
              </p>
              <p className="mt-4 text-[0.9rem] leading-relaxed text-ink-soft">
                Work through the self-assessment first. It walks the same
                thirteen criteria and shows you where evidence is missing before
                you commit to an application.
              </p>
              <Link
                href="/resources#self-assessment"
                className="link-underline mt-6 inline-flex font-mono text-[0.68rem] uppercase tracking-[0.14em]"
              >
                Start the self-assessment
              </Link>
            </div>

            <div className="mt-12 border-t border-rule pt-8">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-gold-ink">
                Prefer to write?
              </p>
              <Link
                href={`mailto:${SITE.email}`}
                className="link-underline mt-4 inline-flex font-mono text-[0.72rem]"
              >
                {SITE.email}
              </Link>
            </div>

            <div className="mt-12 border-t border-rule pt-8">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-gold-ink">
                What happens next
              </p>
              <ol className="mt-5 space-y-4">
                {[
                  'We confirm your school’s eligibility and nominate an assessment lead.',
                  'You receive the evidence submission guide and coordinator access.',
                  'Assessment windows are scheduled around your academic calendar.',
                ].map((step, i) => (
                  <li key={step} className="flex gap-4 text-[0.88rem] leading-relaxed">
                    <span className="font-mono text-[0.68rem] text-gold-ink">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-ink-soft">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
