module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx}", "./src/**/*.{ts,tsx}"],
    theme: { 
      extend: {
        keyframes: {
          dino: {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(100vw)' }
          }
        },
        animation: {
          'dino': 'dino 3s linear forwards'
        }
      } 
    },
    plugins: []
  };