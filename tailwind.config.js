module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        saira: ["Saira", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: '#7B1F2B', // Bordó/Vino
        },
        bordo: {
          DEFAULT: '#7B1F2B', // Alias para Bordó/Vino
        },
        bgSection: {
          DEFAULT: '#F8E7C1', // Fondo dorado claro
        },
        accent: {
          DEFAULT: '#696565ff', // Gris plata
        },
        base: {
          DEFAULT: '#18181b', // Gris oscuro casi negro
          light: '#fff8e1',   // Gris/dorado muy claro
        },
        contrast: {
          DEFAULT: '#fff',     // Blanco puro
        },
      },
    },
  },
  plugins: [],
};
