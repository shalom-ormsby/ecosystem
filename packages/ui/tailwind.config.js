const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [require('@sage/config/tailwind')],
    content: [join(__dirname, 'src/**/*.{ts,tsx}')],
    theme: {
        extend: {},
    },
    plugins: [],
};
