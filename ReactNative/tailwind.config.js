/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {

      'roxo-escuro': '#4b0082', 
      'dourado': '#ffd700', 
      'amarelo-vivo': '#ffeb3b', 


      'roxo-claro': '#d8b4fe',
      'roxo-medio': '#6b21a8',
      'cinza-claro': '#d1d5db', 
      'cinza-escuro': '#111827', 


      'verde-correto': '#22c55e', 
      'vermelho-incorreto': '#ef4444', 


      'verde-tempo': '#22c55e', 
      'amarelo-tempo': '#eab308', 
      'vermelho-tempo': '#ef4444', 
      'cinza-fundo': '#e5e7eb', 
        primary: '#030014',
        secondary: '#151312',
        light: {
          100: '#D6C6FF',
          200: '#A8B5DB',
          300: '#9CA4AB',
        },
        dark: {
          100: '#221f3d',
          200: '#0f0d23',
        },
        accent: '#AB8BFF'

      }
    },
  },
  plugins: [],
}