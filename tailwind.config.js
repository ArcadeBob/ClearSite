export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Bebas Neue"', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#1e3a5f',
          dark: '#162c47',
        },
        accent: {
          DEFAULT: '#f97316',
          dark: '#ea580c',
        },
      },
    },
  },
}
