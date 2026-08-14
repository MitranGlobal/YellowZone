'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ALL_CRITERIA } from '@/lib/criteria';
import { tierFor } from '@/lib/tiers';

type Answer = 'yes' | 'partly' | 'no';

const MANDATORY_TOTAL = ALL_CRITERIA.filter((c) => c.weight === 'Mandatory').length;

/**
 * Non-binding self-assessment. Walks the same thirteen criteria the
 * assessment team uses and projects an indicative level, so a school can see
 * where it stands before committing to an application. Answers stay in the
 * browser — nothing is submitted.
 */
export default function SelfAssessment() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [done, setDone] = useState(false);

  const total = ALL_CRITERIA.length;
  const current = ALL_CRITERIA[step];

  const result = useMemo(() => {
    const met = (id: string) => answers[id] === 'yes';
    const mandatoryMet = ALL_CRITERIA.filter(
      (c) => c.weight === 'Mandatory' && met(c.id)
    ).length;
    const recommendedMet = ALL_CRITERIA.filter(
      (c) => c.weight === 'Recommended' && met(c.id)
    ).length;
    const gaps = ALL_CRITERIA.filter((c) => answers[c.id] !== 'yes');
    return {
      mandatoryMet,
      recommendedMet,
      gaps,
      tier: tierFor(recommendedMet, mandatoryMet, MANDATORY_TOTAL),
    };
  }, [answers]);

  function answer(value: Answer) {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
    if (step + 1 >= total) setDone(true);
    else setStep(step + 1);
  }

  function reset() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  return (
    <div className="border border-rule bg-paper">
      {/* Progress */}
      <div className="flex items-center justify-between border-b border-rule px-6 py-4 sm:px-8">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-mute">
          {done ? 'Result' : `Criterion ${step + 1} of ${total}`}
        </p>
        {!done ? (
          <div className="ml-6 h-px flex-1 bg-rule">
            <motion.div
              className="h-px bg-gold"
              initial={false}
              animate={{ scaleX: (step + 1) / total }}
              style={{ transformOrigin: 'left' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        ) : null}
      </div>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 py-10 sm:px-8 sm:py-12"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.78rem] text-gold-ink">
                {current.id}
              </span>
              <span
                className={`stamp ${
                  current.weight === 'Mandatory'
                    ? 'stamp-mandatory'
                    : 'stamp-recommended'
                }`}
              >
                {current.weight}
              </span>
            </div>

            <h3 className="mt-5 max-w-2xl font-display text-heading tracking-tight text-ink">
              {current.prompt}
            </h3>

            <p className="mt-4 max-w-prose text-[0.9rem] leading-relaxed text-ink-soft">
              {current.requirement}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              {(
                [
                  ['yes', 'Yes, with evidence'],
                  ['partly', 'Partly'],
                  ['no', 'Not yet'],
                ] as [Answer, string][]
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => answer(value)}
                  className="border border-rule px-5 py-3.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink transition-colors hover:border-gold hover:bg-gold-pale/40"
                >
                  {label}
                </button>
              ))}
            </div>

            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="mt-8 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-mute transition-colors hover:text-gold-ink"
              >
                ← Back
              </button>
            ) : null}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 py-10 sm:px-8 sm:py-12"
          >
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
              {result.tier ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="shrink-0"
                >
                  <Image
                    src={result.tier.seal}
                    alt={`Indicative level: ${result.tier.name}`}
                    width={128}
                    height={128}
                    className="h-28 w-28 drop-shadow-seal"
                  />
                </motion.div>
              ) : null}

              <div className="min-w-0">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-gold-ink">
                  Indicative result — not a certification decision
                </p>

                <h3 className="mt-4 font-display text-title tracking-tight text-ink">
                  {result.tier
                    ? `On this evidence, your school tracks to ${result.tier.name}.`
                    : 'Your school does not yet clear the Mandatory gate.'}
                </h3>

                <p className="mt-5 max-w-prose leading-relaxed text-ink-soft">
                  {result.tier
                    ? 'Every Mandatory criterion is answered met. The level above reflects how many Recommended criteria you also evidenced. The assessment team verifies all of it independently.'
                    : `You answered ${result.mandatoryMet} of ${MANDATORY_TOTAL} Mandatory criteria as met. Any unmet Mandatory criterion blocks certification at every level — these are the ones to close first.`}
                </p>

                <dl className="mt-8 grid grid-cols-2 gap-px border border-rule bg-rule sm:max-w-md">
                  <Stat
                    label="Mandatory met"
                    value={`${result.mandatoryMet} / ${MANDATORY_TOTAL}`}
                  />
                  <Stat
                    label="Recommended met"
                    value={`${result.recommendedMet} / ${total - MANDATORY_TOTAL}`}
                  />
                </dl>

                {result.gaps.length ? (
                  <div className="mt-9">
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-gold-ink">
                      Where evidence is missing
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {result.gaps.map((g) => (
                        <li key={g.id} className="flex gap-3.5 text-[0.87rem]">
                          <span className="w-8 shrink-0 font-mono text-gold-ink">
                            {g.id}
                          </span>
                          <span className="text-ink-soft">
                            {g.title}
                            {g.weight === 'Mandatory' ? (
                              <span className="ml-2 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-gold-ink">
                                Mandatory
                              </span>
                            ) : null}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="mt-9 text-[0.9rem] leading-relaxed text-ink-soft">
                    You answered every criterion as met with evidence. Bring that
                    documentation to an application and the assessment team will
                    verify it.
                  </p>
                )}

                <div className="mt-10 flex flex-wrap gap-3">
                  <Link
                    href="/apply"
                    className="inline-flex items-center bg-ink px-6 py-3.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-gold-ink"
                  >
                    Apply for Certification
                  </Link>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center border border-rule px-6 py-3.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink transition-colors hover:border-gold"
                  >
                    Start again
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-paper px-5 py-4">
      <dt className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-ink-mute">
        {label}
      </dt>
      <dd className="mt-2 font-display text-2xl tracking-tight text-ink">
        {value}
      </dd>
    </div>
  );
}
