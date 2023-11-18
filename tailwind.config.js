/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const tailwindElement = require("tw-elements/dist/plugin.cjs");

module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    colors: {
      main: "#f6f6f6",
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      gray: {
        50: "rgba(0, 0, 0, 0.60)",
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
    fontFamily: {
      sans: ['"Inter var", sans-serif', ...defaultTheme.fontFamily.sans],
      serif: ["Merriweather", "serif"],
    },
    extend: {},
  },
  plugins: [tailwindElement],
  darkMode: "class",
};
