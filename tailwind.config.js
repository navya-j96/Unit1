/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // ⚠️ DISABLE all default Tailwind colors
    colors: {
      // Only Bayer Design System colors are allowed
      // Use CSS classes from bayer-theme.css instead
      
      // Essential colors for basic functionality
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      
      // Bayer Primary Colors (Pink/Red)
      'bayer-primary': {
        50: '#ffdce4',
        100: '#ffbece',
        200: '#ff7596',
        300: '#ff3162',
        400: '#de0043',
        500: '#bf124b',
        600: '#a02453',
        700: '#81365b',
        800: '#624963',
        900: '#443247',
      },
      
      // Bayer Secondary Colors (Blue)
      'bayer-secondary': {
        50: '#e7f8ff',
        100: '#cdf1ff',
        200: '#a4e7ff',
        300: '#3eccff',
        400: '#00bcff',
        500: '#0091df',
        600: '#007cb8',
        700: '#006f9b',
        800: '#00617f',
        900: '#10384f',
      },
    },
    extend: {
      // Use Bayer CSS variables
      backgroundColor: {
        'lmnt-primary': 'var(--lmnt-theme-primary)',
        'lmnt-primary-variant': 'var(--lmnt-theme-primary-variant)',
        'lmnt-secondary': 'var(--lmnt-theme-secondary)',
        'lmnt-secondary-variant': 'var(--lmnt-theme-secondary-variant)',
        'lmnt-surface': 'var(--lmnt-theme-surface)',
        'lmnt-surface-variant': 'var(--lmnt-theme-surface-variant)',
        'lmnt-background': 'var(--lmnt-theme-background)',
        'lmnt-danger': 'var(--lmnt-theme-danger)',
        'lmnt-success': 'var(--lmnt-theme-success)',
      },
      textColor: {
        'lmnt-primary': 'var(--lmnt-theme-primary)',
        'lmnt-on-primary': 'var(--lmnt-on-primary-base)',
        'lmnt-secondary': 'var(--lmnt-theme-secondary)',
        'lmnt-on-secondary': 'var(--lmnt-on-secondary-base)',
        'lmnt-on-surface': 'var(--lmnt-theme-on-surface)',
        'lmnt-on-background': 'var(--lmnt-theme-on-background)',
        'lmnt-danger': 'var(--lmnt-theme-danger)',
        'lmnt-success': 'var(--lmnt-theme-success)',
      },
      borderColor: {
        'lmnt-primary': 'var(--lmnt-theme-primary)',
        'lmnt-secondary': 'var(--lmnt-theme-secondary)',
        'lmnt-danger': 'var(--lmnt-theme-danger)',
        'lmnt-success': 'var(--lmnt-theme-success)',
      },
    },
  },
  plugins: [],
}