// tailwind.config.js
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */


const config = {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    layout: {
      disabledOpacity: "0.3", // opacity-[0.3]
      radius: {
        small: "2px", // rounded-small
        medium: "4px", // rounded-medium
        large: "6px", // rounded-large
      },
      borderWidth: {
        small: "1px", // border-small
        medium: "1px", // border-medium
        large: "2px", // border-large
      },
    },
    themes: {
      light: {
        colors: {
          primary: {
            DEFAULT: "#4D8B55",
            foreground: "#fff",
           
          },
          focus: "#4D8B55",
        },
      },
      dark: {},
    },
  })]
}

export default config;

