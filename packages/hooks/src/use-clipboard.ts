export function useClipboard() {
    return { copy: (text: string) => navigator.clipboard.writeText(text) };
}
