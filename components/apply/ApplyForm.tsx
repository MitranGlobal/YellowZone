'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { SITE } from '@/lib/site';

const BOARDS = ['CBSE', 'ICSE', 'State board', 'IB', 'Other'];

type Fields = {
  school: string;
  board: string;
  city: string;
  enrolment: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  notes: string;
};

const EMPTY: Fields = {
  school: '',
  board: '',
  city: '',
  enrolment: '',
  name: '',
  role: '',
  email: '',
  phone: '',
  notes: '',
};

const REQUIRED: (keyof Fields)[] = [
  'school',
  'board',
  'city',
  'name',
  'role',
  'email',
];

export default function ApplyForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function set(key: keyof Fields, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function submit() {
    const next: Partial<Record<keyof Fields, string>> = {};

    REQUIRED.forEach((key) => {
      if (!values[key].trim()) next[key] = 'This field is required.';
    });

    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'Enter a valid email address.';
    }

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // [OPEN ITEM] Wire to your intake endpoint / CRM before launch.
    // e.g. await fetch('/api/applications', { method: 'POST', body: ... })
    setSubmitted(true);
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="border border-rule bg-paper px-8 py-14 text-center sm:px-14"
        >
          <Image
            src="/logos/yellow-zone-classic.svg"
            alt=""
            width={96}
            height={96}
            className="mx-auto h-20 w-20 drop-shadow-seal"
          />
          <h2 className="mt-8 font-display text-[clamp(1.4rem,3vw,2rem)] leading-snug tracking-tight text-ink">
            Application received.
          </h2>
          <p className="mx-auto mt-5 max-w-prose leading-relaxed text-ink-soft">
            A member of the YellowZone certification team will contact you within{' '}
            {SITE.responseTime} to confirm next steps and share the evidence
            submission guide.
          </p>
          <div className="mt-9">
            <Link
              href="/criteria"
              className="inline-flex items-center border border-gold px-6 py-3.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-gold-ink transition-colors hover:bg-gold-pale/40"
            >
              Review the criteria meanwhile
            </Link>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="border border-rule bg-paper p-7 sm:p-10"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              label="School name"
              value={values.school}
              onChange={(v) => set('school', v)}
              error={errors.school}
              required
            />

            <div>
              <Label htmlFor="board" required>
                Board
              </Label>
              <select
                id="board"
                value={values.board}
                onChange={(e) => set('board', e.target.value)}
                aria-invalid={!!errors.board}
                className="mt-2.5 w-full border border-rule bg-paper px-4 py-3.5 text-[0.92rem] text-ink transition-colors focus:border-gold"
              >
                <option value="">Select a board</option>
                {BOARDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <ErrorText>{errors.board}</ErrorText>
            </div>

            <Field
              label="City & state"
              value={values.city}
              onChange={(v) => set('city', v)}
              error={errors.city}
              required
            />
            <Field
              label="Approximate enrolment"
              value={values.enrolment}
              onChange={(v) => set('enrolment', v)}
              inputMode="numeric"
            />
            <Field
              label="Contact name"
              value={values.name}
              onChange={(v) => set('name', v)}
              error={errors.name}
              required
            />
            <Field
              label="Role"
              value={values.role}
              onChange={(v) => set('role', v)}
              error={errors.role}
              required
            />
            <Field
              label="Email"
              type="email"
              value={values.email}
              onChange={(v) => set('email', v)}
              error={errors.email}
              required
            />
            <Field
              label="Phone"
              type="tel"
              value={values.phone}
              onChange={(v) => set('phone', v)}
            />

            <div className="sm:col-span-2">
              <Label htmlFor="notes">Anything you’d like us to know</Label>
              <textarea
                id="notes"
                rows={4}
                value={values.notes}
                onChange={(e) => set('notes', e.target.value)}
                className="mt-2.5 w-full resize-y border border-rule bg-paper px-4 py-3.5 text-[0.92rem] leading-relaxed text-ink transition-colors focus:border-gold"
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={submit}
              className="inline-flex items-center justify-center bg-ink px-7 py-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-gold-ink"
            >
              Submit application
            </button>

            <p className="max-w-sm font-mono text-[0.62rem] leading-relaxed tracking-[0.04em] text-ink-mute">
              Submitting registers interest only. It does not begin assessment
              and carries no fee.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Label({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-mute"
    >
      {children}
      {required ? <span className="ml-1 text-gold">*</span> : null}
    </label>
  );
}

function ErrorText({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <p role="alert" className="mt-2 font-mono text-[0.62rem] text-gold-ink">
      {children}
    </p>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  required,
  type = 'text',
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  inputMode?: 'numeric' | 'text';
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, '-');
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className="mt-2.5 w-full border border-rule bg-paper px-4 py-3.5 text-[0.92rem] text-ink transition-colors focus:border-gold"
      />
      <ErrorText>{error}</ErrorText>
    </div>
  );
}
