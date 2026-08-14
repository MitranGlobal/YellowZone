import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'quiet';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

const base =
  'inline-flex items-center justify-center gap-2 px-6 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] transition-all duration-300';

const variants: Record<Variant, string> = {
  primary:
    'bg-ink text-paper hover:bg-gold-ink border border-ink hover:border-gold-ink',
  secondary:
    'border border-gold text-gold-ink bg-paper hover:bg-gold-pale/50',
  quiet: 'border border-rule text-ink hover:border-gold bg-paper',
};

export default function Button({
  href,
  children,
  variant = 'primary',
  className = '',
}: ButtonProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
