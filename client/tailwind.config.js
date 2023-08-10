/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      animation: {
        'pulse-custom': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) 1',
      }
    }
  },
  plugins: []
};