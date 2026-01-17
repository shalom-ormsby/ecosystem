export type ComponentType = 'primitive' | 'pattern' | 'layout' | 'typography';

export interface DesignTokens {
    bg?: string;
    text?: string;
    border?: string;
    padding?: string;
    margin?: string;
    gap?: string;
    shadow?: string;
    radius?: string;
    font?: string;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    [key: string]: string | undefined;
}

export interface ComponentMetadata {
    name: string;
    type: ComponentType;
    variant?: string;
    size?: string;
    tokens?: DesignTokens;
    filePath?: string;
    hierarchy?: string[];
    props?: Record<string, any>;
    accessibility?: {
        role?: string;
        label?: string;
        description?: string;
        focusable?: boolean;
        tabIndex?: number;
    };
}

export interface XRayTargetProps {
    component: string;
    type?: ComponentType;
    variant?: string;
    tokens?: DesignTokens;
    children: React.ReactNode;
    className?: string;
}

export interface InspectorData extends ComponentMetadata {
    dimensions: {
        width: string;
        height: string;
    };
    computedStyles: {
        padding: string;
        margin: string;
    };
    position: {
        x: number;
        y: number;
    };
}
