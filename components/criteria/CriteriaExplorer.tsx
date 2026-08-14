'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PILLARS, type Weight } from '@/lib/criteria';

type PillarFilter = 'all' | 'A' | 'B' | 'C' | 'D' | 'E';
type WeightFilter = 'all' | Weight;

const WEIGHTS: { key: WeightFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'Mandatory', label: 'Mandatory' },
  { key: 'Recommended', label: 'Recommended' },
];

/**
 * The criteria library. Structured after the LEED credit library: filter by
 * category and by whether the item is a prerequisite or a scoring credit,
 * then open any single criterion to read its requirement, the evidence the
 * school submits, and how that evidence is verified.
 */
export default function CriteriaExplorer() {
  const [pillar, setPillar] = useState<PillarFilter>('all');
  const [weight, setWeight] = useState<WeightFilter>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const rows = useMemo(() => {
    return PILLARS.flatMap((p) =>
      p.criteria
        .filter(() => pillar === 'all' || p.letter === pillar)
        .filter((c) => weight === 'all' || c.weight === weight)
        .map((c) => ({ pillar: p, criterion: c }))
    );
  }, [pillar, weight]);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-col gap-5 border-y border-rule py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-mute">
            Pillar
          </span>
          {(['all', 'A', 'B', 'C', 'D', 'E'] as PillarFilter[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setPillar(key)}
              aria-pressed={pillar === key}
              className={`border px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] transition-colors ${
                pillar === key
                  ? 'border-gold-ink bg-gold-ink text-paper'
                  : 'border-rule text-ink-soft hover:border-gold'
              }`}
            >
              {key === 'all' ? 'All' : key}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-mute">
            Weight
          </span>
          {WEIGHTS.map((w) => (
            <button
              key={w.key}
              type="button"
              onClick={() => setWeight(w.key)}
              aria-pressed={weight === w.key}
              className={`border px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] transition-colors ${
                weight === w.key
                  ? 'border-gold-ink bg-gold-ink text-paper'
                  : 'border-rule text-ink-soft hover:border-gold'
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>

      <p className="py-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-mute">
        {rows.length} {rows.length === 1 ? 'criterion' : 'criteria'} shown
      </p>

      {/* Criteria rows */}
      <ul className="border-t border-rule">
        {rows.map(({ pillar: p, criterion: c }) => {
          const isOpen = openId === c.id;
          return (
            <li key={c.id} className="border-b border-rule">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : c.id)}
                aria-expanded={isOpen}
                className="group flex w-full items-start gap-5 py-6 text-left transition-colors hover:bg-parchment/60"
              >
                <span className="mt-0.5 w-9 shrink-0 font-mono text-[0.78rem] text-gold-ink">
                  {c.id}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="font-display text-[1.15rem] leading-snug tracking-tight text-ink">
                      {c.title}
                    </span>
                    <span
                      className={`stamp ${
                        c.weight === 'Mandatory'
                          ? 'stamp-mandatory'
                          : 'stamp-recommended'
                      }`}
                    >
                      {c.weight}
                    </span>
                  </span>
                  <span className="mt-2 block text-[0.85rem] leading-relaxed text-ink-soft">
                    Pillar {p.letter} · {p.name}
                  </span>
                </span>

                <span
                  aria-hidden
                  className={`mt-1 shrink-0 font-mono text-lg text-gold transition-transform duration-300 ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-8 border-l-2 border-gold/50 bg-parchment/50 px-6 py-7 sm:ml-14 sm:grid-cols-3">
                      <Field label="Requirement" body={c.requirement} />
                      <Field label="Evidence" body={c.evidence} />
                      <Field label="Verified by" body={c.verification} />
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      {rows.length === 0 ? (
        <p className="border-b border-rule py-14 text-center text-ink-soft">
          No criteria match this combination. Clear a filter to see the rest of
          the standard.
        </p>
      ) : null}
    </div>
  );
}

function Field({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-gold-ink">
        {label}
      </p>
      <p className="mt-2.5 text-[0.87rem] leading-relaxed text-ink-soft">
        {body}
      </p>
    </div>
  );
}
