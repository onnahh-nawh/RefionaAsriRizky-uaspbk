/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#FDF8F3',
          100: '#E8E5E0',
          200: '#DCC7AA',
          300: '#C86439',
          400: '#8D9773',
          500: '#6F4E37',
          600: '#4B3F36',
          700: '#2F1B12',
          800: '#1A0F0A',
          900: '#0D0805',
        },
        cream: '#DCC7AA',
        sage: '#8D9773',
        terracotta: '#C86439',
        milk: '#FDF8F3',
        roast: '#2F1B12',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}