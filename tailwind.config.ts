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
          DEFAULT: "#1a3a2a",
          light: "#2d5a42",
          dark: "#0f2a1c",
        },
        cream: {
          DEFAULT: "#f0f5f1",
          dark: "#dce8de",
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
