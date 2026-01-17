'use client';
import React, { useState } from 'react';
import type { InspectorData } from './types';

interface XRayInspectorProps {
    data: InspectorData | null;
}

const TYPE_COLORS = {
    primitive: '#3B82F6',
    pattern: '#10B981',
    layout: '#8B5CF6',
    typography: '#F59E0B',
};

export const XRayInspector: React.FC<XRayInspectorProps> = ({ data }) => {
    const [copiedToken, setCopiedToken] = useState<string | null>(null);

    if (!data) return null;

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopiedToken(label);
        setTimeout(() => setCopiedToken(null), 1500);
    };

    // Position inspector panel near cursor but keep it on screen
    const panelWidth = 320;
    const panelHeight = 400;
    const offset = 20;

    let x = data.position.x + offset;
    let y = data.position.y + offset;

    // Keep panel on screen
    if (x + panelWidth > window.innerWidth) {
        x = data.position.x - panelWidth - offset;
    }
    if (y + panelHeight > window.innerHeight) {
        y = window.innerHeight - panelHeight - 20;
    }
    if (x < 0) x = 20;
    if (y < 0) y = 20;

    const typeColor = TYPE_COLORS[data.type];

    return (
        <div
            style={{
                position: 'fixed',
                left: x,
                top: y,
                width: panelWidth,
                maxHeight: panelHeight,
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                color: 'white',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                border: `2px solid ${typeColor}`,
                fontFamily: 'monospace',
                fontSize: '12px',
                zIndex: 9999999,
                pointerEvents: 'none',
                overflowY: 'auto',
                backdropFilter: 'blur(10px)',
                animation: 'slideIn 0.15s ease-out',
            }}
        >
            <style>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .inspector-section {
                    margin-bottom: 12px;
                    padding-bottom: 12px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                .inspector-section:last-child {
                    border-bottom: none;
                    margin-bottom: 0;
                    padding-bottom: 0;
                }
                .inspector-label {
                    font-size: 10px;
                    text-transform: uppercase;
                    opacity: 0.6;
                    margin-bottom: 6px;
                    letter-spacing: 0.5px;
                }
                .inspector-value {
                    margin-bottom: 4px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .inspector-key {
                    opacity: 0.7;
                }
                .inspector-token {
                    color: ${typeColor};
                    cursor: pointer;
                    padding: 2px 6px;
                    border-radius: 4px;
                    background: rgba(255, 255, 255, 0.05);
                    transition: background 0.2s;
                }
                .inspector-token:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
                .type-badge {
                    display: inline-block;
                    padding: 2px 8px;
                    border-radius: 4px;
                    background: ${typeColor};
                    color: white;
                    font-size: 10px;
                    font-weight: bold;
                    text-transform: uppercase;
                }
                .copied-toast {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    background: ${typeColor};
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 10px;
                    animation: fadeOut 1.5s ease-out;
                }
                @keyframes fadeOut {
                    0%, 70% { opacity: 1; }
                    100% { opacity: 0; }
                }
            `}</style>

            {copiedToken && (
                <div className="copied-toast">
                    Copied: {copiedToken}
                </div>
            )}

            {/* Component Identity */}
            <div className="inspector-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <strong style={{ fontSize: '14px', color: typeColor }}>{data.name}</strong>
                    <span className="type-badge">{data.type}</span>
                </div>
                {data.variant && (
                    <div style={{ opacity: 0.7, fontSize: '11px' }}>
                        Variant: {data.variant}
                    </div>
                )}
            </div>

            {/* Dimensions */}
            <div className="inspector-section">
                <div className="inspector-label">Dimensions</div>
                <div className="inspector-value">
                    <span className="inspector-key">Width:</span>
                    <span>{data.dimensions.width}</span>
                </div>
                <div className="inspector-value">
                    <span className="inspector-key">Height:</span>
                    <span>{data.dimensions.height}</span>
                </div>
            </div>

            {/* Spacing */}
            <div className="inspector-section">
                <div className="inspector-label">Spacing</div>
                <div className="inspector-value">
                    <span className="inspector-key">Padding:</span>
                    <span>{data.computedStyles.padding}</span>
                </div>
                <div className="inspector-value">
                    <span className="inspector-key">Margin:</span>
                    <span>{data.computedStyles.margin}</span>
                </div>
            </div>

            {/* Design Tokens */}
            {data.tokens && Object.keys(data.tokens).length > 0 && (
                <div className="inspector-section">
                    <div className="inspector-label">Design Tokens</div>
                    {Object.entries(data.tokens).map(([key, value]) => (
                        value && (
                            <div key={key} className="inspector-value">
                                <span className="inspector-key">{key}:</span>
                                <span
                                    className="inspector-token"
                                    onClick={() => copyToClipboard(value, key)}
                                    style={{ pointerEvents: 'auto' }}
                                >
                                    {value}
                                </span>
                            </div>
                        )
                    ))}
                </div>
            )}

            {/* Accessibility */}
            {data.accessibility && (
                <div className="inspector-section">
                    <div className="inspector-label">Accessibility</div>
                    {data.accessibility.role && (
                        <div className="inspector-value">
                            <span className="inspector-key">Role:</span>
                            <span>{data.accessibility.role}</span>
                        </div>
                    )}
                    {data.accessibility.label && (
                        <div className="inspector-value">
                            <span className="inspector-key">Label:</span>
                            <span>{data.accessibility.label}</span>
                        </div>
                    )}
                    <div className="inspector-value">
                        <span className="inspector-key">Focusable:</span>
                        <span>{data.accessibility.focusable ? 'Yes' : 'No'}</span>
                    </div>
                    {data.accessibility.tabIndex !== undefined && (
                        <div className="inspector-value">
                            <span className="inspector-key">Tab Index:</span>
                            <span>{data.accessibility.tabIndex}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Keyboard Hint */}
            <div style={{ marginTop: '12px', opacity: 0.5, fontSize: '10px', textAlign: 'center' }}>
                Press ESC to close
            </div>
        </div>
    );
};
