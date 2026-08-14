export const SITE = {
  name: 'YellowZone',
  parent: 'MiTran Global',
  tagline: 'The Emotional Wellness Standard for Schools',
  url: 'https://yellowzone.org',
  email: 'certification@mitranglobal.com',
  validity: '12 months',
  remediation: '30 days',
  decisionDays: '80 days',
  assessmentMinutes: '15 minutes',
  responseTime: '2 working days',
};

export const NAV = [
  { label: 'What is YellowZone', href: '/what-is-yellowzone' },
  { label: 'The Criteria', href: '/criteria' },
  { label: 'Get Certified', href: '/get-certified' },
  { label: 'Why Certify', href: '/why-certify' },
  { label: 'Certified Schools', href: '/certified-schools' },
  { label: 'About', href: '/about' },
];

export const FOOTER = [
  {
    heading: 'Certification',
    links: [
      { label: 'What is YellowZone', href: '/what-is-yellowzone' },
      { label: 'The Criteria', href: '/criteria' },
      { label: 'How to Get Certified', href: '/get-certified' },
      { label: 'Certified Schools', href: '/certified-schools' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Criteria Document (PDF)', href: '/resources' },
      { label: 'Self-Assessment Checklist', href: '/resources#self-assessment' },
      { label: 'FAQ', href: '/resources#faq' },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'MiTran Global', href: '/about' },
      { label: 'Positivity Hubs', href: '/about#positivity-hubs' },
      { label: 'Partnerships', href: '/about#partnerships' },
      { label: 'Contact', href: '/apply' },
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

export const STAGES: Stage[] = [
  {
    n: 1,
    title: 'Application',
    body: 'Your school registers its intent to pursue YellowZone Certification and nominates a School Coordinator as single point of contact.',
    window: 'Day 0 – Day 5',
  },
  {
    n: 2,
    title: 'Evidence Submission',
    body: 'The Coordinator uploads documentary evidence against each of the 13 criteria.',
    window: 'Day 5 – Day 15',
  },
  {
    n: 3,
    title: 'Assessment Administration',
    body: 'A representative student sample and all educators complete the wellbeing assessment under Criteria B1–B2. 15 minutes per respondent, online.',
    window: 'Day 10 – Day 20',
  },
  {
    n: 4,
    title: 'Document & Data Review',
    body: 'The YellowZone assessment team reviews submitted evidence alongside platform completion data.',
    window: 'Day 20 – Day 30',
  },
  {
    n: 5,
    title: 'Verification',
    body: 'Spot interviews, document cross-checks and a scheduled school visit — physical or virtual — to confirm the claims made in evidence.',
    window: 'Day 30 – Day 40',
  },
  {
    n: 6,
    title: 'Findings Report',
    body: 'A criterion-by-criterion findings summary is shared with the School Coordinator, flagging any gaps.',
    window: 'Day 45',
  },
  {
    n: 7,
    title: 'Remediation Window',
    body: 'The school addresses any flagged gaps within 30 days before final evaluation.',
    window: 'Day 45 – Day 75',
  },
];

export const PREPARE = [
  'A nominated School Coordinator',
  'Counsellor credentials and availability schedule',
  'Your emotional wellness policy (template available on request)',
  'Teacher training records',
  'Academic policy documents and calendar',
  'Records of your mental health social project',
];

export const FAQS = [
  {
    q: 'Is YellowZone a test?',
    a: 'No. Assessment is one pillar of five. Certification depends on leadership, policy, staff training, academic design and school culture as well.',
  },
  {
    q: 'Can a school fail?',
    a: 'Yes. Any unmet Mandatory criterion blocks certification. Schools receive a remediation plan and a defined window to address gaps.',
  },
  {
    q: 'How long does certification last?',
    a: '12 months, with annual renewal requiring a refreshed assessment cycle and updated evidence.',
  },
  {
    q: 'How long does the whole process take?',
    a: 'Approximately 80 days from application to certification decision, depending on how quickly evidence is submitted and any gaps are remediated.',
  },
  {
    q: 'What does the student assessment involve?',
    a: 'A 15-minute online assessment completed by a representative student sample. It measures wellbeing factors and produces individual and class-level reports. It is not an exam and has no bearing on academic records.',
  },
  {
    q: 'Is student data confidential?',
    a: 'A full data policy — who sees individual reports, what is anonymised, retention periods and compliance with India’s DPDP Act — is issued with the evidence submission guide and published here before launch.',
  },
  {
    q: 'Do we need to use EPPT?',
    a: 'EPPT is the instrument MiTran Global provides for Criteria B1–B3. Other validated instruments may be accepted by the YellowZone assessment team on review.',
  },
  {
    q: 'What does it cost?',
    a: 'Certification is priced by enrolment band. Request a quote and the certification team will send the banding for your school size.',
  },
  {
    q: 'Our school already has a counsellor and runs wellness programs. Do we qualify?',
    a: 'Possibly. The self-assessment checklist will show you where you already meet the criteria and where evidence is missing. Most schools find they meet several criteria already but haven’t documented them.',
  },
  {
    q: 'Who verifies the evidence?',
    a: 'The YellowZone assessment team, through document review, platform data, spot interviews and a school visit.',
  },
];

export const DOWNLOADS = [
  {
    title: 'YellowZone Criteria',
    detail: 'The full 13-criterion standard with evidence and verification requirements.',
    meta: 'PDF · 5 pillars',
  },
  {
    title: 'School Self-Assessment Checklist',
    detail: 'Work through all 13 criteria offline and identify your evidence gaps before applying.',
    meta: 'PDF · 4 pages',
  },
  {
    title: 'Emotional Wellness Policy Template',
    detail: 'A drafting template for Criterion A2, covering commitment, procedure and escalation.',
    meta: 'DOCX · editable',
  },
  {
    title: 'Evidence Submission Guide',
    detail: 'What to upload against each criterion, in what format, and how it is reviewed.',
    meta: 'PDF · issued on application',
  },
];
