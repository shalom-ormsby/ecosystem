import type { Config } from "tailwindcss";
import path from "path";

const config: Config = {
  presets: [require("@sds/config/tailwind")],
  content: [
    // Use absolute path to ensure monorepo files are found
    path.join(__dirname, "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"),
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
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
