'use client';
import React, { useEffect, useState } from 'react';
import type { ComponentType } from './types';

interface ComponentBounds {
    id: string;
    name: string;
    type: ComponentType;
    color: string;
    rect: DOMRect;
}

export const XRayOverlay: React.FC = () => {
    const [components, setComponents] = useState<ComponentBounds[]>([]);

    useEffect(() => {
        const scanComponents = () => {
            const xrayElements = document.querySelectorAll('[data-xray-component]');
            const bounds: ComponentBounds[] = [];

            xrayElements.forEach((element, index) => {
                const rect = element.getBoundingClientRect();
                const name = element.getAttribute('data-xray-component') || 'Unknown';
                const type = (element.getAttribute('data-xray-type') || 'primitive') as ComponentType;
                const color = element.getAttribute('data-xray-color') || '#3B82F6';

                bounds.push({
                    id: `${name}-${index}`,
                    name,
                    type,
                    color,
                    rect,
                });
            });

            setComponents(bounds);
        };

        // Initial scan
        scanComponents();

        // Rescan on scroll and resize
        const handleUpdate = () => {
            requestAnimationFrame(scanComponents);
        };

        window.addEventListener('scroll', handleUpdate, true);
        window.addEventListener('resize', handleUpdate);

        // Periodic rescan for dynamic content
        const interval = setInterval(scanComponents, 1000);

        return () => {
            window.removeEventListener('scroll', handleUpdate, true);
            window.removeEventListener('resize', handleUpdate);
            clearInterval(interval);
        };
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 999999,
                opacity: 0.9,
            }}
            className="xray-overlay"
        >
            {components.map((comp) => (
                <React.Fragment key={comp.id}>
                    {/* Component boundary */}
                    <div
                        style={{
                            position: 'absolute',
                            left: comp.rect.left + window.scrollX,
                            top: comp.rect.top + window.scrollY,
                            width: comp.rect.width,
                            height: comp.rect.height,
                            border: `2px solid ${comp.color}`,
                            borderRadius: '4px',
                            backgroundColor: `${comp.color}08`,
                            pointerEvents: 'none',
                            transition: 'all 0.15s ease-out',
                        }}
                    />

                    {/* Component label */}
                    <div
                        style={{
                            position: 'absolute',
                            left: comp.rect.left + window.scrollX,
                            top: comp.rect.top + window.scrollY - 22,
                            padding: '2px 8px',
                            backgroundColor: comp.color,
                            color: 'white',
                            fontSize: '11px',
                            fontFamily: 'monospace',
                            fontWeight: 600,
                            borderRadius: '4px 4px 0 0',
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        }}
                    >
                        {comp.name}
                    </div>

                    {/* Spacing visualization - padding indicator */}
                    <div
                        style={{
                            position: 'absolute',
                            left: comp.rect.left + window.scrollX + 4,
                            top: comp.rect.top + window.scrollY + 4,
                            width: Math.max(0, comp.rect.width - 8),
                            height: Math.max(0, comp.rect.height - 8),
                            border: `1px dashed ${comp.color}`,
                            backgroundColor: `${comp.color}05`,
                            pointerEvents: 'none',
                            borderRadius: '2px',
                        }}
                    />
                </React.Fragment>
            ))}

            {/* Grid overlay */}
            <svg
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    opacity: 0.1,
                }}
            >
                <defs>
                    <pattern
                        id="grid"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M 20 0 L 0 0 0 20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.5"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>
    );
};
