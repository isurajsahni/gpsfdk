/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gpsfdk-orange": "#FF5722",
        "gpsfdk-golden": "#CDAD7D",
        "gpsfdk-green": "#02603F"
      }
    },
  },
  plugins: [],
};
