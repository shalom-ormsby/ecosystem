import React, { useState, useEffect } from 'react';
import { useMotionPreference } from '../../hooks';

export interface NavLink {
    label: string;
    href: string;
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
            className = '',
        },
        ref
    ) => {
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const [hasScrolled, setHasScrolled] = useState(false);
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
                    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16 lg:h-20">
                            {/* Logo */}
                            {logo && (
                                <div className="flex-shrink-0">
                                    {logo}
                                </div>
                            )}

                            {/* Desktop Navigation */}
                            {navLinks.length > 0 && (
                                <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
                                    {navLinks.map((link) => (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            className={`
                                                text-[var(--color-text-secondary)]
                                                hover:text-[var(--color-text-primary)]
                                                text-sm
                                                focus-visible:outline
                                                focus-visible:outline-2
                                                focus-visible:outline-offset-4
                                                focus-visible:outline-[var(--color-focus)]
                                                rounded-sm
                                                ${shouldAnimate ? 'transition-colors duration-200' : ''}
                                            `}
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </nav>
                            )}

                            {/* Desktop Actions */}
                            {actions && (
                                <div className="hidden lg:flex items-center gap-4">
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
                        fixed inset-0 z-40 lg:hidden
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
                            {navLinks.map((link, index) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`
                                        text-[var(--color-text-primary)]
                                        text-3xl
                                        hover:text-[var(--color-text-secondary)]
                                        focus-visible:outline
                                        focus-visible:outline-2
                                        focus-visible:outline-offset-4
                                        focus-visible:outline-[var(--color-focus)]
                                        rounded-sm
                                        ${shouldAnimate ? 'transition-all duration-200' : ''}
                                    `}
                                    style={
                                        shouldAnimate && isMenuOpen
                                            ? {
                                                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`,
                                                opacity: 0,
                                            }
                                            : { opacity: 1 }
                                    }
                                >
                                    {link.label}
                                </a>
                            ))}

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
