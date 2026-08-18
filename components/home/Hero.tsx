'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';
import { MANDATORY_COUNT, RECOMMENDED_COUNT } from '@/lib/criteria';
import { TIERS } from '@/lib/tiers';

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-rule">
      <HeroScene />

      <div className="shell relative z-10 grid items-center gap-14 py-24 lg:grid-cols-[1.35fr_1fr] lg:gap-20 lg:py-32">
        <div>
          <p className="eyebrow flex items-center gap-3 animate-fade-up">
            <span aria-hidden className="block h-px w-8 bg-gold" />
            The Emotional Wellness Standard for Schools
          </p>

          <h1
            className="mt-7 text-display text-balance text-ink animate-fade-up"
            style={{ animationDelay: '90ms' }}
          >
            Become a YellowZone School.
          </h1>

          <p
            className="mt-8 max-w-[46ch] text-lede text-pretty text-ink-soft animate-fade-up"
            style={{ animationDelay: '180ms' }}
          >
            A school-level accreditation for emotional wellness — recognition
            that your school provides a strong, structured and measurable
            environment for the emotional wellbeing of its students and staff.
          </p>

          <div
            className="mt-11 flex flex-wrap gap-3 animate-fade-up"
            style={{ animationDelay: '270ms' }}
          >
            <Button href="/contact">Talk to Us</Button>
            <Button href="/criteria" variant="secondary">
              See the Criteria
            </Button>
          </div>
        </div>

        {/* The seal is the thesis of the page: this is a mark you earn. */}
        <div className="relative hidden justify-self-center lg:block">
          <div
            aria-hidden
            className="absolute -inset-14 rounded-full bg-[radial-gradient(circle,rgba(246,232,194,0.55)_0%,transparent_68%)]"
          />
          <Image
            src="/logos/yellow-zone-classic.svg"
            alt="The YellowZone certification seal"
            width={340}
            height={340}
            priority
            className="relative h-auto w-[19rem] animate-fade-up drop-shadow-seal xl:w-[21rem]"
            style={{ animationDelay: '240ms' }}
          />
        </div>
      </div>

      {/* What the standard is made of, stated plainly. */}
      <div className="relative z-10 border-t border-rule bg-paper/85 backdrop-blur-sm">
        <div className="shell grid divide-y divide-rule py-3 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            ['5 Pillars', 'governance, measurement, capability, academics, culture'],
            [
              `${MANDATORY_COUNT + RECOMMENDED_COUNT} Criteria`,
              `${MANDATORY_COUNT} mandatory, ${RECOMMENDED_COUNT} recommended`,
            ],
            [
              `${TIERS.length} Levels`,
              TIERS.map((t) => t.name).join(', ').toLowerCase(),
            ],
          ].map(([mark, claim]) => (
            <p
              key={mark}
              className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 py-4 text-ink sm:px-6 sm:first:pl-0 sm:last:pr-0"
            >
              <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-gold-ink">
                {mark}
              </span>
              <span className="text-[0.87rem] text-ink-soft">{claim}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
