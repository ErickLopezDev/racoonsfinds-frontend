/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ], 
  important: true,
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif']
      },
      colors: {
        primary: {
          DEFAULT: '#0047AB',
          50: '#e6f0fa',
          100: '#cce0f5',
          200: '#99c1eb',
          300: '#66a3e0',
          400: '#3384d6',
          500: '#0047AB',
          600: '#003d9e',
          700: '#00338f',
          800: '#002866',
          900: '#001433',
          950: '#000a1a'
        }
      }
    },
  },
  plugins: [],
}

