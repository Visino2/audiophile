/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Manrope', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#D87D4A',
        'primary-light': '#FBAF85',
        dark: '#101010',
        'dark-alt': '#191919',
        'gray-light': '#F1F1F1',
        bg: '#FAFAFA',
        white: '#FFFFFF',
        black: '#000000',
      },
      maxWidth: {
        container: '1110px',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      },
      transitionTimingFunction: {
        'soft-in-out': 'cubic-bezier(0.25, 0.8, 0.25, 1)',
      },
    },
  },
  plugins: [],
};
