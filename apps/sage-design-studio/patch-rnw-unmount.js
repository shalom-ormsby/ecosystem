export default function unmountComponentAtNode(root) {
    // unmountComponentAtNode is not supported in React 19 (which uses createRoot)
    // We return false or log a warning if needed
    console.warn('unmountComponentAtNode is not supported in React 19.');
    return false;
}
