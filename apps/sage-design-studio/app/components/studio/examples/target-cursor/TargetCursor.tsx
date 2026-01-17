'use client';
import React, { useEffect, useRef, useState } from 'react';

interface TargetCursorProps {
    color?: string;
    outerSize?: number;
    innerSize?: number;
    outerAlpha?: number;
    innerScale?: number;
    outerScale?: number;
    clickScale?: number;
    blendMode?: boolean;
}

export default function TargetCursor({
    color = '255, 255, 255',
    outerSize = 40,
    innerSize = 8,
    outerAlpha = 0.4,
    innerScale = 0.7,
    outerScale = 4,
    clickScale = 0.7,
    blendMode = true
}: TargetCursorProps) {
    const cursorOuterRef = useRef<HTMLDivElement>(null);
    const cursorInnerRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number | null>(null);
    const previousTimeRef = useRef<number | null>(null);

    // Mouse position
    const endX = useRef(0);
    const endY = useRef(0);
    // Current interpolated position for outer circle
    const _x = useRef(0);
    const _y = useRef(0);

    const [isActive, setIsActive] = useState(false);
    const [isActiveClickable, setIsActiveClickable] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Initial positioning
    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            endX.current = e.clientX;
            endY.current = e.clientY;

            // Direct DOM update for performance
            if (cursorInnerRef.current) {
                cursorInnerRef.current.style.top = `${e.clientY}px`;
                cursorInnerRef.current.style.left = `${e.clientX}px`;
            }

            if (!isVisible) {
                _x.current = e.clientX;
                _y.current = e.clientY;
                setIsVisible(true);
            }

            // Check for clickable targets using DOM traversal (lighter than getComputedStyle)
            // Note: getComputedStyle causes reflow, so avoid if possible.
            // Using tagName and common patterns is preferred for performance.
            const target = e.target as HTMLElement;
            // Simple heuristics
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.onclick ||
                target.getAttribute('role') === 'button'
            ) {
                setIsActiveClickable(true);
            } else {
                setIsActiveClickable(false);
            }
        };

        const onMouseDown = () => setIsActive(true);
        const onMouseUp = () => setIsActive(false);
        const onMouseEnter = () => setIsVisible(true);
        const onMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mouseenter', onMouseEnter);
        window.addEventListener('mouseleave', onMouseLeave);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mouseenter', onMouseEnter);
            window.removeEventListener('mouseleave', onMouseLeave);
        };
    }, [isVisible]);

    // Animation Loop
    const animateCursor = (time: number) => {
        if (previousTimeRef.current !== undefined) {
            _x.current += (endX.current - _x.current) / 8;
            _y.current += (endY.current - _y.current) / 8;

            if (cursorOuterRef.current) {
                // translate3d for position, translate(-50%, -50%) for centering
                cursorOuterRef.current.style.transform = `translate3d(${_x.current}px, ${_y.current}px, 0) translate(-50%, -50%)`;
            }
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animateCursor);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animateCursor);
        return () => cancelAnimationFrame(requestRef.current!);
    }, []);

    // Inline styles for dynamic props
    const styles = {
        cursorInner: {
            width: innerSize,
            height: innerSize,
            backgroundColor: `rgba(${color}, 1)`,
            // transform handles centering and scale
            transform: `translate(-50%, -50%) scale(${isActive || isActiveClickable ? innerScale : 1})`,
            transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
        },
        cursorOuter: {
            width: outerSize,
            height: outerSize,
            backgroundColor: `rgba(${color}, ${outerAlpha})`,
            transition: 'width 0.3s, height 0.3s, background-color 0.3s',
            ...(isActiveClickable && {
                width: outerSize * 1.5,
                height: outerSize * 1.5,
                backgroundColor: `rgba(${color}, ${outerAlpha - 0.1})`,
            })
        }
    };

    if (!isVisible) return null;

    return (
        <>
            <div
                ref={cursorOuterRef}
                style={{
                    position: 'fixed',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    left: 0,
                    top: 0,
                    willChange: 'transform',
                    mixBlendMode: blendMode ? 'difference' : 'normal',
                    ...styles.cursorOuter
                }}
            />
            <div
                ref={cursorInnerRef}
                style={{
                    position: 'fixed',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    willChange: 'left, top, transform',
                    mixBlendMode: blendMode ? 'difference' : 'normal',
                    ...styles.cursorInner
                }}
            />
            <style jsx global>{`
                body, a, button, input {
                    cursor: none !important;
                }
            `}</style>
        </>
    );
}
