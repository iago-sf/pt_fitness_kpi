/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      /* primer: "#E8AEB7",
      secun: "#b8e1ff",
      terce: "#a9fff7",
      cuarto: "#94fbab",
      quinto: "#82aba1", */
      primer: "#7389AE",
      secun: "#f39c6b",
      terce: "#CF4D6F",
      cuarto: "#ff3864",
      quinto: "#424242",
      red: {
        100: "#FFCDD2",
        200: "#EF9A9A",
        300: "#E57373",
        400: "#EF5350",
        500: "#F44336",
        600: "#E53935",
        700: "#D32F2F",
        800: "#C62828",
        900: "#B71C1C",
      },
      white: "#ffffff",
      black: "#000000",
      gray: {
        100: "#f7f7f7",
        200: "#eeeeee",
        300: "#e0e0e0",
        400: "#bdbdbd",
        500: "#9e9e9e",
        600: "#757575",
        700: "#616161",
        800: "#424242",
        900: "#212121",
      },
    },
  },
  plugins: [],
}
