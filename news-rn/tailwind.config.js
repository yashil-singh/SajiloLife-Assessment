/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#005e42",
        secondary: "#ecf7a3",
        background: "#ffffff",
        foreground: "#09090b",
        hover: "#f4f4f5",
        destructive: "#ef4444",
        border: "#e4e4e7",
      },
    },
  },
  plugins: [],
};
