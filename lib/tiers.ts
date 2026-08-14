export type TierKey = 'classic' | 'bronze' | 'silver' | 'gold' | 'platinum';

export interface Tier {
  key: TierKey;
  name: string;
  /** Recommended criteria met, on top of all 8 Mandatory. */
  min: number;
  max: number;
  band: string;
  summary: string;
  seal: string;
  /** Swatch used for the ladder rail and tier chips. */
  swatch: string;
  ink: string;
}

/**
 * All five tiers require the full Mandatory gate (8 of 8).
 * Tier is then set by how many of the 5 Recommended criteria are met —
 * the same shape LEED uses, where a project must clear prerequisites
 * before points decide Certified / Silver / Gold / Platinum.
 *
 * [OPEN ITEM] Band boundaries need operational sign-off. See README.
 */
export const TIERS: Tier[] = [
  {
    key: 'classic',
    name: 'Certified',
    min: 0,
    max: 1,
    band: '8 Mandatory · 0–1 Recommended',
    summary:
      'The full Mandatory gate is met. The school has a counsellor, an approved policy, measurement in place, trained teachers, stress-aware academic policy and an annual mental health project.',
    seal: '/logos/yellow-zone-classic.svg',
    swatch: '#0C3A66',
    ink: '#0C3A66',
  },
  {
    key: 'bronze',
    name: 'Bronze',
    min: 2,
    max: 2,
    band: '8 Mandatory · 2 Recommended',
    summary:
      'Beyond the gate, the school has begun building structures that outlast individuals — a committee, a peer program or a referral pathway.',
    seal: '/logos/yellow-zone-bronze.svg',
    swatch: '#A9713C',
    ink: '#6B441F',
  },
  {
    key: 'silver',
    name: 'Silver',
    min: 3,
    max: 3,
    band: '8 Mandatory · 3 Recommended',
    summary:
      'Wellness practice is distributed across governance, staff development and student voice rather than resting on one role.',
    seal: '/logos/yellow-zone-silver.svg',
    swatch: '#8C9BA6',
    ink: '#4A5763',
  },
  {
    key: 'gold',
    name: 'Gold',
    min: 4,
    max: 4,
    band: '8 Mandatory · 4 Recommended',
    summary:
      'Emotional wellness is embedded across the institution and extends outward to parents and the wider community.',
    seal: '/logos/yellow-zone-gold.svg',
    swatch: '#C08A1E',
    ink: '#5E4205',
  },
  {
    key: 'platinum',
    name: 'Platinum',
    min: 5,
    max: 5,
    band: 'All 13 criteria',
    summary:
      'Every criterion met. These are the schools studied and documented as Positivity Hubs, whose practices become the reference for others.',
    seal: '/logos/yellow-zone-platinum.svg',
    swatch: '#6E7B87',
    ink: '#2F3A44',
  },
];

export function tierFor(recommendedMet: number, mandatoryMet: number, mandatoryTotal: number): Tier | null {
  if (mandatoryMet < mandatoryTotal) return null;
  return (
    TIERS.find((t) => recommendedMet >= t.min && recommendedMet <= t.max) ?? TIERS[0]
  );
}

export function tierByKey(key: TierKey): Tier {
  return TIERS.find((t) => t.key === key)!;
}
