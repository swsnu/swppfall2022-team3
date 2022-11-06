/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    maxWidth: {
      '2/3': '66%',
    },
  },
  extend: {
    height: {
      '100vw': '100vw',
    },
    margin: {
      'double': '200%',
    }
  },
  plugins: [],
}
