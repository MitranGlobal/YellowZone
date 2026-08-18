'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Mobile-only conversion rail. Held back until the reader is past the hero so
 * it never competes with the primary call to action, and suppressed on the
 * contact page where it would point at the page you are already on.
 */
export default function StickyCta() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const suppressed = pathname === '/contact';

  return (
    <AnimatePresence>
      {show && !suppressed ? (
        <motion.div
          initial={{ y: 72, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 72, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-paper/95 p-3 backdrop-blur-md sm:hidden"
          style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
        >
          <Link
            href="/contact"
            className="flex w-full items-center justify-center bg-ink px-6 py-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-paper"
          >
            Talk to Us
          </Link>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
