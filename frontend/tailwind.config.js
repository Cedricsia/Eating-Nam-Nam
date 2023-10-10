/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "banniere-sm": "url('./assets/banniere-home-sm.jpg')",
        "banniere-md": "url('./assets/banniere-home-md.jpg')",
        "banniere-lg": "url('./assets/banniere-home-lg.jpg')",
      },
    },
    fontFamily: {
      text: ["Aleo", "serif"],
      heading: ["Now", "serif"],
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#D56C06",
          secondary: "#97BF0D",
          accent: "#ECE8DA",
          neutral: "#fffcf3",
          "base-content": "#242422",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          stars: "#D68E16",
          error: "#f87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
