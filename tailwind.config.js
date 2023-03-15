/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx,html}',
    './src/**/*.{js,tx,jsx,tsx,html}',
    './node_modules/tailwind-datepicker-react/dist/**/*.js'
  ],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
