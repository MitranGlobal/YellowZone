'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Variant = 'up' | 'fade' | 'rule' | 'stagger';

interface RevealProps {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;
  /** Selector for children animated in sequence when variant is "stagger". */
  selector?: string;
  className?: string;
  as?: 'div' | 'section' | 'ul' | 'ol' | 'header';
}

/**
 * Scroll-reveal primitive. Every entrance animation on the site routes
 * through here so timing stays consistent and reduced-motion is honoured
 * in exactly one place.
 */
export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  selector = ':scope > *',
  className,
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0, clearProps: 'all' });
      return;
    }

    const ctx = gsap.context(() => {
      const common = {
        scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        ease: 'power3.out',
        delay,
      };

      if (variant === 'stagger') {
        const items = gsap.utils.toArray<HTMLElement>(selector, el);
        gsap.fromTo(
          items,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.085, ...common }
        );
        return;
      }

      if (variant === 'rule') {
        gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.05, ...common });
        return;
      }

      if (variant === 'fade') {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.95, ...common });
        return;
      }

      gsap.fromTo(el, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.85, ...common });
    }, el);

    return () => ctx.revert();
  }, [variant, delay, selector]);

  return (
    // @ts-expect-error -- polymorphic ref across the allowed tag union
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
