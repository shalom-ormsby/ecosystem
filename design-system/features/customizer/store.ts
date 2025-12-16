import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CustomizerState {
    motion: number; // 0-10
    xrayMode: boolean;
    setMotion: (level: number) => void;
    toggleXray: () => void;
}

export const useCustomizer = create<CustomizerState>()(
    persist(
        (set) => ({
            motion: 5,
            xrayMode: false,
            setMotion: (level) => set({ motion: level }),
            toggleXray: () => set((state) => ({ xrayMode: !state.xrayMode })),
        }),
        {
            name: 'shalom-customizer',
        }
    )
);
