import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Ink color palette - warm, premium, handwritten aesthetic
        cream: {
          50: '#FFFEF9',
          100: '#FBF9F1',
          200: '#F8F6F1',
          300: '#F3F0E8',
          400: '#EEEBE1',
          500: '#E9E6DA',
          600: '#DCD8CC',
          700: '#CCCAB5',
          800: '#B8B5A3',
          900: '#A39F8E',
        },
        'off-white': '#FAFAF8',
        'ink-blue': {
          50: '#F0F3FA',
          100: '#E1E7F5',
          200: '#C3CFEB',
          300: '#A5B7E1',
          400: '#879FD7',
          500: '#6987CD',
          600: '#5A78C5',
          700: '#4B67B8',
          800: '#3C56AA',
          900: '#1E3A5F',
        },
        'warm-beige': '#D4C4B0',
        'charcoal': '#2D2D2D',
        'ink': '#1A1A1A',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Fraunces', ...defaultTheme.fontFamily.serif],
        handwriting: ['Caveat', 'Indie Flower', 'cursive'],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px', letterSpacing: '0.5px' }],
        'sm': ['14px', { lineHeight: '20px', letterSpacing: '0.25px' }],
        'base': ['16px', { lineHeight: '24px', letterSpacing: '0.15px' }],
        'lg': ['18px', { lineHeight: '28px', letterSpacing: '0.15px' }],
        'xl': ['20px', { lineHeight: '28px', letterSpacing: '0' }],
        '2xl': ['24px', { lineHeight: '32px', letterSpacing: '0' }],
        '3xl': ['30px', { lineHeight: '36px', letterSpacing: '0' }],
        '4xl': ['36px', { lineHeight: '44px', letterSpacing: '0' }],
      },
      spacing: {
        '0': '0',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '9': '36px',
        '10': '40px',
        '12': '48px',
        '14': '56px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'base': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        'full': '9999px',
      },
      boxShadow: {
        // Premium, soft shadows for paper-like elevation
        'none': 'none',
        'xs': '0 1px 2px rgba(0, 0, 0, 0.03)',
        'sm': '0 1px 3px rgba(0, 0, 0, 0.08)',
        'base': '0 2px 4px rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.10)',
        'lg': '0 8px 12px rgba(0, 0, 0, 0.12)',
        'xl': '0 12px 20px rgba(0, 0, 0, 0.15)',
        'envelope': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.12)',
        'elevated': '0 10px 25px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-left': 'slideLeft 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'unfold': 'unfold 0.6s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(16px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-16px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(16px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-16px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        unfold: {
          '0%': {
            opacity: '0',
            transform: 'scaleY(0.8)',
          },
          '100%': {
            opacity: '1',
            transform: 'scaleY(1)',
          },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        bounceSoft: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-4px)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
}

export default config
