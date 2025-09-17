/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-dark": "0 6px 8px 0 rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [],
};
