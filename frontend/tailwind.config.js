// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arcade: ['"Press Start 2P"', 'cursive'],
      },
      boxShadow: {
        neon: '0 0 15px #ff00cc, 0 0 30px #3333ff',
      },
      colors: {
        'retro-pink': '#ff00cc',
        'retro-blue': '#3333ff',
        'retro-bg': '#0d0d0d',
      },
    },
  },
  plugins: [],
}
