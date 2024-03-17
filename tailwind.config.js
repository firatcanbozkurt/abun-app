/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#2B47FC",
      secondary: "#B52FF8",
      button: "#4960F9",
      twhite: "#fff",
      gray: {
        100: "#f7fafc",
        200: "#edf2f7",
        300: "#e2e8f0",
        400: "#cbd5e0",
        500: "#a0aec0",
        600: "#718096",
        700: "#4a5568",
        800: "#2d3748",
        900: "#1a202c",
      },
      red: {
        500: "#e53e3e",
      },
      homebg: {
        100: "#3a83f41a",
      },
      vocabCard: {
        100: "#030637",
      },
    },
  },
  plugins: [],
};
