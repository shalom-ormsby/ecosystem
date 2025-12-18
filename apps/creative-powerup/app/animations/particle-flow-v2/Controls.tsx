'use client';

import { useState } from 'react';
import type { ParticleFlowConfig, MotionMode } from './ParticleFlowCanvas';

interface ControlsProps {
    config: ParticleFlowConfig;
    onConfigChange: (newConfig: ParticleFlowConfig) => void;
}

export default function Controls({ config, onConfigChange }: ControlsProps) {
    const [isOpen, setIsOpen] = useState(true);

    const handleChange = (key: keyof ParticleFlowConfig, value: number | string | boolean) => {
        onConfigChange({
            ...config,
            [key]: value,
        });
    };

    const handleSave = () => {
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(config, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute('href', dataStr);
        downloadAnchorNode.setAttribute('download', 'particle-flow-v2-config.json');
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition-all z-50 group"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            </button>
        );
    }

    return (
        <div className="fixed top-4 right-4 w-96 max-h-[90vh] overflow-y-auto bg-black/80 backdrop-blur-lg border border-white/10 rounded-xl p-6 text-white z-50 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium tracking-tight">Particle Flow v2</h2>
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/50 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <div className="space-y-6">

                {/* Motion Mode */}
                <div className="space-y-2">
                    <label className="text-sm text-white/70">Motion Mode</label>
                    <select
                        value={config.motionMode}
                        onChange={(e) => handleChange('motionMode', e.target.value as MotionMode)}
                        className="w-full bg-white/10 border border-white/20 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="right-to-left">Right to Left (Standard)</option>
                        <option value="on-camera">On Camera (3D)</option>
                        <option value="flocking">Flocking (Boids)</option>
                        <option value="oceanic">Oceanic (Waves)</option>
                        <option value="brownian">Brownian (Noise)</option>
                        <option value="random">Random (Cycle)</option>
                    </select>
                </div>

                {/* Speed Control */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-white/70">
                        <label>Speed</label>
                        <span>{config.speed.toFixed(1)}</span>
                    </div>
                    <input
                        type="range"
                        min="0.1"
                        max="5"
                        step="0.1"
                        value={config.speed}
                        onChange={(e) => handleChange('speed', parseFloat(e.target.value))}
                        className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                </div>

                {/* Particle Count */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-white/70">
                        <label>Particles</label>
                        <span>{config.particleCount}</span>
                    </div>
                    <input
                        type="range"
                        min="50"
                        max="1000"
                        step="50"
                        value={config.particleCount}
                        onChange={(e) => handleChange('particleCount', parseInt(e.target.value))}
                        className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                </div>

                {/* Trail Length (Extended) */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-white/70">
                        <label>Trail Length</label>
                        <span>{Math.round(config.trailLength * 100)}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="0.99"
                        step="0.01"
                        value={config.trailLength}
                        onChange={(e) => handleChange('trailLength', parseFloat(e.target.value))}
                        className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                </div>

                {/* Decay */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-white/70">
                        <label>Decay (Life)</label>
                        <span>{config.decay.toFixed(2)}</span>
                    </div>
                    <input
                        type="range"
                        min="0.01"
                        max="1.0"
                        step="0.01"
                        value={config.decay}
                        onChange={(e) => handleChange('decay', parseFloat(e.target.value))}
                        className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                </div>

                {/* Interactivity */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                    <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-sm text-white/70 group-hover:text-white transition-colors">Mouse Attractor</span>
                        <div className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={config.isInteractive}
                                onChange={(e) => handleChange('isInteractive', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </div>
                    </label>
                </div>

                {/* Color Options */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex justify-between text-sm text-white/70">
                        <label>Color</label>
                    </div>

                    <div className="flex gap-2">
                        <button onClick={() => handleChange('baseColor', '#4285F4')} className={`w-8 h-8 rounded-full border-2 ${config.baseColor === '#4285F4' ? 'border-white' : 'border-transparent'}`} style={{ background: '#4285F4' }} title="Google Blue" />
                        <button onClick={() => handleChange('baseColor', '#EA4335')} className={`w-8 h-8 rounded-full border-2 ${config.baseColor === '#EA4335' ? 'border-white' : 'border-transparent'}`} style={{ background: '#EA4335' }} title="Google Red" />
                        <button onClick={() => handleChange('baseColor', '#FBBC04')} className={`w-8 h-8 rounded-full border-2 ${config.baseColor === '#FBBC04' ? 'border-white' : 'border-transparent'}`} style={{ background: '#FBBC04' }} title="Google Yellow" />
                        <button onClick={() => handleChange('baseColor', '#34A853')} className={`w-8 h-8 rounded-full border-2 ${config.baseColor === '#34A853' ? 'border-white' : 'border-transparent'}`} style={{ background: '#34A853' }} title="Google Green" />
                        <button onClick={() => handleChange('baseColor', '#ffffff')} className={`w-8 h-8 rounded-full border-2 ${config.baseColor === '#ffffff' ? 'border-white' : 'border-transparent'}`} style={{ background: '#ffffff' }} title="White" />
                        <input
                            type="color"
                            value={config.baseColor}
                            onChange={(e) => handleChange('baseColor', e.target.value)}
                            className="w-8 h-8 rounded-full cursor-pointer bg-transparent border-none p-0 overflow-hidden"
                            title="Custom"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                    <button
                        onClick={handleSave}
                        className="w-full py-2 px-4 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                            <polyline points="17 21 17 13 7 13 7 21"></polyline>
                            <polyline points="7 3 7 8 15 8"></polyline>
                        </svg>
                        Save Configuration
                    </button>
                </div>
            </div>
        </div>
    );
}
