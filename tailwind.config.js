/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdfbf7',
          100: '#faf6ed',
          200: '#f5edd3',
          300: '#efe3b9',
          400: '#e5d085',
          500: '#d4af37',
          600: '#bf9d32',
          700: '#9f832a',
          800: '#806922',
          900: '#69571c',
        },
        platinum: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#868e96',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
      },
    },
  },
  plugins: [],
}
