'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCustomizer } from '../../lib/store/customizer';
import { XRayOverlay } from './XRayOverlay';
import { XRayInspector } from './XRayInspector';
import type { InspectorData } from './types';

interface XRayContextValue {
    isActive: boolean;
    inspectorData: InspectorData | null;
    setInspectorData: React.Dispatch<React.SetStateAction<InspectorData | null>>;
}

const XRayContext = createContext<XRayContextValue | undefined>(undefined);

export const useXRay = () => {
    const context = useContext(XRayContext);
    if (!context) {
        throw new Error('useXRay must be used within XRayProvider');
    }
    return context;
};

export const XRayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { xrayMode } = useCustomizer();
    const [inspectorData, setInspectorData] = useState<InspectorData | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Keyboard shortcuts
    useEffect(() => {
        if (!mounted) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            // ESC to close inspector
            if (e.key === 'Escape' && inspectorData) {
                setInspectorData(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [inspectorData, mounted]);

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <XRayContext.Provider value={{ isActive: xrayMode, inspectorData, setInspectorData }}>
            {children}
            {xrayMode && (
                <>
                    <XRayOverlay />
                    <XRayInspector data={inspectorData} />
                </>
            )}
        </XRayContext.Provider>
    );
};
