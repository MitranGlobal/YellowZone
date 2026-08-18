export const SITE = {
  name: 'YellowZone',
  parent: 'MiTran Global',
  tagline: 'The Emotional Wellness Standard for Schools',
  url: 'https://yellowzone.org',

  // ─── CONTACT DETAILS ───
  // [OPEN ITEM] Replace with the real numbers before launch. These are the
  // only route into the programme now, so they must be monitored.
  email: 'certification@mitranglobal.com',
  phone: '+91 00000 00000',
  phoneDisplay: '+91 00000 00000',
  whatsapp: '+91 00000 00000',
  address: 'MiTran Global, Chennai, Tamil Nadu, India',
  hours: 'Monday – Friday, 9:30am – 6:00pm IST',

  validity: '12 months',
  remediation: '30 days',
  assessmentMinutes: '15 minutes',
  responseTime: '2 working days',
};

export const NAV = [
  { label: 'What is YellowZone', href: '/what-is-yellowzone' },
  { label: 'The Criteria', href: '/criteria' },
  { label: 'Why Certify', href: '/why-certify' },
  { label: 'Certified Schools', href: '/certified-schools' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER = [
  {
    heading: 'Certification',
    links: [
      { label: 'What is YellowZone', href: '/what-is-yellowzone' },
      { label: 'The Criteria', href: '/criteria' },
      { label: 'Why Certify', href: '/why-certify' },
      { label: 'Certified Schools', href: '/certified-schools' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Criteria Document (PDF)', href: '/resources' },
      { label: 'Where Your School Stands', href: '/resources#self-assessment' },
      { label: 'FAQ', href: '/resources#faq' },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'MiTran Global', href: '/about' },
      { label: 'Positivity Hubs', href: '/about#positivity-hubs' },
      { label: 'Partnerships', href: '/about#partnerships' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Data Protection', href: '/legal/data-protection' },
      { label: 'Terms of Certification', href: '/legal/terms' },
      { label: 'Badge Usage Guidelines', href: '/legal/badge-usage' },
    ],
  },
];

export interface Stage {
  n: number;
  title: string;
  body: string;
  window: string;
}

/**
 * How working with YellowZone actually goes.
 *
 * This is a partnership, not an examination. Schools are not expected to meet
 * the criteria before they talk to us — most do not, and that is the point.
 * We establish where a school stands, build the gaps into a plan, and support
 * the work. Certification is awarded when the criteria are genuinely met.
 */
export const STAGES: Stage[] = [
  {
    n: 1,
    title: 'A conversation',
    body: 'Tell us about your school — size, boards, what you already run, what worries you. No preparation needed, and nothing to submit. We will tell you plainly whether YellowZone is a fit.',
    window: 'Week 1',
  },
  {
    n: 2,
    title: 'Baseline review',
    body: 'We walk the thirteen criteria with your leadership team and establish where the school stands today. Most schools already meet more than they expect, and have simply never documented it.',
    window: 'Weeks 1–3',
  },
  {
    n: 3,
    title: 'A roadmap for the gaps',
    body: 'You receive a criterion-by-criterion plan covering only what is missing — with timelines built around your academic calendar, not against it.',
    window: 'Week 4',
  },
  {
    n: 4,
    title: 'We help you close them',
    body: 'Policy drafting, counsellor recruitment guidance, teacher training, assessment administration, intervention design. This is the part we do with you rather than ask you to do alone.',
    window: 'Ongoing',
  },
  {
    n: 5,
    title: 'Measurement',
    body: 'A representative student sample and all educators complete the wellbeing assessment under Criteria B1–B2. 15 minutes per respondent, online.',
    window: 'When ready',
  },
  {
    n: 6,
    title: 'Verification',
    body: 'Evidence is reviewed against every criterion, cross-checked with platform data, and confirmed through interviews and a school visit.',
    window: 'On completion',
  },
  {
    n: 7,
    title: 'Certification',
    body: `Your school is awarded YellowZone Certification at the level its evidence supports, valid for ${SITE.validity}, and listed in the register.`,
    window: 'On verification',
  },
];

/**
 * What the first conversation covers. Framed as what we will ask about, not
 * as a checklist the school must satisfy before making contact.
 */
export const PREPARE = [
  'Who currently owns emotional wellness at your school',
  'Whether you have a counsellor, and how students reach them',
  'Any wellbeing policy, however informal',
  'What teacher training you already run',
  'How your academic calendar handles exam pressure',
  'Any student-led or community wellbeing work already happening',
];

export const FAQS = [
  {
    q: 'Do we need to meet the criteria before contacting you?',
    a: 'No. Almost no school does at first contact, and we do not expect it. We establish where you stand, plan the gaps, and support the work to close them. The conversation is the starting point, not the exam.',
  },
  {
    q: 'Is YellowZone a test?',
    a: 'No. Assessment is one pillar of five. Certification reflects leadership, policy, staff training, academic design and school culture as well.',
  },
  {
    q: 'Can a school still fail to be certified?',
    a: 'Certification is only awarded once all eight Mandatory criteria are genuinely met and verified. We will help you get there, and we will tell you honestly if you are not there yet. A seal that could not be withheld would not be worth displaying.',
  },
  {
    q: 'How long does it take?',
    a: 'It depends entirely on where your school starts. A school that already has a counsellor, a policy and training records may be certified within a term. A school building from scratch should expect an academic year.',
  },
  {
    q: 'How long does certification last?',
    a: `${SITE.validity}, with annual renewal requiring a refreshed assessment cycle and updated evidence.`,
  },
  {
    q: 'What does the student assessment involve?',
    a: `A ${SITE.assessmentMinutes} online assessment completed by a representative student sample. It measures wellbeing factors and produces individual and class-level reports. It is not an exam and has no bearing on academic records.`,
  },
  {
    q: 'Is student data confidential?',
    a: 'A full data policy — who sees individual reports, what is anonymised, retention periods and compliance with India’s DPDP Act — is issued at the baseline review and published here before launch.',
  },
  {
    q: 'Do we need to use EPPT?',
    a: 'EPPT is the instrument MiTran Global provides for Criteria B1–B3. Other validated instruments may be accepted on review.',
  },
  {
    q: 'What does it cost?',
    a: 'Advisory support and certification are quoted together, banded by enrolment and by how much support your school needs. Talk to us and we will give you a figure before any commitment.',
  },
  {
    q: 'Our school already has a counsellor and runs wellness programs. Where do we stand?',
    a: 'Likely further along than you think. Work through the criteria on the Resources page to see for yourself, then bring us what you find.',
  },
];

export const DOWNLOADS = [
  {
    title: 'YellowZone Criteria',
    detail:
      'The full 13-criterion standard with evidence and verification requirements.',
    meta: 'PDF · 5 pillars',
  },
  {
    title: 'School Readiness Checklist',
    detail:
      'Work through all 13 criteria offline to see where your school already stands before the first conversation.',
    meta: 'PDF · 4 pages',
  },
  {
    title: 'Emotional Wellness Policy Template',
    detail:
      'A drafting template for Criterion A2, covering commitment, procedure and escalation.',
    meta: 'DOCX · editable',
  },
  {
    title: 'Programme Overview for Leadership',
    detail:
      'A short brief for management committees and trustees on what the programme involves.',
    meta: 'PDF · issued on request',
  },
];
