'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * [PLACEHOLDER CONTENT — replace before launch]
 *
 * These quotes are written to show the intended voice and length. They are
 * not attributed to real schools or named individuals, and must be swapped
 * for signed, permissioned quotes from the first certified cohort before this
 * page goes live.
 */
const QUOTES = [
  {
    quote:
      'We had a counsellor, a wellness week and good intentions. What we did not have was any way to show a parent that it added up to something. The criteria gave us the shape we were missing.',
    role: 'Principal',
    context: 'CBSE school · placeholder attribution',
  },
  {
    quote:
      'The educator assessment was the part we underestimated. It told us more about our staff room than three years of appraisals had.',
    role: 'Head of Wellbeing',
    context: 'Senior secondary school · placeholder attribution',
  },
  {
    quote:
      'Being deferred on one criterion was more useful than passing everything would have been. We knew exactly what to fix, and we had thirty days to do it.',
    role: 'School Coordinator',
    context: 'ICSE school · placeholder attribution',
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setIndex((next + QUOTES.length) % QUOTES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % QUOTES.length), 7000);
    return () => clearInterval(id);
  }, [paused]);

  const item = QUOTES[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="min-h-[15rem] sm:min-h-[13rem]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <span aria-hidden className="block h-px w-14 bg-gold" />
            <blockquote className="mt-7 max-w-3xl font-display text-[clamp(1.3rem,2.6vw,1.85rem)] leading-[1.42] tracking-tight text-ink">
              {item.quote}
            </blockquote>
            <figcaption className="mt-7 font-mono text-[0.63rem] uppercase tracking-[0.16em] text-ink-mute">
              {item.role}
              <span className="mx-2.5 text-gold">·</span>
              {item.context}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-9 flex items-center gap-5">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous quote"
          className="border border-rule px-3.5 py-2 font-mono text-[0.7rem] text-ink-soft transition-colors hover:border-gold hover:text-gold-ink"
        >
          ←
        </button>

        <div className="flex gap-2" role="tablist" aria-label="Quotes">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Quote ${i + 1}`}
              onClick={() => go(i)}
              className={`h-px w-9 transition-colors ${
                i === index ? 'bg-gold' : 'bg-rule hover:bg-rule-strong'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next quote"
          className="border border-rule px-3.5 py-2 font-mono text-[0.7rem] text-ink-soft transition-colors hover:border-gold hover:text-gold-ink"
        >
          →
        </button>
      </div>
    </div>
  );
}
