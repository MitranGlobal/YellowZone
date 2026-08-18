import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import ArrowLink from '@/components/ui/ArrowLink';
import ProcessTimeline from '@/components/home/ProcessTimeline';
import { PREPARE, SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Talk to the YellowZone team about certifying your school. No form, no application — call or write and we will take it from there.',
};

const CHANNELS = [
  {
    label: 'Email',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    note: `We reply within ${SITE.responseTime}.`,
  },
  {
    label: 'Phone',
    value: SITE.phoneDisplay,
    href: `tel:${SITE.phone.replace(/\s/g, '')}`,
    note: SITE.hours,
  },
  {
    label: 'WhatsApp',
    value: SITE.whatsapp,
    href: `https://wa.me/${SITE.whatsapp.replace(/[^\d]/g, '')}`,
    note: 'For quick questions.',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start with a conversation."
        lede={
          <>
            <p>
              There is no application form and nothing to submit. Schools are
              not expected to meet the criteria before they get in touch — most
              do not, and that is exactly where we begin.
            </p>
            <p className="text-ink">
              Call or write, and we will take it from there.
            </p>
          </>
        }
      />

      {/* Channels */}
      <section className="border-b border-rule py-section">
        <div className="shell">
          <Reveal variant="stagger" as="ul" className="grid gap-px bg-rule md:grid-cols-3">
            {CHANNELS.map((c) => (
              <li key={c.label} className="bg-paper p-8 lg:p-10">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-gold-ink">
                  {c.label}
                </p>
                <a
                  href={c.href}
                  className="link-underline mt-5 inline-block font-display text-[1.2rem] leading-snug tracking-tight text-ink lg:text-[1.3rem]"
                >
                  {c.value}
                </a>
                <p className="mt-4 text-[0.85rem] leading-relaxed text-ink-soft">
                  {c.note}
                </p>
              </li>
            ))}
          </Reveal>

          <Reveal className="mt-12">
            <div className="max-w-prose border-l-2 border-gold bg-gold-pale/25 px-7 py-6">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-gold-ink">
                Office
              </p>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-ink">
                {SITE.address}
              </p>
              <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">
                {SITE.hours}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What the first conversation covers */}
      <section className="border-b border-rule bg-parchment py-section">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="The first conversation"
              title="What we will ask about"
              lede={
                <p>
                  Nothing here needs preparing in advance. If you do not have
                  something on this list, that is simply part of what we will
                  help you build.
                </p>
              }
            />
            <div className="mt-9">
              <ArrowLink href="/resources#self-assessment">
                Or see where you stand first
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

      {/* How it goes */}
      <section className="py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="How it goes"
              title="From that conversation to certification"
              lede={
                <p>
                  We establish where your school stands, plan the gaps, and
                  support the work to close them. Certification comes at the end
                  of that — not as a condition of starting it.
                </p>
              }
            />
          </Reveal>

          <Reveal variant="fade" className="mt-14">
            <ProcessTimeline />
          </Reveal>

          <Reveal className="mt-12">
            <p className="max-w-prose text-[0.9rem] leading-relaxed text-ink-soft">
              Timings depend entirely on where your school starts. A school with
              a counsellor, a policy and training records already in place may
              be certified within a term. A school building from scratch should
              expect an academic year.{' '}
              <Link href="/resources#faq" className="link-underline">
                More questions answered
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
