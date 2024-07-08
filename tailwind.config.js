/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'bg-primary': 'rgba(5,5,5,0.99)',
      },
    },
  },
  plugins: [],
};
