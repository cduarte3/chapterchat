/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "custom-dark": "0 6px 8px 0 rgba(0, 0, 0, 0.8)",
      },
    },
  },
};
