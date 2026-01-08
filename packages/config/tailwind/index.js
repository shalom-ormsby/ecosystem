/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            colors: {
                background: {
                    DEFAULT: 'var(--color-background)',
                    secondary: 'var(--color-background-secondary)',
                    tertiary: 'var(--color-background-tertiary)',
                },
                foreground: {
                    DEFAULT: 'var(--color-foreground)',
                    secondary: 'var(--color-text-secondary)',
                    tertiary: 'var(--color-text-muted)',
                },
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    foreground: 'var(--color-primary-foreground)',
                },
                secondary: {
                    DEFAULT: 'var(--color-secondary)',
                    foreground: 'var(--color-secondary-foreground)',
                },
                accent: {
                    DEFAULT: 'var(--color-accent)',
                    foreground: 'var(--color-accent-foreground)',
                },
                destructive: {
                    DEFAULT: 'var(--color-destructive)',
                    foreground: 'var(--color-destructive-foreground)',
                },
                muted: {
                    DEFAULT: 'var(--color-muted)',
                    foreground: 'var(--color-muted-foreground)',
                },
                popover: {
                    DEFAULT: 'var(--color-popover)',
                    foreground: 'var(--color-popover-foreground)',
                },
                card: {
                    DEFAULT: 'var(--color-card)',
                    foreground: 'var(--color-card-foreground)',
                },
                success: {
                    DEFAULT: 'var(--color-success)',
                    foreground: 'var(--color-success-foreground)',
                },
                warning: {
                    DEFAULT: 'var(--color-warning)',
                    foreground: 'var(--color-warning-foreground)',
                },
                error: {
                    DEFAULT: 'var(--color-error)',
                    foreground: 'var(--color-error-foreground)',
                },
                info: {
                    DEFAULT: 'var(--color-info)',
                    foreground: 'var(--color-info-foreground)',
                },
                surface: 'var(--color-surface)',
                border: 'var(--color-border)',
                input: 'var(--color-input)',
                ring: 'var(--color-ring)',
                glass: {
                    DEFAULT: 'var(--color-glass)',
                    border: 'var(--color-glass-border)',
                },
            },
            fontFamily: {
                heading: ['var(--font-heading)'],
                body: ['var(--font-body)'],
                mono: ['var(--font-mono)'],
            }
        },
    },
    plugins: [],
};
