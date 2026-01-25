/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gpsfdk-orange': '#ff5722',
        'gpsfdk-green': '#02603f',
        'gpsfdk-gold': '#CDAD7D',
      },
    },
  },
  plugins: [],
}
