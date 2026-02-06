import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const cardVariants = cva(
    "rounded-2xl border bg-surface text-foreground shadow-sm",
    {
        variants: {
            hoverEffect: {
                true: "transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary",
                false: "",
            },
            variant: {
                default: "bg-surface border-border",
                glass: "bg-glass border-glass-border backdrop-blur-md",
                outline: "bg-transparent border-border",
            }
        },
        defaultVariants: {
            variant: "default",
            hoverEffect: false,
        },
    }
)

export interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> { }

const Card = (
    {
        ref,
        className,
        variant,
        hoverEffect,
        ...props
    }: CardProps & {
        ref?: React.Ref<HTMLDivElement>;
    }
) => (<div
    ref={ref}
    className={cn(cardVariants({ variant, hoverEffect, className }))}
    {...props}
/>)

const CardHeader = (
    {
        ref,
        className,
        ...props
    }: React.HTMLAttributes<HTMLDivElement> & {
        ref?: React.Ref<HTMLDivElement>;
    }
) => (<div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
/>)

const CardTitle = (
    {
        ref,
        className,
        ...props
    }: React.HTMLAttributes<HTMLHeadingElement> & {
        ref?: React.Ref<HTMLParagraphElement>;
    }
) => (<h3
    ref={ref}
    className={cn(
        "text-2xl font-semibold leading-none tracking-tight font-heading",
        className
    )}
    {...props}
/>)

const CardDescription = (
    {
        ref,
        className,
        ...props
    }: React.HTMLAttributes<HTMLParagraphElement> & {
        ref?: React.Ref<HTMLParagraphElement>;
    }
) => (<p
    ref={ref}
    className={cn("text-sm text-foreground-secondary", className)}
    {...props}
/>)

const CardContent = (
    {
        ref,
        className,
        ...props
    }: React.HTMLAttributes<HTMLDivElement> & {
        ref?: React.Ref<HTMLDivElement>;
    }
) => (<div ref={ref} className={cn("p-6 pt-0", className)} {...props} />)

const CardFooter = (
    {
        ref,
        className,
        ...props
    }: React.HTMLAttributes<HTMLDivElement> & {
        ref?: React.Ref<HTMLDivElement>;
    }
) => (<div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
/>)

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
