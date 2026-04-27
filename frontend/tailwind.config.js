/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'sans-serif'], 
        tech: ['Inter', 'sans-serif'], 
      },
      colors: {
        autospex: {
          primary: '#0066FF', // اللون الأزرق الرئيسي من شعارك
          light: '#4D94FF',
          dark: '#0047B3',
          surface: '#ffffff',
          background: '#f8fafc',
          border: '#e2e8f0',
        }
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up-fade': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-100vh)' }, 
        }
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up-fade': 'slide-up-fade 0.8s cubic-bezier(0.7, 0, 0.3, 1) forwards',
      }
    },
  },
  plugins: [],
}