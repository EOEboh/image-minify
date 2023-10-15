/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      gray: {
        50: "#f9fafb",
        600: "#4b5563",
        700: "#374151",
        900: "#111827",
      },
    },
    fontSize: {
      base: "1rem", // 16px
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
    },

    extend: {},
  },
  plugins: [],
};
