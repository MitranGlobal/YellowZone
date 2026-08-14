import Eyebrow from './Eyebrow';

interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Interior page masthead. Deliberately quieter than the home hero — no
 * canvas, no seal — so the standard's own pages read as reference material.
 */
export default function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: PageHeroProps) {
  return (
    <section className="border-b border-rule bg-parchment">
      <div className="shell py-[clamp(3.5rem,8vw,6.5rem)]">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="mt-6 max-w-4xl text-title text-balance text-ink">
          {title}
        </h1>
        {lede ? (
          <div className="prose-standard mt-7 max-w-prose text-pretty">
            {lede}
          </div>
        ) : null}
        {children ? <div className="mt-9">{children}</div> : null}
      </div>
    </section>
  );
}
