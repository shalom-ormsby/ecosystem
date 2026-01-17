'use client';
import React, { useRef, useEffect, useContext } from 'react';
import { useXRay } from './XRayProvider';
import type { XRayTargetProps, InspectorData } from './types';

const TYPE_COLORS = {
    primitive: '#3B82F6',
    pattern: '#10B981',
    layout: '#8B5CF6',
    typography: '#F59E0B',
};

export const XRayTarget: React.FC<XRayTargetProps> = ({
    component,
    type = 'primitive',
    variant,
    tokens = {},
    children,
    className = '',
}) => {
    // Gracefully handle missing XRayProvider
    let isActive = false;
    let setInspectorData: any = () => {};

    try {
        const xrayContext = useXRay();
        isActive = xrayContext.isActive;
        setInspectorData = xrayContext.setInspectorData;
    } catch (e) {
        // XRayProvider not found - render children without X-Ray functionality
    }

    const targetRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = (e: React.MouseEvent) => {
        if (!isActive || !targetRef.current) return;

        const element = targetRef.current;
        const rect = element.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(element);

        const inspectorData: InspectorData = {
            name: component,
            type,
            variant,
            tokens,
            dimensions: {
                width: `${rect.width.toFixed(1)}px`,
                height: `${rect.height.toFixed(1)}px`,
            },
            computedStyles: {
                padding: computedStyle.padding,
                margin: computedStyle.margin,
            },
            position: {
                x: e.clientX,
                y: e.clientY,
            },
            accessibility: {
                role: element.getAttribute('role') || undefined,
                label: element.getAttribute('aria-label') || undefined,
                tabIndex: element.tabIndex !== -1 ? element.tabIndex : undefined,
                focusable: element.tabIndex !== -1,
            },
        };

        setInspectorData(inspectorData);
    };

    const handleMouseLeave = () => {
        if (!isActive) return;
        setInspectorData(null);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isActive) return;
        // Update inspector position as mouse moves
        setInspectorData((prev: InspectorData | null) => {
            if (!prev) return null;
            return {
                ...prev,
                position: { x: e.clientX, y: e.clientY },
            };
        });
    };

    // Add data attributes for the overlay to detect
    const dataAttributes = {
        'data-xray-component': component,
        'data-xray-type': type,
        'data-xray-variant': variant,
        'data-xray-tokens': JSON.stringify(tokens),
        'data-xray-color': TYPE_COLORS[type],
    };

    return (
        <div
            ref={targetRef}
            className={className}
            {...dataAttributes}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            style={{
                position: 'relative',
            }}
        >
            {children}
        </div>
    );
};
