/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode toggle
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom Fonts
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        poppins: ["Poppins", "serif"],
      },
      // Custom Colors
      colors: {
        primary: '#0D8267',
        secondary: '#ffed4a',
        accent: '#38b2ac',
        dark: '#1a202c',
        light: '#edf2f7',
        danger: '#e53e3e',
        darkBg: "#121212", // Your custom dark background color
      },
      // Custom Animations
      animation: {
        bounce: 'bounce 1s infinite',
        fadeIn: 'fadeIn 1s ease-out forwards',
        slideIn: 'slideIn 0.5s ease-out forwards',
        progress: 'progress-animation 1.5s ease-out forwards', // Added animation for progress bars
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        progressAnimation: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
};
