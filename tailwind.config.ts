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
        primary: {
          DEFAULT: "#1A56DB",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#F97316",
          foreground: "#FFFFFF",
        },
        neutral: {
          DEFAULT: "#0F172A",
          foreground: "#E2E8F0",
        },
      },
      boxShadow: {
        soft: "0 12px 35px -15px rgba(15, 23, 42, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
