import { useState, useEffect, useRef } from 'react';

export function useHover<T extends HTMLElement = HTMLElement>() {
    const [hovered, setHovered] = useState(false);
    const ref = useRef<T>(null);

    useEffect(() => {
        const onMouseEnter = () => setHovered(true);
        const onMouseLeave = () => setHovered(false);

        const element = ref.current;

        if (element) {
            element.addEventListener('mouseenter', onMouseEnter);
            element.addEventListener('mouseleave', onMouseLeave);

            return () => {
                element.removeEventListener('mouseenter', onMouseEnter);
                element.removeEventListener('mouseleave', onMouseLeave);
            };
        }
    }, [ref.current]); // eslint-disable-line react-hooks/exhaustive-deps

    return { ref, hovered };
}
