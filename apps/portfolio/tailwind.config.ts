import type { Config } from "tailwindcss";
import path from "path";

const config: Config = {
    presets: [require("@sds/config/tailwind")],
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./mdx-components.tsx",
        // Use absolute path to ensure monorepo files are found
        path.join(__dirname, "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"),
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                header: ['var(--font-header)', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
export default config;
