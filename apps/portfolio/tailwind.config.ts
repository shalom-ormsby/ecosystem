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
                // Theme-aware colors that respond to CSS variables
                background: "var(--color-background)",
                foreground: "var(--color-foreground)",

                // Neutral scale - derived from foreground for light/dark mode
                neutral: {
                    50: "var(--color-background-secondary)",
                    100: "var(--color-background-secondary)",
                    200: "color-mix(in srgb, var(--color-foreground) 10%, var(--color-background) 90%)",
                    300: "color-mix(in srgb, var(--color-foreground) 20%, var(--color-background) 80%)",
                    400: "color-mix(in srgb, var(--color-foreground) 35%, var(--color-background) 65%)",
                    500: "color-mix(in srgb, var(--color-foreground) 50%, var(--color-background) 50%)",
                    600: "color-mix(in srgb, var(--color-foreground) 65%, var(--color-background) 35%)",
                    700: "color-mix(in srgb, var(--color-foreground) 75%, var(--color-background) 25%)",
                    800: "color-mix(in srgb, var(--color-foreground) 85%, var(--color-background) 15%)",
                    900: "color-mix(in srgb, var(--color-foreground) 92%, var(--color-background) 8%)",
                    950: "var(--color-foreground)"
                },

                primary: {
                    DEFAULT: "var(--color-primary)",
                    foreground: "var(--color-background)"
                },

                accent: {
                    DEFAULT: "var(--color-accent)",
                    foreground: "var(--color-background)"
                }
            },
            fontFamily: {
                sans: ['var(--font-body)', 'sans-serif'],
                heading: ['var(--font-heading)', 'sans-serif'],
                mono: ['var(--font-mono)', 'monospace'],
            },
        },
    },
    plugins: [],
};
export default config;
