/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f5f5f5',
          100: '#e5e5e5',
          200: '#d0d0d0',
          900: '#0f0f0f',
        },
      },
    },
  },
  plugins: [],
}