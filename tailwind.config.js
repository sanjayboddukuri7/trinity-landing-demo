/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0E0B1F', soft: '#3A3552', muted: '#6B6685' },
        paper: '#F6F4FF',
        line: '#E5E1F5',
        pulse: { DEFAULT: '#6D4AFF', dark: '#5332E0', soft: '#EEE9FF' },
        lime: { DEFAULT: '#C6F432', dark: '#A6D11B' },
        gold: { DEFAULT: '#E8A33D', light: '#F6C66B' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        brand: ['Cinzel', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(14,11,31,0.18)',
        glow: '0 20px 60px -15px rgba(109,74,255,0.55)',
      },
    },
  },
  plugins: [],
};
