// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#6366f1',
          600: '#4f46e5',
        },
        secondary: {
          500: '#10b981',
          600: '#059669',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}