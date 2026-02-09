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
        'github-bg': '#0d1117',
        'github-green': '#238636',
        'github-blue': '#58a6ff',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
