import type { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { TIERS } from '@/lib/tiers';
import { MANDATORY_COUNT, RECOMMENDED_COUNT } from '@/lib/criteria';

export const metadata: Metadata = {
  title: 'Certified Schools',
  description:
    'The register of YellowZone Certified Schools — every school listed has met all Mandatory criteria and been independently verified.',
};

/**
 * [PRE-LAUNCH STATE]
 *
 * The register renders from data. Until the first cohort is certified the
 * array below stays empty and the empty state shows. Populate `SCHOOLS` — or
 * swap the import for a CMS/database call — once awards are made.
 */
type School = {
  name: string;
  city: string;
  state: string;
  board: string;
  tier: (typeof TIERS)[number]['key'];
  certified: string;
  validTo: string;
  recommendedMet: number;
};

const SCHOOLS: School[] = [];

export default function CertifiedSchoolsPage() {
  return (
    <>
      <PageHero
        eyebrow="The register"
        title="YellowZone Certified Schools"
        lede={
          <p>
            Every school listed here has met all {MANDATORY_COUNT} Mandatory
            criteria and been verified by the YellowZone assessment team. The
            level shown reflects how many Recommended criteria the school also
            evidenced.
          </p>
        }
      />

      <section className="border-b border-rule py-section">
        <div className="shell">
          {SCHOOLS.length === 0 ? (
            <Reveal>
              <div className="border border-rule bg-parchment px-8 py-16 text-center sm:px-14 sm:py-20">
                <Image
                  src="/logos/yellow-zone-classic.svg"
                  alt=""
                  width={104}
                  height={104}
                  className="mx-auto h-24 w-24 opacity-90 drop-shadow-seal"
                />

                <h2 className="mx-auto mt-9 max-w-2xl text-balance font-display text-[clamp(1.5rem,3vw,2.1rem)] leading-snug tracking-tight text-ink">
                  The first cohort of YellowZone Schools is being certified now.
                </h2>

                <p className="mx-auto mt-6 max-w-prose leading-relaxed text-ink-soft">
                  The register opens as soon as the first awards are made. Schools
                  in assessment today will be the first entries in it — and the
                  first their parents can look up.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  <Button href="/contact">Talk to us</Button>
                  <Button href="/criteria" variant="secondary">
                    Review the criteria
                  </Button>
                </div>
              </div>
            </Reveal>
          ) : (
            <>
              <Reveal>
                <SectionHeading
                  eyebrow="Register"
                  title={`${SCHOOLS.length} certified schools`}
                />
              </Reveal>

              <Reveal
                variant="stagger"
                as="ul"
                className="mt-12 grid gap-px bg-rule md:grid-cols-2 lg:grid-cols-3"
              >
                {SCHOOLS.map((school) => {
                  const tier = TIERS.find((t) => t.key === school.tier);
                  return (
                    <li key={school.name} className="bg-paper p-8">
                      {tier ? (
                        <Image
                          src={tier.seal}
                          alt={`${tier.name} level`}
                          width={64}
                          height={64}
                          className="h-14 w-14 drop-shadow-seal"
                        />
                      ) : null}
                      <h3 className="mt-6 font-display text-[1.25rem] leading-snug tracking-tight text-ink">
                        {school.name}
                      </h3>
                      <p className="mt-2.5 text-[0.85rem] text-ink-soft">
                        {school.city}, {school.state} · {school.board}
                      </p>
                      <dl className="mt-6 space-y-1.5 font-mono text-[0.63rem] uppercase tracking-[0.1em] text-ink-mute">
                        <div className="flex justify-between gap-4">
                          <dt>Certified</dt>
                          <dd className="text-ink">{school.certified}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt>Valid to</dt>
                          <dd className="text-ink">{school.validTo}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt>Recommended met</dt>
                          <dd className="text-ink">
                            {school.recommendedMet} of {RECOMMENDED_COUNT}
                          </dd>
                        </div>
                      </dl>
                    </li>
                  );
                })}
              </Reveal>
            </>
          )}
        </div>
      </section>

      {/* How to read the register */}
      <section className="bg-parchment py-section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Reading the register"
              title="What a listing tells you"
              lede={
                <p>
                  A listing is a statement about structure and practice, not
                  about outcomes. It says the school has a qualified counsellor,
                  an approved policy, measurement in place, trained staff, a
                  stress-aware academic calendar and an annual mental health
                  project — and that each of those was evidenced and checked.
                </p>
              }
            />
          </Reveal>

          <Reveal variant="stagger" as="ul" className="mt-12 grid gap-px bg-rule sm:grid-cols-2">
            <li className="bg-paper p-8">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-gold-ink">
                What it means
              </p>
              <p className="mt-4 text-[0.9rem] leading-relaxed text-ink-soft">
                The school met a defined bar on a defined date, verified by
                document review, platform data, interviews and a school visit.
              </p>
            </li>
            <li className="bg-paper p-8">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-gold-ink">
                What it does not mean
              </p>
              <p className="mt-4 text-[0.9rem] leading-relaxed text-ink-soft">
                YellowZone certifies structure and practice. It does not treat
                or diagnose, and it does not promise mental health outcomes for
                any individual student.
              </p>
            </li>
          </Reveal>
        </div>
      </section>
    </>
  );
}
