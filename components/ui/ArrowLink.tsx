import Link from 'next/link';

export default function ArrowLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-gold-ink transition-colors hover:text-ink ${className}`}
    >
      {children}
      <span
        aria-hidden
        className="inline-block transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
