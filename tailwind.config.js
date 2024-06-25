/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(30 64 175)",
        "primary-dark": "rgb(23 37 84)",
        "primary-light": "rgb(96 165 250)",
        secondary: "rgb(234 88 12)",
        "gray-dark": "#273444",
        gray: "#8492a6",
        "gray-light": "#d3dce6",
        warning: "#fb1c3c",
        yellow: "#fbf363",
      },
    },
  },
  plugins: [],
};
