import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const matchQueryList = window.matchMedia(query);
        function handleChange(e: MediaQueryListEvent) {
            setMatches(e.matches);
        }

        // Set initial value
        setMatches(matchQueryList.matches);

        // Listen
        matchQueryList.addEventListener('change', handleChange);

        return () => {
            matchQueryList.removeEventListener('change', handleChange);
        };
    }, [query]);

    return matches;
}
