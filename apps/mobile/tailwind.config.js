/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: We import the shared config content too
    presets: [require("nativewind/preset"), require("@sage/config/tailwind")],
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./app/**/*.{js,jsx,ts,tsx}",
        "../../packages/ui/src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
