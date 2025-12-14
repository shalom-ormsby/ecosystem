import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CustomizerState {
    motion: number; // 0-10
    theme: 'light' | 'dark' | 'sage';
    xrayMode: boolean;
    setMotion: (level: number) => void;
    setTheme: (theme: 'light' | 'dark' | 'sage') => void;
    toggleXray: () => void;
}

export const useCustomizer = create<CustomizerState>()(
    persist(
        (set) => ({
            motion: 5,
            theme: 'light',
            xrayMode: false,
            setMotion: (level) => set({ motion: level }),
            setTheme: (theme) => set({ theme }),
            toggleXray: () => set((state) => ({ xrayMode: !state.xrayMode })),
        }),
        {
            name: 'shalom-customizer',
        }
    )
);
