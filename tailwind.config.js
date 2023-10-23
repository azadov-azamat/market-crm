const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: "#174DA2",
        black: "#295BA2",
        green: "#6CB75C",
        red: "#EB7058",
        yellow: "#EABD52"
      }
    },
  },
  plugins: [],
});