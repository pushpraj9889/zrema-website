/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ee4097",
      },
      container: {
        center: true,
        padding: {
          default: "1rem",
          sm: "3rem",
        },
      },
      fontFamily: {
        Lato: "Lato",
      },
    },
  },
  plugins: [],
};
