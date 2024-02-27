/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    colors: {
      'black': '#212121',
      'purple': '#8C32FF',
      'gray': '#929292',
      'green': '#07E78F',
      'red': '#E60000',
      'white': '#FFFFFF',
      'gray-light': '#F5F5F5',
    },
    fontSize: {
      sm: '0.75rem',
      base: '1rem',
      xl: '1.125rem',
      '2xl': '1.5rem',
      '3xl': '4.375rem',
    },
    fontFamily: {
      sans: ['Urbanist', 'sans-serif'],
    },
    extend: {
      spacing: {
        '1': '8px',
        '2': '12px',
        '3': '16px',
        '4': '24px',
        '5': '32px',
        '6': '48px',
      },
    }
  },
  plugins: [],
}

