/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-dark": "0 4px 6px 0 rgba(0, 0, 0, 0.5)",
      },
    },
  },
};
