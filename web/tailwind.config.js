module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}","public/*.html"],
  theme: {
    extend: {
      colors: {
        "purple": "#712B75",
        "orange": "#D49B54",
        "lightOrange": "#FFD39A",
        "darkPurple": "#46244C",
      },
      fontFamily: {
        "heading": ["Holtwood One SC"],
        "mono": ["Fira Code"],
      }
    },
  },
  plugins: [],
};
