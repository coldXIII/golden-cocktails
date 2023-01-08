/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      golden: '#d0af51',
      carmin: '#ba0f30',
      lightgray: '#a4a2a2',
      darkgray: '#505050',
      white: '#ffffff'
    }
  },
  plugins: []
};
