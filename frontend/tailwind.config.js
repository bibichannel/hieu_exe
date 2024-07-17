/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#E291C8'
    },
    extend: {}
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
