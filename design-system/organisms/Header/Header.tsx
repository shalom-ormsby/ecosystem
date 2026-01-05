'use client';

import React, { useState, useEffect } from 'react';
import { useMotionPreference } from '../../hooks';

export interface NavLink {
    label: string;
    href?: string;
    /**
     * Whether this link represents the current/active page
     * @default false
     */
    active?: boolean;
    /**
     * Nested links for dropdown menus
     */
    children?: Array<{
        label: string;
        href: string;
        active?: boolean;
    }>;
}

export interface HeaderProps {
    /**
     * Brand/logo element or text
     */
    logo?: React.ReactNode;
    /**
     * Array of navigation links
     */
    navLinks?: NavLink[];
    /**
     * Content for the right side (e.g., Sign In, CTA buttons)
     */
    actions?: React.ReactNode;
    /**
     * Whether to apply glass morphism effect on scroll
     * @default true
     */
    glassOnScroll?: boolean;
    /**
     * Scroll threshold in pixels before applying glass effect
     * @default 10
     */
    scrollThreshold?: number;
    /**
     * Whether the header is sticky (fixed position)
     * @default true
     */
    sticky?: boolean;
    /**
     * Font size for desktop navigation links
     * @default 'text-sm' (14px)
     */
    navLinkSize?: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg';
    /**
     * Font family for navigation links
     * Uses CSS variable --font-header-nav by default
     * Logo font is controlled by the logo ReactNode itself or --font-header-logo
     * @default 'var(--font-header-nav)'
     */
    fontFamily?: string;
    /**
     * Maximum width for header content
     * @default 'max-w-7xl' (1280px)
     */
    maxWidth?: 'max-w-7xl' | 'max-w-[1440px]' | 'max-w-4xl';
    /**
     * Additional className for customization
     */
    className?: string;
}

export const Header = React.forwardRef<HTMLElement, HeaderProps>(
    (
        {
            logo,
            navLinks = [],
            actions,
            glassOnScroll = true,
            scrollThreshold = 10,
            sticky = true,
            navLinkSize = 'text-sm',
            fontFamily = 'var(--font-header-nav)',
            maxWidth = 'max-w-7xl',
            className = '',
        },
        ref
    ) => {
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const [hasScrolled, setHasScrolled] = useState(false);
        const [openDropdown, setOpenDropdown] = useState<string | null>(null);
        const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);
        const { shouldAnimate } = useMotionPreference();

        // Handle scroll detection
        useEffect(() => {
            if (!glassOnScroll) return;

            const handleScroll = () => {
                setHasScrolled(window.scrollY > scrollThreshold);
            };

            window.addEventListener('scroll', handleScroll, { passive: true });
            return () => window.removeEventListener('scroll', handleScroll);
        }, [glassOnScroll, scrollThreshold]);

        // Lock body scroll when mobile menu is open
        useEffect(() => {
            if (isMenuOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            return () => {
                document.body.style.overflow = '';
            };
        }, [isMenuOpen]);

        const baseStyles = 'top-0 left-0 right-0 z-50';
        const positionStyles = sticky ? 'fixed' : 'relative';
        const transitionStyles = shouldAnimate
            ? 'transition-all duration-300'
            : '';

        // Glass morphism effect using design system colors
        const backgroundStyles = hasScrolled && glassOnScroll
            ? 'backdrop-blur-xl bg-[var(--color-surface)]/80 border-b border-[var(--color-border)]'
            : 'bg-[var(--color-surface)] border-b border-[var(--color-border)]';

        return (
            <>
                <header
                    ref={ref}
                    className={`${baseStyles} ${positionStyles} ${transitionStyles} ${backgroundStyles} ${className}`}
                >
                    <div className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8`}>
                        <div className="flex items-center justify-between h-16 lg:h-20 relative">
                            {/* Logo */}
                            {logo && (
                                <div className="flex-shrink-0 z-10">
                                    {logo}
                                </div>
                            )}

                            {/* Desktop Navigation - Centered */}
                            {navLinks.length > 0 && (
                                <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2" aria-label="Main navigation">
                                    {navLinks.map((link) => {
                                        const hasDropdown = link.children && link.children.length > 0;
                                        const isOpen = openDropdown === link.label;

                                        if (hasDropdown) {
                                            return (
                                                <div
                                                    key={link.label}
                                                    className="relative group"
                                                    onMouseEnter={() => setOpenDropdown(link.label)}
                                                    onMouseLeave={() => setOpenDropdown(null)}
                                                >
                                                    <button
                                                        className={`
                                                            ${navLinkSize}
                                                            relative
                                                            pb-1
                                                            flex items-center gap-1
                                                            focus-visible:outline
                                                            focus-visible:outline-2
                                                            focus-visible:outline-offset-4
                                                            focus-visible:outline-[var(--color-focus)]
                                                            rounded-sm
                                                            ${shouldAnimate ? 'transition-colors duration-200' : ''}
                                                            ${
                                                                link.active
                                                                    ? 'text-[var(--color-text-primary)] font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--color-primary)] after:rounded-full'
                                                                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]'
                                                            }
                                                        `}
                                                        style={{ fontFamily }}
                                                        aria-expanded={isOpen}
                                                        aria-haspopup="true"
                                                    >
                                                        {link.label}
                                                        <svg
                                                            width="12"
                                                            height="12"
                                                            viewBox="0 0 12 12"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className={`${shouldAnimate ? 'transition-transform duration-200' : ''} ${isOpen ? 'rotate-180' : ''}`}
                                                        >
                                                            <polyline points="2 4 6 8 10 4" />
                                                        </svg>
                                                    </button>
                                                    {/* Invisible bridge to prevent dropdown from closing */}
                                                    {isOpen && <div className="absolute top-full left-1/2 -translate-x-1/2 w-[200px] h-2" />}
                                                    {isOpen && (
                                                        <div className={`
                                                            absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[200px] z-50
                                                            bg-[var(--color-surface)] border border-[var(--color-border)]
                                                            rounded-lg shadow-lg py-2
                                                            ${shouldAnimate ? 'animate-fade-in' : ''}
                                                        `}>
                                                            {link.children?.map((child) => (
                                                                <a
                                                                    key={child.label}
                                                                    href={child.href}
                                                                    className={`
                                                                        block px-4 py-2 text-sm
                                                                        ${shouldAnimate ? 'transition-colors duration-200' : ''}
                                                                        ${
                                                                            child.active
                                                                                ? 'text-[var(--color-text-primary)] font-medium bg-[var(--color-surface)]'
                                                                                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background)]'
                                                                        }
                                                                    `}
                                                                    aria-current={child.active ? 'page' : undefined}
                                                                >
                                                                    {child.label}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        }

                                        return (
                                            <a
                                                key={link.label}
                                                href={link.href}
                                                aria-current={link.active ? 'page' : undefined}
                                                className={`
                                                    ${navLinkSize}
                                                    relative
                                                    pb-1
                                                    focus-visible:outline
                                                    focus-visible:outline-2
                                                    focus-visible:outline-offset-4
                                                    focus-visible:outline-[var(--color-focus)]
                                                    rounded-sm
                                                    ${shouldAnimate ? 'transition-colors duration-200' : ''}
                                                    ${
                                                        link.active
                                                            ? 'text-[var(--color-text-primary)] font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--color-primary)] after:rounded-full'
                                                            : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]'
                                                    }
                                                `}
                                                style={{ fontFamily }}
                                            >
                                                {link.label}
                                            </a>
                                        );
                                    })}
                                </nav>
                            )}

                            {/* Desktop Actions */}
                            {actions && (
                                <div className="hidden lg:flex items-center gap-4 z-10">
                                    {actions}
                                </div>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`
                                    lg:hidden
                                    p-2
                                    text-[var(--color-text-primary)]
                                    hover:bg-[var(--color-surface)]
                                    rounded-lg
                                    focus-visible:outline
                                    focus-visible:outline-2
                                    focus-visible:outline-offset-2
                                    focus-visible:outline-[var(--color-focus)]
                                    ${shouldAnimate ? 'transition-colors duration-200' : ''}
                                `}
                                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={isMenuOpen}
                            >
                                {isMenuOpen ? (
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                ) : (
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <line x1="3" y1="12" x2="21" y2="12" />
                                        <line x1="3" y1="6" x2="21" y2="6" />
                                        <line x1="3" y1="18" x2="21" y2="18" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Mobile Full-Screen Menu */}
                <div
                    className={`
                        fixed inset-0 z-[100] lg:hidden
                        ${shouldAnimate ? 'transition-all duration-300' : ''}
                        ${isMenuOpen
                            ? 'opacity-100 pointer-events-auto'
                            : 'opacity-0 pointer-events-none'
                        }
                    `}
                    aria-hidden={!isMenuOpen}
                >
                    <div className="absolute inset-0 bg-[var(--color-background)]">
                        <div className="flex flex-col items-center justify-center h-full gap-8 px-4">
                            {/* Mobile Navigation Links */}
                            {navLinks.map((link, index) => {
                                const hasDropdown = link.children && link.children.length > 0;
                                const isExpanded = expandedMobileSection === link.label;

                                if (hasDropdown) {
                                    return (
                                        <div key={link.label} className="w-full max-w-xs">
                                            <button
                                                onClick={() => setExpandedMobileSection(isExpanded ? null : link.label)}
                                                className={`
                                                    text-3xl w-full text-center
                                                    focus-visible:outline
                                                    focus-visible:outline-2
                                                    focus-visible:outline-offset-4
                                                    focus-visible:outline-[var(--color-focus)]
                                                    rounded-sm
                                                    ${shouldAnimate ? 'transition-all duration-200' : ''}
                                                    ${
                                                        link.active
                                                            ? 'text-[var(--color-primary)] font-semibold'
                                                            : 'text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)]'
                                                    }
                                                `}
                                                style={
                                                    shouldAnimate && isMenuOpen
                                                        ? {
                                                            animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`,
                                                            opacity: 0,
                                                            fontFamily,
                                                        }
                                                        : { opacity: 1, fontFamily }
                                                }
                                                aria-expanded={isExpanded}
                                            >
                                                {link.label}
                                            </button>
                                            {isExpanded && (
                                                <div className="flex flex-col gap-3 mt-4">
                                                    {link.children?.map((child) => (
                                                        <a
                                                            key={child.label}
                                                            href={child.href}
                                                            onClick={() => setIsMenuOpen(false)}
                                                            className={`
                                                                text-xl
                                                                focus-visible:outline
                                                                focus-visible:outline-2
                                                                focus-visible:outline-offset-4
                                                                focus-visible:outline-[var(--color-focus)]
                                                                rounded-sm
                                                                ${shouldAnimate ? 'transition-colors duration-200' : ''}
                                                                ${
                                                                    child.active
                                                                        ? 'text-[var(--color-primary)] font-medium'
                                                                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                                                                }
                                                            `}
                                                            aria-current={child.active ? 'page' : undefined}
                                                        >
                                                            {child.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                return (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        aria-current={link.active ? 'page' : undefined}
                                        className={`
                                            text-3xl
                                            focus-visible:outline
                                            focus-visible:outline-2
                                            focus-visible:outline-offset-4
                                            focus-visible:outline-[var(--color-focus)]
                                            rounded-sm
                                            ${shouldAnimate ? 'transition-all duration-200' : ''}
                                            ${
                                                link.active
                                                    ? 'text-[var(--color-primary)] font-semibold'
                                                    : 'text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)]'
                                            }
                                        `}
                                        style={
                                            shouldAnimate && isMenuOpen
                                                ? {
                                                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`,
                                                    opacity: 0,
                                                    fontFamily,
                                                }
                                                : { opacity: 1, fontFamily }
                                        }
                                    >
                                        {link.label}
                                    </a>
                                );
                            })}

                            {/* Mobile Actions */}
                            {actions && (
                                <div
                                    className="flex flex-col gap-4 mt-8 w-full max-w-xs"
                                    style={
                                        shouldAnimate && isMenuOpen
                                            ? {
                                                animation: `fadeInUp 0.5s ease-out ${navLinks.length * 0.1}s forwards`,
                                                opacity: 0,
                                            }
                                            : { opacity: 1 }
                                    }
                                >
                                    {actions}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Animation keyframes - only added if motion is enabled */}
                {shouldAnimate && (
                    <style>{`
                        @keyframes fadeInUp {
                            from {
                                opacity: 0;
                                transform: translateY(20px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }
                    `}</style>
                )}
            </>
        );
    }
);

Header.displayName = 'Header';
