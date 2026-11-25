/** @type {import('tailwindcss').Config} */
// Colours come from CSS variables so every landing page model can have its own theme.
const v = name => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: v('ink'), soft: v('ink-soft'), muted: v('ink-muted') },
        paper: v('paper'),
        line: v('line'),
        brand: { DEFAULT: v('brand'), dark: v('brand-dark'), soft: v('brand-soft') },
        accent: { DEFAULT: v('accent'), dark: v('accent-dark'), ink: v('accent-ink') },
        gold: { DEFAULT: '#E8A33D', light: '#F6C66B' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        brand: ['Cinzel', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(14,11,31,0.18)',
        glow: '0 20px 60px -15px rgb(var(--brand) / 0.55)',
      },
    },
  },
  plugins: [],
};
