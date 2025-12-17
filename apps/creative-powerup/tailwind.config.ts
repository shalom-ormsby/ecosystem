import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "../../design-system/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        "background-secondary": "var(--color-background-secondary)",
        foreground: "var(--color-foreground)",
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
      },
    },
  },
  plugins: [],
};
export default config;
