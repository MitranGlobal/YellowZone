'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useLightbox } from '@/store/lightbox';

export default function Lightbox() {
  const { open, items, index, close, next, prev } = useLightbox();
  const item = items[index];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, next, prev]);

  return (
    <AnimatePresence>
      {open && item ? (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/92 px-5 py-10 backdrop-blur-sm"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 border border-paper/25 px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-paper/80 transition-colors hover:border-gold hover:text-gold-light"
          >
            Close ✕
          </button>

          <motion.figure
            key={item.src}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex max-w-lg flex-col items-center text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[min(62vh,26rem)] w-[min(80vw,26rem)]">
              <Image src={item.src} alt={item.title} fill className="object-contain" sizes="26rem" />
            </div>
            <figcaption className="mt-7">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-gold-light">
                {item.title}
              </p>
              {item.caption ? (
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-paper/70">
                  {item.caption}
                </p>
              ) : null}
            </figcaption>

            {items.length > 1 ? (
              <div className="mt-8 flex items-center gap-5">
                <button
                  onClick={prev}
                  aria-label="Previous seal"
                  className="border border-paper/25 px-3 py-2 font-mono text-[0.65rem] text-paper/75 transition-colors hover:border-gold hover:text-gold-light"
                >
                  ←
                </button>
                <span className="font-mono text-[0.65rem] tracking-[0.2em] text-paper/50">
                  {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
                <button
                  onClick={next}
                  aria-label="Next seal"
                  className="border border-paper/25 px-3 py-2 font-mono text-[0.65rem] text-paper/75 transition-colors hover:border-gold hover:text-gold-light"
                >
                  →
                </button>
              </div>
            ) : null}
          </motion.figure>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
