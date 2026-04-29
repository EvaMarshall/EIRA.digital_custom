module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4A4F57",        // text primary
        secondary: "#F7F7F5",      // text secondary
        bgprimary: "#F7F7F5",      // background primary
        bgsecondary: "#93A6B9",    // background secondary
      },
      fontFamily: {
        heading: [
          "Helvetica Neue",
          "Helvetica",
          "Segoe UI",
          "Roboto",
          "Arial",
          "sans-serif"
        ],
        body: [
          "Source Sans Pro",
          "Helvetica Neue",
          "Helvetica",
          "Segoe UI",
          "Roboto",
          "Arial",
          "sans-serif"
        ],
      },
      fontSize: {
        h1: "28px",
        h2: "20px",
        body: "20px",
      },
      screens: {
        xs: "425px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};
