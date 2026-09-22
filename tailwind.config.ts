import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#B8860B",
          light: "#D4A843",
          dark: "#8B6914",
        },
        burgundy: {
          DEFAULT: "#800020",
          light: "#A0334D",
          dark: "#5C0017",
        },
        cream: {
          DEFAULT: "#FFF8DC",
          dark: "#F5EDCC",
        },
        "brand-green": {
          DEFAULT: "#006400",
          light: "#228B22",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Playfair Display", "serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
