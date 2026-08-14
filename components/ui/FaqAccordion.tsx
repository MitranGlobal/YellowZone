'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FAQS } from '@/lib/site';

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="border-t border-rule">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q} className="border-b border-rule">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-gold-ink"
              >
                <span className="font-display text-[1.1rem] leading-snug tracking-tight text-ink">
                  {item.q}
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
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.33, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-prose pb-7 pr-10 text-[0.92rem] leading-relaxed text-ink-soft">
                    {item.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
