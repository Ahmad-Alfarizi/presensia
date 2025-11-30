/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}", // pastikan semua folder sumber masuk
  ],
  theme: {
    extend: {
      colors: {
        primary: "#136dec",
        backgroundLight: "#f6f7f8",
        backgroundDark: "#101822",
        success: "#50E3C2",
        error: "#D0021B",
      },
      fontFamily: {
        display: ["Lexend", "sans-serif"],
      },
    },
  },
  plugins: [],
};
