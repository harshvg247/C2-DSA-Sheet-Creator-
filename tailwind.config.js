/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#141314',
        secondary: '#1B1D22',
        tertiary: '#0f172a',
        font2: '#3A0CA3',
        font1:'#FCFCFC',
        font3:'#BBBBBB',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}