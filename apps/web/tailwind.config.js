module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#252740',
        'primary-low': '#626486',
        'accent': '#F56D4B',
        'accent-low': '#FAB70B',
      },
      keyframes: {
        dino: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' }
        }
      },
      animation: {
        'dino': 'dino 3s linear forwards'
      }
    },
  },
  plugins: [],
}