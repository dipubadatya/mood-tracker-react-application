/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7C5CFF",
        secondary: "#FF8A5B",
        background: "#F8F7F4",
        darkText: "#1E1E1E",
        accentSoft: "#FFE9DC",
      },
    },
  },
  plugins: [],
}