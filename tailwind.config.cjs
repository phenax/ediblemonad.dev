/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge:
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent-1': '#b29b3e',
        'accent-2': '#3e55b2',
      },
      fontSize: {
        '4xl': '3rem',
        '5xl': '4rem',
        '6xl': '5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
