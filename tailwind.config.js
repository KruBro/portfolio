/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'void':         '#080B0F',
        'void-2':       '#0D1218',
        'void-surface': '#111820',
        'em':           '#00E5A0',
        'em-dim':       '#00A876',
        'cb':           '#38BDF8',
        'cb-dim':       '#0EA5E9',
        'tp':           '#F1F5F9',
        'ts':           '#94A3B8',
        'tm':           '#4E5E72',
        'bs':           '#1A2233',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body:    ['var(--font-outfit)', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.3' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        'scan': {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      animation: {
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
        'scan':       'scan 8s linear infinite',
      },
      backgroundImage: {
        'dot-matrix': 'radial-gradient(circle, rgba(255,255,255,0.065) 1px, transparent 1px)',
        'grid-lines': 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot':  '26px 26px',
        'grid': '60px 60px',
      },
    },
  },
  plugins: [],
}
