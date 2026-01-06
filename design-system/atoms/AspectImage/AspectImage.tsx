import React from 'react';

export interface AspectImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    /**
     * Aspect ratio (width / height)
     * @example 16/9, 4/3, 1
     * @default 16/9
     */
    ratio?: number;
    /**
     * Image source
     */
    src: string;
    /**
     * Image alt text
     */
    alt: string;
    /**
     * Apply border radius
     * @default true
     */
    rounded?: boolean;
    /**
     * Apply shadow
     * @default false
     */
    shadow?: boolean;
    /**
     * Optional caption
     */
    caption?: React.ReactNode;
}

export const AspectImage = React.forwardRef<HTMLImageElement, AspectImageProps>(
    ({
        ratio = 16 / 9,
        src,
        alt,
        rounded = true,
        shadow = false,
        caption,
        className = '',
        style,
        ...props
    }, ref) => {
        return (
            <figure className={`w-full ${className}`}>
                <div
                    className={`relative overflow-hidden w-full bg-[var(--color-surface)] border border-[var(--color-border)] 
                    ${rounded ? 'rounded-xl' : ''} 
                    ${shadow ? 'shadow-md' : ''}`}
                    style={{ aspectRatio: ratio }}
                >
                    <img
                        ref={ref}
                        src={src}
                        alt={alt}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        {...props}
                    />
                </div>
                {caption && (
                    <figcaption className="mt-2 text-sm text-[var(--color-text-muted)] text-center">
                        {caption}
                    </figcaption>
                )}
            </figure>
        );
    }
);

AspectImage.displayName = 'AspectImage';
