/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mauve: "#BA8A94",
        sand: "#D0B1A6",
        violet: "#7D6FA1",
        slate: "#8290B7",
        periwinkle: "#7F7FB5",
      },
    },
  },
  plugins: [],
};
