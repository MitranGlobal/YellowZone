import type { Config } from 'tailwindcss';

/**
 * YellowZone design tokens.
 * Ratio discipline: ~80% white/parchment ground, ~20% gold.
 * Navy ink is drawn from the certification seal (#0C3A66) and is used for type only.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './store/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FFFFFF',
        parchment: '#FBF7EE',
        sand: '#F5EFE2',
        rule: '#E7DFCD',
        'rule-strong': '#D6C9A8',
        gold: {
          pale: '#F6E8C2',
          light: '#E8A317',
          DEFAULT: '#C08A1E',
          deep: '#8A6110',
          ink: '#5E4205',
        },
        ink: {
          DEFAULT: '#0C3A66',
          soft: '#3F5F80',
          mute: '#6E86A0',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em' }],
        display: ['clamp(2.6rem, 6.2vw, 5.1rem)', { lineHeight: '1.02', letterSpacing: '-0.022em' }],
        title: ['clamp(1.95rem, 3.8vw, 3.15rem)', { lineHeight: '1.08', letterSpacing: '-0.018em' }],
        heading: ['clamp(1.4rem, 2.2vw, 1.9rem)', { lineHeight: '1.18', letterSpacing: '-0.012em' }],
        lede: ['clamp(1.06rem, 1.5vw, 1.3rem)', { lineHeight: '1.6' }],
      },
      maxWidth: {
        shell: '78rem',
        prose: '46rem',
      },
      spacing: {
        section: 'clamp(4.5rem, 9vw, 8.5rem)',
      },
      dropShadow: {
        seal: ['0 6px 14px rgba(12, 58, 102, 0.14)', '0 2px 4px rgba(12, 58, 102, 0.08)'],
      },
      boxShadow: {
        seal: '0 22px 60px -28px rgba(12, 58, 102, 0.34)',
        lift: '0 18px 44px -30px rgba(12, 58, 102, 0.42)',
        hairline: '0 0 0 1px #E7DFCD',
      },
      backgroundImage: {
        'gold-rule': 'linear-gradient(90deg, #C08A1E 0%, #E8A317 42%, #F6E8C2 100%)',
      },
      keyframes: {
        'draw-rule': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'draw-rule': 'draw-rule 900ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
};

export default config;
