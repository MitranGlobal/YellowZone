export type Weight = 'Mandatory' | 'Recommended';

export interface Criterion {
  id: string;
  title: string;
  weight: Weight;
  requirement: string;
  evidence: string;
  verification: string;
  /** Short form used inside the self-assessment. */
  prompt: string;
}

export interface Pillar {
  letter: 'A' | 'B' | 'C' | 'D' | 'E';
  name: string;
  focus: string;
  principle: string;
  criteria: Criterion[];
  note?: string;
}

export const PILLARS: Pillar[] = [
  {
    letter: 'A',
    name: 'Wellness Leadership & Governance',
    focus: 'Institutional ownership of emotional wellness',
    principle:
      'A YellowZone School has clear institutional ownership of emotional wellness — not just individual initiatives.',
    criteria: [
      {
        id: 'A1',
        title: 'School Counsellor',
        weight: 'Mandatory',
        requirement:
          'At least one qualified school counsellor accessible to students and staff, with defined working hours.',
        evidence: 'Qualification certificate, appointment letter, published availability schedule.',
        verification:
          'Document review plus confirmation conversation with the counsellor and school leadership.',
        prompt:
          'We have at least one qualified counsellor with published, defined working hours.',
      },
      {
        id: 'A2',
        title: 'Emotional Wellness Policy',
        weight: 'Mandatory',
        requirement:
          'A written, leadership-approved policy defining the school’s commitment, procedures and escalation pathways for student and staff emotional wellbeing.',
        evidence: 'Signed policy document, approval date, proof of circulation.',
        verification: 'Document review.',
        prompt: 'We have a signed, circulated emotional wellness policy approved by leadership.',
      },
      {
        id: 'A3',
        title: 'Wellness Committee',
        weight: 'Recommended',
        requirement:
          'A standing committee — leadership, counsellor, teacher representatives, optionally parent and student representatives — meeting at least quarterly.',
        evidence: 'Committee charter and meeting minutes.',
        verification: 'Review of minutes; optional interview with a committee member.',
        prompt: 'A standing wellness committee meets at least quarterly and keeps minutes.',
      },
    ],
  },
  {
    letter: 'B',
    name: 'Measurement & Insight',
    focus: 'Structured assessment of students and educators',
    principle:
      'A YellowZone School measures wellbeing rather than assuming it — for students and educators alike — and acts on what it finds.',
    note:
      'Schools may satisfy B1–B3 using EPPT (Emotion AI Powered Positivity Tracker), MiTran Global’s Emotion-AI-based assessment — a 15-minute online instrument measuring 10 wellbeing factors — or another validated instrument accepted by the YellowZone assessment team. The instrument is a means of meeting the criterion; it is not the certification.',
    criteria: [
      {
        id: 'B1',
        title: 'Student Wellbeing Assessment & Class-Level Reports',
        weight: 'Mandatory',
        requirement:
          'A structured, validated wellbeing assessment administered to a representative student sample, producing individual and class-level reports.',
        evidence: 'Completion records; sample anonymised class-level reports.',
        verification: 'Review of completion data and report output from the assessment platform.',
        prompt:
          'A representative student sample completes a structured wellbeing assessment that produces reports.',
      },
      {
        id: 'B2',
        title: 'Educator Wellbeing Assessment & Reports',
        weight: 'Mandatory',
        requirement:
          'Full participation of school educators in a structured wellbeing assessment, with individual factor-level reports generated.',
        evidence: 'Completion records for all educators; sample anonymised reports.',
        verification: 'Platform completion-data review.',
        prompt: 'All educators complete a structured wellbeing assessment with factor-level reports.',
      },
      {
        id: 'B3',
        title: 'Targeted Intervention Content',
        weight: 'Mandatory',
        requirement:
          'Students and educators flagged with low-scoring factors are enrolled in, and engaging with, corresponding intervention content.',
        evidence: 'Enrollment logs; engagement and completion rates.',
        verification: 'Review of platform engagement analytics.',
        prompt: 'Flagged students and educators are enrolled in matching intervention content.',
      },
    ],
  },
  {
    letter: 'C',
    name: 'Capacity Building',
    focus: 'Staff skills to sustain a positive environment',
    principle:
      'A YellowZone School invests in the people who sustain its wellness culture day to day.',
    criteria: [
      {
        id: 'C1',
        title: 'Teacher Training for Positivity',
        weight: 'Mandatory',
        requirement:
          'All teaching staff complete a structured training program on positive classroom practices, emotional literacy and student support.',
        evidence: 'Attendance records, completion certificates, training curriculum.',
        verification: 'Attendance-record review; optional spot interview with trained staff.',
        prompt:
          'All teaching staff have completed structured training in positive classroom practice.',
      },
      {
        id: 'C2',
        title: 'Counsellor & Staff Continuing Education',
        weight: 'Recommended',
        requirement:
          'Counsellor and wellness staff complete at least one continuing-education activity annually.',
        evidence: 'Certificates or attendance proof.',
        verification: 'Document review.',
        prompt: 'Counsellor and wellness staff complete continuing education every year.',
      },
    ],
  },
  {
    letter: 'D',
    name: 'Academic Environment',
    focus: 'Reducing structural sources of student stress',
    principle:
      'A YellowZone School addresses structural, academic sources of student stress — not only individual support.',
    criteria: [
      {
        id: 'D1',
        title: 'Stress-Free Academic Strategies',
        weight: 'Mandatory',
        requirement:
          'Documented policies that reduce avoidable academic stress: exam-scheduling guidelines, homework-load limits, and policies against public shaming or punitive detention.',
        evidence: 'Written policy documents; academic calendar showing spacing of assessments.',
        verification: 'Policy review compared against the academic calendar.',
        prompt:
          'Written policies limit homework load, space assessments, and bar public shaming.',
      },
      {
        id: 'D2',
        title: 'Peer Support / Student Wellness Ambassadors',
        weight: 'Recommended',
        requirement: 'A trained student peer-support or wellness-ambassador program.',
        evidence: 'Program charter, list of trained ambassadors, activity log.',
        verification: 'Document review; optional student interview.',
        prompt: 'We run a trained student peer-support or wellness-ambassador program.',
      },
    ],
  },
  {
    letter: 'E',
    name: 'Community & Culture',
    focus: 'Wellness extended into school culture and beyond',
    principle:
      'A YellowZone School makes emotional wellness visible and shared across its wider community.',
    criteria: [
      {
        id: 'E1',
        title: 'Mental Health Social Projects',
        weight: 'Mandatory',
        requirement:
          'At least one structured, school-wide mental health awareness or social project run annually.',
        evidence: 'Project plan, execution records, participation numbers.',
        verification: 'Evidence review; may include a scheduled visit during project execution.',
        prompt: 'We run at least one school-wide mental health project every year.',
      },
      {
        id: 'E2',
        title: 'Parent & Family Engagement',
        weight: 'Recommended',
        requirement:
          'At least one annual session or communication initiative engaging parents on student emotional wellbeing.',
        evidence: 'Session records and attendance; parent communication materials.',
        verification: 'Document review.',
        prompt: 'Parents are engaged on emotional wellbeing at least once a year.',
      },
      {
        id: 'E3',
        title: 'Safe Reporting & Referral Pathway',
        weight: 'Recommended',
        requirement:
          'A confidential channel for students and staff to raise concerns, with a defined referral pathway to the counsellor or external professional support.',
        evidence: 'Documented process; evidence of the channel in operation.',
        verification: 'Document review; optional confirmation with the counsellor.',
        prompt: 'A confidential reporting channel exists with a defined referral pathway.',
      },
    ],
  },
];

export const ALL_CRITERIA: Criterion[] = PILLARS.flatMap((p) => p.criteria);

export const MANDATORY_COUNT = ALL_CRITERIA.filter((c) => c.weight === 'Mandatory').length;
export const RECOMMENDED_COUNT = ALL_CRITERIA.filter((c) => c.weight === 'Recommended').length;

export function pillarOf(id: string): Pillar {
  return PILLARS.find((p) => p.criteria.some((c) => c.id === id))!;
}
