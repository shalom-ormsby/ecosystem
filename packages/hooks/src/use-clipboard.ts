import { useState, useCallback } from 'react';

export function useClipboard({ timeout = 2000 } = {}) {
    const [error, setError] = useState<Error | null>(null);
    const [copied, setCopied] = useState(false);
    const [copyTimeout, setCopyTimeout] = useState<NodeJS.Timeout | null>(null);

    const handleCopyResult = (value: boolean) => {
        if (copyTimeout) {
            clearTimeout(copyTimeout);
        }
        setCopyTimeout(setTimeout(() => setCopied(false), timeout));
        setCopied(value);
    };

    const copy = useCallback(
        async (valueToCopy: string) => {
            if ('clipboard' in navigator) {
                try {
                    await navigator.clipboard.writeText(valueToCopy);
                    handleCopyResult(true);
                } catch (err) {
                    setError(err as Error);
                }
            } else {
                setError(new Error('useClipboard: navigator.clipboard is not supported'));
            }
        },
        [timeout]
    );

    const reset = useCallback(() => {
        setCopied(false);
        setError(null);
        if (copyTimeout) {
            clearTimeout(copyTimeout);
        }
    }, [copyTimeout]);

    return { copy, reset, error, copied };
}
