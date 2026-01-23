'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import { useMotionPreference } from '../../hooks/useMotionPreference';

export interface TypewriterProps {
    text: string | string[];
    speed?: number;
    delay?: number;
    loop?: boolean;
    loopDelay?: number;
    cursor?: string;
    showCursor?: boolean;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export function Typewriter({
    text,
    speed = 0.05,
    delay = 0,
    loop = false,
    loopDelay = 2,
    cursor = '|',
    showCursor = true,
    className,
    as: Component = 'span',
}: TypewriterProps) {
    const { shouldAnimate, scale } = useMotionPreference();
    const [displayedText, setDisplayedText] = useState('');

    // Flatten text to array for easier handling
    const textArray = Array.isArray(text) ? text : [text];

    useEffect(() => {
        // If reduced motion, show full text immediately
        if (!shouldAnimate) {
            setDisplayedText(textArray[0]);
            return;
        }

        let timeoutId: ReturnType<typeof setTimeout>;
        let isCancelled = false;

        // State pointers
        let stringIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            if (isCancelled) return;

            const currentString = textArray[stringIndex];
            const currentSpeed = (isDeleting ? speed / 2 : speed) * (scale > 0 ? (5 / scale) : 1) * 1000;

            if (isDeleting) {
                // DELETING
                if (charIndex > 0) {
                    setDisplayedText(currentString.substring(0, charIndex - 1));
                    charIndex--;
                    timeoutId = setTimeout(type, currentSpeed);
                } else {
                    // Start typing next string
                    isDeleting = false;
                    stringIndex = (stringIndex + 1) % textArray.length;
                    timeoutId = setTimeout(type, currentSpeed);
                }
            } else {
                // TYPING
                if (charIndex < currentString.length) {
                    setDisplayedText(currentString.substring(0, charIndex + 1));
                    charIndex++;
                    timeoutId = setTimeout(type, currentSpeed);
                } else {
                    // FINISHED TYPING STRING
                    if (loop) {
                        isDeleting = true;
                        timeoutId = setTimeout(type, loopDelay * 1000);
                    } else if (stringIndex < textArray.length - 1) {
                        // If we have more strings to type in sequence (and not just looping one)
                        // Note: The original logic treated array as "loop through these options". 
                        // To match previous behavior: array = specific sequence to loop? 
                        // Usually typewriters with arrays toggle between them.
                        isDeleting = true;
                        timeoutId = setTimeout(type, loopDelay * 1000);
                    }
                }
            }
        };

        // Initial Start Delay
        timeoutId = setTimeout(() => {
            type();
        }, delay * 1000);

        return () => {
            isCancelled = true;
            clearTimeout(timeoutId);
        };
    }, [text, speed, delay, loop, loopDelay, shouldAnimate, scale]); // Re-run effect if props change

    return (
        <Component className={cn("inline-flex items-center", className)}>
            <span>{displayedText}</span>
            {showCursor && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="ml-0.5 text-[var(--color-primary)] font-light"
                >
                    {cursor}
                </motion.span>
            )}
        </Component>
    );
}
