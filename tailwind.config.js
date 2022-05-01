module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "brand-black": "var(--clr-black)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
