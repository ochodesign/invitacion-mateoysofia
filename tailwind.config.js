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
          DEFAULT: '#272b00', // Verde oliva
        },
        bgSection: {
          DEFAULT: '#bec092', // Fondo de sección
        },
        accent: {
          DEFAULT: '#C97B63', // Terracota, acompaña bien el verde oliva
        },
        base: {
          DEFAULT: '#18181b', // Gris oscuro casi negro
          light: '#f9fafb',   // Gris muy claro
        },
        contrast: {
          DEFAULT: '#fff',     // Blanco puro
        },
      },
    },
  },
  plugins: [],
};
