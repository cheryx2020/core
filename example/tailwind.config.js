const typography = require('@tailwindcss/typography');
module.exports = {
  content: [
    "./pages/**/*.js",
    "./components/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [typography],
}