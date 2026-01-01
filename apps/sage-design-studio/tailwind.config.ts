import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../design-system/src/**/*.{ts,tsx}",
    "../../design-system/atoms/**/*.{ts,tsx}",
    "../../design-system/molecules/**/*.{ts,tsx}",
    "../../design-system/organisms/**/*.{ts,tsx}",
    "../../design-system/tokens/**/*.{ts,tsx}",
    "../../design-system/hooks/**/*.{ts,tsx}",
    "../../design-system/utils/**/*.{ts,tsx}",
    "../../design-system/providers/**/*.{ts,tsx}",
    "../../design-system/features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
