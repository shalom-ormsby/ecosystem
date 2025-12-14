import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./mdx-components.tsx",
        "../../design-system/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#ffffff",
                foreground: "#0a0a0a",
                neutral: {
                    50: "#fafafa",
                    100: "#f5f5f5",
                    200: "#e5e5e5",
                    300: "#d4d4d4",
                    400: "#a3a3a3",
                    500: "#737373",
                    600: "#525252",
                    700: "#404040",
                    800: "#262626",
                    900: "#171717",
                    950: "#0a0a0a"
                },
                primary: {
                    DEFAULT: "#0099ff",
                    foreground: "#ffffff"
                },
                accent: {
                    DEFAULT: "#f5f5f5",
                    foreground: "#171717"
                }
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
export default config;
