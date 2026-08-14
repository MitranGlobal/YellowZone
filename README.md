# YellowZone

**The Emotional Wellness Standard for Schools** — a certification site for MiTran Global.

Structured after [LEED](https://www.usgbc.org/leed): a published standard with
named criteria, an evidence-and-verification process, tiered levels of award,
and a public register of certified institutions.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

Deploys to Vercel with no configuration — push the repo and import it.

> **Note on fonts.** Typefaces load through `next/font/google`, which fetches at
> build time. The build therefore needs outbound access to
> `fonts.googleapis.com`. Vercel and normal local development have this. If you
> build inside a locked-down CI network, either allowlist that host or switch
> `app/layout.tsx` to `next/font/local` with self-hosted files.

---

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14 (App Router), TypeScript |
| Styling | Tailwind CSS v3 — tokens in `tailwind.config.ts` |
| Hero background | Three.js + React Three Fiber + Drei |
| Animation | Framer Motion (nav, drawer, testimonials, lightbox, quiz) |
| Scroll reveals | GSAP + ScrollTrigger (`components/ui/Reveal.tsx`) |
| State | Zustand (`store/lightbox.ts`) |
| Deployment | Vercel |

### One deliberate deviation, and why

The brief specified the Gradient Waves background from
`reactbits.dev/backgrounds/gradient-waves` **and** a Three.js / R3F / Drei
stack. The published Gradient Waves component ships against **`ogl`**, not
Three.js — so the two requirements could not both be met by installing it as-is.

`components/three/HeroScene.tsx` resolves this by carrying the original
**fragment shader over unchanged** and rewriting only the plumbing: Drei's
`shaderMaterial` builds the material, R3F drives the clock and resize, and the
program compiles as `THREE.GLSL3` so the original `#version 300 es` source
works verbatim. Same visual, specified stack, one less dependency.

It is recoloured to the brand: gold swell, white horizon, so the waves dissolve
into the page rather than sitting on top of it.

**Fallbacks.** `prefers-reduced-motion` and browsers without WebGL2 get a static
gold radial wash instead of the canvas — no animation loop is started at all.

---

## Design tokens

Palette is sampled from the seal artwork rather than invented, so the site and
the seals belong to each other.

| Token | Hex | Origin |
|---|---|---|
| `paper` | `#FFFFFF` | dominant ground |
| `parchment` | `#FBF7EE` | seal inner field |
| `ink` | `#0C3A66` | seal rim + arc lettering |
| `gold` | `#C08A1E` / `gold-light` `#E8A317` | seal laurel wreath |
| `rule` | `#E7DFCD` | hairline dividers |

**Ratio discipline:** white and parchment carry roughly 80% of every surface;
gold is reserved for the remaining 20% — rules, eyebrows, seals, tier accents
and calls to action. Navy is used for type, not as a third brand colour.

**Type:** Newsreader (display) · Inter Tight (body) · IBM Plex Mono (clause
numbers, point values, thresholds — the vernacular of a written standard).

---

## Terminology

Per the brief, **"framework" is not used as the noun for the standard.** The
body of criteria is called **the Criteria**; the whole is **the standard**. The
route is `/criteria`, navigation reads "The Criteria", and the footer reads
"a certification standard by MiTran Global". Keep this consistent in any new
copy — it is the difference between sounding like a product and sounding like
an accreditation.

---

## Brand assets

All five seals live in `public/logos/`.

- **`yellow-zone-classic.svg`** — the standing mark. Nav, footer, hero, favicon,
  empty states, confirmation screens.
- **`yellow-zone-{bronze,silver,gold,platinum}.svg`** — the tier system only.
  Rendered by `components/tiers/TierLadder.tsx` and the self-assessment result.

### One change made to the supplied SVGs

Each seal shipped with `<style>@import url('...fonts.googleapis.com...')</style>`.
Browsers **block external resource loading inside SVG rendered as an image**, so
that import could never resolve — it only produced a hanging network request on
every page that showed a seal. It has been stripped from all five files. The
font-family stacks are untouched, so the wordmark falls back to the serif stack
already declared in the artwork.

> **Recommended before launch:** convert the seal text to outlines in your
> vector editor and re-export. That removes the font dependency entirely and
> guarantees the wordmark renders identically everywhere. Nothing in the code
> needs to change if you do — just replace the files.

---

## Structure

```
app/
  page.tsx                  Home
  what-is-yellowzone/       The standard, levels, Blue Zones origin
  criteria/                 5 pillars, 13 criteria, thresholds
  get-certified/            7 stages, timeline, renewal, investment
  why-certify/              Benefits by audience
  certified-schools/        The register (empty state until first cohort)
  about/                    MiTran Global, Positivity Hubs, EPPT
  resources/                Downloads, self-assessment, FAQ
  apply/                    Application form
  sitemap.ts  robots.ts  not-found.tsx

components/
  three/HeroScene.tsx       Gradient Waves, ported to R3F
  criteria/                 Filterable criteria library
  tiers/TierLadder.tsx      The five levels
  quiz/SelfAssessment.tsx   13-question self-assessment
  ui/Reveal.tsx             GSAP ScrollTrigger primitive
  ui/Lightbox.tsx           Seal viewer (Zustand-backed)

lib/
  criteria.ts               All 13 criteria — the single source of truth
  tiers.ts                  Level bands
  site.ts                   Nav, footer, stages, FAQs, downloads
```

**The criteria are data.** `lib/criteria.ts` drives the criteria library, the
pillar overview, the self-assessment and every count shown on the site. Edit a
criterion once and it updates everywhere. Do not hardcode "13" or "8" in copy —
import `MANDATORY_COUNT` / `RECOMMENDED_COUNT`.

---

## ⚠ Open items before launch

These are decisions only you can make. Each is a real judgement call, not a
placeholder to delete.

1. **Level bands need sign-off.** The site currently awards levels by how many
   Recommended criteria are met on top of the full Mandatory gate:
   Certified 0–1 · Bronze 2 · Silver 3 · Gold 4 · Platinum 5. This uses all five
   supplied seals and mirrors LEED's prerequisites-then-points shape, but your
   content brief lists the threshold as unresolved ("3 of 5"). **Set these in
   `lib/tiers.ts`.**
2. **Testimonials are placeholder.** `components/home/Testimonials.tsx` contains
   unattributed sample quotes, labelled as such in the file. Replace with
   signed, permissioned quotes from the first certified cohort — or remove the
   section — before launch. Do not ship the placeholders.
3. **Data protection policy.** The FAQ answer on student data confidentiality is
   a summary. It needs the real policy: who sees individual reports, what is
   anonymised, retention period, and DPDP Act compliance. This is the question
   schools and parents will scrutinise hardest.
4. **Pricing.** Currently described as banded by enrolment with a "request a
   quote" route. Confirm whether bands are published.
5. **The register is public by design.** `app/certified-schools/page.tsx` renders
   from a `SCHOOLS` array that is intentionally empty, so the pre-launch empty
   state shows. Confirm the registry should be public, then populate the array
   or swap it for a CMS/database call.
6. **Form submission is not wired.** `components/apply/ApplyForm.tsx` validates
   client-side and shows the confirmation state, but does not POST anywhere. Add
   your endpoint or CRM integration at the marked `[OPEN ITEM]` comment.
7. **Downloads are not wired.** The four documents on `/resources` are listed but
   have no files behind them.
8. **Legal pages do not exist.** The footer links to `/legal/privacy`,
   `/legal/data-protection`, `/legal/terms` and `/legal/badge-usage`. These
   currently 404.
9. **Cookie/consent banner.** Not implemented — draft with counsel against DPDP
   requirements.
10. **Partner logos.** `/about#partnerships` shows a marked placeholder block.
11. **Confirm timings.** 12-month validity, 30-day remediation, ~80-day decision
    and the day-by-day table in `lib/site.ts` are all indicative.
12. **`SITE.url` in `lib/site.ts`** is set to `https://yellowzone.org`. This
    feeds canonical URLs, Open Graph and the sitemap — set it to the real domain.

---

## Copy rules

From the content brief, worth preserving as the site grows:

- **Restrained, not promotional.** A standard's authority comes from sounding
  like a standard. No exclamation marks, no "revolutionary".
- **Specific over emotive.** "Eight Mandatory criteria, independently verified"
  beats "transforming young lives".
- **Never claim clinical outcomes.** YellowZone certifies structure and practice.
  It does not treat, diagnose, or promise mental health outcomes.
- **YellowZone leads; EPPT supports.** EPPT appears on two pages only (Criteria,
  About) and always as an instrument meeting a criterion.
- **Failure is a feature.** Copy should be comfortable saying schools can be
  deferred or not certified. That is what makes the seal worth having.

---

## Accessibility

Skip link, visible focus rings, `aria-current` on active nav, `aria-expanded` on
all disclosures, labelled form fields with `role="alert"` errors, and
`prefers-reduced-motion` honoured in one place (`Reveal.tsx`) plus the hero.
The decorative canvas is `aria-hidden`.
