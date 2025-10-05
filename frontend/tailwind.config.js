
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",   // App Router
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#7c3aed',
          500: '#5b21b6',
          600: '#4c1d9e',
          700: '#3b1a86',
          800: '#2a1460',
          900: '#1b0b3f',
        }
      }
    },
  },
  plugins: [],
}
