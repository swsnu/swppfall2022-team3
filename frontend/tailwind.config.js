/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    `bg-pink-500`,
    `bg-pink-200`,
    "bg-white",
    "text-pink-500",
    "text-pink-200",
    "text-white",
    "border-pink-500",
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
