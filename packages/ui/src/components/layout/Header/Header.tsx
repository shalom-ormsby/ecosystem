'use client';

import React, { useState, useEffect } from 'react';
import { useMotionPreference } from '../../../hooks/useMotionPreference';
import { NavLink } from '../../navigation/NavLink';
import { Menu, X, ChevronDown } from 'lucide-react';

export interface HeaderNavLink {
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
    navLinks?: HeaderNavLink[];
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
     * Alignment of the navigation links
     * @default 'center'
     */
    navAlignment?: 'center' | 'left' | 'right';
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
            navAlignment = 'center',
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
        const { shouldAnimate, scale } = useMotionPreference();

        // Calculate motion factors
        const motionFactor = shouldAnimate && scale > 0 ? (5 / scale) : 0;
        const transitionDuration = `${300 * motionFactor}ms`;

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
        const transitionStyles = shouldAnimate ? 'transition-all' : '';

        // Liquid Glass Effect
        // Unscrolled: Transparent & Borderless (looks printed on background), but with blur for "liquid" feel over Orb
        // Scrolled: Wetter glass, more opaque, shadow for depth, no harsh borders
        const backgroundStyles = hasScrolled && glassOnScroll
            ? 'backdrop-blur-3xl bg-[var(--color-surface)]/60 border-b border-transparent shadow-sm supports-[backdrop-filter]:bg-[var(--color-surface)]/50'
            : 'bg-transparent border-b border-transparent backdrop-blur-xl';

        // Nav Alignment Classes
        const getNavClasses = () => {
            switch (navAlignment) {
                case 'left':
                    return 'ml-8 mr-auto';
                case 'right':
                    return 'ml-auto mr-8';
                case 'center':
                default:
                    return 'absolute left-1/2 -translate-x-1/2';
            }
        };

        return (
            <>
                <header
                    ref={ref}
                    className={`${baseStyles} ${positionStyles} ${transitionStyles} ${backgroundStyles} ${className}`}
                    style={{ transitionDuration }}
                >
                    <div className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8`}>
                        <div className="flex items-center justify-between h-16 lg:h-20 relative">
                            {/* Logo */}
                            {logo && (
                                <div className="flex-shrink-0 z-10">
                                    {logo}
                                </div>
                            )}

                            {/* Desktop Navigation */}
                            {navLinks.length > 0 && (
                                <nav
                                    className={`hidden lg:flex items-center gap-8 ${getNavClasses()}`}
                                    aria-label="Main navigation"
                                >
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
                                                            ${shouldAnimate ? 'transition-colors' : ''}
                                                            ${link.active
                                                                ? 'text-[var(--color-text-primary)] font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--color-primary)] after:rounded-full'
                                                                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                                                            }
                                                        `}
                                                        style={{ fontFamily, transitionDuration }}
                                                        aria-expanded={isOpen}
                                                        aria-haspopup="true"
                                                    >
                                                        {link.label}
                                                        <ChevronDown className={`w-3 h-3 ${shouldAnimate ? 'transition-transform' : ''} ${isOpen ? 'rotate-180' : ''}`} style={{ transitionDuration }} />
                                                    </button>
                                                    {/* Invisible bridge to prevent dropdown from closing */}
                                                    {isOpen && <div className="absolute top-full left-1/2 -translate-x-1/2 w-[200px] h-2" />}
                                                    {isOpen && (
                                                        <div className={`
                                                            absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[200px] z-50
                                                            bg-[var(--color-surface)] border border-[var(--color-border)]
                                                            rounded-lg shadow-xl py-1 p-1
                                                            backdrop-blur-3xl bg-[var(--color-surface)]/95
                                                            ${shouldAnimate ? 'animate-fade-in' : ''}
                                                        `} style={{ animationDuration: `${0.2 * motionFactor}s` }}>
                                                            {link.children?.map((child) => (
                                                                <NavLink
                                                                    key={child.label}
                                                                    href={child.href}
                                                                    active={child.active}
                                                                    variant="pill"
                                                                    className="w-full"
                                                                >
                                                                    {child.label}
                                                                </NavLink>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        }

                                        return (
                                            <NavLink
                                                key={link.label}
                                                href={link.href}
                                                active={link.active}
                                                variant="minimal"
                                                className={navLinkSize}
                                                style={{ fontFamily }}
                                            >
                                                {link.label}
                                            </NavLink>
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
                                    ${shouldAnimate ? 'transition-colors' : ''}
                                `}
                                style={{ transitionDuration }}
                                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={isMenuOpen}
                            >
                                {isMenuOpen ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Mobile Full-Screen Menu */}
                <div
                    className={`
                        fixed inset-0 z-[100] lg:hidden
                        ${shouldAnimate ? 'transition-all' : ''}
                        ${isMenuOpen
                            ? 'opacity-100 pointer-events-auto'
                            : 'opacity-0 pointer-events-none'
                        }
                    `}
                    style={{ transitionDuration }}
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
                                                    ${shouldAnimate ? 'transition-all' : ''}
                                                    ${link.active
                                                        ? 'text-[var(--color-primary)] font-semibold'
                                                        : 'text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)]'
                                                    }
                                                `}
                                                style={
                                                    shouldAnimate && isMenuOpen
                                                        ? {
                                                            animation: `fadeInUp ${0.5 * motionFactor}s ease-out ${index * 0.1 * motionFactor}s forwards`,
                                                            opacity: 0,
                                                            fontFamily,
                                                            transitionDuration
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
                                                                text-xl text-center block
                                                                focus-visible:outline
                                                                focus-visible:outline-2
                                                                focus-visible:outline-offset-4
                                                                focus-visible:outline-[var(--color-focus)]
                                                                rounded-sm
                                                                ${shouldAnimate ? 'transition-colors' : ''}
                                                                ${child.active
                                                                    ? 'text-[var(--color-primary)] font-medium'
                                                                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                                                                }
                                                            `}
                                                            style={{ transitionDuration }}
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
                                            ${shouldAnimate ? 'transition-all' : ''}
                                            ${link.active
                                                ? 'text-[var(--color-primary)] font-semibold'
                                                : 'text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)]'
                                            }
                                        `}
                                        style={
                                            shouldAnimate && isMenuOpen
                                                ? {
                                                    animation: `fadeInUp ${0.5 * motionFactor}s ease-out ${index * 0.1 * motionFactor}s forwards`,
                                                    opacity: 0,
                                                    fontFamily,
                                                    transitionDuration
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
                                                animation: `fadeInUp ${0.5 * motionFactor}s ease-out ${navLinks.length * 0.1 * motionFactor}s forwards`,
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
