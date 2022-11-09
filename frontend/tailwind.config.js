/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    maxWidth: {
      "2/3": "66%",
      "xs": "20rem",
    },
    minHeight: {
      "12": "3rem",
    }
  },
  plugins: [],
}
