import { RECOMMENDED_COUNT } from './criteria';

export type TierKey = 'classic' | 'bronze' | 'silver' | 'gold' | 'platinum';

export interface TierDef {
  key: TierKey;
  name: string;
  /**
   * Whether this level is currently awarded.
   *
   * ─── TO RE-ENABLE BRONZE / PLATINUM ───
   * Flip `enabled` to true below. Nothing else needs to change: the bands,
   * the ladder, the self-assessment result and every count on the site are
   * derived from whichever levels are enabled. The seal artwork for all five
   * levels stays in `public/logos/` either way.
   */
  enabled: boolean;
  /**
   * Lowest number of Recommended criteria (of RECOMMENDED_COUNT) at which
   * this level is awarded, on top of the full Mandatory gate.
   *
   * These thresholds are deliberately left at their five-level values so the
   * ladder snaps back to the original design when Bronze and Platinum are
   * switched on. With only Classic / Silver / Gold live, the disabled levels'
   * ranges are absorbed by the level below them.
   */
  min: number;
  summary: string;
  seal: string;
  /** Swatch used for the ladder rail and tier chips. */
  swatch: string;
  ink: string;
}

const DEFS: TierDef[] = [
  {
    key: 'classic',
    name: 'Certified',
    enabled: true,
    min: 0,
    summary:
      'The full Mandatory gate is met. The school has a counsellor, an approved policy, measurement in place, trained teachers, stress-aware academic policy and an annual mental health project.',
    seal: '/logos/yellow-zone-classic.svg',
    swatch: '#0C3A66',
    ink: '#0C3A66',
  },
  {
    key: 'bronze',
    name: 'Bronze',
    enabled: false, // held back — see TierDef.enabled
    min: 2,
    summary:
      'Beyond the gate, the school has begun building structures that outlast individuals — a committee, a peer program or a referral pathway.',
    seal: '/logos/yellow-zone-bronze.svg',
    swatch: '#A9713C',
    ink: '#6B441F',
  },
  {
    key: 'silver',
    name: 'Silver',
    enabled: true,
    min: 3,
    summary:
      'Wellness practice is distributed across governance, staff development and student voice rather than resting on any one role.',
    seal: '/logos/yellow-zone-silver.svg',
    swatch: '#8C9BA6',
    ink: '#4A5763',
  },
  {
    key: 'gold',
    name: 'Gold',
    enabled: true,
    min: 4,
    summary:
      'Emotional wellness is embedded across the institution and extends outward to parents and the wider community. These are the schools documented as Positivity Hubs, whose practices become the reference for others.',
    seal: '/logos/yellow-zone-gold.svg',
    swatch: '#C08A1E',
    ink: '#5E4205',
  },
  {
    key: 'platinum',
    name: 'Platinum',
    enabled: false, // held back — see TierDef.enabled
    min: 5,
    summary:
      'Every criterion met, across all five pillars, with no gaps anywhere in the standard.',
    seal: '/logos/yellow-zone-platinum.svg',
    swatch: '#6E7B87',
    ink: '#2F3A44',
  },
];

export interface Tier extends TierDef {
  /** Inclusive upper bound, derived from the next enabled level. */
  max: number;
  /** Human-readable band, e.g. "8 Mandatory · 3 Recommended". */
  band: string;
}

function describe(min: number, max: number, mandatoryLabel: string): string {
  if (max >= RECOMMENDED_COUNT && min === 0) return 'All criteria';
  if (min === max) return `${mandatoryLabel} · ${min} Recommended`;
  if (max >= RECOMMENDED_COUNT) {
    return `${mandatoryLabel} · ${min}+ Recommended`;
  }
  return `${mandatoryLabel} · ${min}–${max} Recommended`;
}

/**
 * The levels currently awarded, lowest first, with bands computed so they
 * tile the full 0–RECOMMENDED_COUNT range without gaps.
 */
export const TIERS: Tier[] = (() => {
  const live = DEFS.filter((d) => d.enabled).sort((a, b) => a.min - b.min);
  const mandatoryLabel = '8 Mandatory';

  return live.map((def, i) => {
    const next = live[i + 1];
    const max = next ? next.min - 1 : RECOMMENDED_COUNT;
    return { ...def, max, band: describe(def.min, max, mandatoryLabel) };
  });
})();

/** Every level including those held back — for admin views and docs. */
export const ALL_TIER_DEFS = DEFS;

export const HIDDEN_TIERS = DEFS.filter((d) => !d.enabled);

export function tierFor(
  recommendedMet: number,
  mandatoryMet: number,
  mandatoryTotal: number
): Tier | null {
  if (mandatoryMet < mandatoryTotal) return null;
  // Highest live level whose threshold the school has reached.
  const reached = TIERS.filter((t) => recommendedMet >= t.min);
  return reached.length ? reached[reached.length - 1] : TIERS[0];
}

export function tierByKey(key: TierKey): Tier | undefined {
  return TIERS.find((t) => t.key === key);
}
