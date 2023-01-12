/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontSize: {
      '4xl': '3rem',
      '5xl': '4rem',
      '6xl': '5rem',
    }
  },
  plugins: [
    require("@tailwindcss/typography")
  ],
}
