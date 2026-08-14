import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <section className="shell flex min-h-[62vh] flex-col items-center justify-center py-24 text-center">
      <Image
        src="/logos/yellow-zone-classic.svg"
        alt=""
        width={96}
        height={96}
        className="h-20 w-20 opacity-80 drop-shadow-seal"
      />
      <p className="mt-9 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-gold-ink">
        Page not found
      </p>
      <h1 className="mt-5 max-w-xl text-balance font-display text-[clamp(1.6rem,4vw,2.4rem)] leading-snug tracking-tight text-ink">
        That page isn’t part of the standard.
      </h1>
      <p className="mx-auto mt-5 max-w-prose leading-relaxed text-ink-soft">
        The link may be out of date. The criteria, the process and the register
        are all reachable from here.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center bg-ink px-6 py-3.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-gold-ink"
        >
          Back to home
        </Link>
        <Link
          href="/criteria"
          className="inline-flex items-center border border-gold px-6 py-3.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-gold-ink transition-colors hover:bg-gold-pale/40"
        >
          See the criteria
        </Link>
      </div>
    </section>
  );
}
