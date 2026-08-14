import { STAGES } from '@/lib/site';

/**
 * The seven stages, numbered. Numbering earns its place here: the stages are
 * genuinely sequential and each one gates the next, so order is information
 * the reader needs rather than decoration.
 */
export default function ProcessTimeline() {
  return (
    <ol className="border-t border-rule">
      {STAGES.map((stage) => (
        <li
          key={stage.n}
          className="grid gap-x-8 gap-y-3 border-b border-rule py-8 sm:grid-cols-[3rem_1fr_9rem] sm:py-9"
        >
          <span className="font-mono text-[0.78rem] text-gold-ink">
            {String(stage.n).padStart(2, '0')}
          </span>

          <div className="min-w-0">
            <h3 className="font-display text-[1.28rem] leading-snug tracking-tight text-ink">
              {stage.title}
            </h3>
            <p className="mt-3 max-w-prose text-[0.9rem] leading-relaxed text-ink-soft">
              {stage.body}
            </p>
          </div>

          <span className="font-mono text-[0.65rem] uppercase leading-relaxed tracking-[0.12em] text-ink-mute sm:text-right">
            {stage.window}
          </span>
        </li>
      ))}
    </ol>
  );
}
