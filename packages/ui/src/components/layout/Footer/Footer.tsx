'use client';;
import React from 'react';
import { GitHubIcon } from '../../data-display/GitHubIcon';

export interface FooterLink {
    label: string;
    href: string;
    external?: boolean;
}

export interface FooterSection {
    title: string;
    links: FooterLink[];
}

export interface FooterProps {
    /**
     * Brand/logo element or text
     */
    logo?: React.ReactNode;
    /**
     * Sections with links organized in columns
     */
    sections?: FooterSection[];
    /**
     * Social links (will be displayed with icons)
     */
    socialLinks?: {
        github?: string;
        linkedin?: string;
        email?: string;
    };
    /**
     * Copyright text
     */
    copyright?: string;
    /**
     * Additional className for customization
     */
    className?: string;
}

/**
 * Footer Organism
 *
 * Inspired by Swiss Grid design principles:
 * - 8px base unit spacing system
 * - Clear typographic hierarchy with structured columns
 * - Generous whitespace for breathing room
 * - Grid-based layout with precise alignment
 * - Minimal, functional aesthetic
 *
 * Features:
 * - Responsive multi-column layout
 * - Social links with icons
 * - Organized content sections
 * - Clean typography and spacing
 */
export const Footer = (
    {
        ref,
        logo,
        sections = [],
        socialLinks,
        copyright,
        className = ''
    }: FooterProps & {
        ref?: React.Ref<HTMLElement>;
    }
) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            ref={ref}
            className={`
                border-t border-[var(--color-border)]
                bg-[var(--color-background)]
                ${className}
            `}
        >
            {/* Main Footer Content - Swiss Grid: 8px base units */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Brand Section - Swiss Grid: Takes 4 columns on large screens */}
                    <div className="lg:col-span-4">
                        {logo && (
                            <div className="mb-6 text-2xl font-bold text-[var(--color-text-primary)]">
                                {logo}
                            </div>
                        )}
                    </div>

                    {/* Navigation Sections - Swiss Grid: Evenly distributed columns */}
                    {sections.map((section, index) => (
                        <div key={section.title} className="lg:col-span-2">
                            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            target={link.external ? '_blank' : undefined}
                                            rel={link.external ? 'noopener noreferrer' : undefined}
                                            className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200 text-sm"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Social Links - Swiss Grid: Takes remaining columns */}
                    {socialLinks && (
                        <div className="lg:col-span-2">
                            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">
                                Connect
                            </h3>
                            <ul className="space-y-3">
                                {socialLinks.github && (
                                    <li>
                                        <a
                                            href={socialLinks.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200 text-sm flex items-center gap-2"
                                        >
                                            <GitHubIcon size={16} />
                                            GitHub
                                        </a>
                                    </li>
                                )}
                                {socialLinks.linkedin && (
                                    <li>
                                        <a
                                            href={socialLinks.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200 text-sm"
                                        >
                                            LinkedIn
                                        </a>
                                    </li>
                                )}
                                {socialLinks.email && (
                                    <li>
                                        <a
                                            href={`mailto:${socialLinks.email}`}
                                            className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200 text-sm"
                                        >
                                            Email
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Bar - Swiss Grid: 8px base unit spacing */}
            <div className="border-t border-[var(--color-border)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <p className="text-sm text-[var(--color-text-secondary)] text-center">
                        {copyright || `© ${currentYear} All rights reserved.`}
                    </p>
                </div>
            </div>
        </footer>
    );
};
