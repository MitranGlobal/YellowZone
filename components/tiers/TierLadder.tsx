'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { TIERS } from '@/lib/tiers';
import { useLightbox } from '@/store/lightbox';

const ITEMS = TIERS.map((t) => ({
  src: t.seal,
  title: `YellowZone ${t.name}`,
  caption: t.summary,
}));

/**
 * The certification ladder. Every tier clears the same Mandatory gate; the
 * award level is then set by how many Recommended criteria the school also
 * evidences — the same two-stage shape LEED uses, where prerequisites are
 * pass/fail and points alone decide the level.
 */
export default function TierLadder() {
  const openAt = useLightbox((s) => s.openAt);

  return (
    <div>
      {/* Rail: reads left-to-right as an ascending scale. */}
      <div
        aria-hidden
        className="relative mb-12 hidden h-px w-full bg-rule-strong lg:block"
      >
        <div className="absolute inset-y-0 left-0 w-full bg-gold-rule opacity-70" />
      </div>

      <ul className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-5">
        {TIERS.map((tier, i) => (
          <motion.li
            key={tier.key}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col bg-paper p-7 lg:p-6"
          >
            <button
              type="button"
              onClick={() => openAt(ITEMS, i)}
              className="mx-auto block transition-transform duration-500 group-hover:-translate-y-1"
              aria-label={`View the YellowZone ${tier.name} seal`}
            >
              <Image
                src={tier.seal}
                alt={`YellowZone ${tier.name} certification seal`}
                width={132}
                height={132}
                className="h-28 w-28 drop-shadow-seal lg:h-24 lg:w-24"
              />
            </button>

            <p
              className="mt-6 text-center font-display text-[1.35rem] tracking-tight"
              style={{ color: tier.ink }}
            >
              {tier.name}
            </p>

            <p className="mt-2.5 text-center font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.11em] text-ink-mute">
              {tier.band}
            </p>

            <span
              aria-hidden
              className="mx-auto mt-5 block h-px w-10"
              style={{ backgroundColor: tier.swatch }}
            />

            <p className="mt-5 text-center text-[0.82rem] leading-relaxed text-ink-soft">
              {tier.summary}
            </p>
          </motion.li>
        ))}
      </ul>

      <p className="mt-8 max-w-prose font-mono text-[0.66rem] leading-relaxed tracking-[0.04em] text-ink-mute">
        All five levels require the full Mandatory gate — 8 of 8 criteria met.
        A school that misses any Mandatory criterion is not certified at any
        level.
      </p>
    </div>
  );
}
