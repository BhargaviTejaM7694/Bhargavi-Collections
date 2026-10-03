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
          DEFAULT: "#D4A843",
          light: "#f5c518",
          dark: "#B8860B",
        },
        burgundy: {
          DEFAULT: "#7B1A2C",
          light: "#9B2335",
          dark: "#5A0F1E",
        },
        cream: {
          DEFAULT: "#FFF8F0",
          dark: "#F5E6D0",
        },
        "brand-green": {
          DEFAULT: "#1a3a2a",
          light: "#2d5a42",
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
