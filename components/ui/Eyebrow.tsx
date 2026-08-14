interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

/** Standing section marker: a short gold tick followed by tracked mono caps. */
export default function Eyebrow({ children, className = '' }: EyebrowProps) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      <span aria-hidden className="block h-px w-8 bg-gold" />
      {children}
    </p>
  );
}
