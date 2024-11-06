/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '25%': { backgroundPosition: '100% 50%' },
          '50%': { backgroundPosition: '50% 100%' },
          '75%': { backgroundPosition: '50% 0%' },
        }
      },
      animation: {
        'gradient': 'gradient 15s ease infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-delay': 'fadeIn 0.5s ease-out 0.2s forwards',
        'fade-in-delay-2': 'fadeIn 0.5s ease-out 0.4s forwards',
      },
    },
  },
  plugins: [],
}
