/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark:{
          "primary": "#2c00ff",
          "secondary": "#88b100",
          "accent": "#00c0cf",
          "neutral": "#121212",
          "base-100": "#23272b",
          "info": "#0089ff",
          "success": "#008900",
          "warning": "#ff9a00",
          "error": "#df2f3c",
        },
        light: {
          "primary": "#0092ff",
          "secondary": "#007f00",
          "accent": "#00abd7",
          "neutral": "#152c1e",
          "base-100": "#fff7f5",
          "info": "#00bbff",
          "success": "#00b415",
          "warning": "#ffd400",
          "error": "#ff6292",
        }
      }
    },
  },
  plugins: [],
}

