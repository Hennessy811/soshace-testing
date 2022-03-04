const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ffc051",
          "primary-focus": "#e6ab45",
          "primary-content": "#332730",
          secondary: "#375a64",
          "secondary-focus": "#567a89",
          "secondary-content": "#ffffff",
          accent: "#ffc051",
          "accent-focus": "#e6ab45",
          "accent-content": "#ffffff",
          neutral: "#3d4451",
          "neutral-focus": "#2a2e37",
          "neutral-content": "#ffffff",
          "base-100": "#fff",
          "base-200": "#fff6ee",
          "base-300": "#d1d5db",
          "base-content": "#332730",
          info: "#2094f3",
          success: "#009485",
          warning: "#ff9900",
          error: "#ff5724",
        },
      },
    ],
  },
  // eslint-disable-next-line global-require
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("daisyui"),
  ],
}
