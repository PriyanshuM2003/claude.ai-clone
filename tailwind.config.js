/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",               // If using plain HTML
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scalePulse: {
          '0%, 100%': { transform: 'scale(0.6)' },
          '50%': { transform: 'scale(1.2)' },
        },
      },
      animation: {
        scalePulse: 'scalePulse 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}