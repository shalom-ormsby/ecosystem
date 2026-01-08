/**
 * Font Loader for Sage Design Studio
 * Loads documentation fonts and theme fonts for examples
 */

import { Nunito, Nunito_Sans, Outfit, Manrope, Lora, Instrument_Sans, Space_Grotesk, Fira_Code } from 'next/font/google';

/**
 * Documentation Fonts (for the docs UI itself)
 */
export const nunito = Nunito({
    subsets: ['latin'],
    variable: '--font-nunito',
    display: 'swap',
    weight: ['300', '400', '600', '700'],
});

export const nunitoSans = Nunito_Sans({
    subsets: ['latin'],
    variable: '--font-nunito-sans',
    display: 'swap',
    weight: ['300', '400', '600', '700', '800'],
});

/**
 * Studio Theme Fonts
 */
export const studioHeading = Outfit({
    subsets: ['latin'],
    variable: '--font-studio-heading',
    display: 'swap',
    weight: ['300', '400', '600', '700', '800'],
});

export const studioBody = Manrope({
    subsets: ['latin'],
    variable: '--font-studio-body',
    display: 'swap',
    weight: ['300', '400', '600', '700', '800'],
});

/**
 * Sage Theme Fonts
 */
export const sageHeading = Lora({
    subsets: ['latin'],
    variable: '--font-sage-heading',
    display: 'swap',
    weight: ['400', '600', '700'],
});

export const sageBody = Instrument_Sans({
    subsets: ['latin'],
    variable: '--font-sage-body',
    display: 'swap',
    weight: ['400', '500', '600', '700'],
});

/**
 * Volt Theme Fonts
 */
export const voltHeading = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-volt-heading',
    display: 'swap',
    weight: ['300', '400', '600', '700'],
});

/**
 * Monospace (all themes)
 */
export const mono = Fira_Code({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap',
    weight: ['400', '500', '600', '700'],
});

/**
 * Header Component Fonts
 * Independent of theme fonts - used specifically for Header organism
 */
export const headerFont = Instrument_Sans({
    subsets: ['latin'],
    variable: '--font-header',
    display: 'swap',
    weight: ['400', '500', '600', '700'],
});

/**
 * All font variables combined
 * Apply to root HTML element className
 */
export const allFontVariables = [
    nunito.variable,
    nunitoSans.variable,
    studioHeading.variable,
    studioBody.variable,
    sageHeading.variable,
    sageBody.variable,
    voltHeading.variable,
    mono.variable,
    headerFont.variable,
].join(' ');
