import Link from 'next/link';
import Image from 'next/image';
import { FOOTER, SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="border-t border-rule bg-parchment">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_2fr]">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-3.5">
              <Image
                src="/logos/yellow-zone-classic.svg"
                alt=""
                width={52}
                height={52}
                className="h-12 w-12"
              />
              <div className="leading-none">
                <p className="font-display text-xl tracking-tight text-ink">
                  YellowZone
                </p>
                <p className="mt-1.5 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-ink-mute">
                  {SITE.tagline}
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-soft">
              A school-level accreditation for emotional wellness. Thirteen
              criteria across five pillars, evidenced by the school and verified
              independently.
            </p>

            <Link
              href={`mailto:${SITE.email}`}
              className="link-underline mt-6 inline-block font-mono text-[0.72rem] tracking-[0.06em]"
            >
              {SITE.email}
            </Link>
          </div>

          {/* Link columns */}
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {FOOTER.map((col) => (
              <div key={col.heading}>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-gold-ink">
                  {col.heading}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[0.83rem] leading-snug text-ink-soft transition-colors hover:text-gold-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Parent brand */}
        <div className="mt-14 flex flex-col gap-6 border-t border-rule-strong/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-ink-mute">
              A programme by
            </span>
            <Image
              src="/logos/mitran-global.png"
              alt="MiTran Global"
              width={168}
              height={34}
              className="h-8 w-auto"
            />
          </div>

          <p className="font-mono text-[0.62rem] leading-relaxed tracking-[0.04em] text-ink-mute">
            YellowZone is a certification standard by MiTran Global. ©{' '}
            {new Date().getFullYear()} MiTran Global. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
