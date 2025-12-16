import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CustomizerState {
    motion: number; // 0-10
    xrayMode: boolean;
    prefersReducedMotion: boolean;
    setMotion: (level: number) => void;
    toggleXray: () => void;
    setPrefersReducedMotion: (value: boolean) => void;
}

export const useCustomizer = create<CustomizerState>()(
    persist(
        (set) => ({
            motion: 5,
            xrayMode: false,
            prefersReducedMotion: false,
            setMotion: (level) => set({ motion: level }),
            toggleXray: () => set((state) => ({ xrayMode: !state.xrayMode })),
            setPrefersReducedMotion: (value) => set({ prefersReducedMotion: value }),
        }),
        {
            name: 'ecosystem-customizer',
        }
    )
);
