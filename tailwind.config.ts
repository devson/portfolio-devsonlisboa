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
        background: "var(--background)",
        foreground: "var(--foreground)",
        "black-obsidian": "#0a0a0a",
        "off-white": "#f5f5f0",
        "warm-gray": "#e5e5e0",
        "soft-stone": "#d1d1cd",
        "mineral-dark": "#2a2a29",
        "accent-bronze": "#a99260",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      transitionTimingFunction: {
        'crisp': 'cubic-bezier(0.16, 1, 0.3, 1)', // Snappy, editorial feel
        'smooth': 'cubic-bezier(0.65, 0, 0.35, 1)',
      }
    },
  },
  plugins: [],
};
export default config;
