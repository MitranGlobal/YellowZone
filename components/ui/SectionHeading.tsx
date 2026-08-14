import Eyebrow from './Eyebrow';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  return (
    <header
      className={`${align === 'center' ? 'mx-auto max-w-prose text-center' : 'max-w-3xl'} ${className}`}
    >
      {eyebrow ? (
        <Eyebrow className={align === 'center' ? 'justify-center' : ''}>{eyebrow}</Eyebrow>
      ) : null}
      <h2 className="mt-5 text-title text-balance text-ink">{title}</h2>
      {lede ? <div className="prose-standard mt-6 text-pretty">{lede}</div> : null}
    </header>
  );
}
