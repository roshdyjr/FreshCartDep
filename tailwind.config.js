/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        'background-primary': '#111827',
        'background-secondary': '#DDD4B5',
        'main-theme': '#E9522C',
        'secondary-theme': '#111827'
      }
    },
  },
  plugins: [],
}
