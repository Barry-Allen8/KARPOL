/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './App.tsx', './index.tsx', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        carbon: {
          950: '#000000',
          900: '#080808',
          800: '#111111',
          700: '#1a1a1a',
          600: '#222222',
          500: '#2a2a2a',
          400: '#333333',
        },
        accent: {
          DEFAULT: '#3b82f6',
          light: '#60a5fa',
          dark: '#2563eb',
        },
        silver: {
          DEFAULT: '#c0c0c0',
          light: '#e0e0e0',
          dark: '#8a8a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
