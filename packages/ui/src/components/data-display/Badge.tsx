import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
                outline: "text-foreground",
                // Semantic variants from original design system
                success: "border-transparent bg-success text-success-foreground hover:bg-success/80",
                warning: "border-transparent bg-warning text-warning-foreground hover:bg-warning/80",
                error: "border-transparent bg-error text-error-foreground hover:bg-error/80",
                info: "border-transparent bg-info text-info-foreground hover:bg-info/80",
            },
            size: {
                sm: "px-2 py-0.5 text-xs",
                md: "px-2.5 py-1 text-sm",
                lg: "px-3 py-1.5 text-base",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
    dot?: boolean;
}

function Badge({ className, variant, size, dot, children, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
            {dot && (
                <span className={cn(
                    "mr-1.5 rounded-full bg-current animate-pulse",
                    size === 'sm' ? "w-1.5 h-1.5" :
                        size === 'lg' ? "w-2.5 h-2.5" : "w-2 h-2"
                )} aria-hidden="true" />
            )}
            {children}
        </div>
    )
}

export { Badge, badgeVariants }
