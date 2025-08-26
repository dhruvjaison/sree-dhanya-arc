/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'luxury-gold': '#C9A96E',
        'deep-gold': '#B8956F',
        'charcoal': '#1A1A1A',
        'soft-charcoal': '#2A2A2A',
        'warm-white': '#FAFAFA',
        'cream': '#F8F6F3',
        'light-gray': '#E5E5E5',
        'medium-gray': '#999999',
        'text-primary': '#1A1A1A',
        'text-secondary': '#666666',
        'text-light': '#999999',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'section-title': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.3' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-left': 'fadeInLeft 0.8s ease-out forwards',
        'fade-right': 'fadeInRight 0.8s ease-out forwards',
        'scale-in': 'slideInScale 0.8s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInScale: {
          '0%': { opacity: '0', transform: 'scale(0.8) translateY(40px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      backdropBlur: {
        'luxury': '20px',
      },
      boxShadow: {
        'luxury': '0 20px 60px rgba(0, 0, 0, 0.1)',
        'luxury-hover': '0 30px 80px rgba(0, 0, 0, 0.15)',
        'gold': '0 8px 32px rgba(201, 169, 110, 0.3)',
        'gold-hover': '0 12px 40px rgba(201, 169, 110, 0.4)',
      },
    },
  },
  plugins: [],
} 