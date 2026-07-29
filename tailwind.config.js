/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        champagne: {
          50: '#FBF7F0',
          100: '#F5EBDB',
          200: '#EBD7B5',
          300: '#E0C088',
          400: '#D4A95C',
          500: '#C99A3E',
          600: '#A87C30',
          700: '#835E26',
          800: '#5E421B',
          900: '#3A2910',
        },
        ivory: '#FBF8F3',
        cream: '#F4EDE3',
        beige: '#E8DCC8',
        ink: '#14110D',
        charcoal: '#2A241D',
        espresso: '#4A3F32',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.18em',
        wider2: '0.08em',
      },
      maxWidth: {
        content: '1280px',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both',
        fadeIn: 'fadeIn 1.2s ease both',
        scaleIn: 'scaleIn 0.7s cubic-bezier(0.22,1,0.36,1) both',
        shimmer: 'shimmer 2.5s linear infinite',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
};
