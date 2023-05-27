/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        greeny: {
          DEFAULT: "#08A72B",
          50: "#CEEDD5",
          100: "#9EDEAC",
          200: "#6DCE82",
          300: "#3ABB56",
          400: "#08A72B",
          500: "#078623",
          600: "#05641A",
          700: "#044312",
          800: "#022109",
          900: "#011104",
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [],
};
